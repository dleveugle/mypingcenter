
function __url(model, action, id) {
    let r = '/';
    if(model != '')
    {
       // router's name base is model + 's'
        r = r + `${model}s`;
        // if action is given
        r = r + (action ? `/${action}` : '');
        // if id is given
        r = r + (id ? `/${id}` : ''); 
    }
    
    return r;
}


if (typeof process === 'object') { // Detect when this is nodejs
    // Expose the users variable
    module.exports.__url = __url;
}