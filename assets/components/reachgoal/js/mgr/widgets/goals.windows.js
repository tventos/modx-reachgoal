Reachgoal.window.Goals = function (config) {
    config = config || {};
    config.record = config.record || {object: {id: 0}};
    Ext.applyIf(config, {
        title: _('add'),
        url: Reachgoal.config.connector_url,
        width: 800,
        action: 'mgr/goals/create',
        saveBtnText:_('add'),
        fields: [{
            xtype: 'hidden',
            name: 'id'
        },{
            xtype: 'reachgoal-combo-list',
            action: 'mgr/goals/events',
            name: 'event',
            fieldLabel: _('reachgoal_goals_grid_event'), 
            listeners: {
                select: {
                    fn: function () {
                        //this.checkEvent(config);
                    }, scope: this
                }
            }
        },{
            xtype: 'textfield',
            name: 'form_id',
            fieldLabel: _('reachgoal_goals_grid_form_id'),
            anchor: '99%',
            allowBlank: true
        },{
            xtype: 'reachgoal-combo-list',
            action: 'mgr/goals/services',
            name: 'service',
            fieldLabel: _('reachgoal_goals_grid_service')
        },{
            xtype: 'textfield',
            name: 'service_id',
            fieldLabel: _('reachgoal_goals_grid_service_id'),
            anchor: '99%',
            allowBlank: true
        },{
            xtype: 'textfield',
            name: 'goal_name',
            fieldLabel: _('reachgoal_goals_grid_goal_name'),
            anchor: '99%',
            allowBlank: false
        }]
    });
    Reachgoal.window.Goals.superclass.constructor.call(this, config);
};
Ext.extend(Reachgoal.window.Goals, MODx.Window);
Ext.reg('reachgoal-window-goals', Reachgoal.window.Goals);

Reachgoal.window.UpdateGoals = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'reachgoal-window-update';
    }
    Ext.applyIf(config, {
        title: _('update'),
        action: 'mgr/goals/update',
    });
    Reachgoal.window.UpdateGoals.superclass.constructor.call(this, config);
};
Ext.extend(Reachgoal.window.UpdateGoals, Reachgoal.window.Goals, {});
Ext.reg('reachgoal-goals-window-update', Reachgoal.window.UpdateGoals);