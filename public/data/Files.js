function isImage(string,projectsId) {
    // var ext = string.substr(string.lastIndexOf('.') + 1);
    var ext = string.split('.').pop();
    if(/jpeg|jpg|png|gif/i.test(ext)){
        return '../ProjectUploads/'+projectsId+'/'+string;
    }
    else if(/pdf/i.test(ext)){
        return './icons/pdf.png';
    }
    else if(/docx|doc/i.test(ext)){
        return './icons/docx.png';
    }
    else if(/xlsx|xls/i.test(ext)){
        return './icons/xls.png';
    }
    else if(/html|js|php|css/i.test(ext)){
        return './icons/code.png';
    }
    else if(/mp3/i.test(ext)){
        return './icons/mp3.png';
    }
    else if(/rar/i.test(ext)){
        return './icons/xls.png';
    }
    else if(/zip/i.test(ext)){
        return './icons/xls.png';
    }
    else if(/exe/i.test(ext)){
        return './icons/exe.png';
    }
}
function checkStringLength(text,length){
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    return text + "...";
}
function getAllFiles(projectsId){
    var result;
    $.ajax({
        url:'http://localhost:3000/projects/'+projectsId+'/Files',
        type:'GET',
        async:false,
        contentType:'application/json',
        success:function(data){
            result = data;
            
        } 
    });
    return result;
}
function appendFiles(projectsId,File_Name,_id,Date_Display){

    var Files = "<div class='col s12 m6 l3'><div class='card'><div class='card-image'><img src='"+isImage(File_Name,projectsId)+"' class='panjul'><a class='btn-floating halfway-fab waves-effect waves-light red dropdown-button' data-activates='download"+_id+"'><i class='material-icons'>more_horiz</i></a><ul id='download"+_id+"' class='dropdown-content'><li><a href='../ProjectUploads/"+projectsId+"/"+File_Name+"' download='"+File_Name+"'>Download</a></li><li><a href='javascript:;'>Hidden From Clients</a></li><li class='divider'></li><li><a href='#MoveToTrashFiles"+_id+"' class='modal-trigger'>Move to Trash</a></li></ul><!-- Move To Trash Files Modal --><div class='modal' id='MoveToTrashFiles"+_id+"'><div class='modal-content'><div class='container'><h5>Move '"+File_Name+"' to Trash?</h5><h6>The item will remain in Trash for 30 days. To remove it permanently, go to Trash and empty it.</h6><div class='row'><a href='javascript:;' class='btn red fordel' style='text-transform: unset' value='"+_id+"'>Move to Trash</a>&nbsp;<a href='javascript:;' class='btn grey lighten-1 modal-close' style='text-transform: unset'>Cancel</a></div></div></div></div><!-- Move To Trash Files Modal --></div><div class='card-content'><h5>"+checkStringLength(File_Name,12)+"</h5><span>by iqbalafrianto on <span>"+Date_Display+"</span></span></div></div></div>";

    return Files;
}
function deleteFiles(projectsId,filesId){
    $.ajax({
        url: 'http://localhost:3000/projects/'+projectsId+'/Files/'+filesId,
        type:'PUT',
        async:true,
        headers:{
            "movetotrash":"Trash"
        },
        dataType : 'json',
        
    }); 
}
function uploadFiles(projectsId,data){
    $.ajax({
        url: 'http://localhost:3000/projects/'+projectsId+'/Files',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        error: function(error){
            $('#progress').hide();
            if(error.responseText == 'Empty Field'){
                alert('Field Cannot Be Empty');
                
                
            }
            else if(error.responseText == 'NoExt'){
                alert('Unsupported Format');
                
            }
            else{
                alert('File Too Large');
                
            }
        },
        success:function(){
            setTimeout(function() {
                $('#progress').hide();
                Materialize.toast('File Uploaded', 4000,'',function(){document.location = "ProjectsDetail.html?projectsId="+projectsId;});
            }, 2000);
            
        }
    });
}