function getAllDiscussion(projectsId){
    var result;
    $.ajax({
        url:'/projects/'+projectsId+'/Discussions',
        type:'GET',
        async:false,
        contentType:'application/json',
        success:function(data){
            result = data; 
        } 
    });
    return result;
}
function createDiscussion(projectsId,discName,discAbout){
    var result;
    $.ajax({
        url: '/projects/'+projectsId+'/Discussions',
        type:'POST',
        async:false,
        data:{
            "Discussion_Name":discName,
            "Discussion_About":discAbout
        },
        dataType : 'json',
        success:function(data){
        result = data;
        
        }
        
    }); 
    return result;
}
function readDiscussionById(projectsId,discId){
    var result;
    $.ajax({
        url:'/projects/'+projectsId+'/Discussions/'+discId,
        type:'GET',
        async:false,
        contentType:'application/json',
        success:function(data){
            result = data;
            
        }
        
    });
    return result;
}
function updateDiscussionById(projectsId,discId,discName,discAbout){
    $.ajax({
        url: '/projects/'+projectsId+'/Discussions/'+discId,
        type:'PUT',
        async:true,
        data:{
            "Discussion_Name":discName,
            "Discussion_About":discAbout
        },
        dataType : 'json',
        
    });
}
function deleteDiscussionById(projectsId,discId){
    $.ajax({
        url: '/projects/'+projectsId+'/Discussions/'+discId,
        type:'PUT',
        async:true,
        headers:{
            "movetotrash":"Trash"
        },
        dataType : 'json',
        
    });
}
function addDiscComment(projectsId,discId,person,message){
    $.ajax({
        url: '/projects/'+projectsId+'/Discussions/'+discId+'/comment',
        type:'POST',
        async:true,
        data:{
            "person":person,
            "message":message
        },
        dataType : 'json',   
    });  
}