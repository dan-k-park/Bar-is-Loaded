let PLATES = [
  {w: 25, color: "red", num: 0, width: 21, height: 250},
  {w: 20, color: "blue", num: 0, width: 19, height: 250},
  {w: 15, color: "yellow", num: 0, width: 17, height: 230},
  {w: 10, color: "green", num: 0, width: 17, height: 200},
  {w: 5, color: "white", num: 0, width: 17.5, height: 170},
  {w: 2.5, color: "black", num: 0, width: 12, height: 140},
  {w: 1.25, color: "silver", num: 0, width: 8, height: 110},
  {w: 0.5, color: "silver", num: 0, width: 7, height: 90},
  {w: 0.25, color: "silver", num: 0, width: 6, height: 70}
]

let UNITS = "Kilograms"

let WEIGHT = {
  "kg": 25,
  "lb": 55
}

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("visualizer")
  let ctx = canvas.getContext("2d")
  let input = document.getElementById("weight")
  let kg_radio = document.getElementById("kg")
  let lb_radio = document.getElementById("lb")
  
  kg_radio.addEventListener("click", changeUnits)
  lb_radio.addEventListener("click", changeUnits)
  input.addEventListener("input", calculateWeight)
  drawBar(ctx, canvas)
  drawGuide(ctx)

  // Initial readout when no input has been submitted
  // defaults to 25kg/55lb i.e. empty bar w/ collar
  ctx.font = "60px Arial"
  ctx.fillStyle = "black"
  ctx.fillText(`25kg | 55lb`, canvas.width / 3.4, 70)
})

const changeUnits = evt => {
  console.log(evt.target.id)
  let convertedWeight = 0
  if (evt.target.id == "lb") {
    UNITS = "Pounds"
    convertedWeight = WEIGHT.lb
  } else {
    UNITS = "Kilograms"
    convertedWeight = WEIGHT.kg
  }

  let obj = {
    'target': {
      'value': convertedWeight
    }
  }
  calculateWeight(obj)
}

const calculateWeight = evt => {

  let weight = 0
  if (UNITS == "Kilograms") {
    weight = evt.target.value - 25
    WEIGHT.kg = weight
    WEIGHT.lb = Math.floor(weight * 2.20462) + 55
  } else {
    weight = Math.ceil(evt.target.value / 2.20462) - 25
    WEIGHT.kg = weight
    WEIGHT.lb = evt.target.value - 55
  }

  let canvas = document.getElementById("visualizer")
  let ctx = canvas.getContext("2d")

  // Reset from previous loads
  PLATES.forEach(plate => plate.num = 0)

  for (let i = 0; i < PLATES.length; i++) {
    if (Math.floor(weight / (PLATES[i].w * 2)) > 0) {
      PLATES[i].num = Math.floor(weight / (PLATES[i].w * 2))
      weight = weight % (PLATES[i].w * 2)
    }
  }

  ctx.clearRect(0,0, canvas.width, canvas.height);

  ctx.font = "60px Arial"
  ctx.fillStyle = "black"
  if (WEIGHT.kg <= 0) {
    ctx.fillText(`25kg | 55lb`, canvas.width / 3.4, 70)
  } else {
    ctx.fillText(`${WEIGHT.kg + 25}kg | ${Math.floor((WEIGHT.kg + 25) * 2.20462)}lb`, canvas.width / 3.4, 70)
  }

  drawGuide(ctx)
  drawBar(ctx, canvas)
  drawWeight(ctx, canvas, weight)
}


const drawGuide = ctx => {
  ctx.font = "15px Arial"
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.arc(30, 80 + 40 * i, 14, 0, 2 * Math.PI, false);
    ctx.fillStyle = PLATES[i].color
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black"
    ctx.stroke();
    ctx.fillStyle = "black"
    ctx.fillText(`${PLATES[i].w}kg x ${PLATES[i].num}`, 50, 86 + 40 * i);
  }
}

const drawBar = (ctx, canvas) => {
  ctx.beginPath()
  ctx.rect(canvas.width - 30, canvas.height / 2 - 12, 40, 24)
  ctx.fillStyle = "#cccccc"
  ctx.fill();
  ctx.strokeRect(canvas.width - 30, canvas.height / 2 - 12, 60, 24);
  
  ctx.beginPath()
  ctx.rect(canvas.width - 42, canvas.height / 2 - 30, 12, 60)
  ctx.fillStyle = "#cccccc"
  ctx.fill();
  ctx.strokeRect(canvas.width - 42, canvas.height / 2 - 30, 12, 60)
  
  ctx.beginPath()
  ctx.rect(canvas.width - 344, canvas.height / 2 - 20, 300, 40)
  ctx.fillStyle = "#cccccc"
  ctx.fill();
  ctx.strokeRect(canvas.width - 344, canvas.height / 2 - 20, 300, 40)

  if (WEIGHT.kg == 25) {
    createCollar(ctx, canvas, 82)
  }
}

const drawWeight = (ctx, canvas) => {
  let currStack = 0
  let prevStack = 0
  for (let i = 0; i < PLATES.length; i++) {
    if (PLATES[i].num > 0) {
      for (let j = 1; j <= PLATES[i].num; j++) {
        currStack = j * PLATES[i].width + prevStack
        ctx.beginPath()
        ctx.rect(canvas.width - (42 + currStack), canvas.height / 2 - PLATES[i].height / 2, PLATES[i].width, PLATES[i].height)
        ctx.fillStyle = PLATES[i].color
        ctx.fill();
        ctx.strokeRect(canvas.width - (42 + currStack), canvas.height / 2 - PLATES[i].height / 2, PLATES[i].width, PLATES[i].height)
      }
    }
    prevStack = currStack
  }
  
  createCollar(ctx, canvas, prevStack + 82)
}

const createCollar = (ctx, canvas, xOffset) => {
  ctx.beginPath()
  ctx.rect(canvas.width - xOffset, canvas.height / 2 - 40, 40, 80)
  ctx.fillStyle = "#cccccc"
  ctx.fill();
  ctx.strokeRect(canvas.width - xOffset, canvas.height / 2 - 40, 40, 80)
}
