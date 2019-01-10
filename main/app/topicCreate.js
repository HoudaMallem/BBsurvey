define(['./Topic' , 'jquery' ],  function (Topic , $ ) {
    document.keyTP =1;
    var TopicCreate = function( ){
       // var setting2 = $.extend( {}, defaults, setting );
     //   this.setting = setting2 ;
      this.topic  = new Topic();;
    }

  
    TopicCreate.prototype.create = function (name , parent) {
        this.topic.setKey('TP'+document.keyTP);
        this.topic.setName(name);
        this.topic.setParent(parent)
        
        document.keyTP++;      

    };

    TopicCreate.prototype.showHtml =  function () {
        return this.topic.showHtml();
    }
    TopicCreate.prototype.addEvent = function() {
        var self = this.topic ;
        
        var element2 ='rmTP-'+this.topic.key
        var element1 ='hiddenTP-'+this.topic.key
        var element3 ='topicTitle-'+this.topic.key
   
        this.topic.addEvent('click',element2,(event)=>{
          $(document).trigger("topicRemove",[ self]);  
        });     
          $( "#TPBD"+this.topic.key ).sortable({
              revert: true,
              connectWith: "#TP"+this.topic.key,
              handle: ".headerQ",
          });
          this.topic.addEvent('click',element1,(event)=>{
            $(document).trigger("topicHiddenShow",[ self]);  
          }); 
          this.topic.addEvent('click',element3,(event)=>{
            $(document).trigger("topicUpdateTitle",[ self]);  
          }); 
        
      };

    return TopicCreate ;
    });
    