//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
   baseUrl: './js',
    paths: {
        'jquery': '../node_modules/jquery/dist/jquery',
        'sortable':'../node_modules/jquery-ui/ui/widgets/sortable',
        'draggable':'../node_modules/jquery-ui/ui/widgets/draggable',
        'bootstrap': '../node_modules/bootstrap/dist/js/bootstrap',   
        'jquery-slim':'../js/lib/jquery-3.3.1.slim.min',
        'popper':'../js/lib/popper',
        'observer':'app/Observer',
        'main':'app/main'
       // 'jquery-slim':'https://code.jquery.com/jquery-3.3.1.slim.min',
        //'popper':'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min',
        //'bootstrap':'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min'
        
    },
    "shim": {
        "bootstrap": ["popper"],
        'main': ['jquery' , 'observer' , 'bootstrap'],
        
     //   deps:["jquery"], // jquery.highlight dependeps on jquery so it will load after jquery has been loaded 
       // exports:"jqHighlight"

    }

});

//require(['app/main']);
