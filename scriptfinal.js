
$(document).ready(function(){
  vetorRelatorio =[];
  function limparDados(){
    $("#referencia,#lote,#linha,#situacao,#observacao").val(" ");
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
  

   $("#situacao").change(function(){
     var situacao = parseInt($(this).val());

     if (situacao > 1){
           $("#observacao").fadeIn("slow");

    }
    else{
      $("#observacao").fadeOut("slow");

    }
      
     })


  $("#adicionarRelatorio").click(function () { 
    
    var responsavel = $("#responsavel").val();
    var referencia = $("#referencia").val();
    var equipe = $("#equipe").val();
    var lote = $ ("#lote").val();
    var linha = $ ("#linha").val();
    var situacao = $ ("#situacao").val();
    var observacao = $("#observacao").val();

    switch (situacao) {
      case "1":
        situacao = "🟢";
        break;
      case "2":
        situacao = "🟡"
        break;
        
      case "3":
        situacao = "🟠"
      break;
      
      case "4":
        situacao = "🔴"
      break;
    
      default:
        break;
    }


    cabecalhoFixo = "\n*Relatório Final*" +
        "\n*Responsável:* " + responsavel +
        "\n*Equipe:* " + equipe +
        "\n*Data:* " + data_nova;

    relatorio ="\n\n*Linha:* " + linha +
        "\n*Referência:* " + referencia +
        "\n*Lote:* " + lote +
        "\n*Situação:* "+ situacao+
        "\n\n*Observações:* \n"+observacao+
        "\n";

   
      vetorRelatorio.push(relatorio);
      resultadoRelatorioNovo = vetorRelatorio.join('_____________________________________');
      $("#tamanho-listaFinal").html(vetorRelatorio.length);

      $("#textResultadoFinal").val(cabecalhoFixo+resultadoRelatorioNovo);
      $("#visualizar-final").fadeIn("slow");
      alertConfirm('success','Legal','Dados Inserido com Sucesso',3000)
      limparDados();

    
  });

  $("#enviarFinal").click(function(){
      try {
        resultado=$("#textResultadoFinal").val();
        conteudo = encodeURIComponent(resultado);
        document.getElementById('compartilhar').href="https://api.whatsapp.com/send?text="+conteudo;
    
        } catch (error) {
        alertConfirm('error','Erro','Houve  problema no envio',3000);
    
        }
        window.location.reload(true);        

    
          
  
})
  
});