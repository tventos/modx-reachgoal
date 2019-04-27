Reachgoal.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        cls: 'container',
        items: [{
            html: '<h2>'+_('reachgoal')+'</h2>'
        }, {
            xtype: 'modx-tabs',
            items: [{
                title: _('reachgoal_panel_main'),
                items: [{
                    html: _('reachgoal_panel_main_desc'), 
                    cls: 'panel-desc',
                },{
                    xtype: 'panel',
                    cls: 'container',
                    items: [{
                        xtype: 'reachgoal-grid-goals'
                    }]
                }]
            }]
        }]
    });
    Reachgoal.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(Reachgoal.panel.Home, MODx.Panel);
Ext.reg('reachgoal-panel-home', Reachgoal.panel.Home);