$(function(){
	getPlatform();
	getUsers();
});

function getUsers(){
	var toname = $("#toName").html();
	 $("#usertype").selectpicker({});  //初始化
		var usertype=$("#usertype");
		$.ajax({		
			url:"user/userTeam",
			type:"post",
			dataType:"json",
			 data: {
		            "userName": toname
		        },
		    success:function(result){
		    	if(result.status==1){
		    		var list=result.data;			
				    usertype.empty();					
					for (var i = 0; i < list.length; i++) {
						usertype.append("<option value='"+list[i].userId+"'>"+list[i].userName+"</option>");	
					} 
                    $("#usertype").selectpicker("render");
                    $("#usertype").selectpicker("refresh");		
		        }else if(result.status==0){
		    	     usertype.empty();
		        }
		    }
		});
}
//获取会议室
function getPlatform(){
	$.ajax({		
		url:"plat/getPlatform",
		type:"post",
		dataType:"json",		
	    success:function(result){
	    	var html="";
	    	if(result.status==1){
	    		var list=result.data;
	    		html+='<option value="0" >Nothing selected</option>';
		    	for (var i = 0; i < list.length; i++) {
		    		html+='<option  value="'+list[i].id+'">'+list[i].platformname+'</option>';
		    	}
	        }
	    	$("#selectPlatform").html(html);
	    }
	});
}
/*DateTimePicker();
DateTimePicker();*/
$('#datetimepicker3,#datetimepicker4').datetimepicker({
	format: "yyyy-MM-dd hh:ii:ss",
	startDate:new Date(),
	autoclose:"true",
	minuteStep:5
});

//部门名称验证
function repeatprojectName(e){
	var projectName = $(e).val().trim();
	var reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
	if(projectName.length==0){
		$('#projectName').focus();
        $(e).parent().next().show();
	}else{
        $(e).parent().next().hide();
	}
    if(!reg.test(projectName)&&projectName.length!=0){
        $(e).parent().next().next().next().show();
    }else{
        $(e).parent().next().next().next().hide();
    }
	$.ajax({
		url : "taskaudit/findByprojectName",
		type : "post",
		dataType : "json",
		data :{
			"projectName":projectName			
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
//按时间段和会议室查询预约情况
$("#selectPlatform").change(function(){
	var platform =$("#selectPlatform option:selected").attr("value");
	if(platform==0){
		return;
	}
	var startTime=$("#datetimepicker3").val();
	var endTime=$("#datetimepicker4").val();
	if(startTime==""||endTime==""){
		return;
	}
	if(repTime(startTime,endTime,platform)>0){
		modal("会话提示","此会议室此时间段已有预约!");
	}
});

function savePro(){
	var projectName=$("#projectName").val();
	var namereg =/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
	var platform = $("#selectPlatform option:selected").attr("value");
	var platformname = $("#selectPlatform option:selected").html();
	var startTime=$("#datetimepicker3").val();
	var endTime=$("#datetimepicker4").val();
	var auditing = $("#rap input[name='auditing']:checked ").val();
	var projectExplain = $("#projectExplain").val();
	var auditUser=$("#usertype option:selected");
	var auditUsers = [];
	for (var i = 0; i < auditUser.length; i++) {
		auditUsers.push(auditUser.eq(i).attr("value"));
	}
	if(projectName==""){
		modal("会话提示","项目名称不能为空!");
		return;
	}else if(projectName.length<1 || projectName.length>20){
		modal("警告提示!","项目名称长度在1~20位之间,请重新输入!");
		return;
	}else if(!projectName.match(namereg)){
		modal("警告提示!","项目名称只能是中英文、下划线、数字!");
		return;
	}
	
	if(startTime==""){
		modal("会话提示","开始时间不能为空!");
		return;
	}
	if(endTime==""){
		modal("会话提示","结束时间不能为空!");
		return;
	}
	if(startTime>endTime){
		modal("会话提示","结束时间不能小于开始时间!");
		return;
	}
	if(platform==0){
		modal("会话提示","请选择会议室!");
		return;
	}
	if(repTime(startTime,endTime,platform)>0){
		modal("会话提示","此会议室此时间段已有预约!");
		return;
	}
	if(projectExplain==""){
		modal("会话提示","会议说明不能为空!");
		return;
	}else if(projectExplain.length>=2000){
		modal("警告提示!","会议说明长度在2000字之间!");
		return;
	}
	$('.disBtnIcon').removeAttr('data-dismiss');
    $(".disBtn").attr("disabled","disabled");
	$.ajax({
	   url:"taskaudit/save",
	   type:"post",
	   dataType:"json",
	   data:{
	   	"projectName":projectName,
	   	"platform":platform,
	   	"platformname":platformname,
	   	"startTime":startTime,
	   	"endTime":endTime,
	   	"auditUser":auditUsers.join(","),
	   	"auditing":auditing,
	    "projectExplain":projectExplain
	   },
	   success:function(result){
		  if(result.status==1){
			 modal("会话提示","申请成功!");
			 newsTask();
			 $("#projectName").val('');
			 $('#selectPlatform').val('');
			 $("#datetimepicker3").val('');
			 $("#datetimepicker4").val('');
			 $("#rap input[value='Y']").prop('checked','true');
			 $("#projectExplain").val('');
			  $('#usertype').selectpicker('val', '');
			  $('.IsShowBox').show();
			} else if(result.status==-2){
				modal("会话提示","项目名称已存在!");
				$("#projectName").val('');
			} else {				
				modal("会话提示","申请失败!");
				$("#projectName").val('');
				$('#selectPlatform').val('');
				 $("#datetimepicker3").val('');
				 $("#datetimepicker4").val('');
				 $("#rap input[value='Y']").prop('checked','true');
				 $("#projectExplain").val('');
				  $('#usertype').selectpicker('val', '');
				  $('.IsShowBox').show();
			}
		  $('.disBtnIcon').attr('data-dismiss','modal');
          $(".disBtn").removeAttr("disabled");
	   }
	});
}