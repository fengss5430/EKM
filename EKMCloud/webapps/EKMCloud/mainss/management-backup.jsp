<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12">
                <div class="btn-groups">
                    <a class="btn btn-default" href="javascript:;" onclick="databackUps();">备份</a>
                    <a class="btn btn-default" href="javascript:;" onclick="Uploadsql();">恢复</a>
                </div>

                <div class="dataBackMain">
                    <p>说明:</p>
                    <p>根据软件功能创建数据备份和恢复:</p>
                    <p>1.备份选项数据。</p>
                    <p>2.工作台、文档云、知识云、协同云的功能数据备份。</p>
                    <p>3. "备份"一键备份软件的所有数据,"恢复"选择下载本地备份文件导入数据。</p>

                </div>
                <p class="text-danger f16" style="position: absolute;bottom: 50px;">说明:此操作仅供升级、更新EKMCloud。</p>
            <!-- /CONTENT-->
        </div>
    </div>
</div>
</div>
<!-- 备份 -->
<div class="modal fade" id="databack-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
                <h4 class="modal-title">
                    <span>备份文件</span>
                </h4>
            </div>
            <div class="modal-body">
                <div class="contents-share clearfix">
                     <div class="down-test" style="padding: 86px 0 85px 0;">是否备份文件?<br/></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger disBtn" onclick="downloadAndBackup();">确定</button>
            </div>
        </div>
    </div>
</div>
<!-- 恢复 -->
<div class="modal fade" id="dataReturn-modal" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <span class="glyphicon glyphicon-remove pull-right disBtnIcon" data-dismiss="modal" aria-hidden="true"></span>
            <h4 class="modal-title">
                <span>恢复文件</span>
            </h4>
        </div>
        <div class="modal-body">
            <div id="sliceUploadsql"></div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default disBtn" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger disBtn" onclick="returnsql('1');">确定</button>
        </div>
    </div>
    </div>
</div>