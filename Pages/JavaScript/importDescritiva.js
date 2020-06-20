window.onload = function () {
    var selectedFile;
    document.getElementById("fileUpload1").addEventListener("change", function(event) {
        selectedFile = event.target.files[0];
    });
    document.getElementById("uploadExcel1").addEventListener("click", function() {
        if (document.getElementById("descritivaEscolha").value === '0'){
            alert("Antes de importar os dados, por favor, selecione o tipo de ...")
        }else {
            let cont = 0
            let auxiliar
            let aux = ""
                if (selectedFile) {
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        var data = event.target.result;

                        var workbook = XLSX.read(data, {
                            type: "binary"
                        });
                        workbook.SheetNames.forEach(sheet => {
                            let rowObject = XLSX.utils.sheet_to_row_object_array(
                                workbook.Sheets[sheet]
                            );
                            cont++
                            if (document.getElementById("descritivaEscolha").value === 'nominal' || document.getElementById("descritivaEscolha").value === 'ordinal') {
                                if (cont === 1) {
                                    auxiliar = rowObject
                                    let chave = Object.keys(auxiliar[0])
                                    aux = auxiliar[0]
                                    let dados = aux[chave]
                                    for (let i = 1;i < rowObject.length;i++) {
                                        aux = auxiliar[i]
                                        dados += ";" + aux[chave]
                                    }
                                    $('input[name="nomeVariavel"]').val(chave)
                                    $('input[name="dadosInp"]').val(dados)
                                }
                            } else if (document.getElementById("descritivaEscolha").value === 'discreta') {
                                if (cont === 2) {
                                    auxiliar = rowObject
                                    let chave = Object.keys(auxiliar[0])
                                    aux = auxiliar[0]
                                    let dados = aux[chave]
                                    for (let i = 1;i < rowObject.length;i++) {
                                        aux = auxiliar[i]
                                        dados += ";" + aux[chave]
                                    }
                                    $('input[name="nomeVariavel"]').val(chave)
                                    $('input[name="dadosInp"]').val(dados)
                                }
                            } else if (document.getElementById("descritivaEscolha").value === 'continua') {
                                if (cont === 3) {
                                    auxiliar = rowObject
                                    let chave = Object.keys(auxiliar[0])
                                    aux = auxiliar[0]
                                    let dados = aux[chave]
                                    for (let i = 1;i < rowObject.length;i++) {
                                        aux = auxiliar[i]
                                        dados += ";" + aux[chave]
                                    }
                                    $('input[name="nomeVariavel"]').val(chave)
                                    $('input[name="dadosInp"]').val(dados)
                                }
                            }
                        });
                    };
                    fileReader.readAsBinaryString(selectedFile);
                }
            }
        });
    }
