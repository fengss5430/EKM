 $(document).ready(function() {
        tabId = $('#myTab li.active').attr('data-tabId'); //默认值
        $('#myTab li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            tabId = $(this).attr('data-tabId');
            initAlmanac();
        });
        initAlmanac();
        function initAlmanac(){
            $("#id_almanac").almanac({
                beforeDrawCld:function(cld){
                    /*status对应数值，isBook代表是否被预约，预约为true，其他均为没预约
                     数据格式：[{status:30,isBook:true}]
                     */
                     var times=yearmonth;            
//                     var active=$("#myTab .active a").attr("type");
//                     var platform=0;
//                     if(active=="1"){
//                     	platform=0;
//                     }else if(active=="2"){
//                     	platform=1;
//                     }
                 	//获取这个月每天的申请条数
                     $.ajax({
	                     url:"taskaudit/nowMothDaycount",
	                     type:"post",
                 		 dataType:"json",
                 		 async:false,
                 		 data:{
                 			"time":times
//                 			"platform":platform
                 		 },
                 		 success:function(result){
                 			if(result.status==1){
                 				var list=result.data;
                 				var arrayStr=new Array();
                 				var flag;
                 				for (var i = 0; i < list.length; i++) {
                     				if(list[i].supervisorid>0){
                     					flag=true;
                     				}else{
                     					flag=false;
                     				}
                     				arrayStr.push({"status":list[i].projectId,"userStatic":list[i].supervisorid,"isBook":flag});
                     			}
                 				cld.statusArr=arrayStr;
                 			}
                 		 }
                     });
                   //循环条数数组
                },
	              /*画日历之后调用函数*/
	              afterDrawCld : function(year, month){
	              },
                /** 单击某一天的事件**/
                clickDay: function(elem){
                }
            });
        }
    });

// 滚动条
$('.almanac-extra').slimScroll({
    height: '374px',
    alwaysVisible:false
});

 //资料预约申请
function statusInfo() {
    $('#source-btn-modal').modal('toggle');
    getUs();
    getPlatforms();
}
//获取会议室
function getPlatforms(){
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
function getUs(){
	var toname = $("#toName").html();
	var usertype=$("#usertype-status");
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
                 $("#usertype-status").selectpicker("render");
                 $("#usertype-status").selectpicker("refresh");		
	        }else if(result.status==0){
	        	usertype.empty();
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
	var startTime=$("#datetimepicker").val();
	var endTime=$("#datetimepicker2").val();
	if(startTime==""||endTime==""){
		return;
	}
	if(repTime(startTime,endTime,platform)>0){
		modal("会话提示","此会议室此时间段已有预约!");
	}
});

$('#datetimepicker,#datetimepicker2').datetimepicker({
	format: "yyyy-MM-dd hh:ii:ss",
	startDate:new Date(),
	autoclose:"true",
	minuteStep:5
});
$("#source-btn-modal").off("hidden.bs.modal");
$("#source-btn-modal").on("hidden.bs.modal",function(){
    $("#projectName").val('');
    $("#datetimepicker").val('');
    $("#datetimepicker2").val('');
    $("#projectExplain").val('');
});

//Is-status
$('.IsRadioBoxF input').change(function(){
    if($(this).prop('checked')==true && $(this).attr('value')=='Y'){
        $('.ResourceStatusBox').find('.IsShowBoxF').show();
    }else{
        $('.ResourceStatusBox').find('.IsShowBoxF').hide();
    }
});

$('#usertype-status').selectpicker('val', 'arr','Mustard',{
    'selectedText': 'cat',
});

function rerili(){
	var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var date=today.getDate();
	var dataTime=year+"-"+month+"-"+date;
	var active=$("#myTab .active a").attr("type");
    var platform=0;
    if(active=="1"){//huiyi1
    	platform=0;
    }else if(active=="2"){
    	platform=1;
    }
	   $.ajax({
   		url:"taskaudit/nowmes",
   		type:"post",
   		dataType:"json",
   		data:{
   			"startTime":dataTime,
   			"platform":platform
   		},
   		success:function(result){
   			var list=result.data;
   			var html="";
   			$("#todaylist").html(html);
   			 if(result.status == 0){
   				 list = [];
   				 html+='<img class="BookImg" src="images/icon_error.png"/>';
   				 $("#todaylist").html(html);
   			 }else if(result.status == 1){
   				 for(var i = 0; i < list.length; i++){
   					var startTime="";
   						if(list[i].startTime!=null){
   							startTime=list[i].startTime.substring(0, list[i].startTime.lastIndexOf("."));
   						}
   						 html+='<a href="javascript:;" id="'+list[i].projectId+'" name="resource-details" onclick="ChangePage(this);"><p>项目名称<span>:'+list[i].projectName+'</span></p><p>姓名<span>:</span><span>'+list[i].audituserName+'</span></p><p><span>开始时间</span><span>:</span><span>'+startTime+'</span></p></a>';
   					 }
   				 $("#todaylist").html(html);
   			 }
   		}
    });
}
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




function savePro(){
	var projectName=$("#projectName").val();
	var namereg =/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
	var platform = $("#selectPlatform option:selected").attr("value");
	var platformname = $("#selectPlatform option:selected").html();
    var mytime=getTime();
    var startTime=$("#datetimepicker").val();
	var endTime=$("#datetimepicker2").val();
	var auditing = $("#rap input[name='auditing']:checked ").val();
	var projectExplain = $("#projectExplain").val();
	var auditUser=$("#usertype-status option:selected");
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
	if(startTime<mytime){
        modal("会话提示","开始时间不能小于当前时间！");
        return;
	}
    if(endTime<mytime){
        modal("会话提示","结束时间不能小于当前时间！");
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
		modal("会话提示","项目说明不能为空!");
		return;
	}else if(projectExplain.length>=2000){
		modal("警告提示!","项目说明长度在2000字之间!");
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
              	$("#source-btn-modal").modal('hide');
              	modal("会话提示","申请成功!");
              	newsTask();
				rerili();
				$("#projectName").val('');
				$('#selectPlatform').val('');
				 $("#datetimepicker").val('');
				 $("#datetimepicker2").val('');
				 $("#rap input[value='Y']").prop('checked','true');
				 $("#projectExplain").val('');
				 $('#usertype-status').selectpicker('val', '');
				 $('.IsShowBoxF').show();
			}else if(result.status==-2){
				modal("会话提示","项目名称已存在!");
				$("#projectName").val('');
			}else {				
				modal("会话提示","申请失败!");
				$("#projectName").val('');
				$('#selectPlatform').val('');
				 $("#datetimepicker3").val('');
				 $("#datetimepicker4").val('');
				 $("#rap input[value='Y']").prop('checked','true');
				 $("#projectExplain").val('');
				 $('#usertype-status').selectpicker('val', '');
				 $('.IsShowBoxF').show();
			}
		  $('.disBtnIcon').attr('data-dismiss','modal');
          $(".disBtn").removeAttr("disabled");
	   }
	});
}