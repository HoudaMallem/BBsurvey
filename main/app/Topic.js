define( function () {
    var topic = function(){
        this.composites = [];

    };
    topic.prototype.setKey= function (key) {
        this.key = key;
      };
      topic.prototype.setName= function (name) {
        this.name = name;
      };
      topic.prototype.getName= function () {
        return this.name ;
      };
      topic.prototype.setParent = function (parent) {
        this.parent = parent;
      };
      topic.prototype.getParent = function () {
        return this.parent ;
      };
      topic.prototype.getKey= function () {
        return this.key;
      };
    topic.prototype.addComposite = function (composite) {
        this.composites.push(composite);
    };
    topic.prototype.removeComposite = function (composite) {
        this.composites.splice(this.composites.indexOf(composite),1);
    };
    topic.prototype.getChildren = function () {
        return this.composites;
    };
    topic.prototype.getChildrenByType = function (type) {
        return  this.composites.filter(composite => composite.type == type);
    };
    topic.prototype.addEvent =   function( eventtype ,element ,callback ){
        document.getElementById(element).addEventListener(eventtype, callback , false);
    };
    topic.prototype.getChildrenByKey = function (key) {
        return  this.composites.filter(composite => composite.key == key);
    };
    topic.prototype.showHtml = function (topic) {
         var html = `
         <div  class="border border card text-left mb-3 oneTopic" data-key='${this.key}' id='TP${this.key}'>
            <div class="card-header headerTP" id='headerTP-${this.key}'>
                <div class="row justify-content-between headerQ" >
                    <div class="col-11" id='topicTitleHandler-${this.key}'>
                        <a href="#" id="topicTitle-${this.key}"> ${this.name} </a>
                    </div>
                    <div class="col-1 text-right">   
                    <div class="clearfix">
                    <button type="button" class="btn btn-danger rounded-circle float-left" id="rmTP-${this.key}"><i class="far fa-trash-alt"></i></button>
                        <button type="button" class="btn rounded-circle float-right" id="hiddenTP-${this.key}"><i class="fas fa-angle-down"></i></button>
                
                        </div>
                    </div>
                </div>
            </div>
         <div id='TPBD${this.key}' >
         </div>
         </div>`;
         $('#TP'+this.parent.key).append( html );
    };
    return topic ;
});
