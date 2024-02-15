const canvas = document.querySelector('canvas')
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


function animate(){
    cycles = document.getElementById("speedSlider").value

    for(let n = 0; n < cycles; n++){
        // Pipe spawner
        if(counter %100 == 0){
            pipes.push(new Pipe())
        }
        counter++

        
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
      
            for (let j = birds.length - 1; j >= 0; j--) {
              if (pipes[i].collision(birds[j])) {
                savedBirds.push(birds.splice(j, 1)[0]);
              }
            }
      
            if (pipes[i].offscreen()) {
              pipes.splice(i, 1);
            }
        }

        birds.forEach(bird => {
            bird.think(pipes)
            bird.update()
        })

        if(birds.length === 0){
            counter = 0
            nextGeneration()
            gen++
            document.getElementById("gen").innerHTML = "Gen: " + gen
            pipes = []
        }
    }
    // All the drawing stuff
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    birds.forEach(bird =>{
        bird.draw()
    })
    pipes.forEach(pipe =>{
        pipe.draw()
    })

    requestAnimationFrame(animate)
}

/* addEventListener('click', (event) => 
    {
        bird.flap()
    }
) */

animate()