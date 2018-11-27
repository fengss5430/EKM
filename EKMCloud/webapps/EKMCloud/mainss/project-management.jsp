<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:;" onclick="getProjectList(1);">刷新</a>
                    <a class="btn btn-default" href="javascript:;" onclick="mark();">标记审核</a>
                    <a class="btn btn-default" href="javascript:;" onclick="MeetingBtn();">会议添加</a>
                    <a class="btn btn-default" href="javascript:;" onclick="MeetingManBtn();">会议管理</a>
                </div>
                <div class="table-main">
                    <table id="project-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th></th>
                            <th>项目名称</th>
                            <th>所选平台</th>
                            <th>申请人</th>
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
                <input type="hidden" id="page" value="1"/>
             	<div class="fenPage row" id="feny" style="margin-top: 20px;"></div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>

<!--标记审核-->
<div class="modal fade" id="mark_modal" aria-labelledby="myModalLabel" aria-hidden="true">
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
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">审核人:</label>
                        <div class="col-sm-3">
                            <label class="control-label" id="audituser" name="userid"></label>
                        </div>
                        <label class="col-sm-2 control-label">审核状态:</label>
                        <div class="col-sm-3">
                            <label class="control-label" id="auditStatic" name="auditStatus"></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">审核说明:</label>
                        <div class="col-sm-8">
                            <textarea class="form-control ta_guide"  disabled cols="30" rows="10" id="auditexplain" name="auditexplain"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-danger" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="systemAdm-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>管理员审核</span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="SupervisorAudiBox col-md-12">
                    <form action="" class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">审核人:</label>
                            <div class="col-sm-3">
                                <label class="control-label" id="audituser1"></label>
                            </div>
                            <label class="col-sm-2 control-label">审核状态:</label>
                            <div class="col-sm-3">
                                <label class="control-label" id="auditStatic1"></label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">审核说明:</label>
                            <div class="col-sm-9">
                                <textarea class="form-control"  rows="3" id="auditexplain1"></textarea>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
             <div class="modal-footer">

                <button type="button" class="btn btn-default" onclick="auditNopass();" data-dismiss="modal" id="regect">拒绝</button>
                <button type="button" class="btn btn-default btn-danger" data-dismiss="modal" id="cancel" style="display:none;">取消</button>
                <button type="button" class="btn btn-danger" onclick="pass();" data-dismiss="modal" id="pass">通过</button>
            </div>
        </div>
    </div>
</div>

<!--是否协同评审-->
<div class="modal fade" id="whether_modal" aria-labelledby="myModalLabel" aria-hidden="true">
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
                <table id="reviewer-table" class="compact" cellspacing="0" width="100%;">
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

<!--查看说明-->
<div class="modal fade" id="lookGuide_modal" aria-labelledby="myModalLabel" aria-hidden="true">
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
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">项目名称:</label>
                        <div class="col-sm-9" >
                            <label class="control-label" id="projectName"></label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">项目说明:</label>
                        <div class="col-sm-9">
                            <textarea class="form-control ta_guide"  cols="30" rows="10" id="projectExplain" readonly></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-danger" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>

<!--会议添加-->
<div class="modal fade" id="Meeting_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
                <h4 class="modal-title">
                    <span>会议添加</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">会议添加:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="platformname" maxlength="20" onkeyup="repeatName(this);"/>
                        </div>
                        <span class="emptyTips">会议名称不能为空</span>
                        <span class="beTips">会议名称已存在</span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger disBtn" onclick="MeetSureCancle();">确定</button>
            </div>
        </div>
    </div>
</div>

<!--会议管理-->
<div class="modal fade" id="MeetingMan_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
        <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
        <h4 class="modal-title">
        <span>会议名称</span>
        </h4>
        </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">会议名称:</label>
                        <div class="col-sm-8">
                            <%--会议管理-内容--%>
                            <div class="meetManBox" id="platformlist">
                                <p><span>会议室1</span><span class="glyphicon glyphicon-remove pull-right"></span></p>
                                <p><span>会议室2</span><span class="glyphicon glyphicon-remove pull-right"></span></p>
                                <p><span>会议室3</span><span class="glyphicon glyphicon-remove pull-right"></span></p>
                                <p><span>会议室4</span><span class="glyphicon glyphicon-remove pull-right"></span></p>
                                <p><span>会议室5</span><span class="glyphicon glyphicon-remove pull-right"></span></p>
                                <p><span>会议室6</span><span class="glyphicon glyphicon-remove pull-right"></span></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
            </div>
    </div>
    </div>
</div>