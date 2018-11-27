//下载

//function basePath(){
//    //获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
//    var curWwwPath = window.document.location.href;
//    //获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
//    var pathName = window.document.location.pathname;
//    var pos = curWwwPath.indexOf(pathName);
//    //获取主机地址，如： http://localhost:8080
//    var localhostPath = curWwwPath.substring(0, pos);
//    //获取带"/"的项目名，如：/ems
//    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
//    //获取项目的basePath   http://localhost:8080/ems/
//    var basePath=localhostPath+projectName+"/";
//    return basePath;
//};
////调用方法
//var basePath;;
//
//$(document).ready(
//        function() {
//            basePath=basePath();
//            alert(basePath);
//        });
function downloads(e) {
		//验证是否选中
/*		var checkFile = $(".item-active");
		if(checkFile.length < 1) {
			modal("会话提示框","请至少选择一项");
			return;
		}
		var type = $("#getPage").attr("type");*/
		//选择一个文件
		//if(checkFile.length == 1) {
//			var sourceFileName = checkFile.attr("value");
			//获取参数
			var  directory = $(e).attr("value");
			//var name =  $(e).attr("name");
			var url =  $(e).attr("path");
			var fileNameDate = new Date().getTime();
			//如果是文件夹
			if(directory == "true") {
				//压缩打开
				$.ajax({
					url : "licenseinfo/compress",
					type : "post",
					dataType : "json",
					data : {
						source : url,
						target : "/" + fileNameDate+".zip",
						type : "zip",
						type1 : "4"
					},
					success : function (result) {
						if(result.status == 1) {
							window.open("licenseinfo/download?path=" +encodeURI(url)+"/"+fileNameDate + ".zip&type=4"+"&isCompress="+true);
						} 
						if(result.status == 0) {
							modal("会话提示框","下载失败");
						} 
					}
				});
			} else {
//				window.open("data/file/download?path="+encodeURI(url)+"&type=4&isCompress="+false);
				window.open("licenseinfo/download?path="+zhuan(url)+"&type=4&isCompress="+false);
			}
		//}
		/*//多个文件
		if(checkFile.length > 1) {
			var sourceFileName = [];
			for (var i = 0; i < checkFile.length; i++) {
				sourceFileName.push(checkFile.eq(i).attr("value"));
			}
			$.ajax({
				url : "data/file/compress",
				type : "post",
				dataType : "json",
				data : {
					source : sourceFileName.join(":"),
					target : "/"+fileNameDate+".zip",
					type : "zip",
					type1 : type
				},
				success : function (result) {
					if(result.status == 1) {
						window.open("data/file/download?path=/" + fileNameDate + ".zip&type="+type+"&isCompress="+true);
					} 
					if(result.status == 0) {
						modal("会话提示框","下载失败");
					} 
				}
			});
		}
		$("#down-modal").modal("hide");*/
}