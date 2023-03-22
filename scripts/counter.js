/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')

const srcDir = path.resolve(__dirname, '../src') // src文件夹路径

const countLines = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8')
    const lines = data.split('\n').filter((line) => line.trim() !== '')
    return lines.length
  } catch (err) {
    console.error(`Failed to read file ${filePath}:`, err)
    return 0
  }
}

const countLinesRecursively = async (dirPath, extensions, result = {}) => {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      await countLinesRecursively(fullPath, extensions, result)
    } else if (entry.isFile() && extensions.includes(path.extname(fullPath))) {
      const linesCount = await countLines(fullPath)
      const extension = path.extname(fullPath).slice(1)
      result[extension] = (result[extension] || 0) + linesCount
    }
  }

  return result
}

const extensions = ['.vue', '.js', '.jsx', '.css', '.scss']
countLinesRecursively(srcDir, extensions)
  .then((result) => {
    let sum = 0
    for (let key in result) {
      sum += result[key]
    }
    result['sum'] = sum
    console.log('Code lines count:', result)
  })
  .catch((err) => {
    console.error('Failed to count code lines:', err)
  })
