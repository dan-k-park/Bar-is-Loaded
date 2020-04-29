let PLATES = [
  {w: 25, color: 'red', num: 0, width: 27, height: 200},
  {w: 20, color: 'blue', num: 0, width: 22.5, height: 200},
  {w: 15, color: 'yellow', num: 0, width: 21, height: 180},
  {w: 10, color: 'green', num: 0, width: 21, height: 150},
  {w: 5, color: 'white', num: 0, width: 21.5, height: 120},
  {w: 2.5, color: 'black', num: 0, width: 16, height: 90},
  {w: 1.25, color: 'silver', num: 0, width: 12, height: 60},
  {w: 0.5, color: 'silver', num: 0, width: 8, height: 40},
  {w: 0.25, color: 'silver', num: 0, width: 6, height: 30}
]

let UNITS = 'kg'

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('visualizer')
  let ctx = canvas.getContext('2d')
  let input = document.getElementById('weight')
  input.addEventListener('input', changeEverything)
  createBar(ctx, canvas)
  createGuide(ctx)
  createWeight(ctx, canvas, 0)
})

const changeEverything = evt => {
  let weight = evt.target.value - 25
  let canvas = document.getElementById('visualizer')
  let ctx = canvas.getContext('2d')

  PLATES.forEach(plate => plate.num = 0)


  for (let i = 0; i < PLATES.length; i++) {
    if (Math.floor(weight / (PLATES[i].w * 2)) > 0) {
      PLATES[i].num = Math.floor(weight / (PLATES[i].w * 2))
      weight = weight % (PLATES[i].w * 2)
    }
  }

  ctx.clearRect(0,0, canvas.width, canvas.height);
  createGuide(ctx)
  createBar(ctx, canvas)
  createWeight(ctx, canvas, weight)
}

const createBar = (ctx, canvas) => {
  ctx.beginPath()
  ctx.rect(canvas.width - 30, canvas.height / 2 - 12, 60, 24)
  ctx.fillStyle = '#cccccc'
  ctx.fill();
  ctx.strokeRect(canvas.width - 30, canvas.height / 2 - 12, 60, 24);
  
  ctx.beginPath()
  ctx.rect(canvas.width - 42, canvas.height / 2 - 30, 12, 60)
  ctx.fillStyle = '#cccccc'
  ctx.fill();
  ctx.strokeRect(canvas.width - 42, canvas.height / 2 - 30, 12, 60)
  
  ctx.beginPath()
  ctx.rect(canvas.width - 332, canvas.height / 2 - 20, 288, 40)
  ctx.fillStyle = '#cccccc'
  ctx.fill();
  ctx.strokeRect(canvas.width - 330, canvas.height / 2 - 20, 288, 40)

}

const createGuide = ctx => {
  ctx.font = '15px Arial'
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.arc(30, 80 + 40 * i, 14, 0, 2 * Math.PI, false);
    ctx.fillStyle = PLATES[i].color
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black'
    ctx.stroke();
    ctx.fillStyle = 'black'
    ctx.fillText(`${PLATES[i].w}kg x ${PLATES[i].num}`, 50, 86 + 40 * i);
  }
}

const createWeight = (ctx, canvas, weight) => {
  if (weight < 25) {
    // collar
    ctx.beginPath()
    ctx.rect(canvas.width - 84, canvas.height / 2 - 40, 40, 80)
    ctx.fillStyle = '#cccccc'
    ctx.fill();
    ctx.strokeRect(canvas.width - 84, canvas.height / 2 - 40, 40, 80)
  }

  for (let i = 0; i < PLATES.length; i++) {
    if (PLATES[i].num > 0) {
      for (let j = 0; j < PLATES[i].num; j++) {
        ctx.beginPath()
        ctx.rect(canvas.width - 42 + j * PLATES[i].width, canvas.height / 2 - PLATES[i].height / 2, PLATES[i].width, PLATES[i].height)
        ctx.fillStyle = PLATES[i].color
        ctx.fill();
        ctx.strokeRect(canvas.width - 42 + j * PLATES[i].width, canvas.height / 2 - PLATES[i].height / 2, PLATES[i].width, PLATES[i].height)
      }
    }
  }
}

