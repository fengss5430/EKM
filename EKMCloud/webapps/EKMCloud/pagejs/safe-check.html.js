$(function(){
	getSafeCheckInfo(1);
	fenPageShow();
});
$("[tnum]").elli(); //超出....
//获取列表
function getSafeCheckInfo(page){
	if (page != 0) {
        $("#page").val(page);
	   }
	//设置每页数
	var pageSize = 25;
		var url="safe/find";
	    $('#Status-table').DataTable({
	        "scrollY":'640px',
            "scrollX": true,
	        "scrollCollapse": true,
	        "paging": false,
	        "searching": true,
	        "info": false,
	        'destroy':true,
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
					} else {
						for (var i = 0; i < list.length; i++) {
							var filename = list[i].fileName;
							var fileurl = list[i].fileUrl;
							if(filename.length>30){
                                filename = list[i].fileName.substring(0,30)+"...";
                            }
                            if(fileurl.length>50){
                                fileurl = list[i].fileUrl.substring(0,50)+"...";
							}
                            list[i][0]="<span title='"+list[i].fileName+"' style='width: 240px;display: inline-block;'>"+filename+"</span>";
                            list[i][1]=list[i].userName;
							list[i][2]=list[i].fileType;
							if(list[i].operationtype==1){
								list[i][3]="删除";
							}else if(list[i].operationtype==2){
								list[i][3]="下载";
							}
							list[i][4]="<span title='"+list[i].fileUrl+"' style='width: 400px;display: inline-block;'>"+fileurl+"</span>";
							if(list[i].operationtype==1){
								list[i][5]="<span style='width: 80px;display: inline-block;text-align: center'>-</span>";
							}else if(list[i].operationtype==2){
								list[i][5]="<span style='width: 80px;display: inline-block;text-align: center'>"+list[i].downcount+"</span>";
							}
							if(list[i].deleteTime!=""||list[i].deleteTime!=null){
								list[i][6]="<span style='width: 151px;display: inline-block;'>"+list[i].deleteTime.substring(0, list[i].deleteTime.lastIndexOf("."))+"</span>";
							}else{
								list[i][6]="<span style='width: 151px;display: inline-block;'>-</span>";
							}
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
function turnPage(turnPage) {
	getSafeCheckInfo(turnPage);
}
function pagesTotal() {
	var res=0;
	$.ajax({
		url :  "safe/findCount",
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


