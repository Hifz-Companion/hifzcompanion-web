import React, { Component } from 'react';
import { Helmet } from "react-helmet";


class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Helmet>
                <title>Home - HifzulQuran</title>
                <meta
                    name="description"
                    content="Login to continue memorizing the Quran."
                />
                </Helmet>
                This is the home page
            </React.Fragment>
         );
    }
}
 
export default Home;