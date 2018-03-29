function getAllNotes(projectsId){
    var result;
    $.ajax({
        url:'/projects/'+projectsId+'/Notes',
        type:'GET',
        async:false,
        contentType:'application/json',
        success:function(data){
           result = data;
           
            
        } 
    });
    return result;

}
function createNote(projectsId,noteTitle,noteContent){
    var result;
    $.ajax({
        url: '/projects/'+projectsId+'/Notes',
        type:'POST',
        async:false,
        data: {
            "Note_Title":noteTitle,
            "Content": noteContent,
        },
        dataType : 'json',	
        success:function(data){
            result= data;
        }
    });
    return result;
}
function readNotesById(projectsId,notesId){
    var result;
    $.ajax({
        url:'/projects/'+projectsId+'/Notes/'+notesId,
        type:'GET',
        async:false,
        contentType:'application/json',
        success:function(data){
         result = data;
        }
        
    });
    return result;
}
function updateNotesById(projectsId,notesId,noteTitle,noteContent){
    $.ajax({
        url: '/projects/'+projectsId+'/Notes/'+notesId,
        type:'PUT',
        async:true,
        data:{
            "Note_Title":noteTitle,
            "Content":noteContent
        },
        dataType : 'json',
        
    });
}
function deleteNotesById(projectsId,notesId){
    $.ajax({
        url: '/projects/'+projectsId+'/Notes/'+notesId,
        type:'PUT',
        async:true,
        headers:{
            "movetotrash":"Trash"
        },
        dataType : 'json',
        
    });
}
function addNoteComment(projectsId,notesId,person,message){
    var result;
    $.ajax({
        url: '/projects/'+projectsId+'/Notes/'+notesId+'/comment',
        type:'POST',
        async:false,
        data:{
            "person":person,
            "message":message
        },
        dataType : 'json',
        success:function(data){
           result = data;   
        }
    }); 
    return result;
}