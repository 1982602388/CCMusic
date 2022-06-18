// pages/search-detail/index.js
import {getSearchHot,getSearchSuggestChange,getSearchResult} from "../../service/api_search"
import debounce from "../../utils/debounce"
import stringToNodes from "../../utils/string2node"



const debounceSuggestChange=debounce(getSearchSuggestChange,300)

Page({
    data: {
        hotKeywords: [],
        suggestSongs:[],
        resultSongs:[],
        searchValue:"",
        suggestSongsNodes:[]
    },

    onLoad: function (options) {
        this.getDataPage()
    },
    // 请求数据
    getDataPage(){
        getSearchHot().then(res=>{
            this.setData({hotKeywords:res.result.hots})
        })
    },



    //事件绑定
    getSearchChange(event){
    // 获取搜索框的值
       const searchValue= event.detail
    //    保存搜索框的值（在页面用来做判断）
       this.setData({searchValue})

        // 3.判断关键字为空字符的处理逻辑
    if (!searchValue.length) {
        this.setData({ suggestSongs: [] })
        this.setData({ resultSongs: [] })
        debounceSuggestChange.cancel()
        return
      }

    //    获取搜索建议的动态值
      debounceSuggestChange(searchValue).then(res=>{
         // 1.获取建议的关键字歌曲
      const suggestSongs = res.result.allMatch
      this.setData({ suggestSongs })
      // 2.转成nodes节点
      // 获取到输入的关键字字符串数组  
      const suggestSongsNodes = []
      const suggestKeywords = suggestSongs.map(item => item.keyword).forEach(item=>{
        const nodes = stringToNodes(item, searchValue)
        suggestSongsNodes.push(nodes)
      })


      // const suggestKeywords=suggestSongs.map(item=>item.keyword)
      // const  suggestSongsNodes = []

      // for (const keyword of suggestKeywords) {
      //   const nodes = stringToNodes(keyword, searchValue)
      //   suggestSongsNodes.push(nodes)
      // }
      //  suggestKeywords.forEach(item=>{
      //   const nodes = stringToNodes(item, searchValue)
      //   suggestSongsNodes.push(nodes)
      // })
      this.setData({ suggestSongsNodes })
    })
    },


    //搜索结果歌曲列表
    handleSearchAction(){
      const searchValue=this.data.searchValue

      getSearchResult(searchValue).then(res=>{
          this.setData({ resultSongs: res.result.songs })
      })
    },
    handleKeywordItemClick: function(event) {
      // 1.获取点击的关键字
      const keyword = event.currentTarget.dataset.keyword
  
      // 2.将关键设置到searchValue中
      this.setData({ searchValue: keyword })
  
      // 3.发送网络请求
      this.handleSearchAction()
    }

})