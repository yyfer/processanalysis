/**
 * Created by yufan on 2016/12/20.
 * construct echarts' view data
 */
define('echarts_helper',['echarts'],
    function(echarts){
        var helper = function(){};
        helper.prototype.stack_bar = function(id,legend,category,datalist) {
            var div = document.getElementById(id);
            var chart_panel = echarts.init(div,'macarons');
            if(chart_panel){
                var series = [];
                for(var i=0;i<legend.length;i++){
                    series.push({
                        name:legend[i],
                        type:'bar',
                        stack: '总量',
                        barMinHeight: 20,
                        itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
                        data:datalist[i]
                    });
                }
                var option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        }
                    },
                    legend: {
                        data:legend,
                        selectedMode:'single'
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: false},
                            dataView : {show: false, readOnly: false},
                            magicType : {show: false, type: [ 'stack', 'tiled']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : false,
                    xAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            data : category
                        }
                    ],
                    series : series
                };
                chart_panel.setOption(option);
            }
            return chart_panel;
        };
        helper.prototype.pie = function(id,legend,datalist,title){
            var div = document.getElementById(id);
            var chart_panel = echarts.init(div,'macarons');
            if(chart_panel){
                var series = [{
                    name:title,
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[],
                    itemStyle:{normal:{label:{show:true,
                        formatter: "{d}%"}}}
                }];
                for(var i=0;i<legend.length;i++){
                    series[0].data.push({value:datalist[i],name:legend[i]});
                }
                var option = {
                    title : {
                        text: title,
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c}"
                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        data:legend
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: false},
                            dataView : {show: false, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    series : series
                };
                chart_panel.setOption(option);
            }
            return chart_panel;
        };
        helper.prototype.bar = function(id,category,datalist,title){
            var div = document.getElementById(id);
            var chart_panel = echarts.init(div,'macarons');
            if(chart_panel){
                var series = [
                    {
                        name:title,
                        type:'bar',
                        barMaxWidth: 40,
                        itemStyle:{normal:{label:{show:true,position:"top"}}},
                        data:datalist
                    }
                ];
                var option = {
                    title : {
                        text: title,
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        },
                        formatter: "{b} : {c}"
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : category,
                            axisLabel : {
                                // rotate : -18,
                                textStyle : {align : 'center'}
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : series
                };
                chart_panel.setOption(option);
            }
            return chart_panel;
        };
        return new helper();
    }
);