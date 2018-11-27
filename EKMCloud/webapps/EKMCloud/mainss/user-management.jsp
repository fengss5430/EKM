<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:;" onclick="getUserInfoList();">刷新</a>
                    <a class="btn btn-default" href="javascript:;" onclick="AddUser();">添加用户</a>
                    <a class="btn btn-default" href="javascript:;" onclick="SetUser();">设置用户</a>
                    <a class="btn btn-default" href="javascript:;" onclick="deleteUserById();">删除用户</a>
                    <a class="btn btn-default" href="javascript:;" onclick="AddYuUser();">添加域用户</a>
                    <a class="btn btn-default" href="javascript:;" onclick="scopeList();">域列表</a>
                </div>
                <div class="UserTableInfo">
                    <table id="User-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th></th>
                            <th>用户名</th>
                            <th>真实姓名</th>
                            <th>角色</th>
                            <th>所属部门</th>
                            <th>所属团队</th>
                            <th>邮箱</th>
                            <th>手机</th>
                            <th>状态</th>
                            <th>使用时间</th>
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

<!--添加用户表-->
<div class="modal fade" id="AddUser-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content" style="max-height:721px;">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>添加用户</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">用户名:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="userName" autocomplete="new-userName"  onkeyup="repeatUserName(this);">
                        </div>
                        <span class="emptyTips">用户名不能为空</span>
                        <span class="beTips">此用户名已存在</span>
                        <span class="specialTips">用户名由英文数字组成</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">用户密码:</label>
                        <div class="col-sm-6">
                            <input type="password" class="form-control" id="password" autocomplete="new-password"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">角色:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="roleSelecte">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">所属部门:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="deptSelecte">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">所属团队:</label>
                        <div class="col-sm-6">
                            <select class="form-control selectpicker" id="teamSelecte" multiple>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                            <label class="col-sm-3 control-label">工程类型:</label>
                            <div class="col-sm-6">
                                <select class="form-control selectpicker" id="projectSelecte" multiple>
                                    <option value="1">产品数据</option>
                                    <option value="2">技术开发协同</option>
                                    <option value="3">业务技术协同</option>
                                </select>
                            </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">权限类型:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="limitSelect">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">时间:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="timeSelecte">
                            	<option value="0">请选择</option>
                            	<option value="7">7</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="0">永久</option>
                            </select>
                        </div>
                    </div>
                       <div class="form-group">
                        <label class="col-sm-3 control-label">真实姓名:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="realName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">邮箱:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">手机:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="phone">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">空间大小:(G)</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="spaceSize">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger disBtn" onclick="addUser();">添加</button>
            </div>
        </div>
    </div>
</div>
 
<!--设置用户表-->
<div class="modal fade" id="SetUser-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content"  style="max-height:721px;">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>修改用户</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">用户名:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="userName1" disabled="disabled">
                        </div>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">用户密码:</label>
                        <div class="col-sm-6">
                            <input type="password" class="form-control" id="password1" autocomplete="new-password" placeholder="******">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">角色:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="roleSelecte1">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">所属部门:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="deptSelecte1">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">所属团队:</label>
                        <div class="col-sm-6">
                            <select class="form-control selectpicker" id="teamSelecte1" multiple>
                            
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">工程类型:</label>
                        <div class="col-sm-6">
                            <select class="form-control selectpicker" id="projectSelecte1" multiple>
                            		<option value="3">产品数据</option>
                                    <option value="1">技术开发协同</option>
                                    <option value="2">业务技术协同</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">权限类型:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="limitSelect1">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">时间:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="timeSelecte1">
                            	<option value="0">请选择</option>
                            	<option value="7">7</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="0">永久</option>
                            </select>
                        </div>
                    </div>
                   <div class="form-group">
                        <label class="col-sm-3 control-label">真实姓名:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="realName1">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">邮箱:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="email1">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">手机:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="phone1">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">空间扩容:(G)</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="spaceSize1">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" onclick="updateUser();">保存</button>
            </div>
        </div>
    </div>
</div>

<!--添加域用户-->
<div class="modal fade" id="yuUser-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content" style="max-height:682px;">
            <div class="modal-header">
                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
                <h4 class="modal-title">
                     <span>添加域用户</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                <div class="form-group">
                    <label class="col-sm-3 control-label">DC&nbsp;IP/FQDN:</label>
                    <div class="col-sm-6">
                         <input type="text" class="form-control" id="adIP">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">域的NetBIOS:</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="adBios">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">域FQDN(NDS):</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="adDns">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">端口号:</label>
                    <div class="col-sm-6">
                         <input type="text" class="form-control" id="adProt">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">用户名:</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="adUser">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 control-label">密码:</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="adPssword">
                    </div>
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger disBtn" onclick="addScopeInfo();">添加</button>

            </div>
        </div>
    </div>
</div>

<!--域列表-->
<div class="modal fade" id="yuList-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content" style="max-height:682px; width:800px;">
        <div class="modal-header">
            <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
            <h4 class="modal-title">
                 <span>域列表</span>
            </h4>
        </div>
        <div class="modal-body">
            <table id="YuList-table" class="compact" cellspacing="0" width="100%;">
                <thead>
                    <tr>
                        <th></th>
                        <th>DC&nbsp;IP/FQDN</th>
                        <th>域的NetBIOS述</th>
                        <th>域FQDN(DNS)</th>
                        <th>端口号</th>
                        <th>用户名</th>
                        <th>密码</th>
                    </tr>
                </thead>
                <tbody id="scopetb">
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-default" onclick="deleteScopeInfo();">删除</button>
            <button type="button" class="btn btn-danger" onclick="updateScopeUserInfo();">更新</button>
        </div>
    </div>
</div>
</div>