import comp from "D:/code/private/the-way-to-go/docs/.vuepress/.temp/pages/api/介绍.html.vue"
const data = JSON.parse("{\"path\":\"/api/%E4%BB%8B%E7%BB%8D.html\",\"title\":\"介绍\",\"lang\":\"zh-cn\",\"frontmatter\":{},\"headers\":[{\"level\":1,\"title\":\"介绍\",\"slug\":\"介绍\",\"link\":\"#介绍\",\"children\":[{\"level\":2,\"title\":\"验证\",\"slug\":\"验证\",\"link\":\"#验证\",\"children\":[]},{\"level\":2,\"title\":\"请求组织\",\"slug\":\"请求组织\",\"link\":\"#请求组织\",\"children\":[]},{\"level\":2,\"title\":\"发出请求\",\"slug\":\"发出请求\",\"link\":\"#发出请求\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"api/介绍.md\"}")
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
