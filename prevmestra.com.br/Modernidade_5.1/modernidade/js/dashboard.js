$(document).ready(function(){  

	var pieData = [
		{
          value: 1,
          color:"#7FBDFA" //1
        },
        {
          value : 2,
          color : "#C9E5F2" //2
        },
        {
          value: 1,
          color:"#F78979" //3
        },
        {
          value : 0,
          color : "#F0BE73" //4
        },
        {
          value: 0,
          color:"#A4ECA4" //5
        },
        {
        	value: 1,
        	color: "#ABDBDA" //6 
        },
        {
          value : 2,
          color : "#6ED9D7" //7
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
			labels : ["01/Jan","06/Jan","10/Jan","15/Jan","18/Jan","20/Jan","23/Jan","28/Jan"],
			datasets : [
				{
					fillColor : "rgba(239,120,120,0)",
					strokeColor : "rgba(239,120,120,1)",  //laranjao
					pointColor : "rgba(239,120,120,1)",
					pointStrokeColor : "transparent",
					data : [50,55,53,52,60,65,60,55],
				},
				{
					fillColor : "rgba(0,173,164,0)",
					strokeColor : "rgba(0,173,164,1)",
					pointColor : "rgba(0,173,164,1)",
					pointStrokeColor : "transparent",
					data : [45,40,43,48,50,50,55, 45]
				}
			]
		},
		ctx: document.getElementById("line-chart-1").getContext("2d"),
		options: {
			bezierCurve : false, 
			label: false, 
			animation: false,
			scaleShowGridLines: false,
			scaleFontSize: 8,
			scaleFontStyle: 'normal'
		}
	};


	var myLineChart = new Chart(lineCharts[0].ctx).Line(lineCharts[0].data, lineCharts[0].options);

});