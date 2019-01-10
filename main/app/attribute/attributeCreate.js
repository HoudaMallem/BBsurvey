define(function () {
    var defaults ={
        id : 'id',
        label : 'Question ' ,
        name :'field',
        fieldType :'text',
        value : '',
        options : []
    }
    var AttributeCreate = function(attributeBuilder , option){
        let setting = $.extend( {}, defaults, option );
        this.setting = setting ;
        var self = this ;
        this.attributeBuilder = attributeBuilder;
            this.handleEvent = function(event) {
            
               if($('#'+event.target.id).attr('data-special') == 'add'){
                   if(event.target.value != ''){
                        let value = event.target.value
                        var key = event.which || event.keyCode;
                        if (key === 13) {
                            //$('#'+event.target.id).parents('.attributSelectSpecial').find('.newOptionSpecialSelect').val()
                            let newoption = $('<option value="'+event.target.value+'">'+event.target.value+'</option>')
                            $('#'+event.target.id).parents('div.attributSelectSpecial').find('select.specialSelectContainer').append(newoption)
                            $('#'+event.target.id).parents('.attributSelectSpecial').find('.newOptionSpecialSelect').val('')
                            self.getAttribute().addOption(value);
                            $(document).trigger("updateOptionRelatedAttribute",[value , this.getAttribute().getParent()]); 
                        // this.getAttribute().getParent().key
                        }
                   }

               }else   if($('#'+event.target.id).attr('data-special') == 'delete'){
                let value = event.target.value

                         $('#'+event.target.id).parents('div.attributSelectSpecial').find('select.specialSelectContainer option:selected').each(function() {
                            $(document).trigger("removeOptionRelatedAttribute",[$( this ).val()  , self.getAttribute().getParent()]); 
                            self.getAttribute().removeOption(value);
                            $( this ).remove() ;
                          });
                       

               }
 
            };
    }
    AttributeCreate.prototype.create = function () {
        this.attributeBuilder.setId(this.setting.id)
                            .setName(this.setting.name)
                            .setLabel(this.setting.label)
                            .setType(this.setting.type)
                            .setValue(this.setting.value)
                            .setOptions(this.setting.option);
                          //  .setOptionType(this.option.type.type);
                            
    };
    AttributeCreate.prototype.addEvent =function( eventtype ){
        if(eventtype =='click'){
            document.getElementById('void'+this.getAttribute().getParent().key+'-'+this.setting.id).addEventListener(eventtype, this , false);
        }else if(eventtype =='keypress') {
             document.getElementById('newOption'+this.getAttribute().getParent().key+'-'+this.setting.id).addEventListener(eventtype, this , false);
        }
    };
    AttributeCreate.prototype.setParent =  function (parent) {
        this.attributeBuilder.setParent(parent);
    }
    AttributeCreate.prototype.setOptionType =  function (optionType) {
        this.attributeBuilder.setOptionType(optionType);
    }
    AttributeCreate.prototype.getAttribute =  function () {
        return this.attributeBuilder.getAttribute();
    }
    AttributeCreate.prototype.showHtml =  function () {
        return this.attributeBuilder.getAttribute().showHtml();
    }
      return AttributeCreate ;
});
