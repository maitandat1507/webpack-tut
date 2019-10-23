// Webpack uses this to work with directories
const path = require('path');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/javascript/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // Loaders are one of the main features of Webpack. They apply certain transformations to our code.
  // Let's add to webpack.config.js file new option module.rules.
  // In this option we will say Webpack how exactly it should transform different types of files.
  // @see: https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: { // Now you can place ES6 code inside your JavaScript modules safely!
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sc|sa|c)ss$/,

        // Set loaders to transform files.
        // (!) Loaders are applying from right to left
        // (!!!) The first loader will be applied after others
        use: [
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader",
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader",
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
        // From Now when Webpack meets <<import 'file.scss';>> in code it knows what to do!
      }
    ]
  }

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
  mode: 'development'
};