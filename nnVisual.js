const nnCanvas = document.getElementById("nnVisualCanvas")
const nnCtx = nnCanvas.getContext('2d')
nnCanvas.width = 400 //window.innerWidth
nnCanvas.height = 300 //window.innerHeight


function drawNeuralNetwork(){
    nnCtx.fillStyle = "white"
    nnCtx.fillRect(0, 0, nnCanvas.width, nnCanvas.height)

    let focusBird = birds[0]

    let x = 50
    let y = 50
    let radius = 20
    let spacing = 60

    // Input nodes
    for(let i = 0; i < birds[0].inputs_length; i++){
        for(let j = 0; j < birds[0].hidden_layers_length; j++){
            nnCtx.beginPath()
            nnCtx.moveTo(x, y + i*spacing)
            nnCtx.lineTo(x + 100, y + 90 + j*spacing)
            nnCtx.stroke()
        }
        drawText(focusBird.birdWeights_ih.data[0][i].toFixed(2), x+50, y + i*spacing, "black")

        drawCircle(x, y, radius, i, spacing)
        drawText(focusBird.inputs[i].toFixed(2), x, y + i*spacing, "white")
    }

    // Hidden nodes
    for(let i = 0; i < birds[0].hidden_layers_length; i++){
        for(let j = 0; j < birds[0].outputs_length; j++){
            nnCtx.beginPath()
            nnCtx.moveTo(x + 100, y + 90 + i*spacing)
            nnCtx.lineTo(x + 200, y + 90 + j*spacing)
            nnCtx.stroke()
        }
        drawText(focusBird.birdWeights_ho.data[0][i].toFixed(2), x+150, y + 90, "black")

        drawCircle(x + 100, y + 90, radius, i, spacing)
        drawText(focusBird.brain.hidden.data[0][0].toFixed(2), x + 100, y + 90, "white")
    }

    // Output nodes
    for(let i = 0; i < birds[0].outputs_length; i++){
        let outputText
        if(focusBird.brain.output.data[0][0] > 0.5){
            outputText = 1
        } else{
            outputText = 0
        }

        drawCircle(x + 200, y + 90, radius, i, spacing)
        drawText(outputText, x + 200, y + 90, "white")
    }
}

function drawCircle(x, y, radius, index, spacing){
    nnCtx.beginPath()
    nnCtx.arc(x, y + index*spacing, radius, 0, 2*Math.PI, false)
    nnCtx.fillStyle = "black"
    nnCtx.stroke()
    nnCtx.fill()
}

function drawText(text, x, y, color){
    nnCtx.font = "16px Arial"
    nnCtx.fillStyle = color
    let textString = text,
    textWidth = nnCtx.measureText(textString).width
    nnCtx.fillText(textString , x - (textWidth / 2), y);
}