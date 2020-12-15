const canvas = document.getElementById("myCanvas");
const winWidth = window.innerWidth; //窗口宽度
const winHeight = window.innerHeight; // 窗口高度
const rects = []; // 存放方块的数组
let out1 = true // 鼠标是否超出方块左右边界
let out2 = true // 鼠标是否超出方块上下边界
let h = 0 // 方块宽高
for (let i = 50; i< 1000; i++) { // 根据页面高度 动态设置方块高度
    if (winHeight % i === 0) {
        h = i
        console.log(h)
        break
    }
}
let boundaryleft = 0 // 方块左边界
let boundaryRight = h // 方块右边界
let boundaryTop = 0 // 方块上边界
let boundaryBottom = h // 方块下边界
if (canvas.width  < window.innerWidth) {
    canvas.width  = window.innerWidth;
}
if (canvas.height < window.innerHeight) {
    canvas.height = window.innerHeight;
}
function getRandomColor(){ // 随机颜色生成
    return  '#' + (function(color){
        return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)]) && (color.length == 6) ?  color : arguments.callee(color);
    })('');
}
const ctx = canvas.getContext('2d');
for (let i = 0; i < (winWidth / h); i++) {  // 绘制方块
    for (let j = 0; j< Math.round(winHeight / h); j++) {
        // 每块填充色
        ctx.fillStyle = '#ff9600'
        // 位置就
        ctx.fillRect(h * i,  h * j, h,  h)
        rects.push({
            x: h * i,
            y: h * j,
            width: h,
            height: h,
            color: '#ff9600'
        })
    }
}
canvas.onmousemove = onMouseMove;
function onMouseMove(e) {  //鼠标移动事件
    const result = rects.filter((item) => {
        return item.x <= e.pageX && item.y <= e.pageY
    })
    const x = Math.max.apply(Math,result.map(item => { return item.x }))
    const y = Math.max.apply(Math,result.map(item => { return item.y }))
    const rect =  rects.filter((item, index) => {
        return item.x === x && item.y === y
    })
    if (e.pageX >= boundaryRight || e.pageX < boundaryleft ) {
        out1 = true
    } else {
        out1 = false
    }
    if (e.pageY >= boundaryBottom || e.pageY < boundaryTop ) {
        out2 = true
    } else {
        out2 = false
    }
    if (rect[0].x !== 0) {
        boundaryleft = rect[0].x + 1
        boundaryRight = (rect[0].x / h + 1) * h
    } else {
        boundaryleft = 0
        boundaryRight = h
    }
    if (rect[0].y !== 0) {
        boundaryTop = rect[0].y + 1
        boundaryBottom = (rect[0].y / h + 1) * h
    } else {
        boundaryTop = 0
        boundaryBottom = h
    }
    if (out1) {
        ctx.fillStyle = getRandomColor()
    }
    if (out2) {
        ctx.fillStyle = getRandomColor()
    }
    ctx.fillRect(x, y, rect[0].width, rect[0].height)
}
