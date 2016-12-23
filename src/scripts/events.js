/**
 * Created by yufan on 2016/12/20.
 * events controller
 */
define('events',['jquery','service','operator','component_helper'],function($,service,Opt,component_helper){
    var retrieve = function(type,fydm,fymc){
        component_helper.condition_init(fymc);
        component_helper.clear();
        switch(parseInt(type)){
            case Opt.type.LCJD:
                component_helper.lcjd_init();
                service.lcjd(fydm);
                break;
            case Opt.type.LCFX.LA:
            case Opt.type.LCFX.FA:
            case Opt.type.LCFX.TQZB:
            case Opt.type.LCFX.SL:
            case Opt.type.LCFX.BJ:
            case Opt.type.LCFX.JA:
                component_helper.lcfx_init();
                service.lcfx(fydm,type);
                break;
            case Opt.type.SXFX:
                component_helper.sxfx_init();
                service.sxfx(fydm);
                break;
        }
    };
    //nav first-level li click
    $(document).on('click','.nav li.nav-item>a',function() {
        var _this = $(this).parent();
        if(_this.hasClass('child')){
            _this.find('ul').fadeToggle();
        }
        else{
            if(_this.hasClass('active')){
                return;
            }
            $('.nav li.active').each(function(){
                $(this).removeClass('active');
            });
            _this.addClass('active');
            //params
            var type = _this.data('type');
            var fydm = $('#fydm').val();
            var fymc = $('#fymc').val();
            $('#opttype').val(type);
            //invoke
            retrieve(type,fydm,fymc);
        }
    });
    //nav second-level li click
    $(document).on('click','.nav li.child li>a',function() {
        var _this = $(this).parent();
        if(_this.hasClass('active')){
            return;
        }
        $('.nav li.active').each(function(){
            $(this).removeClass('active');
        });
        _this.addClass('active');
        //params
        var type = _this.data('type');
        var fydm = $('#fydm').val();
        var fymc = $('#fymc').val();
        $('#opttype').val(type);
        //invoke
        retrieve(type,fydm,fymc);
    });
    //fy-block li click
    $(document).on('click','.header .fy-block li>a ',function() {
        var _this = $(this).parent();
        if(_this.hasClass('active')){
            return;
        }
        $('.header .fy-block li.active').each(function(){
            $(this).removeClass('active');
        });
        _this.addClass('active');
        //params
        var type = $('#opttype').val();
        var fymc = $(this).text();
        var fydm = _this.data('fydm');
        $('#fydm').val(fydm);
        $('#fymc').val(fymc);
        //invoke
        retrieve(type,fydm,fymc);
    });
    //table tab li click
    $(document).on('click','.right-side .table li',function() {
        var _this = $(this);
        var _tab = $('.'+_this.data('for'));
        if(_this.hasClass('active')){
            return;
        }
        $('.right-side .table li.active').each(function(){
            $(this).removeClass('active');
        });
        $('.right-side .table div.active').each(function(){
            $(this).removeClass('active');
        });
        _this.addClass('active');
        _tab.addClass('active');
    });
    //scroll table move
    $(document).scroll(function(){
        var scroll = window.scrollY;
        var margin_top = $('.right-side .lcjd .chart').css('margin-top');
        var top = $('.right-side .lcjd .chart').position().top + 2*parseInt(margin_top.substr(0,margin_top.length-2));
        if(top < scroll){
            $('.right-side .table .container').addClass('scroll');
        }
        else{
            $('.right-side .table .container').removeClass('scroll');
        }
    });
});