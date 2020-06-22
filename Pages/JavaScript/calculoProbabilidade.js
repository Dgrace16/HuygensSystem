//PROBABILIDADE UNIFORME
function calcProbUniforme() {
    document.getElementById("tabela-probabilidade").style.display = 'none';
    let pontoMin = parseInt($('input[name="pontoMin"]').val());
    let pontoMax = parseInt($('input[name="pontoMax"]').val());
    let menorQProbabilidade = parseInt($('input[name="menorQProbabilidade"]').val());
    let inicialProbabilidade = parseInt($('input[name="inicialProbabilidade"]').val());
    let finalProbabilidade = parseInt($('input[name="finalProbabilidade"]').val());
    let maiorQProbabilidade = parseInt($('input[name="maiorQProbabilidade"]').val());
    function calcMedidas(probabilidade) {
        let media = (pontoMax + pontoMin)/2;
        let desvio = Math.sqrt((Math.pow((pontoMax - pontoMin),2))/12);
        let variacao = (desvio/media)*100;
        document.getElementById("medidas-probabilidade").innerHTML = `<tr><td>${(probabilidade*100).toFixed(2)}%</td><td>${media.toFixed(2)}</td><td>${desvio.toFixed(2)}</td><td>${variacao.toFixed(2)}%</td></tr>`
    }
    if((isNaN(pontoMin)) && (isNaN(pontoMax))){
        alert("Insira o ponto mínimo e o ponto máximo")
    } else if(isNaN(pontoMin)){
        alert("Insira o ponto mínimo")
    }else if(isNaN(pontoMax)){
        alert("Insira o ponto máximo")
    } else if(document.getElementById("comparacaoUniforme").value === '0'){
        alert("Insira os dados!")
    }else if (document.getElementById("comparacaoUniforme").value === '1'){
        if (isNaN(menorQProbabilidade)){
            alert("Insira o campo que falta")
        }else {
            let intervalo = menorQProbabilidade - pontoMin;
            let probabilidade = (1/(pontoMax-pontoMin))*intervalo;
            console.log(menorQProbabilidade,probabilidade);
            document.getElementById("tabela-probabilidade").style.display = 'block';
            calcMedidas(probabilidade)
        }
    }else if (document.getElementById("comparacaoUniforme").value === '2'){
        if ((isNaN(inicialProbabilidade)) || (isNaN(finalProbabilidade))){
            alert("Insira o(s) campo(s) que falta(m)")
        }else {
            let intervalo = finalProbabilidade - inicialProbabilidade;
            let probabilidade = (1/(pontoMax-pontoMin))*intervalo;
            console.log(inicialProbabilidade,finalProbabilidade,probabilidade);
            document.getElementById("tabela-probabilidade").style.display = 'block';
            calcMedidas(probabilidade)
        }
    }else if (document.getElementById("comparacaoUniforme").value === '3'){
        if (isNaN(maiorQProbabilidade)){
            alert("Insira o campo que falta")
        }else {
            let intervalo = pontoMax - maiorQProbabilidade;
            let probabilidade = (1/(pontoMax-pontoMin))*intervalo;
            console.log(maiorQProbabilidade,probabilidade);
            document.getElementById("tabela-probabilidade").style.display = 'block';
            calcMedidas(probabilidade)
        }
    }
}
//PROBABILIDADE BINOMIAL
function Fatorial(n) {
    if (n === 0) return 1;
    if (n === 1) return 1;
    return n * Fatorial(n-1)
}
function calcProbBinomial(){
    let qtdeAmostra = $('input[name="qtdeAmostra"]').val();
    let sucesso = $('input[name="pSucesso"]').val();
    let fracasso = $('input[name="qFracasso"]').val();
    let evento = $('input[name="Evento"]')[0];
    let eventoArray = evento.value.split(";").map(Number);
    console.log(qtdeAmostra,sucesso,fracasso,evento);
    if ((qtdeAmostra === '') || (sucesso === '') || (fracasso === '') || (eventoArray.length === 0)){
        alert("Insira o(s) dado(s) que falta(m)")
    }else {
        sucesso = sucesso/100;
        fracasso = fracasso/100;
        console.log(eventoArray);
        let probabilidade = 0;
        let media = 0;
        let desvio = 0;
        let variacao = 0;
        for (let i = 0; i <= eventoArray.length-1;i++){
            let kFat = Fatorial(eventoArray[i]);
            let nFat = Fatorial(qtdeAmostra);
            let k = eventoArray[i];
            let n = qtdeAmostra;
            probabilidade = probabilidade + nFat/(Fatorial(n-k) * kFat) * Math.pow(sucesso,k) * Math.pow(fracasso,n -k);
            media = n*sucesso;
            desvio = Math.sqrt(n*sucesso*fracasso);
            variacao = (desvio/media)*100
        }
        document.getElementById("tabela-probabilidade").style.display = 'block';
        document.getElementById("medidas-probabilidade").innerHTML = `<tr><td>${(probabilidade*100).toFixed(2)}%</td><td>${media.toFixed(2)}</td><td>${desvio.toFixed(2)}</td><td>${variacao.toFixed(2)}%</td></tr>`
    }
}
//PROBABILIDADE NORMAL
function buscaTabelaZ(variavel,media,desvio,variavelAux,auxiliar) {
    let probabilidade = 0;
    if (typeof variavelAux === 'undefined'){
    let numeroZ = (Math.abs((variavel - media)/desvio)).toFixed(2);
        numeroZ = numeroZ.toString();
        console.log(numeroZ);
        let tabelaZ = [];
        for(let i = 0;i < numeroZ.length;i++){
            tabelaZ.push(numeroZ.charAt(i))
        }
        let row
        if (tabelaZ[2] !== '0') {
             row = tabelaZ[0] + tabelaZ[1] + tabelaZ[2];
        }else {
             row = tabelaZ[0]
        }
        let column = tabelaZ[3];
        let aux = tabela[row];
        console.log(aux[column])
        switch (auxiliar){
            case "+":
                probabilidade = (0.5 + aux[column])*100;
                break;
            case "-":
                probabilidade = (0.5 - aux[column])*100;
                break;
            default:
                break;
        }
        console.log(auxiliar);
        document.getElementById("medidas-probNormal").innerHTML = `<td>${probabilidade.toFixed(2)}%</td>`
    }else {
        let numeroZ1 = (Math.abs((variavel - media)/desvio)).toFixed(2);
        console.log(variavel,media,desvio,numeroZ1)
        numeroZ1 = numeroZ1.toString();
        console.log(numeroZ1);
        let tabelaZ1 = [];
        for(let i = 0;i < numeroZ1.length;i++){
            tabelaZ1.push(numeroZ1.charAt(i))
        }
        let row1 = tabelaZ1[0]+tabelaZ1[1]+tabelaZ1[2];
        console.log(numeroZ1)
        let column1 = tabelaZ1[3];
        let aux1 = tabela[row1];

        let numeroZ2 = (Math.abs((variavelAux - media)/desvio)).toFixed(2);
        numeroZ2 = numeroZ2.toString();
        console.log(numeroZ2);
        let tabelaZ2 = [];
        for(let i = 0;i < numeroZ2.length;i++){
            tabelaZ2.push(numeroZ2.charAt(i))
        }
        let row2 = tabelaZ2[0]+tabelaZ2[1]+tabelaZ2[2];
        let column2 = tabelaZ2[3];
        let aux2 = tabela[row2];
        let probabilidade = (aux1[column1]*100) + (aux2[column2]*100);
        console.log((aux1[column1]*100),(aux2[column2]*100));
        document.getElementById("medidas-probNormal").innerHTML = `<td>${probabilidade.toFixed(2)}%</td>`
    }
    document.getElementById("tabela-probNormal").style.display = 'block'
}
function calcProbNormal() {
    let media = parseFloat($('input[name="mediaInp"]').val());
    let desvio = parseFloat($('input[name="desvioInp"]').val());
    if(document.getElementById("comparacaoNormal").value === '0'){
        alert("Insira os dados!")
    }else if (document.getElementById("comparacaoNormal").value === '1'){
        let menorQProbabilidade = parseFloat($('input[name="menorQ-ProbabilidadeN"]').val());
        let auxiliar = "+";
        buscaTabelaZ(menorQProbabilidade,media,desvio,undefined,auxiliar)
    }else if (document.getElementById("comparacaoNormal").value === '2'){
        let inicialProbabilidade = parseFloat($('input[name="inicial-ProbabilidadeN"]').val());
        let finalProbabilidade = parseFloat($('input[name="final-ProbabilidadeN"]').val());
        buscaTabelaZ(inicialProbabilidade,media,desvio,finalProbabilidade)
    }else if (document.getElementById("comparacaoNormal").value === '3') {
        let maiorQProbabilidade = parseFloat($('input[name="valor-ProbabilidadeN"]').val());
        let auxiliar = "-";
        buscaTabelaZ(maiorQProbabilidade,media,desvio,undefined,auxiliar)
    }

}

