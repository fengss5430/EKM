$(function(){
	getUserSelfTeamId();
	var teamid=$("#getPage").attr("title");
	//首次加载
	checkUserInTeam(teamid);
});

//获取登录人teamid
function getUserSelfTeamId(){
//	$("#seList").removeClass("hide");
	var user=null;
	$.ajax({
		url : "user/findSelfbyuserId",
		type : "get",
		async:false,
		dataType : "json",
		success : function (result) {
			var html="";
			if(result.status==1){
				user=result.data;
				if(user.team!=null){
					$("#seList").removeClass("hide");
					for (var i = 0; i < user.team.length; i++) {
						html+='<option value="'+user.team[i].teamId+'">'+user.team[i].teamName+'</option>';
					}
					$("#seList").html(html);
				}else{
					$("#seList").addClass("hide");
				}
			}
		}
	});
	return user;
}

//sel
$('#seList').change(function(){
	var teamID=$(this).val();
	checkUserInTeam(teamID);
});
//查看团队中拥有的成员
function checkUserInTeam(teamID) {
    		$('#Management-table').DataTable({
	                "scrollY": '350px',
	                "scrollCollapse": true,
	                "paging": false,
	                "searching": true,
	                "info": false,
	                "order": [[1, "desc"]],
	                "destroy":true,
	                "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
	                "ajax" : {
	        			"url" : "team/findUsersInTeam",
	        			"type" : "post",
	        			"dataType" : "json",
	        			"data":{
	        				"teamID":teamID
	        			},
	        			"dataSrc" : function(result) {
	        				var data = result.data;
	        				if(result.status == 0) {
	        					data = [];
	        				} else {
	        					for (var i = 0; i < data.length; i++) {
	        						data[i][0] = '<input type="checkbox" name="userInTeam" id="'+data[i].userId+'"/>';
	        						data[i][1] = data[i].userName;
	        						data[i][2] = data[i].department == null ? "" :data[i].department.deptName;
	        						data[i][3] = data[i].email;
	        						data[i][4] = data[i].telephone;
	        					}
	        				}
	        				return data;
	        			}
	        	    }
	            });
    	}

/*添加成员*/
$("#addMember_modal").off('hidden.bs.modal');
$("#addMember_modal").on('hidden.bs.modal',function() {
    $("#addMember_modal").find('table').empty();
});
$("#addMember_modal").off('shown.bs.modal');
$("#addMember_modal").on('shown.bs.modal',function() {
    AddMember();
});
function AddMember(){
    var addMember=null;
    if(addMember){
    }else{
            var teamID = $('#seList').val();
            addMember=$('#member-table').DataTable({
                "scrollY":'277px',
                "scrollCollapse": true,
                "paging": false,
                "searching": true,
                "info": false,
                "order": [[ 1, "asc" ]],
                "destroy":true,
                "aoColumnDefs":[{ "bSortable": false, "aTargets": [0]}],
                "ajax" : {
                    "url" : "team/findUsersNotInTeam",
                    "type" : "get",
                    "dataType" : "json",
                    "data" : {
                        teamID : teamID
                    },
                    "dataSrc" : function(result) {
                        var data = result.data;
                        if(result.status == 0) {
                            data = [];
                        } else {
                            for (var i = 0; i < data.length; i++) {
                                data[i][0] = '<input type="checkbox" name="userNotInTeam" id="'+data[i].userId+'"/>';
                                data[i][1] = data[i].userName;
                                if(data[i].department==null){
                                    data[i][2] = "";
                                }else{
                                    data[i][2] = data[i].department.deptName;
                                }
                            }
                        }
                        return data;
                    }
                }

            });
    }
}
function addMember(){
	var user=getUserSelfTeamId();
	if(user.team==null&&user.teamId==""){
		modal("会话提示","请先加入团队");
		return;
	}
    $("#addMember_modal").modal('show');
    /*添加成员*/

}
//添加成员到团队
function addUser2Team() {
	var userID = $("input[name='userNotInTeam']:checked");
	var teamID = $('#seList').val();
	if(userID.length < 1) {
		modal("会话提示","请至少选择一项");
		return;
	}
	var userIDs = [];
	for (var i = 0; i < userID.length; i++) {
		userIDs.push(userID.eq(i).attr("id"));
	}
	$('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	$.ajax({
		url : "team/addUserIn2Team",
		type : "get",
		dataType : "json",
		data : {
			"userID" : userIDs.join(","),
			"teamID" :teamID
		},
		success : function (result) {
			if(result.status == 1) {
				modal("会话提示","添加成功");
				//刷新团队成员列表
				checkUserInTeam(teamID);
				$("#addMember_modal").modal('hide');
			} else {
				modal("会话提示","添加失败");
			}
			$('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
		}
	});
}
//移除团队成员
function removeUserInTeam() {
	var userID = $("input[name='userInTeam']:checked");
	if(userID.length < 1) {
		modal("会话提示","请至少选择一项");
		return;
	}
	if(!confirm("确定要移除你选择的成员吗?")){
        return;
    }
	var userIDs = [];
	for (var i = 0; i < userID.length; i++) {
		userIDs.push(userID.eq(i).attr("id"));
	}
	var teamID = $('#seList').val();
	$.ajax({
		url : "team/removeUserFromTeam",
		type : "get",
		dataType : "json",
		data : {
			userID : userIDs.join(","),
			teamID : teamID
		},
		success : function (result) {
			if(result.status == 1) {
				modal("会话提示","移除成功");
				//刷新团队成员列表
				checkUserInTeam(teamID);
			} else {
				modal("会话提示","移除失败");
			}
		}
	});
}