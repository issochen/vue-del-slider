/**
 * Create by CSJ on 2019/01/18
 */
import VueDelSliderCompnent from './VueDelSlider.vue'

const VueDelSlider = {
  install: function (Vue) {
    Vue.component('vue-del-slider', VueDelSliderCompnent)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.VueDelSlider = VueDelSlider
  Vue.use(VueDelSlider)
}
export default VueDelSlider