/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// https://www.npmjs.com/package/webpack-node-externals
// excludes all modules from the node_modules directory and provides options to whitelist packages
const nodeExternals = require('webpack-node-externals');

exports.onCreateWebpackConfig = ({ stage, actions, getConfig, loaders }) => {
  const path = require("path")
  const packageJsonPath = path.resolve(`src/../package.json`)


  const { setWebpackConfig } = actions


  //Read the modules from the package.json file instead of the node_modules folder.
  //Accepts a boolean or a configuration object:
  const nodeExOptions = {
    modulesFromFile: {
      fileName: packageJsonPath,/* path to package.json to read from */
      includeInBundle: [],
      excludeFromBundle: [
        'externals' // package.json key 
       /*  'minimal-slp-wallet-web',
        'minimal-slp-wallet',
        'bitcoincashjs-lib',
        '@chris.troutner/bch-js' */
      ]

    }
  }

  //An array for the externals to allow, 
  //so they will be included in the bundle.
  // Can accept exact strings ('module_name'),
  // regex patterns (/^module_name/), or a function that 
  //accepts the module name and returns
  const nodeExOptions2 = {
    importType: 'commonjs',
    allowlist: [
      /\.(?!(?:jsx?|json)$).{1,5}$/i,////load non-javascript files with extensions, presumably via loaders
    ]
  }

  //load non-javascript files with extensions, presumably via loaders
  const nodeExOptions3 = {
    allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
  }



  setWebpackConfig({
    node: {
      fs: 'empty'
    },
    externals: [
      {
        // This way we can make a reference to a library loaded using
        // the <script> tag to be able to import it and use it inside a component
        // for example: import $ from 'myJquery'
        // but i'm getting the " Building static HTML failed " error in production
        myJquery: 'jQuery',
      },
      //nodeExternals(nodeExOptions) // exclude all the modules from the bundle described in the package.json --> externals property
    ]

  })




  /*   setWebpackConfig({
     node:{
       fs: 'empty'
     },
     externals: [
       {
         // This way we can make a reference to a library loaded using
        // the <script> tag to be able to import it and use it inside a component
        // for example: import $ from 'myJquery'
        // but i'm getting the " Building static HTML failed " error in production
         myJquery: 'jQuery',
       },
 
     ]
   })
     */




  /*   
    // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
    if (stage === "build-html") {
      setWebpackConfig({
        module: {
          rules: [
            {
              test: /bad-module/,
              use: loaders.null(),
            },
          ],
        },
      })
    } */
}
