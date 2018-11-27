<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <div id="main-content">
        <!--云盘文件内容区-->
        <div class="container">
            <div class="row">
                 <div id="content" class="col-lg-12" style="overflow:auto;">
                    <div id="topbar" class="nomobilediv clearfix marT20" style="height:40px;">
                        <span class="activebtn pull-left status-title"> 邮箱配置 </span>
                    </div>
                    <div class="task-box">
                         <form class="form-horizontal row" action="" style="overflow: hidden;">
                            <div class="col-sm-5" style="background-color:#fcfcfc; border-bottom:1px solid #bcbcbc;">
                                <div class="col-sm-12 paddLeft0" style="margin-bottom:10px;"><strong style="font-weight:900;">接受通知管理员列表</strong></div>
                                <div class="row martop5">
                                    <div class="col-sm-12">
                                        <button type="button" class="btn btn-default" onclick="addFun();">添加</button>
                                        <button type="button" class="btn btn-default" onclick="delReceiveMess();">删除</button>
                                    </div>
                                </div>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>用户名</th>
                                            <th>邮箱地址</th>
                                        </tr>
                                    </thead>
                                    <tbody id="ReceiveListId">
                                    </tbody>
                                </table>
                                <button type="button" class="btn btn-default" style="float:right; margin-bottom:20px;" onclick="updataState();">保存</button>
                            </div>
                            <div class="col-sm-5 col-sm-offset-1" style="background-color:#fcfcfc; border-bottom:1px solid #bcbcbc;">
                        		<div class="col-sm-12 paddLeft0"><h4 style="font-weight:900;">邮件发送服务配置</h4></div>
		                        <div class="row martop5">
		                            <div class="col-sm-4 "><label class="control-label">服务器:</label></div>
		                            <div class="col-sm-4">
		                                <input type="text" class="form-control" id="mailServerHost"/>
		                            </div>
		                            <div class="col-sm-4 red">(smtp.gmail.com)</div>
		                        </div>
		                     <div class="row martop5">
		                         <div class="col-sm-4 "><label class="control-label">服务器端口号:</label></div>
		                         <div class="col-sm-4">
		                             <input type="text" name="ssltext" value="25" class="form-control" id="mailServerPort" disabled="disabled"/>
		                         </div>
		                         <div class="col-sm-4">
		                             <div class="checkbox red">
		                                 <label>
		                                     <input name="ssl" type="checkbox" id="isSsl"> SSL
		                                 </label>
		                             </div>
		                         </div>
		                     </div>
		                     <div class="row martop5">
		                         <div class="col-sm-4 "><label class="control-label">发送邮箱地址:</label></div>
		                         <div class="col-sm-4">
		                             <input type="email" class="form-control" id="fromAddress"/>
		                         </div>
		                         <div class="col-sm-4 red">
		                             (xxx.gmail.com)
		                         </div>
		                     </div>
		                     <div class="row martop5">
		                         <div class="col-sm-4 "><label class="control-label">用户名:</label></div>
		                         <div class="col-sm-4">
		                              <input type="text" class="form-control" id="userName" autocomplete="new-userName"/>
		                         </div>
		                         <div class="col-sm-4 "></div>
		                     </div>
		                     <div class="row martop5">
		                         <div class="col-sm-4 "><label class="control-label">密码:</label></div>
		                         <div class="col-sm-4">
		                             <input type="password" class="form-control" id="password" autocomplete="new-password"/>
		                         </div>
		                         <div class="col-sm-4 "></div>
		                     </div>
		                     <div class="col-sm-12 paddLeft0"><h4 style="font-weight:900;">邮件通知接收配置</h4></div>
		                     <div class="row martop5">
		                         <div class="col-sm-4 "><label class="control-label">下载限制条数:</label></div>
		                         <div class="col-sm-4">
		                              <input type="text" class="form-control" id="downcountid" value="30">
		                         </div>
		                     </div>
		                     <div class="row martop5">
		                         <div class="col-sm-12 mailR">
		                             <button type="button" class="btn btn-default" onclick="addEmailSet();">保存</button>
		                             <button type="button" class="btn btn-default" onclick="testFun();">测试</button>
		                         </div>
		                     </div>
                    </div>
                 </div>
                      </form>
                    </div>
                </div>
            <!-- /CONTENT-->
            </div>
        </div>
    </div>

    <!--添加-->
    <div class="modal fade" id="add-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon"data-dismiss="modal" aria-hidden="true"></span>
                    <h4 class="modal-title">
                         <span>邮箱配置</span>
                    </h4>
                </div>
                <div class="modal-body">
                    <form action="" class="form-horizontal" role="form" style="padding:0 20px;">
                        <div class="form-group">
                             <label class="col-sm-3 control-label">用户名称:</label>
                            <div class="col-sm-9">
                              <input type="text" class="form-control" id="receivename"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">邮箱地址:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="reemail"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger disBtn" onclick="addReceive();">确定</button>

                </div>
            </div>
        </div>
    </div>

    <!--测试-->
    <div class="modal fade" id="test-modal" aria-labelledby="myModalLabel" aria-hidden="true">
         <div class="modal-dialog">
             <div class="modal-content">
                <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"> </span>
                    <h4 class="modal-title">
                        <span>邮箱配置</span>
                    </h4>
                </div>
                <div class="modal-body">
                    <form action="" class="form-horizontal" role="form" style="padding:0 20px;">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">请发送邮箱地址:</label>
                        <div class="col-sm-9">
                            <input type="email" class="form-control" id="sendEmail">
                        </div>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" onclick="sendMail()">确定</button>
                </div>
            </div>
        </div>
    </div>