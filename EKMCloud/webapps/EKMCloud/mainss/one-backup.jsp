<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="main-content" >
    <!--云盘文件内容区域-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12 dataContent">
                <div id="topbar" class="nomobilediv clearfix padding15" style="display:inline-block;">
                    <!--topbar btnGroup -->
                    <span class="date-range pull-left">
                        <a class="js_update btn btn-default" href="javascript:;" onclick="backUps();">一键备份</a>
                    </span>
                    <!-- /tobar btnGroup -->
                </div>
                <span class="date-range pull-right">
                    <div id="s" class="nomobilediv input-group search-bar" style="float: left; width: 200px; margin-right:8px;display: none;">
                        <input type="text" class="form-control search" style="height: 34px; padding-right: 0px; border-right-width: 0" id="keyWord" placeholder="Search" onclick="searchKey();">
                        <a href="javascript:;" class="input-group-addon" style="background: transparent; border-left-width: 0px">
                            <i class="fa fa-search"></i>
                        </a>
                    </div>
                    <div class="btn-group">
                        <a class="js_update btn btn-default" style="border-radius: 4px; height:34px;padding:10px;" data-toggle="dropdown" href="javascript:;">
                          <i class="fa fa-sort-amount-asc"></i>
                        </a>
                        <ul class="dropdown-menu" style="min-width:100px; text-align:center;" id="dropList">
                            <li class="sotrActive" onclick="sortBtn(this.value);" value="0"><a style="line-height: 30px" href="javascript:;"><span class="glyphicon glyphicon-ok"></span>名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                            <li onclick="sortBtn(this.value);" value="1"><a style="line-height: 30px" href="javascript:;"><span class="glyphicon glyphicon-ok"></span>大小&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                            <li onclick="sortBtn(this.value);" value="2"><a style="line-height: 30px" href="javascript:;"><span class="glyphicon glyphicon-ok"></span>修改时间</a></li>
                        </ul>
                    </div>
                    <a id="mainlist-view" class="js_update btn btn-default" style="width: 38px; height:34px;" href="javascript:;" onclick="changeviews()">
                        <i class="fa fa-th-large" style="padding:5px 0; display:none;"></i>
                        <i class="fa fa-list" style="padding:5px 0; "></i>
                    </a>
                </span>
                <!-- 面包屑路径列表 -->
                <ul id="urlbar" class="breadcrumb" style="padding: 15px 0 0 22px;">
                    <li>
                        <i class="fa fa-home" style="padding-right:2px;"></i>
                        <a href="javascript:;">Home</a>
                    </li>
                    </li>
                    <li>我的资料库</li>
                </ul>
                <div class="item-listview padding15">
                    <div class="maincon list-view-container" id="listTableBox" style="width: 100%;overflow: auto">
                        <table id="listviewtable" class="" cellspacing="0" width="100%">
                            <thead>
                            <tr>
                                <th></th>
                                <th>资料库</th>
                                <th>大小</th>
                                <th>修改日期</th>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div id="view" class="maincon grid-view-container" style="display: none;">
                        <div class="grid-view" id="dataBaseView">
                           <%--<div class="grid-view-item">--%>
                                 <%--<div class="fileicon fileicon-sys-l-code">--%>
                                     <%--<img src="images/big-icon/folder.png" class="">--%>
                                 <%--</div>--%>
                                 <%--<div class="file-name">--%>
                                     <%--<a class="filename" tnum="15" title="我的资料库我的资料库我的资料库我的资料库我的资料库我的资料库" href="javascript:;">我的资料库我的资料库我的资料库我的资料库我的资料库我的资料库</a>--%>
                                 <%--</div>--%>
                                 <%--<span class="checkbox"> <span class="icon circle-icon"></span><span--%>
                                         <%--class="icon checkgridsmall"></span>--%>
                                 <%--</span>--%>
                            <%--</div>--%>
                           <%--<div class="grid-view-item">--%>
                                <%--<div class="fileicon fileicon-sys-l-code">--%>
                                     <%--<img src="images/big-icon/folder.png" class="">--%>
                                <%--</div>--%>
                                <%--<div class="file-name">--%>
                                    <%--<a class="filename" tnum="15" title="我的资料库我的资料库我的资料库我的资料库我的资料库我的资料库" href="javascript:;">我的资料库我的资料库我的资料库我的资料库我的资料库我的资料库</a>--%>
                                <%--</div>--%>
                                <%--<span class="checkbox">--%>
                                    <%--<span class="icon circle-icon"></span>--%>
                                    <%--<span class="icon checkgridsmall"></span>--%>
                                <%--</span>--%>
                           <%--</div>--%>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>
<%--<script src="js/jquery.ellipsis.js"></script>--%>