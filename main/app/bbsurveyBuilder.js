define(['./BBsurvey', 'jquery' ], function (BBsurvey , $  ) {
    var Builder = function(){

    };
    Builder.prototype.setKey = function (key) {
        this.bbsurvey.setKey(key) ;
        return this ; 
    };
    Builder.prototype.setSetting = function (setting) {
        this.bbsurvey.setSetting(setting) ;
        return this ; 
    };
    Builder.prototype.setHasTopics = function (hasTopics) {
        this.bbsurvey.setHasTopics(hasTopics);
        return this ; 
    };
    Builder.prototype.setName = function (name) {
      this.bbsurvey.setName(name) ;
      return this ; 
  };
    Builder.prototype.getBbsurvey = function () {
      return this.bbsurvey ; 
  };
  Builder.prototype.initData = function () {

  };

var showDataWithTopics = function(bbsurvey){
    if(bbsurvey.getSetting().data.hasOwnProperty('source')){
        bbsurvey.getRessource().topics.forEach(function (oneTopic) {
           var topic = $(document).triggerHandler("topicCreate" ,[ bbsurvey , oneTopic.name ]); 
           oneTopic.questions.forEach(function (oneQuestions) {
               var fieldcurrent = bbsurvey.getFieldByType(oneQuestions.type)[0];
               if(fieldcurrent != undefined){
                    $(document).triggerHandler("questionCreate",[ fieldcurrent , topic , oneQuestions ]); 
               }else{
                    throw new Error('Type of fields not found in liste of fields !!!!! ' );
                }
               
           })
        })  
    }
}
var showDataWithoutTopics = function(bbsurvey){
    if(bbsurvey.getSetting().data.hasOwnProperty('source')){
        if(bbsurvey.getRessource().hasOwnProperty('questions')){
         bbsurvey.getRessource().questions.forEach(function (oneQuestions) {
          
               var fieldcurrent = bbsurvey.getFieldByType(oneQuestions.type)[0];
               if(fieldcurrent != undefined){
                    $(document).triggerHandler("questionCreate",[ fieldcurrent , bbsurvey , oneQuestions ]); 
                }else{
                    throw new Error('Type of fields not found in liste of fields !!!!! ' );
                }
           })
        }else{
            throw new Error('Ressource for simple survey require questions property  !!! ' );
        }
    }
}
var requestAjax = function(bbsurvey, callback){
    if(bbsurvey.getSetting().data.hasOwnProperty('source')){
        bbsurvey.setRessource(bbsurvey.getSetting().data.source);
        if(bbsurvey.getSetting().data.type == 'local'){
            bbsurvey.setRessource(bbsurvey.getSetting().data.source);
            callback(bbsurvey)
        }else if(bbsurvey.getSetting().data.type == 'remote'){
            bbsurvey.getAjax(function(respJson){
                var resp = (typeof respJson == 'object') ? respJson : JSON.parse(respJson);     
                bbsurvey.setRessource(resp);
                callback(bbsurvey)
            });
        }
       
    }
}
var updateOrderWhitTopics = function(bbsurvey){
    var newListTopics = []
	$('#body-bbsurvey').find(".oneTopic").each( function(a,topi) {
        var topic = bbsurvey.getChildrenByKey($(topi).attr('data-key'))[0]  
        var newListQuestion = []
        $(topi).find('.oneQuestion').each( function(s,Ques) {
            var Que = topic.getChildrenByKey($(Ques).attr('data-key'))[0]
            newListQuestion.push(Que)
        })
        topic.composites = newListQuestion;
        newListTopics.push(topic)
    })
    bbsurvey.composites= newListTopics;
}
var updateOrderWhitoutTopics = function(bbsurvey){

    var newListQuestion = []
    $('#body-bbsurvey').find('.oneQuestion').each( function(s,Ques) {
        var Que = bbsurvey.getChildrenByKey($(Ques).attr('data-key'))[0]  
        newListQuestion.push(Que)
    })
 //   console.log(newListQuestion)
    bbsurvey.composites= newListQuestion;
}
  var BbsurveyWithDataBuilder = function(){
      var bbsurveyWithData = BBsurvey.bbsurveyWithData ;
      this.bbsurvey = new bbsurveyWithData();
      this.getData = function () {
          data = {};
          updateOrderWhitoutTopics(this.bbsurvey)
          this.bbsurvey.setName( $('#surveyname').val())
          data.name= this.bbsurvey.getName();
          data.questions = [];
          this.bbsurvey.getChildren().forEach(function (oneQuestions) {
                  question = {}
                  question.value = $('#'+oneQuestions.key+' #fieldname-'+oneQuestions.key).val()
                  question.type = oneQuestions.getType().capitalize();
                  question.options = []
                  question.attributes = []
                  oneQuestions.attributObjc.forEach(function (oneAttribute) {
                      attribute = {}
                   
                      if (typeof oneAttribute.getAttribute().getType() === 'string') {
                      
                          if( (oneQuestions.type.capitalize() == 'Select' || oneQuestions.type.capitalize() == 'Multi' )  && oneAttribute.getAttribute().getType()=='SelectSpecial'){
                              delete attribute;
                              question.options = oneAttribute.getAttribute().getOptions();
                          }else if(oneAttribute.getAttribute().getType().capitalize() =='Boolean'){
                              attribute.name = oneAttribute.getAttribute().getName();                               
                              attribute.value = ($('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).is(":checked")) ? true : false;
                              question.attributes.push(attribute);
                          }else{
                              attribute.name = oneAttribute.getAttribute().getName();
                              attribute.value =  $('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).val();
                              question.attributes.push(attribute);
                          }
                      } else if (typeof oneAttribute.getAttribute().getType() == 'object') {
                          attribute.name = oneAttribute.getAttribute().getName();   
                          attribute.questionRelated = $(':selected' , '#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).closest('optgroup').attr('label')
                          attribute.value = $('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).val() ;
                          question.attributes.push(attribute)

                      }
                  })

              data.questions.push(question) 
          })
      return data;
      };
      this.initData = function(){
        requestAjax(this.bbsurvey , showDataWithoutTopics)  
      }
  }
  BbsurveyWithDataBuilder.prototype = new Builder() ;




  var BbsurveyWithDataAndTopicsBuilder = function(){
      var bbsurveyWithDataAndTopics = BBsurvey.bbsurveyWithDataAndTopics ;
      this.bbsurvey = new bbsurveyWithDataAndTopics();
     // bbsurvey = this.bbsurvey
      this.getData = function () {
          //TODO :  Records change le nom
          data = {};
          updateOrderWhitTopics(this.bbsurvey)
          this.bbsurvey.setName( $('#surveyname').val())
          data.name= this.bbsurvey.getName();
          data.topics = [];
          this.bbsurvey.getChildren().forEach(function (oneTopic) {
              topic = {};
              //console.log(oneTopic)
              topic.name = oneTopic.getName();
              topic.questions = [];
              oneTopic.getChildren().forEach(function (oneQuestions) {
                  question = {}
                  question.value = $('#'+oneQuestions.key+' #fieldname-'+oneQuestions.key).val()
                  question.type = oneQuestions.getType().capitalize();
                  question.options = []
                  question.attributes = []
                  console.log('QUESTION')
                //  console.log(oneQuestions)

                  oneQuestions.attributObjc.forEach(function (oneAttribute) {
                      attribute = {}
                   
                      if (typeof oneAttribute.getAttribute().getType() === 'string') {
                      
                          if( (oneQuestions.type.capitalize() == 'Select' || oneQuestions.type.capitalize() == 'Multi' )  && oneAttribute.getAttribute().getType()=='SelectSpecial'){
                              delete attribute;
                              console.log(oneAttribute.getAttribute().getOptions())
                              question.options = oneAttribute.getAttribute().getOptions();
                          }else if(oneAttribute.getAttribute().getType().capitalize() =='Boolean'){
                                  attribute.name = oneAttribute.getAttribute().getName();                               
                                  attribute.value = ($('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).is(":checked")) ? true : false;
                                  question.attributes.push(attribute)
                          }else{
                              attribute.name = oneAttribute.getAttribute().getName();
                              
                                  attribute.value =  $('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).val() 
                                  question.attributes.push(attribute)
                          }
                      } else if (typeof oneAttribute.getAttribute().getType() == 'object') {
                       //   console.log('label related question '+oneQuestions.key)
                         // console.log($('#'+oneQuestions.key+' #GP'+oneQuestions.key))
                          attribute.name = oneAttribute.getAttribute().getName();   
                          attribute.questionRelated = $(':selected' , '#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).closest('optgroup').attr('label')
                          //$('#GP'+oneQuestions.key).attr('label') ;
                       
                          attribute.value = $('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).val() ;
                          question.attributes.push(attribute)

                      }

                      

                     // (attribute != 'undefined') ? question.attributes.push(attribute) : ''; 
                      
                  })
                  topic.questions.push(question) 
              })
              data.topics.push(topic) 
          })
return data;
      };
      this.initData = function(){
        requestAjax(this.bbsurvey , showDataWithTopics)  
      }
  }
  BbsurveyWithDataAndTopicsBuilder.prototype = new Builder() ;
  var BbsurveyWithoutDataBuilder = function(){
      var bbsurveyWithoutData = BBsurvey.bbsurveyWithoutData ;
      this.bbsurvey = new bbsurveyWithoutData();
      this.getData = function () {
          data = {};
          updateOrderWhitoutTopics(this.bbsurvey)
          this.bbsurvey.setName( $('#surveyname').val())
          data.name= this.bbsurvey.getName();
          data.questions = [];
          this.bbsurvey.getChildren().forEach(function (oneQuestions) {
                  question = {}
                  question.value = $('#'+oneQuestions.key+' #fieldname-'+oneQuestions.key).val()
                  question.type = oneQuestions.getType().capitalize();
                  question.options = []
                  question.attributes = []
                  oneQuestions.attributObjc.forEach(function (oneAttribute) {
                      attribute = {}
                   
                      if (typeof oneAttribute.getAttribute().getType() === 'string') {
                      
                          if( (oneQuestions.type.capitalize() == 'Select' || oneQuestions.type.capitalize() == 'Multi' )  && oneAttribute.getAttribute().getType()=='SelectSpecial'){
                              delete attribute;
                              question.options = oneAttribute.getAttribute().getOptions();
                          }else if(oneAttribute.getAttribute().getType().capitalize() =='Boolean'){
                              attribute.name = oneAttribute.getAttribute().getName();                               
                              attribute.value = ($('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).is(":checked")) ? true : false;
                              question.attributes.push(attribute);
                          }else{
                              attribute.name = oneAttribute.getAttribute().getName();
                              attribute.value =  $('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).val();
                              question.attributes.push(attribute);
                          }
                      } else if (typeof oneAttribute.getAttribute().getType() == 'object') {
                          attribute.name = oneAttribute.getAttribute().getName();   
                          attribute.questionRelated = $(':selected' , '#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).closest('optgroup').attr('label')
                          attribute.value = $('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).val() ;
                          question.attributes.push(attribute)

                      }
                  })

              data.questions.push(question) 
          })
      return data;
      };

  }
  BbsurveyWithoutDataBuilder.prototype = new Builder() ;

  var BbsurveyWithoutDataWithTopicsBuilder = function(){
      var bbsurveyWithoutDataWithTopics = BBsurvey.bbsurveyWithoutDataWithTopics ;
      this.bbsurvey = new bbsurveyWithoutDataWithTopics();
      this.getData = function () {
          data = {};
          updateOrderWhitTopics(this.bbsurvey)
          this.bbsurvey.setName( $('#surveyname').val())
          data.name= this.bbsurvey.getName();
          data.topics = [];
          this.bbsurvey.getChildren().forEach(function (oneTopic) {
              topic = {};
              //console.log(oneTopic)
              topic.name = oneTopic.getName();
              topic.questions = [];
              oneTopic.getChildren().forEach(function (oneQuestions) {
                  question = {}
                  question.value = $('#'+oneQuestions.key+' #fieldname-'+oneQuestions.key).val()
                  question.type = oneQuestions.getType().capitalize();
                  question.options = []
                  question.attributes = []
                  console.log('QUESTION')
                //  console.log(oneQuestions)

                  oneQuestions.attributObjc.forEach(function (oneAttribute) {
                      attribute = {}
                   
                      if (typeof oneAttribute.getAttribute().getType() === 'string') {
                      
                          if( (oneQuestions.type.capitalize() == 'Select' || oneQuestions.type.capitalize() == 'Multi' )  && oneAttribute.getAttribute().getType()=='SelectSpecial'){
                              delete attribute;
                              console.log(oneAttribute.getAttribute().getOptions())
                              question.options = oneAttribute.getAttribute().getOptions();
                          }else if(oneAttribute.getAttribute().getType().capitalize() =='Boolean'){
                                  attribute.name = oneAttribute.getAttribute().getName();                               
                                  attribute.value = ($('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).is(":checked")) ? true : false;
                                  question.attributes.push(attribute)
                          }else{
                              attribute.name = oneAttribute.getAttribute().getName();
                              
                                  attribute.value =  $('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).val() 
                                  question.attributes.push(attribute)
                          }
                      } else if (typeof oneAttribute.getAttribute().getType() == 'object') {
                       //   console.log('label related question '+oneQuestions.key)
                         // console.log($('#'+oneQuestions.key+' #GP'+oneQuestions.key))
                          attribute.name = oneAttribute.getAttribute().getName();   
                          attribute.questionRelated = $(':selected' , '#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).closest('optgroup').attr('label')
                          //$('#GP'+oneQuestions.key).attr('label') ;
                       
                          attribute.value = $('#'+oneQuestions.key+'-'+oneAttribute.getAttribute().getId()).val() ;
                          question.attributes.push(attribute)

                      }

                      

                     // (attribute != 'undefined') ? question.attributes.push(attribute) : ''; 
                      
                  })
                  topic.questions.push(question) 
              })
              data.topics.push(topic) 
          })
return data;
      };

  }
  BbsurveyWithoutDataWithTopicsBuilder.prototype = new Builder() ;
  return {
      bbsurveyWithDataBuilder : BbsurveyWithDataBuilder,
      bbsurveyWithDataAndTopicsBuilder : BbsurveyWithDataAndTopicsBuilder,
      bbsurveyWithoutDataBuilder : BbsurveyWithoutDataBuilder,
      bbsurveyWithoutDataWithTopicsBuilder : BbsurveyWithoutDataWithTopicsBuilder
  };
});
