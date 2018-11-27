//Scroll
$('#shareTeamList').slimScroll({
    height: '115px'
});
$('#shareSelecteName').slimScroll({
    height: '80px'
});

//视图模式slimScroll
$('.grid-view').slimScroll({
    size: '7px',
    color: '#777',
    height: '100%',
    alwaysVisible:false
});

//排序 按钮切换
$('#dropList li').click(function () {
    $(this).addClass('sotrActive').siblings().removeClass('sotrActive');
});
var uploader ;
$(function () {
    filePath();
    // limitFun(); //限制权限
    var typeClass=sessionStorage.getItem('baseClass');

    if(isNaN(typeClass)){
        $('#main-content').addClass('departmentBase');
    }else{
        $('#main-content').addClass('Base'+typeClass);
    }
    if(typeClass=='1'||typeClass=='3'||typeClass=='2'||typeClass=='55'||typeClass=='66'||typeClass=='77'||typeClass=='11'||typeClass=='22'||typeClass=='13'||isNaN(typeClass)){
          docLimit(); //文档权限
    }


    $(".item-listview").on('contextmenu','.grid-view-item,.list-view-item',function(){
        $(this).addClass('item-active').siblings().removeClass('item-active');
    });

    //上传Modal
    $("#closeBtn").click(function(){
//    	var uplosding=$("#modalBody").find(".uploading");
//    	if(uplosding.length==1&&uplosding.attr("type")!="100"){
//    		modal("会话提示框", "文件正在上传，请稍等!");
//    		return;
//    	}else{
    		$("#upLoad-modal").fadeOut(500);
//    	}
    });
    $(".fadeMin").click(function(){
        $(this).addClass('hide');
        $("#fadeMax").removeClass('hide');
        $("#upLoad-modal").animate({
            height:'75'
        });
    });
    $("#fadeMax").click(function(){
        $(this).addClass('hide');
        $("#fadeMin").removeClass('hide');
        $("#upLoad-modal").animate({
            height:'200'
        });
    });
    $("#modalBody").slimScroll({
        height:'200px',
        alwaysVisible: false,
        disableFadeOut:true,
        color: '#777'
    });
});
var asd = null;
$('#dataBaseView').off('dblclick').on('dblclick', '.grid-view-item', function (e) {
    e.stopPropagation();
    fileNameClicked();
    $('.activebtn').addClass('hide');
});
// list下的双击事件
$('#listviewtable').off('dblclick').on('dblclick', '.list-view-item', function (e) {
    e.stopPropagation();
    fileNameClicked();
    $('.activebtn').addClass('hide');
});

//视图列表的切换 mainconlist = -1(thumbnail) /  1(list)
var mainconlist = "list";
function changeviews(value) {
    //先判断一下是否有传值
    if (value) {
        if(mainconlist == value){
            return;
        }else{
            //有就是列表触发的事件
            mainconlist = value;
        }
    } else {
        //没有值就是右上角触发的事件
        if (mainconlist == "thumbnail") {
            mainconlist = "list";
        }else {
            mainconlist = "thumbnail";
        }
    }
    $('#dropList li:gt(0)').removeClass('sotrActive');
    $('#dropList li').first().addClass('sotrActive');
    var e = $("#mainlist-view");
    $(".maincon").toggle();
    $(".grid-view-item,.list-view-item").removeClass("item-active");
    // listenactiveitem();
    $(e).children().hide();
    if (mainconlist == "thumbnail") {
        $(e).children().eq(0).show();
        flag = "gridView";
        getDirectoryChange(mainconlist);
    } else if (mainconlist == "list") {
        $(e).children().eq(1).show();
        flag = "listView";
        //加载数据
        getDirectoryChange(mainconlist);
    }
    $("#activebtn").addClass('hide');
    // $("#topbar").addClass('hide');
}

// /*模态框*/
$("#UploadDoc-modal").off("hidden.bs.modal");
$('#UploadDoc-modal').on('hidden.bs.modal', function () {
    $("input[name='InputUrl']").val('');
});
$("#NewFolder-modal").off("hidden.bs.modal");
$('#NewFolder-modal').on('hidden.bs.modal', function () {
    $("#inputFileName").val('');
});
sessionStorage.itemactive=false;
function addActive(){
    sessionStorage.itemactive = true;
    var asd =  setInterval(function(){
        if(sessionStorage.itemactive=="true"){
            shareModal();
            sessionStorage.itemactive = false;
        }
        clearInterval(asd);
    },100);
}
//文件列表
function fileBrowser(type, filePath, a) {
	fileDirectory(type, filePath);
	var value="";
	if(type=="55"||type=="66"||type=="77"||type=="11"||type=="22"||type=="13"){
		value=$(".nav-collapse .active").find(".menu-text").attr("value");
	}
    var url = encodeURI("data/file?path=" + filePath + "&type=" + type+ "&value=" + value);
   // var url = "data/file?path=" + filePath + "&type=" + type+ "&value=" + value;
    $('#listviewtable').DataTable({
        "destroy": true,
        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "autoWidth": false,
        "aoColumnDefs": [
            {"sWidth": "26px", "aTargets": [0]},
            {"sWidth": "", "aTargets": [1]},
            {"sWidth": "16%", "aTargets": [2]},
            {"sWidth": "24%", "aTargets": [3]}
        ],
        "ajax": {
            "url": url,
            "type": "POST",
            "dataType": "json",
            "dataSrc": function (result) {
                var data = result.data;
                if (result.status == 1) {
                    $("#listviewtable").off('click').on('click','tr',function(){
                        $(this).addClass('list-view-item');
                        $("#activebtn").removeClass('hide');
                    });

                    if (data != null) {
                        sortData(data, a);
                        for (var i = 0, ien = data.length; i < ien; i++) {
                            if (data[i].directory == true && data[i].charset == "ys") {
                                data[i][0] = "<span class='fileicon dir-small getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'></span><span class='glyphicon glyphicon-lock' style='top:6px; color:#a9a9a9; left:6px;' name='ys'></span>";
                            } else if (data[i].directory == false && data[i].charset == "ys") {
                                data[i][0] = "<span class='getAttr' filesize='"+data[i].size+"' path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'><img src='images/small-icon/" + deal(data[i].name) + ".png' class='fileicon'/></span><span class='glyphicon glyphicon-lock' style='top:6px; color:#a9a9a9; left:6px;' name='ys'></span>";
                            } else if (data[i].directory == true) {
                                data[i][0] = "<span class='fileicon dir-small getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'></span>";
                            } else if (data[i].directory == false) {
                                data[i][0] = "<span class='getAttr' filesize='"+data[i].size+"' path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'><img src='images/small-icon/" + deal(data[i].name) + ".png' class='fileicon'/></span>";
                            }

                            var filename="";
                            if(data[i].name.length>30){
           					 	filename = data[i].name.substring(0, 30)+" ...";
           				 	}else{
           				 		filename = data[i].name;
           				 	}
                            if (type == 2 && $("#urlbar").find(".dir").text() == "" && $("#teamForm option").size()>1) {
                                data[i][1] = '<a href="javascript:void(0);" class="first_list" style="text-decoration:none">' + filename + '</a>';
                            } else {
                                data[i][1] = '<a href="javascript:void(0);" class="second_list"  style="text-decoration:none">' + filename + '</a><div class="operate" style="float: right;">' +
									'<a  class="typeIcon hide" href="javascript:;" powname="1"  onmousedown="stopProp(event);" onclick="addActive();"  style="text-decoration:none"><i class="fa fa-share-alt" style="color:#dd5d5d;font-size: 18px;"></i></a>' +
									'<a  class="typeIcon hide" href="javascript:;" powname="2"  onmousedown="stopProp(event);" onclick="downModal();" style="margin-left:12px;"><i class="fa fa-download" style="color:#dd5d5d;font-size: 18px;"></i></a>' +
									'<div class="btn-group setICon hide"  onclick="lisType(this);" style="top:-2px">' +
									'<a  data-toggle="dropdown" href="javascript:;" style="margin-left:12px;"><i class="fa fa-cogs" style="color:#dd5d5d;font-size: 18px;"></i></a>' +
									'<ul class="dropdown-menu" style="min-width: 0;">' +
									'<li>' +
									'<a class="typeIcon hide" style="line-height: 30px" onclick="moveModal();" powname="5" href="javascript:;">移动</a>' +
									'</li>' +
									'<li>' +
									'<a  class="typeIcon hide" style="line-height: 30px" href="javascript:;"  powname="3" onclick="copyModal();">复制</a>' +
									'</li>' +
									'<li>' +
									'<a  class="typeIcon hide" style="line-height: 30px" href="javascript:;"  powname="4" onclick="reNameActive();">重命名</a>' +
									'</li>' +
									'<li>' +
									'<a  class="typeIcon hide" style="line-height: 30px" href="javascript:;"  powname="6" onclick="delModal();">删除</a>' +
									'</li>' +
									'</ul>' +
									'</div>' +
									'<a class="operateclose" href="javascript:;" onclick="$(this).parent().hide();"><i class="fa fa-times-circle-o"></i></a></div>';
                            }
                            if (data[i].directory) {
                                data[i][2] = "-";
                            } else {
                                data[i][2] = colFileSize(data[i].size);
                            }
                            data[i][3] = format(data[i].lastUpdated);
                        }
                    } else {
                        data = [];
                    }
                }
                if (result.status == -1) {
                    modal("", "", -1);
                }
                if (result.status == 0) {
                    data = [];
                }
                return data;
            }
        }
    });
    $("#listviewtable").off("one").one("draw.dt", function () {
//        if(typeof($(this).attr("role")) != "undefined"){}
            $("#listviewtable tbody tr").addClass('list-view-item');
    		$('.Base2 .second_list').parents('tr').addClass('second_list_er');
    		$('.Base2 .first_list').parents('tr').addClass('first_list_fir');
    		//tr添加属性
    		var trLength = $(".list-view-item");
    		for (var i = 0; i < trLength.length; i++) {
    			var path = trLength.eq(i).find(".getAttr").attr("path");
    			var value = trLength.eq(i).find(".getAttr").attr("value");
    			var name = trLength.eq(i).find(".getAttr").attr("name");
    			var power = trLength.eq(i).find(".getAttr").attr("power");
    			var type1 = trLength.eq(i).find(".getAttr").attr("type");
    			var filesize = trLength.eq(i).find(".getAttr").attr("filesize");
    			trLength.eq(i).attr("path", path);
    			trLength.eq(i).attr("value", value);
    			trLength.eq(i).attr("name", name);
    			trLength.eq(i).attr("power", power);
    			trLength.eq(i).attr("type", type1);
    			trLength.eq(i).attr("filesize", filesize);
    			trLength.eq(i).attr("title", value);
    		}

        //列表全选功能
        $(".dataTables_scrollHead").width("100%");
//        $("#topbar").find('#MaxTwo button').removeClass('hide');

        var type = $(".active").find("a").attr("type");
        var powerid = $(".active").find("a").attr("powerid"); //所有a权限type值
        if(typeof(powerid) != "undefined"){
        	var arr = new Array();
            arr = powerid.split(',');
            var btnType = $("#MaxTwo").find(".typeClass");  //所有button.typeClass的type值
    		if(type == 2 && $("#urlbar").find(".dir").text() == "" && $("#teamForm option").size()>1){
                $(".activebtn").addClass('hide');
                $("#topbar").find('#MaxTwo button').addClass('hide');
                App.myDatemouse();
            }else{
                for (var i = 0; i < btnType.length; i++) { // abuton.typeClass的type值
                    for (var k = 0; k < arr.length; k++) { //powerid权限值
                        if (btnType.eq(i) != "undefined") {
                            if (arr[k] == btnType.eq(i).attr("type")) {
                                btnType.eq(i).removeClass('hide');
                            }
                        }
                    }

                }
                App.mouse();
            }
        }        
    });
}

function getCurrentPath() {
    var index = 1;
    var arr = [];
    while (true) {
        if ($("#urlbar").find("li").find("a[name='" + index + "']").find("span").text() == "") {
            break;
        }
        arr.push($("#urlbar").find("li").find("a[name='" + index + "']").find("span").attr("value"));
        index++;
    }
    var path = "";
    for (var i = 0; i < arr.length; i++) {
        path += "/" + arr[i];
    }
    return path;
}

//目录
function fileDirectory(type, path) {
	 var arr = (path + "").split("/");
	    $("#urlbar").empty();
	    var nameText = "";
	    var html = "";
	    if (type == 1) {
	        nameText = "我的资料库";
	    } else if (type == 2) {
	        nameText = "团队资料库";
	    } else if (type == 3) {
	        nameText = "公司资料库";
	    } else if (type .length >8){
	        nameText = "部门资料库";
	    } else if(type == 11){
			fileType="标准知识";
		} else if(type == 22){
			fileType="产品知识";
		} else if(type == 13){
			fileType="业务知识";
		}else if (type == 55){
	        nameText = "产品数据";
	    } else if (type == 66){
	        nameText = "技术开发协同";
	    } else if (type == 77){
	        nameText = "业务技术协同";
	    }
	    html += "<li><i class='fa fa-home' style='margin-right:5px;'></i><a href='javascript:;' onclick='returnHome();' style='text-decoration:none;'>" + nameText + "</a></li>";
	    html += '<div class="dir" style="display: inline-block;"></div>';
	    $("#urlbar").html(html);
	    var divHtml = "";
	    for (var i = 1; i < arr.length; i++) {
	        divHtml += '<li>';
	        var filename="";
	        if(type==2&&$("#teamForm option").size()>=2&&path!=""){
	        	if(i==1){
	        		var teamname = getName(arr[i]);
	        		if(teamname.length>8){
						 filename = teamname.substring(0, 8)+" ...";
					 }else{
						 filename = teamname;
					 }
	        		divHtml += "<a name='" + i + "' onclick='directoryClicked(this)' style='text-decoration:none'><span value ='" + arr[1] + "'>" + filename + "</span></a></li>";
	        	}else{
	        		if(arr[i].length>8){
						 filename = arr[i].substring(0, 8)+" ...";
					 }else{
						 filename = arr[i];
					 }
	        		divHtml += "<a name='" + i + "' onclick='directoryClicked(this)' style='text-decoration:none'><span value ='" + arr[i] + "'>" + filename + "</span></a></li>";
	        	}
	        }else{
	        	if(arr[i].length>8){
					 filename = arr[i].substring(0, 8)+" ...";
				 }else{
					 filename = arr[i];
				 }
	        	divHtml += "<a name='" + i + "' onclick='directoryClicked(this)' style='text-decoration:none'><span value ='" + arr[i] + "'>" + filename + "</span></a></li>";
	        }
	    }

	    $("#urlbar").find(".dir").html(divHtml);
//        $("#topbar").find('#MaxTwo button').removeClass('hide');
	     if(path == ""&& type == 2&&$("#teamForm option").size()>1){
             $("#topbar").find('#MaxTwo button').addClass('hide');
             // $("#MaxTwo").addClass('hide');
//             $("#activebtn").hide();
	    }else if(type == 55 || type == 66 || type == 77 ||type == 11 || type == 22 || type ==13 ){
	        if($("#toName").attr("name")==1001){
	            $('.activebtn').children().eq(8).removeClass('hide');
	        }
	    }else{
	        $("#topbar").css("visibility","visible");
	    }
	    dir($("#urlbar").find(".dir").find("li"));
	}


//返回Home
function returnHome() {
    var filePath = "";
    var type = $("#getPage").attr("type");
    //表格隐藏
    var value="";
	if(type=="55"||type=="66"||type=="77" ||type =="11" || type == "22" || type =="13"){
		value=$(".nav-collapse .active").find(".menu-text").attr("value");
	}
    if ($("#view").css("display") == 'none') {
        fileBrowser(type, filePath);
    } else {
        myDataBaseView(type, filePath,value);
    }
}

//打开文件夹
videojs.options.flash.swf = '../js/video-js.swf';
function fileNameClicked() {
	var operid=$(".active").find("a").attr("powerid");
    if(typeof(operid) == "undefined"){
    	 modal("会话提示框", "无任何操作权限或权限已删除");
         return;
    }
   if ($(".item-active").length == 0) {
       modal("会话提示框", "请选择一项");
       return;
   }
    var filesize = $(".item-active").attr("filesize");
    var isDirectory = $(".item-active").attr("name");
    var path = $(".item-active").attr("path");
    var type = $("#getPage").attr("type");
    var name = $(".item-active").attr("value");
    //   path = encodeURI(path);
    //   name = encodeURI(name);
    var username = $("#header-user").find(".username").text();
   if(operid.indexOf("7")!=-1){
    //是文件夹
	    if (isDirectory == "true") {
	        //更新文件列表
	        if ($("#view").css("display") == 'none') {
	            fileBrowser(type, path);
	        } else {
	            myDataBaseView(type, path);
	        }
	    } else {
	    	var suffix=name.substring(name.lastIndexOf(".")).toLowerCase();
	    	if(suffix==".txt"&&filesize<52428800){
	    		 $.ajax({
	                 url: "data/file/readLogInfo",
	                 type: "get",
	                 dataType: "json",
	                 data: {
	                	 filePath: path,
	                	 type:type
	                 },
	                 success: function (result) {
	                	 var sb=result.data;
	                	 $("#lookTxt-modal").modal('toggle');
	                	 $("#txtid").html(sb);
	                 }
	              });
	    		 return;
	    	}else if(suffix==".txt"&&filesize>=52428800){
	    		modal("会话提示框", "文件过大，请下载之后查看!");
	    		return;
	    	}
	    	if(suffix==".wcax"||suffix==".cax"){
	    		modal("会话提示框", "模型文件请在知识云中打开!");
	   		 return;
	    	}
	    	//解压
	    	var yasArr = [".zip", ".tar"];
	    	var ind = elementsIsExit(suffix, yasArr);
	    	if(ind==1){//要解压
	    		$("#unzip-modal").modal('show');
	    		$("#jieyaid").one("click",function(){
	    			$('.disBtnIcon').removeAttr('data-dismiss');
	    			$(".disBtn").attr("disabled","disabled");
	    			ShowLoad();
	    			$.ajax({
	                    url: "data/file/unzip",
	                    type: "POST",
	                    dataType: "json",
	                    data: {
	                   	 path: path,
	                   	 type:type,
	                   	 suffix:suffix
	                    },
	                    success: function (result) {
	                    	modal("会话提示框", "成功!");
	                    	HidenLoad();
	                    	$("#unzip-modal").modal('hide');
	                    	//刷新对应的列表数据
	                        refreshCurrentPath();
	                        $('.disBtnIcon').attr('data-dismiss','modal');
	                        $(".disBtn").removeAttr("disabled");
	                    }
	                 });
	    		});
	    		return;
	    	}

	        //不是文件夹
	        var nameArr = name.split(".");
	        if (nameArr[nameArr.length - 1] == "pdf") {
	            ShowLoad();
	            $.ajax({
	                url: "data/file/copyPDF",
	                type: "get",
	                dataType: "json",
	                data: {
	                    source: path,
	                    type: type,
	                    destination: name,
	                    userName: ""
	                },
	                success: function (result) {
	                    if (result.status == 1) {
	                        HidenLoad();
	                        $('#ChangeSrc').attr('src', encodeURI("PDF/" + username + "/" + name));
	                        if (!!window.ActiveXObject || "ActiveXObject" in window) {
	                        	
	                        } else {
	                        	$('#Pdf-modal').modal('show');
	                        }
	                    } else {
	                        HidenLoad();
	                    }
	                }
	            });
	        }
	        //office软件格式
	        var pdfArr = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "odt", "ods", "odp", "pdf"];
	        //视频文件格式
	        var flvArr = ["mpg", "wmv", "3gp", "mov", "mp4","mp3", "asf", "asx", "flv", "mpeg", "mpe", "wmv9", "rm", "rmvb", "avi"];
	        //图片文件格式
	        var picArr = ["jpg", "png", "gif", 'jpeg'];
	        var index1 = elementsIsExit(nameArr[nameArr.length - 1].toLowerCase(), pdfArr);
	        var index2 = elementsIsExit(nameArr[nameArr.length - 1].toLowerCase(), flvArr);
	        var index3 = elementsIsExit(nameArr[nameArr.length - 1].toLowerCase(), picArr);
	        if ((index1 + index2 + index3) == 0) {
	            modal("会话提示框", "暂不支持打开此类型文件!");
	            return;
	        }
	        //office文件转换成pdf
	        if (index1 == 1) {
	            ShowLoad();
	            $.ajax({
	                url: "data/file/office2PDF",
	                type: "POST",
	                dataType: "json",
	                data: {
	                    sourceFile: path,
	                    type: type,
	                    destFile: nameArr[0] + ".pdf"
	                },
	                success: function (data) {
	                    if (data == 1) {
	                    	$('#ChangeSrc').attr('src', encodeURI(pdfPath + username + "/" + nameArr[0] + ".pdf"));
	                    	 if (!!window.ActiveXObject || "ActiveXObject" in window) {
	                    		 $('#Pdf-modal').modal('hide');
	                    	 }else{
	                    		 $('#Pdf-modal').modal('show');
	                    	 }
	                        //$('#ChangeSrc').attr('src',pdfPath+username+"/"+decodeURIComponent('nameArr[0]')+".pdf");
	                        HidenLoad();
	                    } else {
	                        HidenLoad();
	//                        showLoadError();
	                    }
	                },
	                error: function () {
	                    HidenLoad();
	                    showLoadError();
	                }
	            });
	        }
	        //视频文件转换成flv
	        if (index2 == 1) {
	            ShowLoad();
	            $.ajax({
	                url: "data/file/vedio2FLV",
	                type: "POST",
	                dataType: "json",
	                data: {
	                    resourcePath: path,
	                    type: type,
	                    outFilePath: nameArr[0] + ".flv"
	                },
	                success: function (data) {
	                    if (data == 1) {
	                    	var url ='../'  + flvPath + username + '/' + nameArr[0] + '.flv';
	                        HidenLoad();
	                        $('#Video-modal').modal('show');
	                        var myPlayer =  videojs("videoBox");  //初始化视频
	                        myPlayer.src(url);  //重置video的src
	                        myPlayer.load(url);  //使video重新加载
	                    } else {
	                        HidenLoad();
	                        showLoadError();
	                    }
	                },
	                error: function () {
	                    HidenLoad();
	                    showLoadError();
	                }
	            });
	        }
	        //打开图片
	        if (index3 == 1) {
	            ShowLoad();
	            $.ajax({
	                url: "data/file/copyPDF",
	                type: "get",
	                dataType: "json",
	                data: {
	                    source: path,
	                    type: type,
	                    destination: name,
	                    userName: ""
	                },
	                success: function (result) {
	                    if (result.status == 1) {
	                        $('#PicType-modal').modal('toggle');
	                        $("#TypeUrl").attr('src', encodeURI(pdfPath + username + "/" + name));
	                        HidenLoad();
	                    } else {
	                        HidenLoad();
	                        showLoadError();
	                    }
	                }
	            });
	        }
	    }
	}
}

//元素是否存在
function elementsIsExit(elements, arr) {
    var index = '';
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == elements) {
            index = 1;
            break;
        } else {
            index = 0;
        }
    }
    return index;
}

//目录缩写
function dir(cl) {
    var dirLength = cl.length;
    if (dirLength >= 5) {
        cl.hide();
        cl.eq(0).show();
        cl.eq(dirLength - 3).show().find('a').find('span').html('...');
        cl.eq(dirLength - 1).show();
        cl.eq(dirLength - 2).show();
    } else if (dirLength == 4) {
        cl.hide();
        cl.eq(0).show();
        cl.eq(1).show().find('a').find('span').html('...');
        cl.eq(dirLength - 1).show();
    } else {
        cl.show();
    }
}

//判断使用的图片
function deal(name) {
    var suffix = ['ai', 'bt', 'html', 'js', 'css', 'java', 'xml', 'ttf', 'txt', 'mmap', 'pdf', 'ppt', 'pptx', 'psd', 'xmind', 'rar', 'zip','tar', 'doc', 'docx', 'xls', 'xlsx'];
    var vedio = ['asx', 'asf', 'mpg', 'wmv', '3gp', 'mp4', 'mov', 'avi', 'flv', 'rm','ra','ram','rt', 'wmp', 'flv','dat','mlv','mpe','rmvb'];
    var picture = ["png", "jpg", "gif", "jpeg"];
    var radio = ["mp1", "mp2", "mp3", 'ram', 'mid','wav','ogg','m4a'];
    var picArr = [suffix, vedio, picture, radio];
    point = name.lastIndexOf(".");
    var type = name.substr(point);
    var str = type.replace('.', '');
    str = str.toLowerCase();
    for (var i = 0; i < picArr.length; i++) {
        for (var j = 0; j < picArr[i].length; j++) {
            if (str == picArr[i][j]) {
                if (i == 0) {
                    return str;
                }
                if (i == 1) {
                    return "mp4";
                }
                if (i == 2) {
                    return "picture";
                }
                if (i == 3) {
                    return "mp3";
                }
            }
        }
    }
    for (var i = 0; i < suffix.length; i++) {
        if (str == suffix[i]) {
            return str;
        }
    }
}

/*对象属性排序*/
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    };
}

//我的资料库(视图列表 )
function myDataBaseView(type, filePath, a) {
	var value="";
	if(type=="55"||type=="66"||type=="77" ||type =="11" || type == "22" || type =="13"){
		value=$(".nav-collapse .active").find(".menu-text").attr("value");
	}
    fileDirectory(type, filePath);
    $.ajax({
       url: encodeURI("data/file?path=" + filePath + "&type=" + type+ "&value=" + value),
    	// url: "data/file?path=" + filePath + "&type=" + type+ "&value=" + value,
        type: "POST",
        dataType: "json",
        success: function (result) {
            var data = result.data;
            sortData(data, a);
            directory(data);
            $("[tnum]").elli();
//            $("#topbar").find('#MaxTwo button').removeClass('hide');

            var type = $(".active").find("a").attr("type");
            var powerid = $(".active").find("a").attr("powerid"); //所有a权限type值
            var arr = new Array();
            arr = powerid.split(',');
            var btnType = $("#MaxTwo").find(".typeClass");  //所有button.typeClass的type值

            //改权限后
			if(type == 2 && $("#urlbar").find(".dir").text() == "" && $("#teamForm option").size()>1){
                $("#topbar").find('#MaxTwo button').addClass('hide');
                App.myDatemouse();
            }else{
                for (var i = 0; i < btnType.length; i++) { // abuton.typeClass的type值
                    for (var k = 0; k < arr.length; k++) { //powerid权限值
                        if (btnType.eq(i) != "undefined") {
                            if (arr[k] == btnType.eq(i).attr("type")) {
                                btnType.eq(i).removeClass('hide');
                            }
                        }
                    }

                }
                App.mouse();
            }
            //改权限前
            // if(type == 2 && $("#urlbar").find(".dir").text() == "" && $("#teamForm option").size()>1){
            //     $("#topbar").find('#MaxTwo button').addClass('hide');
            //     App.myDatemouse();
            // }else{
            //     App.mouse();
            // }

            if (result.status == 0) {

            }
        }
    });
}

//资料库搜索
function searchKey() {
    var keyWordName = $('#keyWord').val();
    var keyVaue = $('#dataBaseView').find('.grid-view-item');
    var keyVaueTbody = $('#listviewtable').find('tbody').find('tr');
    if ($('#keyWord').parent().next().next().find('.fa-th-large').css("display") == 'none') {
        if (keyWordName == '') {
            keyVaueTbody.show();
        } else {
            for (var i = 0; i < keyVaueTbody.length; i++) {
                if (keyVaueTbody.eq(i).attr('value').indexOf(keyWordName) != -1) {
                    keyVaueTbody.eq(i).show();
                } else {
                    keyVaueTbody.eq(i).hide();
                }
            }
        }
    } else {
        if (keyWordName == '') {
            keyVaue.show();
        } else {
            for (var i = 0; i < keyVaue.length; i++) {
                if (keyVaue.eq(i).attr('value').indexOf(keyWordName) != -1) {
                    keyVaue.eq(i).show();
                } else {
                    keyVaue.eq(i).hide();
                }
            }
        }
    }
}

$('#keyWord').bind('input propertychange', function () {
    searchKey();
});

/*排序*/
function sortData(data, a) {
    if (a == 0) {
        /*文件名*/
        data.sort(compare('name'));
    } else if (a == 1) {
        /*大小*/
        data.sort(compare('size'));
    } else if (a == 2) {
        /*时间*/
        data.sort(compare('lastUpdated'));
    }
}

function sortBtn(e) {
    var path = getCurrentPath();
    var type = $("#getPage").attr("type");
    var a = e;
    //表格隐藏
    if ($("#view").css("display") == 'none') {
        fileBrowser(type, path, a);
    } else {
        myDataBaseView(type, path, a);
    }
}

function directory(data) {
    var html = "";
    var type= $("#database .active").find("a").attr("type");
    if (data != null) {
        for (var i = 0, ien = data.length; i < ien; i++) {
            if(type==2&&data[i].charset=='true'){
                html += '<div class="grid-view-item first_item" fileSize="' + data[i].size + '" fileUpdateTime="' + data[i].lastUpdated + '" value="' + data[i].name + '" path="' + data[i].path + '" name="' + data[i].directory + '" type="'+data[i].teamname+'" power="'+data[i].power+'">';
            }else{
                html += '<div class="grid-view-item second_item" fileSize="' + data[i].size + '" fileUpdateTime="' + data[i].lastUpdated + '" value="' + data[i].name + '" path="' + data[i].path + '" name="' + data[i].directory + '" type="'+data[i].teamname+'" power="'+data[i].power+'">';
            }
            html += '<div class="fileicon fileicon-sys-l-code">';
            if (data[i].directory == true) {
                html += '<img src="images/big-icon/folder.png" class="">';
            } else {
                html += '<img src="images/big-icon/' + deal(data[i].name) + '.png" class="">';
            }
            html += '</div>';
            html += '<div class="file-name">';
            var filename="";
            if(data[i].name.length>8){
				 	filename = data[i].name.substring(0, 8)+" ...";
			 	}else{
			 		filename = data[i].name;
			 	}
            html += '<a class="filename" title=" '+data[i].name+' "  style="text-decoration:none">' + filename + '</a>';
            html += '</div>';
            html += '<span class="checkbox"> <span class="icon circle-icon"></span><span class="icon checkgridsmall"></span>';
            html += '</span>';
            if (data[i].charset == "ys") {
                html += '<span class="glyphicon glyphicon-lock" style="left:50px; color:#a9a9a9;" name="ys"></span>';
            }
            html += '</div>';
        }
    }
    $("#dataBaseView").html(html);
}
function docLimit(){
    context.init({
        fadeSpeed:200,
        filter:function ($obj) {},
        above:'auto',
        preventDoubleContext:false,
        compress:true,
        createMenu:function(){

            var operid=$(".active").find('a').attr('powerid'); //权限value

        	if( operid.indexOf("8")==-1){
                if( $(".dropdown-context").eq(0).find("li").eq(9).find('a').attr("powname")=="8") {
                    $(".dropdown-context").eq(0).find("li").eq(9).find('a').attr("powname","8").css({
                        color:"#ccc",
                        cursor:"default",
                        background:"#f4f4f4",
                        position:"relative"
                    });
                    $(".dropdown-context").eq(0).find("li").eq(9).click(function(){ return false; })
                }

                 //    $(".item-listview").find("ul li a").attr("powname","8").css({
                 //    color:"#ccc",
                 //    cursor:"default",
                 //    background:"#f4f4f4",
                 //    position:"relative"
				// });
			}
            // $("#topbar").find('.typeClass').removeClass('hide');

            if(typeof(operid) == "undefined"){
                return ;
            }
            var operpowerids = [];
            operpowerids = operid.split(",");
            // var arr3= [];
            var arr2= [];
            //left Start
            var types = $("#topbar").find('.typeClass');
            for(var i=0;i<types.length;i++){
                for(var j=0;j<operpowerids.length;j++){
                	if(operpowerids[j] == types.eq(i).attr("type")){
                        arr2.push(types.eq(i));
					}
				}
			}
            for(var i=0;i< arr2.length;i++){   //arr2显示
                arr2[i].removeClass('hide');
			}
            //left End

			//right Start
            var allLi=arguments[2].find("li");
            var powr = $(".dropdown-context").eq(3).find("a");
            var arr5= [];
            //left start value
            for(var j=0;j<powr.length;j++){
            	var count=0;
                for(var i=0;i<operpowerids.length;i++){
                    if(operpowerids[i] == powr.eq(j).attr("powname")){  //右键需要显示
						count++;
                    }
                }
                if(count==0){
                	arr5.push(powr.eq(j).attr("powname"));
				}
            }
            var arrs5="";
            if(arr5.length>0){
                for(var i=0;i< arr5.length;i++){
                    arrs5+=arr5[i]+",";
                    var div = document.createElement("div");
                    div = $(div);
                    div.addClass("info1");
                    div.css({
                        position:"absolute",
                        width:"100%",
                        height:"100%",
                        left:"0",
                        top:"0",
                        zIndex:"100"
                    });
                    $(allLi).find('a[powname="'+arr5[i]+'"]').css({
                        color:"#ccc",
                        cursor:"default",
                        background:"#f4f4f4",
                        position:"relative"
                    });

                    $(allLi).find('a[powname="'+arr5[i]+'"]').off().click(function(e){  //禁止点击
                        return false;
                    });
                }
                if(arrs5.indexOf("7")!=-1){
                    $(allLi).find('a[powname="7"]').css({
                        color:"#ccc",
                        cursor:"default",
                        background:"#f4f4f4",
                        position:"relative"
                    });
                    $(allLi).find('a[powname="7"]').off().click(function(e){
                        e.preventDefault();
                        fileNameClicked();
                    });
                }
            }
			var leftype = $(".active").find("a").attr("type");
            if(operid.indexOf("8")!=-1 || operid.indexOf("10")!=-1){
                if(leftype == 2 && $("#urlbar").find(".dir").text() == "" && $("#teamForm option").size()>1){
                    $("#topbar").find('.typeClass').eq(0).addClass("hide");
                    $("#topbar").find('.typeClass').eq(1).addClass("hide");
                }
			}
        }
    });
}
// function docLimit(){
//     context.init({
//         fadeSpeed:200,
//         filter:function ($obj) {},
//         above:'auto',
//         preventDoubleContext:false,
//         compress:true,
//         createMenu:function(){
//             $(".activebtn").children().removeClass('gray');
//             var isDirectory = $(".item-active").attr("name");
//             var operid=$(this).attr("power");
//             if(typeof(operid) == "undefined"){
//                 return ;
//             }
//             var operpowerids = [];
//             operpowerids = operid.split(",");
//             var arr3= [];
//             var arr2= [];
//             //上边按钮组
//             var types = $('#activebtn').find("a");
//             for(var i=0;i<types.length;i++){
//             	// console.log('types-length'+types.length);
//                 if(types.eq(i).attr("type")){
//                     arr2.push(types.eq(i).attr("type"));
//                 }
//             }
//             for(var i=0;i< arr2.length;i++){
//                 //1-分享 2-下载 6,7-删除 3-复制到 4-重命名 5-移动到
//                 var count=0;
//                 for(var j=0;j<operpowerids.length;j++){
//                     var strb=operpowerids[j];
//                     if(arr2[i].length>1){
//                     	//true:文件夹 6     false文件: 7
//                     	if(isDirectory&&strb=="6"){
//                     		count++;
//                     	}
//                     	if(isDirectory=="false"&&strb=="7"){
//                     		count++;
//                     	}
//                     }else if(strb==arr2[i]){
//                     	count++;
//                     }
//                 }
//                 if(count==0){//表示数组1的这个值没有重复的，放到返回列表中
//                     arr3.push(arr2[i]);
//                 }
//             }
//             if(arr3.length>0){
// 	            for(var i=0;i< arr3.length;i++){
// 	                $("#topbar").find("a[type='"+arr3[i]+"']").addClass('gray');
// 	                // $("#topbar").find("a[type='"+arr3[i]+"']").removeAttr("href");
// 	            }
//             }
//             var allLi=arguments[2].find("li");
//             var arr4=[];
//             var powr = $(".dropdown-context").eq(3).find("a");
//             for(var i=0;i<powr.length;i++){
//                 arr4.push(powr.eq(i).attr("powname"));
//             }
//             var arr5= [];
//             //上边按钮组
  /*          for(var i=0;i< arr4.length;i++){
                var count=0;
                for(var j=0;j<operpowerids.length;j++){
                    var strb=operpowerids[j];
                    if(arr4[i].length>1){
                    	//true:文件夹 6     false文件: 7
                    	if(isDirectory&&strb=="6"){
                    		count++;
                    	}
                    	if(isDirectory=="false"&&strb=="7"){
                    		count++;
                    	}
                    }else if(strb==arr4[i]){
                    	count++;
                    }
                }
                if(count==0){//表示数组1的这个值没有重复的，放到返回列表中
                    arr5.push(arr4[i]);
                }
            }*/
//             if($("#getPage").attr("type")!=1){
//             	 $(allLi).find('a[powname="6,7"]').css({
//                      color:"#333333",
//                      cursor:"pointer",
//                      background:"#f4f4f4",
//                      position:"relative"
//                  });
//                  $(allLi).find('a[powname="6,7"]').off().click(function(e){  //禁止点击
//                      e.preventDefault();
//                      delModal();
//                  });
//             }
//             var arrs5="";
//             if(arr5.length>0){
//             	for(var i=0;i< arr5.length;i++){
//             		arrs5+=arr5[i]+",";
//             		var div = document.createElement("div");
//             		div = $(div);
//             		div.addClass("info1");
//             		div.css({
//             			position:"absolute",
//             			width:"100%",
//             			height:"100%",
//             			left:"0",
//             			top:"0",
//             			zIndex:"100"
//             		});
//                     $(allLi).find('a[powname="'+arr5[i]+'"]').css({
//                         color:"#ccc",
//                         cursor:"default",
//                         background:"#f4f4f4",
//                         position:"relative"
//                     });
//             		$(allLi).find('a[powname="'+arr5[i]+'"]').off().click(function(e){  //禁止点击
//                        return false;
//                     });
//             	}
//             	if(arrs5.indexOf("8")!=-1){
//             		 $(allLi).find('a[powname="8"]').css({
//                          color:"#ccc",
//                          cursor:"default",
//                          background:"#f4f4f4",
//                          position:"relative"
//                      });
//                     $(allLi).find('a[powname="8"]').off().click(function(e){
//                         e.preventDefault();
//                         fileNameClicked();
//                     });
//             	}
//             }
//             /*读写权限右键*/
//             var type=$(this).attr("type");
//             if(type==null){
//             	return;
//             }
//             if(type==1){
//                 // alert("1++++++只看不删");
//                 $("#topbar").find('span.activebtn').children().eq(2).addClass('gray');
//                 $(allLi).find('a[powname="6,7"]').css({
//                     color:"#ccc",
//                     cursor:"default",
//                     background:"#f4f4f4",
//                 });
//                 $(allLi).find('a[powname="6,7"]').off().click(function(){  //禁止点击
//                     return false;
//                 });
//                 // 只看不删除
//                 $(allLi).find('a[powname="8"]').css({
//                     cursor:"pointer",
//                     position:"relative"
//                 });
//                 $(allLi).find('a[powname="8"]').off().click(function(e){  //禁止点击
//                     e.preventDefault();
//                     fileNameClicked();
//                 });
//                 $(allLi).find('a[powname="8"]').mouseenter(function(){
//                     $(allLi).find('a[powname="8"]').css({background:"#0081c2",color:"#fff"})
//                 }).mouseout(function(){
//                     $(allLi).find('a[powname="8"]').css({background:"#f4f4f4",color:"#333"})
//                 });
//             }else if(type==2){
//                 // alert("2++++++只删不看");
//                 $("#topbar").find('span.activebtn').children().eq(2).removeClass('gray');
//                 // 只删除不看
//                 $(allLi).find('a[powname="6,7"]').css({
//                     color:"#333333",
//                     cursor:"pointer",
//                     background:"#f4f4f4",
//                     position:"relative"
//                 });
//                 $(allLi).find('a[powname="6,7"]').off().click(function(e){  //禁止点击
//                     e.preventDefault();
//                     delModal();
//                 });
//                 $(allLi).find('a[powname="6,7"]').mouseenter(function(){
//                     $(allLi).find('a[powname="6,7"]').css({background:"#0081c2",color:"#fff"})
//                 }).mouseout(function(){
//                     $(allLi).find('a[powname="6,7"]').css({background:"",color:""})
//                 });
//                 $(allLi).find('a[powname="8"]').css({
//                     color:"#ccc",
//                     cursor:"default",
//                     background:"#f4f4f4",
//                     position:"relative"
//                 });
//                 $(allLi).find('a[powname="8"]').click(function(){  //禁止点击
//                     return false;
//                 });
//                 $(allLi).find('a[powname="8"]').mouseenter(function(){
//                     $(allLi).find('a[powname="8"]').css({background:"#f4f4f4",color:"#ccc"});
//                 }).mouseout(function(){
//                     $(allLi).find('a[powname="8"]').css({background:"#f4f4f4",color:"#ccc"});
//                 });
//             }else if(type==3){
//                 // alert("3++++++不看不删");
//                 $("#topbar").find('span.activebtn').children().eq(2).addClass('gray');
//                 $(allLi).find('a[powname="6,7"]').css({
//                     color:"#ccc",
//                     cursor:"default",
//                     background:"#f4f4f4",
//                     position:"relative"
//                 });
//                 $(allLi).find('a[powname="6,7"]').off().click(function(){  //禁止点击
//                     return false;
//                 });
//                 $(allLi).find('a[powname="8"]').css({
//                     color:"#ccc",
//                     cursor:"default",
//                     background:"#f4f4f4",
//                     position:"relative"
//                 });
//                 $(allLi).find('a[powname="8"]').click(function(){  //禁止点击
//                     return false;
//                 });
//             }
//         }
//     });
// }
// //限制权限
// function limitFun(){
//     $(".activebtn").children().removeClass('gray');
//     $('.maincon').on('click','.grid-view-item,.list-view-item',function(){
//     	$(".activebtn").children().removeClass('gray');
//     	var isDirectory = $(".item-active").attr("name");
//         var type=$(this).attr("type");
//         var operid=$(this).attr("power");
//         if(typeof(operid) == "undefined"){
//             return ;
//         }
//         var operpowerids = [];
//         operpowerids = operid.split(",");
//         var arr3= [];
//         var arr2= [];
//         //上边按钮组
//         var types = $('#activebtn').find("a");
//         for(var i=0;i<types.length;i++){
//             if(types.eq(i).attr("type")){
//                 arr2.push(types.eq(i).attr("type"));
//             }
//         }
//         for(var i=0;i< arr2.length;i++){
//             var count=0;
//             for(var j=0;j<operpowerids.length;j++){
//                 var strb=operpowerids[j];
//                 if(arr2[i].length>1){
//                 	//true:文件夹 6     false文件: 7
//                 	if(isDirectory&&strb=="6"){
//                 		count++;
//                 	}
//                 	if(isDirectory=="false"&&strb=="7"){
//                 		count++;
//                 	}
//                 }else if(strb==arr2[i]){
//                 	count++;
//                 }
//             }
//             if(count==0){//表示数组1的这个值没有重复的，放到返回列表中
//                 arr3.push(arr2[i]);
//             }
//         }
//         if(arr3.length>0){
//         	for(var i=0;i< arr3.length;i++){
//         		$("#topbar").find("a[type='"+arr3[i]+"']").addClass('gray');
//         		$("#topbar").find("a[type='"+arr3[i]+"']").removeAttr("href");
//         	}
//         }
//         if(type==1||type==3){
//         	 $("#topbar").find('span.activebtn').children().eq(2).addClass('gray');
//         }else if(type==2&&$("#topbar").find('span.activebtn').children().eq(2).hasClass('gray')){
//         	 $("#topbar").find('span.activebtn').children().eq(2).removeClass('gray');
//         }
//     });
// }

//切换列表模式-dropdown-menu-权限设置
function lisType(e){
	// e.stopPropagation();
     var lisTypes = $('#topbar').find('.gray');
     var dropMenu = $(e).find('ul li');
        for(var i=0;i<lisTypes.length;i++){
            for(var q=0;q<dropMenu.length;q++){
                if( lisTypes.eq(i).attr('type') ==  dropMenu.eq(q).find('a').attr('powname')){
                    dropMenu.eq(q).find('a').addClass('lisGray');
                }
            }
        }
      //悬浮设置
     // $(e).find('.dropdown-menu').toggle();
    return false;

};

//本路径刷新
function refreshCurrentPath() {
    var path = getCurrentPath();
    var type = $("#getPage").attr("type");
    //表格隐藏
    if ($("#view").css("display") == 'none') {
        fileBrowser(type, path);
    } else {
        myDataBaseView(type, path);
    }
}

//创建文件夹
function createFile() {
	var filePath ="";
    var type = $("#getPage").attr("type");
    var teamsize=$("#teamForm option").size();
    var teamname=$("#teamForm option").first().attr("name");
    if (type == "") {
        modal("会话提示框", "请先加入部门！");
        $("#NewFolder-modal").modal("hide");
        return;
    }
    //验证
    var fileName = $("#inputFileName").val();
    if(teamsize==1&&type==2){
    	if(getCurrentPath()==""){
    		filePath = getCurrentPath() + "/"+teamname+ "/"+ fileName;
    	}else{
    		filePath = getCurrentPath() + "/"+ fileName;
    	}
    }else{
    	filePath = getCurrentPath() + "/" + fileName;
    }
    var reg = /^[_.\w\u4E00-\u9FA5]+$/;
    if (fileName == "" || fileName.length == 0) {
        modal("会话提示框", "文件名不能为空");
        return;
    }
    if (fileName.length<1 || fileName.length>20) {
        modal("会话提示框", "文件名称长度在1~20位之间");
        return;
    }
    if (!reg.test(fileName)) {
        modal("会话提示框", "文件名只能包含汉字,英文,数字和下划线");
        return;
    }
    //var url =encodeURI("data/file/create?path="+filePath+"&directory=true&type="+type);
    $('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
    $.ajax({
        url: "data/file/create",
        type: "post",
        dataType: "json",
        data: {
            path: filePath,
            directory: true,
            type: type
        },
        success: function (result) {
            if (result.status == 1) {
                //是否成功信息
                modal("会话提示框", "创建成功");
                //清空创建弹窗的input值
                $("#inputFileName").val("");
                //关闭创建弹窗
                $("#NewFolder-modal").modal("hide");
                //刷新对应的列表数据
                refreshCurrentPath();
            }
            if (result.status == 0) {
                modal("会话提示框", "创建失败");
            }
            $('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
        }
    });
}

//下载
function download() {
  //验证是否选中
    var checkFile = $(".item-active");
    if(checkFile.length==1){
    	var filesize=checkFile.attr("filesize");
        if(filesize>5*1024*1024*1024){
        	modal("会话提示框", "下载文件不能超过5G");
            return;
        }
    }else if(checkFile.length>1){
    	var filesizes=0;
    	for (var i = 0; i < checkFile.length; i++) {
            filesizes+=parseInt(checkFile.eq(i).attr("filesize"));
        }
    	if(filesizes>5*1024*1024*1024){
        	modal("会话提示框", "下载文件不能超过5G");
            return;
        }
    }

    if (checkFile.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    var type = $("#getPage").attr("type");
	 var count=downcount();
	    var emailset=findSetMailMess();
		 if(emailset==null){
			 modal("会话提示框", "请先设置邮箱信息");
			 return;
		 }else{
			 if(count!=0&&count%emailset.setdowncount==0){
			    	sendMails(emailset);
				}
		 }

    //选择一个文件
    if (checkFile.length == 1) {
        var sourceFileName = checkFile.attr("path");
        //如果是文件夹
        if (checkFile.attr("name") == "true") {
            //压缩打开
        	ShowLoad();
            $.ajax({
                url: "data/file/compress",
                type: "post",
                dataType: "json",
                data: {
                    source: sourceFileName,
                    target: "/" + fileNameDate + ".zip",
                    type: "zip",
                    type1: type
                },
                success: function (result) {
                	HidenLoad();
                    if (result.status == 1) {
                        if (!!window.ActiveXObject || "ActiveXObject" in window) {
                            window.location.href = "data/file/download?path=" + fileNameDate + ".zip&type=" + type + "&isCompress=" + true;
                        } else {
                            window.open("data/file/download?path=" + fileNameDate + ".zip&type=" + type + "&isCompress=" + true);
                        }
                    }
                    if (result.status == 0) {
                        modal("会话提示框", "下载失败");
                    }
                }
            });
        } else {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
//                window.location.href = "data/file/download?path=" + encodeURI(sourceFileName) + "&type=" + type + "&isCompress=" + false;
            	window.open = "data/file/download?path=" + zhuan(sourceFileName) + "&type=" + type + "&isCompress=" + false;
            } else {
//                window.open("data/file/download?path=" + encodeURI(sourceFileName) + "&type=" + type + "&isCompress=" + false);
                window.open("data/file/download?path=" + zhuan(sourceFileName) + "&type=" + type + "&isCompress=" + false);
            }
        }
    }

    //多个文件
    if (checkFile.length > 1) {
        var sourceFileName = [];
        for (var i = 0; i < checkFile.length; i++) {
            sourceFileName.push(checkFile.eq(i).attr("path"));
        }
        ShowLoad();
        $.ajax({
            url: "data/file/compress",
            type: "post",
            dataType: "json",
            data: {
                source: sourceFileName.join(":"),
                target: "/" + fileNameDate + ".zip",
                type: "zip",
                type1: type
            },
            success: function (result) {
            	HidenLoad();
                if (result.status == 1) {
                    window.open("data/file/download?path=/" + fileNameDate + ".zip&type=" + type + "&isCompress=" + true);
                }
                if (result.status == 0) {
                    modal("会话提示框", "下载失败");
                }
            }
        });
    }
    $("#down-modal").modal("hide");
}

function sendMails(e) {
	var mailServerHost=e.mailServerHost;
	var mailServerPort=e.mailServerPort;
	var fromAddress=e.fromAddress;
	var userName=e.userName;
	var password=e.password;
	var isSsl = e.sslType;
	var count=downcount();
	var name=$("#toName").html();
	var list=findToNameAdrr();
	for (var i = 0; i < list.length; i++) {
		var toAddress=list[i].emailadress;
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
				"count":count,
				"name":name
			},
			dataType : "json",
			success : function(data) {
			}
		});
	}
	alert("邮件已发送，请到邮箱查看。");
}
//查询发送配置信息
function findSetMailMess(){
	var emailset=null;
	$.ajax({
        url: "email/findSetMailMess",
        type: "post",
        dataType: "json",
        async:false,
        success: function (result) {
        	 if (result.status == 1) {
        		 emailset=result.data;
        	 }
        }
    });
	return emailset;
}
//查询发送人地址
function findToNameAdrr(){
	var list=null;
	$.ajax({
        url: "email/findToNameAdrr",
        type: "post",
        dataType: "json",
        async:false,
        success: function (result) {
        	 if (result.status == 1) {
        		 list=result.data;
        	 }
        }
    });
	return list;
}
//查询当前用户下载量
function downcount(){
	var count=0;
	$.ajax({
        url: "safe/findDownCount",
        type: "post",
        dataType: "json",
        async:false,
        success: function (result) {
        	 if (result.status == 1) {
        		 count=result.data;
        	 }else if(result.status == 0){
        		 count=0;
        	 }
        }
    });
	return count;
}
//删除文件
function deleteFileInMove() {
//	var role=$("#toName").attr("name");
	var type = $("#getPage").attr("type");
	   //验证(至少选择一个)
    var fileLength = $(".item-active");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
  //如果都有就走下边，否则获取是否为文件夹
    var filePath = new Array();
    for (var i = 0; i < fileLength.length; i++) {
    	filePath.push(fileLength.eq(i).attr("path"));
    }
    ShowLoad();
    $('.disBtnIcon').removeAttr('data-dismiss');
    $(".disBtn").attr("disabled","disabled");
        $.ajax({
            type: "get",
            dataType: "json",
            url: "data/file/delete",
            data: {
                path: filePath.join(","),
                type: type
            },
            success: function (result) {
            	HidenLoad();
            	$('.disBtnIcon').attr('data-dismiss','modal');
            	$(".disBtn").removeAttr("disabled");
                if (result.status == 1) {
                    modal("会话提示框", "删除成功");
                    $("#del-modal").modal("hide");
                    //刷新对应的列表
                    refreshCurrentPath();
                    memory();
                }
                if (result.status == 0) {
                    modal("会话提示框", "删除失败");
                }
            }
        });
    }

//不同页面的fileName
function filePath() {
	var teamid=findTeam();
	var type = $("#getPage").attr("type");
	if(type==""){
		modal("会话提示框","请先加入部门！");
	}
	if(type=="2"&&teamid==""){
		modal("会话提示框","请先加入团队！");
	}
	var filepath = "";
	//表格隐藏
	if($("#view").css("display") == 'none') {
		fileBrowser(type,filepath);
	} else {
		myDataBaseView(type,filepath);
	}
}

//获取目录切换
function getDirectoryChange(value) {
    var type = $("#getPage").attr("type");
    var filepath = getCurrentPath();
    if (value == "list") {
        fileBrowser(type, filepath);
    }
    if (value == "thumbnail") {
        myDataBaseView(type, filepath);
    }
}

//目录点击口
function directoryClicked(e) {
    var index = $(e).attr("name");
    var type = $("#getPage").attr("type");
    var path = "";
    for (var i = 1; i <= index; i++) {
        path += "/" + $("#urlbar").find(".dir").find("li").find("a[name='" + i + "']").find("span").attr("value");
    }
    //path = encodeURI(path);
    //更新文件列表
    if ($("#view").css("display") == 'none') {
        fileBrowser(type, path);
    } else {
        myDataBaseView(type, path);
    }
}

//查询当前用户是否有团队
function findTeam() {
    var teamid = 0;
    $.ajax({
        url: "user/findSelfbyuserId",
        type: "post",
        dataType: "json",
        async: false,
        success: function (result) {
            var user = result.data;
            if (result.status == 1) {
                teamid = user.teamId;
            }
        }
    });
    return teamid;
}
//查询当前用户是否有团队
function findTeamLear() {
    var ifis = "";
    $.ajax({
        url: "team/getIfis",
        type: "post",
        dataType: "json",
        async: false,
        data:{
        	username:$("#toName").html()
        },
        success: function (result) {
            if (result.status == 1) {
            	ifis = result.data;
            }
        }
    });
    return ifis;
}
//TODO 上传(需限制上传的文件名只能包含数字和英文)
function startUpload(types) {
    var type = $("#getPage").attr("type");
    if (type == "") {
        modal("会话提示框", "请先加入部门！");
        $("#UploadDoc-modal").modal("hide");
        return;
    }
    if (type == "2") {
        var teamid = findTeam();
        if (teamid == 0) {
            modal("会话提示框", "请先加入团队！");
            $("#UploadDoc-modal").modal("hide");
            return;
        }
    }
    if (!$("#_upload_tool").val()) {
        return;
    }
    //检查大小
    var picFile = document.getElementById("_upload_tool");
    var surplusSpace = $("#getSurplusSpaceSpan").attr("value");
    var files = picFile.files;
    var fileSize = 0;
    for (var i = 0; i < files.length; i++) {
        fileSize += files[i].size;
    }
    if(fileSize >= 2147483648){
    	modal("会话提示框", "上传文件不能超过2G");
        return;
    }
    if(type=="1"){
    	 var baifen=$("#memory").attr("type");
    	    var yong=baifen.substring(0, baifen.indexOf("/"));
    	    var zong=baifen.substring(baifen.indexOf("/")+1);
    	    var yongb=getTOSize(yong);//已经用的b
    	    var xyou=yongb+fileSize;//加上即将下载的总占的
    	    var zongb=getTOSize(zong);//总的b
    	    if(xyou > zongb){
    	    	modal("会话提示框", "下载此文件会超出总空间,请从新选择要上传的文件!");
    	    	return;
    	    }
    }
    if (surplusSpace < fileSize) {
        modal("会话提示框", "空间不足,请从新选择要上传的文件!");
        return false;
    }
    //开始上传
    var uploadForm = $("#uploadForm");
//	var type = $("#getPage").attr("type");
    var path = getCurrentPath();

    tips("正在上传,请耐心等待...", true);
    $('.disBtnIcon').removeAttr('data-dismiss');
    $(".disBtn").attr("disabled","disabled");
    uploadForm.ajaxSubmit({
        url: "upload/uploadFile",
        type: "post",
        dataType: "json",
        data: {
            "type": type,
//			"path":encodeURI(path)
            "path": path,
            "types": types
        },
        success: function (result) {
            if (result.status == 1) {
                tips("", false);
                modal("会话提示框", "上传成功");
                memory();
                $("#UploadDoc-modal").modal("hide");
                $('#cover-modal').modal('hide');
                $("input[name='InputUrl']").val("");
                $('#_upload_tool').val('');
                refreshCurrentPath();
            } else if (result.status == -1) {
            	tips("", false);
            	$("#UploadDoc-modal").modal("hide");
            	modal("会话提示框", "上传文件名不能包含%或+");
            } else {
                LoadsError("上传失败,请稍后再试...", true);
                LoadsError("", false);
            }
            $('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
        },
        error: function (e) {
            modal("会话提示框", "未知异常，稍后再试");
            tips("", false);
        }
    });
}

//重命名
function renameFile() {
    var suff = $(".item-active").attr("value").substring($(".item-active").attr("value").lastIndexOf("."));
    var fileName = $("#renameFile").val();
    var reg = /^[_\w\u4E00-\u9FA5]+$/;
    if (fileName == "") {
        modal("会话提示框", "文件名不能为空");
        return;
    }
    if (fileName.length<1 || fileName.length>20) {
        modal("会话提示框", "文件名称长度在1~20位之间");
        return;
    }
    if (!reg.test(fileName)) {
        modal("会话提示框", "文件名只能包含汉字,英文,数字和下划线");
        return;
    }
    var type = $("#getPage").attr("type");
    var name = $(".item-active").attr("name");
    var source = $(".item-active").attr("path");
    var path=source.substring(0, source.lastIndexOf("/")+1);
    var target = "";
    	if (suff.indexOf(".") >= 0) {
            target = path + fileName + suff;
        } else {
            target = path + fileName;
        }

    $.ajax({
        type: "post",
        url: "data/file/reName",
        dataType: "json",
        data: {
            source: source,
            destination: target,
            type: type,
            types: name
        },
        success: function (result) {
            if (result.status == 0) {
                modal("会话提示框", "重命名失败");
            }
            if (result.status == 1) {
                modal("会话提示框", "重命名成功");
                $("#rename-modal").modal("hide");
                refreshCurrentPath();
            }
        }
    });
}

/**********************标记隐藏***********************/
//标记隐藏
function setHiddeFile() {
    //验证是否选中
    var checkFile = $(".item-active");
    if (checkFile.length < 1) {
        modal("会话提示框", "请至少选择一项");
        $("#hide-modal").modal('hide');
        return;
    }
    //选择一个文件
    //var sourceFileName = [];
    for (var i = 0; i < checkFile.length; i++) {
        var path = checkFile.eq(i).attr("path") + "";
        var name = path.substring(path.lastIndexOf("/") + 1);
        $.ajax({
            url: "hidden/add",
            type: "post",
            dataType: "json",
            data: {
                "fileName": name,
                "filePath": path
            },
            success: function (result) {
            	 if (result.status == 1) {
            		 refreshCurrentPath();
            	 }
            }
        });
    }
    $('#hide-modal').modal('hide');
    modal("会话提示框", "标记操作成功!");

}

/*取消隐藏按钮*/
function cancelHideModal() {
    $('#cacelHide-modal').modal('toggle');
}

//取消隐藏
function delHiddeFile() {
    //验证是否选中
    var checkFile = $(".item-active");
    var yins = $(".item-active").find(".glyphicon-lock").attr("name");
    if (yins != "ys") {
        $('#cacelHide-modal').modal('hide');
        modal("会话提示框", "未标记，请勿操作");
        return;
    }
    if (checkFile.length < 1) {
        $('#cacelHide-modal').modal('hide');
        modal("会话提示框", "请至少选择一项");
        return;
    }
    //选择一个文件
    for (var i = 0; i < checkFile.length; i++) {
        var path = checkFile.eq(i).attr("path") + "";
        var name = path.substring(path.lastIndexOf("/") + 1);
        $.ajax({
            url: "hidden/delet",
            type: "post",
            dataType: "json",
            data: {
                "fileName": name,
                "filePath": path
            },
            success: function (result) {
            	refreshCurrentPath();
            }
        });
    }
    $('#cacelHide-modal').modal('hide');
    modal("会话提示框", "取消标记操作成功!");
}

///*权限按钮*/
function limitSetModal(){
		var fileLength = $(".item-active");
	    if (fileLength.length < 1) {
	        modal("会话提示框", "请至少选择一项");
	        return;
	    }
	    var filenames = new Array();
	    for (var i = 0; i < fileLength.length; i++) {
	    	filenames.push(fileLength.eq(i).attr("value"));
	    }
	    $('#limit-modal').modal('toggle');
	    $("#filenameid").attr("value",filenames.join(","));
	    getDept();
}

//按照部门查询所有成员
function getDept(){
	 $.ajax({
         url: "dept/findAllDeptUser",
         type: "post",
         dataType: "json",
         success: function (result) {
        	 var zNodes = new Array();//树形菜单数组
        	 if(result.status==1){
        		 var map=result.data;
        		 var i=0;
        		 $.each(map,function(key,values){
        			    var zIndex =0;
        			    var zUser = new Array();//用户菜单数组
        			    zNodes[i++]={"pId":0,"name":key,children:zUser,"nocheck": true};
        			    for (var j = 0; j < values.length; j++) {
        			    	zUser[zIndex] = {"pId":1,"name":values[j].userName,"type":values[j].userId};
							zIndex++;
						}
        			 });
        		 setTree(zNodes);
        		 $("#searchUser").val("");
        	 }
         }
     });
}

function savePower(){
	var type= $(".active").find("a").attr("type");
	var fileLength = $(".item-active");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    var filePaths = new Array();
    for (var i = 0; i < fileLength.length; i++) {
    	filePaths.push(fileLength.eq(i).attr("path"));
    }
    var  authorizationstate= "";
    $.each($('input[name="checkbox"]:checked'),function(){
    	authorizationstate+=$(this).val()+",";
    });
    authorizationstate=authorizationstate.substring(0, authorizationstate.lastIndexOf(","));
    var userid="";
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var treeNode = treeObj.getCheckedNodes(true);
    for (var i = 0; i < treeNode.length; i++) {
    	userid+=treeNode[i].type+",";
	}
    userid=userid.substring(0, userid.lastIndexOf(","));
    if(userid==""){
    	 modal("会话提示框", "请选择授权用户！");
    	 return;
    }
    $.ajax({
        url: "authorization/save",
        type: "post",
        dataType: "json",
        data:{
        	"type":type,
        	"filePath":filePaths.join(","),
        	"authorizationstate":authorizationstate,
        	"userid":userid
        },
        success: function (result) {
        	if(result.status==1){
        		 modal("会话提示框", "授权成功！");
        		 $("#filenameid").attr("value","");
        		 $("#searchUser").attr("value","");
        		 var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        		 treeObj.checkAllNodes(false);
        		 $("input[name='checkbox']").attr("checked",false);
        	}
        }
    });
}
/****************权限************************/
//设置节点数据
function setTree(zNodes){
	//目录
	var setting = {
	    view:{
	        showLine:false,
	        showIcon: false,
            fontCss:setHighlight
	    },
	    check:{
	        enable: true,
	        autoCheckTrigger: true,
	        chkStyle: "checkbox",
    		radioType: "all",
	    },
	    async: {
	        enable: true,
	        url:"",
	        autoParam: ["id"]
	    },
	    data: {
	        simpleData: {
	            enable: true
	        }
	    }
	};
	$(document).ready(function(){
	    zTreeObj = $.fn.zTree.init($("#treeDemo"), setting,zNodes);
	});
}

//实现树形菜单搜索功能
//样式：高亮
function setHighlight(treeId, treeNode){
    return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}
var timeoutId = null;
function searchNodeLazy(value,id) {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function(){
        showSelected(id,'name',value);
    }, 300);
}
// 搜索到的数组
var nodeList=[];
function showSelected(id,key,value){
    var treeId = id;
    updateNodes(false);
    if(value!= ""){
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        treeObj.expandAll(false);
        nodeList = treeObj.getNodesByParamFuzzy(key,value);
        if(nodeList && nodeList.length>0){
            updateNodes(true);
        }

    }
    function updateNodes(highlight) {
        var treeObj = $.fn.zTree.getZTreeObj(treeId);
        for( var i=0; i<nodeList.length;i++) {
            if(nodeList.length>0){
                nodeList[i].highlight = highlight;
                // 更新节点，让高亮生效
                treeObj.updateNode(nodeList[i]);
                // 搜索到的节点的父节点
                var treenode =nodeList[i].getParentNode();
                //展开父节点
                treeObj.expandNode(treenode,true,true,true);
            }
        }
    }
}
/*********************分享*********************/
//从我的资料库分享
function fileShare() {
//	createShareConntion();
    var type1 = $(".active").find("a").attr("type");
    if(type1==""){
    	 modal("会话提示框", "请选择资料库");
         return;
    }
    var fileLength = $(".item-active");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    var type = $("#shaerSelectc").find("option:selected").attr("value");
    var teampath=$('#shaerSelectc2').find("option:selected").attr("name");
    var destination="";
    	 if(type==2){//下拉选中team时
    	    destination=teampath;
    	 }
    	 $('.disBtnIcon').removeAttr('data-dismiss');
    	 $(".disBtn").attr("disabled","disabled");
    	 tips("正在分享,请耐心等待...", true); 
    for (var i = 0; i < fileLength.length; i++) {
        var filePath = fileLength.eq(i).attr("path");
        var isDirectory = fileLength.eq(i).attr("name");
        $.ajax({
            type: "POST",
            url: "share/c",
            data: {
                "source": filePath,
                "destination": destination,
                "type": type,
                "type1": type1,
                "isDirectory":isDirectory
            },
            success: function (result) {
            	tips("", false);
            	 if (result.status == 1) {
            		 $('#share-modal').modal('hide');
                     modal("会话提示框", "分享成功!");
            	 }else if(result.status == 2){
                     modal("会话提示框", "文件或文件夹已存在!");
            	 }
            	 $('.disBtnIcon').attr('data-dismiss','modal');
                 $(".disBtn").removeAttr("disabled");
            }
        });
    }

}

//创建连接
function createShareConntion() {
    var fileLength = $(".item-active");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    var paths = new Array();
//	var type = $("#shaerSelectc").find("option:selected").attr("value");
    var type = $(".active").find("a").attr("type");
    for (var i = 0; i < fileLength.length; i++) {
        paths.push(fileLength.eq(i).attr("path"));
    }
    tips("正在创建,请耐心等待...", true);
    $('.disBtnIcon').removeAttr('data-dismiss');
	 $(".disBtn").attr("disabled","disabled");
    $.ajax({
        type: "POST",
        url: "share/cc",
        data: {
            "paths": paths.join(","),
            "type": type
        },
        success: function (result) {
            tips("", false);
            $("#conntionInput").val("");
            $('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
            var data = result.data;
            if (result.status == 1) {
                $("#conntionInput").val(path + "/share/sc/" + data);
                $("#connShareP").attr("name", path + "/share/sc/" + data);
            }
        }
    });
}

/*---input复制----*/
$('#conntionInput').click(function () {
    $(this).select();
});
/**
 * 分享到好友
 */
//加载最近通话列表
function shareTeamList() {
    var toname = $("#toName").html();
    $.ajax({
        url: "user/userTeam",
        type: "post",
        dataType: "json",
        data: {
            "userName": toname
        },
        success: function (result) {
            var list = result.data;
            var html = "";
            if (result.status == 1) {
                $("#shareTeamList").empty();
                $("#shareTeamListNum").html("(" + (list.length-1) + ")");
                for (var i = 0; i < list.length; i++) {
                	if(list[i].userName!=toname){
                		html += '<li class="info-list" data-id="' + i + '" ><div class="list-user" title="' + list[i].userName + '"><img src="' + list[i].iconUrl + '" alt=""/>' + list[i].userName + '</div><div class="label" id="label"></div></li>';
                	}
                }
            } else {
                $("#shareTeamListNum").html("(" + 0 + ")");
            }
            $("#shareTeamList").html(html);
            $(".Box-fl-list li ul.list-title-info .info-list").click(function () {
                //判断是否已经选中
                if ($(this).find(".label").hasClass("labCurr")) {
                    $(this).find(".label").removeClass("labCurr");

                    var id = $(this).data("id");
                    $(".friendBox-fr ul.select-list .remark-info").each(function () {
                        if ($(this).data("id") == id) {
                            $(this).remove();
                            //更新总数
                            $(".friendBox-fr .box-title .num").text($(".friendBox-fr ul.select-list").find("li").length);
                        }
                    });
                } else {
                    //未选中则添加选中样式，右侧添加列表，修改总数
                    $(this).find(".label").addClass("labCurr");

                    var id = $(this).data("id");
                    var name = $(this).find(".list-user").attr("title");
                    var img = $(this).find(".list-user img").attr("src");
                    var html = '<li class="remark-info" data-id="' + id + '" style="display: block">' +
                        '<div class="list-user" title="' + name + '">' +
                        '<img src="' + img + '" alt=""/>' + name +
                        '</div>' +
                        '<div class="lableDel"></div>' +
                        '</li>';
                    //insert data
                    $(".friendBox-fr ul.select-list").append(html);
                    //updata
                    $(".friendBox-fr .box-title .num").text($(".friendBox-fr ul.select-list").find("li").length);

                    //给新增加的标签添加事件
                    $(".friendBox-fr ul.select-list .remark-info .lableDel").click(function () {
                        var id = $(this).parent().data("id");
                        //删除标签
                        $(this).parent().remove();
                        //去除选中样式
                        $(".Box-fl-list li ul.list-title-info .info-list").each(function () {
                            if ($(this).data("id") == id) {
                                $(this).find(".label").removeClass("labCurr");
                                //updata Allcount
                                $(".friendBox-fr .box-title .num").text($(".friendBox-fr ul.select-list").find("li").length);
                            }
                        });
                    });
                }
            });
        }
    });
}

//将选中文件创建连接并分享到选中好友
function shareTameMember() {
//	createShareConntion();
    //获取连接
    var content = $("#connShareP").attr("name");
    //获取接收人
    var toTitle = $("#shareSelecteName").find("[title]");
    if(toTitle.length == 0){
        modal("会话提示框", "请选择收件人!");
        return;
    } else if(toTitle.length >10){
    	 modal("会话提示框", "收件人超过10个了!");
         return;
    }
    var fromName = $("#toName").html();
    $('.disBtnIcon').removeAttr('data-dismiss');
	 $(".disBtn").attr("disabled","disabled");
    for (var i = 0; i < toTitle.length; i++) {
        var toName = toTitle.eq(i).attr("title");
        $.ajax({
            url: "chatrecord/savechatrecord",
            type: "post",
            dataType: "json",
            data: {
                "fromName": fromName,
                "toName": toName,
                "content": content,
                "time": new Date().getTime()
            },
            success: function (result) {
            }
        });
        $('#writeMsg').val("");
        ws.send(fromName + "," + toName + "," + content + "," + getTime());
        $("#share-modal").modal('hide');
        $('.disBtnIcon').attr('data-dismiss','modal');
        $(".disBtn").removeAttr("disabled");
        modal("会话提示框", "分享成功!");

    }
    //发连接到接收人
}
/*******************复制移动ztree*********************/
$('#CopyNewFolder-modal').off('hidden.bs.modal');
$('#CopyNewFolder-modal').on('hidden.bs.modal', function () {
	$("#createDirectoryInput").val("");
});

var zTreeObj = null;
//新建文件夹
function createDirectory() {
    var type = $("#getPage").attr("type");
    if (type == "") {
        modal("会话提示框", "请先加入部门！");
        $("#CopyNewFolder-modal").modal("hide");
        return;
    }
    var child_path = $("#createDirectoryInput").attr("name");
    var folderName = $("#createDirectoryInput").val();
    var reg = /^[_\w\u4E00-\u9FA5]+$/;
    if (folderName == "" || folderName.length == 0) {
        modal("会话提示框", "文件名不能为空");
        return;
    }
    if (folderName.length<1 || folderName.length>20) {
        modal("会话提示框", "文件名称长度在1~20位之间");
        return;
    }
    if (!reg.test(folderName)) {
        modal("会话提示框", "文件名只能包含汉字,英文,数字和下划线");
        return;
    }
    $.ajax({
        url: "data/file/create",
        type: "post",
        dataType: "json",
        data: {
            path: child_path + "/" + folderName,
            directory: true,
            type: type
        },
        success: function (result) {
            if (result.status == 1) {
                var treeObj = $.fn.zTree.getZTreeObj("ztreeCopyMove");
                var treeNode = treeObj.getSelectedNodes();
                if (treeNode[0].id != 0) {
                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, treeObj.getNodeByParam("id", treeNode[0].id, null));//触发函数
                } else {
                    getDirectoryList();
                }
                $("#CopyNewFolder-modal").modal("hide");
                $("#createDirectoryInput").val("");
            }
            if (result.status == 0) {
                modal("会话提示框", "创建目录失败!");
            }
        }
    });
}

function CopyMoveOpter() {
    var type = $("#copyMoveSpanText").attr("value");
    if (type == "copy") {
        fileCopy();
    } else {
        fileMove();
    }
}

//复制
function fileCopy() {
    var fileLength = $(".item-active");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    var treeObj = $.fn.zTree.getZTreeObj("ztreeCopyMove");
    var treeNode = treeObj.getSelectedNodes();
    if(treeNode.length != 1){
        modal("会话提示框", "请选择一项");
        return;
    }
    var treepath=treeNode[0].path;
    var type = $("#getPage").attr("type");
    if(type=="2"){
        if(treeNode[0].path==""){
        	treepath="/"+$(".dir li").eq(0).find("span").attr("value");
        }
    }
    var fileSize=0;
    for (var i = 0; i < fileLength.length; i++) {
        fileSize=fileLength.eq(i).attr("filesize");
        fileSize++;
    }
    if(type=="1"){
   	 var baifen=$("#memory").attr("type");
   	    var yong=baifen.substring(0, baifen.indexOf("/"));
   	    var zong=baifen.substring(baifen.indexOf("/")+1);
   	    var yongb=getTOSize(yong);//已经用的b
   	    var xyou=yongb+fileSize;//加上即将下载的总占的
   	    var zongb=getTOSize(zong);//总的b
   	    if(xyou > zongb){
   	    	modal("会话提示框", "复制文件会超出总空间，请重新选择!");
   	    	return;
   	    }
   }
    var filePath = [];
    for (var i = 0; i < fileLength.length; i++) {
        filePath.push(fileLength.eq(i).attr("path"));//源文件lujing
    }
    ShowLoad();
    $('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
        $.ajax({
            type: "POST",
            url: "data/file/copy",
            data: {
                "source": filePath.join(","),
                "destination": treepath,
                "type": type
            },
            success: function (result) {
            	HidenLoad();
            	$('.disBtnIcon').attr('data-dismiss','modal');
                $(".disBtn").removeAttr("disabled");
                if (result.status == 1) {
                    modal("会话提示框", "复制操作成功!");
                    memory();
                }else if (result.status == 2) {
                	 modal("会话提示框", "文件或文件夹已存在!");
                }
                $('#copy-modal').modal('hide');
            }
        });
}

function fileMove() {
    var fileLength = $(".item-active");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    var treeObj = $.fn.zTree.getZTreeObj("ztreeCopyMove");
    var treeNode = treeObj.getSelectedNodes();
    if(treeNode.length != 1){
        modal("会话提示框", "请选择一项");
        return;
    }
    var treepath=treeNode[0].path;
    var type = $("#getPage").attr("type");
    if(type=="2"){
        if(treeNode[0].path==""){
        	treepath="/"+$(".dir li").eq(0).find("span").attr("value");
        }
    }
    var filePath = [];
    for (var i = 0; i < fileLength.length; i++) {
    	filePath.push(fileLength.eq(i).attr("path"));//源文件lujing
    }
    ShowLoad();
    $('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
        $.ajax({
            type: "POST",
            url: "data/file/move",
            data: {
                "source": filePath.join(","),
                "destination": treepath,
                "type": type
            },
            success: function (result) {
            	HidenLoad();
            	$('.disBtnIcon').attr('data-dismiss','modal');
                $(".disBtn").removeAttr("disabled");
            	if (result.status == 1) {
                    modal("会话提示框", "移动操作成功!");
                    memory();
                }else if (result.status == 2) {
                	 modal("会话提示框", "文件或文件夹已存在!");
                }
                refreshCurrentPath();
                $('#copy-modal').modal('hide');
            }
        });
}

//获取根目录
function getDirectoryList() {
    var type = $("#getPage").attr("type");
    var path="";
    if(type==2){
    	var paths=$(".item-active").attr("path");//    /Nk6sIeM66/bvftgb/Jellyfish.jpg
    	var pats=paths.substring(paths.indexOf("/")+1);//    Nk6sIeM66/bvftgb/Jellyfish.jpg
    	path="/"+pats.substring(0,pats.indexOf("/")+1);
    }
    //var source = $(".item-active").attr("path");
    //var target = getCurrentPath() + "/" + fileName;
    $.ajax({
        url: "data/file/tree",
        type: "post",
        dataType: "json",
        data: {
            "path": path,
            "type": type
        },
        success: function (result) {
            var zNodes = new Array();//树形菜单数组
            zNodes[0] = {"id": 0, "pId": 0, "name": '请选择你要存放的目录', "path": ""};
            if (result.status == 1) {
                var maxid = 0;
                var data = result.data;
                for (var i = 0; i < data.length; i++) {
                    if (maxid < data[i].id) {
                        maxid = data[i].id;
                    }
                    var filename="";
                	if(data[i].label.length>8){
                		filename=data[i].label.substring(0, 8)+" ...";
                	}else{
                		filename=data[i].label;
                	}
                    zNodes[i + 1] = {"id": data[i].id, "pId": data[i].pid, "name": filename, "path": data[i].path};
                }
                $("#ChildrenMaxid").attr("value", maxid);
            }
            if (result.status == 0) {
                modal("会话提示框", "获取目录失败!");
            }
            setDiretoryTree(zNodes);
        }
    });
}

//获取子目录
function getDirectoryChildrenList(maxid, child_path, pid, treeNode) {
    $.ajax({
        url: "data/file/gettree",
        type: "post",
        dataType: "json",
        data: {
            "path": child_path,
            "pid": pid,
            "maxid": maxid,
            "type": $("#getPage").attr("type")
        },
        success: function (result) {
            var zNodes = new Array();//树形菜单数组
            //zNodes[0]={"id":0,pId:0,"name":'请选择你要备份的目录'};
            if (result.status == 1) {
                var data = result.data;
                var maxid = 0;
                for (var i = 0; i < data.length; i++) {
                    if (maxid < data[i].id) {
                        maxid = data[i].id;
                    }
                    var filename="";
                	if(data[i].label.length>8){
                		filename=data[i].label.substring(0, 8)+" ...";
                	}else{
                		filename=data[i].label;
                	}
                    zNodes[i] = {"id": data[i].id, "pId": data[i].pid, "name": filename, "path": data[i].path};
                }
                $("#ChildrenMaxid").attr("value", maxid);
            }
            if (result.status == 0) {
            }
            setChildrenDiretoryTree(treeNode, zNodes);
        }
    });
}

//添加子节点
function setChildrenDiretoryTree(treeNode, zNodes) {
    var treeObj = $.fn.zTree.getZTreeObj("ztreeCopyMove");
    treeObj.removeChildNodes(treeNode);
    treeObj.addNodes(treeNode, zNodes);
}

//节点加载记录
var zTreeChildrenIds = new Array();
//单机加载目录子节点
function zTreeOnClick(event, treeId, treeNode) {
    //点击时将选定节点路径绑定到input的那name属性上,便于获取
    $("#createDirectoryInput").attr("name", treeNode.path);
    zTreeObj = treeNode;
    if (treeNode.id != 0) {
        var maxid = $("#ChildrenMaxid").attr("value");
        getDirectoryChildrenList(maxid, treeNode.path, treeNode.pId, treeNode);
    }
};

//设置节点数据
function setDiretoryTree(zNodes) {
    //目录
    var setting = {
        view: {
            showLine: false,
            //checkable: false
        },
        async: {
            enable: true,
            url: "",
            autoParam: ["id"]
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: zTreeOnClick
        }
    };
    $(document).ready(function () {
        $.fn.zTree.init($("#ztreeCopyMove"), setting, zNodes);
    });
}

//时间处理
function add0(m) {
    return m < 10 ? '0' + m : m;
}

function format(ms) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(ms);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function colFileSize(byte) {
    if (byte < 1024) {
        return byte + "B";
    } else if (byte > 1024 && byte < 1024 * 1024) {
        return (byte / 1024).toFixed(2) + "KB";
    } else if (byte > 1024 * 1024 && byte < 1024 * 1024 * 1024) {
        return (byte / 1024 / 1024).toFixed(2) + "MB";
    } else {
        return (byte / 1024 / 1024 / 1024).toFixed(2) + "GB";
    }
}
