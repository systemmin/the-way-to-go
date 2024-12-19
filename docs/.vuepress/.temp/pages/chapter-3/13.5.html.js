import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-3/13.5.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-3/13.5.html\",\"title\":\"13.5 一种用闭包处理错误的模式\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"13.5 一种用闭包处理错误的模式\",\"slug\":\"_13-5-一种用闭包处理错误的模式\",\"link\":\"#_13-5-一种用闭包处理错误的模式\",\"children\":[{\"level\":2,\"title\":\"链接\",\"slug\":\"链接\",\"link\":\"#链接\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"chapter-3/13.5.md\"}")
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
