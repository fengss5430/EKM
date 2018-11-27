<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content">
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12" style="min-height: 50px">
                <div id="topbar" class="nomobilediv clearfix" style="height:40px;">
                    <!-- DATE RANGE PICKER -->
                        <span class="activebtn pull-left status-title">详细信息</span>
                    <!-- /DATE RANGE PICKER -->
                </div>
                <div class="details-Box">
                    <h4><span class="fa fa-user"></span><span id="spanna">王小姐</span></h4>
                    <form action="" class="form-horizontal" role="form">
                        <div class="form-group">
                            <span class="pr">所选平台:</span>
                            <span id="spanplatform"></span>
                        </div>
                        <div class="form-group">
                            <span class="pr">是否协作:</span>
                            <span class="pr" id="spanauditing">是</span>
                            <span class="look-btn" onclick="LookDetails();">查看</span>
                        </div>
                        <ul class="list-input form-group row clearfix">
                            <li>
                                <span class="pr">申请时间:</span>
                                <input  type="text" class="form-control w120" id="datetimepicker5" disabled readonly />
                            </li>
                            <li>
                                <span class="pr">开始时间:</span>
                                <input  type="text" class="form-control w120" id="datetimepicker3" disabled readonly />
                            </li>
                            <li>
                                <span class="pr">结束时间:</span>
                                <input  type="text" class="form-control w120" id="datetimepicker4" disabled readonly />
                            </li>

                        </ul>
                        <div class="form-group clearfix">
                            <span class="pull-left pr" style="margin-right:4px;">项目说明:</span>
                            <textarea class="form-control pull-left" id="projectExplain" readonly ></textarea>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>

<!--查看-->
<div class="modal fade" id="look-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
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
                    <table id="lookTabDeatils" class="compat" width="100%">
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