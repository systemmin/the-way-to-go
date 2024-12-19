import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-2/09.5.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-2/09.5.html\",\"title\":\"9.5 自定义包和可见性\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"9.5 自定义包和可见性\",\"slug\":\"_9-5-自定义包和可见性\",\"link\":\"#_9-5-自定义包和可见性\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"chapter-2/09.5.md\"}")
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
