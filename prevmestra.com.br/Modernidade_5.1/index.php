<?php
 #abaixo, criamos uma variavel que ter� como conte�do o endere�o para onde haver� o redirecionamento:  
 $redirect = "sistema.php";
 
 #abaixo, chamamos a fun��o header() com o atributo location: apontando para a variavel $redirect, que por 
 #sua vez aponta para o endere�o de onde ocorrer� o redirecionamento
 header("location:$redirect"); 
?>