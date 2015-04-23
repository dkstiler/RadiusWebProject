Ext.define('Rd.view.meshes.gridNodeLists' ,{
    extend		:'Ext.grid.Panel',
    alias 		: 'widget.gridNodeLists',
    multiSelect	: true,
    stateful	: true,
    stateId		: 'StateGridNodeLists',
    stateEvents	:['groupclick','columnhide'],
    border		: false,
	//store		: 'sNodeLists',
    requires	: [
        'Rd.view.components.ajaxToolbar'
    ],
    viewConfig: {
        loadMask:true
    },
    urlMenu: '/cake2/rd_cake/node_lists/menu_for_grid.json',
    bbar: [
        {   xtype: 'component', itemId: 'count',   tpl: i18n('sResult_count_{count}'),   style: 'margin-right:5px', cls: 'lblYfi' }
    ],
    initComponent: function(){
        var me      = this;

		me.store    = Ext.create(Rd.store.sNodeLists,{
            listeners: {
                load: function(store, records, successful) {
                    if(!successful){
                        Ext.ux.Toaster.msg(
                            i18n('sError_encountered'),
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
                            Ext.ux.Toaster.msg(
                                i18n('sUpdated_item'),
                                i18n('sItem_has_been_updated'),
                                Ext.ux.Constants.clsInfo,
                                Ext.ux.Constants.msgInfo
                            );   
                        },
                        failure: function(batch,options){
                            Ext.ux.Toaster.msg(
                                i18n('sProblems_updating_the_item'),
                                i18n('sItem_could_not_be_updated'),
                                Ext.ux.Constants.clsWarn,
                                Ext.ux.Constants.msgWarn
                            );
                        }
                    });
                },
                scope: this
            },
            autoLoad: false 
        });



		var filters = {
            ftype   : 'filters',
            encode  : true, 
            local   : false
        };
		me.features = [filters];

		me.tbar     = Ext.create('Rd.view.components.ajaxToolbar',{'url': me.urlMenu});
        me.columns  = [
            {xtype: 'rownumberer',stateId: 'StateGridNodeLists1', width: Rd.config.buttonMargin},
			{ text: i18n('sOwner'), dataIndex: 'owner', tdCls: 'gridTree', flex: 1,filter: {type: 'string'},stateId: 'StateGridNodeLists2'},
			{ text: 'Mesh',  dataIndex: 'mesh',  tdCls: 'gridTree', flex: 1,filter: {type: 'string'},stateId: 'StateGridNodeLists3'},
            { text: i18n('sName'),  dataIndex: 'name',  tdCls: 'gridTree', flex: 1,filter: {type: 'string'},stateId: 'StateGridNodeLists4'},
            { 
				text		: i18n('sDescription'), 
				dataIndex	: 'description',  
				tdCls		: 'gridTree', 
				flex		: 1,
				filter		: {type: 'string'},
				stateId		: 'StateGridNodeLists5'
			},
            { 
				text		: 'MAC Address',      	
				dataIndex	: 'mac',          
				tdCls		: 'gridTree', 
				flex		: 1,
				filter		: {type: 'string'},
				stateId: 'StateGridNodeLists6'
			},
            { 
				text		: i18n('sHardware'),      
				dataIndex	: 'hardware',     
				tdCls		: 'gridTree', 
				flex		: 1,
				filter		: {type: 'string'},
				stateId		: 'StateGridNodeLists7'
			},
			{ 

                text        : 'Last contact', 
                dataIndex   : 'last_contact',          
                tdCls       : 'gridTree', 
                flex        : 1,
                hidden      : false,
                xtype       : 'datecolumn',   
                format      :'Y-m-d H:i:s',
                filter      : {type: 'date',dateFormat: 'Y-m-d'},stateId: 'StateGridNodeLists8'
            },
            { text: i18n('sIP_Address'), dataIndex: 'ip', tdCls: 'gridTree', flex: 1,filter : {type: 'string'}, stateId: 'StateGridNodeLists9'}
        ];
        me.callParent(arguments);
    }
});