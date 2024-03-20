class Bird{
    constructor(brain){
        this.x = gameCanvas.width/4
        this.y = gameCanvas.height/2

        this.radius = 15
        this.gravity = 0
        this.velocity = 4

        this.score = 0
        this.fitness = 0

        this.inputs_length = 4
        this.hidden_layers_length = 1
        this.outputs_length = 1

        this.inputs = []

        if(brain){
            this.brain = brain.copy()
        } else{
            this.brain = new NeuralNetwork(this.inputs_length, this.hidden_layers_length, this.outputs_length)
        }

        this.birdWeights_ih = this.brain.birdWeights_ih
        this.birdWeights_ho = this.brain.birdWeights_ho
    }

    draw(){
        gameCtx.beginPath()
        gameCtx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        gameCtx.strokeStyle = "black"
        gameCtx.fillStyle = "rgba(255, 255, 255, 0.5)"
        gameCtx.stroke()
        gameCtx.fill()
    }

    flap(){
        this.gravity = -this.velocity
    }

    mutate(){
        this.brain.mutate(0.1)
    }

    think(pipes){
        // Find closest pipe
        let closest = null
        let closestD = Infinity
        for(let i = 0; i < pipes.length; i++){
            let d = pipes[i].x + pipes[i].width + this.radius - this.x
            if(d < closestD && d > 0){
                closest = pipes[i]
                closestD = d
            }
        }

        this.inputs = []
        this.inputs[0] = this.y         / gameCanvas.height
        this.inputs[1] = closest.top    / gameCanvas.height
        this.inputs[2] = closest.bottom / gameCanvas.height
        this.inputs[3] = closest.x      / gameCanvas.width

        let output = this.brain.predict(this.inputs)
        if(output[0] > 0.5){
            this.flap()
        }

    }

    update(){
        this.score++
        this.gravity += 0.25
        this.y += this.gravity
    }

    collision(){
        // Ground detection
        if(this.y + this.radius > gameCanvas.height){
            return true
        }

        // Roof detection
        if(this.y - this.radius < 0){
            return true
        }
    }

}