//var url_base = 'http://192.100.100.82:8080/prevmobile-ws/rest/acesso/padrao';
var url_base = 'http://www.sysprev.com.br/prevmobile-ws/rest/acesso/padrao';
//var url_base = 'http://www.fundacaotelos.com.br:8989/prevmobile-ws/rest/acesso/padrao';
//var url_base = 'https://telosmobile.fundacaotelos.com.br/prevmobile-ws/rest/acesso/padrao';
//var url_base = 'http://telosmobile.fundacaotelos.com.br:8989/prevmobile-ws/rest/acesso/padrao';


var inspect, angular, cordova, globalPopup, timeoutErrorMsg, defaultErrorMessage

// Cache de algumas propriedades da window
inspect = window.inspect
angular = window.angular
cordova = window.cordova



var stageMap = {}
var logged = false;
var userInfo = new Object();
var timeoutMsg = "Rede indisponível";
var map = {}
map.vinculo = new Array();
map.vinculo["V"] = 'Vitalício';
map.vinculo["I"] = 'Indicado';
map.vinculo["T"] = 'Temporário';

map.sexo = new Array();
map.sexo["M"] = 'Masculino';
map.sexo["F"] = 'Feminino';

map.parentesco = new Array();
map.parentesco["01"] = "Cônjuge";
map.parentesco["02"] = "Ex-Cônjuge";
map.parentesco["03"] = "Companheiro(a)";
map.parentesco["04"] = "Ex-Companheiro(a)";
map.parentesco["05"] = "Pai ou Mãe";
map.parentesco["06"] = "Designado";
map.parentesco["07"] = "Filho(a)";
map.parentesco["08"] = "Enteado(a)";
map.parentesco["09"] = "Irmão ou Irmã";
map.parentesco["10"] = "Menor sob Guarda";
map.parentesco["11"] = "Sogro(a)";
map.parentesco["12"] = "Filho > 24 anos";


/**
 * Verifica se a resposta retornada pelo servidor é válida
 * @param {object} resp
 * @returns {boolean}
 */
function checkIfServerAnswerIsValid (resp) {
  // console.log(inspect(resp))
  var msg, data, error
  if (resp && resp['data']) {
    data = resp['data']
    msg = data['msg']

    if (data.login && data.login.u && data.login.s) {
      userInfo.u = data.login.u
      userInfo.s = data.login.s
    }

    if (data['success'] && !msg && data['result']) return true
  }

  error = new Error(msg || defaultErrorMessage)
  error.isLoginError = !!(data && !data['success'])

  throw error
}

/**
 * Retorna ou gera identificador único do aparelho
 * Modified from: https://gist.github.com/LeverOne/1308368
 * @returns {String}
 */
function uuid () {
  var n, r, u

  if (window.device && window.device.uuid) {
    return (window.device.uuid + '').slice(0, 256)
  } else {
    u = window.localStorage.getItem('uuid')
    if (u) return u
  }

  // Magic
  r = n = ''
  while (n++ < 36) {
    if ((51 * n) & 52) r += (15 ^ n ? 8 ^ (Math.random() * (20 ^ n ? 16 : 4)) : 4).toString(16)
  }

  u = r.slice(0, 256)
  window.localStorage.set('uuid', u)
  return u
}

/**
 * Recupera propriedade de um objeto
 * @param {object} obj
 * @param {string...} key
 * @returns {*}
 */
function retrieve (obj, key) {
  var i, field, length

  length = arguments.length
  if (!key) throw new Error('Falta argumento da chave do campo')

  i = 0
  while (++i < length) {
    key = arguments[i] + ''

    if (!obj) throw new Error('Acesso à propriedade ' + key + ' em um objecto inválido')
    if (!obj.hasOwnProperty(key)) throw new Error('Acesso à propriedade inválida: ' + key + ' em ' + inspect(obj))

    field = obj[key]
    if (Array.isArray(field)) {
      switch (field.length) {
        case 0:
          throw new Error('Tentativa de acesso a um campo vazio: ' + key + ' em ' + inspect(obj))
        case 1:
          obj = field[0]
          continue
      }
    }

    obj = field
  }

  return obj
}




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
    //itachi
  $scope.stageMap = stageMap;


  console.log(userInfo)

  

  if (userInfo.cpf === "08275049776") {
    $scope.stageMap = new Object();
    $scope.stageMap['00'] = stageMap['00'];
  }

  if (userInfo.cpf === "08022431770") {
    $scope.stageMap = new Object();
    $scope.stageMap['01'] = stageMap['01'];
    $scope.stageMap['02'] = stageMap['02'];
    $scope.stageMap['19'] = stageMap['19'];
    $scope.stageMap['20'] = stageMap['20'];
  }

  if (userInfo.cpf === "01601659628") {
    $scope.stageMap = new Object();
    $scope.stageMap['01'] = stageMap['01'];
    $scope.stageMap['08'] = stageMap['08'];
  }

  console.log($scope.stageMap);
  }

  $scope.logout = function(){

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });
    $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
        { "param" : { "acao": "logout" }, "login" : { "u":userInfo.u, "s":userInfo.s } }).then(function(resp) {
            stageMap = {}
            logged = false;
            userInfo = new Object();
            $rootScope.cache = {}
            $rootScope.lastRequest = {}
            delete $rootScope.beneficiariosOriginal;
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



  // ***************** CODIGO MOCKADO
  $scope.onChangeDeBiometriaMockado = function() {
  if (window.plugins && $scope.formData.cpf.length === 11 && $scope.formData.cpf == "08275049776") {

    stageMap = {}
    logged = false;
    userInfo = new Object();
    $rootScope.lastRequest = {}

    $this = this;
    window.plugins.touchid.has("MyKey", 
      function() {
        if (window.plugins) {
          window.plugins.touchid.verify("MyKey", "My Message", function(password) {
            $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });
            
            

            $http.post(url_base, 
              { "param" : { "cpf": "08275049776", "sen": "123456", "acao": "logar" }, "login" : { "u":"", "s":"" } }
            ).then(function(resp) {
              
                // Se conseguiu conectar com o servidor
                $ionicLoading.hide();
        
                //resp.data.result.termo_de_uso = [ { descricao_termo_uso: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"} ];
        
                $rootScope.lastRequest = resp.data;
                $rootScope.cache = {} 
        

                

                if(typeof $rootScope.lastRequest.result.simuladorBeneficios != 'undefined') {
                  for(k in $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios) {
                    $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios[k].checked = true;
                    $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios[k].selecionado = 'S';
                  }
                }
                console.log("ALO ALO")
                if (resp.data.msg.length > 0){
                  $rootScope.errorMsg = resp.data.msg;
                  console.log("ALO ALO1") 
                 
                } else {
        
                    logged = true;
                    userInfo.u = resp.data.login.u;
                    console.log("ALO ALO")
                    userInfo.s = resp.data.login.s;
                    console.log("ALO ALO3")
                    userInfo.cpf = $this.formData.cpf;
                    console.log("ALO ALO4")
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
                  });       
              })
          });
        }
      }, function() {
        console.log("sem chave salva, fluxo normal");
      }
    );
  }   
} 
// FIM CODIGO MOCKADO *****************
  


  
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
          $rootScope.cache = {} 

          if(typeof $rootScope.lastRequest.result.simuladorBeneficios != 'undefined') {
            for(k in $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios) {
              $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios[k].checked = true;
              $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios[k].selecionado = 'S';
            }
          }

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
       // if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
        
       console.log(resp)
          $scope.resgate = resp.data.result;
          $ionicLoading.hide();        
        //}

      }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });


  $scope.submit = function () {

    $ionicLoading.show();

    $http.post(url_base + ';jsessionid=' + $rootScope.lastRequest.login.s,
      { "param": { "acao": "calculaSimulacaoResgate", cpf: userInfo.cpf }, "login": { "u": userInfo.u, "s": userInfo.s, "cpf": userInfo.cpf } }
    ).then(function (resp) {
      $ionicLoading.hide();

      $scope.resgate = resp.data.result;
      

      //execucao para pegar os dados da tela denovo
      $http.post(url_base + ';jsessionid=' + $rootScope.lastRequest.login.s,
        { "param": { "acao": "simulacaoResgate" }, "login": { "u": userInfo.u, "s": userInfo.s, "cpf": userInfo.cpf } }
      ).then(function (resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {

          $scope.resgate = resp.data.result;
          $ionicLoading.hide();
        }

      }, function (err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Falha de conexão',
          template: timeoutMsg
        });
      });


    }, function (err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Falha de conexão',
        template: timeoutMsg
      });
    });
  }

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
            delete $rootScope.beneficiariosOriginal;
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

  if (userInfo.cpf === "08275049776") {
    $scope.matricula.plano = "-";
    $scope.matricula.situacao = "-";
    $scope.matricula.regimetributario = "-";
  }

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
.controller('AdesaoCtrl', ['$scope', '$state', '$rootScope','$ionicLoading','$http','$ionicPopup', function($scope, $state, $rootScope,$ionicLoading, $http,$ionicPopup) {
  

  $ionicLoading.show();
  $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
        { "param" : { "acao": "adesaoInfo","cpf": userInfo.cpf }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf": userInfo.cpf } }
      ).then(function(resp) {
       // userInfo.u = resp.data.login.u;
       // userInfo.s = resp.data.login.s;
        $ionicLoading.hide();

        console.log(resp.data.result.adesao)


       
        $scope.cpf = userInfo.cpf;
        
          $scope.adesao = resp.data.result.adesao[0];
          $ionicLoading.hide();        
        

      }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });


  $scope.submit = function () {

    $ionicLoading.show();

    $http.post(url_base + ';jsessionid=' + $rootScope.lastRequest.login.s,
      { "param": { "acao": "solicitarAdesao", cpf: userInfo.cpf, perfil: $scope.adesao.perfil, ir: $scope.adesao.ir, percentual_contribuicao: $scope.adesao.percentual_contribuicao, idpar: $scope.adesao.idpar }, "login": { "u": userInfo.u, "s": userInfo.s, "cpf": userInfo.cpf } }
    ).then(function (resp) {
      $ionicLoading.hide();

      //$scope.adesao = resp.data.result;
      

      //execucao para pegar os dados da tela denovo
      $http.post(url_base + ';jsessionid=' + $rootScope.lastRequest.login.s,
        { "param": { "acao": "adesaoInfo","cpf": userInfo.cpf }, "login": { "u": userInfo.u, "s": userInfo.s, "cpf": userInfo.cpf } }
      ).then(function (resp) {
        //userInfo.u = resp.data.login.u;
        //userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
        

          $scope.adesao = resp.data.result.adesao[0];
          $ionicLoading.hide();
        

      }, function (err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Falha de conexão',
          template: timeoutMsg
        });
      });


    }, function (err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Falha de conexão',
        template: timeoutMsg
      });
    });
  }


}])
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

  

  $scope.listaBancos = $rootScope.lastRequest.result.listaBancos;

  $scope.formData = $scope.dados;
  $scope.submit = function(){

    $scope.dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0];
    $scope.informacoesParticipante = $rootScope.lastRequest.result.informacoesParticipante[0];
        $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

        var infoConta = $scope.formData.conta.split("-");

        if (infoConta[0] == "" || infoConta[0] == "") {
          infoConta[0] = null;
          infoConta[1] = null;
        }

        var sel = document.getElementById("banco");
        var nomeBanco = sel.options[sel.selectedIndex].text;

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
      numero_banco: $scope.dados.num_banco,
      nome_banco: nomeBanco,
      agencia: $scope.formData.agencia,
      conta: infoConta[0],
      digito: infoConta[1],
      acao: 'alteracao',
      cpf: userInfo.cpf

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
            $rootScope.cache.cod_ano_mes = $scope.formData.cod_ano_mes;
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

  console.log($rootScope);

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
            'descricaoEmail' : $rootScope.lastRequest.result.dadosCadastrais[0].email, 
            'acao':'extratoContasEnvioEmail', 
            'dataAtualizacao':$rootScope.cache.cod_ano_mes
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
            alert('Enviado para '+$rootScope.lastRequest.result.dadosCadastrais[0].email);
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
  $scope.saldo.detalhesSaldoContas = false;

  setTimeout(function(){
    $scope.formData.data_atualizacao = $scope.saldo[0].data_atualizacao;
    $scope.submit();
  }, 200);

  $scope.submit = function(){
    $scope.saldo.detalhesSaldoContas = false;

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
            console.log(resp.data.result);
            $rootScope.lastRequest.saldoEmitido = resp.data.result;
            $scope.saldo.detalhesSaldoContas = resp.data.result.detalhesSaldoContas;
            $scope.saldo.total_financeiro = resp.data.result.total_financeiro;
            $scope.formData.data_atualizacao = $scope.formData.data_atualizacao;
            $scope.saldo.dados_atualizadoEm = resp.data.result.dados_atualizadoEm;
            $rootScope.cache.data_atualizacao = $scope.formData.data_atualizacao;
            //$state.go('saldoemitido');
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
   $scope.sendMail = function() {
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : {
            'descricaoEmail' : $rootScope.lastRequest.result.dadosCadastrais[0].email, 
            'acao':'saldoContasEnvioEmail', 
            'dataAtualizacao':$rootScope.cache.data_atualizacao
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
            alert('Enviado para '+$rootScope.lastRequest.result.dadosCadastrais[0].email);
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
            $rootScope.cache.data_pagamento = $scope.formData.data_pagamento;
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
            'descricaoEmail' : $rootScope.lastRequest.result.dadosCadastrais[0].email, 
            'acao':'demonstrativoPagamentoEmail', 
            'dataAtualizacao':$rootScope.cache.data_pagamento
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
            alert('Enviado para '+$rootScope.lastRequest.result.dadosCadastrais[0].email);
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
  $scope.contribuicao_participante = $rootScope.lastRequest.result.informacoesParticipante[0].contribuicao_participante;
  $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao;
  $scope.years = new Array(); for (var year = 20; year <= 120; year++){
    $scope.years.push(year);
   }



  console.log($rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios);

  $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;
  $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
  $scope.formData.dependentes_para_fins_ir = $rootScope.lastRequest.result.simuladorBeneficios[0].dependentes_para_fins_ir;
  
  // $scope.formData.tipo_reajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0].DEFAULT);
  // $scope.tipoReajuste = $rootScope.lastRequest.result.tipoReajuste[0];
  // delete $scope.tipoReajuste.DEFAULT;

  $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
  //pega o valor default
  $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0];

  //remove default do tipo de reajuste
  delete $scope.tipoReajuste.DEFAULT;

  //seta o valor do form como o default do ws.
  $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT;

// console.log('default do tipo_reajuste: ');
// console.log($scope.formData.tipo_reajuste);  
  
  //se existe lastForm 
  if (typeof $rootScope.cache.lastFormRMV != 'undefined') {

    //se mes ano ta preenchido
    if(typeof $rootScope.cache.lastFormRMV.mes_ano != 'undefined') {
      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
    }

    if(typeof $rootScope.cache.lastFormRMV.idade != 'undefined') {
      $scope.formData.mes_ano = '';
    }
  }

  $scope.goBeneficiarios = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $rootScope.cache.formToBeneficiarios = {}
    $rootScope.cache.formToBeneficiarios = formData;
    $rootScope.cache.routeToBeneficiarios = "simulacaorendamensalvitaliciaresultado";
    $rootScope.cache.routeParams = $scope.getParams(formData);
    $state.go('simulacaorendamensalvitaliciabeneficiarios');

  }
  $scope.getParams = function(formData) {
     
     if (typeof(formData.mes_ano) == 'undefined') { formData.mes_ano = ''; }
     if (typeof(formData.idade) == 'undefined') { formData.idade = ''; }

     if (formData.idade.length > 0 ) { console.log('entrou');  formData.mes_ano = ''; }

     return { 
          'acao':'simulaRMV',
          'cod_fundo': $rootScope.lastRequest.result.dadosCadastrais[0].cod_fundo,
          'cod_patrocinadora': $rootScope.lastRequest.result.dadosCadastrais[0].cod_patrocinadora,
          'matricula': $rootScope.lastRequest.result.informacoesParticipante[0].matricula,
          'cod_plano': $rootScope.lastRequest.result.dadosCadastrais[0].cod_plano,
          'admissao_patroc': $rootScope.lastRequest.result.dadosCadastrais[0].admissao_patroc,
          'data_nascimento': $rootScope.lastRequest.result.dadosCadastrais[0].data_nascimento,
          'sexo': $rootScope.lastRequest.result.dadosCadastrais[0].sexo,
          'tipo_reajuste': formData.tipo_reajuste,
          'data_elegibilidade_prevista': $scope.data_elegibilidade_prevista,
          'idade': formData.idade,
          'mes_ano': formData.mes_ano,
          'salario_participante': $rootScope.lastRequest.result.informacoesParticipante[0].salario_participante,
          'cresc_real_sal': formData.cresc_real_sal,
          'contribuicao_participante': formData.contribuicao_participante,
          'pensao': formData.pensao,
          'antecipacao_beneficio': formData.antecipacao_beneficio,
          'aporte': formData.aporte,
          'estimativa_rent_entre': formData.estimativa_rent_entre,
          'dependentes_para_fins_ir': formData.dependentes_para_fins_ir,
          'cod_opcao_tributacao': $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao,
          'beneficiario': $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios

        }
  }
  $scope.submit = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $rootScope.cache.formToBeneficiarios = {}
    $rootScope.cache.formToBeneficiarios = formData;
    $rootScope.cache.routeParams = {}
    $rootScope.cache.routeParams = formData;
    $rootScope.cache.routeParams.beneficiarios = $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios;
    


    $rootScope.cache.lastFormRMV = {}
    $rootScope.cache.lastFormRMV = $scope.getParams(formData);
console.log('lastFormRMV no submit: '+$rootScope.cache.lastFormRMV);
    //console.log($rootScope.lastRequest.result);

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : $scope.getParams(formData), "login" : { "u":userInfo.u, "s":userInfo.s  } }
      ).then(function(resp) {
        
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.cache.simulaRMV = resp.data.result;
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

.controller('SimulacaoRendaMensalVitaliciaCtrl.beneficiarios', ['$scope', '$state', '$rootScope', '$ionicModal', '$ionicLoading', '$http', function($scope, $state, $rootScope, $ionicModal, $ionicLoading, $http) {
  
  console.log($rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios);
  

console.log('scope: ');
console.log($scope);
console.log('rootScope: ');
console.log($rootScope);

  //se já existe um beneficiariosOriginal, não sobrescrever.
  if(typeof $rootScope.beneficiariosOriginal == 'undefined') {
    $rootScope.beneficiariosOriginal = angular.copy($rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios);
  }

  if($rootScope.resetBeneficiarios && typeof $rootScope.beneficiariosOriginal != 'undefined'){
    console.log('aqui resetou os beneficiarios');
    delete $scope.beneficiarios;
    $scope.beneficiarios = angular.copy($rootScope.beneficiariosOriginal);
    $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios = angular.copy($rootScope.beneficiariosOriginal);
    $rootScope.resetBeneficiarios = false;
  }else {
    $scope.beneficiarios = $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios;
  }

  $scope.beneficiarios.forEach(function(v,k){
    $scope.beneficiarios[k].fromDB = true;
    if ($scope.beneficiarios[k].selecionado == 'S'){
      $scope.beneficiarios[k].checked = true;
    }
    if ($scope.beneficiarios[k].habilitado == 'N'){
      $scope.beneficiarios[k].readonly = true;
    }
  });

  $scope.map = map;
  $scope.formAddBeneficiario = {}
  $scope.changeSelecionado = function(){

console.log('scope beneficiarios: ');
console.log($scope.beneficiarios);

    $scope.beneficiarios.forEach(function(v,k){
        if (($scope.beneficiarios[k].checked || $scope.beneficiarios[k].habilitado == 'N')){
          $scope.beneficiarios[k].selecionado = 'S';
          $scope.beneficiarios[k].checked = true;
        } else {
          $scope.beneficiarios[k].selecionado = 'N';
          $scope.beneficiarios[k].checked = false;
        }
    })

  }

  $scope.addBeneficiario = function(formAddBeneficiario){

    if ((typeof(formAddBeneficiario.cod_parentesco) == 'undefined') || (typeof(formAddBeneficiario.sexo) == 'undefined') || (typeof(formAddBeneficiario.vinculo) == 'undefined') || (typeof(formAddBeneficiario.data_nascimento) == 'undefined')){
      $scope.errorMsg = "Por favor preencha todos os campos";
    } else {
      $scope.errorMsg = "";
    
    var addBeneficiario = formAddBeneficiario;
    addBeneficiario.fromDB = false;
    addBeneficiario.ordenacao = ($scope.beneficiarios.length+1).toString();
    addBeneficiario.selecionado = "S";
    addBeneficiario.habilitado = "S";
    addBeneficiario.checked = true;

    $scope.beneficiarios.push(addBeneficiario);
    $scope.closeModal();
    }
  }

  $scope.rmBeneficiario = function(k){
    $scope.beneficiarios.splice(k, 1);
  }

  $ionicModal.fromTemplateUrl('templates/modal/add-beneficiarios.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.formAddBeneficiario = {}
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

    $scope.submit = function() {
    //console.log('teste');
    //console.log(formData);
    $scope.matricula = $rootScope.lastRequest.result;
    

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $rootScope.cache.routeParams.beneficiarios = $scope.beneficiarios;


    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : $rootScope.cache.routeParams, "login" : { "u":userInfo.u, "s":userInfo.s  } }
      ).then(function(resp) {
        
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.cache.simulaRMV = resp.data.result;
            $rootScope.cache.simulaRmvSp = resp.data.result;
            $state.go($rootScope.cache.routeToBeneficiarios);
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

.controller('SimulacaoRendaMensalVitaliciaCtrl.resultado', ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
  $scope.showChild = false
  $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios;
  // $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios;
  // $scope.beneficiarios = $scope.formData.beneficiarios;
  $scope.map = map;
  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
  
  $scope.value = $rootScope.cache.simulaRMV;

  $scope.texto_simulacao_renda_mensal_vitalicia = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_rmv;
  $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;

  if (typeof $rootScope.cache.formToBeneficiarios != 'undefined'){
    $scope.formData = $rootScope.cache.formToBeneficiarios;
  }

  // $scope.beneficiarios = $scope.beneficiarios;
  console.log('scope: ');
  console.log($scope);
  console.log('rootScope: ');
  console.log($rootScope);

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

  //depois de listar (ou não) os beneficiários, "resetar as configs de beneficários"
  $rootScope.resetBeneficiarios = true;

}])

/**
***
***  Simulação Saque Programado 1.2
***
**/
.controller('SimulacaoSaqueProgramadoCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  
  $scope.formData = new Object();
  
  if ('lastFormDataSP' in $rootScope.cache){
    $scope.formData = $rootScope.cache.lastFormDataSP;
  }
  
  //se existe lastForm 
  if (typeof $rootScope.cache.lastFormDataSP != 'undefined') {

    //se mes ano ta preenchido
    if(typeof $rootScope.cache.lastFormDataSP.mes_ano != 'undefined') {
      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
    }

    if(typeof $rootScope.cache.lastFormDataSP.idade != 'undefined') {
      $scope.formData.mes_ano = '';
    }
  }

  $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
  $scope.years = new Array(); for (var year = 20; year <= 120; year++){
    $scope.years.push(year);
  }
  $scope.formData.dependentes_ir = $rootScope.lastRequest.result.simuladorBeneficios[0].dependentes_para_fins_ir;
  $scope.contribuicao_participante = $rootScope.lastRequest.result.informacoesParticipante[0].contribuicao_participante;
  $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao;
  $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;
  $scope.submit = function(formData) {
    $scope.matricula = $rootScope.lastRequest.result;
    $rootScope.cache.lastFormDataSP = formData;
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    
    if (typeof(formData.mes_ano) == 'undefined') { formData.mes_ano = ''; }

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
          'mes_ano': formData.mes_ano,
          'salario_participante': $scope.matricula.informacoesParticipante[0].salario_participante,
          'cresc_real_sal': formData.cresc_real_sal,
          'contribuicao_participante': formData.contribuicao_participante,
          'antecipacao_beneficio': formData.antecipacao_beneficio,
          'aporte': formData.aporte,
          'dependentes_ir': formData.dependentes_ir,
          'estimativa_rent_entre': formData.estimativa_rent_entre,
          'estimativa_rent_apos': formData.estimativa_rent_apos,
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

.controller('SimulacaoSaqueProgramadoCtrl.resultado', ['$scope', '$state', '$http', '$rootScope','$ionicLoading', function($scope, $state, $http, $rootScope, $ionicLoading) {

  $scope.formData = new Object();
  console.log($rootScope);
  if (typeof($rootScope.cache.lastFormDataSP) != 'undefined'){
    $scope.formData = $rootScope.cache.lastFormDataSP;
  }
  $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
  $scope.years = new Array(); for (var year = 20; year <= 120; year++){
    $scope.years.push(year);
  }
  $scope.value = $rootScope.lastRequest.result.simulaSP;

  $scope.texto_simulacao_saque_programado = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_saque_prog;
  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;

  
  $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;

  $scope.submit = function(formData) {

    $scope.matricula = $rootScope.lastRequest.result;
    $rootScope.cache.lastFormDataSP = formData;
    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    if (typeof(formData.mes_ano) == 'undefined') { formData.mes_ano = ''; }

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
          'mes_ano': formData.mes_ano,
          'salario_participante': $scope.matricula.informacoesParticipante[0].salario_participante,
          'cresc_real_sal': formData.cresc_real_sal,
          'contribuicao_participante': formData.contribuicao_participante,
          'antecipacao_beneficio': formData.antecipacao_beneficio,
          'aporte': formData.aporte,
          'dependentes_ir': formData.dependentes_ir,
          'estimativa_rent_entre': formData.estimativa_rent_entre,
          'estimativa_rent_apos': formData.estimativa_rent_apos,
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
            $rootScope.lastRequest.result.simulaSP = resp.data.result;
            $state.reload();
            //$state.go('simulacaosaqueprogramadoresultado');
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

/**
***
***  Simulação RMV + Saque Programado 1.3
***
**/
.controller('SimulacaoRmvSaqueProgramadoCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {

  $scope.formData = {};

  // if (typeof($rootScope.cache.formSimulaRMVSP) != 'undefined'){
  //   $scope.formData = $rootScope.cache.formSimulaRMVSP;
  // }

  $scope.formData.dependentes_ir = $rootScope.lastRequest.result.simuladorBeneficios[0].dependentes_para_fins_ir;
  $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
  $scope.years = new Array(); for (var year = 20; year <= 120; year++){
    $scope.years.push(year);
  }
  $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;
  $scope.contribuicao_participante = $rootScope.lastRequest.result.informacoesParticipante[0].contribuicao_participante;
  $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao;
  
  // $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
  // $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
  // delete $scope.tipoReajuste.DEFAULT;

  $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
  //pega o valor default
  $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0];

  //remove default do tipo de reajuste
  delete $scope.tipoReajuste.DEFAULT;

  //seta o valor do form como o default do ws.
  $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT;

console.log('default do tipo_reajuste: ');
console.log($scope.formData.tipo_reajuste);  
  
  //se existe lastForm 
  if (typeof $rootScope.cache.formSimulaRMVSP != 'undefined') {

    //se mes ano ta preenchido
    if(typeof $rootScope.cache.formSimulaRMVSP.mes_ano != 'undefined') {
      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
    }

    if(typeof $rootScope.cache.formSimulaRMVSP.idade != 'undefined') {
      $scope.formData.mes_ano = '';
    }
  }
  
  $scope.goBeneficiarios = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $rootScope.cache.formToBeneficiarios = {}
    $rootScope.cache.formToBeneficiarios = formData;
    $rootScope.cache.routeToBeneficiarios = "simulacaormvsaqueprogramadoresultado";
    $rootScope.cache.routeParams = $scope.getParams(formData);
    $state.go('simulacaorendamensalvitaliciabeneficiarios');

  }
  $scope.getParams = function(formData) {
    
    if (typeof(formData.mes_ano) == 'undefined') { formData.mes_ano = ''; }

    return { 
          'acao':'simulaRmvSp',
          'cod_fundo': $rootScope.lastRequest.result.dadosCadastrais[0].cod_fundo,
          'cod_patrocinadora': $rootScope.lastRequest.result.dadosCadastrais[0].cod_patrocinadora,
          'matricula': $rootScope.lastRequest.result.informacoesParticipante[0].matricula,
          'cod_plano': $rootScope.lastRequest.result.dadosCadastrais[0].cod_plano,
          'admissao_patroc': $rootScope.lastRequest.result.dadosCadastrais[0].admissao_patroc,
          'data_nascimento': $rootScope.lastRequest.result.dadosCadastrais[0].data_nascimento,
          'sexo': $rootScope.lastRequest.result.dadosCadastrais[0].sexo,
          'tipo_reajuste': formData.tipo_reajuste,
          'salario_participante': $rootScope.lastRequest.result.informacoesParticipante[0].salario_participante,
          'cresc_real_sal': formData.cresc_real_sal,
          'contribuicao_participante': formData.contribuicao_participante,
          'pensao': formData.pensao,
          'antecipacao_beneficio': formData.antecipacao_beneficio,
          'aporte': formData.aporte,
          'estimativa_rent_entre': formData.estimativa_rent_entre,
          'estimativa_rent_apos': formData.estimativa_rent_apos,
          'renda_mensal': formData.renda_mensal,
          'abono_anual': formData.abono_anual,
          'saque_programado': formData.saque_programado,
          'renda_mensal_vitalicia': formData.renda_mensal_vitalicia,
          'abono_anual': formData.abono_anual,
          'dependentes_ir': formData.dependentes_ir,
          'data_elegibilidade_prevista':  $scope.data_elegibilidade_prevista,
          'idade': formData.idade,
          'mes_ano': formData.mes_ano,
          'beneficiario': $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios
      }

  }

  $scope.submit = function(formData) {

    $rootScope.cache.formToBeneficiarios = {}
    $rootScope.cache.formToBeneficiarios = formData;
    $rootScope.cache.routeParams = {}
    $rootScope.cache.routeParams.beneficiarios = $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios;

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $rootScope.cache.formSimulaRMVSP = formData;

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : $scope.getParams(formData), "login" : { "u":userInfo.u, "s":userInfo.s  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;

        $ionicLoading.hide();

        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.cache.simulaRmvSp = resp.data.result;
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

.controller('SimulacaoRmvSaqueProgramadoCtrl.resultado', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
    $scope.showChild = false;

    $scope.formData = {};
    if (typeof($rootScope.cache.formSimulaRMVSP) != 'undefined'){
      $scope.formData = $rootScope.cache.formSimulaRMVSP;
    } else if (typeof($rootScope.cache.formToBeneficiarios) != 'undefined'){
      $scope.formData = $rootScope.cache.formToBeneficiarios;
    }
    $scope.data_elegibilidade_prevista = $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista;
    $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios;
    
    console.log($scope);
    console.log($rootScope);


    $scope.map = map;
    $scope.value = $rootScope.cache.simulaRmvSp;
    $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
    $scope.texto_simulacao_rmv_saque = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_hibrido;

    console.log($rootScope);
    console.log($scope);

    $scope.toggleChild = function(key) {
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
     $scope.getParams = function(formData) {
    
    if (typeof(formData.mes_ano) == 'undefined') { formData.mes_ano = ''; }

    return { 
          'acao':'simulaRmvSp',
          'cod_fundo': $rootScope.lastRequest.result.dadosCadastrais[0].cod_fundo,
          'cod_patrocinadora': $rootScope.lastRequest.result.dadosCadastrais[0].cod_patrocinadora,
          'matricula': $rootScope.lastRequest.result.informacoesParticipante[0].matricula,
          'cod_plano': $rootScope.lastRequest.result.dadosCadastrais[0].cod_plano,
          'admissao_patroc': $rootScope.lastRequest.result.dadosCadastrais[0].admissao_patroc,
          'data_nascimento': $rootScope.lastRequest.result.dadosCadastrais[0].data_nascimento,
          'sexo': $rootScope.lastRequest.result.dadosCadastrais[0].sexo,
          'tipo_reajuste': formData.tipo_reajuste,
          'salario_participante': $rootScope.lastRequest.result.informacoesParticipante[0].salario_participante,
          'cresc_real_sal': formData.cresc_real_sal,
          'contribuicao_participante': formData.contribuicao_participante,
          'pensao': formData.pensao,
          'antecipacao_beneficio': formData.antecipacao_beneficio,
          'aporte': formData.aporte,
          'estimativa_rent_entre': formData.estimativa_rent_entre,
          'estimativa_rent_apos': formData.estimativa_rent_apos,
          'renda_mensal': formData.renda_mensal,
          'abono_anual': formData.abono_anual,
          'saque_programado': formData.saque_programado,
          'renda_mensal_vitalicia': formData.renda_mensal_vitalicia,
          'abono_anual': formData.abono_anual,
          'dependentes_ir': formData.dependentes_ir,
          'data_elegibilidade_prevista':  $scope.data_elegibilidade_prevista,
          'idade': formData.idade,
          'mes_ano': formData.mes_ano,
          'beneficiario': $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios
      }

  }
    $scope.submit = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $scope.matricula = $rootScope.lastRequest.result;
    //console.log($scope.matricula);

    $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : $scope.getParams(formData), "login" : { "u":userInfo.u, "s":userInfo.s  } }
      ).then(function(resp) {
        
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
            $rootScope.cache.formSimulaRMVSP = $scope.formData;
            $rootScope.cache.formToBeneficiarios = $scope.formData;
            $rootScope.cache.simulaRmvSp = resp.data.result;
            $state.reload();
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


  //depois de listar (ou não) os beneficiários, "resetar as configs de beneficários"
  $rootScope.resetBeneficiarios = true;

}])

.controller('AlteracaoPercentualRetiradaCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {

  console.log($rootScope.lastRequest.result);
  $scope.formData = {};
  $scope.formData.dependentes_ir = $rootScope.lastRequest.result.simuladorBeneficios[0].dependentes_para_fins_ir;
  $scope.formData.percentual_renda_mensal = $rootScope.lastRequest.result.simuladorBeneficios[0].percentual_saque.replace(/,/g, '.'); 

  $scope.matricula = $rootScope.lastRequest.result;
  $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao;
  if ('lastFormAlteracaoRVM' in $rootScope.cache) {
    $scope.formData = $rootScope.cache.lastFormAlteracaoRVM;
  }

  $scope.submit = function(formData) {

    $rootScope.cache.lastFormAlteracaoRVM = {}
    $rootScope.cache.lastFormAlteracaoRVM = formData;

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

  console.log($scope.value);

  $scope.matricula = $rootScope.lastRequest.result;
  $scope.value.texto_alteracao_percentual_retirada = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_benf_saque;

  if ('lastFormAlteracaoRVM' in $rootScope.cache) {
    $scope.formData = $rootScope.cache.lastFormAlteracaoRVM;
  }

  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;

  $scope.submit = function(formData) {

    $rootScope.cache.lastFormAlteracaoRVM = {}
    $rootScope.cache.lastFormAlteracaoRVM = formData;

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
            $state.reload();
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
     $scope.formData = {};
  $scope.matricula = $rootScope.lastRequest.result;
  $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao;
  
  // $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
  // $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
  // delete $scope.tipoReajuste.DEFAULT;

  $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
  //pega o valor default
  $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0];

  //remove default do tipo de reajuste
  delete $scope.tipoReajuste.DEFAULT;

  //seta o valor do form como o default do ws.
  $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT;

// console.log('default do tipo_reajuste: ');
// console.log($scope.formData.tipo_reajuste);  
  
  //se existe lastForm 
  if (typeof $rootScope.cache.lastFormAposentadoRVM != 'undefined') {

    //se mes ano ta preenchido
    if(typeof $rootScope.cache.lastFormAposentadoRVM.mes_ano != 'undefined') {
      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
    }

    if(typeof $rootScope.cache.lastFormAposentadoRVM.idade != 'undefined') {
      $scope.formData.mes_ano = '';
    }
  }

  $scope.formData.dependentes_ir = $rootScope.lastRequest.result.simuladorBeneficios[0].dependentes_para_fins_ir;
  
  // if ('lastFormAposentadoRVM' in $rootScope.cache) {
  //   $scope.formData = $rootScope.cache.lastFormAposentadoRVM;
  // }
  $scope.goBeneficiarios = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $rootScope.cache.formToBeneficiarios = {}
    $rootScope.cache.formToBeneficiarios = formData;
    $rootScope.cache.routeToBeneficiarios = "simulacaormvaposentadoresultado";
    $rootScope.cache.routeParams = $scope.getParams(formData);
    $state.go('simulacaorendamensalvitaliciabeneficiarios');

  }
  $scope.getParams = function(formData) {
    
    if (typeof(formData.mes_ano) == 'undefined') { formData.mes_ano = ''; }

    return { 
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

      }
    }
  $scope.submit = function(formData) {

    $rootScope.cache.formToBeneficiarios = {}
    $rootScope.cache.formToBeneficiarios = formData;
    $rootScope.cache.lastFormAposentadoRVM = {}
    $rootScope.cache.lastFormAposentadoRVM = formData;

    $http.post(url_base+';jsessionid='+userInfo.s, 
      { "param" : $scope.getParams(formData), "login" : { "u":userInfo.u, "s":userInfo.s  } }
    ).then(function(resp) {
       userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $rootScope.errorMsg = resp.data.msg; 
        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
          } else {
            $rootScope.cache.routeParams = $scope.getParams(formData);
            $rootScope.cache.routeParams.beneficiarios = $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios;

            $rootScope.cache.simulaRMV = resp.data.result;
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
  
  console.log($rootScope);
  console.log($scope);
 
  if (typeof($rootScope.cache.simulaRMV) != 'undefined'){
    $scope.value = $rootScope.cache.simulaRMV;
  }
  if (typeof($rootScope.cache.simulaRMV) != 'undefined'){
    $scope.value = $rootScope.cache.simulaRMV;
  }
   $scope.value.pensao = $rootScope.cache.formToBeneficiarios.pensao;
 
  $scope.map = map;
 
  $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios;
 
  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
  //add o texto de alyteracao rmv aposentado
  $scope.texto_alteracao_rmv_aposentado = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_rmv;

  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
  //console.log($scope.value.desc_opcao_tributaca);


  //depois de listar (ou não) os beneficiários, "resetar as configs de beneficários"
  $rootScope.resetBeneficiarios = true;
}])

.controller('AlteracaoRmvSaqueCtrl', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {

  $scope.formData = {};
  $scope.formData.dependentes_ir = $rootScope.lastRequest.result.simuladorBeneficios[0].dependentes_para_fins_ir;
  $scope.formData.renda_mensal = $rootScope.lastRequest.result.simuladorBeneficios[0].percentual_saque.replace(/,/g, '.'); 
  

  $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao;
  // if ($rootScope.cache.formRecalcular){
  //   $scope.formData = $rootScope.cache.formRecalcular;
  // }
  $scope.matricula = $rootScope.lastRequest.result;

  // $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
  // $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
  // delete $scope.tipoReajuste.DEFAULT;

    $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
  //pega o valor default
  $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0];

  //remove default do tipo de reajuste
  delete $scope.tipoReajuste.DEFAULT;

  //seta o valor do form como o default do ws.
  $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT;

// console.log('default do tipo_reajuste: ');
// console.log($scope.formData.tipo_reajuste);  
  
  //se existe lastForm 
  if (typeof $rootScope.cache.formRecalcular != 'undefined') {

    //se mes ano ta preenchido
    if(typeof $rootScope.cache.formRecalcular.mes_ano != 'undefined') {
      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo);
    }

    if(typeof $rootScope.cache.formRecalcular.idade != 'undefined') {
      $scope.formData.mes_ano = '';
    }
  }
  
  $scope.goBeneficiarios = function(formData) {
    //console.log('teste');
    //console.log(formData);
    $rootScope.cache.formToBeneficiarios = {}
    $rootScope.cache.formToBeneficiarios = formData;
    $rootScope.cache.routeToBeneficiarios = "alteracaormvsaqueresultado";
    $rootScope.cache.routeParams = $scope.getParams(formData);
    $state.go('simulacaorendamensalvitaliciabeneficiarios');

  }

  $scope.getParams = function(formData){
    return { 
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
      }
  }
  $scope.submit = function(formData) {
    // aqui tem.
    $rootScope.cache.formToBeneficiarios = {}
    $rootScope.cache.formToBeneficiarios = formData;
    $ionicLoading.show();
    $rootScope.cache.formRecalcular = formData;
    

    $http.post(url_base+';jsessionid='+userInfo.s, 
      { "param": $scope.getParams(formData) , "login" : { "u":userInfo.u, "s":userInfo.s  } }
    ).then(function(resp) {
      // nao tem formdata aqui ()aqui nao tem escopo. tem que pegar do $scope.
      userInfo.u = resp.data.login.u;
      userInfo.s = resp.data.login.s;

      $ionicLoading.hide();
      
      $rootScope.errorMsg = resp.data.msg;

      //inserir o percentual do saque no json
      resp.data.result.percentual_saque = formData.saque_programado;
      resp.data.result.percentual_rmv = formData.renda_mensal_vitalicia;
      

        if (!resp.data.success) { $rootScope.errorMsg = resp.data.msg; $state.go('signin'); } else {
          if (resp.data.msg.length > 0){
            $rootScope.errorMsg = resp.data.msg; 
          } else {
        $rootScope.cache.routeParams = $scope.getParams(formData);
        $rootScope.cache.routeParams.beneficiarios = $rootScope.lastRequest.result.simuladorBeneficios[0].beneficiarios;
        $rootScope.cache.simulaRmvSp = resp.data.result;
        $rootScope.lastRequest.result.simulaBeneficioRmvSp = resp.data.result;
        $state.go('alteracaormvsaqueresultado');
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
.controller('AlteracaoPerfilCtrl', ['$scope', '$state', '$rootScope',  '$http', '$ionicLoading', '$filter', '$ionicPopup', function($scope, $state, $rootScope, $http, $ionicLoading, $filter, $ionicPopup) {
  
  $scope.formData = {}
  $scope.tipos_emprestimo = $rootScope.lastRequest.result.simulacaoEmprestimo;
 
  $scope.buttonText = "- Selecione -";
  $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0].matricula;
  $rootScope.lastRequest.esmprestimoSimulacaoCampos = [];
  $scope.disableddates = [
  ]; 

  $scope.perfil_ano = "";
  $scope.perfil_mes = "";
  $scope.perfil_dia = "";

  //$scope.disableCalendar = false;
  //$scope.dataInicial = new Date(2020,0,1);

  //$scope.dataInicio = new Date(2020,0,1);
  //$scope.dataFim = new Date(2020,0,10);

  $scope.perfil = "C";
  $scope.bnf = "N";  

  $scope.mensagem_erro = "";
  $scope.sucesso = false;
  $scope.erro = false;
  $scope.mostraImg = false;

  $scope.dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0];

  $scope.vigencia_input = $scope.dadosCadastrais.vigencia_input; 
  $scope.data_opcao_input = $scope.dadosCadastrais.vigencia_input; 
   
 
  $scope.datePickerCallback = function (data){
    $scope.formData.data = $filter('date')(data, 'dd/MM/yyyy', false)
    $scope.buttonText = $scope.formData.data;
  }
  $scope.simulacao = $rootScope.lastRequest.result.simulacaoEmprestimo;


  $scope.submit = function(){

    
    $scope.informacoesParticipante = $rootScope.lastRequest.result.informacoesParticipante[0];
        $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });

    $scope.postData = {
      beneficio_resgate: $scope.bnf,
      cpf: userInfo.cpf,
      codigoFundo: $scope.dadosCadastrais.cod_fundo,
      codigoPatrocinadora: $scope.dadosCadastrais.cod_patrocinadora,
      numeroInscricao: $scope.dadosCadastrais.numero_inscricao,
      vigencia: $scope.vigencia_input,
      dataOpcao: $scope.data_opcao_input ,
      perfil: $scope.perfil,
      acao: "alteracaoPerfilInvestimento"

    }
    

     $http.post(url_base+';jsessionid='+userInfo.s, 
        { "param" : $scope.postData, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf":userInfo.cpf  } }
      ).then(function(resp) {
        userInfo.u = resp.data.login.u;
        userInfo.s = resp.data.login.s;
        $ionicLoading.hide();
        
          if (!resp.data.msg.length > 0){
            $scope.sucesso = true; 
          
          } else {
            $scope.erro = true; 
            $scope.mensagem_erro = resp.data.msg;
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

.controller('AlteracaoRmvSaqueCtrl.resultado', ['$scope', '$state', '$rootScope', '$http', '$ionicLoading', function($scope, $state, $rootScope, $http, $ionicLoading) {
  $scope.matricula = $rootScope.lastRequest.result;
  
  if (typeof($rootScope.cache.routeParams) != 'undefined'){
    $scope.formData = $rootScope.cache.routeParams;
    $scope.value = $rootScope.cache.simulaRmvSp
    $scope.value.pensao = $rootScope.cache.routeParams.pensao;
  }

  console.log($scope);
  console.log($rootScope);
  $scope.map = map;

  $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios;
  //$scope.value = $rootScope.lastRequest.result.simulaBeneficioRmvSp;
  $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao;
  $scope.texto_alteracao_rmv_saque = $rootScope.lastRequest.result.simuladorBeneficios[0].desc_texto_alteracao_hibrido;



  $scope.submit = function(formData) {

    $ionicLoading.show();
    $rootScope.cache.formToBeneficiarios = formData;

    $http.post(url_base+';jsessionid='+userInfo.s, 
      { "param" : { 
        'acao':'simulaBeneficioRmvSp',
        'cod_fundo': $scope.matricula.dadosCadastrais[0].cod_fundo,
        'cod_patrocinadora': $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
        'matricula': $scope.matricula.informacoesParticipante[0].matricula,
        'cod_plano': $scope.matricula.dadosCadastrais[0].cod_plano,
        'data_nascimento': $scope.matricula.dadosCadastrais[0].data_nascimento,
        'tipo_reajuste': $rootScope.cache.formRecalcular.tipo_reajuste,
        'renda_mensal': $rootScope.cache.formRecalcular.renda_mensal,
        'percentual_rmv': $rootScope.cache.formRecalcular.renda_mensal_vitalicia,
        'percentual_saque': $rootScope.cache.formRecalcular.saque_programado,
        'estimativa_rent_apos': $scope.formData.estimativa_rent_apos,
        'pensao': $rootScope.cache.formRecalcular.pensao,
        'abono_anual': $rootScope.cache.formRecalcular.abono_anual,
        'dependentes_ir': $rootScope.cache.formRecalcular.dependentes_ir

      }, "login" : { "u":userInfo.u, "s":userInfo.s  } }
    ).then(function(resp) {
      userInfo.u = resp.data.login.u;
      userInfo.s = resp.data.login.s;

      //console.log(resp);
      //console.log($rootScope);

      $ionicLoading.hide();
      
      $rootScope.errorMsg = resp.data.msg;

      //inserir o percentual do saque no json
      resp.data.result.percentual_saque = $rootScope.cache.formRecalcular.saque_programado;
      resp.data.result.percentual_rmv = $rootScope.cache.formRecalcular.renda_mensal_vitalicia;
      
      if (!resp.data.success) {
        $state.go('signin');
      } else {
        $ionicLoading.hide();
        $rootScope.lastRequest.result.simulaBeneficioRmvSp = resp.data.result;
        $rootScope.cache.simulaRmvSp = resp.data.result;
        $state.reload();
      } 
      
      
   }, function(err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
   })
  }


  //depois de listar (ou não) os beneficiários, "resetar as configs de beneficários"
  $rootScope.resetBeneficiarios = true;
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
}])

.controller('PercentualContribuicaoCtrl', ['$scope', '$state', '$rootScope','$ionicLoading','$http','$ionicPopup', function($scope, $state, $rootScope,$ionicLoading, $http,$ionicPopup) {

  $scope.porcentagem_input = "";
  $scope.sucesso = false;
  $scope.erro = false;
  $ionicLoading.show();
  $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
        { "param" : { "acao": "percentualContribuicaoInfo","cpf": userInfo.cpf }, "login" : { "u":userInfo.u, "s":userInfo.s, "cpf": userInfo.cpf } }
      ).then(function(resp) {
       // userInfo.u = resp.data.login.u;
       // userInfo.s = resp.data.login.s;
        $ionicLoading.hide();       
        
          $scope.percentual_contribuicao = resp.data.result.percentual_contribuicao[0];
          $ionicLoading.hide();        
        

      }, function(err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
       title: 'Falha de conexão',
       template: timeoutMsg
     });
     });


  $scope.submit = function () {

    $ionicLoading.show();

    $http.post(url_base + ';jsessionid=' + $rootScope.lastRequest.login.s,
      { "param": { "acao": "calculaPercentualContribuicao", cpf: userInfo.cpf, percentual_contribuicao: $scope.porcentagem_input}, "login": { "u": userInfo.u, "s": userInfo.s, "cpf": userInfo.cpf } }
    ).then(function (resp) {
      $ionicLoading.hide();

      //$scope.adesao = resp.data.result;
      

      $scope.sucesso =  true;

      //execucao para pegar os dados da tela denovo
      $http.post(url_base + ';jsessionid=' + $rootScope.lastRequest.login.s,
        { "param": { "acao": "percentualContribuicaoInfo","cpf": userInfo.cpf }, "login": { "u": userInfo.u, "s": userInfo.s, "cpf": userInfo.cpf } }
      ).then(function (resp) {
        //userInfo.u = resp.data.login.u;
        //userInfo.s = resp.data.login.s;
        //$ionicLoading.hide();
        

        $scope.percentual_contribuicao = resp.data.result.percentual_contribuicao[0];
        $ionicLoading.hide();     
        

      }, function (err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Falha de conexão',
          template: timeoutMsg
        });
      });


    }, function (err) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Falha de conexão',
        template: timeoutMsg
      });
    });
  }
}])

.controller('PreferenciasCtrl', [
  '$scope',
  '$state',
  '$rootScope',
  '$http',
  '$ionicPopup',
  '$ionicLoading',
  function (scope, state, rootScope, http, ionicPopup, ionicLoading) {
    scope.settingsList = []

    if (window.plugins) {
      console.log("ALO ALO")
      window.plugins.touchid.has("MyKey", 
        function() {
          window.localStorage.setItem("touchidLocal", true)

          var toggle = {
            text: 'Habilitar Biometria',
            checked: true,
            action: function () {
              var checked = toggle.checked
              var touchId = checked ? 'SIM' : 'NAO'
            
      
              if (checked === true) {
                if (window.plugins) {
                  window.plugins.touchid.save("MyKey", "My Password", true, function() {
                      console.log("Password saved");
                  });
              }
              } else {
                if (window.plugins) {
                  window.plugins.touchid.delete("MyKey", function() {
                      console.log("Password key deleted");
                  });
              }
              }
      
              globalPopup = ionicPopup.alert({
                title: 'Sucesso',
                template:
                  '<p style="color: lightgreen">' +
                    'O login com biometria foi ' + (touchId === 'SIM' ? 'ativado' : 'desativado') + '.' +
                  '</p>', // prettier-ignore
              })       
            }
          }
          scope.settingsList.push(toggle)
        }, 
        function() {
          window.localStorage.setItem("touchidLocal", false)
          console.log("tem chave de biometria, mas sem senha.")

          var toggle = {
            text: 'Habilitar Biometria',
            checked: false,
            action: function () {
              var checked = toggle.checked
              var touchId = checked ? 'SIM' : 'NAO'
            
      
              if (checked === true) {
                if (window.plugins) {
                  window.plugins.touchid.save("MyKey", "My Password", true, function() {
                      console.log("Password saved");
                  });
              }
              } else {
                if (window.plugins) {
                  window.plugins.touchid.delete("MyKey", function() {
                      console.log("Password key deleted");
                  });
              }
              }
      
              globalPopup = ionicPopup.alert({
                title: 'Sucesso',
                template:
                  '<p style="color: lightgreen">' +
                    'O login com biometria foi ' + (touchId === 'SIM' ? 'ativado' : 'desativado') + '.' +
                  '</p>', // prettier-ignore
              })       
            }
          }
          scope.settingsList.push(toggle)
        });
    }

    
    
  }
]);


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