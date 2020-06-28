// Margem de erro (input)
/*
$(document).ready(function () {
    $('#options-group').change(function (ev) {
        var target = ev.target;
        if (target.id === 'option2') {
            $('#margemErro').removeClass('invisible')
        } else {
            $('#margemErro').addClass('invisible')
        }
    })
})
 */
//Variavies Globais
var nominalGlob = []
var ordinalGlob = []
var discretaGlob = []
var continuaGlob = []
var medianaContinuaGlob
var somaFantGlob
var frequenciaModaGlob
var intervaloGlob
function calcDescritiva() {
    document.getElementById('ordernarInputs').innerHTML = '';
    document.getElementById('medida-separatriz').style.display='none'
    document.getElementById("valorSeparatriz").innerHTML = ""
    document.getElementById("separatriz").innerHTML = ""
    //************* Nominal *************
    if(document.getElementById('descritivaEscolha').value == 'nominal'){
        let nomeVariavel = $('input[name="nomeVariavel"]').val();
        let populacao = $('input[name="dadosInp"]')[0];
        let populacaoArray = populacao.value.split(';');
        nominalGlob = populacao.value.split(';');
        let unico = populacaoArray.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        let agrupamentos = {};
        for(var i = 0;i < populacaoArray.length;i++) {
            let grupo = populacaoArray[i];
            if (typeof (agrupamentos[grupo]) === 'undefined') {
                agrupamentos[grupo] = 1;
            } else {
                agrupamentos[grupo]++;
            }
        }

        document.getElementById('nomeVariavel').innerHTML = nomeVariavel
        //Frequências tabela/cálculo
        let fRDescritivaN = []
        let fRDescritivaS = []
        let FacDescritiva = 0
        let FacDescritivaPercent = 0
        for ( var aux in agrupamentos) {
            if (typeof acm === 'undefined'){
                var acm = `<tr><td>${aux}</td><td>${agrupamentos[aux]}</td><td>${((agrupamentos[aux]*100)/populacaoArray.length).toFixed(2)}%</td><td>${FacDescritiva = FacDescritiva + agrupamentos[aux]}</td><td>${(FacDescritivaPercent = FacDescritivaPercent + ((agrupamentos[aux]*100)/populacaoArray.length)).toFixed(2)}%</td></tr>`
                fRDescritivaN.push((agrupamentos[aux]*100)/populacaoArray.length)
                fRDescritivaS.push(aux)
            }else{
                var acm = acm + `<tr><td>${aux}</td><td>${agrupamentos[aux]}</td><td>${((agrupamentos[aux]*100)/populacaoArray.length).toFixed(2)}%</td><td>${FacDescritiva = FacDescritiva + agrupamentos[aux]}</td><td>${(FacDescritivaPercent = FacDescritivaPercent + ((agrupamentos[aux]*100)/populacaoArray.length)).toFixed(2)}%</td></tr>`
                document.getElementById('frequencia-descritiva').innerHTML = acm
                fRDescritivaN.push((agrupamentos[aux]*100)/populacaoArray.length)
                fRDescritivaS.push(aux).toString()
            }
        }


        //Cálculo Moda
        let ax = agrupamentos[unico[0]]
        let diferente = 0
        let moda = ""
        for (let i = 0;i < unico.length;i++){
            console.log(agrupamentos[unico[i]])
            if (ax !== agrupamentos[unico[i]]){
                diferente++
            }
        }
        for (let i = 0;i < unico.length;i++){
            if(ax < agrupamentos[unico[i]]){
                ax = agrupamentos[unico[i]]
            }
        }
        if (diferente !== 0) {
            for (let i = 0; i < unico.length; i++) {
                if (ax === agrupamentos[unico[i]]) {
                    moda += unico[i] + "|"
                }
            }
        }else {
            moda = "Não existe"
        }
        //Cálculo de Mediana
        if(populacaoArray.length%2 === 0){
            var mediana = populacaoArray[(populacaoArray.length/2)-1] + "|" + populacaoArray[(populacaoArray.length/2)]
        }else {
            var mediana = populacaoArray[Math.round((populacaoArray.length/2)-1)]
        }
        document.getElementById('medidas-tendencia-central').innerHTML = `<tr><td>${moda}</td><td>Não existe</td><td>${mediana}</td></tr>`
        document.getElementById('medidas-de-dispersao').innerHTML = `  <tr><td>Não existe</td><td>Não existe</td></tr>`
        let coresAleatorias02 = []
        let coresAleatorias1 = []
        for(i=0;i <= fRDescritivaS.length;i++){
            let r = Math.floor(Math.random()*255),
                g = Math.floor(Math.random()*255),
                b = Math.floor(Math.random()*255)
            coresAleatorias02[i] = Number&&String("rgba("+r+","+g+","+b+","+Number(0.2)+")")
            coresAleatorias1[i] = Number&&String("rgba("+r+","+g+","+b+","+Number(1)+")")
        }
        let ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: fRDescritivaS,
                datasets: [{
                    label: nomeVariavel,
                    data: fRDescritivaN,
                    backgroundColor: coresAleatorias02,
                    borderColor:coresAleatorias1,
                }]
            },
        });
        document.getElementById('tabela-descritiva').style.display='block'
        document.getElementById('medida-separatriz').style.display='block'
    }

    //####################################### Fim Nominal #######################################

    //************* Ordinal *************

    if (document.getElementById('descritivaEscolha').value == 'ordinal'){

        $('#calcularDescritiva').addClass('invisible')
        $('#btnOrdinal').removeClass('invisible')
        document.getElementById('tabela-descritiva').style.display='none'
        document.getElementById('medida-separatriz').style.display='none'
        let nomeVariavel = $('input[name="nomeVariavel"]').val();
        let populacao = $('input[name="dadosInp"]')[0];
        let populacaoArray = populacao.value.split(';');
        quickSort(populacaoArray)
        let agrupamentos = {};
        for(var i = 0;i < populacaoArray.length;i++) {
            let grupo = populacaoArray[i];
            if (typeof (agrupamentos[grupo]) === 'undefined') {
                agrupamentos[grupo] = 1;
            } else {
                agrupamentos[grupo]++;
            }
        }
        //Ordenação
        for(var chave in agrupamentos) {
            if (chave.length > 0) {
                let novaDiv = document.createElement('div');
                novaDiv.setAttribute('class', 'form-group col-12');

                let novoInput = document.createElement('input');
                novoInput.setAttribute('name',`ordem${chave}`)
                novoInput.setAttribute('class', 'form-control')
                novoInput.setAttribute('placeholder', `Por favor digite a ordem do valor ${chave}`);
                novoInput.setAttribute('max', Object.keys(agrupamentos).length);
                novoInput.setAttribute('type', 'number');


                novaDiv.appendChild(novoInput);

                document.getElementById('ordernarInputs').appendChild(novaDiv);
            }
        }
        if(document.getElementById('ordernarInputs') === ''){

        }
    } else {
        document.getElementById('ordernarInputs').innerHTML = '';
    }

    //####################################### Fim Ordinal #######################################

    //************* Discreta *************
    if(document.getElementById('descritivaEscolha').value == 'discreta'){
        let nomeVariavel = $('input[name="nomeVariavel"]').val();
        let populacao = $('input[name="dadosInp"]')[0];
        let populacaoArray = populacao.value.split(';');
        discretaGlob = populacao.value.split(';');
        quickSort(discretaGlob)
        quickSort(populacaoArray)
        let unico = populacaoArray.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        let frequencia = []
        for(var i =0;i < unico.length;i++){
            frequencia[i] = 0
            for(var j =0;j < populacaoArray.length;j++){
                if(unico[i] === populacaoArray[j]){
                    frequencia[i]++
                }
            }
        }
        document.getElementById('nomeVariavel').innerHTML = nomeVariavel
        //Frequências tabela/cálculo
        let fRDescritivaN = []
        let fRDescritivaS = []
        let FacDescritiva = 0
        let FacDescritivaPercent = 0
        for ( aux in unico) {
            let aux1 = unico[aux]
            if (typeof acm === 'undefined'){
                var acm = `<tr><td>${aux1}</td><td>${frequencia[aux]}</td><td>${((frequencia[aux]*100)/populacaoArray.length).toFixed(2)}%</td><td>${FacDescritiva = FacDescritiva + frequencia[aux]}</td><td>${(FacDescritivaPercent = FacDescritivaPercent + ((frequencia[aux]*100)/populacaoArray.length)).toFixed(2)}%</td></tr>`
                fRDescritivaN.push((frequencia[aux]*100)/populacaoArray.length)
                fRDescritivaS.push(aux1)
            }else{
                var acm = acm + `<tr><td>${aux1}</td><td>${frequencia[aux]}</td><td>${((frequencia[aux]*100)/populacaoArray.length).toFixed(2)}%</td><td>${FacDescritiva = FacDescritiva + frequencia[aux]}</td><td>${(FacDescritivaPercent = FacDescritivaPercent + ((frequencia[aux]*100)/populacaoArray.length)).toFixed(2)}%</td></tr>`
                document.getElementById('frequencia-descritiva').innerHTML = acm
                fRDescritivaN.push((frequencia[aux]*100)/populacaoArray.length)
                fRDescritivaS.push(aux1)
            }
        }
        //Cálculo Moda
        let ax = frequencia[0]
        let diferentes = 0
        let moda = ""
        for (aux in unico){
            if (ax !== frequencia[aux]){
                diferentes++
            }
        }
        for(let i = 0;i < unico.length;i++){
            if(diferentes !== 0){
                if(frequencia[i] > ax) {
                    ax = frequencia[i]
                }
                if (i === unico.length - 1) {
                    for (let j = 0; j < unico.length; j++) {
                        if (frequencia[j] === ax) {
                            moda = moda + unico[j] + "|"
                        }
                    }
                }
            }else {
                moda = "Não existe"
            }
        }
        //Cálculo Média
        var acmMedia = 0
        var media = 0
        for(aux in unico) {
            let aux1 = unico[aux]
            acmMedia = acmMedia + (Number(aux1) * frequencia[aux])
        }
        media = acmMedia/populacaoArray.length
        //Cálculo de Mediana
        if(populacaoArray.length%2 === 0){
            var mediana = (Number(populacaoArray[(populacaoArray.length/2)-1]) + Number((populacaoArray[(populacaoArray.length/2)])))/2
        }else {
            var mediana = populacaoArray[Math.round(populacaoArray.length/2)-1]
        }
        //Cálculo de Medidas de Dispersão
        let acmDesvio = 0
        let desvioPadrao
        let coeficienteVariacao
        let tipoPesquisa = $("input[name='options']:checked").val()
        if(tipoPesquisa === "populacao"){
            for (aux in unico){
                let aux1 = unico[aux]
                acmDesvio = acmDesvio +  Math.pow(aux1 - media,2) * frequencia[aux]
            }
            desvioPadrao = (Math.sqrt(acmDesvio/FacDescritiva)).toFixed(2)
            coeficienteVariacao = ((desvioPadrao/media)*100).toFixed(2)
        }else {
            for (aux in unico){
                let aux1 = unico[aux]
                acmDesvio = acmDesvio +  Math.pow(aux1 - media,2) * frequencia[aux]
            }
            desvioPadrao = (Math.sqrt(acmDesvio/(FacDescritiva-1))).toFixed(2)
            coeficienteVariacao = ((desvioPadrao/media)*100).toFixed(2)
        }

        document.getElementById('medidas-tendencia-central').innerHTML = `<tr><td>${moda}</td><td>${media.toFixed(2)}</td><td>${mediana}</td></tr>`
        document.getElementById('medidas-de-dispersao').innerHTML = `  <tr><td>${desvioPadrao}</td><td>${coeficienteVariacao}%</td></tr>`
        document.getElementById('tabela-descritiva').style.display='block'
        document.getElementById('medida-separatriz').style.display='block'

        let coresAleatorias02 = []
        let coresAleatorias1 = []
        for(i=0;i <= fRDescritivaS.length;i++){
            let r = Math.floor(Math.random()*255),
                g = Math.floor(Math.random()*255),
                b = Math.floor(Math.random()*255)
            coresAleatorias02[i] = Number&&String("rgba("+r+","+g+","+b+","+Number(0.2)+")")
            coresAleatorias1[i] = Number&&String("rgba("+r+","+g+","+b+","+Number(1)+")")
        }
        // Gráfico
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: fRDescritivaS,
                datasets: [{
                    label: nomeVariavel,
                    data: fRDescritivaN,
                    backgroundColor: coresAleatorias02,
                    borderColor:coresAleatorias1,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        // Fim Gráfico
    }


//####################################### Fim Discreta #######################################

    //************* Continua *************

    if (document.getElementById('descritivaEscolha').value == 'continua') {
        let nomeVariavel = $('input[name="nomeVariavel"]').val();
        let populacao = $('input[name="dadosInp"]')[0];
        let populacaoArray = populacao.value.split(';');
        quickSort(populacaoArray)
        let unico = populacaoArray.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        let nMax = populacaoArray[populacaoArray.length - 1] //maior valor do vetor
        let nMin = populacaoArray[0]; //compara menor valor
        let raiz = Math.round(Math.sqrt(populacaoArray.length))
        let amplitude = nMax - nMin
        let intervalo = amplitude / raiz
        Math.round(intervalo)
        let valorInicial = nMin
        let FacDescritivaPercent = 0
        let acm = ""
        let indice = []
        let  FacDescritivaVet= []
        let porcentagemFreContinua = []
        let indiceGrafico = []
        let mediaContinua = 0
        let acmDesvio = 0
        do{
            var FacDescritiva = 0
            let valorFinal = Number(nMin) + Math.round(intervalo)
            for (let i = 0; i < populacaoArray.length; i++) {
                if (populacaoArray[i] >= nMin && populacaoArray[i] <= valorFinal) {
                     FacDescritiva++
                     FacDescritivaPercent++
                }
            }
            acm = acm + `<tr><td>${nMin}|--${valorFinal}</td><td>${FacDescritiva}</td><td>${((FacDescritiva*100)/populacaoArray.length).toFixed(2)}%</td><td>${FacDescritivaPercent}</td><td>${((FacDescritivaPercent*100)/populacaoArray.length).toFixed(2)}%</td></tr>`
             porcentagemFreContinua.push((((FacDescritiva*100)/populacaoArray.length)).toFixed(2))
            FacDescritivaVet.push(FacDescritiva)
            indiceGrafico.push(`${nMin}|--${valorFinal}`)
            indice.push(nMin,valorFinal)
            mediaContinua= mediaContinua + ((Number(nMin) + valorFinal)/2) * FacDescritiva
            nMin = Number(nMin) + Math.round(intervalo) + 1
        }while(nMin <= nMax)
        document.getElementById('nomeVariavel').innerHTML = nomeVariavel
        let iguais = 0
        let moda = ""
        let ax = 0
        let medianaContinua
        let somaFant = 0
        //Cálculo Moda
        for(let i = 0;i <= FacDescritivaVet.length-1;i++){
            if(FacDescritivaVet[i] >= ax ){
                ax = FacDescritivaVet[i]
            }
            if (FacDescritivaVet[0] !== FacDescritivaVet[i]){
                iguais++
            }
            if(i === FacDescritivaVet.length-1){
                for (let j = 0;j < raiz;j++){
                    if(ax === FacDescritivaVet[j]){
                        if(j === 0){
                            let a = Number(indice[0])
                            let b = Number(indice[1])
                            if (iguais !== 0) {
                                moda = moda + ((a + b) / 2) + "|"
                            }else {
                                moda = "Não existe"
                            }
                        medianaContinua = indice[j * 2]
                            var frequenciaModa = FacDescritivaVet[j]
                        }else {
                            if (iguais !== 0) {
                                moda = moda + Number(((indice[(j * 2) + 1] + indice[j * 2]) / 2)) + "|"
                            }else {
                                moda = "Não existe"
                            }
                            medianaContinua = indice[j * 2]
                            var auxiliar = j
                            var frequenciaModa = FacDescritivaVet[j]
                            for(let c = auxiliar;c>0;c--){
                                somaFant = somaFant + FacDescritivaVet[c-1]
                            }
                        }
                    }
                }
            }
        }
        let tipoPesquisa = $("input[name='options']:checked").val()
        let desvioPadrao = 0
        let coeficienteVariacao = 0
        if(tipoPesquisa === "populacao"){
            let j = 0
            for (let i = 0;i<indice.length;i++){
                //Cálculo de Medidas de Dispersão
                acmDesvio = acmDesvio + Math.pow(((Number(indice[i]) + Number(indice[i+1]))/2) - (mediaContinua/populacaoArray.length),2) * FacDescritivaVet[j]
                i++
                j++
            }
            desvioPadrao = (Math.sqrt(acmDesvio/FacDescritivaPercent)).toFixed(2)
            coeficienteVariacao = (desvioPadrao/(mediaContinua/populacaoArray.length))*100
        }else {
            let j = 0
            for (let i = 0;i<indice.length;i++){
                //Cálculo de Medidas de Dispersão
                acmDesvio = acmDesvio + Math.pow(((Number(indice[i]) + Number(indice[i+1]))/2) - (mediaContinua/populacaoArray.length),2) * FacDescritivaVet[j]
                i++
                j++
            }
            desvioPadrao = (Math.sqrt(acmDesvio/(FacDescritivaPercent-1))).toFixed(2)
            coeficienteVariacao = (desvioPadrao/(mediaContinua/populacaoArray.length))*100
        }
        document.getElementById('tabela-descritiva').style.display='block'
        document.getElementById('medida-separatriz').style.display='block'
        document.getElementById('frequencia-descritiva').innerHTML = acm
        document.getElementById('medidas-tendencia-central').innerHTML = `<tr><td>${moda}</td><td>${(mediaContinua/populacaoArray.length).toFixed(2)}</td><td>${(Number(medianaContinua)+((((populacaoArray.length)/2)-somaFant)/frequenciaModa)*Math.round(intervalo)).toFixed(2)}</td></tr>`
        document.getElementById('medidas-de-dispersao').innerHTML = `  <tr><td>${desvioPadrao}</td><td>${(coeficienteVariacao).toFixed(2)}%</td></tr>`
        medianaContinuaGlob = medianaContinua
        continuaGlob = populacaoArray
        somaFantGlob = somaFant
        frequenciaModaGlob = frequenciaModa
        intervaloGlob = intervalo
        let coresAleatorias02 = []
        let coresAleatorias1 = []
        for(i=0;i <= raiz;i++){
            let r = Math.floor(Math.random()*255),
                g = Math.floor(Math.random()*255),
                b = Math.floor(Math.random()*255)
            coresAleatorias02[i] = Number&&String("rgba("+r+","+g+","+b+","+Number(0.2)+")")
            coresAleatorias1[i] = Number&&String("rgba("+r+","+g+","+b+","+Number(1)+")")
        }
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: indiceGrafico,
                datasets: [{
                    label: nomeVariavel,
                    data: porcentagemFreContinua,
                    backgroundColor: coresAleatorias02,
                    borderColor: coresAleatorias1,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        barPercentage: 1.25,
                    }, {
                        display: false,
                        ticks: {
                            autoSkip: false,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })
    }
}

//####################################### Fim Continua #######################################

function calculoOrdinal() {
    document.getElementById('medida-separatriz').style.display='none'
    if (document.getElementById('descritivaEscolha').value == 'ordinal'){

        $('#calcularDescritiva').removeClass('invisible')
        $('#btnOrdinal').addClass('invisible')
        let nomeVariavel = $('input[name="nomeVariavel"]').val();
        let populacao = $('input[name="dadosInp"]')[0];
        let populacaoArray = populacao.value.split(';');
        quickSort(populacaoArray)
        let unico = populacaoArray.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        });
        let agrupamentos = {};
        for(var i = 0;i < populacaoArray.length;i++) {
            let grupo = populacaoArray[i];
            if (typeof (agrupamentos[grupo]) === 'undefined') {
                agrupamentos[grupo] = 1;
            } else {
                agrupamentos[grupo]++;
            }
        }
        let ordenacao = []
        var ordinalVet = []
        var ordinalFreq = []
        let a = 0
        for(var chave in agrupamentos){
            if(chave.length > 0){
                ordenacao.push(parseInt($(`input[name="ordem${chave}"]`).val()))
            }
            a++
        }
        for (var i = 0;i < unico.length;i++){
            ordinalVet[(ordenacao[i])-1] = unico[i]
            ordinalFreq[(ordenacao[i]-1)] = agrupamentos[unico[i]]
        }
        if(document.getElementById('ordernarInputs') === ''){

        }else {
            document.getElementById('nomeVariavel').innerHTML = nomeVariavel
            //Frequências tabela/cálculo
            let fRDescritivaN = []
            let fRDescritivaS = []
            let FacDescritiva = 0
            let FacDescritivaPercent = 0
            let a = 0
            for ( var aux in agrupamentos) {
                if (typeof acm === 'undefined'){
                    var acm = `<tr><td>${ordinalVet[a]}</td><td>${ordinalFreq[a]}</td><td>${((ordinalFreq[a]*100)/populacaoArray.length).toFixed(2)}%</td><td>${FacDescritiva = FacDescritiva + ordinalFreq[a]}</td><td>${(FacDescritivaPercent = FacDescritivaPercent + ((ordinalFreq[a]*100)/populacaoArray.length)).toFixed(2)}%</td></tr>`
                    fRDescritivaN.push((ordinalFreq[a]*100)/populacaoArray.length)
                    fRDescritivaS.push(ordinalVet[a])
                }else{
                    var acm = acm + `<tr><td>${ordinalVet[a]}</td><td>${ordinalFreq[a]}</td><td>${((ordinalFreq[a]*100)/populacaoArray.length).toFixed(2)}%</td><td>${FacDescritiva = FacDescritiva + ordinalFreq[a]}</td><td>${(FacDescritivaPercent = FacDescritivaPercent + ((ordinalFreq[a]*100)/populacaoArray.length)).toFixed(2)}%</td></tr>`
                    document.getElementById('frequencia-descritiva').innerHTML = acm
                    fRDescritivaN.push((ordinalFreq[a]*100)/populacaoArray.length)
                    fRDescritivaS.push(ordinalVet[a]).toString()
                }
                a++
            }
            a = 0
            var vetorMediana = []
            for (let i = 0;i <unico.length;i++){
                for (let j = 0;j < ordinalFreq[i];j++){
                    vetorMediana[a] = ordinalVet[i]
                    a++
                }

            }
            ordinalGlob = vetorMediana
            //Cálculo Moda
            let ax = ordinalFreq[0]
            let iguais = 0
            let moda = ""
            for (let i = 0;i < unico.length;i++){
                if (agrupamentos[unico[0]] !== agrupamentos[unico[i]]){
                    iguais++
                }
            }
            for(let i = 0;i < unico.length;i++){
                if(iguais !== 0){
                    if(ordinalFreq[i] >= ax) {
                    ax = ordinalFreq[i]
                    }
                if (i === unico.length - 1) {
                    for (let j = 0; j < unico.length; j++) {
                        if (ordinalFreq[j] === ax) {
                            moda = moda + ordinalVet[j] + "|"
                        }
                    }
                }
                }else {
                    moda = "Não existe"
                }
            }
            //Cálculo Mediana
            if(vetorMediana.length%2 === 0){
                var mediana = vetorMediana[(vetorMediana.length/2)-1] + "|" + vetorMediana[(vetorMediana.length/2)]
            }else {
                var mediana = vetorMediana[(Math.round(vetorMediana.length/2))-1]
            }
            document.getElementById('medidas-tendencia-central').innerHTML = `<tr><td>${moda}</td><td>Não existe</td><td>${mediana}</td></tr>`
            document.getElementById('medidas-de-dispersao').innerHTML = `  <tr><td>Não existe</td><td>Não existe</td></tr>`
            document.getElementById('tabela-descritiva').style.display='block'
            document.getElementById('medida-separatriz').style.display='block'

            let coresAleatorias02 = []
            let coresAleatorias1 = []
            for(i=0;i <= fRDescritivaS.length;i++){
                let r = Math.floor(Math.random()*255),
                    g = Math.floor(Math.random()*255),
                    b = Math.floor(Math.random()*255)
                coresAleatorias02[i] = Number&&String("rgba("+r+","+g+","+b+","+Number(0.2)+")")
                coresAleatorias1[i] = Number&&String("rgba("+r+","+g+","+b+","+Number(1)+")")
            }

            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: fRDescritivaS,
                    datasets: [{
                        label: nomeVariavel,
                        data: fRDescritivaN,
                        backgroundColor: coresAleatorias02,
                        borderColor: coresAleatorias1,
                    }]
                },
            });
        }
    } else {
      abrirTbDescritiva()
    }
    document.getElementById('ordernarInputs').innerHTML = '';
}
function separatrizSelect() {
    if(document.getElementById('selectSeparatriz').value =='0'){
        document.getElementById('rg4').style.display='none'
        document.getElementById('rg5').style.display='none'
        document.getElementById('rg10').style.display='none'
        document.getElementById('rg100').style.display='none'
        document.getElementById("valorSeparatriz").innerHTML = ""
        document.getElementById("separatriz").innerHTML = ""
    }
    if(document.getElementById('selectSeparatriz').value =='4'){
        document.getElementById('rg4').style.display='block'
        document.getElementById('rg5').style.display='none'
        document.getElementById('rg10').style.display='none'
        document.getElementById('rg100').style.display='none'
        document.getElementById("valorSeparatriz").innerHTML = ""
        document.getElementById("separatriz").innerHTML = ""
        let slider = document.getElementById("rg4")
        let output = document.getElementById("valorSeparatriz")

        slider.oninput = function () {
            output.innerHTML = this.value;
            let valorSeparatriz = this.value;
            if(document.getElementById('descritivaEscolha').value == 'nominal') {
                if(nominalGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)))] === 'undefined') {
                            separatriz.innerHTML = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)] + "|" + nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)))]
                        }
                    }else {
                        separatriz.innerText = nominalGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = nominalGlob[0]
                    }
                }
            }
            if (document.getElementById('descritivaEscolha').value == 'ordinal'){
                if(ordinalGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)))] === 'undefined') {
                            separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)] + "|" + ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)))]
                        }
                    }else {
                        separatriz.innerText = ordinalGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = ordinalGlob[0]
                    }
                }
            }
            if(document.getElementById('descritivaEscolha').value == 'discreta'){
                if(discretaGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof discretaGlob[Math.round((discretaGlob.length) * (valorSeparatriz / 100))] === 'undefined') {
                            separatriz.innerText = discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = (Number(discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]) + Number(discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)))])) / 2
                        }
                    }else {
                        separatriz.innerText = discretaGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = discretaGlob[0]
                    }
                }
            }
            if(document.getElementById('descritivaEscolha').value == 'continua'){
                separatriz.innerText = Number(medianaContinuaGlob)+((((continuaGlob.length)*(valorSeparatriz/100))-somaFantGlob)/frequenciaModaGlob)*Math.round(intervaloGlob)
            }
        }
    }
    if(document.getElementById('selectSeparatriz').value =='5'){
        document.getElementById('rg4').style.display='none'
        document.getElementById('rg5').style.display='block'
        document.getElementById('rg10').style.display='none'
        document.getElementById('rg100').style.display='none'
        document.getElementById("valorSeparatriz").innerHTML = ""
        document.getElementById("separatriz").innerHTML = ""
        let slider = document.getElementById("rg5")
        let output = document.getElementById("valorSeparatriz")

        slider.oninput = function () {
            output.innerHTML = this.value;
            let valorSeparatriz = this.value;
            if(document.getElementById('descritivaEscolha').value == 'nominal') {
                if(nominalGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)))] === 'undefined') {
                            separatriz.innerHTML = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)] + "|" + nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)))]
                        }
                    }else {
                        separatriz.innerText = nominalGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = nominalGlob[0]
                    }
                }
            }
            if (document.getElementById('descritivaEscolha').value == 'ordinal'){
                if(ordinalGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)))] === 'undefined') {
                            separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)] + "|" + ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)))]
                        }
                    }else {
                        separatriz.innerText = ordinalGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = ordinalGlob[0]
                    }
                }
            }
            if(document.getElementById('descritivaEscolha').value == 'discreta'){
                if(discretaGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof discretaGlob[Math.round((discretaGlob.length) * (valorSeparatriz / 100))] === 'undefined') {
                            separatriz.innerText = discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = (Number(discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]) + Number(discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)))])) / 2
                        }
                    }else {
                        separatriz.innerText = discretaGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = discretaGlob[0]
                    }
                }
            }
            if(document.getElementById('descritivaEscolha').value == 'continua'){
                separatriz.innerText = Number(medianaContinuaGlob)+((((continuaGlob.length)*(valorSeparatriz/100))-somaFantGlob)/frequenciaModaGlob)*Math.round(intervaloGlob)
            }
        }
    }
    if (document.getElementById('selectSeparatriz').value =='10'){
        document.getElementById('rg4').style.display='none'
        document.getElementById('rg5').style.display='none'
        document.getElementById('rg10').style.display='block'
        document.getElementById('rg100').style.display='none'
        document.getElementById("valorSeparatriz").innerHTML = ""
        document.getElementById("separatriz").innerHTML = ""
        let slider = document.getElementById("rg10")
        let output = document.getElementById("valorSeparatriz")

        slider.oninput = function () {
            output.innerHTML = this.value;
            let valorSeparatriz = this.value;
            if(document.getElementById('descritivaEscolha').value == 'nominal') {
                if(nominalGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)))] === 'undefined') {
                            separatriz.innerHTML = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)] + "|" + nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)))]
                        }
                    }else {
                        separatriz.innerText = nominalGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = nominalGlob[0]
                    }
                }
            }
            if (document.getElementById('descritivaEscolha').value == 'ordinal'){
                if(ordinalGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)))] === 'undefined') {
                            separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)] + "|" + ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)))]
                        }
                    }else {
                        separatriz.innerText = ordinalGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = ordinalGlob[0]
                    }
                }
            }
            if(document.getElementById('descritivaEscolha').value == 'discreta'){
                if(discretaGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof discretaGlob[Math.round((discretaGlob.length) * (valorSeparatriz / 100))] === 'undefined') {
                            separatriz.innerText = discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = (Number(discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]) + Number(discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)))])) / 2
                        }
                    }else {
                        separatriz.innerText = discretaGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = discretaGlob[0]
                    }
                }
            }
            if(document.getElementById('descritivaEscolha').value == 'continua'){
                separatriz.innerText = Number(medianaContinuaGlob)+((((continuaGlob.length)*(valorSeparatriz/100))-somaFantGlob)/frequenciaModaGlob)*Math.round(intervaloGlob)
            }
        }
    }
    if (document.getElementById('selectSeparatriz').value =='100'){
        document.getElementById('rg4').style.display='none'
        document.getElementById('rg5').style.display='none'
        document.getElementById('rg10').style.display='none'
        document.getElementById('rg100').style.display='block'
        document.getElementById("valorSeparatriz").innerHTML = ""
        document.getElementById("separatriz").innerHTML = ""
        let slider = document.getElementById("rg100")
        let output = document.getElementById("valorSeparatriz")
        let separatriz = document.getElementById("separatriz")
        slider.oninput = function () {
            output.innerHTML = this.value;
            let valorSeparatriz = this.value;
            if(document.getElementById('descritivaEscolha').value == 'nominal') {
                if(nominalGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)))] === 'undefined') {
                            separatriz.innerHTML = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)] + "|" + nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)))]
                        }
                    }else {
                        separatriz.innerText = nominalGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = nominalGlob[Math.round(((nominalGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = nominalGlob[0]
                    }
                }
            }
            if (document.getElementById('descritivaEscolha').value == 'ordinal'){
                if(ordinalGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)))] === 'undefined') {
                            separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)] + "|" + ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)))]
                        }
                    }else {
                        separatriz.innerText = ordinalGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = ordinalGlob[Math.round(((ordinalGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = ordinalGlob[0]
                    }
                }
            }
            if(document.getElementById('descritivaEscolha').value == 'discreta'){
                if(discretaGlob.length%2 === 0){
                    if (valorSeparatriz >= 10) {
                        if (typeof discretaGlob[Math.round((discretaGlob.length) * (valorSeparatriz / 100))] === 'undefined') {
                            separatriz.innerText = discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]
                        } else {
                            separatriz.innerText = (Number(discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]) + Number(discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)))])) / 2
                        }
                    }else {
                        separatriz.innerText = discretaGlob[0]
                    }
                }else {
                    if (valorSeparatriz >= 10) {
                        separatriz.innerText = discretaGlob[Math.round(((discretaGlob.length) * (valorSeparatriz / 100)) - 1)]
                    }else {
                        separatriz.innerText = discretaGlob[0]
                    }
                }
            }
            if(document.getElementById('descritivaEscolha').value == 'continua'){
                separatriz.innerText = Number(medianaContinuaGlob)+((((continuaGlob.length)*(valorSeparatriz/100))-somaFantGlob)/frequenciaModaGlob)*Math.round(intervaloGlob)
            }
        }
    }
}
function troca(vet, i, j) {
    let aux = vet[i]
    vet[i] = vet[j]
    vet[j] = aux
}
function quickSort(vet, fnComp, posIni = 0, posFim = vet.length - 1) {
    if(posFim > posIni) {
        const posPivot = posFim
        let posDiv = posIni - 1
        for(let i = posIni; i < posFim; i++) {
            if(vet[i] < vet[posPivot] && i != posDiv) {
                posDiv++
                troca(vet, i, posDiv)
            }
        }
        posDiv++
        troca(vet, posDiv, posPivot)
        quickSort(vet, fnComp, posIni, posDiv - 1)
        quickSort(vet, fnComp, posDiv + 1, posFim)
    }
}
