class Pipe{

    constructor(){
        this.x = gameCanvas.width
        this.y = 0

        this.width = 50
        this.height = (Math.random() * (0.7-0.1) + 0.1) * gameCanvas.height
        this.distance = 120

        this.top = this.height
        this.bottom = this.height + this.distance

        this.color = "white"
        this.velocity = 2

        this.scoreAchieved = false
    }

    drawRect(x, y, w, h){
        gameCtx.beginPath()
        gameCtx.rect(x, y, w, h)
        gameCtx.fillStyle = this.color
        gameCtx.fill()
    }

    draw(){
        this.drawRect(this.x, this.y, this.width, this.height)
        this.drawRect(this.x, this.bottom, this.width, gameCanvas.height)
    }

    collision(bird){
        // Bird die detection
        if(bird.x + bird.radius >= this.x && bird.x - bird.radius <= this.x + this.width){
            if(bird.y - bird.radius <= this.height || bird.y + bird.radius >= this.height + this.distance){
                return true
            }
        }
    }

    score(){
        if(this.scoreAchieved){
            return
        }

        let x = gameCanvas.width/4
        let radius = 15

        if(x - radius > this.x + this.width){
            this.scoreAchieved = true
            score++
        }

    }

    offscreen(){
        if(this.x + this.width <= 0){
            return true
        }
    }

    update(){
        this.x -= this.velocity
    }

}