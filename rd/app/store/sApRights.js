Ext.define('Rd.store.sApRights', {
    extend: 'Ext.data.TreeStore',
    model: 'Rd.model.mApRight',
    autoLoad: true,
    proxy: {
            type: 'ajax',
            format  : 'json',
            batchActions: true, 
            url   : '/cake2/rd_cake/acos_rights/index_ap.json',
            reader: {
                type: 'json',
                rootProperty: 'items',
                messageProperty: 'message'
            },
            api: {
                read    : '/cake2/rd_cake/acos_rights/index_ap.json',
                update  : '/cake2/rd_cake/acos_rights/edit_ap.json'
            }
    },
    root: {alias: i18n('sDefault_Access_Provider_Rights'),leaf: false, id:'0', iconCls: 'root', expanded: false},
    folderSort: true,
    clearOnLoad: true,
    listeners: {
        load: function( store, records, a,successful,b) {
            if(!successful){
                Ext.ux.Toaster.msg(
                        i18n('sError_encountered'),
                        store.getProxy().getReader().rawData.message.message,
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
                );
            //console.log(store.getProxy().getReader().rawData.message.message);
            }  
        },
        scope: this
    }
});
