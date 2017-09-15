
window.app = window.angular
  .module('TelosApp', [
    'ionic',
    'ngCordova',
    'starter.controller',
    'starter.services',
    'ui.utils.masks',
    'ionic-datepicker'
  ])
  .run([
    '$state',
    '$rootScope',
    '$timeout',
    '$http',
    '$ionicLoading',
    '$ionicPlatform',
    function ($state, $rootScope, $timeout, $http, $ionicLoading, $ionicPlatform) {
      $ionicPlatform.onHardwareBackButton(function () {
        if ($state.is('signin')) {
          // here to check whether the home page, if yes, exit the application
          navigator.app.exitApp()
        } else {
        }
      })

      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false)
          // verificar se é melhor true ou false.
          window.cordova.plugins.Keyboard.disableScroll(false)
        }

        if (window.StatusBar) {
          if (window.ionic.Platform.isIOS()) {
            window.StatusBar.overlaysWebView(false)
            window.StatusBar.styleBlackTranslucent()
          }

          window.StatusBar.backgroundColorByHexString('#0080a5')
        }
      })

      document.addEventListener('deviceReady', function () {
        console.log('TESTE IONIC DEVICE READY')
        document.addEventListener(
          'resume',
          function () {
            $timeout(function () {
              $ionicLoading.show({
                content: 'Carregando',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 300,
                showDelay: 0
              })
              $http.post(
                window.urlBase + ';jsessionid=' + $rootScope.lastRequest.login.s,
                {
                  param: { acao: 'logout' },
                  login: { u: window.userInfo.u, s: window.userInfo.s }
                })
                .then(function () {
                  window.stageMap = {}
                  window.logged = false
                  window.userInfo = {}
                  $rootScope.lastRequest = {}
                  $ionicLoading.hide()

                  $state.go('signin')
                })
                .catch(function (err) {
                  console.error(err)
                  $ionicLoading.hide()
                  $state.go('signin')
                })
            }, 0)
          },
          false
        )
      })
    }
  ])
  .config([
    '$httpProvider',
    function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true
      delete $httpProvider.defaults.headers.common['X-Requested-With']
    }
  ])
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.swipeBackEnabled(false)
  })
  // Menu do aplicativo
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dadoscadastrais', {
        cache: false,
        url: '/dados',
        templateUrl: 'templates/dadoscadastrais.html'
      })
      .state('dadoscadastrais-form', {
        cache: false,
        url: '/dados-form',
        templateUrl: 'templates/dadoscadastrais-form.html'
      })
      .state('extrato', {
        cache: false,
        url: '/extrato',
        templateUrl: 'templates/extrato.html'
      })
      .state('extratoemitido', {
        cache: false,
        url: '/extrato-emitido',
        templateUrl: 'templates/extrato-emitido.html'
      })
      .state('saldo', {
        cache: false,
        url: '/saldo',
        templateUrl: 'templates/saldo.html'
      })
      .state('saldoemitido', {
        cache: false,
        url: '/saldo-emitido',
        templateUrl: 'templates/saldo-emitido.html'
      })
      .state('demonstrativo', {
        cache: false,
        url: '/demonstrativo',
        templateUrl: 'templates/demonstrativo.html'
      })
      .state('demonstrativoemitido', {
        cache: false,
        url: '/demonstrativo-emitido',
        templateUrl: 'templates/demonstrativo-emitido.html'
      })
      .state('emprestimoconsulta', {
        cache: false,
        url: '/emprestimo-consulta',
        templateUrl: 'templates/emprestimo-consulta.html'
      })
      .state('emprestimosimulacao', {
        cache: false,
        url: '/emprestimo-simulacao',
        templateUrl: 'templates/emprestimo-simulacao.html'
      })
      .state('emprestimosimulacaocampos', {
        cache: false,
        url: '/emprestimo-simulacao-campos',
        templateUrl: 'templates/emprestimo-simulacao-campos.html'
      })
      .state('emprestimosimulacaocamposemitido', {
        cache: false,
        url: '/emprestimo-simulacao-campos-emitido',
        templateUrl: 'templates/emprestimo-simulacao-campos-emitido.html'
      })
      .state('emprestimodocumentosconcessao', {
        cache: false,
        url: '/emprestimo-documentos-concessao',
        templateUrl: 'templates/documentos-concessao/emprestimo-documentos-concessao.html'
      })
      .state('emprestimodocumentosconcessaoaviso', {
        cache: false,
        url: '/emprestimo-documentos-concessao-aviso',
        templateUrl: 'templates/documentos-concessao/emprestimo-documentos-concessao-aviso.html'
        // params: ['docConcessao']
      })
      .state('faleconosco', {
        cache: false,
        url: '/fale-conosco',
        templateUrl: 'templates/faleconosco.html'
      })
      .state('contatoform', {
        cache: false,
        url: '/contato-form',
        templateUrl: 'templates/contato-form.html'
      })
      .state('simulacaoResgate', {
        cache: false,
        url: '/simulacao-resgate',
        templateUrl: 'templates/simulacao-resgate.html'
      })
      .state('splitmatriculas', {
        cache: false,
        url: '/split-matriculas',
        templateUrl: 'templates/split-matriculas.html'
      })
      .state('termosdeuso', {
        cache: false,
        url: '/termos-de-uso',
        templateUrl: 'templates/termos-de-uso.html'
      })
      .state('termodeuso', {
        cache: false,
        url: '/termo-de-uso',
        templateUrl: 'templates/termo-de-uso.html'
      })
      .state('signin', {
        cache: false,
        url: '/sign-in',
        templateUrl: 'templates/sign-in.html'
      })
      // MEUS STATES
      .state('simulacaorendamensalvitalicia', {
        cache: false,
        url: '/simulacao-renda-mensal-vitalicia',
        templateUrl: 'templates/simulacao-ativo/simulacao-rmv.html'
      })
      .state('simulacaorendamensalvitaliciabeneficiarios', {
        cache: false,
        url: '/simulacao-renda-mensal-vitalicia-beneficiarios',
        templateUrl:
          'templates/simulacao-ativo/simulacao-rmv-beneficiarios.html'
      })
      .state('simulacaorendamensalvitaliciaresultado', {
        cache: false,
        url: '/simulacao-renda-mensal-vitalicia-resultado',
        templateUrl: 'templates/simulacao-ativo/simulacao-rmv-resultado.html'
      })
      .state('simulacaosaqueprogramado', {
        cache: false,
        url: '/simulacao-saque-programado',
        templateUrl: 'templates/simulacao-ativo/simulacao-sp.html'
      })
      .state('simulacaosaqueprogramadoresultado', {
        cache: false,
        url: '/simulacao-saque-programado-resultado',
        templateUrl: 'templates/simulacao-ativo/simulacao-sp-resultado.html'
      })
      .state('simulacaormvsaqueprogramado', {
        cache: false,
        url: '/simulacao-rmv-saque-programado',
        templateUrl: 'templates/simulacao-ativo/simulacao-rmvsp.html'
      })
      .state('simulacaormvsaqueprogramadoresultado', {
        cache: false,
        url: '/simulacao-rmv-saque-programado-resultado',
        templateUrl: 'templates/simulacao-ativo/simulacao-rmvsp-resultado.html'
      })
      .state('alteracaopercentualretirada', {
        cache: false,
        url: '/alteracao-percentual-retirada',
        templateUrl:
          'templates/simulacao-assistido/alteracao-percentual-retirada.html'
      })
      .state('alteracaopercentualretiradaresultado', {
        cache: false,
        url: '/alteracao-percentual-retirada-resultado',
        templateUrl:
          'templates/simulacao-assistido/alteracao-percentual-retirada-resultado.html'
      })
      .state('simulacaormvaposentado', {
        cache: false,
        url: '/simulacao-rmv-aposentado',
        templateUrl: 'templates/simulacao-assistido/simulacao-rmv.html'
      })
      .state('simulacaormvaposentadoresultado', {
        cache: false,
        url: '/simulacao-rmv-aposentado-resultado',
        templateUrl:
          'templates/simulacao-assistido/simulacao-rmv-resultado.html'
      })
      .state('alteracaormvsaque', {
        cache: false,
        url: '/alteracao-rmv-saque',
        templateUrl:
          'templates/simulacao-assistido/alteracao-beneficio-rmv-saque.html'
      })
      .state('alteracaormvsaqueresultado', {
        cache: false,
        url: '/alteracao-rmv-saque-resultado',
        templateUrl:
          'templates/simulacao-assistido/alteracao-beneficio-rmv-saque-resultado.html'
      })
      .state('simulacaoresgatenovo', {
        cache: false,
        url: '/simulacao-resgate-novo',
        templateUrl: 'templates/simulacao-resgate-novo.html'
      })
      .state('saldocontas', {
        cache: false,
        url: '/saldo-contas',
        templateUrl: 'templates/saldo-contas.html'
      })
      // END MEUS STATES
      .state('menu', {
        cache: false,
        url: '/menu',
        templateUrl: 'templates/menu.html',
        controller: function ($scope) {}
      })

    $urlRouterProvider.otherwise('/sign-in')
  })

window.ionic.Platform.ready(function () {
  window.angular.bootstrap(document, ['TelosApp'])
}, false)
