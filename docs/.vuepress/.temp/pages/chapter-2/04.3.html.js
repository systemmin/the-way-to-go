import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-2/04.3.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-2/04.3.html\",\"title\":\"4.3 常量\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"4.3 常量\",\"slug\":\"_4-3-常量\",\"link\":\"#_4-3-常量\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"chapter-2/04.3.md\"}")
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
