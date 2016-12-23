/**
 * Created by yufan on 2016/12/21.
 * retrieve data from database
 */
define('db_helper',['jquery'],function($) {
    var db = function() {};
    db.prototype.retrieve = function(url,options) {
        return $.ajax(url,options);
    };
    return new db();
});