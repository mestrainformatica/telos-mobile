
angular.module('starter.Directives', []);

angular.module('starter.Directives').directive('browseTo', function ($ionicGesture) {
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

angular.module('starter.Directives').directive('compile', ['$compile', function ($compile) {
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
