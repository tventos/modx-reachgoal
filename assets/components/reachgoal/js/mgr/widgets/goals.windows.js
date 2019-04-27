Reachgoal.window.Goals = function (config) {
    config = config || {};
    config.record = config.record || {object: {id: 0}};
    Ext.applyIf(config, {
        title: _('add'),
        url: Reachgoal.config.connector_url,
        width:800,
        action: 'mgr/goals/create',
        saveBtnText:_('add'),
        fields: [{
            xtype: 'textfield',
            name: 'event',
            fieldLabel: _('reachgoal_goals_grid_event'),
            anchor: '99%',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'form_id',
            fieldLabel: _('reachgoal_goals_grid_form_id'),
            anchor: '99%',
            allowBlank: true
        },{
            xtype: 'textfield',
            name: 'service',
            fieldLabel: _('reachgoal_goals_grid_service'),
            anchor: '99%',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'service_id',
            fieldLabel: _('reachgoal_goals_grid_service_id'),
            anchor: '99%',
            allowBlank: false
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
        config.id = 'reachgoal-window-goals';
    }
    Ext.applyIf(config, {
        title: _('update'),
        autoHeight: true,
        fields: this.getFields(config),
        url: Reachgoal.config.connector_url,
        action: 'mgr/goals/update',
        width: 800
    });
    Reachgoal.window.UpdateGoals.superclass.constructor.call(this, config);            
};
Ext.extend(Reachgoal.window.UpdateGoals, MODx.Window, {
    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        },{
            xtype: 'textfield',
            name: 'event',
            fieldLabel: _('reachgoal_goals_grid_event'),
            anchor: '99%',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'form_id',
            fieldLabel: _('reachgoal_goals_grid_form_id'),
            anchor: '99%',
            allowBlank: true
        },{
            xtype: 'textfield',
            name: 'service',
            fieldLabel: _('reachgoal_goals_grid_service'),
            anchor: '99%',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'service_id',
            fieldLabel: _('reachgoal_goals_grid_service_id'),
            anchor: '99%',
            allowBlank: false
        },{
            xtype: 'textfield',
            name: 'goal_name',
            fieldLabel: _('reachgoal_goals_grid_goal_name'),
            anchor: '99%',
            allowBlank: false
        }]
    },

    loadDropZones: function () {
    }

});
Ext.reg('reachgoal-goals-window-update', Reachgoal.window.UpdateGoals);