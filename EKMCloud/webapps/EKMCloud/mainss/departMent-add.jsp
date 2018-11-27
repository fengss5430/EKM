<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
    <span id="deptIdSpan" value=""></span>
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:;" onclick="departAddMember();">添加成员</a>
                    <a class="btn btn-default" href="javascript:;" onclick="delMember();">移除成员</a>
                </div>
                <div class="table-main">
                    <table id="depart-table" class="compact" cellspacing="0" width="100%;">
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
            <!-- /CONTENT-->
        </div>
    </div>
</div>

<!--添加成员-->
<div class="modal fade" id="departAdd_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
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
                <table id="departMember-table" class="compact" cellspacing="0" width="100%;">
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
                <button type="button" class="btn btn-default disBtn btn-danger" onclick="AddMember();">添加</button>
            </div>
        </div>
    </div>
</div>