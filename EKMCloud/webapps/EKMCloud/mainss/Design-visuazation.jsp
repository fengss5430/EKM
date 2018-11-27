<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row ">
            <div id="content" class="col-lg-12" style="overflow:hidden; ">
                <div id="topbar" class="nomobilediv clearfix padding15" style="display:inline-block">
                    <!--tobar btnGroup -->
                    <span class="date-range pull-left">
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="8" onclick="NewFolders(1);">新建文件夹</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="9" onclick="AddProducts();">添加目录</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="6" onclick="delModals('2');">删除</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="10" onclick="UploadDoc2();" id="upDocBtn">上传</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="2" onclick="downModalss();">下载</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="3" onclick="copyModals();">复制</a>
                        <a class="js_update btn btn-default typeClass hide" href='javascript:;' type="11" onclick='limitSetModals();'>权限</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="5" onclick="moveModals();">移动</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="4" onclick="renameDesginModals();">重命名</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;" type="12" onclick="History();">历史版本</a>
                        <a class="js_update btn btn-default typeClass hide" href="javascript:;"  type="13"  onclick="selectmodelfile(2);">模型可视化</a>
                    </span>
                    <div class="date-range pull-right">
                         <input type="text" name="search" id="serSou" style="padding-left:8px; height:33px;font-size:12px;border-radius:4px;border: 1px solid #ccc;margin-right:3px;" placeholder="关键字搜索"/>
                         <i class="glyphicon glyphicon-search" onclick="sousuo();"></i>
                    </div>

                    <!-- /tobar btnGroup -->
                </div>
                <%--<div class="maincon" style="height:745px;width:100%;margin-top: 15px;">--%>
                <div style="width:100%;margin-top: 15px;">
                    <div id="leftbar" class="maincon" style="border:1px solid #ccc;padding-bottom:33px;border-radius:4px;width:260px;overflow: auto;height: inherit;">
                        <div class="contents-share content-size Scroller">
                            <ul id="cloudtreeMove" class="ztree" style="height:inherit;">
                            </ul>
                        </div>
                    </div>
                    <!-- 面包屑路径列表 -->
                    <div id="rightbar" class="maincon" style="border:1px solid #ccc;padding-bottom:33px;border-radius:4px;height: inherit;width:calc(100% - 296px );position: absolute;margin-left: 265px;top: 58px;">
                        <div class="top" style="padding: 10px">
                            <a class="js_update btn btn-default" href="javascript:;" onclick="superior(1);">上级目录</a>
                            <ul id="urlbar" class="breadcrumb" style="margin-left: 10px;display: inline-block;">
                                <li>
                                    <i class="fa fa-home"></i>
                                </li>
                            </ul>
                            <span class="date-range pull-right" style="margin-top:0;">
                                <div class="znSearch" style="display:inline-block; float:left; margin-right:0.4em;color:#333; line-height:34px;font-weight: 700; ">智能搜索:</div>
                                <div id="s" class="nomobilediv input-group search-bar" style="float: left; width: 200px; margin-right:8px;display: none">
                                <input type="text" class="form-control search" style="height: 34px; padding-right: 0px; border-right-width: 0" id="keyWord"  onclick="searchKey();">
                                    <a href="javascript:;" class="input-group-addon" style="background: transparent; border-left-width: 0px">
                                        <%--<i class="fa fa-search"></i>--%>
                                    </a>
                                </div>
                            </span>
                        </div>
                        <div style="padding: 10px;overflow:hidden!important;" class="list-view-container">
                            <table id="Designlistviewtable" cellspacing="0" width="100%;">
                                <thead>
                                <tr>
                                    <th><input type="checkbox" id="all" onclick="checkAll()"/></th>
                                    <th>模型名</th>
                                    <th>权限</th>
                                    <th>版本</th>
                                    <th>型号</th>
                                    <th>创建者</th>
                                    <th>修改者</th>
                                    <th>创建时间</th>
                                    <th>修改时间</th>
                                </tr>
                                </thead>
                                <tbody>
	                             
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    <%--查看历史版本--%>
            <div class="modal fade" id="History-modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document" style="width:900px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" ><span class="glyphicon glyphicon-repeat" style="color: #333;font-size: 14px;margin-right: 10px;" onclick="getHistoryList();"></span><span aria-hidden="true" data-dismiss="modal" aria-label="Close">&times;</span></button>
                        <h4 class="modal-title">
                        <span>查看历史版本</span>
                        </h4>
                    </div>
                    <div class="modal-body">
                        <div class="top" style="margin-bottom: 10px">
                            <a class="js_update btn btn-default hide" href="javascript:;" type="2" onclick="downloads('1');">下载</a>
                            <a class="js_update btn btn-default hide" href="javascript:;" type="6"  onclick="delModals('1');">删除</a>
                        </div>
                        <table id="Designlistviewtable2"  class="compact" cellspacing="0" width="100%">
                            <thead>
                            <tr>
                                <th><input type="checkbox" id="all2" onclick="checkAll2()"/></th>
                                <th>模型名</th>
                                <th>版本</th>
                                <th>型号</th>
                                <th>创建者</th>
                                <th>修改者</th>
                                <th>创建时间</th>
                                <th>修改时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>

<!--删除-->
	<div class="modal fade" id="dels-modals" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>删除</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 86px 0 85px 0;">确认要把所选文件删除吗?<br/></div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger disBtn" onclick="delHisVer(1);">确定</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="del-modalsd" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>删除</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 86px 0 85px 0;">确认要把所选文件删除吗?<br/></div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
					<button type="button" class="btn btn-danger disBtn" onclick="delHisVer(2);">确定</button>
				</div>
			</div>
		</div>
	</div>
	<!--下载-->
	<div class="modal fade" id="down-modals" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>下载</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 86px 0 85px 0">确认下载所选文件</div>
					</div>
				</div>
				<div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
					<button type="button" class="btn btn-danger" onclick="downloads('2');">确定</button>

				</div>
			</div>
		</div>
	</div>
    <!--添加产品-->
    <div class="modal fade" id="Add-modals" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true" ></span>
                    <h4 class="modal-title">
                        <span>新建产品目录</span>
                    </h4>
                </div>
                <div class="modal-body">
                <span id="rr" value="" name="" file=""></span>
                    <form id="AddForm" method="POST" role="form2" class="form-horizontal" enctype="multipart/form-data" style="height:474px;overflow-y: auto; padding:15px 0;overflow-x:hidden;">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">产品名称:</label>
                            <div class="col-sm-5">
                                <input type="text" class="form-control" name="knowledge" id="document"  onkeyup="FileNameIfRepeat(this);">
                            </div>
                            <span class="emptyTips">不能为空</span>
                            <span class="beTips">已存在</span>
                        	<span class="specialTips">只能是中英文、下划线、数字</span>
                        </div>   
                        <div class="form-group">
                            <label class="col-sm-3 control-label">版本:</label>
                            <div class="col-sm-5"  style="line-height: 30px;">
                                 <input type="text" class="form-control"  id="banben">
                            </div>  
                        </div>
 <!-- 111111 -->                       
<!--                         <div class="form-group"> -->
<!--                             <label class="col-sm-3 control-label">报告文件:</label> -->
<!--                             <div class="col-sm-6 main"> -->
<!--                                 <label class="btn btn-default" style="width: 100px">本地文件 -->
<!--                                     <input type="file" name="uploadFile" id="_upload_too1" style="width:0;height: 0;opacity:0;" multiple="multiple" onchange="upload(this,'ReportFile');"> -->
<!--                                 </label> -->
<!--                                 <a></a> -->
<!--                                 <a class="js_update btn btn-default ddclass" href="javascript:;" filename="ReportFile" onclick="remoteFiles(this)" >远程文件</a> -->
<!--                                 <div class="uploading" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                         <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="jindu1" style="line-height:15px;">0 -->
<!--                                         </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ReportFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->

<!--                                 <div class="uploading2" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                     <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="yuancheng1" style="line-height:15px;">0 -->
<!--                                     </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ReportFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->
<!--                             </div> -->
<!--                         </div> -->
  <!-- 222222 -->   
<!--                         <div class="form-group"> -->
<!--                             <label class="col-sm-3 control-label">结果文件:</label> -->
<!--                             <div class="col-sm-6 main"> -->
<!--                                 <label class="btn btn-default" style="width: 100px">本地文件 -->
<!--                                     <input type="file" name="uploadFile" id="_upload_too2" style="width:0;height: 0;opacity:0;" multiple="multiple" onchange="upload(this,'ResultFile');"> -->
<!--                                 </label> -->
<!--                                  <a></a> -->
<!--                                 <a class="js_update btn btn-default ddclass" href="javascript:;" filename="ResultFile" onclick="remoteFiles(this)">远程文件</a> -->
<!--                                 <div class="uploading" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                         <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="jindu2" style="line-height:15px;">0 -->
<!--                                         </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ResultFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->

<!--                                 <div class="uploading2" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                         <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="yuancheng2" style="line-height:15px;">0 -->
<!--                                         </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ResultFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->
<!--                             </div> -->
<!--                         </div> -->
 <!-- 333333 -->                           
<!--                          <div class="form-group"> -->
<!--                             <label class="col-sm-3 control-label">BOM文件:</label> -->
<!--                             <div class="col-sm-6 main"> -->
<!--                                 <label class="btn btn-default" style="width: 100px">本地文件 -->
<!--                                     <input type="file" name="uploadFile" id="_upload_too3" style="width:0;height: 0;opacity:0;" multiple="multiple" onchange="upload(this,'BOM-File');"> -->
<!--                                 </label> -->
<!--                                <a></a> -->
<!--                                 <a class="js_update btn btn-default ddclass" href="javascript:;" filename="BOM-File" onclick="remoteFiles(this)" >远程文件</a> -->
<!--                                 <div class="uploading" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                         <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="jindu3" style="line-height:15px;">0 -->
<!--                                         </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ReportFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->

<!--                                 <div class="uploading2" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                     <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="yuancheng3" style="line-height:15px;">0 -->
<!--                                     </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ReportFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->
<!--                             </div> -->
<!--                         </div> -->
   <!-- 444444 -->                         
<!--                          <div class="form-group"> -->
<!--                             <label class="col-sm-3 control-label">CAD文件:</label> -->
<!--                             <div class="col-sm-6 main"> -->
<!--                                 <label class="btn btn-default" style="width: 100px">本地文件 -->
<!--                                     <input type="file" name="uploadFile" id="_upload_too4" style="width:0;height: 0;opacity:0;" multiple="multiple" onchange="upload(this,'CAD-File');"> -->
<!--                                 </label> -->
<!--                                 <a></a> --> 
<!--                                 <a class="js_update btn btn-default ddclass" href="javascript:;" filename="CAD-File" onclick="remoteFiles(this)" >远程文件</a> -->
<!--                                 <div class="uploading" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                         <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="jindu4" style="line-height:15px;">0 -->
<!--                                         </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ReportFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->

<!--                                 <div class="uploading2" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                     <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="yuancheng4" style="line-height:15px;">0 -->
<!--                                     </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ReportFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->
<!--                             </div> -->
<!--                         </div> -->
 <!-- 555555 -->
<!--                         <div class="form-group"> -->
<!--                             <label class="col-sm-3 control-label">CAE文件:</label> -->
<!--                             <div class="col-sm-6 main"> -->
<!--                                 <label class="btn btn-default" style="width: 100px">本地文件 -->
<!--                                     <input type="file" name="uploadFile" id="_upload_too5" style="width:0;height: 0;opacity:0;" multiple="multiple" onchange="upload(this,'CAE-File');"> -->
<!--                                 </label> -->
<!--                                 <a></a> --> 
<!--                                 <a class="js_update btn btn-default ddclass" href="javascript:;" filename="CAE-File" onclick="remoteFiles(this)" >远程文件</a> -->
<!--                                 <div class="uploading" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                         <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="jindu5" style="line-height:15px;">0 -->
<!--                                         </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ReportFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->

<!--                                 <div class="uploading2" styel="cursor:pointer;"> -->
<!--                                     <div class="progress" style="width:150px;margin-top:8px;margin-bottom:0px;display:inline-block"> -->
<!--                                     <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="yuancheng5" style="line-height:15px;">0 -->
<!--                                     </div> -->
<!--                                     </div> -->
<%--                                     <span class="glyphicon glyphicon-remove cancelUpload" aria-hidden="true" style="display:inline-block" name="ReportFile" onclick="removepProgress(this);"></span> --%>
<!--                                 </div> -->
<!--                             </div> -->
<!--                         </div> -->
                        <div class="form-group" id="addDirectoryBtn">
                            <label class="col-sm-3 control-label"></label>
                            <div class="col-sm-5">
                                <a class="js_update btn btn-default" href="javascript:;" onclick="addOther()">添加其他目录</a>
                            </div>
                        </div>
 <!-- 关键字 -->     
                        <div class="form-group">
                            <label class="col-sm-3 control-label"><span languageset="strz_keyword">关键字</span>:</label>
                            <div class="col-sm-5">
                                <input type="text" id="guanjianzi" class="form-control" data-toggle="tooltip" data-placement="bottom" data-trigger='manual' title="关键字不能为空,请输入!">
                                <span id="guanbiao"></span>
                            </div>
                        </div>
                        
 <!-- 知识说明 -->                      
                        <div class="form-group">
                            <label class="col-sm-3 control-label">产品说明:</label>
                            <div class="col-sm-5">
                                <textarea class="form-control" rows="3" id="knowExp"></textarea>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default disBtn" data-dismiss="modal" >取消</button>
                    <button type="button" class="btn btn-danger disBtn" onclick="commit();">提交</button>
                </div>
            </div>
        </div>
    </div>
    <!--添加其他目录-->
    <div class="modal fade" id="OtherFolders-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
            <h4 class="modal-title">
            <span>添加其他目录</span>
            </h4>
            </div>
        <div class="modal-body">
            <form class="form-horizontal padding72" role="form">
<!--                 <div class="form-group"> -->
<!--                     <label class="col-sm-3 control-label">标签ID:</label> -->
<!--                     <div class="col-sm-6"> -->
<!--                         <input type="text"  class="form-control" id="iconId"> -->
<!--                     </div> -->
<!--                 </div> -->
                <div class="form-group">
                    <label class="col-sm-3 control-label">目录名称:</label>
                    <div class="col-sm-6">
                        <input type="text"  class="form-control" id="iconName" onkeyup="IfExist(this)">
                    </div>
                    <span class="beTips">此名称已存在</span>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger disBtn" onclick="createIcon()">确定</button>
        </div>
        </div>
        </div>
    </div>
    <!--远程文件-->
    <div class="modal fade" id="Remote-modals" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="width:700px;">
                <div class="modal-header">
                    <button type="button" class="close" ><span class="glyphicon glyphicon-repeat" style="color: #333;font-size: 14px;margin-right: 10px;" onclick="returnroot();"></span><span aria-hidden="true" data-dismiss="modal" aria-label="Close">&times;</span></button>
                    <h4 class="modal-title">
                        <span>文件浏览器</span>
                    </h4>
                </div>
                <div class="modal-body" style="height:450px;">
                    <div class="header">
                        <a class="js_update btn btn-default  btn-sm" href="javascript:;" onclick="NewFolders(2);">新建文件夹</a>
                        <a class="js_update btn btn-default  btn-sm" href="javascript:;" onclick="delRemoteFiles();">删除</a>
                    </div>
                    <div class="main" style="width:100%">
                        <div class="left" style="height: 380px;padding-top: 16px;">
                            <ul style="width: 110px;height: 365px;border: 1px solid #ccc;">
                                <li style="width: 100%;height: 91px;display: table;text-align: center;cursor: pointer;" type="1"><a style="display: table-cell;vertical-align: middle;"><img src="img/add/myDirectory.png"><p style="padding-top: 10px;">我的目录</p></a></li>
                                <li style="width: 100%;height: 91px;display: table;text-align: center;cursor: pointer;" type="2"><a style="display: table-cell;vertical-align: middle;"><img src="img/add/history.png"><p style="padding-top: 10px;">团队目录</p></a></li>
                                <li style="width: 100%;height: 91px;display: table;text-align: center;cursor: pointer;" type="" id="deptramid"><a style=" display: table-cell;vertical-align: middle;"><img src="img/add/workDirectory.png"><p style="padding-top: 10px;">部门目录</p></a></li>
                                <li style="width: 100%;height: 91px;display: table;text-align: center;cursor: pointer;" type="3"><a style="display: table-cell;vertical-align: middle;"><img src="img/add/shareDirectory.png"><p style="padding-top: 10px;">公司目录</p></a></li>
                            </ul>
                        </div>
                        <div class="right" style="width: 535px;height: 380px;padding-top: 16px;">
                            <div class="top" style="margin-bottom:10px;">
                                <a class="js_update btn btn-default  btn-sm" href="javascript:;" onclick="superior(2);">上级目录</a>
                                <ul id="urlbar2" class="" style="margin-left: 10px;display: inline-block;">
                                    <li>
                                        <i class="fa fa-home" style="padding-right:2px;"></i>
                                    </li>

                                </ul>
                            </div>
                            <div style="height: 184px;" class="list-view-container table3">
                                <table id="Designlistviewtable3"  class="compact" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" id="all3" onclick="checkAll3()"/></th>
                                            <th>文件名</th>
<!--                                             <th>属主</th> -->
                                            <th>大小</th>
                                            <th>类型</th>
                                            <th>修改时间</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox" class="son3" onclick="selectAll3()" name="box3"/></td>
                                            <td>erwer</td>
<!--                                             <td>were</td> -->
                                            <td>dgerge</td>
                                            <td>2er</td>
                                            <td>rgeragrfewrtgretgretgr</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style="padding-top: 15px;border: 1px solid #ccc;width:100%;height:124px;margin-top:15px;">
                                <form id="RemoteForm" method="POST" enctype="multipart/form-data" class="form-horizontal" role="form">
                                    <ul>
                                        <li style="float:left;width:88%;">
                                            <div class="form-group">
                                                <label class="col-sm-3 control-label">文件路径:</label>
                                                <div class="col-sm-7">
                                                    <input type="text" class="form-control input-sm" name="fileurl" id="filepath">
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-3 control-label">类型:</label>
                                                <div class="col-sm-7">
                                                    <select class="form-control select-sm">
                                                        <option>All Files*</option>
                                                        <option>.jpg</option>
                                                        <option>.sh</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li style="float:left;width:12%;">
                                        <div class="form-group">

                                        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal" style="margin-bottom:15px;">取消</button>
                                        <button type="button" class="btn btn-danger  btn-sm" onclick="copyFiles();" >确定</button>
                                        </div>
                                        </li>
                                    </ul>


                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!--重命名-->
	<div class="modal fade" id="renameDesign-modal" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
	                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
					<h4 class="modal-title">
						<span>重命名</span>
					</h4>
				</div>
				<div class="modal-body">
					<div class="contents-share clearfix">
						<div class="down-test" style="padding: 85px 0 82px 0;">
							文件名 : <input type="text" id="renameFileDesign" class="form-control nameW"/>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
					<button type="button" class="btn btn-danger" onclick="renameFileDesign();">确定</button>
				</div>
			</div>
		</div>
	</div>
    
    <!--新建文件夹-->
    <div class="modal fade" id="NewFolders-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
            <h4 class="modal-title">
            <span>新建文件夹</span>
            </h4>
            </div>
            <div class="modal-body">
            <form class="form-horizontal padding72" role="form" onsubmit="return false;">
            <div class="form-group">
            <label class="col-sm-3 control-label">名称:</label>
            <div class="col-sm-6">
            <input type="text"  class="form-control" id="inputFileName">
            </div>
            </div>
            </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger disBtn" onclick="createFiles()">确定</button>
            </div>
            </div>
        </div>
    </div>
    <%--模型可视化--%>
    <div class="modal fade" id="NewFolders-modal2" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="width: 852px;height: 600px!important; ">
            <div class="modal-content" style="width: 852px;height: 600px!important; max-height: 600px;">
                <div class="modal-body" style="height:100%;">
                    <div id="divCaxViewer" class="divCaxViewer" ondrop="drop(event)" ondragover="allowDrop(event)" style="cursor: default;">   </div>
                    <input type="file" id="VCTFileOpen" style="display:none" accept=".wcax" />
                </div>
            </div>
        </div>
    </div>

        </div>
    </div>