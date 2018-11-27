<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:;" onclick="teamList();">刷新</a>
                    <a class="btn btn-default" href="javascript:;" onclick="AddTeam();">新建团队</a>
                    <a class="btn btn-default" href="javascript:;" onclick="SetTeam();">设置团队</a>
                    <a class="btn btn-default" href="javascript:;" onclick="deleteTeam();">删除团队</a>
                    <a class="btn btn-default" href="javascript:;" onclick="TeamManagement();">成员管理</a>
                </div>
                <div class="table-main">
                    <table id="team-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th></th>
                            <th>团队名称</th>
                            <th>负责人</th>
                            <th>团队成员</th>
                            <th>创建时间</th>
                            <th>备注</th>
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
<!--添加团队-->
<div class="modal fade" id="AddTeam_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>新建团队</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                	<div class="form-group">
                        <label  class="col-sm-3 control-label">团队ID:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="teamnum"  onkeyup="repeatTeamNum(this,'1')">
                        </div>
                        <span class="emptyTips">团队ID不能为空</span>
                        <span class="beTips">此团队ID已存在</span>
                        <span class="specialTips">团队ID不能输入中文</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">团队名称:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="teamName"  onkeyup="repeatTeamName(this,'1')">
                        </div>
                        <span class="emptyTips">团队名称不能为空</span>
                        <span class="beTips">此团队名称已存在</span>
                        <span class="specialTips">团队名称只能中英文组成</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">负责人:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="roleSelecte">
	                            <option value="0">请选择角色</option>
	                            <option value="1">管理员</option>
	                            <option value="2">主管</option>
	                            <option value="3">超级管理员1</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">备注:</label>
                        <div class="col-sm-6">
                            <textarea class="text_area"  cols="30" rows="10" id="remark" maxlength="30"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger disBtn" onclick="createTeam();">添加</button>
            </div>
        </div>
    </div>
</div>
    <!--删除-->
    <div class="modal fade" id="delHandle-modal" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
                    <h4 class="modal-title">
                        <span>删除操作</span>
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="contents-share clearfix">
                        <div class="down-test" style="padding: 86px 0 85px 0;">确认删除吗?对应部门资料同步删除！<br/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" onclick="delDepartment();">确定</button>

                </div>
            </div>
        </div>
    </div>
<!--设置团队-->
<div class="modal fade" id="SetTeam_modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>设置团队</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                <div class="form-group">
                        <label  class="col-sm-3 control-label">团队ID:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="teamnum1"  onkeyup="repeatTeamNum(this,'2')">
                        </div>
                        <span class="emptyTips">团队ID不能为空</span>
                        <span class="beTips">此团队ID已存在</span>
                        <span class="specialTips">团队ID不能输入中文</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">团队名称:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="teamName1"  onkeyup="repeatTeamName(this,'2')">
                        </div>
						<span class="emptyTips">团队名称不能为空</span>
                        <span class="beTips">此团队名称已存在</span>
                        <span class="specialTips">团队名称只能中英文组成</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">负责人:</label>
                        <div class="col-sm-6">
	                        <select class="form-control" id="roleSelecte1">
	                        </select>
	                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">备注:</label>
                        <div class="col-sm-6">
                            <textarea class="text_area"  cols="30" rows="10" id="remark1" maxlength="30"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" onclick="updateTeamInfo();">保存</button>
            </div>
        </div>
    </div>
</div>
<!--查看成员-->
<div class="modal fade" id="TeamManagement_modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span id="teamNameSpan"></span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="btn-groups">
                    <div class="form-group">
                        <a class="btn btn-default" href="javascript:;" onclick="addMember();">添加成员</a>
                        <a class="btn btn-default" href="javascript:;" onclick="removeUserInTeam();">移除成员</a>
                    </div>
                </div>
                <div class="table-main">
                    <table id="Management-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th></th>
                            <th>团队成员</th>
                            <th>所属部门</th>
                            <th>邮箱</th>
                            <th>电话</th>
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
<!--添加成员-->
<div class="modal fade" id="addMember_modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>选择用户</span>
                </h4>
            </div>
            <div class="modal-body">
                <table id="member-table" class="compact" cellspacing="0" width="100%;">
                    <thead>
                    <tr>
                        <th></th>
                        <th>用户名</th>
                        <th>所属部门</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" onclick="addUser2Team();">添加</button>
            </div>
        </div>
    </div>
</div>