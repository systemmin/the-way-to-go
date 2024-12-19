import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-3/13.3.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-3/13.3.html\",\"title\":\"13.3 从 panic 中恢复 (recover)\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"13.3 从 panic 中恢复 (recover)\",\"slug\":\"_13-3-从-panic-中恢复-recover\",\"link\":\"#_13-3-从-panic-中恢复-recover\",\"children\":[{\"level\":2,\"title\":\"链接\",\"slug\":\"链接\",\"link\":\"#链接\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"chapter-3/13.3.md\"}")
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
