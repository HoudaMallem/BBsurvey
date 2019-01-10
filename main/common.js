//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

requirejs.config({
        paths: {
            'jquery': '../node_modules/jquery/dist/jquery',
            'sortable':'../node_modules/jquery-ui/ui/widgets/sortable',
            'draggable':'../node_modules/jquery-ui/ui/widgets/draggable',
            'bootstrap': '../node_modules/bootstrap/dist/js/bootstrap.bundle.min',   
            'jquery-slim':'../js/lib/jquery-3.3.1.slim.min',
           'popper':'../js/lib/popper',
            'observer':'../js/app/Observer',
            'survey':'../js/app/survey'
        },
      /*  "shim": {
          "popper": ["jquery" ],
            "bootstrap": ["jquery" , "popper"],
       }
       */
    
    });
    
    require(['survey']);
    