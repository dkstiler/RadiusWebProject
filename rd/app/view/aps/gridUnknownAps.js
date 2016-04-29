Ext.define('Rd.view.aps.gridUnknownAps' ,{
    extend		:'Ext.grid.Panel',
    alias 		: 'widget.gridUnknownAps',
    multiSelect	: true,
    stateful	: true,
    stateId		: 'StateGridUnknownAps',
    stateEvents	:['groupclick','columnhide'],
    border		: false,
	store		: 'sUnknownAps',
    requires	: [
        'Rd.view.components.ajaxToolbar'
    ],
    viewConfig  : {
        loadMask    :true
    },
    urlMenu     : '/cake2/rd_cake/unknown_aps/menu_for_grid.json',
    plugins     : 'gridfilters',  //*We specify this
    initComponent: function(){
        var me      = this;
        
		me.tbar     = Ext.create('Rd.view.components.ajaxToolbar',{'url': me.urlMenu});
		me.bbar     =  [
            {
                 xtype       : 'pagingtoolbar',
                 store       : me.store,
                 dock        : 'bottom',
                 displayInfo : true
            }  
        ];
        
        me.columns  = [
 			{xtype: 'rownumberer',stateId: 'StateGridUnknownAps1'},
            { 
				text		: i18n("sMAC_address"),      	
				dataIndex	: 'mac',          
				tdCls		: 'gridMain', 
				flex		: 1,
				filter		: {type: 'string'},
				stateId: 'StateGridUnknownAps2'
			},
            { 
				text		: i18n("sVendor"),      
				dataIndex	: 'vendor',     
				tdCls		: 'gridTree', 
				flex		: 1,
				filter		: {type: 'string'},
				stateId		: 'StateGridUnknownAps3'
			},
			{ 
                text        : i18n("sLast_contact"),   
                dataIndex   : 'last_contact',  
                tdCls       : 'gridTree', 
                flex        : 1,
                renderer    : function(v,metaData, record){
                    var last_contact_human     = record.get('last_contact_human');
                    return "<div class=\"fieldBlue\">"+last_contact_human+"</div>";     
                },stateId: 'StateGridUnknownAps4'
            },
			{ 

                text        : i18n("sFrom_IP"), 
                dataIndex   : 'last_contact_from_ip',          
                tdCls       : 'gridTree', 
                flex        : 1,
                hidden      : false,  
                filter		: {type: 'string'},stateId: 'StateGridUnknownAps5'
            },
            { 
                text:   'Redirect To',
                flex: 1,
				hidden: false,  
                xtype:  'templatecolumn', 
                tpl         : new Ext.XTemplate(
                            "<tpl if='new_server'>",
                                "<tpl if='new_server_status == \"awaiting\"'><div class=\"fieldBlueWhite\">{new_server}</div></tpl>",
                                "<tpl if='new_server_status == \"fetched\"'><div class=\"fieldGreenWhite\">{new_server}</div></tpl>",
                            "</tpl>"
                ),
                dataIndex: 'new_server',
                filter  : {
                    type: 'boolean'    
                },stateId: 'StateGridUnknownAps6'
            }
        ];
        me.callParent(arguments);
    }
});
