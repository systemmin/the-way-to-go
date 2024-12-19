import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/start/教程.html.vue"
const data = JSON.parse("{\"path\":\"/start/%E6%95%99%E7%A8%8B.html\",\"title\":\"教程\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"教程\",\"slug\":\"教程\",\"link\":\"#教程\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"start/教程.md\"}")
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
