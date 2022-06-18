
// pages/detail-songs/index.js
import {rankingstore} from '../../store/index'
import {getMenuDetailItem} from "../../service/api_music"


Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:"",
        songInfo:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const type=options.type
        this.setData({type})
      if(type==="Menu"){
        const id = options.id
        getMenuDetailItem(id).then(res=>{
            this.setData({songInfo:res.playlist})
        })
      }
      else if(type==="rank"){
            // 获取从音乐页面点击跳转事件传送过来的ranking
        const ranking=options.ranking
        // 共享数据
        rankingstore.onState(ranking,this.getRankingDataHandle())
      }
    },
    // 事件绑定
    getRankingDataHandle(){
        return res=>{
            this.setData({songInfo:res})
        }
    },
    onUnload: function () {
        if (this.data.ranking) {
          rankingStore.offState(this.data.ranking, this.getRankingDataHanlder)
        }
      },

})
