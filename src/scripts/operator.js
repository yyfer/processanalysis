/**
 * Created by yufan on 2016/12/21.
 * operator types
 */
define('operator',[],function(){
    var type = {
        LCJD:1,
        LCFX:{
            LA:21,
            FA:22,
            TQZB:23,
            SL:24,
            BJ:25,
            JA:26
        },
        SXFX:3
    };
    var analysis = {};
    // analysis.titles = {
    //     21:"立案阶段时间花费-案件数",
    //     22:"分案阶段时间花费-案件数",
    //     23:"庭前准备阶段时间花费-案件数",
    //     24:"审理阶段案件审限情况-案件数",
    //     25:"报结阶段时间花费-案件数",
    //     26:"结案至归档时间花费-案件数"
    // };
    analysis.titles = {
        21:"单独被告收案",
        22:"单独被告结案",
        23:"共同被告收案数",
        24:"共同被告结案数",
        25:"收案区县行政机关数",
        26:"结案至归档时间花费-案件数"
    };
    analysis.getTitle = function(type) {
        return this.titles[type];
    };
    var operator = {type:type,analysis:analysis};
    return operator;
});
