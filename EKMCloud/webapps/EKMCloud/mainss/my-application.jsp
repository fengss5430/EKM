<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content">
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12" style="min-height: 50px">
                <div class="Status-box dataTables_wrapper">
                    <a href="javascript:;" class="btn btn-default Refresh" onclick="refresh();">刷新</a>
                    <table id="Status-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th>项目名称</th>
                            <th>所选平台</th>
                            <th>是否协作</th>
                            <th>申请时间</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>主管审核</th>
                            <th>系统管理员审核</th>
                            <th>项目状态</th>
                            <th>项目说明</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>

<!--资源状态-->
<div class="modal fade" id="sourcedbClick-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>申请状态</span>
                </h4>
            </div>
            <div class="modal-body">
                <table class="table table-bordered">
                    <h5 class="text-center">SpeedClound项目进展详情</h5>
                    <thead>
                    <tr>
                        <th>项目名称</th>
                        <th>项目类别</th>
                        <th>项目日期</th>
                        <th>受理状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div class="contents-share clearfix">
                    <div class="down-test" style="padding: 5px 0">
                        您好!您申请的项目正在审核中，请耐心等候...
                    </div>
                    <div class="BtnGroup margin36">
                        <button type="button" class="btn btn-default btn-danger">保存</button>
                        <button type="button" class="btn" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--协同评审人员表-->
<div class="modal fade" id="reviewPersonnel-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>参与人员表</span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="lookTabInfo">
                    <table id="reviewPersonnel-table" class="compact" width="100%">
                        <thead>
                            <tr>
                                <th>用户名</th>
                                <th>部门</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!--主管审核-->
<div class="modal fade" id="SupervisorAudi-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>主管审核</span>
                </h4>
            </div>
            <div class="modal-body" style="height:300px;">
                <div class="SupervisorAudiBox col-md-12">
                    <form action="" class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">审核人:</label>
                            <div class="col-sm-3">
                                <label class="control-label" id="audituser" name="userid"></label>
                            </div>
                            <label class="col-sm-2 control-label">审核状态:</label>
                            <div class="col-sm-3">
                                <label class="control-label"  id="auditStatic" name="auditStatus"></label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">审核说明:</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" rows="3" id="auditexplain" name="auditexplain" readonly></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default  btn-danger" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<!--系统guanliy审核-->
<div class="modal fade" id="systemAdm-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>系统管理员审核</span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="SupervisorAudiBox col-md-12">
                    <form action="" class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">审核人:</label>
                            <div class="col-sm-3">
                                <label class="control-label" id="audituser1">技术总监</label>
                            </div>
                            <label class="col-sm-2 control-label">审核状态:</label>
                            <div class="col-sm-3">
                                <label class="control-label" id="auditStatic1">已拒绝</label>
                            </div>
                            <!--<label class="col-sm-3 control-label">审核状态:<span>已拒绝</span></label>-->
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">审核说明:</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" readonly rows="3" id="auditexplain1"></textarea>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-danger" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<!--项目说明-->
<div class="modal fade" id="LookRemark-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>项目说明</span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="SupervisorAudiBox col-md-12">
                    <form action="" class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">项目名称:</label>
                            <div class="col-sm-9">
                                <label class="control-label" id="projectName"></label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">项目说明:</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" rows="3" style="height: 260px; " id="projectExplain" readonly>
                                 </textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-danger" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>