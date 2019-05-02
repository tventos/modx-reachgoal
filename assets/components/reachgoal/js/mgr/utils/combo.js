Reachgoal.combo.List = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        url: Reachgoal.config.connector_url, 
        baseParams: {
            action: config.action,
        }, 
        name: config.name,
        hiddenName: config.name,
        fields: ['label', 'value'], 
        mode: 'remote', 
        displayField: 'label', 
        fieldLabel: config.fieldLabel,
        valueField: 'value', 
        editable: false, 
        anchor: '99%',
        allowBlank: false,
        autoLoad: false
    });
    Reachgoal.combo.List.superclass.constructor.call(this, config);
};
Ext.extend(Reachgoal.combo.List, MODx.combo.ComboBox);
Ext.reg('reachgoal-combo-list', Reachgoal.combo.List);