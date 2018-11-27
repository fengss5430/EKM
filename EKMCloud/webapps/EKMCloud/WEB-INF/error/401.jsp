<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory"%>
<%
	//设置返回码200，避免浏览器自带的错误页面
	response.setStatus(401);
%>

<!DOCTYPE html>
<html>
<head>
<title>401 - 权限不足</title>
</head>

<body>
	<h2>401 - 权限不足.</h2>
	<p>
		<a href="user/index.html">返回首页</a>
	</p>
</body>
</html>
