document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById("visualizer")
  let ctx = canvas.getContext("2d")
  let input = document.getElementById("weight")


  createBar(ctx)
})



const createBar = ctx => {
  ctx.fillRect(0, 170, 40, 180)
}