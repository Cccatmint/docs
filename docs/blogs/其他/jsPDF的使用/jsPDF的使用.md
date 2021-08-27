`npm i html2canvas`

`npm i jspdf`

因为 jspdf 对于中文字体不支持

所以需要html2canvas 转化为图片后再转化为pdf

```js
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
/**
 *
 * @param {String} dom 为 id字符串或者 '#xxxxxx'
 * @param {String} title 文件名
 */
const getPdf = async (dom, title) => {
  await new Promise((resolve, reject) => {
    try {
      // 避免模糊，放大倍数,倍数可调整
      const el = document.getElementById(dom) || document.querySelector(dom)
      var c = document.createElement('canvas')
      var opts = {
        scale: 3,
        canvas: c,
        allowTaint: false,
        logging: true,
        useCORS: true,
        width: window.getComputedStyle(el).width.replace('px', '') * 1,
        height: window.getComputedStyle(el).height.replace('px', '') * 1
      }
      c.width = window.getComputedStyle(el).width.replace('px', '') * 3
      c.height = window.getComputedStyle(el).height.replace('px', '') * 3
      c.getContext('2d').scale(1, 1)
      html2Canvas(el, opts).then(async canvas => {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        const pageHeight = (contentWidth / 592.28) * 841.89
        let leftHeight = contentHeight
        let position = 0
        const imgWidth = 595.28
        const imgHeight = (592.28 / contentWidth) * contentHeight
        const pageData = await canvas.toDataURL('image/jpeg', 1.0)
        const PDF = await new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          await PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            await PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              await PDF.addPage()
            }
          }
        }
        await PDF.save(title + '.pdf')
        resolve()
      })
    } catch (error) {
      reject(error)
    }
  })
}
export { getPdf }

```

