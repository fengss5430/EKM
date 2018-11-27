<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content">
    <!--云盘文件内容区-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12" style="min-height: 50px">
                <div class="Status-box dataTables_wrapper">
                    <a href="javascript:;" class="btn btn-default Refresh" onclick="getSafeCheckInfo(1);">刷新</a>
                    <table id="Status-table" class="compact" cellspacing="0" width="100%;">
                        <thead>
                        <tr>
                            <th>文件名</th>
                            <th>操作用户</th>
                            <th>文件来源</th>
                            <th>类型</th>
                            <th>文件路径</th>
                            <th>下载次数</th>
                            <th>操作时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <input type="hidden" id="page" value="1"/>
             	<div class="fenPage row" id="feny">
            </div>
            
            <!-- /CONTENT-->
        </div>
    </div>
</div>