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

上述代码有问题 长页打印会缺失

参考以下

>  https://www.cnblogs.com/cmyoung/p/11609996.html

```js
/*
 * @Description: html 转为 pdf 并下载
 * @Author: cmyoung
 * @Date: 2018-08-10 19:07:32
 * @LastEditTime: 2019-08-23 16:34:18
 */

/**
 * @param html { String } DOM树
 * @param isOne { Boolean }  是否为单页 默认 否(false)
 * @return 文件 {pdf格式}
 */

'use strict'
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default async (html, isOne) => {
  let contentWidth = html.clientWidth // 获得该容器的宽
  let contentHeight = html.clientHeight // 获得该容器的高
  let canvas = document.createElement('canvas')
  let scale = 2  // 解决清晰度问题，先放大 2倍

  canvas.width = contentWidth * scale // 将画布宽&&高放大两倍
  canvas.height = contentHeight * scale
  canvas.getContext('2d').scale(scale, scale)

  let opts = {
    scale: scale,
    canvas: canvas,
    width: contentWidth,
    height: contentHeight,
    useCORS: true
  }

  return html2canvas(html, opts).then(canvas => {
    let pageData = canvas.toDataURL('image/jpeg', 1.0) // 清晰度 0 - 1
    let pdf

    if (isOne) {
      // 单页
      console.log(contentWidth, 'contentWidth')
      console.log(contentHeight, 'contentHeight')

      // jspdf.js 插件对单页面的最大宽高限制 为 14400
      let limit = 14400

      if (contentHeight > limit) {
        let contentScale = limit / contentHeight
        contentHeight = limit
        contentWidth = contentScale * contentWidth
      }

      let orientation = 'p'
      // 在 jspdf 源码里，如果是 orientation = 'p' 且 width > height 时， 会把 width 和 height 值交换，
      // 类似于 把 orientation 的值修改为 'l' , 反之亦同。
      if (contentWidth > contentHeight) {
        orientation = 'l'
      }

      // orientation Possible values are "portrait" or "landscape" (or shortcuts "p" or "l")
      pdf = new jsPDF(orientation, 'pt', [contentWidth, contentHeight]) // 下载尺寸 a4 纸 比例

      // pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
      pdf.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight)
    } else {
      //一页 pdf 显示 html 页面生成的 canvas高度
      let pageHeight = (contentWidth / 552.28) * 841.89
      //未生成 pdf 的 html页面高度
      let leftHeight = contentHeight
      //页面偏移
      let position = 0
      //a4纸的尺寸[595.28,841.89]，html 页面生成的 canvas 在pdf中图片的宽高
      let imgWidth = 555.28
      let imgHeight = (imgWidth / contentWidth) * contentHeight

      pdf = new jsPDF('', 'pt', 'a4') // 下载尺寸 a4 纸 比例
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage()
          }
        }
      }
    }
    return pdf
  })
}
```

> https://segmentfault.com/p/1210000012294101/read