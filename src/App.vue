<template>
  <div id="app">
    <gluttony-video
      width="1000px"
      height="700px"
      :src="src"></gluttony-video>
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
      src: '../test-assets/12.MP4'
    }
  }
}
</script>

<style lang="scss">

</style>
