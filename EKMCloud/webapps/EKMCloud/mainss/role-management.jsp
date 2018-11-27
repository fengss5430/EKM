<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:void(0);" onclick="getRoleList();">刷新</a>
                    <a class="btn btn-default" href="javascript:void(0);" onclick="addRole();">添加角色</a>
                    <a class="btn btn-default" href="javascript:void(0);" onclick="setRole();">设置角色</a>
                    <a class="btn btn-default" href="javascript:void(0);" onclick="deleteRoles();">删除角色</a>
                </div>
                <div class="table-main">
                    <table id="role-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th></th>
                            <th>角色名称</th>
                            <th>角色权限</th>
                            <th>创建时间</th>
                        </tr>
                        </thead>
                        <tbody id="settbody">
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>
<!--添加角色-->
<div class="modal fade" id="addRole_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>添加角色</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">角色名称:</label>
                        <div class="col-sm-7" id="rolename">
                            <input type="text" class="form-control" name="roleName" onkeyup="repeatRoleName(this,'1');"/>
                        </div>
                    <span class="emptyTips">角色名称不能为空</span>
                    <span class="beTips">此角色名称已存在</span>
                    <span class="specialTips">角色名称中英文组成</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">角色分配:</label>
                        <div class="col-sm-9">
                            <div class="transTab clearfix">
                             <div class="leftRole">
                                    <p class="text-center">未拥有</p>
                                    <div class="boxs leftBox form-control" id="pow">
                                    </div>
                                </div>
                                <div class="transIcon">
                                    <a href="javascript:void(0);"><span class="glyphicon glyphicon-transfer"></span></a>
                                </div>
                               <div class="rightRole">
                                    <p class="text-center">已拥有</p>
                                    <div class="boxs rightBox form-control" id="noss">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger disBtn" onclick="addp();">添加</button>
            </div>
        </div>
    </div>
</div>
<!--设置角色-->
<div class="modal fade" id="setRole_modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>设置角色</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">角色名称:</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="divrole" name="roleName" onkeyup="repeatRoleName(this,'2');">
                        </div>
                        <span class="emptyTips">角色名称不能为空</span>
                    	<span class="beTips">此角色名称已存在</span>
                    	<span class="specialTips">角色名称中英文组成</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">权限分配:</label>
                        <div class="col-sm-9">
                            <div class="transTab clearfix">
                                <div class="leftRole">
                                    <p class="text-center">未拥有</p>
                                    <div class="boxs leftBox form-control" id="nopole">
                                    </div>
                                </div>
                                <div class="transIcon">
                                    <a href="javascript:void(0);"><span class="glyphicon glyphicon-transfer"></span></a>
                                </div>
                                  <div class="rightRole">
                                    <p class="text-center">已拥有</p>
                                    <div class="boxs rightBox form-control" id="pole">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" onclick="updataRole();">保存</button>
            </div>
        </div>
    </div>
</div>