import {rankingstore,rankingMap} from '../../store/index'

import {getBanners, getRankings, getSongMenu} from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'
// 节流
const throttleQuery = throttle(queryRect,1000,{trailing:true})
// pages/home-music/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      banners:[],
      swiperHeight:0,
      recommendSongs:[],
      hotSongMenu:[],
      recommendSongMenu:[],
      rankings:{0:{}, 2:{}, 3:{}}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 获取页面数据
      this.getPageData()

      // 发送网络请求
     rankingstore.dispatch("getRankingDataAction")
     
    //  共享store数据
    rankingstore.onState("hotRanking",res=>{
      // 因为刚开始获取到的res.tracks是空的，所以需要判断一下
      if(!res.tracks) return
        const recommendSongs=res.tracks.slice(0,6)
        this.setData({recommendSongs})
    })
    rankingstore.onState("newRanking",this.getRankingHandler(0))
    rankingstore.onState("originRanking",this.getRankingHandler(2))
    rankingstore.onState("upRanking",this.getRankingHandler(3))

    },
    //请求网络数据
    getPageData(){
      getBanners().then(res=>{
        this.setData({banners:res.banners})  
      })
      // 歌单
      getSongMenu().then(res=>{
        this.setData({hotSongMenu:res.playlists})
      })

      getSongMenu("华语").then(res=>{
        this.setData({recommendSongMenu:res.playlists})
      })
    },
    //事件绑定
    getRankingHandler(idx){
      return res=>{
        if(Object.keys(res).length === 0) return
        const name = res.name
        const coverImgUrl = res.coverImgUrl
        const playCount = res.playCount
        const songList = res.tracks.slice(0,3)
        const rankingObj = {name,coverImgUrl,playCount, songList}
        const newRankings = {...this.data.rankings,[idx]:rankingObj}
        this.setData({
          rankings:newRankings
        })

      }

    },

    handleSearchClick(){
        wx.navigateTo({
          url: '../search-detail/index',
        })
    },
    handleSwiperImageLoad(){
      
        //获取图片高度
        throttleQuery('.swiper-image').then(res=>{
          this.setData({swiperHeight:res[0].height})
        })

    },

    // 点击跳转歌曲详情页
    handleMoreClick(){
      this.navigateToDetailSongPage("hotRanking")
    },
    handleRankClick(event){
// 因为 rankings:{0:{}, 2:{}, 3:{}}
// 所以在页面data-idx="{{index}}"中的index会是0/2/3呈现
      const idx=event.currentTarget.dataset.idx
      console.log(idx);
      const rankingName=rankingMap[idx]
     this.navigateToDetailSongPage(rankingName)
    },
    navigateToDetailSongPage(rankingName){
      wx.navigateTo({
        // 这里发送的ranking在跳转页面的js文件中onload获取
        url: `../detail-songs/index?ranking=${rankingName}&type=rank`,
      })
    },
    
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
})