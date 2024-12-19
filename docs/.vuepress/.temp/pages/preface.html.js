import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/preface.html.vue"
const data = JSON.parse("{\"path\":\"/preface.html\",\"title\":\"前言\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"前言\",\"slug\":\"前言\",\"link\":\"#前言\",\"children\":[{\"level\":3,\"title\":\"用更少的代码，更短的编译时间，创建运行更快的程序，享受更多的乐趣\",\"slug\":\"用更少的代码-更短的编译时间-创建运行更快的程序-享受更多的乐趣\",\"link\":\"#用更少的代码-更短的编译时间-创建运行更快的程序-享受更多的乐趣\",\"children\":[]},{\"level\":2,\"title\":\"链接\",\"slug\":\"链接\",\"link\":\"#链接\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"preface.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
