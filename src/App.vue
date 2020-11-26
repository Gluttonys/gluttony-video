<template>
  <div id="app">
    <gluttony-video
      title="gluttony-video"
      desc="测试视频描述信息测试视频"
      :src="src"></gluttony-video>
<!--    <gluttony-video :src="src"></gluttony-video>-->
  </div>
</template>

<script>

import gluttonyVideo from './lib/gluttony-video'

export default {
  name: 'app',
  components: {
    gluttonyVideo
  },
  data() {
    return {
      src: '../test-assets/13.MP4'
    }
  },
  methods: {
    handleCanPlay(e) {
      console.log('视频准备完成 canplay', e)
    }
  }

}
</script>

<style lang="scss">

</style>
