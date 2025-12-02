$(document).ready(function(){
    vetor=[];


    $("#espessuraNominal,#lado1,#lado2,#lado3,#lado4,#lado5,#lado6").mask("#0.00",{reverse:true});
    $("#prenca").mask("P0/C0");

   
    function limparDados(){
    $("#lado1,#lado2,#lado3,#lado4,#prenca").val(" ");
    }

    function alertConfirm(tipo,titulo,mensagem,time){
        Swal.fire({
            title: titulo,
            icon: tipo,
            text:mensagem,
            showConfirmButton: false,
            timer: time
          })
    
       };
   

    $("#adicionarEspessura").click(function () { 

        var responsavel = $("#responsavel").val();
        var equipe = $("#equipe").val();
        var referencia = $("#referencia").val();
        var lote = $ ("#lote").val();
        var linha = $ ("#linha").val();

        espessura = parseFloat($("#espessuraNominal").val());
        prenca = $("#prenca").val();
        icon=" ";
        min = espessura - (espessura*0.05);
        max = espessura + (espessura*0.05);


        let soma = 0;
        let quantidadePreenchidos = 0;
        
        // Percorre todos os inputs
        $('.numero').each(function() {
            let valor = $(this).val().trim();
            
            // Só considera se não estiver vazio
            if (valor !== '') {
                let valorNumerico = parseFloat(valor);
                
                // Verifica se é um número válido
                if (!isNaN(valorNumerico)) {
                    soma += valorNumerico;
                    quantidadePreenchidos++;
                }
            }
        });
        
        // Calcula a média apenas se houver valores preenchidos
        let media = 0;
        if (quantidadePreenchidos > 0) {
            media = soma / quantidadePreenchidos;
        }

    

        if (media < min || media > max ){icon = "🔴"} else{icon = "🟢";}

        cabecalho = "\n*Análise de Espessura*" +
            "\n*Responsável:* " + responsavel +
            "\n*Equipe:* " + equipe +
            "\n*Data:* " + data_nova + "\n" +
            "\n*Linha:* " + linha +
            "\n*Referência:* " + referencia +
            "\n*Lote:* " + lote +
            
            "\n\n"+
            "Range:(min: "+min.toFixed(2)+", padrão: "+espessura.toFixed(2)+ ", max: "+max.toFixed(2)+")"+
            "\n\n";
        
        relatorio = icon+" "+ prenca+" : "+media.toFixed(2)+" "+"\n";
        vetor.push(relatorio);
        vetorNovo = vetor.join('');
        $("#amostra-espessura").html(icon+" "+prenca+": "+media.toFixed(2));
        $("#tamanho-listaEspessura").html(vetor.length);
        $("#textResultadoEspessura").val(cabecalho+vetorNovo);
        $("#btn-visualizarEspessura").fadeIn("slow");
        alertConfirm('success','Legal !','Dados inseridos com Sucesso',3000);
        limparDados();
    
    })
     
    $("#enviarEspessura").click(function(){
        try {
        resultado=$("#textResultadoEspessura").val();
        conteudo = encodeURIComponent(resultado);
        document.getElementById('compartilhar').href="https://api.whatsapp.com/send?text="+conteudo;
        window.location.reload(true);        

        } catch (error) {
        alertConfirm('error','Xiiii','Não foi possivel fazer o envio',3000);

        }
    
    })

})