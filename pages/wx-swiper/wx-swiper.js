//实现原理：swiper里永远最多放3个元素，
//在swiper切换时根据原来的下标计算新的需要显示的item对应下标，
//然后组装好新的最多3个item数据渲染到页面
const demoImgSrc = 'https://img2.baidu.com/it/u=3440089178,4156925356&fm=26&fmt=auto';
var list = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swList: [],//swiper里的实际item（最多3个）
    showIdx: 0,//swiper里的实际item（最多3个）需要显示的那个item下标
    duration: 500, //swipper切换动画时间
    currItemNo: 1, //当前显示item对应在总数里的序号，例如swList共30条数据，currItemNo=15即当前显示的是第15个item
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这里模拟创建5000条数据(每条数据都含图)
    for (let i = 0; i < 5000; i++) {
      list.push({
        bgImg: demoImgSrc,
        title: "[第" + (i + 1) + "个]我是一个无限制数量的swiper",
        desc: "[第" + (i + 1) + "个]实现原理：swiper里永远最多放3个元素，在swiper切换时根据原来的下标计算新的需要显示的item对应下标，然后组装好新的最多3个item数据渲染到页面。"
      });
    }
    //初始化
    this.initSwiper();
  },
  /**
   * 初始化swiper
   */
  initSwiper: function () {
    this.setData({ swList: list.length > 3 ? [list[0], list[1], list[2]] : list });
  },
  /**
  * swiper切换监听
  */
  changeItem: function (e) {
    const $ = this;
    const currIdx = e.detail.current;
    var arr = list;
    var max = arr.length;
    let currItemNo = $.data.currItemNo;
    let swList;
    let showIdx;
    if (max > 3 && (currItemNo == 1 && currIdx == 1 || currItemNo > 1 && currIdx == 2 && currItemNo < max)) {
      //左滑-向右切换
      currItemNo += 1;
      swList = max <= 3 ? arr : (currItemNo == 2 ? [arr[currItemNo - 2], arr[currItemNo - 1], arr[currItemNo]] : (currItemNo == max ? [arr[currItemNo - 3], arr[currItemNo - 2], arr[currItemNo - 1]] : [arr[currItemNo - 2], arr[currItemNo - 1], arr[currItemNo]]));
      showIdx = currItemNo == 2 && currIdx == 1 ? 1 : (currItemNo < max ? 1 : 2);
      $.setData({ duration: 0 }, () => {
        $.setData({ currItemNo: currItemNo, swList: swList, showIdx: showIdx }, () => {
          $.setData({ duration: 500 });
        });
      });
    }
    else if (currIdx == 0 && currItemNo > 1 || currIdx == 1 && currItemNo == max) {
      //右滑-向左切换
      currItemNo = currItemNo - 1;
      swList = max <= 3 ? arr : (currItemNo > 2 ? [arr[currItemNo - 2], arr[currItemNo - 1], arr[currItemNo]] : [arr[0], arr[1], arr[2]]);
      showIdx = currItemNo == 1 ? 0 : 1;
      $.setData({ duration: 0 }, () => {
        $.setData({ currItemNo: currItemNo, swList: swList, showIdx: showIdx }, () => {
          $.setData({ duration: 500 });
        });
      });
    }
  },
  /**
   * 跳转到某一项
   */
  leapTo: function (e) {
    const $ = this;
    const num = Number(e.currentTarget.dataset.num);
    const idx = num - 1;
    let swList, showIdx;
    if (idx == 0) {
      swList = list.length <= 3 ? list : [list[idx], list[idx + 1], list[idx + 2]];
      showIdx = 0;
    }
    else if (idx == list.length - 1) {
      swList = list.length <= 3 ? list : [list[idx - 2], list[idx - 1], list[idx]];
      showIdx = 2;
    }
    else {
      swList = list.length <= 3 ? list : [list[idx - 1], list[idx], list[idx + 1]];
      showIdx = 1;
    }
    $.setData({ duration: 0 }, () => {
      $.setData({ currItemNo: num, swList: swList, showIdx: showIdx }, () => {
        $.setData({ duration: 500 });
      });
    });
  }
})