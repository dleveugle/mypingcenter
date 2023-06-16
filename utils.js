/**
 * UTILITIES
 */

   
module.exports =  function(){
    var appRoot = require('path');
    var _ = require('lodash');

    var publicInterface= {
        rootPath:       appRoot,
        publicDir:      appRoot + '/public',
        imagesDir:      appRoot + '/public/images',
        configDir:      __dirname + '/config',
        vendorDir:      appRoot + '/vendor',
        nodeDir:        __dirname + '/node_modules',
        jsDir:          appRoot + '/public/javascripts',
        viewsDir:       appRoot + '/views',
        modelsDir:      __dirname + '/models',
        routesDir:      __dirname + '/routes',
        controllersDir: __dirname + '/controllers',

        // Require method for javascripts
        requireJS: function(script) {
            return require(`${this.jsDir}/${script}`);
        },
        requireModels: function(script) {
            return require(`${this.modelsDir}/${script}`);
        },
        requireRoutes: function(script) {
            return require(`${this.routesDir}/${script}`);
        },
        requireControllers: function(script) {
            return require(`${this.controllersDir}/${script}`);
        },
        requireDB: function() {
            return require(`${this.configDir}/database`);
        },
        requireDataModel: function(model) {
            const {db, datatypes} = global.Utils.requireDB();

            return global.Utils.requireModels(model)(db, datatypes);
        },
        requireNodeModule: function(script) {
            return require(`${this.nodeDir}/${script}`);
        },
        _: () => {return _();}



    }

    return publicInterface;
    
 }();

