// cordova.exec.setJsToNativeBridgeMode(cordova.exec.jsToNativeModes.XHR_NO_PAYLOAD);
'use strict'

var map, urlBase, inspect, angular, cordova, stageMap, userInfo, globalPopup, timeoutErrorMsg, defaultErrorMessage

// Cache de algumas propriedades da window
inspect = window.inspect
angular = window.angular
cordova = window.cordova




// URL Base para conexão aos servidor TELOS
// TELOS Produção
// urlBase = 'https://telosmobile.fundacaotelos.com.br/prevmobile-ws/rest/acesso/padrao'
// TELOS Homologação
//urlBase = 'http://telosmobile.fundacaotelos.com.br:8989/prevmobile-ws/rest/acesso/padrao'
// MESTRA 
urlBase = 'http://www.sysprev.com.br/prevmobile-ws/rest/acesso/padrao'

// Variaveis Globais
map = {
  vinculo: { V: 'Vitalício', I: 'Indicado', T: 'Temporário' },
  sexo: { M: 'Masculino', F: 'Feminino' },
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
stageMap = {}
userInfo = {}
timeoutErrorMsg = 'Rede indisponível'
defaultErrorMessage = 'Erro ao conectar com o servidor. Tente novamente mais tarde'

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

/* === ANGULAR CONTROLLERS === */
window.controller = angular
  .module('starter.controller', ['ionic', 'angular-datepicker', 'ngMask', 'ngSanitize'])
  .controller('topMenu', function ($scope, $ionicHistory, $rootScope) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      $scope.isNotHome = !(
        toState['name'] === 'menu' ||
        toState['name'] === 'signin' ||
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
        toState['name'] === 'signin' ||
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
    '$timeout',
    '$ionicLoading',
    '$ionicPopup',
    '$ionicModal',
    function ($scope, $state, $rootScope, $http, $timeout, $ionicLoading, $ionicPopup, $ionicModal) {
      var result, matricula, touchId, localTouchId, dadosCadastrais
      result = retrieve($rootScope, 'lastRequest', 'result')
      matricula = retrieve(result, 'informacoesParticipante', 'matricula')
      localTouchId = window.localStorage.getItem('touchId')
      dadosCadastrais = retrieve(result, 'dadosCadastrais')

      $scope.stageMap = stageMap

      $scope.goDocConcessao = function (event) {
        var critica = retrieve(result, 'documentosConcessao', 'critica_documento_concessao')
        if (critica) {
          event.preventDefault()
          globalPopup = $ionicPopup.alert({
            title: 'Documentos de Concessão',
            template: critica
          })
        }
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
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: { acao: 'logout' },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function () {
              stageMap = {}
              userInfo = {}
              $rootScope.cache = {}
              $rootScope.lastRequest = {}
              $rootScope.beneficiariosOriginal = undefined
              $ionicLoading.hide()

              $state.go('signin')
            },
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
              })
            }
          )
      }

      // Cadastro do TouchID
      touchId = localTouchId || 'NAO'
      console.log('touchId: ' + touchId);
      // console.log('Menu TouchId State: ' + touchId)
      // Se estivermos em um ambiente mobile e o TouchID não tiver sido definido ainda...
      // && ionic.Platform.device().model !== "iPhone10,6" && ionic.Platform.device().model !== "iPhone10,3"
        if (cordova && window.plugins.touchid && touchId === 'NAO'){
        console.log(ionic.Platform.device().model)  
        console.log('oferecer touchid auth primeiro passo');
        new Promise(function (resolve, reject) {
          // Verificamos se o telefone tem leitor de biometria
          console.log('antes de verificar');
          window.plugins.touchid.isAvailable(function (tipo) {
            console.log(tipo)
            console.log('tem biometria');
             $ionicModal.fromTemplateUrl('templates/modal/touchId-cadastro.html', {
                  scope: $scope,
                  animation: 'slide-in-up'
               }).then(function(modal) {
                  $scope.modal = modal;
               });
              
               $scope.openModal = function() {
                  console.log('captou')
                  $scope.modal.show();
                  return false;
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

                //$timeout($scope.openModal, 600);


            resolve(
              // Perguntamos se o usuário quer cadastrar a biometria
              (
              globalPopup = $ionicPopup.show({
                title: 'Você deseja ativar o login usando sua biometria?',
                buttons: [
                  { text: 'Não', type: 'button-negative', onTap: function () { $ionicLoading.hide(); return false } }, // prettier-ignore
                  { text: '<b>Sim</b>', type: 'button-positive', onTap: function () { return true } } // prettier-ignore
                ]
              })
              )
              // function() {
              //   //$scope.openModal;
              //   return true;
              // }
            )
          }, reject)
        })
          .then(function (touchId) {
            if (typeof touchId === 'undefined') throw new Error('Usuario está deslogado')

            $ionicLoading.show()
            touchId = touchId ? 'SIM' : 'NUNCA'

            console.log('localTouchId: '+localTouchId);
            console.log('touchId: '+touchId);

            // Se tudo estiver consistente continuamos
            if (!(localTouchId === '' && touchId)) return touchId

            /**
             * Se o login do TouchID tiver falhado ou no caso de inconsistencia com a configuração local e do servidor
             * fazemos um request resetando a configuração do servidor
             */
            return $http
              .post(urlBase + ';jsessionid=' + userInfo.s, {
                param: {
                  acao: 'cadastrarTouchId',
                  imei: uuid(),
                  fundo: dadosCadastrais.cod_fundo,
                  touch_ID: 'NAO',
                  matricula: matricula,
                  patrocinadora: dadosCadastrais.cod_patrocinadora
                },
                login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
              })
              .then(function (resp) {
                $ionicLoading.hide()
                checkIfServerAnswerIsValid(resp)
                return touchId
              })
          })
          .then(function (touchId) {
            // Request para o servidor com as novas configurações do TouchID
            return $http
              .post(urlBase + ';jsessionid=' + userInfo.s, {
                param: {
                  acao: 'cadastrarTouchId',
                  imei: uuid(),
                  fundo: dadosCadastrais.cod_fundo,
                  touch_ID: touchId,
                  matricula: matricula,
                  patrocinadora: dadosCadastrais.cod_patrocinadora
                },
                login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
              })
              .then(function (resp) {
                checkIfServerAnswerIsValid(resp)

                // cadastra KID no keychain do aparelho
                return new Promise(function (resolve, reject) {
                  /*
                   * Se o usuario quiser touchID, salvamos o KID no keychain do aparelho, caso contrario, removemos o
                   * mesmo do keychain
                   */
                  if (touchId === 'SIM') {
                    console.log('chegou no save');
                    window.plugins.touchid.save(
                      'FingerPrintAuth_telosPrevMobile',
                      JSON.stringify({ k: retrieve(resp, 'data', 'result', 'k'), cpf: userInfo.cpf }),
                      function(){
                        console.log('callback salvou');
                        // Salvamos localmente a nova configuração do TouchID
                        console.log('salva localmente');
                        window.localStorage.setItem('touchId', touchId)
                        $ionicLoading.hide()
                        globalPopup = $ionicPopup.alert({
                          title: 'Sucesso',
                          template:
                            '<p style="color: lightgreen">' +
                              'O login com biometria foi ' + (touchId === 'SIM' ? 'ativado' : 'desativado') + '.' +
                            '</p>' // prettier-ignore
                        })
                      },
                      resolve,
                      reject
                    )
                    console.log('salvou');
                    $ionicLoading.hide()
                    return true;
                  } else {
                    window.plugins.touchid.delete('FingerPrintAuth_telosPrevMobile', resolve)
                  }
                })
              })
              .then(function () {
                // // Salvamos localmente a nova configuração do TouchID
                console.log('salva localmente');
                window.localStorage.setItem('touchId', touchId)
                $ionicLoading.hide()
                // globalPopup = $ionicPopup.alert({
                //   title: 'Sucesso',
                //   template:
                //     '<p style="color: lightgreen">' +
                //       'O login com biometria foi ' + (touchId === 'SIM' ? 'ativado' : 'desativado') + '.' +
                //     '</p>' // prettier-ignore
                // })
                // console.log('enrou na tela de sucesso');
              })
              .catch(function () {
                // console.error(inspect(error))
                $ionicLoading.hide()
                globalPopup = $ionicPopup.alert({
                  title: 'Falha',
                  template: '<p style="color: lightcoral">Error ao ativar o login pela biometria.</p>'
                })
              })
          })
          .catch(function () {
            // console.error(inspect(error))
          })
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
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: {
              cpf: userInfo.cpf,
              acao: 'dados',
              cod_fundo: $scope.matriculas[item].cod_fundo,
              matricula: $scope.matriculas[item].matricula,
              cod_patrocinadora: $scope.matriculas[item].cod_patrocinadora
            },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .catch(
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
              })
            }
          )
          .then(
            function (resp) {
              var dados, result, dadosView

              $ionicLoading.hide()
              checkIfServerAnswerIsValid(resp)

              $rootScope.lastRequest = retrieve(resp, 'data')

              result = retrieve($rootScope.lastRequest, 'result')
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
                return
              }

              $state.go('menu')
            }
          ).catch(function (error) {
            $rootScope.errorMsg = error.message
            if (error.isLoginError) $state.go('signin')
          })
      }
    }
  ])


  .controller('touchId', [
    '$scope',
    '$state',
    '$http',
    '$rootScope',
    '$timeout',
    '$ionicLoading',
    '$ionicModal',
    function ($scope, $state, $http, $rootScope, $timeout, $ionicLoading, $ionicModal) {




      /**
       * Início do projeto de modal para TouchID
       */

  $ionicModal.fromTemplateUrl('templates/modal/touchId.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });
  
   $scope.openModal = function() {
      console.log('abriu modal');
      console.log('aqui');
      
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

   console.log('localStorage.touchId: ' + window.localStorage.getItem('touchId'));
  var localTouchId = window.localStorage.getItem('touchId') || 'NAO';
      
  //   // Login TouchID
  if (window.plugins && window.plugins.touchid && localTouchId === 'SIM') {
    // $timeout($scope.openModal, 600);
  }else {
    console.log('não tem touchid neste aparelho');
  }

  

}])


  .controller('signin', [
    '$scope',
    '$state',
    '$http',
    '$rootScope',
    '$timeout',
    '$ionicLoading',
    '$ionicModal',
    function ($scope, $state, $http, $rootScope, $timeout, $ionicLoading, $ionicModal) {
      var localTouchId

      // We got redirect because of a error
      console.log($rootScope.errorMsg, userInfo.u, userInfo.s)
      if ($rootScope.errorMsg && userInfo.u && userInfo.s) {
        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: { acao: 'logout' },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(function () {
            stageMap = {}
            userInfo = {}
            $rootScope.cache = {}
            $rootScope.lastRequest = {}
            $rootScope.beneficiariosOriginal = undefined
            $ionicLoading.hide()
          })
      }

      $scope.labelMessage = "Preencha seus dados pessoais para entrar";
      $scope.placeholderPassMessage = "Digite sua senha";

      if(window.plugins && window.plugins.touchid && localTouchId === 'SIM') {
        $scope.labelMessage = "Preencha seus dados pessoais ou toque no sensor para entrar";
        $scope.placeholderPassMessage = "Digite sua senha ou toque no sensor";
      }

      /**
       * Lida com o resultado da requisição de login, seja ela com TouchID ou Normal
       * @param request
       * @param cpf
       * @param modoLogin - descreve se o login será feito com touchId(após digitar o cpf completo) ou com cpf e senha, onde 
       * "login-por-form" loga com cpf e senha e "login-por-biometria", utiliza a biometria do aparelho
       */
      function loginPostAction (request, cpf) {
        return request
          .catch(function () {
            // console.error(inspect(error))
            throw new Error(defaultErrorMessage)
          })
          .then(function (resp) {
            var dados, result, touchId, dadosView, beneficiarios

            $ionicLoading.hide()
            checkIfServerAnswerIsValid(resp)

            userInfo.cpf = cpf
            $scope.formData = {}
            $rootScope.cache = {}
            $rootScope.lastRequest = retrieve(resp, 'data')

            result = retrieve($rootScope.lastRequest, 'result')
            touchId = retrieve(result, 'preferencias', 'touch_ID')
            window.localStorage.setItem('touchId', localTouchId !== touchId && touchId === 'SIM' ? '' : touchId)

            if (result['simuladorBeneficios']) {
              beneficiarios = retrieve(result, 'simuladorBeneficios')['beneficiarios']
              beneficiarios = (Array.isArray(beneficiarios) && beneficiarios) || [beneficiarios]
              beneficiarios.forEach(function (beneficiario) {
                beneficiario['checked'] = true
                beneficiario['selecionado'] = 'S'
              })
            }

            if (result['matriculas']) {
              // Possui mais de uma matrícula e ainda não escolheu qual será carregada
              $state.go('splitmatriculas')
              return
            }

            dadosView = retrieve(result, 'dadosView')
            for (dados in dadosView) {
              if (dadosView.hasOwnProperty(dados)) {
                // Define quais telas serão mostradas para o usuário
                stageMap[dados] = dadosView[dados]
              }
            }

            console.log(result['termo_de_uso'])
            if (result['termo_de_uso']) {
              // Ainda não aceitou os termos de uso
              $state.go('termosdeuso')
              return
            }
            $state.go('menu')
          })
          .catch(function (error) {
            $ionicLoading.hide()
            $rootScope.errorMsg = "CPF não vinculado a biometria."
          })
      }

      $scope.formData = {}
      $scope.loginWithTouchId = 0

      localTouchId = window.localStorage.getItem('touchId') || 'NAO'
      // console.log('SignIn TouchId State: ' + localTouchId)

      // Clear any old popup or loading
      if (globalPopup) globalPopup.close()
      $ionicLoading.hide()

      // Login TouchID
      $scope.loginPorBiometria = function() {
        var cpf = this.formData.cpf;

        //Este if verifica se o usuário digitou 11 digitos no CPF, caso sim, chamamos o WS verificarBiometria para verificar se o CPF digitado
        //possui biometria no banco de dados, caso sim, o app entra no if abaixo e vai requisitar o uso da biometria
        if (cpf.length === 11) {
          console.log("vai verificar se o usuário possui biometria cadastrada no banco.")
        
          $http.post(urlBase, {
                param: {
                  cpf: cpf, 
                  acao: 'verificarBiometria'
                },
                login: { u: '', s: '' }
          }).then(function (response) {
            var resposta = retrieve(retrieve(retrieve(response, "data"), "result"), "resposta");

            if (resposta === "OK") {
                console.log("a resposta sobre a verificação biometrica foi : " + resposta + ". O aplicativo deve requisitar biometria.");
                ativarBiometria(cpf);
            } else {
              console.log("a resposta sobre a verificação biometrica foi : " + resposta + ". O aplicativo não deve requisitar biometria.");
            }
          })

        }
    }

    function ativarBiometria(cpf) {
      console.log("entrou nessa merda")
      if (window.plugins && window.plugins.touchid && localTouchId === 'SIM') {
        
        console.log('TouchID Enabled')

        new Promise(function (resolve, reject) {
          window.plugins.touchid.has(
            'FingerPrintAuth_telosPrevMobile',
            function () {
              $timeout(window.plugins.touchid.verify('FingerPrintAuth_telosPrevMobile', 'Use sua biometria para acessar', resolve), 800)
            },
            reject
          )
        })
          .then(function (auth) {
            console.log('Success retrieving key with TouchId')

            auth = JSON.parse(auth)
            if (!(auth.k && auth.cpf)) throw new Error('Invalid KID.') 

            stageMap = {}
            userInfo = {}
            $rootScope.lastRequest = {}

            $ionicLoading.show({
              content: 'Carregando',
              maxWidth: 300,
              showDelay: 0,
              animation: 'fade-in',
              showBackdrop: true
            })

            return loginPostAction(
              $http.post(urlBase, {
                param: {
                  k: auth.k,
                  imei: uuid(),
                  cpf: cpf, 
                  acao: 'autenticarTouchId'
                },
                login: { u: '', s: '' }
              })
            )
          })
          .catch(function (erro) {
            // console.error("Device kid isn't available, next time it will reset...")
            window.localStorage.setItem('touchId', '')
            $scope.errorMsg = "Erro ao tentar realizar login com biometria, tente mais tarde ou utilize sua senha."
          })
      } 
    }





      $scope.submit = function () {
        var formData = this.formData

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
        .catch(function () {
          // console.error(inspect(err))
          $ionicLoading.hide()
          globalPopup = $ionicPopup.alert({
            title: 'Falha de conexão',
            template: timeoutErrorMsg
          })
        })
        .then(function (resp) {
          checkIfServerAnswerIsValid(resp)
          $ionicLoading.hide()
          $scope.termosText = retrieve(resp, 'data', 'result', 'termo_de_uso', 'descricao_termo_uso')
        })
        .catch(function (error) {
          $rootScope.errorMsg = error.message
          if (error.isLoginError) $state.go('signin')
        })
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
        .post(urlBase + ';jsessionid=' + userInfo.s, {
          param: { acao: 'simulacaoResgate' },
          login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
        })
        .catch(
          function () {
            // console.error(inspect(err))
            $ionicLoading.hide()
            globalPopup = $ionicPopup.alert({
              title: 'Falha de conexão',
              template: timeoutErrorMsg
            })
          }
        )
        .then(
          function (resp) {
            $ionicLoading.hide()
            checkIfServerAnswerIsValid(resp)
            $scope.resgate = resp.data.result
            $ionicLoading.hide()
          }
        )
        .catch(function (error) {
          $rootScope.errorMsg = error.message
          if (error.isLoginError) $state.go('signin')
        })
    }
  ])

  .controller('aceitarTermos', [
    '$scope',
    '$state',
    '$rootScope',
    '$http',
    '$ionicLoading',
    '$ionicPopup',
    function ($scope, $state, $rootScope, $http, $ionicLoading, $ionicPopup) {
      $rootScope.erroMsg = ''

      $scope.aceitar = function () {
        $ionicLoading.show({
          content: 'Carregando',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 300,
          showDelay: 0
        })

        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: { aceite: true, acao: 'termoUso', cpf: userInfo.cpf },
            login: {
              u: userInfo.u,
              s: userInfo.s
            }
          })
          .catch(
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
              })
            }
          )
          .then(
            function (resp) {
              $ionicLoading.hide()
              checkIfServerAnswerIsValid(resp)
              $state.go('menu')
            }
          )
          .catch(function (error) {
            $rootScope.errorMsg = error.message
            if (error.isLoginError) $state.go('signin')
          })
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
          .post(urlBase + ';jsessionid=' + userInfo.s, {
            param: { acao: 'logout' },
            login: { u: userInfo.u, s: userInfo.s }
          })
          .catch(
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
              })
            }
          )
          .then(
            function () {
              $ionicLoading.hide()

              stageMap = {}
              userInfo = {}
              $rootScope.lastRequest = {}
              $rootScope.beneficiariosOriginal = undefined
              $state.go('signin')
            }
          )
          .catch(function (error) {
            $rootScope.errorMsg = error.message
            if (error.isLoginError) $state.go('signin')
          })
      }

      $scope.termosText = retrieve($rootScope, 'lastRequest', 'result', 'termo_de_uso', 'descricao_termo_uso')
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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
              function () {
                // console.error(inspect(err))
                $ionicLoading.hide()
                globalPopup = $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutErrorMsg
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
                  globalPopup = $ionicPopup.alert({
                    template: 'Enviado para ' + $rootScope.lastRequest.result.dadosCadastrais[0].email
                  })
                }
              }
            },
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
              function () {
                // console.error(inspect(err))
                $ionicLoading.hide()
                globalPopup = $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutErrorMsg
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
                    globalPopup = $ionicPopup.alert({
                      template: 'Enviado para ' + $rootScope.lastRequest.result.dadosCadastrais[0].email
                    })
                  }
                }
              },
              function () {
                // console.error(inspect(err))
                $ionicLoading.hide()
                globalPopup = $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutErrorMsg
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
            .catch(function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
              })
            })
            .then(function (resp) {
              $ionicLoading.hide()
              checkIfServerAnswerIsValid(resp)
              $rootScope.demonstrativoEmitido = resp.data.result
              $rootScope.errorMsg = false
              $rootScope.cache.data_pagamento = $scope.formData.data_pagamento
              $state.go('demonstrativoemitido')
            })
            .catch(function (error) {
              $rootScope.errorMsg = error.message
              if (error.isLoginError) $state.go('signin')
            })
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
              function () {
                // console.error(inspect(err))
                $ionicLoading.hide()
                globalPopup = $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutErrorMsg
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
          .catch(function () {
            // console.error(inspect(err))
            $ionicLoading.hide()
            globalPopup = $ionicPopup.alert({
              title: 'Falha de conexão',
              template: timeoutErrorMsg
            })
          })
          .then(function (resp) {
            userInfo.u = resp.data.login.u
            userInfo.s = resp.data.login.s
            $ionicLoading.hide()

            checkIfServerAnswerIsValid(resp)
            globalPopup = $ionicPopup.alert({
              template: 'Enviado para ' + $rootScope.lastRequest.result.dadosCadastrais[0].email
            })
          })
          .catch(function (error) {
            $rootScope.errorMsg = error.message
            if (error.isLoginError) $state.go('signin')
          })
      }
    }
  ])
  .controller('EmprestimoConsultaCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    function ($scope, $state, $rootScope) {
      $rootScope.erroMsg = false
      $rootScope.erroMsg = false
      var consultaEmprestimo = $rootScope.lastRequest.result.consultaEmprestimo

      if (Array.isArray(consultaEmprestimo)) {
        consultaEmprestimo = consultaEmprestimo.filter(function (contrato) {
          return !!contrato.contrato
        })

        if (consultaEmprestimo.length === 0) {
          consultaEmprestimo = undefined
        }
      }

      $scope.consultaEmprestimo = consultaEmprestimo
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

              $scope.dataInicial = new Date(resp.data.result['data_inicial'])
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
                  // console.log('TODO: Atualizar os dados disponiveis: ' + inspect(resp))
                }
              }
            },
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
              function () {
                // console.error(inspect(err))
                $ionicLoading.hide()
                globalPopup = $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutErrorMsg
                })
              }
            )
        }
      }

      $scope.datePickerCallback = function (data) {
        var date = $filter('date')(data, 'dd/MM/yyyy', false)
        $scope.buttonText = date || '- Selecione -'
        $scope.formData.data = date
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
      var lastRequest, lastRequestResult, emprestimoSimulacaoCampos
      lastRequest = retrieve($rootScope, 'lastRequest')
      lastRequestResult = retrieve(lastRequest, 'result')
      emprestimoSimulacaoCampos = retrieve(lastRequest, 'emprestimoSimulacaoCampos')

      $scope.formData = {}
      $scope.contrato = emprestimoSimulacaoCampos.hasOwnProperty('saldos_dados_simulacao')
        ? retrieve(emprestimoSimulacaoCampos, 'saldos_dados_simulacao')
        : ''
      $scope.matricula = retrieve(lastRequestResult, 'informacoesParticipante', 'matricula')
      $scope.dadosCadastrais = retrieve(lastRequestResult, 'dadosCadastrais')
      $scope.tipos_emprestimo = retrieve(lastRequestResult, 'simulacaoEmprestimo')
      $scope.emprestimoSimulacaoCampos = emprestimoSimulacaoCampos

      $scope.currency = function (valor, event) {
        var milSep = '.'
        var decSep = ','
        var casas = 3

        var campo = {}
        campo.value = $scope.formData.valor
        campo.maxLength = 12
        $scope.formData.valor = $scope.formData.valor.replace(',', '').replace('.', '')

        var code = event.keyCode
        // pega codigo da tecla digitada

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

          for (i = len2 - 1; i >= 0; i--) {
            // coloca numero com ou sem separadores no campo
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
              function () {
                // console.error(inspect(err))
                $ionicLoading.hide()
                globalPopup = $ionicPopup.alert({
                  title: 'Falha de conexão',
                  template: timeoutErrorMsg
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
    '$ionicModal',
    function ($scope, $state, $rootScope, $http, $ionicPopup, $ionicLoading, $ionicModal) {
      var dadosCadastrais = $rootScope.lastRequest.result.dadosCadastrais[0]
      var documentosConcessao = $rootScope.lastRequest.result.documentosConcessao[0]
      var informacoesParticipante = $rootScope.lastRequest.result.informacoesParticipante[0]
      var emprestimoSimulacaoCampos = $rootScope.lastRequest.emprestimoSimulacaoCampos
      var emprestimoSimulacaoCamposEmitido = $rootScope.lastRequest.emprestimoSimulacaoCamposEmitido

      // var saldosDadosSimulacao = emprestimoSimulacaoCampos.saldos_dados_simulacao[0]

      $scope.emprestimoSimulacaoCampos = emprestimoSimulacaoCampos
      $scope.emprestimoSimulacaoCamposEmitido = emprestimoSimulacaoCamposEmitido.result

     $scope.aceitarTermosSimulacao = function() {
        console.log("aceitou termos de uso simulação")
      }
      console.log($ionicModal)

       $ionicModal
         .fromTemplateUrl('templates/modal/termos-de-uso-simulacao.html', {
           scope: $scope,
           animation: 'slide-in-up'
        })
         .then(function (modal) {
           $scope.modal = modal
         })

         $scope.$on('$destroy', function () {
         $scope.modal.remove()
         })
        

       $scope.openModal = function () {
         console.log("abriu modal termos")
         $scope.modal.show()
       }
       $scope.closeModal = function () {
         console.log("fechou modal termos")
        $scope.modal.hide()
       } 

      $scope.submit = function () {
        $http
          .post(urlBase + ';jsessionid=' + userInfo.s, {
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
              checkIfServerAnswerIsValid(resp)
              globalPopup = $ionicPopup.show({
                title: 'Mensagem',
                template: retrieve(resp, 'data', 'result', 'msg_retorno'),
                buttons: [
                  { text: 'Fechar', type: 'button-default', onTap: function () { $state.go('menu') } } // prettier-ignore
                ]
              })
            },
            function () {
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
              })
            }
          )
          .catch(function (error) {
            $rootScope.errorMsg = error.message
          })
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
      $scope.tipoReajuste.DEFAULT = undefined

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
          // console.log('entrou')
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
        // console.log('lastFormRMV no submit: ' + $rootScope.cache.lastFormRMV)

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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
        $scope.showChild = !$scope.showChild
      }

      $scope.showChildC = false

      $scope.toggleChildC = function () {
        $scope.showChildC = !$scope.showChildC
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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
      $scope.tipoReajuste.DEFAULT = undefined

      // seta o valor do form como o default do ws.
      $scope.formData.tipo_reajuste = $scope.tipoReajusteDefault.DEFAULT

      // console.log('default do tipo_reajuste: ')
      // console.log($scope.formData.tipo_reajuste)

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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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

      $scope.toggleChild = function () {
        $scope.showChild = !$scope.showChild
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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
      $scope.tipoReajuste.DEFAULT = undefined

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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
      $scope.tipoReajuste.DEFAULT = undefined

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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
            function () {
              // console.error(inspect(err))
              $ionicLoading.hide()
              globalPopup = $ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
    '$filter',
    function (scope, state, rootScope, http, ionicPopup, ionicLoading, filter) {
      var result = retrieve(rootScope, 'lastRequest', 'result')
      var docConcessao = retrieve(result, 'documentosConcessao')
      var dadosCadastrais = retrieve(result, 'dadosCadastrais')
      // var consultaEmprestimo = retrieve(result, 'consultaEmprestimo')
      // var contrato = consultaEmprestimo.contrato
      var informacoesParticipante = retrieve(result, 'informacoesParticipante')

      if (!rootScope.cache) rootScope.cache = {}

      scope.docConcessao = docConcessao
      // scope.docConcessao.contrato = contrato ? ' (Contrato: ' + contrato + ')' : ''

      scope.docConcessao.statusDocumentoConcessao = (scope.docConcessao.statusDocumentoConcessao || []).map(function (
        value
      ) {
        return typeof value === 'object' ? '<h4>' + value.formulario + '</h4>' + value.status + '<hr>' : value
      })

      scope.datePickerCallback = function (data) {
        scope.dc_data_emissao_identidade = filter('date')(data, 'dd/MM/yyyy', false)
      }

      scope.datePickerClick = function () {
        setTimeout(function () {
          document.querySelector('.ionic-datepicker').dataset.dateExp = true
        }, 10)
      }

      scope.submit = function () {
        var docConcessaoModified = Array.prototype.reduce.call(
          document.querySelectorAll('*[data-type]'),
          function (obj, inputElem) {
            if (inputElem.dataset.type) {
              obj[inputElem.dataset.type] = inputElem.value
            }
            return obj
          },
          {}
        )

        scope.docConcessao = Object.assign(docConcessao, docConcessaoModified)

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
          rootScope.cache.docConcessao = angular.copy(docConcessao)
          return state.go('emprestimodocumentosconcessaoaviso')
        }

        http
          .post(urlBase + ';jsessionid=' + rootScope.lastRequest.login.s, {
            param: param,
            login: { u: userInfo.u, s: userInfo.s }
          })
          .then(
            function (resp) {
              var data, result

              data = retrieve(resp, 'data')
              userInfo.u = data.login.u
              userInfo.s = data.login.s

              ionicLoading.hide()

              checkIfServerAnswerIsValid(resp)
              result = retrieve(data, 'result')
              Object.assign(rootScope.cache.docConcessao, retrieve(result, 'documentoConcessao'))
              Object.assign(docConcessao, retrieve(result, 'documentoConcessao'))

              scope.docConcessao.statusDocumentoConcessao = (scope.docConcessao.statusDocumentoConcessao || []
              ).map(function (value) {
                return typeof value === 'object' ? '<h4>' + value.formulario + '</h4>' + value.status + '<hr>' : value
              })

              // Mostra mensagem retorno
              globalPopup = ionicPopup.show({
                title: 'Mensagem',
                template: retrieve(result, 'msg_retorno'),
                buttons: [
                  { text: 'Fechar', type: 'button-default', onTap: function () { state.go('menu') } } // prettier-ignore
                ]
              })
            },
            function () {
              ionicLoading.hide()
              globalPopup = ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
              })
            }
          )
          .catch(function (error) {
            rootScope.errorMsg = error.message
          })
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
      scope.docConcessao = rootScope.cache.docConcessao
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
              globalPopup = ionicPopup.alert({
                title: 'Falha de conexão',
                template: timeoutErrorMsg
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
        text: 'Habilitar Biometria',
        checked: touchId === 'SIM',
        action: function () {
          console.log("ola 1")
          var checked = toggle.checked
          var touchId = checked ? 'SIM' : 'NUNCA'
          ionicLoading.show()
          return http
            .post(urlBase + ';jsessionid=' + userInfo.s, {
              param: {
                acao: 'cadastrarTouchId',
                imei: uuid(),
                fundo: dadosCadastrais.cod_fundo,
                touch_ID: touchId,
                matricula: matricula,
                patrocinadora: dadosCadastrais.cod_patrocinadora
              },
              login: { u: userInfo.u, s: userInfo.s, cpf: userInfo.cpf }
            })
            .then(function (resp) {
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
                  function(){
                        console.log('callback salvou');
                        // Salvamos localmente a nova configuração do TouchID
                        console.log('salva localmente');
                        window.localStorage.setItem('touchId', touchId)
                        ionicLoading.hide()
                        globalPopup = ionicPopup.alert({
                          title: 'Sucesso',
                          template:
                            '<p style="color: lightgreen">' +
                              'O login com biometria foi ' + (touchId === 'SIM' ? 'ativado' : 'desativado') + '.' +
                            '</p>', // prettier-ignore

                        })
                        
                      },
                  resolve,
                  reject
                )
              })
            })
            .then(function () {
              window.localStorage.setItem('touchId', touchId)
              ionicLoading.hide()
              globalPopup = ionicPopup.alert({
                title: 'Sucesso',
                template:
                  '<p style="color: lightgreen">O login com biometria ' +
                  (checked ? 'está ativo.' : 'foi desativado.') +
                  '</p>'
              })
            })
            .catch(function () {
              // console.error(inspect(error))
              ionicLoading.hide()
              globalPopup = ionicPopup.alert({
                title: 'Falha',
                template: '<p style="color: lightcoral">Error ao ativar o login pela biometria.</p>'
              })
            })
        }
      }

      if (window.plugins && window.plugins.touchid) {
        // console.log('TouchID Enabled')
        new Promise(function (resolve, reject) {
          window.plugins.touchid.isAvailable(resolve, reject)
        }).then(function () {
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
