function ajaxFileUpload() {
	if($('#sn_input').val()==""){
		modal("会话提示框","序列号不能为空.");
		return;
	}
	var form = $('#uploadform'); 
    var options  = {   
        url: 'licenseinfo/upload?sn='+$('#sn_input').val(),   
        type: 'POST', 
        success:function(data)   
        {   
        	if(data=="1"){
				modal("会话提示框","许可证更新成功。");
				window.location.replace("user/login.html");
			}else if(data=="-1"){
				modal("会话提示框","文件格式错误。");
			}else if(data=="0"){
				modal("会话提示框","序列号或者许可证错误。");
			}else if(data=="-2"){
				modal("会话提示框","上传出现错误。");
			}else if(data=="-3"){
				modal("会话提示框","文件上传失败。");
			}
        }   
    };   
    form.ajaxSubmit(options); 
}

function handleFile(){
	  var fileName = $("#urlval").val().replace(/\\/g,'/');
	  var path = fileName.split("/");
	  $("#urlinput").prop("value",path[path.length-1]);
	   }