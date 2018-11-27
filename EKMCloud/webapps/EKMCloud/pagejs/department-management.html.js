/**
 * Created by llwang on 2017/5/17.
 */
$(function(){
	getDepartmentList();//获取部门列表
});
//获取部门列表
var departmentTable=null;
function getDepartmentList(){
	var url ="dept/findAll";
	if(departmentTable){
		departmentTable.ajax.url(url).load();
	}else{
		departmentTable =$('#department-table').DataTable({
            				"scrollY":'791px',
						    "scrollCollapse": true,
						    "paging": false,
						    "searching": true,
						    "info": false,
							"order": [[ 1, "asc" ]],
							"order": [],
							"aoColumnDefs":[ { "bSortable": false, "aTargets": [0]}],
						    "destroy" : true,
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
											list[i][0]='<input type="checkbox" name="deptId" value="'+list[i].deptId+'">';
											list[i][1]=list[i].deptNum;
											list[i][2]=list[i].deptName;
											list[i][3]=list[i].deptManager;
											list[i][4]=list[i].deptTel;
											list[i][5]=list[i].createTime;
											list[i][6]=list[i].updateTime;
											list[i][7]=list[i].remark;
										} 
									}
									return list;
						         }
			            	}
        });
	}
}
/*刷新部门*/
function flushDepartment(){
	getDepartmentList();
}
/*添加部门模态框*/
function addDepartment(){
	 findDeptUsers();
    $('#AddDepartment_modal').modal('show');
};

/*查询部门员工列表*/
function findDeptUsers(){
	$.ajax({
		url:"user/findAll",
		type:"post",
		dataType:"json",		
	    success:function(result){
	    	var html="";
	    	$("#selectdept").html(html);
	    	$("#selectuser").html(html);
	    	var list=result.data;
	    	html+='<option value="0" >---请选择---</option>';
	    	for (var i = 0; i < list.length; i++) {
	    		html+='<option  value="'+list[i].userName+'">'+list[i].userName+'</option>';
	    	}
	    	$("#selectdept").html(html);
	    	$("#selectuser").html(html);
	    }
	});
}

//部门编号验证
function repeatdeptNum(e,type){
	var deptId=0;
	var deptTel="";
	var deptNum = $(e).val().trim();
    var deptNumReg = /^[\u4e00-\u9fa5]+$/;//部门编号正则
	if(deptNum.length==0){
		$('#deptNum').focus();
		$(e).parent().next().show();
	}else{
		$(e).parent().next().hide();
	}
	if(!deptNumReg.test(deptNum)){
        $(e).parent().next().next().next().show();
	}else{
        $(e).parent().next().next().next().hide();
	}
	if(type=="2"){
		deptId=$("#department-table input[type=checkbox]:checked").val();
	}
	$.ajax({
		url : "dept/findDeptBy",
		type : "post",
		dataType : "json",
		data :{
			"deptNum":deptNum,
			"deptId":deptId,
			"deptTel":deptTel
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
//部门名称验证
function repeatdeptName(e,types){
	var deptId=0;
	var deptTel="s";
	var deptName = $(e).val().trim();
    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
	if(deptName.length==0){
		$('#deptName').focus();
        $(e).parent().next().show();
		// modal("操作提示!","部门名称不能为空!");
	}else{
        $(e).parent().next().hide();
	}
    if(!reg.test(deptName)&&deptName.length!=0){
        $(e).parent().next().next().next().show();
    }else{
        $(e).parent().next().next().next().hide();
    }
    if(types=="2"){
		deptId=$("#department-table input[type=checkbox]:checked").val();
	}
   
	$.ajax({
		url : "dept/findDeptBy",
		type : "post",
		dataType : "json",
		data :{
			"deptName":deptName,
			"deptId":deptId,
			"deptTel":deptTel
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
/*添加部门*/
function addDept(){
	var deptNum=$("#deptNum").val().trim();
	var deptName=$("#deptName").val().trim();
	var deptManagernum= $("#selectdept option:selected").attr("value");
	var deptManager="";
	if(deptManagernum!=0){
		deptManager=$("#selectdept option:selected").html();
	}else{
		deptManager="";
	}
	var deptTel=$("#deptTel").val();
    var remark=$("#remark").val();
	var deptNumReg = /^[\u4e00-\u9fa5]+$/;;//部门编号正则
    var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
	if(deptNum==""){
		modal("警告提示!","请输入部门ID!");
		return;
	}else if(deptNum.length>30){
		modal("警告提示!","部门ID不能多于30位!");
		return;
	}else if(deptNum.match(deptNumReg)){
		modal("警告提示!","部门ID不能输入中文!");
		return;
	}
	if(deptName==""){
		modal("警告提示!","请输入部门名称!");
		return;
	}
	if(!reg.test(deptName)){
        modal("警告提示!","部门名称只能1至50位中英文组成!");
        return;
	}
//	if(deptManager==""){
//		modal("警告提示!","请选择部门主管!");
//		return;
//	}
	if(remark.len()>60||remark.length>60){
		if( remark.len()!=remark.length){
			modal("会话提示","输入汉字长度不能超过30!");
			return;
		}else{
			modal("会话提示","输入字母或数字长度不能超过60!");
			return;
		}
	}
	$('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	$.ajax({
		url:"dept/ifcreate",
		type:"post",
		dataType:"json",
		data:{
			"deptManager":deptManager
			},
	    success:function(result){
	    	if(result.status==1){
	    		if(!confirm("此用户已为主管，还要设置吗？")){
	    			return;
	    		}
	    	}
	    	$.ajax({
	    		url:"dept/createDept",
	    		type:"post",
	    		dataType:"json",
	    		data:{
	    			"deptNum":deptNum,
	    			"deptName":deptName,
	    			"deptManager":deptManager,
	    			"deptTel":deptTel,
	    			"remark":remark
	    			},
	    	    success:function(result){
	    	    	if(result.status==1){
	    				modal("会话提示","添加部门成功!");
	    				getSelfMess();
	    				 getDepartmentList();
	    				 $("#deptNum").val('');
	    				 $("#deptName").val('');
	    				 $("#deptTel").val('');
	    				 $("#remark").val('');
	    				 $('#AddDepartment_modal').modal('toggle');
	    			}else {				
	    				modal("会话提示","添加失败!");
	    			}
	    	    	$('.disBtnIcon').attr('data-dismiss','modal');
	                $(".disBtn").removeAttr("disabled");
	    	    }
	    	});
	    }
	});
}
$('#AddDepartment_modal').off('hidden.bs.modal');
$('#AddDepartment_modal').on('hidden.bs.modal', function () {
	$(".emptyTips").hide();
	$(".beTips").hide();
    $("#deptNum").val('');
    $("#deptName").val('');
    $("#deptTel").val('');
    $("#remark").val('');
    $(".specialTips").hide();
});
/*设置部门模态框*/
function setDepartment(){
    var deptID=$("input[name='deptId']:checked");
	if(deptID.length!=1) {
		modal("警告提示","请选择一项或不要选择多项");
		return;
	}
	findDeptUsers();
    $('#SetDepartment_modal').modal('toggle');
    $('#SetDepartment_modal').off('shown.bs.modal');
    $('#SetDepartment_modal').on('shown.bs.modal', function () {
        findDepartmentById();
    });

}
$("#SetDepartment_modal").off('hidden.bs.modal');
$("#SetDepartment_modal").on('hidden.bs.modal',function(){
    $(".emptyTips").hide();
    $(".beTips").hide();
    $(".specialTips").hide();
});

/*查询部门信息*/
function findDepartmentById(){
	var deptId=$("#department-table input[type=checkbox]:checked").val();
		$.ajax({
			url:"dept/findDeptByid",
			type:"post",
			dataType:"json",
			data:{
				"deptId":deptId
				},
		    success:function(result){
		    	var dept=result.data;
		    	$("#num").val(dept.deptNum);
		    	$("#name").val(dept.deptName);
		    	if(dept.deptManager==null){
		    		deptManager="";
		    	}else{
		    		deptManager=dept.deptManager;
		    	}
		         $("#selectuser option").each(function(){  //遍历所有option  
		              var txt = $(this).val();   //获取option值   
		              if(txt==deptManager){  
		            	  $(this).attr("selected","selected");    //添加到数组中  
		              }  
		         });  
		    	$("#tel").val(dept.deptTel);
		    	$("#res").val(dept.remark);
		    }
		});
}

/*修改部门信息*/
function updateSetDept(){
	var deptId=$("#department-table input[type=checkbox]:checked").val();
	var deptNum=$("#num").val().trim();
		var deptName=$("#name").val().trim();
		var deptManager=$("#selectuser option:selected").val();
		var deptTel=$("#tel").val();
		var remark=$("#res").val();
    	var deptNumReg = /^[\u4e00-\u9fa5]+$/;;//部门编号正则
    	var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
		if(deptNum.length==0){
			modal("警告提示!","请输入部门ID!");
			return;
		}else if(deptNum.length>30){
			modal("警告提示!","部门ID不能多于30位!");
			return;
		}else if(deptNum.match(deptNumReg)){
			modal("警告提示!","部门ID不能输入中文!");
			return;
		}
		if(deptName.length==0){
			modal("操作提示!","部门名称不能为空!");
			return;
		}
		if(!reg.test(deptName)){
			modal("警告提示!","部门名称只能1至50位中英文组成!");
			return;
    	}

		if(remark.len()>60||remark.length>60){
			if( remark.len()!=remark.length){
				modal("会话提示","输入汉字长度不能超过30!");
				return;
			}else{
				modal("会话提示","输入字母或数字长度不能超过60!");
				return;
			}
		}
	//		if(deptManager==0){
//			modal("操作提示!","请选择部门负责人!");
//			return;
//		}
		// if(deptTel.length!=0&&!deptTel.match(deptTelReg)){
		// 	modal("警告提示!","手机号或座机号不正确请重新输入!");
		// 	return;
		// }
		$.ajax({
			url:"dept/upifcreate",
			type:"post",
			dataType:"json",
			data:{
				"deptId":deptId,
				"deptManager":deptManager
				},
		    success:function(result){
		    	if(result.status==1){
		    		if(!confirm("此用户已为主管，还要设置吗？")){
		    			return;
		    		}
		    	}
		    	$.ajax({
					url:"dept/updateDeptInfo",
					type:"post",
					dataType:"json",
					data:{
						"deptId":deptId,
						"deptNum":deptNum,
						"deptName":deptName,
						"deptManager":deptManager,
						"deptTel":deptTel,
						"remark":remark
						},
				    success:function(result){
				    	if(result.status==1){
							modal("会话提示","设置部门成功!");
							getSelfMess();
							getDepartmentList();
							$('#SetDepartment_modal').modal('hide');
						}else if(result.status==0){				
							modal("会话提示","设置失败!");
						}else if(result.status==-1){				
							modal("会话提示","部门编号已存在!");
						}else if(result.status==-2){				
							modal("会话提示","部门名称已存在!");
						}
				    }
				});	
		    }
		});
}
/* 删除部门 */ 
function delDepartment(){
	var deptID=$("input[name='deptId']:checked");
	if(deptID.length < 1){
		modal("操作提示!","请至少选择一项!");
		return;
	}
	if(!confirm("确定要删除你选择的部门吗?")){
		return;
	}
	var deptIDs = [];
    if(deptID.length < 1) {
        modal("会话提示","请至少选择一项");
        return;
    }
	for (var i = 0; i < deptID.length; i++) {
		deptIDs.push(deptID.eq(i).attr("value"));
	}
	$.ajax({
		url:"dept/deleteDept",
		type:"post",
		dataType:"json",
		data:{
			"deptID":deptIDs.join(",")
			},
	    success:function(result){
	    	if(result.status==1){
				modal("会话提示","删除部门成功!");
				getDepartmentList();
			}else {				
				modal("会话提示","删除失败!");
			}
	    }
	});	
}

/*成员管理*/
function memberManagement(){
	var deptIds=$("#department-table input[name='deptId']:checked");
	if(deptIds.length!=1) {
		modal("警告提示","请选择一项或不要选择多项");
		return;
	}
	var deptName = deptIds.parent().parent().find("td").eq(2).text();
	$("#deptspan").html(deptName+"--部门成员管理");
	
    $('#memberManagement_modal').modal('toggle');
    /*成员管理*/
    var memberManagement=null;
    var deptID=$("#department-table input[type=checkbox]:checked").val();
    var url ="dept/findUsersInDept";
    if(memberManagement){
    	memberManagement.ajax.url(url).load();
    }else {
        $("#memberManagement_modal").off('shown.bs.modal');
        $("#memberManagement_modal").on('shown.bs.modal', function () {
            memberManagement = $('#Management-table').DataTable({
                "scrollY": '350px',
                "scrollCollapse": true,
                "paging": false,
                "searching": true,
                "info": false,
                "order": [[1, "desc"]],
                "destroy":true,
                "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
                "ajax":{
					"url":url,
					"type":"post",
					"dataType":"json",
					"data" : {
						deptID : deptID
        			},
				    "dataSrc":function(result){
				    	var list=result.data;
				    	if(result.status == 0) {
							list = [];
						} else {
							for (var i = 0; i < list.length; i++) {
								list[i][0]='<input type="checkbox" name="userId" value="'+list[i].userId+'">';
								list[i][1]=list[i].userName;
								var teamList=list[i].team;
								list[i][2]="";
			        			if(teamList==null){
			        				list[i][2]="";	
			        			}
			        			if(teamList!=null){
			        				for (var j = 0; j < teamList.length; j++) {
		        						if(j!=teamList.length-1){
		        							list[i][2]+=teamList[j].teamName+",";//团队
		        						}else{
		        							list[i][2]+=teamList[j].teamName;//团队
		        						}
			        				}
			        			}
								list[i][3]=list[i].email;
								list[i][4]=list[i].telephone;
							} 
						}
						return list;
				     }
			      }
            });
        });
    }

}
/*添加成员*/
function addMember(){
    $("#addMember_modal").modal('toggle');
    var deptID=$("#department-table input[type=checkbox]:checked").val();
    /*添加成员*/
    var addMember=null;
    var url ="dept/findUsersNotInDept";
    if(addMember){
    	addMember.ajax.url(url).load();
    }else{
        $("#addMember_modal").off('shown.bs.modal');
        $("#addMember_modal").on('shown.bs.modal',function() {
            addMember=$('#member-table').DataTable({
                "scrollY":'277px',
                "scrollCollapse": true,
                "paging": false,
                "searching": true,
                "info": false,
                "order": [[ 1, "desc" ]],
                // "dom": 'T<"clear">lfrtip',
                "destroy":true,
                "aoColumnDefs":[{ "bSortable": false, "aTargets": [0]}],
                "ajax":{
					"url":url,
					"type":"post",
					"dataType":"json",
					"data" : {
						deptID : deptID
        			},
				    "dataSrc":function(result){
				    	var list=result.data;
				    	if(result.status == 0) {
							list = [];
						} else {
							for (var i = 0; i < list.length; i++) {
								list[i][0]='<input type="checkbox" name="userId" value="'+list[i].userId+'">';
								list[i][1]=list[i].userName;
								var teamList=list[i].team;
								list[i][2]="";
			        			if(teamList==null){
			        				list[i][2]="";	
			        			}
			        			if(teamList!=null){
			        				for (var j = 0; j < teamList.length; j++) {
		        						if(j!=teamList.length-1){
		        							list[i][2]+=teamList[j].teamName+",";//团队
		        						}else{
		        							list[i][2]+=teamList[j].teamName;//团队
		        						}
			        				}
			        			}
								list[i][3]=list[i].department ==null?"":list[i].department.deptName;
								list[i][4]=list[i].email;
								list[i][5]=list[i].telephone;
							} 
						}
						return list;
				     }
			      }
                
            });
        });
    }
}
/*给部门添加成员*/
function addUserInDept(){
	 var deptID=$("#department-table input[type=checkbox]:checked").val();
	 var userIDs=$("input[name='userId']:checked");
	 if(userIDs.length<1){
		 modal("会话提示","请至少选择一项!");
		 return;
	 }
	 var userID = [];
		for (var i = 0; i < userIDs.length; i++) {
			userID.push(userIDs.eq(i).attr("value"));
		}
		
	    $.ajax({
			url:"dept/addUserIn2Dept",
			type:"post",
			dataType:"json",
			data:{
				"deptID":deptID,
				"userID":userID.join(",")
				},
		    success:function(result){
		    	if(result.status==1){
					modal("会话提示","添加成员成功!");
					 memberManagement();
					 getDepartmentList();
				}else {				
					modal("会话提示","添加成员失败!");
				}
		    }
		});	
}

/*删除部门成员*/
function delUserInDept(){
	 var userIDs=$("#Management-table input[name='userId']:checked");
	 if(userIDs.length < 1){
			modal("操作提示!","请至少选择一项!");
			return;
		}
	 if(!confirm("确定要移除你选择的用户吗?")){
			return;
		}
	 var userID = [];
		for (var i = 0; i < userIDs.length; i++) {
			userID.push(userIDs.eq(i).attr("value"));
		}
	    $.ajax({
			url:"dept/removeUserFromDept",
			type:"post",
			dataType:"json",
			data:{
				"userID":userID.join(",")
				},
		    success:function(result){
		    	if(result.status==1){
					modal("会话提示","移除部门成员成功!");
					memberManagement();
					getDepartmentList();
				}else {				
					modal("会话提示","移除部门成员失败!");
				}
		    }
		});	
}