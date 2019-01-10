define(function (require) {
  //  var $ = require('jquery'),
    var     fieldBuilder = require('app/field/fieldBuilder'),
        fieldcreate = require('app/field/fieldCreate'),
        bbsurveyCreate = require('app/bbsurveyCreate');
     //   Observer = require('./Observer'),
     //   jquerySlim = require('jquery-slim'),
      //  popper = require('popper'),
      //  bootstrap = require('bootstrap');
//$(function () {
    $.fn.survey = function (setting) {
      options = options || {};
      if (typeof setting === 'object') {
  
        if(setting.fields.length >0){
              var BBcreator =   new bbsurveyCreate(setting);
              BBcreator.initBbsurveyBuilder()
                        .create()
                      //  .setName($('#surveyname').val())
                        .showHtml()
                        .addEvent()
                      
              this.bbsurvey = BBcreator.bbsurveyBuilder.getBbsurvey()
              var bbsurvey = BBcreator.bbsurveyBuilder.getBbsurvey()
              var options = BBcreator.bbsurveyBuilder.getBbsurvey().getSetting();
              setting.fields.forEach(function (field) {
                if (typeof field.type === 'string') {     
                      var callfunction = 'fieldBuilder'+field.type.capitalize();
                      var Of = fieldBuilder[callfunction];
                     // var fieldselect = fieldBuilder.fieldBuilderSelect ;
                      var builder = new Of();
                      var fc =   new fieldcreate(builder , field);
                      fc.create();
                      fc.getField().showHtmlOf();
                      fc.setParent(bbsurvey);
                      fc.addEvent('click');

                      bbsurvey.addField(fc)
                     // bbsurvey.addField(fc.getField())
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
    var bbservey=   $('#BBsurvey').survey({
      title : 'questionnare' ,
      hasTopics : true,
      data: {
        type: "remote" ,
        source: {
           // url: "https://jazairfone.com/api/data.json" ,
           // url: "http://localhost/API/data.json" ,
           url: "http://localhost/API/data.php" ,
            
            method: "GET",
            dataType : 'json'
        }
      },
      data1: {
        // type: "remote" ,
         type: "local" ,
         source: { "name": "", "topics": [ { "name": "sssssss", "questions": [ { "value": "you situations ", "type": "Select", "options": [ "married", "sigle", "engaged" ], "attributes": [ { "name": "majuscule", "value": "non" }, { "name": "required", "value": true }, { "name": "discription", "value": "je suis une question qui est distine " }, { "name": "related1", "value": null } ] }, { "value": "you favorites tastes ", "type": "Multi", "options": [ "with choclate", "with banana" ], "attributes": [ { "name": "majuscule", "value": "oui" }, { "name": "required", "value": true }, { "name": "related1", "questionRelated": "you situations ", "value": "married" } ] }, { "value": "ss", "type": "Text", "options": [], "attributes": [ { "name": "majuscule", "value": "oui" }, { "name": "required", "value": true }, { "name": "related1", "questionRelated": "you situations ", "value": "sigle" } ] } ] } ] },

       },
     attributes :[{
            label : 'Majuscule',
            name : 'majuscule',
            value:'non' , 
            type:'Select' , 
            option:['oui' , 'non' ]
          },{
            label : 'Required field',
            name : 'required',
            value: true , 
            type: 'Boolean'
          }
      ],

      fields :[{
       label : 'field with related attr' ,
        name : 'text',
        type: 'Text' , 
        id: 'text' ,
        color : 'badge-danger',

      //  icon:
       // color : 
       attributes :[{
            label : 'related with', 
            name : 'related1',
            type:{
              name :'related',
              optionType : 'Select'
             // optionName : photo
            }
          }

        ]
      },{
        label : 'champe de type select' ,
        name : 'select',
        type: 'Select' , 
        id: 'select' ,
        attributes :[{
          label : 'discription',
          name : 'discription',
          value:'' , 
          type: 'Text'
          },
          {
              label : 'related with', 
              name : 'related1',
              type:{
                name :'related',
                optionType : 'Select'
               // optionName : photo
              }
            }
        ]
        
        
      },{
        label : 'Chapms de type date' ,
        name : 'champsdate',
        type: 'date' , 
        id: 'datedebut' ,
        attributes :[{
          label : 'Required field',
          name : 'required',
          value: true , 
          type: 'Boolean'
        }
      ]
      },{
        label : 'Chapms de type boolean' ,
        name : 'boolean',
        type: 'Boolean' , 
        id: 'boolean' ,
        attributes :[
      ]
      },{
        label : 'champs de type Multi' ,
        name : 'multi',
        type: 'Multi' , 
        id: 'multi' ,
        attributes :[
          
          {
              label : 'related with', 
              name : 'related1',
              type:{
                name :'related',
                optionType : 'Select'
               // optionName : photo
              }
            }
        ]
      },{
        label : 'champs de type number' ,
        name : 'number',
        type: 'Number' , 
        id: 'number' ,
        attributes :[
          
          {
              label : 'related with', 
              name : 'related1',
              type:{
                name :'related',
                optionType : 'Select'
               // optionName : photo
              }
            },
            {
              label : 'Maximam', 
              name : 'maximam',
              type: 'Number' , 
            },
            {
              label : 'Minimam', 
              name : 'minimam',
              type: 'Number' , 
            }
      ]
      }
      
      ]
    });

    //} )
})

