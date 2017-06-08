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
	var ctx= document.getElementById("pie-chart").getContext("2d");
	var myPie = 
	new Chart(ctx).Doughnut(pieData, options);
});