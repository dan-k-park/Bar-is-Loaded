let WEIGHTS = [
  {w: 25, color: 'red'}
]

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('visualizer')
  let ctx = canvas.getContext('2d')

  createBar(ctx, canvas)
})



const createBar = (ctx, canvas) => {
  console.log(canvas.width)
  ctx.beginPath()
  ctx.rect(canvas.width - 30, canvas.height / 2 - 10, 30, 20)
  ctx.fillStyle = '#cccccc'
  ctx.fill();

  let input = document.getElementById('weight')
  input.addEventListener('input', createWeights)
}

const createWeights = evt => {
  // if (evt.target.value < 25) {
  //   alert('Must be more than 25kg')
  // }
  console.log(evt.target.value)
}