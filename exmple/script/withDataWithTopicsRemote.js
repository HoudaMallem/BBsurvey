var BBsurveywithDataWithTopicsRemoteDemo = function() {
        var t = function() {
                var bbservey=   jQuery('#BBsurvey').survey({
                        title : 'questionnare' ,
                        hasTopics : true,
                        data: {
                          type: "remote" ,
                          source: {
                            url: "https://jazairfone.com/api/data.php" ,
                            dataType : 'json'
                          }
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
        BBsurveywithDataWithTopicsRemoteDemo.init()
      
      
      });