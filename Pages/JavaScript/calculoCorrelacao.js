let a
let b
function calcCorrelacao() {
    let variavelX = $('input[name="rent"]')[0];
    let variavelY = $('input[name="mortgage"]')[0];
    let variavelXarray  = variavelX.value.split(';');
    let variavelYarray = variavelY.value.split(';');
    if (variavelXarray[0] === "" || variavelYarray[0] === ""){
        alert("Preencha os campos que faltam")
    }else {
        let n = variavelXarray.length
        let somaX = 0
        let somaY = 0
        let somaXY = 0
        let somaX2 = 0
        let somaY2 = 0
        let coordenada = []
        for (let i = 0; i < variavelXarray.length; i++) {
            somaX += parseFloat(variavelXarray[i]);
            somaY += parseFloat(variavelYarray[i]);
            let coords = {}
            coords.x = variavelXarray[i]
            coords.y = variavelYarray[i]
            coordenada.push(coords)
            somaXY += (parseFloat(variavelXarray[i]) * parseFloat(variavelYarray[i]));
            somaX2 += (Math.pow(parseFloat(variavelXarray[i]), 2));
            somaY2 += (Math.pow(parseFloat(variavelYarray[i]), 2));
        }
        let correlacao = ((((n * somaXY) - (somaX) * (somaY)) / (Math.sqrt((n * somaX2 - Math.pow(somaX, 2))) * Math.sqrt(n * somaY2 - Math.pow(somaY, 2)))) * 100).toFixed(2)
         a = (((n * somaXY) - (somaX * somaY)) / ((n * somaX2) - (Math.pow(somaX, 2)))).toFixed(2)
         b = ((somaY / n) - (a * (somaX / n))).toFixed(2)
        let regressao = []
        for (let i = 0; i < variavelXarray.length; i++) {
            let regreAux = {}
            regreAux.x = variavelXarray[i]
            regreAux.y = (a * variavelXarray[i]) + parseFloat(b)
            regressao.push(regreAux)
        }
        let equacaoY = `Y = ${a}.X + ${b}`
        document.getElementById("medidas-correlacao").innerHTML = `<tr><td>${correlacao}%</td><td>${equacaoY}</td></tr>`
        let ctx = document.getElementById('correlacaoChart');
        var scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Regressão',
                    data: coordenada,
                    pointBackgroundColor: 'purple',
                    backgroundColor: 'white',
                    borderColor: 'purple',
                    showLine: false
                },
                    {
                        label: 'Obervações',
                        data: regressao,
                        pointBackgroundColor: 'blue',
                        backgroundColor: 'white',
                        borderColor: 'blue',
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        });
        document.getElementById('pontoFuturo').style.display = 'block'
        document.getElementById('tabela-correlacao').style.display = 'block'
    }
}
function pontoFuturo() {
    if (document.getElementById("escolhaFuturo").value === 'X'){
        let input1 = document.getElementById('p1')
        let input2 = document.getElementById('p2')
        let variavel = $('input[id="p1"]').val();

        if (variavel !== "") {
            let pFuturo = 0
            pFuturo = ((a * variavel) + parseFloat(b))
            console.log(isNaN(pFuturo))
            if (isNaN(pFuturo)){
                $('input[id="p2"]').val("")
            }else {
                $('input[id="p2"]').val(pFuturo)
            }
        }else {
            $('input[id="p2"]').val("")
        }
    }else {
        let input1 = document.getElementById('p1')
        let input2 = document.getElementById('p2')
        let variavel = $('input[id="p1"]').val();
        if (variavel !== "") {
            let pFuturo = 0
            pFuturo = ((variavel - b) / parseFloat(a))
            if (isNaN(pFuturo)){
                $('input[id="p2"]').val("")
            }else {
                $('input[id="p2"]').val(pFuturo)
            }
        }else {
            $('input[id="p2"]').val("")
        }
    }
}
