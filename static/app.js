$(function () {
  var optionsTemp = {
    title:{
      text: "Huerto Arduino"
    },
    xAxis:{
      type: 'datetime',
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
    xAxis:{
      type: 'datetime',
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
    xAxis:{
      type: 'datetime',
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

  Highcharts.setOptions({
      global: {
          timezoneOffset: 6 * 60
      }
  });



  $.getJSON('/data', function(data){

    var arrTemp = [];
    var arrHum = [];
    var arrSuelo = [];
    var fecha;

    for (var i = 0; i < data.measures.length; i++) {

      fecha = moment(data.measures[i].fecha).valueOf();

      arrTemp.push([fecha, data.measures[i].temperatura]);
      arrHum.push([fecha, data.measures[i].humedad]);
      arrSuelo.push([fecha, data.measures[i].h_suelo]);
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
