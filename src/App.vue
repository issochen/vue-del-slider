<template>
  <section>
    <section class="adress-item">
      <vue-del-slider
        :options="options"
        @clicks="clicks"
        @del="del"
        @edit="edit"
      > 
        <i slot="icon" class="iconfont icon-item">&#xe626;</i>
      </vue-del-slider>
    </section>
  </section>
</template>

<script>
import VueDelSlider from './myPlugin/VueDelSlider'
export default {
  name: 'AddressItem',
  components: {
    VueDelSlider
  },
  data () {
    return {
      options: {
        title: [],
        subTitle: [],
        delTitle: '删除',
        img: true,
        imgUrl: [],
        length: 3
      },
      datas: [
        { title: '滑块1', subTitle: '我是滑块1', 'imgUrl': 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=703993660,718082542&fm=58' },
        { title: '滑块2', subTitle: '我是滑块2', 'imgUrl': 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3847062394,3287057785&fm=58' },
        { title: '滑块3', subTitle: '我是滑块3', 'imgUrl': 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=925249851,658687033&fm=58' },
      ]
    }
  },
  mounted () {
    for (let i = 0; i< this.datas.length; i++) {
      this.options.title.push(this.datas[i].title)
      this.options.subTitle.push(this.datas[i].subTitle)
      this.options.imgUrl.push(this.datas[i].imgUrl)
    }
  },
  methods: {
    clicks (i) {
      // console.log('clicks', i)
    },
    del (i) {
      console.log('del', i)
    },
    edit (i) {
      // console.log('edit')
    }
  }
}
</script>

<style>

</style>




