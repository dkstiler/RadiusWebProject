Ext.define('Rd.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewP',
    requires:[
        'Ext.layout.container.Fit'
    ],
    layout: {
        type: 'fit'
    }
});

