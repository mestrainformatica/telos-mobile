$(document).ready(function(){  

	var pieData = [
        {
          value: 100/10,
          color:"#F78979"
        },
        {
          value : 100/5,
          color : "#78A0EF"
        },
        {
          value: 100/6,
          color:"#7FBDFA"
        },
        {
          value : 100/6,
          color : "#6ED9D7"
        },
        {
          value: 100/6,
          color:"#A4ECA4"
        },
        {
          value : 100/5,
          color : "#F0BE73"
        }
	];

	// var myPie = new Chart(document.getElementById("pie-chart").getContext("2d")).Doughnut(pieData,{percentageInnerCutout : 80});
	var options = { 
		percentageInnerCutout : 50, 
		labelFontSize: 16
		
	};
	var ctx= document.getElementById("pie-chart").getContext("2d");
	var myPie = 
	new Chart(ctx).Doughnut(pieData, options);
});