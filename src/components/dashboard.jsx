import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Button, CardContent, Typography, Card, CardActions, Divider } from '@material-ui/core';
import Joi from 'joi-browser';
import Form from './common/form';
import { getJuzPlans, getPlans, getSurahPlans } from '../utils/getPlans';
import { getJuzs } from '../utils/getTargets';
import firebase from "firebase/app";
import { toast } from 'react-toastify';


class Dashboard extends Form {
    state = { 
        startNewMemo: false,
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
     }

    schema = {
        target: Joi.string().required().label("Target"),
        plan: Joi.string().required().label("Plan"),
        juz: Joi.string().allow("").label("Juz"),
        surah: Joi.string().allow("").label("Juz"),
    } 

    componentDidMount() {
        const quranMeta = {
                "ayahs": {
                    "count": 6236
                },
                "surahs": {
                    "count": 114,
                    "references": [
                        {
                            "number": 1,
                            "name": "سُورَةُ ٱلْفَاتِحَةِ",
                            "englishName": "Al-Faatiha",
                            "englishNameTranslation": "The Opening",
                            "numberOfAyahs": 7,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 2,
                            "name": "سُورَةُ البَقَرَةِ",
                            "englishName": "Al-Baqara",
                            "englishNameTranslation": "The Cow",
                            "numberOfAyahs": 286,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 3,
                            "name": "سُورَةُ آلِ عِمۡرَانَ",
                            "englishName": "Aal-i-Imraan",
                            "englishNameTranslation": "The Family of Imraan",
                            "numberOfAyahs": 200,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 4,
                            "name": "سُورَةُ النِّسَاءِ",
                            "englishName": "An-Nisaa",
                            "englishNameTranslation": "The Women",
                            "numberOfAyahs": 176,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 5,
                            "name": "سُورَةُ المَائـِدَةِ",
                            "englishName": "Al-Maaida",
                            "englishNameTranslation": "The Table",
                            "numberOfAyahs": 120,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 6,
                            "name": "سُورَةُ الأَنۡعَامِ",
                            "englishName": "Al-An'aam",
                            "englishNameTranslation": "The Cattle",
                            "numberOfAyahs": 165,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 7,
                            "name": "سُورَةُ الأَعۡرَافِ",
                            "englishName": "Al-A'raaf",
                            "englishNameTranslation": "The Heights",
                            "numberOfAyahs": 206,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 8,
                            "name": "سُورَةُ الأَنفَالِ",
                            "englishName": "Al-Anfaal",
                            "englishNameTranslation": "The Spoils of War",
                            "numberOfAyahs": 75,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 9,
                            "name": "سُورَةُ التَّوۡبَةِ",
                            "englishName": "At-Tawba",
                            "englishNameTranslation": "The Repentance",
                            "numberOfAyahs": 129,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 10,
                            "name": "سُورَةُ يُونُسَ",
                            "englishName": "Yunus",
                            "englishNameTranslation": "Jonas",
                            "numberOfAyahs": 109,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 11,
                            "name": "سُورَةُ هُودٍ",
                            "englishName": "Hud",
                            "englishNameTranslation": "Hud",
                            "numberOfAyahs": 123,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 12,
                            "name": "سُورَةُ يُوسُفَ",
                            "englishName": "Yusuf",
                            "englishNameTranslation": "Joseph",
                            "numberOfAyahs": 111,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 13,
                            "name": "سُورَةُ الرَّعۡدِ",
                            "englishName": "Ar-Ra'd",
                            "englishNameTranslation": "The Thunder",
                            "numberOfAyahs": 43,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 14,
                            "name": "سُورَةُ إِبۡرَاهِيمَ",
                            "englishName": "Ibrahim",
                            "englishNameTranslation": "Abraham",
                            "numberOfAyahs": 52,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 15,
                            "name": "سُورَةُ الحِجۡرِ",
                            "englishName": "Al-Hijr",
                            "englishNameTranslation": "The Rock",
                            "numberOfAyahs": 99,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 16,
                            "name": "سُورَةُ النَّحۡلِ",
                            "englishName": "An-Nahl",
                            "englishNameTranslation": "The Bee",
                            "numberOfAyahs": 128,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 17,
                            "name": "سُورَةُ الإِسۡرَاءِ",
                            "englishName": "Al-Israa",
                            "englishNameTranslation": "The Night Journey",
                            "numberOfAyahs": 111,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 18,
                            "name": "سُورَةُ الكَهۡفِ",
                            "englishName": "Al-Kahf",
                            "englishNameTranslation": "The Cave",
                            "numberOfAyahs": 110,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 19,
                            "name": "سُورَةُ مَرۡيَمَ",
                            "englishName": "Maryam",
                            "englishNameTranslation": "Mary",
                            "numberOfAyahs": 98,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 20,
                            "name": "سُورَةُ طه",
                            "englishName": "Taa-Haa",
                            "englishNameTranslation": "Taa-Haa",
                            "numberOfAyahs": 135,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 21,
                            "name": "سُورَةُ الأَنبِيَاءِ",
                            "englishName": "Al-Anbiyaa",
                            "englishNameTranslation": "The Prophets",
                            "numberOfAyahs": 112,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 22,
                            "name": "سُورَةُ الحَجِّ",
                            "englishName": "Al-Hajj",
                            "englishNameTranslation": "The Pilgrimage",
                            "numberOfAyahs": 78,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 23,
                            "name": "سُورَةُ المُؤۡمِنُونَ",
                            "englishName": "Al-Muminoon",
                            "englishNameTranslation": "The Believers",
                            "numberOfAyahs": 118,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 24,
                            "name": "سُورَةُ النُّورِ",
                            "englishName": "An-Noor",
                            "englishNameTranslation": "The Light",
                            "numberOfAyahs": 64,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 25,
                            "name": "سُورَةُ الفُرۡقَانِ",
                            "englishName": "Al-Furqaan",
                            "englishNameTranslation": "The Criterion",
                            "numberOfAyahs": 77,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 26,
                            "name": "سُورَةُ الشُّعَرَاءِ",
                            "englishName": "Ash-Shu'araa",
                            "englishNameTranslation": "The Poets",
                            "numberOfAyahs": 227,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 27,
                            "name": "سُورَةُ النَّمۡلِ",
                            "englishName": "An-Naml",
                            "englishNameTranslation": "The Ant",
                            "numberOfAyahs": 93,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 28,
                            "name": "سُورَةُ القَصَصِ",
                            "englishName": "Al-Qasas",
                            "englishNameTranslation": "The Stories",
                            "numberOfAyahs": 88,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 29,
                            "name": "سُورَةُ العَنكَبُوتِ",
                            "englishName": "Al-Ankaboot",
                            "englishNameTranslation": "The Spider",
                            "numberOfAyahs": 69,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 30,
                            "name": "سُورَةُ الرُّومِ",
                            "englishName": "Ar-Room",
                            "englishNameTranslation": "The Romans",
                            "numberOfAyahs": 60,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 31,
                            "name": "سُورَةُ لُقۡمَانَ",
                            "englishName": "Luqman",
                            "englishNameTranslation": "Luqman",
                            "numberOfAyahs": 34,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 32,
                            "name": "سُورَةُ السَّجۡدَةِ",
                            "englishName": "As-Sajda",
                            "englishNameTranslation": "The Prostration",
                            "numberOfAyahs": 30,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 33,
                            "name": "سُورَةُ الأَحۡزَابِ",
                            "englishName": "Al-Ahzaab",
                            "englishNameTranslation": "The Clans",
                            "numberOfAyahs": 73,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 34,
                            "name": "سُورَةُ سَبَإٍ",
                            "englishName": "Saba",
                            "englishNameTranslation": "Sheba",
                            "numberOfAyahs": 54,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 35,
                            "name": "سُورَةُ فَاطِرٍ",
                            "englishName": "Faatir",
                            "englishNameTranslation": "The Originator",
                            "numberOfAyahs": 45,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 36,
                            "name": "سُورَةُ يسٓ",
                            "englishName": "Yaseen",
                            "englishNameTranslation": "Yaseen",
                            "numberOfAyahs": 83,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 37,
                            "name": "سُورَةُ الصَّافَّاتِ",
                            "englishName": "As-Saaffaat",
                            "englishNameTranslation": "Those drawn up in Ranks",
                            "numberOfAyahs": 182,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 38,
                            "name": "سُورَةُ صٓ",
                            "englishName": "Saad",
                            "englishNameTranslation": "The letter Saad",
                            "numberOfAyahs": 88,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 39,
                            "name": "سُورَةُ الزُّمَرِ",
                            "englishName": "Az-Zumar",
                            "englishNameTranslation": "The Groups",
                            "numberOfAyahs": 75,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 40,
                            "name": "سُورَةُ غَافِرٍ",
                            "englishName": "Ghafir",
                            "englishNameTranslation": "The Forgiver",
                            "numberOfAyahs": 85,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 41,
                            "name": "سُورَةُ فُصِّلَتۡ",
                            "englishName": "Fussilat",
                            "englishNameTranslation": "Explained in detail",
                            "numberOfAyahs": 54,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 42,
                            "name": "سُورَةُ الشُّورَىٰ",
                            "englishName": "Ash-Shura",
                            "englishNameTranslation": "Consultation",
                            "numberOfAyahs": 53,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 43,
                            "name": "سُورَةُ الزُّخۡرُفِ",
                            "englishName": "Az-Zukhruf",
                            "englishNameTranslation": "Ornaments of gold",
                            "numberOfAyahs": 89,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 44,
                            "name": "سُورَةُ الدُّخَانِ",
                            "englishName": "Ad-Dukhaan",
                            "englishNameTranslation": "The Smoke",
                            "numberOfAyahs": 59,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 45,
                            "name": "سُورَةُ الجَاثِيَةِ",
                            "englishName": "Al-Jaathiya",
                            "englishNameTranslation": "Crouching",
                            "numberOfAyahs": 37,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 46,
                            "name": "سُورَةُ الأَحۡقَافِ",
                            "englishName": "Al-Ahqaf",
                            "englishNameTranslation": "The Dunes",
                            "numberOfAyahs": 35,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 47,
                            "name": "سُورَةُ مُحَمَّدٍ",
                            "englishName": "Muhammad",
                            "englishNameTranslation": "Muhammad",
                            "numberOfAyahs": 38,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 48,
                            "name": "سُورَةُ الفَتۡحِ",
                            "englishName": "Al-Fath",
                            "englishNameTranslation": "The Victory",
                            "numberOfAyahs": 29,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 49,
                            "name": "سُورَةُ الحُجُرَاتِ",
                            "englishName": "Al-Hujuraat",
                            "englishNameTranslation": "The Inner Apartments",
                            "numberOfAyahs": 18,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 50,
                            "name": "سُورَةُ قٓ",
                            "englishName": "Qaaf",
                            "englishNameTranslation": "The letter Qaaf",
                            "numberOfAyahs": 45,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 51,
                            "name": "سُورَةُ الذَّارِيَاتِ",
                            "englishName": "Adh-Dhaariyat",
                            "englishNameTranslation": "The Winnowing Winds",
                            "numberOfAyahs": 60,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 52,
                            "name": "سُورَةُ الطُّورِ",
                            "englishName": "At-Tur",
                            "englishNameTranslation": "The Mount",
                            "numberOfAyahs": 49,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 53,
                            "name": "سُورَةُ النَّجۡمِ",
                            "englishName": "An-Najm",
                            "englishNameTranslation": "The Star",
                            "numberOfAyahs": 62,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 54,
                            "name": "سُورَةُ القَمَرِ",
                            "englishName": "Al-Qamar",
                            "englishNameTranslation": "The Moon",
                            "numberOfAyahs": 55,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 55,
                            "name": "سُورَةُ الرَّحۡمَٰن",
                            "englishName": "Ar-Rahmaan",
                            "englishNameTranslation": "The Beneficent",
                            "numberOfAyahs": 78,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 56,
                            "name": "سُورَةُ الوَاقِعَةِ",
                            "englishName": "Al-Waaqia",
                            "englishNameTranslation": "The Inevitable",
                            "numberOfAyahs": 96,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 57,
                            "name": "سُورَةُ الحَدِيدِ",
                            "englishName": "Al-Hadid",
                            "englishNameTranslation": "The Iron",
                            "numberOfAyahs": 29,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 58,
                            "name": "سُورَةُ المُجَادلَةِ",
                            "englishName": "Al-Mujaadila",
                            "englishNameTranslation": "The Pleading Woman",
                            "numberOfAyahs": 22,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 59,
                            "name": "سُورَةُ الحَشۡرِ",
                            "englishName": "Al-Hashr",
                            "englishNameTranslation": "The Exile",
                            "numberOfAyahs": 24,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 60,
                            "name": "سُورَةُ المُمۡتَحنَةِ",
                            "englishName": "Al-Mumtahana",
                            "englishNameTranslation": "She that is to be examined",
                            "numberOfAyahs": 13,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 61,
                            "name": "سُورَةُ الصَّفِّ",
                            "englishName": "As-Saff",
                            "englishNameTranslation": "The Ranks",
                            "numberOfAyahs": 14,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 62,
                            "name": "سُورَةُ الجُمُعَةِ",
                            "englishName": "Al-Jumu'a",
                            "englishNameTranslation": "Friday",
                            "numberOfAyahs": 11,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 63,
                            "name": "سُورَةُ المُنَافِقُونَ",
                            "englishName": "Al-Munaafiqoon",
                            "englishNameTranslation": "The Hypocrites",
                            "numberOfAyahs": 11,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 64,
                            "name": "سُورَةُ التَّغَابُنِ",
                            "englishName": "At-Taghaabun",
                            "englishNameTranslation": "Mutual Disillusion",
                            "numberOfAyahs": 18,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 65,
                            "name": "سُورَةُ الطَّلَاقِ",
                            "englishName": "At-Talaaq",
                            "englishNameTranslation": "Divorce",
                            "numberOfAyahs": 12,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 66,
                            "name": "سُورَةُ التَّحۡرِيمِ",
                            "englishName": "At-Tahrim",
                            "englishNameTranslation": "The Prohibition",
                            "numberOfAyahs": 12,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 67,
                            "name": "سُورَةُ المُلۡكِ",
                            "englishName": "Al-Mulk",
                            "englishNameTranslation": "The Sovereignty",
                            "numberOfAyahs": 30,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 68,
                            "name": "سُورَةُ القَلَمِ",
                            "englishName": "Al-Qalam",
                            "englishNameTranslation": "The Pen",
                            "numberOfAyahs": 52,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 69,
                            "name": "سُورَةُ الحَاقَّةِ",
                            "englishName": "Al-Haaqqa",
                            "englishNameTranslation": "The Reality",
                            "numberOfAyahs": 52,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 70,
                            "name": "سُورَةُ المَعَارِجِ",
                            "englishName": "Al-Ma'aarij",
                            "englishNameTranslation": "The Ascending Stairways",
                            "numberOfAyahs": 44,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 71,
                            "name": "سُورَةُ نُوحٍ",
                            "englishName": "Nooh",
                            "englishNameTranslation": "Noah",
                            "numberOfAyahs": 28,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 72,
                            "name": "سُورَةُ الجِنِّ",
                            "englishName": "Al-Jinn",
                            "englishNameTranslation": "The Jinn",
                            "numberOfAyahs": 28,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 73,
                            "name": "سُورَةُ المُزَّمِّلِ",
                            "englishName": "Al-Muzzammil",
                            "englishNameTranslation": "The Enshrouded One",
                            "numberOfAyahs": 20,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 74,
                            "name": "سُورَةُ المُدَّثِّرِ",
                            "englishName": "Al-Muddaththir",
                            "englishNameTranslation": "The Cloaked One",
                            "numberOfAyahs": 56,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 75,
                            "name": "سُورَةُ القِيَامَةِ",
                            "englishName": "Al-Qiyaama",
                            "englishNameTranslation": "The Resurrection",
                            "numberOfAyahs": 40,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 76,
                            "name": "سُورَةُ الإِنسَانِ",
                            "englishName": "Al-Insaan",
                            "englishNameTranslation": "Man",
                            "numberOfAyahs": 31,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 77,
                            "name": "سُورَةُ المُرۡسَلَاتِ",
                            "englishName": "Al-Mursalaat",
                            "englishNameTranslation": "The Emissaries",
                            "numberOfAyahs": 50,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 78,
                            "name": "سُورَةُ النَّبَإِ",
                            "englishName": "An-Naba",
                            "englishNameTranslation": "The Announcement",
                            "numberOfAyahs": 40,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 79,
                            "name": "سُورَةُ النَّازِعَاتِ",
                            "englishName": "An-Naazi'aat",
                            "englishNameTranslation": "Those who drag forth",
                            "numberOfAyahs": 46,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 80,
                            "name": "سُورَةُ عَبَسَ",
                            "englishName": "Abasa",
                            "englishNameTranslation": "He frowned",
                            "numberOfAyahs": 42,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 81,
                            "name": "سُورَةُ التَّكۡوِيرِ",
                            "englishName": "At-Takwir",
                            "englishNameTranslation": "The Overthrowing",
                            "numberOfAyahs": 29,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 82,
                            "name": "سُورَةُ الانفِطَارِ",
                            "englishName": "Al-Infitaar",
                            "englishNameTranslation": "The Cleaving",
                            "numberOfAyahs": 19,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 83,
                            "name": "سُورَةُ المُطَفِّفِينَ",
                            "englishName": "Al-Mutaffifin",
                            "englishNameTranslation": "Defrauding",
                            "numberOfAyahs": 36,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 84,
                            "name": "سُورَةُ الانشِقَاقِ",
                            "englishName": "Al-Inshiqaaq",
                            "englishNameTranslation": "The Splitting Open",
                            "numberOfAyahs": 25,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 85,
                            "name": "سُورَةُ البُرُوجِ",
                            "englishName": "Al-Burooj",
                            "englishNameTranslation": "The Constellations",
                            "numberOfAyahs": 22,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 86,
                            "name": "سُورَةُ الطَّارِقِ",
                            "englishName": "At-Taariq",
                            "englishNameTranslation": "The Morning Star",
                            "numberOfAyahs": 17,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 87,
                            "name": "سُورَةُ الأَعۡلَىٰ",
                            "englishName": "Al-A'laa",
                            "englishNameTranslation": "The Most High",
                            "numberOfAyahs": 19,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 88,
                            "name": "سُورَةُ الغَاشِيَةِ",
                            "englishName": "Al-Ghaashiya",
                            "englishNameTranslation": "The Overwhelming",
                            "numberOfAyahs": 26,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 89,
                            "name": "سُورَةُ الفَجۡرِ",
                            "englishName": "Al-Fajr",
                            "englishNameTranslation": "The Dawn",
                            "numberOfAyahs": 30,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 90,
                            "name": "سُورَةُ البَلَدِ",
                            "englishName": "Al-Balad",
                            "englishNameTranslation": "The City",
                            "numberOfAyahs": 20,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 91,
                            "name": "سُورَةُ الشَّمۡسِ",
                            "englishName": "Ash-Shams",
                            "englishNameTranslation": "The Sun",
                            "numberOfAyahs": 15,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 92,
                            "name": "سُورَةُ اللَّيۡلِ",
                            "englishName": "Al-Lail",
                            "englishNameTranslation": "The Night",
                            "numberOfAyahs": 21,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 93,
                            "name": "سُورَةُ الضُّحَىٰ",
                            "englishName": "Ad-Dhuhaa",
                            "englishNameTranslation": "The Morning Hours",
                            "numberOfAyahs": 11,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 94,
                            "name": "سُورَةُ الشَّرۡحِ",
                            "englishName": "Ash-Sharh",
                            "englishNameTranslation": "The Consolation",
                            "numberOfAyahs": 8,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 95,
                            "name": "سُورَةُ التِّينِ",
                            "englishName": "At-Tin",
                            "englishNameTranslation": "The Fig",
                            "numberOfAyahs": 8,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 96,
                            "name": "سُورَةُ العَلَقِ",
                            "englishName": "Al-Alaq",
                            "englishNameTranslation": "The Clot",
                            "numberOfAyahs": 19,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 97,
                            "name": "سُورَةُ القَدۡرِ",
                            "englishName": "Al-Qadr",
                            "englishNameTranslation": "The Power, Fate",
                            "numberOfAyahs": 5,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 98,
                            "name": "سُورَةُ البَيِّنَةِ",
                            "englishName": "Al-Bayyina",
                            "englishNameTranslation": "The Evidence",
                            "numberOfAyahs": 8,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 99,
                            "name": "سُورَةُ الزَّلۡزَلَةِ",
                            "englishName": "Az-Zalzala",
                            "englishNameTranslation": "The Earthquake",
                            "numberOfAyahs": 8,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 100,
                            "name": "سُورَةُ العَادِيَاتِ",
                            "englishName": "Al-Aadiyaat",
                            "englishNameTranslation": "The Chargers",
                            "numberOfAyahs": 11,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 101,
                            "name": "سُورَةُ القَارِعَةِ",
                            "englishName": "Al-Qaari'a",
                            "englishNameTranslation": "The Calamity",
                            "numberOfAyahs": 11,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 102,
                            "name": "سُورَةُ التَّكَاثُرِ",
                            "englishName": "At-Takaathur",
                            "englishNameTranslation": "Competition",
                            "numberOfAyahs": 8,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 103,
                            "name": "سُورَةُ العَصۡرِ",
                            "englishName": "Al-Asr",
                            "englishNameTranslation": "The Declining Day, Epoch",
                            "numberOfAyahs": 3,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 104,
                            "name": "سُورَةُ الهُمَزَةِ",
                            "englishName": "Al-Humaza",
                            "englishNameTranslation": "The Traducer",
                            "numberOfAyahs": 9,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 105,
                            "name": "سُورَةُ الفِيلِ",
                            "englishName": "Al-Fil",
                            "englishNameTranslation": "The Elephant",
                            "numberOfAyahs": 5,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 106,
                            "name": "سُورَةُ قُرَيۡشٍ",
                            "englishName": "Quraish",
                            "englishNameTranslation": "Quraysh",
                            "numberOfAyahs": 4,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 107,
                            "name": "سُورَةُ المَاعُونِ",
                            "englishName": "Al-Maa'un",
                            "englishNameTranslation": "Almsgiving",
                            "numberOfAyahs": 7,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 108,
                            "name": "سُورَةُ الكَوۡثَرِ",
                            "englishName": "Al-Kawthar",
                            "englishNameTranslation": "Abundance",
                            "numberOfAyahs": 3,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 109,
                            "name": "سُورَةُ الكَافِرُونَ",
                            "englishName": "Al-Kaafiroon",
                            "englishNameTranslation": "The Disbelievers",
                            "numberOfAyahs": 6,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 110,
                            "name": "سُورَةُ النَّصۡرِ",
                            "englishName": "An-Nasr",
                            "englishNameTranslation": "Divine Support",
                            "numberOfAyahs": 3,
                            "revelationType": "Medinan"
                        },
                        {
                            "number": 111,
                            "name": "سُورَةُ المَسَدِ",
                            "englishName": "Al-Masad",
                            "englishNameTranslation": "The Palm Fibre",
                            "numberOfAyahs": 5,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 112,
                            "name": "سُورَةُ الإِخۡلَاصِ",
                            "englishName": "Al-Ikhlaas",
                            "englishNameTranslation": "Sincerity",
                            "numberOfAyahs": 4,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 113,
                            "name": "سُورَةُ الفَلَقِ",
                            "englishName": "Al-Falaq",
                            "englishNameTranslation": "The Dawn",
                            "numberOfAyahs": 5,
                            "revelationType": "Meccan"
                        },
                        {
                            "number": 114,
                            "name": "سُورَةُ النَّاسِ",
                            "englishName": "An-Naas",
                            "englishNameTranslation": "Mankind",
                            "numberOfAyahs": 6,
                            "revelationType": "Meccan"
                        }
                    ]
                },
                "sajdas": {
                    "count": 15,
                    "references": [
                        {
                            "surah": 7,
                            "ayah": 206,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 13,
                            "ayah": 15,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 16,
                            "ayah": 50,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 17,
                            "ayah": 109,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 19,
                            "ayah": 58,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 22,
                            "ayah": 18,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 22,
                            "ayah": 77,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 25,
                            "ayah": 60,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 27,
                            "ayah": 26,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 32,
                            "ayah": 15,
                            "recommended": false,
                            "obligatory": true
                        },
                        {
                            "surah": 38,
                            "ayah": 24,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 41,
                            "ayah": 38,
                            "recommended": false,
                            "obligatory": true
                        },
                        {
                            "surah": 53,
                            "ayah": 62,
                            "recommended": false,
                            "obligatory": true
                        },
                        {
                            "surah": 84,
                            "ayah": 21,
                            "recommended": true,
                            "obligatory": false
                        },
                        {
                            "surah": 96,
                            "ayah": 19,
                            "recommended": false,
                            "obligatory": true
                        }
                    ]
                },
                "rukus": {
                    "count": 556,
                    "references": [
                        {
                            "surah": 1,
                            "ayah": 1
                        },
                        {
                            "surah": 2,
                            "ayah": 1
                        },
                        {
                            "surah": 2,
                            "ayah": 8
                        },
                        {
                            "surah": 2,
                            "ayah": 21
                        },
                        {
                            "surah": 2,
                            "ayah": 30
                        },
                        {
                            "surah": 2,
                            "ayah": 40
                        },
                        {
                            "surah": 2,
                            "ayah": 47
                        },
                        {
                            "surah": 2,
                            "ayah": 60
                        },
                        {
                            "surah": 2,
                            "ayah": 62
                        },
                        {
                            "surah": 2,
                            "ayah": 72
                        },
                        {
                            "surah": 2,
                            "ayah": 83
                        },
                        {
                            "surah": 2,
                            "ayah": 87
                        },
                        {
                            "surah": 2,
                            "ayah": 97
                        },
                        {
                            "surah": 2,
                            "ayah": 104
                        },
                        {
                            "surah": 2,
                            "ayah": 113
                        },
                        {
                            "surah": 2,
                            "ayah": 122
                        },
                        {
                            "surah": 2,
                            "ayah": 130
                        },
                        {
                            "surah": 2,
                            "ayah": 142
                        },
                        {
                            "surah": 2,
                            "ayah": 148
                        },
                        {
                            "surah": 2,
                            "ayah": 153
                        },
                        {
                            "surah": 2,
                            "ayah": 164
                        },
                        {
                            "surah": 2,
                            "ayah": 168
                        },
                        {
                            "surah": 2,
                            "ayah": 177
                        },
                        {
                            "surah": 2,
                            "ayah": 183
                        },
                        {
                            "surah": 2,
                            "ayah": 189
                        },
                        {
                            "surah": 2,
                            "ayah": 197
                        },
                        {
                            "surah": 2,
                            "ayah": 211
                        },
                        {
                            "surah": 2,
                            "ayah": 217
                        },
                        {
                            "surah": 2,
                            "ayah": 222
                        },
                        {
                            "surah": 2,
                            "ayah": 229
                        },
                        {
                            "surah": 2,
                            "ayah": 232
                        },
                        {
                            "surah": 2,
                            "ayah": 236
                        },
                        {
                            "surah": 2,
                            "ayah": 243
                        },
                        {
                            "surah": 2,
                            "ayah": 249
                        },
                        {
                            "surah": 2,
                            "ayah": 254
                        },
                        {
                            "surah": 2,
                            "ayah": 258
                        },
                        {
                            "surah": 2,
                            "ayah": 261
                        },
                        {
                            "surah": 2,
                            "ayah": 267
                        },
                        {
                            "surah": 2,
                            "ayah": 274
                        },
                        {
                            "surah": 2,
                            "ayah": 282
                        },
                        {
                            "surah": 2,
                            "ayah": 284
                        },
                        {
                            "surah": 3,
                            "ayah": 1
                        },
                        {
                            "surah": 3,
                            "ayah": 10
                        },
                        {
                            "surah": 3,
                            "ayah": 21
                        },
                        {
                            "surah": 3,
                            "ayah": 31
                        },
                        {
                            "surah": 3,
                            "ayah": 42
                        },
                        {
                            "surah": 3,
                            "ayah": 55
                        },
                        {
                            "surah": 3,
                            "ayah": 64
                        },
                        {
                            "surah": 3,
                            "ayah": 72
                        },
                        {
                            "surah": 3,
                            "ayah": 81
                        },
                        {
                            "surah": 3,
                            "ayah": 92
                        },
                        {
                            "surah": 3,
                            "ayah": 102
                        },
                        {
                            "surah": 3,
                            "ayah": 110
                        },
                        {
                            "surah": 3,
                            "ayah": 121
                        },
                        {
                            "surah": 3,
                            "ayah": 130
                        },
                        {
                            "surah": 3,
                            "ayah": 144
                        },
                        {
                            "surah": 3,
                            "ayah": 149
                        },
                        {
                            "surah": 3,
                            "ayah": 156
                        },
                        {
                            "surah": 3,
                            "ayah": 172
                        },
                        {
                            "surah": 3,
                            "ayah": 181
                        },
                        {
                            "surah": 3,
                            "ayah": 190
                        },
                        {
                            "surah": 4,
                            "ayah": 1
                        },
                        {
                            "surah": 4,
                            "ayah": 11
                        },
                        {
                            "surah": 4,
                            "ayah": 15
                        },
                        {
                            "surah": 4,
                            "ayah": 23
                        },
                        {
                            "surah": 4,
                            "ayah": 26
                        },
                        {
                            "surah": 4,
                            "ayah": 34
                        },
                        {
                            "surah": 4,
                            "ayah": 43
                        },
                        {
                            "surah": 4,
                            "ayah": 51
                        },
                        {
                            "surah": 4,
                            "ayah": 60
                        },
                        {
                            "surah": 4,
                            "ayah": 71
                        },
                        {
                            "surah": 4,
                            "ayah": 77
                        },
                        {
                            "surah": 4,
                            "ayah": 88
                        },
                        {
                            "surah": 4,
                            "ayah": 92
                        },
                        {
                            "surah": 4,
                            "ayah": 97
                        },
                        {
                            "surah": 4,
                            "ayah": 101
                        },
                        {
                            "surah": 4,
                            "ayah": 105
                        },
                        {
                            "surah": 4,
                            "ayah": 113
                        },
                        {
                            "surah": 4,
                            "ayah": 116
                        },
                        {
                            "surah": 4,
                            "ayah": 127
                        },
                        {
                            "surah": 4,
                            "ayah": 135
                        },
                        {
                            "surah": 4,
                            "ayah": 142
                        },
                        {
                            "surah": 4,
                            "ayah": 153
                        },
                        {
                            "surah": 4,
                            "ayah": 163
                        },
                        {
                            "surah": 4,
                            "ayah": 172
                        },
                        {
                            "surah": 5,
                            "ayah": 1
                        },
                        {
                            "surah": 5,
                            "ayah": 6
                        },
                        {
                            "surah": 5,
                            "ayah": 12
                        },
                        {
                            "surah": 5,
                            "ayah": 20
                        },
                        {
                            "surah": 5,
                            "ayah": 27
                        },
                        {
                            "surah": 5,
                            "ayah": 35
                        },
                        {
                            "surah": 5,
                            "ayah": 44
                        },
                        {
                            "surah": 5,
                            "ayah": 51
                        },
                        {
                            "surah": 5,
                            "ayah": 57
                        },
                        {
                            "surah": 5,
                            "ayah": 67
                        },
                        {
                            "surah": 5,
                            "ayah": 78
                        },
                        {
                            "surah": 5,
                            "ayah": 87
                        },
                        {
                            "surah": 5,
                            "ayah": 94
                        },
                        {
                            "surah": 5,
                            "ayah": 101
                        },
                        {
                            "surah": 5,
                            "ayah": 109
                        },
                        {
                            "surah": 5,
                            "ayah": 116
                        },
                        {
                            "surah": 6,
                            "ayah": 1
                        },
                        {
                            "surah": 6,
                            "ayah": 11
                        },
                        {
                            "surah": 6,
                            "ayah": 21
                        },
                        {
                            "surah": 6,
                            "ayah": 31
                        },
                        {
                            "surah": 6,
                            "ayah": 42
                        },
                        {
                            "surah": 6,
                            "ayah": 51
                        },
                        {
                            "surah": 6,
                            "ayah": 56
                        },
                        {
                            "surah": 6,
                            "ayah": 61
                        },
                        {
                            "surah": 6,
                            "ayah": 71
                        },
                        {
                            "surah": 6,
                            "ayah": 83
                        },
                        {
                            "surah": 6,
                            "ayah": 91
                        },
                        {
                            "surah": 6,
                            "ayah": 95
                        },
                        {
                            "surah": 6,
                            "ayah": 101
                        },
                        {
                            "surah": 6,
                            "ayah": 111
                        },
                        {
                            "surah": 6,
                            "ayah": 122
                        },
                        {
                            "surah": 6,
                            "ayah": 130
                        },
                        {
                            "surah": 6,
                            "ayah": 141
                        },
                        {
                            "surah": 6,
                            "ayah": 145
                        },
                        {
                            "surah": 6,
                            "ayah": 151
                        },
                        {
                            "surah": 6,
                            "ayah": 155
                        },
                        {
                            "surah": 7,
                            "ayah": 1
                        },
                        {
                            "surah": 7,
                            "ayah": 11
                        },
                        {
                            "surah": 7,
                            "ayah": 26
                        },
                        {
                            "surah": 7,
                            "ayah": 32
                        },
                        {
                            "surah": 7,
                            "ayah": 40
                        },
                        {
                            "surah": 7,
                            "ayah": 48
                        },
                        {
                            "surah": 7,
                            "ayah": 54
                        },
                        {
                            "surah": 7,
                            "ayah": 59
                        },
                        {
                            "surah": 7,
                            "ayah": 65
                        },
                        {
                            "surah": 7,
                            "ayah": 73
                        },
                        {
                            "surah": 7,
                            "ayah": 85
                        },
                        {
                            "surah": 7,
                            "ayah": 94
                        },
                        {
                            "surah": 7,
                            "ayah": 100
                        },
                        {
                            "surah": 7,
                            "ayah": 109
                        },
                        {
                            "surah": 7,
                            "ayah": 127
                        },
                        {
                            "surah": 7,
                            "ayah": 130
                        },
                        {
                            "surah": 7,
                            "ayah": 142
                        },
                        {
                            "surah": 7,
                            "ayah": 148
                        },
                        {
                            "surah": 7,
                            "ayah": 152
                        },
                        {
                            "surah": 7,
                            "ayah": 158
                        },
                        {
                            "surah": 7,
                            "ayah": 163
                        },
                        {
                            "surah": 7,
                            "ayah": 172
                        },
                        {
                            "surah": 7,
                            "ayah": 182
                        },
                        {
                            "surah": 7,
                            "ayah": 189
                        },
                        {
                            "surah": 8,
                            "ayah": 1
                        },
                        {
                            "surah": 8,
                            "ayah": 11
                        },
                        {
                            "surah": 8,
                            "ayah": 20
                        },
                        {
                            "surah": 8,
                            "ayah": 29
                        },
                        {
                            "surah": 8,
                            "ayah": 38
                        },
                        {
                            "surah": 8,
                            "ayah": 45
                        },
                        {
                            "surah": 8,
                            "ayah": 49
                        },
                        {
                            "surah": 8,
                            "ayah": 59
                        },
                        {
                            "surah": 8,
                            "ayah": 65
                        },
                        {
                            "surah": 8,
                            "ayah": 70
                        },
                        {
                            "surah": 9,
                            "ayah": 1
                        },
                        {
                            "surah": 9,
                            "ayah": 7
                        },
                        {
                            "surah": 9,
                            "ayah": 17
                        },
                        {
                            "surah": 9,
                            "ayah": 25
                        },
                        {
                            "surah": 9,
                            "ayah": 30
                        },
                        {
                            "surah": 9,
                            "ayah": 38
                        },
                        {
                            "surah": 9,
                            "ayah": 43
                        },
                        {
                            "surah": 9,
                            "ayah": 60
                        },
                        {
                            "surah": 9,
                            "ayah": 67
                        },
                        {
                            "surah": 9,
                            "ayah": 73
                        },
                        {
                            "surah": 9,
                            "ayah": 81
                        },
                        {
                            "surah": 9,
                            "ayah": 90
                        },
                        {
                            "surah": 9,
                            "ayah": 100
                        },
                        {
                            "surah": 9,
                            "ayah": 111
                        },
                        {
                            "surah": 9,
                            "ayah": 119
                        },
                        {
                            "surah": 9,
                            "ayah": 123
                        },
                        {
                            "surah": 10,
                            "ayah": 1
                        },
                        {
                            "surah": 10,
                            "ayah": 11
                        },
                        {
                            "surah": 10,
                            "ayah": 21
                        },
                        {
                            "surah": 10,
                            "ayah": 31
                        },
                        {
                            "surah": 10,
                            "ayah": 41
                        },
                        {
                            "surah": 10,
                            "ayah": 54
                        },
                        {
                            "surah": 10,
                            "ayah": 61
                        },
                        {
                            "surah": 10,
                            "ayah": 71
                        },
                        {
                            "surah": 10,
                            "ayah": 83
                        },
                        {
                            "surah": 10,
                            "ayah": 93
                        },
                        {
                            "surah": 10,
                            "ayah": 104
                        },
                        {
                            "surah": 11,
                            "ayah": 1
                        },
                        {
                            "surah": 11,
                            "ayah": 9
                        },
                        {
                            "surah": 11,
                            "ayah": 25
                        },
                        {
                            "surah": 11,
                            "ayah": 36
                        },
                        {
                            "surah": 11,
                            "ayah": 50
                        },
                        {
                            "surah": 11,
                            "ayah": 61
                        },
                        {
                            "surah": 11,
                            "ayah": 69
                        },
                        {
                            "surah": 11,
                            "ayah": 84
                        },
                        {
                            "surah": 11,
                            "ayah": 96
                        },
                        {
                            "surah": 11,
                            "ayah": 110
                        },
                        {
                            "surah": 12,
                            "ayah": 1
                        },
                        {
                            "surah": 12,
                            "ayah": 7
                        },
                        {
                            "surah": 12,
                            "ayah": 21
                        },
                        {
                            "surah": 12,
                            "ayah": 30
                        },
                        {
                            "surah": 12,
                            "ayah": 36
                        },
                        {
                            "surah": 12,
                            "ayah": 43
                        },
                        {
                            "surah": 12,
                            "ayah": 50
                        },
                        {
                            "surah": 12,
                            "ayah": 58
                        },
                        {
                            "surah": 12,
                            "ayah": 69
                        },
                        {
                            "surah": 12,
                            "ayah": 80
                        },
                        {
                            "surah": 12,
                            "ayah": 94
                        },
                        {
                            "surah": 12,
                            "ayah": 105
                        },
                        {
                            "surah": 13,
                            "ayah": 1
                        },
                        {
                            "surah": 13,
                            "ayah": 8
                        },
                        {
                            "surah": 13,
                            "ayah": 19
                        },
                        {
                            "surah": 13,
                            "ayah": 27
                        },
                        {
                            "surah": 13,
                            "ayah": 32
                        },
                        {
                            "surah": 13,
                            "ayah": 38
                        },
                        {
                            "surah": 14,
                            "ayah": 1
                        },
                        {
                            "surah": 14,
                            "ayah": 7
                        },
                        {
                            "surah": 14,
                            "ayah": 13
                        },
                        {
                            "surah": 14,
                            "ayah": 22
                        },
                        {
                            "surah": 14,
                            "ayah": 28
                        },
                        {
                            "surah": 14,
                            "ayah": 35
                        },
                        {
                            "surah": 14,
                            "ayah": 42
                        },
                        {
                            "surah": 15,
                            "ayah": 1
                        },
                        {
                            "surah": 15,
                            "ayah": 16
                        },
                        {
                            "surah": 15,
                            "ayah": 26
                        },
                        {
                            "surah": 15,
                            "ayah": 45
                        },
                        {
                            "surah": 15,
                            "ayah": 61
                        },
                        {
                            "surah": 15,
                            "ayah": 80
                        },
                        {
                            "surah": 16,
                            "ayah": 1
                        },
                        {
                            "surah": 16,
                            "ayah": 10
                        },
                        {
                            "surah": 16,
                            "ayah": 22
                        },
                        {
                            "surah": 16,
                            "ayah": 26
                        },
                        {
                            "surah": 16,
                            "ayah": 35
                        },
                        {
                            "surah": 16,
                            "ayah": 41
                        },
                        {
                            "surah": 16,
                            "ayah": 51
                        },
                        {
                            "surah": 16,
                            "ayah": 61
                        },
                        {
                            "surah": 16,
                            "ayah": 66
                        },
                        {
                            "surah": 16,
                            "ayah": 71
                        },
                        {
                            "surah": 16,
                            "ayah": 77
                        },
                        {
                            "surah": 16,
                            "ayah": 84
                        },
                        {
                            "surah": 16,
                            "ayah": 90
                        },
                        {
                            "surah": 16,
                            "ayah": 101
                        },
                        {
                            "surah": 16,
                            "ayah": 111
                        },
                        {
                            "surah": 16,
                            "ayah": 120
                        },
                        {
                            "surah": 17,
                            "ayah": 1
                        },
                        {
                            "surah": 17,
                            "ayah": 11
                        },
                        {
                            "surah": 17,
                            "ayah": 23
                        },
                        {
                            "surah": 17,
                            "ayah": 31
                        },
                        {
                            "surah": 17,
                            "ayah": 41
                        },
                        {
                            "surah": 17,
                            "ayah": 53
                        },
                        {
                            "surah": 17,
                            "ayah": 61
                        },
                        {
                            "surah": 17,
                            "ayah": 71
                        },
                        {
                            "surah": 17,
                            "ayah": 78
                        },
                        {
                            "surah": 17,
                            "ayah": 85
                        },
                        {
                            "surah": 17,
                            "ayah": 94
                        },
                        {
                            "surah": 17,
                            "ayah": 101
                        },
                        {
                            "surah": 18,
                            "ayah": 1
                        },
                        {
                            "surah": 18,
                            "ayah": 13
                        },
                        {
                            "surah": 18,
                            "ayah": 18
                        },
                        {
                            "surah": 18,
                            "ayah": 23
                        },
                        {
                            "surah": 18,
                            "ayah": 32
                        },
                        {
                            "surah": 18,
                            "ayah": 45
                        },
                        {
                            "surah": 18,
                            "ayah": 50
                        },
                        {
                            "surah": 18,
                            "ayah": 54
                        },
                        {
                            "surah": 18,
                            "ayah": 60
                        },
                        {
                            "surah": 18,
                            "ayah": 71
                        },
                        {
                            "surah": 18,
                            "ayah": 83
                        },
                        {
                            "surah": 18,
                            "ayah": 102
                        },
                        {
                            "surah": 19,
                            "ayah": 1
                        },
                        {
                            "surah": 19,
                            "ayah": 16
                        },
                        {
                            "surah": 19,
                            "ayah": 41
                        },
                        {
                            "surah": 19,
                            "ayah": 51
                        },
                        {
                            "surah": 19,
                            "ayah": 66
                        },
                        {
                            "surah": 19,
                            "ayah": 83
                        },
                        {
                            "surah": 20,
                            "ayah": 1
                        },
                        {
                            "surah": 20,
                            "ayah": 25
                        },
                        {
                            "surah": 20,
                            "ayah": 55
                        },
                        {
                            "surah": 20,
                            "ayah": 77
                        },
                        {
                            "surah": 20,
                            "ayah": 90
                        },
                        {
                            "surah": 20,
                            "ayah": 105
                        },
                        {
                            "surah": 20,
                            "ayah": 116
                        },
                        {
                            "surah": 20,
                            "ayah": 129
                        },
                        {
                            "surah": 21,
                            "ayah": 1
                        },
                        {
                            "surah": 21,
                            "ayah": 11
                        },
                        {
                            "surah": 21,
                            "ayah": 30
                        },
                        {
                            "surah": 21,
                            "ayah": 42
                        },
                        {
                            "surah": 21,
                            "ayah": 51
                        },
                        {
                            "surah": 21,
                            "ayah": 76
                        },
                        {
                            "surah": 21,
                            "ayah": 94
                        },
                        {
                            "surah": 22,
                            "ayah": 1
                        },
                        {
                            "surah": 22,
                            "ayah": 11
                        },
                        {
                            "surah": 22,
                            "ayah": 23
                        },
                        {
                            "surah": 22,
                            "ayah": 26
                        },
                        {
                            "surah": 22,
                            "ayah": 34
                        },
                        {
                            "surah": 22,
                            "ayah": 39
                        },
                        {
                            "surah": 22,
                            "ayah": 49
                        },
                        {
                            "surah": 22,
                            "ayah": 58
                        },
                        {
                            "surah": 22,
                            "ayah": 65
                        },
                        {
                            "surah": 22,
                            "ayah": 73
                        },
                        {
                            "surah": 23,
                            "ayah": 1
                        },
                        {
                            "surah": 23,
                            "ayah": 23
                        },
                        {
                            "surah": 23,
                            "ayah": 33
                        },
                        {
                            "surah": 23,
                            "ayah": 51
                        },
                        {
                            "surah": 23,
                            "ayah": 78
                        },
                        {
                            "surah": 23,
                            "ayah": 93
                        },
                        {
                            "surah": 24,
                            "ayah": 1
                        },
                        {
                            "surah": 24,
                            "ayah": 11
                        },
                        {
                            "surah": 24,
                            "ayah": 21
                        },
                        {
                            "surah": 24,
                            "ayah": 27
                        },
                        {
                            "surah": 24,
                            "ayah": 35
                        },
                        {
                            "surah": 24,
                            "ayah": 41
                        },
                        {
                            "surah": 24,
                            "ayah": 51
                        },
                        {
                            "surah": 24,
                            "ayah": 58
                        },
                        {
                            "surah": 24,
                            "ayah": 62
                        },
                        {
                            "surah": 25,
                            "ayah": 1
                        },
                        {
                            "surah": 25,
                            "ayah": 10
                        },
                        {
                            "surah": 25,
                            "ayah": 21
                        },
                        {
                            "surah": 25,
                            "ayah": 35
                        },
                        {
                            "surah": 25,
                            "ayah": 45
                        },
                        {
                            "surah": 25,
                            "ayah": 61
                        },
                        {
                            "surah": 26,
                            "ayah": 1
                        },
                        {
                            "surah": 26,
                            "ayah": 10
                        },
                        {
                            "surah": 26,
                            "ayah": 34
                        },
                        {
                            "surah": 26,
                            "ayah": 53
                        },
                        {
                            "surah": 26,
                            "ayah": 70
                        },
                        {
                            "surah": 26,
                            "ayah": 105
                        },
                        {
                            "surah": 26,
                            "ayah": 123
                        },
                        {
                            "surah": 26,
                            "ayah": 141
                        },
                        {
                            "surah": 26,
                            "ayah": 160
                        },
                        {
                            "surah": 26,
                            "ayah": 176
                        },
                        {
                            "surah": 26,
                            "ayah": 192
                        },
                        {
                            "surah": 27,
                            "ayah": 1
                        },
                        {
                            "surah": 27,
                            "ayah": 15
                        },
                        {
                            "surah": 27,
                            "ayah": 32
                        },
                        {
                            "surah": 27,
                            "ayah": 45
                        },
                        {
                            "surah": 27,
                            "ayah": 59
                        },
                        {
                            "surah": 27,
                            "ayah": 67
                        },
                        {
                            "surah": 27,
                            "ayah": 83
                        },
                        {
                            "surah": 28,
                            "ayah": 1
                        },
                        {
                            "surah": 28,
                            "ayah": 14
                        },
                        {
                            "surah": 28,
                            "ayah": 22
                        },
                        {
                            "surah": 28,
                            "ayah": 29
                        },
                        {
                            "surah": 28,
                            "ayah": 43
                        },
                        {
                            "surah": 28,
                            "ayah": 51
                        },
                        {
                            "surah": 28,
                            "ayah": 61
                        },
                        {
                            "surah": 28,
                            "ayah": 76
                        },
                        {
                            "surah": 29,
                            "ayah": 1
                        },
                        {
                            "surah": 29,
                            "ayah": 14
                        },
                        {
                            "surah": 29,
                            "ayah": 23
                        },
                        {
                            "surah": 29,
                            "ayah": 31
                        },
                        {
                            "surah": 29,
                            "ayah": 45
                        },
                        {
                            "surah": 29,
                            "ayah": 52
                        },
                        {
                            "surah": 29,
                            "ayah": 64
                        },
                        {
                            "surah": 30,
                            "ayah": 1
                        },
                        {
                            "surah": 30,
                            "ayah": 11
                        },
                        {
                            "surah": 30,
                            "ayah": 20
                        },
                        {
                            "surah": 30,
                            "ayah": 28
                        },
                        {
                            "surah": 30,
                            "ayah": 41
                        },
                        {
                            "surah": 30,
                            "ayah": 54
                        },
                        {
                            "surah": 31,
                            "ayah": 1
                        },
                        {
                            "surah": 31,
                            "ayah": 12
                        },
                        {
                            "surah": 31,
                            "ayah": 20
                        },
                        {
                            "surah": 32,
                            "ayah": 1
                        },
                        {
                            "surah": 32,
                            "ayah": 12
                        },
                        {
                            "surah": 32,
                            "ayah": 23
                        },
                        {
                            "surah": 33,
                            "ayah": 1
                        },
                        {
                            "surah": 33,
                            "ayah": 9
                        },
                        {
                            "surah": 33,
                            "ayah": 21
                        },
                        {
                            "surah": 33,
                            "ayah": 28
                        },
                        {
                            "surah": 33,
                            "ayah": 35
                        },
                        {
                            "surah": 33,
                            "ayah": 41
                        },
                        {
                            "surah": 33,
                            "ayah": 53
                        },
                        {
                            "surah": 33,
                            "ayah": 59
                        },
                        {
                            "surah": 33,
                            "ayah": 69
                        },
                        {
                            "surah": 34,
                            "ayah": 1
                        },
                        {
                            "surah": 34,
                            "ayah": 10
                        },
                        {
                            "surah": 34,
                            "ayah": 22
                        },
                        {
                            "surah": 34,
                            "ayah": 31
                        },
                        {
                            "surah": 34,
                            "ayah": 37
                        },
                        {
                            "surah": 34,
                            "ayah": 46
                        },
                        {
                            "surah": 35,
                            "ayah": 1
                        },
                        {
                            "surah": 35,
                            "ayah": 8
                        },
                        {
                            "surah": 35,
                            "ayah": 15
                        },
                        {
                            "surah": 35,
                            "ayah": 27
                        },
                        {
                            "surah": 35,
                            "ayah": 38
                        },
                        {
                            "surah": 36,
                            "ayah": 1
                        },
                        {
                            "surah": 36,
                            "ayah": 13
                        },
                        {
                            "surah": 36,
                            "ayah": 33
                        },
                        {
                            "surah": 36,
                            "ayah": 51
                        },
                        {
                            "surah": 36,
                            "ayah": 68
                        },
                        {
                            "surah": 37,
                            "ayah": 1
                        },
                        {
                            "surah": 37,
                            "ayah": 22
                        },
                        {
                            "surah": 37,
                            "ayah": 75
                        },
                        {
                            "surah": 37,
                            "ayah": 114
                        },
                        {
                            "surah": 37,
                            "ayah": 139
                        },
                        {
                            "surah": 38,
                            "ayah": 1
                        },
                        {
                            "surah": 38,
                            "ayah": 15
                        },
                        {
                            "surah": 38,
                            "ayah": 27
                        },
                        {
                            "surah": 38,
                            "ayah": 41
                        },
                        {
                            "surah": 38,
                            "ayah": 65
                        },
                        {
                            "surah": 39,
                            "ayah": 1
                        },
                        {
                            "surah": 39,
                            "ayah": 10
                        },
                        {
                            "surah": 39,
                            "ayah": 22
                        },
                        {
                            "surah": 39,
                            "ayah": 32
                        },
                        {
                            "surah": 39,
                            "ayah": 42
                        },
                        {
                            "surah": 39,
                            "ayah": 53
                        },
                        {
                            "surah": 39,
                            "ayah": 64
                        },
                        {
                            "surah": 39,
                            "ayah": 71
                        },
                        {
                            "surah": 40,
                            "ayah": 1
                        },
                        {
                            "surah": 40,
                            "ayah": 10
                        },
                        {
                            "surah": 40,
                            "ayah": 21
                        },
                        {
                            "surah": 40,
                            "ayah": 28
                        },
                        {
                            "surah": 40,
                            "ayah": 38
                        },
                        {
                            "surah": 40,
                            "ayah": 51
                        },
                        {
                            "surah": 40,
                            "ayah": 61
                        },
                        {
                            "surah": 40,
                            "ayah": 69
                        },
                        {
                            "surah": 40,
                            "ayah": 79
                        },
                        {
                            "surah": 41,
                            "ayah": 1
                        },
                        {
                            "surah": 41,
                            "ayah": 9
                        },
                        {
                            "surah": 41,
                            "ayah": 19
                        },
                        {
                            "surah": 41,
                            "ayah": 26
                        },
                        {
                            "surah": 41,
                            "ayah": 33
                        },
                        {
                            "surah": 41,
                            "ayah": 45
                        },
                        {
                            "surah": 42,
                            "ayah": 1
                        },
                        {
                            "surah": 42,
                            "ayah": 10
                        },
                        {
                            "surah": 42,
                            "ayah": 20
                        },
                        {
                            "surah": 42,
                            "ayah": 30
                        },
                        {
                            "surah": 42,
                            "ayah": 44
                        },
                        {
                            "surah": 43,
                            "ayah": 1
                        },
                        {
                            "surah": 43,
                            "ayah": 16
                        },
                        {
                            "surah": 43,
                            "ayah": 26
                        },
                        {
                            "surah": 43,
                            "ayah": 36
                        },
                        {
                            "surah": 43,
                            "ayah": 46
                        },
                        {
                            "surah": 43,
                            "ayah": 57
                        },
                        {
                            "surah": 43,
                            "ayah": 68
                        },
                        {
                            "surah": 44,
                            "ayah": 1
                        },
                        {
                            "surah": 44,
                            "ayah": 30
                        },
                        {
                            "surah": 44,
                            "ayah": 43
                        },
                        {
                            "surah": 45,
                            "ayah": 1
                        },
                        {
                            "surah": 45,
                            "ayah": 12
                        },
                        {
                            "surah": 45,
                            "ayah": 22
                        },
                        {
                            "surah": 45,
                            "ayah": 27
                        },
                        {
                            "surah": 46,
                            "ayah": 1
                        },
                        {
                            "surah": 46,
                            "ayah": 11
                        },
                        {
                            "surah": 46,
                            "ayah": 21
                        },
                        {
                            "surah": 46,
                            "ayah": 27
                        },
                        {
                            "surah": 47,
                            "ayah": 1
                        },
                        {
                            "surah": 47,
                            "ayah": 12
                        },
                        {
                            "surah": 47,
                            "ayah": 20
                        },
                        {
                            "surah": 47,
                            "ayah": 29
                        },
                        {
                            "surah": 48,
                            "ayah": 1
                        },
                        {
                            "surah": 48,
                            "ayah": 11
                        },
                        {
                            "surah": 48,
                            "ayah": 18
                        },
                        {
                            "surah": 48,
                            "ayah": 27
                        },
                        {
                            "surah": 49,
                            "ayah": 1
                        },
                        {
                            "surah": 49,
                            "ayah": 11
                        },
                        {
                            "surah": 50,
                            "ayah": 1
                        },
                        {
                            "surah": 50,
                            "ayah": 16
                        },
                        {
                            "surah": 50,
                            "ayah": 30
                        },
                        {
                            "surah": 51,
                            "ayah": 1
                        },
                        {
                            "surah": 51,
                            "ayah": 24
                        },
                        {
                            "surah": 51,
                            "ayah": 47
                        },
                        {
                            "surah": 52,
                            "ayah": 1
                        },
                        {
                            "surah": 52,
                            "ayah": 29
                        },
                        {
                            "surah": 53,
                            "ayah": 1
                        },
                        {
                            "surah": 53,
                            "ayah": 26
                        },
                        {
                            "surah": 53,
                            "ayah": 33
                        },
                        {
                            "surah": 54,
                            "ayah": 1
                        },
                        {
                            "surah": 54,
                            "ayah": 23
                        },
                        {
                            "surah": 54,
                            "ayah": 41
                        },
                        {
                            "surah": 55,
                            "ayah": 1
                        },
                        {
                            "surah": 55,
                            "ayah": 26
                        },
                        {
                            "surah": 55,
                            "ayah": 46
                        },
                        {
                            "surah": 56,
                            "ayah": 1
                        },
                        {
                            "surah": 56,
                            "ayah": 39
                        },
                        {
                            "surah": 56,
                            "ayah": 75
                        },
                        {
                            "surah": 57,
                            "ayah": 1
                        },
                        {
                            "surah": 57,
                            "ayah": 11
                        },
                        {
                            "surah": 57,
                            "ayah": 20
                        },
                        {
                            "surah": 57,
                            "ayah": 26
                        },
                        {
                            "surah": 58,
                            "ayah": 1
                        },
                        {
                            "surah": 58,
                            "ayah": 7
                        },
                        {
                            "surah": 58,
                            "ayah": 14
                        },
                        {
                            "surah": 59,
                            "ayah": 1
                        },
                        {
                            "surah": 59,
                            "ayah": 11
                        },
                        {
                            "surah": 59,
                            "ayah": 18
                        },
                        {
                            "surah": 60,
                            "ayah": 1
                        },
                        {
                            "surah": 60,
                            "ayah": 7
                        },
                        {
                            "surah": 61,
                            "ayah": 1
                        },
                        {
                            "surah": 61,
                            "ayah": 10
                        },
                        {
                            "surah": 62,
                            "ayah": 1
                        },
                        {
                            "surah": 62,
                            "ayah": 9
                        },
                        {
                            "surah": 63,
                            "ayah": 1
                        },
                        {
                            "surah": 63,
                            "ayah": 9
                        },
                        {
                            "surah": 64,
                            "ayah": 1
                        },
                        {
                            "surah": 64,
                            "ayah": 11
                        },
                        {
                            "surah": 65,
                            "ayah": 1
                        },
                        {
                            "surah": 65,
                            "ayah": 8
                        },
                        {
                            "surah": 66,
                            "ayah": 1
                        },
                        {
                            "surah": 66,
                            "ayah": 8
                        },
                        {
                            "surah": 67,
                            "ayah": 1
                        },
                        {
                            "surah": 67,
                            "ayah": 15
                        },
                        {
                            "surah": 68,
                            "ayah": 1
                        },
                        {
                            "surah": 68,
                            "ayah": 34
                        },
                        {
                            "surah": 69,
                            "ayah": 1
                        },
                        {
                            "surah": 69,
                            "ayah": 38
                        },
                        {
                            "surah": 70,
                            "ayah": 1
                        },
                        {
                            "surah": 70,
                            "ayah": 36
                        },
                        {
                            "surah": 71,
                            "ayah": 1
                        },
                        {
                            "surah": 71,
                            "ayah": 21
                        },
                        {
                            "surah": 72,
                            "ayah": 1
                        },
                        {
                            "surah": 72,
                            "ayah": 20
                        },
                        {
                            "surah": 73,
                            "ayah": 1
                        },
                        {
                            "surah": 73,
                            "ayah": 20
                        },
                        {
                            "surah": 74,
                            "ayah": 1
                        },
                        {
                            "surah": 74,
                            "ayah": 32
                        },
                        {
                            "surah": 75,
                            "ayah": 1
                        },
                        {
                            "surah": 75,
                            "ayah": 31
                        },
                        {
                            "surah": 76,
                            "ayah": 1
                        },
                        {
                            "surah": 76,
                            "ayah": 23
                        },
                        {
                            "surah": 77,
                            "ayah": 1
                        },
                        {
                            "surah": 77,
                            "ayah": 41
                        },
                        {
                            "surah": 78,
                            "ayah": 1
                        },
                        {
                            "surah": 78,
                            "ayah": 31
                        },
                        {
                            "surah": 79,
                            "ayah": 1
                        },
                        {
                            "surah": 79,
                            "ayah": 27
                        },
                        {
                            "surah": 80,
                            "ayah": 1
                        },
                        {
                            "surah": 81,
                            "ayah": 1
                        },
                        {
                            "surah": 82,
                            "ayah": 1
                        },
                        {
                            "surah": 83,
                            "ayah": 1
                        },
                        {
                            "surah": 84,
                            "ayah": 1
                        },
                        {
                            "surah": 85,
                            "ayah": 1
                        },
                        {
                            "surah": 86,
                            "ayah": 1
                        },
                        {
                            "surah": 87,
                            "ayah": 1
                        },
                        {
                            "surah": 88,
                            "ayah": 1
                        },
                        {
                            "surah": 89,
                            "ayah": 1
                        },
                        {
                            "surah": 90,
                            "ayah": 1
                        },
                        {
                            "surah": 91,
                            "ayah": 1
                        },
                        {
                            "surah": 92,
                            "ayah": 1
                        },
                        {
                            "surah": 93,
                            "ayah": 1
                        },
                        {
                            "surah": 94,
                            "ayah": 1
                        },
                        {
                            "surah": 95,
                            "ayah": 1
                        },
                        {
                            "surah": 96,
                            "ayah": 1
                        },
                        {
                            "surah": 97,
                            "ayah": 1
                        },
                        {
                            "surah": 98,
                            "ayah": 1
                        },
                        {
                            "surah": 99,
                            "ayah": 1
                        },
                        {
                            "surah": 100,
                            "ayah": 1
                        },
                        {
                            "surah": 101,
                            "ayah": 1
                        },
                        {
                            "surah": 102,
                            "ayah": 1
                        },
                        {
                            "surah": 103,
                            "ayah": 1
                        },
                        {
                            "surah": 104,
                            "ayah": 1
                        },
                        {
                            "surah": 105,
                            "ayah": 1
                        },
                        {
                            "surah": 106,
                            "ayah": 1
                        },
                        {
                            "surah": 107,
                            "ayah": 1
                        },
                        {
                            "surah": 108,
                            "ayah": 1
                        },
                        {
                            "surah": 109,
                            "ayah": 1
                        },
                        {
                            "surah": 110,
                            "ayah": 1
                        },
                        {
                            "surah": 111,
                            "ayah": 1
                        },
                        {
                            "surah": 112,
                            "ayah": 1
                        },
                        {
                            "surah": 113,
                            "ayah": 1
                        },
                        {
                            "surah": 114,
                            "ayah": 1
                        }
                    ]
                },
                "pages": {
                    "count": 604,
                    "references": [
                        {
                            "surah": 1,
                            "ayah": 1
                        },
                        {
                            "surah": 2,
                            "ayah": 1
                        },
                        {
                            "surah": 2,
                            "ayah": 6
                        },
                        {
                            "surah": 2,
                            "ayah": 17
                        },
                        {
                            "surah": 2,
                            "ayah": 25
                        },
                        {
                            "surah": 2,
                            "ayah": 30
                        },
                        {
                            "surah": 2,
                            "ayah": 38
                        },
                        {
                            "surah": 2,
                            "ayah": 49
                        },
                        {
                            "surah": 2,
                            "ayah": 58
                        },
                        {
                            "surah": 2,
                            "ayah": 62
                        },
                        {
                            "surah": 2,
                            "ayah": 70
                        },
                        {
                            "surah": 2,
                            "ayah": 77
                        },
                        {
                            "surah": 2,
                            "ayah": 84
                        },
                        {
                            "surah": 2,
                            "ayah": 89
                        },
                        {
                            "surah": 2,
                            "ayah": 94
                        },
                        {
                            "surah": 2,
                            "ayah": 102
                        },
                        {
                            "surah": 2,
                            "ayah": 106
                        },
                        {
                            "surah": 2,
                            "ayah": 113
                        },
                        {
                            "surah": 2,
                            "ayah": 120
                        },
                        {
                            "surah": 2,
                            "ayah": 127
                        },
                        {
                            "surah": 2,
                            "ayah": 135
                        },
                        {
                            "surah": 2,
                            "ayah": 142
                        },
                        {
                            "surah": 2,
                            "ayah": 146
                        },
                        {
                            "surah": 2,
                            "ayah": 154
                        },
                        {
                            "surah": 2,
                            "ayah": 164
                        },
                        {
                            "surah": 2,
                            "ayah": 170
                        },
                        {
                            "surah": 2,
                            "ayah": 177
                        },
                        {
                            "surah": 2,
                            "ayah": 182
                        },
                        {
                            "surah": 2,
                            "ayah": 187
                        },
                        {
                            "surah": 2,
                            "ayah": 191
                        },
                        {
                            "surah": 2,
                            "ayah": 197
                        },
                        {
                            "surah": 2,
                            "ayah": 203
                        },
                        {
                            "surah": 2,
                            "ayah": 211
                        },
                        {
                            "surah": 2,
                            "ayah": 216
                        },
                        {
                            "surah": 2,
                            "ayah": 220
                        },
                        {
                            "surah": 2,
                            "ayah": 225
                        },
                        {
                            "surah": 2,
                            "ayah": 231
                        },
                        {
                            "surah": 2,
                            "ayah": 234
                        },
                        {
                            "surah": 2,
                            "ayah": 238
                        },
                        {
                            "surah": 2,
                            "ayah": 246
                        },
                        {
                            "surah": 2,
                            "ayah": 249
                        },
                        {
                            "surah": 2,
                            "ayah": 253
                        },
                        {
                            "surah": 2,
                            "ayah": 257
                        },
                        {
                            "surah": 2,
                            "ayah": 260
                        },
                        {
                            "surah": 2,
                            "ayah": 265
                        },
                        {
                            "surah": 2,
                            "ayah": 270
                        },
                        {
                            "surah": 2,
                            "ayah": 275
                        },
                        {
                            "surah": 2,
                            "ayah": 282
                        },
                        {
                            "surah": 2,
                            "ayah": 283
                        },
                        {
                            "surah": 3,
                            "ayah": 1
                        },
                        {
                            "surah": 3,
                            "ayah": 10
                        },
                        {
                            "surah": 3,
                            "ayah": 16
                        },
                        {
                            "surah": 3,
                            "ayah": 23
                        },
                        {
                            "surah": 3,
                            "ayah": 30
                        },
                        {
                            "surah": 3,
                            "ayah": 38
                        },
                        {
                            "surah": 3,
                            "ayah": 46
                        },
                        {
                            "surah": 3,
                            "ayah": 53
                        },
                        {
                            "surah": 3,
                            "ayah": 62
                        },
                        {
                            "surah": 3,
                            "ayah": 71
                        },
                        {
                            "surah": 3,
                            "ayah": 78
                        },
                        {
                            "surah": 3,
                            "ayah": 84
                        },
                        {
                            "surah": 3,
                            "ayah": 92
                        },
                        {
                            "surah": 3,
                            "ayah": 101
                        },
                        {
                            "surah": 3,
                            "ayah": 109
                        },
                        {
                            "surah": 3,
                            "ayah": 116
                        },
                        {
                            "surah": 3,
                            "ayah": 122
                        },
                        {
                            "surah": 3,
                            "ayah": 133
                        },
                        {
                            "surah": 3,
                            "ayah": 141
                        },
                        {
                            "surah": 3,
                            "ayah": 149
                        },
                        {
                            "surah": 3,
                            "ayah": 154
                        },
                        {
                            "surah": 3,
                            "ayah": 158
                        },
                        {
                            "surah": 3,
                            "ayah": 166
                        },
                        {
                            "surah": 3,
                            "ayah": 174
                        },
                        {
                            "surah": 3,
                            "ayah": 181
                        },
                        {
                            "surah": 3,
                            "ayah": 187
                        },
                        {
                            "surah": 3,
                            "ayah": 195
                        },
                        {
                            "surah": 4,
                            "ayah": 1
                        },
                        {
                            "surah": 4,
                            "ayah": 7
                        },
                        {
                            "surah": 4,
                            "ayah": 12
                        },
                        {
                            "surah": 4,
                            "ayah": 15
                        },
                        {
                            "surah": 4,
                            "ayah": 20
                        },
                        {
                            "surah": 4,
                            "ayah": 24
                        },
                        {
                            "surah": 4,
                            "ayah": 27
                        },
                        {
                            "surah": 4,
                            "ayah": 34
                        },
                        {
                            "surah": 4,
                            "ayah": 38
                        },
                        {
                            "surah": 4,
                            "ayah": 45
                        },
                        {
                            "surah": 4,
                            "ayah": 52
                        },
                        {
                            "surah": 4,
                            "ayah": 60
                        },
                        {
                            "surah": 4,
                            "ayah": 66
                        },
                        {
                            "surah": 4,
                            "ayah": 75
                        },
                        {
                            "surah": 4,
                            "ayah": 80
                        },
                        {
                            "surah": 4,
                            "ayah": 87
                        },
                        {
                            "surah": 4,
                            "ayah": 92
                        },
                        {
                            "surah": 4,
                            "ayah": 95
                        },
                        {
                            "surah": 4,
                            "ayah": 102
                        },
                        {
                            "surah": 4,
                            "ayah": 106
                        },
                        {
                            "surah": 4,
                            "ayah": 114
                        },
                        {
                            "surah": 4,
                            "ayah": 122
                        },
                        {
                            "surah": 4,
                            "ayah": 128
                        },
                        {
                            "surah": 4,
                            "ayah": 135
                        },
                        {
                            "surah": 4,
                            "ayah": 141
                        },
                        {
                            "surah": 4,
                            "ayah": 148
                        },
                        {
                            "surah": 4,
                            "ayah": 155
                        },
                        {
                            "surah": 4,
                            "ayah": 163
                        },
                        {
                            "surah": 4,
                            "ayah": 171
                        },
                        {
                            "surah": 4,
                            "ayah": 176
                        },
                        {
                            "surah": 5,
                            "ayah": 3
                        },
                        {
                            "surah": 5,
                            "ayah": 6
                        },
                        {
                            "surah": 5,
                            "ayah": 10
                        },
                        {
                            "surah": 5,
                            "ayah": 14
                        },
                        {
                            "surah": 5,
                            "ayah": 18
                        },
                        {
                            "surah": 5,
                            "ayah": 24
                        },
                        {
                            "surah": 5,
                            "ayah": 32
                        },
                        {
                            "surah": 5,
                            "ayah": 37
                        },
                        {
                            "surah": 5,
                            "ayah": 42
                        },
                        {
                            "surah": 5,
                            "ayah": 46
                        },
                        {
                            "surah": 5,
                            "ayah": 51
                        },
                        {
                            "surah": 5,
                            "ayah": 58
                        },
                        {
                            "surah": 5,
                            "ayah": 65
                        },
                        {
                            "surah": 5,
                            "ayah": 71
                        },
                        {
                            "surah": 5,
                            "ayah": 77
                        },
                        {
                            "surah": 5,
                            "ayah": 83
                        },
                        {
                            "surah": 5,
                            "ayah": 90
                        },
                        {
                            "surah": 5,
                            "ayah": 96
                        },
                        {
                            "surah": 5,
                            "ayah": 104
                        },
                        {
                            "surah": 5,
                            "ayah": 109
                        },
                        {
                            "surah": 5,
                            "ayah": 114
                        },
                        {
                            "surah": 6,
                            "ayah": 1
                        },
                        {
                            "surah": 6,
                            "ayah": 9
                        },
                        {
                            "surah": 6,
                            "ayah": 19
                        },
                        {
                            "surah": 6,
                            "ayah": 28
                        },
                        {
                            "surah": 6,
                            "ayah": 36
                        },
                        {
                            "surah": 6,
                            "ayah": 45
                        },
                        {
                            "surah": 6,
                            "ayah": 53
                        },
                        {
                            "surah": 6,
                            "ayah": 60
                        },
                        {
                            "surah": 6,
                            "ayah": 69
                        },
                        {
                            "surah": 6,
                            "ayah": 74
                        },
                        {
                            "surah": 6,
                            "ayah": 82
                        },
                        {
                            "surah": 6,
                            "ayah": 91
                        },
                        {
                            "surah": 6,
                            "ayah": 95
                        },
                        {
                            "surah": 6,
                            "ayah": 102
                        },
                        {
                            "surah": 6,
                            "ayah": 111
                        },
                        {
                            "surah": 6,
                            "ayah": 119
                        },
                        {
                            "surah": 6,
                            "ayah": 125
                        },
                        {
                            "surah": 6,
                            "ayah": 132
                        },
                        {
                            "surah": 6,
                            "ayah": 138
                        },
                        {
                            "surah": 6,
                            "ayah": 143
                        },
                        {
                            "surah": 6,
                            "ayah": 147
                        },
                        {
                            "surah": 6,
                            "ayah": 152
                        },
                        {
                            "surah": 6,
                            "ayah": 158
                        },
                        {
                            "surah": 7,
                            "ayah": 1
                        },
                        {
                            "surah": 7,
                            "ayah": 12
                        },
                        {
                            "surah": 7,
                            "ayah": 23
                        },
                        {
                            "surah": 7,
                            "ayah": 31
                        },
                        {
                            "surah": 7,
                            "ayah": 38
                        },
                        {
                            "surah": 7,
                            "ayah": 44
                        },
                        {
                            "surah": 7,
                            "ayah": 52
                        },
                        {
                            "surah": 7,
                            "ayah": 58
                        },
                        {
                            "surah": 7,
                            "ayah": 68
                        },
                        {
                            "surah": 7,
                            "ayah": 74
                        },
                        {
                            "surah": 7,
                            "ayah": 82
                        },
                        {
                            "surah": 7,
                            "ayah": 88
                        },
                        {
                            "surah": 7,
                            "ayah": 96
                        },
                        {
                            "surah": 7,
                            "ayah": 105
                        },
                        {
                            "surah": 7,
                            "ayah": 121
                        },
                        {
                            "surah": 7,
                            "ayah": 131
                        },
                        {
                            "surah": 7,
                            "ayah": 138
                        },
                        {
                            "surah": 7,
                            "ayah": 144
                        },
                        {
                            "surah": 7,
                            "ayah": 150
                        },
                        {
                            "surah": 7,
                            "ayah": 156
                        },
                        {
                            "surah": 7,
                            "ayah": 160
                        },
                        {
                            "surah": 7,
                            "ayah": 164
                        },
                        {
                            "surah": 7,
                            "ayah": 171
                        },
                        {
                            "surah": 7,
                            "ayah": 179
                        },
                        {
                            "surah": 7,
                            "ayah": 188
                        },
                        {
                            "surah": 7,
                            "ayah": 196
                        },
                        {
                            "surah": 8,
                            "ayah": 1
                        },
                        {
                            "surah": 8,
                            "ayah": 9
                        },
                        {
                            "surah": 8,
                            "ayah": 17
                        },
                        {
                            "surah": 8,
                            "ayah": 26
                        },
                        {
                            "surah": 8,
                            "ayah": 34
                        },
                        {
                            "surah": 8,
                            "ayah": 41
                        },
                        {
                            "surah": 8,
                            "ayah": 46
                        },
                        {
                            "surah": 8,
                            "ayah": 53
                        },
                        {
                            "surah": 8,
                            "ayah": 62
                        },
                        {
                            "surah": 8,
                            "ayah": 70
                        },
                        {
                            "surah": 9,
                            "ayah": 1
                        },
                        {
                            "surah": 9,
                            "ayah": 7
                        },
                        {
                            "surah": 9,
                            "ayah": 14
                        },
                        {
                            "surah": 9,
                            "ayah": 21
                        },
                        {
                            "surah": 9,
                            "ayah": 27
                        },
                        {
                            "surah": 9,
                            "ayah": 32
                        },
                        {
                            "surah": 9,
                            "ayah": 37
                        },
                        {
                            "surah": 9,
                            "ayah": 41
                        },
                        {
                            "surah": 9,
                            "ayah": 48
                        },
                        {
                            "surah": 9,
                            "ayah": 55
                        },
                        {
                            "surah": 9,
                            "ayah": 62
                        },
                        {
                            "surah": 9,
                            "ayah": 69
                        },
                        {
                            "surah": 9,
                            "ayah": 73
                        },
                        {
                            "surah": 9,
                            "ayah": 80
                        },
                        {
                            "surah": 9,
                            "ayah": 87
                        },
                        {
                            "surah": 9,
                            "ayah": 94
                        },
                        {
                            "surah": 9,
                            "ayah": 100
                        },
                        {
                            "surah": 9,
                            "ayah": 107
                        },
                        {
                            "surah": 9,
                            "ayah": 112
                        },
                        {
                            "surah": 9,
                            "ayah": 118
                        },
                        {
                            "surah": 9,
                            "ayah": 123
                        },
                        {
                            "surah": 10,
                            "ayah": 1
                        },
                        {
                            "surah": 10,
                            "ayah": 7
                        },
                        {
                            "surah": 10,
                            "ayah": 15
                        },
                        {
                            "surah": 10,
                            "ayah": 21
                        },
                        {
                            "surah": 10,
                            "ayah": 26
                        },
                        {
                            "surah": 10,
                            "ayah": 34
                        },
                        {
                            "surah": 10,
                            "ayah": 43
                        },
                        {
                            "surah": 10,
                            "ayah": 54
                        },
                        {
                            "surah": 10,
                            "ayah": 62
                        },
                        {
                            "surah": 10,
                            "ayah": 71
                        },
                        {
                            "surah": 10,
                            "ayah": 79
                        },
                        {
                            "surah": 10,
                            "ayah": 89
                        },
                        {
                            "surah": 10,
                            "ayah": 98
                        },
                        {
                            "surah": 10,
                            "ayah": 107
                        },
                        {
                            "surah": 11,
                            "ayah": 6
                        },
                        {
                            "surah": 11,
                            "ayah": 13
                        },
                        {
                            "surah": 11,
                            "ayah": 20
                        },
                        {
                            "surah": 11,
                            "ayah": 29
                        },
                        {
                            "surah": 11,
                            "ayah": 38
                        },
                        {
                            "surah": 11,
                            "ayah": 46
                        },
                        {
                            "surah": 11,
                            "ayah": 54
                        },
                        {
                            "surah": 11,
                            "ayah": 63
                        },
                        {
                            "surah": 11,
                            "ayah": 72
                        },
                        {
                            "surah": 11,
                            "ayah": 82
                        },
                        {
                            "surah": 11,
                            "ayah": 89
                        },
                        {
                            "surah": 11,
                            "ayah": 98
                        },
                        {
                            "surah": 11,
                            "ayah": 109
                        },
                        {
                            "surah": 11,
                            "ayah": 118
                        },
                        {
                            "surah": 12,
                            "ayah": 5
                        },
                        {
                            "surah": 12,
                            "ayah": 15
                        },
                        {
                            "surah": 12,
                            "ayah": 23
                        },
                        {
                            "surah": 12,
                            "ayah": 31
                        },
                        {
                            "surah": 12,
                            "ayah": 38
                        },
                        {
                            "surah": 12,
                            "ayah": 44
                        },
                        {
                            "surah": 12,
                            "ayah": 53
                        },
                        {
                            "surah": 12,
                            "ayah": 64
                        },
                        {
                            "surah": 12,
                            "ayah": 70
                        },
                        {
                            "surah": 12,
                            "ayah": 79
                        },
                        {
                            "surah": 12,
                            "ayah": 87
                        },
                        {
                            "surah": 12,
                            "ayah": 96
                        },
                        {
                            "surah": 12,
                            "ayah": 104
                        },
                        {
                            "surah": 13,
                            "ayah": 1
                        },
                        {
                            "surah": 13,
                            "ayah": 6
                        },
                        {
                            "surah": 13,
                            "ayah": 14
                        },
                        {
                            "surah": 13,
                            "ayah": 19
                        },
                        {
                            "surah": 13,
                            "ayah": 29
                        },
                        {
                            "surah": 13,
                            "ayah": 35
                        },
                        {
                            "surah": 13,
                            "ayah": 43
                        },
                        {
                            "surah": 14,
                            "ayah": 6
                        },
                        {
                            "surah": 14,
                            "ayah": 11
                        },
                        {
                            "surah": 14,
                            "ayah": 19
                        },
                        {
                            "surah": 14,
                            "ayah": 25
                        },
                        {
                            "surah": 14,
                            "ayah": 34
                        },
                        {
                            "surah": 14,
                            "ayah": 43
                        },
                        {
                            "surah": 15,
                            "ayah": 1
                        },
                        {
                            "surah": 15,
                            "ayah": 16
                        },
                        {
                            "surah": 15,
                            "ayah": 32
                        },
                        {
                            "surah": 15,
                            "ayah": 52
                        },
                        {
                            "surah": 15,
                            "ayah": 71
                        },
                        {
                            "surah": 15,
                            "ayah": 91
                        },
                        {
                            "surah": 16,
                            "ayah": 7
                        },
                        {
                            "surah": 16,
                            "ayah": 15
                        },
                        {
                            "surah": 16,
                            "ayah": 27
                        },
                        {
                            "surah": 16,
                            "ayah": 35
                        },
                        {
                            "surah": 16,
                            "ayah": 43
                        },
                        {
                            "surah": 16,
                            "ayah": 55
                        },
                        {
                            "surah": 16,
                            "ayah": 65
                        },
                        {
                            "surah": 16,
                            "ayah": 73
                        },
                        {
                            "surah": 16,
                            "ayah": 80
                        },
                        {
                            "surah": 16,
                            "ayah": 88
                        },
                        {
                            "surah": 16,
                            "ayah": 94
                        },
                        {
                            "surah": 16,
                            "ayah": 103
                        },
                        {
                            "surah": 16,
                            "ayah": 111
                        },
                        {
                            "surah": 16,
                            "ayah": 119
                        },
                        {
                            "surah": 17,
                            "ayah": 1
                        },
                        {
                            "surah": 17,
                            "ayah": 8
                        },
                        {
                            "surah": 17,
                            "ayah": 18
                        },
                        {
                            "surah": 17,
                            "ayah": 28
                        },
                        {
                            "surah": 17,
                            "ayah": 39
                        },
                        {
                            "surah": 17,
                            "ayah": 50
                        },
                        {
                            "surah": 17,
                            "ayah": 59
                        },
                        {
                            "surah": 17,
                            "ayah": 67
                        },
                        {
                            "surah": 17,
                            "ayah": 76
                        },
                        {
                            "surah": 17,
                            "ayah": 87
                        },
                        {
                            "surah": 17,
                            "ayah": 97
                        },
                        {
                            "surah": 17,
                            "ayah": 105
                        },
                        {
                            "surah": 18,
                            "ayah": 5
                        },
                        {
                            "surah": 18,
                            "ayah": 16
                        },
                        {
                            "surah": 18,
                            "ayah": 21
                        },
                        {
                            "surah": 18,
                            "ayah": 28
                        },
                        {
                            "surah": 18,
                            "ayah": 35
                        },
                        {
                            "surah": 18,
                            "ayah": 46
                        },
                        {
                            "surah": 18,
                            "ayah": 54
                        },
                        {
                            "surah": 18,
                            "ayah": 62
                        },
                        {
                            "surah": 18,
                            "ayah": 75
                        },
                        {
                            "surah": 18,
                            "ayah": 84
                        },
                        {
                            "surah": 18,
                            "ayah": 98
                        },
                        {
                            "surah": 19,
                            "ayah": 1
                        },
                        {
                            "surah": 19,
                            "ayah": 12
                        },
                        {
                            "surah": 19,
                            "ayah": 26
                        },
                        {
                            "surah": 19,
                            "ayah": 39
                        },
                        {
                            "surah": 19,
                            "ayah": 52
                        },
                        {
                            "surah": 19,
                            "ayah": 65
                        },
                        {
                            "surah": 19,
                            "ayah": 77
                        },
                        {
                            "surah": 19,
                            "ayah": 96
                        },
                        {
                            "surah": 20,
                            "ayah": 13
                        },
                        {
                            "surah": 20,
                            "ayah": 38
                        },
                        {
                            "surah": 20,
                            "ayah": 52
                        },
                        {
                            "surah": 20,
                            "ayah": 65
                        },
                        {
                            "surah": 20,
                            "ayah": 77
                        },
                        {
                            "surah": 20,
                            "ayah": 88
                        },
                        {
                            "surah": 20,
                            "ayah": 99
                        },
                        {
                            "surah": 20,
                            "ayah": 114
                        },
                        {
                            "surah": 20,
                            "ayah": 126
                        },
                        {
                            "surah": 21,
                            "ayah": 1
                        },
                        {
                            "surah": 21,
                            "ayah": 11
                        },
                        {
                            "surah": 21,
                            "ayah": 25
                        },
                        {
                            "surah": 21,
                            "ayah": 36
                        },
                        {
                            "surah": 21,
                            "ayah": 45
                        },
                        {
                            "surah": 21,
                            "ayah": 58
                        },
                        {
                            "surah": 21,
                            "ayah": 73
                        },
                        {
                            "surah": 21,
                            "ayah": 82
                        },
                        {
                            "surah": 21,
                            "ayah": 91
                        },
                        {
                            "surah": 21,
                            "ayah": 102
                        },
                        {
                            "surah": 22,
                            "ayah": 1
                        },
                        {
                            "surah": 22,
                            "ayah": 6
                        },
                        {
                            "surah": 22,
                            "ayah": 16
                        },
                        {
                            "surah": 22,
                            "ayah": 24
                        },
                        {
                            "surah": 22,
                            "ayah": 31
                        },
                        {
                            "surah": 22,
                            "ayah": 39
                        },
                        {
                            "surah": 22,
                            "ayah": 47
                        },
                        {
                            "surah": 22,
                            "ayah": 56
                        },
                        {
                            "surah": 22,
                            "ayah": 65
                        },
                        {
                            "surah": 22,
                            "ayah": 73
                        },
                        {
                            "surah": 23,
                            "ayah": 1
                        },
                        {
                            "surah": 23,
                            "ayah": 18
                        },
                        {
                            "surah": 23,
                            "ayah": 28
                        },
                        {
                            "surah": 23,
                            "ayah": 43
                        },
                        {
                            "surah": 23,
                            "ayah": 60
                        },
                        {
                            "surah": 23,
                            "ayah": 75
                        },
                        {
                            "surah": 23,
                            "ayah": 90
                        },
                        {
                            "surah": 23,
                            "ayah": 105
                        },
                        {
                            "surah": 24,
                            "ayah": 1
                        },
                        {
                            "surah": 24,
                            "ayah": 11
                        },
                        {
                            "surah": 24,
                            "ayah": 21
                        },
                        {
                            "surah": 24,
                            "ayah": 28
                        },
                        {
                            "surah": 24,
                            "ayah": 32
                        },
                        {
                            "surah": 24,
                            "ayah": 37
                        },
                        {
                            "surah": 24,
                            "ayah": 44
                        },
                        {
                            "surah": 24,
                            "ayah": 54
                        },
                        {
                            "surah": 24,
                            "ayah": 59
                        },
                        {
                            "surah": 24,
                            "ayah": 62
                        },
                        {
                            "surah": 25,
                            "ayah": 3
                        },
                        {
                            "surah": 25,
                            "ayah": 12
                        },
                        {
                            "surah": 25,
                            "ayah": 21
                        },
                        {
                            "surah": 25,
                            "ayah": 33
                        },
                        {
                            "surah": 25,
                            "ayah": 44
                        },
                        {
                            "surah": 25,
                            "ayah": 56
                        },
                        {
                            "surah": 25,
                            "ayah": 68
                        },
                        {
                            "surah": 26,
                            "ayah": 1
                        },
                        {
                            "surah": 26,
                            "ayah": 20
                        },
                        {
                            "surah": 26,
                            "ayah": 40
                        },
                        {
                            "surah": 26,
                            "ayah": 61
                        },
                        {
                            "surah": 26,
                            "ayah": 84
                        },
                        {
                            "surah": 26,
                            "ayah": 112
                        },
                        {
                            "surah": 26,
                            "ayah": 137
                        },
                        {
                            "surah": 26,
                            "ayah": 160
                        },
                        {
                            "surah": 26,
                            "ayah": 184
                        },
                        {
                            "surah": 26,
                            "ayah": 207
                        },
                        {
                            "surah": 27,
                            "ayah": 1
                        },
                        {
                            "surah": 27,
                            "ayah": 14
                        },
                        {
                            "surah": 27,
                            "ayah": 23
                        },
                        {
                            "surah": 27,
                            "ayah": 36
                        },
                        {
                            "surah": 27,
                            "ayah": 45
                        },
                        {
                            "surah": 27,
                            "ayah": 56
                        },
                        {
                            "surah": 27,
                            "ayah": 64
                        },
                        {
                            "surah": 27,
                            "ayah": 77
                        },
                        {
                            "surah": 27,
                            "ayah": 89
                        },
                        {
                            "surah": 28,
                            "ayah": 6
                        },
                        {
                            "surah": 28,
                            "ayah": 14
                        },
                        {
                            "surah": 28,
                            "ayah": 22
                        },
                        {
                            "surah": 28,
                            "ayah": 29
                        },
                        {
                            "surah": 28,
                            "ayah": 36
                        },
                        {
                            "surah": 28,
                            "ayah": 44
                        },
                        {
                            "surah": 28,
                            "ayah": 51
                        },
                        {
                            "surah": 28,
                            "ayah": 60
                        },
                        {
                            "surah": 28,
                            "ayah": 71
                        },
                        {
                            "surah": 28,
                            "ayah": 78
                        },
                        {
                            "surah": 28,
                            "ayah": 85
                        },
                        {
                            "surah": 29,
                            "ayah": 7
                        },
                        {
                            "surah": 29,
                            "ayah": 15
                        },
                        {
                            "surah": 29,
                            "ayah": 24
                        },
                        {
                            "surah": 29,
                            "ayah": 31
                        },
                        {
                            "surah": 29,
                            "ayah": 39
                        },
                        {
                            "surah": 29,
                            "ayah": 46
                        },
                        {
                            "surah": 29,
                            "ayah": 53
                        },
                        {
                            "surah": 29,
                            "ayah": 64
                        },
                        {
                            "surah": 30,
                            "ayah": 6
                        },
                        {
                            "surah": 30,
                            "ayah": 16
                        },
                        {
                            "surah": 30,
                            "ayah": 25
                        },
                        {
                            "surah": 30,
                            "ayah": 33
                        },
                        {
                            "surah": 30,
                            "ayah": 42
                        },
                        {
                            "surah": 30,
                            "ayah": 51
                        },
                        {
                            "surah": 31,
                            "ayah": 1
                        },
                        {
                            "surah": 31,
                            "ayah": 12
                        },
                        {
                            "surah": 31,
                            "ayah": 20
                        },
                        {
                            "surah": 31,
                            "ayah": 29
                        },
                        {
                            "surah": 32,
                            "ayah": 1
                        },
                        {
                            "surah": 32,
                            "ayah": 12
                        },
                        {
                            "surah": 32,
                            "ayah": 21
                        },
                        {
                            "surah": 33,
                            "ayah": 1
                        },
                        {
                            "surah": 33,
                            "ayah": 7
                        },
                        {
                            "surah": 33,
                            "ayah": 16
                        },
                        {
                            "surah": 33,
                            "ayah": 23
                        },
                        {
                            "surah": 33,
                            "ayah": 31
                        },
                        {
                            "surah": 33,
                            "ayah": 36
                        },
                        {
                            "surah": 33,
                            "ayah": 44
                        },
                        {
                            "surah": 33,
                            "ayah": 51
                        },
                        {
                            "surah": 33,
                            "ayah": 55
                        },
                        {
                            "surah": 33,
                            "ayah": 63
                        },
                        {
                            "surah": 34,
                            "ayah": 1
                        },
                        {
                            "surah": 34,
                            "ayah": 8
                        },
                        {
                            "surah": 34,
                            "ayah": 15
                        },
                        {
                            "surah": 34,
                            "ayah": 23
                        },
                        {
                            "surah": 34,
                            "ayah": 32
                        },
                        {
                            "surah": 34,
                            "ayah": 40
                        },
                        {
                            "surah": 34,
                            "ayah": 49
                        },
                        {
                            "surah": 35,
                            "ayah": 4
                        },
                        {
                            "surah": 35,
                            "ayah": 12
                        },
                        {
                            "surah": 35,
                            "ayah": 19
                        },
                        {
                            "surah": 35,
                            "ayah": 31
                        },
                        {
                            "surah": 35,
                            "ayah": 39
                        },
                        {
                            "surah": 35,
                            "ayah": 45
                        },
                        {
                            "surah": 36,
                            "ayah": 13
                        },
                        {
                            "surah": 36,
                            "ayah": 28
                        },
                        {
                            "surah": 36,
                            "ayah": 41
                        },
                        {
                            "surah": 36,
                            "ayah": 55
                        },
                        {
                            "surah": 36,
                            "ayah": 71
                        },
                        {
                            "surah": 37,
                            "ayah": 1
                        },
                        {
                            "surah": 37,
                            "ayah": 25
                        },
                        {
                            "surah": 37,
                            "ayah": 52
                        },
                        {
                            "surah": 37,
                            "ayah": 77
                        },
                        {
                            "surah": 37,
                            "ayah": 103
                        },
                        {
                            "surah": 37,
                            "ayah": 127
                        },
                        {
                            "surah": 37,
                            "ayah": 154
                        },
                        {
                            "surah": 38,
                            "ayah": 1
                        },
                        {
                            "surah": 38,
                            "ayah": 17
                        },
                        {
                            "surah": 38,
                            "ayah": 27
                        },
                        {
                            "surah": 38,
                            "ayah": 43
                        },
                        {
                            "surah": 38,
                            "ayah": 62
                        },
                        {
                            "surah": 38,
                            "ayah": 84
                        },
                        {
                            "surah": 39,
                            "ayah": 6
                        },
                        {
                            "surah": 39,
                            "ayah": 11
                        },
                        {
                            "surah": 39,
                            "ayah": 22
                        },
                        {
                            "surah": 39,
                            "ayah": 32
                        },
                        {
                            "surah": 39,
                            "ayah": 41
                        },
                        {
                            "surah": 39,
                            "ayah": 48
                        },
                        {
                            "surah": 39,
                            "ayah": 57
                        },
                        {
                            "surah": 39,
                            "ayah": 68
                        },
                        {
                            "surah": 39,
                            "ayah": 75
                        },
                        {
                            "surah": 40,
                            "ayah": 8
                        },
                        {
                            "surah": 40,
                            "ayah": 17
                        },
                        {
                            "surah": 40,
                            "ayah": 26
                        },
                        {
                            "surah": 40,
                            "ayah": 34
                        },
                        {
                            "surah": 40,
                            "ayah": 41
                        },
                        {
                            "surah": 40,
                            "ayah": 50
                        },
                        {
                            "surah": 40,
                            "ayah": 59
                        },
                        {
                            "surah": 40,
                            "ayah": 67
                        },
                        {
                            "surah": 40,
                            "ayah": 78
                        },
                        {
                            "surah": 41,
                            "ayah": 1
                        },
                        {
                            "surah": 41,
                            "ayah": 12
                        },
                        {
                            "surah": 41,
                            "ayah": 21
                        },
                        {
                            "surah": 41,
                            "ayah": 30
                        },
                        {
                            "surah": 41,
                            "ayah": 39
                        },
                        {
                            "surah": 41,
                            "ayah": 47
                        },
                        {
                            "surah": 42,
                            "ayah": 1
                        },
                        {
                            "surah": 42,
                            "ayah": 11
                        },
                        {
                            "surah": 42,
                            "ayah": 16
                        },
                        {
                            "surah": 42,
                            "ayah": 23
                        },
                        {
                            "surah": 42,
                            "ayah": 32
                        },
                        {
                            "surah": 42,
                            "ayah": 45
                        },
                        {
                            "surah": 42,
                            "ayah": 52
                        },
                        {
                            "surah": 43,
                            "ayah": 11
                        },
                        {
                            "surah": 43,
                            "ayah": 23
                        },
                        {
                            "surah": 43,
                            "ayah": 34
                        },
                        {
                            "surah": 43,
                            "ayah": 48
                        },
                        {
                            "surah": 43,
                            "ayah": 61
                        },
                        {
                            "surah": 43,
                            "ayah": 74
                        },
                        {
                            "surah": 44,
                            "ayah": 1
                        },
                        {
                            "surah": 44,
                            "ayah": 19
                        },
                        {
                            "surah": 44,
                            "ayah": 40
                        },
                        {
                            "surah": 45,
                            "ayah": 1
                        },
                        {
                            "surah": 45,
                            "ayah": 14
                        },
                        {
                            "surah": 45,
                            "ayah": 23
                        },
                        {
                            "surah": 45,
                            "ayah": 33
                        },
                        {
                            "surah": 46,
                            "ayah": 6
                        },
                        {
                            "surah": 46,
                            "ayah": 15
                        },
                        {
                            "surah": 46,
                            "ayah": 21
                        },
                        {
                            "surah": 46,
                            "ayah": 29
                        },
                        {
                            "surah": 47,
                            "ayah": 1
                        },
                        {
                            "surah": 47,
                            "ayah": 12
                        },
                        {
                            "surah": 47,
                            "ayah": 20
                        },
                        {
                            "surah": 47,
                            "ayah": 30
                        },
                        {
                            "surah": 48,
                            "ayah": 1
                        },
                        {
                            "surah": 48,
                            "ayah": 10
                        },
                        {
                            "surah": 48,
                            "ayah": 16
                        },
                        {
                            "surah": 48,
                            "ayah": 24
                        },
                        {
                            "surah": 48,
                            "ayah": 29
                        },
                        {
                            "surah": 49,
                            "ayah": 5
                        },
                        {
                            "surah": 49,
                            "ayah": 12
                        },
                        {
                            "surah": 50,
                            "ayah": 1
                        },
                        {
                            "surah": 50,
                            "ayah": 16
                        },
                        {
                            "surah": 50,
                            "ayah": 36
                        },
                        {
                            "surah": 51,
                            "ayah": 7
                        },
                        {
                            "surah": 51,
                            "ayah": 31
                        },
                        {
                            "surah": 51,
                            "ayah": 52
                        },
                        {
                            "surah": 52,
                            "ayah": 15
                        },
                        {
                            "surah": 52,
                            "ayah": 32
                        },
                        {
                            "surah": 53,
                            "ayah": 1
                        },
                        {
                            "surah": 53,
                            "ayah": 27
                        },
                        {
                            "surah": 53,
                            "ayah": 45
                        },
                        {
                            "surah": 54,
                            "ayah": 7
                        },
                        {
                            "surah": 54,
                            "ayah": 28
                        },
                        {
                            "surah": 54,
                            "ayah": 50
                        },
                        {
                            "surah": 55,
                            "ayah": 17
                        },
                        {
                            "surah": 55,
                            "ayah": 41
                        },
                        {
                            "surah": 55,
                            "ayah": 68
                        },
                        {
                            "surah": 56,
                            "ayah": 17
                        },
                        {
                            "surah": 56,
                            "ayah": 51
                        },
                        {
                            "surah": 56,
                            "ayah": 77
                        },
                        {
                            "surah": 57,
                            "ayah": 4
                        },
                        {
                            "surah": 57,
                            "ayah": 12
                        },
                        {
                            "surah": 57,
                            "ayah": 19
                        },
                        {
                            "surah": 57,
                            "ayah": 25
                        },
                        {
                            "surah": 58,
                            "ayah": 1
                        },
                        {
                            "surah": 58,
                            "ayah": 7
                        },
                        {
                            "surah": 58,
                            "ayah": 12
                        },
                        {
                            "surah": 58,
                            "ayah": 22
                        },
                        {
                            "surah": 59,
                            "ayah": 4
                        },
                        {
                            "surah": 59,
                            "ayah": 10
                        },
                        {
                            "surah": 59,
                            "ayah": 17
                        },
                        {
                            "surah": 60,
                            "ayah": 1
                        },
                        {
                            "surah": 60,
                            "ayah": 6
                        },
                        {
                            "surah": 60,
                            "ayah": 12
                        },
                        {
                            "surah": 61,
                            "ayah": 6
                        },
                        {
                            "surah": 62,
                            "ayah": 1
                        },
                        {
                            "surah": 62,
                            "ayah": 9
                        },
                        {
                            "surah": 63,
                            "ayah": 5
                        },
                        {
                            "surah": 64,
                            "ayah": 1
                        },
                        {
                            "surah": 64,
                            "ayah": 10
                        },
                        {
                            "surah": 65,
                            "ayah": 1
                        },
                        {
                            "surah": 65,
                            "ayah": 6
                        },
                        {
                            "surah": 66,
                            "ayah": 1
                        },
                        {
                            "surah": 66,
                            "ayah": 8
                        },
                        {
                            "surah": 67,
                            "ayah": 1
                        },
                        {
                            "surah": 67,
                            "ayah": 13
                        },
                        {
                            "surah": 67,
                            "ayah": 27
                        },
                        {
                            "surah": 68,
                            "ayah": 16
                        },
                        {
                            "surah": 68,
                            "ayah": 43
                        },
                        {
                            "surah": 69,
                            "ayah": 9
                        },
                        {
                            "surah": 69,
                            "ayah": 35
                        },
                        {
                            "surah": 70,
                            "ayah": 11
                        },
                        {
                            "surah": 70,
                            "ayah": 40
                        },
                        {
                            "surah": 71,
                            "ayah": 11
                        },
                        {
                            "surah": 72,
                            "ayah": 1
                        },
                        {
                            "surah": 72,
                            "ayah": 14
                        },
                        {
                            "surah": 73,
                            "ayah": 1
                        },
                        {
                            "surah": 73,
                            "ayah": 20
                        },
                        {
                            "surah": 74,
                            "ayah": 18
                        },
                        {
                            "surah": 74,
                            "ayah": 48
                        },
                        {
                            "surah": 75,
                            "ayah": 20
                        },
                        {
                            "surah": 76,
                            "ayah": 6
                        },
                        {
                            "surah": 76,
                            "ayah": 26
                        },
                        {
                            "surah": 77,
                            "ayah": 20
                        },
                        {
                            "surah": 78,
                            "ayah": 1
                        },
                        {
                            "surah": 78,
                            "ayah": 31
                        },
                        {
                            "surah": 79,
                            "ayah": 16
                        },
                        {
                            "surah": 80,
                            "ayah": 1
                        },
                        {
                            "surah": 81,
                            "ayah": 1
                        },
                        {
                            "surah": 82,
                            "ayah": 1
                        },
                        {
                            "surah": 83,
                            "ayah": 7
                        },
                        {
                            "surah": 83,
                            "ayah": 35
                        },
                        {
                            "surah": 85,
                            "ayah": 1
                        },
                        {
                            "surah": 86,
                            "ayah": 1
                        },
                        {
                            "surah": 87,
                            "ayah": 16
                        },
                        {
                            "surah": 89,
                            "ayah": 1
                        },
                        {
                            "surah": 89,
                            "ayah": 24
                        },
                        {
                            "surah": 91,
                            "ayah": 1
                        },
                        {
                            "surah": 92,
                            "ayah": 15
                        },
                        {
                            "surah": 95,
                            "ayah": 1
                        },
                        {
                            "surah": 97,
                            "ayah": 1
                        },
                        {
                            "surah": 98,
                            "ayah": 8
                        },
                        {
                            "surah": 100,
                            "ayah": 10
                        },
                        {
                            "surah": 103,
                            "ayah": 1
                        },
                        {
                            "surah": 106,
                            "ayah": 1
                        },
                        {
                            "surah": 109,
                            "ayah": 1
                        },
                        {
                            "surah": 112,
                            "ayah": 1
                        }
                    ]
                },
                "manzils": {
                    "count": 7,
                    "references": [
                        {
                            "surah": 1,
                            "ayah": 1
                        },
                        {
                            "surah": 5,
                            "ayah": 1
                        },
                        {
                            "surah": 10,
                            "ayah": 1
                        },
                        {
                            "surah": 17,
                            "ayah": 1
                        },
                        {
                            "surah": 26,
                            "ayah": 1
                        },
                        {
                            "surah": 37,
                            "ayah": 1
                        },
                        {
                            "surah": 50,
                            "ayah": 1
                        }
                    ]
                },
                "hizbQuarters": {
                    "count": 240,
                    "references": [
                        {
                            "surah": 1,
                            "ayah": 1
                        },
                        {
                            "surah": 2,
                            "ayah": 26
                        },
                        {
                            "surah": 2,
                            "ayah": 44
                        },
                        {
                            "surah": 2,
                            "ayah": 60
                        },
                        {
                            "surah": 2,
                            "ayah": 75
                        },
                        {
                            "surah": 2,
                            "ayah": 92
                        },
                        {
                            "surah": 2,
                            "ayah": 106
                        },
                        {
                            "surah": 2,
                            "ayah": 124
                        },
                        {
                            "surah": 2,
                            "ayah": 142
                        },
                        {
                            "surah": 2,
                            "ayah": 158
                        },
                        {
                            "surah": 2,
                            "ayah": 177
                        },
                        {
                            "surah": 2,
                            "ayah": 189
                        },
                        {
                            "surah": 2,
                            "ayah": 203
                        },
                        {
                            "surah": 2,
                            "ayah": 219
                        },
                        {
                            "surah": 2,
                            "ayah": 233
                        },
                        {
                            "surah": 2,
                            "ayah": 243
                        },
                        {
                            "surah": 2,
                            "ayah": 253
                        },
                        {
                            "surah": 2,
                            "ayah": 263
                        },
                        {
                            "surah": 2,
                            "ayah": 272
                        },
                        {
                            "surah": 2,
                            "ayah": 283
                        },
                        {
                            "surah": 3,
                            "ayah": 15
                        },
                        {
                            "surah": 3,
                            "ayah": 33
                        },
                        {
                            "surah": 3,
                            "ayah": 52
                        },
                        {
                            "surah": 3,
                            "ayah": 75
                        },
                        {
                            "surah": 3,
                            "ayah": 93
                        },
                        {
                            "surah": 3,
                            "ayah": 113
                        },
                        {
                            "surah": 3,
                            "ayah": 133
                        },
                        {
                            "surah": 3,
                            "ayah": 153
                        },
                        {
                            "surah": 3,
                            "ayah": 171
                        },
                        {
                            "surah": 3,
                            "ayah": 186
                        },
                        {
                            "surah": 4,
                            "ayah": 1
                        },
                        {
                            "surah": 4,
                            "ayah": 12
                        },
                        {
                            "surah": 4,
                            "ayah": 24
                        },
                        {
                            "surah": 4,
                            "ayah": 36
                        },
                        {
                            "surah": 4,
                            "ayah": 58
                        },
                        {
                            "surah": 4,
                            "ayah": 74
                        },
                        {
                            "surah": 4,
                            "ayah": 88
                        },
                        {
                            "surah": 4,
                            "ayah": 100
                        },
                        {
                            "surah": 4,
                            "ayah": 114
                        },
                        {
                            "surah": 4,
                            "ayah": 135
                        },
                        {
                            "surah": 4,
                            "ayah": 148
                        },
                        {
                            "surah": 4,
                            "ayah": 163
                        },
                        {
                            "surah": 5,
                            "ayah": 1
                        },
                        {
                            "surah": 5,
                            "ayah": 12
                        },
                        {
                            "surah": 5,
                            "ayah": 27
                        },
                        {
                            "surah": 5,
                            "ayah": 41
                        },
                        {
                            "surah": 5,
                            "ayah": 51
                        },
                        {
                            "surah": 5,
                            "ayah": 67
                        },
                        {
                            "surah": 5,
                            "ayah": 82
                        },
                        {
                            "surah": 5,
                            "ayah": 97
                        },
                        {
                            "surah": 5,
                            "ayah": 109
                        },
                        {
                            "surah": 6,
                            "ayah": 13
                        },
                        {
                            "surah": 6,
                            "ayah": 36
                        },
                        {
                            "surah": 6,
                            "ayah": 59
                        },
                        {
                            "surah": 6,
                            "ayah": 74
                        },
                        {
                            "surah": 6,
                            "ayah": 95
                        },
                        {
                            "surah": 6,
                            "ayah": 111
                        },
                        {
                            "surah": 6,
                            "ayah": 127
                        },
                        {
                            "surah": 6,
                            "ayah": 141
                        },
                        {
                            "surah": 6,
                            "ayah": 151
                        },
                        {
                            "surah": 7,
                            "ayah": 1
                        },
                        {
                            "surah": 7,
                            "ayah": 31
                        },
                        {
                            "surah": 7,
                            "ayah": 47
                        },
                        {
                            "surah": 7,
                            "ayah": 65
                        },
                        {
                            "surah": 7,
                            "ayah": 88
                        },
                        {
                            "surah": 7,
                            "ayah": 117
                        },
                        {
                            "surah": 7,
                            "ayah": 142
                        },
                        {
                            "surah": 7,
                            "ayah": 156
                        },
                        {
                            "surah": 7,
                            "ayah": 171
                        },
                        {
                            "surah": 7,
                            "ayah": 189
                        },
                        {
                            "surah": 8,
                            "ayah": 1
                        },
                        {
                            "surah": 8,
                            "ayah": 22
                        },
                        {
                            "surah": 8,
                            "ayah": 41
                        },
                        {
                            "surah": 8,
                            "ayah": 61
                        },
                        {
                            "surah": 9,
                            "ayah": 1
                        },
                        {
                            "surah": 9,
                            "ayah": 19
                        },
                        {
                            "surah": 9,
                            "ayah": 34
                        },
                        {
                            "surah": 9,
                            "ayah": 46
                        },
                        {
                            "surah": 9,
                            "ayah": 60
                        },
                        {
                            "surah": 9,
                            "ayah": 75
                        },
                        {
                            "surah": 9,
                            "ayah": 93
                        },
                        {
                            "surah": 9,
                            "ayah": 111
                        },
                        {
                            "surah": 9,
                            "ayah": 122
                        },
                        {
                            "surah": 10,
                            "ayah": 11
                        },
                        {
                            "surah": 10,
                            "ayah": 26
                        },
                        {
                            "surah": 10,
                            "ayah": 53
                        },
                        {
                            "surah": 10,
                            "ayah": 71
                        },
                        {
                            "surah": 10,
                            "ayah": 90
                        },
                        {
                            "surah": 11,
                            "ayah": 6
                        },
                        {
                            "surah": 11,
                            "ayah": 24
                        },
                        {
                            "surah": 11,
                            "ayah": 41
                        },
                        {
                            "surah": 11,
                            "ayah": 61
                        },
                        {
                            "surah": 11,
                            "ayah": 84
                        },
                        {
                            "surah": 11,
                            "ayah": 108
                        },
                        {
                            "surah": 12,
                            "ayah": 7
                        },
                        {
                            "surah": 12,
                            "ayah": 30
                        },
                        {
                            "surah": 12,
                            "ayah": 53
                        },
                        {
                            "surah": 12,
                            "ayah": 77
                        },
                        {
                            "surah": 12,
                            "ayah": 101
                        },
                        {
                            "surah": 13,
                            "ayah": 5
                        },
                        {
                            "surah": 13,
                            "ayah": 19
                        },
                        {
                            "surah": 13,
                            "ayah": 35
                        },
                        {
                            "surah": 14,
                            "ayah": 10
                        },
                        {
                            "surah": 14,
                            "ayah": 28
                        },
                        {
                            "surah": 15,
                            "ayah": 1
                        },
                        {
                            "surah": 15,
                            "ayah": 50
                        },
                        {
                            "surah": 16,
                            "ayah": 1
                        },
                        {
                            "surah": 16,
                            "ayah": 30
                        },
                        {
                            "surah": 16,
                            "ayah": 51
                        },
                        {
                            "surah": 16,
                            "ayah": 75
                        },
                        {
                            "surah": 16,
                            "ayah": 90
                        },
                        {
                            "surah": 16,
                            "ayah": 111
                        },
                        {
                            "surah": 17,
                            "ayah": 1
                        },
                        {
                            "surah": 17,
                            "ayah": 23
                        },
                        {
                            "surah": 17,
                            "ayah": 50
                        },
                        {
                            "surah": 17,
                            "ayah": 70
                        },
                        {
                            "surah": 17,
                            "ayah": 99
                        },
                        {
                            "surah": 18,
                            "ayah": 17
                        },
                        {
                            "surah": 18,
                            "ayah": 32
                        },
                        {
                            "surah": 18,
                            "ayah": 51
                        },
                        {
                            "surah": 18,
                            "ayah": 75
                        },
                        {
                            "surah": 18,
                            "ayah": 99
                        },
                        {
                            "surah": 19,
                            "ayah": 22
                        },
                        {
                            "surah": 19,
                            "ayah": 59
                        },
                        {
                            "surah": 20,
                            "ayah": 1
                        },
                        {
                            "surah": 20,
                            "ayah": 55
                        },
                        {
                            "surah": 20,
                            "ayah": 83
                        },
                        {
                            "surah": 20,
                            "ayah": 111
                        },
                        {
                            "surah": 21,
                            "ayah": 1
                        },
                        {
                            "surah": 21,
                            "ayah": 29
                        },
                        {
                            "surah": 21,
                            "ayah": 51
                        },
                        {
                            "surah": 21,
                            "ayah": 83
                        },
                        {
                            "surah": 22,
                            "ayah": 1
                        },
                        {
                            "surah": 22,
                            "ayah": 19
                        },
                        {
                            "surah": 22,
                            "ayah": 38
                        },
                        {
                            "surah": 22,
                            "ayah": 60
                        },
                        {
                            "surah": 23,
                            "ayah": 1
                        },
                        {
                            "surah": 23,
                            "ayah": 36
                        },
                        {
                            "surah": 23,
                            "ayah": 75
                        },
                        {
                            "surah": 24,
                            "ayah": 1
                        },
                        {
                            "surah": 24,
                            "ayah": 21
                        },
                        {
                            "surah": 24,
                            "ayah": 35
                        },
                        {
                            "surah": 24,
                            "ayah": 53
                        },
                        {
                            "surah": 25,
                            "ayah": 1
                        },
                        {
                            "surah": 25,
                            "ayah": 21
                        },
                        {
                            "surah": 25,
                            "ayah": 53
                        },
                        {
                            "surah": 26,
                            "ayah": 1
                        },
                        {
                            "surah": 26,
                            "ayah": 52
                        },
                        {
                            "surah": 26,
                            "ayah": 111
                        },
                        {
                            "surah": 26,
                            "ayah": 181
                        },
                        {
                            "surah": 27,
                            "ayah": 1
                        },
                        {
                            "surah": 27,
                            "ayah": 27
                        },
                        {
                            "surah": 27,
                            "ayah": 56
                        },
                        {
                            "surah": 27,
                            "ayah": 82
                        },
                        {
                            "surah": 28,
                            "ayah": 12
                        },
                        {
                            "surah": 28,
                            "ayah": 29
                        },
                        {
                            "surah": 28,
                            "ayah": 51
                        },
                        {
                            "surah": 28,
                            "ayah": 76
                        },
                        {
                            "surah": 29,
                            "ayah": 1
                        },
                        {
                            "surah": 29,
                            "ayah": 26
                        },
                        {
                            "surah": 29,
                            "ayah": 46
                        },
                        {
                            "surah": 30,
                            "ayah": 1
                        },
                        {
                            "surah": 30,
                            "ayah": 31
                        },
                        {
                            "surah": 30,
                            "ayah": 54
                        },
                        {
                            "surah": 31,
                            "ayah": 22
                        },
                        {
                            "surah": 32,
                            "ayah": 11
                        },
                        {
                            "surah": 33,
                            "ayah": 1
                        },
                        {
                            "surah": 33,
                            "ayah": 18
                        },
                        {
                            "surah": 33,
                            "ayah": 31
                        },
                        {
                            "surah": 33,
                            "ayah": 51
                        },
                        {
                            "surah": 33,
                            "ayah": 60
                        },
                        {
                            "surah": 34,
                            "ayah": 10
                        },
                        {
                            "surah": 34,
                            "ayah": 24
                        },
                        {
                            "surah": 34,
                            "ayah": 46
                        },
                        {
                            "surah": 35,
                            "ayah": 15
                        },
                        {
                            "surah": 35,
                            "ayah": 41
                        },
                        {
                            "surah": 36,
                            "ayah": 28
                        },
                        {
                            "surah": 36,
                            "ayah": 60
                        },
                        {
                            "surah": 37,
                            "ayah": 22
                        },
                        {
                            "surah": 37,
                            "ayah": 83
                        },
                        {
                            "surah": 37,
                            "ayah": 145
                        },
                        {
                            "surah": 38,
                            "ayah": 21
                        },
                        {
                            "surah": 38,
                            "ayah": 52
                        },
                        {
                            "surah": 39,
                            "ayah": 8
                        },
                        {
                            "surah": 39,
                            "ayah": 32
                        },
                        {
                            "surah": 39,
                            "ayah": 53
                        },
                        {
                            "surah": 40,
                            "ayah": 1
                        },
                        {
                            "surah": 40,
                            "ayah": 21
                        },
                        {
                            "surah": 40,
                            "ayah": 41
                        },
                        {
                            "surah": 40,
                            "ayah": 66
                        },
                        {
                            "surah": 41,
                            "ayah": 9
                        },
                        {
                            "surah": 41,
                            "ayah": 25
                        },
                        {
                            "surah": 41,
                            "ayah": 47
                        },
                        {
                            "surah": 42,
                            "ayah": 13
                        },
                        {
                            "surah": 42,
                            "ayah": 27
                        },
                        {
                            "surah": 42,
                            "ayah": 51
                        },
                        {
                            "surah": 43,
                            "ayah": 24
                        },
                        {
                            "surah": 43,
                            "ayah": 57
                        },
                        {
                            "surah": 44,
                            "ayah": 17
                        },
                        {
                            "surah": 45,
                            "ayah": 12
                        },
                        {
                            "surah": 46,
                            "ayah": 1
                        },
                        {
                            "surah": 46,
                            "ayah": 21
                        },
                        {
                            "surah": 47,
                            "ayah": 10
                        },
                        {
                            "surah": 47,
                            "ayah": 33
                        },
                        {
                            "surah": 48,
                            "ayah": 18
                        },
                        {
                            "surah": 49,
                            "ayah": 1
                        },
                        {
                            "surah": 49,
                            "ayah": 14
                        },
                        {
                            "surah": 50,
                            "ayah": 27
                        },
                        {
                            "surah": 51,
                            "ayah": 31
                        },
                        {
                            "surah": 52,
                            "ayah": 24
                        },
                        {
                            "surah": 53,
                            "ayah": 26
                        },
                        {
                            "surah": 54,
                            "ayah": 9
                        },
                        {
                            "surah": 55,
                            "ayah": 1
                        },
                        {
                            "surah": 56,
                            "ayah": 1
                        },
                        {
                            "surah": 56,
                            "ayah": 75
                        },
                        {
                            "surah": 57,
                            "ayah": 16
                        },
                        {
                            "surah": 58,
                            "ayah": 1
                        },
                        {
                            "surah": 58,
                            "ayah": 14
                        },
                        {
                            "surah": 59,
                            "ayah": 11
                        },
                        {
                            "surah": 60,
                            "ayah": 7
                        },
                        {
                            "surah": 62,
                            "ayah": 1
                        },
                        {
                            "surah": 63,
                            "ayah": 4
                        },
                        {
                            "surah": 65,
                            "ayah": 1
                        },
                        {
                            "surah": 66,
                            "ayah": 1
                        },
                        {
                            "surah": 67,
                            "ayah": 1
                        },
                        {
                            "surah": 68,
                            "ayah": 1
                        },
                        {
                            "surah": 69,
                            "ayah": 1
                        },
                        {
                            "surah": 70,
                            "ayah": 19
                        },
                        {
                            "surah": 72,
                            "ayah": 1
                        },
                        {
                            "surah": 73,
                            "ayah": 20
                        },
                        {
                            "surah": 75,
                            "ayah": 1
                        },
                        {
                            "surah": 76,
                            "ayah": 19
                        },
                        {
                            "surah": 78,
                            "ayah": 1
                        },
                        {
                            "surah": 80,
                            "ayah": 1
                        },
                        {
                            "surah": 82,
                            "ayah": 1
                        },
                        {
                            "surah": 84,
                            "ayah": 1
                        },
                        {
                            "surah": 87,
                            "ayah": 1
                        },
                        {
                            "surah": 90,
                            "ayah": 1
                        },
                        {
                            "surah": 94,
                            "ayah": 1
                        },
                        {
                            "surah": 100,
                            "ayah": 9
                        }
                    ]
                },
                "juzs": {
                    "count": 30,
                    "references": [
                        {
                            "surah": 1,
                            "ayah": 1
                        },
                        {
                            "surah": 2,
                            "ayah": 142
                        },
                        {
                            "surah": 2,
                            "ayah": 253
                        },
                        {
                            "surah": 3,
                            "ayah": 93
                        },
                        {
                            "surah": 4,
                            "ayah": 24
                        },
                        {
                            "surah": 4,
                            "ayah": 148
                        },
                        {
                            "surah": 5,
                            "ayah": 82
                        },
                        {
                            "surah": 6,
                            "ayah": 111
                        },
                        {
                            "surah": 7,
                            "ayah": 88
                        },
                        {
                            "surah": 8,
                            "ayah": 41
                        },
                        {
                            "surah": 9,
                            "ayah": 93
                        },
                        {
                            "surah": 11,
                            "ayah": 6
                        },
                        {
                            "surah": 12,
                            "ayah": 53
                        },
                        {
                            "surah": 15,
                            "ayah": 1
                        },
                        {
                            "surah": 17,
                            "ayah": 1
                        },
                        {
                            "surah": 18,
                            "ayah": 75
                        },
                        {
                            "surah": 21,
                            "ayah": 1
                        },
                        {
                            "surah": 23,
                            "ayah": 1
                        },
                        {
                            "surah": 25,
                            "ayah": 21
                        },
                        {
                            "surah": 27,
                            "ayah": 56
                        },
                        {
                            "surah": 29,
                            "ayah": 46
                        },
                        {
                            "surah": 33,
                            "ayah": 31
                        },
                        {
                            "surah": 36,
                            "ayah": 28
                        },
                        {
                            "surah": 39,
                            "ayah": 32
                        },
                        {
                            "surah": 41,
                            "ayah": 47
                        },
                        {
                            "surah": 46,
                            "ayah": 1
                        },
                        {
                            "surah": 51,
                            "ayah": 31
                        },
                        {
                            "surah": 58,
                            "ayah": 1
                        },
                        {
                            "surah": 67,
                            "ayah": 1
                        },
                        {
                            "surah": 78,
                            "ayah": 1
                        }
                    ]
                }
            }
        this.setState({ quranMeta })    
        
        let userId = ""
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user })
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
        this.setState({ startNewMemo: true })
    }

    createNewMemo = (event) => {
        event.preventDefault();
        const { user } = this.state;
        const { target, plan } = this.state.data;
        const { surahs, pages, juzs } = this.state.quranMeta;
        const surahsRef = surahs.references;
        const pagesRef = pages.references;
        const juzsRef = juzs.references;
        const userId = user.uid;
        let cards = [];
        let dateNow = new Date();
        dateNow.setUTCHours(0, 0, 0, 0);
        const midNight = +dateNow;

        if(target === "quran") {
            if(plan === "oneYear") {
                for(let x=0; x<pages.count; x++) {
                    const dayToMemo = Math.round((x+1) / 2);
                    let card = {
                        id: x+1,
                        pageNo: x+1,
                        title: `Quran Page ${x+1}`,
                        surah: {id: pagesRef[x].surah, name: surahsRef[pagesRef[x].surah -1].englishName },
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

            
            if(plan === "twoWeeks") {
                for(let x=0; x<juzPages; x++) {
                    const dayToMemo = Math.round((x+1) / 2);
                    let card = {
                        id: x+1,
                        pageNo: firstPageOfJuz + x,
                        title: `Juz ${juz}, Page ${x+1}`,
                        surah: {id: juzsRef[x].surah, name: surahsRef[juzsRef[x].surah -1].englishName },
                        ayah: juzsRef[x].ayah,
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
                        surah: {id: juzsRef[x].surah, name: surahsRef[juzsRef[x].surah -1].englishName },
                        ayah: juzsRef[x].ayah,
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
                        surah: {id: juzsRef[x].surah, name: surahsRef[juzsRef[x].surah -1].englishName },
                        ayah: juzsRef[x].ayah,
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
                        surah: {id: juzsRef[x].surah, name: surahsRef[juzsRef[x].surah -1].englishName },
                        ayah: juzsRef[x].ayah,
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
                        surah: {id: juzsRef[x].surah, name: surahsRef[juzsRef[x].surah -1].englishName },
                        ayah: juzsRef[x].ayah,
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
                        surah: {id: juzsRef[x].surah, name: surahsRef[juzsRef[x].surah -1].englishName },
                        ayah: juzsRef[x].ayah,
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
            console.log(surahPages)
            let firstPageOfSurah;

            if(surahPagesList.length === 0) {
                surahPages = 1;
                if(surah > 90){
                    for(let i=0; i<pagesRef.length; i++) {
                        if(pagesRef[i].surah === surah-2) {
                            firstPageOfSurah = i+1;
                            console.log(firstPageOfSurah)
                        } else if(pagesRef[i].surah === surah-1) {
                            firstPageOfSurah = i+1;
                            console.log(firstPageOfSurah)
                        }
                    }
                } 
            } else {
                if(surahPagesList[0].ayah !== 1) {
                    surahPages = surahPages + 1;
                    for(let i=0; i<pagesRef.length; i++) {
                        if(pagesRef[i].surah === surahPagesList[0].surah && pagesRef[i].ayah === surahPagesList[0].ayah) {
                            firstPageOfSurah = i;
                            console.log(firstPageOfSurah)
                        }
                    }
                } else {
                    for(let i=0; i<pagesRef.length; i++) {
                        if(pagesRef[i].surah === surahPagesList[0].surah && pagesRef[i].ayah === surahPagesList[0].ayah) {
                            firstPageOfSurah = i+1;
                            console.log(firstPageOfSurah)
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
                        ayah: x === 0 || !pagesRef[firstPageOfSurah + x - 1] ? 1 : pagesRef[firstPageOfSurah + x - 1].ayah,
                        dueDate: Date.now() + ((x*5) * 60000),
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
                        ayah: pagesRef[firstPageOfSurah + x - 1] ? pagesRef[firstPageOfSurah + x - 1].ayah : 1,
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
                        ayah: pagesRef[firstPageOfSurah + x - 1] ? pagesRef[firstPageOfSurah + x - 1].ayah : 1,
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
                        ayah: pagesRef[firstPageOfSurah + x - 1] ? pagesRef[firstPageOfSurah + x - 1].ayah : 1,
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

        console.log(cards)
        // return;

        firebase.firestore().collection("users").doc(userId).get()
        .then( doc => {
            const user = doc.data();
            console.log(user);

            user.memo = {
                target: target,
                plan: plan,
                cards: cards,
            }
            console.log(user)

            firebase.firestore().collection("users").doc(userId).update(user);
        }).then(() => {
            // console.log("Updated user successfully");
            toast.success("Your hifz plan has been created. Your first page will appear tomorrow in shaa Allah");
        }).catch(error => {
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
        const { user } = this.state;
        const memo = this.state.userDetails.memo
        let cards = memo.cards;
        console.log(cardId)
        let card = cards[cardId - 1];
        console.log(card)

        card.phase = "reviewing";
        console.log(card)
        
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
        if(userDetails && userDetails.memo) {
            console.log(userDetails.memo);
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
        if(userDetails && userDetails.memo) {
            console.log(userDetails.memo);
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
        const { user } = this.state;
        const memo = this.state.userDetails.memo
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
            toast.success("This page has been rescheduled for review")
        })
    }

    setAgain = (cardId) => {
        const { user } = this.state;
        const memo = this.state.userDetails.memo
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
        const { user } = this.state;
        const memo = this.state.userDetails.memo
        let cards = memo.cards;
        let card = cards[cardId - 1];

        card.ease = card.ease * 0.8
        let newInterval = card.interval * card.ease
        if(newInterval > 1.2) {
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
            toast.success("This page has been rescheduled for review")
        })
    }

    setEasy = (cardId) => {
        const { user } = this.state;
        const memo = this.state.userDetails.memo
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
            toast.success("This page has been rescheduled for review")
        })
    }

    render() { 
        const { user, userMemo, data } = this.state;
        
        return ( 
            <React.Fragment>
                <Grid item container id="new-memorization" 
                justify="center" alignItems="center" 
                spacing={0} style={{ marginTop: "20px"}}>

                    <form onSubmit={this.createNewMemo}>
                        <div>
                            <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.showStartNewMemo}
                            >
                                Start a New Hifz Plan
                            </Button>

                        </div>

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
                        {this.renderSubmitButton("Start memorizing")}
                    </form>
                </Grid>

                <Grid item id="due-for-memorizing"
                style={{ marginTop: "30px"}}
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
                style={{ marginTop: "50px"}}
                >
                    <Grid style={{ textAlign: "center"}}>
                        <Typography variant="h6">
                            Due for Review
                        </Typography>
                    </Grid>
                    <Grid container>
                        {userMemo && this.renderDueForReview()}
                    </Grid>    
                </Grid>
            </React.Fragment>
         );
    }
}
 
export default Dashboard;