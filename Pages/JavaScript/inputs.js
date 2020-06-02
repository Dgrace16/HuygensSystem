function abrirComparacao() {
            if(document.getElementById('comparacaoUniforme').value =='0') {
                document.getElementById('menorQ-Probabilidade').style.display='none'
                document.getElementById('inicial-Probabilidade').style.display='none'
                document.getElementById('final-Probabilidade').style.display='none'
                document.getElementById('valor-Probabilidade').style.display='none'
            }
            if(document.getElementById('comparacaoUniforme').value =='1'){

                    document.getElementById('menorQ-Probabilidade').style.display='inline-block'
                    document.getElementById('inicial-Probabilidade').style.display='none'
                    document.getElementById('final-Probabilidade').style.display='none'
                    document.getElementById('valor-Probabilidade').style.display='none'
            }
            if(document.getElementById('comparacaoUniforme').value =='2'){
                    document.getElementById('menorQ-Probabilidade').style.display='none'
                    document.getElementById('inicial-Probabilidade').style.display='inline-block'
                    document.getElementById('final-Probabilidade').style.display='inline-block'
                    document.getElementById('valor-Probabilidade').style.display='none'
            }
            if(document.getElementById('comparacaoUniforme').value =='3'){
                    document.getElementById('menorQ-Probabilidade').style.display='none'
                    document.getElementById('inicial-Probabilidade').style.display='none'
                    document.getElementById('final-Probabilidade').style.display='none'
                    document.getElementById('valor-Probabilidade').style.display='inline-block'
            }

}
function abrirComparacaoN() {
    if(document.getElementById('comparacaoNormal').value =='0') {
        document.getElementById('menorQ-ProbabilidadeN').style.display='none'
        document.getElementById('inicial-ProbabilidadeN').style.display='none'
        document.getElementById('final-ProbabilidadeN').style.display='none'
        document.getElementById('valor-ProbabilidadeN').style.display='none'
    }
    if(document.getElementById('comparacaoNormal').value =='1'){

        document.getElementById('menorQ-ProbabilidadeN').style.display='inline-block'
        document.getElementById('inicial-ProbabilidadeN').style.display='none'
        document.getElementById('final-ProbabilidadeN').style.display='none'
        document.getElementById('valor-ProbabilidadeN').style.display='none'
    }
    if(document.getElementById('comparacaoNormal').value =='2'){
        document.getElementById('menorQ-ProbabilidadeN').style.display='none'
        document.getElementById('inicial-ProbabilidadeN').style.display='inline-block'
        document.getElementById('final-ProbabilidadeN').style.display='inline-block'
        document.getElementById('valor-ProbabilidadeN').style.display='none'
    }
    if(document.getElementById('comparacaoNormal').value =='3'){
        document.getElementById('menorQ-ProbabilidadeN').style.display='none'
        document.getElementById('inicial-ProbabilidadeN').style.display='none'
        document.getElementById('final-ProbabilidadeN').style.display='none'
        document.getElementById('valor-ProbabilidadeN').style.display='inline-block'
    }
}