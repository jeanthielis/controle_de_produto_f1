$(document).ready(function () {
    vetorEmpeno=Array();
    data = new Date();
    data_nova=data.getDate()+"/"+data.getMonth()+"/"+data.getFullYear();

    $(".menu").click(function(){
        var menu=this.id;
        $.ajax({
            url: menu,
            success: function (response) {
                $("#resultado").html(response);

            }
        });
    });
    $("#lote,#lote-base").keyup(function(){
        $(this).val($(this).val().toUpperCase());
      });

      function verificaLoteBase(){
        if($("#lote-base").val()== null || $("#lote-base").val()== "" ){
          alertConfirm('error',"Atenção !",'Informe o Lote Base',3000);
          $("#ladoa,#ladoA").val('');
          
        };
       }
        $("#ladoa,#ladoA").keydown(function(){
            linha = $("#linha").val();
            if(linha!= '4'){
                
                verificaLoteBase();
            }
            else{
                loteBase = " ";
            }
            
        });

        $("#linha").change(function () { 
            if($(this).val()!=4){
                $("#lote-base,#lbl-loteBase").fadeIn("slow");
            }
            else{
                $("#lote-base,#lbl-loteBase").fadeOut("slow");
            }
            
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

   function limparForm(){

    $("#referencia").val('');
    $("#lote").val('');
    $("#ladoa").val('');
    $("#ladob").val('');
    $("#ladoc").val('');
    $("#ladod").val('');
    $("#centrala").val('');
    $("#centralb").val('');
    

    $("#ladoA").val('');
    $("#ladoB").val('');
    $("#ladoC").val('');
    $("#ladoD").val('');
    $("#centralA").val('');
    $("#centralB").val('');

   }
   $('.mascaraEmpeno').mask('Z0.00', {
    translation: {
      'Z': {
        pattern: /[-!€]/, optional: true
      }
    }
  });

   
  


   $("#linha").change(function(){
    var linha = $(this).val();
    min=0;
    max=0;
    centralMin=0;
    centralMax= 0;
    
    switch (linha) {
        case "4":
            min =-0.50;
            max =1.20;
            centralMin=-0.50;
            centralMax=1.50;
            rangeL= "Range Lateral:("+min.toFixed(2)+" a "+max.toFixed(2)+")";
            rangeC= "Range Central:("+centralMin.toFixed(2)+" a "+centralMax.toFixed(2)+")";

            break;
        case "5":
            min =-0.70;
            max =1.20;
            centralMin=-0.50;
            centralMax=1.50;
            rangeL= "Range Lateral:("+min.toFixed(2)+" a "+max.toFixed(2)+")";
            rangeC= "Range Central:("+centralMin.toFixed(2)+" a "+centralMax.toFixed(2)+")";
        
            break;
        case "6":
            min =-0.70;
            max =1.20;
            centralMin=-0.50;
            centralMax=1.50;
            rangeL= "Range Lateral:("+min.toFixed(2)+" a "+max.toFixed(2)+")";
            rangeC= "Range Central:("+centralMin.toFixed(2)+" a "+centralMax.toFixed(2)+")";
            break;    
    
        default:

            break;
    }
   });

   $("#adicionarEmpeno").click(function () {
    var responsavel = $("#responsavel").val();
    var equipe = $("#equipe").val();
    var referencia = $("#referencia").val();
    var lote = $("#lote").val();
    loteBase = $("#lote-base").val();
    var linha = $("#linha").val();

    var ladoa = parseFloat($("#ladoa").val());
    var ladob = parseFloat($("#ladob").val());
    var ladoc = parseFloat($("#ladoc").val());
    var ladod = parseFloat($("#ladod").val());
    var centrala = parseFloat($("#centrala").val());
    var centralb = parseFloat($("#centralb").val());
    

    var ladoA = parseFloat($("#ladoA").val());
    var ladoB = parseFloat($("#ladoB").val());
    var ladoC = parseFloat($("#ladoC").val());
    var ladoD = parseFloat($("#ladoD").val());
    var centralA = parseFloat($("#centralA").val());
    var centralB = parseFloat($("#centralB").val());
   

    cabecalho =    "\n*Relatório de Empeno*"+  
    "\n*Responsável:* " +responsavel+
    "\n*Equipe:* "+equipe+
    "\n*Data:* "+data_nova+"\n\n";
    
    try {
        //Empeno Central
        if(centrala>=centralMin && centrala<=centralMax){
            iconca = "🟢";
        
        }else{
            iconca = "🔴";
        } 

        if(centralb>=centralMin && centralb<=centralMax){
            iconcb = "🟢";
        
        }else{
            iconcb = "🔴";
    
        } if(centralA>=centralMin && centralA<=centralMax){
            iconCA = "🟢";
        
        }else{
            iconCA = "🔴";    
        } 

        // Empeno Central
        if(centralB>=centralMin && centralB<=centralMax){
            iconCB = "🟢";
        
        }else{
            iconCB = "🔴";
        }
    
    

        
        if(ladoa>=min && ladoa<=max){
            icona = "🟢";
        
        }else{
            icona = "🔴";
        }
        if(ladob>=min && ladob<=max){
            iconb = "🟢";
        
        }else{
            iconb = "🔴";
        }  if(ladoc>=min && ladoc<=max){
            iconc = "🟢";
        
        }else{
            iconc = "🔴";
        }
        if(ladod>=min && ladod<=max){
            icond = "🟢";
        
        }else{
            icond = "🔴";
        }
        if(ladoA>=min && ladoA<=max){
            iconA = "🟢";
        
        }else{
            iconA = "🔴";
        }
        if(ladoB>=min && ladoB<=max){
            iconB = "🟢";
        
        }else{
            iconB = "🔴";
        }
        if(ladoC>=min && ladoC<=max){
            iconC = "🟢";
        
        }else{
            iconC = "🔴";
        }
        if(ladoD>=min && ladoD<=max){
            iconD = "🟢";
        
        }else{
            iconD = "🔴";
        }
    
        relatorioEmpeno =
        "\n *Referencia:* "+referencia+
        "\n *Lote:* "+lote+
        "\n *Lote Base:* "+loteBase+
        "\n *Linha:* "+linha+
        "\n\n"+rangeL+
        "\n"+rangeC+"\n"+
        "\n *Peça (+)*"+
        "\n "+icona+" *Lado A:* "+ladoa.toFixed(2)+
        "\n "+iconb+" *Lado B:* "+ladob.toFixed(2)+
        "\n "+iconc+" *Lado C:* "+ladoc.toFixed(2)+
        "\n "+icond+" *Lado D:* "+ladod.toFixed(2)+
        
        "\n *Central*"+
        "\n "+iconca+" *Lado A:* "+centrala.toFixed(2)+
        "\n "+iconcb+" *Lado B:* "+centralb.toFixed(2)+
        "\n"+
        "\n *Peça (-)*"+
        "\n "+iconA+" *Lado A:* "+ladoA.toFixed(2)+
        "\n "+iconB+" *Lado B:* "+ladoB.toFixed(2)+
        "\n "+iconC+" *Lado C:* "+ladoC.toFixed(2)+
        "\n "+iconD+" *Lado D:* "+ladoD.toFixed(2)+
    
        "\n *Central*"+
        "\n "+iconCA+" *Lado A:* "+centralA.toFixed(2)+
        "\n "+iconCB+" *Lado B:* "+centralB.toFixed(2)+"\n";
    
            vetorEmpeno.push(relatorioEmpeno);
            vetorNovo = vetorEmpeno.join('_________________________________')
            $("#tamanho-lista").html(vetorEmpeno.length);
            $("#textResultadoEmpeno").val(cabecalho+vetorNovo);
            $("#btn-visualizarEmpeno").fadeIn("slow");
            alertConfirm('success','Legal','Dados Inserido com Sucesso',3000);
            limparForm();  

    } catch (error) {
        alertConfirm('info','Atenção','Selecione a Linha',5000);

    }

    

  ;

    
   });

   



   $("#enviarEmpeno").click(function(){
    try {
    resultado=$("#textResultadoEmpeno").val();
    conteudo = encodeURIComponent(resultado);
    document.getElementById('compartilhar').href="https://api.whatsapp.com/send?text="+conteudo;

    } catch (error) {
        alertConfirm('error','Xiiii','Dados não foram inseridos',3000);

    }
    window.location.reload(true);        

   
})

});