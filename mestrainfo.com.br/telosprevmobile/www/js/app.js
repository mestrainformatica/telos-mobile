// window.alert = function (txt) {
//    navigator.notification.alert(txt, null, "Aviso", "Fechar");
// }
// window.onerror = function (errorMsg, url, lineNumber) {
//      alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
// }
  var app = angular.module('starter', [
    'ionic',
    'ngCordova',
    'starter.controller',
    'starter.services',
    'ionic-datepicker'
  ])
  .run(function($ionicPlatform, $state, $timeout) {
    
    $ionicPlatform.onHardwareBackButton(function () {
        if ($state.is('signin')) { // here to check whether the home page, if yes, exit the application
          navigator.app.exitApp();
        } else {
          return;
        }
    })

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      
      if (window.StatusBar) {
          if (ionic.Platform.isAndroid()) {
            StatusBar.backgroundColorByHexString("#0080a5");
            $cordovaStatusbar.styleHex('#0080a5') //azul mestra
          } else {
            console.log(StatusBar);
            StatusBar.overlaysWebView(false);
            StatusBar.styleBlackTranslucent();
            StatusBar.backgroundColorByHexString("#0080a5");
          }
        }
      
    });

     document.addEventListener("deviceReady", function () {
        document.addEventListener("resume", function () {
            $timeout(function () {
                
                $ionicLoading.show({ content: 'Carregando', animation: 'fade-in', showBackdrop: true, maxWidth: 300, showDelay: 0 });
                $http.post(url_base+';jsessionid='+$rootScope.lastRequest.login.s, 
                { "param" : { "acao": "logout" }, "login" : { "u":userInfo.u, "s":userInfo.s } })
                .then(
                    function(resp) {
                        stageMap = {}
                        logged = false;
                        userInfo = new Object();
                        $rootScope.lastRequest = {}
                        $ionicLoading.hide();
                        
                        $state.go('signin');
                      }, 
                    function(err) {
                      $ionicLoading.hide();
                      $state.go('signin');
                    }
                )
            }, 0);
        }, false);
    })

  })
  .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ])

  .config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){

      $ionicConfigProvider.views.swipeBackEnabled(false);

  })


  // Menu do aplicativo
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('dadoscadastrais', {
      cache: false,
      url: '/dados',
      templateUrl: "templates/dadoscadastrais.html"
    })

    .state('dadoscadastrais-form', {
      cache: false,
      url: '/dados-form',
      templateUrl: "templates/dadoscadastrais-form.html"   
    })

    .state('extrato', {
      cache: false,
      url: '/extrato',
      templateUrl: "templates/extrato.html"   
    })

    .state('extratoemitido', {
      cache: false,
      url: '/extrato-emitido',
      templateUrl: "templates/extrato-emitido.html"   
    })

    .state('saldo', {
      cache: false,
      url: '/saldo',
      templateUrl: "templates/saldo.html"   
    })

    .state('saldoemitido', {
      cache: false,
      url: '/saldo-emitido',
      templateUrl: "templates/saldo-emitido.html"   
    })

    .state('demonstrativo', {
      cache: false,
      url: '/demonstrativo',
      templateUrl: "templates/demonstrativo.html"    
    })

    .state('demonstrativoemitido', {
      cache: false, 
      url: '/demonstrativo-emitido',
      templateUrl: "templates/demonstrativo-emitido.html"    
    })

    .state('emprestimoconsulta', {
      cache: false,
      url: '/emprestimo-consulta',
      templateUrl: "templates/emprestimo-consulta.html"    
    })

    .state('emprestimosimulacao', {
      cache: false,
      url: '/emprestimo-simulacao',
      templateUrl: "templates/emprestimo-simulacao.html"    
    })

    .state('emprestimosimulacaocampos', {
      cache: false,
      url: '/emprestimo-simulacao-campos',
      templateUrl: "templates/emprestimo-simulacao-campos.html"    
    })

    .state('emprestimosimulacaocamposemitido', {
      cache: false,
      url: '/emprestimo-simulacao-campos-emitido',
      templateUrl: "templates/emprestimo-simulacao-campos-emitido.html"    
    })

    .state('faleconosco', {
      cache: false,
      url: '/fale-conosco',
      templateUrl: "templates/faleconosco.html"    
    })
    
    .state('contatoform', {
      cache: false,
      url: '/contato-form',
      templateUrl: "templates/contato-form.html"    
    })

    .state('simulacaoResgate', {
      cache: false,
      url: '/simulacao-resgate',
      templateUrl: "templates/simulacao-resgate.html"    
    })

    .state('splitmatriculas', {
      cache: false,
      url: '/split-matriculas',
      templateUrl: "templates/split-matriculas.html"    
    })

    .state('termosdeuso', {
      cache: false,
      url: '/termos-de-uso',
      templateUrl: "templates/termos-de-uso.html"    
    })

    .state('termodeuso', {
      cache: false,
      url: '/termo-de-uso',
      templateUrl: "templates/termo-de-uso.html"    
    })

    .state('signin', {
      cache: false,
      url: '/sign-in',
      templateUrl: "templates/sign-in.html",
    })

    .state('menu', {
      cache: false,
      url: "/menu",
      templateUrl: "templates/menu.html",
      controller: function($scope){
      }
    })

    $urlRouterProvider.otherwise('/sign-in');
    
  })


