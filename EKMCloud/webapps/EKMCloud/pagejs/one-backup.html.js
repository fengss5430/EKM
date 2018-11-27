$(function(){
    App.back();
    filePath();

    //右键的点击事件
    $(".item-listview").on('contextmenu','.grid-view-item,.list-view-item',function(){
        $(this).addClass('item-active').siblings().removeClass('item-active');
    });

    //左侧菜单
    $("#sidebar").off().on('click','li',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    //列表添加
    $("#listviewtable tbody").on('click','tr',function(){
        $(this).addClass('item-active').siblings().removeClass('item-active');
    });

    //排序-按钮切换
    $('#dropList li').click(function () {
        $(this).addClass('sotrActive').siblings().removeClass('sotrActive');
    });

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
    listenactiveitem();
    $(e).children().hide();
    if (mainconlist == "thumbnail") { //视图
        $(e).children().eq(0).show();
        getDirectoryChange(mainconlist);
    }
    else if (mainconlist == "list") {
        $(e).children().eq(1).show();
        //加载数据
        getDirectoryChange(mainconlist);
    }
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
//不同页面的fileName
function filePath() {
	var type = $("#getPage").attr("type");
	var filepath = "";
	//表格隐藏
	if($("#view").css("display") == 'none') {
		fileBrowser(type,filepath);
	} else {
		myDataBaseView(type,filepath);
	}
//	myDataBaseView(type,filepath);
}

//本路径刷新
function refreshCurrentPath() {
	var path = getCurrentPath();
	var type = $("#getPage").attr("type");
//	myDataBaseView(type,path);
	//表格隐藏
    if ($("#view").css("display") == 'none') {
        fileBrowser(type, path);
    } else {
        myDataBaseView(type, path);
    }
}

//返回Home
function returnHome() {
	var filePath = "";
	var type = $("#getPage").attr("type");
	if ($("#view").css("display") == 'none') {
        fileBrowser(type, filePath);
    } else {
        myDataBaseView(type, filePath);
    }
//	myDataBaseView(type,filePath);
}
//文件列表
function fileBrowser(type, filePath,a) {
	fileDirectory(type, filePath);
    var url = encodeURI("data/file?path=" + filePath + "&type=" + type);
   // var url = "data/file?path=" + filePath + "&type=" + type;
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
                    if (data != null) {
                        sortData(data, a);
                        for (var i = 0, ien = data.length; i < ien; i++) {
                            if (data[i].directory == true && data[i].charset == "ys") {
                                data[i][0] = "<span class='fileicon dir-small getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'></span><span class='glyphicon glyphicon-lock' style='top:6px; color:#a9a9a9; left:6px;'></span>";
                            } else if (data[i].directory == false && data[i].charset == "ys") {
                                data[i][0] = "<span class='getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'><img src='images/small-icon/" + deal(data[i].name) + ".png' class='fileicon'/></span><span class='glyphicon glyphicon-lock' style='top:6px; color:#a9a9a9; left:6px;'></span>";
                            } else if (data[i].directory == true) {
                                data[i][0] = "<span class='fileicon dir-small getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'></span>";
                            } else if (data[i].directory == false) {
                                data[i][0] = "<span class='getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'><img src='images/small-icon/" + deal(data[i].name) + ".png' class='fileicon'/></span>";
                            }
                            var dd="";
                            //if(type==9 && filePath==""){
                       		// var deptName=getNames(data[i].name);
                       		// dd=deptName;
                            //}else{
                            	dd=data[i].name;
                           // }
                            var filename="";
                            if(dd.length>8){
           					 	filename = dd.substring(0, 8)+" ...";
           				 	}else{
           				 		filename = dd;
           				 	}
                            if (type == 2 && $("#urlbar").find(".dir").text() == "" && $("#teamForm option").size()>1) {
                                data[i][1] = '<a href="javascript:void(0);" class="first_list" style="text-decoration:none">' + filename + '</a>';
                            } else {
                                data[i][1] = '<a href="javascript:void(0);" class="second_list"  style="text-decoration:none">' + filename + '</a><div class="operate" style="float: right;"><a href="javascript:;" onclick="addActive();"  style="text-decoration:none"><i class="fa fa-share-alt" style="color:#dd5d5d;font-size: 18px;"></i></a><a href="javascript:;" onclick="downModal();" style="margin-left:12px;"><i class="fa fa-download" style="color:#dd5d5d;font-size: 18px;"></i></a><div class="btn-group" onclick="lisType(this);" style="top:-2px"><a data-toggle="dropdown" href="javascript:;" style="margin-left:12px;"><i class="fa fa-cogs" style="color:#dd5d5d;font-size: 18px;"></i></a><ul class="dropdown-menu" style="min-width: 0;"><li><a style="line-height: 30px" onclick="moveModal();" powname="5" href="javascript:;">移动到</a></li><li><a style="line-height: 30px" href="javascript:;"  powname="3" onclick="copyModal();">复制到</a></li><li><a style="line-height: 30px" href="javascript:;"  powname="4" onclick="reNameActive();">重命名</a></li><li><a style="line-height: 30px" href="javascript:;"  powname="6,7" onclick="delModal();">删除</a></li></ul></div><a class="operateclose" href="javascript:;" onclick="$(this).parent().hide();"><i class="fa fa-times-circle-o"></i></a></div>';
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
    $("#listviewtable").on("draw.dt", function () {
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
            var type = trLength.eq(i).find(".getAttr").attr("type");
            trLength.eq(i).attr("path", path);
            trLength.eq(i).attr("value", value);
            trLength.eq(i).attr("name", name);
            trLength.eq(i).attr("power", power);
            trLength.eq(i).attr("type", type);
            trLength.eq(i).attr("title", value);
        }
        //列表全选功能
        $(".dataTables_scrollHead").width("100%");       
    });
}
//我的资料库(视图列表 )
function myDataBaseView(type,filePath) {
	fileDirectory(type,filePath);
	$.ajax({
		url : encodeURI("data/file?path=" + filePath+"&type=" + type),
		type : "POST",
		dataType : "json",
		success : function (result) {
				var data = result.data;
				var html = "";
				if(data != null) {
					for (var i = 0, ien = data.length; i < ien; i++) {
					    if(data[i].directory==true){
                            html += '<div class="grid-view-item Grid_directory_view" title="'+data[i].name+'" fileSize="'+data[i].size+'" fileUpdateTime="'+data[i].lastUpdated+'" value="'+data[i].name+'" path="'+data[i].path+'" name="'+data[i].directory+'">';
                            html += '<div class="fileicon fileicon-sys-l-code">';
                            html += '<img src="images/big-icon/folder.png">';
                        }else{
                            html += '<div class="grid-view-item Grid_doc_view" title="'+data[i].name+'" fileSize="'+data[i].size+'" fileUpdateTime="'+data[i].lastUpdated+'" value="'+data[i].name+'" path="'+data[i].path+'" name="'+data[i].directory+'">';
                            html += '<div class="fileicon fileicon-sys-l-code">';
                            html += '<img src="images/big-icon/'+deal(data[i].name)+'.png">';
                        }
						html += '</div>';
						html += '<div class="file-name">';
						var dd="";
						var filename="";
//                        if(type==9 && filePath==""){
//                   		 var deptName=getNames(data[i].name);
//                   		 dd=deptName;
//                        }else{
                        	dd=data[i].name;
//                        }
			            if(dd.length>8){
							 filename = dd.substring(0, 8)+" ...";
						 }else{
						 	filename = dd;
						 }
						html += '<a class="filename" tnum="10" title="" >'+filename+'</a>';
						html += '</div>';
						html += '<span class="checkbox"> <span class="icon circle-icon"></span><span class="icon checkgridsmall"></span>';
						html += '</span>';
						if(data[i].charset=="ys"){
							html +='<span class="glyphicon glyphicon-lock" style="left:50px; color:#a9a9a9;" name="ys"></span>';
						}
						html += '</div>';
					}
				}
				$("#dataBaseView").html(html);
				$("[tnum]").elli();
                App.Admcontext();
			if(result.status == 0) {
			}
		}
	});
}

//目录
function fileDirectory(type, path) {
  var arr = (path + "").split("/");
  $("#urlbar").empty();
  var nameText = "";
  var html = "";
  if (type == 1) {
      nameText = "用户资料库";
  } else if (type == 2) {
      nameText = "团队资料库";
  } else if (type == 3) {
      nameText = "公司资料库";
  } else if (type == 9){
      nameText = "部门资料库";
  } else if(type == 11){
	  nameText="标准知识";
  } else if(type == 22){
	  nameText="产品知识";
  } else if(type == 13){
	  nameText="业务知识";
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
  var dd = "";
  for (var i = 1; i < arr.length; i++) {
      divHtml += '<li>';
      var filename="";
      if(type==2){
    	  var teamname = getName(arr[i]);
    	  if (teamname != "") {
              dd = teamname;
          } else {
              dd = decodeURI(arr[i]);
          }
      }else if(type==9){
    	  var deptName=getNames(arr[i]);
    	  if (deptName != "") {
              dd = deptName;
          } else {
              dd = decodeURI(arr[i]);
          }
      }else{
    	  dd = decodeURI(arr[i]);
      }
      if(dd.length>8){
			 filename = dd.substring(0, 8)+" ...";
		 }else{
			 filename = dd;
		 }
      divHtml += "<a name='" + i + "' onclick='directoryClicked(this)' style='text-decoration:none'><span value ='" + arr[i] + "'>" + filename + "</span></a></li>";
  }
  $("#urlbar").find(".dir").html(divHtml);
  $("#topbar").show();
}

//双击打开文件夹
//var asd = null;
$('#dataBaseView').on('dblclick','.grid-view-item',function(){
	fileNameClicked();
    $('.activebtn').hide();
});
$('#listviewtable').on('dblclick', '.list-view-item', function () {
	fileNameClicked();
    $('.activebtn').hide();
});


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
//打开文件夹
function fileNameClicked() {
    if ($(".item-active").length == 0) {
        return;
    }
    var isDirectory = $(".item-active").attr("name");
    var path = $(".item-active").attr("path");
    var type = $("#getPage").attr("type");
    //是文件夹
    if (isDirectory == "true") {
//         myDataBaseView(type, path);
    	//更新文件列表
        if ($("#view").css("display") == 'none') {
        	fileBrowser(type, path);
        } else {
            myDataBaseView(type, path);
        }
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
//    myDataBaseView(type, path);
    //更新文件列表
    if ($("#view").css("display") == 'none') {
        fileBrowser(type, path);
    } else {
        myDataBaseView(type, path);
    }
}
//判断使用的图片
function deal(name){
	var suffix=['ai','bt','html','js','css','java','xml','ttf','txt','mmap','pdf','ppt','pptx','psd','xmind','rar','zip','doc','docx','xls','xlsx'];
	var vedio = ['asx','asf','mpg','wmv','3gp','mp4','mov','avi','flv','rm'];
	var picture = ["png","jpg","gif","jpeg"];
	var radio=["mp1","mp2","mp3",'ram','mid'];
	var picArr = [suffix,vedio,picture,radio];
		point= name.lastIndexOf(".");
	var type = name.substr(point);
	var str=type.replace('.','');
		str=str.toLowerCase();
	for (var i = 0; i < picArr.length; i++) {
		for (var j = 0; j < picArr[i].length; j++) {
			if(str==picArr[i][j]){
				if(i == 0) {
					return str;
				}
				if(i == 1) {
					return "mp4";
				}
				if(i == 2) {
					return "picture";
				}
				if(i == 3) {
					return "mp3";
				}
		      }
		}
	}
	for(var i=0;i<suffix.length;i++){
	    if(str==suffix[i]){
	  	  return str;
	    }
	}
}
//改变团队名称为中文
function getName(name) {
    var teamName = "";
    $.ajax({
        url: "team/findTeamByRam",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "randomId": name
        },
        success: function (result) {
            if (result.status == 1) {
                var team = result.data;
                teamName = team.teamName;
            } else {
                teamName = "";
            }
        }
    });
    return teamName;
}
//改变团队名称为中文
function getNames(name) {
    var deptName = "";
    $.ajax({
        url: "dept/findDeptByRam",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            "randomId": name
        },
        success: function (result) {
            if (result.status == 1) {
                var dept = result.data;
                deptName = dept.deptName;
            } else {
            	deptName = "";
            }
        }
    });
    return deptName;
}
//备份
function BackupSuper(){
	var remark=userMess();
	if(remark=="false"){
		 modal("会话提示框", "正在备份");
		return;
	}
	var types = $("#getPage").attr("type");
	var fileLength = $(".item-active");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    var filePaths = new Array();
    for (var i = 0; i < fileLength.length; i++) {
        filePaths.push(fileLength.eq(i).attr("path")+"/"+fileLength.eq(i).attr("name"));
    }
   var destination=getCopyUrl();
        $.ajax({
            type: "POST",
            url: "data/file/copys",
            data: {
                "source": filePaths.join(","),
                "destination": destination,//备份到
                "types":types
            },
            success: function (result) {
                if (result.status == 1) {
                	$('#back-modal').modal('hide');
                    modal("会话提示框", "备份成功!");
                }else if(result.status == -2){
                	
                }
            }
        });
}

function userMess(){
	var remark="";
	$.ajax({
        type: "POST",
        url: "user/findUserMess",
        async: false,
        success: function (result) {
            if (result.status == 1) {
               var user=result.data;
               remark=user.remark;
            }
        }
    });
	return remark;
}
//获取路径
function getCopyUrl(){
	var url="";
	$.ajax({
        type: "POST",
        url: "backup/getUpBack",
        async: false,
        success: function (result) {
            if (result.status == 0) {
               var backup=result.data;
               url=backup.backupurl;
            }
        }
    });
	return url;
}
/**
 * 是否修改
 */
function IfUpdate(e){
	if(e=="1"){
		$("#upAdress-modal").modal('show');
	}else{
		$('#back-modal').modal('show');
		var url=getCopyUrl();
		$("#backUrlId").html(url);
	}
	$("#upUrl-modal").modal('hide');
}


function upBackUpUrl(){
	var xlegnht=$(".item-active").length;
	var backupurl=$("#upBackupUrlId").val();
	if(backupurl.length < 1){
		modal("会话提示框", "请输入修改路径!");
		return;
	}
	$.ajax({
        type: "POST",
        url: "backup/upBack",
        data: {
            "backupurl": backupurl
        },
        success: function (result) {
            if (result.status == 1) {
            	$("#upBackupUrlId").val("");
            	$("#upAdress-modal").modal('hide');
            	if(xlegnht!=0){
            		$('#back-modal').modal('show');
            	}else{
            		modal("会话提示框", "修改成功!");
            	}
            }else{
            	modal("会话提示框", "修改失败!");
            }
        }
    });
}