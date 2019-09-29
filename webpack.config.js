var path = require('path');
const MCEP= require('mini-css-extract-plugin');
const SpritesmithPlugin= require('webpack-spritesmith');
module.exports = {
	mode:'development',
	entry:'./src/index.js',
	output:{
		filename:'bundle.js',
		path:path.resolve( __dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.(jpe?g|png|gif|svg)$/,
				use:[
					{
						loader:'url-loader',
						options:{limit:40000}
					},
					{
						loader:'image-webpack-loader',
						options:{byPassOnDebug:true}
					}
				]
			},
		{
			test:/\.(sa|sc|c)ss$/,
			use:[
			MCEP.loader,
			'css-loader',
			'sass-loader'
			]
		},
		{
			test:/\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use:[
				{
					loader:'url-loader',
					options:{
						limit:100000,
						name:'[name].[ext]',
						mimetype:'application/font-woff',
						outputPath:'fonts',
						publicPath:'../build/fonts'
					}
				}
			]
		}
		
		]
	},
	plugins:[
	new MCEP({
		filename:'style.css'
	}),
	new SpritesmithPlugin({
		src:{
			cwd:path.resolve(__dirname,'src/sprite'),
			glob:'*.png'
		},
		target:{
			image:path.resolve(__dirname,'src/images/sprite.png'),
			css:path.resolve(__dirname,'src/styles/_sprites.scss')
		},
		apiOptions:{
			cssImageRef:"../images/sprite.png"
		}
	}),
	],
	devServer:{
		open:true,
		contentBase:path.join(__dirname,'.'),
		compress: false,
		port:9000
	}
};