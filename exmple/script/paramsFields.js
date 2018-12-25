 var BBsurveyParamsFieldsDemo = function() {
        var t = function() {
                var bbservey=   jQuery('#BBsurvey').survey({
                        title : 'questionnare' ,
                        hasTopics : false,
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
                          color : 'badge-secondary', /** https://getbootstrap.com/docs/4.2/components/badge/#contextual-variations */
                          icon : 'fas fa-font', /** https://fontawesome.com/icons/font?style=solid */
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
                          id: 'boolean' ,
                          color : 'badge-success', /** https://getbootstrap.com/docs/4.2/components/badge/#contextual-variations */
                          icon : 'far fa-check-circle', /** https://fontawesome.com/icons/check-circle?style=regular  */
                        },{
                          label : 'Number Field' ,
                          name : 'number',
                          type: 'Number' , 
                          id: 'number' ,
                          color : 'badge-warning', /** https://getbootstrap.com/docs/4.2/components/badge/#contextual-variations */
                          icon : 'fas fa-sort-numeric-up', /** https://fontawesome.com/icons/sort-numeric-up?style=solid **/
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
                          color : 'badge-info', /** https://getbootstrap.com/docs/4.2/components/badge/#contextual-variations */
                          icon : 'fas fa-file-upload', /**https://fontawesome.com/icons/file-upload?style=solid */
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
                          color : 'badge-dark', /** https://getbootstrap.com/docs/4.2/components/badge/#contextual-variations */
                          icon : 'fas fa-ellipsis-v',/** https://fontawesome.com/icons/ellipsis-v?style=solid */
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
        BBsurveyParamsFieldsDemo.init()
      
      
      });