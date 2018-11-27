//备份下载
function downloadAndBackup() {
	tips("正在备份,请耐心等待...", true);
	$('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	//备份到某地址
	 $.ajax({
       url: "backup/Backup",
       type: "post",
       dataType: "json",
       success: function (result) {
    	    if (result.status == 1) {
    	    	 $("#databack-modal").modal("hide");
    	    	 var sourceFileName = result.data; 
    	    	 if (!!window.ActiveXObject || "ActiveXObject" in window) {
    	    		 window.open = "backup/getdownload?path=" + zhuan(sourceFileName);
    	    	 } else {
    	    		 window.open("backup/getdownload?path=" + zhuan(sourceFileName));
    	    	 }
    	         tips("", false);
    	         $('.disBtnIcon').attr('data-dismiss','modal');
    	         $(".disBtn").removeAttr("disabled");
    	       
    	   }
    	   
		 }
	 });
}

function Uploadsql(){
	$("#getPage").attr("type","0");
	load = $("#sliceUploadsql").sliceUpload({
        sliceValue:50*1024*1024,//默认是每片50M，可自定义修改此值，具体参见SliceUpload.js
        url:"upload/uploads",
        isTrigger:false
    });
	$('#dataReturn-modal').modal('toggle');
	 $('.fileUpload').on("change",(function(){
	    	var file = this.files[0];
	    	filename=file.name;
	    	$("#sliceUploadsql input[name='InputUrl']").val(filename);
	    }));
}
//恢复
function returnsql(w){
	if($("#sliceUploadsql input[name='InputUrl']").val()==""){
		modal("会话提示框", "请选择文件!");
		return;
	}
		 load.uploadClick(function (a,b) {		
	    	if(b==100){
	    		var dataname= $("#sliceUploadsql input[name='InputUrl']").val();
	    		$('.disBtnIcon').removeAttr('data-dismiss');
	    		$(".disBtn").attr("disabled","disabled");
	    		 $.ajax({
	  		       url: "backup/retrunsql",
	  		       type: "post",
	  		       dataType: "json",
	  		       data:{
	  		    	   dataname:dataname  
	  		       },
	  		       success: function (result) {
	  		    	 if (result.status == 1) {
	  		    		 modal("会话提示框", "已恢复!"); 
	  		    	 }
	  		    	$('.disBtnIcon').attr('data-dismiss','modal');
	                $(".disBtn").removeAttr("disabled");
	  		       }
	  		 });
	    	$("#dataReturn-modal").modal('hide');
	    	$("#sliceUploadsql input[name='InputUrl']").val("");
	    	}
	    });
}