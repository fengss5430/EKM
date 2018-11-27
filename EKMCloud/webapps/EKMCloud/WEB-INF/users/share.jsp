<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
 	<base href="<%=basePath%>">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>DAICY | EKMCloud</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="images/logo-1.png" type="images/x-icon">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/cloud-admin.css">
    <link rel="stylesheet" type="text/css" href="css/themes/default.css" id="skin-switcher">
    <link rel="stylesheet" href="css/layout.css">
</head>
<body>
<!-- 头部 -->
<header class="navbar clearfix" id="header">
    <div class="container">
        <div class="navbar-brand">
            <!-- 公司logo-->
            <a href="user/index.htmls">
                <img src="images/logo(2).png" alt="Cloud Admin Logo" class="img-responsive" height="30" width="120">
            </a>
            <!-- /公司logo -->
        </div>
    </div>
</header>
<!--/头部 -->
<!--内容-->
<div id="share">
	<c:forEach var="share" items="${share}">
	    <div class="share-list clearfix">
	        <div class="share-l pull-left">
	            <p class="share_name" >${share.name}</p>
	            <span>共享来源:</span>
	            <span>${si.userName}</span>
	        </div>
	        <div class="share-r pull-right">
		        <c:if test="${share.size > 1024 &&share.size< 1024*1024}">
		        	<a href="javascript:void(0);"  path='${share.path}' name='${share.name}' value='${share.directory}' class="btn" onclick="downloads(this);">下载(<fmt:formatNumber type="number" value="${share.size/1024}" pattern="0.00" maxFractionDigits="2"/>KB)</a>
		        </c:if>
		        <c:if test="${share.size > 1024*1024 &&share.size< 1024*1024*1024}">
		        	<a href="javascript:void(0);"  path='${share.path}' name='${share.name}' value='${share.directory}' class="btn" onclick="downloads(this);">下载(<fmt:formatNumber type="number" value="${share.size/1024/1024}" pattern="0.00" maxFractionDigits="2"/>MB)</a>
		        </c:if>
		        <c:if test="${share.size > 1024*1024*1024 &&share.size< 1024*1024*1024*1024}">
		        	<a href="javascript:void(0);"  path='${share.path}' name='${share.name}' value='${share.directory}' class="btn" onclick="downloads(this);">下载(<fmt:formatNumber type="number" value="${share.size/1024/1024/1024}" pattern="0.00" maxFractionDigits="2"/>GB)</a>
		        </c:if>
		        <c:if test="${share.size< 1024}">
		        	<a href="javascript:void(0);"  path='${share.path}' name='${share.name}' value='${share.directory}' class="btn" onclick="downloads(this);">下载(<fmt:formatNumber type="number" value="${share.size}" pattern="0.00" maxFractionDigits="2"/>B)</a>
		        </c:if>
	        </div>
	    </div>
	</c:forEach>
</div>
<!--/内容-->
<script src="js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="myjs/general.js"></script>
<script type="text/javascript" src="myjs/share.js"></script>
</body>
</html>