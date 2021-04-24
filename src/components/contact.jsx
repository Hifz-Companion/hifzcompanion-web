import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';

class Contact extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Grid item xs={10} style={{ margin: "10px auto"}}>
                    <Typography variant="h4" style={{marginBottom: "20px", textAlign: "center"}}>
                        &#65021;
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email: </strong>abdulwadudsab@gmail.com
                    </Typography>
                    <Typography variant="h2" style={{margin: "20px", fontSize: "18px", textTransform: "uppercase", textAlign: "center"}}>
                        Report an Error or make a suggestion
                    </Typography>
                    <Typography variant="body1">
                        If you come across any errors or any issues at all using this app, please 
                        take a few minutes to tell me about it through my email above. You can also
                        make a suggestion through the same means. 
                        It would help if you could describe the problem in detail. You should
                        include the following information if available.
                    </Typography>
                    <br/>
                    <Typography variant="body1">
                        1. Describe the problem in detail
                    </Typography>
                    <Typography variant="body1">
                        2. What device are you using
                    </Typography>
                    <Typography variant="body1">
                        3. What browser are you using
                    </Typography>
                    <Typography variant="body1">
                        4. A screenshot if you can.
                    </Typography>
                    <br/><br/>

                    <Typography variant="h2" style={{margin: "20px", fontSize: "18px", textTransform: "uppercase", textAlign: "center"}}>
                        Are you a programmer?
                    </Typography>
                    <Typography variant="body1">
                        If you are a programmer and you would like to contribute, you can check out 
                        our <a href="https://www.github.com/doctorduudu/hifzulquran">Github here.</a> 
                        Feel free to also use the concept we have applied here to develop other 
                        apps for the Muslim Ummah.
                    </Typography>

                </Grid>    
            </React.Fragment>
         );
    }
}
 
export default Contact;