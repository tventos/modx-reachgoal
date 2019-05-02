Reachgoal.window.Goals = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'reachgoal-goal-create';
    }
    
    Ext.applyIf(config, {
        title: _('add'),
        url: Reachgoal.config.connector_url,
        width: 700,
        autoHeight: true,
        action: 'mgr/goals/create',
        modal: true,
        saveBtnText:_('add'),
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    Reachgoal.window.Goals.superclass.constructor.call(this, config);
};
Ext.extend(Reachgoal.window.Goals, MODx.Window, {
    getFields: function (config) {
        var type = config.record && config.record.type ? config.record.type : 0;
        var fields = {
            id: {xtype: 'hidden'},
            event: {
                xtype: 'reachgoal-combo-list', 
                action: 'mgr/goals/events',
                allowBlank: false,
                listeners: {
                    select: {
                        fn: function () {
                            this.checkEvent(config);
                        }, scope: this
                    }
                }
            },
            form_id: {
                xtype: 'textfield',
                allowBlank: true
            },
            service: {
                xtype: 'reachgoal-combo-list',
                action: 'mgr/goals/services',
                allowBlank: false
            },
            service_id: {
                xtype: 'textfield',
                allowBlank: true
            },
            goal_name: {
                xtype: 'textfield',
                allowBlank: false
            }
        };
        var data = [];
        for (var key in fields) {
            Ext.applyIf(fields[key], {
                xtype: 'textfield',
                fieldLabel: _('reachgoal_goals_grid_' + key),
                boxLabel: _('yes'),
                name: key,
                id: config.id + '-' + key,
                anchor: '99%',
            });
            data.push(fields[key]);
        }
        return data;
    },
    checkEvent: function (config, firstload) {
        var event = Ext.getCmp(config.id + '-event').getValue();
        console.log(event);
    }
});
Ext.reg('reachgoal-goals-window-create', Reachgoal.window.Goals);

Reachgoal.window.UpdateGoals = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'reachgoal-goal-update';
    }
    Ext.applyIf(config, {
        title: _('update'),
        saveBtnText:_('save'),
        action: 'mgr/goals/update',
    });
    Reachgoal.window.UpdateGoals.superclass.constructor.call(this, config);
};
Ext.extend(Reachgoal.window.UpdateGoals, Reachgoal.window.Goals, {});
Ext.reg('reachgoal-goals-window-update', Reachgoal.window.UpdateGoals);