function i18n(b,a){return Local.getLocalizedString(b,a)}Local={languageCode:"ja",languageCodeDefault:"en",charset:"utf-8",languages:[],getLocalizedString:function(b,a){if(!this.localizedStrings[b]){return"Not Defined"}return(this.formatString(this.localizedStrings[b],a))},formatString:function(b,a){var d=b;if(a){var c=Ext.Object.getKeys(a);Ext.Array.forEach(c,function(e){d=d.replace("{"+e+"}",a[e])})}return d},localizedStrings:{}};