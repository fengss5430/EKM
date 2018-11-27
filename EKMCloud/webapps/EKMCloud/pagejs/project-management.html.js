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
	var url="taskaudit/findProject";
	var projectTable=null;
	if(projectTable){
		projectTable.ajax.url(url).load();				
	}else{
		projectTable = $('#project-table').DataTable({
			"destroy" : true,
			"scrollY":'791px',
		    "scrollCollapse": true,
		    "paging": true,
		    "searching": true,
            "lengthChange": false,
		    "info": false,
            "order": [[ 1, "asc" ]],
            "lengthMenu": [25],
            "aoColumnDefs":[ { "bSortable": false, "aTargets": [0]}],
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
								if(list[i].users.department==null||list[i].users.department.deptManager==""){
									deptManager="";
								}else {
									deptManager=list[i].users.department.deptManager;
								}
								list[i][0]='<input type="checkbox" name="projectId" title="'+list[i].projectStatus+'" value="'+list[i].projectId+'" dept="'+deptManager+'" spStat="'+list[i].supervisorAudit+'">';
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
									list[i][8]='<a href="javascript:void(0)" class="status tagrayzg" value="y" onclick="chargeState(id='+list[i].supervisorid+');">已通过</a>';
								}else if(list[i].supervisorAudit=="n"){
									list[i][8]='<a href="javascript:void(0)" class="OffLineCorlor tagrayzg" value="n" onclick="chargeState(id='+list[i].supervisorid+');">未通过</a>';
								}
							
								if(list[i].supervisorAudit=="n"){
									list[i][9]='<a href="javascript:;" class="OffLineCorlor tagraygl" value="n" onclick="adminState(this,id='+list[i].managerid+');">未通过</a>';
								}else{
									if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="d"&&list[i].endTime>=getTime()){
										list[i][9]='<span class="OnlineCorlor tagraygl" value="d">审核中</span>';	
									}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="d"&&list[i].endTime<getTime()){
										list[i][9]='<span class="tagraygl" value="o">已过期</span>';
									}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="y"&&list[i].endTime>=getTime()){
										list[i][9]='<a href="javascript:void(0)" class="status tagraygl" value="y" onclick="adminState(this,id='+list[i].managerid+');">已通过</a>';
									}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="y"&&list[i].endTime<getTime()){
										list[i][9]='<a href="javascript:void(0)" class="status tagraygl" value="y" onclick="adminState(this,id='+list[i].managerid+');">已通过</a>';
									}else if(list[i].supervisorAudit=="y"&&list[i].managerAudit=="n"){
										list[i][9]='<a href="javascript:void(0)" class="OffLineCorlor tagraygl" value="n" onclick="adminState(this,id='+list[i].managerid+');">未通过</a>';
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
$('#Meeting_modal').off('hidden.bs.modal');
$('#Meeting_modal').on('hidden.bs.modal', function () {
	$(".emptyTips").hide();
	$(".beTips").hide();
    $("#platformname").val('');
});
//会议添加
function MeetingBtn(){
    $("#Meeting_modal").modal('toggle');
}
function repeatName(e){
	var platformname = $(e).val().trim();
	if(platformname.length==0){
		$('#platformname').focus();
        $(e).parent().next().show();
	}else{
        $(e).parent().next().hide();
	}
	$.ajax({
		url : "plat/findByName",
		type : "post",
		dataType : "json",
		data :{
			"platformname":platformname
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
//会议添加-确定取消-modal
function MeetSureCancle(){
	var platformname=$("#platformname").val();
	if(platformname.length==0){
		modal("提示","会议名称不能为空");
		return;
	}
	$.ajax({
		url :  "plat/savePlatform",
		type : "post",
		dataType : "json",
		data:{
			platformname:platformname
		},
		success : function(result) {
			if(result.status==1){
				modal("提示","添加会议成功");
				$("#Meeting_modal").modal('hide');
			}else if(result.status==-1){
				modal("提示","此会议室名称已存在");
			}
			$("#platformname").val('');
		}
	});
}
// 会议管理
function MeetingManBtn(){
    $("#MeetingMan_modal").modal('toggle');
    getPlatform();
}
function getPlatform(){
	$.ajax({
		url :  "plat/getPlatform",
		type : "post",
		dataType : "json",
		success : function(result) {
			var html='';
			if(result.status==1){
				var list=result.data;
				for (var i = 0; i < list.length; i++) {
					html+='<p onclick="removeName(this);" value="'+list[i].id+'"><span>'+list[i].platformname+'</span><span class="glyphicon glyphicon-remove pull-right removeName"></span></p>';
				}
			}
			$("#platformlist").html(html);
		}
	});
}

function removeName(e) {
	var id= $(e).attr("value");
	if(!confirm("确定要删除吗?")){
		return;
	}
	$.ajax({
	 	 	url :  "plat/delPlatform",
	 	 	type : "post",
	 	 	dataType : "json",
	 	 	data:{
	 	 		id:id
	 	 	},
	 	 	success : function(result) {
	 	 		if(result.status==1){
	 	 			$(e).remove();
	 	 			modal("提示","删除会议成功");
	 	 			getPlatform();
	 	 		}
	 	 	}
	 	 });
}
//会议管理-内容-scroll
$(".meetManBox").slimScroll({
    height:212,
    alwaysVisible: false,
    disableFadeOut:true,
    color: '#777'
});


/*标记审核*/
function mark(){
	var projectId = $("input[name='projectId']:checked");
	if(projectId.length!=1) {
		modal("警告提示","请选择一项或不要选择多项");
		return;
	}
    tabaudit();
}
$('#mark_modal').off('shown.bs.modal');
$('#mark_modal').on('shown.bs.modal',function(){
	$('#auditexplain1').val('');
});

/*标记审核*/
function tabaudit(){
	$("#audituser").html("");	
	$("#auditStatic").html("");
	$("#auditexplain").val("");	
	$("#audituser1").html("");	
	$("#auditStatic1").html("");
	$("#auditexplain1").val("");	
	 var projectStatus=$("#project-table input[type=checkbox]:checked").parent().parent().find(".tagraygl").attr("value");
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
						if(taskaudit.auditLog==null&&taskaudit.supervisorAudit == "n"){
							$("#audituser").html("");
							$("#auditStatic").html("未通过");
							$("#auditexplain").val("");		
						}else{
							if(taskaudit.auditLog.users==null){
								$("#audituser").html("");
							}else{
								$("#audituser").html(taskaudit.auditLog.users.userName);	
							}
							$("#auditexplain").val(taskaudit.auditLog.auditexplain);
							if(taskaudit.supervisorAudit=="d"){
								 $("#auditStatic").html("审核中");
							}else if(taskaudit.supervisorAudit=="y"){
								 $("#auditStatic").html("已通过");
							}else if(taskaudit.supervisorAudit=="n"){
								 $("#auditStatic").html("未通过");
							}
						}
					}else if(powerid.indexOf("13")>=0){
						if(taskaudit.auditLog==null&&taskaudit.supervisorAudit == "n"){
							$("#audituser1").html("");
							$("#auditStatic1").html("未通过");
							$("#auditexplain1").val("");
						}else if(taskaudit.auditLog==null&&taskaudit.managerAudit == "d"&&taskaudit.supervisorAudit != "n"){
							$("#audituser1").html("");
							if(projectStatus=="o"){
								$("#auditStatic1").html("已过期");
							}else{
								$("#auditStatic1").html("审核中");
							}
							$("#auditexplain1").val("");		
						}else{
							if(taskaudit.auditLog.users==null){
								$("#audituser1").html("");
							}else{
								$("#audituser1").html(taskaudit.auditLog.users.userName);	
							}
							$("#auditexplain1").val(taskaudit.auditLog.auditexplain);
							if(taskaudit.managerAudit=="d"){
								if(projectStatus=="o"){
									$("#auditStatic1").html("已过期");
								}else{
									$("#auditStatic1").html("审核中");
								}
							}else if(taskaudit.managerAudit=="y"){
								 $("#auditStatic1").html("已通过");
							}else if(taskaudit.managerAudit=="n"){
								 $("#auditStatic1").html("未通过");
							}
						}
					    }
				     }
		         });
		$('#systemAdm-btn-modal').modal('toggle');
			}
//点击通过
function pass(){
	var selfName = $("#toName").html();
	var selfrole = $("#toName").attr("name");
	var id=$("#project-table input[type=checkbox]:checked").val();
	var deptmage=$("#project-table input[type=checkbox]:checked").attr("dept");
	var spStat = $("#project-table input[type=checkbox]:checked").attr("spStat");
	if(selfName!=deptmage&&selfrole!="1001"){
		modal("警告提示", "没有权限");
		return;
	}else if(selfrole=="1001"&&spStat=="d"){
		modal("警告提示", "请主管先审核");
		return;
	}
	var auditexplain=$("#auditexplain1").val();	
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
					 $("#auditStatic1").html("审核中");
				}else if(taskaudit.supervisorAudit=="y"){
					 $("#auditStatic1").html("已通过");
					 
				}else if(taskaudit.supervisorAudit=="n"){
					 $("#auditStatic1").html("未通过");
				}
				if(taskaudit.managerAudit=="d"){
					 $("#auditStatic1").html("审核中");
				}else if(taskaudit.managerAudit=="y"){
					 $("#auditStatic1").html("已通过");
					 
				}else if(taskaudit.managerAudit=="n"){
					 $("#auditStatic").html("未通过");
				}
				var page= $("#page").val();
				getProjectList(page);
			}
	});
}
//点击拒絕
function auditNopass(){
	var selfName = $("#toName").html();
	var selfrole = $("#toName").attr("name");
	var id=$("#project-table input[type=checkbox]:checked").val();	
	var deptmage=$("#project-table input[type=checkbox]:checked").attr("dept");
	var spStat = $("#project-table input[type=checkbox]:checked").attr("spStat");
	var auditexplain=$("#auditexplain1").val();	
	if(selfName!=deptmage&&selfrole!="1001"){
		modal("警告提示", "没有权限");
		return;
	}else if(selfrole=="1001"&&spStat=="d"){
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
				$("#audituser1").html(taskaudit.users.userName);	
				if(taskaudit.supervisorAudit=="d"){
					 $("#auditStatic1").html("审核中");
				}else if(taskaudit.supervisorAudit=="y"){
					 $("#auditStatic1").html("已通过");
					 
				}else if(taskaudit.supervisorAudit=="n"){
					 $("#auditStatic1").html("未通过");
				}
				if(taskaudit.managerAudit=="d"){
					 $("#auditStatic1").html("审核中");
				}else if(taskaudit.managerAudit=="y"){
					 $("#auditStatic1").html("已通过");
					 
				}else if(taskaudit.managerAudit=="n"){
					 $("#auditStatic1").html("未通过");
				}
				var page= $("#page").val();
				getProjectList(page);
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
                "searching":true,
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
		    						list[i][1]=list[i].department ==null? "":list[i].department.deptName;
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
function chargeState(id){
	$("#auditStatic").html("");
	$("#auditexplain").val("");	
	$("#audituser").html("");	
	$.ajax({
		url:"taskaudit/findStames",
		type:"post",
		dataType:"json",
		data:{
			"supervisorid":id
			},
			success:function(result){
				$("#auditStatic").html("");
				$("#auditexplain").val("");	
				if(result.status == 1){ 
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
				}else{
					$("#audituser1").html("");
			 }
		}
	});
    $('#mark_modal').modal('toggle');
}

/*点击管理员审核已/未通过*/
function adminState(e,id){
	$("#project-table").find("input[type='checkbox']").prop("checked",false);
	$(e).parent().parent().find("input[type='checkbox']").prop("checked",true);
	$("#audituser1").html("");	
	$("#auditStatic1").html("");	
	$("#auditexplain1").val("");
    var projectStatus=$("#project-table input[type=checkbox]:checked").attr("title");
    if(projectStatus!="d"){
        $("#auditexplain1").attr("readonly","readonly");
        $("#auditexplain1").css('background','#fff');
        $("#auditexplain1").css('cursor','default');
        $("#pass").hide();
        $("#regect").hide();
        $("#cancel").show();
    }else{
        $("#auditexplain1").removeAttr("readonly");
        $("#auditexplain1").css('background','#fff');
        $("#auditexplain1").css('cursor','auto');
        $("#pass").show();
        $("#regect").show();
        $("#cancel").hide();
    }
	$.ajax({
		url:"taskaudit/findMtames",
		type:"post",
		dataType:"json",
		data:{
			"managerid":id
			},
			success:function(result){
				 $("#auditStatic1").html("");
				 $("#auditexplain1").val("");	
				 if(result.status == 1){ 
					var auditLog=result.data;	
					if(auditLog.users==null){
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
			 }else{
					$("#audituser1").html("");
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