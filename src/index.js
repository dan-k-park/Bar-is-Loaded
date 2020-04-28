document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById("visualizer")
  let ctx = canvas.getContext("2d")

  createBar(ctx)
})



const createBar = ctx => {
  ctx.fillRect(0, 0, 40, 180)
  let input = document.getElementById("weight")
  input.addEventListener('input', createWeights)
}

const createWeights = evt => {
  console.log(evt.target.value)
}