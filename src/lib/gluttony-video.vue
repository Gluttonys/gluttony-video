<template>
  <div
    @mouseenter="isCurtainShow = true"
    @mouseleave="isCurtainShow = false"
    class="gluttony_video"
    :style='{width, height, backgroundColor}'>

    <!-- 视频标题 开始 -->
    <div class="top" v-show="isCurtainShow">
      <div class="title beyond_ellipsis" v-text="title.trim() ? title : currentSrc"></div>
      <div class="desc beyond_ellipsis" v-text="desc"></div>
    </div>
    <!-- 视频标题 结束 -->

    <!-- 视频标签 开始 -->
    <video
      ref="gluttony_video"
      :src="src"
      :loop="loop"
      @canplay="handleVideoCanPlay"
      @ended="handleVideoEnded"
      class="video"></video>
    <!-- 视频标签 结束 -->

    <!-- 幕布 开始 -->
    <div
      class="curtain"
      :style="{backgroundColor: isCurtainShow ? 'rgba(0, 0, 0, .8)': 'transparent'}"
    ></div>
    <!-- 幕布 结束 -->

    <!-- 播放暂停按钮 开始 -->
    <div class="control_button" @click="isPlay= !isPlay">
      <div class="stop" :data-text="tipForStop" v-if="isPlay"></div>
      <div class="triangle" :data-text="tipForPlay" v-else>
        <img src="../assets/stop.png" alt="">
      </div>
    </div>
    <!-- 播放暂停按钮 结束 -->

    <!-- 视频总时长tip 开始 -->
    <span class="duration" v-show="isCurtainShow">
      {{`${formatTime(currentTime)} / ${formatTime(duration)}`}}
      <i class="iconfont icon-shijian"></i>
    </span>
    <!-- 视频总时长tip 结束 -->

    <!-- 侧边栏工具条 开始 -->
    <aside class="aside" :style="{opacity: isCurtainShow ? '1': '0'}">
      <div class="btn"><i class="iconfont icon-bofangqi-danmuguan"></i></div>
      <div class="btn"><i class="iconfont icon-xunhuanbofang"></i></div>
      <div class="btn"><i class="iconfont icon-bofangqi-danmukai"></i></div>
      <div class="btn"><i class="iconfont icon-bofangqi-danmuguan"></i></div>
      <div class="btn"><i class="iconfont icon-bofangqi-danmuguan"></i></div>
    </aside>
    <!-- 侧边栏工具条 结束 -->

    <!-- 底部工具栏 开始 -->
    <footer class="tools_bar" :style="{opacity: isCurtainShow ? '1': '0'}">
      <div class="indicator_wrapper"
           @dragover="e => e.preventDefault()"
           @drop="handlePointerDrop">
        <div class="indicator">
          <div class="done"
               :style="{width: `${driver}%`}"></div>
          <div class="pointer"
               ref="pointer"
               draggable="true"
               :data-current-time="formatTime(currentTime)"
               :style="{left: `calc(${driver}%)`}">
          </div>
        </div>
      </div>

      <div class="tools_wrapper">
        <div class="left_tools">
          <div class="btn"><i class="iconfont icon-icon--"></i></div>
          <div class="btn"><i class="iconfont icon-kaishi"></i></div>
          <div class="btn"><i class="iconfont icon-mic-off"></i></div>
          <div class="btn"><i class="iconfont icon-yinliang"></i></div>
        </div>

        <div class="right_tools">
          <div class="btn"><i class="iconfont icon-shijian"></i></div>
          <div class="btn"><i class="iconfont icon-shijian"></i></div>
          <div class="btn"><i class="iconfont icon-shijian"></i></div>
          <div class="btn"><i class="iconfont icon-bofangqi-danmuguan"></i></div>
          <div class="btn"><i class="iconfont icon-bofangqi-danmukai"></i></div>
        </div>
      </div>
    </footer>
    <!-- 底部工具栏 结束 -->

  </div>
</template>

<script>
import {formatTime} from '../utils'

export default {
  name: 'gluttony-video',
  props: {
    src: {               /* 视频的src source路径 */
      type: [String, Array],
      require: true
    },
    title: {             /* 视频的标题 */
      type: String,
      default: ''
    },
    desc: {              /* 视频的描述信息 */
      type: String,
      default: ''
    },
    width: {             /* 整体元素的宽 */
      type: String,
      default: '600px'
    },
    height: {            /* 整体元素的高 */
      type: String,
      default: '400px'
    },
    backgroundColor: {   /*背景颜色 */
      type: String,
      default: 'black'
    },
    tipForStop: {        /* 停止按钮提示语 */
      type: String,
      default: '点击停止'
    },
    tipForPlay: {        /* 播放按钮提示语 */
      type: String,
      default: '点击播放'
    },
    loop: {              /* 是否循环播放 */
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      video: null,           /* video dom */
      isPlay: false,         /* 是否正在播放 */
      isCurtainShow: false,  /* 是否打开幕布 */
      duration: 0,           /* 视频时长 */
      currentTime: 0,        /* 视频播放时长 */
      currentSrc: '',        /* 视频地址 */
      circulation: null,     /* 循环器 */
      bufferd: null,         /* 缓冲时间对象 */
      driver: 0,             /* 进度条，指示器距离 */
    }
  },
  mounted() {
    this.video = this.$refs['gluttony_video']
    this.initCirculation()
  },
  watch: {
    isPlay(value) {
      if (value) {
        this.video.play()
        this.initCirculation()
      } else {
        this.video.pause()
      }
    },
    currentTime(value) {
      this.driver = (value / this.duration) * 100
    },
  },
  methods: {
    formatTime,
    handleVideoCanPlay(e) {
      this.duration = this.video.duration
      this.currentSrc = this.video.currentSrc
      this.$emit('canplay', e)
    },
    handleVideoEnded(e) {
      this.currentTime = this.duration
      this.isPlay = false
    },
    initCirculation() {
      if (this.circulation) clearInterval(this.circulation)
      this.circulation = setInterval(() => {
        this.currentTime = this.video.currentTime
        if (this.video.ended) {
          clearInterval(this.circulation)
          this.currentTime = 0
        }
      }, 100)
    },
    handlePointerDrop(e) {
      let {offsetX} = e
      offsetX = (offsetX > parseInt(this.width) - 14) ? parseInt(this.width) - 14 : offsetX
      this.$refs.pointer.style.left = `${offsetX}px`
      this.driver = (offsetX / parseInt(this.width)) * 100
      this.video.currentTime = this.duration * this.driver * 0.01
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/main";
@import "../style/font";
</style>
