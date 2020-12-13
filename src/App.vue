<template>
  <div id="app">
    <gluttony-video :src="src"></gluttony-video>
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
