<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="main-content">
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12" style="overflow:auto;">
                <div id="topbar" class="nomobilediv clearfix marT20" style="height:40px;">
                        <span class="activebtn pull-left status-title">
                            新建申请
                        </span>
                </div>
                <div class="task-box">
                    <div class="task-boxInfo">
                        <form action="" class="form-horizontal" role="form">
                            <div class="form-group">
                                <label  class="col-sm-2 control-label">项目名称:</label>
                                <div class="col-sm-3">
                                    <input  type="text" class="form-control" id="projectName" onkeyup="repeatprojectName(this);"/>
                                </div>
                                <span class="emptyTips">项目名称不能为空</span>
                        		<span class="beTips">项目名称已存在</span>
                        		<span class="specialTips">项目名称只能是中英文、下划线、数字</span>
                            </div>
                            <div class="form-group">
                                <label  class="col-sm-2 control-label">开始时间:</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="datetimepicker3" readonly name="startTime">
                                </div>
                            </div>
                            <div class="form-group">
                                <label  class="col-sm-2 control-label">结束时间:</label>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="datetimepicker4" readonly placeholder="" name="endTime">
                                </div>
                            </div>
<!--                             <div class="form-group"> -->
<!--                                 <label  class="col-sm-2 control-label">选择平台:</label> -->
<!--                                 <div class="col-sm-3 margin5" id="wrap"> -->
<!--                                     <input type="radio"  name="platform" value="0" checked="checked"> -->
<!--                                     <label >会议室一</label> -->
<!--                                     <input type="radio"  name="platform" value="1"> -->
<!--                                     <label >会议室二</label> -->
<!--                                 </div> -->
<!--                             </div> -->
 							<div class="form-group">
		                        <label  class="col-sm-2 control-label">选择平台:</label>
		                        <div class="col-sm-3 margin5">
		                            <select class="form-control" id="selectPlatform">
		                            </select>
                        		</div>
                    		</div>
                            <div class="form-group IsRadioBox">
                                <label  class="col-sm-2 control-label">是否协作:</label>
                                <div class="col-sm-3 margin5" id="rap">
                                    <input type="radio" name="auditing" value="Y" checked="checked">
                                    <label >是</label>
                                    <input type="radio" name="auditing" value="N">
                                    <label >否</label>
                                </div>
                            </div>
                            <div class="form-group IsShowBox">
                                <label class="col-sm-2 control-label">参与人员:</label>
                                <div class="col-sm-3">
                                    <select id="usertype" name="auditUser"  class="selectpicker show-tick form-control" multiple data-live-search="false">
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label  class="col-sm-2 control-label">项目说明:</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" rows="3" id="projectExplain" name="projectExplain" ></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class=" col-sm-10"></div>
                                <div class="col-sm-1">
                                    <button class="btn btn-default" type="button" onclick="savePro();" style="width:120px;height: inherit;">提交</button>
                                </div>
                                <%--<label class="col-sm-2 control-label">--%>
                                    <%--<button class="btn btn-default" type="button" onclick="savePro();" style="width:100%;height: inherit;">提交</button>--%>
                                <%--</label>--%>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>
<!--资源状态-->
<div class="modal fade" id="sourcedbClick-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>申请状态</span>
                </h4>
            </div>
            <div class="modal-body">
                <table class="table table-bordered">
                    <h5 class="text-center">SpeedClound项目进展详情</h5>
                    <thead>
                    <tr>
                        <th>项目名称</th>
                        <th>项目类别</th>
                        <th>项目日期</th>
                        <th>受理状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div class="contents-share clearfix">
                    <div class="down-test" style="padding: 5px 0">
                        您好!您申请的项目正在审核中，请耐心等候...
                    </div>
                    <div class="BtnGroup margin36">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>