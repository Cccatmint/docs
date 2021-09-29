# 使用canvas画时钟

```html
...
<body>
    <canvas height=150 width=150>
		浏览器不支持canvas时显示这段文字
    </canvas>
    <script src="./clock.js"></script>
</body>


...
```

clock.js

```js
const message = document.getElementById('message')
message.innerText = '数字显示'
message.style = 'color: red; border: 1px solid #000'
function clock (){
  let now = new Date()
  let ctx = document.getElementById('canvas').getContext('2d')
  ctx.save();
  ctx.clearRect(0, 0, 150, 150);
  ctx.translate(75, 75);
  ctx.scale(0.4, 0.4);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round"

  // Hour marks
  ctx.save();
  ctx.lineWidth = 10
  for (var i=0;i<12;i++){
    ctx.beginPath();
    ctx.rotate(Math.PI/6);
    ctx.moveTo(100,0);
    ctx.lineTo(120,0);
    ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5
  ctx.strokeStyle = "blue"
  for (var i=0;i<60;i++){
    if (i % 5 != 0) {
      ctx.beginPath();
      ctx.moveTo(100,0);
      ctx.lineTo(120,0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI/30);
  }
  ctx.restore();

  // get second minute hour
  const second = now.getSeconds()
  const minute = now.getMinutes()
  let hour = now.getHours()
  hour = hour>=12 ? hour-12 : hour;
  message.innerText = `${hour} : ${minute} : ${second}`

  // write Hours
  ctx.save()
  ctx.lineWidth = 10
  ctx.strokeStyle = "red"
  ctx.rotate( hour*(Math.PI/6) + (Math.PI/360)*minute + (Math.PI/21600)*second )
  ctx.beginPath()
  ctx.moveTo(-20, 0)
  ctx.lineTo(60, 0)
  ctx.stroke()
  ctx.restore()

  // write Minutes
  ctx.save()
  ctx.lineWidth = 5
  ctx.strokeStyle = "green"
  ctx.rotate( minute * Math.PI / 30 + second * Math.PI / 1800)
  ctx.beginPath()
  ctx.moveTo(-25, 0)
  ctx.lineTo(80, 0)
  ctx.stroke()
  ctx.restore()

  // write Seconds
  ctx.save()
  ctx.lineWidth = 2
  ctx.strokeStyle = "blue"
  ctx.rotate( second * Math.PI / 30)
  ctx.beginPath()
  ctx.moveTo(-25, 0)
  ctx.lineTo(90, 0)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0,0,3,0, Math.PI * 2 , true) // 画表中心的各指针交点轴
  ctx.fill()
  ctx.restore()
  ctx.restore() // 要退回最初时状态
  
  window.requestAnimationFrame(clock) // 动画控制
}

window.requestAnimationFrame(clock) // 动画控制

```

