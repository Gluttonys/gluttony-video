export function formatTime(number) {
  /*
  * 格式化小数时间
  *
  * number : Number : 时长 单位 s
  * */
  if (number < 60) {
    return `${number.toFixed()} s`
  } else if (number < 60 * 60) {
    const min = Math.floor(number / 60)
    const sec = number - min * 60
    return `${min} m : ${sec.toFixed()} s`
  } else if (number < 60 * 60 * 60) {
    const hour = Math.floor(number / 3600)
    const min = Math.floor((number - hour * 3600) / 60)
    const sec = number - hour * 3600 - min * 60
    return `${hour} h : ${min} m : ${sec.toFixed()} s`
  }
}
