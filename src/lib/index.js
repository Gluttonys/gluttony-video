import gluttonyVideo from './gluttony-video'

const comment = {
  install: function (Vue) {
    Vue.component(gluttonyVideo.name, gluttonyVideo)
  }
}

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment)
}

export default comment
