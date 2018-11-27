/*project-table*/
$(function(){
	getProjectList(1);
	fenPageShow();
});
$("[tnum]").elli(); //超出....
//获取项目列表
function getProjectList(page){
	if (page != 0) {
        $("#page").val(page);
	   }
	//设置每页数
	var pageSize = 25;
	var projectTable=null;
	var url="taskaudit/findProject";
	if(projectTable){
		projectTable.ajax.url(url).load();				
	}else{
		projectTable = $('#project-table').DataTable({
			"scrollY":'640px',
		    "scrollCollapse": true,
		    "paging": false,
		    "searching": true,
		    "info": false,
		    "order": [[ 1, "desc" ]],
		    "dom": 'T<"clear">lfrtip',
		    "aoColumnDefs":[ { "bSortable": false, "aTargets": [0]}],
		     "destroy" : true,
		    "ajax":{
				"url":url,
				"type":"post",
				"dataType":"json",
				"data" : {
					"page" : page,//当前页码
					"pageSize" : pageSize//每页条数
				},
				"dataSrc":function(result){
					var list=result.data;
					if(result.status == 0) {
						list = [];
					}else{
						for (var i = 0; i < list.length; i++) {	
							list[i].applyTime=list[i].applyTime.substring(0, list[i].applyTime.lastIndexOf("."));
							list[i].startTime=list[i].startTime.substring(0, list[i].endTime.lastIndexOf("."));
							list[i].endTime=list[i].endTime.substring(0, list[i].endTime.lastIndexOf("."));
							list[i][0]='<input type="checkbox" name="projectId" title="'+list[i].projectStatus+'" value="'+list[i].projectId+'" dept="'+list[i].users.department.deptManager+'" spStat="'+list[i].supervisorAudit+'">';
							list[i][1]=list[i].projectName;
							list[i][2]=list[i].platformname;
							if(list[i].users==null){
								list[i][3]="";
							}else{
								list[i][3]=list[i].users.userName;
							}
							if(list[i].auditing=="Y"){
							     list[i][4]='<a href="javascript:void(0)" class="status" onclick="whether(id='+list[i].projectId+');">是</a>';
							}else if(list[i].auditing=="N"){
								 list[i][4]="否";						
							}
							list[i][5]=list[i].applyTime;
							list[i][6]=list[i].startTime;
							list[i][7]=list[i].endTime;
							if(list[i].supervisorAudit=="d"&&list[i].endTime>=getTime()){//zhu
								list[i][8]='<span class="OnlineCorlor tagrayzg" value="d">审核中</span>';
							}else if(list[i].supervisorAudit=="d"&&list[i].endTime<getTime()){
								list[i][8]='<span class="tagrayzg" value="o">已过期</span>';
							}else if(list[i].supervisorAudit=="y"){
								list[i][8]='<a href="javascript:void(0)" class="status tagrayzg" value="y" onclick="chargeState(this,id='+list[i].supervisorid+');">已通过</a>';		 							
							}else if(list[i].supervisorAudit=="n"){
								list[i][8]='<a href="javascript:void(0)" class="OffLineCorlor tagrayzg" value="n" onclick="chargeState(this,id='+list[i].supervisorid+');">未通过</a>';
							}
							
							if(list[i].supervisorAudit=="n"){
								list[i][9]='<a href="javascript:void(0)" class="OffLineCorlor tagraygl" value="n" onclick="adminState(id='+list[i].managerid+');">未通过</a>';
							}else{
								if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="d"&&list[i].endTime>=getTime()){
									list[i][9]='<span class="OnlineCorlor tagraygl" value="d">审核中</span>';	
								}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="d"&&list[i].endTime<getTime()){
									list[i][9]='<span class="tagraygl" value="o">已过期</span>';
								}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="y"&&list[i].endTime>=getTime()){
									list[i][9]='<a href="javascript:void(0)" class="status tagraygl" value="y" onclick="adminState(id='+list[i].managerid+');">已通过</a>';	
								}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="y"&&list[i].endTime<getTime()){
									list[i][9]='<a href="javascript:void(0)" class="status tagraygl" value="y" onclick="adminState(id='+list[i].managerid+');">已通过</a>';	
								}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="n"){
									list[i][9]='<a href="javascript:void(0)" class="OffLineCorlor tagraygl" value="n" onclick="adminState(id='+list[i].managerid+');">未通过</a>';
								}else if(list[i].supervisorAudit=="d"&&list[i].managerAudit=="d"&&list[i].endTime>=getTime()){
									list[i][9]='<span class="OnlineCorlor tagraygl" value="d">审核中</span>';
								}else if(list[i].supervisorAudit=="d"&&list[i].managerAudit=="d"&&list[i].endTime<getTime()){
									list[i][9]='<span class="tagraygl" value="o">已过期</span>';
								}
							}
							
							if(list[i].projectStatus=="d"&&list[i].endTime>=getTime()){
								list[i][10]='<span class="OnlineCorlor">进行中</span>';		 
							}else if(list[i].projectStatus=="d"&&list[i].endTime<getTime()){
								list[i][10]='已过期';
								
							}else if(list[i].projectStatus=="y"&&list[i].endTime<getTime()){
								list[i][10]='已完成';		 							
							}else if(list[i].projectStatus=="y"&&list[i].endTime>=getTime()){
								list[i][10]='<span class="OnlineCorlor">进行中</span>';		 							
							}else if(list[i].projectStatus=="n"){
								list[i][10]='<span class="OffLineCorlor">未通过</span>';		 							
							}
							
							list[i][11]='<a href="javascript:void(0)" class="status" onclick="lookGuide(id='+list[i].projectId+');">查看说明</a>';
						}
					}
					var count =pagesTotal();// 总条数
					var html=pagerUtil(pageSize,count,$("#page").val());
					$('#feny').html(html);
					    return list;
				}	
			}	
		});
	}
}
function turnPage(turnPage) {
	getProjectList(turnPage);
}
function pagesTotal() {
	var res=0;
	$.ajax({
		url :  "taskaudit/findCount",
		type : "post",
		dataType : "json",
		async:false,
		success : function(result) {
			res=result.data;
		}
	});
	return res;
}
function fenPageShow(){
    if(pagesTotal()>=25){
        $('.fenPage').show();
    }else{
        $('.fenPage').hide();
    }
}


/*标记审核*/
function mark(){
	var projectId = $("input[name='projectId']:checked");
	if(projectId.length!=1) {
		modal("警告提示","请选择一项或不要选择多项");
		return;
	}
    tabaudit();
}
/*标记审核*/
function tabaudit(){
		$("#audituser").html("");	
		$("#auditStatic").html("");
		$("#auditexplain").val("");	
		$("#audituser1").html("");	
		$("#auditStatic1").html("");
		$("#auditexplain1").val("");
		var projectStatus=$("#project-table input[type=checkbox]:checked").parent().parent().find(".tagrayzg").attr("value");
		if(projectStatus=="d"){
	        $("#auditexplain").removeAttr("readonly");
	        $("#auditexplain").css('background','#fff');
	        $("#auditexplain").css('cursor','auto');
	        $("#pass").show();
	        $("#regect").show();
	        $("#cancel").hide();
	    }else{
	    	$("#auditexplain").attr("readonly","readonly");
	        $("#auditexplain").css('background','#fff');
	        $("#auditexplain").css('cursor','default');
	        $("#pass").hide();
	        $("#regect").hide();
	        $("#cancel").show();
	    }
	var id=$("#project-table input[type=checkbox]:checked").val();
		$.ajax({
			url:"taskaudit/supervisoraudit",
			type:"post",
			dataType:"json",
			data:{
				"projectId":id
				},
				success:function(result){
					var taskaudit=result.data;	
					//12 主管 13 管理员
					var powerid=taskaudit.powerid;
					if(powerid.indexOf("12")>=0){
						if(taskaudit.auditLog==null){
							$("#audituser").html("");
							$("#auditexplain").val("");
						}else{
							if(taskaudit.auditLog.users==null){
								$("#audituser").html("");
							}else{
								$("#audituser").html(taskaudit.auditLog.users.userName);	
							}
							$("#auditexplain").val(taskaudit.auditLog.auditexplain);
						}
							if(taskaudit.supervisorAudit=="d"){
								if(projectStatus=="o"){
									$("#auditStatic").html("已过期");
								}else{
									$("#auditStatic").html("审核中");
								}
							}else if(taskaudit.supervisorAudit=="y"){
								 $("#auditStatic").html("已通过");
							}else if(taskaudit.supervisorAudit=="n"){
								 $("#auditStatic").html("未通过");
							}
							
							
					}else if(powerid.indexOf("13")>=0){
						if(taskaudit.auditLog==null){
							$("#audituser1").html("");
							$("#auditexplain1").val("");		
						}else{
							if(taskaudit.auditLog.users==null){
								$("#audituser1").html("");
							}else{
								$("#audituser1").html(taskaudit.auditLog.users.userName);	
							}
							$("#auditexplain1").val(taskaudit.auditLog.auditexplain);		
						}
							if(taskaudit.managerAudit=="d"){
								 $("#auditStatic1").html("审核中");
							}else if(taskaudit.managerAudit=="y"){
								 $("#auditStatic1").html("已通过");
								 
							}else if(taskaudit.managerAudit=="n"){
								 $("#auditStatic1").html("未通过");
							}
					    }
				     }
		         });
				$('#mark_modal').modal('toggle');
			}
//点击通过
function pass(){
	var id=$("#project-table input[type=checkbox]:checked").val();
	var auditexplain=$("#auditexplain").val();	
	var selfName = $("#toName").html();
	var selfrole = $("#toName").attr("name");
	var deptmage=$("#project-table input[type=checkbox]:checked").attr("dept");
	var spStat = $("#project-table input[type=checkbox]:checked").attr("spStat");
	if(selfName!=deptmage&&selfrole!="1001"){
		modal("警告提示", "没有权限");
		return;
	}else if(selfrole=="1001"&&spStat!="d"){
		modal("警告提示", "请主管先审核");
		return;
	}
	if(auditexplain.length!=0&&auditexplain.length>200){
		modal("警告提示!","审核说明长度在200位之间,请重新输入!");
		return;
	}
	$.ajax({	
		url:"taskaudit/auditpass",
		type:"post",
		dataType:"json",
		data:{
			"projectId":id,
			"auditexplain":auditexplain
			},
			success:function(result){
				//89.主管 1.管理员 poweid 12 主管 13 管理员
				var taskaudit=result.data;				
				if(taskaudit.supervisorAudit=="d"){
					 $("#auditStatic").html("审核中");
				}else if(taskaudit.supervisorAudit=="y"){
					 $("#auditStatic").html("已通过");
					 
				}else if(taskaudit.supervisorAudit=="n"){
					 $("#auditStatic").html("未通过");
				}
				if(taskaudit.managerAudit=="d"){
					 $("#auditStatic").html("审核中");
				}else if(taskaudit.managerAudit=="y"){
					 $("#auditStatic").html("已通过");
					 
				}else if(taskaudit.managerAudit=="n"){
					 $("#auditStatic").html("未通过");
				}
				var page= $("#page").val();
				getProjectList(page);
				newsTask();
			}
	});
}
						
//点击拒絕
function auditNopass(){
	var id=$("#project-table input[type=checkbox]:checked").val();	
	var auditexplain=$("#auditexplain").val();	
	var selfName = $("#toName").html();
	var selfrole = $("#toName").attr("name");
	var deptmage=$("#project-table input[type=checkbox]:checked").attr("dept");
	var spStat = $("#project-table input[type=checkbox]:checked").attr("spStat");
	if(selfName!=deptmage&&selfrole!="1001"){
		modal("警告提示", "没有权限");
		return;
	}else if(selfrole=="1001"&&spStat!="d"){
		modal("警告提示", "请主管先审核");
		return;
	}
	if(auditexplain.length!=0&&auditexplain.length>200){
		modal("警告提示!","审核说明长度在200位之间,请重新输入!");
		return;
	}
	$.ajax({
		url:"taskaudit/auditNopass",
		type:"post",
		dataType:"json",
		data:{
			"projectId":id,
			"auditexplain":auditexplain
			},
			success:function(result){
				var taskaudit=result.data;	
				$("#audituser").html(taskaudit.users.userName);	
				if(taskaudit.supervisorAudit=="d"){
					 $("#auditStatic").html("审核中");
				}else if(taskaudit.supervisorAudit=="y"){
					 $("#auditStatic").html("已通过");
					 
				}else if(taskaudit.supervisorAudit=="n"){
					 $("#auditStatic").html("未通过");
				}
				if(taskaudit.managerAudit=="d"){
					 $("#auditStatic").html("审核中");
				}else if(taskaudit.managerAudit=="y"){
					 $("#auditStatic").html("已通过");
					 
				}else if(taskaudit.managerAudit=="n"){
					 $("#auditStatic").html("未通过");
				}
				var page= $("#page").val();
				getProjectList(page);
				newsTask();
			}
	});
}							 

/*是否协同评审*/
function whether(id){
    $("#whether_modal").modal('toggle');
    /*添加成员*/
    var addMember=null;
    if(addMember){
    	addMember.ajax.url("taskaudit/findUserAndTeam").load();	
    }else{
        $("#whether_modal").off('shown.bs.modal');
        $("#whether_modal").on('shown.bs.modal',function() {
            addMember=$('#reviewer-table').DataTable({
                "scrollY":'350px',
                "scrollCollapse": true,
                "paging": false,
                "searching":false,
                "info": false,
                "destroy":true,
                "ajax":{
    				"url":"taskaudit/findUserAndTeam",
    				"type":"post",
    				"dataType":"json",
    				data:{
    					"projectId":id
    					},
    				"dataSrc":function(result){
    					var list=result.data;
    					if(result.status == 0) {
    						list = [];
    					}else{
	    					for(var i = 0; i < list.length; i++){
	    						list[i][0]=list[i].userName;
	    						list[i][1]=list[i].department.deptName;					
	    					}
    					}
    					return list;
    				}
                   }
            });
        });
    }
}
/*点击主管审核已/未通过*/
function chargeState(e,id){
	$("#project-table").find("input[type='checkbox']").prop("checked",false);
	$(e).parent().parent().find("input[type='checkbox']").prop("checked",true);
	$("#auditStatic").html("");
	$("#auditexplain").val("");	
	$("#audituser").html("");
    var projectStatus=$("#project-table input[type=checkbox]:checked").attr("title");
    if(projectStatus!="d"){
        $("#auditexplain").attr("readonly","readonly");
        $("#auditexplain").css('background','#fff');
        $("#auditexplain").css('cursor','default');
        $("#pass").hide();
        $("#regect").hide();
        $("#cancel").show();
    }else{
        $("#auditexplain").removeAttr("readonly");
        $("#auditexplain").css('background','#fff');
        $("#auditexplain").css('cursor','auto');
        $("#pass").show();
        $("#regect").show();
        $("#cancel").hide();
    }
	$.ajax({
		url:"taskaudit/findStames",
		type:"post",
		dataType:"json",
		data:{
			"supervisorid":id
			},
			success:function(result){
				var auditLog=result.data;	
				if(auditLog.users==null){
					$("#audituser").html("");
				}else{
					$("#audituser").html(auditLog.users.userName);	
				}
					//89.主管 1.管理员 poweid 12 主管 13 管理员
					if(auditLog.auditStatus=="d"){
						$("#auditStatic").html("审核中");
					}else if(auditLog.auditStatus=="y"){
						 $("#auditStatic").html("已通过");
					}else if(auditLog.auditStatus=="n"){
						 $("#auditStatic").html("未通过");			
					}	
			   $("#auditexplain").val(auditLog.auditexplain);	
			}
	});
    $('#mark_modal').modal('toggle');
}

/*点击管理员审核已/未通过*/
function adminState(id){
	$("#audituser1").html("");	
	 $("#auditStatic1").html("");	
	 $("#auditexplain1").val("");
	$.ajax({
		url:"taskaudit/findMtames",
		type:"post",
		dataType:"json",
		data:{
			"managerid":id
			},
			success:function(result){
			if(result.status == 1){
				var auditLog=result.data;	
				if(auditLog.users==null||auditLog.users==""){
					$("#audituser1").html("");
				}else{
					$("#audituser1").html(auditLog.users.userName);	
				}
					//89.主管 1.管理员 poweid 12 主管 13 管理员
					if(auditLog.auditStatus=="d"){
						$("#auditStatic1").html("审核中");
					}else if(auditLog.auditStatus=="y"){
						 $("#auditStatic1").html("已通过");
					}else if(auditLog.auditStatus=="n"){
						 $("#auditStatic1").html("未通过");			
					}	
			   $("#auditexplain1").val(auditLog.auditexplain);	
			}
		}
	});
    $('#systemAdm-btn-modal').modal('toggle');
}

/*查看说明*/
function lookGuide(id){
	$('#lookGuide_modal').modal('toggle');
	$.ajax({
		url:"taskaudit/findtaskAudit",
		type:"post",
		dataType:"json",
		data:{
			"projectId":id
			},
			success:function(result){
				var taskAudit=result.data;				
					$("#projectName").html(taskAudit.projectName);				
					$("#projectExplain").val(taskAudit.projectExplain);					 
			}
	});
}
/*协同评审人员表*/