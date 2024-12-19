import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-2/09.3.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-2/09.3.html\",\"title\":\"9.3 锁和 sync 包\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"9.3 锁和 sync 包\",\"slug\":\"_9-3-锁和-sync-包\",\"link\":\"#_9-3-锁和-sync-包\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"chapter-2/09.3.md\"}")
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
