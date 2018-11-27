<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
	<base href="<%=basePath%>">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>DAICY | EKMCloud</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link rel="icon" href="images/logo-1.png" type="images/x-icon">
    <!--[endif]-->
    <link rel="stylesheet" href="css/cloud-admin.css" type="text/css">
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
    <!-- UNIFORM -->
    <link rel="stylesheet" href="js/uniform/css/uniform.default.min.css" type="text/css"/>
    <!-- FONTS -->
    <!--<link href='http://fonts.useso.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'>-->
    <script type="text/javascript" src="resources/lib/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="resources/lib/jquery.json-2.3.min.js"></script> <!-- i18国际化脚本 -->
    <script type="text/javascript" src="resources/lib/jquery.i18n.properties-1.0.9.js"> </script> <!-- i18国际化脚本 -->
    <script type="text/javascript" src="resources/js/main.js"></script> <!-- i18国际化脚本   为元素设置languageset属性，属性值为properties包的键 -->
	<script type="text/javascript">
		  $(function() {
			  back();
			});
			
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
	  	</script>
</head>
<body class="login">
<!-- PAGE -->
<section id="page">
    <!-- HEADER -->
    <header>
        <!-- NAV-BAR -->
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4" style="padding: 148px 0 20px 0">
                    <div id="logo">
                        <a href="javascript:;"><img src="images/logo.png" height="40" alt="logo name" /></a>
                    </div>
                </div>
            </div>
        </div>
        <!--/NAV-BAR -->
    </header>
    <!--/HEADER -->

    <!-- 登陆页-->
    <section id="login_bg" class="visible">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="login-box" style="min-width:400px;">
                        <h2 class="bigintro"></h2>
                        <h6 class="center" style="color:#ff0000;font-size: 14px;line-height:62px;">未获得许可或许可已过期,请输入产品许可证</h6>
                       
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="labelW">序列号</label>
                                <input type="text" class="form-control inpitW" id="sn_input" name="sn"  style="width:77%;">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1" class="labelW">许可证</label>
                                <input type="text" class="form-control" id="urlinput" readonly="readonly" style="width:77%;">
                            </div>
                            <div>
                            <div class="form-group">
                             <form role="form" id="uploadform" method="POST" enctype="multipart/form-data">
                                    <div class="col-md-5 pull-left" style="width:100px; margin-left:66px;padding: 0; position: relative;">
                                    	<button class="btn btn-default" >选择许可证</button>
                                    	<input style="width:100px;position: absolute;top: 0; z-index: 88; opacity: 0;" type="file" class="btn btn-default" onchange="handleFile()" id="urlval" name="fileName" value="选择许可证">
                                    </div>
                               </form>
                                    <div class="col-md-4 pull-right" style="padding: 0;"><input type="button" class="btn btn-default" value="提交" onclick="ajaxFileUpload();" style="padding:6px 35px 6px 0px;"></div>
                                </div>
                            </div>
                        
                        <!-- SOCIAL LOGIN -->
                        <div class="divide-20"></div>
                        <!-- /SOCIAL LOGIN -->
                        <div class="login-helpers">
<!--                              <a href="mainss/per-help.jsp" target="_blank">帮助</a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--/登录页-->

</section>
<!--/PAGE -->

<!-- JAVASCRIPTS -->
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/jquery.uniform.min.js"  type="text/javascript"></script>
<!--滚动 -->
<!-- <script src="js/jquery.slimscroll.js"></script> -->
<script src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!--背景图片-->
<script src="js/jquery.backstretch.min.js" type="text/javascript"></script>
<!-- <script src="js/script.js" type="text/javascript"></script> -->
<script src="js/jquery.forms.js" type="text/javascript"></script>
<script src="pagejs/No-License.js" type="text/javascript"></script>
<script src="myjs/general.js" type="text/javascript"></script>
<script>
    jQuery(document).ready(function() {
        <%--App.setPage("login_bg");--%>
        <%--App.init();--%>
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