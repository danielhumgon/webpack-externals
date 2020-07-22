import React, { Component } from "react"

import { Helmet } from "react-helmet"
import MinimalBCHWallet from "minimal-slp-wallet"

import $  from 'myJquery'


// This cannot be resolved 
//import MinimalBCHWallet from 'minimal-slp-wallet-web'


class Externals extends Component {

  async componentDidMount() {
    
    // the libraries loaded using the script tag in the file /src/html.js
    // are loaded in run-time

    // the minified libraries are shown in the window object 
    





    this.jqueryTest()
  }
  
  jqueryTest(){
    console.log('jQuery as $',window.$)
    console.log('jQuery',window.jQuery)

    console.log('Bootstrap',window.bootstrap)
    $('h1').css('color', 'red');
  }

  render(props) {
    return (
      <React.Fragment>
 
        <h1>TEST</h1>
        {/* etc */}
      </React.Fragment>
    )
  }
}

export default Externals
