function getAllTask(projectsId){
    var result;
    $.ajax({
        url:'/projects/'+projectsId+'/Tasks',
        type:'GET',
        async:false,
        contentType:'application/json',
        success:function(data){
            result = data;      
        } 
    });
    return result;
}
function isEmptyAssignee(string){
    if(!string){
        return "not set";
    }
    else{
        return string;
    }
    
}
function isEmpty(string){
    if(!string){
        return "";
    }
    else{
        return string;
    }
    
}
function appendTasks(projectsId,task_id,taskName,taskAssignee,taskLabel,taskDueDate){
    
    var task = '<p id="checkboxarea'+task_id+'" class="task"><input type="checkbox" class="filled-in complete-task" id="filled-in-box'+task_id+'" value="'+task_id+'"/><label for="filled-in-box'+task_id+'"><span class="blue lighten-1 black-text" style="padding:3px;border-radius:6px;">'+isEmptyAssignee(taskAssignee)+'</span> <span><a id="TN'+task_id+'" href="TaskDetail.html?projectsId='+projectsId+'&taskId='+task_id+'"  class="black-text">'+isEmpty(taskName)+'</a></span><span>-'+isEmpty(taskDueDate)+'</span>.<span class="green-text">'+isEmpty(taskLabel)+'</span></label>&nbsp;<a class="btn btn-flat dropdown-button" data-activates="DDTask'+task_id+'"><i class="material-icons" >more_horiz</i></a></p><ul id="DDTask'+task_id+'" class="dropdown-content"><li><a id="EditTask" href="EditTask.html?projectsId='+projectsId+'&taskId='+task_id+'">Edit</a></li><li><a class="delete-task" value="'+task_id+'">Move To Trash</a></li></ul>';
    
    return task;
}
function deleteTaskById(projectsId,taskId){
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks/'+taskId,
        type:'PUT',
        async:false,
        headers:{
            "header":"Trash"
        },
        dataType : 'json',
        success:function(data){
            
        }
        
    });
}
function completeTaskById(projectsId,taskId){
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks/'+taskId,
        type:'PUT',
        async:false,
        headers:{
            "header":"Complete"
        },
        dataType : 'json',
        success:function(data){
            
        }
        
    });
}
function createTask(projectsId,TaskName,Desc,Assignee,Label,Due_Date){
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks',
        type:'POST',
        async:false,
        data:{
            "Task_Name":TaskName,
            "Description":Desc,
            "Assignee":Assignee,
            "Label":Label,
            "Due_Date":Due_Date
        },
        dataType : 'json',
        success:function(data){
            Materialize.toast('New Task Added');
            
        }
        
    });	
}
function addTaskComment(projectsId,taskId,message){
    var result;
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks/'+taskId+'/comment',
        type:'POST',
        async:false,
        data:{
            "person":'Iqbalafrianto99',
            "message":message
        },
        dataType : 'json',
        success:function(data){
            
            result= data;
        }
    }); 
    return result; 
}
function readTaskById(projectsId,taskId){
    var result;
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks/'+taskId,
        type:'GET',
        async:false,
        success:function(data){
            result = data;
        }
        
    });	
    return result;
}
function appendSubTasks(_id,Subtask_Name,Assignee){
    var SubTask = '<p id="Subtask'+_id+'" class="subtask"><input type="checkbox" class="filled-in complete-subtask" id="filled-in-box'+_id+'" value="'+_id+'"/><label for="filled-in-box'+_id+'"><span class="blue lighten-1 black-text" style="padding:3px;border-radius:6px;" id="STA'+_id+'">'+Assignee+'</span><span id="STN'+_id+'" class="black-text"> '+Subtask_Name+'</span></label>&nbsp;<a class="btn btn-flat dropdown-button" data-activates="DDSubTask'+_id+'"><i class="material-icons" >more_horiz</i></a></p><ul id="DDSubTask'+_id+'" class="dropdown-content"><li><a id="EditSubTaskbtn" class="EditSubTaskbtn" value="'+_id+'">Edit</a></li><li><a class="delete-subtask" value="'+_id+'">Move To Trash</a></li></ul>';
    return SubTask;
}
function addSubTask(projectsId,taskId,Subtask_Name,Assignee){
    var result;
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks/'+taskId+'/subtask',
        type:'POST',
        async:false,
        data:{
            "Subtask_Name":Subtask_Name,
            "Assignee":Assignee
        },
        dataType : 'json',
        success:function(data){
             result = data;
        }
    });  
    return result;
}
function completeSubTasksById(projectsId,taskId,subtaskId){
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks/'+taskId+'/subtask/'+subtaskId,
        type:'PUT',
        async:false,
        headers:{
            "header":"Complete"
        },
        dataType : 'json',
        success:function(data){
            
        }
        
    });
}
function deleteSubTasksById(projectsId,taskId,subtaskId){
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks/'+taskId+'/subtask/'+subtaskId,
        type:'DELETE',
        async:false,
        dataType : 'json',
        success:function(data){
           
        }
        
    });
}
function editSubTaskById(projectsId,taskId,subtaskId,Subtask_Name,Assignee){
    $.ajax({
        url: '/projects/'+projectsId+'/Tasks/'+taskId+'/subtask/'+subtaskId,
        type:'PUT',
        async:false,
        data:{
            "Subtask_Name":Subtask_Name,
            "Assignee":Assignee
        },
        dataType : 'json',
        success:function(data){
           // document.location.reload();
        }
        
    }); 
}