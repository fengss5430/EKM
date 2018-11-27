<%@ page language="java" import="java.util.*" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<div id="main-content" >
    <!--云盘文件内容区域-->
    <div class="container">
        <div class="row">
            <div id="content" class="col-lg-12 dataContent">
                <div id="topbar" class="nomobilediv clearfix padding15"  style="display:inline-block">
                    <!--topbar btnGroup -->
                    <span class="date-range pull-left" id="MaxTwo">
							<button class="js_update btn btn-default typeClass hide" href="javascript:;" type="10" onclick="UploadDoc();">上传</button>
                            <button class="js_update btn btn-default typeClass hide" href="javascript:;" type="8" onclick="NewFolder();">新建文件夹</button>
                    </span>
                    <span class="activebtn date-range pull-left btn-group" id="activebtn">
								<a class="js_update btn btn-default typeClass hide" href="javascript:;" type="1"  onclick="shareModal();">分享</a>
								<a class="js_update btn btn-default typeClass hide" href="javascript:;" type="2" onclick="downModal();" id="IsDown">下载<span id="ISdownLoad"></span></a>
								<a class="js_update btn btn-default typeClass hide" href="javascript:;" type="6" onclick="delModal();">删除</a>
								<a class="js_update btn btn-default typeClass hide" href="javascript:;" type="3" onclick="copyModal();">复制</a>
								<a class="js_update btn btn-default typeClass hide" href="javascript:;" type="4" onclick="renameModal();">重命名</a>
								<a class="js_update btn btn-default typeClass hide" href="javascript:;" type="5"  onclick="moveModal();">移动</a>
								<a class="js_update btn btn-default hide" href="javascript:;" onclick="hideModal();">标记隐藏</a>
                                <a class="js_update btn btn-default hide" href="javascript:;" onclick="cancelHideModal();">取消隐藏</a>
                                <a class="js_update btn btn-default hide gray" href="javascript:;"  onclick="limitSetModal();">权限</a>
                    </span>
                    <!-- /tobar btnGroup -->
                </div>

                <span class="date-range pull-right clearfix">
                    <div class="znSearch" style="display:inline-block; float:left; margin-right:0.4em;color:#333; line-height:34px;font-weight: 700; ">智能搜索:</div>
                    <div id="s" class="nomobilediv input-group search-bar" style="float: left; width: 200px; margin-right:8px;display: none">
                        <input type="text" class="form-control search" style="height: 34px; padding-right: 0px; border-right-width: 0" id="keyWord" onclick="searchKey();">
                        <a href="javascript:;" class="input-group-addon" style="background: transparent; border-left-width: 0px">
                             <%--<i class="fa fa-search"></i>--%>
                        </a>
                    </div>
                    <div class="btn-group">
                        <a class="js_update btn btn-default" style="border-radius: 4px; height:34px;padding:10px;" data-toggle="dropdown" href="javascript:;">
                            <i class="fa fa-sort-amount-asc"></i>
                        </a>
                        <ul class="dropdown-menu" style="min-width:100px; text-align:center;" id="dropList">
                            <li class="sotrActive" onclick="sortBtn(this.value);" value="0"><a style="line-height: 30px" href="javascript:;"><span class="glyphicon glyphicon-ok"></span>名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                            <li onclick="sortBtn(this.value);" value="1"><a style="line-height: 30px" href="javascript:;"><span class="glyphicon glyphicon-ok"></span>大小&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                            <li onclick="sortBtn(this.value);" value="2"><a style="line-height: 30px" href="javascript:;"><span class="glyphicon glyphicon-ok"></span>修改时间</a></li>
                        </ul>
                    </div>
                    <a id="mainlist-view" class="js_update btn btn-default" style="width: 38px; height:34px;" href="javascript:;" onclick="changeviews()">
                        <i class="fa fa-th-large" style="padding:5px 0;display:none;"></i>
                        <i class="fa fa-list" style="padding:5px 0;"></i>
                    </a>

                </span>
                <!-- 面包屑路径列表 -->
                <ul id="urlbar" class="breadcrumb" style="padding: 7px 0 7px 22px;">

                </ul>
                <div class="item-listview padding15" style="border:1px solid #ccc;border-radius: 4px;">
                    <!---list 列表-->
                    <div class="maincon list-view-container" id="listTableBox" style="width: 100%;display: block; overflow: auto">
                        <table id="listviewtable" class="" cellspacing="0" width="100%">
                            <thead>
                            <tr>
                                <th></th>
                                <th>资料库</th>
                                 <th>大小</th>
                                <th>修改日期</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <!---thnumbnaill 视图-->
                    <div id="view" class="maincon grid-view-container" style="display: none;">
                        <div class="grid-view" id="dataBaseView">
                        </div>
                    </div>
                </div>
            </div>
            <!-- /CONTENT-->
        </div>
    </div>
</div>
