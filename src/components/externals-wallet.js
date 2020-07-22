import React, { Component } from "react"

import { Helmet } from "react-helmet"
import MinimalBCHWallet from "minimal-slp-wallet"



// this cannot be resolved
//import MinimalBCHWallet from 'minimal-slp-wallet-web'

let _this
class Externals extends Component {
  constructor(props){
    super(props)
    _this =  this
    this.state={
      err:'',
      txId:''
    }
  }

  async componentDidMount() {
    console.log(window)
    // the libraries loaded using the script tag in the file /src/html.js
    // are loaded in run-time

    // the minified libraries are shown in the window object 

    //this.bchTest()
  }
  
  // Send bch
  async bchTest() {
   try {
     
    const mnemonic = ""
    const bchjsOptions = {
      restURL: 'https://free-main.fullstack.cash/v3/'
    }
    const bchWalletLib = new MinimalBCHWallet(mnemonic, bchjsOptions)

    // Update bchjs instances  of minimal-slp-wallet libraries
    bchWalletLib.tokens.sendBch.bchjs = new bchWalletLib.BCHJS(bchjsOptions)
    bchWalletLib.tokens.utxos.bchjs = new bchWalletLib.BCHJS(bchjsOptions)

    await bchWalletLib.walletInfoPromise // Wait for wallet to be created.

    const walletInfo = bchWalletLib.walletInfo
    console.log('walletInfo', walletInfo)


    const receivers = [
      {
        address: 'bitcoincash:qq5z2rqupzthfwt8ttyvfref0avgg7p46qu0q9g3z6',
        // amount in satoshis, 1 satoshi = 0.00000001 Bitcoin
        amountSat: Math.floor(Number(0.00005196) * 100000000)
      }
    ]

    // Ensure the wallet UTXOs are up-to-date.
    const walletAddr = bchWalletLib.walletInfo.address
    bchWalletLib.utxos.bchUtxos = await bchWalletLib.utxos.initUtxoStore(
      walletAddr
    )

    const result = await bchWalletLib.send(receivers)
    console.log('result',result)  
    _this.setState(prevState => {
      return {
        ...prevState,
        err:'',
        txId:result
      }
    })

   } catch (error) {
     console.error(error)
     let err
     if (error.message) {
       err = error.message
     } else if (error.error) {
       err = error.error
     }
     _this.setState(prevState => {
       return {
         ...prevState,
         err,
         txId:''
       }
     })
   }

  }



  render(props) {
    return (
      <React.Fragment>
        <button onClick={this.bchTest}>
          Test minimal-slp-wallet
        </button>
        {_this.state.err && <p>{_this.state.err}</p>}
        {_this.state.txId && <p>TXID: {_this.state.txId}</p>}
        {/* etc */}
      </React.Fragment>
    )
  }
}

export default Externals
