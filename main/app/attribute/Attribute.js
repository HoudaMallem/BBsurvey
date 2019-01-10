define(function () {
    var AttributeBase = {
        id : 'id',
        label : 'Question ' ,
        name :'field',
        type :'text',
        value : '',
        options : [],
        optionType : '',

        setId : function (id) {
                this.id = id ;
        },
        setName : function (name) {
            this.name = name ;
        },
        setLabel : function (label) {
            this.label = label ;
        },
        setType : function (fieldType) {
            this.type = fieldType ;
        },
        setValue : function (value) {
            this.value = value ;
        },
        setOptions : function (options) {
            this.options =  options ;
        },
        setParent : function (parent) {
            this.parent = parent;
        },
        getId : function () {
            return this.id ;
        },
        getName : function () {
            return this.name  ;
        },
        getType : function () {
            return this.type  ;
        },
        getOptions : function () {
            return this.options  ;
        },
        getParent : function () {
            return this.parent ;
        },
        setOptionType : function (optionType) {
            this.optionType = optionType;
        },
        getOptionType : function () {
            return this.optionType ;
        },
        addOption : function (option) {
            this.options.push(option);
        },    
        removeOption : function (option) {
            this.options.splice(this.options.indexOf(option),1);
        },

        addEvent : function( eventtype , callback ){
            document.getElementById(this.getParent().key+'-'+this.id).addEventListener(eventtype, callback , false);
        }
    };
    var AttributSelect = function(){

            this.showHtml = function () {
                var value = this.value;
                let  html =` <div class="form-group col-md-6">  <label for="${this.id}">${this.label}</label>`;
                      html +=`<select class="form-control" name='${this.name}' id='${this.getParent().key}-${this.id}' >`
                    this.options.forEach(function (op) {
                        html +=`<option name='${op}'  id="${op}" ${(op == value) ? 'selected': ''} >${op} </option>`;

                        //if(op == value){
                         //   html += 'selected' ;
                       // }
                     //   html += ` >${op} </option>` ;
                    });
                    html += `</select></div>`;
                return html ;
            }
          
       };
       AttributSelect.prototype = AttributeBase ;

    var AttributText = function(){
        this.showHtml  = function () {
         let  html =`
         <div class="col-md-6 attributText">
            <label for="${this.id}">${this.label}</label>
             <input class="form-control" type="text" value="${this.value}" id='${this.getParent().key}-${this.id}'  >
         </div>
     `;
         return html ;
        };   
    };

    AttributText.prototype = AttributeBase ;

    var AttributNumber = function(){
        this.showHtml  = function (key) {
         let  html =`
         <div class="col-md-6 attributNumber">
            <label for="${this.id}">${this.label}</label>
             <input class="form-control" type="number" value="${this.value}" id='${this.getParent().key}-${this.id}'  >
         </div>
     `;
         return html ;
        };   
    };

    AttributNumber.prototype = AttributeBase ;


    var AttributBoolean = function(){
        this.showHtml = function () {
            let  html =`
            <div class="form-group col-md-6 attributBoolean">
                <label for="${this.id}">${this.label}</label>
                <input class="form-control form-check-input" ${ (this.value) ? 'checked' : ''} type="checkbox" name="${this.name}" value='' id='${this.getParent().key}-${this.id}'  >

            </div>
            `;
           return html ;
        }
   
    };
    AttributBoolean.prototype = AttributeBase ;
    var AttributRelated = function(){
        this.showHtml = function () {
            var value = this.value;
        let     html =` <div class="col-md-6 attributRelated">  <label for="${this.id}">${this.label}</label>`;
                html +=`<select class="form-control attributRelatedSelect" name='${this.name}' id='${this.getParent().key}-${this.id}' >`
                this.options.forEach(function (GroupOp) {
                    if(GroupOp != this.parent){
                        html +=`<option> </option>`;
                        html +=`   <optgroup class='GP${GroupOp.key}'  value="${$('.fieldname-'+GroupOp.key).val()}" label="${$('.fieldname-'+GroupOp.key).val()}">`;
                        var subOptions =  $('.fieldname-'+GroupOp.key).parents('#'+GroupOp.key).find('.modal').find('.specialSelectContainer').html();
                        subOptions = subOptions.replace('name="'+value+'"' , "name="+value+'" selected');
                        html += subOptions
                        html +=`  </optgroup>`;
                    }

                });
                html += `</select></div>`;
            return html ;
        }
   
    };
    AttributRelated.prototype = AttributeBase ;
    var AttributSelectSpecial = function(){

        this.showHtml = function () {
            let html =`<div class='form-group col-md-12 attributSelectSpecial'> 
                         <div class="form-group col-md-12">  <label for="${this.id}">${this.label}</label>`;
                    html +=` <input  type="text" class="form-control newOptionSpecialSelect" id='newOption${this.getParent().key}-${this.id}'  name='${this.name}' data-special='add' >`
                html += `</div>
                        <div class="form-group col-md-12"> 
                            <select name="${this.name}m" class="form-control specialSelectContainer" id='${this.getParent().key}-${this.id}' multiple>`
                            this.options.forEach(function (op) {
                                html +=`<option name='${op}' id="${op}">${op} </option>` ;
                            });
                            `</select>`;              
                    html += `<input type='button' class="form-control specialSelectVoid" id='void${this.getParent().key}-${this.id}' value='-' data-special='delete'>
                        </div>
                    </div><hr/>`;
            return html ;
        }
      
   };
   AttributSelectSpecial.prototype = AttributeBase ;

    
       //new fieldBase(); 
    return {
        attributSelect : AttributSelect,
        attributText : AttributText,
        attributBoolean : AttributBoolean,
        attributRelated : AttributRelated,
        attributSelectSpecial : AttributSelectSpecial,
        attributNumber : AttributNumber
    };
});
