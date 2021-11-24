const canvasSketch = require('canvas-sketch')

const settings = {
  dimensions: [1080, 1080],
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'grey'
    context.fillRect(0, 0, width, height)
    context.strokeStyle = '#360ccc'
    context.lineWidth = width * 0.01

    const w = width * 0.1
    const h = height * 0.1
    const gap = width * 0.03
    const ix = width * 0.17
    const iy = height * 0.17
    let x, y

    const off = width * 0.02

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i
        y = iy + (h + gap) * j

        context.beginPath()
        context.strokeRect(x, y, w, h)
        context.strokeStyle = '#5218fa'

        if (Math.random() > 0.5) {
          context.beginPath()
          context.strokeRect(x + off / 2, y + off / 2, w - off, h - off)
          context.strokeStyle = '#93ccea'
        }
      }
    }
  }
}

const artists = ['Paramore', 'Marina Sena', 'Willow']

function listArtist() {
  for (let i = 0; i < 3; i++) {
    console.log(artists[i])
  }
}

listArtist()

canvasSketch(sketch, settings)
