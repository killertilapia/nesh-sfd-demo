function getChartInfo(title, type, labelsarraylength, min, max, minRange) {
    labelsarraylength = ((labelsarraylength == null) ? 25 : labelsarraylength);
    type = ((type == null) ? 25 : type);

    var chartinfo = {
        chart: {
            "type": type,
            backgroundColor: '#131313'
        },
        "title": {
            text: $("<div/>").html(title).text(),
            style: {
                fontSize: "16px"
            }
        },
        xAxis: {
            categories: ((labelsarraylength > 0) ? getGraphLabels(labelsarraylength) : null),
            type: 'datetime',
            tickmarkplacement: 'off',
            "title": {
                enabled: false
            },
            labels: {
                style: {
                    color: '#C3C3C3',
                }
            },
            lineColor: '#4B4B4B',
            lineWidth: 0,
            gridLineWidth: 1,
            gridLineDashStyle: 'Dot',
            gridLineColor: '#2F2F2F',
            tickLength: 0
        },
        yAxis: {
            "min": min,
                "max": max,
                "minRange": minRange,
                "title": {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value;
                },
                style: {
                    color: '#C3C3C3',
                }
            },
            gridLineColor: '#4B4B4B'
        },
        tooltip: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                lineWidth: 3
            },
            area: {
                stacking: 'normal',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: []
    }

    return chartinfo;
}

var LIGHT_MAX = 255;
var TEMP_MAX = 32;

$(function () {
    $(document).ready(function () {
      var socket = io();

      Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        var chartinfo = getChartInfo("Light & Temperature", "spline", -1, 0, LIGHT_MAX);

        chartinfo.chart.animation = Highcharts.svg;
        chartinfo.chart.events = {
            load: function () {
                // set up the updating of the chart
                var light_value = this.series[0];
                var temperature_value = this.series[1];


                socket.on('new val', function(val){
                  console.log(val);
                  var x = val.time;
                  light_value.addPoint([x, val.light_value], false, true);
                  temperature_value.addPoint([x, val.temp_value], true, true);
                });
            }
        };

        chartinfo.xAxis.labels.enabled = true;
        chartinfo.xAxis.tickPixelInterval = 75;


        // Two variable fix
        // @see http://stackoverflow.com/questions/16920774/updating-spline-chart-two-lines-on-top-of-eachother
        function generateArray(){
            var emptyarray = [],
                time = (new Date()).getTime(),
                i;

            for (i = -20; i <= 0; i++) {
                emptyarray.push({
                    x: time + i * 1000,
                    y: 0
                });
            }
            return emptyarray;
        }

        chartinfo.series = [{
            name: 'Light Value',
            data: generateArray()
        }, {
            name: 'Temperature Value',
            data: generateArray()
        }];

        Highcharts.setOptions(Highcharts.theme);

        $('#chartContainer').highcharts(chartinfo);
    });

});
