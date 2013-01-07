Ext.define('Rd.view.realms.gridTags' ,{
    extend:'Ext.grid.Panel',
    alias : 'widget.gridTags',
    multiSelect: true,
    store : 'sTags',
    stateful: true,
    stateId: 'StateGridTags',
    stateEvents:['groupclick','columnhide'],
    border: false,
    requires: [
        'Rd.view.components.ajaxToolbar'
    ],
    urlMenu: '/cake2/rd_cake/tags/menu_for_grid.json',
    columns: [
        {xtype: 'rownumberer'},
        { text: 'Name',         dataIndex: 'name',    tdCls: 'gridTree', flex: 1},
        { text: 'Owner',        dataIndex: 'owner',        tdCls: 'gridTree', flex: 1},
        { 
            text:   'Available to sub-providers',
            flex: 1,  
            xtype:  'templatecolumn', 
            tpl:    new Ext.XTemplate(
                        "<tpl if='available_to_siblings == true'><div class=\"hasRight\">Yes</div></tpl>",
                        "<tpl if='available_to_siblings == false'><div class=\"noRight\">No</div></tpl>"
                    )
        }  
    ],
    bbar: [
        {   xtype: 'component', itemId: 'count',   tpl: i18n('sResult_count_{count}'),   style: 'margin-right:5px', cls: 'lblYfi' }
    ],
    initComponent: function(){
        var me  = this;
        me.tbar = Ext.create('Rd.view.components.ajaxToolbar',{'url': me.urlMenu});
        me.callParent(arguments);
    }
});
