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

	// var countData = 0;
	// for(var i = 0;i<pieData.length;i++){
 //        countData += pieData[i].value;
 //    }
        
	var options = { 
		percentageInnerCutout : 50,
		labelTxt: true,
		animation: false
		// labelFontSize: 16
		
	};


	// Chart.types.Doughnut.extend({
	// 	name: "DoughnutAlt",
	// 	draw: function () {
 //        Chart.types.Doughnut.prototype.draw.apply(this, arguments);
	//         this.chart.ctx.textBaseline = "middle";
	//         this.chart.ctx.fillStyle = 'black'
	//         this.chart.ctx.font = "50px Roboto";
	//         this.chart.ctx.textAlign = "center";
	//         this.chart.ctx.fillText(distributionChartData[3] + " %", 135, 120);
	//         this.chart.ctx.font = "20px Roboto";
	//         this.chart.ctx.fillText((distributionChartData[0] + distributionChartData[1] + distributionChartData[2]) + " Responses", 135, 160);
 //    	}
	// });

	var ctx= document.getElementById("pie-chart").getContext("2d");
	var myPie = 
	// new Chart(ctx).Doughnut(pieData, options);

	new Chart(ctx).Doughnut(pieData,options);

});