var titleName=$(".active .menu-text").html();
var idName2="";
$(function () {
	//文档云权限
	var powerid =$(".active").find("a").attr("powerid");
	if(typeof(powerid) != "undefined"){
		 var arr = new Array();;
		 arr = powerid.split(',');  //a权限字符转换为数组
		 var btnType = $("#topbar").find(".typeClass"); //a.typeClass的type值
		    for(var a = 0; a < btnType.length; a++){
				for(var b = 0;b < arr.length; b++){  //powerid
		            if(btnType.eq(a).attr("type") != "undefined" ){
		                //对比权限和class为a的type值
		                if(arr[b] == btnType.eq(a).attr("type")){
		                    btnType.eq(a).removeClass('hide');
		                }
					}
				}
			}

			//历史版本下载删除对比
		    var topType = $(".top").find('a'); //a.typeClass的type值
			for(var q=0;q<topType.length;q++){ //top.a-type
		    	for(var w=0;w<arr.length;w++){
					if(topType.eq(q) != "undefined"){
						if(arr[w] ==topType.eq(q).attr("type") ){
		                    topType.eq(q).removeClass('hide');
						}
					}
				}
			}
	}
   
    

	//上传Modal
    $("#closeBtn").click(function(){
        $("#upLoad-modal").fadeOut(500);
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
	getRootDirectory("1","cloudtreeMove");
	delLinshiFiles();
	$('#AddForm').find('.uploading').hide();
    $('#AddForm').find('.uploading2').hide();
    $('#copy-modals').off("shown.bs.modal");
    $('#copy-modals').on("shown.bs.modal",function(){
    	 getRootDirectory("1","cloudtreeCopy");
    });
});
//本路径刷新
function refreshCurrentPath() {
    var path = getCurrentPath("1");
    getChildList(path);
}
//获取根目录
function getRootDirectory(e,idName) {
	idName2=idName;
	var type = $("#getPage").attr("type");
	var path="";
	 $.ajax({
	        url: "hisversion/tree",
	        type: "post",
	        dataType: "json",
	        data: {
	            "path": path,
	            "type": type
	        },
	        success: function (result) {
	            var zNodes = new Array();//树形菜单数组
	            zNodes[0] = {"id": 0, "pId": 0, "name": titleName+"导航", "path": ""};
	            if (result.status == 1) {
	                var maxid = 0;
	                var data = result.data;
	                for (var i = 0; i < data.length; i++) {
	                    if (maxid < data[i].id) {
	                        maxid = data[i].id;
	                    }
	                    var filename="";
                    	if(data[i].hv.filename.length>8){
                    		filename=data[i].hv.filename.substring(0, 8)+" ...";
                    	}else{
                    		filename=data[i].hv.filename;
                    	}
	                    zNodes[i + 1] = {"id": data[i].id, "pId": data[i].pid, "name": filename, "path": data[i].path,"pow":data[i].xpow,"title":data[i].hv.filename};
	                }
	                $("#ChildrenMaxids").attr("value", maxid);
	            }
	            if (result.status == 0) {
	            }
	            if(e=="1"){
	            	setDiretory(zNodes,idName);
	            }else if(e=="2"){
	            	var zNode = new Array();//树形菜单数组
	            	var treeObj = $.fn.zTree.getZTreeObj(idName);
	            	var treeNode = treeObj.getSelectedNodes();
	                treeObj.removeChildNodes(treeNode[0]);
	                for (var j = 1; j < zNodes.length; j++) {
	            	   zNode.push(zNodes[j]);
	                }
	                treeObj.addNodes(treeNode[0], zNode);
	            }
	        }
	    });          
}

//获取子目录
function getDirectoryChildren(maxid, child_path, pid, treeNode, idName) {
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
            var data = result.data;
            if (result.status == 1) {
                var maxid = 0;
                for (var i = 0; i < data.length; i++) {
                    if (maxid < data[i].id) {
                        maxid = data[i].id;
                    }
                    var filename="";
                	if(data[i].name.length>8){
                		filename=data[i].name.substring(0, 8)+" ...";
                	}else{
                		filename=data[i].name;
                	}
                    zNodes[i] = {"id": data[i].id, "pId": data[i].pid, "name": filename, "path": data[i].path,"pow":data[i].xpow,"title":data[i].name};
                }
                $("#ChildrenMaxids").attr("value", maxid);
            }
            if (result.status == 0) {
            }
            setChildrenDiretory(treeNode, zNodes, idName);
        }
    });
}

//添加子节点
function setChildrenDiretory(treeNode, zNodes,idName) {
    var treeObj = $.fn.zTree.getZTreeObj(idName);
    treeObj.removeChildNodes(treeNode);
    treeObj.addNodes(treeNode, zNodes);
 
}

//节点加载记录
var zTreeChildrenIds = new Array();
//单机加载目录子节点
function zTreeOnClick(event, treeId, treeNode) {
    //点击时将选定节点路径绑定到input的那name属性上,便于获取
    $("#createDirectoryInput").attr("name", treeNode.path);
    $("#createDirectoryInputs").attr("name", treeNode.path);
    zTreeObj = treeNode;
    var zTree = $.fn.zTree.getZTreeObj(idName2);
    if(treeNode.pow!= 2 && treeNode.pow!= 3){
    	getChildList(treeNode.path);
    	zTree.expandNode(treeNode,true);
    	var maxid = $("#ChildrenMaxids").attr("value");
    	if (treeNode.id != 0) {
    		getDirectoryChildren(maxid, treeNode.path, treeNode.pId, treeNode,idName2);
    	}
    }
};

//设置节点数据
function setDiretory(zNodes,idName) {
    //目录
	var setting = {
		    view:{
		        showLine: false,
		    },
		    async: {
		        enable: true,
		        url: "",
		        autoParam: ["id"]
		    },
		   
		    data: {
		        simpleData: {
		            enable: true
		        },
		        showTitle : true ,
		        key: {
		            title: "title"
		        },
		    },
		    callback: {
		        onClick: zTreeOnClick
		    }
		};
       $.fn.zTree.init($("#"+idName), setting, zNodes);
}

/**                 列表                    **/
//datatable数据表
function getChildList(e){
	$("#all").prop("checked",false);
	var type = $("#getPage").attr("type");
	 fileDirectory(type, e,1);
	var url = encodeURI("hisversion/getHisVersion?path=" + e + "&type=" + type);
	$('#Designlistviewtable').DataTable({
	    // "scrollY":'640px',
        "destroy": true,
        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "autoWidth": false,
        // "bAutoWidth": false,
	    tableTools: {
	        "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	        "aButtons": ["copy", "csv"]
	    },
	    "ajax": {
            "url": url,
            "type": "POST",
            "dataType": "json",
            "dataSrc": function (result) {
                var data = result.data;
                if (result.status == 1) {
                    if (data != null) {
//                        sortData(data, a);
                        for (var i = 0, ien = data.length; i < ien; i++) {
                        	var version="";
                        	if(data[i].hv.historyversion=="1"){
                        		version = "1.0";
                        	}else{
                        		version = data[i].hv.historyversion;
                        	}
                        	var name="";
                        	if(data[i].hv.filename.length>8){
                        		name=data[i].hv.filename.substring(0, 8)+" ...";
                        	}else{
                        		name=data[i].hv.filename;
                        	}
                        	data[i][0] ='<input type="checkbox" class="son" name="box" value="'+data[i].hv.versionid+'" version="'+version+'" id="'+data[i].hv.levels+'"  filename="'+data[i].hv.filename+'" tolurl="'+data[i].hv.url+'"/>';
                        	
                        	if (data[i].directory == true){
                        		data[i][1]="<span class='fileicon dir-small getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"' filesize='"+data[i].size+"'></span>&nbsp;&nbsp;&nbsp;"+name;
                        	}else if (data[i].directory == false) {
                                data[i][1] = "<span class='getAttr' filesize='"+data[i].size+"' path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'><img src='images/small-icon/" + deal(data[i].name) + ".png' class='fileicon'/></span>&nbsp;&nbsp;&nbsp;"+name;
                            }
                        	if (data[i].teamname =="1") {
                        		data[i][2] = "读（只能看，不能删）";
                        	}else if (data[i].teamname =="2") {
                        		data[i][2] = "写（只能删，不能看）";
                        	}else if (data[i].teamname =="3") {
                        		data[i][2] = "读写（不能看，不能删）";
                        	}else if (data[i].teamname =="1,2" || data[i].teamname ==null) {
                        		data[i][2] = "-";
                        	}
                        	
                        	//版本
                        	if (data[i].directory) {
                        		if(data[i].hv.historyversion=="0"){
                        			data[i][3] = "-";
                            	}else{
                            		if(data[i].hv.historyversion=="1"){
                                		data[i][3] = "1.0";
                                	}else{
                                		data[i][3] = data[i].hv.historyversion;
                                	}
                            	}
                        	} else {
                        		if(data[i].hv==null){
                        			data[i][3] = " ";
                        		}else{
                        			if(data[i].hv.historyversion=="1"){
                                		data[i][3] = "1.0";
                                	}else{
                                		data[i][3] = data[i].hv.historyversion;
                                	}
                        		}
                        	}
                        	//型号
                        	if (data[i].directory) {
                              data[i][4] = "-";
                        	} else {
                        		if(data[i].hv==null){
                        			data[i][4] = " ";
                        		}else{
                        			data[i][4] = data[i].hv.modelnum;
                        		}
                        	}
                        	//创建者
                        	if(data[i].hv==null){
                        		data[i][5] = " ";
                    		}else{
                    			data[i][5] = data[i].hv.createname;
                    		}
                        	//修改者
                        	if(data[i].hv==null){
                        		data[i][6] = " ";
                    		}else{
                    			data[i][6] = data[i].hv.updatename;
                    		}
                        	//创建时间
                        	if(data[i].hv==null){
                        		data[i][7] = " ";
                    		}else{
                    			var createtime=data[i].hv.createtime;
                    			createtime=createtime.substring(0, createtime.lastIndexOf("."));
                    			data[i][7] = createtime;
                    		}
                        	//修改时间
                        	if(data[i].hv==null){
                        		data[i][8] = " ";
                    		}else{
                    			var updatetime=data[i].hv.updatetime;
                    			if(updatetime==null){
                    				data[i][8] = " ";
                    			}else{
                    				updatetime=updatetime.substring(0, updatetime.lastIndexOf("."));
                    			}
                    			data[i][8] = updatetime;
                    		}
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
	//双击打开
	$('#Designlistviewtable').off().on('dblclick', '.list-view-item', function () {
		$(this).addClass('item-active').siblings().removeClass('item-active');
		openFile(1);
	});
	$("#Designlistviewtable").on("draw.dt", function () {
        $("#Designlistviewtable tbody tr").addClass('list-view-item');
        //tr添加属性
        var trLength = $(".list-view-item");
        for (var i = 0; i < trLength.length; i++) {
            var path = trLength.eq(i).find(".getAttr").attr("path");
            var value = trLength.eq(i).find(".getAttr").attr("value");
            var name = trLength.eq(i).find(".getAttr").attr("name");
            var power = trLength.eq(i).find(".getAttr").attr("power");
            var type = trLength.eq(i).find(".getAttr").attr("type");
            var filesize = trLength.eq(i).find(".getAttr").attr("filesize");
            trLength.eq(i).attr("path", path);
            trLength.eq(i).attr("value", value);
            trLength.eq(i).attr("name", name);
            trLength.eq(i).attr("power", power);
            trLength.eq(i).attr("type", type);
            trLength.eq(i).attr("filesize", filesize);
            trLength.eq(i).attr("title", value);
        }
    });
}

//获取切换路径
function getCurrentPath(e) {
    var index = 1;
    var urlid="";
    var arr = [];
    while (true) {
    	if(e=="1"){
    		urlid="urlbar";
    	}else if(e=="2"){
    		urlid="urlbar2";
    	}
        if ($("#"+urlid).find("li").find("a[name='" + index + "']").find("span").text() == "") {
            break;
        }
        arr.push($("#"+urlid).find("li").find("a[name='" + index + "']").find("span").attr("value"));
        index++;
    }
    var path = "";
    for (var i = 0; i < arr.length; i++) {
        path += "/" + arr[i];
    }
    return path;
}
//上级目录
function superior(e){
	 var index = 1;
	    var arr = [];
	    while (true) {
	    	if(e==1){
	    		if ($("#urlbar").find("li").find("a[name='" + index + "']").find("span").text() == "") {
	    			break;
	    		}
	    		arr.push($("#urlbar").find("li").find("a[name='" + index + "']").find("span").attr("value"));
	    	}else{
	    		if ($("#urlbar2").find("li").find("a[name='" + index + "']").find("span").text() == "") {
	    			break;
	    		}
	    		arr.push($("#urlbar2").find("li").find("a[name='" + index + "']").find("span").attr("value"));
	    	}
	        index++;
	    }
	    var path = "";
	    for (var i = 0; i < arr.length; i++) {
	        path += "/" + arr[i];
	    }
			if(arr.length==0) {
				modal("会话提示框","已是根目录");
				return;
			}
			//更新文件列表
			path=path.substring(0, path.lastIndexOf("/"));
			if(e==1){
				getChildList(path);
			}else{
				var types=$(".activeli").attr("type");
				remoteFilesList(types,path);
			}
}

//目录点击口
function directoryClickeds(e,fen) {
    var index = $(e).attr("name");
    var path = "";
    for (var i = 1; i <= index; i++) {
    	if(fen==1){
    		path += "/" + $("#urlbar").find(".dir").find("li").find("a[name='" + i + "']").find("span").attr("value");
    	}else if(fen==2){
    		path += "/" + $("#urlbar2").find(".dir").find("li").find("a[name='" + i + "']").find("span").attr("value");
    	}
    }
    //更新文件列表
    if(fen==1){
    	getChildList(path);
	}else if(fen==2){
		var types=$(".activeli").attr("type");
		remoteFilesList(types,path);
	}
    
}

//各级目录
function fileDirectory(type, path,e) {
	 var arr = (path + "").split("/");
	 if(e==2){
		 $("#urlbar2").empty();
	 }else if(e==1){
		 $("#urlbar").empty();
	 }
	    var nameText = "";
	    var html = "";
	    if (type == 55){
	        nameText = "产品数据";
	    } else if (type == 66){
	        nameText = "技术开发协同";
	    } else if (type == 77){
	        nameText = "业务技术协同";
	    } else  if (type == 1) {
	        nameText = "我的资料库";
	    } else if (type == 2) {
	        nameText = "团队资料库";
	    } else if (type == 3) {
	        nameText = "公司资料库";
	    } else if (type .length >8){
	        nameText = "部门资料库";
	    } else if (type == 11){
	        nameText = "标准知识";
	    } else if (type == 22){
	        nameText = "产品知识";
	    } else  if (type == 13) {
	        nameText = "业务知识";
	    }
	    if(e==2){
	    	  html += "<li><i class='fa fa-home' style='margin-right:5px;'></i><a href='javascript:;' onclick='returnroot();' style='text-decoration:none;'>" + nameText + "</a></li>";
		 }else if(e==1){
			  html += "<li><i class='fa fa-home' style='margin-right:5px;'></i><a href='javascript:;' onclick='returnHome();' style='text-decoration:none;'>" + nameText + "</a></li>";
		 }
	  
	    html += '<div class="dir" style="display: inline-block;"></div>';
	    if(e==2){
	    	$("#urlbar2").html(html);
		 }else if(e==1){
			 $("#urlbar").html(html);
		 }
	    var divHtml = "";
	    for (var i = 1; i < arr.length; i++) {
	        divHtml += '<li>';
	        var filename="";
	        if(e==2){
	        	 var teamname = getName(arr[i]);
	             if (teamname != "") {
	                 dd = teamname;
	             } else {
	            	 dd = decodeURI(arr[i]);
	             }
	             if(dd.length>8){
					 filename = dd.substring(0, 8)+" ...";
				 }else{
					 filename = dd;
				 }
	        	divHtml += "<a name='" + i + "' onclick='directoryClickeds(this,2)' style='text-decoration:none'><span value ='" + arr[i] + "'>" + decodeURI(filename) + "</span></a></li>";
			 }else if(e==1){
				 if(arr[i].length>8){
					 filename = arr[i].substring(0, 8)+" ...";
				 }else{
					 filename = arr[i];
				 }
				 divHtml += "<a name='" + i + "' onclick='directoryClickeds(this,1)' style='text-decoration:none'><span value ='" + arr[i] + "'>" + decodeURI(filename) + "</span></a></li>";
			 }
	    }
	    if(e==2){
	    	$("#urlbar2").find(".dir").html(divHtml);
		    dir($("#urlbar2").find(".dir").find("li"));
		 }else if(e==1){
			 $("#urlbar").find(".dir").html(divHtml);
			 dir($("#urlbar").find(".dir").find("li"));
		 }
	    
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
//返回Home
function returnHome() {
    var filePath = "";
	getChildList(filePath);
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


//打开文件夹
function openFile(e) {
	var typepower=$(".item-active").attr("type");
	var powerid =$(".active").find("a").attr("powerid");
	if(typeof(powerid) == "undefined"){
		modal("会话提示框", "无任何操作权限或权限已删除");
        return;
	}else{
		if(powerid.indexOf("7")!=-1){//可以打开
			if(typepower==2||typepower==3){
		    	modal("会话提示框", "此文件或文件夹没有查看权限!");
		    	return;
		    }	
		}else{
			modal("会话提示框", "没有查看权限!");
	    	return;
		}
	}
	var type = "";
    var filesize = $(".item-active").attr("filesize");
    var isDirectory = $(".item-active").attr("name");
    var path = $(".item-active").attr("path");
    var name = $(".item-active").attr("value");
    if(e==2){
    	type=$(".activeli").attr("type");
    }else{
    	type = $("#getPage").attr("type");
    }
    //path = encodeURI(path);
//    name = encodeURI(name);
    var username = $("#header-user").find(".username").text();
    //是文件夹
    if (isDirectory == "true") {
        //更新文件列表
    	if(e==1){
    		getChildList(path);
    	}else if(e==2){
    		remoteFilesList(type,path);
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
    		selectmodelfile(1);
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
                    url: "hisversion/findunzip",
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
                    	getRootDirectory("2","cloudtreeMove") ;
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
                        $('#ChangeSrc').attr('src', encodeURI("PDF/" + username + "/" + zhuan(name)));
                        $('#Pdf-modal').modal('show');
                    } else {
                        HidenLoad();
                        showLoadError();
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
                        showLoadError();
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
                    	var url ='../' + flvPath + username + '/' + nameArr[0] + '.flv';
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

//判断使用的图片
function deal(name) {
    var suffix = ['ai', 'bt', 'html', 'js', 'css', 'java', 'xml', 'ttf', 'txt', 'mmap', 'pdf', 'ppt', 'pptx', 'psd', 'xmind', 'rar', 'zip', 'tar', 'doc', 'docx', 'xls', 'xlsx'];
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
//function jin(){
//	var uplosding=$("#modalBody").find(".uploading");
//	console.log(uplosding);
//	if(uplosding.length==1&&uplosding.attr("type")!="100"){
//		$("#modalBody").find(".upBox").html(uplosding.html());
//	}
//}

/** 
 *                                    上传                                  **/
var load;
var filename='';
// 获取上传文件名称
function UploadDoc2(){
	var treeObj = $.fn.zTree.getZTreeObj("cloudtreeMove");
	var treeNode = treeObj.getSelectedNodes();
	if(treeNode.length==0){
		$("#UploadDoc2-modal").modal("hide");
		modal("会话提示框", "请选择目录");
		return;
	}
	var uplosding=$("#modalBody").find(".uploading");
	if(uplosding.length==1&&uplosding.attr("type")!="100"){
		modal("会话提示框", "文件正在上传，请稍等!");
		return;
	}
	var pattern = new RegExp("[$%#-]"); 
    load = $("#sliceUploads").sliceUpload({
        sliceValue:50*1024*1024,//默认是每片50M，可自定义修改此值，具体参见SliceUpload.js
        url:"upload/uploads",
        isTrigger:false
    });
    $('#UploadDoc2-modal').modal('toggle');
    $('.fileUpload').on("change",(function(){
    	var file = this.files[0];
    	filename=file.name;   	
    	if(filename.length>50){  
    		modal("会话提示框","文件名过长");     		
            return;  
        }
    	if(pattern.test(filename)){  
    		modal("会话提示框","不要使用特殊字符");  
            return;  
        }
    	 $("input[name='InputUrl']").val(filename);
    }));
}
function uplod(w){
	var modelnum=$('#modelnum').val();
	if(modelnum.length!=0&&modelnum.length>30){
		modal("警告提示!","型号长度在30位之间,请重新输入!");
		$('#modelnum').val('');
		return;
	}
	if(filename == ""){
		modal("会话提示框","请选择文件"); 
		return;
	}
	$("#upDocBtn").addClass('gray');
    $("#upLoad-modal").fadeIn(500);
    $("#fadeMax").trigger('click');
    $("#modalBody").attr("type","2");
	if(w=='1'){
		$("#modalBody").find('.uploading').remove();
		$("#upLoad-modal").fadeIn(500);
		$('#UploadDoc2-modal').modal('hide');
		var html='';
		var filenames="";
		if(filename.length>8){
			filenames=filename.substring(0, 8)+ " ...";;
		}else{
			filenames=filename;
		}
		html='<div class="uploading" type="0">'+
		'<div class="progress">'+
		'<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="jindu1">0%</div>'+
		'</div><span class="glyphicon glyphicon-pause" id="output"></span><span class="glyphicon glyphicon-play hide" id="continue"></span><span class="glyphicon glyphicon-remove" id="deljindu"></span><span class="upFileName" title="'+filename+'">'+filenames+'</span></div>';
		$("#modalBody").find(".upBox").append(html);
	}
		 load.uploadClick(function (a,b) {
			 if(a==true){
				 $("#modalBody").find("#jindu1").html(b+"%");
				 $("#modalBody").find("#jindu1").parent().parent().attr("type",b);
	    	}
	    	 var Ujin=$("#modalBody").find(".uploading");
	    	 var jinlength= Ujin.length;
	    	 $("#ujdcountid").html(jinlength);
	    });
}

$('#UploadDoc2-modal').off('hidden.bs.modal');
$('#UploadDoc2-modal').on('hidden.bs.modal', function () {
	$("input[name='InputUrl']").val("");
    $('#_upload_tool').val('');
    $('#modelnum').val('');
});
////TODO 上传(需限制上传的文件名只能包含数字和英文)
//function startUploads() {
//    var type = $("#getPage").attr("type");
//    var modelnum=$("#modelnum").val();
//    if (!$("#_upload_tool").val()) {
//        return;
//    }
//    //检查大小
//    var picFile = document.getElementById("_upload_tool");
//    var surplusSpace = $("#getSurplusSpaceSpan").attr("value");
//    var files = picFile.files;
//    var fileSize = 0;
//    for (var i = 0; i < files.length; i++) {
//        fileSize += files[i].size;
//    }
//    if (surplusSpace < fileSize) {
//        modal("会话提示框", "空间不足,请从新选择要上传的文件!");
//        return false;
//    }
//    //开始上传
//    var uploadForm = $("#uploadForm");
//    var path = getCurrentPath("1");
//    tips("正在上传,请耐心等待...", true);
//    uploadForm.ajaxSubmit({
//        url: "upload/uploadFiles",
//        type: "post",
//        dataType: "json",
//        data: {
//            "type": type,
//            "path": path,
//            "modelnum": modelnum
//        },
//        success: function (result) {
//            if (result.status == 1) {
//                tips("", false);
//                modal("会话提示框", "上传成功");
//                memory();
//                $("#UploadDoc2-modal").modal("hide");
//                $("input[name='InputUrl']").val("");
//                $('#_upload_tool').val('');
//                $('#modelnum').val('');
//                refreshCurrentPath();
//            } else if (result.status == -1) {
//            	tips("", false);
//            	$("#UploadDoc2-modal").modal("hide");
//            	modal("会话提示框", "上传文件名不能包含%或+");
//            } else {
//                LoadsError("上传失败,请稍后再试...", true);
//                LoadsError("", false);
//            }
//        },
//        error: function (e) {
//            modal("会话提示框", "未知异常，稍后再试");
//            tips("", false);
//        }
//    });
//}
/**                                   上传结束                                  **/

/**                                   新建文件夹                                  **/
//新建文件夹 modal
var fen=0;
function NewFolders(e){
	var treeObj = $.fn.zTree.getZTreeObj("cloudtreeMove");
	var treeNode = treeObj.getSelectedNodes();
	if(treeNode.length==0){
		$("#NewFolders-modal").modal("hide");
		modal("会话提示框", "请选择目录");
		return;
	}
	$("#inputFileName").val("");
    $('#NewFolders-modal').modal('toggle');
    fen=e;
    }

function createFiles() {
	var treeObj = $.fn.zTree.getZTreeObj("cloudtreeMove");
	var treeNode = treeObj.getSelectedNodes();
	var type = "";
	var filePath = "";
    //验证
	var fileName = $("#inputFileName").val();
	if(fen==1){
		type = $("#getPage").attr("type");
		filePath = getCurrentPath("1") + "/" + fileName;
	}else if(fen==2){
		type=$(".activeli").attr("type");
		filePath = getCurrentPath("2") + "/" + fileName;
	}
    var reg = /^[_.\w\u4E00-\u9FA5]+$/;
    if (fileName == "" || fileName.length == 0) {
        modal("会话提示框", "文件名不能为空");
        return;
    }
    if (fileName.length<1 || fileName.length>50) {
        modal("会话提示框", "文件名称长度在1~50位之间");
        return;
    }
    if (!reg.test(fileName)) {
        modal("会话提示框", "文件名只能包含汉字,英文,数字和下划线");
        return;
    }
    $('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
    	$.ajax({
            url: "hisversion/save",
            type: "post",
            dataType: "json",
            data: {
                "fileName": fileName,
                "url": filePath,
                "type": type
            },
            success: function (result) {
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
                            //清空创建弹窗的input值
                            $("#inputFileName").val("");
                            //关闭创建弹窗
                            $("#NewFolders-modal").modal("hide");
                            if(fen==1){
                            	if (treeNode[0].id != 0) {
        		                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, treeObj.getNodeByParam("id", treeNode[0].id, null));//触发函数
        		                } else {
        		                	getRootDirectory("2","cloudtreeMove") ;
        		                	//刷新对应的列表数据
        		                    refreshCurrentPath();
        		                }
                            }else if(fen==2){
                            	 returnNow();
                            }
                            //是否成功信息
                            modal("会话提示框", "创建成功");
                        }
                        if (result.status == 0) {
                            modal("会话提示框", "创建失败");
                        }
                        $("#inputFileName").val("");
                    }
                });
            	$('.disBtnIcon').attr('data-dismiss','modal');
                $(".disBtn").removeAttr("disabled");
            }
          });
    }
/**                                   新建文件夹结束                                  **/


/**                                   添加新产品                                      **/
$('#Add-modals').off('hide.bs.modal');
$('#Add-modals').on('hide.bs.modal',function(){
	deleLInshi();
	$(".beTips").hide();
	$(".emptyTips").hide();
	$(".specialTips").hide();
    $('#AddForm').find('.add').remove();
    $("#banben").val('');
    $("#guanjianzi").val('');
});
//添加其他标签
function addOther(){
    $('#OtherFolders-modal').modal('toggle');
}
$('#OtherFolders-modal').off('hide.bs.modal');
$('#OtherFolders-modal').on('hide.bs.modal',function(){
	$(".beTips").hide();
	$('#iconId').val('');
    $('#iconName').val('');
});
//添加产品
var linshi="";
function AddProducts(){
	var treeObj = $.fn.zTree.getZTreeObj("cloudtreeMove");
	var treeNode = treeObj.getSelectedNodes();
	if(treeNode.length==0){
		$("#NewFolders-modal").modal("hide");
		modal("会话提示框", "请选择目录");
		return;
	}
	if(treeNode[0].id!=0){
		$("#NewFolders-modal").modal("hide");
		modal("会话提示框", "选择根目录");
		return;
	}
    $("#Add-modals").modal('toggle');
    var nowtime = new Date().getTime();
	shijian=nowtime;
	var type = $("#getPage").attr("type");
	linshi=getCurrentPath("1")+"/"+shijian;
	  $.ajax({
	        url: "data/file/create",
	        type: "post",
	        dataType: "json",
	        data: {
	            path: linshi,
	            directory: true,
	            type: type
	        },
	        success: function (result) {
	        }
	    });
}
function createIcon(){
	var type = $("#getPage").attr("type");
	var uploading=$("#AddForm").find(".uploading").length+1;
    var labelName=$('#iconName').val().trim();//页面名字
    var labelnames=$("#AddForm").find(".add");
	 for (var i = 0; i < labelnames.length; i++) {
		 if(labelName==labelnames.eq(i).children(":first").attr("type")){
			 modal("会话提示框","此名称已存在");
			 return;
		 }
	}
    var labelNameReg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;;
    if(labelName==''){
        modal("会话提示框","目录名称必填哦");
        return;
    }else if(labelName.length<1 || labelName.length>10){
		modal("警告提示!","目录名称长度在1~10位之间,请重新输入!");
		return;
	}else if(labelName.length!=0&&!labelName.match(labelNameReg)){
		modal("警告提示!","目录名称只能是中英文、下划线、数字组成!");
		return;
	}else{
        var html = '<div class="form-group add">'+
            '<label class="col-sm-3 control-label" type="' + labelName + '">' + labelName + ':</label>'+
            '<div class="col-sm-5 main">' +
            '<label class="btn btn-default" style="width: 100px;margin-right: 3px;">本地文件 <input type="file" name="uploadFile" id="_upload_too'+uploading+ '" style="width:0;height: 0;opacity:0;" multiple="multiple" onchange="upload(this,\''+labelName+'\');">' +
            '</label>' +
            '<a class="js_update btn btn-default" href="javascript:;" filename="'+labelName+'" onclick="remoteFiles(this)">远程文件</a>'+
            '<span class="glyphicon glyphicon-remove" id="removeBtn" onclick="addremoveBtn(this);"></span>'+
            '<div class="uploading" style="cursor:pointer;display: none;">'+
            '<div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block">'+
            '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="jindu'+uploading+ '" style="line-height:15px;">'+
            '</div>' +
            '</div> '+
            '</div>'+
            '<div class="uploading2" style="cursor:pointer;display: none;" >'+
            '<div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block">'+
            '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="yuancheng'+uploading+'" style="line-height:15px;">'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        $('#addDirectoryBtn').before(html);
        $('.disBtnIcon').removeAttr('data-dismiss');
    	$(".disBtn").attr("disabled","disabled");
        $.ajax({
        	url: "data/file/create",
 	        type: "post",
 	        dataType: "json",
 	        data: {
 	            path: linshi+"/"+labelName,
 	            directory: true,
 	            type: type
 	        },
 	        success: function (result) {
 	        	$('.disBtnIcon').attr('data-dismiss','modal');
 	            $(".disBtn").removeAttr("disabled");
 	        	$('#OtherFolders-modal').modal('hide');
 	            $('#iconId').val('');
 	            $('#iconName').val('');
 	        }
        });
       
    }
}
//对名字进行判断是否在服务器上存在
function IfExist(e){
	 var labelName=$(e).val().trim();
	 var labelnames=$("#AddForm").find(".add");
	 for (var i = 0; i < labelnames.length; i++) {
		 if(labelName==labelnames.eq(i).children(":first").attr("type")){
			 $(e).parent().next().show();
			 return;
		 }else{
			 $(e).parent().next().hide();
		 }
	}
}
function addremoveBtn(e){
	$(e).parent().parent().attr("class","hide");
	var type = $("#getPage").attr("type");
	var labelName=$(e).parent().parent().children(":first").attr("type");
	$.ajax({
    	url: "data/file/delete",
	        type: "post",
	        dataType: "json",
	        data: {
	            path: linshi+"/"+labelName,
	            type: type
	        },
	        success: function (result) {
	        }
    });	 
}
//取消上传(虽然暂时没有用，但是如果哪里需要直接调用cancleUploadFile()这个方法即可)
function cancleUploadFile() {
    xmlHttpRequest.abort();
}
//远程上传文件
function copyFiles() {
	var types=$(".activeli").attr("type");
	var type = $("#getPage").attr("type");
	var filena= $("#rr").attr("file");
	var source = $("#Designlistviewtable3 input[name='box3']:checked").parent().parent();
	for (var i = 0; i < source.length; i++) {
			var sourced=source.eq(i).attr("path");
			var target = linshi+"/" + filena ;
			$.ajax({
				type: "POST",
	            url: "hisversion/yuancheng",
				dataType : "json",
				data : {
					source : sourced,
					destination : target,
					type1:types,
					type:type
				},
				success : function (result) {
					if(result.status == -1) {
					}
					if(result.status == 1) {
						$('#Remote-modals').modal('hide');
						var yuanchengid= $("#rr").attr("value");
//						$('#'+yuanchengid).html('100%');
//                        $('#'+yuanchengid).css("width" ,'100%');
//                        $('#'+yuanchengid).parent().parent('.uploading2').show();
                        $('#'+yuanchengid).parent().parent().next().find(".progress-bar").html('100%');
                        $('#'+yuanchengid).parent().parent().next().find(".progress-bar").css("width" ,'100%');
                        $('#'+yuanchengid).parent().parent().next().show();
					}
				}
			});
		}
}
//先建临时文件夹把上传的文件放进去，最后提交时再把它放进最终的knowname中
//上传本地文件
function upload(e,pathNames){
	var type = $("#getPage").attr("type");
	var path=linshi+"/"+pathNames;
	var types="2";
	if (!$(e).val()) {
        return;
    }
	//检查大小
	var picFile = document.getElementById($(e).attr("id"));
	var surplusSpace = $("#getSurplusSpaceSpan").attr("value");
	var files = picFile.files;
	var fileSize = 0;
	for (var i = 0; i < files.length; i++) {
	    fileSize += files[i].size;
	}
	if (surplusSpace < fileSize) {
	    modal("会话提示框", "空间不足,请从新选择要上传的文件!");
	    return false;
	}
	//开始上传
	var uploadFile = picFile.files; //获取文件对象
    // FormData 对象
    var form = new FormData();
    var size=0;
    for (var i = 0; i < uploadFile.length; i++) {
    	size+=uploadFile[i].size;
    	form.append("file",uploadFile[i]);   // 文件对象   
	}
    if(size>=5*1024*1024*1024){
    	 modal("会话提示框", "超过5G,请从新选择要上传的文件!");
    	 return;
    }
    form.append("path", path);
    form.append("type", type);
    form.append("types", types);
    var uploadUrl = "upload/uploadFiless";//异步上传地址
    $.ajax({
        cache: false,
        type: "POST",
        url: uploadUrl,
        contentType: false, 
        processData: false, 
        data: form,
        xhr: function(){ //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
        	 myXhr = $.ajaxSettings.xhr();
             if( myXhr.upload) { //检查进度函数和upload属性是否存在
            	 //绑定progress事件的回调函数
            	 var jinduid =$(e).parent().next().next().next().find('.progress-bar').attr('id');
	              $("#"+jinduid).parent().parent('.uploading').show();
	              myXhr.upload.addEventListener("progress",function progressFunction1(evt){//进度条控制
	        	  var completePercent = Math.round(evt.loaded / evt.total * 100)+ "%";
	        	  $("#"+jinduid).html(completePercent);
	        	  $("#"+jinduid).css("width" ,completePercent);
	              }, false);
             }
            return myXhr; //xhr对象返回给jQuery使用
        },
        error: function(request) {
        	 modal("会话提示框", "连接失败!");
        },
        success: function(data) {
        	$('#InputUrl').val('');
      	  	$('#'+$(e).attr("id")).val('');
        }
    });
}
function FileNameIfRepeat(e){
	var type = $("#getPage").attr("type");
	var knowname = $(e).val();
    var filePath = getCurrentPath("1") + "/" + knowname;
    var reg =/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    if(knowname.length==0){
		$(e).parent().next().show();
	}else{
        $(e).parent().next().hide();
	}
    if(!reg.test(knowname)&&knowname.length!=0){
        $(e).parent().next().next().next().show();
    }else{
        $(e).parent().next().next().next().hide();
    }
	$.ajax({
		 	url: "hisversion/getFileNameIfRepeat",
			type : "post",
			dataType : "json",
			data : {
				filename :knowname,
    			path: filePath,
    			type: type
			},
			success : function(result) {
				if(result.status == 1){
					$(e).parent().next().next().show();
				}else{
	                $(e).parent().next().next().hide();
				}
			}
	});
//	var type = $("#getPage").attr("type");
//	var knowname = $(e).val();
//    var filePath = getCurrentPath("1") + "/" + knowname;
//    var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
//    if (knowname == "" || knowname.length == 0) {
//        modal("会话提示框", "文件名不能为空");
//        return;
//    }
//    if (knowname.length > 50) {
//        modal("会话提示框", "文件名称不能超过50个字符");
//        return;
//    }
//    if (knowname.length<3 || knowname.length>30) {
//	    modal("会话提示框", "文件名称长度在3~20位之间");
//	    return;
//	}
//    if (!reg.test(knowname)) {
//        modal("会话提示框", "文件名只能包含汉字,英文,数字和下划线");
//        $(e).val("");
//        return;
//    }
//	$.ajax({
//		 	url: "hisversion/getFileNameIfRepeat",
//			type : "post",
//			dataType : "json",
//			data : {
//				filename :knowname,
//    			path: filePath,
//    			type: type
//			},
//			success : function(result) {
//				if(result.status == 1){
//					$(e).parent().next().show();
//				}else{
//	                $(e).parent().next().hide();
//				}
//			}
//	});
}

//提交
function commit(){
	var type = $("#getPage").attr("type");
	var knowname = $("input[name='knowledge']").val();
	var keyword=$("#guanjianzi").val();
	var reg =/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
	if(keyword.length>20){
		modal("警告提示!","关键字长度不能超过20,请重新输入!");
		return;
	}
	if(knowname==""){
		modal("警告提示!","产品名称不能为空!");
		return;
	}
	if (knowname.length<1 || knowname.length>50) {
	    modal("会话提示框", "产品名称长度在1~50位之间");
	    return;
	}else if(!reg.test(knowname)&&knowname.length!=0){
		 modal("会话提示框", "产品名称只能中英文、下划线、数字组成");
		 return;
    }
	var filePath = getCurrentPath("1") + "/" + knowname;
	var banben=$("#banben").val();
	var banbenReg=/^[A-Za-z0-9\.]+$/;
	if(banben.length>4){
		modal("警告提示!","版本号最长为4位!");
		return;
	}else if(!banben.match(banbenReg)){
		modal("警告提示!","版本号只能是英文字母和数字组成!");
		return;
	}
	var knowExp=$("#knowExp").val();
	if(knowExp.length!=0&&(knowExp.length>2000)){
		modal("警告提示!","产品说明长度不能超过2000,请重新输入!");
		return;
	}
	var jinduidssss=$("#AddForm").find(".progress-bar");
	for (var i = 0; i < jinduidssss.length; i++) {
		if(jinduidssss.eq(i).html()!=0){
			if(jinduidssss.eq(i).html()!="100%"){
				modal("警告提示!","暂未上传完成，请稍后!");
				 return
			}
		}
	}
	$('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	$.ajax({
	 	url: "hisversion/saveFile",
		type : "post",
		dataType : "json",
		data : {
			filename :knowname,
			path: filePath,
			type: type,
			banben:banben,
			knowExp:knowExp,
			linshi:linshi,
			keyword:keyword
		},
		success : function(result) {
			if(result.status == 1){
				$("input[name='knowledge']").val("");
				$("#banben").val("");
				$("#knowExp").val("");
				$("#guanjianzi").val("");
				$("#Add-modals").modal("hide");
                $('.add').hide();
				modal("会话提示框","成功");
                getRootDirectory("2","cloudtreeMove") ;
                refreshCurrentPath();
			}else if(result.status == -1){
				modal("操作提示!","产品名称已存在!");
				$("input[name='knowledge']").val("");
			}
			$('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
		}
	});
}
//删除临时文件
function deleLInshi(){
	var type = $("#getPage").attr("type");
    $("#document").val('');
    $("#knowExp").val('');
	 $.ajax({
         type: "get",
         dataType: "json",
         url: "data/file/delete",
         data: {
             path: linshi,
             type: type
         },
         success: function (result) {
        	 $("#AddForm").find(".uploading").hide();
        	 $("#AddForm").find(".uploading2").hide();
        	 $("#rr").attr("value", "");
         }
     });
}
////添加其他标签
//function addOther(){
//    $('#OtherFolders-modal').modal('toggle');
//}
//$('#OtherFolders-modal').off('hide.bs.modal');
//$('#OtherFolders-modal').on('hide.bs.modal',function(){
//	$('#iconId').val('');
//    $('#iconName').val('');
//});
//function createIcon(){
//	var uploading=$("#AddForm").find(".uploading").length+1;
//    var labelId=$('#iconId').val();//服务器上的名字
//    var labelName=$('#iconName').val();//页面名字
//    if(labelId==''||labelName==''){
//        modal("会话提示框","标签ID和标签名必填哦");
//        return;
//    }else{
//        var html = '<div class="form-group add">'+
//            '<label class="col-sm-3 control-label">' + labelName + ':</label>'+
//            '<div class="col-sm-6 main">' +
//            '<label class="btn btn-default" style="width: 100px;margin-right: 3px;">本地文件 <input type="file" name="uploadFile" id="_upload_too'+uploading+ '" style="width:0;height: 0;opacity:0;" multiple="multiple" onchange="upload(this,\''+labelId+'\');">' +
//            '</label>' +
//            '<a class="js_update btn btn-default" href="javascript:;" filename="'+labelId+'" onclick="remoteFiles(this)">远程文件</a>'+
//            '<div class="uploading" style="cursor:pointer;display: none;">'+
//            '<div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block">'+
//            '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="jindu'+uploading+ '" style="line-height:15px;">'+
//            '</div>' +
//            '</div> '+
//            '</div>'+
//            '<div class="uploading2" style="cursor:pointer;display: none;" >'+
//            '<div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block">'+
//            '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="yuancheng'+uploading+'" style="line-height:15px;">'+
//            '</div>'+
//            '</div>'+
//            '</div>'+
//            '</div>'+
//            '</div>';
//        $('#addDirectoryBtn').before(html);
//        $('#OtherFolders-modal').modal('hide');
//        $('#iconId').val('');
//        $('#iconName').val('');
//    }
//}

////提交
//function commit(){
//	var type = $("#getPage").attr("type");
//	var ddclass=$("#AddForm").find(".ddclass");
//	var ids = new Array();
//	for(var i = 0;i<ddclass.length;i++){
//		ids.push(ddclass.eq(i).attr("filename"));		
//	}
//	var knowname = $("input[name='knowledge']").val();
//	var keyword=$("#guanjianzi").val();
//	if(keyword.length>2000){
//		modal("警告提示!","关键字长度不能超过2000,请重新输入!");
//		return;
//	}
//	if(knowname==""){
//		modal("警告提示!","知识文档不能为空!");
//		return;
//	}
//	var filePath = getCurrentPath("1") + "/" + knowname;
//	var banben=$("#banben").html();
//	banben=banben.substring(banben.lastIndexOf("V")+1).trim();
//	var knowExp=$("#knowExp").val();
//	if(knowExp.length!=0&&(knowExp.length>2000)){
//		modal("警告提示!","知识说明长度不能超过2000,请重新输入!");
//		return;
//	}
//	var jinduidssss=$("#AddForm").find(".progress-bar");
//	for (var i = 0; i < jinduidssss.length; i++) {
//		if(jinduidssss.eq(i).html()!=0){
//			if(jinduidssss.eq(i).html()!="100%"){
//				modal("警告提示!","暂未上传完成，请稍后!");
//				 return
//			}
//		}
//	}
//	$.ajax({
//	 	url: "hisversion/saveFile",
//		type : "post",
//		dataType : "json",
//		data : {
//			filename :knowname,
//			path: filePath,
//			type: type,
//			banben:banben,
//			knowExp:knowExp,
//			linshi:linshi,
//			keyword:keyword,
//			ids:ids.join(",")
//		},
//		success : function(result) {
//			if(result.status == 1){
//				$("input[name='knowledge']").val("");
//				$("#banben").html("V 1.0");
//				$("#knowExp").val("");
//				$("#guanjianzi").val("");
//				$("#Add-modals").modal("hide");
//                $('.add').hide();
//				modal("会话提示框","成功");
//                getRootDirectory("2","cloudtreeMove") ;
//                refreshCurrentPath();
//			}	
//		}
//	});
//}
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
function findDept() {
    var deptRamid = 0;
    var userName=$("#toName").html();
    $.ajax({
        url: "user/findSelfMess",
        type: "post",
        dataType: "json",
        async: false,
        data:{
        	userName:userName
        },
        success: function (result) {
            var user = result.data;
            if (result.status == 1) {
            	deptRamid = user.department.randomId;
            }
        }
    });
    return deptRamid;
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

function returnNow(){
	var filepath = getCurrentPath('2');
    var types=$(".activeli").attr("type");
    remoteFilesList(types,filepath);
}
function returnroot(){
	var filepath = "";
    var types=$(".activeli").attr("type");
    remoteFilesList(types,filepath);
}
$(".main .left ul li").on('click',function(){
	$(this).addClass('activeli').siblings().removeClass('activeli');
	var filepath = "";
    var types=$(".activeli").attr("type");
    remoteFilesList(types,filepath);
});
//远程文件
function remoteFiles(e){
	$(".main .left ul li:first-child").addClass('activeli');
    $("#Remote-modals").modal('show');
    $("#rr").attr("value",$(e).next().next().find(".progress-bar").attr('id')); 
    var filename=$(e).attr("filename");
    $("#rr").attr("file",filename);
}

$("#Remote-modals").off('shown.bs.modal');
$("#Remote-modals").on('shown.bs.modal', function () {
	var teamid=findTeam();
	var deptRamid =findDept();
	$("#deptramid").attr("type",deptRamid);
	var types=$(".activeli").attr("type");
	if(types==""){
		modal("会话提示框","请先加入部门！");
	}
	if(types=="2"&&teamid==""){
		modal("会话提示框","请先加入团队！");
	}
	var filepath = "";
    var types=$(".activeli").attr("type");
    remoteFilesList(types,filepath);
   
});

$('#CopyNewFolder-modals').off('hidden.bs.modal');
$('#CopyNewFolder-modals').on('hidden.bs.modal', function () {
	$("#createDirectoryInputs").val("");
});
//新建文件夹
function createDirectorys() {
    var type = $("#getPage").attr("type");
    var child_path = $("#createDirectoryInputs").attr("name");
    var folderName = $("#createDirectoryInputs").val();
    var reg = /^[_\w\u4E00-\u9FA5]+$/;
    if (folderName == "" || folderName.length == 0) {
        modal("会话提示框", "文件名不能为空");
        return;
    }
    if (folderName.length<1 || folderName.length>50) {
        modal("会话提示框", "文件名称长度在1~50位之间");
        return;
    }
    if (!reg.test(folderName)) {
        modal("会话提示框", "文件名只能包含汉字,英文,数字和下划线");
        return;
    }
    $.ajax({
        url: "hisversion/create",
        type: "post",
        dataType: "json",
        data: {
            path: child_path + "/" + folderName,
            directory: true,
            type: type
        },
        success: function (result) {
            if (result.status == 1) {
                var treeObj = $.fn.zTree.getZTreeObj("cloudtreeCopy");
                var treeNode = treeObj.getSelectedNodes();
                if (treeNode[0].id != 0) {
                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, treeObj.getNodeByParam("id", treeNode[0].id, null));//触发函数
                } else {
                	 getRootDirectory("2","cloudtreeCopy") ;
                }
                $("#CopyNewFolder-modals").modal("hide");
                $("#createDirectoryInputs").val("");
                modal("会话提示框", "创建目录成功!");
            }
            if (result.status == 0) {
                modal("会话提示框", "创建目录失败!");
            }
        }
    });
}
//复制
var versionid;
function copyModals() {
	versionid=$("#Designlistviewtable input[name='box']:checked");
	if (versionid.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    $("#copyMoveSpanTexts").attr("value","copy");
    $("#copyMoveSpanTexts").html("复制到");
    $('#copy-modals').modal('toggle'); 
}
function moveModals() {
	versionid=$("#Designlistviewtable input[name='box']:checked");
	if (versionid.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
	$("#copyMoveSpanTexts").attr("value","move");
	$("#copyMoveSpanTexts").html("移动到");
    $('#copy-modals').modal('toggle'); 
}
function CopyMoveOpters() {
    var type = $("#copyMoveSpanTexts").attr("value");
    if (type == "copy") {
        fileCopys();
    } else {
    	filemoves();
    }
}
//复制
function fileCopys() {
	var checkFile=versionid;
    var treeObj = $.fn.zTree.getZTreeObj("cloudtreeCopy");
    var treeNode = treeObj.getSelectedNodes();
    if(treeNode.length != 1){
        modal("会话提示框", "请选择一项");
        return;
    }
    var treepath=treeNode[0].path;
    var type = $("#getPage").attr("type");
    var filePath = [];
    var filename = [];
    for (var i = 0; i < checkFile.length; i++) {
         filePath.push(checkFile.parent().parent().eq(i).attr("path"));//源文件lujing
         filename.push(checkFile.eq(i).attr("filename"));
    }
    ShowLoad();
    $('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
        $.ajax({
            type: "POST",
            url: "hisversion/copy",
            data: {
            	"filename": filename.join(","),
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
                    refreshCurrentPath();
                }else if (result.status == 2) {
                	 modal("会话提示框", "文件或文件夹已存在!");
                }
                $('#copy-modals').modal('hide');
            }
        });
}
//复制
function filemoves() {
	var checkFile=versionid;
    var treeObj = $.fn.zTree.getZTreeObj("cloudtreeCopy");
    var treeNode = treeObj.getSelectedNodes();
    if(treeNode.length != 1){
        modal("会话提示框", "请选择一项");
        return;
    }
    var treepath=treeNode[0].path;
    var type = $("#getPage").attr("type");
    var filePath = [];
    var filename = [];
    for (var i = 0; i < checkFile.length; i++) {
         filePath.push(checkFile.parent().parent().eq(i).attr("path"));//源文件lujing
         filename.push(checkFile.eq(i).attr("filename"));
    }
    ShowLoad();
    $('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
        $.ajax({
            type: "POST",
            url: "hisversion/move",
            data: {
            	"filename": filename.join(","),
                "source": filePath.join(","),
                "destination": treepath,
                "type": type
            },
            success: function (result) {
            	HidenLoad();
            	$('.disBtnIcon').attr('data-dismiss','modal');
                $(".disBtn").removeAttr("disabled");
                if (result.status == 1) {
                    modal("会话提示框", "移动成功!");
                    memory();
                    refreshCurrentPath();
                }else if (result.status == 2) {
                	 modal("会话提示框", "文件或文件夹已存在!");
                }
                $('#copy-modals').modal('hide');
            }
        });
}
function remoteFilesList(types,filePath){
	fileDirectory(types, filePath,2);
	var value="";
    var url = encodeURI("data/file?path=" + filePath + "&type=" + types+ "&value=" + value);
    var memberManagement1 = null;
    if (memberManagement1) {
    } else {
        memberManagement1 = $('#Designlistviewtable3').DataTable({
                "scrollY": '350px',
				"destroy": true,
				"paging": false,
				"searching": false,
				"info": false,
				"ordering": false,
				"autoWidth": false,
                "ajax": {
                    "url": url,
                    "type": "POST",
                    "dataType": "json",
                    "dataSrc": function (result) {
                        var data = result.data;
                        if (result.status == 1) {
                            if (data != null) {
                                for (var i = 0, ien = data.length; i < ien; i++) {
                                	data[i][0] ='<input type="checkbox" class="son3" onclick="selectAll3()" name="box3" path="'+data[i].path+'"/>';
                                	if (data[i].directory == true){
                                		data[i][1]="<span class='fileicon dir-small getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"' filesize='"+data[i].size+"'></span>&nbsp;&nbsp;&nbsp;"+data[i].name;
                                	}else if (data[i].directory == false) {
                                        data[i][1] = "<span class='getAttr' filesize='"+data[i].size+"' path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'><img src='images/small-icon/" + deal(data[i].name) + ".png' class='fileicon'/></span>&nbsp;&nbsp;&nbsp;"+data[i].name;
                                    }
                                	
                                	if (data[i].directory) {
                                        data[i][2] = "-";
                                    } else {
                                        data[i][2] = colFileSize(data[i].size);
                                    }
                                	
                                	if (data[i].directory) {
                                        data[i][3] = "目录";
                                    } else {
                                        data[i][3] = "文件";
                                    }
                                	 data[i][4] = format(data[i].lastUpdated);
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
    }
  //双击打开
    $('#Designlistviewtable3').off().on('dblclick', '.list-view-item', function () {
        $(this).addClass('item-active').siblings().removeClass('item-active');
        openFile(2);
    });
    $("#Designlistviewtable3").on("draw.dt", function () {
        $("#Designlistviewtable3 tbody tr").addClass('list-view-item');
        //tr添加属性
        var trLength = $(".list-view-item");
        for (var i = 0; i < trLength.length; i++) {
            var path = trLength.eq(i).find(".getAttr").attr("path");
            var value = trLength.eq(i).find(".getAttr").attr("value");
            var name = trLength.eq(i).find(".getAttr").attr("name");
            var power = trLength.eq(i).find(".getAttr").attr("power");
            var type = trLength.eq(i).find(".getAttr").attr("type");
            var filesize = trLength.eq(i).find(".getAttr").attr("filesize");
            trLength.eq(i).attr("path", path);
            trLength.eq(i).attr("value", value);
            trLength.eq(i).attr("name", name);
            trLength.eq(i).attr("power", power);
            trLength.eq(i).attr("type", type);
            trLength.eq(i).attr("filesize", filesize);
        }
    });
}


function delRemoteFiles(){
	var fileLength = $("#Designlistviewtable3 input[name='box3']:checked");
	if(fileLength.length < 1) {
		modal("会话提示","请至少选择一项");
		return;
	}
	if(!confirm("确定要移除你选择的用户吗?")){
		return;
	}
	var types=$(".activeli").attr("type");
    var filePath = new Array();
    for (var i = 0; i < fileLength.length; i++) {
    	filePath.push(fileLength.eq(i).attr("path"));
    }
    ShowLoad();
        $.ajax({
            type: "get",
            dataType: "json",
            url: "data/file/delete",
            data: {
                path: filePath.join(","),
                type: types
            },
            success: function (result) {
            	HidenLoad(); 
                if (result.status == 1) {
                    modal("会话提示框", "删除成功");
                    //刷新对应的列表
                   returnNow();
                }
                if (result.status == 0) {
                    modal("会话提示框", "删除失败");
                }
            }
        });
}
/**                                   /添加新产品                                      **/

/**   下载    **/
var fileNameDate;
fileNameDate = new Date().getTime();
function downModalss(){
    $('#down-modals').modal('toggle');
};
function downloads(id) {
	var type = $("#getPage").attr("type");
	var checkFile="";
	var versionid="";
	if(id=="1"){
		checkFile=$("#Designlistviewtable2 input[name='box2']:checked").parent().next().find("span");
		versionid=$("#Designlistviewtable2 input[name='box2']:checked");
	}else if(id=="2"){
		checkFile=$("#Designlistviewtable input[name='box']:checked").parent().parent();
		versionid=$("#Designlistviewtable input[name='box']:checked");
	}
	if(versionid.length < 1) {
		modal("会话提示","请至少选择一项");
		return;
	}
	var versionids = [];
	for (var i = 0; i < versionid.length; i++) {
		versionids.push(versionid.eq(i).attr("value"));
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
//               window.location.href = "data/file/download?path=" + encodeURI(sourceFileName) + "&type=" + type + "&isCompress=" + false;
           	window.location.href = "data/file/download?path=" + zhuan(sourceFileName) + "&type=" + type + "&isCompress=" + false;
           } else {
//               window.open("data/file/download?path=" + encodeURI(sourceFileName) + "&type=" + type + "&isCompress=" + false);
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
   $("#down-modals").modal("hide");
}

function getHistoryList(){
	$("#all2").prop("checked",false);
    historyDatas();
}
$("#History-modal").off('hidden.bs.modal');
$("#History-modal").on('hidden.bs.modal',function() {
	$("#History-modal .top").find("a").eq(1).removeClass("hide");
});

//查看历史版本
$("#History-modal").off('shown.bs.modal');
$("#History-modal").on('shown.bs.modal',function() {
	var checktypepower=$("#Designlistviewtable input[name='box']:checked").parent().parent().attr("type");
	var powerid = $(".active").find("a").attr("powerid");
	if(powerid.indexOf("6")!=-1){
		if(checktypepower=="1" || checktypepower=="3"){
			$("#History-modal .top").find("a").eq(1).addClass("hide");
			//不显示
		}
	}else{
		if(checktypepower=="1" || checktypepower=="3" || checktypepower=="1,2"){
			//不显示
			$("#History-modal .top").find("a").eq(1).addClass("hide");
		}
	}
    historyDatas();
});

function History() {
	var checkFile=$("#Designlistviewtable input[name='box']:checked").parent().parent();
	var checkid=$("#Designlistviewtable input[name='box']:checked");
	if(checkid.length==0) {
		modal("警告提示","请选择一项");
		return;
	}
	if(checkid.length>1) {
		modal("警告提示","请选择一项或不要选择多项");
		return;
	}
	if(checkFile.attr("name")=="true"){
		modal("会话提示框", "目录不可查看历史");
		return;
	}
	$("#History-modal").modal('show');

}
//刷新版本表格信息
function historyDatas(){
	var checkid=$("#Designlistviewtable input[name='box']:checked");
	if(checkid.length==0) {
		modal("警告提示","请选择一项");
		return;
	}
	var type = $("#getPage").attr("type");
    var checkFile=$("#Designlistviewtable input[name='box']:checked").parent().parent();
    var checkid=$("#Designlistviewtable input[name='box']:checked");
    var levels=checkid.attr("id");
    var versionid=checkid.attr("value");
    var filename=checkid.attr("filename");
    var path=checkFile.attr("path");
    path=path.substring(0,path.lastIndexOf("/"));
    var url = encodeURI("hisversion/findHisVersions");
    var memberManagement = null;
    if (memberManagement) {
        memberManagement.ajax.url(url).load();
    } else
    {
        memberManagement = $('#Designlistviewtable2').DataTable({
            "scrollY": '350px',
            "destroy": true,
            "paging": false,
            "searching": false,
            "info": false,
            "ordering": false,
            "autoWidth": false,
            "ajax": {
                "url": url,
                "type": "POST",
                "dataType": "json",
                "data": {
                    type: type,
                    levels: levels,
                    versionid: versionid,
                    filename: filename,
                    path: path
                },
                "dataSrc": function (result) {
                    var data = result.data;
                    if (result.status == 1) {
                        if (data != null) {
//                                sortData(data, a);
                            for (var i = 0, ien = data.length; i < ien; i++) {
                                data[i][0] = '<input type="checkbox" class="son2" name="box2" onclick="selectAll2()" value="' + data[i].hv.versionid + '" id="' + data[i].hv.levels + '"/>';
                                data[i][1] = "<span class='getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='" + data[i].teamname + "' power='" + data[i].power + "'><img src='images/small-icon/" + deal(data[i].name) + ".png' class='fileicon'/></span>&nbsp;&nbsp;&nbsp;" + data[i].hv.filename;
                                //版本
                                if (data[i].hv == null) {
                                    data[i][2] = " ";
                                } else {
                                	if(data[i].hv.historyversion=="1"){
                                		data[i][2] = "1.0";
                                	}else{
                                		data[i][2] = data[i].hv.historyversion;
                                	}
                                }
                                //型号
                                if (data[i].hv == null) {
                                    data[i][3] = " ";
                                } else {
                                    data[i][3] = data[i].hv.modelnum;
                                }
                                //创建者
                                if (data[i].hv == null) {
                                    data[i][4] = " ";
                                } else {
                                    data[i][4] = data[i].hv.createname;
                                }
                                //修改者
                                if (data[i].hv == null) {
                                    data[i][5] = " ";
                                } else {
                                    data[i][5] = data[i].hv.updatename;
                                }
                                //创建时间
                                if (data[i].hv == null) {
                                    data[i][6] = " ";
                                } else {
                                    var createtime = data[i].hv.createtime;
                                    createtime = createtime.substring(0, createtime.lastIndexOf("."));
                                    data[i][6] = createtime;
                                }
                                //修改时间
                                if (data[i].hv == null) {
                                    data[i][7] = " ";
                                } else {
                                    var updatetime = data[i].hv.updatetime;
                                    if (updatetime == null) {
                                        data[i][7] = " ";
                                    } else {
                                        updatetime = updatetime.substring(0, updatetime.lastIndexOf("."));
                                    }
                                    data[i][7] = updatetime;
                                }
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
    }
    //双击打开
    $('#Designlistviewtable2').off().on('dblclick', '.list-view-item', function () {
        $(this).addClass('item-active').siblings().removeClass('item-active');
        openFile(1);
    });
    $("#Designlistviewtable2").on("draw.dt", function () {
        $("#Designlistviewtable2 tbody tr").addClass('list-view-item');
        //tr添加属性
        var trLength = $(".list-view-item");
        for (var i = 0; i < trLength.length; i++) {
            var path = trLength.eq(i).find(".getAttr").attr("path");
            var value = trLength.eq(i).find(".getAttr").attr("value");
            var name = trLength.eq(i).find(".getAttr").attr("name");
            var power = trLength.eq(i).find(".getAttr").attr("power");
            var type = trLength.eq(i).find(".getAttr").attr("type");
            var filesize = trLength.eq(i).find(".getAttr").attr("filesize");
            trLength.eq(i).attr("path", path);
            trLength.eq(i).attr("value", value);
            trLength.eq(i).attr("name", name);
            trLength.eq(i).attr("power", power);
            trLength.eq(i).attr("type", type);
            trLength.eq(i).attr("filesize", filesize);
        }
    });
}



//删除
function delModals(e){
	var powerid = $(".active").find("a").attr("powerid");
	var num=0;
	if(e=="1"){
		var versionchecks=$("#Designlistviewtable2 input[name='box2']:checked");
		if(powerid.indexOf("6")!=-1){
			for(var i = 0;i<versionchecks.length;i++){
				if(versionchecks.eq(i).parent().parent().attr("type")=="1"||versionchecks.eq(i).parent().parent().attr("type")=="3"){
					num++;
				}
			}
			if(num>0){
				modal("警告提示","选择的有不能删除的文件");
				return;
			}
		}else{
			for(var i = 0;i<versionchecks.length;i++){
				if(versionchecks.eq(i).parent().parent().attr("type")=="1"||versionchecks.eq(i).parent().parent().attr("type")=="3"||versionchecks.eq(i).parent().parent().attr("type")=="1,2"){
					num++;
				}
			}
			if(num>0){
				modal("警告提示","选择的有不能删除的文件");
				return;
			}
		}
		if(versionchecks.length==0) {
			modal("警告提示","请选择一项");
			return;
		}
		$('#dels-modals').modal('show');
	}else if(e=="2"){
		var versioncheck=$("#Designlistviewtable input[name='box']:checked");
//		powerType=$("#Designlistviewtable input[name='box']:checked").parent().parent().attr("type");
		if(powerid.indexOf("6")!=-1){
			for(var i = 0;i<versioncheck.length;i++){
				if(versioncheck.eq(i).parent().parent().attr("type")=="1"||versioncheck.eq(i).parent().parent().attr("type")=="3"){
					num++;
				}
			}
			if(num>0){
				modal("警告提示","选择的有不能删除的文件");
				return;
			}
		}else{
			for(var i = 0;i<versioncheck.length;i++){
				if(versioncheck.eq(i).parent().parent().attr("type")=="1"||versioncheck.eq(i).parent().parent().attr("type")=="3"||versioncheck.eq(i).parent().parent().attr("type")=="1,2"){
					num++;
				}
			}
			if(num>0){
				modal("警告提示","选择的有不能删除的文件");
				return;
			}
		}
		
		if(versioncheck.length==0) {
			modal("警告提示","请选择一项");
			return;
		}
		$('#del-modalsd').modal('show');
	}
}
//删除历史版本中选中的
function delHisVer(e){
	var treeObj = $.fn.zTree.getZTreeObj("cloudtreeMove");
	var treeNode = treeObj.getSelectedNodes();
	var type = $("#getPage").attr("type");
	var types=e;
	var versionid=0;
	var path="";
	var versionchecks=$("#Designlistviewtable2 input[name='box2']:checked");
	var versioncheck=$("#Designlistviewtable input[name='box']:checked");
	if(types=="1"){
		ShowLoad();
		for(var i = 0;i<versionchecks.length;i++){
			versionid=versionchecks.eq(i).attr("value");
			path=versionchecks.eq(i).parent().next().find("span").attr("path");
			$.ajax({
				url : "hisversion/delHisVersion",
				type : "post",
				dataType : "json",
				data :{
					"versionid": versionid,
					"types":types,
					"type":type,
					"path":path
				},
				success : function(result){
					 if (result.status == 1) {
						$('#History-modal').modal('show');
						historyDatas();
						modal("会话提示框", "删除成功！"); 
						$('#dels-modals').modal('hide');
					 }else{
						modal("会话提示框", "删除失败！");
					 }
				}
			});
		}
		HidenLoad();
	}else if(types=="2"){
		ShowLoad();
		for(var i = 0;i<versioncheck.length;i++){
			versionid=versioncheck.eq(i).attr("value");
			path=versioncheck.eq(i).parent().parent().attr("path");
			$.ajax({
				url : "hisversion/delHisVersion",
				type : "post",
				dataType : "json",
				data :{
					"versionid": versionid,
					"types":types,
					"type":type,
					"path":path
				},
				success : function(result){
					 if (result.status == 1) {
						refreshCurrentPath();
						if (treeNode[0].id != 0) {
				             treeObj.setting.callback.onClick(null, treeObj.setting.treeId, treeObj.getNodeByParam("id", treeNode[0].id, null));//触发函数
				        } else {
				              getRootDirectory("2","cloudtreeMove") ;
				        }
						modal("会话提示框", "删除成功！"); 
						$('#del-modalsd').modal('hide');
					 }else{
						 modal("会话提示框", "删除失败！");
					 }
				}
			});
		}
		HidenLoad();
	}
}

//资料库搜索
function searchKey() {
    var keyWordName = $('#keyWord').val();
    var keyVaueTbody = $('#Designlistviewtable').find('tbody').find('tr');
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

}

$('#keyWord').bind('input propertychange', function () {
    searchKey();
});

//全选
function checkAll(){
	if($("#all").prop("checked") == true){
		$(".son").prop("checked",true);
	}else{
		$(".son").prop("checked",false);
	}

}
function checkAll2(){
    if($("#all2").prop("checked") == true){
        $(".son2").prop("checked",true);
    }else{
        $(".son2").prop("checked",false);
    }
}
function checkAll3(){

    if($("#all3").prop("checked") == true){
        $(".son3").prop("checked",true);
    }else{
        $(".son3").prop("checked",false);
    }
}
function selectAll(){
	var count = $("input[name=box]:checked").length;
	 if(count==$(".son").length){
	 	$("#all").prop("checked",true);
 	}else{
 		$("#all").prop("checked",false);
 	}

}
function selectAll2(){
    var count = $("input[name=box2]:checked").length;
    if(count==$(".son2").length){
        $("#all2").prop("checked",true);
    }else{
        $("#all2").prop("checked",false);
    }
}
function selectAll3(){
    var count = $("input[name=box3]:checked").length;
    if(count==$(".son3").length){
        $("#all3").prop("checked",true);
    }else{
        $("#all3").prop("checked",false);
    }
}
//删除服务器上临时文件夹
function delLinshiFiles(){
	var type = $("#getPage").attr("type");
	$.ajax({
		url : "hisversion/delLinshiFiles",
		type : "post",
		dataType : "json",
		data :{
			"type":type
		},
		success : function(result){
			 if (result.status == 1) {
			 }
		}
	});
}


function rooturl(){
	var rooturl="";
	$.ajax({
		url : "hisversion/findRootUrl",
		type : "post",
		dataType : "json",
		async:false,
		success : function(result){
			 if (result.status == 1) {
				rooturl=result.data;
			 }
		}
	});
	return rooturl;
}

/**                                 模型文件                                  **/


var vctPlayObj = null;
//查看模型文件
function selectmodelfile(e){
	var checkFiles ="";
	if(e==2){
		checkFiles = $("#Designlistviewtable input[name='box']:checked");
		if(checkFiles.length ==0) {
			modal("会话提示框","请至少选择一项");						
			return;
		}
		if(checkFiles.length > 1) {
			modal("会话提示框","请选择一项");						
			return;
		}
	}else if(e==1){
		checkFiles = $("#Designlistviewtable .item-active").find("input[name='box']");
	}
	var checkF = checkFiles.attr("tolurl");
	var checkFile =checkF.substring(0,checkF.lastIndexOf("/"));
	var fileName =checkF.substring(checkF.lastIndexOf("/")+1);
	var version= checkFiles.attr("version");
	var prefix = fileName.substring(0,fileName.lastIndexOf("."));
	//截取.之后的部分
	var suffix = fileName.substring(fileName.lastIndexOf("."));
		if(suffix != ".cax" && suffix != ".wcax"){
				modal("会话提示框","请选择模型文件");						
			return;
		}
		//判断客户选择的路径是否是我们指定的路径下，因为在tomcat配置文件中对于获取静态资源的位置做了限制
		var filePath =null;
		if(version == "1.0"){
			filePath = checkFile+"/"+fileName;
		}else{
			filePath =checkFile+"/"+prefix+version+suffix;
		}
		var ding= rooturl();
		//对字符串进行截取，我们智取	/hpc/hpcapp/daicy/sclouds  后面的部分
		var yong=filePath.substring(ding.length);
		var filezhen= path1+"cax"+yong;
		//在此调出模态框
		 vctPlayObj = VCTPlay();
		 //vctPlayObj.loadFile("samples/beam.wcax");
		 vctPlayObj.loadFile(filezhen);
		$("#NewFolders-modal2").modal('toggle');
}

$("#NewFolders-modal2").off('hidden.bs.modal');
$("#NewFolders-modal2").on("hidden.bs.modal",function(){
	 if (vctPlayObj) {
	        vctPlayObj.clear();
	        delete vctPlayObj;
	    }
});

function loadFile(_file) {
  var file = encodeURIComponent(_file);
  vctPlayObj.loadFile(file);
}
function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var file = ev.dataTransfer.files[0];
  if (file)
      vctPlayObj.loadLocalFile(file);

}

function savePower(){
	var type= $(".active").find("a").attr("type");
	var fileLength = $("#Designlistviewtable input[name='box']:checked");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    var filePaths = new Array();
    for (var i = 0; i < fileLength.length; i++) {
    	filePaths.push(fileLength.eq(i).parent().parent().attr("path"));
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
        		 $('#limit-modal').modal('hide');
        		 var treeObjs = $.fn.zTree.getZTreeObj("cloudtreeMove");
        		 var treeNode = treeObjs.getSelectedNodes();
        			if (treeNode[0].id!=0) {
        		        treeObjs.setting.callback.onClick(null, treeObjs.setting.treeId, treeObjs.getNodeByParam("id", treeNode[0].id, null));//触发函数
        		    } else {
        		    	getRootDirectory("2","cloudtreeMove") ;
        		    }
        		 
        	}
        }
    });
}
$('#limit-modal').off('hidden.bs.modal');
$('#limit-modal').on('hidden.bs.modal', function () {
	 $("#filenameid").attr("value","");
	 $("#searchUser").attr("value","");
	 $("input[name='checkbox']").attr("checked",false);
});
/*权限按钮*/
function limitSetModals(){
		var fileLength = $("#Designlistviewtable input[name='box']:checked");
	    if (fileLength.length < 1) {
	        modal("会话提示框", "请至少选择一项");
	        return;
	    }
	    var filenames = new Array();
	    for (var i = 0; i < fileLength.length; i++) {
	    	filenames.push(fileLength.eq(i).attr("filename"));
	    }
	    $('#limit-modal').modal('toggle');
	    $("#filenameid").attr("value",filenames.join(","));
	    getDepts();
}

//按照部门查询所有成员
function getDepts(){
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
        		 setTrees(zNodes);
        		 $("#searchUser").val("");
        	 }
         }
     });
}
/****************权限************************/
//设置节点数据
function setTrees(zNodes){
	//目录
	var setting = {
	    view:{
	        showLine:false,
	        showIcon: false,
          fontCss:setHighlights
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
function setHighlights(treeId, treeNode){
  return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}
var timeoutId = null;
function searchNodeLazys(value,id) {
  if (timeoutId) {
      clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(function(){
      showSelecteds(id,'name',value);
  }, 300);
}
//搜索到的数组
var nodeList=[];
function showSelecteds(id,key,value){
  var treeId = id;
  updateNodess(false);
  if(value!= ""){
      var treeObj = $.fn.zTree.getZTreeObj(treeId);
      treeObj.expandAll(false);
      nodeList = treeObj.getNodesByParamFuzzy(key,value);
      if(nodeList && nodeList.length>0){
          updateNodess(true);
      }

  }
  function updateNodess(highlight) {
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

/**
 * 模糊查询
 */
function sousuo(){
	var type = $("#getPage").attr("type");
	var name=$("input[name='search']").val();
	//为防止客户输入的有空格，将所有空格去掉
	var tkeyword=name.replace(/\s+/g,"");
	if(tkeyword == ""){
			modal("会话提示框","请输入要搜索的关键字");
		return;
	}
	var url = encodeURI("hisversion/findByKeyword?keyword=" + tkeyword + "&type=" + type);
	$('#Designlistviewtable').DataTable({
	    "scrollY":'640px',
        "destroy": true,
        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "autoWidth": false,
	    tableTools: {
	        "sSwfPath": "swf/copy_csv_xls_pdf.swf",
	        "aButtons": ["copy", "csv"]
	    },
	    "ajax": {
            "url": url,
            "type": "POST",
            "dataType": "json",
            "dataSrc": function (result) {
            	 var data = result.data;
                 if (result.status == 1) {
                     if (data != null) {
//                         sortData(data, a);
                         for (var i = 0, ien = data.length; i < ien; i++) {
                         	var version="";
                         	if(data[i].hv.historyversion=="1"){
                         		version = "1.0";
                         	}else{
                         		version = data[i].hv.historyversion;
                         	}
                         	data[i][0] ='<input type="checkbox" class="son" name="box" value="'+data[i].hv.versionid+'" version="'+version+'" id="'+data[i].hv.levels+'"  filename="'+data[i].hv.filename+'" tolurl="'+data[i].hv.url+'"/>';
                         	
                         	if (data[i].directory == true){
                         		data[i][1]="<span class='fileicon dir-small getAttr'  path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"' filesize='"+data[i].size+"'></span>&nbsp;&nbsp;&nbsp;"+data[i].hv.filename;
                         	}else if (data[i].directory == false) {
                                 data[i][1] = "<span class='getAttr' filesize='"+data[i].size+"' path='" + data[i].path + "' value='" + data[i].name + "' name='" + data[i].directory + "' type='"+data[i].teamname+"' power='"+data[i].power+"'><img src='images/small-icon/" + deal(data[i].name) + ".png' class='fileicon'/></span>&nbsp;&nbsp;&nbsp;"+data[i].hv.filename;
                             }
                         	//版本
                         	if (data[i].directory) {
                         		if(data[i].hv.historyversion=="0"){
                         			data[i][2] = "-";
                             	}else{
                             		if(data[i].hv.historyversion=="1"){
                                 		data[i][2] = "1.0";
                                 	}else{
                                 		data[i][2] = data[i].hv.historyversion;
                                 	}
                             	}
                         	} else {
                         		if(data[i].hv==null){
                         			data[i][2] = " ";
                         		}else{
                         			if(data[i].hv.historyversion=="1"){
                                 		data[i][2] = "1.0";
                                 	}else{
                                 		data[i][2] = data[i].hv.historyversion;
                                 	}
                         		}
                         	}
                         	//型号
                         	if (data[i].directory) {
                               data[i][3] = "-";
                         	} else {
                         		if(data[i].hv==null){
                         			data[i][3] = " ";
                         		}else{
                         			data[i][3] = data[i].hv.modelnum;
                         		}
                         	}
                         	//创建者
                         	if(data[i].hv==null){
                         		data[i][4] = " ";
                     		}else{
                     			data[i][4] = data[i].hv.createname;
                     		}
                         	//修改者
                         	if(data[i].hv==null){
                         		data[i][5] = " ";
                     		}else{
                     			data[i][5] = data[i].hv.updatename;
                     		}
                         	//创建时间
                         	if(data[i].hv==null){
                         		data[i][6] = " ";
                     		}else{
                     			var createtime=data[i].hv.createtime;
                     			createtime=createtime.substring(0, createtime.lastIndexOf("."));
                     			data[i][6] = createtime;
                     		}
                         	//修改时间
                         	if(data[i].hv==null){
                         		data[i][7] = " ";
                     		}else{
                     			var updatetime=data[i].hv.updatetime;
                     			if(updatetime==null){
                     				data[i][7] = " ";
                     			}else{
                     				updatetime=updatetime.substring(0, updatetime.lastIndexOf("."));
                     			}
                     			data[i][7] = updatetime;
                     		}
                         }

                     } else {
                         data = [];
                     }
                 }
                 if (result.status == -1) {
                     modal("", "");
                 }
                 if (result.status == 0) {
                     data = [];
                 }
                 $("input[name='search']").val("");
                 return data;
			}
		}
	});	
}
//重命名
function renameDesginModals(){
	var versionid=$("#Designlistviewtable input[name='box']:checked");
	if (versionid.length != 1) {
        modal("会话提示框", "请选择一项");
        return;
    }
	var rename=versionid.attr("filename");
	if(versionid.parent().parent().attr("name")=="false"){
		rename=rename.substring(0, rename.lastIndexOf("."));
	}
	$("#renameFileDesign").val(rename);
    $("#renameDesign-modal").modal('toggle');
};

//重命名
function renameFileDesign() {
	var treeObj = $.fn.zTree.getZTreeObj("cloudtreeMove");
	var treeNode = treeObj.getSelectedNodes();
    var suff = $("#Designlistviewtable input[name='box']:checked").attr("filename").substring($("#Designlistviewtable input[name='box']:checked").attr("filename").lastIndexOf("."));
    var fileName = $("#renameFileDesign").val();
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
    var name = $("#Designlistviewtable input[name='box']:checked").parent().parent().attr("name");
    var source = $("#Designlistviewtable input[name='box']:checked").parent().parent().attr("path");
    var path=source.substring(0, source.lastIndexOf("/")+1);
    var target = "";
    	if (suff.indexOf(".") >= 0) {
            target = path + fileName + suff;
        } else {
            target = path + fileName;
        }

    $.ajax({
        type: "post",
        url: "hisversion/reNameDesgin",
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
            if (result.status == -1) {
                modal("会话提示框", "名称已存在");
            }
            if (result.status == 1) {
                modal("会话提示框", "重命名成功");
                $("#renameDesign-modal").modal("hide");
                if (treeNode[0].id != 0) {
                    treeObj.setting.callback.onClick(null, treeObj.setting.treeId, treeObj.getNodeByParam("id", treeNode[0].id, null));//触发函数
                } else {
                	getRootDirectory("2","cloudtreeMove") ;
                	//刷新对应的列表数据
                    refreshCurrentPath();
                }
            }
        }
    });
}





