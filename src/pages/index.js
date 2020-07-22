import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

  const ExternalsJquery =
  typeof window !== 'undefined'
    ? require('../components/externals-jquery').default
    : null 
 
  const ExternalsWallet =
  typeof window !== 'undefined'
    ? require('../components/externals-wallet').default
    : null  

const IndexPage = () => (
  <Layout>
    <h1>Externals</h1>
     {ExternalsJquery && <ExternalsJquery />} 
     {ExternalsWallet && <ExternalsWallet />} 

  </Layout>
)

export default IndexPage
