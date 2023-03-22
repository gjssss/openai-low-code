export function rgbaToHex(color) {
  // 匹配颜色值中的数值部分
  const regexp = /(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/
  const match = color.match(regexp)

  if (match) {
    // 提取颜色值中的 R、G、B 和 A 值
    const r = Math.round(parseInt(match[1], 10))
    const g = Math.round(parseInt(match[2], 10))
    const b = Math.round(parseInt(match[3], 10))
    const a = match[4] ? Math.round(parseFloat(match[4]) * 255) : 255
    // 转换为 HEX 颜色值
    return '#' + toHex(r) + toHex(g) + toHex(b) + toHex(a)
  }

  // 如果颜色值无法匹配，返回 color
  return color
}

function toHex(num) {
  let numStr = num.toString(16)
  if (numStr.length === 1) {
    numStr = '0' + numStr
  }
  return numStr
}
