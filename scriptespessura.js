$(document).ready(function(){
    vetor=[];


    $("#espessuraNominal,#lado1,#lado2,#lado3,#lado4").mask("0.00");
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


        let soma = 0;
        let quantidade = 0;

        espessura = parseFloat($("#espessuraNominal").val());
        prenca = $("#prenca").val();
        icon=" ";
        min = espessura - (espessura*0.05);
        max = espessura + (espessura*0.05);

        
        // Percorre todos os inputs
        $('.numero').each(function() {
            let valor = $(this).val().trim();
            
            // Se estiver vazio, considera 0
            if (valor === '') {
                valor = 0;
            } else {
                valor = parseFloat(valor);
            }
            
            soma += valor;
            quantidade++;
        });
        
        // Calcula a média
        let media = soma / quantidade;
        
        // Exibe o resultado
            
       
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