const canvasSketch = require('canvas-sketch')

const settings = {
  dimensions: [1080, 1080],
}

const sketch = () => {
  return ({ context, width, height }) => {
    //setting a bg gradiente color
    const fill = context.createLinearGradient(-0, 0, 0, height)

    fill.addColorStop(1, 'red')
    fill.addColorStop(1, 'green')
    fill.addColorStop(0, 'yellow')

    context.fillStyle = fill
    context.fillRect(0, 0, width, height)

    //grid area
    const cols = 10
    const rows = 15
    const numCells = rows * cols //total of cells

    const gridw = width * 0.8 //width of 80% of the canvas
    const gridh = height * 0.8 //height of 80% of the canvas
    const cellw = gridw / cols //width of each cell of the grid
    const cellh = gridh / rows //height of each cell of the grid
    const margx = (width - gridw) * 0.5 //margin of the grid
    const margy = (height - gridh) * 0.5 //margin of the grid

    for (i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cellw
      const y = row * cellh
      const w = cellw * 0.8
      const h = cellh * 0.8

      context.save()
      context.translate(x, y)
      context.translate(margx, margy)
      context.translate(cellw * 0.5, cellh * 0.5)

      context.lineWidth = 4

      context.beginPath()
      context.moveTo(w * -0.5, 0)
      context.lineTo(w * 0.5, 0)
      context.stroke()

      context.restore()
    }
  }
}

canvasSketch(sketch, settings)
