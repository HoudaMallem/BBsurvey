define(function (require) {
    var     fieldBuilder = require('app/field/fieldBuilder'),
        fieldcreate = require('app/field/fieldCreate'),
        bbsurveyCreate = require('app/bbsurveyCreate');
     Observer = require('./Observer'),

    $.fn.survey = function (setting) {
      options = options || {};
      if (typeof setting === 'object') {
  
        if(setting.fields.length >0){
              var BBcreator =   new bbsurveyCreate(setting);
              BBcreator.initBbsurveyBuilder()
                        .create()
                        .showHtml()
                        .addEvent()
                      
              this.bbsurvey = BBcreator.bbsurveyBuilder.getBbsurvey()
              var bbsurvey = BBcreator.bbsurveyBuilder.getBbsurvey()
              var options = BBcreator.bbsurveyBuilder.getBbsurvey().getSetting();
              setting.fields.forEach(function (field) {
                if (typeof field.type === 'string') {     
                      var callfunction = 'fieldBuilder'+field.type.capitalize();
                      var Of = fieldBuilder[callfunction];
                      var builder = new Of();
                      var fc =   new fieldcreate(builder , field);
                      fc.create();
                      fc.getField().showHtmlOf();
                      fc.setParent(bbsurvey);
                      fc.addEvent('click');

                      bbsurvey.addField(fc)
              }
          
            });
            BBcreator.initData();
            bbsurvey.getData = function(){
              return BBcreator.bbsurveyBuilder.getData();

            }
          return bbsurvey;
        }else{
          
                 throw new Error('Fields require to build survey ' );
        }

      }  else {
        throw new Error('Invalid arguments for survey: ' + options);
      }
    };
})

