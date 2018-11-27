<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
	    <base href="<%=basePath%>">
	    <title>DAICY | EKMCloud</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<link rel="icon" href="images/logo-1.png" type="images/x-icon">
		<link rel="stylesheet" type="text/css" href="css/cloud-admin.css" >
		<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- UNIFORM -->
		<link rel="stylesheet" type="text/css" href="css/uniform.default.min.css" />
	<!-- FONTS -->
		<script type="text/javascript" src="resources/lib/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="resources/lib/jquery.json-2.3.min.js"></script> <!-- i18国际化脚本 -->
		<script type="text/javascript" src="resources/lib/jquery.i18n.properties-1.0.9.js"> </script> <!-- i18国际化脚本 -->
		<script type="text/javascript" src="resources/js/main.js"></script> <!-- i18国际化脚本   为元素设置languageset属性，属性值为properties包的键 -->
	    <script type="text/javascript" src="myjs/general.js"></script>
	    <script type="text/javascript" src="js/jquery.cookie.js"></script>
	    <script type="text/javascript" src="js/jquery.md5.js"></script>
	  	<script type="text/javascript">
		  $(function() {
			  //注册
			  $("#regist-btn-modal").off('hidden.bs.modal');
				 $("#regist-btn-modal").on('hidden.bs.modal', function () {
					 $("#userName").val("");
					 $("#password").val("");
					 $("#email").val("");
					 $(".emptyTips").hide();
					 $(".beTips").hide();
					 $(".specialTips").hide();
				 });

			  back();
				var loginName = $.cookie("userName") || "";
				var password = $.cookie("password") || "";
				$("#exampleInputUsername").val(loginName);
				$("#exampleInputPassword1").val(password);
		
				if (loginName && password) {

					$("#rmbUser").prop("checked", true);
				}
				$("#loginBtn").on("click", function() {
					doLogin();
				});
				document.onkeydown = function(e) {
					var ev = document.all ? window.event : e;
					if (ev.keyCode == 13) {
						$("#loginBtn").trigger("click");
					}
				};
				if ('${mess}' && 'null' != '${mess}') {
					modal("警告提示","${mess}");
					$("#exampleInputUsername").val("${name}");
					$("#exampleInputPassword1").val("");
					$("#rmbUser").attr("checked",false);
				}
		
			});
			function doLogin() {
				$("#loginBtn").attr('disabled', 'disabled');
				 //给用户提供友好状态提示
				$("#loginBtn").text('登录中...');
				var userName = $("#exampleInputUsername").val();
				var password = $("#exampleInputPassword1").val();
				if ($("#rmbUser").prop("checked")) {
					$.cookie("userName", userName, {
						expires : 7
					});
					$.cookie("password", password, {
						expires : 7
					});
				} else {
					$.cookie("userName", "", {
						expires : -1
					});
					$.cookie("password", "", {
						expires : -1
					});
				}
				var pwd = $.md5(password);
				$("#exampleInputPassword1").val(pwd);
				$("#loginForm").submit();
				$("#loginBtn").removeAttr('disabled');
			}
		 	function back(){
					if (window.history && window.history.pushState){
						$(window).on('popstate', function (){
							window.history.pushState('forward', null, '#');
							window.history.forward(1);
						});
					}
					window.history.pushState('forward', null, '#');
					window.history.forward(1);
				}
 	
		 	//用户已存在
		 	function repeatUserNames(e){
		 		var userName = $(e).val().trim();
		 	    var reg = /^[a-zA-Z0-9]+$/;
		 		if(userName.length==0){
		 			$("#userNames").focus();
		 			$(e).parent().next().show();
		 		}else{
		 	        $(e).parent().next().hide();
		 		}
		 	    if(!reg.test(userName)&&userName.length!=0){
		 	        $(e).parent().next().next().next().show();
		 	    }else{
		 	        $(e).parent().next().next().next().hide();
		 	    }
		 		$.ajax({
		 			url : "licenseinfo/finduser",
		 			type : "post",
		 			dataType : "json",
		 			data :{
		 				"userName": userName			
		 			},
		 			success : function(result){
		 				if(result.status==1){
		 	                $(e).parent().next().next().show();
		 	                $(e).focus().select();
		 	                $(e).val("");
		 				 }else{
		 	                $(e).parent().next().next().hide();
		 				}
		 			}
		 		});
		 	}
			//查询发送配置信息
			 function findMailMess(){
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
			 function findToNameAd(){
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
			 var clicktag = 0;
			 function sendMess(){
				 setTimeout(function () { 
                	 clicktag = 0; 
                	 }, 3000);
				 if (clicktag == 0) {
	                   clicktag = 1;
	                 var list=findToNameAd();
	  				 var e=findMailMess();
	  				 var mailServerHost=e.mailServerHost;
	  				 var mailServerPort=e.mailServerPort;
	  				 var fromAddress=e.fromAddress;
	  				 var userName=e.userName;
	  				 var password=e.password;
	  				 var userNames=$("#userName").val();
	  				 var passwords=$("#password").val();
	  				 var email=$("#email").val();
	  				 var name="用户名： "+userNames+"<br/>"+"密码： "+passwords+"<br/>"+"邮箱： "+email;
	  				 var isSsl = e.sslType;
	  				 var userNameReg = /^[\w]{3,50}$/;//用户名正则
	  				 var passwordReg = /^[0-9a-zA-Z_-]{6,16}$/;//用户密码正则
	  				 var emailReg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  				 if(userNames==""){
	  						modal("警告提示!","用户名不能为空!");
	  						return;
	  					}else if(userNames.length<1 || userNames.length>50){
	  						modal("警告提示!","用户名长度在1~50位之间,请重新输入!");
	  						return;
	  					}else if(!userNames.match(userNameReg)){
	  						modal("警告提示!","用户名只能是英文字母、数字和下划线组成!");
	  						return;
	  					}
	  					if(passwords==""){
	  						modal("警告提示!","密码不能为空!");
	  						return;
	  					}else if(passwords.length<6||passwords.length>16){
	  						modal("警告提示!","密码长度在6~16位之间,请重新输入!");
	  						return;
	  					}else if(!passwords.match(passwordReg)){

							modal("警告提示!","密码只能是英文字母、数字和下划线组成!");
	  						return;
	  					}
	  					if(email.length!=0&&!email.match(emailReg)){
	  				        modal("警告提示!","邮箱格式不正确,请重新输入!");
	  				        return;
	  				    }
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
	   							"count":0,
	   							"name":name,
	   						},
	   						dataType : "json",
	   						success : function(data) {
	   							
	   						}
	   					});
	  				 }
	  				$("#regist-btn-modal").modal('hide');
					 $("#userName").val("");
					 $("#password").val("");
					 $("#email").val("");
					 modal("会话提示","邮件已发送");
	               } else{
	                 alert('请勿频繁点击！');
	               }
			 } 
			
			function userRegist(){
				$("#regist-btn-modal").modal('toggle');
			}
			
	  	</script>
	</head>
  	<body class="login">
<!-- PAGE -->
		<section id="page">
<!-- 登陆页-->
			<section id="login_bg" class="visible">
				<div class="container">
					<div class="row">
						<div class="col-md-4 col-md-offset-4" style="padding-top:10%;">
							<div class="login-box" style="min-width:400px;">
								<div id="logo">
									<a href="javascript:;"><img src="images/login-logo.png" style="max-width:310px;" height="40" alt="logo name"></a>
								</div>
								<div class="divide-40">
									<h5>企业工程知识库&nbsp;|&nbsp;文档云&nbsp;&sdot;&nbsp;知识云&nbsp;&sdot;&nbsp;协同云</h5>
								</div>
								<form role="form" action="user/login" method="post" class="form-horizontal" id="loginForm">
									<div class="form-group">
										<label for="exampleInputUsername" class="labelW">用户名</label>
										<i class="fa fa-user"></i>
										<input type="text" class="form-control iptW" id="exampleInputUsername" name="userName">
									</div>
									<div class="form-group">
								<label for="exampleInputPassword1" class="labelW">密&nbsp;&nbsp;&nbsp;码</label>
								<i class="fa fa-lock"></i>
								<input type="password" autocomplete="new-password" class="form-control iptW" id="exampleInputPassword1" name="password">
								</div>
									<div class="cheBox">
									    <label class="checkbox" style="padding-top:0px;width:13px;">
											<input type="checkbox" class="uniform" id="rmbUser">
											<span style="position: absolute;top: 0;">记住我</span>
										</label>
										<a href="javascript:;" style="position: absolute;top: 0;right:40px;" onclick="userRegist();">注册</a>
										<button type="button" class="btn btn-danger" id="loginBtn" style="background-color: #d9534f;border-color: #b92c28;">登录</button>
										<a href="mainss/per-help.jsp" class="cheBoxAb" target="_blank">帮助</a>
									</div>
									</form>
<!-- SOCIAL LOGIN -->
									<div class="divide-20"></div>
<!-- /SOCIAL LOGIN -->
								</div>
							</div>
						</div>
					</div>
			</section>
<!--/登录页-->
		</section>

	<%--footer--%>
		<section id="footer row">
			<%--<div class="footer col-md-5 col-md-offset-4">--%>
			<div class="footer">
				<div class="col-xs-2"><img src="images/logo1.png" height="40" alt="logo name"></div>
				<div class="col-xs-9 footerColor">
					<p>DAICY | EKMCloud 2018 Release 3.1 Bate</p>
					<p>Copyright © 2010-2020 DAICY. All Rights reserved</p>
				</div>
			</div>
		</section>
<!--/PAGE-->
	<!--注册表-->
<div class="modal fade" id="regist-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
				<h4 class="modal-title">
					<span>注册</span>
				</h4>
			</div>
			<div class="modal-body" style="padding:20px;">
				<form action="" class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-md-3 control-label">用户名:</label>
						<div class="col-md-6">
							<input type="text" class="form-control" id="userName" autocomplete="new-userName" onkeyup="repeatUserNames(this);"/>
						</div>
						<span class="emptyTips" style="display:none;color:#dd5a43;line-height: 34px;">用户名不能为空</span>
                        <span class="beTips" style="display:none;color:#dd5a43;line-height: 34px;">此用户名已存在</span>
                        <span class="specialTips" style="display:none;color:#dd5a43;line-height: 34px;">用户名由英文数字组成</span>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">密码:</label>
						<div class="col-md-6">
							<input type="password" class="form-control" id="password" autocomplete="new-password"/>
						</div>
					</div>
					<div class="form-group">
						<label class="col-md-3 control-label">邮箱:</label>
						<div class="col-md-6">
							<input type="email" name="user_email" class="form-control" id="email"/>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">

				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-danger" onclick="sendMess();">发送</button>
			</div>
		</div>
	</div>
</div>
<!-- bootstrap -->
		<script src="bootstrap/js/bootstrap.min.js"></script>
<!-- uniform -->
		<script type="text/javascript" src="js/jquery.uniform.min.js"></script>
<!--滚动-->
		<script src="js/jquery.slimscroll.min.js"></script>
		<%--<script src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>--%>
		<script src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- backstretch -->
		<script type="text/javascript" src="js/jquery.backstretch.min.js"></script>
<!-- 弹出框 -->
		<!-- <script src="js/script.js"></script> -->
		<script>
			jQuery(document).ready(function() {
				/* App.setPage("login_bg");
				App.init();*/
				handleBackstretch();
			}); 
			 var handleBackstretch = function () {
		        $.backstretch([
		            "images/1.jpg"
		            , "images/2.jpg"
		            , "images/3.jpg"
		            , "images/4.jpg"
		        ], {duration: 3000, fade: 750});
		    };
		</script>
	</body>
</html>