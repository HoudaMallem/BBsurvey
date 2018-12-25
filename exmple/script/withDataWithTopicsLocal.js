var BBsurveyWithDataWithTopicsLocalDemo = function() {
    var data = { "name": "Store and loyalty card", "topics": [ { "name": " Personal information ", "questions": [ { "value": "You have :", "type": "Select", "options": [ "Under 20 years", "Between 20 and 29 years", "Between 30 and 39 years", "Between 40 and 49 years", "50 years or older" ], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "questionRelated": "You live :", "value": "Alone, without children" }, { "name": "orderby", "value": "asc" } ] }, { "value": "You live :", "type": "Select", "options": [ "Alone, without children", "In couple, without children", "In a relationship, with child" ], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "value": "" }, { "name": "orderby", "value": "asc" } ] }, { "value": "How many children under 18 live in your home?", "type": "Number", "options": [], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "questionRelated": "You live :", "value": "In a relationship, with child" }, { "name": "maximum", "value": "50" }, { "name": "minimum", "value": "1" } ] } ] }, { "name": "Aboute Store", "questions": [ { "value": "What type (s) of purchase (s) would you be likely to make in this store?", "type": "Multi", "options": [ "Foodstuffs", "Home care products", "Decoration products", "Body hygiene products", "Clothing" ], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "value": null } ] }, { "value": "What day (s) of the week would you be likely to visit in this store?", "type": "Multi", "options": [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ], "attributes": [ { "name": "require", "value": true }, { "name": "discription", "value": "" }, { "name": "related", "value": null } ] }, { "value": "what are your suggestions ?", "type": "Text", "options": [], "attributes": [ { "name": "require", "value": false }, { "name": "discription", "value": "" }, { "name": "related", "value": null }, { "name": "uppercase", "value": true } ] } ] } ] }

        var t = function() {
                var bbservey=   jQuery('#BBsurvey').survey({
                        title : 'questionnare' ,
                        hasTopics : true,
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
                          id : 'datedebut',
                          color : 'badge-danger', /** https://getbootstrap.com/docs/4.2/components/badge/#contextual-variations */
                          icon : 'far fa-clock', /** https://fontawesome.com/icons/clock?style=regular */
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
                          id: 'multi',
                          color : 'badge-light', /** https://getbootstrap.com/docs/4.2/components/badge/#contextual-variations */
                          icon : 'fas fa-list-ol' /** https://fontawesome.com/icons/list-ol?style=solid */
                  
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
        BBsurveyWithDataWithTopicsLocalDemo.init()
      
      
      });