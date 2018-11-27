$(function(){
	var projectId=$("#getPage").attr("value");
	$.ajax({
		url:"taskaudit/findtaskAudit",
		type:"post",
		dataType:"json",
		data:{
			"projectId":projectId
		},
		success:function(result){
			var taskAudit=result.data;
			if(result.status == 0) {				
				modal("会话提示","没有这个对象");
			}else{
				$("#spanna").text(taskAudit.audituserName);
				$("#spanplatform").text(taskAudit.platformname);
				if(taskAudit.auditing=="Y"){
					$("#spanauditing").text("是");
				}else if(taskAudit.auditing=="N"){
					$("#spanauditing").text("否");
                    $(".look-btn").hide();
				}
				$("#datetimepicker3").val(taskAudit.startTime.substring(0, taskAudit.startTime.lastIndexOf(".")));
				$("#datetimepicker4").val(taskAudit.endTime.substring(0, taskAudit.endTime.lastIndexOf(".")));
				$("#datetimepicker5").val(taskAudit.applyTime.substring(0, taskAudit.applyTime.lastIndexOf(".")));
				$("#projectExplain").val(taskAudit.projectExplain);
			}
		}
	});	
});

function LookDetails(){
	var projectId=$("#getPage").attr("value");
    $('#look-btn-modal').modal('toggle');
    // status lookTabInfoDatils
    var LookTableCon = null;
    $("#look-btn-modal").off('shown.bs.modal');
    $("#look-btn-modal").on('shown.bs.modal',function(){
        if(LookTableCon){
        	LookTableCon.ajax.url("taskaudit/findUserAndTeam").load();		
        }else{
            LookTableCon = $('#lookTabDeatils').DataTable({
                "scrollY":'188px',
                "scrollCollapse": true,
                "paging": false,
                "searching": false,
                "info": false,
                "ordering":true,
                "autoWidth": false,
                'destroy':true,
                "ajax":{
    				"url":"taskaudit/findUserAndTeam",
    				"type":"post",
    				"dataType":"json",
    				data:{
    					"projectId":projectId,
    					},
    				"dataSrc":function(result){
    					var list=result.data;
    					if(result.status == 0) {
    						list = [];
    					}else{
	    					for(var i = 0; i < list.length; i++){
	    						list[i][0]=list[i].userName;
	    						if(list[i].department==null){
	    							list[i][1] ="";
	    						}else{
	    							list[i][1]=list[i].department.deptName;			
	    						}
	    					}
    					}
    					return list;
    				}
                   }     
            });
        }
    });
}