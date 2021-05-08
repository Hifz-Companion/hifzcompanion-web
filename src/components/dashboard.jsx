import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Button, CardContent, Typography, Card, CardActions, Divider } from '@material-ui/core';
import Joi from 'joi-browser';
import Form from './common/form';
import { getJuzPlans, getPlans, getSurahPlans } from '../utils/getPlans';
import { getJuzs } from '../utils/getTargets';
import firebase from "firebase/app";
import { toast } from 'react-toastify';
import { getQuranMeta } from '../utils/getMeta';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import Basmala from "../img/basmala.png";
import PreLoader from "./common/preLoader";
import { Helmet } from "react-helmet";


class Dashboard extends Form {
    state = { 
        startNewMemo: false,
        showDeletePlan: false,
        data: {
            target: "",
            plan: "",
            juz: "",
            surah: "",
        },
        errors: {},
        quranMeta: {},
        user: {},
        userMemo: [],
        deleteConfText: "",
        submitting: false,
     }

    schema = {
        target: Joi.string().required().label("Target"),
        plan: Joi.string().required().label("Plan"),
        juz: Joi.string().allow("").label("Juz"),
        surah: Joi.string().allow("").label("Juz"),
    } 

    componentDidMount() {
        const quranMeta = getQuranMeta();
        this.setState({ quranMeta })    
        
        let userId = ""
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user })
            if(!user) {
                window.location = "/home"
            }
            userId = user.uid;

            
            firebase.firestore().collection("users").doc(userId).get()
            .then(doc => {
                // const userMemo = [...doc.data().memo];
                const userDetails = doc.data()
                this.setState({ userDetails });
            })

        })

    }

    showStartNewMemo = () => {
        const { startNewMemo } = this.state;
        this.setState({ startNewMemo: !startNewMemo, showDeletePlan: false });
    }

    
    createNewMemo = (event) => {
        //THIS FUNCTION CREATES A NEW MEMORIZATION PLAN. MEMO = MEMORIZATION
        event.preventDefault();
        const { user, userDetails } = this.state;
        const { target, plan, juz, surah } = this.state.data; //JUZ & SURAH REPRESENT THE JUZ & SURAH NUMBERS
        const { surahs, pages, juzs } = this.state.quranMeta;
        const surahsRef = surahs.references;
        const pagesRef = pages.references;
        const juzsRef = juzs.references;
        const userId = user.uid;
        let cards = [];
        let dateObj = new Date();
        dateObj.setUTCHours(0, 0, 0, 0);
        const midNight = +dateObj;


        //CHECK TO MAKE SURE SURAH OR JUZ IS SELECTED IF TARGET IS SURAH
        if(target === "juz" && !juz) {
            toast.error("You must choose a juz");
            
            return;
        } else if(target === "surah" && !surah) {
            toast.error("You must choose a surah");
            
            return;
        }

        //ENSURE USER DOESNT CREATE A NEW PLAN WHEN THEY ALREADY HAVE AN ONGOING ENTIRE QURAN PLAN.
        if(userDetails.memo && userDetails.memo.target === "quran") {
            toast.error("You already have an ongoing entire Quran memorization plan. You have to delete that plan in order to add a new plan")
            
            return;
        } else if(userDetails.memo && userDetails.memo.target !== "quran" && userDetails.memo.target !== target) {
            toast.error(`You are currently on the ${userDetails.memo.target} plan. You may not add a different plan type unless you delete the current plan`);
            
            return;
        } else if(userDetails.memo && userDetails.memo.target !== "quran" && userDetails.memo.target === target) {
            let cards = userDetails.memo.cards;
            if(userDetails.memo.target === "juz") {
                let juzList = [];
                let unMemorizedCards = [];
                for(let x=0; x<cards.length; x++) {
                    juzList.push(cards[x].juz);
                    if(cards[x].phase === "memorizing") {
                        unMemorizedCards.push(cards[x]);
                    }
                }
                if(unMemorizedCards.length > 0 ) {
                    toast.error("You cannot add a new juz as you have not completed the previous juz yet.")
                    return;
                }
                if(juzList.includes(Number(juz))){
                    toast.error("You have already memorized this juz")            
                    return;
                }
            } else if (userDetails.memo.target === "surah") {
                let surahList = [];
                let unMemorizedCards = [];
                for(let x=0; x<cards.length; x++) {
                    surahList.push(cards[x].surah.id);
                    if(cards[x].phase === "memorizing") {
                        unMemorizedCards.push(cards[x]);
                    }
                }
                if(unMemorizedCards.length > 0 ) {
                    toast.error("You cannot add a new surah as you have not completed the previous surah yet.")
            
                    
                    return;
                }
                if(surahList.includes(surah)){
                    toast.error("You have already memorized this surah")
            
                    
                    return;
                }
            }

            console.log(cards);
            // return;
        }

        if(target === "quran") {
            if(plan === "oneYear") {
                for(let x=0; x<pages.count; x++) {
                    const dayToMemo = Math.round((x+1) / 2);
                    let card = {
                        id: x+1,
                        pageNo: x+1,
                        title: `Quran Page ${x+1}`,
                        surah: {id: pagesRef[x].surah, name: surahsRef[pagesRef[x].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[x].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*2) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "twoYears") {
                for(let x=0; x<pages.count; x++) {
                    let card = {
                        id: x+1,
                        pageNo: x+1,
                        title: `Quran Page ${x+1}`,
                        surah: {id: pagesRef[x].surah, name: surahsRef[pagesRef[x].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[x].ayah,
                        dueDate: midNight + ((x+1) * 86400000),
                        // dueDate: Date.now() + ((x*2) * 60000),
                        dueDateInWords: new Date(midNight + ((x+1) * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "threeYears") {
                let daysToMemoList = [];
                let noOfDaysToMemo = 906;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if((i+1)%3 !== 0) {
                        daysToMemoList.push(i+1)
                    }
                }
                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<pages.count; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: x+1,
                        title: `Quran Page ${x+1}`,
                        surah: {id: pagesRef[x].surah, name: surahsRef[pagesRef[x].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[x].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "fourYears") {
                let daysToMemoList = [];
                let noOfDaysToMemo = 1208;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if((i+1)%2 !== 0) {
                        daysToMemoList.push(i+1)
                    }
                }
                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<pages.count; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: x+1,
                        title: `Quran Page ${x+1}`,
                        surah: {id: pagesRef[x].surah, name: surahsRef[pagesRef[x].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[x].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "fiveYears") {
                let initialDaysToMemoList = [];
                let noOfDaysToMemo = 1409;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if((i+1)%2 !== 0) {
                        initialDaysToMemoList.push(i+1)
                    }
                }

                console.log(initialDaysToMemoList)

                const initialListLength = initialDaysToMemoList.length;
                let daysToMemoList = [];
                for(let x=0; x<initialListLength; x++) {
                    if((initialDaysToMemoList[x])%7 !== 0) {
                        daysToMemoList.push(initialDaysToMemoList[x]);
                    }
                }

                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<pages.count; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: x+1,
                        title: `Quran Page ${x+1}`,
                        surah: {id: pagesRef[x].surah, name: surahsRef[pagesRef[x].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[x].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "sixYears") {
                let daysToMemoList = [];
                let noOfDaysToMemo = 1812;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if(i === 0){
                        daysToMemoList.push(i+1)
                    }
                    if((i+1)%3 === 0) {
                        daysToMemoList.push(i+2)
                    }
                }
                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<pages.count; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: x+1,
                        title: `Quran Page ${x+1}`,
                        surah: {id: pagesRef[x].surah, name: surahsRef[pagesRef[x].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[x].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

        }

        if(target === "juz") {
            const { juz } = this.state.data;
            let juzPages = 20;
            if(juz === "1") {
                juzPages = 21;
            } else if (juz === "30") {
                juzPages = 23;
            }

            let firstPageOfJuz;

            for(let i=0; i<pagesRef.length; i++) {
                if(pagesRef[i].surah === juzsRef[juz-1].surah && pagesRef[i].ayah === juzsRef[juz-1].ayah) {
                    firstPageOfJuz = i+1;
                }
            }

            //JUZ 4,7,11 AND 26 ARE MISBEHAVING, I WILL SET THEIR FIRST PAGE MANUALLY AND CHECK IT LATER
            switch(juz) {
                case "4":
                    firstPageOfJuz = 62;
                    break;
                case "7":
                    firstPageOfJuz = 122;
                    break;
                case "11":
                    firstPageOfJuz = 202;
                    break;
                case "26":
                    firstPageOfJuz = 502;
                    break;
                default:
                    firstPageOfJuz = firstPageOfJuz + 0;
            }

            
            if(plan === "twoWeeks") {
                for(let x=0; x<juzPages; x++) {
                    const dayToMemo = Math.round((x+1) / 2);
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfJuz + x,
                        title: `Juz ${juz}, Page ${x+1}`,
                        surah: {id: pagesRef[firstPageOfJuz + x-1].surah, name: surahsRef[pagesRef[firstPageOfJuz + x-1].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[firstPageOfJuz + x-1].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }
            
            if(plan === "threeWeeks") {
                for(let x=0; x<juzPages; x++) {
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfJuz + x,
                        title: `Juz ${juz}, Page ${x+1}`,
                        surah: {id: pagesRef[firstPageOfJuz + x-1].surah, name: surahsRef[pagesRef[firstPageOfJuz + x-1].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[firstPageOfJuz + x-1].ayah,
                        dueDate: midNight + ((x+1) * 86400000),
                        // dueDate: Date.now() + ((x*2) * 60000),
                        dueDateInWords: new Date(midNight + ((x+1) * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }
            
            if(plan === "fiveWeeks") {
                let daysToMemoList = [];
                let noOfDaysToMemo = (juzPages /2) * 3

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if((i+1)%3 !== 0) {
                        daysToMemoList.push(i+1)
                    }
                }
                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<juzPages; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfJuz + x,
                        title: `Juz ${juz}, Page ${x+1}`,
                        surah: {id: pagesRef[firstPageOfJuz + x-1].surah, name: surahsRef[pagesRef[firstPageOfJuz + x-1].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[firstPageOfJuz + x-1].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "sixWeeks") {
                let daysToMemoList = [];
                let noOfDaysToMemo = juzPages * 2;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if((i+1)%2 !== 0) {
                        daysToMemoList.push(i+1)
                    }
                }
                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<juzPages; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfJuz + x,
                        title: `Juz ${juz}, Page ${x+1}`,
                        surah: {id: pagesRef[firstPageOfJuz + x-1].surah, name: surahsRef[pagesRef[firstPageOfJuz + x-1].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[firstPageOfJuz + x-1].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "sevenWeeks") {
                let initialDaysToMemoList = [];
                let noOfDaysToMemo = (juzPages/3) * 7;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if((i+1)%2 !== 0) {
                        initialDaysToMemoList.push(i+1)
                    }
                }

                console.log(initialDaysToMemoList)

                const initialListLength = initialDaysToMemoList.length;
                let daysToMemoList = [];
                for(let x=0; x<initialListLength; x++) {
                    if((initialDaysToMemoList[x])%7 !== 0) {
                        daysToMemoList.push(initialDaysToMemoList[x]);
                    }
                }

                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<juzPages; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfJuz + x,
                        title: `Juz ${juz}, Page ${x+1}`,
                        surah: {id: pagesRef[firstPageOfJuz + x-1].surah, name: surahsRef[pagesRef[firstPageOfJuz + x-1].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[firstPageOfJuz + x-1].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "nineWeeks") {
                let daysToMemoList = [];
                let noOfDaysToMemo = juzPages * 3;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if(i === 0){
                        daysToMemoList.push(i+1)
                    }
                    if((i+1)%3 === 0) {
                        daysToMemoList.push(i+2)
                    }
                }
                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<juzPages; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfJuz + x,
                        title: `Juz ${juz}, Page ${x+1}`,
                        surah: {id: pagesRef[firstPageOfJuz + x-1].surah, name: surahsRef[pagesRef[firstPageOfJuz + x-1].surah -1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: pagesRef[firstPageOfJuz + x-1].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }
        }

        if(target === "surah") {
            const { surah } = this.state.data;
            const surahPagesList = pagesRef.filter(page => page.surah === Number(surah));
            let surahPages = surahPagesList.length;
            // console.log(surahPages)
            let firstPageOfSurah;

            if(surahPagesList.length === 0) {
                surahPages = 1;
                if(surah > 90){
                    for(let i=0; i<pagesRef.length; i++) {
                        if(pagesRef[i].surah === surah-2) {
                            firstPageOfSurah = i+1;
                            // console.log(firstPageOfSurah)
                        } else if(pagesRef[i].surah === surah-1) {
                            firstPageOfSurah = i+1;
                            // console.log(firstPageOfSurah)
                        }
                    }
                } 
            } else {
                if(surahPagesList[0].ayah !== 1) {
                    surahPages = surahPages + 1;
                    for(let i=0; i<pagesRef.length; i++) {
                        if(pagesRef[i].surah === surahPagesList[0].surah && pagesRef[i].ayah === surahPagesList[0].ayah) {
                            firstPageOfSurah = i;
                            // console.log(firstPageOfSurah)
                        }
                    }
                } else {
                    for(let i=0; i<pagesRef.length; i++) {
                        if(pagesRef[i].surah === surahPagesList[0].surah && pagesRef[i].ayah === surahPagesList[0].ayah) {
                            firstPageOfSurah = i+1;
                            // console.log(firstPageOfSurah)
                        }
                    }
                }
                
            }
            


            if(plan === "twoP/D") {
                for(let x=0; x<surahPages; x++) {
                    const dayToMemo = Math.round((x+1) / 2);
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfSurah + x,
                        title: `${surah}. ${surahsRef[surah-1].englishName}, Page ${x+1}`,
                        surah: {id: surah, name: surahsRef[surah-1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: x === 0 || !pagesRef[firstPageOfSurah + x - 1] ? 1 : pagesRef[firstPageOfSurah + x - 1].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "oneP/D") {
                for(let x=0; x<surahPages; x++) {
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfSurah + x,
                        title: `${surah}. ${surahsRef[surah-1].englishName}, Page ${x+1}`,
                        surah: {id: surah, name: surahsRef[surah-1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: x === 0 || !pagesRef[firstPageOfSurah + x - 1] ? 1 : pagesRef[firstPageOfSurah + x - 1].ayah,
                        dueDate: midNight + ((x+1) * 86400000),
                        // dueDate: Date.now() + ((x*2) * 60000),
                        dueDateInWords: new Date(midNight + ((x+1) * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "oneP/2D") {
                let daysToMemoList = [];
                let noOfDaysToMemo = surahPages * 2;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if((i+1)%2 !== 0) {
                        daysToMemoList.push(i+1)
                    }
                }
                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<surahPages; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfSurah + x,
                        title: `${surah}. ${surahsRef[surah-1].englishName}, Page ${x+1}`,
                        surah: {id: surah, name: surahsRef[surah-1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: x === 0 || !pagesRef[firstPageOfSurah + x - 1] ? 1 : pagesRef[firstPageOfSurah + x - 1].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

            if(plan === "oneP/3D") {
                let daysToMemoList = [];
                let noOfDaysToMemo = surahPages * 3;

                for(let i=0; i<noOfDaysToMemo; i++) {
                    if(i === 0){
                        daysToMemoList.push(i+1)
                    }
                    if((i+1)%3 === 0) {
                        daysToMemoList.push(i+2)
                    }
                }
                console.log("days to memo list", daysToMemoList)

                for(let x=0; x<surahPages; x++) {
                    let dayToMemo = daysToMemoList[x];
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfSurah + x,
                        title: `${surah}. ${surahsRef[surah-1].englishName}, Page ${x+1}`,
                        surah: {id: surah, name: surahsRef[surah-1].englishName },
                        juz: target === "juz"? Number(juz) : "",
                        ayah: x === 0 || !pagesRef[firstPageOfSurah + x - 1] ? 1 : pagesRef[firstPageOfSurah + x - 1].ayah,
                        dueDate: midNight + (dayToMemo * 86400000),
                        // dueDate: Date.now() + ((x*5) * 60000),
                        dueDateInWords: new Date(midNight + (dayToMemo * 86400000)).toString(),
                        lapses: 0,
                        interval: 1,
                        ease: 2.5,
                        phase: "memorizing",

                    }

                    cards.push(card);
                }
            }

        }

        //Launch the preloader while submitting
        const submitting = this.state.submitting;
        this.setState({ submitting: !submitting });

        console.log(cards)
        // return;

        firebase.firestore().collection("users").doc(userId).get()
        .then( doc => {
            const user = doc.data();
            console.log(user);

            if(user.memo && (target === "juz" || target === "surah")) {
                let currentCards = user.memo.cards;
                cards = currentCards.concat(cards);   

                user.memo = {
                    target: target,
                    plan: plan,
                    cards: cards,
                    startDate: Date.now(),
                }
            } else {
                user.memo = {
                    target: target,
                    plan: plan,
                    cards: cards,
                    startDate: Date.now(),
                }
            }

            console.log(user)
            // return;

            firebase.firestore().collection("users").doc(userId).update(user)
            .then(() => {
                const submitting = this.state.submitting;
                this.setState({ submitting: !submitting });   

                firebase.firestore().collection("statistics").doc("statsdata").update({
                    memoCount: firebase.firestore.FieldValue.increment(1)
                }).then(()=> {
                    console.log("Memo count updated successfully");
                })

                // console.log("Updated user successfully");
                toast.success("Your hifz plan has been created. Your first page will appear tomorrow in shaa Allah");
                this.setState({ startNewMemo: false, target: "", plan: "", surah: "", juz: "" })

            }).catch(error => {
                const submitting = this.state.submitting;
                this.setState({ submitting: !submitting });

                console.log(error.message);
            })
        }).catch(error => {
            const submitting = this.state.submitting;
            this.setState({ submitting: !submitting });

            console.log(error.message);
        })
    } 

    targets = [
        {
            name: "Entire Quran",
            id: "quran"
        },
        {
            name: "A Juz",
            id: "juz"
        },
        {
            name: "A Surah",
            id: "surah"
        }
    ]

    plans = () => {
        const { target } = this.state.data;
        if(target === "quran") {
           return  getPlans();
        } else if(target === "juz") {
            return getJuzPlans();
        } else if(target === "surah") {
            return getSurahPlans();
        } else {
            toast.error("Something went wrong");
        }
    }

    juzs = getJuzs();
    surahs = () => {
        const surahs = [];
        const { quranMeta } = this.state;
        const surahRef = quranMeta.surahs.references;
        for(let x=0; x<surahRef.length; x++) {
            const surah = {
                name: `${x+1}. ${surahRef[x].englishName} (${surahRef[x].name})`,
                id: `${x+1}`
            }
            surahs.push(surah);
        }

        return surahs;
    }

    renderTargetDetails = () => {
        const { target } = this.state.data
        switch(target) {
            case "juz":
                return (
                    this.renderSelect("juz", "Choose Juz", this.juzs)
                );
            case "surah":
                return (
                    this.renderSelect("surah", "Choose Surah", this.surahs())
                );    
            default: 
                return "";
        }
    }

    finishMemorizing = (cardId) => {
        const { user, userDetails } = this.state;
        const memo = userDetails.memo
        let cards = memo.cards;
        console.log(cardId)
        let card = cards[cardId - 1];
        console.log(card)

        card.phase = "reviewing";
        // console.log(card)
        
        card.interval = 24 * 3600000;
        card.dueDate = card.interval + Date.now();
        // card.dueDate = Date.now() + 2 * 60000;
        card.dueDateInWords = new Date(card.dueDate).toString()
        card.intervalInDays = card.interval / 86400000

        cards[cardId - 1] = card;
        memo.cards = cards;

        firebase.firestore().collection("users").doc(user.uid).update({
            memo: memo
        }).then(() => {
            toast.success("Congratulations on your memorization. This page has been added to the review deck")
        })
    }

    renderDueForMemo = () => {
        const { userDetails } = this.state;

        if(userDetails && !userDetails.memo) {
            return (
                <Grid item style={{ margin: "0 auto"}}>
                    You have no ongoing memorization plan. Create a Plan to see pages.
                </Grid>    
            )
        }

        if(userDetails && userDetails.memo) {
            // console.log(userDetails.memo);
            const userMemo = userDetails.memo
        
            const dueCards = userMemo.cards.filter(card => card.dueDate < Date.now() && card.phase === "memorizing");
            if(dueCards.length < 1) {
                return (
                    <Grid item style={{ margin: "0 auto"}}>
                        You have no pages due for memorization at the moment.
                    </Grid>    
                )
            }
            return dueCards.map(card => <Grid item xs={7} sm={5} lg={3} key={card.id} style={{ margin: "0 auto"}}>
                <Card variant="outlined" style={{  margin: "20px"}}>
                    <CardContent>
                        <Typography variant="h6">
                            {card.title}
                        </Typography>
                        <Divider /> < br/>
                        <Typography variant="body1">
                            <strong>Surah</strong>: {card.surah.id}. {card.surah.name} 
                        </Typography>
                        <Typography variant="body1">
                            <strong>1st Ayah</strong>: {card.ayah}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Quran Page</strong>: {card.pageNo}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.finishMemorizing(card.id)} size="small" variant="outlined" color="secondary">Finish Memorizing</Button>
                    </CardActions>
                </Card>
            </Grid>)
        }

    } 

    renderDueForReview = () => {
        const { userDetails } = this.state;

        if(userDetails && !userDetails.memo) {
            return (
                <Grid item style={{ margin: "0 auto"}}>
                    You have no ongoing memorization plan. Create a Plan to see pages.
                </Grid>    
            )
        }

        if(userDetails && userDetails.memo) {
            const userMemo = userDetails.memo
        
            const dueCards = userMemo.cards.filter(card => card.dueDate < Date.now() && card.phase === "reviewing");
            if(dueCards.length < 1) {
                return (
                    <Grid item style={{ margin: "0 auto"}}>
                        You have no pages due for review at the moment.
                    </Grid>    
                )
            }
            return dueCards.map(card => <Grid item xs={11} sm={7} md={5}  key={card.id} style={{ margin: "0 auto"}}>
                <Card variant="outlined" style={{  margin: "20px"}}>
                    <CardContent>
                        <Typography variant="h6">
                            {card.title}
                        </Typography>
                        <Divider />
                        <Typography variant="body1">
                            <strong>Surah</strong>: {card.surah.id}. {card.surah.name} 
                        </Typography>
                        <Typography variant="body1">
                            <strong>1st Ayah</strong>: {card.ayah}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.setAgain(card.id)} size="small" variant="outlined" style={{ color: "red"}}>Again</Button>
                        <Button onClick={() => this.setHard(card.id)} size="small" variant="outlined" style={{ color: "orange"}}>Hard</Button>
                        <Button onClick={() => this.setGood(card.id)} size="small" variant="outlined" style={{ color: "green"}}>Good</Button>
                        <Button onClick={() => this.setEasy(card.id)} size="small" variant="outlined" style={{ color: "blue"}}>Easy</Button>
                    </CardActions>
                </Card>
            </Grid>)
        }
    }

    setGood = (cardId) => {
        const { user, userDetails } = this.state;
        const memo = userDetails.memo
        let cards = memo.cards;
        let card = cards[cardId - 1];
        
        card.interval = card.interval * card.ease;
        card.intervalInDays = card.interval / 86400000;
        
        const dueDate = Date.now() + card.interval;
        card.dueDate = dueDate;
        card.dueDateInWords = new Date(card.dueDate).toString()
        
        cards[cardId - 1] = card;
        memo.cards = cards;

        firebase.firestore().collection("users").doc(user.uid).update({
            memo: memo
        }).then(() => {
            toast.success("This page has been rescheduled for revision")
        })
    }

    setAgain = (cardId) => {
        const { user, userDetails } = this.state;
        const memo = userDetails.memo
        let cards = memo.cards;
        let card = cards[cardId - 1];

        card.phase = "memorizing";
        card.interval = 1;
        card.ease = card.ease * 0.85;
        card.grade = 1
        card.lapses += 1
        card.dueDate = 0;

        firebase.firestore().collection("users").doc(user.uid).update({
            memo: memo
        }).then(() => {
            toast.success("This page has been scheduled for re-memorization")
        })
    }

    setHard = (cardId) => {
        const { user, userDetails } = this.state;
        const memo = userDetails.memo
        let cards = memo.cards;
        let card = cards[cardId - 1];

        card.ease = card.ease * 0.8
        let newInterval = card.interval * card.ease
        if(newInterval > 1.2 * 86400000) {
            card.interval = newInterval
        } else {
            card.interval = card.interval * 1.2
        }

        card.intervalInDays = card.interval / 86400000

        const dueDate = Date.now() + card.interval;
        card.dueDate = dueDate;
        card.dueDateInWords = new Date(card.dueDate).toString()

        firebase.firestore().collection("users").doc(user.uid).update({
            memo: memo
        }).then(() => {
            toast.success("This page has been rescheduled for revision")
        })
    }

    setEasy = (cardId) => {
        const { user, userDetails } = this.state;
        const memo = userDetails.memo
        let cards = memo.cards;
        let card = cards[cardId - 1];

        card.ease = card.ease * 1.15;
        card.interval = card.interval * card.ease
        card.intervalInDays = card.interval / 86400000

        const dueDate = Date.now() + card.interval;
        card.dueDate = dueDate;
        card.dueDateInWords = new Date(card.dueDate).toString()

        firebase.firestore().collection("users").doc(user.uid).update({
            memo: memo
        }).then(() => {
            toast.success("This page has been rescheduled for revision")
        })
    }

    ShowDeletePlanForm = () => {
        const { showDeletePlan } = this.state;
        this.setState({ showDeletePlan: !showDeletePlan, startNewMemo: false })        
    }

    doDeleteCurrentPlan= (event) => {
        event.preventDefault()
        const { user, userDetails, deleteConfText } = this.state;

        if(deleteConfText !== "delete") {
            toast.error("Please enter 'delete' to proceed")
            return;
        }

        if(!userDetails.memo) {
            toast.error("You have no ongoing plans.")
            return;
        }
        delete userDetails.memo;
        console.log(userDetails);

        //Launch the preloader while submitting
        const submitting = this.state.submitting;
        this.setState({ submitting: !submitting });

        firebase.firestore().collection("users").doc(user.uid).update({
            memo: firebase.firestore.FieldValue.delete()
        }).then(() => {
            toast.success("Your current plan has been deleted")

            const submitting = this.state.submitting;
            this.setState({ submitting: !submitting });
            
            this.setState({ showDeletePlan: false})
        }).catch(error => {
            console.log(error.message);

            const submitting = this.state.submitting;
            this.setState({ submitting: !submitting });
        })
    }

    handleConfTextChange = (event) => {
        this.setState({ deleteConfText: event.currentTarget.value});
    }

    render() { 
        const { userMemo, data, startNewMemo, deleteConfText, submitting } = this.state;
        
        return ( 
            <React.Fragment>
                <Helmet>
                    <title>Dashboard - Hifz Companion</title>
                    <meta
                        name="description"
                        content="Track your Quran Memorization Progress"
                    />
                </Helmet>

                {submitting? (
                    <PreLoader />
                ) : (<div>
                    <Grid container justify="center" 
                    style={{ margin: "20px auto", fontSize: "40px", fontFamily: "Kitab"}}>
                        بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ  
                    </Grid>
                    <Grid container id="new-memorization" 
                    justify="center" alignItems="center" 
                    spacing={0} style={{ margin: "20px auto", width: "90%"}}>
                        <div>
                            <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.showStartNewMemo}
                            size="small"
                            >
                                Start a New Hifz Plan {startNewMemo? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </Button>
                            <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={this.ShowDeletePlanForm}
                            style={{ margin: "10px", fontSize: "8px"}}
                            >
                                Delete Current Plan
                            </Button>

                        </div>
                        <form onSubmit={this.createNewMemo}>

                            {startNewMemo && <div style={{ maxWidth: "85%", margin: "auto"}}>
                            {this.renderSelect(
                                "target",
                                "Choose Target",
                                this.targets
                            )}
                            {this.renderTargetDetails()}
                            {data.target && this.renderSelect(
                                "plan",
                                "Choose Plan",
                                this.plans()
                                )}
                            {this.renderSubmitButton("Create My Plan")}
                            </div>}
                        </form>
                        {this.state.showDeletePlan && 
                        <div style={{ margin: "20px auto", width: "80%"}}>
                            <form onSubmit={this.doDeleteCurrentPlan}>
                                <Typography variant="body1">
                                    Are you sure you want to delete the current plan. You will not 
                                    see any more of your memorization pages and you will not be 
                                    given any pages to review. If you still want to proceed, 
                                    type "delete" in the text area below and click on "DELETE PLAN".
                                </Typography>
                                <input type="text" placeholder="delete" value={deleteConfText} onChange={this.handleConfTextChange} style={{ width: "80%", fontSize: "20px", margin: "20px auto"}} />
                                <br />
                                <Button type="submit" variant="contained" color="secondary" size="small">Delete Plan</Button>
                                <Button variant="outlined" size="small" style={{ marginLeft: "20px"}} onClick={this.ShowDeletePlanForm}>Cancel</Button>
                            </form>
                        </div>
                        }
                    </Grid>

                    <Grid item id="due-for-memorizing"
                    style={{ margin: "30px 10px"}}
                    >
                        <Grid style={{ textAlign: "center"}}>
                            <Typography variant="h6">
                                Due for Memorizing
                            </Typography>
                        </Grid>
                        <Grid container>
                            {userMemo && this.renderDueForMemo()}
                        </Grid>    
                    </Grid>
                    
                    <Grid item id="due-for-review"
                    style={{ margin: "50px 10px"}}
                    >
                        <Grid style={{ textAlign: "center"}}>
                            <Typography variant="h6">
                                Due for Revision
                            </Typography>
                        </Grid>
                        <Grid container>
                            {userMemo && this.renderDueForReview()}
                        </Grid>    
                    </Grid>
                </div>
                )}
            </React.Fragment>
         );
    }
}
 
export default Dashboard;