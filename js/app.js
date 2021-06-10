const basicShapesApp = {
    name: 'Basic shapes app',
    description: 'Canvas app fro basic shapes drawing',
    version: '1.0.0',
    author: 'Germán Álvarez',
    license: undefined,
    repository: undefined,
    ctx: undefined,
    canvasDOM: undefined,
    canvasSize: { w: undefined, h: undefined },
    init() {
        this.setContext()
        this.setDimensions()
    },
    setContext() {
        this.canvasDOM = document.querySelector('#myCanvas')
        this.ctx = this.canvasDOM.getContext('2d')
        console.log('Echa un vistazo al contexto 2d:', this.ctx)
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDOM.setAttribute('width', this.canvasSize.w)
        this.canvasDOM.setAttribute('height', this.canvasSize.h)
    },
    drawFilledSquares() {
        this.ctx.fillRect(this.canvasSize.w / 2 - 50, this.canvasSize.h / 2 - 50, 100, 100)
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.canvasSize.w / 2 - 250, this.canvasSize.h / 2 - 25, 500, 50)
        this.ctx.fillStyle = '#d2d2d2'
        this.ctx.fillRect(this.canvasSize.w / 2 - 20, this.canvasSize.h / 2 - 250, 40, 500)
    },
    drawOutlinedSquares() {
        this.ctx.strokeRect(this.canvasSize.w / 2 - 50, this.canvasSize.h / 2 - 50, 100, 100)
        this.ctx.lineWidth = 5
        this.ctx.strokeStyle = 'green'
        this.ctx.strokeRect(0, this.canvasSize.h / 2 - 50, 500, 200)
        this.ctx.lineWidth = 20
        this.ctx.strokeStyle = 'red'
        this.ctx.strokeRect(this.canvasSize.w - 500, 100, 500, 200)
    },
    drawRegularLines() {
        this.ctx.beginPath()
        this.ctx.moveTo(100, 100)
        this.ctx.lineTo(800, 100)
        this.ctx.lineTo(800, 600)
        this.ctx.lineTo(600, 500)
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.strokeStyle = 'red'
        this.ctx.lineWidth = 6

        this.ctx.beginPath()
        this.ctx.moveTo(800, 800)
        this.ctx.lineTo(40, 40)
        this.ctx.stroke()
        this.ctx.closePath()
    },
    drawDashedLines() {
        this.ctx.lineWidth = 20
        this.ctx.beginPath()
        this.ctx.setLineDash([60, 30])
        this.ctx.moveTo(this.canvasSize.w / 2 - 10, 100)
        this.ctx.lineTo(this.canvasSize.w / 2 - 10, this.canvasSize.h - 100)
        this.ctx.stroke()
        this.ctx.closePath()
    },
    drawArc() {
        this.ctx.fillStyle = 'red'
        this.ctx.lineWidth = 20

        this.ctx.beginPath()
        this.ctx.arc(this.canvasSize.w / 2, this.canvasSize.h / 2, 200, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()
    },
    insertImage() {
        const imageInstance = new Image()
        imageInstance.src = 'img/ball.png'
        imageInstance.onload = () => this.ctx.drawImage(imageInstance, 100, 100, 200, 200)
    }
}




const interactionApp = {
    name: 'Interaction app',
    description: 'Canvas app for basic shapes interaction',
    version: '1.0.0',
    author: 'Germán Álvarez',
    license: undefined,
    repository: undefined,
    ctx: undefined,
    canvasDOM: undefined,
    ball: undefined,
    canvasSize: { w: undefined, h: undefined },
    init() {
        this.setContext()
        this.setDimensions()
        this.start()
    },
    setContext() {
        this.canvasDOM = document.querySelector('#myCanvas')
        this.ctx = this.canvasDOM.getContext('2d')
        console.log('Echa un vistazo al contexto 2d:', this.ctx)
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDOM.setAttribute('width', this.canvasSize.w)
        this.canvasDOM.setAttribute('height', this.canvasSize.h)
    },
    setListeners() {
        document.onkeyup = e => {
            e.key === 'ArrowLeft' ? this.ball.moveLeft() : null
            e.key === 'ArrowRight' ? this.ball.moveRight() : null
        }
    },
    start() {
        this.createBall()
        this.setListeners()

        setInterval(() => {
            this.clearScreen()
            this.drawAll()
        }, 70)
    },

    createBall() {
        this.ball = new Ball(this.ctx, 200, 200, 100, 100, 'ball.png')
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.ball.draw()
    }
}



class Ball {

    constructor(ctx, ballPosX, ballPosY, ballWidth, ballHeight, ballImg) {
        this.ctx = ctx
        this.ballPos = { x: ballPosX, y: ballPosY }
        this.ballSize = { w: ballWidth, h: ballHeight }
        this.ballImage = ballImg
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.ballImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    }

    moveLeft() {
        this.ballPos.x -= 10
    }

    moveRight() {
        this.ballPos.x += 10
    }
}





const animationApp = {
    name: 'Animation app',
    description: 'Canvas app for shapes animating',
    version: '1.0.0',
    author: 'Germán Álvarez',
    license: undefined,
    repository: undefined,
    ctx: undefined,
    canvasDOM: undefined,
    camels: [],
    canvasSize: { w: undefined, h: undefined },
    framesCounter: 0,
    init() {
        this.setContext()
        this.setDimensions()
        this.start()
    },
    setContext() {
        this.canvasDOM = document.querySelector('#myCanvas')
        this.ctx = this.canvasDOM.getContext('2d')
        console.log('Echa un vistazo al contexto 2d:', this.ctx)
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        this.canvasDOM.setAttribute('width', this.canvasSize.w)
        this.canvasDOM.setAttribute('height', this.canvasSize.h)
    },
    start() {
        this.createCamels()

        setInterval(() => {
            this.clearScreen()
            this.moveAll()
            this.drawAll()
            this.framesCounter++
            this.framesCounter % 20 === 0 ? console.log('OBSTÁCULO VAAAA') : null
        }, 30)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.camels.forEach(elm => elm.draw())
    },
    moveAll() {
        this.camels.forEach(elm => elm.move())
    },
    createCamels() {
        const camel1 = new Camel(this.ctx, 10, 100, 200, 150, 10, this.canvasSize)
        const camel2 = new Camel(this.ctx, 10, 400, 100, 75, 20, this.canvasSize)
        const camel3 = new Camel(this.ctx, 10, 600, 250, 210, 7, this.canvasSize)

        this.camels.push(camel1, camel2, camel3)
    }
}


class Camel {

    constructor(ctx, posX, posY, width, height, speed, canvasSize) {
        this.ctx = ctx
        this.camelPos = { x: posX, y: posY }
        this.camelSize = { w: width, h: height }
        this.camelImage = 'camel.png'
        this.imageInstance = undefined
        this.camelSpeed = speed
        this.canvasSize = canvasSize

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.camelImage}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.camelPos.x, this.camelPos.y, this.camelSize.w, this.camelSize.h)
    }

    move() {

        if (this.camelPos.x >= this.canvasSize.w - this.camelSize.w || this.camelPos.x <= 0) {
            this.turn()
        }

        this.camelPos.x += this.camelSpeed
    }

    turn() {
        this.camelSpeed *= -1
    }
}