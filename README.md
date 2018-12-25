# BBsurvey Builder for builder survey (bêta)
BBsurvey is a jQuery Javascript plugin help to build custom forms generator or survey
BBsurvey provides 
- A wide array of options to custom the types of questions proposed and give for each one wide list of attribute 
- easy handling ,display data with defferente way 

###### jQuery , jQuery UI
###### Requirejs
###### Bootstrap (https://getbootstrap.com/)
###### @fortawesome/fontawesome-free
# Install
npm
   - npm i bbsurvey

# Usage
- header 
```html
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" type="text/css" href="../../bootstrap/dist/css/bootstrap.min.css">
    <!-- OR CDN Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <!-- fontawesome CSS -->
    <link rel="stylesheet" type="text/css" href="../../@fortawesome/fontawesome-free/css/all.css">
    <!-- OR Font Awesome's Free CDN  -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <!-- BBsurvey bbsurvey -->
    <script  src="../js/BBsurvey.js" ></script>
```
- html
```html
        <div class="row" class="" id='bbsurvey'>
            <div class="col-6 col-md-3 justify-content-center" id='left-bbsurvey' >
                <div class="list-group" id='fields-bbsurvey'>
                </div>
            </div>
            <div class="col-12 col-md-9 border-left border-left-secondary " id='body-bbsurvey' >
            </div>
        </div>   
```

# build simple generator 
```javascript
    $('#BBsurvey').survey({
        title : 'title' ,
        hasTopics : false,
        fields : [],
        attributes : []

    })    
```
### Parameters 

- title :  title of sur forms 
- hasTopics :    to bundle questions in groupes of question (topics) , By default  false
- fields : type of question proposed to build your survey or form [Select , Text , Date , Number , Multi , Boolean ]
- attributes : list of common attribute between fields
#### Parameters of fields
    - label : Label of field ,
    - name : name of field must be unique ,
    - type: type of champ  [Select , Text , Date , Number , Multi , Boolean , File ] , 
    - color : [badge-secondary , badge-success , badge-danger, badge-warning , badge-info , badge-primary] by default badge-primary
    - icon : @fortawesome icones by default 'fa-list-alt',
    - attributes :[] Liste of attribute add to all fields
##### Parameters of attribute
        
        - label : Label of attribute ,
        - name : name of attribute must be unique ',
        - value: value by default of attribut it empty by default  , 
        - type: type of attribute can be string one of this liste  [Select , Text  , Number  , Boolean   ]

# attribute type related 
    To link a question to another add an attribute of type Related like :
```javascript
     type:{
            name :'Related',
            optionType : 'Select'
        }   
```   
name : name of type wiche Related 
optionType ; type of questions you want to link this question with


## exemple 
```javascript
    $('#BBsurvey').survey({
        title : 'title' ,
        hasTopics : false,
           fields :[{
                    label : 'Text Field' ,
                    name : 'text',
                    type: 'Text' , 
                    color : 'badge-danger',
                    icon: 'fa-list-alt'
                  attributes :[{
                        label : 'related with', 
                        name : 'related1',
                        type:{
                          name :'related',
                          optionType : 'Select'
                        }
                      }
          
                    ]
                  },
    })    
```
# build  generator with topics 
If you want to bundle question in groupes or topics you can do it with BBsurvey put 
- hasTopics : true

```javascript
    $('#BBsurvey').survey({
        title : 'questionnare' ,
        hasTopics : true,

    })    
```

