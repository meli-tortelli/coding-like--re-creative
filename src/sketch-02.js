const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
}

//for reference
// const animate = () => {
//   console.log('domestika')
//   requestAnimationFrame(animate)
// }
// animate()

const sketch = ({ context, width, height }) => {
  const agents = []

  for (let i = 0; i < random.range(50, 200); i++) {
    const x = random.range(0, width)
    const y = random.range(0, height)

    agents.push(new Agent(x, y))
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i]

      for (let j = i + 0; j < agents.length; j++) {
        const other = agents[j]

        const dist = agent.pos.getDistance(other.pos)

        if (dist > 200) continue

        context.beginPath()
        context.moveTo(agent.pos.x, agent.pos.y)
        context.lineTo(other.pos.x, other.pos.y)
        context.stroke()
      }
    }

    agents.forEach((agent) => {
      agent.update()
      agent.draw(context)
      agent.bouce(width, height)
    })
  }
}

canvasSketch(sketch, settings)

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getDistance(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y

    return Math.sqrt(dx * dx + dy * dy)
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.velocity = new Vector(random.range(-1, 1), random.range(-1, 1))
    this.radius = random.range(4, 12)
  }

  bouce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.velocity.x *= -1
    if (this.pos.y <= 0 || this.pos.y >= height) this.velocity.y *= -1
  }

  update() {
    this.pos.x += this.velocity.x
    this.pos.y += this.velocity.y
  }

  draw(context) {
    context.save()
    context.translate(this.pos.x, this.pos.y)

    context.lineWidth = 4

    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI * 2)
    context.fill()
    context.stroke()

    context.restore()
  }
}
