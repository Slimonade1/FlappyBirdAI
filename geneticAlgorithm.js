function nextGeneration(){
    calculateFitness()

    for(let i = 0; i < TOTAL; i++){
        birds[i] = pickOne()
    }
    savedBirds = []
}

function pickOne(){
    var index = 0
    var r = Math.random()

    while(r > 0){
        r = r - savedBirds[index].fitness
        index++
    }
    index--

    let bird = savedBirds[index]
    let child = new Bird(bird.brain)
    child.mutate()
    return child
}

function calculateFitness(){
    let sum = 0
    savedBirds.forEach(bird => {
        sum += bird.score
    })

    savedBirds.forEach(bird => {
        bird.fitness = bird.score / sum
    })
}