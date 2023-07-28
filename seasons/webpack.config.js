const path = require("path");

module.exports = {
	entry: "./blocks/src/index.js",
	output: {
		path: path.resolve(__dirname, "blocks"),
		filename: "block-script-transpiled.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
};
