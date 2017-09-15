'use strict'

// var urlBase = 'http://www.fundacaotelos.com.br:8989/prevmobile-ws/rest/acesso/padrao';
// var urlBase = 'https://telosmobile.fundacaotelos.com.br/prevmobile-ws/rest/acesso/padrao'
// var urlBase = 'http://telosmobile.fundacaotelos.com.br:8989/prevmobile-ws/rest/acesso/padrao'
// var urlBase = 'http://192.100.100.253:8181/prevmobile-ws/rest/acesso/padrao';
var urlBase = 'http://www.sysprev.com.br/prevmobile-ws/rest/acesso/padrao'
var inspect = window.inspect
var angular = window.angular
var cordova = window.cordova
var stageMap = {}
var logged = false
var userInfo = {}
var timeoutMsg = 'Rede indisponível'
var map = {
  vinculo: {
    V: 'Vitalício',
    I: 'Indicado',
    T: 'Temporário'
  },
  sexo: {
    M: 'Masculino',
    F: 'Feminino'
  },
  parentesco: [
    '',
    'Cônjuge',
    'Ex-Cônjuge',
    'Companheiro(a)',
    'Ex-Companheiro(a)',
    'Pai ou Mãe',
    'Designado',
    'Filho(a)',
    'Enteado(a)',
    'Irmão ou Irmã',
    'Menor sob Guarda',
    'Sogro(a)',
    'Filho > 24 anos'
  ]
}

// var toGuid = function (str) {
//   return str.replace(/[^a-z0-9]+/gi, '-').replace(/^-*|-*$/g, '').toLowerCase()
// }

var defaultErrorMessage = 'Erro ao conectar com o servidor. Tente novamente mais tarde'
function checkIfServerAnswerIsValid (resp) {
  console.log(inspect(resp))
  if (!(resp['data'] && resp['data']['success'] && !resp['data']['msg'] && resp['data']['result'])) {
    throw new Error((resp['data'] && resp['data']['msg']) || defaultErrorMessage)
  }
}

function uuid (n, r) {
  for (r = n = ''; n++ < 36; r += 51 * n & 52 ? (15 ^ n ? 8 ^ Math.random() * (20 ^ n ? 16 : 4) : 4).toString(16) : '') {} // prettier-ignore
  return r
}

function retrieve (resp, field, getFirst) {
  if (arguments.length < 3) getFirst = true

  if (!resp || !resp[field]) {
    throw new Error('Tentativa de acesso a um campo inválido: ' + field + ' em ' + inspect(resp))
  } else if (Array.isArray(resp[field])) {
    if (resp[field].length === 0) {
      throw new Error('Tentativa de acesso a um campo vazio: ' + field + ' em ' + inspect(resp))
    } else if (resp[field].length === 1 && getFirst) {
      return resp[field][0]
    }
  }

  return resp[field]
}

window.controller = angular
  .module('starter.controller', ['ionic', 'angular-datepicker', 'ngMask', 'ngSanitize'])
  .controller('topMenu', function ($scope, $ionicHistory, $rootScope) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      $scope.isNotHome = !(
        toState['name'] === 'menu' ||
        toState['name'] === 'termosdeuso' ||
        toState['name'] === 'splitmatriculas' ||
        toState['name'] === 'termodeuso'
      )
      if (toState['name'] !== 'signin') {
        $rootScope.errorMsg = false
      } else {
        $rootScope.loginPage = true
        $rootScope.bodyStyle = { 'background-color': '#dbdbdb' }
      }
    })
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (cordova && cordova.plugins.Keyboard) {
        // return to keyboard default scroll state
        cordova.plugins.Keyboard.disableScroll(false)
      }
      $scope.isNotHome = !(
        toState['name'] === 'menu' ||
        toState['name'] === 'termosdeuso' ||
        toState['name'] === 'splitmatriculas' ||
        toState['name'] === 'termodeuso'
      )
    })
    $rootScope.$on('$ionicView.afterEnter', function () {
      // Handle iOS-specific issue with jumpy viewport when interacting with input fields.
      if (cordova && cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.disableScroll(true)
      }
    })
    $rootScope.$on('$ionicView.beforeLeave', function () {
      if (cordova && cordova.plugins.Keyboard) {
        // return to keyboard default scroll state
        cordova.plugins.Keyboard.disableScroll(false)
      }
    })
  })
  .controller('Inicio', [
    '$scope',
    '$ionicLoading',
    function ($scope, $ionicLoading) {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      })
      $scope.abrirMenu = true
      $scope.$on('$stateChangeSuccess', function () {})
      $ionicLoading.hide()
    }
  ])
  .controller('initMenu', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      var matricula = $rootScope.lastRequest.result.informacoesParticipante[0].matricula
      var localTouchId = window.localStorage.getItem('touchId')
      var dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0]

      // Setup the loader
      if (!logged) {
        // $state.go('signin');
      } else {
        $scope.stageMap = stageMap
      }

      $scope.goDocConcessao = function (event) {
        var critica = $rootScope.lastRequest.result.documentosConcessao[0].critica_documento_concessao
        if (critica) {
          event.preventDefault()
          $ionicPopup.alert({
            title: 'Documentos de Concessão',
            template: critica
          })
        }
      }

      // TODO: Cadastro TouchID
      $scope.touchId = localTouchId || $rootScope.lastRequest.result.preferencias[0].touch_ID || 'NAO'
      console.log('TouchId State: ' + $scope.touchId)
      if (cordova && window.plugins.touchid && $scope.touchId === 'NAO') {
        console.log('TouchID Show Activation Popup')

        new Promise(function (resolve, reject) {
          window.plugins.touchid.isAvailable(function () {
            resolve(
              $ionicPopup.show({
                title: 'Você deseja ativar o login usando sua digital?',
                buttons: [
                  {
                    text: 'Não',
                    type: 'button-negative',
                    onTap: function () {
                      return false
                    }
                  },
                  {
                    text: '<b>Sim</b>',
                    type: 'button-positive',
                    onTap: function () {
                      return true
                    }
                  }
                ]
              })
            )
          }, reject)
        })
          .then(function (touchId) {
            $ionicLoading.show()
            $scope.touchId = touchId ? 'SIM' : 'NUNCA'

            if (!(localTouchId === null && touchId)) {
              return touchId
            }

            return $http
              .post(urlBase + ';jsessionid=' + userInfo.s, {
                param: {
                  acao: 'cadastrarTouchId',
                  fundo: dadosCadastrais.cod_fundo,
                  touch_ID: 'NAO',
                  matricula: matricula,
                  patrocinadora: dadosCadastrais.cod_patrocinadora
                },
                login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
              })
              .then(function (resp) {
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s
                checkIfServerAnswerIsValid(resp)
                return touchId
              })
          })
          .then(function (touchId) {
            // TODO: make request to server informing new TouchID setting
            return $http
              .post(urlBase + ';jsessionid=' + userInfo.s, {
                param: {
                  acao: 'cadastrarTouchId',
                  imei: (((window.device && window.device.uuid) || uuid()) + '').slice(0, 256),
                  fundo: dadosCadastrais.cod_fundo,
                  touch_ID: $scope.touchId,
                  matricula: matricula,
                  patrocinadora: dadosCadastrais.cod_patrocinadora
                },
                login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
              })
              .then(function (resp) {
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s
                checkIfServerAnswerIsValid(resp)

                if (!(touchId && window.plugins && window.plugins.touchid)) return

                // TODO: cadastrar KID no keychain do aparelho
                return new Promise(function (resolve, reject) {
                  window.plugins['touchid'].save(
                    'FingerPrintAuth_telosPrevMobile',
                    JSON.stringify({
                      k: retrieve(retrieve(retrieve(resp, 'data'), 'result'), 'k'),
                      cpf: userInfo.cpf
                    }),
                    false,
                    resolve,
                    reject
                  )
                })
              })
              .then(function () {
                window.localStorage.setItem('touchId', $scope.touchId)
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Sucesso',
                  template:
                    '<p style="color: lightgreen">O login com digital ' +
                    (touchId ? 'está ativo.' : 'foi desativado.') +
                    '</p>'
                })
              })
              .catch(function (err) {
                console.error(err.stack + '')
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Falha',
                  template: '<p style="color: lightcoral">Error ao ativar o login pela digital.</p>'
                })
              })
          })
          .catch(function (error) {
            console.error(inspect(error))
          })
      }

      $scope.logout = function () {
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })
        $http
          .post(urlBase + ';jsessionid=' + $rootScope.lastRequest.login.s, {
            param: { acao: 'logout' },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function () {
              stageMap = {}
              logged = false
              userInfo = {}
              $rootScope.cache = {}
              $rootScope.lastRequest = {}
              delete $rootScope.beneficiariosOriginal
              $ionicLoading.hide()

              $state.go('signin')
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('splitMatricula', [
    '$scope',
    '$state',
    '$http',
    '$rootScope',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $http, $rootScope, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = false
      $scope.matriculas = $rootScope.lastRequest.result.matriculas
      $scope.submitMatricula = function (item) {
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + $rootScope.lastRequest.login.s, {
            param: {
              cpf: userInfo.cpf,
              cod_fundo: $scope.matriculas[item].cod_fundo,
              cod_patrocinadora: $scope.matriculas[item].cod_patrocinadora,
              matricula: $scope.matriculas[item].matricula,
              acao: 'dados'
            },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              var k

              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              $ionicLoading.hide()
              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                // Se conseguiu conectar com o servidor
                $rootScope.lastRequest = resp.data
                logged = true
                for (k in resp.data.result['dadosView'][0]) {
                  if (!resp.data.result['dadosView'][0].hasOwnProperty(k)) continue
                  // Define quais telas serão mostradas para o usuário
                  stageMap[k] = resp.data.result['dadosView'][0][k]
                }

                if (typeof resp.data.result['termo_de_uso'] !== 'undefined') {
                  // Ainda não aceitou os termos de uso
                  $state.go('termosdeuso')
                } else if (typeof resp.data.result['dadosView'] !== 'undefined') {
                  // Ao definir as variáveis, vai pro menu principal
                  $state.go('menu')
                } else if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                }
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('signin', [
    '$scope',
    '$state',
    '$http',
    '$rootScope',
    '$timeout',
    '$ionicLoading',
    function ($scope, $state, $http, $rootScope, $timeout, $ionicLoading) {
      function loginPostAction (request, cpf) {
        return request
          .catch(function (error) {
            console.log(error.stack + '')
            throw new Error(defaultErrorMessage)
          })
          .then(function (resp) {
            var data, dados, result, dadosView

            $ionicLoading.hide()
            checkIfServerAnswerIsValid(resp)

            data = retrieve(resp, 'data')
            result = retrieve(data, 'result')

            window.localStorage.setItem('touchId', retrieve(retrieve(result, 'preferencias'), 'touch_ID'))

            if (result['simuladorBeneficios']) {
              retrieve(retrieve(result, 'simuladorBeneficios'), 'beneficiarios', false).forEach(function (beneficiario) {
                beneficiario.checked = true
                beneficiario.selecionado = 'S'
              })
            }

            logged = true
            userInfo.u = resp.data.login.u
            userInfo.s = resp.data.login.s
            userInfo.cpf = cpf
            $scope.formData = {}
            $rootScope.cache = {}
            $rootScope.lastRequest = data

            if (result['matriculas']) {
              // Possui mais de uma matrícula e ainda não escolheu qual será carregada
              $state.go('splitmatriculas')
            } else {
              dadosView = retrieve(result, 'dadosView')
              for (dados in dadosView) {
                if (dadosView.hasOwnProperty(dados)) {
                  // Define quais telas serão mostradas para o usuário
                  stageMap[dados] = dadosView[dados]
                }
              }

              if (result['termo_de_uso']) {
                // Ainda não aceitou os termos de uso
                $state.go('termosdeuso')
              }

              $state.go('menu')
            }
          })
          .catch(function (error) {
            $ionicLoading.hide()
            $rootScope.errorMsg = error.message + ''
          })
      }

      var touchId

      $scope.formData = {}
      $scope.loginWithTouchId = 0

      touchId = window.localStorage.getItem('touchId') || 'NAO'
      console.log('SignIn TouchId State: ' + touchId)

      // Login TouchID
      if (window.plugins && window.plugins.touchid && touchId === 'SIM') {
        console.log('TouchID Enabled')

        new Promise(function (resolve, reject) {
          window.plugins.touchid.has(
            'FingerPrintAuth_telosPrevMobile',
            function () {
              window.plugins.touchid.verify('FingerPrintAuth_telosPrevMobile', 'Use sua digital para acessar', resolve)
            },
            reject
          )
        })
          .then(function (auth) {
            console.log('Success retrieving key with TouchId')

            auth = JSON.parse(auth)

            if (!(auth.k && auth.cpf)) {
              throw new Error('Invalid KID.')
            }

            stageMap = {}
            logged = false
            userInfo = {}
            $rootScope.lastRequest = {}

            $ionicLoading.show({
              content: 'Carregando',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 300,
              showDelay: 0
            })

            return loginPostAction(
              $http.post(urlBase, {
                param: {
                  imei: (window.device.uuid + '').slice(0, 256),
                  k: auth.k,
                  acao: 'autenticarTouchId'
                },
                login: { u: '', s: '' }
              }),
              auth.cpf
            )
          })
          .catch(function () {
            console.error("Device kid isn't available, next time it will reset...")
            window.localStorage.setItem('touchId', null)
            $scope.errorMsg =
              'Erro ao acessar dados de cadastro com digital. Por favor entre com seu CPF e senha e reative o login com a digital.'
          })
      }

      $scope.submit = function () {
        var formData = this.formData

        logged = false
        stageMap = {}
        userInfo = {}
        $rootScope.lastRequest = {}

        if (!(formData.cpf && formData.sen)) {
          $rootScope.errorMsg = 'Por favor preencha os campos acima'
          return
        }

        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        loginPostAction(
          $http.post(urlBase, {
            param: {
              cpf: formData.cpf,
              sen: formData.sen,
              acao: 'logar'
            },
            login: { u: '', s: '' }
          }),
          formData.cpf
        )
      }
    }
  ])
  .controller('termosDeUso', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope, $state, $rootScope) {
      $rootScope.erroMsg = false
      $scope.termosText = $rootScope.lastRequest.result['termo_de_uso'][0]['descricao_termo_uso']
    }
  ])
  .controller('termoDeUso', [
    '$scope',
    '$state',
    '$http',
    '$ionicLoading',
    '$rootScope',
    '$ionicPopup',
    function ($scope, $state, $http, $ionicLoading, $rootScope, $ionicPopup) {
      $scope.termosText = ''
      $ionicLoading.show({
        content: 'Carregando',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 300,
        showDelay: 0
      })

      $http
        .post(urlBase, {
          param: { acao: 'termoUsoInicial' },
          login: { u: '', s: '' }
        })
        .then(
          function (resp) {
            if (!resp.data.success) {
              $rootScope.errorMsg = resp.data.msg
              $state.go('signin')
            } else {
              $ionicLoading.hide()
              $scope.termosText = resp.data.result['termo_de_uso'][0]['descricao_termo_uso']
            }
          },
          function (err) {
            console.error(err)
            $ionicLoading.hide()
            $ionicPopup.alert({
              title: 'Falha de conexão',
              template: timeoutMsg
            })
          }
        )
    }
  ])
  .controller('SimulacaoResgateCtrl', [
    '$scope',
    '$state',
    '$http',
    '$ionicLoading',
    '$rootScope',
    '$ionicPopup',
    function ($scope, $state, $http, $ionicLoading, $rootScope, $ionicPopup) {
      $scope.resgate = []

      $ionicLoading.show()
      $http
        .post(urlBase + ';jsessionid=' + $rootScope.lastRequest.login.s, {
          param: { acao: 'simulacaoResgate' },
          login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
        })
        .then(
          function (resp) {
            userInfo.u = resp.data.login.u
            userInfo.s = resp.data.login.s
            $ionicLoading.hide()
            if (!resp.data.success) {
              $rootScope.errorMsg = resp.data.msg
              $state.go('signin')
            } else {
              $scope.resgate = resp.data.result
              $ionicLoading.hide()
            }
          },
          function (err) {
            console.error(err)
            $ionicLoading.hide()
            $ionicPopup.alert({
              title: 'Falha de conexão',
              template: timeoutMsg
            })
          }
        )
    }
  ])
  /**
   * aceitarTermos: Aceitar Termos de Uso
   */
  .controller('aceitarTermos', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = false
      $scope.aceitar = function () {
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + $rootScope.lastRequest.login.s, {
            param: { aceite: true, acao: 'termoUso', cpf: userInfo.cpf },
            login: {
              u: $rootScope.lastRequest.login.u,
              s: $rootScope.lastRequest.login.s
            }
          })
          .then(
            function (resp) {
              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                logged = true
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s
                $rootScope.lastRequest.success = resp.data.success
                $rootScope.lastRequest.msg = resp.data.msg
                $rootScope.lastRequest.login = resp.data.login

                // $rootScope.lastRequest = resp.data;
                $ionicLoading.hide()
                $state.go('menu')
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
      $scope.recusar = function () {
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })
        $http
          .post(urlBase + ';jsessionid=' + $rootScope.lastRequest.login.s, {
            param: { acao: 'logout' },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function () {
              stageMap = {}
              logged = false
              userInfo = {}
              $rootScope.lastRequest = {}
              delete $rootScope.beneficiariosOriginal
              $ionicLoading.hide()

              $state.go('signin')
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
      $scope.termosText = $rootScope.lastRequest.result['termo_de_uso'][0]['descricao_termo_uso']
    }
  ])
  .controller('headerInfo', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope, $state, $rootScope) {
      $scope.$state = $state
      $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0]

      // Mantem o headerInfo sempre aberto no menu
      if ($state.current['name'] === 'menu') {
        $scope.abrirMenu = true
      } else if ($scope.abrirMenu) {
        // Mantem o headerInfo sempre fechado nas demais páginas
        $scope.abrirMenu = false
      }
    }
  ])
  /**
   * CONTROLLERS DAS PÁGINAS DE PRIMEIRO NÍVEL
   */
  .controller('DadosCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope, $state, $rootScope) {
      $rootScope.erroMsg = false
      $scope.dados = $rootScope.lastRequest.result.dadosCadastrais[0]
      $scope.dados.habilitarBotao = !$scope.dados['exibe_botao_editar']
      $scope.infoprev = $rootScope.lastRequest.result['informacoesPrevidenciarias']
      $scope.infobenef = $rootScope.lastRequest.result['informacoesDependentes']
    }
  ])
  .controller('DadosCtrl.form', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = false
      $scope.dados = $rootScope.lastRequest.result.dadosCadastrais[0]
      $scope.formData = $scope.dados
      $scope.submit = function () {
        $scope.dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0]
        $scope.informacoesParticipante = $rootScope.lastRequest.result.informacoesParticipante[0]
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

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

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: $scope.postData,
            login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              $ionicLoading.hide()

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                }
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('ExtratoCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = false
      $scope.extrato = $rootScope.lastRequest.result['extratoContas']
      $scope.formData = {}

      $scope.submit = function () {
        if (!$scope.formData.cod_ano_mes) {
          $rootScope.errorMsg = 'Por favor preencha todos os campos'
        } else {
          $ionicLoading.show({
            content: 'Carregando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 300,
            showDelay: 0
          })

          $http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: {
                cod_ano_mes: $scope.formData.cod_ano_mes,
                acao: 'extratoContas'
              },
              login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
            })
            .then(
              function (resp) {
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s
                $ionicLoading.hide()

                if (!resp.data.success) {
                  $rootScope.errorMsg = resp.data.msg
                  $state.go('signin')
                } else {
                  if (resp.data.msg.length > 0) {
                    $rootScope.errorMsg = resp.data.msg
                  } else {
                    $rootScope.lastRequest.extratoEmitido = resp.data.result
                    $rootScope.lastRequest.extratoEmitido.mes_atual = $scope.cod_ano_mes
                    $rootScope.cache.cod_ano_mes = $scope.formData.cod_ano_mes
                    $state.go('extratoemitido')
                  }
                }
              },
              function (err) {
                console.error(err)
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutMsg
                })
              }
            )
        }
      }
    }
  ])
  .controller('ExtratoCtrl.emitido', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = false
      $scope.extrato = $rootScope.lastRequest.extratoEmitido
      $scope.hasEmail = $rootScope.lastRequest.result.dadosCadastrais.email === ''
      $scope.sendMail = function () {
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              descricaoEmail: $rootScope.lastRequest.result.dadosCadastrais[0].email,
              acao: 'extratoContasEnvioEmail',
              dataAtualizacao: $rootScope.cache.cod_ano_mes
            },
            login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              $ionicLoading.hide()

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $ionicPopup.alert({
                    template: 'Enviado para ' + $rootScope.lastRequest.result.dadosCadastrais[0].email
                  })
                }
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('SaldoCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = false
      $scope.saldo = $rootScope.lastRequest.result['saldoContas']
      $scope.formData = {}
      $scope.saldo.detalhesSaldoContas = false

      setTimeout(function () {
        $scope.formData.data_atualizacao = $scope.saldo[0].data_atualizacao
        $scope.submit()
      }, 200)

      $scope.submit = function () {
        $scope.saldo.detalhesSaldoContas = false

        if (!$scope.formData.data_atualizacao) {
          $rootScope.errorMsg = 'Por favor preencha todos os campos'
        } else {
          $ionicLoading.show({
            content: 'Carregando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 300,
            showDelay: 0
          })

          $http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: {
                data_atualizacao: $scope.formData.data_atualizacao,
                acao: 'saldoContas'
              },
              login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
            })
            .then(
              function (resp) {
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s
                $ionicLoading.hide()

                if (!resp.data.success) {
                  $rootScope.errorMsg = resp.data.msg
                  $state.go('signin')
                } else {
                  if (resp.data.msg.length > 0) {
                    $rootScope.errorMsg = resp.data.msg
                  } else {
                    $rootScope.lastRequest.saldoEmitido = resp.data.result
                    $scope.saldo.detalhesSaldoContas = resp.data.result.detalhesSaldoContas
                    $scope.saldo.total_financeiro = resp.data.result.total_financeiro
                    // TODO: Check correct way => $scope.formData.data_atualizacao = $scope.formData.data_atualizacao
                    $scope.saldo.dados_atualizadoEm = resp.data.result.dados_atualizadoEm
                    $rootScope.cache.data_atualizacao = $scope.formData.data_atualizacao
                    // $state.go('saldoemitido');
                  }
                }
              },
              function (err) {
                console.error(err)
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutMsg
                })
              }
            )
        }
        $scope.sendMail = function () {
          $ionicLoading.show({
            content: 'Carregando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 300,
            showDelay: 0
          })

          $http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: {
                descricaoEmail: $rootScope.lastRequest.result.dadosCadastrais[0].email,
                acao: 'saldoContasEnvioEmail',
                dataAtualizacao: $rootScope.cache.data_atualizacao
              },
              login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
            })
            .then(
              function (resp) {
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s
                $ionicLoading.hide()

                if (!resp.data.success) {
                  $rootScope.errorMsg = resp.data.msg
                  $state.go('signin')
                } else {
                  if (resp.data.msg.length > 0) {
                    $rootScope.errorMsg = resp.data.msg
                  } else {
                    $ionicPopup.alert({
                      template: 'Enviado para ' + $rootScope.lastRequest.result.dadosCadastrais[0].email
                    })
                  }
                }
              },
              function (err) {
                console.error(err)
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutMsg
                })
              }
            )
        }
      }
    }
  ])
  .controller('SaldoCtrl.emitido', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope, $state, $rootScope) {
      $rootScope.erroMsg = false
      $scope.saldo = $rootScope.lastRequest.saldoEmitido
      $scope.hasEmail = $rootScope.lastRequest.result.dadosCadastrais.email === ''
    }
  ])
  .controller('DemonstrativoCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = false
      $scope.demonstrativo = $rootScope.lastRequest.result['demonstrativoPagamento']
      $scope.formData = {}

      $scope.submit = function () {
        if (typeof $scope.formData.data_pagamento === 'undefined') {
          $rootScope.errorMsg = 'Por favor preencha todos os campos'
        } else {
          $ionicLoading.show({
            content: 'Carregando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 300,
            showDelay: 0
          })

          $http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: {
                data_pagamento: $scope.formData.data_pagamento,
                acao: 'demonstrativoPagamento'
              },
              login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
            })
            .then(
              function (resp) {
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s

                $ionicLoading.hide()

                if (!resp.data.success) {
                  $rootScope.errorMsg = resp.data.msg
                  $state.go('signin')
                } else {
                  if (resp.data.msg.length > 0) {
                    $rootScope.errorMsg = resp.data.msg
                  } else {
                    $rootScope.demonstrativoEmitido = resp.data.result
                    $rootScope.errorMsg = false
                    $rootScope.cache.data_pagamento = $scope.formData.data_pagamento
                    $state.go('demonstrativoemitido')
                  }
                }
              },
              function (err) {
                console.error(err)
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutMsg
                })
              }
            )
        }
      }
    }
  ])
  .controller('ContatoCtrl.form', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0]
      $rootScope.erroMsg = false
      $scope.formData = {}

      $scope.submit = function () {
        if (
          typeof $scope.formData.mensagem === 'undefined' ||
          typeof $scope.formData.telefone === 'undefined' ||
          typeof $scope.formData.email === 'undefined'
        ) {
          $rootScope.errorMsg = 'Por favor preencha todos os campos'
        } else {
          $ionicLoading.show({
            content: 'Carregando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 300,
            showDelay: 0
          })

          $http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: {
                acao: 'faleConosco',
                nome: $scope.matricula.nome,
                email: $scope.formData.email,
                telefone: $scope.formData.telefone,
                mensagem: $scope.formData.mensagem,
                patrocinador: $scope.matricula.patrocinadora,
                matricula: $scope.matricula.matricula
              },
              login: { u: userInfo.u, s: userInfo.s }
            })
            .then(
              function (resp) {
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s

                $ionicLoading.hide()

                $rootScope.errorMsg = resp.data.msg

                if (!resp.data.success) {
                  $state.go('signin')
                } else {
                  if (resp.data.result['emailEnviado']) {
                    $scope.formData = {}
                    setTimeout(function () {
                      $state.go('menu')
                    }, 1200)
                  } else {
                  }
                }
              },
              function (err) {
                console.error(err)
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutMsg
                })
              }
            )
        }
      }
    }
  ])
  .controller('DemonstrativoCtrl.emitido', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = false
      $scope.demonstrativo = $rootScope.demonstrativoEmitido

      $scope.hasEmail = $rootScope.lastRequest.result.dadosCadastrais.email === ''

      $scope.sendMail = function () {
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              descricaoEmail: $rootScope.lastRequest.result.dadosCadastrais[0].email,
              acao: 'demonstrativoPagamentoEmail',
              dataAtualizacao: $rootScope.cache.data_pagamento
            },
            login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              $ionicLoading.hide()

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $ionicPopup.alert({
                    template: 'Enviado para ' + $rootScope.lastRequest.result.dadosCadastrais[0].email
                  })
                }
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('EmprestimoConsultaCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope, $state, $rootScope) {
      $rootScope.erroMsg = false
      $scope.consultaEmprestimo = $rootScope.lastRequest.result.consultaEmprestimo
    }
  ])
  .controller('EmprestimoSimulacaoCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$filter',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $filter, $ionicPopup) {
      $scope.formData = {}
      $scope.tipos_emprestimo = $rootScope.lastRequest.result['simulacaoEmprestimo']
      $scope.buttonText = '- Selecione -'
      $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0].matricula
      $rootScope.lastRequest.emprestimoSimulacaoCampos = []
      $scope.disableddates = []
      $scope.disableCalendar = true
      $scope.dataInicial = new Date()
      $scope.update = function (codEmprestimo) {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })
        // Atualiza as datas de crédito
        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              cod_emprestimo: codEmprestimo,
              matricula: $scope.matricula,
              acao: 'emprestimos'
            },
            login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
          })
          .then(
            function (resp) {
              var k, currentDate, datasIndisponiveis

              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              $ionicLoading.hide()

              $scope.dataInicial = new Date(resp.data.result['data_inicial']).getTime()
              $scope.disableCalendar = false

              datasIndisponiveis = resp.data.result['datas_credito']
              for (k in datasIndisponiveis) {
                if (!datasIndisponiveis.hasOwnProperty(k) || datasIndisponiveis[k]['disponivel'] !== 'N') continue
                currentDate = new Date(datasIndisponiveis[k].data)
                $scope.disableddates.push(currentDate.getTime())
              }

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  // TODO: atualizar o dados indisponiveis talvez?
                  console.log('TODO: Atualizar os dados disponiveis: ' + inspect(resp))
                }
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }

      // carreagar o tipo logo de cara
      $scope.formData.tipo = $rootScope.lastRequest.result['simulacaoEmprestimo'][0].cod_emprestimo
      $scope.update($scope.formData.tipo)

      $scope.submit = function (codEmprestimo) {
        if (!$scope.formData.tipo || !$scope.formData.data) {
          $scope.errorMsg = 'Por favor preencha todos os campos'
        } else {
          $ionicLoading.show({
            content: 'Carregando',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 300,
            showDelay: 0
          })

          // Atualiza as datas de crédito
          $http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: {
                cod_emprestimo: codEmprestimo,
                dataCredito: $scope.formData.data,
                acao: 'simulacaoEmprestimo'
              },
              login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
            })
            .then(
              function (resp) {
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s

                $ionicLoading.hide()
                $rootScope.lastRequest.emprestimoSimulacaoCampos = resp.data.result
                $rootScope.lastRequest.emprestimoSimulacaoCampos.cod_emprestimo = codEmprestimo
                $scope.errorMsg = false
                $state.go('emprestimosimulacaocampos')
              },
              function (err) {
                console.error(err)
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutMsg
                })
              }
            )
        }
      }

      $scope.datePickerCallback = function (data) {
        $scope.formData.data = $filter('date')(data, 'dd/MM/yyyy', false)
        $scope.buttonText = $scope.formData.data
      }
      $scope.simulacao = $rootScope.lastRequest.result['simulacaoEmprestimo']
    }
  ])
  .controller('emprestimoSimulacaoCamposCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$filter',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $filter, $ionicPopup) {
      $scope.formData = {}
      $scope.contrato = $rootScope.lastRequest.emprestimoSimulacaoCampos.saldos_dados_simulacao
      $scope.emprestimoSimulacaoCampos = $rootScope.lastRequest.emprestimoSimulacaoCampos
      $scope.tipos_emprestimo = $rootScope.lastRequest.result['simulacaoEmprestimo']
      $scope.matricula = $rootScope.lastRequest.result.informacoesParticipante[0].matricula
      $scope.dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0]

      $scope.currency = function (valor, e) {
        var milSep = '.'
        var decSep = ','
        var casas = 3

        var campo = {}
        campo.value = $scope.formData.valor
        campo.maxLength = 12
        $scope.formData.valor = $scope.formData.valor.replace(',', '').replace('.', '')

        var code = e.keyCode
        // pega codigo datecla digitada

        if (code >= 65 && code <= 90) {
          $scope.formData.valor = $scope.formData.valor.replace(/\D+/g, '')
          return false
        }
        if (code === 8) {
          $scope.formData.valor = '0,00'
          return false
        }

        switch (code) { // caso seja...
          // case 8: //backspace
          // 0 = Delete
          case 0:
          case 13: // Enter
            return true // sai da funcao, validando a tecla
        }

        var key = String.fromCharCode(code) // Transforma codigo em caracter
        if (isNaN(key)) return false // N?o ? numero, sai da funcao
        if (campo.maxLength <= campo.value.length) return false // trata erro decasas

        var j = 0
        var i
        var len = campo.value.length
        var len2 = 0
        var aux2 = ''
        var aux = ''

        milSep = typeof milSep !== 'undefined' ? milSep : '.' // se separadoresforem nulos,
        decSep = typeof decSep !== 'undefined' ? decSep : ',' // especificaseparadores padr?es

        for (i = 0; i < len; i++) {
          if (campo.value.charAt(i) !== '0' && campo.value.charAt(i) !== decSep) {
            break
          }
        }

        for (; i < len; i++) {
          if (
            !isNaN(campo.value.charAt(i)) // se for numero
          ) {
            aux += campo.value.charAt(i)
          } // adiciona a variavel auxiliar
        }

        aux += key // adiciona tecla digitada
        len = aux.length

        if (len === 0) campo.value = ''

        // se o numero do campo for menor q a quantidade de casas decimais
        if (len > 0 && len <= casas) {
          // insere os zeros necessarios antes do mesmo
          campo.value = '0' + decSep

          /* trecho acrescentado devido ao bug do 1 centavo */
          if (len === 1 && casas === 2) campo.value += '0' /* fim trecho */
          else for (i = 1; i <= casas - len; i++) campo.value += '0'

          campo.value += aux
        }

        if (len > casas) {
          aux2 = ''

          for (j = 0, i = len - (casas + 1); i >= 0; i--) {
            if (milSep !== '' && j === 3) {
              aux2 += milSep
              j = 0
            }
            aux2 += aux.charAt(i)
            j++
          }
          campo.value = ''
          len2 = aux2.length

          for (
            i = len2 - 1;
            i >= 0;
            i-- // coloca numero com ou sem separadores no campo
          ) {
            campo.value += aux2.charAt(i)
          }

          // adiciona numeros decimais
          campo.value += decSep + aux.substr(len - casas, len)
        }

        campo.value = campo.value.substr(0, campo.value.length - 1)

        $scope.formData.valor = campo.value
      }

      $scope.submit = function (formData) {
        if (!$scope.formData.tipo || !$scope.formData.prazoInicial || !$scope.formData.valor) {
          $scope.errorMsg = 'Por favor preencha todos os campos'
        } else {
          $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 300,
            showDelay: 0
          })
          var jsonData = {
            cod_emprestimo: $scope.emprestimoSimulacaoCampos.cod_emprestimo,
            cod_patrocinadora: $scope.dadosCadastrais.cod_patrocinadora,
            cod_fundo: $scope.dadosCadastrais.cod_fundo,
            matricula: $scope.matricula,
            tipo_simulacao: formData.tipo,
            valor_total_emprestimo: formData.valor,
            cod_prazo_inicial:
              $scope.emprestimoSimulacaoCampos.limitesCreditos[formData.prazoInicial].cod_prazo_inicial,
            val_salario: $scope.emprestimoSimulacaoCampos.limitesCreditos[formData.prazoInicial].val_salario,
            valor: $scope.emprestimoSimulacaoCampos.limitesCreditos[formData.prazoInicial].valor,
            acao: 'calculaEmprestimo'
          }

          $http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: jsonData,
              login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
            })
            .then(
              function (resp) {
                var k
                $ionicLoading.hide()
                userInfo.u = resp.data.login.u
                userInfo.s = resp.data.login.s

                if (!resp.data.success) {
                  $rootScope.errorMsg = resp.data.msg
                  $state.go('signin')
                } else {
                  if (resp.data.msg.length > 0) {
                    $rootScope.errorMsg = resp.data.msg
                  } else {
                    $rootScope.lastRequest.emprestimoSimulacaoCamposEmitido = {}
                    $rootScope.lastRequest.emprestimoSimulacaoCamposEmitido.json = jsonData
                    $rootScope.lastRequest.emprestimoSimulacaoCamposEmitido.result = resp.data.result

                    for (k in $scope.lastRequest.result['simulacaoEmprestimo']) {
                      if (!$scope.lastRequest.result['simulacaoEmprestimo'].hasOwnProperty(k)) continue
                      if (
                        $rootScope.lastRequest.result['simulacaoEmprestimo'][k].cod_emprestimo ===
                        $scope.emprestimoSimulacaoCampos.cod_emprestimo
                      ) {
                        $rootScope.lastRequest.emprestimoSimulacaoCamposEmitido.tipo_emprestimo =
                          $rootScope.lastRequest.result['simulacaoEmprestimo'][k].desc_emprestimo
                      }
                    }
                    $scope.errorMsg = false
                    $state.go('emprestimosimulacaocamposemitido')
                  }
                }
              },
              function (err) {
                console.error(err)
                $ionicLoading.hide()
                $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutMsg
                })
              }
            )
        }
      }
    }
  ])
  .controller('EmprestimoSimulacaoCamposEmitidoCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicPopup',
    '$ionicLoading',
    function ($scope, $state, $rootScope, $http, $ionicPopup, $ionicLoading) {
      var dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0]
      var documentosConcessao = $rootScope.lastRequest.result.documentosConcessao[0]
      var informacoesParticipante = $rootScope.lastRequest.result.informacoesParticipante[0]
      var emprestimoSimulacaoCampos = $rootScope.lastRequest.emprestimoSimulacaoCampos
      var emprestimoSimulacaoCamposEmitido = $rootScope.lastRequest.emprestimoSimulacaoCamposEmitido

      // var saldosDadosSimulacao = emprestimoSimulacaoCampos.saldos_dados_simulacao[0]

      $scope.emprestimoSimulacaoCampos = emprestimoSimulacaoCampos
      $scope.emprestimoSimulacaoCamposEmitido = emprestimoSimulacaoCamposEmitido.result

      $scope.submit = function () {
        $http
          .post(urlBase + ';jsessionid=' + $rootScope.lastRequest.login.s, {
            param: {
              acao: 'confirmacaoEmprestimo',
              // saldo_devedor_total: saldosDadosSimulacao.saldo_devedor_total,
              percentual_seguro_qqm: emprestimoSimulacaoCamposEmitido.result.percentual_seguro_qqm,
              prazo_selecionado_salario: emprestimoSimulacaoCamposEmitido.result.prazo_selecionado_salario,
              saldo_devedor_inicial: emprestimoSimulacaoCamposEmitido.result.saldo_devedor_inicial,
              prestacao_inicial: emprestimoSimulacaoCamposEmitido.result.prestacao_inicial,
              cod_prazo_inicial: emprestimoSimulacaoCamposEmitido.json.cod_prazo_inicial,
              cod_emprestimo: emprestimoSimulacaoCamposEmitido.json.cod_emprestimo,
              cod_fundo: emprestimoSimulacaoCamposEmitido.json.cod_fundo,
              cod_patrocinadora: emprestimoSimulacaoCamposEmitido.json.cod_patrocinadora,
              numero_inscricao: dadosCadastrais.numero_inscricao,
              matricula: emprestimoSimulacaoCamposEmitido.json.matricula,
              sequencial_bnf: dadosCadastrais.sequencial_bnf,
              valor_coeficiente_prazo: emprestimoSimulacaoCamposEmitido.result.valor_coeficiente_prazo,
              val_salario: emprestimoSimulacaoCamposEmitido.json.val_salario,
              iof: emprestimoSimulacaoCamposEmitido.result.iof,
              sit_par: dadosCadastrais.sit_par,
              dc_numero_agencia: documentosConcessao.dc_numero_agencia,
              dc_numero_conta_corrente: documentosConcessao.dc_numero_conta_corrente,
              nome: informacoesParticipante.nome,
              dc_numero_cpf: documentosConcessao.dc_numero_cpf,
              // numero_contrato: saldosDadosSimulacao.numero_contrato,
              idade: informacoesParticipante.idade_prev_apo,
              seguro_prestamista: emprestimoSimulacaoCamposEmitido.result.seguro_prestamista,
              seguro_prestamista_bruto: emprestimoSimulacaoCamposEmitido.result.seguro_prestamista_bruto,
              codigo_indice_correcao: emprestimoSimulacaoCamposEmitido.result.codigo_indice_correcao,
              data_credito: emprestimoSimulacaoCamposEmitido.result.data_credito,
              valor_parcela: emprestimoSimulacaoCamposEmitido.result.valor_parcela,
              numero_parcela: emprestimoSimulacaoCamposEmitido.result.numero_parcela,
              data_credito_ept: emprestimoSimulacaoCamposEmitido.result.data_credito_ept,
              valor_taxa: emprestimoSimulacaoCamposEmitido.result.valor_taxa,
              email: dadosCadastrais.email
            },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              $ionicLoading.hide()

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $state.go('emprestimodocumentosconcessao')
                }
              }
            },
            function () {
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  // MEUS CONTROLLERS

  /**
   ***
   ***  Simulação RMV 1.1
   ***
   **/
  .controller('SimulacaoRendaMensalVitaliciaCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$ionicLoading',
    '$http',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $ionicLoading, $http, $ionicPopup) {
      $scope.formData = {}
      $scope.contribuicao_participante =
        $rootScope.lastRequest.result.informacoesParticipante[0].contribuicao_participante
      $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao
      $scope.years = []
      for (var year = 20; year <= 120; year++) {
        $scope.years.push(year)
      }

      $scope.data_elegibilidade_prevista =
        $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista
      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
      $scope.formData.dependentes_para_fins_ir =
        $rootScope.lastRequest.result['simuladorBeneficios'][0].dependentes_para_fins_ir

      // $scope.formData.tipo_reajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0].DEFAULT);
      // $scope.tipoReajuste = $rootScope.lastRequest.result.tipoReajuste[0];
      // delete $scope.tipoReajuste.DEFAULT;

      $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0])
      // pega o valor default
      $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0]

      // remove default do tipo de reajuste
      delete $scope.tipoReajuste.DEFAULT

      // seta o valor do form como o default do ws.
      $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT

      // se existe lastForm
      if (typeof $rootScope.cache.lastFormRMV !== 'undefined') {
        // se mes ano ta preenchido
        if (typeof $rootScope.cache.lastFormRMV.mes_ano !== 'undefined') {
          $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
        }

        if (typeof $rootScope.cache.lastFormRMV.idade !== 'undefined') {
          $scope.formData.mes_ano = ''
        }
      }

      $scope.goBeneficiarios = function (formData) {
        $rootScope.cache.formToBeneficiarios = {}
        $rootScope.cache.formToBeneficiarios = formData
        $rootScope.cache.routeToBeneficiarios = 'simulacaorendamensalvitaliciaresultado'
        $rootScope.cache.routeParams = $scope.getParams(formData)
        $state.go('simulacaorendamensalvitaliciabeneficiarios')
      }
      $scope.getParams = function (formData) {
        if (typeof formData.mes_ano === 'undefined') {
          formData.mes_ano = ''
        }
        if (typeof formData.idade === 'undefined') {
          formData.idade = ''
        }

        if (formData.idade.length > 0) {
          console.log('entrou')
          formData.mes_ano = ''
        }

        return {
          acao: 'simulaRMV',
          cod_fundo: $rootScope.lastRequest.result.dadosCadastrais[0].cod_fundo,
          cod_patrocinadora: $rootScope.lastRequest.result.dadosCadastrais[0].cod_patrocinadora,
          matricula: $rootScope.lastRequest.result.informacoesParticipante[0].matricula,
          cod_plano: $rootScope.lastRequest.result.dadosCadastrais[0].cod_plano,
          admissao_patroc: $rootScope.lastRequest.result.dadosCadastrais[0].admissao_patroc,
          data_nascimento: $rootScope.lastRequest.result.dadosCadastrais[0].data_nascimento,
          sexo: $rootScope.lastRequest.result.dadosCadastrais[0].sexo,
          tipo_reajuste: formData.tipo_reajuste,
          data_elegibilidade_prevista: $scope.data_elegibilidade_prevista,
          idade: formData.idade,
          mes_ano: formData.mes_ano,
          salario_participante: $rootScope.lastRequest.result.informacoesParticipante[0].salario_participante,
          cresc_real_sal: formData.cresc_real_sal,
          contribuicao_participante: formData.contribuicao_participante,
          pensao: formData.pensao,
          antecipacao_beneficio: formData.antecipacao_beneficio,
          aporte: formData.aporte,
          estimativa_rent_entre: formData.estimativa_rent_entre,
          dependentes_para_fins_ir: formData.dependentes_para_fins_ir,
          cod_opcao_tributacao: $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao,
          beneficiario: $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios
        }
      }
      $scope.submit = function (formData) {
        $rootScope.cache.formToBeneficiarios = {}
        $rootScope.cache.formToBeneficiarios = formData
        $rootScope.cache.routeParams = {}
        $rootScope.cache.routeParams = formData
        $rootScope.cache.routeParams.beneficiarios =
          $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios

        $rootScope.cache.lastFormRMV = {}
        $rootScope.cache.lastFormRMV = $scope.getParams(formData)
        console.log('lastFormRMV no submit: ' + $rootScope.cache.lastFormRMV)

        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: $scope.getParams(formData),
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $rootScope.cache.simulaRMV = resp.data.result
                  $state.go('simulacaorendamensalvitaliciaresultado')
                }
              }

              $ionicLoading.hide()
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('SimulacaoRendaMensalVitaliciaCtrl.beneficiarios', [
    '$scope',
    '$state',
    '$rootScope',
    '$ionicModal',
    '$ionicLoading',
    '$http',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $ionicModal, $ionicLoading, $http, $ionicPopup) {
      // se já existe um beneficiariosOriginal, não sobrescrever.
      if (typeof $rootScope.beneficiariosOriginal === 'undefined') {
        $rootScope.beneficiariosOriginal = angular.copy(
          $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios
        )
      }

      if ($rootScope.resetBeneficiarios && typeof $rootScope.beneficiariosOriginal !== 'undefined') {
        console.log('aqui resetou os beneficiarios')
        delete $scope.beneficiarios
        $scope.beneficiarios = angular.copy($rootScope.beneficiariosOriginal)
        $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios = angular.copy(
          $rootScope.beneficiariosOriginal
        )
        $rootScope.resetBeneficiarios = false
      } else {
        $scope.beneficiarios = $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios
      }

      $scope.beneficiarios.forEach(function (v, k) {
        $scope.beneficiarios[k].fromDB = true
        if ($scope.beneficiarios[k].selecionado === 'S') {
          $scope.beneficiarios[k].checked = true
        }
        if ($scope.beneficiarios[k].habilitado === 'N') {
          $scope.beneficiarios[k].readonly = true
        }
      })

      $scope.map = map
      $scope.formAddBeneficiario = {}
      $scope.changeSelecionado = function () {
        $scope.beneficiarios.forEach(function (v, k) {
          if ($scope.beneficiarios[k].checked || $scope.beneficiarios[k].habilitado === 'N') {
            $scope.beneficiarios[k].selecionado = 'S'
            $scope.beneficiarios[k].checked = true
          } else {
            $scope.beneficiarios[k].selecionado = 'N'
            $scope.beneficiarios[k].checked = false
          }
        })
      }

      $scope.addBeneficiario = function (formAddBeneficiario) {
        if (
          typeof formAddBeneficiario.cod_parentesco === 'undefined' ||
          typeof formAddBeneficiario.sexo === 'undefined' ||
          typeof formAddBeneficiario.vinculo === 'undefined' ||
          typeof formAddBeneficiario.data_nascimento === 'undefined'
        ) {
          $scope.errorMsg = 'Por favor preencha todos os campos'
        } else {
          $scope.errorMsg = ''

          var addBeneficiario = formAddBeneficiario
          addBeneficiario.fromDB = false
          addBeneficiario.ordenacao = ($scope.beneficiarios.length + 1).toString()
          addBeneficiario.selecionado = 'S'
          addBeneficiario.habilitado = 'S'
          addBeneficiario.checked = true

          $scope.beneficiarios.push(addBeneficiario)
          $scope.closeModal()
        }
      }

      $scope.rmBeneficiario = function (k) {
        $scope.beneficiarios.splice(k, 1)
      }

      $ionicModal
        .fromTemplateUrl('templates/modal/add-beneficiarios.html', {
          scope: $scope,
          animation: 'slide-in-up'
        })
        .then(function (modal) {
          $scope.modal = modal
        })
      $scope.openModal = function () {
        $scope.formAddBeneficiario = {}
        $scope.modal.show()
      }
      $scope.closeModal = function () {
        $scope.modal.hide()
      }
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.modal.remove()
      })
      // Execute action on hide modal
      $scope.$on('modal.hidden', function () {
        // Execute action
      })
      // Execute action on remove modal
      $scope.$on('modal.removed', function () {
        // Execute action
      })

      $scope.submit = function () {
        $scope.matricula = $rootScope.lastRequest.result

        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $rootScope.cache.routeParams.beneficiarios = $scope.beneficiarios

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: $rootScope.cache.routeParams,
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $rootScope.cache.simulaRMV = resp.data.result
                  $rootScope.cache.simulaRmvSp = resp.data.result
                  $state.go($rootScope.cache.routeToBeneficiarios)
                }
              }

              $ionicLoading.hide()
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('SimulacaoRendaMensalVitaliciaCtrl.resultado', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope, $state, $rootScope) {
      $scope.showChild = false
      $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios
      // $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios;
      // $scope.beneficiarios = $scope.formData.beneficiarios;
      $scope.map = map
      $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao

      $scope.value = $rootScope.cache.simulaRMV

      $scope.texto_simulacao_renda_mensal_vitalicia =
        $rootScope.lastRequest.result['simuladorBeneficios'][0].desc_texto_rmv
      $scope.data_elegibilidade_prevista =
        $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista

      if (typeof $rootScope.cache.formToBeneficiarios !== 'undefined') {
        $scope.formData = $rootScope.cache.formToBeneficiarios
      }

      $scope.toggleChild = function () {
        if ($scope.showChild) $scope.showChild = false
        else $scope.showChild = true
      }

      $scope.showChildC = false

      $scope.toggleChildC = function () {
        if ($scope.showChildC) $scope.showChildC = false
        else $scope.showChildC = true
      }

      // depois de listar (ou não) os beneficiários, "resetar as configs de beneficários"
      $rootScope.resetBeneficiarios = true
    }
  ])
  /**
   ***
   ***  Simulação Saque Programado 1.2
   ***
   **/
  .controller('SimulacaoSaqueProgramadoCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $scope.formData = {}

      if ('lastFormDataSP' in $rootScope.cache) {
        $scope.formData = $rootScope.cache.lastFormDataSP
      }

      // se existe lastForm
      if (typeof $rootScope.cache.lastFormDataSP !== 'undefined') {
        // se mes ano ta preenchido
        if (typeof $rootScope.cache.lastFormDataSP.mes_ano !== 'undefined') {
          $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
        }

        if (typeof $rootScope.cache.lastFormDataSP.idade !== 'undefined') {
          $scope.formData.mes_ano = ''
        }
      }

      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
      $scope.years = []
      for (var year = 20; year <= 120; year++) {
        $scope.years.push(year)
      }
      $scope.formData.dependentes_ir = $rootScope.lastRequest.result['simuladorBeneficios'][0].dependentes_para_fins_ir
      $scope.contribuicao_participante =
        $rootScope.lastRequest.result.informacoesParticipante[0].contribuicao_participante
      $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao
      $scope.data_elegibilidade_prevista =
        $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista
      $scope.submit = function (formData) {
        $scope.matricula = $rootScope.lastRequest.result
        $rootScope.cache.lastFormDataSP = formData
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        if (typeof formData.mes_ano === 'undefined') {
          formData.mes_ano = ''
        }

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              acao: 'simulaSP',
              cod_fundo: $scope.matricula.dadosCadastrais[0].cod_fundo,
              cod_patrocinadora: $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
              matricula: $scope.matricula.informacoesParticipante[0].matricula,
              cod_plano: $scope.matricula.dadosCadastrais[0].cod_plano,
              admissao_patroc: $scope.matricula.dadosCadastrais[0].admissao_patroc,
              data_nascimento: $scope.matricula.dadosCadastrais[0].data_nascimento,
              sexo: $scope.matricula.dadosCadastrais[0].sexo,
              data_elegibilidade_prevista: $scope.data_elegibilidade_prevista,
              idade: formData.idade,
              mes_ano: formData.mes_ano,
              salario_participante: $scope.matricula.informacoesParticipante[0].salario_participante,
              cresc_real_sal: formData.cresc_real_sal,
              contribuicao_participante: formData.contribuicao_participante,
              antecipacao_beneficio: formData.antecipacao_beneficio,
              aporte: formData.aporte,
              dependentes_ir: formData.dependentes_ir,
              estimativa_rent_entre: formData.estimativa_rent_entre,
              estimativa_rent_apos: formData.estimativa_rent_apos,
              renda_mensal: formData.renda_mensal,
              abono_anual: formData.abono_anual
            },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              $rootScope.errorMsg = resp.data.msg

              if (!resp.data.success) {
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                } else {
                  $rootScope.lastRequest.result.simulaSP = resp.data.result
                  $state.go('simulacaosaqueprogramadoresultado')
                }
              }

              $ionicLoading.hide()
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('SimulacaoSaqueProgramadoCtrl.resultado', [
    '$scope',
    '$state',
    '$http',
    '$rootScope',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $http, $rootScope, $ionicLoading, $ionicPopup) {
      $scope.formData = {}
      if (typeof $rootScope.cache.lastFormDataSP !== 'undefined') {
        $scope.formData = $rootScope.cache.lastFormDataSP
      }
      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
      $scope.years = []
      for (var year = 20; year <= 120; year++) {
        $scope.years.push(year)
      }
      $scope.value = $rootScope.lastRequest.result.simulaSP

      $scope.texto_simulacao_saque_programado =
        $rootScope.lastRequest.result['simuladorBeneficios'][0].desc_texto_saque_prog
      $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao

      $scope.data_elegibilidade_prevista =
        $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista

      $scope.submit = function (formData) {
        $scope.matricula = $rootScope.lastRequest.result
        $rootScope.cache.lastFormDataSP = formData
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        if (typeof formData.mes_ano === 'undefined') {
          formData.mes_ano = ''
        }

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              acao: 'simulaSP',
              cod_fundo: $scope.matricula.dadosCadastrais[0].cod_fundo,
              cod_patrocinadora: $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
              matricula: $scope.matricula.informacoesParticipante[0].matricula,
              cod_plano: $scope.matricula.dadosCadastrais[0].cod_plano,
              admissao_patroc: $scope.matricula.dadosCadastrais[0].admissao_patroc,
              data_nascimento: $scope.matricula.dadosCadastrais[0].data_nascimento,
              sexo: $scope.matricula.dadosCadastrais[0].sexo,
              data_elegibilidade_prevista: $scope.data_elegibilidade_prevista,
              idade: formData.idade,
              mes_ano: formData.mes_ano,
              salario_participante: $scope.matricula.informacoesParticipante[0].salario_participante,
              cresc_real_sal: formData.cresc_real_sal,
              contribuicao_participante: formData.contribuicao_participante,
              antecipacao_beneficio: formData.antecipacao_beneficio,
              aporte: formData.aporte,
              dependentes_ir: formData.dependentes_ir,
              estimativa_rent_entre: formData.estimativa_rent_entre,
              estimativa_rent_apos: formData.estimativa_rent_apos,
              renda_mensal: formData.renda_mensal,
              abono_anual: formData.abono_anual
            },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              $rootScope.errorMsg = resp.data.msg

              if (!resp.data.success) {
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                } else {
                  $rootScope.lastRequest.result.simulaSP = resp.data.result
                  $state.reload()
                  // $state.go('simulacaosaqueprogramadoresultado');
                }
              }

              $ionicLoading.hide()
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  /**
   ***
   ***  Simulação RMV + Saque Programado 1.3
   ***
   **/
  .controller('SimulacaoRmvSaqueProgramadoCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $scope.formData = {}

      // if (typeof($rootScope.cache.formSimulaRMVSP) !== 'undefined'){
      //   $scope.formData = $rootScope.cache.formSimulaRMVSP;
      // }

      $scope.formData.dependentes_ir = $rootScope.lastRequest.result['simuladorBeneficios'][0].dependentes_para_fins_ir
      $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
      $scope.years = []
      for (var year = 20; year <= 120; year++) {
        $scope.years.push(year)
      }
      $scope.data_elegibilidade_prevista =
        $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista
      $scope.contribuicao_participante =
        $rootScope.lastRequest.result.informacoesParticipante[0].contribuicao_participante
      $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao

      // $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
      // $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
      // delete $scope.tipoReajuste.DEFAULT;

      $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0])
      // pega o valor default
      $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0]

      // remove default do tipo de reajuste
      delete $scope.tipoReajuste.DEFAULT

      // seta o valor do form como o default do ws.
      $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT

      console.log('default do tipo_reajuste: ')
      console.log($scope.formData.tipo_reajuste)

      // se existe lastForm
      if (typeof $rootScope.cache.formSimulaRMVSP !== 'undefined') {
        // se mes ano ta preenchido
        if (typeof $rootScope.cache.formSimulaRMVSP.mes_ano !== 'undefined') {
          $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
        }

        if (typeof $rootScope.cache.formSimulaRMVSP.idade !== 'undefined') {
          $scope.formData.mes_ano = ''
        }
      }

      $scope.goBeneficiarios = function (formData) {
        $rootScope.cache.formToBeneficiarios = {}
        $rootScope.cache.formToBeneficiarios = formData
        $rootScope.cache.routeToBeneficiarios = 'simulacaormvsaqueprogramadoresultado'
        $rootScope.cache.routeParams = $scope.getParams(formData)
        $state.go('simulacaorendamensalvitaliciabeneficiarios')
      }
      $scope.getParams = function (formData) {
        if (typeof formData.mes_ano === 'undefined') {
          formData.mes_ano = ''
        }

        return {
          acao: 'simulaRmvSp',
          cod_fundo: $rootScope.lastRequest.result.dadosCadastrais[0].cod_fundo,
          cod_patrocinadora: $rootScope.lastRequest.result.dadosCadastrais[0].cod_patrocinadora,
          matricula: $rootScope.lastRequest.result.informacoesParticipante[0].matricula,
          cod_plano: $rootScope.lastRequest.result.dadosCadastrais[0].cod_plano,
          admissao_patroc: $rootScope.lastRequest.result.dadosCadastrais[0].admissao_patroc,
          data_nascimento: $rootScope.lastRequest.result.dadosCadastrais[0].data_nascimento,
          sexo: $rootScope.lastRequest.result.dadosCadastrais[0].sexo,
          tipo_reajuste: formData.tipo_reajuste,
          salario_participante: $rootScope.lastRequest.result.informacoesParticipante[0].salario_participante,
          cresc_real_sal: formData.cresc_real_sal,
          contribuicao_participante: formData.contribuicao_participante,
          pensao: formData.pensao,
          antecipacao_beneficio: formData.antecipacao_beneficio,
          aporte: formData.aporte,
          estimativa_rent_entre: formData.estimativa_rent_entre,
          estimativa_rent_apos: formData.estimativa_rent_apos,
          renda_mensal: formData.renda_mensal,
          abono_anual: formData.abono_anual,
          saque_programado: formData.saque_programado,
          renda_mensal_vitalicia: formData.renda_mensal_vitalicia,
          dependentes_ir: formData.dependentes_ir,
          data_elegibilidade_prevista: $scope.data_elegibilidade_prevista,
          idade: formData.idade,
          mes_ano: formData.mes_ano,
          beneficiario: $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios
        }
      }

      $scope.submit = function (formData) {
        $rootScope.cache.formToBeneficiarios = {}
        $rootScope.cache.formToBeneficiarios = formData
        $rootScope.cache.routeParams = {}
        $rootScope.cache.routeParams.beneficiarios =
          $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios

        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $rootScope.cache.formSimulaRMVSP = formData

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: $scope.getParams(formData),
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              $ionicLoading.hide()

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $rootScope.cache.simulaRmvSp = resp.data.result
                  $state.go('simulacaormvsaqueprogramadoresultado')
                }
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('SimulacaoRmvSaqueProgramadoCtrl.resultado', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $scope.showChild = false

      $scope.formData = {}
      if (typeof $rootScope.cache.formSimulaRMVSP !== 'undefined') {
        $scope.formData = $rootScope.cache.formSimulaRMVSP
      } else if (typeof $rootScope.cache.formToBeneficiarios !== 'undefined') {
        $scope.formData = $rootScope.cache.formToBeneficiarios
      }
      $scope.data_elegibilidade_prevista =
        $rootScope.lastRequest.result.informacoesParticipante[0].data_elegibilidade_prevista
      $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios

      $scope.map = map
      $scope.value = $rootScope.cache.simulaRmvSp
      $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao
      $scope.texto_simulacao_rmv_saque = $rootScope.lastRequest.result['simuladorBeneficios'][0].desc_texto_hibrido

      $scope.toggleChild = function (key) {
        if ($scope.showChild) $scope.showChild = false
        else $scope.showChild = true
      }

      $scope.showChildC = false

      $scope.toggleChildC = function () {
        $scope.showChildC = !$scope.showChildC
      }
      $scope.getParams = function (formData) {
        if (typeof formData.mes_ano === 'undefined') {
          formData.mes_ano = ''
        }

        return {
          acao: 'simulaRmvSp',
          cod_fundo: $rootScope.lastRequest.result.dadosCadastrais[0].cod_fundo,
          cod_patrocinadora: $rootScope.lastRequest.result.dadosCadastrais[0].cod_patrocinadora,
          matricula: $rootScope.lastRequest.result.informacoesParticipante[0].matricula,
          cod_plano: $rootScope.lastRequest.result.dadosCadastrais[0].cod_plano,
          admissao_patroc: $rootScope.lastRequest.result.dadosCadastrais[0].admissao_patroc,
          data_nascimento: $rootScope.lastRequest.result.dadosCadastrais[0].data_nascimento,
          sexo: $rootScope.lastRequest.result.dadosCadastrais[0].sexo,
          tipo_reajuste: formData.tipo_reajuste,
          salario_participante: $rootScope.lastRequest.result.informacoesParticipante[0].salario_participante,
          cresc_real_sal: formData.cresc_real_sal,
          contribuicao_participante: formData.contribuicao_participante,
          pensao: formData.pensao,
          antecipacao_beneficio: formData.antecipacao_beneficio,
          aporte: formData.aporte,
          estimativa_rent_entre: formData.estimativa_rent_entre,
          estimativa_rent_apos: formData.estimativa_rent_apos,
          renda_mensal: formData.renda_mensal,
          abono_anual: formData.abono_anual,
          saque_programado: formData.saque_programado,
          renda_mensal_vitalicia: formData.renda_mensal_vitalicia,
          dependentes_ir: formData.dependentes_ir,
          data_elegibilidade_prevista: $scope.data_elegibilidade_prevista,
          idade: formData.idade,
          mes_ano: formData.mes_ano,
          beneficiario: $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios
        }
      }
      $scope.submit = function (formData) {
        $scope.matricula = $rootScope.lastRequest.result

        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: $scope.getParams(formData),
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $rootScope.cache.formSimulaRMVSP = $scope.formData
                  $rootScope.cache.formToBeneficiarios = $scope.formData
                  $rootScope.cache.simulaRmvSp = resp.data.result
                  $state.reload()
                }
              }

              $ionicLoading.hide()
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }

      // depois de listar (ou não) os beneficiários, "resetar as configs de beneficiários"
      $rootScope.resetBeneficiarios = true
    }
  ])
  .controller('AlteracaoPercentualRetiradaCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $scope.formData = {}
      $scope.formData.dependentes_ir = $rootScope.lastRequest.result['simuladorBeneficios'][0].dependentes_para_fins_ir
      $scope.formData.percentual_renda_mensal = $rootScope.lastRequest.result['simuladorBeneficios'][0].percentual_saque.replace(/,/g, '.') // prettier-ignore

      $scope.matricula = $rootScope.lastRequest.result
      $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao
      if ('lastFormAlteracaoRVM' in $rootScope.cache) {
        $scope.formData = $rootScope.cache.lastFormAlteracaoRVM
      }

      $scope.submit = function (formData) {
        $rootScope.cache.lastFormAlteracaoRVM = {}
        $rootScope.cache.lastFormAlteracaoRVM = formData

        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              acao: 'simulaBeneficioSP',
              cod_fundo: $scope.matricula.dadosCadastrais[0].cod_fundo,
              cod_patrocinadora: $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
              matricula: $scope.matricula.informacoesParticipante[0].matricula,
              cod_plano: $scope.matricula.dadosCadastrais[0].cod_plano,
              data_nascimento: $scope.matricula.dadosCadastrais[0].data_nascimento,
              renda_mensal: formData.percentual_renda_mensal,
              estimativa_rent_anual: formData.estimativa_rentabilidade,
              dependentes_ir: formData.dependentes_ir,
              abono_anual: formData.abono
            },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $rootScope.lastRequest.result.simulaBeneficioSP = resp.data.result
                  $state.go('alteracaopercentualretiradaresultado')
                }
              }

              $ionicLoading.hide()
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('AlteracaoPercentualRetiradaCtrl.resultado', [
    '$scope',
    '$state',
    '$http',
    '$rootScope',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $http, $rootScope, $ionicLoading, $ionicPopup) {
      $scope.value = $rootScope.lastRequest.result.simulaBeneficioSP

      $scope.matricula = $rootScope.lastRequest.result
      $scope.value.texto_alteracao_percentual_retirada =
        $rootScope.lastRequest.result['simuladorBeneficios'][0].desc_texto_benf_saque

      if ('lastFormAlteracaoRVM' in $rootScope.cache) {
        $scope.formData = $rootScope.cache.lastFormAlteracaoRVM
      }

      $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao

      $scope.submit = function (formData) {
        $rootScope.cache.lastFormAlteracaoRVM = {}
        $rootScope.cache.lastFormAlteracaoRVM = formData

        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              acao: 'simulaBeneficioSP',
              cod_fundo: $scope.matricula.dadosCadastrais[0].cod_fundo,
              cod_patrocinadora: $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
              matricula: $scope.matricula.informacoesParticipante[0].matricula,
              cod_plano: $scope.matricula.dadosCadastrais[0].cod_plano,
              data_nascimento: $scope.matricula.dadosCadastrais[0].data_nascimento,
              renda_mensal: formData.percentual_renda_mensal,
              estimativa_rent_anual: formData.estimativa_rentabilidade,
              dependentes_ir: formData.dependentes_ir,
              abono_anual: formData.abono
            },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $rootScope.lastRequest.result.simulaBeneficioSP = resp.data.result
                  $state.reload()
                }
              }

              $ionicLoading.hide()
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('SimulacaoRmvAposentadoCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $scope.formData = {}
      $scope.matricula = $rootScope.lastRequest.result
      $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao

      // $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
      // $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
      // delete $scope.tipoReajuste.DEFAULT;

      $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0])
      // pega o valor default
      $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0]

      // remove default do tipo de reajuste
      delete $scope.tipoReajuste.DEFAULT

      // seta o valor do form como o default do ws.
      $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT

      // se existe lastForm
      if (typeof $rootScope.cache.lastFormAposentadoRVM !== 'undefined') {
        // se mes ano ta preenchido
        if (typeof $rootScope.cache.lastFormAposentadoRVM.mes_ano !== 'undefined') {
          $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
        }

        if (typeof $rootScope.cache.lastFormAposentadoRVM.idade !== 'undefined') {
          $scope.formData.mes_ano = ''
        }
      }

      $scope.formData.dependentes_ir = $rootScope.lastRequest.result['simuladorBeneficios'][0].dependentes_para_fins_ir

      // if ('lastFormAposentadoRVM' in $rootScope.cache) {
      //   $scope.formData = $rootScope.cache.lastFormAposentadoRVM;
      // }
      $scope.goBeneficiarios = function (formData) {
        $rootScope.cache.formToBeneficiarios = {}
        $rootScope.cache.formToBeneficiarios = formData
        $rootScope.cache.routeToBeneficiarios = 'simulacaormvaposentadoresultado'
        $rootScope.cache.routeParams = $scope.getParams(formData)
        $state.go('simulacaorendamensalvitaliciabeneficiarios')
      }
      $scope.getParams = function (formData) {
        if (typeof formData.mes_ano === 'undefined') {
          formData.mes_ano = ''
        }

        return {
          acao: 'simulaAlteracaoRMV',
          cod_fundo: $scope.matricula.dadosCadastrais[0].cod_fundo,
          cod_patrocinadora: $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
          matricula: $scope.matricula.informacoesParticipante[0].matricula,
          cod_plano: $scope.matricula.dadosCadastrais[0].cod_plano,
          data_nascimento: $scope.matricula.dadosCadastrais[0].data_nascimento,
          tipo_reajuste: formData.tipo_reajuste,
          percentual_de_renda_mensal: '0',
          pensao: formData.pensao,
          dependentes_ir: formData.dependentes_ir
        }
      }
      $scope.submit = function (formData) {
        $rootScope.cache.formToBeneficiarios = {}
        $rootScope.cache.formToBeneficiarios = formData
        $rootScope.cache.lastFormAposentadoRVM = {}
        $rootScope.cache.lastFormAposentadoRVM = formData

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: $scope.getParams(formData),
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              $rootScope.errorMsg = resp.data.msg
              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                } else {
                  $rootScope.cache.routeParams = $scope.getParams(formData)
                  $rootScope.cache.routeParams.beneficiarios =
                    $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios

                  $rootScope.cache.simulaRMV = resp.data.result
                  $rootScope.lastRequest.result.simulaAlteracaoRMV = resp.data.result
                  $state.go('simulacaormvaposentadoresultado')
                }
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('SimulacaoRmvAposentadoCtrl.resultado', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope, $state, $rootScope) {
      if (typeof $rootScope.cache.simulaRMV !== 'undefined') {
        $scope.value = $rootScope.cache.simulaRMV
      }
      if (typeof $rootScope.cache.simulaRMV !== 'undefined') {
        $scope.value = $rootScope.cache.simulaRMV
      }
      $scope.value.pensao = $rootScope.cache.formToBeneficiarios.pensao

      $scope.map = map

      $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios

      $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao
      // add o texto de alyteracao rmv aposentado
      $scope.texto_alteracao_rmv_aposentado = $rootScope.lastRequest.result['simuladorBeneficios'][0].desc_texto_rmv

      $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao

      // depois de listar (ou não) os beneficiários, "resetar as configs de beneficários"
      $rootScope.resetBeneficiarios = true
    }
  ])
  .controller('AlteracaoRmvSaqueCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $scope.formData = {}
      $scope.formData.dependentes_ir = $rootScope.lastRequest.result['simuladorBeneficios'][0].dependentes_para_fins_ir
      $scope.formData.renda_mensal = $rootScope.lastRequest.result['simuladorBeneficios'][0].percentual_saque.replace(
        /,/g,
        '.'
      )

      $scope.cod_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].cod_opcao_tributacao
      // if ($rootScope.cache.formRecalcular){
      //   $scope.formData = $rootScope.cache.formRecalcular;
      // }
      $scope.matricula = $rootScope.lastRequest.result

      // $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0].DEFAULT;
      // $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0]);
      // delete $scope.tipoReajuste.DEFAULT;

      $scope.tipoReajuste = angular.copy($rootScope.lastRequest.result.tipoReajuste[0])
      // pega o valor default
      $scope.tipoReajusteDefault = $rootScope.lastRequest.result.tipoReajuste[0]

      // remove default do tipo de reajuste
      delete $scope.tipoReajuste.DEFAULT

      // seta o valor do form como o default do ws.
      $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT

      // se existe lastForm
      if (typeof $rootScope.cache.formRecalcular !== 'undefined') {
        // se mes ano ta preenchido
        if (typeof $rootScope.cache.formRecalcular.mes_ano !== 'undefined') {
          $scope.formData.idade = parseInt($rootScope.lastRequest.result.informacoesParticipante[0].idade_prev_apo)
        }

        if (typeof $rootScope.cache.formRecalcular.idade !== 'undefined') {
          $scope.formData.mes_ano = ''
        }
      }

      $scope.goBeneficiarios = function (formData) {
        $rootScope.cache.formToBeneficiarios = {}
        $rootScope.cache.formToBeneficiarios = formData
        $rootScope.cache.routeToBeneficiarios = 'alteracaormvsaqueresultado'
        $rootScope.cache.routeParams = $scope.getParams(formData)
        $state.go('simulacaorendamensalvitaliciabeneficiarios')
      }

      $scope.getParams = function (formData) {
        return {
          acao: 'simulaBeneficioRmvSp',
          cod_fundo: $scope.matricula.dadosCadastrais[0].cod_fundo,
          cod_patrocinadora: $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
          matricula: $scope.matricula.informacoesParticipante[0].matricula,
          cod_plano: $scope.matricula.dadosCadastrais[0].cod_plano,
          data_nascimento: $scope.matricula.dadosCadastrais[0].data_nascimento,
          tipo_reajuste: formData.tipo_reajuste,
          renda_mensal: formData.renda_mensal,
          percentual_rmv: formData.renda_mensal_vitalicia,
          percentual_saque: formData.saque_programado,
          estimativa_rent_apos: formData.estimativa_rent_apos,
          pensao: formData.pensao,
          abono_anual: formData.abono_anual,
          dependentes_ir: formData.dependentes_ir
        }
      }
      $scope.submit = function (formData) {
        // aqui tem.
        $rootScope.cache.formToBeneficiarios = {}
        $rootScope.cache.formToBeneficiarios = formData
        $ionicLoading.show()
        $rootScope.cache.formRecalcular = formData

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: $scope.getParams(formData),
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              // nao tem formdata aqui ()aqui nao tem escopo. tem que pegar do $scope.
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              $ionicLoading.hide()

              $rootScope.errorMsg = resp.data.msg

              // inserir o percentual do saque no json
              resp.data.result.percentual_saque = formData.saque_programado
              resp.data.result.percentual_rmv = formData.renda_mensal_vitalicia

              if (!resp.data.success) {
                $rootScope.errorMsg = resp.data.msg
                $state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  $rootScope.errorMsg = resp.data.msg
                } else {
                  $rootScope.cache.routeParams = $scope.getParams(formData)
                  $rootScope.cache.routeParams.beneficiarios =
                    $rootScope.lastRequest.result['simuladorBeneficios'][0].beneficiarios
                  $rootScope.cache.simulaRmvSp = resp.data.result
                  $rootScope.lastRequest.result.simulaBeneficioRmvSp = resp.data.result
                  $state.go('alteracaormvsaqueresultado')
                }
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('AlteracaoRmvSaqueCtrl.resultado', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $scope.matricula = $rootScope.lastRequest.result

      if (typeof $rootScope.cache.routeParams !== 'undefined') {
        $scope.formData = $rootScope.cache.routeParams
        $scope.value = $rootScope.cache.simulaRmvSp
        $scope.value.pensao = $rootScope.cache.routeParams.pensao
      }

      $scope.map = map

      $scope.beneficiarios = $rootScope.cache.routeParams.beneficiarios
      // $scope.value = $rootScope.lastRequest.result.simulaBeneficioRmvSp;
      $scope.desc_opcao_tributacao = $rootScope.lastRequest.result.informacoesParticipante[0].desc_opcao_tributacao
      $scope.texto_alteracao_rmv_saque =
        $rootScope.lastRequest.result['simuladorBeneficios'][0].desc_texto_alteracao_hibrido

      $scope.submit = function (formData) {
        $ionicLoading.show()
        $rootScope.cache.formToBeneficiarios = formData

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              acao: 'simulaBeneficioRmvSp',
              cod_fundo: $scope.matricula.dadosCadastrais[0].cod_fundo,
              cod_patrocinadora: $scope.matricula.dadosCadastrais[0].cod_patrocinadora,
              matricula: $scope.matricula.informacoesParticipante[0].matricula,
              cod_plano: $scope.matricula.dadosCadastrais[0].cod_plano,
              data_nascimento: $scope.matricula.dadosCadastrais[0].data_nascimento,
              tipo_reajuste: $rootScope.cache.formRecalcular.tipo_reajuste,
              renda_mensal: $rootScope.cache.formRecalcular.renda_mensal,
              percentual_rmv: $rootScope.cache.formRecalcular.renda_mensal_vitalicia,
              percentual_saque: $rootScope.cache.formRecalcular.saque_programado,
              estimativa_rent_apos: $scope.formData.estimativa_rent_apos,
              pensao: $rootScope.cache.formRecalcular.pensao,
              abono_anual: $rootScope.cache.formRecalcular.abono_anual,
              dependentes_ir: $rootScope.cache.formRecalcular.dependentes_ir
            },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s

              $ionicLoading.hide()

              $rootScope.errorMsg = resp.data.msg

              // inserir o percentual do saque no json
              resp.data.result.percentual_saque = $rootScope.cache.formRecalcular.saque_programado
              resp.data.result.percentual_rmv = $rootScope.cache.formRecalcular.renda_mensal_vitalicia

              if (!resp.data.success) {
                $state.go('signin')
              } else {
                $ionicLoading.hide()
                $rootScope.lastRequest.result.simulaBeneficioRmvSp = resp.data.result
                $rootScope.cache.simulaRmvSp = resp.data.result
                $state.reload()
              }
            },
            function (err) {
              console.error(err)
              $ionicLoading.hide()
              $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }

      // depois de listar (ou não) os beneficiários, "resetar as configs de beneficários"
      $rootScope.resetBeneficiarios = true
    }
  ])
  .controller('SimulacaoResgateNovoCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {}])
  .controller('SaldoContasCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {}])
  .controller('DocConcessao', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicPopup',
    '$ionicLoading',
    function (scope, state, rootScope, http, ionicPopup, ionicLoading) {
      var docConcessao = angular.copy(rootScope.lastRequest.result.documentosConcessao[0])
      var dadosCadastrais = rootScope.lastRequest.result.dadosCadastrais[0]
      var consultaEmprestimo = rootScope.lastRequest.result.consultaEmprestimo[0]
      var informacoesParticipante = rootScope.lastRequest.result.informacoesParticipante[0]

      var contrato = consultaEmprestimo.contrato

      scope.docConcessao = Object.assign(docConcessao, rootScope.cache.docConcessao || {})
      scope.docConcessao.contrato = contrato ? ' (Contrato: ' + contrato + ')' : ''

      scope.docConcessao.statusDocumentoConcessao = scope.docConcessao.statusDocumentoConcessao.map(function (value) {
        return '<h4>' + value.formulario + '</h4>' + value.status + '<hr>'
      })

      scope.submit = function () {
        var docConcessaoModified = Array.prototype.reduce.call(
          document.getElementsByTagName('input'),
          function (obj, inputElem) {
            if (inputElem.dataset.type) {
              obj[inputElem.dataset.type] = inputElem.value
            }
            return obj
          },
          {}
        )

        Object.assign(docConcessao, docConcessaoModified)

        if (!rootScope.cache) rootScope.cache = {}

        var param = (rootScope.cache.docConcessao = {
          acao: 'enviarDocumentosConcessao',
          matricula: informacoesParticipante.matricula,
          cod_fundo: dadosCadastrais.cod_fundo,
          cod_emprestimo: docConcessao.cod_emprestimo,
          contratoComDps: rootScope.cache.contratoComDps || 'N',
          dc_estado_civil: docConcessao.dc_estado_civil,
          dc_nacionalidade: docConcessao.dc_nacionalidade,
          cod_patrocinadora: dadosCadastrais.cod_patrocinadora,
          dc_ramo_atividade: docConcessao.dc_ramo_atividade,
          dc_numero_telefone: docConcessao.dc_numero_telefone,
          dc_orgao_expedidor: docConcessao.dc_orgao_expedidor,
          dc_descricao_cargo: docConcessao.dc_descricao_cargo,
          dc_numero_identidade: docConcessao.dc_numero_identidade,
          dc_data_emissao_identidade: docConcessao.dc_data_emissao_identidade
        })

        if (docConcessao.exibePaginaCttDps === 'S') {
          return state.go('emprestimodocumentosconcessaoaviso')
        }

        http
          .post(urlBase + ';jsessionid=' + rootScope.lastRequest.login.s, {
            param: param,
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              ionicLoading.hide()

              // TODO: Debug, remove in production

              if (!resp.data.success) {
                rootScope.errorMsg = resp.data.msg
                state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  rootScope.errorMsg = resp.data.msg
                }
              }
            },
            function () {
              ionicLoading.hide()
              ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('DocConcessaoAviso', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicPopup',
    '$ionicLoading',
    function (scope, state, rootScope, http, ionicPopup, ionicLoading) {
      scope.submit = function (event) {
        event.preventDefault()
        var docConcessaoAvisoSelect = document.getElementById('docConcessaoAvisoSelect')

        rootScope.cache.docConcessao.contratoComDps =
          docConcessaoAvisoSelect.options[docConcessaoAvisoSelect.selectedIndex].value || 'N'

        http
          .post(urlBase + ';jsessionid=' + rootScope.lastRequest.login.s, {
            param: rootScope.cache.docConcessao,
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              ionicLoading.hide()

              if (!resp.data.success) {
                rootScope.errorMsg = resp.data.msg
                state.go('signin')
              } else {
                if (resp.data.msg.length > 0) {
                  rootScope.errorMsg = resp.data.msg
                } else {
                  state.go('emprestimodocumentosconcessao')
                }
              }
            },
            function () {
              ionicLoading.hide()
              ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutMsg
              })
            }
          )
      }
    }
  ])
  .controller('PreferenciasCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicPopup',
    '$ionicLoading',
    function (scope, state, rootScope, http, ionicPopup, ionicLoading) {
      scope.settingsList = []

      var touchId = window.localStorage.getItem('touchId')
      var matricula = rootScope.lastRequest.result.informacoesParticipante[0].matricula
      var dadosCadastrais = rootScope.lastRequest.result.dadosCadastrais[0]
      var toggle = {
        text: 'TouchID',
        checked: touchId === 'SIM',
        action: function () {
          var checked = toggle.checked
          var touchId = checked ? 'SIM' : 'NUNCA'
          return http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: {
                acao: 'cadastrarTouchId',
                imei: (((window.device && window.device.uuid) || uuid()) + '').slice(0, 256),
                fundo: dadosCadastrais.cod_fundo,
                touch_ID: touchId,
                matricula: matricula,
                patrocinadora: dadosCadastrais.cod_patrocinadora
              },
              login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
            })
            .then(function (resp) {
              userInfo.u = resp.data.login.u
              userInfo.s = resp.data.login.s
              checkIfServerAnswerIsValid(resp)

              if (!(checked && window.plugins && window.plugins.touchid)) return

              // cadastra KID no keychain do aparelho
              return new Promise(function (resolve, reject) {
                window.plugins.touchid.save(
                  'FingerPrintAuth_telosPrevMobile',
                  JSON.stringify({
                    k: retrieve(retrieve(retrieve(resp, 'data'), 'result'), 'k'),
                    cpf: userInfo.cpf
                  }),
                  false,
                  resolve,
                  reject
                )
              })
            })
            .then(function () {
              window.localStorage.setItem('touchId', touchId)
              ionicLoading.hide()
              ionicPopup.alert({
                title: 'Sucesso',
                template:
                '<p style="color: lightgreen">O login com digital ' +
                (checked ? 'está ativo.' : 'foi desativado.') +
                '</p>'
              })
            })
            .catch(function (err) {
              console.error(err.stack + '')
              ionicLoading.hide()
              ionicPopup.alert({
                title: 'Falha',
                template: '<p style="color: lightcoral">Error ao ativar o login pela digital.</p>'
              })
            })
        }
      }

      if (window.plugins && window.plugins.touchid) {
        console.log('TouchID Enabled')
        new Promise(
          function (resolve, reject) {
            window.plugins.touchid.has('FingerPrintAuth_telosPrevMobile', resolve, reject)
          }
        )
          .then(function () {
            scope.settingsList.push(toggle)
          })
      }
    }
  ])

angular
  .module('starter.Directives', [])
  .directive('browseTo', function ($ionicGesture) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        var handleTap = function () {
          window.open(encodeURI($attrs.browseTo), '_system')
        }

        var tapGesture = $ionicGesture.on('tap', handleTap, $element)
        $scope.$on('$destroy', function () {
          // Clean up - unbind drag gesture handler
          $ionicGesture.off(tapGesture, 'tap', handleTap)
        })
      }
    }
  })
  .directive('compile', [
    '$compile',
    function ($compile) {
      return function (scope, element, attrs) {
        scope.$watch(
          function (scope) {
            return scope.$eval(attrs.compile)
          },
          function (value) {
            element.html(value)
            $compile(element.contents())(scope)
          }
        )
      }
    }
  ])
