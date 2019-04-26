var Reachgoal = function (config) {
    config = config || {};
    Reachgoal.superclass.constructor.call(this, config);
};
Ext.extend(Reachgoal, MODx.Component, {
    panel: {}, page: {}, window: {}, grid: {}, tree: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('reachgoal', Reachgoal);

Reachgoal = new Reachgoal();