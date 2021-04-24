import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';

class Plans extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Grid item xs={10} style={{ margin: "auto"}}>
                    <Typography variant="h4" style={{margin: "10px auto", textAlign: "center"}}>
                        &#65021;
                    </Typography>
                    <Typography variant="h1" style={{margin: "20px", fontSize: "20px", textTransform: "uppercase", textAlign: "center"}}>
                        Quran Memorization Plans
                    </Typography>
                    <Typography variant="body1">
                        <a href="#quran">Entire Quran Memorization Plans</a>
                    </Typography>
                    <Typography variant="body1">
                        <a href="#juz">Juz by Juz Memorization Plans</a>
                    </Typography>
                    <Typography variant="body1">
                        <a href="#surah">Surah by Surah Memorization Plans</a>
                    </Typography>
                    <br/>
                    <Typography variant="body1">
                        In each of the plans, you would have a certain number of Quran pages to 
                        memorize within a certain period. At the same time you will be given 
                        pages you have already memorized to review at appropriate intervalse 
                        to maximize recall.
                    </Typography>
                    <Typography variant="body1">
                        Even after you have completed the plan, the app will still continue to show
                        you which pages you are supposed to revise. That way you will never leave any
                        pages unrevised for a long time. And it becomes difficult to forget.
                    </Typography>
                    <br/><br/>

                    <Grid id="quran">
                        <Typography variant="h2" style={{margin: "10px", fontWeight: "bold", fontSize: "18px", textTransform: "capitalize", textAlign: "center"}}>
                            Entire Quran Memorization Plans
                        </Typography>

                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 1 Year Plan
                            </Typography>
                            <Typography variant="body1">
                                This is a highly accelerated plan. You would complete the Quran <strong>in 10 months</strong>
                                and get 2 months for intensive revision. 
                            </Typography>
                            <Typography variant="body1">
                                With this plan you would be memorizing <strong>2 pages everyday</strong> and revising a number
                                of pages as well. I do not recommend this plan unless you really trust 
                                your ability to memorize and recall.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 2 Year Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Quran <strong>in 1 year and 8 months</strong>
                                and get 4 months for intensive revision. 
                            </Typography>
                            <Typography variant="body1">
                                You would be memorizing <strong>1 page everyday</strong> and revising a number
                                of pages as well. Go for this plan if your memorization is really good 
                                and you trust yourself to be consistent.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 3 Year Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Quran <strong>in 2 and half years</strong>
                                and get 6 months for intensive revision. 
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>a page a day, the next day, and you get a free day on the 3rd day</strong>
                                (to review the last 2 pages intensively if you like). That means you would be 
                                doing 2 pages in 3 days.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 4 Year Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Quran <strong>in 3 years and 4 months</strong>
                                and get 8 months for intensive revision. 
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>1 page in 2 days (or half a page a day)</strong>. So it's up to you to decide whether you would 
                                memorize the page in the first day and review it the next day intensively or 
                                memorize half a page a day. This seems like the best plan if you have an average 
                                memorization rate and you are serious.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 5 Year Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Quran <strong>in 4 years</strong>
                                and get 1 year for intensive revision. 
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>1 page in 2 days (or half a page a day) and then get every 7th 
                                day free</strong> to review the past weeks pages intensively.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 6 Year Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Quran <strong>in 5 years</strong>
                                and get 1 year for intensive revision. 
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>1 page in 3 days</strong>. So it's up to you to decide how you 
                                spread the page across the 3 days.
                            </Typography>
                        </Grid>
                        <br/>

                    </Grid>
                    
                    
                    <Grid id="juz">
                        <Typography variant="h2" style={{margin: "10px", fontWeight: "bold", fontSize: "18px", textTransform: "capitalize", textAlign: "center"}}>
                            Juz by Juz Memorization Plans
                        </Typography>

                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 2 Week Plan
                            </Typography>
                            <Typography variant="body1">
                                This is a highly accelerated plan. You would complete the Juz <strong>in 10 days</strong>.
                            </Typography>
                            <Typography variant="body1">
                                With this plan you would be memorizing <strong>2 pages everyday</strong> and revising a number
                                of pages as well. I do not recommend this plan unless you really trust 
                                your ability to memorize and recall.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 3 Week Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Juz <strong>in 20 days</strong>.
                            </Typography>
                            <Typography variant="body1">
                                You would be memorizing <strong>1 page everyday</strong> and revising a number
                                of pages as well. Go for this plan if your memorization is really good 
                                and you trust yourself to be consistent.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 5 Week Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Juz <strong>in 30 days</strong>.
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>a page a day, the next day, and you get a free day on the 3rd day</strong>
                                (to review the last 2 pages intensively if you like). That means you would be 
                                doing 2 pages in 3 days.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 6 Week Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Juz <strong>in 40 days</strong>.
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>1 page in 2 days (or half a page a day)</strong>. So it's up to you to decide whether you would 
                                memorize the page in the first day and review it the next day intensively or 
                                memorize half a page a day. This seems like the best plan if you have an average 
                                memorization rate and you are serious.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 7 week Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Juz <strong>in 46 days</strong>.
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>1 page in 2 days (or half a page a day) and then get every 7th 
                                day free</strong> to review the past weeks pages intensively.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 9 week Plan
                            </Typography>
                            <Typography variant="body1">
                                With this plan, you would complete the Juz <strong>in 60 days</strong>.
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>1 page in 3 days</strong>. So it's up to you to decide how you 
                                spread the page across the 3 days.
                            </Typography>
                        </Grid>
                        <br/>

                    </Grid>
                    
                    
                    <Grid id="surah">
                        <Typography variant="h2" style={{margin: "10px", fontWeight: "bold", fontSize: "18px", textTransform: "capitalize", textAlign: "center"}}>
                            Surah by Surah Memorization Plans
                        </Typography>

                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 2 Pages Per Day
                            </Typography>
                            <Typography variant="body1">
                                This is a highly accelerated plan.
                            </Typography>
                            <Typography variant="body1">
                                With this plan you would be memorizing <strong>2 pages everyday</strong> and revising a number
                                of pages as well. I do not recommend this plan unless you really trust 
                                your ability to memorize and recall.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 1 Page Per Day
                            </Typography>
                            <Typography variant="body1">
                                You would be memorizing <strong>1 page everyday</strong> and revising a number
                                of pages as well. Go for this plan if your memorization is really good 
                                and you trust yourself to be consistent.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 1 Page in 2 Days
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>1 page in 2 days (or half a page a day)</strong>. So it's up to you to decide whether you would 
                                memorize the page in the first day and review it the next day intensively or 
                                memorize half a page a day. This seems like the best plan if you have an average 
                                memorization rate and you are serious.
                            </Typography>
                        </Grid>
                        <br/>
                        
                        <Grid>
                            <Typography variant="h3" style={{fontSize: "18px", fontWeight: "bold"}}>
                                &#8226; 1 Page in 3 Days
                            </Typography>
                            <Typography variant="body1">
                                You would memroize <strong>1 page in 3 days</strong>. So it's up to you to decide how you 
                                spread the page across the 3 days.
                            </Typography>
                        </Grid>
                        <br/>
                        

                    </Grid>
                </Grid>    
            </React.Fragment>
         );
    }
}
 
export default Plans;