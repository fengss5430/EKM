/**
 * Created by zjliu on 8/11/2017.
 */

$(function(){
	getLicenseInfo();
});

function updatelicense() {
    $('#UpdateLicense_btn_modal').modal('toggle');
    $("#UpdateLicense_btn_modal").off("hidden.bs.modal");
    $("#UpdateLicense_btn_modal").on("hidden.bs.modal",function(){
    	$("#sn_input").val('');
    	$("#urlinput").val('');
	});
}

function getLicenseInfo() {
	$.ajax({
		url : "licenseinfo/get",
		type : "get",
		dataType : "json",
		data : {
			lic_license_name : ""
		},
		success : function(result) {
			var data = result.licenseFile;
			var currentTime = new Date().getTime();
			$("#currentVersion").html(data.version);
			$("#customName").html(data.customName);
			$("#hostID").html(data.hostsId[0]);
			$("#sn").html(data.serialNumber);
			$("#sessions").html(data.portalInfo.sessions);
			$("#surplusTime").html(Math.round((result.endDate-currentTime)/1000/60/60/24)+"天");
			$("#beginTime").html(format(result.startDate));
		}
	});
}

//时间处理
function add0(m){
	return m<10?'0'+m:m;
}
function format(ms){
//shijianchuo是整数，否则要parseInt转换
var time = new Date(ms);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

function ajaxFileUpload() {
	if($('#sn_input').val()==""){
		modal("会话提示框","序列号不能为空.");
		return;
	}
	var form = $('#uploadform'); 
    var options  = {   
        url: 'licenseinfo/upload',   
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
