# BBsurvey Builder for builder survey (bêta)
BBsurvey is a jQuery Javascript plugin help to build custom forms generator or survey
BBsurvey provides 
- A wide array of options to custom the types of questions proposed and give for each one wide list of attribute 
- easy handling ,display data with different way 

###### jQuery , jQuery UI
###### Requirejs
###### Bootstrap (https://getbootstrap.com/)
###### @fortawesome/fontawesome-free
# Install
npm
   - npm i bbsurvey
# Documentation 
<a href='http://houdamallem.tk/BBsurvey/exmple/' target="_blank">Demo </a>
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
