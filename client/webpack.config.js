const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin to generate an HTML file and inject the bundles
const WebpackPwaManifest = require('webpack-pwa-manifest'); // Plugin to generate a manifest.json for PWA configuration
const path = require('path'); // Node.js module to handle file paths
const { InjectManifest } = require('workbox-webpack-plugin'); // Plugin to inject a custom service worker for caching

module.exports = () => {
  return {
    mode: 'development', // Set the mode to 'development' for better debugging and non-minified output
    entry: {
      main: './src/js/index.js', // Entry point for the main bundle
      install: './src/js/install.js', // Entry point for the install bundle
    },
    output: {
      filename: '[name].bundle.js', // Output filename pattern, [name] will be replaced by entry key names
      path: path.resolve(__dirname, 'dist'), // Output directory, absolute path
      clean: true, // Clean the output directory before emitting new files
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Template HTML file to use
        title: 'Contact Cards', // Title to inject into the HTML file
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to the custom service worker file
        swDest: 'src-sw.js', // Output filename for the service worker in the 'dist' directory
      }),
      new WebpackPwaManifest({
        fingerprints: false, // Disable fingerprinting (hashing) for the manifest file
        inject: true, // Inject the manifest file link into the HTML
        name: 'Text Editor', // Full name of the PWA
        short_name: 'Texts', // Short name of the PWA
        description: 'A simple text editor', // Description of the PWA
        background_color: '#225ca3', // Background color for the splash screen
        theme_color: '#225ca3', // Theme color for the address bar and other UI elements
        start_url: './', // Start URL when the PWA is launched
        publicPath: './', // Public path to prefix the URLs in the manifest file
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the logo image file
            sizes: [96, 128, 192, 256, 384, 512], // Various sizes of the logo to generate
            destination: path.join('assets', 'icons'), // Output directory for the icons
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i, // Regular expression to match CSS files
          use: ['style-loader', 'css-loader'], // Use 'style-loader' and 'css-loader' to process CSS files
        },
        {
          test: /\.m?js$/, // Regular expression to match JS files (including ECMAScript modules)
          exclude: /node_modules/, // Exclude files in the 'node_modules' directory from being processed
          use: {
            loader: 'babel-loader', // Use 'babel-loader' to transpile JS files
            options: {
              presets: ['@babel/preset-env'], // Use '@babel/preset-env' to transpile modern JS to ES5
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', // Plugin to enable object rest/spread syntax
                '@babel/transform-runtime', // Plugin to reuse Babel's helper functions to save on code size
              ],
            },
          },
        },
      ],
    },
  };
};
