Ext.define('Rd.view.tags.winTagEdit', {
    extend: 'Ext.window.Window',
    alias : 'widget.winTagEdit',
    title : 'Edit tag for NAS device',
    layout: 'fit',
    autoShow: false,
    width:    400,
    height:   400,
    iconCls: 'add',
    initComponent: function() {
        var me = this;
        this.items = [
            {
                xtype: 'form',
                border:     false,
                layout:     'anchor',
                itemId:     'scrnDirect',
                autoScroll: true,
                defaults: {
                    anchor: '100%'
                },
                fieldDefaults: {
                    msgTarget: 'under',
                    labelClsExtra: 'lblRd',
                    labelAlign: 'left',
                    labelSeparator: '',
                    margin: 15
                },
                defaultType: 'textfield',
                tbar: [
                    { xtype: 'tbtext', text: 'Supply the following', cls: 'lblWizard' }
                ],
                items: [
                    {
                        xtype:  'hiddenfield',
                        name:   'id',
                        hidden: true
                    },
                    {
                        xtype       : 'textfield',
                        fieldLabel  : 'Name',
                        name        : "name",
                        allowBlank  : false,
                        blankText   : "Enter a name for the tag",
                        labelClsExtra: 'lblRdReq'
                    },
                    {
                        xtype       : 'checkbox',      
                        boxLabel    : 'Make available to sub-providers',
                        name        : 'available_to_siblings',
                        inputValue  : 'available_to_siblings',
                        itemId      : 'a_to_s',
                        checked     : false,
                        boxLabelCls : 'lblRdReq'
                    }],
                buttons: [
                    {
                        itemId: 'save',
                        text: 'Next',
                        scale: 'large',
                        iconCls: 'b-next',
                        margin: '0 20 40 0'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
