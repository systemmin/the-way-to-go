import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-2/06.8.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-2/06.8.html\",\"title\":\"6.8 闭包\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"6.8 闭包\",\"slug\":\"_6-8-闭包\",\"link\":\"#_6-8-闭包\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"chapter-2/06.8.md\"}")
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
