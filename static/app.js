$(function () {
  var options = {
    title:{
      text: "Huerto Arduino"
    },
    yAxis:{
      title: {
        text:'Temperatura (°C)'
      }
    },
    chart: {
      renderTo: 'container'
    },
    series: [{}]
  };
  $.getJSON('/data', function(data){

    var arr = [];

    for (var i = 0; i < data.measures.length; i++) {
      arr.push([data.measures[i].fecha, data.measures[i].temperatura]);
    }

    options.series[0].data = arr;
    options.series[0].name = 'Temperatura';
    var chart = new Highcharts.Chart(options)
  });
});
