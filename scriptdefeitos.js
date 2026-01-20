$(document).ready(function () {
    vetorDefeitos = Array(1);
    data = new Date();
    data_nova=data.getDate()+"/"+data.getMonth()+"/"+data.getFullYear();

    function limparDados(){
        $("#referencia").val('');
        $("#lote").val('');
        $("#linha").val('');
       
    }

    $("#esquadro").mask("0.00");
    $("#tamanho").mask("0000",{reverse:true});

    $("#lote").keyup(function(){
        $(this).val($(this).val().toUpperCase());
      });

      function alertConfirm(tipo,titulo,mensagem,time){
        Swal.fire({
            title: titulo,
            icon: tipo,
            text:mensagem,
            showConfirmButton: false,
            timer: time
          })
    
       };
       
    
    $("#calcular").click(function(){
        var responsavel = $("#responsavel").val();
        var equipe = $("#equipe").val();
        var referencia = $("#referencia").val();
        var lote = $ ("#lote").val();
        var linha = $ ("#linha").val();
        var tamanho = $("#tamanho").val();
        var esquadro= $("#esquadro").val();
        var obs= $("#obs").val();



        var defeitos = $("#defeitos").val();
        var vistoriada = parseInt($("#vistoriadas").val());
        var encontrada = parseInt($("#encontrada").val());
        var resultadoCalculo = (encontrada/vistoriada)*100;

        if (isNaN(resultadoCalculo)){
            resultadoCalculo=0;
        }


        cabecalho =    "\n*Defeito(s) encontrado(s) no Extra*"+  
        "\n*Responsável:* " +responsavel+
        "\n*Equipe:* "+equipe+
        "\n*Data:* "+data_nova+"\n\n";
        
        relatorioDefeitos = "*Linha:* "+linha+
                            "\n*Referência:* "+ referencia+
                            "\n*Lote:* "+ lote+
                            "\n\n"+
                            "*Defeitos:* "+defeitos+
                            "\n*Quantidade Vistoriadas:* "+vistoriada+
                            "\n*Quantidade de Defeitos:* "+encontrada+
                            "\n*Porcentagem:* "+resultadoCalculo.toFixed(0)+"%"+
                            "\n*Tamanho:* "+tamanho+"mm"+
                            "\n*Esquadro:* "+esquadro+"mm"+
                            "\n\n *Obs:* \n"+obs;


        try {
            vetorDefeitos.push(relatorioDefeitos);
            $("#textResultado").val(cabecalho+vetorDefeitos);
            $("#resultadoDefeitos").html(resultadoCalculo.toFixed(0)+"%");
            $("#enviar").fadeIn('slow');
            $("#calcular").fadeOut('slow');
            alertConfirm('success','Legal','Dados Inserido com Sucesso',3000)


            limparDados();
            vetorDefeitos.pop();
        } catch (error) {
            alertConfirm('error','Operação não Concluída','Entra em contato com Desenvolvedor',3000)

        }                    
         
    });
    $("#vistoriadas,#defeitos,#encontrada,#referencia").click(function(){
        $("#enviar").fadeOut("slow");
        $("#calcular").fadeIn("slow");
    });
    $("#enviar").click(function(){
        try {
            resultado=$("#textResultado").val();
            conteudo = encodeURIComponent(resultado);
            document.getElementById('compartilhar').href="https://api.whatsapp.com/send?text="+conteudo;
            } catch (error) {
              
                alertConfirm('error','Operação não Concluída','Entra em contato com Desenvolvedor',3000)

            }
    });
    

});