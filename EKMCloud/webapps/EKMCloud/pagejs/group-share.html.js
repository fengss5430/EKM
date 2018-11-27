/**
 * Created by llwang on 8/22/2017.
 */
//var self =$("#shareSpan").attr("value");

$(function() {
	newlyTable();
	lieb();
    //滚动
    $('#message').slimScroll({
        height: '216px',
        start: 'bottom',
        allowPageScroll: true
    });
});
function sends() {
    var t = document.getElementById('message');
    t.scrollTop = t.scrollHeight;
    $('.slimScrollBar').css({
        'bottom':0
    });
}/*发送时需调用*/
$('#ImmediateMess-modal').off('shown.bs.modal');
$('#ImmediateMess-modal').on('shown.bs.modal',function(){
	ifopenchat=false;//打开的时候不显示通知
    sends();
});

$('#ImmediateMess-modal').off('hidden.bs.modal');
$('#ImmediateMess-modal').on('hidden.bs.modal',function(){
	ifopenchat=true;//关闭的时候显示通知
});

document.onkeyup = function(e) {
	var ev = e || event;
    if (ev.keyCode == 13) {
		$("#sendMsg").trigger("click");
		sends();
		return false;
	}
};

//share tab
$(".comment .tab-menu li").click(function(){
    $(this).addClass('curr').siblings().removeClass('curr');
    $('.comment-list .tab-Item').eq($(this).index()).show().siblings().hide();
});

function CreateDataLink(){
	teamCreateShareConntion();
	var conPub = '<p><em class="glyphicon glyphicon-ok-sign"></em>成功创建公开链接</p>' +
		'<p><input type="text" class="copy-public-link form-control w70" id="TeamconntionInput" value=""'+
		'style="margin-bottom: 10px"><a href="javascript:;" class="copy_con w24">复制链接</a>'+
		'<div class="success-remark"></p>'+
		' <p>1、生成文件下载链接</p>'+
		' <p>2、把链接通过<b>站内通信或QQ、微信等方式分享他人</b></p>'+
		'</div> '+
		'<div class="buttonGroup">'+
		'<button type="button" class="btn btn-danger btnBack" id="btnBack" data-dismiss="modal">返回</button>'+
		'</div>';
	var copy = '<span class="Copy-linked" style="">复制链接成功</span>';
	//创建链接
	CreateLink();
	function CreateLink(){
		$('.create-link').html(conPub);
		$(".copy_con").one("click",function(){
			$(this).after(copy);
			var copyobject = document.getElementsByClassName("copy-public-link")[0];
			copyobject.select();
			document.execCommand("Copy");
		});
		//返回
		$('#btnBack').unbind().bind('click',function(){
			$('.create-link').html(conPub);
			$('#CreatData-btn-modal').modal('hide');
			CreateLink();
		});
	};
}

//从资料库分享
function dataShare(){
	$('#shareData-btn-modal').modal('toggle');
	getDirectoryList();
}

//获取根目录
function getDirectoryList(){
		$.ajax({
			url : "data/file/trees",
			type : "post",
			dataType : "json",
			data :{
				"path" :"",
				"type" : "1"
			},
			success : function(result) {
				var zNodes = new Array();//树形菜单数组
				if(result.status==1){
					zNodes[0]={"id":0,"pId":0,"name":'请选择你要分享的目录',"nocheck": true,"path":"","remark":"true"};
					var maxid = 0;
					var data = result.data;
					for(var i =0;i<data.length;i++){
						if(maxid<data[i].id) {
							maxid = data[i].id;
						}
						if(data[i].remark=='true'){
							zNodes[i+1]={"id":data[i].id,"pId":data[i].pid,"name":data[i].label,"path":data[i].path};
						}else{
							zNodes[i+1]={"id":data[i].id,"pId":data[i].pid,"name":data[i].label,"path":data[i].path,"icon":'images/docicon.png'};
						}
					}
					$("#shareChildrenMaxid").attr("value",maxid);
				}
				if(result.status == 0) {
					if($("#shareCreatZtree").prev('p').size()<1){
						$("#shareCreatZtree").before("<p style='color:#e66868;'>我的资料库为空，无法分享</p>");
					}
					$('#dataLinkBtn').attr('disabled','disabled');
				}
				setDiretoryTree(zNodes);
			}
		});
}

//获取子目录
function getDirectoryChildrenList(maxid,child_path,pid,treeNode){
		$.ajax({
			url : "data/file/gettrees",
			type : "post",
			dataType : "json",
			data : {
				"path" : child_path,
				"pid" : pid,
				"maxid" :maxid,
				"type" : "1"
			},
			success : function(result) {
				var zNodes = new Array();//树形菜单数组
				//zNodes[0]={"id":0,pId:0,"name":'请选择你要分享的目录'};
				if(result.status==1){
					var data = result.data;
					var maxid = 0;
					for(var i =0;i<data.length;i++){
						if(maxid<data[i].id){
							maxid=data[i].id;
						}
						if(data[i].remark=='true'){
							zNodes[i]={"id":data[i].id,"pId":data[i].pid,"name":data[i].label,"path":data[i].path};
						}else{
							zNodes[i]={"id":data[i].id,"pId":data[i].pid,"name":data[i].label,"path":data[i].path,"icon":'images/docicon.png'};
						}
					}
					$("#shareChildrenMaxid").attr("value",maxid);
				}
				if(result.status == 0) {
					modal("会话提示框","获取目录失败!");
				}
				setChildrenDiretoryTree(treeNode,zNodes);
			}
		});
}

//添加子节点
function setChildrenDiretoryTree(treeNode ,zNodes){
	var treeObj = $.fn.zTree.getZTreeObj("shareCreatZtree");
	treeObj.removeChildNodes(treeNode);
	treeObj.addNodes(treeNode,zNodes);
}

//单机加载目录子节点
function zTreeOnClick(event, treeId, treeNode) {
	//点击时将选定节点路径绑定到input的那name属性上,便于获取
	//$("#createDirectoryInput").attr("name",treeNode.path);
	zTreeObj = treeNode;
	if(treeNode.id!=0){
	/*	for(var i =0;i<zTreeChildrenIds.length;i++){
			if(zTreeChildrenIds[i]==treeNode.id){
				return;
			}
		}
		zTreeChildrenIds.push(treeNode.id);*/
		var maxid = $("#shareChildrenMaxid").attr("value");
		getDirectoryChildrenList(maxid,treeNode.path,treeNode.pId,treeNode);
	}
};

//设置节点数据
function setDiretoryTree(zNodes){
		  //目录
	var setting = {
	    view:{
	    	 showLine:false
	    },
	    check:{
	           enable: true,
	           chkStyle:"checkbox",
	           autoCheckTrigger: true,
	           chkboxType: { "Y": "", "N": "" }
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
	    } ,
	    callback: {
	    	onClick: zTreeOnClick
		}
	};
	
	$(document).ready(function(){
	    $.fn.zTree.init($("#shareCreatZtree"), setting,zNodes);
	});
}

//创建连接
function teamCreateShareConntion(){
	var treeObj = $.fn.zTree.getZTreeObj("shareCreatZtree");
	var treeNode = treeObj.getCheckedNodes(true);
	if(treeNode.length < 1) {
		modal("会话提示框","请至少选择一项");
		return;
	}
	var paths = new Array();
	//var type = $("#shaerSelectc").find("option:selected").attr("value");
	for(var i=0;i<treeNode.length;i++){
		paths.push(treeNode[i].path);
	}
	tips("正在创建,请耐心等待...", true);
    $('.disBtnIcon').removeAttr('data-dismiss');
	$(".disBtn").attr("disabled","disabled");
	$.ajax({
		type : "POST",
		url : "share/cc",
		data : {
			"paths" :paths.join(","),
			"type":"1"
		},
		success : function (result) {
			$("#conntionInput").val("");
			var data = result.data;
			if(result.status==1){
				tips("", false);
				$("#TeamconntionInput").val(path+"/share/sc/"+data);
				//$("#connShareP").attr("name",path+"/share/sc/"+data);
				 $('.disBtnIcon').attr('data-dismiss','modal');
	               $(".disBtn").removeAttr("disabled");
			}
			$('#CreatData-btn-modal').modal('toggle');
		}
	});
}

//加载最近通话列表
function newlyTable(){
	 $.ajax({
		url:"chatrecord/findNewlyChatList",
	       type:"post",
	       dataType:"json",
	       data:{
	      	 "toName":$("#toName").html()
	       },
			success:function(result){
				var list=result.data;
				var html="";
				$("#commentList").html(html);
				if(result.status == 0){
					html='<p style="margin-left: 20px;">暂无!</p>';
				}else if(result.status == 1){
					if(list.length>1){
							var arr = [];  
							for (var i = 0; i < list.length; i++) {
						    	arr.push(list[i]);
						    }
							var sidOrder = arr.sort(
									function(a, b)
									{
										if(a.remark < b.remark) return -1;
										if(a.remark > b.remark) return 1;
										return 0;
									}
							);
							$.each(sidOrder,
									function(index, value)
									{
								userName= value.userName;
								if(value.status!=1){
									userName=value.userName+'<span style="padding-left:4px;color:#adadad;">[离线请留言]</span>';
								}else{
									userName=value.userName+'<span style="padding-left:4px;color:#0ead2a;">[在线]</span>';
								}
								var status="";
								if(value.deptId==0){
									status="";
								}else{
									status=value.deptId;
								}
								html+='<li ondblclick="MessModal(this);" name="'+value.userName+'" type="'+value.deptId+'"><a href="javascript:;"><img class="user-img" src="'+value.iconUrl+'" alt=""><p class="info-maxWidth colorHei" title="'+value.userName+'">'+userName+'</p><span class="badge" id="newChatSize">'+status+'</span><span class="right-icon"></span></a></li>';	  
									}
							);
						}else if(list.length==1){
							var status="";
							if(list[0].deptId==0){
								status="";
							}else{
								status=list[0].deptId;
							}
							html='<li ondblclick="MessModal(this);" name="'+list[0].userName+'" type="'+list[0].deptId+'"><a href="javascript:;"><img class="user-img" src="'+list[0].iconUrl+'" alt=""><p class="info-maxWidth colorHei" title="'+list[0].userName+'">'+list[0].userName+'</p><span class="badge" id="newChatSize">'+status+'</span><span class="right-icon"></span></a></li>';
						}else{
							html='<p style="margin-left: 20px;">暂无!</p>';
						}
					
				}
				$("#commentList").html(html);
	      }
	});
}
function  lieb(){
    var userName=$("#toName").html();
    $.ajax({
        url:"user/userInTeams",
        type:"post",
        dataType:"json",
        data:{
            "userName":userName
        },
        success:function(result){
        	var map=result.data;
            var html='';
            $("#userList").empty();
            if(result.status == 0){
                $("#userList").html('<p style="margin-left: 20px;">暂无，请先加入团队!</p>');
            }else if(result.status == 1){
            	$.each(map,function(key,values){
				 html += '<li><a href="javascript:void(0);" style="text-decoration:none"><span class="glyphicon glyphicon-triangle-right"></span><span> '+key+'</span></a><ul>';
				 for (var i = 0; i < values.length; i++) {
					 if(values[i].userName!=userName){
						 var username=values[i].userName;
						 if(values[i].status!=1){
							 username=values[i].userName+'<span style="padding-left:4px;color:#adadad;">[离线请留言]</span>';
						 }else{
							 username=values[i].userName+'<span style="padding-left:4px;color:#0ead2a;">[在线]</span>';
						 }
						 html += '<li ondblclick="MessModal(this);" name="'+values[i].userName+'"><a href="javascript:;"><img class="user-img" src="'+values[i].iconUrl+'" alt=""><p class="info-maxWidth" title="'+values[i].userName+'">'+username+'</p><span class="right-icon"></span></a></li>';
					 }
				 }
				 html+='</ul></li>';
			 });
                $("#userList").html(html);
                //二级菜单
                for (var i = 0; i < $('#userList>li>a').length; i++) {
                    (function (a) {
                        $('#userList>li>a').eq(a).click(function () {
                            $('#userList>li>a').removeClass('actives');
                            $(this).addClass('actives');
                            for (var j = 0; j < $('#userList>li>a').length; j++) {
                                if (j !== a) {
                                    $('#userList>li>a').eq(j).next().hide();
                                }
                            }
                            if ($(this).next().css('display') == 'none'){
                                $(this).next().show();
                            } else {
                                $(this).next().hide();
                                $(this).removeClass('actives');
                            }
                        });
                    })(i);
                }
            }
        }
    });
}
