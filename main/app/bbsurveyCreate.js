define(['./bbsurveyBuilder' , 'sortable' , 'draggable' ],  function (bbsurveyBuilder , sortable , draggable) {
    document.keyBBs =1;
    var defaults ={
        title : 'BBsurvey ',
        hasTopics : false,
        attributes : [] ,
        fields :[],
        data :[]
    };
    var BBsurveyCreate = function( setting){
        this.setting = $.extend( {}, defaults, setting );
        //this.setting = setting2 ;
      //  this.bbsurveyBuilder = bbsurveyBuilder;
    }
 BBsurveyCreate.prototype.initBbsurveyBuilder = function () {
        if(this.setting.hasTopics && this.setting.data.hasOwnProperty('source')  ){
            var BBbuilder = bbsurveyBuilder['bbsurveyWithDataAndTopicsBuilder'];
            this.bbsurveyBuilder = new BBbuilder();
           console.log('bbsurveyWithDataAndTopicsBuilder')
        }else if(this.setting.hasTopics &&  !this.setting.data.hasOwnProperty('source')  ){
            var BBbuilder = bbsurveyBuilder['bbsurveyWithoutDataWithTopicsBuilder'];
            this.bbsurveyBuilder = new BBbuilder();
            console.log('bbsurveyWithoutDataWithTopicsBuilder')
        }else if(!this.setting.hasTopics &&   this.setting.data.hasOwnProperty('source')  ){
            var BBbuilder = bbsurveyBuilder['bbsurveyWithDataBuilder'];
            this.bbsurveyBuilder = new BBbuilder();
            console.log('bbsurveyWithDataBuilder')
        }else if(!this.setting.hasTopics &&  !this.setting.data.hasOwnProperty('source') ){
            var BBbuilder = bbsurveyBuilder['bbsurveyWithoutDataBuilder'];
            this.bbsurveyBuilder = new BBbuilder();
            console.log('bbsurveyWithoutDataBuilder')
        }else{
            var BBbuilder = bbsurveyBuilder['bbsurveyWithoutDataBuilder'];
            this.bbsurveyBuilder = new BBbuilder();
            console.log('default')
        }
        return this ;
    };
  
    BBsurveyCreate.prototype.create = function () {
        this.bbsurveyBuilder.setKey('BB'+document.keyBBs)
                        .setSetting(this.setting)
                        .setHasTopics(this.setting.hasTopics);
        this.bbsurveyBuilder.getBbsurvey().formatSetting() 
        document.keyBBs++;      
        return this ;
    };
    BBsurveyCreate.prototype.addEvent = function() {
        if(this.setting.hasTopics){
            var self = this 
            //newTopic
            document.getElementById("title").addEventListener("keypress", function(event) {
                var key = event.which || event.keyCode;
                if (key === 13) {
                    $(document).trigger("topicCreate" ,[ self.bbsurveyBuilder.getBbsurvey() , event.target.value ]);  
                }
            }, false);
           $( "#TP"+this.bbsurveyBuilder.getBbsurvey().key ).sortable({
                revert: true,
               connectWith: "#body-bbsurvey",
                handle: ".headerTP",
            });
           
        }
        $( "#TPBD"+this.bbsurveyBuilder.getBbsurvey().key ).sortable({
            revert: true,
            connectWith: "#TP"+this.bbsurveyBuilder.getBbsurvey().key,
            handle: ".headerQ",
        });

       
        return this ;

      };

    BBsurveyCreate.prototype.setName =  function (name) {
        this.bbsurveyBuilder.setName(name);
       return this ;
   }                 
    BBsurveyCreate.prototype.showHtml =  function () {
         this.bbsurveyBuilder.getBbsurvey().showHtml();
        return this ;
    }
    BBsurveyCreate.prototype.initData =  function () {
        this.bbsurveyBuilder.initData();
       return this ;
   }
    
    return BBsurveyCreate ;
    });
    