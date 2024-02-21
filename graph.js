
//lav et chart med tiderne
let ctx = document.getElementById("myChart").getContext("2d")
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: 0,
        datasets: [{
            label: 'Graf',
            data: 0,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: false, // Gør chartet ikke responsivt
        maintainAspectRatio: false, // Gør chartet ikke fastholder aspect ratio
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})

function addData(label, newData) {
    myChart.data.labels.push(label)
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData)
    })
    myChart.update()
}
