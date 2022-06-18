import hyRequest from "./index"

// 轮播图
export function getBanners(){
    return hyRequest.get("/banner",{
        type:2
    })
}
// 歌曲排行
export function getRankings(idx){
    return hyRequest.get("/top/list",{
        idx
    })
}

// 歌单
export function getSongMenu(cat="全部",limit=6,offset=0){
    return hyRequest.get("/top/playlist",{
        cat,
        limit,
        offset
    })
}

export function getMenuDetailItem(id){
    return hyRequest.get('/playlist/detail/dynamic',{
        id
    })
}