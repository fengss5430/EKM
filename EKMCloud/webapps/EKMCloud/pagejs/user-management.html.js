$(function(){
	getAllSpace();
	getUserInfoList();
});
/*----AddUser----*/
function AddUser(){
	getRoleList("");
	getDepteList("");
	getTeamList("");
	getOpList("");
	iniProject("");
    $('#AddUser-btn-modal').modal('toggle');
}
$('#AddUser-btn-modal').off('hidden.bs.modal');
$('#AddUser-btn-modal').on('hidden.bs.modal', function () {
    $(".emptyTips").hide();
    $(".beTips").hide();
    $(".specialTips").hide();
	$("#userName").val('');
	$("#password").val('');
	$("#realName").val('');
	$("#phone").val('');
	$("#email").val('');
	$("#spaceSize").val('');
	iniProject("");
});

/*----SetUser----*/
function SetUser(){
	getRoleList("1");
	getDepteList("1");
	getTeamList("1");
	getOpList("1");
	iniProject("1");
	var inputs = $("#User-table").find("input:checked");
	if(inputs.length>1||inputs.length==0){
		modal("警告提示!","修改用户操作只能选择一条信息!");
		return;
	}
	$('#SetUser-btn-modal').modal('toggle');
	$('#SetUser-btn-modal').off('shown.bs.modal');
	$('#SetUser-btn-modal').on('shown.bs.modal', function () {
		getUserById();
	});
}
$('#SetUser-btn-modal').off('hidden.bs.modal');
$('#SetUser-btn-modal').on('hidden.bs.modal', function () {
	iniProject("1");
});

//添加用户/-所属团队
$('#teamSelecte1').selectpicker('val','arr','Mustard',{
    'selectedText': 'cat',
});

//添加用户/设置-工程类型
$('#projectSelecte,#projectSelecte1').selectpicker('val', 'arr','Mustard',{
	'selectedText': 'cat',
});

/********************/
//根据用户ID查询用户信息
function  getUserById(){
	var userId = $("#User-table").find("input:checked").attr("id");
	$.ajax({
		url : "user/findbyuserId",
		type : "post",
		dataType : "json",
		async:false,
		data :{
			"userId":userId
		},
		success : function(result){
			var data = result.data;
			$("#userName1").val(data.userName);
			var roles = $("#roleSelecte1").find("option");
			setSelecte(roles,data.roleId);
			var depats = $("#deptSelecte1").find("option");
			setSelecte(depats,data.deptId);
			var limits = $("#limitSelect1").find("option");
			setSelecte(limits,data.operid);
			var timepats = $("#timeSelecte1").find("option");
			setSelecte(timepats,data.deadDay);
			var teamList=data.team;
			var html = new Array();
			if(teamList==null){
				$('#teamSelecte1').selectpicker({noneSelectedText:'请选择'});
				$("#teamSelecte1").selectpicker('refresh');
			}
			if(teamList!=null){
				 $.each(teamList, function (i) {
			            html.push(teamList[i].teamId);
			    });
			}
			$('#teamSelecte1').selectpicker('val', html);//默认选中
			$("#teamSelecte1").selectpicker('refresh');
			if(data.protype!=null){
				var protype=data.protype;
				var arr=protype.split(',');
				$('#projectSelecte1').selectpicker('val', arr);//默认选中
				$("#projectSelecte1").selectpicker('refresh');
			}else{
				$('#projectSelecte1').selectpicker({noneSelectedText:'请选择'});
				$("#projectSelecte1").selectpicker('refresh');
			}
			$("#realName1").val(data.realName);
			$("#email1").val(data.email);
			$("#phone1").val(data.telephone);
		}	
	});
}
//设置下拉选中
function setSelecte(sel,id){
	for(var i =0;i<sel.length;i++){
		if(sel.eq(i).attr("value")==id){
			sel.eq(i).prop('selected','true');
		}
	}
}

//获取用户信息列表
function getUserInfoList(){
	var userTable = null;
	var url = "user/getUserList";
	if(userTable){
		userTable.ajax.url(url).load();
	}else{
		  userTable = $('#User-table').DataTable({
		        "scrollY":'791px',
		        "scrollCollapse": true,
		        "paging": false,
		        "searching": true,
		        "info": false,
		        "destroy":true,
			  	"order": [[ 1, "asc" ]],
			  	"aoColumnDefs":[ { "bSortable": false, "aTargets": [0]}],
		        "ajax":{
		        	"url" : url,
		        	"type" : "get",
		        	"dataType" : "json",
		        	"dataSrc" :function(result){
		        		var data = result.data;
		        		if(result.status == 0) {
		        			data = [];
						} else {
			        		for(var i =0;i<data.length;i++){
			        			if(data[i].role!=null){
			        				data[i][0]= '<input type="checkbox" id = "'+data[i].userId+'" name="'+data[i].role.roleId+'"/>';
			        			}else{
			        				data[i][0]= '<input type="checkbox" id = "'+data[i].userId+'" name=""/>';
			        			}
			        			data[i][1]= data[i].userName;
			        			data[i][2]= data[i].realName;
			        			if(data[i].role==null){
			        				data[i][3]="";	
			        			}else{
			        				data[i][3]= data[i].role.roleName;//角色
			        			}
			        			if(data[i].department==null){
			        				data[i][4]="";	
			        			}else{
			        				data[i][4]= data[i].department.deptName;
			        			}
			        			var teamList=data[i].team;
			        			data[i][5]="";
			        			if(teamList==null){
			        				data[i][5]="";	
			        			}
			        			if(teamList!=null){
			        				for (var j = 0; j < teamList.length; j++) {
		        						if(j!=teamList.length-1){
		        							data[i][5]+=teamList[j].teamName+",";//团队
		        						}else{
		        							data[i][5]+=teamList[j].teamName;//团队
		        						}
			        				}
			        			}
			        			data[i][6]= data[i].email;
			        			data[i][7]= data[i].telephone;
			        			if(data[i].status==1){
			        				data[i][8]='<span class="OnlineCorlor">在线</span>';
			        			}else{
			        				data[i][8]='<span class="OffLineCorlor">离线</span>';
			        			}
		        				data[i][9]=(data[i].useTime/3600).toFixed(0)+"h";
			        		}
						}
		        		return data;
		        	}
		        }
		    });
		}
	}

//获取角色下拉选
function  getRoleList(e){
	$.ajax({
		url : "role/findAllrole",
		type : "get",
		dataType : "json",
		success : function(result){
			var data = result.data;
			$("#roleSelecte"+e).empty();
			var html ="";
			html+='<option value="" >请选择</option>';
			for(var i =0; i<data.length;i++){
				html += '<option value="'+data[i].roleId+'">'+data[i].roleName+'</option>';
			}
			$("#roleSelecte"+e).html(html);
		}
	});
}

//获取权限下拉选
function  getOpList(e){
	$.ajax({
		url : "operation/getOperpow",
		type : "post",
		dataType : "json",
		success : function(result){
			var data = result.data;
			$("#limitSelect"+e).empty();
			var html ="";
			html+='<option value="" >请选择</option>';
			for(var i =0; i<data.length;i++){
				html += '<option value="'+data[i].operid+'">'+data[i].operponame+'</option>';
			}
			$("#limitSelect"+e).html(html);
		}
	});
}
//获取部门下拉选
function  getDepteList(e){
	$.ajax({
		url : "dept/findAll",
		type : "get",
		dataType : "json",
		success : function(result){
			var data = result.data;
			$("#deptSelecte"+e).empty();
			var html ="";
			html+='<option value="" >请选择</option>';
			for(var i =0; i<data.length;i++){
				html += '<option value="'+data[i].deptId+'">'+data[i].deptName+'</option>';
			}
			$("#deptSelecte"+e).html(html);
		}
	});
}

//获取团队下拉选
function  getTeamList(e){
	$.ajax({
		url : "team/findAll",
		type : "get",
		dataType : "json",
		success : function(result){
			var data = result.data;
			$("#teamSelecte"+e).empty();
			var html ="";
			for(var i =0; i<data.length;i++){
				html += '<option value="'+data[i].teamId+'">'+data[i].teamName+'</option>';
			}
			$('#teamSelecte'+e).selectpicker({noneSelectedText:'请选择'});
			$("#teamSelecte"+e).html(html);
			$("#teamSelecte"+e).selectpicker('refresh');
		}
	});
}
function iniProject(e){
	$("#projectSelecte"+e).val('');
	$("#projectSelecte"+e).selectpicker({noneSelectedText:'请选择'});
	$("#projectSelecte"+e).selectpicker('refresh');
}
//用户已存在
function repeatUserName(e){
	var userName = $(e).val().trim();
    var reg = /^[a-zA-Z0-9]+$/;
	if(userName.length==0){
		$("#userName").focus();
		$(e).parent().next().show();
	}else{
        $(e).parent().next().hide();
	}
    if(!reg.test(userName)&&userName.length!=0){
        $(e).parent().next().next().next().show();
    }else{
        $(e).parent().next().next().next().hide();
    }
	$.ajax({
		url : "user/finduser",
		type : "post",
		dataType : "json",
		data :{
			"userName": userName			
		},
		success : function(result){
			if(result.status==1){
                $(e).parent().next().next().show();
                $(e).focus().select();
			 }else{
                $(e).parent().next().next().hide();
			}
			}
		});
}
//获取所有用户分配的的总空间大小
function getUsersSpace(){
	var userspaceSize=0;
	$.ajax({
		url : "user/findSpace",
		type : "post",
		dataType : "json",
		async:false,
		success : function(result){
			userspaceSize=result.data;
		}
	});
	return userspaceSize;
}
//获取所有用户分配的的总空间大小
function UsersSpace(){
	var userspize=0;
	$.ajax({
		url : "user/findUsersSpaces",
		type : "post",
		dataType : "json",
		async:false,
		success : function(result){
			userspize=result.data;
		}
	});
	return userspize;
}
function getAllSpace(){
	var allspaceSize=0;
	$.ajax({
		url : "data/file/getuTolSpace",
		type : "post",
		dataType : "json",
		async:false,
		success : function(result){
			if(result.status==1){
				allspaceSize=result.data;
			}
		}
	});
	return allspaceSize;
}
//添加用户
function addUser(){
	var userName = $("#userName").val().trim();
	var password = $("#password").val();
	var roleId = $("#roleSelecte").find("option:selected").val();
	var deptId = $("#deptSelecte").find("option:selected").val();
	var operid = $("#limitSelect").find("option:selected").val();
	var timeid = $("#timeSelecte").find("option:selected").val();
	var teamId = new Array();
	var protype = new Array();
	teamId = $('#teamSelecte').val(); 
	if(teamId==null){
		teamId="";
	}else{
		teamId = teamId.join(",");
	}
	protype = $("#projectSelecte").val();
	if(protype==null){
		protype="";
	}else{
		protype = protype.join(",");
	}
	var realName = $("#realName").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var spaceSize = $("#spaceSize").val();
	var userNameReg = /^[\w]{1,50}$/;//用户名正则
	var passwordReg = /^[0-9a-zA-Z_-]{6,16}$/;//用户密码正则
    var realNameReg = /^[\u4E00-\u9FA5|a-zA-Z]*$/;
	var emailReg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var phoneReg =/^1[34578]\d{9}$/;
	var roomReg =  /^[1-9]\d*$/;
	if(userName==""){
		modal("警告提示!","用户名不能为空!");
		return;
	}else if(userName.length<1 || userName.length>50){
		modal("警告提示!","用户名长度在1~50位之间,请重新输入!");
		return;
	}else if(!userName.match(userNameReg)){
		modal("警告提示!","用户名只能是英文字母和数字组成!");
		return;
	}
	if(password==""){
		modal("警告提示!","密码不能为空!");
		return;
	}else if(password.length<6||password.length>16){
		modal("警告提示!","密码长度在6~16位之间,请重新输入!");
		return;
	}else if(!password.match(passwordReg)){
		modal("警告提示!","密码只能是英文字母和数字组成!");
		return;
	}
	if(roleId==""){
		modal("警告提示!","请选择用户角色!");
		return;
	}
	if(deptId==""){
		modal("警告提示!","请选择所属部门!");
		return;
	}
	if(operid==""){
		modal("警告提示!","请选择操作权限!");
		return;
	}
	if(realName.length!=0&&(realName.length<1 || realName.length>50)){
		modal("警告提示!","真实姓名长度在1~50位之间,请重新输入!");
		return;
	}else if(realName.length!=0&&!realName.match(realNameReg)){
		modal("警告提示!","真实姓名只能包含中英文,请重新输入!");
		return;
	}

	if(phone.length!=0&&!phone.match(phoneReg)){
		modal("警告提示!","手机号不正确请重新输入!");
		return;
	}
	if(email.length!=0&&!email.match(emailReg)){
        modal("警告提示!","邮箱格式不正确,请重新输入!");
        return;
    }
	if(spaceSize.length!=0&&!spaceSize.match(roomReg)){
        modal("警告提示!","空间大小只能是正整数!");
        return;
	}
	if(spaceSize.length==0){
		spaceSize=10;
	}
	var zspace=$("#zspaceid").html();
	var spaceSizess=getTOSize(spaceSize+"G");
	var tolspaces=getTOSize(zspace);
	$('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	$.ajax({
		url : "user/addUser",
		type : "post",
		dataType : "json",
		data :{
			"spaceSizess": spaceSizess,
			"tolspaces": tolspaces,
			"userName": userName,
			"password": password,
			"roleId": roleId,
			"deptId": deptId,
			"teamId": teamId,
			"realName": realName,
			"email": email,
			"telephone": phone,
			"protype": protype,
			"operid": operid,
			"deadDay": timeid,
			"spaceSize": spaceSize
		},
		success : function(result){
			if(result.status==1){
				modal("操作提示!","添加用户信息成功!");
				$('#AddUser-btn-modal').modal('hide');
				getUserInfoList();
				projectpower();
				$("#userName").val("");
				$("#password").val("");
				$("#realName").val("");
				$("#email").val("");
				$("#phone").val("");
				$("#spaceSize").val("");
			}else if(result.status==0){
				modal("操作提示!","添加用户信息失败!");
			}else if(result.status==2){
				modal("操作提示!","此用户名称已存在!");
			}else if(result.status==3){
				modal("操作提示!","磁盘空间不足，不能为用户分配!");
			}
			$('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
		}
	});
}

//修改用户
function updateUser(){
	var inputs = $("#User-table").find("input:checked");
	if(inputs.length!=1){
		modal("警告提示!","修改用户操作只能选择一条信息!");
		return;
	}
	var userId = inputs.attr("id");
	var userName = $("#userName1").val();
	var password = $("#password1").val();
	var roleId = $("#roleSelecte1").find("option:selected").val();
	var deptId = $("#deptSelecte1").find("option:selected").val();
	var operid = $("#limitSelect1").find("option:selected").val();
	var timeid = $("#timeSelecte1").find("option:selected").val();
	var teamId = new Array();
	var protype = new Array();
	teamId = $('#teamSelecte1').val(); 
	if(teamId==null){
		teamId="";
	}else{
		teamId = teamId.join(",");
	}
	protype = $("#projectSelecte1").val();
	if(protype==null){
		protype="";
	}else{
		protype = protype.join(",");
	}
	var realName = $("#realName1").val();
	var email = $("#email1").val();
	var phone = $("#phone1").val();
	var spaceSize = $("#spaceSize1").val();
	var userNameReg = /^[\w]{1,50}$/;//用户名正则
	var passwordReg = /^[0-9a-zA-Z_-]{6,16}$/;//用户密码正则
    var realNameReg = /^[\u4E00-\u9FA5|a-zA-Z]*$/;
	var emailReg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var phoneReg = /^1[\d]{10}$/;
	var roomReg =  /^[1-9]\d*$/;
	if(roleId==""){
		modal("警告提示!","请选择用户角色!");
		return;
	}
	if(deptId==""){
		modal("警告提示!","请选择所属部门!");
		return;
	}
	if(operid==""){
		modal("警告提示!","请选择操作权限!");
		return;
	}
	if(realName.length!=0&&(realName.length<1 || realName.length>50)){
		modal("警告提示!","真实姓名长度在1~50位之间,请重新输入!");
		return;
	}else if(realName.length!=0&&!realName.match(realNameReg)){
		modal("警告提示!","真实姓名只包含中英文,请重新输入!");
		return;
	}
	if(phone.length!=0&&!phone.match(phoneReg)){
		modal("警告提示!","手机号不正确请重新输入!");
		return;
	}
	if(email.length!=0&&!email.match(emailReg)){
        modal("警告提示!","邮箱格式不正确,请重新输入!");
        return;
    }
	if(spaceSize.length!=0&&!spaceSize.match(roomReg)){
        modal("警告提示!","空间大小只能是正整数!");
        return;
	}
	var spaceSizess=0;
	var spaceSized=0;
	if(spaceSize.length!=0){
		spaceSizess=getTOSize(spaceSize+"G");//新加的
		spaceSized=spaceSize;
	}
//	var zspace=$("#zspaceid").html();
	var zspace=$("#nospaceid").html();
	var tolspaces=getTOSize(zspace);
	var usersSpace=getTOSize(UsersSpace()+"G");
	if(spaceSize.length!=0){
		if(tolspaces-spaceSizess-usersSpace<0){
			modal("操作提示!","磁盘空间不足，不能为用户扩容!");
			return;
		}
	}
	
	$.ajax({
		url : "user/updateUserById",
		type : "post",
		dataType : "json",
		data :{
			"spaceSizess": spaceSizess,
			"tolspaces": tolspaces,
			"userName": userName,
			"password": password,
			"roleId": roleId,
			"deptId": deptId,
			"teamId": teamId,
			"protype":protype,
			"realName": realName,
			"email": email,
			"telephone": phone,
			"operid":operid,
			"spaceSize":spaceSized,
			"deadDay": timeid,
			"userId":userId
		},
		success : function(result){
			if(result.status==1){
				modal("操作提示!","修改用户信息成功!");
				updataLogout(password,userName);
				getUserInfoList();
				projectpower();
				findPower();
				$('#SetUser-btn-modal').modal('hide');
				$("#userName1").val('');
				$("#password1").val('');
				$("#realName1").val('');
				$('#roleSelecte1').val('');
				$('#deptSelecte1').val('');
				$('#teamSelecte1').val();
				$('#limitSelect1').val();
				$("#phone1").val('');
				$("#email1").val('');
				$("#spaceSize1").val('');
			}else if(result.status==0){
				modal("操作提示!","修改用户信息失败!");
			}else if(result.status==2){
				modal("操作提示!","磁盘空间不足，不能为用户扩容!");
			}
		}
	});
}

function updataLogout(password,userName){
	var pass=$("#toName").attr("pass");
	var username=$("#toName").html();
	if(password!=""&&userName==username){
			$.ajax({
				url : "user/updateUserLogOut",
				type : "post",
				dataType : "json",
				data : {
					"password":password,
					"pass":pass//原转移后的密码
				},
				success :function(result){
				}
			});
		}
}

//删除用户
function deleteUserById(){
	var checkboxs = $("#User-table").find("input:checked");
	if(checkboxs.length < 1){
		modal("操作提示!","请至少选择一项!");
		return;
	}
	if(!confirm("确定要删除你选择的用户吗?")){
		return;
	}
	var ids = new Array();
	for(var i = 0;i<checkboxs.length;i++){
		if(checkboxs.eq(i).attr("id")=="62"){
			modal("操作提示!","不能删除默认管理员!");
			return;
		}
		else{
			ids.push(checkboxs.eq(i).attr("id"));
		}
	}
	$.ajax({
		url : "user/delteById",
		type : "post",
		dataType : "json",
		data : {
			"ids":ids.join(","),
		},
		success :function(result){
			if(result.status==1){
				modal("操作提示!","删除用户信息成功!");
				getUserInfoList();
			}else{
				modal("操作提示!","删除用户信息失败!");
			}
		}
	});
}
//是否重复添加
function isExist() {
	var exist=0;
			$.ajax({
				type : "get",
				url : "adScope/isExist",
				dataType : "json",
				data:{
					dcipfqdn : $('#adIP').val(),
					netbois : $('#adBios').val(),
					fqdndns : $('#adDns').val(),
					port : $('#adProt').val(),
					username : $("#adUser").val().replace(/\\/g,"="),
					password : $("#adPssword").val()
				},
				async : false,
				dataType : "json",
				success : function(data) {
					exist = data;
				}
			});
			return exist;
	}
$('#yuUser-btn-modal').off('hidden.bs.modal');
$('#yuUser-btn-modal').on('hidden.bs.modal', function () {
	$('#adIP').val('');
	$('#adBios').val('');
	$('#adDns').val('');
	$('#adProt').val('');
	$('#adUser').val('');
	$('#adPssword').val('');
});
//添加域用户
function AddYuUser(){
    $("#yuUser-btn-modal").modal('toggle');
}

//添加信息
var exist=0;
function addScopeInfo() {
	var adProt=$('#adProt').val();
	var portReg=  /^[1-9]\d*$/;
	if(adProt!=""||adProt.length!=0){
		if(!adProt.match(portReg)){
			modal("操作提示!","端口号格式不对");
			return;
		}
	}
		if($('#adIP').val()=="" ||$('#adIP').val().length==0){
			modal("操作提示!","IP不能为空,请输入!");
			return;
		}else if($('#adDns').val()==""||$('#adDns').val().length==0){
			modal("操作提示!","域FQDN(DNS)不能为空,请输入!");
			return;
		}else if($('#adBios').val()==""||$('#adBios').val().length==0){
			modal("操作提示!","域的NetBIOS不能为空,请输入");
			return;
		}else if($("#adUser").val()==""||$('#adUser').val().length==0) {
			modal("操作提示!","用户名不能为空,请输入!");
			return;
		}else if($("#adPssword").val()==""||$('#adPssword').val().length==0){
			modal("操作提示!","密码不能为空,请求输入!");
			return;
		}else{
			exist=isExist();
			if(exist !=0) {
				modal("操作提示!","请勿重复添加");
				 $("#yuUser-btn-modal").modal('hide');
				return;
			}
			$('.disBtnIcon').removeAttr('data-dismiss');
            $(".disBtn").attr("disabled","disabled");
			$.ajax({
				type : "POST",
				url : "adScope/addScopeAndUpdateOrUpdateInfo",
				contentType: "application/x-www-form-urlencoded; charset=utf-8", 
				data:{
					dcipfqdn : $('#adIP').val(),
					netbois : $('#adBios').val(),
					fqdndns : $('#adDns').val(),
					port : $('#adProt').val(),
					username : $("#adUser").val().replace(/\\/g,"="),
					password : $("#adPssword").val()
				},
				dataType : "json",
				success : function(data) {
					if(data.status > 0){
						modal("操作提示!","添加成功!");
						$("#yuUser-btn-modal").modal('hide');
						getUserInfoList();
					}else if(data.status==-1){
						modal("操作提示!","剩余空间不足!");
					}else if(data.status==0){
						modal("操作提示!","没有检出用户信息,请核查配置!");
					}
					$('#adIP').val('');
					$('#adBios').val('');
					$('#adDns').val('');
					$('#adProt').val('');
					$('#adUser').val('');
					$('#adPssword').val('');
                    $('.disBtnIcon').attr('data-dismiss','modal');
                    $(".disBtn").removeAttr("disabled");
				}
			});
		}
}
function scopeList(){
    $("#yuList-btn-modal").modal('toggle');
    var yuList = null;
    var url="adScope/findAll";
    if(yuList){
    	yuList.ajax.url(url).load();
    }else{
        $("#yuList-btn-modal").off('shown.bs.modal');
        $("#yuList-btn-modal").on('shown.bs.modal', function (){
            yuList = $('#YuList-table').DataTable({
                "scrollY": '640px',
                "scrollCollapse": true,
                "paging": false,
                "searching": true,
                "info": false,
                "order": [[1, "desc"]],
                "destroy":true,
                "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
	            "ajax":{
		        	"url" : url,
		        	"type" : "get",
		        	"dataType" : "json",
		        	"dataSrc" :function(result){
		        		var data = result.data;
		        		if(result.status == 0) {
		        			data = [];
						} else {
							for(var i =0;i<data.length;i++){
								data[i][0]='<input type="checkbox" name="scopeInput" value="'+data[i].adid+'"/>';
								data[i][1]= data[i].dcipfqdn;
								data[i][2]= data[i].netbois;
			        			data[i][3]= data[i].fqdndns;
			        			data[i][4]= data[i].port;
								data[i][5]= data[i].username;
								if(data[i].password!=""){
									data[i][6]= "***";
								}
							}
						}
						return data;
		        	}	
		        }
	        });
		});
    }
}

//通过ad_id获取用户信息
function getUserInfoByID(ad_id) {
	var adScope=null;
		$.ajax({
			type :"get",
			url :"adScope/findByID",
			dataType :"json",
			data : {
				"ad_id" : ad_id
			},
			async : false,
			success : function(result) {
				adScope=result.data;
			}
		});
		return adScope;
}

//更新域用户
function updateScopeUserInfo() {
		var inputs = $("input[name='scopeInput']:checked");
		if(inputs.length != 1) {
			modal("操作提示!","请选择一项或不要选择多项!");
			return;
		}
		var ad_id = inputs.val();
		var adScope=getUserInfoByID(ad_id);
		var ad_id=adScope.adid;
		var dcip_fqdn = adScope.dcipfqdn;
		var netbois=adScope.netbois;
		var fqdn_dns=adScope.fqdndns;
		var port = adScope.port;
		var username=adScope.username;
		var password=adScope.password;
		$.ajax({
			type : "POST",
			url : "adScope/addScopeAndUpdateOrUpdateInfo",
			contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			data:{
				adid : ad_id,
				dcipfqdn : dcip_fqdn,
				netbois : netbois,
				fqdndns : fqdn_dns,
				port : port,
				username : username,
				password : password
			},
			dataType : "json",
			success : function(data) {
				if(data.status > 0){
					modal("操作提示!","更新成功!");
					getUserInfoList();
				}else{
					modal("操作提示!","没有检出用户信息,请核查配置!");
				}
			}
		});
}
//删除域信息
function deleteScopeInfo() {
		var inputs = $("input[name='scopeInput']:checked");
		if(inputs.length == 0) {
			modal("操作提示!","请至少选择一项!");
			return;
		}
		if(!confirm("确定要删除吗?")){
			return;
		}
		var ad_id = [];
		for (var i = 0; i < inputs.length; i++) {
			ad_id.push(inputs.eq(i).val());
		}
		$.ajax({
			type :"get",
			url :"adScope/deleteScopeInfo",
			dataType :"json",
			data : {
				"adid" : ad_id.join(",")
			},
			success : function(data) {
				if(data.status > 0) {
					modal("操作提示!","删除成功!");
					scopeList();
					getUserInfoList();
				} else {
					modal("操作提示!","删除失败!");
				}
			}
		});
}