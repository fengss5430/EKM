$(function(){
	getProjectList();//获取项目列表
});
function getProjectList(){
	var projectTable=null;
	var url="taskaudit/findMyProject";
	if(projectTable){
		projectTable.ajax.url(url).load();				
	}else{
		projectTable = 
			$('#Status-table').DataTable({
			"scrollY":'791px',
		    "scrollCollapse": true,
		    "paging": true,
			"lengthChange": false,
		    "searching": true,
		    "info": false,
		    "order": [[ 1, "desc" ]],
		    "destroy" : true,
			"lengthMenu": [25],
                "ajax":{
				"url":url,
				"type":"post",
				"dataType":"json",
				"dataSrc":function(result){
					var list=result.data;
					if(result.status == 0){
						list = [];
					}else{
					for (var i = 0; i < list.length; i++) {
						list[i].applyTime=list[i].applyTime.substring(0, list[i].applyTime.lastIndexOf("."));
						list[i].startTime=list[i].startTime.substring(0, list[i].startTime.lastIndexOf("."));
						list[i].endTime=list[i].endTime.substring(0, list[i].endTime.lastIndexOf("."));
						list[i][0]=list[i].projectName;
						list[i][1]=list[i].platformname;							
						if(list[i].auditing=="Y"){
							list[i][2]='<a href="javascript:;" onclick="IsReview(id='+list[i].projectId+');">是</a>';
						}else if(list[i].auditing=="N"){
							 list[i][2]='否';				
						}
						list[i][3]=list[i].applyTime;
						if(list[i].startTime!=""){
							list[i][4]=list[i].startTime;
						}
						if(list[i].endTime!=""){
							list[i][5]=list[i].endTime;
						}
							if(list[i].supervisorAudit=="d"&&list[i].endTime>=getTime()){//zhu
								list[i][6]='<a href="javascript:;" class="OnlineCorlor" style="text-decoration:none;cursor:text">审核中</a>';
							}else if(list[i].supervisorAudit=="d"&&list[i].endTime<getTime()){
								list[i][6]='已过期';
							}else if(list[i].supervisorAudit=="y"){
								list[i][6]='<a href="javascript:;" onclick="Passed(id='+list[i].supervisorid+');">已通过</a>';
							}else if(list[i].supervisorAudit=="n"){
								list[i][6]='<a href="javascript:;" class="OffLineCorlor" onclick="Passed(id='+list[i].supervisorid+');">未通过</a>';
							}
						
							if(list[i].supervisorAudit=="n"){
								list[i][7]='<a href="javascript:;" class="OffLineCorlor" onclick="IsPassed(id='+list[i].managerid+');">未通过</a>';
							}else{
								if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="d"&&list[i].endTime>=getTime()){
									list[i][7]='<a href="javascript:;" class="OnlineCorlor" style="text-decoration:none;cursor:text">审核中</a>';	
								}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="d"&&list[i].endTime<getTime()){
									list[i][7]='已过期';
								}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="y"&&list[i].endTime>=getTime()){
									list[i][7]='<a href="javascript:;" onclick="IsPassed(id='+list[i].managerid+');">已通过</a>';
								}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="y"&&list[i].endTime<getTime()){
									list[i][7]='<a href="javascript:;" onclick="IsPassed(id='+list[i].managerid+');">已通过</a>';
								}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="n"){
									list[i][7]='<a href="javascript:;" class="OffLineCorlor" onclick="IsPassed(id='+list[i].managerid+');">未通过</a>';
								}else if(list[i].supervisorAudit=="d"&&list[i].managerAudit=="d"&&list[i].endTime>=getTime()){
									list[i][7]='<a href="javascript:;" class="OnlineCorlor" style="text-decoration:none;cursor:text">审核中</a>';
								}else if(list[i].supervisorAudit=="d"&&list[i].managerAudit=="d"&&list[i].endTime<getTime()){
									list[i][7]='已过期';
								}
							}
						
							if(list[i].projectStatus=="d"&&list[i].endTime>=getTime()){
								list[i][8]='<span class="OnlineCorlor">进行中</span>';		 
							}else if(list[i].projectStatus=="d"&&list[i].endTime<getTime()){
								list[i][8]='已过期';
							}else if(list[i].projectStatus=="y"&&list[i].endTime<getTime()){
								list[i][8]='已完成';		 							
							}else if(list[i].projectStatus=="y"&&list[i].endTime>=getTime()){
								list[i][8]='<span class="OnlineCorlor">进行中</span>';		 							
							}else if(list[i].projectStatus=="n"){
								list[i][8]='<span class="OffLineCorlor">未通过</span>';		 							
							}
						list[i][9]='<a href="javascript:;" onclick="LookRemark(id='+list[i].projectId+');">查看说明</a>';
						}
					}
					    return list;
				}	
			}	
		});
	}
}

//刷新
function refresh(){
	getProjectList();
}

//是否协同审核-是
function IsReview(id){
    $('#reviewPersonnel-btn-modal').modal('toggle');
    var ReviewPersonnelTabInfo = null;
    $("#reviewPersonnel-btn-modal").off('shown.bs.modal');
    $("#reviewPersonnel-btn-modal").on('shown.bs.modal',function(){
        if(ReviewPersonnelTabInfo){
        	ReviewPersonnelTabInfo.ajax.url(url).load();		
        }else{
            ReviewPersonnelTabInfo = $('#reviewPersonnel-table').DataTable({
                "scrollY":'320px',
                "scrollCollapse": true,
                'destroy':true,
                "paging": false,
                "searching": false,
                "info": false,
                "ordering":true,
                "autoWidth": false,
                "ajax":{
				"url":"taskaudit/findUserAndTeam",
				"type":"post",
				"dataType":"json",
				data:{
					"projectId":id,
					},
				"dataSrc":function(result){
					var list=result.data;
					if(result.status == 0){
						list = [];
					}else{
						for(var i = 0; i < list.length; i++){
							list[i][0]=list[i].userName;
							list[i][1]=list[i].department ==null? "":list[i].department.deptName;			
						}
					}
					return list;
				}
               }
            });
        }
    });
};

/*点击主管审核已/未通过*/
function Passed(id){
	$.ajax({
		url:"taskaudit/findStames",
		type:"post",
		dataType:"json",
		data:{
			"supervisorid":id,
			},
			success:function(result){
				$("#auditStatic").html("");
				$("#auditexplain").html("");
				if(result.status == 1){
					var auditLog=result.data;	
					if(auditLog.users!=null){
						$("#audituser").html(auditLog.users.userName);	
					}else{
						$("#audituser").html("");
					}
						//89.主管 1.管理员 poweid 12 主管 13 管理员
						if(auditLog.auditStatus=="d"){
							$("#auditStatic").html("审核中");
						}else if(auditLog.auditStatus=="y"){
							 $("#auditStatic").html("已通过");
						}else if(auditLog.auditStatus=="n"){
							 $("#auditStatic").html("未通过");			
						}	
				   $("#auditexplain").html(auditLog.auditexplain);	
				}else{
					$("#audituser").html("");
				}
			}
	});
	 $('#SupervisorAudi-btn-modal').modal('toggle');
}

/*点击管理员审核已/未通过*/
function IsPassed(id){
	$.ajax({
		url:"taskaudit/findMtames",
		type:"post",
		dataType:"json",
		data:{
			"managerid":id,
			},
			success:function(result){
				 $("#auditStatic1").html("");
				 $("#auditexplain1").html("");	
				 if(result.status == 1){
					var auditLog=result.data;	
					if(auditLog.users!=null){
						$("#audituser1").html(auditLog.users.userName);	
					}else{
						$("#audituser1").html("");
					}
						//89.主管 1.管理员 poweid 12 主管 13 管理员
						if(auditLog.auditStatus=="d"){
							$("#auditStatic1").html("审核中");
						}else if(auditLog.auditStatus=="y"){
							 $("#auditStatic1").html("已通过");
						}else if(auditLog.auditStatus=="n"){
							 $("#auditStatic1").html("未通过");			
						}	
				   $("#auditexplain1").html(auditLog.auditexplain);	
				}else{
					$("#audituser1").html("");
				}
			}
	});
	   $('#systemAdm-btn-modal').modal('toggle');
}

//查看说明
function LookRemark(id){
    $('#LookRemark-btn-modal').modal('toggle');
    $.ajax({
		url:"taskaudit/findtaskAudit",
		type:"post",
		dataType:"json",
		data:{
			"projectId":id,
			},
			success:function(result){
				var taskAudit=result.data;				
					$("#projectName").html(taskAudit.projectName);				
					$("#projectExplain").val(taskAudit.projectExplain);					 
			}
	});
}
