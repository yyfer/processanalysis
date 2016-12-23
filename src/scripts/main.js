/**
 * Created by yufan on 2016/12/15.
 * main
 */
require.config({
    baseUrl:'../',
    paths:{
        echarts:'thirdparty/js/echarts-2.2.7',
        jquery:'thirdparty/js/jquery-3.1.1/jquery',
        events:'js/events',
        service:'js/service',
        echarts_helper:'js/echarts_helper',
        component_helper:'js/component_helper',
        db_helper:'js/db_helper',
        operator:'js/operator'
    }
});
//resizeCharts store the charts, global variable
window.resizeCharts = [];
//firstly, specific echarts' type.scripts must be required in the main.scripts
require(['jquery','events','echarts/chart/bar','echarts/chart/pie'], function($){
    //window.resize
    var resize;
    window.onresize = resize = function() {
        //left-side automated
        $('.left-side').height($(window).height() - $('.header').height());
        //resize the charts
        for(var i in window.resizeCharts){
            window.resizeCharts[i].resize();
        }
        //show nav
        $('.left-side .nav').slideDown();
    };
    //onload
    $(function(){
        resize();
        //initial click
        $('.left-side .nav>ul>li:first>a').click();
    });
});
