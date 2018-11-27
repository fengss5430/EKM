<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:void(0);" onclick="getList();">刷新</a>
                    <a class="btn btn-default" href="javascript:void(0);" onclick="addLimit();">添加权限</a>
                    <a class="btn btn-default" href="javascript:void(0);" onclick="setLimit();">设置权限</a>
                    <a class="btn btn-default" href="javascript:void(0);" onclick="deleteOperation();">删除权限</a>
                </div>
                <div class="table-main">
                    <table id="operationLimit-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                            <tr>
                                <th></th>
                                <th>权限名称</th>
                                <th>权限详请</th>
                                <th>创建时间</th>
                            </tr>
                        </thead>
                    	<tbody>
                        <tr>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>

<!--添加权限-->
<div class="modal fade" id="addLimit_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content" style="width:820px;">
            <div class="modal-header">
                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
                <h4 class="modal-title">
                    <span>添加操作权限</span>
                </h4>
            </div>
            <div class="modal-body limitMBody" style=" max-height:497px;">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">权限名称:</label>
                        <div class="col-sm-6">
                            <input type="text"  id="limitName" class="form-control" name="limitName" onkeyup="repeatLimitName(this,'1');"/>
                        </div>
                        <span class="emptyTips">权限名称不能为空</span>
                    	<span class="beTips">此权限名称已存在</span>
                    	<span class="specialTips">权限名称中英文组成</span>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="1">我的资料库:</label>
                        <div class="col-sm-9 limitItem" id="mydata">
                        	<span value="7">打开<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="1">分享<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="2">团队资料库:</label>
                        <div class="col-sm-9 limitItem" id="teamdata">
                        	<span value="7">打开<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="1">分享<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="0">部门资料库:</label>
                        <div class="col-sm-9 limitItem" id="deptdata">
                       		<span value="7">打开<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="1">分享<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="3">公司资料库:</label>
                        <div class="col-sm-9 limitItem" id="comdata">
                        	<span value="7">打开<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="1">分享<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="11">标准知识:</label>
                        <div class="col-sm-9 limitItem" id="knodata">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="22">产品知识:</label>
                        <div class="col-sm-9 limitItem" id="prodata">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="13">业务知识:</label>
                        <div class="col-sm-9 limitItem" id="ywdata">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="55">产品数据:</label>
                        <div class="col-sm-9 limitItem" id="csdata">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="66">技术开发协同:</label>
                        <div class="col-sm-9 limitItem" id="jxdata">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="selectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="77">业务技术协同:</label>
                        <div class="col-sm-9 limitItem" id="yjdata">
                           	<span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger disBtn" onclick="addOper();">添加</button>
            </div>
        </div>
    </div>
</div>

<!--设置权限-->
<div class="modal fade" id="setLimit_modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content"  style="width:820px;">
            <div class="modal-header">
                    <span class="glyphicon glyphicon-remove pull-right disBtnIcon"
                          data-dismiss="modal" aria-hidden="true">
                    </span>
                <h4 class="modal-title">
                    <span>设置权限</span>
                </h4>
            </div>
            <div class="modal-body limitMBody" style=" max-height:497px;">
                <form action="" class="form-horizontal" role="form">
                    <div class="form-group">
                        <label  class="col-sm-3 control-label">权限名称:</label>
                        <div class="col-sm-6">
                            <input type="text"  class="form-control" name="limitName" id="divrole" onkeyup="repeatLimitName(this,'1');"/>
                        </div>
                        <span class="emptyTips">权限名称不能为空</span>
                        <span class="beTips">此权限名称已存在</span>
                        <span class="specialTips">权限名称中英文组成</span>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="1">我的资料库:</label>
                        <div class="col-sm-9 limitItem" id="mydata0">
                        	<span value="7">打开<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="1">分享<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="2">团队资料库:</label>
                        <div class="col-sm-9 limitItem" id="mydata1">
                        	<span value="7">打开<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="1">分享<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="0">部门资料库:</label>
                        <div class="col-sm-9 limitItem" id="mydata2">
                        	<span value="7">打开<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="1">分享<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="3">公司资料库:</label>
                        <div class="col-sm-9 limitItem" id="mydata3">
                        	<span value="7">打开<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="1">分享<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="11">标准知识:</label>
                        <div class="col-sm-9 limitItem" id="mydata4">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="22">产品知识:</label>
                        <div class="col-sm-9 limitItem" id="mydata5">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="13">业务知识:</label>
                        <div class="col-sm-9 limitItem" id="mydata6">
                          	<span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="55">产品数据:</label>
                        <div class="col-sm-9 limitItem" id="mydata7">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="66">技术开发协同:</label>
                        <div class="col-sm-9 limitItem" id="mydata8">
                            <span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                    <div class="form-group pp">
                        <div class="col-sm-1"><span value="">全选<input type="checkbox" class="SetselectAll marLeft"/></span></div>
                        <label  class="col-sm-2 control-label padding8" type="77">业务技术协同:</label>
                        <div class="col-sm-9 limitItem" id="mydata9">
                           	<span value="8">新建文件夹<input type="checkbox"/></span>
                            <span value="9">添加目录<input type="checkbox"/></span>
                            <span value="7">打开<input type="checkbox"/></span>
                            <span value="6">删除<input type="checkbox"/></span>
                            <span value="10">上传<input type="checkbox"/></span>
                            <span value="2">下载<input type="checkbox"/></span>
                            <span value="3">复制<input type="checkbox"/></span>
                            <span value="5">移动<input type="checkbox"/></span>
                            <span value="11">权限<input type="checkbox"/></span>
                            <span value="4">重命名<input type="checkbox"/></span>
                            <span value="12">历史版本<input type="checkbox"/></span>
                            <span value="13">模型可视化<input type="checkbox"/></span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger disBtn" onclick="updataOperation();">保存</button>
            </div>
        </div>
    </div>
</div>

<!--查看详情-->
<div class="modal fade in" id="lookLimit_modal" aria-labelledby="myModalLabel" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content" style="width:820px;">
            <div class="modal-header">
                <span class="glyphicon glyphicon-remove pull-right" data-dismiss="modal" aria-hidden="true"></span>
                    <h4 class="modal-title">
                      <span>权限详情</span>
                    </h4>
            </div>
            <div class="modal-body limitMBody" style=" max-height:497px;overflow-y: scroll;">
                <form class="form-horizontal" role="form" onsubmit="return false;" id="formpid">
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="1">我的资料库:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid0">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="2">团队资料库:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid1">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="0">部门资料库:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid2">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="3">公司资料库:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid3">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="11">标准知识:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid4">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="22">产品知识:</label>
                        <div class="col-sm-9 DetailsItem"  id="dataid5">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="13">业务知识:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid6">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="55">产品数据:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid7">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="66">技术开发协同:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid8">
                        </div>
                    </div>
                    <div class="form-group pp">
                        <label class="col-sm-3 control-label padding8" type="77">业务技术协同:</label>
                        <div class="col-sm-9 DetailsItem" id="dataid9">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
        </div>
</div>
</div>