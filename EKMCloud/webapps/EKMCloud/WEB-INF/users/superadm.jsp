<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>DAICY | EKMCloud</title>
<meta http-equiv="X-UA-Compatible" content="IE=11" />
<meta name="description" content="" http-equiv="Content-Type" content="text/html; charset=utf-8 ">
<meta name="author" content="" http-equiv="Content-Type" content="text/html; charset=utf-8 ">
<link rel="icon" href="images/logo-1.png" type="images/x-icon">
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="css/uniform.default.min.css" />
<link rel="stylesheet" type="text/css" href="css/prettify.css" />
<link rel="stylesheet" href="css/datatablesTools.css" type="text/css"/>
<link rel="stylesheet" href="css/dataTables.css" type="text/css"/>
<link rel="stylesheet" type="text/css" href="css/layout.css" />
<link rel="stylesheet" href="css/management.css"/>
<link rel="stylesheet" type="text/css" href="css/cloud-admin.css"/>
<link rel="stylesheet" type="text/css" href="css/themes/default.css" id="skin-switcher"/>
<link rel="stylesheet" type="text/css" href="css/responsive.css"/>
<!--  [endif]-->
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
<!-- GRITTER -->
<link rel="stylesheet" type="text/css" href="js/gritter/css/jquery.gritter.css" />
<link rel="stylesheet" href="js/contextjs/context.css" />
</head>

<body id="bodys" style="width: 100%; overflow-x: auto; overflow-y: hidden;min-width:1360px;">
	<!-- 头部 -->
	<header class="navbar clearfix" id="header">
		<div class="container">
			<div class="navbar-brand">
				<!-- 公司logo-->
				<a href="user/superadmLogin"> 
					<img src="images/logo(2).png" alt="Cloud Admin Logo" class="img-responsive"/>
				</a>
				<!-- 公司logo -->
				<!-- 团队状态按钮 -->
				<div class="visible-xs">
					<a href="javascript:;" class="team-status-toggle switcher btn dropdown-toggle"> 
						<i class="fa fa-users"></i>
					</a>
				</div>
				<!-- /团队状态 -->
			</div>
			<span id="admid" class="hide" type="${session_speed_users.users.roleId}" value="${session_speed_users.users.userId}"></span>
			<!-- 上边栏设置模块 -->
			<ul class="nav navbar-nav pull-left hidden-xs" id="navbar-left"></ul>
			<ul class="nav navbar-nav pull-right userList" style="display: block">
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
				<!-- BEGIN USER LOGIN DROPDOWN -->
				<li class="dropdown user" id="header-user" style="float:right;">
					<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"> 
						<img id="iconUrlId" alt="" src="${session_speed_users.users.iconUrl}" /> 
						<span class="username" id="toName">${session_speed_users.users.userName}</span>
						<i class="fa fa-angle-down"></i>
					</a>
					<ul class="dropdown-menu users">
						<li>
							<a href="javascript:;" id="updatePaw-btn">
								<i class="glyphicon glyphicon-lock" style="font-size:12px;"></i>
								<span>修改密码</span>
							</a>
						</li>
 						<li>
							<a href="javascript:;" id="upAdress-btn"> 
 								<i class="glyphicon glyphicon-tint" style="font-size:12px;"></i> 
 								<span>修改路径</span> 
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
				<form>
					<select id="teamForm" style="position: absolute; top: 10px; right: 50px; background-color: rgb(85, 85, 85); color: #fff;">
					</select>
				</form>
			</div>
		</div>
	</header>
	<!--/头部 -->

	<!-- PAGE -->
	<div id="loadDiv">
		<img style="opacity: 0.8;" src="images/onload.gif">
	</div>
	<section id="page">
	<!-- 侧边栏 -->
		<div id="sidebar" class="sidebar">
			<div class="sidebar-menu nav-collapse">
				<ul style="margin-top: 0" id="left_menu_List">
					<li>
						<h4>文档云</h4>
					</li>
					<li class="active">
						<a id="defaultnav" href="javascript:;" name="one-backup" type="1" onclick="ChangePage(this);">
							<i class="fa fa-clipboard"></i> 
							<span class="menu-text">用户资料库</span>
							<span class="selected"></span>
						</a>
					</li>
					<li><!-- team-database --> 
						<a href="javascript:;" name="one-backup" type="2" onclick="ChangePage(this);"> 
							<i class="fa fa-address-book-o"></i> 
							<span lass="menu-text">团队资料库</span>
							<span class="selected"></span>
						</a>
					</li>
					<!-- dept-database -->
					<li id="deptDataId">
						<a href="javascript:;" name="one-backup" type="9" onclick="ChangePage(this);"> 
							<i class="glyphicon glyphicon-film"></i> 
							<span lass="menu-text">部门资料库</span>
						</a>
					</li>
					<li><!-- Marketing-database -->
						<a href="javascript:;" name="one-backup" type="3" onclick="ChangePage(this);"> 
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
							<a href="javascript:;" type="11" name="one-backup" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-asterisk"></i>
								<span class="menu-text" value="0">标准知识</span>
								<span class="selected"></span>
							</a>
						</li>
						<li class="">
							<a href="javascript:;" type="22" name="one-backup" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-film"></i>
								<span class="menu-text" value="0">产品知识</span>
								<span class="selected"></span>
							</a>
						</li>
						<li class="">
							<a href="javascript:;" type="13" name="one-backup" onclick="ChangePage(this);">
								<i class="glyphicon glyphicon-gift"></i>
								<span class="menu-text" value="0">业务知识</span>
								<span class="selected"></span>
							</a>
						</li>
					
					
					
					
					<li id="protitle" class="">
						<h4>协同云</h4>
					</li>
					<li>
						<a href="javascript:;" name="one-backup" type="55" onclick="ChangePage(this);">
							<i class="glyphicon glyphicon-book"></i>
							<span class="menu-text">产品数据</span>
							<span class="selected"></span>
						</a>
					</li>
					<li class="">
						<a href="javascript:;" name="one-backup" type="66" onclick="ChangePage(this);"> 
							<i class="glyphicon glyphicon-leaf"></i> 
							<span class="menu-text">技术开发协同</span> 
							<span class="selected"></span>
						</a>
					</li>
					<li class="">
						<a href="javascript:;" name="one-backup" type="77" onclick="ChangePage(this);"> 
							<i class="glyphicon glyphicon-eye-open"></i> 
							<span class="menu-text">业务技术协同</span> 
							<span class="selected"></span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- /侧边栏 -->
		<!--sidebar-bot-->
		<div class="sidebar-bot">
			<p class="sideba-text">DAICY EKMCloud 2018 R3.1.Beta</p>
		</div>
		<div class="pageRight" style="background: #f4f4f4;">
			<div id="main-content">
				<!--云盘文件内容区域-->
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12 dataContent">
							<div id="topbar" class="nomobilediv clearfix padding15"><!--topbar btnGroup -->
								<span class="date-range pull-left MaxTwo">
									<a class="js_update btn btn-default" href="javascript:;" onclick="backUps();">一键备份</a>
								</span>
							</div>

							<!-- 面包屑路径列表 -->
							<ul id="urlbar" class="breadcrumb" style="padding: 15px 0 0 22px;">
								<li><i class="fa fa-home" style="padding-right: 2px;"></i><a href="index.html">Home</a></li>
								<li>我的资料库</li>
							</ul>
							<div class="item-listview padding15">
								<div id="view" class="maincon grid-view-container" style="display: block;">
									<div class="grid-view" id="dataBaseView">
										<div class="grid-view-item">
											<div class="fileicon fileicon-sys-l-code">
												<img src="images/big-icon/folder.png" class="">
											</div>
											<div class="file-name">
												<a class="filename" tnum="15" title="" href="javascript:;"></a>
											</div>
											<span class="checkbox"> 
												<span class="icon circle-icon"></span>
												<span class="icon checkgridsmall"></span>
											</span>
										</div>
										<div class="grid-view-item">
											<div class="fileicon fileicon-sys-l-code">
												<img src="images/big-icon/folder.png" class="">
											</div>
											<div class="file-name">
												<a class="filename" tnum="15" title="" href="javascript:;"></a>
											</div>
											<span class="checkbox"> 
												<span class="icon circle-icon"></span>
												<span class="icon checkgridsmall"></span>
											</span>
										</div>
									</div>
								</div>

							</div>
						</div><!-- /CONTENT-->
					</div>
				</div>
			</div>
		</div>
	</section>
	<span id="getPage"></span>
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
								<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
								<button type="button" class="btn btn-danger" onclick="logout();">确定</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
<!-- 备份 -->
	<div class="modal fade" id="back-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>备份</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 40px 0 20px 0;">是否备份所选文件?</div>
						<div class="down-test" style="padding: 0 0 40px 0;">备份路径：<span id="backUrlId"></span></div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger" onclick="BackupSuper();">确定</button>

				</div>
			</div>
		</div>
	</div>
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
							<input type="password" class="form-control" id="oldpassword" autocomplete="new-password"  onblur="repeatpwds(this);">
						</div>
						<span class="emptyTips">密码不能为空</span>
						<span class="specialTips">初始密码不正确</span>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">重新设置密码:</label>
						<div class="col-sm-5">
							<input type="password" class="form-control" id="respassword" autocomplete="new-password"  onblur="rpwds(this);">
						</div>
						<span class="emptyTips">密码不能为空</span>
						<span class="beTips">密码由英文字母和数字组成</span>
						<span class="specialTips">密码在6~16位之间,请重新输入</span>
					</div>
					<div class="form-group">
						<label class="col-sm-3 control-label">确认密码:</label>
						<div class="col-sm-5">
							<input type="password" class="form-control" id="newpassword" autocomplete="new-password"  onkeyup="repwds(this);">
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
	
	<div class="modal fade" id="upUrl-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
				</div>
				<div class="modal-body">
					<div class="down-test" style="padding: 64px 0;text-align:center;">是否修改备份地址</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" onclick="IfUpdate('1');">修改</button>
					<button type="button" class="btn btn-default" onclick="IfUpdate('2');">不修改</button>
<!-- 					<button type="button" class="btn btn-default btn-danger" data-dismiss="modal">取消</button> -->
				</div>
			</div>
		</div>
	</div>
	<!--修改路径-->
	<div class="modal fade" id="upAdress-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>修改路径</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<form action="" class="form-horizontal" role="form">
							<div class="form-group">
								<label class="col-sm-3 control-label">修改路径:</label>
								<div class="col-sm-7">
									<input type="text" class="form-control" id="upBackupUrlId" >
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger" onclick="upBackUpUrl();">确定</button>
				</div>
			</div>
		</div>
	</div>
	<!-- JQUERY UI    -->
	<script src="js/jquery-1.11.1.min.js"></script>
	<script src="bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="js/jquery.forms.js"></script>
	<script src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- SLIMSCROLL -->
	<%--<script src="js/jquery.slimscroll.js"></script>--%>
	<script src="js/jquery.slimscroll.min.js"></script>
	<%--<script src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>--%>
	<script src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- COOKIE -->
	<script src="js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT 自定义 脚本 -->
	<script type="text/javascript" src="js/contextjs/context.js"></script>
	<script src="js/jquery.ellipsis.js"></script>
	<script src="js/script.js"></script>
	<script src="js/dataTables.js"></script>
	<script src="js/echarts.js"></script>
	<script src="js/common.js"></script>
	<script src="myjs/general.js"></script>
	<script src="js/ifvisible.min.js"></script>
	<script src="myjs/superadm.js"></script>
	<script src="pagejs/one-backup.html.js"></script>
	<script type="text/javascript" src="js/jquery.md5.js"></script>
	<script>
		window.onload =function() {
			App.init();
			$('#loadDiv').hide();
		};
	
	</script>
</body>
</html>
