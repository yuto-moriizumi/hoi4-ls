// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const path = require("path");

const ENTRIES = ["client/src/extension.ts", "server/src/server.ts"];

const config = ENTRIES.map(
  (entry) =>
    /** @type {import('webpack').Configuration} */ ({
      target: "node", // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
      mode: "production",
      entry,
      output: {
        // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "dist"),
        filename: path.basename(entry).replace(".ts", ".js"),
        libraryTarget: "commonjs2",
        devtoolModuleFilenameTemplate: "../[resource-path]",
      },
      devtool: "source-map",
      externals: {
        vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
      },
      resolve: {
        // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: [".ts", ".js"],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{ loader: "ts-loader" }],
          },
        ],
      },
    }),
);
// eslint-disable-next-line no-undef
module.exports = config;
