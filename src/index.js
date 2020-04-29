let PLATES = [
  {w: 25, color: 'red'},
  {w: 20, color: 'blue'},
  {w: 15, color: 'yellow'},
  {w: 10, color: 'green'},
  {w: 5, color: 'white'},
  {w: 2.5, color: 'black'},
  {w: 1.25, color: 'silver'},
  {w: 0.5, color: 'silver'},
  {w: 0.25, color: 'silver'}
]

let UNITS = 'kg'
let WEIGHT = 25

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('visualizer')
  let ctx = canvas.getContext('2d')
  let input = document.getElementById('weight')

  createBar(ctx, canvas)
  createGuide(ctx, canvas, input)
})



const createBar = (ctx, canvas) => {
  ctx.beginPath()
  ctx.rect(canvas.width - 30, canvas.height / 2 - 12, 60, 24)
  ctx.fillStyle = '#cccccc'
  ctx.fill();
  ctx.strokeRect(canvas.width - 30, canvas.height / 2 - 12, 30, 24);
  
  ctx.beginPath()
  ctx.rect(canvas.width - 42, canvas.height / 2 - 30, 12, 60)
  ctx.fillStyle = '#cccccc'
  ctx.fill();
  ctx.strokeRect(canvas.width - 42, canvas.height / 2 - 30, 12, 60)
  
  ctx.beginPath()
  ctx.rect(canvas.width - 312, canvas.height / 2 - 20, 268, 40)
  ctx.fillStyle = '#cccccc'
  ctx.fill();
  ctx.strokeRect(canvas.width - 310, canvas.height / 2 - 20, 268, 40)

  for (let i = 25; i >= 5; i -= 5) {
    console.log(i)
  }
}

const createGuide = (ctx, input) => {
  ctx.font = '15px Arial'
  for (let i = 0; i <= 9; i++) {
    ctx.beginPath();
    ctx.arc(30, 30 + 40 * i, 14, 0, 2 * Math.PI, false);
    ctx.fillStyle = PLATES[i].color
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black'
    ctx.stroke();
    ctx.fillStyle = 'black'
    ctx.fillText(`${PLATES[i].w}kg x 0`, 50, 36 + 40 * i);
  }
}

