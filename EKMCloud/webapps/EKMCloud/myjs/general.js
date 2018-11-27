var path = "http://serverip:serverport";
var webPath="ws://serverip:serverport/websocket.do";
var path1 = "http://serverip:serverport/";
var projectName ="SpeedCloud";
//视频转换成flv格式的路径
var flvPath = "jwplayer/";
//office文件转换成pdf格式的路径
var pdfPath = "PDF/";
var ifopenchat=true;//true显示通知

function findPower(){
	var userName="feng";
	$.ajax({
		url:"operation/findByname",
		type:"post",
		dataType:"json",
		data:{
			userName:userName
		},
		success:function(result){
			if(result.status==1){
				var list=result.data;
				for (var i = 0; i < list.length; i++) {
					if(list[i].operpowerid.indexOf("10")!=-1){
						$(".pageRight").attr("id","dndArea");
					}
				}
			}
		}
	});
}
//计算文件大小
function countFileSize(size) {
	if(size > 1024 && size < 1024*1024) {
		size = (size/1024).toFixed(0)+'KB';
	} else if (size > 1024*1024 && size < 1024*1024*1024) {
		size = (size/1024/1024).toFixed(0)+'MB';
	} else if (size > 1024*1024*1024 && size < 1024*1024*1024*1024) {
		size = (size/1024/1024/1024).toFixed(0)+'GB';
	} else if (size = 1024*1024*1024) {
		size = '1GB';
	} else if (size = 1024*1024*1024*1024) {
		size = '1TB';
	} else if (size > 1024*1024*1024*1024 && size < 1024*1024*1024*1024*1024) {
		size = (size/1024/1024/1024/1024).toFixed(0)+'TB';
	}else if(size < 1024) {
		size = size+'B';
	}
	return size;
}

function getTOSize(size) {
	var totalspaces=0;
	var suffix=size.substring(size.length-1);
	if(size.indexOf("G")!=-1&&suffix.indexOf("G")!=-1){
		totalsize=size.substring(0,size.length-1);	
		totalspaces=totalsize*1024*1024*1024;
	}else if(size.indexOf("G")!=-1&&suffix.indexOf("B")!=-1){
		totalsize=size.substring(0,size.length-2);	
		totalspaces=totalsize*1024*1024*1024;
	}else if(size.indexOf("M")!=-1&&suffix.indexOf("B")>0){
		totalsize=size.substring(0,size.length-1);	
		totalspaces=totalsize*1024*1024;
	}else if(suffix.indexOf("B")!=-1&&size.indexOf("M")!=-1){
		totalsize=size.substring(0,size.length-2);	
		totalspaces=totalsize*1024*1024;
	}else if(size.indexOf("K")!=-1&&suffix.indexOf("B")>0){
		totalsize=size.substring(0,size.length-1);	
		totalspaces=totalsize*1024;
	}else if(suffix.indexOf("B")!=-1&&size.indexOf("K")!=-1){
		totalsize=size.substring(0,size.length-2);	
		totalspaces=totalsize*1024;
	}else if(size.indexOf("B")!=-1&&suffix.indexOf("B")!=-1){
		totalsize=size.substring(0,size.length-1);	
		totalspaces=totalsize;   
	}else if(size.indexOf("T")!=-1&&suffix.indexOf("T")!=-1){
		totalsize=size.substring(0,size.length-1);	
		totalspaces=totalsize*1024*1024*1024*1024;    
	}else if(size.indexOf("T")!=-1&&suffix.indexOf("B")!=-1){
		totalsize=size.substring(0,sizes.length-2);	
		totalspaces=totalsize*1024*1024*1024*1024;
	}
	return totalspaces;
}

$.ajaxSetup({cache:false});
/** 
 * 设置未来(全局)的AJAX请求默认选项 
 * 主要设置了AJAX请求遇到Session过期的情况 
 */  
var hreflogin=0;
	$.ajaxSetup({  
		type: 'POST',  
		contentType:"application/x-www-form-urlencoded;charset=utf-8",  
		complete: function(xhr,status) {  
			var sessionStatus = xhr.getResponseHeader('sessionstatus');  
			if(sessionStatus == 'timeout') {  
				if(hreflogin==0){
					hreflogin++;
					alert("登录超时或账号在其它地方登陆,请重新登录！");  
					window.location.href = path+'/user/login.html'; 
				}
			}  
		}  
	});  
  
/** 
* 在页面中任何嵌套层次的窗口中获取顶层窗口 
* @return 当前页面的顶层窗口对象 
*/  
function getTopWinow(){  
  var p = window;  
  while(p != p.parent){  
    p = p.parent;  
  }  
  return p;  
}  
function ASCII2(name){
	if(name.indexOf("%")!=-1){
    	name=name.replace(/\%/g,"25"); 
    }
	if(name.indexOf("&")!=-1){
    	name=name.replace(/\&/g,"26"); 
	}
	if(name.indexOf("$")!=-1){
    	name=name.replace(/\$/g,"24"); 
	}
	if(name.indexOf("#")!=-1){
    	name=name.replace(/\#/g,"23"); 
    }
	if(name.indexOf("+")!=-1){
    	name=name.replace(/\+/g,"2B"); 
    }
	if(name.indexOf("=")!=-1){
    	name=name.replace(/\=/g,"3D"); 
    }
	if(name.indexOf("?")!=-1){
    	name=name.replace(/\?/g,"3F"); 
    }
	if(name.indexOf("^")!=-1){
    	name=name.replace(/\^/g,"5E"); 
    }
	if(name.indexOf("!")!=-1){
    	name=name.replace(/\!/g,"21"); 
    }
	if(name.indexOf("@")!=-1){
    	name=name.replace(/\@/g,"40"); 
    }
	return name;
}
function ASCII(name){
	if(name.indexOf("%")!=-1){
    	name=name.replace(/\%/g,"%25"); 
    }
	if(name.indexOf("&")!=-1){
    	name=name.replace(/\&/g,"%26"); 
	}
	if(name.indexOf("$")!=-1){
    	name=name.replace(/\$/g,"%24"); 
	}
	if(name.indexOf("#")!=-1){
    	name=name.replace(/\#/g,"%23"); 
    }
	if(name.indexOf("+")!=-1){
    	name=name.replace(/\+/g,"%2B"); 
    }
	if(name.indexOf("=")!=-1){
    	name=name.replace(/\=/g,"%3D"); 
    }
	if(name.indexOf("?")!=-1){
    	name=name.replace(/\?/g,"%3F"); 
    }
	if(name.indexOf("^")!=-1){
    	name=name.replace(/\^/g,"%5E"); 
    }
	if(name.indexOf("!")!=-1){
    	name=name.replace(/\!/g,"%21"); 
    }
	if(name.indexOf("@")!=-1){
    	name=name.replace(/\@/g,"%40"); 
    }
	return name;
}
//提示模态框
function modal(title,main){
  $("body").append(" <div class='modal fade'"
      +"id='tips_Modal' aria-labelledby='myModalLabel' aria-hidden='true'>"
      +"<div class='modal-dialog' style='width: 32.3%;position: absolute;left: 34.3%;'>"
      +"<div class='modal-content hint_content'>"
      +"<div class='modal-header'>"
      +"<span class='glyphicon glyphicon-remove pull-right'"
      +"data-dismiss='modal' aria-hidden='true'></span>"
      +"<h4 class='modal-title'>"
      +"<span>"+title+"</span></h4></div>"
      +"<div class='modal-body'><p class='hint-main' style='text-align: center; padding: 40px; font-size: 16px;'>"
      +main+"</p></div>"
      +"<div class='modal-footer'>"
      +"<button type='button' class='btn btn-default btn-danger' data-dismiss='modal' style='padding: 6px 30px;'>确定</button></div>"
      +"</div></div></div>");

  $("#tips_Modal").modal('show');
  $('#tips_Modal').on('hide.bs.modal',function() {
      $("body #tips_Modal").remove();
  });
}
/************聊天功能**************/
//var self =$("#shareSpan").attr("");
var self =$("#toName").text();
//var ws = null;
var uname=null;
function sends(){
    var t = document.getElementById('message');
    t.scrollTop = t.scrollHeight;
    $('.slimScrollBar').css({'bottom':0});
}
/*发送时需调用*/
$('#ImmediateMess-modal').off('shown.bs.modal');
$('#ImmediateMess-modal').on('shown.bs.modal',function(){
    sends();
});

$("#upLoad-modal .modal-body").slimScroll({
    height:'400px',
    alwaysVisible: false,
    disableFadeOut:true,
    color: '#777'
});

document.onkeydown = function(e) {	
	var ev = document.all ? window.event : e;
	if (ev.keyCode == 13) {
		$("#sendMsg").trigger("click");
		sends();
	}
};

function updatereadstatic(e){
	$.ajax({
			url:"chatrecord/updatereadstatic",
	        type:"post", 
	        dataType:"json",
	        data:{
	        	"fromName":e,
				 "toName":$("#toName").html()
		     },
	        success:function(result){
	        	
	        }
	 });
}



//双击的聊天窗口
function MessModal(e){
	updatereadstatic($(e).attr("name"));
	$(e).attr("type","");
	$(e).find("#newChatSize").html("");
	$("#writeMsg").attr("placeholder","发送内容不能为空！");
	$("#writeMsg").val("");
	var uname=$(e).attr('name');
	var html='';
	var list=newsChat();
	if(list.length==0){
		html='<li class="dropdown-title"><span><i class="fa fa-envelope-o"></i><span class="new_info" >最近消息</span></span></li><li style="line-height:40px;text-indent:1em;"><span>无最新消息!</span></li>';
	}else{
		for (var i = 0; i < list.length; i++) {
			if(list[i].fromName!=uname){
				html+='<li class="dropdown-title"><span><i class="fa fa-envelope-o"></i><span class="new_info" >最近消息</span></span></li><li onclick="MessModal(this);"  name="'+list[i].fromName+'"><a href="javascript:;"><img src="'+list[i].user.iconUrl+'" alt="" /><span class="body"><span class="from">'+list[i].fromName+'</span><span class="message">'+list[i].content.substring(0, 9);+'...</span><span class="time"><i class="fa fa-clock-o"></i><span languageset="str1_justnow">'+list[i].chatTime+'</span></span></span></a></li>';
			}else if(list.length==1){
				html='<li class="dropdown-title"><span><i class="fa fa-envelope-o"></i><span class="new_info" >最近消息</span></span></li><li style="line-height:40px;text-indent:1em;"><span>无最新消息!</span></li>';
			}
			if(list[i].fromName==uname&&$("#newChatSize").text()>0){
				$("#newChatSize").text($("#newChatSize").text()-1);
			}
			
		}
	}
	$("#newChat").html(html);
	var fromName=self;
	var toName=uname;
	$.ajax({
			url:"user/chatuser",
	        type:"post", 
	        dataType:"json",
	        data:{
		    	 "userName":uname
		     },
	        success:function(result){
	        	var user=result.data;
	        	html='';
	        	html1='';
	        	$("#toplist").html(html);
	        	$("#tupian").html(html1);
	        	if(result.status == 1){
	        		html1+='<img src="'+user.iconUrl+'" alt=""/>';
	        		html+='<h5>姓名:<span id="sname">'+user.userName+'</span>&nbsp;<span id="denglu"></span></h5><span id="bumen">部门:'+(user.department == null ? "" : user.department.deptName)+'</span>&nbsp;&nbsp;<span id="telphoto">电话:'+(user.telephone == null ? "" : user.telephone)+'</span>&nbsp;&nbsp;<span id="emailmain">邮箱:'+(user.email == null ? "" : user.email)+'</span>';  
	        	}else{
	        		html+='';
	        	}
	        	$("#tupian").html(html1);
	        	$("#toplist").html(html);
	        } 
	});
	//处理聊天内容,并将toName发送给本机自己的状态改为1,已浏览
	$.ajax({
		url:"chatrecord/findchatrecord",
		type:"post",
		 dataType:"json",
		 data:{
			 "fromName":fromName,
			 "toName":toName
	     },
	     success:function(result){
	    	 var list=result.data;
	    	 var htmls='';
	    	 $("#message").html(htmls);
	    	 if(result.status == 0) {
					list = [];
	    	 }else{
	    		 for (var i = 0; i < list.length; i++) {
	    			 var html='<li><p><span>'+list[i].fromName+'</span><span>'+list[i].chatTime+'</span></p><p>'+list[i].content+'</p></li>';
	    			 var re=new RegExp(/^((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)|([\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#]))$/);
	    			 var cont="";
	    			 if(list[i].fromName==self){
	         			  var a =html.substring(0,html.indexOf("<li")+3);
	         			  var b =a+' style="float:right;text-align: right; clear:both;" ';
	         			  html = b+html.substring(html.indexOf("<li")+3);
	         			  var c =html.substring(0,html.indexOf("<p")+2);
	        			  var d =c+' style="margin-right:0!important;color:red;"';
	        			  html = d+html.substring(html.indexOf("<p")+2);
	        			  cont=html.substring(html.lastIndexOf('<p')+3,html.lastIndexOf('</p>'));
	    			 } else{
	    				 	var aa= html.substring(0,html.indexOf("</span>"));
	    					var b=aa+"&nbsp;&nbsp;";
	    					html = b+html.substring(html.indexOf("</span>"));
	    					cont=html.substring(html.lastIndexOf('<p')+3,html.lastIndexOf('</p>'));
	    			 }
	    			 if(re.test(cont)){
     					var top=html.substring(0,html.lastIndexOf('<p'));
	        				var foot=html.substring(html.lastIndexOf('</p>')+4);
	        				if(cont.indexOf("http://")>=0||cont.indexOf("https://")>=0||cont.indexOf("ftp://")>=0){
	        					html=top+'<a style="color:rgb(63,136,191);text-decoration:none;" target="_blank" href="'+cont+'">'+cont+'</a>'+foot;
	        				}else{
	        					html=top+'<a style="color:rgb(63,136,191); text-decoration:none;" target="_blank" href="http://'+cont+'">'+cont+'</a>'+foot;
	        				}
     			  }
 		         htmls+=html; 
	    		 } 
	    		 $("#message").html(htmls);
	    	 }
	     } 
	});
    $('#ImmediateMess-modal').modal('toggle');
}

//开启回话服务
function startWebSocket() {
    if ('WebSocket' in window){
        ws = new WebSocket(webPath);
    }else if ('MozWebSocket' in window){
        ws = new MozWebSocket(webPath);
    }else{
    	alert("not support");
    }
    ws.onmessage = function(evt){
        var data = evt.data;//map中的两个信息
        var obj = eval ('(' + data + ')');//将字符串转换成JSON
        if(obj.type == 'message'){
            setMessageInnerHTML(obj.data);
        } 
    };
    ws.onopen = function(evt) {
    };
    ws.onclose = function(evt) {
    };
}

//显示聊天内容
function setMessageInnerHTML(innerHTML){
	var temps=innerHTML;
	var topTemp=temps .substring(0,temps.indexOf("<p"));
	var index = topTemp .lastIndexOf(",");  
	var  temp = temps .substring(index + 1, temps .length);
	var tempss=temps .substring(0,index);
	var temp1 = $('#message').html();
	var re=new RegExp(/^((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)|([\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#]))$/);
	var a ="";
	var cont="";
	if(temp.indexOf(self)>=0){
		a =temp.substring(0,temp.indexOf("<li")+3);
		var b =a+' style="float:right;text-align: right; clear:both;" ';
		temp = b+temp.substring(temp.indexOf("<li")+3);
		temp=temp.substring(temp.indexOf("<li"));
		var c =temp.substring(0,temp.indexOf("<p")+2);
		var d =c+' style="margin-right:0!important;color:red;"';
		temp = d+temp.substring(temp.indexOf("<p")+2);
		cont=temp.substring(temp.lastIndexOf('<p')+3,temp.lastIndexOf('</p>'));
	}else{
		var aa= temp.substring(0,temp.indexOf("</span>"));
		var b=aa+"&nbsp;";
		temp = b+temp.substring(temp.indexOf("</span>"));
		 cont=temp.substring(temp.lastIndexOf('<p')+3,temp.lastIndexOf('</p>'));
	 }
	if(re.test(cont)){
		var top=temp.substring(0,temp.lastIndexOf('<p'));
		var foot=temp.substring(temp.lastIndexOf('</p>')+4);
		if(cont.indexOf("http://")>=0||cont.indexOf("https://")>=0||cont.indexOf("ftp://")>=0){
			temp=top+'<a style="color:rgb(63,136,191); text-decoration:none"  target="_blank" href="'+cont+'">'+cont+'</a>'+foot;
		}else{
			temp=top+'<a style="color:rgb(63,136,191); text-decoration:none"  target="_blank" href="http://'+cont+'">'+cont+'</a>'+foot;
		}
	}
	var lix=a.substring(0,a.indexOf("<li"));
	if(a.indexOf("<p>")>=0){
		temp=lix+temp;
	}
	temp1 += temp + '<br/>';
	
	var topname=$("#sname").html();//标头
	var tempses=tempss.substring(0,tempss.indexOf(","));//从返回的内容innerHTML中截取第一个名字
	var tempsss=tempss.substring(tempss.indexOf(",")+1);
	tempsss=tempsss.substring(0,tempsss.indexOf(","));//从返回的内容innerHTML中截取第二个名字
	if(typeof(topname)=="undefined"){
		var array=$("#shareSelecteName").find(".list-user");
		var topnames=[];
		for (var u = 0; u < array.length; u++) {
			// console.log("topnames     :"+array.eq(u).attr("title"));
			topnames.push(array.eq(u).attr("title"));
		}
		var result= $.inArray(tempses, topnames);
		var results= $.inArray(tempsss, topnames);
		if(result!=-1&&tempsss==self||results!=-1&&tempses==self){
			$('#message').html(temp1);
		}
	}else{
		if(topname==tempses&&tempsss==self||topname==tempsss&&tempses==self){//接收的时候判断唯一
			$('#message').html(temp1);
		}
	}
	
		if(tempses!=self&&tempsss==self){
			var ffff=$("#commentList").find("li");
			for (var i = 0; i < ffff.length; i++) {
				if(ffff.eq(i).attr("name")==tempses){
					var count=ffff.eq(i).attr("type");
					//查出readstatic=0的放进type
					//双击打开时修改为1，点击关闭模态框时修改为1
					count++;
					if(ifopenchat==true){
						ffff.eq(i).attr("type",count);
						ffff.eq(i).find("#newChatSize").html(count);
					}
				}
			}
			var fff=$("#teamul").find("li");
			for (var i = 0; i < ffff.length; i++) {
				if(fff.eq(i).attr("name")==tempses){
					var count=fff.eq(i).attr("type");
					//查出readstatic=0的放进type
					//双击打开时修改为1，点击关闭模态框时修改为1
					count++;
					if(ifopenchat==true){
						fff.eq(i).attr("type",count);
						fff.eq(i).find("#newChatSize").html(count);
					}
				}
			}
		}
	var firstStr=temp.substring(0, 3);//截取<p
	 var arr=new Array();
	 arr=tempss.split(',');//字符串分割
	 var fromName=arr[0];
	 var toName=arr[1];
	 var content=arr[2];
	 if(firstStr.indexOf("<li")>=0){
		//如果好友在线发送的信息状态改变为1;
		$.ajax({
				 url:"chatrecord/updatechatStaticss",
				 type:"post", 
				 dataType:"json",
				 data:{
					 "fromName":fromName,
					 "toName":toName,
					  "content":content
			     },
			     success:function(result){
			     }
		});
	}
	 sends();//内容发送后滚动保持在底部
}

//发送信息
function sendMsg() {
  var mydate = new Date();
  var str = "" + mydate.getFullYear()+"-";
  var mm = mydate.getMonth()+1;
  if(mm>9){
   str += mm+"-";
  }else if(mm<=9){
   str += "0" + mm+"-";
  }
  if(mydate.getDate()>9){
   str += mydate.getDate();
  }else{
   str += "0" + mydate.getDate();
  }
  if(mydate.getHours()>9){
  	   str += "&nbsp;"+mydate.getHours()+":";
  }else{
  	   str += "&nbsp;0" + mydate.getHours()+":";
  }
  if(mydate.getMinutes()>9){
  	   str += mydate.getMinutes()+":";
  }else{
  	   str += "0" + mydate.getMinutes()+":";
  }
  if(mydate.getSeconds()>9){
 	   str += mydate.getSeconds();
 }else{
 	   str += "0" + mydate.getSeconds();
 }
//    var time=str;
    var time= getTime();
    var fromName  = self;
	var toName = $("#sname").html(); //发给谁
	var content = $("#writeMsg").val().trim(); //发送内容
	if(content==""||content.length==0){
		$('#writeMsg').val("");
		$("#writeMsg").attr("placeholder","发送内容不能为空！");
		return;
	}
	if(content.indexOf(",")!=-1){
		var reg = new RegExp(",","g");//g,表示全部替换。
		content=content.replace(reg,'，');
	}
		$.ajax({
			url:"chatrecord/savechatrecord",
            type:"post", 
            dataType:"json",
            data:{
         	 "fromName":fromName,
         	 "toName":toName,
         	 "content":content,
         	 "time":mydate.getTime()
          },
          success:function(result){
          }
		});
		$('#writeMsg').val("");
	ws.send(fromName + "," + toName + "," + content+","+time);
}
//获取当前时间
function getTime(){
	 var mydate = new Date();
	  var str = "" + mydate.getFullYear()+"-";
	  var mm = mydate.getMonth()+1;
	  if(mm>9){
	   str += mm+"-";
	  }else if(mm<=9){
	   str += "0" + mm+"-";
	  }
	  if(mydate.getDate()>9){
	   str += mydate.getDate();
	  }else{
	   str += "0" + mydate.getDate();
	  }
	  if(mydate.getHours()>9){
	  	   str += " "+mydate.getHours()+":";
	  }else{
	  	   str += " 0" + mydate.getHours()+":";
	  }
	  if(mydate.getMinutes()>9){
	  	   str += mydate.getMinutes()+":";
	  }else{
	  	   str += "0" + mydate.getMinutes()+":";
	  }
	  if(mydate.getSeconds()>9){
	 	   str += mydate.getSeconds();
	 }else{
	 	   str += "0" + mydate.getSeconds();
	 }
	  return str;
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
            "teamnum": name
        },
        success: function (result) {
            if (result.status == 1) {
                var team = result.data;
                teamName = team[0].teamName;
            } else {
                teamName = "";
            }
        }
    });
    return teamName;
}
function repTime(s,e,p){
	var count=0;
	$.ajax({
		   url:"taskaudit/findTime",
		   type:"post",
		   dataType:"json",
		   async:false,
		   data:{
		   	"startTime":s,
		   	"endTime":e,
		   	"platform":p
		   },
		   success:function(result){
			   if(result.status==1){
				   count=result.data;
			   }
		   }
	});
	return count;
}


//上传文件
var jinmap=new Map;
var jj=[];
var filepaths=[];
var fileMd5;
var filename;
var filetype;
var path;
var modelnum;
var iftype;
var folderUrl;
var uploader;
WebUploader.Uploader.register({
	"before-send-file":"beforeSendFile",
	"before-send":"beforeSend",
	"after-send-file":"afterSendFile"
	},{
		beforeSendFile:function(file) {
			// 创建一个deffered,用于通知是否完成操作
			var deferred = WebUploader.Deferred();
			// 计算文件的唯一标识，用于断点续传和妙传
			(new WebUploader.Uploader()).md5File(file, 0, 5*1024*1024)
				.progress(function(percentage){
					filename=file.name.replace(/\s/g, "");
//					alert(filename);
				}).then(function(val) {
						fileMd5 = val;
						filetype=$( '#'+file.id ).attr("type");
						iftype=$( '#'+file.id ).attr("iftypes");
//						console.log(iftype);
						if(iftype==1){
							folderUrl=$( '#'+file.id ).attr("path");
						}else{
							folderUrl='';
						}
						// 放行
						if($("#dd").hasClass('hide')==false && typeof(filetype)!="undefined"){//ok
							$("#upLoad-modal").fadeIn(500);
							if(filetype=="55"||filetype=="66"||filetype=="77"||filetype=="11"||filetype=="22"||filetype=="13"){
		                    	modelnum=$("#modelnum").val() ;
		                    	path=getCurrentPath("1");
		                    	$("#UploadDoc2-modal").modal("hide");
		                	}else{
		                		modelnum='';
		                		path=getCurrentPath();
		                	}
							deferred.resolve();
						}else{
							deferred.reject();
						}
					
				});
			// 通知完成操作
			return deferred.promise();
		},
		beforeSend:function(block) {
			var deferred = WebUploader.Deferred();
			// 支持断点续传，发送到后台判断是否已经上传过
//			if($("#dd").hasClass('hide')==false){//ok
				$.ajax({
					type:"POST",
					url:"upload/uphb?action=checkChunk",
					data:{
						filetype:filetype,
						path:path,
						filename:filename,
						// 文件唯一表示								
						fileMd5:fileMd5,
						// 当前分块下标
						chunk:block.chunk,
						// 当前分块大小
						chunkSize:block.end-block.start
					},
					dataType:"json",
					success:function(response) {
						if(response.ifExist) {
							// 分块存在，跳过该分块
							deferred.reject();
						} else {
							// 分块不存在或不完整，重新发送
							deferred.resolve();
						}
					}
				});
			// 发送文件md5字符串到后台
			this.owner.options.formData.fileMd5 = fileMd5;
			return deferred.promise();
//			}
			
		},
		afterSendFile:function(file) {
//			console.log("合并   "+iftype);
//			if($("#dd").hasClass('hide')==false){//ok
			// 通知合并分块
			if(iftype==0){//文件
				$.ajax({
					type:"POST",
					url:"upload/uphb?action=mergeChunks",
					data:{
						filetype:filetype,
						path:path,
						modelnum:modelnum,
						filename:filename,
						fileMd5:fileMd5
					},
					dataType:"json",
					success:function(response){
						if(response.ifExist) {
							var $li = $( '#'+file.id ).find('.percentage'),
						    $percent = $li.find('.file-progress .progress-bar');
							$li.find('.per').text(100 + '%');
							$percent.css( 'width',  100 + '%' );
							//刷新
//							if($( '#'+file.id ).attr("type") != "undefined"){
								refreshCurrentPath();
//							}
                            $( '#'+file.id ).find('a').hide();
						}
					}
				});
			}else if(iftype==1){
				$.ajax({
					type:"POST",
					url:"upload/uphbs?action=mergeChunks",
					data:{
						folderUrl:folderUrl,
						filetype:filetype,
						path:path,
						filename:filename,
						fileMd5:fileMd5
					},
					dataType:"json",
					success:function(response){
						if(response.ifExist) {
							var $li = $( '#'+file.id ).find('.percentage'),
						    $percent = $li.find('.file-progress .progress-bar');
							$li.find('.per').text(100 + '%');
							$percent.css( 'width',  100 + '%' );
							//刷新
//							if($( '#'+file.id ).attr("type") != "undefined"){
								refreshCurrentPath();
//							}
                            $( '#'+file.id ).find('a').hide();
						}
					}
				});
//			}
			}
		}
	});
	// 上传基本配置
	uploader = WebUploader.create({
			swf:"webuploader-0.1.5/Uploader.swf",
			server:"upload/fileup",
			pick:"#filePicker",
			auto:true,
			dnd:"#dndArea",
			disableGlobalDnd:true,
			paste:"#uploader",		
			// 分块上传设置
			// 是否分块
			chunked:true,
			// 每块文件大小（默认50M）
			chunkSize:5*1024*1024,
			// 开启几个并非线程（默认3个）
			threads:1,
			// 在上传当前文件时，准备好下一个文件
			prepareNextFile:false,
			duplicate:true
		});
	//上传之前获取 文件夹相对路径，
    uploader.on('uploadBeforeSend', function(object, data, headers) {
        // 如果是webkitdirectory控件选择的文件，会包含webkitRelativePath属性，添加进formData发送
        // console.log(object);//打印此对象，可以查看webkitRelativePath值
        data.relativepath = object.file.source.source.webkitRelativePath ? object.file.source.source.webkitRelativePath : '';
        // console.log("webkitRelativePath:"+data.relativepath);
    });
	// 生成缩略图和上传进度
	uploader.on("fileQueued", function(file) {
		var filetypes=$(".active").find("a").attr("type");
		if($("#dd").hasClass('hide')==false && typeof(filetypes)!="undefined"){
		var folderUrl=file.source.source.webkitRelativePath ? file.source.source.webkitRelativePath : '';
//		console.log(folderUrl+ " ………………  "+iftype);
		if(folderUrl==""&&iftype==1){
				for (var i = 0; i < filepaths.length; i++) {
					for (var y = 0; y < jj.length; y++) {
						if(filepaths[i]==jj[y]){
							filepaths.splice(i,1);
					          i=i-1;
						}
					}
				}
				var b=0;
				for (var i = 0; i < filepaths.length; i++) {
						// console.log(filepaths[i]);
					if(b!=1){
						if(filepaths[i].substring(filepaths[i].lastIndexOf("/")+1)==file.name){
							folderUrl = filepaths[i];
							b++;
							jj.push(filepaths[i]);
						
						}
					}
				}
			}
		// console.log(folderUrl);
		if(folderUrl==''){
			iftype=0;
		}
		jinmap.set(folderUrl,folderUrl);
		// 把文件信息追加到fileList的div中
		if(iftype==0){//文件
			$("#fileList").append(
                "<div id='" + file.id + "' class='file-item' type='"+filetypes+"' iftypes='"+iftype+"'><img/>"+
                "<span class='uptxtName'>" + file.name.replace(/\s/g, "") + "</span>"+
                "<div class='upsuccState'><span class='state'></span></div>"+
                "<div><span class='percentage'></span></div>"+
                "<a class='stop-btn glyphicon glyphicon-play hide' href='javascript:;'></a>"+ //暂停
                "<a class='start-btn glyphicon glyphicon-pause' href='javascript:;'></a>"+ //继续
                "<a class='remove-this glyphicon glyphicon-remove' href='javascript:;'></a></div>");  //删除
		}else if(iftype==1){//文件夹
			$("#fileList").append(
                "<div id='" + file.id + "' class='file-item' type='"+filetypes+"' path='"+folderUrl+"' iftypes='"+iftype+"'><img/>"+
                "<span class='uptxtName'>" + file.name.replace(/\s/g, "") + "</span>"+
                "<div class='upsuccState'><span class='state'></span></div>"+
                "<div><span class='percentage'></span></div>"+
                "<a class='stop-btn glyphicon glyphicon-play hide' href='javascript:;'></a>"+ //暂停
                "<a class='start-btn glyphicon glyphicon-pause' href='javascript:;'></a>"+  //继续
                "<a class='remove-this glyphicon glyphicon-remove' href='javascript:;'></a></div>"); //删除
			}
		}
		//上传
        $( '#'+file.id ).on('click','.start-btn',function(){
            // alert('继续按钮--------变----------暂停按钮');
            $(this).addClass('hide');
            $(this).siblings('.stop-btn').removeClass('hide');
            if ($(this).parents(".file-item").attr('id') == file.id) {
            	uploader.cancelFile( file );
            }
        });
        //暂停
        $( '#'+file.id ).on('click','.stop-btn',function(){
            // alert('暂停按钮---------变---------继续按钮');
            $(this).addClass('hide');
            $(this).siblings('.start-btn').removeClass('hide');
            if ($(this).parents(".file-item").attr('id') == file.id) {
             uploader.upload(file);
            }
        });


			//删除上传的文件
			$("#uploader").on('click','.remove-this',function(){				
				if ($(this).parents(".file-item").attr('id') == file.id) {
					uploader.removeFile(file);
					$(this).parents(".file-item").remove();
					//通过fileMD5移除删除的文件
					delUploading(fileMd5);
				}
			});
		});
	
	// 监控上传进度
	// percentage:代表上传文件的百分比		
	// 文件上传过程中创建进度条实时显示
	uploader.on( 'uploadProgress', function( file, percentage ) {
		$(".file-pro").text("");
	    var $li = $( '#'+file.id ).find('.percentage'),
	        $percent = $li.find('.file-progress .progress-bar');

	    // 避免重复创建
	    if ( !$percent.length ) {
	        $percent = $('<div class="file-progress active">' +
	          '<div class="progress-bar" role="progressbar" style="width: 0%;height:100%">' +
	          '</div>' +
	        '</div>' + '<br/><div class="per">0%</div>').appendTo( $li ).find('.progress-bar');
	    }
	    var baishu=$li.find('.per').text();
       	var shu = baishu.substring(0, baishu.indexOf("%"));
        if(Number((percentage * 100)) < Number(shu)){
        }else{
        	if((percentage * 100).toFixed(2)==100){
        		$li.find('.per').text( '99.99%');
    	        $percent.css( 'width', '99.99%' );
    	        $( '#'+file.id ).find('a').hide();
        	}else{
        		$li.find('.per').text((percentage * 100).toFixed(2) + '%');
        		$percent.css( 'width', percentage * 100 + '%' );
        		 $( '#'+file.id ).find('a').hide();
        	}
        }
	});
	
	 function creatup() {
	 	 uploader.addButton({
	 		 id: '#dd',
	 	     innerHTML: '上传'
	 	     });
	 }
//删除上传中的文件
function delUploading(e){
	$.ajax({
        type: "get",
        dataType: "json",
        url: "data/file/delUploading",
        data: {
            path: "/"+e,
            type: "6"
        }
    });
}
