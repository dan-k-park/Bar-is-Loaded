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
  let kgRadio = document.getElementById("kg")
  let lbRadio = document.getElementById("lb")
  let instructionsButton = document.getElementById("open-instructions")
  
  kgRadio.addEventListener("click", changeUnits)
  lbRadio.addEventListener("click", changeUnits)
  input.addEventListener("input", changeWeights)
  instructionsButton.addEventListener("click", toggleInstructions)
  drawBar(ctx, canvas)
  drawGuide(ctx)

  // Initial readout when no input has been submitted
  // defaults to 25kg/55lb i.e. empty bar w/ collar
  ctx.font = "60px Arial"
  ctx.fillStyle = "black"
  ctx.fillText(`25kg | 55lb`, canvas.width / 3.2, 70)

  ctx.font = "20px Arial"
  ctx.fillStyle = "black"
  ctx.fillText("Note: this rendering represents only one end of the barbell", 20, canvas.height - 25)
})

const changeUnits = evt => {
  if (evt.target.id == "lb" && UNITS != "Pounds") {
    UNITS = "Pounds"
    // Take current weight which is in kg, keep the same number but transform into lb variant
    WEIGHT.lb = WEIGHT.kg
    WEIGHT.kg = Math.ceil(WEIGHT.lb / 2.20462)
  } 
  if (evt.target.id == "kg" && UNITS != "Kilograms") {
    if (WEIGHT.lb > 600) {
      alert("Please enter a lower weight.")
      document.getElementById("weight").value = ""
      clearCanvas()
      UNITS = "Kilograms"
      WEIGHT.kg = 25
      WEIGHT.lb = 55
    } else {
      UNITS = "Kilograms"
      WEIGHT.kg = WEIGHT.lb
      WEIGHT.lb = Math.floor(WEIGHT.kg * 2.20462)
    }
  }

  clearCanvas()
  calculateWeight()
}

const changeWeights = evt => {
  if (evt.target.value == 0) {
    document.getElementById("weight").value = ""
  }
  
  if (evt.target.value > 600 && UNITS == "Kilograms" || evt.target.value > 1322 && UNITS == "Pounds") {
    alert("Please enter a lower weight.")
    document.getElementById("weight").value = ""
    clearCanvas()
  }

  let weight = evt.target.value
  if (UNITS == "Kilograms") {
    WEIGHT.kg = weight
    WEIGHT.lb = Math.floor(weight * 2.20462)
  } else {
    WEIGHT.kg = Math.ceil(evt.target.value / 2.20462)
    WEIGHT.lb = weight
  }

  calculateWeight()
}

const calculateWeight = () => {
  let weight = 0
  if (UNITS == "Kilograms") {
    weight = WEIGHT.kg
  } else {
    weight = Math.ceil(WEIGHT.lb / 2.20462)
  }

  weight = weight - 25

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

  clearCanvas();

  ctx.font = "60px Arial"
  ctx.fillStyle = "black"
  if (WEIGHT.kg <= 25) {
    ctx.fillText(`25kg | 55lb`, canvas.width / 3.2, 70)
  } else {
    ctx.fillText(`${WEIGHT.kg}kg | ${WEIGHT.lb}lb`, canvas.width / 3.4, 70)
  }

  drawGuide(ctx)
  drawBar(ctx, canvas)
  drawWeight(ctx, canvas, weight)

  ctx.font = "20px Arial"
  ctx.fillStyle = "black"
  ctx.fillText("Note: this rendering represents only one end of the barbell", 20, canvas.height - 25)

}


const drawGuide = ctx => {
  ctx.font = "15px Arial"
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.arc(30, 100 + 40 * i, 14, 0, 2 * Math.PI, false);
    ctx.fillStyle = PLATES[i].color
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black"
    ctx.stroke();
    ctx.fillStyle = "black"
    ctx.fillText(`${PLATES[i].w}kg x ${PLATES[i].num}`, 50, 106 + 40 * i);
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

const toggleInstructions = () => {
  let open = document.getElementById("open-instructions")
  let close = document.getElementById("close-instructions")
  let main = document.getElementById("main-content")
  let instructions = document.getElementById("instructions")

  open.classList.add("hidden")
  close.classList.remove("hidden")
  main.classList.add("hidden")
  instructions.classList.remove("hidden")

  close.addEventListener("click", () => {
    open.classList.remove("hidden")
    close.classList.add("hidden")
    main.classList.remove("hidden")
    instructions.classList.add("hidden")
  })
}

clearCanvas = () => {
  let canvas = document.getElementById("visualizer")
  let ctx = canvas.getContext("2d")
  ctx.clearRect(0,0, canvas.width, canvas.height);
}
