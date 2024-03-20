const gameCanvas = document.getElementById("gameCanvas")
const gameCtx = gameCanvas.getContext('2d')
gameCanvas.width = 400 //window.innerWidth
gameCanvas.height = 400 //window.innerHeight

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
            //console.log(bestBirdWeight.print())
        }
    }
    // All the drawing stuff
    // Background
    gameCtx.fillStyle = "black"
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height)

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
    // VIRKER IKKE FUCKING IKKE
    if(birds[0].inputs[0] !== undefined){
        drawNeuralNetwork()
    }

    // Text on screen
    gameCtx.font = "15px Arial"
    gameCtx.fillStyle = "white"
    gameCtx.fillText("Gen: " + gen, 10, 20)
    
    gameCtx.font = "30px Arial"
    let textString = score,
    textWidth = gameCtx.measureText(textString).width
    gameCtx.fillText(textString , (gameCanvas.width/2) - (textWidth / 2), 40);

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
            gameCtx.strokeStyle = "white"

            // Draw top of pipe
            gameCtx.beginPath()
            gameCtx.moveTo(bird.x, bird.y)
            gameCtx.lineTo(closest.x, closest.top)
            gameCtx.stroke()

            // Draw bottom of pipe
            gameCtx.beginPath()
            gameCtx.moveTo(bird.x, bird.y)
            gameCtx.lineTo(closest.x, closest.bottom)
            gameCtx.stroke()
        })
    }
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