define([ 'app/questionCreate', 'app/topicCreate' , 'jquery' ], function ( questionCreate , topicCreate , $) {
  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
    }
/**
* 
* @param {*} doc 
* @param {event object} event 
* @param {the question  } question 
*/
      var addGroupeOptionRelatedAttribute = function( doc , event, question){
        var idGP = 'GP'+question.key
        $('#body-bbsurvey #'+question.key).parents('#TP'+question.getParent().key).find('.attributRelatedSelect').not("#"+question.key+' .attributRelatedSelect').each(function() {
          if($(this).find('.'+idGP).length >0){
            $(this).find('.'+idGP).attr('label' , event.target.value)
          }else{
            
            var newoptionGroupe = $('<optgroup class="GP'+question.key+'" label="'+event.target.value+'"></optgroup>');
            $(this).append(newoptionGroupe)
          }
  
        });
      }
      $(document).bind("updateGroupeOptionRelatedAttribute", addGroupeOptionRelatedAttribute);
/**
* 
* @param {*} doc 
* @param {value of option add} value 
* @param {the question} question 
*/     
      var addOptionRelatedAttribute = function(doc , value ,  question){
         $('.GP'+question.key).append($('<option  class="OPs'+question.key+'" value="'+value+'"> '+value+'</option>'))
        }
      $(document).bind("updateOptionRelatedAttribute", addOptionRelatedAttribute);
/**
* 
* @param {*} doc 
* @param {value of option removed} value 
* @param  {the question} question 
*/   
      var removeOptionRelatedAttribute = function(doc , value ,  question ){
        $('.GP'+question.key).find('option').each(function() {
          if($(this).val() == value){
            $( this ).remove() ;
          }
        }); 
      }
  $(document).bind("removeOptionRelatedAttribute", removeOptionRelatedAttribute);
  /**
   * 
   * @param {object event} event 
   * @param {field used to ceate a question } fieldcurrent 
   */
  var createQuestion = function( event , fieldcurrent , parent , instanteQuestions){

      var Qcreated = new questionCreate();
          Qcreated.create( parent, fieldcurrent)
                  .initAttribut(instanteQuestions);

                (instanteQuestions != undefined ) ? Qcreated.setValue(instanteQuestions.value) :Qcreated.setValue('') ;
                Qcreated.show()
                  .handleEventAttributes()
                  .addEvent();
            parent.addComposite(Qcreated.question);
    }
    $(document).bind("questionCreate", createQuestion);
        /**
   * 
   * @param {object event} event 
   * @param { the question removed } question 
   *
   */
  var removeQuestion = function( event , question ){
    $('#'+question.key).remove()
    question.getParent().removeComposite(question);
  }
  $(document).bind("questionRemove", removeQuestion);

  /*
  var showModalAttribut = function( event  , question){
    console.log($('#myModal-'+question.key))
 //   $('#myModal-'+question.key).modal('show')

  }
  
  $(document).bind("showModalAttribut", showModalAttribut);
  */
  /**
   * 
   * @param {object event} event 
   * @param {field used to ceate question } fieldcurrent 
   */
  var handleTopic = function( event , parent , name ){
      if(name !=''){
        var  nTopic = new topicCreate();
        nTopic.create( name,parent);
        nTopic.showHtml()
        nTopic.addEvent()
        $('#listOfTopics').append($('<option  id="TPOP'+nTopic.topic.key+'"  value="'+nTopic.topic.key+'"> '+name+'</option>'))
        $('#left-bbsurvey #topicBox-bbsurvey #title').val('')

        parent.addComposite(nTopic.topic);
        return nTopic.topic;
      }else{
        throw new Error('name void: ' ); 
      }

    }
    $(document).bind("topicCreate", handleTopic);
    
            /**
   * 
   * @param {object event} event 
   * @param { the question removed } question 
   * @param { parent of question } parent 
   */
  var removeTopic = function( event , topic ){
   if( $('#body-bbsurvey #TPBD'+topic.key).html() !="" ){
      if (confirm("this topic contains questions are you sure to delete it ????")) {
        topic.getParent().removeComposite(topic);
        $('#bbsurvey #body-bbsurvey #TP'+topic.key).remove()
        $('#bbsurvey #left-bbsurvey #TPOP'+topic.key).remove()
      } 
    }
  }
  $(document).bind("topicRemove", removeTopic);
        
  var hiddenShowTopic = function (event , element ){ 
    var topicBody = $("#body-bbsurvey #TPBD"+element.key).html()
      if(topicBody !== ""){
        if($("#body-bbsurvey #TPBD"+element.key).is(":hidden")){ 
          $("#body-bbsurvey #TPBD"+element.key).slideDown("slow");
        }else{
              $("#body-bbsurvey #TPBD"+element.key).slideUp("slow");
            } 
      }
  
    }

    $(document).bind("topicHiddenShow", hiddenShowTopic);

    var updateTitleTopic = function (event , topic ){

     const title = $("#body-bbsurvey #topicTitleHandler-"+topic.key+" #topicTitle-"+topic.key).text();
        $("#body-bbsurvey #topicTitleHandler-"+topic.key).html()
       
       var html ='<div class="input-group mb-3"> <input type="text" class="form-control col-6"   id="newTopicTitle-'+topic.key+'" value="'+title+'" >';
       html += '<div class="input-group-append">';
       html += '<button type="button" class="btn btn-success btn-sm"  id="valideNewTopicTitle-'+topic.key+'"> <i class="fas fa-check"></i></button> </div> </div>';
        $("#body-bbsurvey #topicTitleHandler-"+topic.key).html(html )

        document.getElementById('valideNewTopicTitle-'+topic.key).addEventListener('click',  (event)=>{
          $(document).trigger("valideUpdateTitleTopic",[ topic,  $("#newTopicTitle-"+topic.key).val()]);  
        }, false)
  
      }

      $(document).bind("topicUpdateTitle", updateTitleTopic);

      var valideUpdateTitleTopic = function (event ,  topic , value ){   
           $("#body-bbsurvey #topicTitleHandler-"+topic.key).html()
           $("#body-bbsurvey #topicTitleHandler-"+topic.key).html(
             `
             <a href="#" id="topicTitle-${topic.key}"><u> ${value}</u> </a>`
           )
           topic.setName(value);
           $("#TPOP"+topic.key).html()
           $("#TPOP"+topic.key).html(value);
           document.getElementById('topicTitle-'+topic.key).addEventListener('click',  (event)=>{
            $(document).trigger("topicUpdateTitle",[ topic]);  
          }, false)
       
         }
         $(document).bind("valideUpdateTitleTopic", valideUpdateTitleTopic);
         return this;
    
});
