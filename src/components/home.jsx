import { Button, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
// import Basmala from "../img/basmala.png";


class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Helmet>
                <title>Home - Hifz Companion</title>
                <meta
                    name="description"
                    content="Quran Memorization and Lifelong Revision Companion."
                />
                </Helmet>

                <Grid container>
                    <Grid container justify="center" 
                    style={{ margin: "20px auto", fontSize: "40px", fontFamily: "Kitab"}}>
                        بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ  
                    </Grid>
                    <Grid item xs={10} style={{ margin: "auto"}}>
                        <Typography variant="h1" style={{margin: "20px", fontSize: "20px", textTransform: "uppercase", textAlign: "center"}}>
                            Quran Memorization and Lifelong Revision Companion
                        </Typography>
                        <Typography variant="body1">
                            The purpose of this app is to serve as a lifelong companion to the one 
                            who intends to memorize the entire Quran or a large portion of it. 
                        </Typography>
                        <Typography variant="body1">
                            First it helps you to memorize the Quran according to a suitable plan, 
                            and then it <strong>helps you to keep track of which pages or surahs you are supposed 
                            to be revising at any point</strong>. It does this using an algorithm built on 
                            an memory efficient concept known as <strong>Spaced Repetition.</strong>
                        </Typography>
                        <Typography variant="body1">
                            Spaced repetition is an amazing technique used to maximize recall during 
                            memorization and avoid forgetting the memorized material.
                        </Typography>
                        <br/>
                        
                        <Typography variant="h1" style={{margin: "5px auto", fontSize: "20px", textTransform: "uppercase", textAlign: "center"}}>
                            How To Use The App
                        </Typography>
                        {/* <iframe id="youtube-frame" src="https://www.youtube.com/embed/5U0Ive8bnuo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                        <Typography variant="body1">
                            <strong>Step 1:</strong> Create an account. 
                            <Link to="/sign-up"><Button color="secondary">Click Here</Button></Link>
                        </Typography>
                        <Typography variant="body1">
                            <strong>Step 2:</strong> Start a New Hifz Plan
                        </Typography>
                        <Typography variant="body1">
                            <strong>Step 3:</strong> Check Dashboard daily to see the pages or surah you are
                            supposed to memorise or revise.
                        </Typography>
                        <Typography variant="body1">
                            <strong>Step 4:</strong> After revising each page, you give the page a review 
                            based on how easy it was for you to recall. If you couldn't recall at all, 
                            click "AGAIN" and the page will be put back in your memorization zone 
                            for you to rememorize the page. 
                        </Typography>
                        <br/>
                        <Typography variant="body1">
                            If you were able to recall without much difficulty, click on "GOOD" and the page 
                            will be rescheduled at an appropriate time for revision again.
                        </Typography>
                        <br/>
                        <Typography variant="body1">
                            If you were able to recall but with a little difficulty, click on "HARD", and the 
                            page will be rescheduled appropriately.
                        </Typography>
                        <br/>
                        <Typography variant="body1">
                            Finally, if the page was too easy to recall, click on "EASY", and the page will 
                            be rescheduled appropriately.
                        </Typography>
                        <br/>
                        <Typography variant="body1">
                            You can watch <a href="https://youtu.be/5U0Ive8bnuo" target="_blank" rel="noreferrer"> this video</a> for more details and better understanding of how to
                            use the app and how it works.
                        </Typography>
                        <br/>


                        <Typography variant="h1" style={{margin: "5px auto", fontSize: "20px", textTransform: "uppercase", textAlign: "center"}}>
                            How The App Works
                        </Typography>
                        
                        <Typography variant="body1">
                            Depending on the memorization plan you selected, the app automatically spaces the pages
                            of the quran for you to memorize and complete it within the expected time while leaving
                            some more time for a period of intensive revision with your Ustaz.
                        </Typography>
                        <Typography variant="body1">
                            For every page that you memorize, <strong>the app reschedules that same page for revision at an 
                            appropriate interval</strong>, about some days later, And this is the more important part.                        
                        </Typography>
                        <Typography variant="body1">
                            To learn more about the details of each plan, 
                            <Link to="/plans"><Button color="secondary">Click Here</Button></Link>                         
                        </Typography>
                        <br/><br/>

                        <Typography variant="body1">
                            Quran meta data used in this app was obtained from <a target="_blank" rel="noreferrer" href="https://alquran.cloud/api">alquran.cloud</a>
                        </Typography>
                    </Grid>
                </Grid>
                
            </React.Fragment>
         );
    }
}
 
export default Home;
