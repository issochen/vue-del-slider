<template>
  <section class="del-slider">
    <section
      class="slider-item"
      ref="slider-item"
      v-for="(item, index) of length"
      :key="index"
      :data-key="index"
      @touchstart="touchStart"  
      @touchmove="touchMove"  
      @touchend="touchEnd"
      @click="clicks($event,index)"
    >
      <div class="item-img-wrapper" v-if="options.img">
        <img class="item-img" :src="options.imgUrl[index]" alt="">
      </div>
      <div
        class="item-con"
        :class="{'item-one-con': !(options.title[index] && subTitle[index])}"
      >
        <p class="item-title" v-if='options.title[index]'>
          {{options.title[index]}}
        </p>
        <p class="item-desc" v-if='subTitle[index]'>{{subTitle[index]}}</p>
      </div>
      <slot name="icon"></slot>
      <section class="delete" ref="delete">{{options.delTitle || '删除'}}</section>
    </section>
    
  </section>
</template>

<script>
 /**
   * @data Vue对象数据
   * @touchStart 手指按下触发的方法
   * @touchMove 手指滑动触发的方法
   * @touchEnd 手指离开屏幕触发的方法 
   *    
  */
export default {
  props: {
    options: { type: Object }
  },
  computed: {
    length () {
      if (!this.options.length) {
        return 1
      } else {
        return this.options.length
      }
    },
    subTitle () {
      if (!this.options.subTitle) {
        return []
      } else {
        return this.options.subTitle
      }
    }
  },
  data () {
    return {
      ele: null,  // 所有滑动元素数组
      i: null,  // 操作滑块的索引
      delEleW: 0,   // 删除滑块的 宽度
      startX: 0,  // 初始手指位置
      moveX: 0,    // 手指移动位置
      direction: [], // 滑动方向   1 为向左滑  0 为向右滑
      flag: [],      //  当前滑块 状态  0为初始状态  1 为已滑动状态
      // deviceW: 0,   //  屏幕宽度
      tag: []
    }
  },
  mounted () {   //初始化 滑块的 data值
    // this.deviceW = document.documentElement.clientWidth   // 屏幕宽度
    for(let i = 0; i < this.length; i++ ) {
      this.flag.push(0)
      this.tag.push(0)
    }
    this.ele = this.$refs['slider-item']    // 滑动元素 
    this.delEleW = this.$refs['delete'][0].clientWidth    // 删除元素的宽度
  },
  methods: {
    clicks (e,index) {
      const ele = e.srcElement || e.target
      if(ele.className.indexOf('delete') !== -1) {
        this.$emit('del', index)  // 将点击 删除按钮 事件抛出去
      } else if (ele.className.indexOf('icon-item') !== -1) {
        this.$emit('edit', index)   // 将点击 icon 图标 事件 抛出去
      } else { 
        this.$emit('clicks', index)   // 将点击 滑块主体  事件 抛出去
      }
    },
    touchStart (e) {
      //判断 点击 哪个滑块
      let ele = e.srcElement || e.target
      //获取 操作哪个滑块
      this.i = ele.parentNode.getAttribute('data-key') || ele.parentNode.parentNode.getAttribute('data-key')
      if (!this.i) return
      this.ele[this.i].style.transition = ''    // 清空 滑块 过渡效果
      if(e.touches.length > 1) return    // 当俩个手指滑动 停止
      this.startX = e.touches[0].clientX
    },
    touchMove (e) {
      if (!this.i) return
      if(e.touches.length > 1) return    // 当俩个手指滑动 停止
      this.moveX = e.touches[0].clientX
      // 判断滑动方向
      if (this.moveX > this.startX ) {
        this.direction[this.i] = 0
      } else {
        this.direction[this.i] = 1
      }
      // 左滑情况
      if (this.direction[this.i]) {
        if (this.flag[this.i] === 1 ) {   // 滑块 在最终状态  不做任何操作 
          return
        } else {
          let x = this.moveX - this.startX
          this.ele[this.i].style.transform = `translateX(${x/100}rem)`
        }
      }
      //右滑情况
      if (!this.direction[this.i]) {
        if (this.flag[this.i] === 0)  {    // 滑块在初始状态 不做任何操作
          return
        } else {
          let x = this.moveX - this.startX - this.delEleW
          if (x > 0) this.tag[this.i] = 1
          this.ele[this.i].style.transform = `translatex(${x/100}rem)`
        }
      }
    },
    touchEnd (e) {
      if (this.moveX < 10) return   // 不滑动 则不继续操作
      //判断在那位置停止的
      // 初始状态往左滑 之后手指 停止的时候状态
      if (this.direction[this.i] && this.flag[this.i] === 0 ) {
        let x = Math.abs(this.moveX - this.startX)
        if (x > this.delEleW* .5) {// 滑动超过一半
          let distance = this.delEleW / 100
          this.ele[this.i].style.transition = 'all .5s'
          this.ele[this.i].style.transform = `translateX(-${distance}rem)`
          this.flag[this.i] = 1   //改变滑块状态
        } else {  // 滑动没超过一半
          this.ele[this.i].style.transition = 'all .5s'
          this.ele[this.i].style.transform = `translateX(0rem)`
        }
      }
      // 最终状态往右滑 之后 手指停止的时候状态
      if (!this.direction[this.i] && this.flag[this.i] === 1) {
        let x = Math.abs(this.moveX - this.startX - this.delEleW)
        if (x < this.delEleW * .5 || this.tag[this.i] ) { // 滑动超过一半
          this.ele[this.i].style.transition = 'all .5s'
          this.ele[this.i].style.transform = `translateX(0rem)`
          this.flag[this.i] = 0   //改变滑块状态
          this.tag[this.i] = 0
        } else { // 滑动没超过一半
          let distance = this.delEleW / 100
          this.ele[this.i].style.transition = 'all .5s'
          this.ele[this.i].style.transform = `translateX(-${distance}rem)`
        }
      } 
    }
  }
}
</script>
<style>
  .del-slider{
    padding: .32rem;
    box-sizing: border-box;
    padding-bottom: 0;
    padding-top: 0;
    overflow: hidden;
  }
  .del-slider > .slider-item{
    position: relative;
    display: flex;
    height: 1rem;
    padding-top: .32rem;
    padding-bottom: .32rem;
    border-bottom: .02rem solid #eee
  }
  .slider-item > .item-img-wrapper{
    overflow: hidden;
    width: 1rem;
    height: 1rem;
    margin-right: .28rem
  }
  .slider-item > .item-img-wrapper > .item-img{
    width: 100%;
    height: 100%
  }
  .slider-item > .item-con{
    flex: 1;
    width: 4.6rem;
  }
  .slider-item > .item-one-con {
    line-height: 1rem;
  }
  .slider-item > .item-con > p{
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap; 
  }
  .slider-item > .item-con > .item-title{
    font-size: .32rem;
    /* line-height: .44rem; */
    color: #333;
  }
  .slider-item > .item-con > .item-desc{
    font-size: .32rem;
    /* line-height: .44rem; */
    color: #999;
  }
  .slider-item > .icon-item {
    font-size: .48rem;
    line-height: 1rem;
    color: #bbb;
  }
  .slider-item > .delete{
    position: absolute;
    right: -1.72rem;
    width: 1.4rem;
    height: 1rem;
    font-size: .32rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    background: #d15454;
  }
</style>


