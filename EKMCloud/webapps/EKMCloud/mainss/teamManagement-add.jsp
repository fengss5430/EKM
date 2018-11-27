<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
    <span id="teamIdSpan" value=" ${session_speed_users.users.teamId}"></span>
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:;" onclick="addMember();">添加成员</a>
                    <a class="btn btn-default" href="javascript:;" onclick="removeUserInTeam();">移除成员</a>
                    <select id="seList" class="btn" style="padding: 5.5px 12px 5.5px;font-size: 14px;color: #666;background-color: #ffffff;border-color: #cccccc;border-radius: 4px;">
					</select>
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
            <!-- /CONTENT-->
        </div>
    </div>
</div>

<!--添加成员-->
<div class="modal fade" id="addMember_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon"
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
                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-default disBtn btn-danger" onclick="addUser2Team();">添加</button>
            </div>
        </div>
    </div>
</div>