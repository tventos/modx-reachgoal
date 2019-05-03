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
        submitEmptyText: false,
        saveBtnText:_('add'),
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    Reachgoal.window.Goals.superclass.constructor.call(this, config);
    this.on('show', function () {
        this.checkEvent(config, true);
        this.checkService(config, true);
    });
};
Ext.extend(Reachgoal.window.Goals, MODx.Window, {
    getFields: function (config) {
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
                allowBlank: true,
                emptyText: _('reachgoal_goals_grid_empty_form_id'),
            },
            service: {
                xtype: 'reachgoal-combo-list',
                action: 'mgr/goals/services',
                allowBlank: false,
                listeners: {
                    select: {
                        fn: function () {
                            this.checkService(config);
                        }, scope: this
                    }
                }
            },
            service_id: {
                xtype: 'textfield',
                allowBlank: true,
                emptyText: _('reachgoal_goals_grid_empty_service_id'),
            },
            goal_name: {
                xtype: 'textfield',
                allowBlank: false
            },
            goal_category: {
                xtype: 'textfield',
                allowBlank: true
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
        
        if (firstload) {
            if (event != 'AjaxForm') {
                this.hideField(Ext.getCmp(config.id + '-form_id'));
            }
            
            return false;
        }
        
        if (event == 'AjaxForm') {
            this.showField(Ext.getCmp(config.id + '-form_id'));
        } else {
            this.hideField(Ext.getCmp(config.id + '-form_id'));
        }
        
        Ext.getCmp(config.id + '-form_id').reset();
    },
    checkService: function (config, firstload) {
        var service = Ext.getCmp(config.id + '-service').getValue();
        
        if (firstload) {
            if (service != 'metrika') {
                this.hideField(Ext.getCmp(config.id + '-service_id'));
            }
            
            if (!service || service == 'metrika') {
                this.hideField(Ext.getCmp(config.id + '-goal_category'));
            }
            
            return false;
        }
        
        if (service == 'metrika') {
            this.showField(Ext.getCmp(config.id + '-service_id'));
            this.hideField(Ext.getCmp(config.id + '-goal_category'));
        } else {
            this.hideField(Ext.getCmp(config.id + '-service_id'));
            this.showField(Ext.getCmp(config.id + '-goal_category'));
        }
        
        Ext.getCmp(config.id + '-service_id').reset();
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