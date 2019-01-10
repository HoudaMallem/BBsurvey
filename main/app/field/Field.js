define(['jquery'] ,function ($) {
    var FieldBase = {
        id : 'id',
        label : 'Question ' ,
        name :'field',
        type :'text',
       
       // attribut : [],
        attributObjc : [],
        setId : function (id) {
            this.id = id ;
        },
        setName : function (name) {
            this.name = name ;
        },
        setLabel : function (label) {
            this.label = label ;
        },
        setType : function (type) {
            this.type = type ;
        },
        setAttribut : function (attribut) {
            this.attribut = attribut ;
        },
        setIcon : function (icon) {
            this.icon = icon ;
        },
        getIcon : function () {
            return this.icon  ;
        },
        setColor : function (color) {
            this.color = color ;
        },
        getColor : function () {
            return this.color  ;
        },
        getType : function () {
            return this.type  ;
        },
        getAttribut : function () {
            return this.attribut  ;
        },
        addAttribut : function (attribut) {
            this.attributObjc.push(attribut) ;
        },
        setParent : function (parent) {
            this.parent = parent;
        },
        getParent : function () {
            return this.parent ;
        },
        showHtmlOf  : function () {
            var  view ="<a href='#' class='list-group-item list-group-item-action field' name='"+this.name+"' id='"+this.id+"'><i class='far "+this.icon+" mr-3'></i>"
            view +=  this.label +'<span class="badge '+this.color + ' badge-pill float-right">'+this.type+'</span> </a>';      
            
            $('#fields-bbsurvey').append( view );
        }
    };
    var FieldSelect = function(){

            this.showHtml = function (Quest) {
                html='<input type="text" class="form-control  fieldname-'+Quest.key+'" id="fieldname-'+Quest.key+'" value="'+Quest.value+'" placeholder="'+this.label+'">';
              return html ;
    
               }
          
    };
       FieldSelect.prototype = FieldBase ;
    var FieldText = function(){
        this.showHtml = function (Quest) {
            html='<input type="text" class="form-control  fieldname-'+Quest.key+'" id="fieldname-'+Quest.key+'" value="'+Quest.value+'" placeholder="'+this.label+'">';
          return html ;
      
        }
   
    };
    FieldText.prototype = FieldBase ;

    var FieldNumber = function(){
        this.showHtml = function (Quest) {
            html='<input type="text" class="form-control  fieldname-'+Quest.key+'" id="fieldname-'+Quest.key+'" value="'+Quest.value+'" placeholder="'+this.label+'">';
          return html ;
        }
   
    };
    FieldNumber.prototype = FieldBase ;
    var FieldMulti = function(){
        this.showHtml = function (Quest) {
            html='<input type="text" class="form-control  fieldname-'+Quest.key+'" id="fieldname-'+Quest.key+'" value="'+Quest.value+'" placeholder="'+this.label+'">';
          return html ;
        }
   
    };
    FieldMulti.prototype = FieldBase ;
    var FieldBoolean = function(){
        this.showHtml = function (Quest) {
            html='<input type="text" class="form-control  fieldname-'+Quest.key+'" id="fieldname-'+Quest.key+'" value="'+Quest.value+'" placeholder="'+this.label+'">';
          return html ;
        }
   
    };
    FieldBoolean.prototype = FieldBase ;
    var FieldDate = function(){
        this.showHtml = function (Quest) {
            html='<input type="text" class="form-control  fieldname-'+Quest.key+'" id="fieldname-'+Quest.key+'" value="'+Quest.value+'" placeholder="'+this.label+'">';
          return html ;
        }
   
    };
    FieldDate.prototype = FieldBase ;
    var FieldFile = function(){
        this.showHtml = function (Quest) {
            html='<input type="text" class="form-control  fieldname-'+Quest.key+'" id="fieldname-'+Quest.key+'" value="'+Quest.value+'" placeholder="'+this.label+'">';
          return html ;
        }
   
    };
    FieldFile.prototype = FieldBase ;
    return {
        fieldSelect : FieldSelect,
        fieldText : FieldText,
        FieldNumber : FieldNumber,
        FieldMulti : FieldMulti,
        FieldBoolean : FieldBoolean,
        FieldDate : FieldDate,
        FieldFile : FieldFile
    };
});
