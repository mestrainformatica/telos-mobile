// var url_base = 'http://192.100.100.253:8181/prevmobile-ws/rest/acesso/padrao';
var url_base = 'http://www.sysprev.com.br/prevmobile-ws/rest/acesso/padrao';
//var url_base = 'http://www.fundacaotelos.com.br:8989/prevmobile-ws/rest/acesso/padrao';
//var url_base = 'https://telosmobile.fundacaotelos.com.br/prevmobile-ws/rest/acesso/padrao';
var stageMap = {}
var logged = false;
var userInfo = new Object();
var timeoutMsg = "Rede indisponível";

var toGuid = function (str) {
    return str.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase();
}

var controller = angular.module('starter.controller', ['ionic', 'angular-datepicker', 'ngMask'])

.controller('topMenu', function($scope,$ionicHistory,$rootScope,$ionicPopup) {

  $rootScope.$on('$stateChangeSuccess', 
  function(event, toState, toParams, fromState, fromParams){
    if ((toState.name == 'menu') || (toState.name == 'termosdeuso') || (toState.name == 'splitmatriculas') || (toState.name == 'termodeuso')) {
      $scope.isNotHome = false;
    } else {
      $scope.isNotHome = true;
    }
    if (toState.name != 'signin'){
      $rootScope.errorMsg = false;
      
    } else {
      $rootScope.loginPage = true;
      $rootScope.bodyStyle = {'background-color':'#dbdbdb'}
    }
  
  })
  $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams){
    if ( window.cordova && window.cordova.plugins.Keyboard ) {
      // return to keyboard default scroll state
      cordova.plugins.Keyboard.disableScroll( false );
    }
    if ((toState.name == 'menu') || (toState.name == 'termosdeuso') || (toState.name == 'splitmatriculas') || (toState.name == 'termodeuso')) {
      $scope.isNotHome = false;
    } else {
      $scope.isNotHome = true;
    }
  });
  $rootScope.$on( '$ionicView.afterEnter', function () {
    // Handle iOS-specific issue with jumpy viewport when interacting with input fields.
    if ( window.cordova && window.cordova.plugins.Keyboard ) {
      cordova.plugins.Keyboard.disableScroll( true );
    }
  });
  $rootScope.$on( '$ionicView.beforeLeave', function () {
    if ( window.cordova && window.cordova.plugins.Keyboard ) {
      // return to keyboard default scroll state
      cordova.plugins.Keyboard.disableScroll( false );
    }
  });

})
.controller('Inicio', function($scope, $http, $state, $rootScope) {
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  $scope.abrirMenu = true;
  $scope.$on('$stateChangeSuccess', function () {
  });
  $ionicLoading.hide();
})
.controller('initMenu', ['$scope', '$state','$rootScope','$http','$ionicLoading', '$ionicPopup', function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup){
// Setup the loader
  
  if (logged == false){
    //$state.go('signin');
  } else {
  $scope.stageMap = stageMap;
  }

  $scope.logout = function(){

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });
    $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
        { "param" : { "acao": "logout" }, "login" : { "u":userInfo.u, "s":userInfo.s } }).then(function(resp) {
            stageMap = {}
            logged = false;
            userInfo = new Object();
            $rootScope.lastRequest = {}
            $ionicLoading.hide();
            
            $state.go('signin');
          }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });

  }

}])


.controller('splitMatricula', ['$scope', '$state', '$http',  '$rootScope', '$ionicLoading','$ionicPopup', function($scope, $state, $http, $rootScope, $ionicLoading, $ionicPopup) {

  $rootScope.erroMsg = false;
  $scope.matriculas = $rootScope.lastRequest.result.matriculas;
  $scope.submitMatricula = function(item){
    
      $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

      $this = this;
      $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
        { "param" : { "cpf": userInfo.cpf, "cod_fundo": $scope.matriculas[item].cod_fundo,  "cod_patrocinadora": $scope.matriculas[item].cod_patrocinadora,  "matricula": $scope.matriculas[item].matricula, "acao": "dados" }, "login" : { "u":userInfo.u, "s":userInfo.s } }
      ).then(function(resp) {
          userInfo.u = resp.data.login.u;
          userInfo.s = resp.data.login.s;

          $ionicLoading.hide();
          if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; 
            $state.go('signin');
          } else {
            // Se conseguiu conectar com o servidor
            $rootScope.lastRequest = resp.data;
            logged = true;
            for (k in resp.data.result.dadosView[0]){
              // Define quais telas serão mostradas para o usuário
              stageMap[k]=resp.data.result.dadosView[0][k];
            }

            if (typeof(resp.data.result.termo_de_uso) != 'undefined'){
                // Ainda não aceitou os termos de uso
                $state.go('termosdeuso');
            } 
            else if (typeof(resp.data.result.dadosView) != 'undefined'){             
                // Ao definir as variáveis, vai pro menu principal
                $state.go('menu');
            } else if (resp.data.msg.length > 0){
              $rootScope.errorMsg = resp.data.msg; 
            }
          }
      }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
         title: 'Falha de conexão',
         template: timeoutMsg
       });
     })
  }

}])


.controller('signin', ['$scope', '$state', '$http', '$rootScope','$timeout', '$ionicLoading', '$cordovaTouchID', '$ionicPlatform', '$ionicPopup', function($scope, $state, $http, $rootScope, $timeout, $ionicLoading, $cordovaTouchID, $ionicPlatform, $ionicPopup) {


  $scope.formData = {};
  
  $scope.submit = function(){
    stageMap = {}
    logged = false;
    userInfo = new Object();
    $rootScope.lastRequest = {}

    if ((typeof(this.formData.cpf) != 'undefined') && (typeof(this.formData.sen) != 'undefined')){

      $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

      $this = this;
      $http.post(url_base, 
        { "param" : { "cpf": $this.formData.cpf, "sen": $this.formData.sen, "acao": "logar" }, "login" : { "u":"", "s":"" } }
      ).then(function(resp) {
          // Se conseguiu conectar com o servidor
          $ionicLoading.hide();

          //resp.data.result.termo_de_uso = [ { descricao_termo_uso: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"} ];

          $rootScope.lastRequest = resp.data;

          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {

              logged = true;
              userInfo.u = resp.data.login.u;
              userInfo.s = resp.data.login.s;
              userInfo.cpf = $this.formData.cpf;
              $scope.formData = {}

            if (typeof(resp.data.result.matriculas) != 'undefined'){
              // Possui mais de uma matrícula e ainda não escolheu qual será carregada
              $state.go('splitmatriculas');
            } 
            else {
              logged = true;
              for (k in resp.data.result.dadosView[0]){
                // Define quais telas serão mostradas para o usuário
                stageMap[k]=resp.data.result.dadosView[0][k];
              }

              if (typeof(resp.data.result.termo_de_uso) != 'undefined'){
                // Ainda não aceitou os termos de uso
                $state.go('termosdeuso');
              }
              else if (typeof(resp.data.result.dadosView)){
                
               
                ////console.log(stageMap);
                // Ao definir as variáveis, vai pro menu principal
                $state.go('menu');
              } else {
                $state.go('signin');   
              }
            }
            //alert('passou');
            ////console.log(resp);
            //$state.go('menu');
          }
          
        }, function(err) {
          // Se deu erro na conexão ou no processo de busca do JSON
          $ionicLoading.hide();
          $rootScope.errorMsg = "Erro ao conectar com o servidor. Tente novamente mais tarde"; 
        }, function(err) {
          $ionicLoading.hide();
          $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });       })

    } else {
      $rootScope.errorMsg = 'Por favor preencha os campos acima'
    }
    
  }
  // $ionicPlatform.ready(function() {
  //       $cordovaTouchID.checkSupport().then(function() {
  //         $cordovaTouchID.authenticate("Faça a autenticação").then(function() {
  //           $scope.formData.cpf = "08275049776";
  //           $scope.formData.sen = "123456";
  //           $scope.submit();
  //           // success
  //         }, function () {
  //           // error
  //           //alert('Autenticação falhou. Tente Novamente.');
  //         });
  //       })
  //     })

}])

.controller('termosDeUso', ['$scope', '$state', '$rootScope', '$http', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicPopup) {

  $rootScope.erroMsg = false;
  ////console.log($rootScope.lastRequest.result);
  $scope.termosText = $rootScope.lastRequest.result.termo_de_uso[0].descricao_termo_uso;

}])


.controller('termoDeUso', ['$scope', '$state', '$http', '$ionicLoading', '$rootScope', '$ionicPopup', function($scope, $state, $http, $ionicLoading, $rootScope, $ionicPopup) {


  $scope.termosText = "";
  $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });
  
  $http.post(url_base, 
        { "param" : { "acao": "termoUsoInicial" }, "login" : { "u":"", "s":"" } }
      ).then(function(resp) {
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          
          $ionicLoading.hide();        
          $scope.termosText = resp.data.result.termo_de_uso[0].descricao_termo_uso;
          ////console.log($scope.termosText);
        }

      }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });

}])


.controller('SimulacaoResgateCtrl', ['$scope', '$state', '$http', '$ionicLoading', '$rootScope', '$ionicPopup', function($scope, $state, $http, $ionicLoading, $rootScope, $ionicPopup) {
  $scope.resgate = [];

  $ionicLoading.show();
  $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
        { "param" : { "acao": "simulacaoResgate" }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf": userInfo.cpf } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
        
          $scope.resgate = resp.data.result;
          $ionicLoading.hide();        
        }

      }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });

}])

/**
 * aceitarTermos: Aceitar Termos de Uso
 */
.controller('aceitarTermos', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {

  $rootScope.erroMsg = false;
  $scope.aceitar = function(){
     $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

     $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
        { "param" : { "aceite": true, "acao": "termoUso", "cpf": userInfo.cpf }, "login" : { "u":$rootScope.lastRequest.login.u, "s":$rootScope.lastRequest.login.s } }
      ).then(function(resp) {
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          
          logged = true;
          userInfo.u = resp.data.login.u;
          userInfo.s = resp.data.login.s;
          $rootScope.lastRequest.success = resp.data.success;
          $rootScope.lastRequest.msg = resp.data.msg;
          $rootScope.lastRequest.login = resp.data.login;
        
          //$rootScope.lastRequest = resp.data;
          $ionicLoading.hide();
          $state.go('menu');
        }

      }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });
  }
  $scope.recusar = function(){
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });
    $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
        { "param" : { "acao": "logout" }, "login" : { "u":userInfo.u, "s":userInfo.s } }).then(function(resp) {
            stageMap = {}
            logged = false;
            userInfo = new Object();
            $rootScope.lastRequest = {}
            $ionicLoading.hide();
            
            $state.go('signin');
          }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });
  }
  ////console.log($rootScope.lastRequest.result);
  $scope.termosText = $rootScope.lastRequest.result.termo_de_uso[0].descricao_termo_uso;

}])
.controller('headerInfo', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  
  $scope.$state = $state;
  $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0];

  // Mantem o headerInfo sempre aberto no menu
  if ($state.current.name == 'menu'){
    $scope.abrirMenu = true;
  }
  // Mantem o headerInfo sempre fechado nas demais páginas
  else if ($scope.abrirMenu == true) {
    $scope.abrirMenu = false;
  }

}])

/**
 * CONTROLLERS DAS PÁGINAS DE PRIMEIRO NÍVEL
 */
.controller('DadosCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  
  $rootScope.erroMsg = false;
  $scope.dados = $rootScope.lastRequest.result.dadosCadastrais[0];
  $scope.dados.habilitarBotao = !$scope.dados.exibe_botao_editar;
  // Para testar com botão habilitado
  //$scope.dados.exibe_botao_editar = $scope.dados.exibe_botao_editar;
  
  $scope.infoprev = $rootScope.lastRequest.result.informacoesPrevidenciarias;
  $scope.infobenef = $rootScope.lastRequest.result.informacoesDependentes;

}])
.controller('DadosCtrl.form', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
  
  $rootScope.erroMsg = false;
  $scope.dados = $rootScope.lastRequest.result.dadosCadastrais[0];
  $scope.formData = $scope.dados;
  $scope.submit = function(){

    $scope.dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0];
    $scope.informacoesParticipante = $rootScope.lastRequest.result.informacoesParticipante[0];
        $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $scope.postData = {
      cod_fundo: $scope.dadosCadastrais.cod_fundo,
      cod_patrocinadora: $scope.dadosCadastrais.cod_patrocinadora,
      sequencial_bnf: $scope.dadosCadastrais.sequencial_bnf,
      numero_inscricao: $scope.dadosCadastrais.numero_inscricao,
      cod_plano: $scope.dadosCadastrais.cod_plano,
      matricula: $scope.informacoesParticipante.matricula,
      logradouro: $scope.formData.logradouro,
      numero: $scope.formData.numero,
      complemento: $scope.formData.complemento,
      bairro: $scope.formData.bairro,
      cidade: $scope.formData.cidade,
      uf: $scope.formData.uf,
      cep: $scope.formData.cep,
      telefone_res: $scope.formData.telefone_res,
      telefone_cel: $scope.formData.telefone_cel,
      email: $scope.formData.email,
      acao: 'alteracao'

    }
    

     $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : $scope.postData, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
        
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            //$rootScope.errorMsg = resp.data.msg; 
            $rootScope.errorMsg = resp.data.msg; 
          
          }
        }
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });
  }
}])
.controller('ExtratoCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
 
  $rootScope.erroMsg = false;
  $scope.extrato = $rootScope.lastRequest.result.extratoContas;
  $scope.formData = {};

  //console.log($scope.extrato);
  $scope.submit = function(){
    

    if (!$scope.formData.cod_ano_mes){
      $rootScope.errorMsg = "Por favor preencha todos os campos";
    } else {    


    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : { "cod_ano_mes":$scope.formData.cod_ano_mes, 'acao':'extratoContas' }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
    
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.lastRequest.extratoEmitido = resp.data.result;
            $rootScope.lastRequest.extratoEmitido.mes_atual = $scope.cod_ano_mes;
            //console.log(resp.data.result);
            $state.go('extratoemitido');
          }
        }
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });
    }
  }
}])
.controller('ExtratoCtrl.emitido', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {

  $rootScope.erroMsg = false;
  $scope.extrato = $rootScope.lastRequest.extratoEmitido;

  if($rootScope.lastRequest.result.dadosCadastrais.email == "")
    $scope.hasEmail = true;
  else
    $scope.hasEmail = false;

  $scope.sendMail = function() {
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : {
            'descricaoEmail' : '', 
            'acao':'extratoContasEnvioEmail', 
            'dataAtualizacao':''
        }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
    
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            //console.log(resp.data.result);
            alert('enviado');
          }
        }
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });
  }

}])

.controller('SaldoCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
 
  $rootScope.erroMsg = false;
  $scope.saldo = $rootScope.lastRequest.result.saldoContas;
  $scope.formData = {};

  $scope.submit = function(){
    
    if (!$scope.formData.data_atualizacao){
      $rootScope.errorMsg = "Por favor preencha todos os campos";
    } else {

    //console.log('clicou');
        $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : { "data_atualizacao":$scope.formData.data_atualizacao, 'acao':'saldoContas' }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
    
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.lastRequest.saldoEmitido = resp.data.result;
            //console.log(resp.data.result);
            $state.go('saldoemitido');
          }
        }
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });
    }

  }
}])

.controller('SaldoCtrl.emitido', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  
  $rootScope.erroMsg = false;
  $scope.saldo = $rootScope.lastRequest.saldoEmitido;
  //console.log($scope.saldo);

  if($rootScope.lastRequest.result.dadosCadastrais.email == "")
    $scope.hasEmail = true;
  else
    $scope.hasEmail = false;

  $scope.sendMail = function() {
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : {
            'descricaoEmail' : '', 
            'acao':'saldoContasEnvioEmail', 
            'dataAtualizacao':''
        }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
    
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            //console.log(resp.data.result);
            alert('enviado');
          }
        }
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });
  }

}])

.controller('DemonstrativoCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
  
  $rootScope.erroMsg = false;
  $scope.demonstrativo = $rootScope.lastRequest.result.demonstrativoPagamento;
  $scope.formData = {};

  $scope.submit = function(){
    
    if (typeof($scope.formData.data_pagamento) == 'undefined') {
      $rootScope.errorMsg = "Por favor preencha todos os campos";
    } else {    

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : { "data_pagamento":$scope.formData.data_pagamento, 'acao':'demonstrativoPagamento' }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        
        $ionicLoading.hide();
    
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.demonstrativoEmitido = resp.data.result;
            $rootScope.errorMsg = false;
            $state.go('demonstrativoemitido');
          }
        }
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
         title: 'Falha de conexão',
         template: timeoutMsg
       });
     })
    }

  }

}])

.controller('ContatoCtrl.form', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
  

  $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0];
  //{'login':{'u':u, 's':s}, 'param':{'acao':'', 'nome' : '', 'email' : '', 'telefone' : '', 'mensagem': '', 'patrocinador': '', 'matricula': ''}}
  $rootScope.erroMsg = false;
  $scope.formData = {};

  $scope.submit = function(){
    
    if ((typeof($scope.formData.mensagem) == 'undefined') || (typeof($scope.formData.telefone) == 'undefined') || (typeof($scope.formData.email) == 'undefined')) {
      $rootScope.errorMsg = "Por favor preencha todos os campos";
    } else {    

     
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });


    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : { 
          'acao':'faleConosco',
          'nome': $scope.matricula.nome,
          'email': $scope.formData.email,
          'telefone': $scope.formData.telefone,
          'mensagem': $scope.formData.mensagem,
          'patrocinador': $scope.matricula.patrocinadora,
          'matricula': $scope.matricula.matricula 

           }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        
        $ionicLoading.hide();
        
        $rootScope.errorMsg = resp.data.msg;
        
        if (!resp.data.success) { $state.go('signin'); } else {
          if (resp.data.result.emailEnviado){
            $scope.formData = {};
            setTimeout(function() {
              $state.go('menu');
            }, 1200);
          } else {

          }
        }
        
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
         title: 'Falha de conexão',
         template: timeoutMsg
       });
     })
    }

  }

}])

.controller('DemonstrativoCtrl.emitido', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  $rootScope.erroMsg = false;
  $scope.demonstrativo = $rootScope.demonstrativoEmitido;

  if($rootScope.lastRequest.result.dadosCadastrais.email == "")
    $scope.hasEmail = true;
  else
    $scope.hasEmail = false;

  $scope.sendMail = function() {
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : {
            'descricaoEmail' : '', 
            'acao':'demonstrativoPagamentoEmail', 
            'dataAtualizacao':''
        }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();

//console.log(resp);

        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            //console.log(resp.data.result);
            alert('enviado');
          }
        }
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });
  }

}])

.controller('EmprestimoConsultaCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  $rootScope.erroMsg = false;
  $scope.consultaEmprestimo = $rootScope.lastRequest.result.consultaEmprestimo;
}])


.controller('EmprestimoSimulacaoCtrl', ['$scope', '$state', '$rootScope',  '$http', '$ionicLoading', '$filter', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicLoading, $filter, $ionicPopup) {
  
  $scope.formData = {}
  $scope.tipos_emprestimo = $rootScope.lastRequest.result.simulacaoEmprestimo;
 
  $scope.buttonText = "- Selecione -";
  $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0].matricula;
  $rootScope.lastRequest.esmprestimoSimulacaoCampos = [];
  $scope.disableddates = [
  ]; 
  $scope.disableCalendar = true;
  $scope.dataInicial = new Date();
  $scope.update = function (cod_emprestimo){
    
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 300,
      showDelay: 0
    });
    // Atualiza as datas de crédito
    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : { "cod_emprestimo": cod_emprestimo, "matricula": $scope.matricula, 'acao':'emprestimos' }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
        
        dataInicial = new Date(resp.data.result.data_inicial);
        $scope.dataInicial = dataInicial.getTime();
        //console.log(dataInicial);
        //console.log($scope.dataInicial);
        $scope.disableCalendar = false; 
        
        datasIndisponiveis = resp.data.result.datas_credito;
        

        for (var k in datasIndisponiveis){
        
          if (datasIndisponiveis[k].disponivel == 'N'){
        
            currentDate = new Date(datasIndisponiveis[k].data);
        
            $scope.disableddates.push(currentDate.getTime());
          }
        }
        //console.log($scope.disableddates);
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
        
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            // atualizar o dados indisponiveis talvez?
          }
        }
    }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
         title: 'Falha de conexão',
         template: timeoutMsg
       });
     })

    }
    // carreagar o tipo logo de cara
    $scope.formData.tipo = $rootScope.lastRequest.result.simulacaoEmprestimo[0].cod_emprestimo;
    $scope.update($scope.formData.tipo);

    $scope.submit = function (cod_emprestimo){
    
        if (
          (!$scope.formData.tipo) ||
          (!$scope.formData.data)){
          $scope.errorMsg = "Por favor preencha todos os campos";
        } else {


        //console.log('click');
            $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

        // Atualiza as datas de crédito
        $http.post(url_base+';jsessionid='+userInfo.s, 
            { "param" : { "cod_emprestimo": cod_emprestimo, "dataCredito": $scope.formData.data, 'acao':'simulacaoEmprestimo' }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
          ).then(function(resp) {
            
            userInfo.u = resp.data.login.u;
            userInfo.s = resp.data.login.s;
           
            $ionicLoading.hide();
            $rootScope.lastRequest.esmprestimoSimulacaoCampos = resp.data.result;
            $rootScope.lastRequest.esmprestimoSimulacaoCampos.cod_emprestimo = cod_emprestimo;
            $scope.errorMsg = false;
            $state.go('emprestimosimulacaocampos');
            //console.log(resp.data.result);

        }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
         title: 'Falha de conexão',
         template: timeoutMsg
       });
     })
      }
    }
 
  $scope.datePickerCallback = function (data){
    $scope.formData.data = $filter('date')(data, 'dd/MM/yyyy', false)
    $scope.buttonText = $scope.formData.data;
  }
  $scope.simulacao = $rootScope.lastRequest.result.simulacaoEmprestimo;

}])
.controller('emprestimoSimulacaoCamposCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', '$filter', '$ionicPopup', function($scope,$state,$rootScope,$http,$ionicLoading,$filter,$ionicPopup){

    ////console.log($rootScope.lastRequest.esmprestimoSimulacaoCampos);
    $scope.formData = {};
    $scope.contrato = $rootScope.lastRequest.esmprestimoSimulacaoCampos.saldos_dados_simulacao;
    $scope.emprestimoSimulacaoCampos = $rootScope.lastRequest.esmprestimoSimulacaoCampos;
    $scope.tipos_emprestimo = $rootScope.lastRequest.result.simulacaoEmprestimo;
    $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0].matricula;
    $scope.dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0];

    $scope.currency = function (valor,e){
      
      milSep = '.';
      decSep = ',';
      casas = 3;

      campo = new Object;
      campo.value = $scope.formData.valor;
      campo.maxLength = 12;
      $scope.formData.valor = $scope.formData.valor.replace(',','').replace('.','');

      var code = e.keyCode; 
      //pega codigo datecla digitada


      if ((code >= 65) && (code <= 90)){
        $scope.formData.valor = $scope.formData.valor.replace(/\D+/g, '');
        return false;

      }
      if (code == 8){
        $scope.formData.valor = '0,00';
        return false;
      }

      switch(code){ //caso seja...
        case 0: //Delete
        //case 8: //backspace
        case 13: //Enter
        return true; //sai da funcao, validando a tecla
      }

      var key = String.fromCharCode(code); //Transforma codigo em caracter
      if (isNaN(key)) return false;  //N?o ? numero, sai da funcao
      if(campo.maxLength <= campo.value.length) return false;//trata erro decasas

      var i = j = 0;
      var len = campo.value.length;
      var len2 = 0;
      var aux = aux2 = '';

      milSep = typeof milSep != "undefined" ? milSep : "."; //se separadoresforem nulos,
      decSep = typeof decSep != "undefined" ? decSep : ",";//especificaseparadores padr?es

      for(i = 0; i < len; i++)
        if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != decSep))
      break;

      for(; i < len; i++){
        if (!isNaN(campo.value.charAt(i))) //se for numero
        aux += campo.value.charAt(i);   //adiciona a variavel auxiliar
      }

      aux += key;             //adiciona tecla digitada
      len = aux.length;

      if (len == 0) campo.value = '';

      //se o numero do campo for menor q a quantidade de casas decimais
      if(len > 0 && len <= casas){ //insere os zeros necessarios antes do mesmo
      campo.value = '0' + decSep;

      /*trecho acrescentado devido ao bug do 1 centavo */
      if (len == 1 && casas == 2)
      campo.value += '0';
      else /*fim trecho */
      for(i = 1; i <= casas - len; i++)
      campo.value += '0';

      campo.value += aux;
      }

      if (len > casas ) {
      aux2 = '';

      for (j = 0, i = len - (casas + 1); i >= 0; i--) {
      if (milSep != "" && j == 3) {
      aux2 += milSep;
      j = 0;
      }
      aux2 += aux.charAt(i);
      j++;
      }
      campo.value = '';
      len2 = aux2.length;

      for (i = len2-1  ; i >= 0; i--) //coloca numero com ou sem separadores no campo
      campo.value += aux2.charAt(i);

      //adiciona numeros decimais
      campo.value += decSep + aux.substr(len - casas, len);
      }

      campo.value = campo.value.substr(0, campo.value.length - 1);
      
      $scope.formData.valor = campo.value;
    }
    
    $scope.submit = function (formData){


      if (
          (!$scope.formData.tipo) ||
          (!$scope.formData.prazoInicial) ||
          (!$scope.formData.valor)){
          $scope.errorMsg = "Por favor preencha todos os campos";
        } else {
      // //console.log($scope.formData);
      // //console.log($scope.emprestimoSimulacaoCampos);
      // //console.log($scope.tipos_emprestimo);
      // //console.log($scope.matricula);
      $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 300,
      showDelay: 0
    });
      jsonData = {
        cod_emprestimo: $scope.emprestimoSimulacaoCampos.cod_emprestimo,
        cod_patrocinadora: $scope.dadosCadastrais.cod_patrocinadora,
        cod_fundo: $scope.dadosCadastrais.cod_fundo,
        matricula: $scope.matricula,
        tipo_simulacao: formData.tipo,
        valor_total_emprestimo: formData.valor,
        cod_prazo_inicial: $scope.emprestimoSimulacaoCampos.limitesCreditos[formData.prazoInicial].cod_prazo_inicial,
        val_salario: $scope.emprestimoSimulacaoCampos.limitesCreditos[formData.prazoInicial].val_salario,
        valor: $scope.emprestimoSimulacaoCampos.limitesCreditos[formData.prazoInicial].valor,
        acao: 'calculaEmprestimo'
      }

      
      $http.post(url_base+';jsessionid='+userInfo.s, 
            { "param" : jsonData, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
          ).then(function(resp) {
            
            $ionicLoading.hide();
            userInfo.u = resp.data.login.u;
            userInfo.s = resp.data.login.s;
                  
            if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {

              if (resp.data.msg.length > 0) { $rootScope.errorMsg = resp.data.msg; } else {

                  $rootScope.lastRequest.esmprestimoSimulacaoCamposEmitido = {};
                  $rootScope.lastRequest.esmprestimoSimulacaoCamposEmitido.json = jsonData;
                  $rootScope.lastRequest.esmprestimoSimulacaoCamposEmitido.result = resp.data.result;
                  
                  for (k in $scope.lastRequest.result.simulacaoEmprestimo){
                    if ($rootScope.lastRequest.result.simulacaoEmprestimo[k].cod_emprestimo == $scope.emprestimoSimulacaoCampos.cod_emprestimo){

                      $rootScope.lastRequest.esmprestimoSimulacaoCamposEmitido.tipo_emprestimo = $rootScope.lastRequest.result.simulacaoEmprestimo[k].desc_emprestimo;
                    }
                  }
                  $scope.errorMsg = false;
                  $state.go('emprestimosimulacaocamposemitido');
                  ////console.log(resp.data.result);
                }
              }

        }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     })
    }}
}])



.controller('EmprestimoSimulacaoCamposEmitidoCtrl', ['$scope', '$state', '$rootScope',  '$http', '$ionicLoading', '$filter', function($scope,$state,$rootScope,$http,$ionicLoading,$filter){

    $scope.formData = {};
    $scope.emprestimoSimulacaoCampos = $rootScope.lastRequest.esmprestimoSimulacaoCampos;
    $scope.emprestimoSimulacaoCamposEmitido = $rootScope.lastRequest.esmprestimoSimulacaoCamposEmitido;
    $scope.emitido = $scope.emprestimoSimulacaoCamposEmitido;
  
    ////console.log($scope);

}])

//MEUS CONTROLLERS


/**
***
***  Simulação RMV 1.1
***
**/
.controller('SimulacaoRendaMensalVitaliciaCtrl', ['$scope', '$state', '$rootScope', '$ionicLoading', '$http', function($scope, $state, $rootScope, $ionicLoading, $http) {
  
  $scope.formData = {};
  
  $scope.years = new Array(); for (var year = 20; year <= 120; year++){
    $scope.years.push(year);
   }

  if ('lastFormRMV' in $rootScope) {
    $scope.formData = $rootScope.lastFormRMV;
  }
  $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;
  $scope.formData.idade = parseInt($rootScope.lastRequest.result.simuladorBeneficios[0].idade);

  $scope.tipoReajuste = $rootScope.lastRequest.result.tipoReajuste[0];
  $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
  delete $scope.tipoReajuste.DEFAULT;


  $scope.goBeneficiarios = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $rootScope.lastFormRMV = {}
    $rootScope.lastFormRMV = formData;
    $state.go('simulacaorendamensalvitaliciabeneficiarios');

  }
  $scope.submit = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $rootScope.lastFormRMV = {}
    $rootScope.lastFormRMV = formData;
    $scope.matricula = $rootScope.lastRequest.result;

    //console.log($scope.matricula);

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : { 
          'acao':'simulaRMV',
          'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
          'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
          'matricula': $scope.matricula.informacoesParticipante[0].matricula,
          'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
          'admissao_patroc': $scope.matricula.dadosCadastrais[0].admissao_patroc,
          'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
          'sexo': $scope.matricula.dadosCadastrais[0].sexo,
          'tipo_reajuste': formData.tipo_reajuste,
          'data_elegibilidade_prevista': $scope.data_elegibilidade_prevista,
          'idade': formData.idade,
          'mes_ano': '',
          'salario_participante': $scope.matricula.informacoesParticipante[0].salario_participante,
          'cresc_real_sal': formData.cresc_real_sal,
          'contribuicao_participante': formData.contribuicao_participante,
          'pensao': formData.pensao,
          'antecipacao_beneficio': formData.antecipacao_beneficio,
          'aporte': formData.aporte,
          'estimativa_rent_entre': formData.estimativa_rent_entre,
          'dependentes_para_fins_ir': formData.dependentes_para_fins_ir,
          'cod_opcao_tributacao': $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao,
          'beneficiario': [
            {
              'cod_parentesco': '01',
              'data_nascimento': '01/12/1993',
              'vinculo': 'V',
              'sexo': 'M',
              'parentesco': 'filho',
              'habilitado': 'N',
              'selecionado': 'S',
              'ordenacao': '1'
            }
          ]

        }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
      ).then(function(resp) {
        
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.simulaRMV = resp.data.result;
            $state.go('simulacaorendamensalvitaliciaresultado');
          }
        }

        $ionicLoading.hide();

        
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
         title: 'Falha de conexão',
         template: timeoutMsg
       });
     })
  }
}])

.controller('SimulacaoRendaMensalVitaliciaCtrl.beneficiarios', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  
  console.log($rootScope);
  $scope.beneficiario = Array();

  // $scope.beneficiarios = [
  //     {
  //       beneficiario: 'Beneficiário 1',
  //       dt_nascimento: '06/12/1993',
  //       vinculo: 'vitalício',
  //       sexo: 'M',
  //       parentesco: 'Filho'
  //     },
  //     {
  //       beneficiario: 'Beneficiário 2',
  //       dt_nascimento: '06/12/1994',
  //       vinculo: 'vitalício',
  //       sexo: 'F',
  //       parentesco: 'Filho'
  //     }
  //   ];
  if ($rootScope.lastRequest.result.simuladorBeneficios.beneficiarios) {
    $scope.beneficiarios = $rootScope.lastRequest.result.simuladorBeneficios.beneficiarios;
  } else {
  $scope.beneficiarios = new Array();  
  }

  $scope.beneficiarioToggle = function(key) {
    if($scope.beneficiario[key])
      $scope.beneficiario[key] = false;
    else
      $scope.beneficiario[key] = true;
  }

  $scope.addBeneficiario = function() {
    // alert('oi');
    var nextBeneficiario = $scope.beneficiarios.length+1;
    var new_benef = {
      beneficiario: 'Beneficiário '+nextBeneficiario,
      dt_nascimento: '',
      vinculo: '',
      sexo: '',
      parentesco: ''
    }
    $scope.beneficiarios.push(new_benef);
    position = $scope.beneficiarios.length;

    //abrir o form para editar este beneficiario
    $scope.beneficiario[position-1] = true;
  }
  $scope.rmBeneficiario = function(e) {
    // alert('oi');
    if (e){
    $scope.beneficiarios.splice(e, 1);
    }
  }
}])

.controller('SimulacaoRendaMensalVitaliciaCtrl.resultado', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  $scope.showChild = false

  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
  $scope.value = $rootScope.simulaRMV;
  $scope.value.texto_simulacao_renda_mensal_vitalicia = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_rmv;


  $scope.toggleChild = function() {
    if($scope.showChild)
      $scope.showChild = false;
    else
      $scope.showChild = true;

  }

  $scope.showChildC = false;

  $scope.toggleChildC = function() {
    if($scope.showChildC)
      $scope.showChildC = false;
    else
      $scope.showChildC = true;

  }

}])

/**
***
***  Simulação Saque Programado 1.2
***
**/
.controller('SimulacaoSaqueProgramadoCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  
  $scope.formData = new Object();
  console.log($scope.formData);
  $scope.formData.idade = parseInt($rootScope.lastRequest.result.simuladorBeneficios[0].idade);
  $scope.years = new Array(); for (var year = 20; year <= 120; year++){
    $scope.years.push(year);
  }

  $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;
  $scope.submit = function(formData) {
    $scope.matricula = $rootScope.lastRequest.result;
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : { 
          'acao':'simulaSP',
          'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
          'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
          'matricula': $scope.matricula.informacoesParticipante[0].matricula,
          'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
          'admissao_patroc': $scope.matricula.dadosCadastrais[0].admissao_patroc,
          'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
          'sexo': $scope.matricula.dadosCadastrais[0].sexo,
          'data_elegibilidade_prevista': $scope.data_elegibilidade_prevista,
          'idade': formData.idade,
          'mes_ano': '',
          'salario_participante': $scope.matricula.informacoesParticipante[0].salario_participante,
          'cresc_real_sal': formData.cresc_real_sal,
          'contribuicao_participante': formData.contribuicao_participante,
          'antecipacao_beneficio': formData.antecipacao_beneficio,
          'aporte': formData.aporte,
          'dependentes_ir': formData.dependentes_ir,
          'estimativa_rent_entre': formData.estimativa_rent_entre,
          'estimativa_rent_apos': formData.estimativa_rent_entre,
          'renda_mensal': formData.renda_mensal,
          'abono_anual': formData.abono_anual

        }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;

        $rootScope.errorMsg = resp.data.msg; 
        
        if (!resp.data.success) { $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
          } else {
            console.log('passou');
            $rootScope.lastRequest.result.simulaSP = resp.data.result;
            $state.go('simulacaosaqueprogramadoresultado');
          }
        }

        $ionicLoading.hide();
        
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
         title: 'Falha de conexão',
         template: timeoutMsg
       });
     })
  }
}])

.controller('SimulacaoSaqueProgramadoCtrl.resultado', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  $scope.value = $rootScope.lastRequest.result.simulaSP;
  $scope.value.texto_simulacao_saque_programado = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_saque_prog;
  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
 

}])

/**
***
***  Simulação RMV + Saque Programado 1.3
***
**/
.controller('SimulacaoRmvSaqueProgramadoCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  $scope.formData = {};

  $scope.formData.idade = parseInt($rootScope.lastRequest.result.simuladorBeneficios[0].idade);
  $scope.years = new Array(); for (var year = 20; year <= 120; year++){
    $scope.years.push(year);
  }
  $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;
  $scope.tipoReajuste = $rootScope.lastRequest.result.tipoReajuste[0];
  $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
  delete $scope.tipoReajuste.DEFAULT;
  
  $scope.goBeneficiarios = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $rootScope.lastFormRMV = {}
    $rootScope.lastFormRMV = formData;
    $state.go('simulacaorendamensalvitaliciabeneficiarios');

  }
  $scope.submit = function(formData) {

    $scope.matricula = $rootScope.lastRequest.result;

    //console.log($scope.matricula);

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : { 
          'acao':'simulaRmvSp',
          'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
          'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
          'matricula': $scope.matricula.informacoesParticipante[0].matricula,
          'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
          'admissao_patroc': $scope.matricula.dadosCadastrais[0].admissao_patroc,
          'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
          'sexo': $scope.matricula.dadosCadastrais[0].sexo,
          'tipo_reajuste': formData.tipo_reajuste,
          'salario_participante': $scope.matricula.informacoesParticipante[0].salario_participante,
          'cresc_real_sal': formData.cresc_real_sal,
          'contribuicao_participante': formData.contribuicao_participante,
          'pensao': formData.pensao,
          'antecipacao_beneficio': formData.antecipacao_beneficio,
          'aporte': formData.aporte,
          'estimativa_rent_entre': formData.estimativa_rent_entre,
          'estimativa_rent_apos': formData.estimativa_rent_apos,
          'renda_mensal': formData.renda_mensal,
          'abono_anual': formData.abono_anual,
          'dependentes_ir': formData.dependentes_ir,
          'data_elegibilidade_prevista':  $scope.data_elegibilidade_prevista,
          'idade': formData.idade,
          'mes_ano': '',
          'beneficiario': []

        }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;

        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.simulaRmvSp = resp.data.result;
            $state.go('simulacaormvsaqueprogramadoresultado');
          }
        }
        
     }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
         title: 'Falha de conexão',
         template: timeoutMsg
       });
     })
  }
}])

.controller('SimulacaoRmvSaqueProgramadoCtrl.resultado', ['$scope', '$state', '$rootScope', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
    $scope.showChild = false;

    $scope.value = $rootScope.simulaRmvSp;
    $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
    $scope.value.texto_simulacao_rmv_saque = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_hibrido;

    console.log($rootScope.simulaRmvSp);

    $scope.toggleChild = function() {
      if($scope.showChild)
        $scope.showChild = false;
      else
        $scope.showChild = true;

    }

    $scope.showChildC = false;

    $scope.toggleChildC = function() {
      if($scope.showChildC)
        $scope.showChildC = false;
      else
        $scope.showChildC = true;

    }
}])

.controller('AlteracaoPercentualRetiradaCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {

  $scope.formData = {};
  $scope.matricula = $rootScope.lastRequest.result;

  if ('lastFormAlteracaoRVM' in $rootScope) {
    $scope.formData = $rootScope.lastFormAlteracaoRVM;
  }

  $scope.submit = function(formData) {

    $rootScope.lastFormAlteracaoRVM = {}
    $rootScope.lastFormAlteracaoRVM = formData;

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
      { "param" : { 
        'acao':'simulaBeneficioSP',
        'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
        'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
        'matricula': $scope.matricula.informacoesParticipante[0].matricula,
        'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
        'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
        'renda_mensal': formData.percentual_renda_mensal,
        'estimativa_rent_anual': formData.estimativa_rentabilidade,
        'dependentes_ir': formData.dependentes_ir,
        'abono_anual': formData.abono

      }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
    ).then(function(resp) {
       

        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.lastRequest.result.simulaBeneficioSP = resp.data.result;
            $state.go('alteracaopercentualretiradaresultado');
          }
        }

        $ionicLoading.hide();
      
   }, function(err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
   })
  }
}])

.controller('AlteracaoPercentualRetiradaCtrl.resultado', ['$scope', '$state', '$http', '$rootScope','$ionicLoading', function($scope, $state, $http, $rootScope, $ionicLoading) {
  $scope.value = $rootScope.lastRequest.result.simulaBeneficioSP;

  $scope.matricula = $rootScope.lastRequest.result;
  $scope.value.texto_alteracao_percentual_retirada = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_benf_saque;

  if ('lastFormAlteracaoRVM' in $rootScope) {
    $scope.formData = $rootScope.lastFormAlteracaoRVM;
  }
  console.log($scope.formData);

  $scope.submit = function(formData) {

    $rootScope.lastFormAlteracaoRVM = {}
    $rootScope.lastFormAlteracaoRVM = formData;

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
      { "param" : { 
        'acao':'simulaBeneficioSP',
        'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
        'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
        'matricula': $scope.matricula.informacoesParticipante[0].matricula,
        'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
        'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
        'renda_mensal': formData.percentual_renda_mensal,
        'estimativa_rent_anual': formData.estimativa_rentabilidade,
        'dependentes_ir': formData.dependentes_ir,
        'abono_anual': formData.abono

      }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
    ).then(function(resp) {
       

        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.lastRequest.result.simulaBeneficioSP = resp.data.result;
            $state.go('alteracaopercentualretiradaresultado');
          }
        }

        $ionicLoading.hide();
      
   }, function(err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
   })
  }



}])

.controller('SimulacaoRmvAposentadoCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  
  $scope.matricula = $rootScope.lastRequest.result;

  $scope.tipoReajuste = $rootScope.lastRequest.result.tipoReajuste[0];
  $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
  delete $scope.tipoReajuste.DEFAULT;

  if ('lastFormAposentadoRVM' in $rootScope) {
    $scope.formData = $rootScope.lastFormAposentadoRVM;
  }

  $scope.submit = function(formData) {

    $rootScope.lastFormAposentadoRVM = {}
    $rootScope.lastFormAposentadoRVM = formData;

    $http.post(url_base+';jsessionid='+userInfo.s, 
      { "param" : { 
        'acao':'simulaAlteracaoRMV',
        'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
        'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
        'matricula': $scope.matricula.informacoesParticipante[0].matricula,
        'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
        'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
        'tipo_reajuste': formData.tipo_reajuste,
        'percentual_de_renda_mensal': "0",
        'pensao': formData.pensao,
        'dependentes_ir': formData.dependentes_ir

      }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
    ).then(function(resp) {
       userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $rootScope.errorMsg = resp.data.msg; 
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
          } else {
            $rootScope.lastRequest.result.simulaAlteracaoRMV = resp.data.result;
            $state.go('simulacaormvaposentadoresultado');
          }
        }
      
      
   }, function(err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
   })
  }
}])

.controller('SimulacaoRmvAposentadoCtrl.resultado', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  $scope.value = $rootScope.lastRequest.result.simulaAlteracaoRMV;

  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
  //add o texto de alyteracao rmv aposentado
  $scope.value.texto_alteracao_rmv_aposentado = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_rmv;

  $scope.value.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
  //console.log($scope.value.desc_opcao_tributaca);

}])

.controller('AlteracaoRmvSaqueCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  
  if ($rootScope.formRecalcular){
    $scope.formData = $rootScope.formRecalcular;
  }
  $scope.matricula = $rootScope.lastRequest.result;

  $scope.tipoReajuste = $rootScope.lastRequest.result.tipoReajuste[0];
  $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
  delete $scope.tipoReajuste.DEFAULT;

  $scope.submit = function(formData) {
    // aqui tem.
    $ionicLoading.show();
    $rootScope.formRecalcular = formData;

    $http.post(url_base+';jsessionid='+userInfo.s, 
      { "param" : { 
        'acao':'simulaBeneficioRmvSp',
        'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
        'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
        'matricula': $scope.matricula.informacoesParticipante[0].matricula,
        'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
        'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
        'tipo_reajuste': formData.tipo_reajuste,
        'renda_mensal': formData.renda_mensal,
        'percentual_rmv': formData.renda_mensal_vitalicia,
        'percentual_saque': formData.saque_programado,
        'estimativa_rent_apos': formData.estimativa_rent_apos,
        'pensao': formData.pensao,
        'abono_anual': formData.abono_anual,
        'dependentes_ir': formData.dependentes_ir

      }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
    ).then(function(resp) {
      // nao tem formdata aqui ()aqui nao tem escopo. tem que pegar do $scope.
      userInfo.u = resp.data.login.u;
      userInfo.s = resp.data.login.s;

//console.log(resp);
//console.log($rootScope);

      $ionicLoading.hide();
      
      $rootScope.errorMsg = resp.data.msg;

      //inserir o percentual do saque no json
      resp.data.result.percentual_saque = formData.saque_programado;
      resp.data.result.percentual_rmv = formData.renda_mensal_vitalicia;
      
      if (!resp.data.success) {
        $state.go('signin');
      } else {
        $rootScope.lastRequest.result.simulaBeneficioRmvSp = resp.data.result;
        $state.go('alteracaormvsaqueresultado');
      } 
      
      
   }, function(err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
   })
  }
}])

.controller('AlteracaoRmvSaqueCtrl.resultado', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  $scope.matricula = $rootScope.lastRequest.result;
  //$rootScope.formRecalcular;

  $scope.value.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
  $scope.value = $rootScope.lastRequest.result.simulaBeneficioRmvSp;
  $scope.value.texto_alteracao_rmv_saque = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_alteracao_hibrido;

  $scope.submit = function(formData) {
    $ionicLoading.show();
    $rootScope.formRecalcular = $rootScope.formRecalcular;

    $http.post(url_base+';jsessionid='+userInfo.s, 
      { "param" : { 
        'acao':'simulaBeneficioRmvSp',
        'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
        'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
        'matricula': $scope.matricula.informacoesParticipante[0].matricula,
        'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
        'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
        'tipo_reajuste': $rootScope.formRecalcular.tipo_reajuste,
        'renda_mensal': $rootScope.formRecalcular.renda_mensal,
        'percentual_rmv': $rootScope.formRecalcular.renda_mensal_vitalicia,
        'percentual_saque': $rootScope.formRecalcular.saque_programado,
        'estimativa_rent_apos': $scope.formData.estimativa_rent_apos,
        'pensao': $rootScope.formRecalcular.pensao,
        'abono_anual': $rootScope.formRecalcular.abono_anual,
        'dependentes_ir': $rootScope.formRecalcular.dependentes_ir

      }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
    ).then(function(resp) {
      userInfo.u = resp.data.login.u;
      userInfo.s = resp.data.login.s;

      //console.log(resp);
      //console.log($rootScope);

      $ionicLoading.hide();
      
      $rootScope.errorMsg = resp.data.msg;

      //inserir o percentual do saque no json
      resp.data.result.percentual_saque = $rootScope.formRecalcular.saque_programado;
      resp.data.result.percentual_rmv = $rootScope.formRecalcular.renda_mensal_vitalicia;
      
      if (!resp.data.success) {
        $state.go('signin');
      } else {
        $ionicLoading.hide();
        $rootScope.lastRequest.result.simulaBeneficioRmvSp = resp.data.result;
        $state.go('alteracaormvsaqueresultado');
      } 
      
      
   }, function(err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
   })
  }
}])

.controller('SimulacaoResgateNovoCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  
}])

.controller('SaldoContasCtrl', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  
}])

//END MEUS CONTROLLERS

.controller('PopupCtrl',['$scope', '$ionicPopup', '$timeout', function($scope, $ionicPopup, $timeout) {

// Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {}

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });
  myPopup.then(function(res) {
    //console.log('Tapped!', res);
  });
  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };
 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     template: 'Are you sure you want to eat this ice cream?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       //console.log('You are sure');
     } else {
       //console.log('You are not sure');
     }
   });
 };

 // An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: 'It might taste good'
   });
   alertPopup.then(function(res) {
     //console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
}]);


angular.module('starter.Directives', [])

.directive('browseTo', function ($ionicGesture) {
 return {
  restrict: 'A',
  link: function ($scope, $element, $attrs) {
   var handleTap = function (e) {
    var inAppBrowser = window.open(encodeURI($attrs.browseTo), '_system');
   };
   var tapGesture = $ionicGesture.on('tap', handleTap, $element);
   $scope.$on('$destroy', function () {
    // Clean up - unbind drag gesture handler
    $ionicGesture.off(tapGesture, 'tap', handleTap);
   });
  }
 }
})

.directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
        return scope.$eval(attrs.compile);
      },
      function(value) {
        element.html(value);
        $compile(element.contents())(scope);
      }
   )};
}])
