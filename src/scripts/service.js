/**
 * Created by yufan on 2016/12/21.
 * service logic
 */
define('service',['db_helper','component_helper','echarts_helper','operator'],function(db_helper,component_helper,echarts_helper,operator) {
    var service = function(){};
    //logic
    var lcjd = function(data){
        //data
        var legend = data.legend;
        var datalist = [];
        var totallist = [];
        for(var i=0;i<legend.length;i++){
            datalist.push([]);
            totallist.push(0);
        }
        var total = 0;
        var category = [];
        var length = data.data.length;
        var data_items = data.data;
        for(i=length-1;i>=0;i--){
            category.push(data_items[i].mc);
            for(var j=0;j<legend.length;j++){
                datalist[j].push(data_items[i].data[j]);
                totallist[j] += data_items[i].data[j];
            }
            total += data_items[i].total;
        }
        var fydm = data.fydm;
        //node
        component_helper.node_init(legend,totallist);
        //table
        component_helper.table_init(fydm,legend,data_items,totallist,total);
        //chart
        var stack_bar = echarts_helper.stack_bar('stack-bar',legend,category,datalist);
        // window.resizeCharts.
        window.resizeCharts = [];
        window.resizeCharts.push(stack_bar);
    };
    var lcfx = function(data,type){
        var datalist = data.data;
        var legend = data.legend;
        var title = operator.analysis.getTitle(type);
        //chart
        var pie = echarts_helper.pie('pie',legend,datalist,title);
        var bar = echarts_helper.bar('bar',legend,datalist,title);
        // window.resizeCharts.
        window.resizeCharts = [];
        window.resizeCharts.push(pie);
        window.resizeCharts.push(bar);
    };

    //service interface
    service.prototype.lcjd = function(fydm){
        component_helper.loading();
        if(fydm == '1200'){
            db_helper.retrieve('../data/lcjd_qs_data.json',{}).then(
                function(data){
                    lcjd(data);
                    component_helper.loaded();
                },
                function(error){
                    component_helper.loaded();
                }
            );
        }
        else{
            db_helper.retrieve('../data/lcjd_fy_data.json',{}).then(
                function(data){
                    lcjd(data);
                    component_helper.loaded();
                },
                function(error){
                    component_helper.loaded();
                }
            );
        }
    };
    service.prototype.lcfx = function(fydm,type){
        component_helper.loading();
        db_helper.retrieve('../data/lcfx_la_data.json',{}).then(
            function(data){
                lcfx(data,type);
                component_helper.loaded();
            },
            function(error){
                component_helper.loaded();
            }
        );
    };
    service.prototype.sxfx = function(fydm){
        component_helper.loading();
        db_helper.retrieve('../data/lcfx_la_data.json',{}).then(
            function(data){
                lcfx(data);
                component_helper.loaded();
            },
            function(error){
                component_helper.loaded();
            }
        );
    };

    return new service();
});