<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content">
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="mains" style="text-align:center; padding:15px 0;">
                    <div class="todo clearfix">
                    </div>
                    <input type="hidden" id="page" value="1"/>
                    <div class="fenPage row" id="feny">
                    </div>
                </div>
            </div>
        </div>
    <!-- /CONTENT-->
    </div>
</div>

<!--删除-->
    <div class="modal fade" id="delTodo-modal" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
                    <h4 class="modal-title">
                        <span>删除</span>
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="contents-share clearfix">
                        <div class="down-test" style="padding: 86px 0 85px 0;">确认删除吗?<br/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" onclick="delTodo(this);">确定</button>

                </div>
            </div>
        </div>
    </div>