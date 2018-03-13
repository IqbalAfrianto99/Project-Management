function company_muncul(){
    var result;
    $.ajax({
        url:'http//localhost:3000/company_list',
        type:'GET',
        async: false,
        contentType: 'application/json',
        success: function(data){
            result: data;
        }
    });
    return result;
}