import hyRequest from './index'
export function getTopMV(offset,limit=10){
    return hyRequest.get("/top/mv",{
        offset,
        limit
    })
}

//获取mv播放地址
export function getMVURL(id){
    return hyRequest.get("/mv/url",{
        id
    })
}

//获取mv详情
export function getMVDetail(mvid){
    return hyRequest.get("/mv/detail",{
        mvid
    })
}

//获取相关视频
export function getRelatedVideo(id) {
    return hyRequest.get("/related/allvideo", {
      id
    })
  }