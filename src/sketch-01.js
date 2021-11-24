const canvasSketch = require('canvas-sketch')
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
}

// degToRad = (degrees) => {
//   return (degrees / 180) * Math.PI
// }

// randomRange = (min, max) => {
//   return Math.random() * (max - min) + 1
// }

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'tomato'
    context.fillRect(-5, 0, width, height)

    context.fillStyle = 'black'

    const cx = width * 0.1
    const cy = height * 0

    const w = width * 0.01
    const h = height * 0.1
    let x, y

    const num = 24
    const radius = width * 0.7

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num)
      const angle = random.range(slice * i)

      x = radius * Math.sin(angle)
      y = radius * Math.cos(angle)

      context.save()
      context.translate(cx, cy)
      context.translate(x, y)
      context.rotate(-angle)
      context.scale(random.range(0.1, -1), random.range(3, 0.5))

      context.beginPath()
      context.rect(
        random.range(1, -w * 5),
        random.range(0, -h * 0.2),
        w,
        h
      )
      context.fill()
      context.restore()

      context.save()
      context.translate(cx, cy)
      context.rotate(angle)

      context.lineWidth = random.range(5, 25)

      context.beginPath()
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -8),
        slice * random.range(1, 5)
      )
      context.stroke()

      context.restore()
    }
  }
}

canvasSketch(sketch, settings)
