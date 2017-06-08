$(document).ready(function(){  

	var pieData = [
		{
          value: 1,
          color:"#7FBDFA"
        },
        {
          value : 1,
          color : "#78A0EF"
        },
        {
          value: 1,
          color:"#F78979"
        },
        {
          value : 1,
          color : "#F0BE73"
        },
        {
          value: 1,
          color:"#A4ECA4"
        },
        {
        	value: 1,
        	color: "#ABDBDA"
        },
        {
          value : 1,
          color : "#6ED9D7"
        }
	];
        
	var optionsPie = { 
		segmentShowStroke : false,
		percentageInnerCutout : 50,
		labelTxt: true,
		animation: false,
		labelFontSize : 50,
	};

	var ctxPie = document.getElementById("pie-chart").getContext("2d");
	var myPie = new Chart(ctxPie).Doughnut(pieData,optionsPie);

	var lineCharts = new Array();

	lineCharts[0] = {
		data:{
			labels : ["","","","","","","", ""],
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.0)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,0)",
					pointStrokeColor : "transparent",
					data : [20,45,25,10,30,60,50],
				},
				{
					fillColor : "rgba(151,187,205,0.0)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,0)",
					pointStrokeColor : "transparent",
					data : [30,20,15,10,20,45,60]
				}
			]
		},
		ctx: document.getElementById("line-chart-1").getContext("2d"),
		options: {bezierCurve : false, label: false, animation: false}
	};


	var myLineChart = new Chart(lineCharts[0].ctx).Line(lineCharts[0].data, lineCharts[0].options);

});