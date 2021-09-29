# wx-swiper

#### 介绍
微信小程序swiper的优化，支持无限数量的swiper-item且不卡顿，支持设置跳转到指定item项

#### data说明
swList: swiper里的实际item（最多3个），默认[]
showIdx: swiper里的实际item（最多3个）需要显示的那个item下标，默认0
duration: swipper切换动画时间，默认500
currItemNo: 当前显示item对应在总数里的序号，默认1，例如swList共30条数据，currItemNo=15即当前显示的是第15个item

#### 方法说明
leapTo(num): 支持设置数量直接跳转

#### 使用说明

1.  修改project.config.json中的appid为你自己的小程序appid;
2.  微信开发者工具导入查看即可。

#### 效果如下
![效果演示](https://gitee.com/tiankf/wx-swiper/blob/master/demo.gif)

#### 鸣谢
如果wx-swiper对你有帮助，请star一下，谢谢了！