$(document).ready(function() { 
    $( ".flash-message" ).addClass( "animate--drop-in-fade-out" );
    setTimeout(function(){
        $( ".flash-message" ).removeClass( "animate--drop-in-fade-out" );
    }, 2000);

        $('#pingTable').DataTable();
});