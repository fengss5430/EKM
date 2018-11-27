<%@ page language="java" import="java.util.*"  pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>DAICY | EKMCloud</title>
	<meta http-equiv="X-UA-Compatible" content="IE=11" />
	<meta name="description" content=""  http-equiv="Content-Type" content="text/html; charset=utf-8 ">
	<meta name="author" content=""  http-equiv="Content-Type" content="text/html; charset=utf-8 ">
    <link rel="icon" href="images/logo-1.png" type="images/x-icon">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/bootstrap-datetimepicker.min.css" media="screen">
	<link rel="stylesheet" href="zTree/zTreeStyle/zTreeStyle.css" type="text/css">
	<link rel="stylesheet" href="css/bootstrap-datetimepicker.min.css" type="text/css"/>
	<link rel="stylesheet" href="css/video-js.css" type="text/css"/>
	<link rel="stylesheet" href="css/almanac.css" type="text/css"/>
	<link rel="stylesheet" href="css/bootstrap-select.min.css" type="text/css"/>
	<link rel="stylesheet" href="css/uniform.default.min.css" type="text/css"/>
	<link rel="stylesheet" href="css/prettify.css" type="text/css"/>
	<link rel="stylesheet" href="css/datatablesTools.css" type="text/css"/>
	<link rel="stylesheet" href="css/dataTables.css" type="text/css"/>
	<link rel="stylesheet" href="css/layout.css" type="text/css"/>
	<link rel="stylesheet" href="css/management.css">
	<link rel="stylesheet" href="css/cloud-admin.css" type="text/css">
	<link rel="stylesheet" href="css/themes/default.css" id="skin-switcher" type="text/css">
	<link rel="stylesheet" href="css/responsive.css" type="text/css">
<!--  [endif]-->
	<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" type="text/css"/>
<!-- GRITTER -->
	<link rel="stylesheet" href="js/gritter/css/jquery.gritter.css" type="text/css"/>
	<link rel="stylesheet" href="js/contextjs/context.css" type="text/css"/>
		<!--引入CSS-->
<!-- <link rel="stylesheet" type="text/css" href="js/webuploader-0.1.5/webuploader.css"> -->
	
<!-- JQUERY UI-->
	<script src="js/jquery-1.11.1.min.js"></script>
 	<script src='js/jquery-2.1.4.min.js'></script>
<!-- 	<script src="deps/jquery-2.1.4.min.js"></script> -->
<!-- BOOTSTRAP -->
	
	<script src="bootstrap/js/bootstrap.js"></script>
	<script src="js/bootstrap-select.min.js"></script>
	<script src="js/bootstrap-datetimepicker.min.js"></script>
	<script src="zTree/js/jquery.ztree.all.min.js"></script>
	<script type="text/javascript" src="js/jquery.forms.js"></script>
	
	
	<script src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>

<!-- SLIMSCROLL -->
	<script src="js/jquery.slimscroll.min.js"></script>
	<!-- <script src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script> -->
	<script src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- COOKIE -->
	<script src="js/jQuery-Cookie/jquery.cookie.min.js"></script>
<!-- CUSTOM SCRIPT 自定义 脚本 -->
	<script type="text/javascript" src="js/contextjs/context.js"></script>
	<script src="js/jquery.ellipsis.js"></script>
	<script src="js/script.js"></script>
	<script src="js/dataTables.js"></script>
	<script src="js/circle.js"></script>
	<script src="js/echarts.js"></script>
<!--Video-->
	<%--<script src="jwplayer/jwplayer/jwplayer.js"></script>--%>
	<%--<script src="jwplayer/jwplayer/jwpsrv.js"></script>--%>
	<script src="js/video.js"></script>
	<%--<script src="js/video.min.js"></script>--%>
	<script src="js/videojs-ie8.js"></script>
	<%--<script src="js//zh-CN.js"></script>--%>
	<script src="js/hammer.js"></script>
	<script src="js/iscroll-zoom.js"></script>
	<script src="js/hammer.js"></script>
	<script src="js/lrz.all.bundle.js"></script>
	<script src="js/jquery.photoClip.js"></script>
	<script src="js/almanac.js"></script>


	
	<script src="deps/glMatrix-0.9.5.min.js" type="text/javascript"></script>
	<script src="deps/html2canvas.min.js"></script>
	<script src="deps/ChartNew.min.js"></script>
	<script src="deps/shapesInChart.min.js"></script>
	<script src="deps/pako.min.js"></script>
	<script src="deps/lz4.min.js"></script>
	<script src="deps/hammer.min.js" type="text/javascript"></script>
	<script src="deps/angular.min.js"></script>
	<link href="deps/jquery-ui.min.css" rel="stylesheet" />
	<script src="deps/jquery-ui.min.js"></script>
	<link href="deps/jquery-confirm.min.css" rel="stylesheet" />
	<script src="deps/jquery-confirm.min.js"></script>
	<link href="deps/jquery.qtip.min.css" rel="stylesheet" />
	<script src="deps/jquery.qtip.min.js"></script>
	<script src="deps/detect-element-resize.min.js"></script>
	<link href="deps/jquery.mCustomScrollbar.min.css" rel="stylesheet">
	<script src="deps/jquery.mCustomScrollbar.concat.min.js"></script>
	<link href="css/VCollabPlay.min.css" rel="stylesheet">
	<script src="js/VCollabPlay.min.js" type="text/javascript"></script>
	<script src="js/asm.js"></script>
	</head>

<body id="bodys" style="width: 100%; overflow-x: auto; overflow-y: hidden;min-width:1400px;" >
<!-- 头部 -->
	<header class="navbar clearfix" id="header">
		<div class="container">
<!-- 公司logo-->
			<div class="navbar-brand">
				<a href="user/index.html">
					<img src="images/logo(2).png" alt="Cloud Admin Logo" class="img-responsive">
				</a>
<!-- /公司logo -->
<!-- 团队状态按钮 -->
				<div class="visible-xs">
					<a href="javascript:;" class="team-status-toggle switcher btn dropdown-toggle">
						<i class="fa fa-users"></i>
					</a>
				</div>
<!-- /团队状态 -->
			</div>
<!-- 上边栏设置模块 -->
			<ul class="nav navbar-nav pull-left hidden-xs" id="navbar-left">

			</ul>
<!-- /上边栏设置模块 -->
<!-- 上边栏信息模块-->
			<ul class="nav navbar-nav pull-right userList" style="display: block">
			<span id="memory" value="${session_speed_users.users.spaceSize}"></span>
			<!-- 通知下拉菜单-->
			<li class="dropdown" id="header-notification">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown" style="padding-top:18px;">
                    <i class="glyphicon glyphicon-hdd"></i>
                </a>
				<ul class="dropdown-menu notification">
					<li class="dropdown-title">
					<span>
						<span languageset="str1_notifications">空间使用详情</span>
					</span>
					</li>
					<li class="dropdown-info">
                        <div class="circle" id="circle"></div>
                        <div class="absoultInfo">
                            <p>总空间:<span>40G</span></p>
                            <p>已使用:<span>15G</span></p>
                            <p>未使用:<span>20G</span></p>
                        </div>
					</li>
                    <li class="dropdown-info">
                        <div class="circle" id="circle2"></div>
                        <div class="absoultInfo">
                            <p>总空间:<span>50G</span></p>
                            <p>已使用:<span>4G</span></p>
                            <p>未使用:<span>20G</span></p>
                        </div>
                    </li>
				</ul>
			</li>
			<!--/通知下拉菜单 -->
<!-- 收件箱下拉菜单-->
				<li class="dropdown" id="header-message">
					<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" style="padding-top:18px;">
						<i class="fa fa-envelope"></i>
						<span class="badge" id="newChatSize"></span>
					</a>
					<ul class="dropdown-menu inbox" id="newChat">
						<li class="dropdown-title"><span><i class="fa fa-envelope-o"></i><span class="new_info" >最近消息</span></span></li>
					</ul>
				</li>
<!-- /收件箱下拉菜单-->
<!-- 任务进程下拉菜单-->
				<li class="dropdown" id="header-tasks">
					<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" style="padding-top:18px;">
						<i class="fa fa-tasks"></i>
						<span class="badge" id="listSize"></span>
					</a>
					<ul class="dropdown-menu tasks" id="Taskselect"></ul>
				</li>
<!-- END TODO DROPDOWN -->
<!-- BEGIN USER LOGIN DROPDOWN -->
				<li class="dropdown user" id="header-user">
					<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
						<img id="iconUrlId" alt="" src="${session_speed_users.users.iconUrl}" />
						<span class="username" id="toName" name="">${session_speed_users.users.userName}</span>
						<i class="fa fa-angle-down"></i>
					</a>
					<ul class="dropdown-menu users">
						<li >
							<a href="javascript:;" id="person-btn">
								<i class="fa fa-user"></i>
								<span>我的资料</span>
							</a>
						</li>
						<li>
							<a href="javascript:;" id="private-btn">
								<i class="fa fa-eye"></i>
								<span>隐私设置</span>
							</a>
						</li>
						<li>
							<a href="javascript:;" id="updatePaw-btn">
								<i class="glyphicon glyphicon-lock" style="font-size:12px;"></i>
								<span>修改密码</span>
							</a>
						</li>
						<li>
							<a href="javascript:;" id="cancellation-btn">
								<i class="fa fa-power-off"></i>
								<span>注销</span>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
<!-- 团队状态栏lan -->
		<div class="container team-status" id="team-status">
			<span id="teamname" value="${session_speed_users.users.teamId}"></span>
			<div id="scrollbar">
				<div class="handle"></div>
			</div>
			<div id="teamslider">
				<ul class="team-list" id="teamul"></ul>
				<form >
					<select id="teamForm" style="display:none;position:absolute;top:10px;right:50px;background-color: rgb(85, 85, 85);color:#fff;"></select>
				</form>
			</div>
		</div>
	</header>
<!--/头部 -->
<!-- PAGE -->
	<div id="loadDiv"><img style="opacity: 0.8;" src="images/onload.gif"></div>
	<section id="page">
<!-- 侧边栏 -->
		<div id="sidebar" class="sidebar">
			<div class="sidebar-menu nav-collapse">
				<ul style="margin-top: 0; overflow: hidden;" id="left_menu_List">
					<li>
						<h4>工作台</h4>
						<div class="mobilediv input-group search-bar" style="display: none; float: right; width: 180px; margin: 2px 2px 0 0;">
							<input type="text" class="form-control search" style="height: 34px; padding-right: 0; border-right-width: 0px" placeholder="Search">
							<a href="javascript:;" class="input-group-addon" style="background: transparent; border-left-width: 0">
								<i class="fa fa-search"></i>
							</a>
						</div>
					</li>
					<li class="active">
						<a id="defaultnav" href="javascript:;" name="resource-status" onclick="ChangePage(this);">
							<span style="display: inline-block;width:16px;height:16px;background:url(images/resource-status.png) no-repeat;margin-right:5px;"></span>
							<span class="menu-text">资源状态</span>
							<span class="selected"></span>
						</a>
					</li>
					<li>
						<a href="javascript:;" name="todo" onclick="ChangePage(this);">
							<span style="display: inline-block;width:16px;height:16px;background:url(images/todo-icon.png) no-repeat;margin-right:5px;"></span>
							<span class="menu-text">待办事宜</span>
							<span class="selected"></span>
						</a>
					</li>

					<li>
						<a href="javascript:;" name="task-reservation" onclick="ChangePage(this);">
							<i class="glyphicon glyphicon-list-alt"></i>
							<span class="menu-text">新建申请</span>
							<span class="selected"></span>
						</a>
					</li>
					<li>
						<a href="javascript:;" name="my-application" onclick="ChangePage(this);">
							<i class="glyphicon glyphicon-file"></i>
							<span class="menu-text">我的申请</span>
							<span class="selected"></span>
						</a>
					</li>
					<li>
						<a href="javascript:;"name="group-share" onclick="ChangePage(this);">
							<i class="fa fa-users"></i>
							<span class="menu-text">我的团队</span>
							<span class="selected"></span>
						</a>
					</li>
					<li>
						<h4>文档云</h4>
					</li>
					<div id="database">
						<li>
							<a href="javascript:;" name="My-database" type="1" id="My-database" onclick="ChangePage(this);">
							<i class="fa fa-clipboard"></i>
							<span class="menu-text">我的资料库</span>
							<span class="selected"></span>
							</a>
						</li>
						<!-- team-database -->
						<li >
							<a href="javascript:;" name="My-database" type="2" onclick="ChangePage(this);">
							<i class="fa fa-address-book-o"></i>
							<span lass="menu-text">团队资料库</span>
							<span class="selected"></span>
							</a>
						</li>
						<!-- dept-database -->
						<li id="deptDataId">
						<a href="javascript:;" name="My-database" type="" onclick="ChangePage(this);">
						<i class="glyphicon glyphicon-film"></i>
						<span lass="menu-text">部门资料库</span>
						<span class="selected"></span>
						</a>
						</li>
						<!-- Marketing-database -->
						<li>
							<a href="javascript:;" name="My-database" type="3" onclick="ChangePage(this);">
							<i class="fa fa-folder"></i>
							<span class="menu-text">公司资料库</span>
							<span class="selected"></span>
							</a>
						</li>
						
						<!-- Marketing-database -->
						<li id="protitle1" class="">
							<h4>知识云</h4>
						</li>
						<li class="">
							<a href="javascript:;" type="11" name="Design-visuazation" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-asterisk"></i>
								<span class="menu-text" value="0">标准知识</span>
								<span class="selected"></span>
							</a>
						</li>
						<li class="">
							<a href="javascript:;" type="22" name="Design-visuazation" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-film"></i>
								<span class="menu-text" value="0">产品知识</span>
								<span class="selected"></span>
							</a>
						</li>
						<li class="">
							<a href="javascript:;" type="13" name="Design-visuazation" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-gift"></i>
								<span class="menu-text" value="0">业务知识</span>
								<span class="selected"></span>
							</a>
						</li>
						
						
						
						<li id="protitle" class="hide">
							<h4>协同云</h4>
						</li>
						<li class="hide">
							<a href="javascript:;" type="55"  class="fff" name="Design-visuazation" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-book"></i>
								<span class="menu-text" value="3">产品数据</span>
								<span class="selected"></span>
							</a>
						</li>
						<li class="hide">
							<a href="javascript:;" type="66"  class="fff" name="Design-visuazation" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-leaf"></i>
								<span class="menu-text" value="1">技术开发协同</span>
								<span class="selected"></span>
							</a>
						</li>
						<li class="hide">
							<a style="border-bottom: 1px solid #e7e7e7;"  class="fff" href="javascript:;" type="77" name="Design-visuazation" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-eye-open"></i>
								<span class="menu-text" value="2">业务技术协同</span>
								<span class="selected"></span>
							</a>
						</li>

					</div>
				</ul>
			</div>

		</div>
<!-- /侧边栏 -->

	<!--sidebar-bot-->
	<div class="sidebar-bot">
	<p class="sideba-text">DAICY EKMCloud 2018 R3.1.Beta</p>
	</div>


		<div class="pageRight" style=""></div>
	</section>
	<span id="getPage"></span>
<!--即时通信-->
	<div class="modal fade"  id="ImmediateMess-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" id="modal-content">
				<div class="modal-header">
					<div class="UserInfo clearfix" >
						<div class="UserImg pull-left" id="tupian">
							<img src="images/tab-user.png" alt=""/>
						</div>
						<div class="UserDetails pull-left" id="toplist"></div>
						<div class="BtnGroups">
							<span class="glyphicon glyphicon-remove" data-dismiss="modal" aria-hidden="true"></span>
						</div>
					</div>
				</div>
				<div class="modal-body">
					<div class="UserTalk" id='UserTalk'>
						<ul class="clearfix" id="message"></ul>
					</div>
					<div class="UserLeavMessage">
						<textarea class="form-control" style="height: 130px;" id="writeMsg"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-default btn-danger"
					value="send" id="sendMsg" onclick="sendMsg();">发送</button>
				</div>
			</div>
		</div>
	</div>
<!--查看图像-->
	<div class="modal fade" id="PicType-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>在线查看图像</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="typeBox">
						<div class='imgbox'>
							<img id="TypeUrl" src="" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!--查看Txt-->
<div class="modal fade" id="lookTxt-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
              <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
                    <h4 class="modal-title">
                         <span>在线查Txt文档</span>
                    </h4>
               </div>
              <div class="modal-body">
                    <pre id="txtid" class="typeBox" style="background: #fff;text-align:left;color:#323232;text-indent: 46px; overflow-y: scroll;font-size: 15px;line-height: 24px;">
                    </pre>
              </div>
        </div>
    </div>
</div>
<!--PDF-->
	<div class="modal fade" id="Pdf-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>PDF在线阅读</span>
					</h4>
				</div>
				<div class="modal-body">
					<iframe id="ChangeSrc" src="" width="100%" height="88%" allowfullscreen="" webkitallowfullscreen=""></iframe>
				</div>
			</div>
		</div>
	</div>
<!--Video-->
	<div class="modal fade" id="Video-modal" aria-labelledby="myModalLabel" aria-hidden="true">
	    <div class="modal-dialog">
	        <div class="modal-content">
	            <div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
	                <h4 class="modal-title">
	                    <span>在线视频查看</span>
	                </h4>
	            </div>
	            <div class="modal-body">
					<div class="m" style="width: 1500px; height: 100%; margin: 0 auto; ">
						<video id="videoBox" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="1500" height="742"
						 data-setup='{"techOrder": ["flash","html5"]}' >
							<%--<source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">--%>
							<%--<source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/webm">--%>
							<%--<source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/ogg">--%>
							<%--<track kind="captions" src="js/shared/example-captions.vtt" srclang="en" label="English"></track>--%>
							<%--<!-- Tracks need an ending tag thanks to IE9 -->--%>
							<%--<track kind="subtitles" src="js/shared/example-captions.vtt" srclang="en" label="English"></track>--%>
							<%--<!-- Tracks need an ending tag thanks to IE9 -->--%>
							<%--<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>--%>
						</video>
					</div>

	            </div>
	        </div>
	    </div>
	</div>
<!--分享-->
	<div class="modal fade" id="share-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content" style="height:326px;">
				<div class="modal-header">
	               <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>分享</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="share-link pull-left">
							<ul class="clearfix">
								<li class="active"><a href="javascript:void (0);">链接分享</a></li>
								<li><a href="javascript:void (0);">发至团队成员</a></li>
								<li><a href="javascript:void (0);">发至资料库</a></li>
							</ul>
						</div>
						<div class="share-link-list pull-right">
							<div class="share-link-info">
								<ul class="clearfix" style="padding: 0 20px;">
									<li class="create-link" data-type="create-link">
										<span style="padding: 0 0 177px 0;">生成下载链接，然后复制链接发送给你要分享的用户</span>
										<a href="javascript:void(0);" class="public-link disBtn">创建链接</a>
									</li>
								</ul>
							</div>
							<div class="share-link-info">
								<div class="sharefirenddBox clearfix">
									<span class="font-14">选择好友分享文件,一次最多10人</span>
									<div class="friendBox-content clearfix">
										<div class="friendBox-fl left" id="friendBox-fl">
											<ul class="Box-fl-list clearfix">
												<li>
													<div class="Box-list-title">
														<img src="images/right.png" alt=""/>
														<span>最近分享</span>
														<span class="num" id="shareTeamListNum"></span>
													</div>
													<ul class="list-title-info clearfix" id="shareTeamList"></ul>
												</li>
											</ul>
										</div>
										<div class="friendBox-fr right" >
											<div class="select-box">
												<p class="box-title" >已经选择了<span id="connShareP" class="num" >0</span>个收件人</p>
												<ul class="select-list cleafix" id="shareSelecteName"></ul>
											</div>
										</div>
									</div>
									<div class="buttonGroup">
										<button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
										<button type="button" class="btn btn-danger disBtn" onclick="shareTameMember();">分享</button>

									</div>
								</div>
							</div>
							<div class="share-link-info displayone">
								<div class="emailBox clearfix">
									<form action="" class="form-horizontal" role="form">
										<div class="form-group" style="padding: 32px 0 0 0;">
											<label class="col-sm-3 control-label">分享到:</label>
											<div class="col-sm-6">
												<select class="form-control" id="shaerSelectc"></select>
											</div>
										</div>
										<div class="form-group" style="padding: 0 0 62px 0;">
											<label class="col-sm-3 control-label"></label>
											<div class="col-sm-6">
												<select class="form-control" id="shaerSelectc2">
														<option value="1">团队</option>
														<option value="2">资料</option>
												</select>
											</div>
										</div>
										<div class="buttonGroup">
											<button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
											<button type="button" class="btn btn-danger disBtn" onclick="fileShare();">分享</button>

										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!--下载-->
	<div class="modal fade" id="down-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>下载</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 86px 0 85px 0">确认下载所选文件</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
					<button type="button" class="btn btn-danger" onclick="download();">确定</button>
				</div>
			</div>
		</div>
	</div>
<!--删除-->
	<div class="modal fade" id="del-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>删除</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 86px 0 85px 0;">确认要把所选文件删除吗?<br/></div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger disBtn" onclick="deleteFileInMove();">确定</button>
				</div>
			</div>
		</div>
	</div>
<!--复制到-->
	<div class="modal fade" id="copy-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<span id="ChildrenMaxid"></span>
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span id="copyMoveSpanText"></span>
						<span></span>
					</h4>
				</div>
				<div class="modal-body add-body-class" >
					<div class="contents-share clearfix content-size">
						<ul id="ztreeCopyMove" class="ztree"></ul>
					</div>
				</div>
				<div class="modal-footer clearfix">
					<button type="button" class="btn btn-danger pull-right disBtn"  onclick="CopyMoveOpter();">确定</button>
					<button type="button" class="btn btn-default pull-right disBtn"style="margin-right: 10px;" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-default pull-left disBtn" onclick="CopyNewFolder();">新建文件夹</button>
				</div>
			</div>
		</div>
	</div>
<!--知识云复制到-->
	<div class="modal fade" id="copy-modals" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<span id="ChildrenMaxids"></span>
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span id="copyMoveSpanTexts"></span>
						<span></span>
					</h4>
				</div>
				<div class="modal-body add-body-class" >
					<div class="contents-share clearfix content-size">
						<ul id="cloudtreeCopy" class="ztree"></ul>
					</div>
				</div>
				<div class="modal-footer clearfix">
					<button type="button" class="btn btn-danger pull-right disBtn"onclick="CopyMoveOpters();">确定</button>
					<button type="button" class="btn btn-default pull-right disBtn" data-dismiss="modal" style="margin-right: 10px;" >取消</button>
					<button type="button" class="btn btn-default pull-left disBtn" onclick="CopyNewFolders();">新建文件夹</button>
				</div>
			</div>
		</div>
	</div>
<!--复制  移动 ----新建文件夹-->
	<div class="modal fade" id="CopyNewFolder-modals" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>新建文件夹</span>
					</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-horizontal padding72" role="form">
						<div class="form-group">
							<label class="col-sm-3 control-label">名称:</label>
							<div class="col-sm-6">
								<input type="text"  class="form-control" id="createDirectoryInputs">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger disBtn" onclick="createDirectorys()">确定</button>
				</div>
			</div>
		</div>
	</div>
<!--复制  移动 ----新建文件夹-->
	<div class="modal fade" id="CopyNewFolder-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>新建文件夹</span>
					</h4>
				</div>
				<div class="modal-body">
					<form action="" class="form-horizontal padding72" role="form">
						<div class="form-group">
							<label class="col-sm-3 control-label">名称:</label>
							<div class="col-sm-6">
								<input type="text"  class="form-control" id="createDirectoryInput">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger" onclick="createDirectory()">确定</button>
				</div>
			</div>
		</div>
	</div>
<!--重命名-->
	<div class="modal fade" id="rename-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>重命名</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 85px 0 82px 0;">
							文件名 : <input type="text" id="renameFile" class="form-control nameW"/>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
					<button type="button" class="btn btn-danger" onclick="renameFile();">确定</button>
				</div>
			</div>
		</div>
	</div>
<!--移动到-->
	<div class="modal fade" id="move-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>复制到</span>
						<span></span>
					</h4>
				</div>
				<div class="modal-body add-body-class" >
					<div class="contents-share clearfix content-size">
						<ul id="treeMove" class="ztree"></ul>
					</div>
				</div>
				<div class="modal-footer clearfix">
					<button type="button" class="btn btn-default pull-right btn-primary" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-default pull-right" style="margin-right: 10px;">确定</button>
					<button type="button" class="btn btn-default pull-left">新建文件夹</button>
				</div>
			</div>
		</div>
	</div>
<!--标记隐藏-->
	<div class="modal fade" id="hide-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>标记隐藏</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 85.5px 0">是否隐藏?</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default " data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-default btn-danger" onclick="setHiddeFile();">标记隐藏</button>
				</div>
			</div>
		</div>
	</div>
<!--取消隐藏-->
	<div class="modal fade" id="cacelHide-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>取消隐藏</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 85.5px 0">是否取消隐藏?</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-default btn-danger" onclick="delHiddeFile();">取消隐藏</button>
				</div>
			</div>
		</div>
	</div>
<!--权限弹框-->
	<div class="modal fade" id="limit-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>用户权限</span>
					</h4>
				</div>
				<div class="modal-body">
                    <form class="form-horizontal" action="">
                        <div class="form-group">
                            <label for="" class="col-sm-3 control-label"><span>文件</span>:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="filenameid" value="" readonly="readonly"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="searchUser" class="col-sm-3 control-label"><span>搜索</span>:</label>
                            <div class="col-sm-8">
                              <input type="text" class="form-control" id="searchUser" onkeyup="searchNodeLazys(this.value,'treeDemo')" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-3 control-label"><span>用户</span>:</label>
                            <div class="col-sm-8">
                                <ul class="limitBox ztree" id="treeDemo"></ul>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-3 control-label"><span>权限</span>:</label>
                            <div class="col-sm-8">
                                <div class="checkbox col-sm-2">
                                    <label>
                                         <input type="checkbox" name="checkbox" value="1" id="read">读
                                    </label>
                                </div>
                                <div class="checkbox col-sm-2">
                                    <label>
                                        <input type="checkbox" name="checkbox" value="2" id="write"> 写
                                    </label>
                                </div>
                            </div>
                        </div>
                         <div class="form-group">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-9">
                                <button type="button" class="btn btn-default col-sm-2" data-dismiss="modal" style="margin-right:15px;" >取消</button>
								<button type="button" class="btn btn-danger col-sm-2"onclick="savePower();">确定</button>
                            </div>

                         </div>
                    </form>
				</div>
	        </div>
	    </div>
    </div>
<!--个人资料-->
	<div class="modal fade" id="person-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="width: 750px;">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true" id="close"></span>
					<h4 class="modal-title">
						<span>个人资料</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="person-box clearfix">
						<div class="box-tabMenu pull-left">
							<ul class="clearfix">
								<li class="active"><a href="javascript:;"  style="text-decoration:none">基本设置</a></li>
								<li><a href="javascript:;"  onclick="getSelfMess();" style="text-decoration:none">工作信息</a></li>
								<li><a href="javascript:;" style="text-decoration:none">头像设置</a></li>
							</ul>
						</div>
						<div class="box-tabContent">
							<div class="box-contents">
								<form class="form-horizontal " id="butper" method="post">
									<div class="form-group" style="margin-bottom:30px;">
										<label for="" class="col-sm-3">用户名:</label>
										<div class="col-sm-6">
											<input type="text" class="form-control text-left" id="uName" name="userName" value="" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group" style="margin-bottom:30px;">
										<label for="" class="col-sm-3">真实姓名:</label>
										<div class="col-sm-6">
											<input type="text" class="form-control text-left" id="rName" name="realName" value=""/>
										</div>
									</div>
									<div class="form-group" style="margin-bottom:30px;">
										<label for="" class="col-sm-3">手机号:</label>
										<div class="col-sm-6">
											<input type="text" class="form-control text-left" id="tphone" name="telephone" value=""/>
										</div>
									</div>
									<div class="form-group" style="margin-bottom:30px;">
										<label for="" class="col-sm-3">邮箱:</label>
										<div class="col-sm-6">
											<input type="text" class="form-control text-left" id="els" name="email" value=""/>
										</div>
									</div>
									<div class="BtnGroup">
										<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
										<button type="button" class="btn btn-default btn-danger" onclick="subform();">保存</button>
									</div>
								</form>
							</div>
							<div class="box-contents">
								<form class="form-horizontal">
									<div class="form-group">
										<label for="" class="col-sm-3">部门信息:</label>
										<div class="col-sm-8">
	                                      <input type="text" class="form-control text-left" id="dename" name="deptName" value="" readonly="readonly"/>
										</div>
									</div>
									<div class="form-group">
										<label for="" class="col-sm-3">部门说明:</label>
										<div class="col-sm-6 textarea-info">
											<textarea class="form-control " id="deMess" rows="10" cols="38" placeholder="此部门主要研究SpeedCloud的开发，为客户提供最优质，良好的用户体验！" name="deptMess" value="" readonly="readonly"></textarea>
										</div>
									</div>
								</form>
								<div class="BtnGroup">
									<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
								</div>
							</div>
							<div class="box-contents">
								<div class="boxImg clearfix">
									<div class="boxImg-default">
										<div class="ChoseImg">
											<span class="FileImgRemark">提示:使用鼠标进行缩放与移动,左键双击图片进行旋转</span>
										</div>
										<div class="clipArea" id="clipArea"></div>
									</div>
									<div class="boxImg-thumb displayinline">
										<h4>效果预览</h4>
										<div id="viewImg"></div>
									</div>
								</div>
								<div class="BtnGroup clearfix">
									<a href="javascript:;" class="btn btn-default file-relative" style="float: left; margin-left: 10px;">头像上传
										<input type="file" class="FileImg" name="file" id="file" accept="image/jpg,image/jpeg,image/png,image/gif">
									</a>
									<button type="button" class="btn btn-default fileHiden" id="clipBtn" ></button>
									<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
									<button type="button" class="btn btn-danger"  onclick="savePic();" >保存</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!--新建文件夹-->
	<div class="modal fade" id="NewFolder-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>新建文件夹</span>
					</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal padding72" role="form" onsubmit="return false;">
						<div class="form-group">
							<label class="col-sm-3 control-label">名称:</label>
							<div class="col-sm-6">
								<input type="text"  class="form-control" id="inputFileName">
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger" onclick="createFile()">确定</button>
				</div>
			</div>
		</div>
	</div>
<!--上传文件-->
	<div class="modal fade" id="UploadDoc-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>上传文件</span>
					</h4>
				</div>
				<div class="modal-body">
				<div id="sliceUpload">
				</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger disBtn" onclick="up('1');">确定</button>
				</div>
			</div>
		</div>
	</div>
<!--隐私-->
	<div class="modal fade" id="private-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<span id="spanpassword" value="${session_speed_users.users.password}"></span>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>隐私设置</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 64px 0">
							安全密码：<input type="password" id="hidePassword" autocomplete="new-password"/>
						</div>
						<div class="BtnGroup margin36">
							<button id="private-btns" type="button" class="btn btn-default pull-left">设置安全密码</button>
							<button type="button" class="btn btn-default" onclick="hide();">进入隐私模式</button>
							<button type="button" class="btn btn-danger" onclick="delhide();">退出隐私模式</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="private-btn-modals" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>隐私设置</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 36px 0">
							<div>请输入用户密码：<input type="password" id="password" ></div>
							<div style="margin-top: 30px;">请设置安全密码：<input type="password" id="passwords"></div>
							<div style="margin-top: 30px;position: relative;" >请确认安全密码：
								<input type="password" id="pwd" onkeyup="samepwd();">
								<span class="emptyTips" style="position: absolute;right: 5px;">输入密码不一样</span>
							</div>
						</div>
						<div class="BtnGroup margin36" style="text-align: right">
							<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
							<button id="remoclass" type="button" class="btn btn-default btn-danger" onclick="setPasswork();">确认</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
<!--覆盖选择框-->
	<div class="modal fade" id="cover-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>覆盖文件</span>
						<span id="coverId"></span>&nbsp;?
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding:85px 0 10px 0">该文件夹下有同名文件</div>
						<div class="down-test" style="padding: 10px 0 85px 0">替换会覆盖已有内容</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" onclick="startUpload('1');">替换</button>
					<button type="button" class="btn btn-default" onclick="startUpload('2');">不替换</button>
					<button type="button" class="btn btn-default btn-danger" data-dismiss="modal">取消</button>
				</div>
			</div>
		</div>
	</div>
<!--解压选择框-->
	<div class="modal fade" id="unzip-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>解压文件</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding:55px 0">是否解压此文件</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default disBtn" data-dismiss="modal" >取消</button>
					<button type="button" class="btn btn-default btn-danger disBtn" id="jieyaid">确定</button>
				</div>
			</div>
		</div>
	</div>
<!--注销-->
	<form action="user/logout" method="get" id="logout">
		<div class="modal fade" id="cancellation-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
		                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
						<h4 class="modal-title">
							<span>注销账户</span>
						</h4>
					</div>
					<div class="modal-body">
						<div class="contents-share clearfix">
							<div class="down-test" style="padding: 64px 0">是否注销该用户？</div>
							<div class="BtnGroup margin36">

								<button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
								<button type="button" class="btn btn-danger disBtn" onclick="logout();">确定</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
<!--修改密码-->
	<div class="modal fade" id="updatePaw-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
				<span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
				<h4 class="modal-title">
					<span>修改密码</span>
				</h4>
			</div>
				<div class="modal-body">
				<div class="contents-share clearfix">
				<form action="" class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-sm-3 control-label">原始密码:</label>
						<div class="col-sm-5">
							<input type="password" class="form-control" id="oldpassword" autocomplete="new-password"  onblur="repeatpwd(this);">
						</div>
						<span class="emptyTips">密码不能为空</span>
						<span class="specialTips">初始密码不正确</span>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">重新设置密码:</label>
						<div class="col-sm-5">
							<input type="password" class="form-control" id="respassword" autocomplete="new-password" onblur="rpwd(this);">
						</div>
						<span class="emptyTips">密码不能为空</span>
						<span class="beTips">密码由英文字母和数字组成</span>
						<span class="specialTips">密码在6~16位之间,请重新输入</span>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">确认密码:</label>
						<div class="col-sm-5">
							<input type="password" class="form-control" id="newpassword" autocomplete="new-password" onkeyup="repwd(this);">
						</div>
						<span class="emptyTips">密码不能为空</span>
						<span class="specialTips">输入密码不一致</span>
					</div>
				</form>
			</div>
			</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger" onclick="ResetPassword();">确定</button>
				</div>
			</div>
		</div>
	</div>
<!---上传Modal--->
    <div id="upLoad-modal">
        <div class="modal-content">
			<div class="modal-header">
				<span class="glyphicon glyphicon-remove pull-right" id="closeBtn"></span>
				<span class="glyphicon glyphicon-minus pull-right marginRight fadeMin" id="fadeMin"></span>
				<span class="glyphicon glyphicon-unchecked pull-right marginRight hide" id="fadeMax"></span>
		
				<h4 class="modal-title">
					<span>上传文件</span>
				</h4>
			</div>
			
            <div class="modal-body" id="modalBody">
                <div class="upBox clearfix">

                </div>
            </div>
        </div>
    </div>
 <div class="modal fade" id="UploadDoc2-modal" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
                            <h4 class="modal-title">
                                <span>上传文件</span>
                            </h4>
                        </div>
                        <div class="modal-body">
                         <form id="uploadForm" method="POST" enctype="multipart/form-data" class="form-horizontal padding72" role="form">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">型号:</label>
                                    <div class="col-sm-6">
                                         <input type="text" class="form-control" name="model" id="modelnum">
                                    </div>
                                </div>
                                <div id="sliceUploads">
								</div>
                             </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-danger" onclick="uplod('1');">确定</button>

                        </div>
                    </div>
                </div>
            </div>
<!--引入JS-->
<!-- <script type="text/javascript" src="js/webuploader-0.1.5/webuploader.js"></script> -->
	<script src="js/jquery.ellipsis.js"></script>
  	<script src="libs/underscore-1.8.2.js"></script>
  	<script src="js/framework/ef.js"></script>
    <script src="js/framework/Placard.js"></script>
	<script src="js/framework/SliceUpload.js"></script>
	<script src="js/common.js"></script>
	<script src="myjs/general.js"></script>
	<script src="js/ifvisible.min.js"></script>
	<script src="myjs/index.js"></script>
	<script src="js/jquery.md5.js"></script>
	<script src="js/pagerUtil.js"></script>
	<script>
		window.onload =function() {
			App.init();
			$('#loadDiv').hide();
		};
	</script>
</body>
</html>
