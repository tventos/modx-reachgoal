Reachgoal.grid.Goals = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'reachgoal-grid-goals';
    }
    Ext.apply(config, {
        columns: this.getColumns(),
        fields: this.getFields(),
        tbar: this.getTbar(config),
        autoHeight: true,
        sm: new Ext.grid.CheckboxSelectionModel(),
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec) {}
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateItem(grid, e, row);
            }
        },
        url: Reachgoal.config.connector_url,
        action: 'mgr/goals/getlist',
        paging: true,
        pageSize: 20
    });
    Reachgoal.grid.Goals.superclass.constructor.call(this, config);
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
}
Ext.extend(Reachgoal.grid.Goals, MODx.grid.Grid);
Ext.reg('reachgoal-grid-goals', Reachgoal.grid.Goals);


Ext.extend(Reachgoal.grid.Goals, MODx.grid.Grid, {
    getColumns: function () {
        return [
            {dataIndex: 'id', sortable: true, width: 70, header: 'ID', hidden: true},
            {dataIndex: 'event', sortable: true, width: 160, header: _('reachgoal_goals_grid_event')},
            {dataIndex: 'form', sortable: true, width: 160, header: _('reachgoal_goals_grid_form_id'), renderer: Reachgoal.utils.renderForm},
            {dataIndex: 'service', sortable: true, width: 150, header: _('reachgoal_goals_grid_service')},
            {dataIndex: 'service_id', sortable: true, width: 140, header: _('reachgoal_goals_grid_service_id'), hidden: true},
            {dataIndex: 'goal_name', sortable: true, width: 150, header: _('reachgoal_goals_grid_goal_name')},
            {dataIndex: 'actions', width: 100, header: _('actions'), renderer: Reachgoal.utils.renderActions, sortable: false, id: 'actions'}
        ]
    },
    getFields: function () {
        return ['id','event','form_id','form_selector','service','service_id','goal_name','actions'];
    },
    createItem: function (btn, e) {
        var id = 'reachgoal-goals-window-create';
        var w = Ext.getCmp(id);
        if (w) {
            w.close();
        }
        w = MODx.load({
            xtype: id,
            id: id,
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({});
        w.show(e.target);
    },
    getTbar: function (config) {
        return [{
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('add'),
            handler: this.createItem,
            scope: this
        }, '->',  {
            xtype: 'textfield',
            id: config.id + '-reachgoal-filter-query',
            emptyText: _('reachgoal_goals_grid_search_empty'),
            width: 250,
            listeners: {
                render: {
                    fn: function (field) {
                        field.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
                            this.filterSend();
                        }, this);
                    }, scope: this
                },
            }
        }, {
            xtype: 'button',
            text: '<i class="icon icon-search"></i>',
            handler: this.filterSend,
        }, {
            xtype: 'button',
            text: '<i class="icon icon-times"></i>',
            handler: this.filterClear,
        }];
    },
    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = Reachgoal.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },
    updateItem: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: Reachgoal.config.connector_url,
            params: {
                action: 'mgr/goals/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'reachgoal-goals-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },
    removeItem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: _('confirm'),
            text: _('remove'),
            url: this.config.url,
            params: {
                action: 'mgr/goals/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },
    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },
    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

    searchFields: ['query'],

    filterSend: function () {
        if (this.searchFields.length > 0) {
            for (var i = 0; i < this.searchFields.length; i++) {
                this.getStore().baseParams[this.searchFields[i]] = Ext.getCmp(this.id + '-reachgoal-filter-' + this.searchFields[i]).getValue();
            }
        }
        this.getBottomToolbar().changePage(1);
    },

    filterClear: function () {
        if (this.searchFields.length > 0) {
            for (var i = 0; i < this.searchFields.length; i++) {
                Ext.getCmp(this.id + '-reachgoal-filter-' + this.searchFields[i]).reset();
            }
        }
        this.filterSend();
    },
});
Ext.reg('reachgoal-grid-goals', Reachgoal.grid.Goals);
