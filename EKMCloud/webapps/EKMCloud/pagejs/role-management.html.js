$(function(){
	getRoleList();//获取角色列表
});

//获取角色列表
function getRoleList(){
	var roleTable=null;
	var url ="role/findrole";
	if(roleTable){
		roleTable.ajax.url(url).load();
	}else{
		roleTable = $('#role-table').DataTable({
		    "scrollY":'791px',
		    "scrollCollapse": true,

		    "paging": false,
		    "searching": true,
		    "info": false,
		    // "order": [[ 1, "desc" ]],
            "ordering": false,
		    "dom": 'T<"clear">lfrtip',
		    "aoColumnDefs":[ { "bSortable": false, "aTargets": [0]}],
		    "destroy" : true,
		    tableTools: {
		        "sSwfPath": "swf/copy_csv_xls_pdf.swf",
		        "aButtons": ["copy", "csv"]
		    },
		    "ajax":{
				"url":url,
				"type":"post",
				"dataType":"json",
			    "dataSrc":function(result){
					var list=result.data;
					if(result.status == 0) {
						list = [];
					} else {
						for (var i = 0; i < list.length; i++) {
							if(list[i].roleId==1000||list[i].roleId==1001||list[i].roleId==1005||list[i].roleId==1002||list[i].roleId==1003||list[i].roleId==1004){
								list[i][0]='<input type="checkbox" name="roleid" value="'+list[i].roleId+'" disabled>';
								list[i][3]='-';
							}else{
								list[i][0]='<input type="checkbox" name="roleid" value="'+list[i].roleId+'">';
								list[i][3]=list[i].createTime;
							}
							list[i][1]=list[i].roleName;
							list[i][2]=list[i].powerid;
						} 
					}
					return list;
	         	}
			}
		});
	}
}

/*添加角色*/
function addRole(){
	$("#addRole_modal").modal('toggle');
	getpowList();
}
$('#addRole_modal').off('hidden.bs.modal');
$('#addRole_modal').on('hidden.bs.modal',function(){
	$("input[name='roleName']").val('');
	$('#noss').html('');
	$(".emptyTips").css("display","none");
    $(".beTips").css("display","none");
    $(".specialTips").css("display","none");
	$('#noss p').remove();
});

/*拿到权限列表*/
function getpowList(){
		    $.ajax({		
				url:"role/find",
				type:"post",
				dataType:"json",
			    success:function(result){
			    	var html="";
			    	$("#pow").html(html);
					var list=result.data;						
					for (var i = 0; i < list.length; i++) {
						html+='<p><input type="checkbox" onchange="roleChange(this);" value="'+list[i].powerid+'" name="powerid"/><span>'+list[i].powername+'</span><span class="modales"></span></p>';
					} 					
					$("#pow").html(html);
	         	}
			});
	}

//角色名称已存在
function repeatRoleName(e,type){
	var res=0;
	var roleId=0;
	var roleName = $(e).val().trim();
    var reg =  /^[\u4E00-\u9FA5A-Za-z]+$/;
    if(roleName.length==0){
        $("#roleName").focus();
        $(e).parent().next().show();
    }else{
        $(e).parent().next().hide();
    }
    if(!reg.test(roleName)&&roleName.length!=0){
        $(e).parent().next().next().next().show();
	}else{
        $(e).parent().next().next().next().hide();
	}
    if(type=="2"){
		roleId=$("#role-table input[type=checkbox]:checked").val();	
	}
	$.ajax({
		url : "role/findByRoleName",
		type : "post",
		dataType : "json",
		data :{
			"roleName": roleName,
			"roleId":roleId
		},
		async:false,
		success : function(result){
			res=result.status;
			if(result.status==1){
                $(e).parent().next().next().show();
                $("#roleName").focus();
			 }else{
                $(e).parent().next().next().hide();
			 }
			}
		});
	return res;
}

/*添加角色权限方法*/
function addp(){	
	 var ids=$("#noss").find("input");
	 var powerid = new Array();
	 var rolename=$("#rolename input").val().trim();
	 var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
	 if(rolename==""){
		 modal("会话提示","角色名称不能为空!");
		 return;
	 }
    if(!reg.test(rolename)) {
        modal("会话提示框","角色名称 只能包含1至50位汉字,英文");
        return;
    }
	 for(var i=0;i<ids.length;i++){
		 powerid.push(ids.eq(i).attr("value"));
	 }
	 $('.disBtnIcon').removeAttr('data-dismiss');
	 $(".disBtn").attr("disabled","disabled");
	$.ajax({
		url:"role/saverole",
		type:"post",
		dataType:"json",
		data:{
			"powerid":powerid.join(","),
			"roleName":rolename
			},
		success:function(result){		
			if(result.status==1){
				modal("会话提示","添加角色成功!");
				$("#noss").html("");
				$("#rolename input").val("");
				getRoleList();
				$("#addRole_modal").modal('toggle');
			}else if(result.status==0){				
				modal("会话提示","添加失败!");
			}else if(result.status==-1){				
				modal("会话提示","角色名称已存在!");
			}
			$('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
		}
	});
}

/*设置角色*/
function setRole(){
	var roleId = $("input[name='roleid']:checked");
	if(roleId.length!=1) {
		modal("警告提示","请选择一项或不要选择多项");
		return;
	}
     setRoleByid();
     setNoRoleByid();
    $("#setRole_modal").modal('toggle');
}
function setRoleByid(){		
	var roleId=$("#role-table input[type=checkbox]:checked").val();	
	  $.ajax({
		  url:"role/updateRolelist",
		  dataType:"json",
		  type:"post",
		  data:{
			  "roleId":roleId			  
		        },
		  success:function(result){
			  var strs=new Array();
			  var poweridhtml="";
			  $("#pole").html(poweridhtml);
			 var role=result.data;
			 $("#divrole").val(role.roleName);
			 var powid=role.powerid;
			 if(powid!=""){
				 strs=powid.split("/");	
				 for (var i = 0; i < strs.length; i++) {
					 poweridhtml+='<p><input type="checkbox" name="powerid" value="'+role.power[i].powerid+'"/><span>'+strs[i] +'</span><span class="modales"></span></p>';
				 }
			 }else{
				 poweridhtml=''; 
			 }
				$("#pole").html(poweridhtml);
		  }
	  });
}
function setNoRoleByid(){	
	var roleId=$("#role-table input[type=checkbox]:checked").val();
	  $.ajax({
		  url:"role/updateRole",
		  dataType:"json",
		  type:"post",
		  data:{
			  "roleId":roleId			  
		  },
		  success:function(result){
			  var html="";			
			  $("#nopole").html("");
			  var powerli= result.data;	
			  if(powerli.length>0){
				  for (var i = 0; i < powerli.length; i++) {
						 html+='<p><input type="checkbox" name="powerid" onchange="roleChange(this);"  value="'+powerli[i].powerid+'"/><span>'+powerli[i].powername+'</span><span class="modales"></span></p>';
					}
					$("#nopole").html(html);
			  }
		  }
	  });
}
/**
 * 修改角色
 * 
 * */
function updataRole(){
	var roleId=$("#role-table input[type=checkbox]:checked").val();
	 var ids=$("#pole").find("input");
	 var powerid = new Array();
	 var roleName=$("#divrole").val().trim();
	 var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
     if(roleName==""){
        modal("会话提示","角色名称不能为空!");
        return;
     }
     if(!reg.test(roleName)) {
        modal("会话提示框","角色名称 只能包含1至50位汉字,英文");
        return;
     }
	 for(var i=0;i<ids.length;i++){
		 powerid.push(ids.eq(i).attr("value"));
	 }
	$.ajax({
		url:"role/updateroles",
		type:"post",
		dataType:"json",
		data:{
			"roleId":roleId,
			"powerid":powerid.join(","),
			"roleName":roleName
		},
		success:function(result){		
			if(result.status==1){
				modal("会话提示","设置角色成功!");	
				getRoleList();
				$("#setRole_modal").modal('toggle');
			}else if(result.status==-1){
				modal("会话提示","角色名称已存在!");	
			}
		}
	});
}
$("#setRole_modal").off('hidden.bs.modal');
$("#setRole_modal").on('hidden.bs.modal',function(){
    $(".emptyTips").hide();
    $(".beTips").hide();
    $(".specialTips").hide();
	$('#divrole').val('');
});
$('#setRole_modal').off('shown.bs.modal');
$('#setRole_modal').on('shown.bs.modal',function(){
	roleselect();
});
function roleselect(){
	var roles=$('.rightBox').find('input');
	if(roles.size()>0){
	for(var i=0;i<roles.size();i++){
            if(roles.eq(i).val()=='12'||roles.eq(i).val()=='17'||roles.eq(i).val()=='18'){
                $('.leftBox input[value="11"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="13"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="14"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="15"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="16"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="19"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="20"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="21"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="22"]').next().css('color','rgba(0,0,0,.2)').next().show();
            }else if(roles.eq(i).val()=='11'||roles.eq(i).val()=='13'||roles.eq(i).val()=='14'||roles.eq(i).val()=='15'||roles.eq(i).val()=='16'||roles.eq(i).val()=='19'||roles.eq(i).val()=='20'||roles.eq(i).val()=='21'||roles.eq(i).val()=='22'){
                $('.leftBox input[value="12"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="17"]').next().css('color','rgba(0,0,0,.2)').next().show();
                $('.leftBox input[value="18"]').next().css('color','rgba(0,0,0,.2)').next().show();
            }
		}
	}
}

function roleChange(e){
	var roleId11=String($(e).parents(".transTab").find('input[value="11"]').prop("checked"));
	var roleId12=String($(e).parents(".transTab").find('input[value="12"]').prop("checked"));
	var roleId13=String($(e).parents(".transTab").find('input[value="13"]').prop("checked"));
	var roleId14=String($(e).parents(".transTab").find('input[value="14"]').prop("checked"));
	var roleId15=String($(e).parents(".transTab").find('input[value="15"]').prop("checked"));
	var roleId16=String($(e).parents(".transTab").find('input[value="16"]').prop("checked"));
	var roleId17=String($(e).parents(".transTab").find('input[value="17"]').prop("checked"));
	var roleId18=String($(e).parents(".transTab").find('input[value="18"]').prop("checked"));
	var roleId19=String($(e).parents(".transTab").find('input[value="19"]').prop("checked"));
	var roleId20=String($(e).parents(".transTab").find('input[value="20"]').prop("checked"));
	var roleId21=String($(e).parents(".transTab").find('input[value="21"]').prop("checked"));
	var roleId22=String($(e).parents(".transTab").find('input[value="22"]').prop("checked"));
	if(roleId11=='true'|| roleId13=='true' || roleId14=='true' || roleId15=='true' || roleId16=='true' || roleId19=='true'||roleId20=='true' || roleId21=='true' || roleId22=='true'){
		$(e).parents(".transTab").find('input[value="12"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="17"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="18"]').next().css('color','rgba(0,0,0,.2)').next().show();
	}else{
		if($(e).parents(".transTab").find('.rightBox p').size()<1){
			$(e).parents(".transTab").find('input[value="12"]').next().css('color','rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="17"]').next().css('color','rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="18"]').next().css('color','rgb(85,85,85)').next().hide();
		}
	}
	if(roleId12=='true'||roleId17=='true'||roleId18=='true'){
		$(e).parents(".transTab").find('input[value="11"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="13"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="14"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="15"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="16"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="19"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="20"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="21"]').next().css('color','rgba(0,0,0,.2)').next().show();
		$(e).parents(".transTab").find('input[value="22"]').next().css('color','rgba(0,0,0,.2)').next().show();
	}else{
		if($(e).parents(".transTab").find('.rightBox p').size()<1) {
			$(e).parents(".transTab").find('input[value="11"]').next().css('color', 'rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="13"]').next().css('color', 'rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="14"]').next().css('color', 'rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="15"]').next().css('color', 'rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="16"]').next().css('color', 'rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="19"]').next().css('color', 'rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="20"]').next().css('color', 'rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="21"]').next().css('color', 'rgb(85,85,85)').next().hide();
			$(e).parents(".transTab").find('input[value="22"]').next().css('color', 'rgb(85,85,85)').next().hide();
		}
	}
}	

/*角色转换*/
$(".transIcon").click(function(){
    $('.leftRole input[type="checkbox"]').each(function(){
        if($(this).prop("checked")==true){
            $(this).parent().remove();
            var thisVal=$(this).next().html();
            var thisVa=$(this).val();
            $("<p><input type='checkbox' name='powerid' value='"+thisVa+"'/><span>"+thisVal +"</span><span class='modales'></span></p>").appendTo(".rightBox");
        }
    });
    $('.rightRole input[type="checkbox"]').each(function(){
        if($(this).prop("checked")==true){
            $(this).parent().remove();
            var thisVal=$(this).next().html();
            var thisVa=$(this).val();
            $("<p><input type='checkbox' name='powerid' onchange='roleChange(this);' value='"+thisVa+"'/><span>"+thisVal +"</span><span class='modales'></span></p>").appendTo(".leftBox");
        }
    });
	var tabroles=$(this).next().find('input');
	console.log(tabroles);
	if(tabroles.size()<1){
		$(".transTab .modales").hide();
		$(".transTab .modales").prev().css('color','rgb(85,85,85)');
	}
});

function deleteRoles(){
	var roleIds = $("#role-table").find("input:checked");
	if(roleIds.length<1){
		modal("操作提示!","请选择一项或多项操作!");
		return;
	}
	if(!confirm("确定要删除你选择的用户吗?")){
		return;
	}
	var roleId = new Array();
	for(var i = 0;i<roleIds.length;i++){
		roleId.push(roleIds.eq(i).attr("value"));
	}
			$.ajax({
				url:"role/deleteRole",
				dataType:"json",
				type:"post",
				data:{
					"roleId":roleId.join(","),	  
				},
				success:function(result){
					if(result.status==1){
						modal("会话提示","删除角色成功");
						getRoleList();
					}else {
						modal("会话提示","删除失败");
					}
				}
			});
		 }