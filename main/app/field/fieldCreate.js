define([ '../questionCreate' , '../attribute/attributeBuilder' ], function ( QuestionCreate , AttributeBuilder) {
    var defaults ={
        id:"id",
        name : 'name',
        label : 'label default',
        type : 'text',
        color : 'badge-primary',
        icon : 'fa-list-alt',
        attribut : []
    }
    var FieldCreate = function(fieldBuilder , option){
        var setting = $.extend( {}, defaults, option );
        this.option = setting ;
        this.fieldBuilder = fieldBuilder;
        this.handleEvent = function(event) {
          //  console.log(this); 
            var self = this ;
            
            if(self.fieldBuilder.getField().getParent().hasTopics == false){
                var  parent =  self.fieldBuilder.getField().getParent();
                $(document).trigger("questionCreate",[ self , parent]);   
            }else if(self.fieldBuilder.getField().getParent().hasTopics == true){
              //  alert($('#listOfTopics').val())
              const selectTopics= $('#left-bbsurvey #listOfTopics').val();
            
                if( selectTopics != null && selectTopics !=""){
                    if (typeof selectTopics == 'object') {
                  
                        selectTopics.forEach(function (oneTopic) {
                            var  bbsurveyMain =  self.fieldBuilder.getField().getParent();
                            var  parent = bbsurveyMain.getChildrenByKey(oneTopic )[0]
                            $(document).trigger("questionCreate",[ self , parent]);   
                        })
                    }else{
                        var  bbsurveyMain =  self.fieldBuilder.getField().getParent();
                        var  parent = bbsurveyMain.getChildrenByKey( $('#listOfTopics').val() )[0]
                        $(document).trigger("questionCreate",[ self , parent]);   
                    }
                }else{
                    alert('select topic ')
                }
            }
          
          };
    }
    FieldCreate.prototype.create = function () {
        this.fieldBuilder.setId(this.option.id)
                        .setName(this.option.name)
                        .setLabel(this.option.label)
                        .setType(this.option.type)
                        .setColor(this.option.color)
                        .setIcon(this.option.icon)
                        .setAttribut(this.option.attributes);
                     //   .initAttribut() ;   
    };

    FieldCreate.prototype.setParent =  function (parent) {
        this.fieldBuilder.setParent(parent);
    }
    FieldCreate.prototype.addEvent =function(eventtype ){
       
        var self = this ;
        document.getElementById(this.option.id).addEventListener(eventtype, this , false);

    };
    FieldCreate.prototype.getField =  function () {
        return this.fieldBuilder.getField();
    }

    return FieldCreate ;
});
