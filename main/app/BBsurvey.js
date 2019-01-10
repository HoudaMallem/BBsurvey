define(['jquery'] ,function ($) {
    //['jquery' ],
    var Bbsurvey = function(){
        this.composites = [];
        this.hasTopics = false ;
        this.fields = [];
    };
    
    Bbsurvey.prototype.setKey= function (key) {
        this.key = key;
    };
    Bbsurvey.prototype.setName= function (name) {
        this.name = name;
    };
    Bbsurvey.prototype.setSetting = function (setting) {
        this.setting = setting;
    };
    Bbsurvey.prototype.setHasTopics = function (hasTopics) {
        this.hasTopics =  hasTopics;
    };
    Bbsurvey.prototype.setRessource = function (ressource) {
        this.ressource =  ressource;
    };
    Bbsurvey.prototype.getRessource = function () {
        return this.ressource ;
    };
    Bbsurvey.prototype.getKey= function () {
        return this.key;
    };
    Bbsurvey.prototype.getName= function () {
        return this.name ;
    };
    Bbsurvey.prototype.getSetting = function () {
        return this.setting ;
    };
    Bbsurvey.prototype.addComposite = function (composite) {
        this.composites.push(composite);
    };
    Bbsurvey.prototype.addField = function (field) {
        this.fields.push(field);
    };
    Bbsurvey.prototype.removeComposite = function (composite) {
        this.composites.splice(this.composites.indexOf(composite),1);
    };
   // Bbsurvey.prototype.getComposite = function (composite) {
     //   this.composites.splice(this.composites.indexOf(composite),1);
    //};
    Bbsurvey.prototype.getChildren = function () {
        return this.composites;
    };
    Bbsurvey.prototype.getAjax= function (callback  ) {
        if(callback != undefined ){
          //  $.get(this.setting.data.source.url,callback)
            $.ajax({
                url : this.setting.data.source.url,
                method : this.setting.data.source.method,
               dataType: this.setting.data.source.dataType ,
                success : callback,
                crossDomain: true,
                //data : {} ,
               
               error : function (reason, xhr){
                 console.log("error in processing your request", reason);
                },
                
            
                
            });
            
        }

    };
    Bbsurvey.prototype.getChildrenByType = function (type) {
        return  this.composites.filter(composite => composite.type == type);
    };
    Bbsurvey.prototype.getChildrenByKey = function (key) {
        return  this.composites.filter(composite => composite.key == key);
    };
    Bbsurvey.prototype.getFields = function () {
        return this.fields ; 
    };
    Bbsurvey.prototype.getFieldByType = function (type) {
        return  this.fields.filter(field => field.getField().getType().capitalize() == type);
    };
    Bbsurvey.prototype.formatSetting = function () {       
        if(this.setting.hasOwnProperty('attributes') && this.setting.attributes.length >0 ){
            var attributeSetting = this.setting.attributes;            
            this.setting.fields.forEach(function (set) {
                
                if(set.hasOwnProperty('attributes')  ){
                    if (typeof set.attributes == 'object') { 
                        var newAttributeList =   attributeSetting.concat(set.attributes);
                    }else{
                        throw new Error('attributes of '+set.name+' field must be an array !!!! ' );
                    }
                }else{
                   set.attributes = []
                   var newAttributeList =   attributeSetting.concat(set.attributes);

                }
                set.attributes  = newAttributeList; 
            })
        }

    };
    var leftBbsurveyShow = function(){
        var  html ="<div  id='topicBox-bbsurvey'><div class='input-group mb-3'> <input type='text' class='form-control' id='title' placeholder='Title of new Topic ' /> </div>";
        html +='<select class="form-control" id="listOfTopics" multiple> </select></div><hr>';
        $(html ).insertBefore('#fields-bbsurvey');

        return html;
    }
    var BbsurveyWithData = function(){
        this.showHtml = function () {
            var html2 = "<div  class='' id='TP"+this.key+"'>"
            html2 += "<div id='TPBD"+this.key+"' ></div> </div>";
            $('#body-bbsurvey').append( html2 );
        }

    }
    BbsurveyWithData.prototype = new Bbsurvey() ;
    var BbsurveyWithDataAndTopics = function(){
        this.showHtml = function () {
            leftBbsurveyShow();
            var html2 = "<div  class='' id='TP"+this.key+"'> </div>";
            $('#body-bbsurvey').append( html2 );
        }
    }
    BbsurveyWithDataAndTopics.prototype = new Bbsurvey() ;

    var BbsurveyWithoutData = function(){
        this.showHtml = function () {
                      var html2 = "<div  class='' id='TP"+this.key+"' >";
                      html2 += "<div id='TPBD"+this.key+"' >";
                      html2 += "</div> </div>";
                      $('#body-bbsurvey').append( html2 );
        }

    }
    BbsurveyWithoutData.prototype = new Bbsurvey() ;

    var BbsurveyWithoutDataWithTopics = function(){
        this.showHtml = function () {
            leftBbsurveyShow();
            var html2 = '<div  class="" id="TP'+this.key+'" > </div>';
            $('#body-bbsurvey').append( html2 );
        }

    }
    BbsurveyWithoutDataWithTopics.prototype = new Bbsurvey() ;
    return {
        bbsurveyWithData : BbsurveyWithData,
        bbsurveyWithDataAndTopics : BbsurveyWithDataAndTopics,
        bbsurveyWithoutData : BbsurveyWithoutData,
        bbsurveyWithoutDataWithTopics : BbsurveyWithoutDataWithTopics
    };
});
