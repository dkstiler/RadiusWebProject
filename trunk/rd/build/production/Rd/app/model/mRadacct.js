Ext.define('Rd.model.mRadacct', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',           type: 'int'     },
        'acctsessionid',
        'acctuniqueid',
        'username',
        'groupname',
        'realm',
        'nasipaddress',
        'nasidentifier',
        'nasportid',
        'nasporttype',
        {name:'acctstarttime', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        'acctstoptime',
        'acctsessiontime',
        'acctauthentic',
        'connectinfo_start',
        'connectinfo_stop',
        'acctinputoctets',
        'acctoutputoctets',
        'calledstationid',
        'callingstationid',
        'acctterminatecause',
        'servicetype',
        'framedprotocol',
        'framedipaddress',
        'acctstartdelay',
        'acctstopdelay',
        'xascendsessionsvrkey',
        'user_type',
        'active'
        ]
});
