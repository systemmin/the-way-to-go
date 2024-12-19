import {
	viteBundler
} from '@vuepress/bundler-vite'
import {
	defaultTheme
} from '@vuepress/theme-default'
import {
	defineUserConfig
} from 'vuepress'

export default defineUserConfig({
	bundler: viteBundler(),
	lang: 'zh-cn',
	title: 'Go 入门指南 ',
	description: 'The Way to Go',
	markdown: {
		headers: {
			level: [1,2,3]
		}
	},
	theme: defaultTheme({
		logo: '/images/logo.svg',
		navbar: [
			{
				text: '文档 GitHub',
				link: 'https://github.com/systemmin/the-way-to-go.git',
				target: '_blank'
			}, {
				text: '译者 GitHub',
				link: 'https://github.com/unknwon/the-way-to-go_ZH_CN',
				target: '_blank'
			},
		],

		sidebar: [
			{
				text:'前言',
				link:'/preface'
			},
			{
				text: '学习 Go 语言',
				children: [{
						text: '第1章：Go 语言的起源，发展与普及',
						children: [
							'/chapter-1/01.1',
							'/chapter-1/01.2',
						]
					}, {
						text: '第2章：安装与运行环境',
						children: [
							'/chapter-1/02.1',
							'/chapter-1/02.2',
							'/chapter-1/02.3',
							'/chapter-1/02.4',
							'/chapter-1/02.5',
							'/chapter-1/02.6',
							'/chapter-1/02.7',
							'/chapter-1/02.8',
						]
					},
					{
						text: "第3章：编辑器、集成开发环境与其它工具",
						children: [
							'/chapter-1/03.1',
							'/chapter-1/03.2',
							'/chapter-1/03.3',
							'/chapter-1/03.4',
							'/chapter-1/03.5',
							'/chapter-1/03.6',
							'/chapter-1/03.7',
							'/chapter-1/03.8',
							'/chapter-1/03.9',
						]
					},

				]
			},
			{
				text: '语言的核心结构与技术',
				children: [{
						text: '第4章：基本结构和基本数据类型',

						children: [
							'/chapter-2/04.1',
							'/chapter-2/04.2',
							'/chapter-2/04.3',
							'/chapter-2/04.4',
							'/chapter-2/04.5',
							'/chapter-2/04.6',
							'/chapter-2/04.7',
							'/chapter-2/04.8',
							'/chapter-2/04.9',
						]
					},
					{
						text: '第5章：控制结构',
						link:'/chapter-2/05.0',
						children: [
							'/chapter-2/05.1',
							'/chapter-2/05.2',
							'/chapter-2/05.3',
							'/chapter-2/05.4',
							'/chapter-2/05.5',
							'/chapter-2/05.6',
						]
					}, {
						text: '第6章：函数（function）',
						link:'/chapter-2/06.0',
						children: [
							'/chapter-2/06.1',
							'/chapter-2/06.2',
							'/chapter-2/06.3',
							'/chapter-2/06.4',
							'/chapter-2/06.5',
							'/chapter-2/06.6',
							'/chapter-2/06.7',
							'/chapter-2/06.8',
							'/chapter-2/06.9',
							'/chapter-2/06.10',
							'/chapter-2/06.11',
							'/chapter-2/06.12',
						]
					},
					{
						text: '第7章：数组与切片',
						link:'/chapter-2/07.0',
						children: [
							'/chapter-2/07.1',
							'/chapter-2/07.2',
							'/chapter-2/07.3',
							'/chapter-2/07.4',
							'/chapter-2/07.5',
							'/chapter-2/07.6',
						]
					},
					{
						text: '第8章：Map',
						link:'/chapter-2/08.0',
						children: [
							'/chapter-2/08.1',
							'/chapter-2/08.2',
							'/chapter-2/08.3',
							'/chapter-2/08.4',
							'/chapter-2/08.5',
							'/chapter-2/08.6',
						]
					},
					{
						text: '第9章：包（package）',
						link:'/chapter-2/09.0',
						children: [
							'/chapter-2/09.1',
							'/chapter-2/09.2',
							'/chapter-2/09.3',
							'/chapter-2/09.4',
							'/chapter-2/09.5',
							'/chapter-2/09.6',
							'/chapter-2/09.7',
							'/chapter-2/09.8',
							'/chapter-2/09.9',
							'/chapter-2/09.10',
							'/chapter-2/09.11',
						]
					},
					{
						text: '第10章：结构（struct）与方法（method）',
						children: [
							'/chapter-2/10.1',
							'/chapter-2/10.2',
							'/chapter-2/10.3',
							'/chapter-2/10.4',
							'/chapter-2/10.5',
							'/chapter-2/10.6',
							'/chapter-2/10.7',
							'/chapter-2/10.8',
						]
					},
					{
						text: '第11章：接口（interface）与反射（reflection）',
						children: [
							'/chapter-2/11.1',
							'/chapter-2/11.2',
							'/chapter-2/11.3',
							'/chapter-2/11.4',
							'/chapter-2/11.5',
							'/chapter-2/11.6',
							'/chapter-2/11.7',
							'/chapter-2/11.8',
							'/chapter-2/11.9',
							'/chapter-2/11.10',
							'/chapter-2/11.11',
							'/chapter-2/11.12',
							'/chapter-2/11.13',
							'/chapter-2/11.14',
						]
					}
				]
			},
			{
				text: 'Go 高级编程',
				children: [{
						text: '第12章：读写数据',
						children: [
							'/chapter-3/12.1',
							'/chapter-3/12.2',
							'/chapter-3/12.3',
							'/chapter-3/12.4',
							'/chapter-3/12.5',
							'/chapter-3/12.6',
							'/chapter-3/12.7',
							'/chapter-3/12.8',
							'/chapter-3/12.9',
							'/chapter-3/12.10',
							'/chapter-3/12.11',
							'/chapter-3/12.12',
						]
					}, {
						text: '第13章：错误处理与测试',
						children: [
							'/chapter-3/13.1',
							'/chapter-3/13.2',
							'/chapter-3/13.3',
							'/chapter-3/13.4',
							'/chapter-3/13.5',
							'/chapter-3/13.6',
							'/chapter-3/13.7',
							'/chapter-3/13.8',
							'/chapter-3/13.9',
							'/chapter-3/13.10',
						]
					},
					{
						text: "第14章：协程 (goroutine) 与通道 (channel)",
						children: [
							'/chapter-3/14.1',
							'/chapter-3/14.2',
							'/chapter-3/14.3',
							'/chapter-3/14.4',
							'/chapter-3/14.5',
							'/chapter-3/14.6',
							'/chapter-3/14.7',
							'/chapter-3/14.8',
							'/chapter-3/14.9',
							'/chapter-3/14.10',
							'/chapter-3/14.11',
							'/chapter-3/14.12',
							'/chapter-3/14.13',
							'/chapter-3/14.14',
							'/chapter-3/14.15',
							'/chapter-3/14.16',
							'/chapter-3/14.17',
						]
					},
					{
						text: '第 15 章：网络、模板与网页应用',
						children: [
							'/chapter-3/15.1',
							'/chapter-3/15.2',
							'/chapter-3/15.3',
							'/chapter-3/15.4',
							'/chapter-3/15.5',
							'/chapter-3/15.6',
							'/chapter-3/15.7',
							'/chapter-3/15.8',
							'/chapter-3/15.9',
							'/chapter-3/15.10',
							'/chapter-3/15.11',
							'/chapter-3/15.12',
						]
					},
				]
			},
			{
				text: '实际应用',
				children: [{
						text: '第16章：常见的陷阱与错误',

						children: [
							'/chapter-4/16.1',
							'/chapter-4/16.2',
							'/chapter-4/16.3',
							'/chapter-4/16.4',
							'/chapter-4/16.5',
							'/chapter-4/16.6',
							'/chapter-4/16.7',
							'/chapter-4/16.8',
							'/chapter-4/16.9',
							'/chapter-4/16.10',
						]
					}, {
						text: '第17章：模式',

						children: [
							'/chapter-4/17.1',
							'/chapter-4/17.2',
							'/chapter-4/17.3',
							'/chapter-4/17.4',
						]
					},
					{
						text: "第18章：出于性能考虑的实用代码片段",
						children: [
							'/chapter-4/18.1',
							'/chapter-4/18.2',
							'/chapter-4/18.3',
							'/chapter-4/18.4',
							'/chapter-4/18.5',
							'/chapter-4/18.6',
							'/chapter-4/18.7',
							'/chapter-4/18.8',
							'/chapter-4/18.9',
							'/chapter-4/18.10',
							'/chapter-4/18.11',
						]
					}, {
						text: "第19章：构建一个完整的应用程序",
						children: [
							'/chapter-4/19.1',
							'/chapter-4/19.2',
							'/chapter-4/19.3',
							'/chapter-4/19.4',
							'/chapter-4/19.5',
							'/chapter-4/19.6',
							'/chapter-4/19.7',
							'/chapter-4/19.8',
							'/chapter-4/19.9',
							'/chapter-4/19.10',
						]
					},
					{
						text: "第20章：Go 语言在 Google App Engine 的使用",
						children: [
							'/chapter-4/20.1',
							'/chapter-4/20.2',
							'/chapter-4/20.3',
							'/chapter-4/20.4',
							'/chapter-4/20.5',
							'/chapter-4/20.6',
							'/chapter-4/20.7',
							'/chapter-4/20.8',
						]
					}, {
						text: "第21章：实世界中 Go 的使用",
						children: [
							'/chapter-4/21.1',
							'/chapter-4/21.2',
							'/chapter-4/21.3',
							'/chapter-4/21.4',
							'/chapter-4/21.5',
						]
					},
				]
			}
		]
	})
})

// import {
// 	path
// } from '@vuepress/utils'


// export default defineUserConfig({
// 	lang: 'zh-cn',
// 	title: 'ChatGPT 中文文档',
// 	description: 'Open AI doc',
// 	markdown: {
// 		headers: {
// 			level: [1, 2]
// 		}
// 	},
// ,
// 	plugins: [
// 	    registerComponentsPlugin({
// 	      componentsDir: path.resolve(__dirname, './components'),
// 	    })
// 	  ]

// })