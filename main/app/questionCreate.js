define([ './Question' , './attribute/attributeBuilder', './attribute/attributeCreate' , 'jquery'], function ( Question , AttributeBuilder , AttributeCreate , $) {
document.i =1;
    var QuestionCreate = function(){}
    QuestionCreate.prototype.create = function (parent , fieldcurrent) {
        this.question = new Question(); 
        this.question.setField(fieldcurrent.getField());
        this.question.setType(fieldcurrent.getField().getType());
        this.question.setKey(parent.getKey()+'Q'+document.i);
        
        this.question.setColor(fieldcurrent.getField().getColor());
        this.question.setAttribut(fieldcurrent.getField().getAttribut());
        this.question.setParent(parent);
        document.i++;
        return this ; 
    };
    QuestionCreate.prototype.initAttribut = function(instanceQuestion){
      var Q =  this.question;
      var idAttr = 1
    var newListAttr = []
      Q.getAttribut().forEach(function (newAtrr) {
        var attr = {}
        attr = newAtrr ;
        attr.id = idAttr;
        if(instanceQuestion != undefined){
          var instantAttr = instanceQuestion.attributes.filter(attrValue => attrValue.name == attr.name)[0];
          attr.value = (instantAttr != undefined)? instantAttr.value: newAtrr.value;
        }
          if (typeof attr.type === 'string') {
            
              if(attr.type == 'SelectSpecial'){
                var callfunction = 'attributeBuilder'+attr.type
                attr.option  = (instanceQuestion != undefined)? instanceQuestion.options: []; 
              }else{
                var callfunction =  'attributeBuilder'+attr.type.capitalize() ;
               } 
              if(AttributeBuilder.hasOwnProperty(callfunction) ){
                var O = AttributeBuilder[callfunction];    
                var fc =   new AttributeCreate( new O() , attr);
                fc.setParent(Q);
                fc.create();
                Q.addAttribut(fc); 
 
              }
          } else if (typeof attr.type == 'object') {
            var callfunction =  'attributeBuilder'+attr.type.name.capitalize();
            if(AttributeBuilder.hasOwnProperty(callfunction) ){
              var O = AttributeBuilder[callfunction];    
              var fc =   new AttributeCreate( new O() , attr);
              fc.setParent(Q);
              fc.setOptionType(attr.type.optionType);
              fc.create();
              Q.addAttribut(fc); 
            }
          }else{
            throw new Error('Type of Attribute Incorrect must be an array ' );
          }
          newListAttr.push(attr)
          idAttr ++;
      });
      Q.setAttribut(newListAttr);
        return this ;
  };
  QuestionCreate.prototype.handleEventAttributes = function() {
    
    this.question.attributObjc.forEach(function (attr) {
      if(attr.getAttribute().type == 'SelectSpecial'){
            attr.addEvent('click'); 
            attr.addEvent('keypress'); 
      }    
    });
    return this;
  };

  QuestionCreate.prototype.setValue = function(value){
   (value !=''  && value != undefined) ?  this.question.setValue(value) :  this.question.setValue('');
 
   return this ;
  }
  QuestionCreate.prototype.addEvent = function() {
    var self = this.question ;
    
    var element2 ='rmQ-'+this.question.key
    var element3 ='shwAttr-'+this.question.key
    
    
    this.question.addEvent('click',element2,(event)=>{
      $(document).trigger("questionRemove",[ self]);  
    }); 
    this.question.addEvent('click',element3,(event)=>{
      console.log(self)
      $(document).trigger("showModalAttribut",[ self]);  
    }); 

    
      if(this.question.type == 'Select'){
        var element ='fieldname-'+this.question.key
        this.question.addEvent('blur',element ,(event)=>{
          $(document).trigger("updateGroupeOptionRelatedAttribute",[event , self]);  
        }); 
        
      }    

  };
    QuestionCreate.prototype.show =  function () {
      
     var id =  'TP'+this.question.getParent().key;
      $('#'+id+' #TPBD'+this.question.getParent().key).append( this.question.showHtml() );
      return this;
    }

      return QuestionCreate ;
});
