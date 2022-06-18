// 正则(regular)表达式(expression): 字符串匹配利器

// [00:58.65]
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lyricStrings = lyricString.split("\n")

  const lyricInfos = []
  for (const lineString of lyricStrings) {
    // [00:58.65]他们说 要缝好你的伤 没有人爱小丑
    const timeResult = timeRegExp.exec(lineString)
    // console.log(timeResult);
    // 0: "[03:44.85]"
    // 1: "03"
    // 2: "44"
    // 3: "85"
    if (!timeResult) continue
    // 1.获取时间
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10: millsecondTime * 1
    const time = minute + second + millsecond

    // 2.获取歌词文
    // [03:44.85]战吗？战啊！以最孤高的梦,timeRegExp匹配[03:44.85]，
    // 并且将其设置为“”空，因此拿到后面歌词
    const text = lineString.replace(timeRegExp, "")
    lyricInfos.push({ time, text })
  }

  return lyricInfos
}
