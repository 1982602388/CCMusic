import{getMVURL,getMVDetail,getRelatedVideo} from "../../service/api_video"
// pages/detail-video/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mvURLInfo: {},
        mvDetail: {},
        relatedVideos: [],
        danmuList:
    [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //1.获取id
        const id=options.id

        //2.获取视频
        getMVURL(id).then(res=>{
          this.setData({mvURLInfo:res.data})
        })
        getMVDetail(id).then(res=>{
           this.setData({mvDetail:res.data})
        })
        getRelatedVideo(id).then(res=>{
            this.setData({relatedVideos:res.data})
        })
    },
})