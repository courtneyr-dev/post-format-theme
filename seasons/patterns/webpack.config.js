const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	entry: {
		index: "./blocks/src/index.js",
	},
	output: {
		path: __dirname + "/blocks",
		filename: "block-script.js",
	},
};
