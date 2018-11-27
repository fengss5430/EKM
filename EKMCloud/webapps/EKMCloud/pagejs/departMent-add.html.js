/**
 * Created by zjliu on 2017/6/1.
 */
$(function(){
	//首次加载
checkUserInDept();
});


//查看团队中拥有的成员
function checkUserInDept() {
	var deptID = getIfDept();
	$('#depart-table').DataTable({
	    "scrollY": '350px',
	    "scrollCollapse": true,
	    "paging": false,
	    "searching": true,
	    "info": false,
	    "order": [[1, "desc"]],
	    // "dom": 'T<"clear">lfrtip',
	    "destroy":true,
	    "aoColumnDefs": [{"bSortable": false, "aTargets": [0]}],
	    "ajax" : {
			"url" : "dept/findUsersInDept",
			"type" : "post",
			"dataType" : "json",
			"data" : {
				deptID : deptID
			},
			"dataSrc" : function(result) {
				var list = result.data;
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
  }


function getIfDept(){
	var deptId=0;
	var username=$("#toName").html();
	$.ajax({
        url:"user/findSelfMess",
        type:"post",
        dataType:"json",
        async:false,
        data:{
            "userName":username
        },
        success:function(result){
        	var user=result.data;
            if(result.status==1){
            	if(user.department!=null){
            		deptId=user.department.deptId;
            	}else{
            		deptId=0;
            	}
            }
        }
	});
	return deptId;
}
/*添加成员*/
$("#departAdd_modal").off('hidden.bs.modal');
$("#departAdd_modal").on('hidden.bs.modal',function() {
    $("#departAdd_modal").find('table').empty();
});

$("#departAdd_modal").off('shown.bs.modal');
$("#departAdd_modal").on('shown.bs.modal',function() {
    addMember();
});
function addMember(){
    var deptid=getIfDept();
    var deptID = $("#deptIdSpan").attr("value");
    /*添加成员*/
    var addMember=null;
    var url ="dept/findUsersNotInDept";
    if(addMember){
    	addMember.ajax.url(url).load();
    }else{
            addMember=$('#departMember-table').DataTable({
                "scrollY":'277px',
                "scrollCollapse": true,
                "paging": false,
                "searching": true,
                "info": false,
                "order": [[ 1, "desc" ]],
                "destroy":true,
                // "dom": 'T<"clear">lfrtip',
                "aoColumnDefs":[{ "bSortable": false, "aTargets": [0]}],
                "ajax":{
    			"url":url,
    			"type":"post",
    			"dataType":"json",
    			"data" : {
    				deptID : deptid
        			},
    		    "dataSrc":function(result){
    		    	var list=result.data;
    		    	if(result.status == 0) {
    					list = [];
    				} else {
    					for (var i = 0; i < list.length; i++) {
    						list[i][0]='<input type="checkbox" name="userId" value="'+list[i].userId+'">';
    						list[i][1]=list[i].userName;
    						list[i][2]=list[i].department ==null?"":list[i].department.deptName;
    					}
    				}
    				return list;
    		     }
    	      }
            });

    }
}
function departAddMember(){
    var deptid=getIfDept();
    if(deptid==0){
        modal("会话提示","请先加入部门");
        return;
    }
    $("#departAdd_modal").modal('show');
}
function AddMember(){
	var deptID = getIfDept();
	var userID=$("#departMember-table input[name='userId']:checked");
	if(userID.length < 1) {
		modal("会话提示","请至少选择一项");
		return;
	}
	var userIDs = [];
	for (var i = 0; i < userID.length; i++) {
		userIDs.push(userID.eq(i).attr("value"));
	}
	$('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	 $.ajax({
			url:"dept/addUserIn2Dept",
			type:"post",
			dataType:"json",
			data:{
				"deptID":deptID,
				"userID":userIDs.join(",")
				},
		    success:function(result){
		    	if(result.status==1){
					modal("会话提示","添加成员成功!");
					 // departAddMember();
                    	addMember();
					 checkUserInDept();
				}else {				
					modal("会话提示","添加成员失败!");
				}
		    	$('.disBtnIcon').attr('data-dismiss','modal');
                $(".disBtn").removeAttr("disabled");
		    }
		});	
	
}
function delMember(){
	var userID=$("#depart-table input[name='userId']:checked");
    if(userID.length < 1){
        modal("操作提示!","请至少选择一项!");
        return;
    }
    if(!confirm("确定要移除你选择的成员吗?")){
        return;
    }
	  var userIDs = [];
	for (var i = 0; i < userID.length; i++) {
        userIDs.push(userID.eq(i).attr("value"));
    }
    $.ajax({
        url:"dept/removeUserFromDept",
        type:"post",
        dataType:"json",
        data:{
            "userID":userIDs.join(",")
        },
        success:function(result){
            if(result.status==1){
                modal("会话提示","移除成功!");
                checkUserInDept();
            }else {
                modal("会话提示","移除失败!");
            }
        }
		});
}
