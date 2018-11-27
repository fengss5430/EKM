<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:;" onclick="flushDepartment();">刷新</a>
                    <a class="btn btn-default" href="javascript:;" onclick="addDepartment();">添加部门</a>
                    <a class="btn btn-default" href="javascript:;" onclick="setDepartment();">设置部门</a>
                    <a class="btn btn-default" href="javascript:;" onclick="delDepartment();">删除部门</a>
                    <a class="btn btn-default" href="javascript:;" onclick="memberManagement();">成员管理</a>
                </div>
                <div class="table-main">
                    <table id="department-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th></th>
                            <th>部门ID</th>
                            <th>部门名称</th>
                            <th>部门主管</th>
                            <th>部门电话</th>
                            <th>创建时间</th>
                            <th>修改时间</th>
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
<!--添加部门-->
<div class="modal fade" id="AddDepartment_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>添加部门</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">部门ID:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="deptNum" onkeyup="repeatdeptNum(this,'1');">
                        </div>
                        <span class="emptyTips">部门ID不能为空</span>
                        <span class="beTips">此部门ID已存在</span>
<!--                         <span class="specialTips">部门ID只能数字组成</span> -->
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">部门名称:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="deptName" onkeyup="repeatdeptName(this,'1');"/>
                        </div>
                        <span class="emptyTips">部门名称不能为空</span>
                        <span class="beTips">部门名称已存在</span>
                        <span class="specialTips">部门名称只能中英文组成</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">部门主管:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="selectdept">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">部门电话:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="deptTel">
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
                <button type="button" class="btn btn-danger disBtn"  onclick="addDept();" >添加</button>
            </div>
        </div>
    </div>
</div>
<!--设置部门-->
<div class="modal fade" id="SetDepartment_modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>设置部门</span>
                </h4>
            </div>
            <div class="modal-body">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">部门ID:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="num" name="deptNum" onkeyup="repeatdeptNum(this,'2');">
                        </div>
                        <span class="emptyTips">部门ID不能为空</span>
                        <span class="beTips">此部门ID已存在</span>
<!--                         <span class="specialTips">部门编号只能数字组成</span> -->
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">部门名称:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="name" name="deptName" onkeyup="repeatdeptName(this,'2');">
                        </div>
                        <span class="emptyTips">部门名称不能为空</span>
                        <span class="beTips">部门名称已存在</span>
                        <span class="specialTips">部门名称只能中英文组成</span>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">部门主管:</label>
                        <div class="col-sm-6">
                            <select class="form-control" id="selectuser" name="deptManager">
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">部门电话:</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="tel" name="deptTel">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">备注:</label>
                        <div class="col-sm-6">
                            <textarea class="text_area" id="res" cols="30" rows="10" name="remark" maxlength="30"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger"   onclick="updateSetDept();">保存</button>
            </div>
        </div>
    </div>
</div>
<!--成员管理-->
<div class="modal fade" id="memberManagement_modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span id="deptspan"></span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="btn-groups">
                    <div class="form-group">
                        <a class="btn btn-default" href="javascript:;" onclick="addMember();">添加成员</a>
                        <a class="btn btn-default" href="javascript:;" onclick="delUserInDept()">移除成员</a>
                    </div>
                </div>
                <div class="table-main">
                    <table id="Management-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th></th>
                            <th>部门成员</th>
                            <th>所属团队</th>
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
    <div class="modal-dialog" style="width:900px;">
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
                            <th>所属团队</th>
                            <th>所属部门</th>
                            <th>邮箱</th>
                            <th>电话</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="addUserInDept();">添加</button>
            </div>
        </div>
    </div>
</div>