<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <script src="myjs/general.js"></script>
    <div id="main-content">
        <span id="shareSpan" value="${session_speed_users.users.userName}" ></span>
        <!--云盘文件内容区-->
        <div class="container">
            <div class="row">
                <div  id="content" class="clearfix">
                    <div class="mains" style="padding:15px;">
                        <div class="comment">
                            <ul class="tab-menu clearfix">
                                <li class="curr">
                                    <a href="javascript:;" style="text-decoration:none">
                                    <em class="glyphicon glyphicon-comment"></em>
                                    <span >最近通话</span>
                                    </a>
                                </li>
                                <li class="">
                                    <a href="javascript:;" style="text-decoration:none">
                                    <em class="icon iconfont icon-tianjiahaoyou"></em>
                                    <span >成员列表</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="comment-list">
                                <ul class="tab-Item clearfix" id="commentList">
                                </ul>
                                <ul class="tab-Item clearfix" id="userList">
                                </ul>
                            </div>
                        </div>
                        <div class="share-friends">
                            <ul class="tab-menu clearfix">
                                <li class="curr">
                                    <a href="javascript:;" style="text-decoration:none">
                                    <span class="icon-share"></span>
                                    <span>文件分享</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="shares" style="position:relative;">
                                <h1 class="share-img"><img src="images/share-header-img.png" alt=""/></h1>
                                <div style="width:100%;position:absolute;bottom:50px;">
                                    <p class="share-test">简单地操作即可与他人分享文件</p>
                                    <a class="shareDoc-btn" href="javascript:;" onclick="dataShare();" style="text-decoration:none">从资料库分享</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--从资料库分享-->
    <div class="modal fade" id="shareData-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon"
                    data-dismiss="modal" aria-hidden="true">
                    </span>
                    <span id="shareChildrenMaxid"></span>
                    <h4 class="modal-title">
                        <span>从资料库分享</span>
                        <span></span>
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="contents-share clearfix">
                        <ul id="shareCreatZtree" class="ztree"></ul>
                    </div>
                </div>
                <div class="modal-footer">

                    <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger disBtn" id="dataLinkBtn" onclick="CreateDataLink();">创建链接</button>
                </div>
            </div>
        </div>
    </div>
            <!--创建链接-->
    <div class="modal fade" id="CreatData-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right " data-dismiss="modal" aria-hidden="true"> </span>
                    <h4 class="modal-title">创建链接</h4>
                </div>
                <div class="modal-body">
                    <div class="share-link-info">
                        <ul class="clearfix" style="padding: 0 20px;">
                                <li class="create-link" data-type="create-link"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>