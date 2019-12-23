//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla

"use strict";
var app = angular.module('ionic-datepicker', ['ionic', 'ionic-datepicker.templates']);

app.service('DatepickerService', function () {
  this.monthsList = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
});

app.directive('ionicDatepicker', ['$ionicPopup', 'DatepickerService', function ($ionicPopup, DatepickerService) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      ipDate: '=idate',
      disablePreviousDates: '=disablepreviousdates',
      disableFutureDates: '=disablefuturedates',
      callback: '=callback',
      title: '=title',
      disabledDates: '=?disableddates',
      mondayFirst: '=?mondayfirst'
    },
    link: function (scope, element) {
      var i, currentYear, yearsList, monthsList, currentDate

      if (!scope.ipDate) scope.ipDate = new Date();

      monthsList = DatepickerService.monthsList;
      currentDate = angular.copy(scope.ipDate);
      currentYear = currentDate.getFullYear();

      i = 0
      yearsList = [scope.disablePreviousDates ? currentYear : currentYear - 100];
      while (++i < 200 && (!scope.disableFutureDates || yearsList[i - 1] !== currentYear)) {
        yearsList[i] = yearsList[i - 1] + 1
      }

      scope.yearsList = yearsList;
      scope.monthsList = monthsList;
      scope.currentYear = '';
      scope.currentMonth = '';
      scope.datePickerTitle = scope.title || 'Select Date';

      scope.mondayFirst = !(!angular.isDefined(scope.mondayFirst) || scope.mondayFirst === false);

      if (!angular.isDefined(scope.disabledDates)) {
        scope.disabledDates = [];
      } else {
        for (i = 0; i < scope.disabledDates.length; i++) {
          scope.disabledDates[i] = scope.disabledDates[i].getTime();
        }
      }

      scope.previousDayEpoch = (+(new Date()) - 86400000);
      scope.nextDayEpoch = (+(new Date()));

      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      scope.selctedDateString = currentDate.toString();
      scope.weekNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
      scope.today = {};

      if (scope.mondayFirst === true) {
        var lastWeekDay = scope.weekNames.shift();
        scope.weekNames.push(lastWeekDay);
      }

      var tempTodayObj = new Date();
      var tempToday = new Date(tempTodayObj.getFullYear(), tempTodayObj.getMonth(), tempTodayObj.getDate());

      scope.today = {
        dateObj: tempTodayObj,
        date: tempToday.getDate(),
        month: tempToday.getMonth(),
        year: tempToday.getFullYear(),
        day: tempToday.getDay(),
        dateString: tempToday.toString(),
        epochLocal: tempToday.getTime(),
        epochUTC: (tempToday.getTime() + (tempToday.getTimezoneOffset() * 60 * 1000))
      };

      var refreshDateList = function (current_date) {
        current_date.setHours(0);
        current_date.setMinutes(0);
        current_date.setSeconds(0);
        current_date.setMilliseconds(0);

        scope.selctedDateString = (new Date(current_date)).toString();
        currentDate = angular.copy(current_date);

        var firstDay = new Date(current_date.getFullYear(), current_date.getMonth(), 1).getDate();
        var lastDay = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate();

        scope.dayList = [];

        for (var i = firstDay; i <= lastDay; i++) {
          var tempDate = new Date(current_date.getFullYear(), current_date.getMonth(), i);
          scope.dayList.push({
            date: tempDate.getDate(),
            month: tempDate.getMonth(),
            year: tempDate.getFullYear(),
            day: tempDate.getDay(),
            dateString: tempDate.toString(),
            epochLocal: tempDate.getTime(),
            epochUTC: (tempDate.getTime() + (tempDate.getTimezoneOffset() * 60 * 1000))
          });
        }

        firstDay = scope.dayList[0].day - scope.mondayFirst;

        scope.currentMonthFirstDayEpoch = scope.dayList[0].epochLocal;
        scope.currentMonthLastDayEpoch = scope.dayList[scope.dayList.length - 1].epochLocal;

        for (var j = 0; j < firstDay; j++) {
          scope.dayList.unshift({});
        }

        scope.rows = [];
        scope.cols = [];

        scope.currentMonth = monthsList[current_date.getMonth()];
        scope.currentYear = current_date.getFullYear();
        scope.currentMonthSelected = scope.currentMonth;
        scope.currentYearSelected = scope.currentYear;

        scope.numColumns = 7;
        scope.rows.length = 6;
        scope.cols.length = scope.numColumns;
      };

      scope.monthChanged = function (month) {
        var monthNumber = scope.monthsList.indexOf(month);
        currentDate.setMonth(monthNumber);
        refreshDateList(currentDate)
      };

      scope.yearChanged = function (year) {
        currentDate.setFullYear(year);
        refreshDateList(currentDate)
      };

      scope.prevMonth = function () {
        if (currentDate.getMonth() === 1) {
          currentDate.setFullYear(currentDate.getFullYear());
        }
        currentDate.setMonth(currentDate.getMonth() - 1);

        scope.currentMonth = monthsList[currentDate.getMonth()];
        scope.currentYear = currentDate.getFullYear();

        refreshDateList(currentDate)
      };

      scope.nextMonth = function () {
        if (currentDate.getMonth() === 11) {
          currentDate.setFullYear(currentDate.getFullYear());
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
        scope.currentMonth = monthsList[currentDate.getMonth()];
        scope.currentYear = currentDate.getFullYear();
        refreshDateList(currentDate)
      };

      scope.date_selection = {selected: false, selectedDate: '', submitted: false};

      scope.dateSelected = function (date) {
        scope.selctedDateString = date.dateString;
        scope.selctedDateStringCopy = angular.copy(scope.selctedDateString);
        scope.date_selection.selected = true;
        scope.date_selection.selectedDate = new Date(date.dateString);
      };

      element.on("click", function () {
        if (!scope.ipDate) {
          var defaultDate = new Date();
          refreshDateList(defaultDate);
        } else {
          refreshDateList(angular.copy(scope.ipDate));
        }

        $ionicPopup.show({
          templateUrl: 'date-picker-modal.html',
          title: scope.datePickerTitle,
          subTitle: '',
          scope: scope,
          buttons: [
            {
              text: 'Fechar',
              onTap: function () {
                scope.callback(undefined);
              }
            },
            {
              text: 'Escolher',
              type: 'button-positive',
              onTap: function (e) {
                scope.date_selection.submitted = true;

                if (scope.date_selection.selected === true) {
                  scope.ipDate = angular.copy(scope.date_selection.selectedDate);
                  scope.callback(scope.ipDate);
                } else {
                  e.preventDefault();
                }
              }
            }
          ]
        })
      })
    }
  }
}]);
