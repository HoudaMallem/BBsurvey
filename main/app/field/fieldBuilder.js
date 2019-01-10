define(['./Field' , '../attribute/attributeBuilder'], function (Field , attributeBuilder ) {
  //  var c1 = new Base('Controller 1');
   // return c1;
    var Builder = function(){

    };
    Builder.prototype.setId = function (id) {
        this.field.setId(id) ;
        return this ; 
    };
    Builder.prototype.setName = function (name) {
        this.field.setName(name) ;
        return this ; 
    };
    Builder.prototype.setLabel = function (label) {
        this.field.setLabel(label);
        return this ; 
    };
    Builder.prototype.setType = function (fieldType) {
        this.field.setType(fieldType) ;
        return this ; 
    };
    Builder.prototype.setAttribut = function (attribut) {
        this.field.setAttribut(attribut);
        return this ; 
    };
    Builder.prototype.setParent = function (parent) {
        this.field.setParent(parent);
        return this ; 
    };
    Builder.prototype.setIcon = function (icon) {
        this.field.setIcon(icon);
        return this ; 
    };
    Builder.prototype.setColor = function (color) {
        this.field.setColor(color);
        return this ; 
    };
    Builder.prototype.addAttribut = function (objattribute) {
        this.field.addAttribut(objattribute) ;
    };
    Builder.prototype.getField = function () {
        return this.field ; 
    };


    

    var fieldBuilderText = function(){
        var fieldtext = Field.fieldText ;
        this.field = new fieldtext();
    };
    fieldBuilderText.prototype = new Builder() ;
    var fieldBuilderSelect = function(){
        var fieldselect = Field.fieldSelect ;
        this.field = new fieldselect();
        var newattr = {
            label : 'Add options',
            name : 'options',
            type:'SelectSpecial' 
          }
        this.setAttribut = function (attribut) {
            attribut.unshift(newattr);
            this.field.setAttribut(attribut);
            return this ; 
        };
    };
    fieldBuilderSelect.prototype = new Builder() ;
    var fieldBuilderMulti = function(){
        var fieldmulti = Field.FieldMulti ;
        this.field = new fieldmulti();
        var newattr = {
            label : 'Add options',
            name : 'options',
            type:'SelectSpecial' 
          }
        this.setAttribut = function (attribut) {
            var newAtt  = attribut;
            newAtt.unshift(newattr);
            this.field.setAttribut(newAtt);
            return this ; 
        };
    };
    fieldBuilderMulti.prototype = new Builder() ;
    var fieldBuilderNumber = function(){
        var fieldnumber = Field.FieldNumber ;
        this.field = new fieldnumber();
    };
    fieldBuilderNumber.prototype = new Builder() ;

    var fieldBuilderBoolean = function(){
        
        var fieldboolean = Field.FieldBoolean ;
        this.field = new fieldboolean();
    };
    fieldBuilderBoolean.prototype = new Builder() ;

    var fieldBuilderDate = function(){
        var fielddate = Field.FieldDate ;
        this.field = new fielddate();
    };
    fieldBuilderDate.prototype = new Builder() ;
    var fieldBuilderFile = function(){
        var fieldfile = Field.FieldFile ;
        this.field = new fieldfile();
    };
    fieldBuilderFile.prototype = new Builder() ;
    return {
        fieldBuilderSelect : fieldBuilderSelect,
        fieldBuilderText : fieldBuilderText,
        fieldBuilderMulti : fieldBuilderMulti,
        fieldBuilderNumber : fieldBuilderNumber,
        fieldBuilderBoolean : fieldBuilderBoolean,
        fieldBuilderDate : fieldBuilderDate,
        fieldBuilderFile : fieldBuilderFile
    };
});
