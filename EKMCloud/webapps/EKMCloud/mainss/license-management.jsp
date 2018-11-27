<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="main-content">
    <!--云盘文件内容区-->
    <div class="container">
    <div class="row">
    <div id="content" class="col-lg-12" style="overflow:auto;">
    <div class="btn-groups">
    <a class="btn btn-default" href="javascript:void(0);" onclick="updatelicense();">更新license</a>
    <span style="padding-left: 20px;" class="f18">当前版本:</span><span class="f18" id="currentVersion">EKMClound v2018:</span>
    </div>
    <div class="task-box">
    <div class="details-Box">
    <form action="" class="form-horizontal" role="form">
    <div class="form-group">
    <span class="pr">客户姓名:</span>
    <span id="customName"></span>
    </div>
    <div class="form-group">
    <span class="pr">机器ID:</span>
    <span id="hostID"></span>
    </div>
    <div class="form-group">
    <span class="pr">序列号:</span>
    <span id="sn"></span>
    </div>
    <div class="form-group">
    <span class="pr">并发会话:</span>
    <span id="sessions"></span>
    </div>
    <div class="form-group">
    <span class="pr">剩余天数:</span>
    <span id="surplusTime"></span>
    </div>
    <div class="form-group">
    <span class="pr">开始时间:</span>
    <span id="beginTime"></span>
    </div>
    <div class="form-group" style=" position: absolute; bottom: 50px;">
    <div class="col-sm-12">
    <p class="text-danger f16">说明:EKMCloud仅供授权单位使用,违者必追究其法律责任</p>
    </div>
    </div>
    </form>
    </div>
    </div>
    </div>
    <!-- /CONTENT-->
    </div>
    </div>
    </div>
<!--更新Licebsee-->
<div class="modal fade" id="UpdateLicense_btn_modal" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
    <span class="glyphicon glyphicon-remove pull-right"
    data-dismiss="modal" aria-hidden="true">
    </span>
    <h4 class="modal-title">
    <span>更新license</span>
    </h4>
    </div>
    <div class="modal-body">
    <form class="form-horizontal" role="form" id="uploadform" method="POST" enctype="multipart/form-data">
    <div class="form-group">
    <label  class="col-sm-3 control-label">序列号:</label>
    <div class="col-sm-6">
    <input type="text" class="form-control" id="sn_input" name="sn">
    </div>
    </div>
    <div class="form-group">
    <label  class="col-sm-3 control-label">选择许可证:</label>
    <div class="col-sm-6">
    <input type="text" class="form-control" id="urlinput" readonly="readonly">
    </div>
    <label class="btn btn-default" style="width: 100px">
		选择文件
		<input type="file" onchange="handleFile()" id="urlval" name="fileName" style="width:0;height: 0;opacity:0;" multiple="multiple">
	</label>
    </div>
    </form>
    </div>
    <div class="modal-footer">

    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
    <button type="button" class="btn btn-danger"  onclick="ajaxFileUpload();">提交</button>
    </div>
    </div>
    </div>
    </div>