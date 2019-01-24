# vue删除滑块

## 效果
![image](http://www.chenshujin.cn/example.gif)

## 下载
```
npm install --save vue-del-slider
```
## 用法
main.js
```javascript
  import VueDelSlider from 'vue-del-slider'
  Vue.use(VueDelSlider)  
```
组件中
```javascript
  <vue-del-slider
    :options="options"
    @clicks="clicks"
    @del="del"
    @edit="edit"
  > 
    <i slot="icon" class="iconfont icon-item">&#xe626;</i>        // 滑块左侧的icon 图片
  </vue-del-slider>
```
## 配置项
```javascript
options: {
  title: ['滑块1','滑块2','滑块3'],
  subTitle: ['我是滑块1', '我是滑块2', '我是滑块3'],      // 不写默认没有副标题
  //delTitle: '删除',
  img: true,
  imgUrl: ['https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=703993660,718082542&fm=58', ...],
  length: 3  // 不写默认为1
}
```

## 参数
```javascript
options  配置滑块内容 如主标题，副标题 ，是否显示右侧图片和图片地址， 几个滑块
@clicks  点击滑块的回调函数 函数第一个参数为当前操作滑块的索引值
@del     点击删除的回调函数 函数第一个参数为当前操作滑块的索引值
@edit    点击左侧icon的回调函数 函数第一个参数为当前操作滑块的索引值
```




