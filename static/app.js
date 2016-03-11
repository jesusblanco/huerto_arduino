$(function () {
  var optionsTemp = {
    title:{
      text: "Huerto Arduino"
    },
    yAxis:{
      title: {
        text:'Temperatura (°C)'
      }
    },
    chart: {
      renderTo: 'container-temperatura'
    },
    series: [{}]
  };

  var optionsHum = {
    title:{
      text: ""
    },
    yAxis:{
      title: {
        text:'Humedad (%)'
      }
    },
    chart: {
      renderTo: 'container-humedad'
    },
    series: [{}]
  };

  var optionsSuelo = {
    title:{
      text: ""
    },
    yAxis:{
      title: {
        text:'Humedad Suelo'
      }
    },
    chart: {
      renderTo: 'container-suelo'
    },
    series: [{}]
  };
  $.getJSON('/data', function(data){

    var arrTemp = [];
    var arrHum = [];
    var arrSuelo = [];

    for (var i = 0; i < data.measures.length; i++) {
      arrTemp.push([data.measures[i].fecha, data.measures[i].temperatura]);
      arrHum.push([data.measures[i].fecha, data.measures[i].humedad]);
      arrSuelo.push([data.measures[i].fecha, data.measures[i].h_suelo]);
    }

    optionsTemp.series[0].data = arrTemp;
    optionsTemp.series[0].name = 'Temperatura';
    var chartTemp = new Highcharts.Chart(optionsTemp);

    optionsHum.series[0].data = arrHum;
    optionsHum.series[0].name = 'Humedad';
    var chartHum = new Highcharts.Chart(optionsHum);

    optionsSuelo.series[0].data = arrSuelo;
    optionsSuelo.series[0].name = 'Humedad Suelo';
    var chartSuelo = new Highcharts.Chart(optionsSuelo);

  });
});
