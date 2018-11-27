$(function(){
	//首次加载
	teamList();
});

/*新建团队*/
function AddTeam(){
	getUserList("#roleSelecte");
    $('#AddTeam_modal').modal('toggle');
    $('#AddTeam_modal').off('hidden.bs.modal');
    $('#AddTeam_modal').on('hidden.bs.modal', function () {
        $(".emptyTips").hide();
        $(".beTips").hide();
        $("#teamnum").val("");
        $("#teamName").val('');
        $("#remark").val('');
        $(".specialTips").css("display","none");
    });
}

/*设置团队*/
function SetTeam(){
	var teamID = $("input[name='teamInput']:checked");
	if(teamID.length != 1) {
		modal("会话提示","请选择一项或不要选择多项");
		return;
	}
	getUserList("#roleSelecte1");
    $('#SetTeam_modal').modal('toggle');
    $('#SetTeam_modal').off('shown.bs.modal');
    $('#SetTeam_modal').on('shown.bs.modal', function () {
        showTeamInfo();
    });
}
$("#SetTeam_modal").off('hidden.bs.modal');
$("#SetTeam_modal").on('hidden.bs.modal',function(){
    $(".emptyTips").hide();
    $(".beTips").hide();
    $(".specialTips").hide();
});
/*查看成员*/
function TeamManagement(){
	var teamID = $("input[name='teamInput']:checked");
	if(teamID.length != 1) {
		modal("会话提示","请选择一项或不要选择多项");
		return;
	}
    $('#TeamManagement_modal').modal('toggle');
    /*成员管理*/
        $("#TeamManagement_modal").off('shown.bs.modal');
        $("#TeamManagement_modal").on('shown.bs.modal', function () {
        	//加载团队成员
        	checkUserInTeam();
        });
}

/*添加成员*/
function addMember(){
    $("#addMember_modal").modal('toggle');
    /*添加成员*/
        $("#addMember_modal").off('shown.bs.modal');
        $("#addMember_modal").on('shown.bs.modal',function() {
        	//加载团队之外的成员
        	addUserList();
        });
}
//部门名称已存在
function repeatTeamName(e,type){
	var teamId=0;
	var teamName = $(e).val().trim();
    var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
	if(teamName.length==0){
        $("#teamName").focus();
		$(e).parent().next().show();
	}else{
        $(e).parent().next().hide();
	}
    if(!reg.test(teamName)&&teamName.length!=0){
        $(e).parent().next().next().next().show();
    }else{
        $(e).parent().next().next().next().hide();
    }
    if(type=="2"){
    	teamId = $("input[name='teamInput']:checked").attr("id");
	}
	$.ajax({
		url : "team/findTeamByName",
		type : "post",
		dataType : "json",
		data :{
			"teamName": teamName,
			"teamId":teamId
		},
		success : function(result){
			if(result.status==1){
                $(e).parent().next().next().show();
			 }else{
                $(e).parent().next().next().hide();
			}
			}
		});
	}

//用户列表
function getUserList(id) {
	$.ajax({
		url : "user/findAll",
		type : "get",
		dataType : "json",
		success : function (result) {
			$(id).empty();
			if(result.status == 1) {
				var data = result.data;
				var html = '<option value="0">请选择</option>';
				for (var i = 0; i < data.length; i++) {
					html += '<option value="'+data[i].userId+'">'+data[i].userName+'</option>';
				}
				$(id).html(html);
			}
		}
	});
}

//团队列表
function teamList() {
	var url = "team/findAll";
	 var teamList=null;
		if(teamList){
	    }else{
	    	teamList=$('#team-table').DataTable({
	    "scrollY":'791px',
	    "scrollCollapse": true,
	    "paging": false,
	    "searching": true,
	    "info": false,
        "order": [[ 1, "asc" ]],
        "aoColumnDefs":[ { "bSortable": false, "aTargets": [0]}],
	    "destroy":true,
	    "ajax" : {
			"url" : url,
			"type" : "get",
			"dataType" : "json",
			"dataSrc" : function(result) {
				var data = result.data;
				if(result.status == 0) {
					data = [];
				} else {
					for (var i = 0; i < data.length; i++) {
						data[i][0] = '<input type="checkbox" name="teamInput" id="'+data[i].teamId+'"/>';
						data[i][1] = data[i].teamName;
						data[i][2] = (data[i].user==null || data[i].user.userName == null)?"":data[i].user.userName;
						data[i][3] = data[i].teamSize;
						data[i][4] = data[i].createTime.substring(0, data[i].createTime.lastIndexOf("."));
						data[i][5] = data[i].remark;
					}
				}
				return data;
			}
	    }
	});
}
}
//部门编号验证
function repeatTeamNum(e,type){
	var teamId=0;
	var teamNum = $(e).val().trim();
	var numReg = /^[\u4e00-\u9fa5]+$/;//部门编号正则
	if(teamNum.length==0){
		$('#teamnum').focus();
		$(e).parent().next().show();
	}else{
		$(e).parent().next().hide();
	}
	if(teamNum.match(numReg)){
        $(e).parent().next().next().next().show();
	}else{
        $(e).parent().next().next().next().hide();
	}
	if(type=="2"){
    	teamId = $("input[name='teamInput']:checked").attr("id");
	}
	$.ajax({
		url : "team/findTeamByNum",
		type : "post",
		dataType : "json",
		data :{
			"teamnum":teamNum,
			"teamId":teamId
		},
		success : function(result){
			if(result.status==1){
				$(e).parent().next().next().show();
			 }else{
				$(e).parent().next().next().hide();
			}
		}
	});
}
//创建团队
function createTeam() {
	var num = $("#teamnum").val().trim();
	var name = $("#teamName").val().trim();
    var remark=$("#remark").val().trim();
    var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
    var numReg = /^[\u4e00-\u9fa5]+$/;//部门编号正则
	if(name== "") {
		modal("会话提示","团队名称不能为空");
		return;
	}
    if(!reg.test(name)) {
        modal("会话提示框","团队名称 只能包含1至50位汉字,英文！");
        return;
    }
    if(num==""){
		modal("警告提示!","请输入团队ID!");
		return;
	}else if(num.length>20){
		modal("警告提示!","团队ID不能多于20位!");
		return;
	}else if(num.match(numReg)){
		modal("警告提示!","团队ID不能输入中文!");
		return;
	}
    if(remark.length>30){
        modal("会话提示","输入字母或数字长度不能超过30!");
        return;
    }
	var leader = $("#roleSelecte").find("option:selected").val();
	$('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	$.ajax({
		url : "team/createTeam",
		type : "post",
		dataType : "json",
		data : {
			teamnum:num,
			teamName : name,
			Leader : leader,
			remark :remark
		},
		success : function (result) {
			if(result.status == 1) {
				modal("会话提示","创建成功");
				//刷新列表
				teamList();
				getSelfMess();
				$("#teamnum").val("");
				$("#teamName").val("");
				$("#teamLeader").val("");
				$("#remark").val("");
				//关闭模态框
				$('#AddTeam_modal').modal('hide');
			} else if(result.status == 0){
				modal("会话提示","创建失败");
			}else if(result.status == 2){
				$('#AddTeam_modal').modal('show');
				modal("会话提示","此部门名称已存在!");
			}
			$('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
		}
	});
}

//显示团队信息
function showTeamInfo() {
	var teamID = $("input[name='teamInput']:checked").attr("id");
	$.ajax({
		url : "team/findTeamByid",
		type : "get",
		dataType : "json",
		data : {
			teamid : teamID
		},
		success : function (result) {
			if(result.status == 1) {
				var data = result.data;
				$("#teamnum1").val(data.teamnum);
				$("#teamName1").val(data.teamName);
				if(data.leader != null) {
					var options = $("#roleSelecte1").find("option");
					for (var i = 0; i < options.length; i++) {
						if(options.eq(i).attr("value")==data.leader) {
							options.eq(i).prop("selected",true);
						}
					}
				}
				$("#remark1").val(data.remark);
			} else {
				modal("会话提示","获取失败");
			}
		}
	});
}

//修改团队信息
function updateTeamInfo() {
	var num = $('#teamnum1').val().trim();
	var name = $('#teamName1').val().trim();
    var remark=$("#remark1").val().trim();
	var numReg = /^[\u4e00-\u9fa5]+$/;;//部门编号正则
    var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
    if(name== "") {
        modal("会话提示","团队名称不能为空");
        return;
    }
    if(!reg.test(name)) {
        modal("会话提示框","团队名称 只能包含1至50位汉字,英文！");
        return;
    }
    if(num==""){
		modal("警告提示!","请输入团队ID!");
		return;
	}else if(num.length>20){
		modal("警告提示!","团队ID不能多于20位!");
		return;
	}else if(num.match(numReg)){
		modal("警告提示!","团队ID不能输入中文!");
		return;
	}
	var leader = $("#roleSelecte1").find("option:selected").val();
    if(remark.length>30){
		modal("会话提示","输入字母或数字长度不能超过30!");
		return;
    }
	var teamID = $("input[name='teamInput']:checked").attr("id");
	$.ajax({
		url : "team/updateTeamInfo",
		type : "post",
		dataType : "json",
		data : {
			teamnum:num,
			teamId : teamID,
			teamName : name,
			Leader : leader,
			remark : remark
		},
		success : function (result) {
			if(result.status == 1) {
				modal("会话提示","修改成功");
				//刷新列表
				teamList();
				getSelfMess();
				//关闭模态框
				$('#SetTeam_modal').modal('hide');
			} else if(result.status ==-1){
				modal("会话提示","团队名称已存在");
			} else if(result.status ==-2){
				modal("会话提示","团队ID已存在");
			} else{
				modal("会话提示","修改失败");
			}
		}
	});
}

//删除团队
function deleteTeam() {
	var teamID = $("#team-table input[name='teamInput']:checked");
	if(teamID.length < 1) {
		modal("会话提示","请至少选择一项");
		return;
	}
	if(!confirm("确定要删除你选择的团队吗?")){
		return;
	}
	var teamIDs = [];
	for (var i = 0; i < teamID.length; i++) {
		teamIDs.push(teamID.eq(i).attr("id"));
	}
	$.ajax({
		url : "team/deleteTeam",
		type : "get",
		dataType : "json",
		data : {
			teamID : teamIDs.join(",")
		},
		success : function (result) {
			if(result.status == 1) {
				modal("会话提示","删除成功");
                $("#delHandle-modal").modal('hide');
				//刷新列表
				teamList();
				getSelfMess();
			} else {
				modal("会话提示","删除失败");
			}
		}
	});
//    $("#delHandle-modal").modal('toggle');
}
//function delDepartment(){
//    var teamID=$("#team-table input[name='teamInput']:checked");
//    var teamIDs = [];
//	for (var i = 0; i < teamID.length; i++) {
//		teamIDs.push(teamID.eq(i).attr("id"));
//	}
//	$.ajax({
//		url : "team/deleteTeam",
//		type : "get",
//		dataType : "json",
//		data : {
//			teamID : teamIDs.join(",")
//		},
//		success : function (result) {
//			if(result.status == 1) {
//				modal("会话提示","删除成功");
//                $("#delHandle-modal").modal('hide');
//				//刷新列表
//				teamList();
//				getSelfMess();
//			} else {
//				modal("会话提示","删除失败");
//			}
//		}
//	});
//}

//查看团队中拥有的成员
function checkUserInTeam() {
	//获取团队名称
	var checkedTeamName = $("input[name='teamInput']:checked").parent().parent().children().eq(1).html();
	$("#teamNameSpan").html(checkedTeamName+"团队成员管理");
	var teamID = $("input[name='teamInput']:checked").attr("id");
	 var checkUserInTeam=null;
		if(checkUserInTeam){
	    }else{
	    	checkUserInTeam=$('#Management-table').DataTable({
	                "scrollY": '350px',
	                "scrollCollapse": true,
	                "paging": false,
	                "searching": true,
	                "info": false,
	                "destroy" : true,
	                "order": [[1, "desc"]],
	                // "dom": 'T<"clear">lfrtip',
	                'destroy':true,
	                "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
	                "ajax" : {
	        			"url" : "team/findUsersInTeam",
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
}

//移除团队成员
function removeUserInTeam() {
	var userID = $("input[name='userInTeam']:checked");
	if(userID.length < 1) {
		modal("会话提示","请至少选择一项");
		return;
	}
	if(!confirm("确定要移除你选择的用户吗?")){
		return;
	}
	var userIDs = [];
	for (var i = 0; i < userID.length; i++) {
		userIDs.push(userID.eq(i).attr("id"));
	}
	var teamID = $("input[name='teamInput']:checked").attr("id");
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
				$("#addMember_modal").modal('hide');
				$('#TeamManagement_modal').modal('hide');
				modal("会话提示","移除团队成员成功");
				//刷新团队成员列表
				checkUserInTeam();
				getSelfMess();
				teamList();
			} else {
				modal("会话提示","移除团队成员失败");
			}
		}
	});
}

//添加成员列表
function addUserList() {
	var teamID = $("input[name='teamInput']:checked").attr("id");
	 var addUserList=null;
		if(addUserList){
	    }else{
	    	addUserList=$('#member-table').DataTable({
        "scrollY":'277px',
        "scrollCollapse": true,
        "paging": false,
        "searching": true,
        "info": false,
        "order": [[ 1, "desc" ]],
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
							data[i][2] ="";
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

//添加成员到团队
function addUser2Team() {
	var userID = $("input[name='userNotInTeam']:checked");
	var teamID = $("input[name='teamInput']:checked").attr("id");
	if(userID.length < 1) {
		modal("会话提示","请至少选择一项");
		return;
	}
	var userIDs = [];
	for (var i = 0; i < userID.length; i++) {
		userIDs.push(userID.eq(i).attr("id"));
	}
	$.ajax({
		url : "team/addUserIn2Team",
		type : "get",
		dataType : "json",
		data : {
			userID : userIDs.join(","),
			teamID : teamID
		},
		success : function (result) {
			if(result.status == 1) {
				modal("会话提示","添加成功");
				$('#TeamManagement_modal').modal('hide');
				//刷新团队成员列表
				checkUserInTeam();
				teamList();
				getSelfMess();
				$("#addMember_modal").modal('hide');
			} else {
				modal("会话提示","添加失败");
			}
		}
	});
}