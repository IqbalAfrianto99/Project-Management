function getAllProjects(header){
    var result;
    if(header != null){
        $.ajax(
            {
                url:'/projects/',
                type:'GET',
                async: false,
                headers:{
                    "projects":header
                },
                contentType : 'application/json',
                success:function(data) {
                    result = data;
                }
            });
            return result;
        }
    else{
        $.ajax(
            {
                url:'/projects/',
                type:'GET',
                async: false,
                contentType : 'application/json',
                success:function(data) {
                    result = data;
                }
            });
            return result;
    }
        
}

function deleteProjects(projectsId){
    $.ajax({
        url: '/projects/'+projectsId,
        type:'DELETE',
        async:true,
        success:function(data){
            Materialize.toast(data.message, 4000,'',function(){document.location = "Projects.html"});
        }
        
    });
}
function completeOrReopenProjects(projectsId,action){
    if(action == 'COMPLETED'){
        $.ajax({
            url: '/projects/'+projectsId,
            type:'PUT',
            async:true,
            data:{
                "Label":"COMPLETED"
            },
            success:function(data){
                document.location = "Projects.html";
            }
            
        });
    }
    else{
        $.ajax({
            url: '/projects/'+projectsId,
            type:'PUT',
            async:true,
            data:{
                "Label":"ONGOING"
            },
            success:function(data){
                document.location = "Projects.html";
            }
            
        });
    }
    
}
function Projects_Card(_id,Project_Name,Label,Client_Company){
    var Projects_Card = "<div class='col s12 m6 l4'><div class='card red darken-2'><a href='ProjectsDetail.html?projectsId="+_id+"'><div class='card-content white-text'><span class='card-title'>"+Project_Name+"</span><h6>Status : <span class='yellow darken-3  white-text' style='padding: 5px'>"+Label+"</span></h6><h6>Clients: <span>"+Client_Company+"</span></h6><h6>Active : 1 Days Ago</h6></div></a><div class='card-action center'><a href='' class='dropdown-button' data-activates='"+String(_id)+"'><i class='material-icons'>more_horiz</i></a><a href='javascript:;' class='star'><i class='material-icons' style='color:black' id='staricon'>star</i></a><ul class='dropdown-content' id='"+String(_id)+"' style='width: fit-content'><li><a href='EditProject.html?projectsId="+_id+"' style='text-transform: unset'>Edit</a></li><li><a href='#!' style='text-transform: unset'>Manage Task Labels</a></li><li><a href='#Complete"+_id+"' class='modal-trigger' style='text-transform: unset'>Complete</a></li><li class='divider'></li><li><a href='#MoveToTrash"+_id+"' class='modal-trigger' style='text-transform: unset'>Move to Trash</a></li></ul><!-- Delete PRoject Modal --><div class='modal' id='MoveToTrash"+_id+"'><div class='modal-content'><div class='container'><h5>Move "+Project_Name+" to Trash?</h5><hr><h6>The project and everything inside it (tasks, discussions, uploaded files, tracked time, expenses, etc.) will be moved to Trash. The project will stay there for 30 days. To remove it permanently now, empty the Trash.</h6><hr><div class='row'><a href='javascript:;' class='btn red fordel' style='text-transform: unset' value='"+_id+"'>Move to Trash</a>&nbsp;<a href='javascript:;' class='btn grey lighten-1 modal-close' style='text-transform: unset'>Cancel</a></div></div></div></div><!-- Delete Project Modal --><!-- Complete Project Modal --><div class='modal' id='Complete"+_id+"'><div class='modal-content'><div class='container'><h5>Complete "+Project_Name+"?</h5><h6>This will complete all the tasks in the project and move it to the 'Completed Projects' list.</h6><div class='row'><a href='javascript:;' class='btn blue complete' style='text-transform: unset' value='"+_id+"'>Complete Project</a>&nbsp;&nbsp;<a href='#!' class='btn grey lighten-1 modal-close' style='text-transform: unset'>Cancel</a></div></div></div></div><!-- Complete Project Modal --></div></div></div>";

    return Projects_Card;
}

function readProjects(projectsId){
    var result;
    $.ajax({
        url:'/projects/'+projectsId,
        type:'GET',
        async:false,
        contentType:'application/json',
        success:function(data){
           result = data;
        }
    });
    return result;
}

function updateProjects(projectsId,PN,D,C,L,CC,T){
    $.ajax({
        url: '/projects/'+projectsId,
        type:'PUT',
        async:true,
        data: {
            "Project_Name":PN,
            "Description": D,
            "Category":C,
            "Label":L,
            "Client_Company":CC,
            "Template":T
        },
        dataType : 'json',
    });
}