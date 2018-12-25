//(function(jQuery){
    var BBsurveyWithDataWithoutTopicsLocalDemo = function() {
        var data ={ "name": "Creations and sewing", "questions": [ { "value": "What is your socio-professional category?", "type": "Select", "options": [ "Farmer", "Artisan", "trader", "Entrepreneur", "Liberal profession", "Senior executive or intellectual profession", "Intermediate occupation", "Employee", "Worker", "Retirement", "Jobseeker", "Man or Housewife", "Student, high school student", "Other" ], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "value": null }, { "name": "orderby", "value": "" } ] }, { "value": "name of your socio-professional category?", "type": "Text", "options": [], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "questionRelated": "What is your socio-professional category?", "value": "Other" }, { "name": "uppercase", "value": false } ] }, { "value": "Did you buy designer clothes ?", "type": "Boolean", "options": [], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "value": "" }] }, { "value": "Did you use the services of a seamstress for alterations ?", "type": "Boolean", "options": [], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "value": "" } ] }, { "value": "What would be the maximum price that you would be willing to pay for 1 simple dressmaking retouch?", "type": "Number", "options": [], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "value": "" }, { "name": "maximum", "value": "" }, { "name": "minimum", "value": "1" } ] }, { "value": "By what type (s) of sewing services would you be interested?", "type": "Multi", "options": [ "Various retouches", "Clothing creations", "Sportswear creations", "Creations for home and garden", "Animal creations" ], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "value": "" } ] }, { "value": "upload a photo of your favorite product", "type": "File", "options": [], "attributes": [ { "name": "require", "value": false }, { "name": "discription", "value": "" }, { "name": "related", "value": "" }, { "name": "format", "value": "jpeg" } ] } ] };
        var t = function() {
                var bbservey=   jQuery('#BBsurvey').survey({
                        title : 'questionnare' ,
                        hasTopics : false,
                        data: {
                            type: "local" ,
                            source: data
                          },
                        attributes :[{
                                label : 'Require',
                                name : 'require',
                                value: true , 
                                type:'Boolean' 
                                },{
                                label : 'Discription',
                                name : 'discription',
                                value: '' , 
                                type: 'Text'
                                },{
                                label : 'Related To',
                                name : 'related',
                                type:{
                                    name :'related',
                                    optionType : 'Select'
                                }
                                }
                            ],
                    
                        fields :[{
                            label : 'Text Field' ,
                            name : 'text',
                            type: 'Text' , 
                            // color : 'badge-danger',
                            attributes :[{
                                label : 'Uppercase Answer',
                                name : 'uppercase',
                                value : false , 
                                type: 'Boolean'
                            }
                    
                            ]
                            }
                            ,{
                            label : 'Date Field' ,
                            name : 'date',
                            type: 'Date' , 
                            id : 'datedebut'
                            },{
                            label : 'Boolean Field' ,
                            name : 'boolean',
                            type: 'Boolean' , 
                            id: 'boolean' 
                            },{
                            label : 'Number Field' ,
                            name : 'number',
                            type: 'Number' , 
                            id: 'number' ,
                            attributes :[
                                {
                                    label : 'Maximum', 
                                    name : 'maximum',
                                    type: 'Number' , 
                                },
                                {
                                    label : 'Minimum', 
                                    name : 'minimum',
                                    type: 'Number' , 
                                }
                            ]
                            },{
                            label : 'File Field' ,
                            name : 'photo',
                            type: 'File' , 
                            id: 'photo' ,
                            attributes :[{
                                label : 'Format Require',
                                name : 'format',
                                type:'Select' , 
                                option:['pdf' ,'csv' , 'jpeg' , 'png' ]
                            }
                            ]
                            },{
                            label : 'Multi Response Field' ,
                            name : 'multi',
                            type: 'Multi' , 
                            id: 'multi'
                    
                            },{
                            label : 'Select Field' ,
                            name : 'select',
                            type: 'Select' , 
                            attributes :[{
                                label : 'Answer order by',
                                name : 'orderby',
                                type:'Select' , 
                                option:['' , 'desc' , 'asc' ]
                            }
                            ]
                            }
                            
                            ]
                        });
                    
             
                      $('#getdata').click(function() {
                          document.getElementById("dataContainer").innerHTML = JSON.stringify(bbservey.getData(),  null, "\t");
                      });
      };
      
      return {
        init: function() {
          t()
        }
      }
      }();
      jQuery(document).ready(function() {
        BBsurveyWithDataWithoutTopicsLocalDemo.init()
      
      
      });