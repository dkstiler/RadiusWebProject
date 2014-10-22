Ext.define('Rd.view.meshes.winMeshEditNode', {
    extend      : 'Ext.window.Window',
    alias       : 'widget.winMeshEditNode',
    closable    : true,
    draggable   : true,
    resizable   : true,
    title       : 'Edit mesh node',
    width       : 400,
    height      : 450,
    plain       : true,
    border      : false,
    layout      : 'fit',
    iconCls     : 'add',
    glyph       : Rd.config.icnEdit,
    autoShow    : false,
    nodeId      : '',
	hidePower	: false,
    defaults: {
            border: false
    },
    requires: [
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Rd.view.meshes.cmbHardwareOptions',
		'Rd.view.meshes.cmbDialoutCode',
		'Rd.view.meshes.cmbCodec',
		'Rd.view.meshes.cmbSoftphoneSupport'
    ],
     initComponent: function() {
        var me 		= this; 
        var frmData = Ext.create('Ext.form.Panel',{
            border:     false,
            layout:     'fit',
            defaults: {
                anchor: '100%'
            },
            itemId:     'scrnData',
            autoScroll: true,
            fieldDefaults: {
                msgTarget       : 'under',
                labelClsExtra   : 'lblRd',
                labelAlign      : 'left',
                labelSeparator  : '',
                labelClsExtra   : 'lblRd',
                labelWidth      : Rd.config.labelWidth,
                maxWidth        : Rd.config.maxWidth, 
                margin          : Rd.config.fieldMargin
            },
            defaultType: 'textfield',
            buttons : [
                {
                    itemId: 'save',
                    text: i18n('sOK'),
                    scale: 'large',
                    iconCls: 'b-btn_ok',
                    glyph   : Rd.config.icnYes,
                    formBind: true,
                    margin: Rd.config.buttonMargin
                }
            ],
            items: [

				{
                    xtype   : 'tabpanel',
                    layout  : 'fit',
                    xtype   : 'tabpanel',
                    margins : '0 0 0 0',
                    plain   : true,
                    tabPosition: 'bottom',
                    border  : false,
                    items   : [
                        { 
                            'title'     : i18n('sCommon_settings'),
                            'layout'    : 'anchor',
                            itemId      : 'tabRequired',
                            defaults    : {
                                anchor: '100%'
                            },
                            autoScroll:true,
                            items       : [
                                {
						            itemId  : 'node_id',
						            xtype   : 'textfield',
						            name    : "id",
						            hidden  : true,
						            value   : me.nodeId
						        }, 
						        {
						            xtype       : 'textfield',
						            fieldLabel  : i18n('sMAC_address'),
						            name        : "mac",
						            allowBlank  : false,
						            blankText   : i18n('sSupply_a_value'),
						            labelClsExtra: 'lblRdReq',
						            vtype       : 'MacAddress',
						            fieldStyle  : 'text-transform:lowercase',
						            value       : 'A8-40-41-13-60-E3'
						        },
						        {
						            xtype       : 'textfield',
						            fieldLabel  : i18n('sName'),
						            name        : "name",
						            allowBlank  : false,
						            blankText   : i18n('sSupply_a_value'),
						            labelClsExtra: 'lblRdReq'
						        },
						        {
						            xtype       : 'textfield',
						            fieldLabel  : i18n('sDescription'),
						            name        : "description",
						            allowBlank  : true,
						            labelClsExtra: 'lblRd'
						        },
						        {
						            xtype           : 'cmbHardwareOptions',
						            labelClsExtra   : 'lblRdReq',
						            allowBlank      : false 
						        },
						        {
						            xtype       : 'sliderfield',
						            value       : 50,
						            increment   : 10,
						            minValue    : 1,
						            maxValue    : 100,
						            name        : 'power',
						            fieldLabel  : i18n('sTX_Power_br_percent_br'),
									disabled	: me.hidePower,
									hidden		: me.hidePower
						        },
						        {
						            xtype       : 'cmbStaticEntries',
						            meshId      : me.meshId,
						            nodeId      : me.nodeId

						        },
						        {
						            xtype       : 'cmbStaticExits',
						            meshId      : me.meshId,
						            nodeId      : me.nodeId
						        }
                            ]
                        },
						{
							title       : 'Radio settings',
                            disabled    : true,
							hidden		: true,
							bodyPadding	: 10,
                            itemId      : 'tabRadio',
                            autoScroll	:true,
                            items       : [
								//Radio0
								{
									xtype		: 'fieldset',
									title		: 'Radio0',
									defaultType	: 'textfield',
									defaults	: {
										anchor: '100%'
								},
								items: [
										{
											xtype       : 'checkbox',      
											fieldLabel  : 'Enable',
											itemId      : 'chkRadio0Enable',
											name        : 'radio0_enable',
											inputValue  : 'radio0_enable',
											checked     : false,
											labelClsExtra: 'lblRdReq'
								
										},
										{
											xtype       : 'checkbox',      
											fieldLabel  : 'Mesh',
											itemId      : 'chkRadio0Mesh',
											name        : 'radio0_mesh',
											inputValue  : 'radio0_mesh',
											checked     : false,
											labelClsExtra: 'lblRd'
								
										},
										{
											xtype       : 'checkbox',      
											fieldLabel  : 'Entry point',
											itemId      : 'chkRadio0Entry',
											name        : 'radio0_entry',
											inputValue  : 'radio0_entry',
											checked     : false,
											labelClsExtra: 'lblRd'
										},
										{
											xtype       : 'radio',
											fieldLabel  : '2.4G',
											name      	: 'radio0_band',
											inputValue	: '24',
											id        	: 'radio024',
											labelClsExtra: 'lblRd',
											checked		: true
										}, 
										{
											xtype       : 'radio',
											fieldLabel  : '5G',
											name      	: 'radio0_band',
											inputValue	: '5',
											id        	: 'radio05',
											labelClsExtra: 'lblRd'
										},
										{
										    xtype       : 'numberfield',
										    anchor      : '100%',
										    name        : 'radio0_two_chan',
										    fieldLabel  : i18n('s2_pt_4G_Channel'),
										    value       : 5,
										    maxValue    : 14,
										    minValue    : 1,
											hidden		: true,
											disabled	: false
										},
										{
										    xtype       : 'numberfield',
										    anchor      : '100%',
										    name        : 'radio0_five_chan',
										    fieldLabel  : i18n('s5G_Channel'),
										    value       : 44,
										    maxValue    : 116,
										    minValue    : 36,
										    step        : 8,
											hidden		: true,
											disabled	: false
										}	
									]
								},
								//Radio1
								{
									xtype		: 'fieldset',
									title		: 'Radio1',
									defaultType	: 'textfield',
									defaults	: {
										anchor: '100%'
								},
								items: [
										{
											xtype       : 'checkbox',      
											fieldLabel  : 'Enable',
											itemId      : 'chkRadio1Enable',
											name        : 'radio1_enable',
											inputValue  : 'radio1_enable',
											checked     : false,
											labelClsExtra: 'lblRdReq'
								
										},
										{
											xtype       : 'checkbox',      
											fieldLabel  : 'Mesh',
											itemId      : 'chkRadio1Mesh',
											name        : 'radio1_mesh',
											inputValue  : 'radio1_mesh',
											checked     : false,
											labelClsExtra: 'lblRd'
								
										},
										{
											xtype       : 'checkbox',      
											fieldLabel  : 'Entry point',
											itemId      : 'chkRadio1Entry',
											name        : 'radio1_entry',
											inputValue  : 'radio1_entry',
											checked     : false,
											labelClsExtra: 'lblRd'
										},
										{
											xtype       : 'radio', 
											fieldLabel  : '2.4G',
											name      	: 'radio1_band',
											inputValue	: '24',
											id        	: 'radio124',
											labelClsExtra: 'lblRd'
										}, 
										{
											xtype       : 'radio',
											fieldLabel  : '5G',
											name      	: 'radio1_band',
											inputValue	: '5',
											id        	: 'radio15',
											checked		: true,
											labelClsExtra: 'lblRd'
										},
										{
										    xtype       : 'numberfield',
										    anchor      : '100%',
										    name        : 'radio1_two_chan',
										    fieldLabel  : i18n('s2_pt_4G_Channel'),
										    value       : 5,
										    maxValue    : 14,
										    minValue    : 1,
											hidden		: true,
											disabled	: false
										},
										{
										    xtype       : 'numberfield',
										    anchor      : '100%',
										    name        : 'radio1_five_chan',
										    fieldLabel  : i18n('s5G_Channel'),
										    value       : 44,
										    maxValue    : 116,
										    minValue    : 36,
										    step        : 8,
											hidden		: true,
											disabled	: false
										}			
									]
								}
                            ]
                        },
                        { 
                            title       : 'VOIP',
                            layout      : 'anchor',
                            disabled    : true,
							hidden		: true,
                            itemId      : 'tabVoip',
                            defaults    : {
                                anchor: '100%'
                            },
                            autoScroll:true,
                            items       : [ 
								{
						            xtype       : 'checkbox',      
						            fieldLabel  : 'SIP enable',
						            itemId      : 'chkSip',
						            name        : 'enable',
						            inputValue  : 'enable',
						            checked     : false,
						            labelClsExtra: 'lblRdReq'
									
						        },
								{
						            xtype       : 'textfield',
						            fieldLabel  : 'SIP host',
						            name        : "host",
						            allowBlank  : true,
						            blankText   : i18n('sSupply_a_value'),
						            labelClsExtra: 'lblRdReq',
									disabled	: true
						        },
								{
						            xtype       : 'textfield',
						            fieldLabel  : 'Username',
						            name        : "username",
						            allowBlank  : true,
						            blankText   : i18n('sSupply_a_value'),
						            labelClsExtra: 'lblRdReq',
									disabled	: true
						        },
								{
						            xtype       : 'textfield',
						            fieldLabel  : 'Password',
						            name        : "secret",
						            allowBlank  : true,
						            blankText   : i18n('sSupply_a_value'),
						            labelClsExtra: 'lblRdReq',
									disabled	: true
						        },
								{
						            xtype       : 'cmbDialoutCode',
									labelClsExtra: 'lblRdReq',
									disabled	: true
						        }    
                            ]
                        },
						{ 
                            title       : 'VOIP - Advanced',
                            layout      : 'anchor',
                            disabled    : true,
							hidden		: true,
                            itemId      : 'tabVoipAdvanced',
                            defaults    : {
                                anchor: '100%'
                            },
                            autoScroll:true,
                            items       : [
								{
						            xtype       : 'checkbox',      
						            fieldLabel  : 'Asterisk enable',
						            itemId      : 'chkAsterisk',
						            name        : 'enable_ast',
						            inputValue  : 'enable_ast',
						            checked     : false,
						            labelClsExtra: 'lblRdReq'
						        },
								{
									xtype		: 'cmbSoftphoneSupport',
									disabled	: true
								},
        						{
									xtype		: 'cmbCodec',
									fieldLabel  : 'Codec1',
									name		: 'codec1',
									value		: 'gsm',
									labelClsExtra: 'lblRdReq',
									disabled	: true
								},
								{
									xtype		: 'cmbCodec',
									fieldLabel  : 'Codec2',
									name		: 'codec2',
									value		: 'ulaw',
									labelClsExtra: 'lblRdReq',
									disabled	: true
								},
								{
									xtype		: 'cmbCodec',
									fieldLabel  : 'Codec3',
									name		: 'codec3',
									value		: 'alaw',
									labelClsExtra: 'lblRdReq',
									disabled	: true
								},
								{
						            xtype       : 'checkbox',      
						            fieldLabel  : 'SIP Register',
						            itemId      : 'chkSipRegister',
						            name        : 'register',
						            inputValue  : 'register',
						            checked     : false,
						            labelClsExtra: 'lblRd',
									disabled	: true
						        },
								{
						            xtype       : 'textfield',
						            fieldLabel  : 'SIP registrar',
						            name        : "reghost",
						            allowBlank  : true,
						            blankText   : i18n('sSupply_a_value'),
						            labelClsExtra: 'lblRd',
									disabled	: true
						        },
								{
						            xtype       : 'checkbox',      
						            fieldLabel  : 'Enable Asterisk NAT',
						            itemId      : 'chkAsteriskNat',
						            name        : 'enablenat',
						            inputValue  : 'enablenat',
						            checked     : false,
						            labelClsExtra: 'lblRd',
									disabled	: true
						        },
								{
						            xtype       : 'textfield',
						            fieldLabel  : 'NAT external IP',
						            name        : "externip",
						            allowBlank  : true,
						            blankText   : i18n('sSupply_a_value'),
						            labelClsExtra: 'lblRd',
									disabled	: true
						        }
                            ]
                        } 
                    ]
                }                      
            ]
        });

        me.items = frmData;
        me.callParent(arguments);
    }
});
