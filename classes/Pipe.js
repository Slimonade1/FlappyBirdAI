class Pipe{

    constructor(){
        this.x = canvas.width
        this.y = 0

        this.width = 50
        this.height = (Math.random() * (0.7-0.1) + 0.1) * canvas.height
        this.distance = 120

        this.top = this.height
        this.bottom = this.height + this.distance

        this.color = "white"
        this.velocity = 2
    }

    drawRect(x, y, w, h){
        c.beginPath()
        c.rect(x, y, w, h)
        c.fillStyle = this.color
        c.fill()
    }

    draw(){
        this.drawRect(this.x, this.y, this.width, this.height)
        this.drawRect(this.x, this.bottom, this.width, canvas.height)
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
        let x = canvas.width/4
        let radius = 20

        if(x - radius == this.x + this.width){
            score += 1
            document.getElementById("score").innerHTML = "Score: " + score
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