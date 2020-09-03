const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin({
			patterns: [
				{
					from: "node_modules/web-vitals-element/dist/*.js",
					to: "../vendor/[name].[ext]",
				},
			],
		}),
	],
};
