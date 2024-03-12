const canvas = document.getElementById("gameCanvas")
const c = canvas.getContext('2d')
canvas.width = 400 //window.innerWidth
canvas.height = 400 //window.innerHeight

let birds = []
let savedBirds = []
let pipes = []
let counter = 0
const TOTAL = 500

let gen = 0
let score = 0
let cycles = 1

for(let i = 0; i < TOTAL; i++){
    birds[i] = new Bird()
}

let bestBirdWeight


function animate(){
    cycles = document.getElementById("speedSlider").value

    for(let n = 0; n < cycles; n++){
        // Pipe spawner
        if(counter %100 == 0){
            pipes.push(new Pipe())
        }
        counter++

        
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update()
            pipes[i].score()

      
            for (let j = birds.length - 1; j >= 0; j--) {
              if (pipes[i].collision(birds[j])) {
                savedBirds.push(birds.splice(j, 1)[0])
              }
            }
      
            if (pipes[i].offscreen()) {
              pipes.splice(i, 1)
            }
        }

        birds.forEach((bird, index) => {
            bird.think(pipes)
            bird.update()

            if(bird.collision()){
                birds.splice(index, 1)
            }

        })

        if(birds.length === 0){
            retry()
            console.log(bestBirdWeight)
            console.log(bestBirdWeight.print())
        }
    }
    // All the drawing stuff
    // Background
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    birds.forEach(bird =>{
        bird.draw()
    })
    pipes.forEach(pipe =>{
        pipe.draw()
    })

    // See what the AI sees
    if(document.getElementById("theme").checked){
        drawLines()
    }

    // Neural network visualization
    drawNeuralNetwork()

    // Text on screen
    c.font = "15px Arial"
    c.fillStyle = "white"
    c.fillText("Gen: " + gen, 10, 20)
    
    c.font = "30px Arial"
    let textString = score,
    textWidth = c.measureText(textString).width
    c.fillText(textString , (canvas.width/2) - (textWidth / 2), 40);

    requestAnimationFrame(animate)
}

function drawLines(){
    if(pipes.length !== 0){
        let closest = null
        let closestD = Infinity
        for(let i = 0; i < pipes.length; i++){
            let d = pipes[i].x + pipes[i].width + birds[0].radius - birds[0].x
            if(d < closestD && d > 0){
                closest = pipes[i]
                closestD = d
            }
        }

        // See through the AI's eyes
        birds.forEach(bird =>{
            // Change line color to white
            c.strokeStyle = "white"

            // Draw top of pipe
            c.beginPath()
            c.moveTo(bird.x, bird.y)
            c.lineTo(closest.x, closest.top)
            c.stroke()

            // Draw bottom of pipe
            c.beginPath()
            c.moveTo(bird.x, bird.y)
            c.lineTo(closest.x, closest.bottom)
            c.stroke()
        })
    }
}

function drawNeuralNetwork(){
    let x = 280
    let y = 280
    let radius = 12

    for(let i = 0; i < birds[0].inputs_length; i++){
        for(let j = 0; j < birds[0].hidden_layers_length; j++){
            c.beginPath()
            c.moveTo(x, y + i*30)
            c.lineTo(x + 50, y + j*30)
            c.stroke()
        }

        drawCircle(x, y, radius, i, 30)

        c.font = "15px Arial"
        c.fillStyle = "white"
        c.fillText(i, x-4, y + 5 + i*30)
    }

    for(let i = 0; i < birds[0].hidden_layers_length; i++){
        drawCircle(x + 50, y, radius, i , 30)

        c.font = "15px Arial"
        c.fillStyle = "white"
        c.fillText(i, x + 50 - 4, y + 5 + i*30)
    }
}

function drawCircle(x, y, radius, index, spacing){
    c.beginPath()
    c.arc(x, y + index*30, radius, 0, 2*Math.PI, false)
    c.fillStyle = "black"
    c.stroke()
    c.fill()
}

function retry(){
    // Run score chart for the previous generations
    addData("Gen: " + gen, score)
    
    // Reset pipes and scores
    pipes = []
    counter = 0
    score = 0

    // Spawn the next generation
    gen++
    nextGeneration()
}

animate()