$(function () {
	 ReceiveList();
	 getEmailSet();
});
//邮件页面收件人信息操作 
function ReceiveList(){
	$.ajax({
		url:"email/ReceiveList",
		type:"get",
		dataType:"json",
	    success:function(result){
	    	 var list=result.data;
	    	 var html='';
	    	 if(list!=null){
	    		 for (var i = 0; i < list.length; i++) {
	    			 if(list[i].state==1){
	    				 html+='<tr><td><input type="checkbox" name="emailid" checked value="'+list[i].id+'"><td>'+list[i].emailname+'</td><td>'+list[i].emailadress+'</td></tr>';
	    			 }else{
	    				 html+='<tr><td><input type="checkbox" name="emailid"  value="'+list[i].id+'"><td>'+list[i].emailname+'</td><td>'+list[i].emailadress+'</td></tr>';
	    			 }
	    		 }
	    		 $("#ReceiveListId").html(html);
	    	 }
	    	}
	    });
}
function getEmailSet(){
	$.ajax({
		url:"email/findSetMailMess",
		type:"post",
		dataType:"json",
	    success:function(result){
	    	if(result.status==1){
	    		var emailset=result.data;
	    		$("#mailServerHost").val(emailset.mailServerHost);
		    	$("#mailServerPort").val(emailset.mailServerPort);
		    	$("#fromAddress").val(emailset.fromAddress);
		    	$("#userName").val(emailset.userName);
		    	$("#password").val(emailset.password);
		    	$("#downcountid").val(emailset.setdowncount);
	    	}
	    }
	});
}
function addReceive() {
	var receivename = $("#receivename").val();
	var reemail = $("#reemail").val();
	var userNameReg = /^[\w]{1,50}$/;//用户名正则
	var emailReg =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(receivename==""){
		modal("警告提示!","用户名不能为空!");
		return;
	}else if(receivename.length<1 || receivename.length>50){
		modal("警告提示!","用户名长度在1~50位之间,请从新输入!");
		return;
	}else if(!receivename.match(userNameReg)){
		modal("警告提示!","用户名只能是英文字母和数字组成!");
		return;
	}
	if(reemail==""){
		modal("警告提示!","邮箱不能为空!");
		return;
	}else if(reemail.length!=0&&!reemail.match(emailReg)){
		modal("警告提示!","邮箱格式不正确,请从新输入!");
		return;
	}
	$('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	$.ajax({
		url:"email/saveReceiveMess",
		type:"post",
		dataType:"json",
		data:{
			"emailname":receivename,
			"emailadress":reemail,
			"state":0
		},
	    success:function(result){
	    	if(result.status==1){
	    		$("#add-modal").modal('hide');
				modal("会话提示","成功!");
				ReceiveList();
			}else if(result.status==0){				
				modal("会话提示","失败!");
			}else if(result.status==2){				
				modal("会话提示","此用户及地址已存在!");
			}
	    	$('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
	    }
	});
}

function delReceiveMess(){
	var emailid=$("input[name=emailid]:checked");
	if(emailid.length < 1) {
		modal("警告提示","请选择一项或多项");
		return;
	}
	if(!confirm("确定要删除吗?")){
		return;
	}
	var emailids = new Array();
	for (var i = 0; i < emailid.length; i++) {
		emailids.push(emailid.eq(i).attr("value"));
	}
	$.ajax({
		url:"email/deleteEmailMess",
		type:"post",
		dataType:"json",
		data:{
			"id":emailids.join(",")
			},
	    success:function(result){
	    	if(result.status==1){
				modal("会话提示","删除成功!");
				ReceiveList();
			}else {				
				modal("会话提示","删除失败!");
			}
	    	$("input[name=id]:checked").val("");
	    }
	});
}
//保存修改状态
function updataState(){
	var inputs = $(".table-bordered").find("input:checked");
	if(inputs.length < 1){
		modal("警告提示!","请至少选择一项!");
		return;
	}
	var emailids=new Array();
	for (var i = 0; i < inputs.length; i++) {
		emailids.push(inputs.eq(i).attr("value"));
	}
	$.ajax({
		url:"email/updataEmailMess",
		type:"post",
		dataType:"json",
		data:{
			"id":emailids.join(",")
			},
	    success:function(result){
	    	if(result.status==1){
				modal("会话提示","保存成功!");
				ReceiveList();
			}else {				
				modal("会话提示","保存失败!");
			}
	    	$("input[name=id]:checked").val("");
	    }
	});
}
//邮件页面收件人信息操作/////end 
//发送邮件操作 ---start
$(function(){  	    
	$("input[name='ssl']").click(function(){
	    if($(this).prop("checked")){	
	       $("input[name='ssltext']").val("994");//465
	    }else{
	       $("input[name='ssltext']").val("25");
	    }
	});
	 $("#userName").val("");
	 $("#password").val("");
});

//保存
function addEmailSet(){
	var mailServerHost=$("#mailServerHost").val();
	var mailServerPort=$("#mailServerPort").val();
	var fromAddress=$("#fromAddress").val();
	var userName=$("#userName").val().trim();;
	var password=$("#password").val();
	var downcount=$("#downcountid").val();
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	 var sslType = $("#isSsl").is(":checked")?'1':'0';
     if(!myreg.test(fromAddress))
      {
    	modal("会话提示","请输入有效的E_mail!");
        return;
     }
	if(mailServerHost =="" || mailServerPort=="" || fromAddress == "" || userName == "" || password ==""){
		modal("会话提示","邮箱项配置均不能为空!,请填写数据.!");
		return;
	}
		$.ajax({
			type : "post",
			url : "email/addSetting",
			data : {
				"mailServerHost" : mailServerHost,
				"mailServerPort" : mailServerPort,
				"fromAddress" : fromAddress,
				"userName" : userName,
				"password":password,
				"sslType" : sslType,
				"setdowncount":downcount
			},
			dataType : "json",
			success : function(data) {
				if(data >= 1){
					modal("会话提示","添加邮箱服务器配置成功!");
				}else{
					modal("会话提示","添加配置失败!");
				}
				
			}
		});
}

/**
 * 发邮件
 */	
	function sendMail() {
		var mailServerHost=$("#mailServerHost").val();
		var mailServerPort=$("#mailServerPort").val();
		var fromAddress=$("#fromAddress").val();
		var userName=$("#userName").val().trim();;
		var password=$("#password").val();
		var toAddress = $('#sendEmail').val();
		if(mailServerHost==""||mailServerPort==""||fromAddress==""||userName==""||password==""||toAddress==""){
			modal("会话提示","信息填写不全!");
			return;
		}
		var isSsl = $('#isSsl').is(':checked')?"1":"0";
		$.ajax({
			type : "GET",
			url : "email/sendMail",
			data : {
				"smtp" : mailServerHost,
				"portNum" : mailServerPort,
				"fromAddress" : fromAddress,
				"userName" : userName,
				"pwd" : password,
				"toAddress" : toAddress,
				"ssl" : isSsl,
				"count":0,
				"name":""
			},
			dataType : "json",
			success : function(data) {
				if(data==true){
					modal("会话提示","邮件已发送，请到邮箱查看。");
				}else{
					modal("会话提示","配置错误，请检查。");
				}
			}
		});
		
	}

// 测试邮箱
    // 添加
    function addFun(){
        $("#add-modal").modal('toggle');
        $("#receivename").val("");
    	$("#reemail").val("");
    }
    $('#test-modal').off('hidden.bs.modal');
    $('#test-modal').on('hidden.bs.modal', function () {
    	$('#sendEmail').val('');
    });
    function testFun(){
        $("#test-modal").modal('toggle');
    }