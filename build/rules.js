

module.exports = {

	rules: [

		{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				extractCSS: true
			}
		},
		{
			test: /\.less$/,
			exclude: /node_modules/,
			use: ['css-loader', 'less-loader']
		},
		{
			test: /\.(jpg|jpeg|png|gif)$/,
			loader: 'url-loader',
			options: {
				limit: 8192
			}
		},
		{
			test: /\.(woff|woff2|svg|eot|ttf)$/,
			loader: 'file-loader'
		}

	]

}