import hyRequest from "./index"
export function getSearchHot(){
    return hyRequest.get("/search/hot")
}

export function getSearchSuggestChange(keywords){
    return hyRequest.get("/search/suggest",{
        keywords,
        type:"mobile"
    })
}

export function getSearchResult(keywords) {
    return hyRequest.get("/search", {
      keywords
    })
  }