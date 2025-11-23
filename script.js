
$(document).ready(function(){
    adicionarNome();
    horarioEquipe();
    liberaMenu();
    vetorResultado = Array();
    data = new Date();
    dia = data.getDate();
    mes = data.getMonth()+1;
    ano = data.getFullYear();
    data_nova= dia+"/"+mes+"/"+ano;


   function verificaLinha(){
    if($("#linha").val()== null || $("#linha").val()== "0" ){
      alertConfirm('error',"Atenção !",'Informe a Linha do Produto',3000);
    };
   }

   $("#referencia").click(function(){
      verificaLinha();
   })
   


   

    function alertConfirm(tipo,titulo,mensagem,time){
        Swal.fire({
            title: titulo,
            icon: tipo,
            text:mensagem,
            showConfirmButton: false,
            timer: time
          })
    
       };

       
       

       $("#nome").keyup(function(){
        nome = $("#nome").val();
        localStorage.setItem("nome",nome);
        $("#usuario").html(localStorage.getItem("nome"));
        $("#usuario-input").val(localStorage.getItem("nome"));
        liberaMenu();
       });

       $('#nome').focusout(function(){
            $(this).val(" ");
       })

       function adicionarNome(){
        $("#responsavel").val(localStorage.getItem("nome"));
        $("#usuario").html(localStorage.getItem("nome"));
        $("#usuario-input").val(localStorage.getItem("nome"));
       }
       function liberaMenu(){
            var libera = $("#usuario-input").val();
            if(isNaN(libera)){
                $(".liberaMenu").attr("disabled",false);
            }else{
                $(".liberaMenu").prop("disabled",true);
                alertConfirm("info","Atenção !","Informe seu nome para liberar o menu",5000);

            }
        }
       


       function horarioEquipe(){
        date = new Date;
        dia = date.getDate();
        hora = date.getHours() ;
       
        if(dia%2===0){situacao = 1;}else{situacao = 0;}


        switch (situacao) {
            case 0:
                if(hora>5 && hora<18){
                    $("#equipe").val("1");
                    $("#usuarioEq").html(' - Equipe 1');  
                }else{
                    $("#equipe").val("2");
                    $("#usuarioEq").html(' - Equipe 2');  
                }
                break;
            case 1:
                if(hora>5 && hora<18){
                    $("#equipe").val("3");
                    $("#usuarioEq").html(' - Equipe 3');                    
                }else{
                    $("#equipe").val("4");
                    $("#usuarioEq").html(' - Equipe 4');     
                }
                break;
            default:
                console.log("deu ruim !!!");
                break;
        }
       
       }        
    function limparFormulario(){
         $("#linha").val(" ");
        $("#referencia").val(" ");
        $("#lote").val(" ");
        $("#marca").val(' ');
        $("#extra").val(' ');
        $("#comercial").val(" ");
        $("#popular").val (" ");
        $("#local").val(" ");
        $("#ad").val(' ');
        $("#variacao").val(' ');
        $("#calibre").val(' ');
        $("#peso").val(' ');
        $("#espessura").val(' ');


    }
   

    $(".menu").click(function(){
        var menu=this.id;
        $.ajax({
            url: menu,
            success: function (response) {
                $("#resultado").html(response);

            }
        });
    });
    $("#lote").keyup(function(){
        $(this).val($(this).val().toUpperCase());
      });

    $("#adicionar").click(function(){
         var responsavel = $("#responsavel").val();
         var equipe = $("#equipe").val();
         var linha = $("#linha").val();
         var referencia = $("#referencia").val();
         var lote = $("#lote").val();
         var marca = $("#marca").val();
         var extra = $("#extra").val();
         var comercial = $("#comercial").val();
         var popular = $("#popular").val ();
         var local = $("#local").val();
         var ad = $("#ad").val();
         var variacao = $("#variacao").val();
         var calibre = $("#calibre").val();
         var peso = $("#peso").val();
         var espessura = $("#espessura").val();


         cabecalho =    "\n*Relatório de Inicio do Turno*"+  
         "\n*Responsável:* " +responsavel+
         "\n*Equipe:* "+equipe+
         "\n*Data:* "+data_nova+"\n\n";
        
                        

        var resultado = "\n*Linha:* "+linha+
                        "\n*Referência:* "+referencia+
                        "\n*Lote:* "+lote+
                        "\n"+
                        "\n*Marca:* "+marca+
                        "\n"+
                        "\n*Local de Uso:* "+local+
                        "\n*Classe AD:* "+ad+
                        "\n*Variação de Tonalidade:* "+variacao+
                        "\n*Calibre:* "+calibre+
                        "\n*Peso:* "+peso+"Kg"+
                        "\n*Espessura:* "+espessura+"mm"+
                        "\n"+
                        "\n*Código de Barra*"+
                        "\n*Extra:* "+extra+
                        "\n*Comercial:* "+comercial+
                        "\n*Popular:* "+popular+"\n";               
                        
                try {
                    vetorResultado.push(resultado);
                        vetorNovo = vetorResultado.join('_________________________________')
                        $("#textResultadoCheck").val(cabecalho+vetorNovo);
                        $("#tamanho-lista").html(vetorResultado.length);
                        $("#btn-visualizar").fadeIn("slow");
                        alertConfirm('success','Legal','Dados Inserido com Sucesso',3000)
                        limparFormulario();
                } catch (error) {
                    alertConfirm('error','Xiiii','Dados não foram inseridos',3000)

                }                                          
                                               
    });
    $("#enviarCheck").click(function(){
        try {
        resultado=$("#textResultadoCheck").val();
        conteudo = encodeURIComponent(resultado);
        document.getElementById('compartilhar').href="https://api.whatsapp.com/send?text="+conteudo;
        } catch (error) {
            alertConfirm('error','Xiiii','Dados não foram inseridos',3000)

        }
       
    })
   
    
});