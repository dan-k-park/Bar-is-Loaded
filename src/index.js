document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById("visualizer")
  let ctx = canvas.getContext("2d")
  createBar(ctx)
})



const createBar = ctx => {
  ctx.fillRect(0, 0, 40, 180)
  createWeights()
}

const createWeights = () => {
  let input = document.getElementById("weight")
}