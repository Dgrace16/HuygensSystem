window.onclick = function () {
    var selectedFile;
    document.getElementById("fileUpload").addEventListener("change", function(event) {
        selectedFile = event.target.files[0];
    });
    document.getElementById("uploadExcel").addEventListener("click", function() {
        let cont = 0
        let auxiliar
        let aux1 = ""
        let aux2 = ""
        if (selectedFile) {
            console.log("hi");
            var fileReader = new FileReader();
            fileReader.onload = function(event) {
                var data = event.target.result;

                var workbook = XLSX.read(data, {
                    type: "binary"
                });
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(
                        workbook.Sheets[sheet]
                    );
                    cont++
                    if (cont === 4){
                        auxiliar = rowObject
                        let chave1 = Object.keys(auxiliar[0])
                        let chave2 = Object.keys(auxiliar[1])
                        aux1 = auxiliar[0]
                        aux2 = auxiliar[1]
                        let rent = aux1[chave1[0]]
                        let mortgage = aux2[chave2[1]]
                        for (let i = 1;i < rowObject.length;i++) {
                            aux1 = auxiliar[i]
                            rent += ";" + aux1[chave1[0]]
                            aux2 = auxiliar[i]
                            mortgage += ";" + aux2[chave2[1]]
                        }
                        $('input[name="rent"]').val(rent)
                        $('input[name="mortgage"]').val(mortgage)
                    }
                });
            };
            fileReader.readAsBinaryString(selectedFile);
        }
    });
}
