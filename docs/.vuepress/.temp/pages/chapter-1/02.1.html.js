import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-1/02.1.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-1/02.1.html\",\"title\":\"2.1 平台与架构\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"2.1 平台与架构\",\"slug\":\"_2-1-平台与架构\",\"link\":\"#_2-1-平台与架构\",\"children\":[{\"level\":2,\"title\":\"链接\",\"slug\":\"链接\",\"link\":\"#链接\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"chapter-1/02.1.md\"}")
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
