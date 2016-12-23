/**
 * Created by yufan on 2016/12/20.
 * construct the components' view data
 */
define('component_helper',['jquery'],function($){
    var helper = function(){};
    /*jshint -W043 */
    /**
     * clear view
     */
    helper.prototype.clear = function() {
        $('.right-side .lcjd').remove();
        $('.right-side .lcfx').remove();
        $('.right-side .sxfx').remove();
    };
    /**
     * init condition panel
     */
    helper.prototype.condition_init = function(fymc){
        $('#rs_fymc').text(fymc);
    };
    /**
    *  lcjd block
    */
    //init lcjd view constructure
    helper.prototype.lcjd_init = function(){
        var container = $('.right-side .content>.break');
        var content = '<div class="lcjd"><div class="node_block"></div>\
            <div class="table"></div>\
            <div class="chart">\
            <div id="stack-bar"></div>\
            </div></div>';
        container.after(content);
    };
    helper.prototype.table_init = function(fydm,legend,data_items,totallist,total){
        //empty
        var container = $('.right-side .table');
        container.empty();
        //target
        var target = (fydm !== '1200'?'部门':'法院');
        //legend
        var result = '<div class="container">';
        var lis = '<ul>';
        var tabs = '';
        for(var i=0;i<legend.length;i++){
            if(i === 0){
                lis += '<li class="active" data-for="tab-'+(i+1)+'"><span>'+legend[i]+'</span></li>';
                tabs += '<div class="tab tab-'+(i+1)+' active">\
                        <table>\
                        <thead>\
                        <tr>\
                        <th>'+target+'</th>\
                        <th>数量/件</th>\
                        <th>占比</th>\
                        </tr>\
                        </thead>\
                        <tbody>';
            }
            else{
                lis += '<li data-for="tab-'+(i+1)+'"><span>'+legend[i]+'</span></li>';
                tabs += '<div class="tab tab-'+(i+1)+'">\
                        <table>\
                        <thead>\
                        <tr>\
                        <th>'+target+'</th>\
                        <th>数量/件</th>\
                        <th>占比</th>\
                        </tr>\
                        </thead>\
                        <tbody>';
            }
            for(var j=0;j<data_items.length;j++){
                tabs += '<tr>\
                            <td>'+data_items[j].mc+'</td>\
                            <td>'+data_items[j].data[i]+'</td>\
                            <td>'+(data_items[j].total === 0?"0%":(data_items[j].data[i]*100.0/data_items[j].total).toFixed(2))+'%</td>\
                            </tr>';
            }
            //total
            tabs += '<tr><td>总计</td>\
                            <td>'+totallist[i]+'</td>\
                            <td>'+(total === 0?"0%":((totallist[i]*100.0/total).toFixed(2)))+'%</td>\
                            </tr>\
                            </tbody>\
                            </table>\
                            </div>';
        }
        lis+= '</ul>';
        result += lis + tabs + '</div>';
        //show
        container.append(result);
    };
    helper.prototype.node_init = function(legend,totallist){
        //empty
        var container = $('.right-side .node_block');
        container.empty();
        //legend
        var lis = "<ul>";
        for(var i=0;i<legend.length;i++){
            if(i === legend.length-1){
                lis += '<li class="node bg_'+(i+1)+'"><span>'+legend[i]+'</span><span>'+totallist[i]+'</span></li>';
            }
            else{
                lis += '<li class="node bg_'+(i+1)+'"><span>'+legend[i]+'</span><span>'+totallist[i]+'</span><i class="fa fa-arrow-right"></i></li>';
            }
        }
        lis += '</ul>';
        //show
        container.append(lis);
    };
    /**
     * lcfx block
     */
    helper.prototype.lcfx_init = function(){
        var container = $('.right-side .content>.break');
        var content = '<div class="lcfx"><div class="chart" id="pie"></div>\
            <div class="chart" id="bar"></div></div>';
        container.after(content);
    };
    /**
     * sxfx block
     */
    helper.prototype.sxfx_init = function(){
        var container = $('.right-side .content>.break');
        var content = '<div class="sxfx"><div class="chart" id="pie"></div>\
            <div class="chart" id="bar"></div></div>';
        container.after(content);
    };
    /**
     * loading
     */
    helper.prototype.loading = function(){
        $(document).scrollTop(0);
        $('.main').addClass('refresh');
    };
    helper.prototype.loaded = function(){
        $('.main').removeClass('refresh');
    };
    return new helper();
});