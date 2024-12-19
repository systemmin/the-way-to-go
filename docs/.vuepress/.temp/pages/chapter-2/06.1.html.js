import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-2/06.1.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-2/06.1.html\",\"title\":\"6.1 介绍\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"6.1 介绍\",\"slug\":\"_6-1-介绍\",\"link\":\"#_6-1-介绍\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"chapter-2/06.1.md\"}")
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
