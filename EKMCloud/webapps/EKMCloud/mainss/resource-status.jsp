<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content">
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12 BtnBoxTaInfo" style="min-height: 50px;padding-top: 20px;">
                <div class="tabBox">
                    <div class="TabListMenu">
                        <ul id="myTab" class="nav nav-tabs">
                            <li class="active"><a href="javascript:;" data-tabId="Design">会议室</a></li>
                            <%--<li><a href="javascript:;" data-tabId="Test" name="设计" type="2">会议室二</a></li>--%>
                        </ul>
                        <a class="btn btn-default source-application displayinline" onclick="statusInfo();">会议室申请</a>
                        <span class="clearfix"></span>
                    </div>
                    <div class="tab-content">
                        <div class="zh-almanac" id="id_almanac" data-id="1">
                            <div class="hint-bar clearfix">
                                <div class="control-bar">
                                    <div class="control-module year-control">
                                        <a class="prev" id="nianjian" action="prev" href="javascript:;"></a>
                                        <div class="control"><i class="trigger"></i>
                                            <div val="2015" class="field year" id="yearid">2015年</div>
                                        </div>
                                        <a class="next" id="nianjia" action="next" href="javascript:;"></a>
                                        <ul class="list year-list hidden">
                                        </ul>
                                    </div>
                                    <div class="control-module month-control">
                                        <a class="prev" id="yuejian" action="prev" href="javascript:;"></a>
                                        <div class="control"><i class="trigger"></i>
                                            <div val="7" class="field month" id="mothid">7月</div>
                                        </div>
                                        <a class="next" id="yuejia" action="next" href="javascript:;"></a>
                                        <ul class="list month-list hidden">
                                        </ul>
                                    </div>
                                    <div class="btn-today">返回今天</div>
                                </div>
                            </div>
                            <div class="alc-container">
                                <div class="left">
                                    <ul class="dates-hd clearfix">
                                        <li data-id="6" class="days-title last ">日</li>
                                        <li data-id="0" class="days-title ">一</li>
                                        <li data-id="1" class="days-title ">二</li>
                                        <li data-id="2" class="days-title ">三</li>
                                        <li data-id="3" class="days-title ">四</li>
                                        <li data-id="4" class="days-title ">五</li>
                                        <li data-id="5" class="days-title ">六</li>
                                    </ul>
                                    <ol class="dates-bd clearfix"> </ol>
                                </div>
                                <!---->
                                <div class="right">
                                    <div class="almanac-tips">
                                        <div class="dates-bar">
                                            <span class="date"></span><span class="weekday"></span>
                                        </div>
                                        <div class="date-show-panel"></div>
                                        <div class="desc">
                                            <div class="lunar"></div>
                                            <div class="lunar-ganzhi"></div>
                                            <div class="lunar-term"></div>
                                        </div>
                                    </div>
                                    <div class="almanac-extra clearfix" id="todaylist">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>

<!--资源提预约申请-->
<div class="modal fade" id="source-btn-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content" >
            <div class="modal-header">
                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
                <h4 class="modal-title">
                    新建提交申请
                </h4>
            </div>
            <div class="modal-body">
                <div class="ResourceStatusBox">
                    <form action="" class="form-horizontal " role="form">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">项目名称:</label>
                            <div class="col-sm-6">
                                <input  type="text" class="form-control" id="projectName" onkeyup="repeatprojectName(this);"/>
                            </div>
                            <span class="emptyTips">项目名称不能为空</span>
                        	<span class="beTips">项目名称已存在</span>
                        	<span class="specialTips">项目名称只能是中英文、下划线、数字</span>
                        </div>
                        
<!--                         <div class="form-group"> -->
<!--                             <label class="col-sm-3 control-label">选择平台:</label> -->
<!--                             <div class="col-sm-6 margin5" id="wrap"> -->
<!--                                  <input type="radio"  name="platform" value="0" checked="checked"> -->
<!--                                     <label >设计验证平台</label> -->
<!-- 									<label >会议室一</label> -->
<!--                                     <input type="radio"  name="platform" value="1"> -->
<!--                                     <label >仿真验证平台</label> -->
<!-- 									<label >会议室二</label> -->
<!--                             </div> -->
<!--                         </div> -->
                        <div class="form-group">
                            <label class="col-sm-3 control-label">开始时间:</label>
                            <div class="col-sm-6">
                                <input  type="text" class="form-control" id="datetimepicker" name="startTime" readonly/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">结束时间:</label>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" id="datetimepicker2" placeholder="" readonly name="endTime"/>
                            </div>
                        </div>
                        <div class="form-group">
		                     <label  class="col-sm-3 control-label">选择平台:</label>
		                     <div class="col-sm-6">
		                            <select class="form-control" id="selectPlatform" class="form-control">
		                            </select>  
                        	 </div>   
                    	</div>
                        <div class="form-group IsRadioBoxF">
                            <label class="col-sm-3 control-label">是否协作:</label>
                            <div class="col-sm-6 margin5"  id="rap">
                                <input type="radio" name="auditing" value="Y" checked="checked">
                                    <label >是</label>
                                    <input type="radio" name="auditing" value="N">
                                    <label >否</label>
                            </div>
                        </div>
                        <div class="form-group IsShowBoxF">
                            <label class="col-sm-3 control-label">参与人员:</label>
                            <div class="col-sm-6">
                                <select id="usertype-status" name="auditUser" class="selectpicker show-tick form-control" multiple data-live-search="false">
                                
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-3 control-label">项目说明:</label>
                            <div class="col-sm-6">
                                <textarea class="form-control" rows="3" id="projectExplain" name="projectExplain"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger disBtn" onclick="savePro();">提交</button>
            </div>
        </div>
    </div>
</div>