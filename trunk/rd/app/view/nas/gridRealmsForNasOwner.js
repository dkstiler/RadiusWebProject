Ext.define('Rd.view.nas.gridRealmsForNasOwner' ,{
    extend:'Ext.grid.Panel',
    alias : 'widget.gridRealmsForNasOwner',
    border: false,
    requires:   ['Rd.view.components.advCheckColumn'],
    realFlag : false, 
    columns: [
        {xtype: 'rownumberer'},
        { text: 'Name',    dataIndex: 'name',      tdCls: 'gridTree', flex: 1},
        {
            xtype: 'advCheckColumn',
            text: 'Include',
            dataIndex: 'selected',
            renderer: function(value, meta, record) {
                var cssPrefix = Ext.baseCSSPrefix,
                cls = [cssPrefix + 'grid-checkheader'],
                disabled = false;
                if (value && disabled) {
                    cls.push(cssPrefix + 'grid-checkheader-checked-disabled');
                } else if (value) {
                    cls.push(cssPrefix + 'grid-checkheader-checked');
                } else if (disabled) {
                    cls.push(cssPrefix + 'grid-checkheader-disabled');
                }
                return '<div class="' + cls.join(' ') + '">&#160;</div>';
            }
        }
    ],
    bbar: [
        {   xtype: 'component', itemId: 'count',   tpl: 'Result count: {count}',   style: 'margin-right:5px', cls: 'lblYfi'  }
    ],
    initComponent: function(){

        //We have to create this treeview's own store since it is unique to the AP
        var me          = this;
        var urlUpdate   = '/cake2/rd_cake/realms/dummy_edit.json';

        if(me.realFlag){
            urlUpdate  = '/cake2/rd_cake/realms/update_na_realm.json';
            me.tbar = [ 
                { xtype: 'button',  iconCls: 'b-reload',    scale: 'large', itemId: 'reload',   tooltip:    i18n('sReload')},
                {xtype: 'checkboxfield',boxLabel  : 'Make available to sub-providers', boxLabelCls : 'lblRd',itemId: 'chkAvailSub'},
                '->',  
                { xtype: 'tbtext', text: 'Select one or more realms', cls: 'lblWizard' },         
            ];
        }else{
            me.tbar = [ 
                { xtype: 'button',  iconCls: 'b-reload',    scale: 'large', itemId: 'reload',   tooltip:    i18n('sReload')},'->',  
                { xtype: 'tbtext', text: 'Select one or more realms', cls: 'lblWizard' },         
            ];
        }


        
        //Create a store specific to this Owner
        me.store = Ext.create(Ext.data.Store,{
            model: 'Rd.model.mRealmForNasOwner',
            proxy: {
                type: 'ajax',
                format  : 'json',
                batchActions: true, 
                'url'   : '/cake2/rd_cake/realms/list_realms_for_nas_owner.json',
                reader: {
                    type: 'json',
                    root: 'items',
                    messageProperty: 'message'
                },
                api: {
                    update: urlUpdate
                }
            },
            listeners: {
                load: function(store, records, successful) {      
                    if(!successful){
                        Ext.ux.Toaster.msg(
                            'Error encountered',
                            store.getProxy().getReader().rawData.message.message,
                            Ext.ux.Constants.clsWarn,
                            Ext.ux.Constants.msgWarn
                        );
                        //console.log(store.getProxy().getReader().rawData.message.message);
                    }else{
                        var count   = me.getStore().getTotalCount();
                        me.down('#count').update({count: count});
                    }  
                },
                update: function(store, records, success, options) {
                    store.sync({
                        success: function(batch,options){
                           
                        },
                        failure: function(batch,options){
                          
                        }
                    });
                },
                scope: this
            },
            autoLoad: false    
        });
        me.callParent(arguments);
    }
});
