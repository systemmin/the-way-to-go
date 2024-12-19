import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/chapter-3/14.10.html.vue"
const data = JSON.parse("{\"path\":\"/chapter-3/14.10.html\",\"title\":\"14.10 复用\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"14.10 复用\",\"slug\":\"_14-10-复用\",\"link\":\"#_14-10-复用\",\"children\":[{\"level\":2,\"title\":\"14.10.1 典型的客户端/服务器（C/S）模式\",\"slug\":\"_14-10-1-典型的客户端-服务器-c-s-模式\",\"link\":\"#_14-10-1-典型的客户端-服务器-c-s-模式\",\"children\":[]},{\"level\":2,\"title\":\"14.10.2 卸载 (Teardown)：通过信号通道关闭服务器\",\"slug\":\"_14-10-2-卸载-teardown-通过信号通道关闭服务器\",\"link\":\"#_14-10-2-卸载-teardown-通过信号通道关闭服务器\",\"children\":[]},{\"level\":2,\"title\":\"链接\",\"slug\":\"链接\",\"link\":\"#链接\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"chapter-3/14.10.md\"}")
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
