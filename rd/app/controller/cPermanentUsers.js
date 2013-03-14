Ext.define('Rd.controller.cPermanentUsers', {
    extend: 'Ext.app.Controller',
    actionIndex: function(){
        var me = this;
        var desktop = this.application.getController('cDesktop');
        var win = desktop.getWindow('permanentUsersWin');
        if(!win){
            win = desktop.createWindow({
                id: 'permanentUsersWin',
                title: i18n('sPermanent_Users'),
                width:800,
                height:400,
                iconCls: 'users',
                animCollapse:false,
                border:false,
                constrainHeader:true,
                layout: 'border',
                stateful: true,
                stateId: 'permanentUsersWin',
                items: [
                    {
                        region: 'north',
                        xtype:  'pnlBanner',
                        heading: i18n('sPermanent_Users'),
                        image:  'resources/images/48x48/users.png'
                    },
                    {
                        region  : 'center',
                        xtype   : 'tabpanel',
                        layout  : 'fit',
                        xtype   : 'tabpanel',
                        margins : '0 0 0 0',
                        border  : true,
                        items   : { 'title' : i18n('sPermanent_Users'), xtype: 'gridPermanentUsers'}
                    }
                ]
            });
        }
        desktop.restoreWindow(win);    
        return win;
    },

    views:  [
       'components.pnlBanner',  'permanentUsers.gridPermanentUsers',   'permanentUsers.winPermanentUserAddWizard',
       'components.cmbRealm',   'components.cmbProfile',  'components.cmbCap',
       'components.winNote',    'components.winNoteAdd',  'components.winCsvColumnSelect',
       'permanentUsers.pnlPermanentUser', 'permanentUsers.gridUserRadaccts', 'permanentUsers.gridUserRadpostauths',
        'permanentUsers.winPermanentUserPassword',  'components.winEnableDisable'
    ],
    stores: ['sLanguages', 'sAccessProvidersTree',    'sPermanentUsers', 'sRealms', 'sProfiles' ],
    models: ['mAccessProviderTree',     'mPermanentUser',  'mRealm',    'mProfile', 'mRadacct', 'mRadpostauth' ],
    selectedRecord: null,
    config: {
        urlAdd:             '/cake2/rd_cake/permanent_users/add.json',
      //  urlEdit:            '/cake2/rd_cake/profiles/edit.json',
        urlApChildCheck:    '/cake2/rd_cake/access_providers/child_check.json',
        urlExportCsv:       '/cake2/rd_cake/permanent_users/export_csv',
        urlNoteAdd:         '/cake2/rd_cake/permanent_users/note_add.json',
        urlViewBasic:       '/cake2/rd_cake/permanent_users/view_basic_info.json',
        urlEditBasic:       '/cake2/rd_cake/permanent_users/edit_basic_info.json',
        urlViewPersonal:    '/cake2/rd_cake/permanent_users/view_personal_info.json',
        urlEditPersonal:    '/cake2/rd_cake/permanent_users/edit_personal_info.json',
        urlViewTracking:    '/cake2/rd_cake/permanent_users/view_tracking.json',
        urlEnableDisable:   '/cake2/rd_cake/permanent_users/enable_disable.json',
        urlChangePassword:  '/cake2/rd_cake/permanent_users/change_password.json'
    },
    refs: [
        {  ref: 'grid',  selector:   'gridPermanentUsers'}       
    ],
    init: function() {
        var me = this;
        if (me.inited) {
            return;
        }
        me.inited = true;

        me.getStore('sPermanentUsers').addListener('load',me.onStorePermanentUsersLoaded, me);
        me.control({
            '#permanentUsersWin'    : {
                beforeshow:      me.winClose
            },
            '#permanentUsersWin'    : {
                destroy:      me.winClose
            },
            'gridPermanentUsers #reload': {
                click:      me.reload
            },
            'gridPermanentUsers #reload menuitem[group=refresh]'   : {
                click:      me.reloadOptionClick
            }, 
            'gridPermanentUsers #add'   : {
                click:      me.add
            },
            'gridPermanentUsers #delete'   : {
                click:      me.del
            },
            'gridPermanentUsers #edit'   : {
                click:      me.edit
            },
            'gridPermanentUsers #note'   : {
                click:      me.note
            },
            'gridPermanentUsers #csv'  : {
                click:      me.csvExport
            },
            'gridPermanentUsers #password'  : {
                click:      me.changePassword
            },
            'gridPermanentUsers #enable_disable' : {
                click:      me.enableDisable
            },
            'gridPermanentUsers'   : {
                select:      me.select
            },
            'winPermanentUserAddWizard' :{
                toFront: me.maskHide
            },
            'winPermanentUserAddWizard #btnTreeNext' : {
                click:  me.btnTreeNext
            },
            'winPermanentUserAddWizard #btnDataPrev' : {
                click:  me.btnDataPrev
            },
            'winPermanentUserAddWizard #btnDataNext' : {
                click:  me.btnDataNext
            },
            'winPermanentUserAddWizard #profile' : {
                change:  me.cmbProfileChange
            },
            'winPermanentUserAddWizard #always_active' : {
                change:  me.chkAlwaysActiveChange
            },
            'winPermanentUserAddWizard #to_date' : {
                change:  me.toDateChange
            },
            'winPermanentUserAddWizard #from_date' : {
                change:  me.fromDateChange
            },
            '#winCsvColumnSelectPermanentUsers':{
                toFront:       me.maskHide
            },
            '#winCsvColumnSelectPermanentUsers #save': {
                click:  me.csvExportSubmit
            },
            'gridNote[noteForGrid=permanentUsers] #reload' : {
                click:  me.noteReload
            },
            'gridNote[noteForGrid=permanentUsers] #add' : {
                click:  me.noteAdd
            },
            'gridNote[noteForGrid=permanentUsers] #delete' : {
                click:  me.noteDelete
            },
            'gridNote[noteForGrid=permanentUsers]' : {
                itemclick: me.gridNoteClick
            },
            'winNote[noteForGrid=permanentUsers]':{
                toFront:       me.maskHide
            },
            'winNoteAdd[noteForGrid=permanentUsers] #btnNoteTreeNext' : {
                click:  me.btnNoteTreeNext
            },
            'winNoteAdd[noteForGrid=permanentUsers] #btnNoteAddPrev'  : {   
                click: me.btnNoteAddPrev
            },
            'winNoteAdd[noteForGrid=permanentUsers] #btnNoteAddNext'  : {   
                click: me.btnNoteAddNext
            },
            'pnlPermanentUser gridUserRadpostauths #reload' :{
                click:      me.gridUserRadpostauthsReload
            },
            'pnlPermanentUser gridUserRadpostauths #delete' :{
                click:      me.genericDelete
            },
            'pnlPermanentUser gridUserRadpostauths' : {
                activate:      me.onUserRadpostauthsActivate
            },
            'pnlPermanentUser gridUserRadaccts #reload' :{
                click:      me.gridUserRadacctsReload
            },
            'pnlPermanentUser gridUserRadaccts #delete' :{
                click:      me.genericDelete
            },
            'pnlPermanentUser gridUserRadaccts' : {
                activate:      me.onUserRadacctsActivate
            },
            'pnlPermanentUser #profile' : {
                change:  me.cmbProfileChange
            },
            'pnlPermanentUser #always_active' : {
                change:  me.chkAlwaysActiveChange
            },
            'pnlPermanentUser #to_date' : {
                change:  me.toDateChange
            },
            'pnlPermanentUser #from_date' : {
                change:  me.fromDateChange
            },
            'pnlPermanentUser #tabBasicInfo' : {
                activate: me.onTabBasicInfoActive
            },
            'pnlPermanentUser #tabBasicInfo #save' : {
                click: me.saveBasicInfo
            },
            'pnlPermanentUser #tabPersonalInfo' : {
                activate: me.onTabPersonalInfoActive
            },
            'pnlPermanentUser #tabPersonalInfo #save' : {
                click: me.savePersonalInfo
            },
            'pnlPermanentUser #tabTracking' : {
                activate: me.onTabTrackingActive
            },
            'winEnableDisable #save': {
                click: me.enableDisableSubmit
            },
            'winPermanentUserPassword #save': {
                click: me.changePasswordSubmit
            }
        });
    },
    reload: function(){
        var me =this;
        me.getStore('sPermanentUsers').load();
    },
    maskHide:   function(){
        var me =this;
        me.getGrid().mask.hide();
    },
    add: function(button){  
        var me = this;
        me.getGrid().mask.show();
        //We need to do a check to determine if this user (be it admin or acess provider has the ability to add to children)
        //admin/root will always have, an AP must be checked if it is the parent to some sub-providers. If not we will 
        //simply show the nas connection typer selection 
        //if it does have, we will show the tree to select an access provider.
        Ext.Ajax.request({
            url: me.urlApChildCheck,
            method: 'GET',
            success: function(response){
                var jsonData    = Ext.JSON.decode(response.responseText);
                if(jsonData.success){
                        
                    if(jsonData.items.tree == true){
                        if(!me.application.runAction('cDesktop','AlreadyExist','winPermanentUserAddWizardId')){
                            var w = Ext.widget('winPermanentUserAddWizard',{
                                id:'winPermanentUserAddWizardId', selLanguage : me.application.getSelLanguage()
                            });
                            me.application.runAction('cDesktop','Add',w);         
                        }
                    }else{
                        if(!me.application.runAction('cDesktop','AlreadyExist','winPermanentUserAddWizardId')){
                            var w = Ext.widget('winPermanentUserAddWizard',{
                                id:'winPermanentUserAddWizardId',
                                startScreen: 'scrnData',
                                user_id:'0',
                                owner: i18n('sLogged_in_user'), 
                                no_tree: true,
                                selLanguage : me.application.getSelLanguage()
                            });
                            me.application.runAction('cDesktop','Add',w);         
                        }
                    }
                }   
            },
            scope: me
        });
    },
    btnTreeNext: function(button){
        var me = this;
        var tree = button.up('treepanel');
        //Get selection:
        var sr = tree.getSelectionModel().getLastSelected();
        if(sr){    
            var win = button.up('winPermanentUserAddWizard');
            win.down('#owner').setValue(sr.get('username'));
            win.down('#parent_id').setValue(sr.getId());
            win.getLayout().setActiveItem('scrnData');
        }else{
            Ext.ux.Toaster.msg(
                        i18n('sSelect_an_owner'),
                        i18n('sFirst_select_an_Access_Provider_who_will_be_the_owner'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }
    },
    btnDataPrev:  function(button){
        var me      = this;
        var win     = button.up('winPermanentUserAddWizard');
        win.getLayout().setActiveItem('scrnApTree');
    },
    btnDataNext:  function(button){
        var me      = this;
        var win     = button.up('window');
        var form    = win.down('form');
        form.submit({
            clientValidation: true,
            url: me.urlAdd,
            success: function(form, action) {
                win.close();
                me.getStore('sPermanentUsers').load();
                Ext.ux.Toaster.msg(
                    i18n('sNew_item_created'),
                    i18n('sItem_created_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure: Ext.ux.formFail
        });
    },

    cmbProfileChange:   function(cmb){
        var me      = this;
        var form    = cmb.up('form');
        var cmbCap  = form.down('cmbCap');
        var value   = cmb.getValue();
        var s = cmb.getStore();
        var r = s.getById(value);
        if(r != null){
            var cap = r.get('cap_in_profile');
            console.log(cap);
            if(cap){
                cmbCap.setVisible(true);
                cmbCap.setDisabled(false);
            }else{
                cmbCap.setVisible(false);
                cmbCap.setDisabled(true);
            }
        }
    },

    chkAlwaysActiveChange: function(chk){
        var me      = this;
        var form    = chk.up('form');
        var from    = form.down('#from_date');
        var to      = form.down('#to_date');
        var value   = chk.getValue();
        if(value){
            to.setVisible(false);
            to.setDisabled(true);
            from.setVisible(false);
            from.setDisabled(true);
        }else{
            to.setVisible(true);
            to.setDisabled(false);
            from.setVisible(true);
            from.setDisabled(false);
        }
    },

    toDateChange: function(d,newValue,oldValue){
        var me = this;
        var form = d.up('form');   
        var from_date = form.down('#from_date');
        if(newValue <= from_date.getValue()){
            Ext.ux.Toaster.msg(
                        i18n('sEnd_date_wrong'),
                        i18n('sThe_end_date_should_be_after_the_start_date'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }
    },

    fromDateChange: function(d,newValue, oldValue){
        var me = this;
        var form = d.up('form');
        var to_date = form.down('#to_date');
        if(newValue >= to_date.getValue()){
            Ext.ux.Toaster.msg(
                        i18n('sStart_date_wrong'),
                        i18n('sThe_start_date_should_be_before_the_end_date'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }
    },

    select: function(grid,record){
        var me = this;
        //Adjust the Edit and Delete buttons accordingly...
/*
        //Dynamically update the top toolbar
        tb = me.getGrid().down('toolbar[dock=top]');

        var edit = record.get('update');
        if(edit == true){
            if(tb.down('#edit') != null){
                tb.down('#edit').setDisabled(false);
            }
        }else{
            if(tb.down('#edit') != null){
                tb.down('#edit').setDisabled(true);
            }
        }

        var del = record.get('delete');
        if(del == true){
            if(tb.down('#delete') != null){
                tb.down('#delete').setDisabled(false);
            }
        }else{
            if(tb.down('#delete') != null){
                tb.down('#delete').setDisabled(true);
            }
        }
*/
    },

      edit:   function(){
        console.log("Edit node");  
        var me = this;
        //See if there are anything selected... if not, inform the user
        var sel_count = me.getGrid().getSelectionModel().getCount();
        if(sel_count == 0){
            Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{

            var selected    =  me.getGrid().getSelectionModel().getSelection();
            var count       = selected.length;         
            Ext.each(me.getGrid().getSelectionModel().getSelection(), function(sr,index){

                //Check if the node is not already open; else open the node:
                var tp          = me.getGrid().up('tabpanel');
                var pu_id       = sr.getId();
                var pu_tab_id   = 'puTab_'+pu_id;
                var nt          = tp.down('#'+pu_tab_id);
                if(nt){
                    tp.setActiveTab(pu_tab_id); //Set focus on  Tab
                    return;
                }

                var pu_tab_name = sr.get('username');
                //Tab not there - add one
                tp.add({ 
                    title :     pu_tab_name,
                    itemId:     pu_tab_id,
                    closable:   true,
                    iconCls:    'edit', 
                    layout:     'fit', 
                    items:      {'xtype' : 'pnlPermanentUser',pu_id: pu_id, pu_name: pu_tab_name}
                });
                tp.setActiveTab(pu_tab_id); //Set focus on Add Tab
                //Load the record:
                var nt  = tp.down('#'+pu_tab_id);
               // var f   = nt.down('form');
               // f.loadRecord(sr);    //Load the record
                //Get the parent node
              //  f.down("#owner").setValue(sr.get('owner'));
            });
        }
    },

    del:   function(){
        var me      = this;     
        //Find out if there was something selected
        if(me.getGrid().getSelectionModel().getCount() == 0){
             Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item_to_delete'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{
            Ext.MessageBox.confirm(i18n('sConfirm'), i18n('sAre_you_sure_you_want_to_do_that_qm'), function(val){
                if(val== 'yes'){
                    me.getGrid().getStore().remove(me.getGrid().getSelectionModel().getSelection());
                    me.getGrid().getStore().sync({
                        success: function(batch,options){
                            Ext.ux.Toaster.msg(
                                i18n('sItem_deleted'),
                                i18n('sItem_deleted_fine'),
                                Ext.ux.Constants.clsInfo,
                                Ext.ux.Constants.msgInfo
                            );
                            me.onStorePermanentUsersLoaded();   //Update the count   
                        },
                        failure: function(batch,options,c,d){
                            Ext.ux.Toaster.msg(
                                i18n('sProblems_deleting_item'),
                                batch.proxy.getReader().rawData.message.message,
                                Ext.ux.Constants.clsWarn,
                                Ext.ux.Constants.msgWarn
                            );
                            me.getGrid().getStore().load(); //Reload from server since the sync was not good
                        }
                    });
                }
            });
        }
    },
    onStorePermanentUsersLoaded: function() {
        var me      = this;
        var count   = me.getStore('sPermanentUsers').getTotalCount();
        me.getGrid().down('#count').update({count: count});
    },

    csvExport: function(button,format) {
        var me          = this;
        me.getGrid().mask.show(); 
        var columns     = me.getGrid().columns;
        var col_list    = [];
        Ext.Array.each(columns, function(item,index){
            if(item.dataIndex != ''){
                var chk = {boxLabel: item.text, name: item.dataIndex, checked: true};
                col_list[index] = chk;
            }
        }); 

        if(!me.application.runAction('cDesktop','AlreadyExist','winCsvColumnSelectPermanentUsers')){
            var w = Ext.widget('winCsvColumnSelect',{id:'winCsvColumnSelectPermanentUsers',columns: col_list});
            me.application.runAction('cDesktop','Add',w);         
        }
    },
    csvExportSubmit: function(button){

        var me      = this;
        var win     = button.up('window');
        var form    = win.down('form');

        var chkList = form.query('checkbox');
        var c_found = false;
        var columns = [];
        var c_count = 0;
        Ext.Array.each(chkList,function(item){
            if(item.getValue()){ //Only selected items
                c_found = true;
                columns[c_count] = {'name': item.getName()};
                c_count = c_count +1; //For next one
            }
        },me);

        if(!c_found){
            Ext.ux.Toaster.msg(
                        i18n('sSelect_one_or_more'),
                        i18n('sSelect_one_or_more_columns_please'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{     
            //next we need to find the filter values:
            var filters     = [];
            var f_count     = 0;
            var f_found     = false;
            var filter_json ='';
            me.getGrid().filters.filters.each(function(item) {
                if (item.active) {
                    f_found         = true;
                    var ser_item    = item.serialize();
                    ser_item.field  = item.dataIndex;
                    filters[f_count]= ser_item;
                    f_count         = f_count + 1;
                }
            });   
            var col_json        = "columns="+Ext.JSON.encode(columns);
            var extra_params    = Ext.Object.toQueryString(Ext.Ajax.extraParams);
            var append_url      = "?"+extra_params+'&'+col_json;
            if(f_found){
                filter_json = "filter="+Ext.JSON.encode(filters);
                append_url  = append_url+'&'+filter_json;
            }
            window.open(me.urlExportCsv+append_url);
            win.close();
        }
    },
    note: function(button,format) {
        var me      = this;
        me.getGrid().mask.show();      
        //Find out if there was something selected
        var sel_count = me.getGrid().getSelectionModel().getCount();
        if(sel_count == 0){
            me.maskHide();
             Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{
            if(sel_count > 1){
                me.maskHide();
                Ext.ux.Toaster.msg(
                        i18n('sLimit_the_selection'),
                        i18n('sSelection_limited_to_one'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
                );
            }else{

                //Determine the selected record:
                var sr = me.getGrid().getSelectionModel().getLastSelected();
                
                if(!me.application.runAction('cDesktop','AlreadyExist','winNotePermananetUsers'+sr.getId())){
                    var w = Ext.widget('winNote',
                        {
                            id          : 'winNotePermananetUsers'+sr.getId(),
                            noteForId   : sr.getId(),
                            noteForGrid : 'permanentUsers',
                            noteForName : sr.get('username')
                        });
                    me.application.runAction('cDesktop','Add',w);       
                }
            }    
        }
    },
    noteReload: function(button){
        var me      = this;
        var grid    = button.up('gridNote');
        grid.getStore().load();
    },
    noteAdd: function(button){
        var me      = this;
        var grid    = button.up('gridNote');
        //See how the wizard should be displayed:
        Ext.Ajax.request({
            url: me.urlApChildCheck,
            method: 'GET',
            success: function(response){
                var jsonData    = Ext.JSON.decode(response.responseText);
                if(jsonData.success){                      
                    if(jsonData.items.tree == true){
                        if(!me.application.runAction('cDesktop','AlreadyExist','winNotePermananetUsersAdd'+grid.noteForId)){
                            var w   = Ext.widget('winNoteAdd',
                            {
                                id          : 'winNotePermananetUsersAdd'+grid.noteForId,
                                noteForId   : grid.noteForId,
                                noteForGrid : grid.noteForGrid,
                                refreshGrid : grid
                            });
                            me.application.runAction('cDesktop','Add',w);       
                        }
                    }else{
                        if(!me.application.runAction('cDesktop','AlreadyExist','winNotePermananetUsersAdd'+grid.noteForId)){
                            var w   = Ext.widget('winNoteAdd',
                            {
                                id          : 'winNotePermananetUsersAdd'+grid.noteForId,
                                noteForId   : grid.noteForId,
                                noteForGrid : grid.noteForGrid,
                                refreshGrid : grid,
                                startScreen : 'scrnNote',
                                user_id     : '0',
                                owner       : i18n('sLogged_in_user'),
                                no_tree     : true
                            });
                            me.application.runAction('cDesktop','Add',w);       
                        }
                    }
                }   
            },
            scope: me
        });
    },
    gridNoteClick: function(item,record){
        var me = this;
        //Dynamically update the top toolbar
        grid    = item.up('gridNote');
        tb      = grid.down('toolbar[dock=top]');
        var del = record.get('delete');
        if(del == true){
            if(tb.down('#delete') != null){
                tb.down('#delete').setDisabled(false);
            }
        }else{
            if(tb.down('#delete') != null){
                tb.down('#delete').setDisabled(true);
            }
        }
    },
    btnNoteTreeNext: function(button){
        var me = this;
        var tree = button.up('treepanel');
        //Get selection:
        var sr = tree.getSelectionModel().getLastSelected();
        if(sr){    
            var win = button.up('winNoteAdd');
            win.down('#owner').setValue(sr.get('username'));
            win.down('#user_id').setValue(sr.getId());
            win.getLayout().setActiveItem('scrnNote');
        }else{
            Ext.ux.Toaster.msg(
                        i18n('sSelect_an_owner'),
                        i18n('sFirst_select_an_Access_Provider_who_will_be_the_owner'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }
    },
    btnNoteAddPrev: function(button){
        var me = this;
        var win = button.up('winNoteAdd');
        win.getLayout().setActiveItem('scrnApTree');
    },
    btnNoteAddNext: function(button){
        var me      = this;
        var win     = button.up('winNoteAdd');
        console.log(win.noteForId);
        console.log(win.noteForGrid);
        win.refreshGrid.getStore().load();
        var form    = win.down('form');
        form.submit({
            clientValidation: true,
            url: me.urlNoteAdd,
            params: {for_id : win.noteForId},
            success: function(form, action) {
                win.close();
                win.refreshGrid.getStore().load();
                me.reload();
                Ext.ux.Toaster.msg(
                    i18n('sNew_item_created'),
                    i18n('sItem_created_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure: Ext.ux.formFail
        });
    },
    noteDelete: function(button){
        var me      = this;
        var grid    = button.up('gridNote');
        //Find out if there was something selected
        if(grid.getSelectionModel().getCount() == 0){
             Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{
            Ext.MessageBox.confirm(i18n('sConfirm'), i18n('sAre_you_sure_you_want_to_do_that_qm'), function(val){
                if(val== 'yes'){
                    grid.getStore().remove(grid.getSelectionModel().getSelection());
                    grid.getStore().sync({
                        success: function(batch,options){
                            Ext.ux.Toaster.msg(
                                i18n('sItem_deleted'),
                                i18n('sItem_deleted_fine'),
                                Ext.ux.Constants.clsInfo,
                                Ext.ux.Constants.msgInfo
                            );
                            grid.getStore().load();   //Update the count
                            me.reload();   
                        },
                        failure: function(batch,options,c,d){
                            Ext.ux.Toaster.msg(
                                i18n('sProblems_deleting_item'),
                                batch.proxy.getReader().rawData.message.message,
                                Ext.ux.Constants.clsWarn,
                                Ext.ux.Constants.msgWarn
                            );
                            grid.getStore().load(); //Reload from server since the sync was not good
                        }
                    });
                }
            });
        }
    },
    changePassword: function(){
        var me = this;
        console.log("Changing password");
         //Find out if there was something selected
        var sel_count = me.getGrid().getSelectionModel().getCount();
        if(sel_count == 0){
            me.maskHide();
             Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{
            if(sel_count > 1){
                me.maskHide();
                Ext.ux.Toaster.msg(
                        i18n('sLimit_the_selection'),
                        i18n('sSelection_limited_to_one'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
                );
            }else{

                //Determine the selected record:
                var sr = me.getGrid().getSelectionModel().getLastSelected(); 
                if(!me.application.runAction('cDesktop','AlreadyExist','winPermanentUsersPassword'+sr.getId())){
                    var w = Ext.widget('winPermanentUserPassword',
                        {
                            id          : 'winPermanentUsersPassword'+sr.getId(),
                            user_id     : sr.getId(),
                            username    : sr.get('username'),
                            title       : i18n('sChange_password for')+' '+sr.get('username')
                        });
                    me.application.runAction('cDesktop','Add',w);       
                }
            }    
        }
    },
    changePasswordSubmit: function(button){
        var me      = this;
        var win     = button.up('window');
        var form    = win.down('form');

        var extra_params        = {};
        var sr                  = me.getGrid().getSelectionModel().getLastSelected();
        extra_params['user_id'] = sr.getId();

        //Checks passed fine...      
        form.submit({
            clientValidation    : true,
            url                 : me.urlChangePassword,
            params              : extra_params,
            success             : function(form, action) {
                win.close();
                me.reload();
                Ext.ux.Toaster.msg(
                    i18n('sPassword_changed'),
                    i18n('sPassword_changed_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure             : Ext.ux.formFail
        });
    },
    enableDisable: function(button){
        var me      = this;
        var grid    = button.up('grid');
        //Find out if there was something selected
        if(grid.getSelectionModel().getCount() == 0){
            me.maskHide(); 
             Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item_to_edit'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{
            if(!me.application.runAction('cDesktop','AlreadyExist','winEnableDisableUser')){
                var w = Ext.widget('winEnableDisable',{id:'winEnableDisableUser'});
                me.application.runAction('cDesktop','Add',w);       
            }    
        }
    },
    enableDisableSubmit:function(button){

        var me      = this;
        var win     = button.up('window');
        var form    = win.down('form');

        var extra_params    = {};
        var s               = me.getGrid().getSelectionModel().getSelection();
        Ext.Array.each(s,function(record){
            var r_id = record.getId();
            extra_params[r_id] = r_id;
        });

        //Checks passed fine...      
        form.submit({
            clientValidation    : true,
            url                 : me.urlEnableDisable,
            params              : extra_params,
            success             : function(form, action) {
                win.close();
                me.reload();
                Ext.ux.Toaster.msg(
                    i18n('sItems_modified'),
                    i18n('sItems_modified_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure             : Ext.ux.formFail
        });
    },
    onUserRadpostauthsActivate: function(g){
        var me = this;
        g.getStore().load();
    },
    gridUserRadpostauthsReload: function(button){
        var me  = this;
        var g = button.up('gridUserRadpostauths');
        g.getStore().reload();
    },
    onUserRadacctsActivate: function(g){
        var me = this;
        g.getStore().load();
    },
    gridUserRadacctsReload: function(button){
        var me  = this;
        var g = button.up('gridUserRadaccts');
        g.getStore().reload();
    },
    genericDelete:   function(button){
        var me      = this;
        var grid    = button.up('grid');
        console.log("Generic delete clicked...");    
        //Find out if there was something selected
        if(grid.getSelectionModel().getCount() == 0){
             Ext.ux.Toaster.msg(
                        i18n('sSelect_an_item'),
                        i18n('sFirst_select_an_item_to_delete'),
                        Ext.ux.Constants.clsWarn,
                        Ext.ux.Constants.msgWarn
            );
        }else{
            Ext.MessageBox.confirm(i18n('sConfirm'), i18n('sAre_you_sure_you_want_to_do_that_qm'), function(val){
                if(val== 'yes'){
                    grid.getStore().remove(grid.getSelectionModel().getSelection());
                    grid.getStore().sync({
                        success: function(batch,options){
                            Ext.ux.Toaster.msg(
                                i18n('sItem_deleted'),
                                i18n('sItem_deleted_fine'),
                                Ext.ux.Constants.clsInfo,
                                Ext.ux.Constants.msgInfo
                            );
                            grid.getStore().load();  
                        },
                        failure: function(batch,options,c,d){
                            Ext.ux.Toaster.msg(
                                i18n('sProblems_deleting_item'),
                                batch.proxy.getReader().rawData.message.message,
                                Ext.ux.Constants.clsWarn,
                                Ext.ux.Constants.msgWarn
                            );
                            grid.getStore().load(); //Reload from server since the sync was not good
                        }
                    });
                }
            });
        }
    },
    reloadOptionClick: function(menu_item){
        var me      = this;
        var n       = menu_item.getItemId();
        var b       = menu_item.up('button'); 
        var interval= 30000; //default
        clearInterval(me.autoReload);   //Always clear
        b.setIconCls('b-reload_time');
        
        if(n == 'mnuRefreshCancel'){
            b.setIconCls('b-reload');
            return;
        }
        
        if(n == 'mnuRefresh1m'){
           interval = 60000
        }

        if(n == 'mnuRefresh5m'){
           interval = 360000
        }
        me.autoReload = setInterval(function(){        
            me.reload();
        },  interval);  
    },
    onTabBasicInfoActive: function(t){
        var me      = this;
        var form    = t.down('form');
        //get the user's id
        var user_id = t.up('pnlPermanentUser').pu_id;
        form.load({url:me.urlViewBasic, method:'GET',params:{user_id:user_id}});
    },
    saveBasicInfo:function(button){

        var me      = this;
        var form    = button.up('form');
        //Checks passed fine...      
        form.submit({
            clientValidation    : true,
            url                 : me.urlEditBasic,
            success             : function(form, action) {
                me.reload();
                Ext.ux.Toaster.msg(
                    i18n('sItems_modified'),
                    i18n('sItems_modified_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure             : Ext.ux.formFail
        });
    },
    onTabPersonalInfoActive: function(t){
        var me      = this;
        var form    = t.down('form');
        //get the user's id
        var user_id = t.up('pnlPermanentUser').pu_id;
        form.load({url:me.urlViewPersonal, method:'GET',params:{user_id:user_id}});
    },
    savePersonalInfo:function(button){

        var me      = this;
        var form    = button.up('form');
        var user_id = button.up('pnlPermanentUser').pu_id;
        //Checks passed fine...      
        form.submit({
            clientValidation    : true,
            url                 : me.urlEditPersonal,
            params              : {id: user_id},
            success             : function(form, action) {
                me.reload();
                Ext.ux.Toaster.msg(
                    i18n('sItems_modified'),
                    i18n('sItems_modified_fine'),
                    Ext.ux.Constants.clsInfo,
                    Ext.ux.Constants.msgInfo
                );
            },
            failure             : Ext.ux.formFail
        });
    },
     onTabTrackingActive: function(t){
        var me      = this;
        var form    = t.down('form');
        //get the user's id
        var user_id = t.up('pnlPermanentUser').pu_id;
        form.load({url:me.urlViewTracking, method:'GET',params:{user_id:user_id}});
    },
    winClose:   function(){
        var me = this;
        console.log("Clear interval");
        if(me.autoReload != undefined){
            clearInterval(me.autoReload);   //Always clear
        }
    }
});
