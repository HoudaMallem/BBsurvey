define(function () {
    var Question = function(){
      //  this.field = field;
        //this.attribute = field.getAttribut();
        this.attributObjc =[];
        this.value='';
    };

    Question.prototype.setKey= function (key) {
      this.key = key;
    };
    Question.prototype.getKey= function () {
      return this.key;
    };
    Question.prototype.setField= function (field) {
         this.field = field;
    };
    Question.prototype.setType= function (type) {
      this.type = type;
    };
    Question.prototype.setAttribut = function (attributs) {
         this.attribute = attributs;
    };
    Question.prototype.setParent = function (parent) {
      this.parent = parent;
    };
    Question.prototype.setValue = function (value) {
      this.value = value;
    };
    Question.prototype.setColor = function (color) {
      this.color = color;
    };
    Question.prototype.getType= function () {
      return this.type ;
    };

    Question.prototype.getField= function () {
      return this.field;
    };
    Question.prototype.getAttribut = function () {
         return this.attribute ;
    };
    Question.prototype.getValue = function () {
      return this.value ;
    };
    Question.prototype.getAttributByType = function (type) {
      return  this.attribute.filter(attribute => attribute.type == type);
    };
    Question.prototype.getParent = function () {
      return this.parent ;
    };
    Question.prototype.addEvent =   function( eventtype ,element ,callback ){

      document.getElementById(element).addEventListener(eventtype, callback , false);
    };
    Question.prototype.addAttribut = function (objAttribut) {
        this.attributObjc.push(objAttribut) ;
    }
    Question.prototype.showHtml = function () {

      html="<div  id='"+this.key+"' class='oneQuestion border mb-3 p-3' data-key='"+this.key+"'>"
      html +='<div class="row justify-content-between headerQ" ><div class="col-1"><span class="badge  '+this.color+'">'+this.type+'</span></div><div class="col-10">'
      html += this.field.showHtml(this)
      html += '</div><div class="col-1">' 
      html +=  '<button type="button" class="btn btn-danger rounded-circle btn-sm" id="rmQ-'+this.key+'"> <i class="far fa-trash-alt"></i></button>'
      html +=   '<button type="button" class="btn btn-secces rounded-circle btn-sm" data-toggle="modal" data-target="#myModal-'+this.key+'" id="shwAttr-'+this.key+'"><i class="fas fa-cog"></i></button> ';       
      html +=  '</div> </div>' 
      html += '<div class="modal fade bd-example-modal-lg"  tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="myModal-'+this.key+'">'
        html +=    '<div class="modal-dialog modal-lg"> <div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalCenterTitle">'+this.type+'</h5>'
        html +='<button type="button" class="close" data-dismiss="modal" aria-label="Close">  <span aria-hidden="true">&times;</span></button></div><div class="modal-body"> <div class="container-fluid"> <div class="row form-group">'   
            this.attributObjc.forEach(function (attr) {
              html +=attr.getAttribute().showHtml(this.key);
    
            });   
            html += "</div></div></div> </div></div>";

      html +="</div></div></div>"
    
      return html ;
    };
    return Question ;
});
