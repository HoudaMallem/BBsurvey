/**
 * builder of attribut 
 */
define(['./Attribute'], function (Attribute) {
  //  var c1 = new Base('Controller 1');
   // return c1;
    var Builder = function(){

    };
    Builder.prototype.setId = function (id) {
        this.attribute.setId(id) ;
        return this ; 
    };
    Builder.prototype.setName = function (name) {
        this.attribute.setName(name) ;
        return this ; 
    };
    Builder.prototype.setLabel = function (label) {
        this.attribute.setLabel(label);
        return this ; 
    };
    Builder.prototype.setType = function (fieldType) {
        this.attribute.setType(fieldType) ;
        return this ; 
    };
    Builder.prototype.setValue = function (value) {
        this.attribute.setValue(value);
        return this ; 
    };
    Builder.prototype.setOptions = function (options) {
       
        (options != undefined ) ?  this.attribute.setOptions(options) :  this.attribute.setOptions([]);
        return this ; 
    };
    Builder.prototype.setParent = function (parent) {
        this.attribute.setParent(parent);
        return this ; 
    };
    Builder.prototype.getAttribute = function () {
        return this.attribute ;
    
    };
    Builder.prototype.setOptionType = function (fieldType) {
        this.attribute.setOptionType(fieldType) ;
        return this ; 
    
    };


    var AttributeBuilderText = function(){
        var attributeText = Attribute.attributText ;
        this.attribute = new attributeText();
    };
    AttributeBuilderText.prototype = new Builder() ;

    var AttributeBuilderNumber = function(){
        var attributeNumber = Attribute.attributNumber ;
        this.attribute = new attributeNumber();
    };
    AttributeBuilderNumber.prototype = new Builder() ;
    
    var AttributeBuilderSelect = function(){
        var attributeText = Attribute.attributSelect ;
        this.attribute = new attributeText();

    };
    AttributeBuilderSelect.prototype = new Builder() ;

    var AttributeBuilderBoolean = function(){
        var attributeboolean = Attribute.attributBoolean ;
        this.attribute = new attributeboolean();
    };
    AttributeBuilderBoolean.prototype = new Builder() ;

    var AttributeBuilderRelated = function(){
        var attributeRelated = Attribute.attributRelated ;
        this.attribute = new attributeRelated();
        this.setOptions = function () {
          //  if(this.attribute.getParent().getParent().getChildrenByType(this.attribute.optionType).length >0  )
            this.attribute.setOptions(this.attribute.getParent().getParent().getChildrenByType(this.attribute.optionType));
            return this ; 
        };
    };
    AttributeBuilderRelated.prototype = new Builder() ;

    var AttributeBuilderSelectSpecial = function(){

        var attributSelectSpecial = Attribute.attributSelectSpecial ;
        this.attribute = new attributSelectSpecial();
      
   };
   AttributeBuilderSelectSpecial.prototype = new Builder() ;
   
    return {
        attributeBuilderSelect : AttributeBuilderSelect,
        attributeBuilderText : AttributeBuilderText,
        attributeBuilderBoolean : AttributeBuilderBoolean,
        attributeBuilderSelectSpecial : AttributeBuilderSelectSpecial ,
        attributeBuilderRelated : AttributeBuilderRelated,
        attributeBuilderNumber : AttributeBuilderNumber
    };
});
