<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
    <head>
<%--     <base href="<%=basePath%>"> --%>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>DAICY | EKMCloud</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="<%=basePath%>images/logo-1.png" type="images/x-icon">
    <link rel="stylesheet" href="<%=basePath%>bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="<%=basePath%>css/per-help.css">
</head>
<body>
<div class="wrapBox">
    <div class="sidebar" id="sidebar">
        <div class="nav-brand">
             <a href="<%=basePath%>user/login.html/"><img src="<%=basePath%>images/logo.png" alt=""></a>
        </div>
        <div class="sidebar-menu">
            <ul class="clearfix">
                <li>
                    <a href="#stySetting">1.系统设置</a>
                    <ul class="submenu">
                        <li>
                             <a href="#system-1.1">1.1系统构架图</a></li>
                        <li>
                             <a href="#system-dom">1.2节点介绍</a>
                         </li>
                        <li>
                            <a href="#system-set">1.3系统部署</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#systemMan">2.系统管理</a>
                    <ul class="submenu">
                        <li>
                            <a href="#systStructure">2.1使用前准备</a></li>
                        <li>
                            <a href="#systemInstall">2.2安装方法</a>
                        </li>
                    </ul>
                </li>
                <li>
                     <a href="#systemUSer">3系统使用</a>
                     <ul class="submenu">
                    <li>
                            <a href="#teamResource">3.1团队状态</a></li>
                        <li>
                        <a href="#Appmanage">3.2预约管理</a>
                        </li>
                        <li>
                        <a href="#depMan">3.3部门管理</a>
                        </li>
                        <li>
                        <a href="#teamMan">3.4团队管理</a>
                        </li>
                        <li>
                        <a href="#userMan">3.5用户管理</a>
                        </li>
                        <li>
                            <a href="#rolMan">3.6角色管理</a>
                        </li>
                        <li>
                        <a href="#setpermit">3.7设置权限</a>
                        </li>
                        <li>
                        <a href="#securite">3.8安全审计</a>
                        </li>
                        <li>
                        <a href="#email">3.9邮箱配置</a>
                        </li>
                        <li>
                        <a href="#suyun">3.10速云许可</a>
                        </li>


                     </ul>
                </li>
                <li><a href="#reasource">4.资源状态</a></li>
                <li><a href="#todo">5.待办事宜</a></li>
                <li><a href="#task">6.申请预约</a></li>
                <li><a href="#myTask">7.我的预约</a></li>
                <li><a href="#myTeam">8.我的团队</a></li>
                <li><a href="#myDta">9.我的资料库</a></li>
                <li><a href="#teamData">10.团队资料库</a></li>
                <li><a href="#departDate">11.部门资料库</a></li>
                <li><a href="#companyDate">12.公司资料库</a></li>
                <li><a href="#projectDate">13.工程知识</a></li>
                <li><a href="#designData">14.设计协同</a></li>
                <li><a href="#simulateDate">15.仿真协同</a></li>
            </ul>
        </div>
    </div>
    <div class="main-content" id="main-content">
        <!--系统设置-->
        <div class="stySetBox">
        <h2><a href="javascript:;" id="stySetting">1.&nbsp;系统设置</a></h2>
        <div class="stySetCon">
        <div class="stySetList">
        <h3><a href="javascript:;" id="system-1.1">1.1&nbsp;系统构架图</a></h3>
        </div>
        <div class="stySetList">
        <h3><a href="javascript:;" id="system-dom">1.2&nbsp;节点介绍</a></h3>
        <ul>
        <li>1.&nbsp;一台服务器节点</li>
        </ul>
        </div>
        <div class="stySetList">
        <h3><a href="javascript:;" id="system-set">1.3&nbsp;系统部署</a></h3>
        <ul>
        <li>1.&nbsp;软件名称：EKMCloud</li>
        <li>2.&nbsp;系统管理员：ekmadm</li>
        <li>3.&nbsp;服务器节点名称.：hpcconsole（根据环境不同机器随动）</li>
        <li>4.IP：192.168.100.141（根据环境不同ip随动）</li>
        <li>5.&nbsp;软件安装列</li>
        </ul>
        <table >
        <thead>
        <tr>
        <th>软件名称</th>
        <th>安装路径</th>
        <th>运行机器</th>
        <th>端口</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>EKMCloud</td>
        <td>/hpcapp/softeware/EKMCloud</td>
        <td>hpcconsole</td>
        <td>8030（根据客户环境设置)</td>
        </tr>
        </tbody>
        </table>
        <table >
        <thead>
        <tr>
        <th>节点类型</th>
        <th>主机名</th>
        <th>操作系统</th>
        <th>管理网IP</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>服务器节点</td>
        <td>hpcconsole</td>
        <td>Redhat6.6</td>
        <td>192.168.100.141</td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        </div>
        <!--系统管理-->
        <div class="styManagerBox">
        <h2><a href="javascript:;" id="systemMan">2.&nbsp;系统管理</a></h2>
        <div class="styManagerCon">
        <div class="styManList">
        <h3><a href="javascript:;" id="systStructure">2.1&nbsp;系统构架图</a></h3>
        <ul>
        <li>1.&nbsp;本产品可以使用ie9以上版本访问</li>
        <li>2.&nbsp;EKMCloud 网址： <a href="javascript;">http://192.168.100.28:9010/SClouds/</a></li>
        </ul>
        </div>
        <div class="styManList">
        <h3><a href="javascript:;" id="systemInstall">2.2&nbsp;安装方法</a></h3>
        <ul>
        <p>安装之前需要安装两个前置软件 :ffmpeg openfoffice</p>
        <li>
        1.&nbsp;ffmpeg安装方法
        <ul>
        <li>
        （1）找到ffmpeg存放位置用用tar命令解压
        <p>命令：tar -jxvf ffmpeg-3.3.2.tar.bz2</p>
        </li>
        <li>
        （2）解压完成后进入解压目录
        <p>命令：cd ffmpeg-3.3.2</p>
        </li>
        <li>
        （3）执行命令： ./configure --enable-shared --prefix=/usr/local/ffmpeg
        <p> 执行命令会出现报错：</p>
        <p>yasm/nasm not found or too old. Use --disable-yasm for a crippled build.
        If you think configure made a mistake, make sure you are using the latest
        version from Git. If the latest version fails, report the problem to the
        ffmpeg-user@ffmpeg.org mailing list or IRC #ffmpeg on irc.freenode.net.
        Include the log file "config.log" produced by configure as this will help
        solve the problem.
        </p>
        <span class="text-danger">出现这个报错是因为没有装yasm包</span>
        </li>
        <li>
        （4）安装yasm包
        <p> 找到yasm包的安装位置用源代码安装：</p>
        <p>用tar 命令解压yasm 命令：tar zxvf yasm-1.3.0.tar.gz</p>
        <p>进入 yasm-1.30目录  命令： cd /yasm-1.30</p>
        <p>执行命令：  ./configure.</p>
        <p>执行命令：  make.</p>
        <p>执行命令：  make install</p>
        <span class="text-danger">出现这个报错是因为没有装yasm包</span>
        </li>
        <li>
        （5）安装完成yasm包之后回到ffmpeg目录下继续执行命令：
        <p>./configure --enable-shared --prefix=/usr/local/ffmpeg</p>
        <p>命令执行时间比较长，需要等待几分钟</p>
        </li>
        <li>
        （6）执行命令：make
        </li>
        <li>
        （7）执行命令：make install
        </li>
        <li>
        （8）检查是否安装成功执行命令：
        <p>/usr/local/ffmpeg/bin/ffmpeg –version</p>
        <p>会出现报错：</p>
        <p>usr/local/ffmpeg/bin/ffmpeg: error while loading shared libraries: libavdevice.so.56: cannot open shared object file: No such file or directory</p>
        <span class="text-danger"> 提示库文件找不到</span>
        </li>
        <li>
        （9）修改文件/etc/ld.so.conf
        <p>Vim /etc/ld.so.conf</p>
        <p>添加一行 /usr/local/ffmpeg/lib/</p>
        </li>
        <li>
        （10）执行命令：/usr/local/ffmpeg/bin/ffmpeg –version
        </li>
        <li>
        （11）声明变量路径 export PATH=/hpcapp/softwrare/ffmpeg/bin/:$PATH
        </li>
        </ul>
        </li>
        <p>安装之前需要安装两个前置软件 :ffmpeg openfoffice</p>
        <li>
        2.&nbsp;openoffice安装方法
        <ul>
        <li>
        (1)到安装包位置用tar命令解压压缩包
        <p>  命令：tar –xzvf  Apache_OpenOffice_4.1.3_Linux_x86-64_install-deb_zh-CN.tar.gz</p>
        <p>tar –xzvf Apache_OpenOffice_4.1.3_Linux_x86-64_install-rpm_zh-CN.tar.gz</p>
        </li>
        <li>
        (2)进入目录 rpms
        <p>cd zh-CN/RPMS</p>
        </li>
        <li>
        (3)执行命令：rpm –ivh *rpm
        </li>
        <li>
        (4)进入到desktop-integration目录
        <p>cd desktop-integration</p>
        </li>
        <li>
        (5)执行命令：rpm -ivh openoffice4.1.3-redhat-menus-4.1.3-9783.noarch.rpm
        </li>
        <li>
        (6)进入目录/opt/openoffice4/program：
        <p>cd/opt/openoffice4/program</p>
        </li>
        <li>
        (7)执行soffice -headless -accept="socket,host=127.0.0.1,port=8100;urp;" -nofirststartwizard & 
        <p>完成启动 </p>
        <ul class="listType">
        <li>安装speedcloud</li>
        <li>
        进入软件存放位置使用unzip解压
        <p>命令：unzip SpeedCloudR1.0.0Beta-20170810.zip</p>
        </li>
        <li>
        解压完成之后给予解压文件夹755 权限
        <p>chmod -R 775 SpeeedCluod</p>
        </li>
        <li>
        执行安装命令：./install.sh 数据库用户名 数据库密码 本机ip 端口号
        <p>例：./install.sh root "" 192.168.100.141 803</p>
        </li>
        </ul>
        </li>
        </ul>
        </li>
        </ul>
        </div>
        </div>
        </div>
        <!--系统使用-->
        <div class="styUSeBox">
        <h2><a href="javascript:;" id="systemUSer">3.&nbsp;系统使用</a></h2>
        <div class="styUseCon">
        <div class="styUseList">
        <ul>
        <li>
        <p>使用费IE浏览器登录EKMCloud 例：<a href="javascript:;">http://192.168.100.28:9010/SClouds/</a>（端口号根据安装使用的端口号随动输入）输入账号密码即可登陆</p>
        </li>
        <li><img src="<%=basePath%>images/per-help/user-logo.png" alt=""></li>
        </ul>
        <h3><a href="javascript:;" id="teamResource">3.1&nbsp;团队状态</a></h3>
        <ul>
        <li>1.&nbsp;功能概述：查看团队成员及在线&nbsp;|&nbsp;离线状态</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.1.png" alt="">
        </li>
        </ul>
        </div>
        <div class="styUseList">
        <h3><a href="javascript:;" id="Appmanage">3.2&nbsp;新建流程</a></h3>
        <ul>
        <li>&nbsp;功能概述：标记审核项目</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.6.png" alt="">
        </li>
        <li>功能说明：</li>
        </ul>
        <table>
        <thead>
        <tr>
        <th>字段</th>
        <th>概述</th>
        <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>刷新</td>
        <td>刷新列表信息</td>
        <td></td>
        </tr>
        <tr>
        <td>标记审核</td>
        <td>标记审核</td>
        <td></td>
        </tr>
        <tr>
        </tbody>
        </table>
        </div>
        <div class="styUseList">
        <h3><a href="javascript:;" id="depMan">3.3&nbsp;部门管理</a></h3>
        <ul>
        <li>&nbsp;功能概述：管理部门，管理部门用户，设置部门信息</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.5.png" alt="">
        </li>
        <li>功能说明：</li>
        </ul>
        <table>
        <thead>
        <tr>
        <th>字段</th>
        <th>概述</th>
        <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>刷新</td>
        <td>刷新列表信息</td>
        <td></td>
        </tr>
        <tr>
        <td>添加部门</td>
        <td>添加部门</td>
        <td></td>
        </tr>
        <tr>
        <td>设置部门</td>
        <td>设置部门信息</td>
        <td></td>
        </tr>
        <tr>
        <td>删除部门</td>
        <td>删除部门</td>
        <td></td>
        </tr>
        <tr>
        <td>成员管理</td>
        <td>管理部门成员</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        <ul>
        <li>&nbsp;部门添加方法：点击添加部门输入部门编号，部门名称，部门主管，部门电话，输入备注（可选项）点击保存，部门添加成功</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.51.png" alt="">
        </li>
        <li>部门添加用户方法：选择部门点击成员管理，点击添加成员，选择用户，点击添加即可点击完成：</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.52.png" alt="">
        </li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.53.png" alt="">
        </li>
        </ul>
        </div>
        <div class="styUseList">
            <h3><a href="javascript:;" id="teamMan">3.4&nbsp;团队管理</a></h3>
        <ul>
        <li>&nbsp;功能说明：新建团队，管理团队和管理团队成员</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.4.png" alt="">
        </li>
        <li>功能说明：</li>
        </ul>
        <table>
        <thead>
        <tr>
        <th>字段</th>
        <th>概述</th>
        <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>刷新</td>
        <td>刷新团队列表信息</td>
        <td></td>
        </tr>
        <tr>
        <td>新建团队</td>
        <td>新建团队</td>
        <td></td>
        </tr>
        <tr>
        <td>设置团队</td>
        <td>设置团队信息</td>
        <td></td>
        </tr>
        <tr>
        <td>删除团队</td>
        <td>删除团队</td>
        <td></td>
        </tr>
        <tr>
        <td>成员管理</td>
        <td>添加或者删除团队成员</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        <ul>
        <li>&nbsp;新建团队方法：</li>
        <li>
        点击新建团队，输入团队名称，选择负责人，填写备注（可写可不写），点击保存即可添加完成
        </li>
        <li><img src="<%=basePath%>images/per-help/user-3.41.png" alt=""></li>
        </ul>
        <ul>
        <li>&nbsp;设置团队方法：</li>
        <li>
        选择团队，点击设置团队可以修改团队信息
        </li>
        <li><img src="<%=basePath%>images/per-help/user-3.42.png" alt=""></li>
        </ul>
        <ul>
        <li>&nbsp;队添加/删除用户方法：</li>
        <li>
        选中团队点击成员管理添加/删除用户
        </li>
        <li><img src="<%=basePath%>images/per-help/user-3.43.png" alt=""></li>
        </ul>
        </div>
        <div class="styUseList">
        <h3><a href="javascript:;" id="userMan">3.5&nbsp;用户管理</a></h3>
        <ul>
        <li>&nbsp;功能概述：管理用户，添加用户，删除用户</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.06.png" alt="">
        </li>
        <li>功能说明：</li>
        </ul>
        <table>
        <thead>
        <tr>
        <th>字段</th>
        <th>概述</th>
        <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>刷新</td>
        <td>刷新团队列表信息</td>
        <td></td>
        </tr>
        <tr>
        <td>添加用户</td>
        <td>添加用户</td>
        <td></td>
        </tr>
        <tr>
        <td>设置用户</td>
        <td>设置用户信息</td>
        <td></td>
        </tr>
        <tr>
        <td>删除用户</td>
        <td>删除用户</td>
        <td></td>
        </tr>
        <tr>
        <td>添加域用户</td>
        <td>添加域用户</td>
        <td></td>
        </tr>
        <tr>
        <td>域列表</td>
        <td>域列表</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        <ul>
        <li>添加用户方法：</li>
        <li>点击添加用户输入用户名，用户密码，角色，所属部门，所属团队，真实姓名，邮箱手机，空间大小点击保存即可完成添加</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.61.png" alt="">
        </li>
        </ul>
        <ul>
        <li>添加域用户方法：</li>
        <li>点击添加域用户输入DC IP/FQDN，域的NetBIOS，域FQDN(NDS)，端口号，用户名，密码点击保存即可完成添加</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.051.png" alt="">
        </li>
        </ul>
        <ul>
        <li>域列表：</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.052.png" alt="">
        </li>
        </ul>
        </div>
        <div class="styUseList">
        <h3><a href="javascript:;" id="rolMan">3.6&nbsp;角色管理</a></h3>
        <ul>
        <li>&nbsp;功能概述：添加角色，设置角色，删除角色</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.2.png" alt="">
        </li>
        <li>功能说明：</li>
        </ul>
        <table>
        <thead>
        <tr>
        <th>字段</th>
        <th>概述</th>
        <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>刷新</td>
        <td>刷新角色列表信息</td>
        <td></td>
        </tr>
        <tr>
        <td>添加角色</td>
        <td>添加角色</td>
        <td></td>
        </tr>
        <tr>
        <td>设置角色</td>
        <td>设置角色信息</td>
        <td></td>
        </tr>
        <tr>
        <td>删除角色</td>
        <td>删除角色</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        <ul>
        <li>添加角色方法：</li>
        <li>点击添加角色名称，选择角色分配，点击保存即可完成添加</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.22.png" alt="">
        </li>
        </ul>
        </div>
        <div class="styUseList">
        <h3><a href="javascript:;" id="setpermit">3.7&nbsp;设置权限</a></h3>
        <ul>
        <li>&nbsp;功能概述：添加权限，设置权限，删除权限</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.62.png" alt="">
        </li>
        <li>功能说明：</li>
        </ul>
        <table>
        <thead>
        <tr>
        <th>字段</th>
        <th>概述</th>
        <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>刷新</td>
        <td>刷新权限列表信息</td>
        <td></td>
        </tr>
        <tr>
        <td>添加权限</td>
        <td>添加权限</td>
        <td></td>
        </tr>
        <tr>
        <td>设置权限</td>
        <td>设置权限信息</td>
        <td></td>
        </tr>
        <tr>
        <td>删除权限</td>
        <td>删除权限</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        <ul>
        <li>添加权限方法：</li>
        <li>点击添加权限名称，选择权限分配，点击保存即可完成添加</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.63.png" alt="">
        </li>
        </ul>
        </div>
        <div class="styUseList">
        <h3><a href="javascript:;" id="securite">3.8&nbsp;安全审计</a></h3>
        <ul>
        <li>&nbsp;功能概述：审计上传、下载文件</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.8.png" alt="">
        </li>
        <li>功能说明：</li>
        </ul>
        <table>
        <thead>
        <tr>
        <th>字段</th>
        <th>概述</th>
        <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>刷新</td>
        <td>刷新权限列表信息</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="styUseList">
        <h3><a href="javascript:;" id="email">3.9&nbsp;邮箱配置</a></h3>
        <ul>
        <li>&nbsp;功能概述：选择管理员，配置邮箱发送服务配置</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.9.png" alt="">
        </li>
        </ul>
        </div>
        <div class="styUseList">
        <h3><a href="javascript:;" id="suyun">3.10&nbsp;速云许可</a></h3>
        <ul>
        <li>&nbsp;功能概述：更新license</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.10.png" alt="">
        </li>
        <li>功能说明：</li>
        </ul>

        </ul>
        <table>
        <thead>
        <tr>
        <th>字段</th>
        <th>概述</th>
        <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>更新license</td>
        <td>更新license信息</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        <ul>
        <li>更新license方法：</li>
        <li>点击更新license，填写序列号，上传许可证文件，点击保存即可完成更新</li>
        <li>
        <img src="<%=basePath%>images/per-help/user-3.11.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <!--资源状态-->
        <div class="resourceBox">
        <h2><a href="javascript:;" id="reasource">4.&nbsp;资源状态</a></h2>
        <div class="resourceCon">
        <div class="resourceList">
        <ul>
        <li>功能说明：查看资源使用状态</li>
        <li>
        <img src="<%=basePath%>images/per-help/resource.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <%--待办事宜--%>
        <div class="resourceBox">
        <h2><a href="javascript:;" id="todo">5.&nbsp;待办事宜</a></h2>
        <div class="resourceCon">
        <div class="resourceList">
        <ul>
        <li>功能说明：添加新的待办事宜</li>
        <li>
        <img src="<%=basePath%>images/per-help/todo.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <!--申请预约-->
        <div class="taskBox">
        <h2><a href="javascript:;" id="task">6.&nbsp;新建申请</a></h2>
        <div class="taskBoxCon">
        <div class="taskList">
        <ul>
        <li>功能概述:进行任务预约</li>
        <li>
        <img src="<%=basePath%>images/per-help/tsask.png" alt="">
        </li>
        <li>预约方法：输入项目名称，选择预约平台，选择开始/结束时间，选择评审人员，输入说明事项 预约完成</li>
        </ul>
        </div>
        </div>
        </div>
        <!--我的任务-->
        <div class="myTaskBox">
        <h2><a href="javascript:;" id="myTask">7.&nbsp;我的申请</a></h2>
        <div class="myTaskCon">
        <div class="myTasList">
        <ul>
        <li>功能概述：查看任务预约相信信息</li>
        <li>
        <img src="<%=basePath%>images/per-help/myTask.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <!--我的团队-->
        <div class="myTeamBox">
        <h2><a href="javascript:;" id="myTeam">8.&nbsp;我的团队</a></h2>
        <div class="myTeamkCon">
        <div class="myTeamList">
        <ul>
        <li>功能概述：查看团队成员信息</li>
        <li>
        <img src="<%=basePath%>images/per-help/myTeam.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <!--我的资料库-->
        <div class="myDataBox">
        <h2><a href="javascript:;" id="myDta">9.&nbsp;我的资料库</a></h2>
        <div class="myDataCon">
        <div class="myDataList">
        <ul>
        <li>功能概述：上传/查看我的资料库内的信息</li>
        <li>
        <img src="<%=basePath%>images/per-help/myData.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <!--团队资料库-->
        <div class="teamBox">
        <h2><a href="javascript:;" id="teamData">10.&nbsp;团队资料库</a></h2>
        <div class="teamCon">
        <div class="teamList">
        <ul>
        <li>功能概述：上传/查看团队资料库信息</li>
        <li>
    <p>一级目录</p>
        <img src="<%=basePath%>images/per-help/teamData.png" alt="">
    <p>二级目录</p>
        <img src="<%=basePath%>images/per-help/teamData2.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <!--部门资料库-->
        <div class="markBox">
        <h2><a href="javascript:;" id="departDate">11.&nbsp;部门资料库
        </a></h2>
        <div class="markCon">
        <div class="markList">
        <ul>
        <li>功能概述：上传/查看部门资料库信息</li>
        <li>
        <img src="<%=basePath%>images/per-help/departDate.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <!--部门资料库-->
        <div class="markBox">
        <h2><a href="javascript:;" id="companyDate">12.&nbsp;公司资料库
        </a></h2>
        <div class="markCon">
        <div class="markList">
        <ul>
        <li>功能概述：上传/查看公司资料库信息</li>
        <li>
        <img src="<%=basePath%>images/per-help/companyDate.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <%--工程知识--%>
        <div class="markBox">
        <h2><a href="javascript:;" id="projectDate">13.&nbsp;产品数据
        </a></h2>
        <div class="markCon">
        <div class="markList">
        <ul>
        <li>功能概述：</li>
        <li>
        <img src="<%=basePath%>images/per-help/projectDate.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <%--设计协同--%>
        <div class="markBox">
        <h2><a href="javascript:;" id="designData">14. 技术开发协同
        </a></h2>
        <div class="markCon">
        <div class="markList">
        <ul>
        <li>功能概述：</li>
        <li>
        <img src="<%=basePath%>images/per-help/designData.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        <%--仿真协同--%>
        <div class="markBox">
        <h2><a href="javascript:;" id="simulateDate">15. 业务技术协同
        </a></h2>
        <div class="markCon">
        <div class="markList">
        <ul>
        <li>功能概述：</li>
        <li>
        <img src="<%=basePath%>images/per-help/simulateDate.png" alt="">
        </li>
        </ul>
        </div>
        </div>
        </div>
        </div>
</div>
<script src="<%=basePath%>js/jquery-1.8.3.min.js"></script>
<script>
    $(function(){
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
</body>
</html>