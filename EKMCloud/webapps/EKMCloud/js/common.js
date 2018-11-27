//Publick Fun
var picdata;
//ChangePage 这是 跳转的load
function ChangePage(e){
    $('#loadDiv').css('display','block');
    var src = "/mainss/"+$(e).attr('name')+'.jsp';
    $("#getPage").attr("name",$(e).attr('name'));
    $("#getPage").attr("type",$(e).attr('type'));
    $("#getPage").attr("value",$(e).attr('id'));
    
    var jselem = document.createElement("script");
    jselem.src ="pagejs/"+$(e).attr('name')+".html.js";
    jselem.id ="pagescript";
    $(".pageRight").load(src,function(){
        if ( $("#pagescript").length>0){
            $("#pagescript").remove();
        }
        document.body.appendChild(jselem);//load后执行
        IsRadio(); //IsRadio
    if($("#admid").attr("type")!=1000){
        DateTimePicker();//
        $('#usertype').selectpicker('val', 'arr','Mustard',{
            'selectedText': 'cat'
        });
    }
        //remove ContextJs右键
        var rightContext= $(".compressed-context").length;
        if(rightContext>0){
            $(".compressed-context").remove();
        }
        //loadDiv
        $('#loadDiv').css('display','none');
        App.resize(); // 初始化主题页面

    });
};


/*-----Ipt选取的内容-----*/
$('input:text').click(function(){
    $(this).select();
});
$(function(){
	ChangePage('#defaultnav');
    //left
    $('#left_menu_List li').click(function(){
        $('#left_menu_List li').removeClass('active');
        $(this).addClass('active');
        $('#navbar-left li a').removeClass('licurr');

    });
    $('#database').on('click','li',function(){
        var typeNum=$(this).find('a').attr('type');
        if(isNaN(typeNum)){
            sessionStorage.setItem('baseClass','department');
        }else{
            sessionStorage.setItem('baseClass',typeNum);
        }
    });
    $("#activebtn").children().removeClass('gray'); //初始化topbar

    //Team li dbclick talk
    $('.team-status .team-list li').dblclick(function(){
        $('#ImmediateMess-modal').modal('toggle');
    });

    //top clic
    $('header').on('click','#navbar-left li',function(){
	   	 $('#navbar-left li a').removeClass('licurr');
		 if($(this).index()!=0){
			 $('.sidebar-menu li').removeClass('active');
		 }
	     $(this).find('a').addClass('licurr');
    });
    
    $('#person-btn').click(function(){
        $("#person-btn-modal").modal('toggle');
    });

    //PersonalTab
    $(".person-box li").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.box-tabContent .box-contents').eq($(this).index()).show().siblings().hide();
    });

    //private-btn
    $("#private-btn").click(function(){
        $("#private-btn-modal").modal('toggle');
    });

    $("#private-btns").click(function(){
        $('#private-btn-modals').modal('toggle');
    });

    //cancellation（注销）
    $("#cancellation-btn").click(function(){
        $('#cancellation-btn-modal').modal('toggle');
    });
    //修改密码）
    $("#updatePaw-btn").click(function(){
        $('#updatePaw-modal').modal('toggle');
    });

    //修改路径
    $("#upAdress-btn").click(function(){
        $('#upAdress-modal').modal('toggle');
    });
    //uplaod   上传
    if($("#admid").attr("type")!=1000){
    var clipArea = new bjj.PhotoClip("#clipArea", {
        size: [260, 260],
        outputSize: [640, 640],
        file: "#file",
        view: "#viewImg",
        ok: "#clipBtn",
        loadStart: function() {
        },
        loadComplete: function() {
        	 $("#clipBtn").click();
        },
        clipFinish: function(dataURL) {
            picdata=dataURL;
        }
    });
    DateTimePicker();
    }
  
    
    var setIntervals;
    // modal show
    var showtimer=null;
    $("#person-btn-modal").off("hidden.bs.modal");
    $("#person-btn-modal").on('hidden.bs.modal', function(){
        var fileInput = $("#file");
        clearInterval(fileInput);
        $('#uName').val('');
		$('#rName').val('');
		$('#tphone').val('');
		$('#els').val('');
        $('#file').val('');
        picdata = '';
        $(".photo-clip-rotateLayer").find("img").attr("src", "");
        $("#viewImg").css("backgroundImage", "");
        if (showtimer){
            clearInterval(showtimer);
        }
        setIntervals = 0;
    });
    $("#person-btn-modal").off("show.bs.modal");
    $("#person-btn-modal").on('show.bs.modal',function(){
        setIntervals=1;
        var fileInput = $("#file");
        var clipBtn = $("#clipBtn");
        fileInput.bind("click" ,function(){
            clearInterval(showtimer);
            showtimer = setInterval(function(){
                if(setIntervals==0){return;}
                else{
                    clipBtn.click();
                }
            },500);

        });
    });


    $('.menu_sub').trigger('click');
    

    //remove contextJS 右键
    window.onload = function () {
        var rightContext= $(".compressed-context").length;
        if(rightContext>0){
            $(".compressed-context").remove();
        }

    };
});


//时间
function DateTimePicker(){
	if($("#admid").attr("type")==1000){
		$.fn.datetimepicker.dates['en'] = {
				days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
				daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
				daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
				months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
				monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
				today: "今天",
				suffix: [],
				meridiem: ["上午", "下午"]
		};
	}else{
        $.fn.datetimepicker.dates['en'] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今天",
            suffix: [],
            meridiem: ["上午", "下午"]
        };
    }
    if ($(".datetimepicker").length){
        $("#datetimepicker,#datetimepicker2,#datetimepicker3,#datetimepicker4,#datetimepicker5").datetimepicker('remove');
        $(".datetimepicker").remove();
    }
    //只显示
    // $("#datetimepicker3,#datetimepicker4,#datetimepicker5").datetimepicker({
    //     format: "yyyy-MM-dd hh:ii:ss",
    //     autoclose:"true",
    //     minuteStep: 5
    // });
}
/*-----Ipt选取的内容-----*/
$('input:text').click(function(){
    $(this).select();
});

function IsRadio(){
    $('.IsRadioBox input').change(function(){
        if($(this).prop('checked')==true && $(this).attr('value')=='Y'){
            $('.task-box').find('.IsShowBox').show();
        }else{
        	$('.task-box').find('.IsShowBox').hide();
        };
    });
}

$("#Pdf-modal").on("hidden.bs.modal", function() {
    $(this).removeData("bs.modal");
});

//PicType
function PicTypeModal(){
    $('#PicType-modal').modal('toggle');
};

//PicType src
function TypeSRc(){
    $("#TypeUrl").attr('src','/hpc/hpcapp/daicy/SpeedCloud/users/admin1/DAIC邮箱服务器信息.jpg');
};

//PDF
function PdfModal(){
    $('#Pdf-modal').modal('show');
};
//changeSrc
function changeSrc(){
    $('#ChangeSrc').attr('src',"PDF/note.txt");
}

//Video
function VideoModal(src){
    $('#Video-modal').modal('show');
};

//查看Txt Modal
function TxtModal(){
    $('#Video-modal').modal('toggle');
}

sessionStorage.itemactive=false;
function addActive(){
    sessionStorage.itemactive = true;
    var asd =  setInterval(function(){
        if(sessionStorage.itemactive=="true"){
            shareModal();
            sessionStorage.itemactive = false;
        }
        clearInterval(asd);
    },100);
}

function reNameActive(){
    sessionStorage.itemactive = true;
    var asd =  setInterval(function(){
        if(sessionStorage.itemactive=="true"){
        	renameModal();
            sessionStorage.itemactive = false;
        }
        clearInterval(asd);
    },100);
}
$('#share-modal').off('hidden.bs.modal');
$('#share-modal').on('hidden.bs.modal',function(){
    $('#share-modal').find('ul li').eq(0).trigger('click');
    $("#connShareP").html("0");
    $('#shareSelecteName').empty();
    $("#conntionInput").val('');
    tips("", false);
});

//一键备份
function backUps(){
	var fileLength = $(".item-active");
    if (fileLength.length < 1) {
        modal("会话提示框", "请至少选择一项");
        return;
    }
    $.ajax({
        type: "POST",
        url: "backup/getUpBack",   
        success: function (result) {
            if (result.status == 1) {
            	modal("会话提示框", "请先指定备份路径");
            	IfUpdate('1');
            }else if(result.status == 0){
            	$("#upUrl-modal").modal('show');
            }
        }
    });
}

//数据-备份
function databackUps(){
    $("#databack-modal").modal('show');
}
//数据-返回
function dataReturn(){
    $("#dataReturn-modal").modal('show');
}


//分享
function shareModal(){
	var type=$(".sidebar-menu ul .active").find("a").attr("type");//1.我的2.团队3.营销
	var deptType=$("#deptDataId").find("a").attr("type");
    if(type=='1'){
        $('#share-modal').find('ul li').eq(1).show();
        $('#share-modal').find("#shaerSelectc").find('option').remove();
        $('#share-modal').find("#shaerSelectc").append(
        		"<option value='2'>团队资料库</option>" +
        		"<option value='"+deptType+"'>部门资料库</option>" +
        		"<option value='3'>公司资料库</option>" +
        		"<option value='11'>标准知识</option>" +
        		"<option value='22'>产品知识</option>" +
        		"<option value='13'>业务知识</option>" +
        		"<option value='55'>产品数据</option>" +
        		"<option value='66'>技术开发协同</option>" +
        		"<option value='77'>业务技术协同</option>");
        $('#share-modal').find('#shaerSelectc2').css("visibility","visible");
    }else{
        $('#share-modal').find('ul li').eq(1).hide();
        $('#share-modal').find("#shaerSelectc").find('option').remove();
        $('#share-modal').find("#shaerSelectc").append("<option value='1'>我的资料库</option>");
        $('#share-modal').find('#shaerSelectc2').css("visibility","hidden");
    }
	var fileLength = $(".item-active");
	if(fileLength.length < 1) {
		modal("会话提示框","请至少选择一项");
		return;
	}
	//加载可分享团队成员列表
    shareTeamList();
    $('#share-modal').modal('toggle');
    //Share active
    $(".share-link li").click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(".share-link-list .share-link-info").eq($(this).index()).show().siblings().hide();
    });
    //分享 modal
    var strPub = '<span>生成下载链接，然后复制链接发送给你要分享的用户</span>'+
        '<button class="btn btn-default btnColorRed public-link disBtn" onclick="link();">创建链接</button>';
    $('.create-link').html(strPub);
  //创建连接
	createShareConntion();
};

//分享中的下拉
    $('#shaerSelectc').change(function(){
        if($(this).val() != 2){
            $('#shaerSelectc2').css("visibility","hidden");
        }else{
            $('#shaerSelectc2').css("visibility","visible");
        }
    });

/*点击复制链接*/
function copy_con(_this){
    var copy = '<span class="Copy-linked" style="">复制链接成功</span>';
    $(_this).after(copy);
    var copyobject = document.getElementsByClassName("copy-public-link")[0];
    copyobject.select();
    document.execCommand("Copy");
}
/*创建链接界面*/
function link(){
    var conPub = '<p><em class="glyphicon glyphicon-ok-sign"></em>成功创建公开链接</p>' +
    '<p><input type="text" class="copy-public-link form-control w70" id="conntionInput" value=""'+
    'style="margin-bottom: 10px; user-select: auto;"><a href="javascript:;" class="copy_con w24" onclick="copy_con(this);">复制链接</a>'+
    '<div class="success-remark"></p>'+
    ' <p>1、生成文件下载链接</p>'+
    ' <p>2、把链接通过<b>站内通信或QQ、微信等方式分享他人</b></p>'+
    '</div> '+
    '<div class="buttonGroup">'+
    '<button type="button" class="btn btn-default btn-danger btnBack" id="btnBack" onclick="btnBack();" style="margin-top: 30px;">返回</button>'+
    '</div>';
    $(".create-link").html(conPub);
    var lianjie=$("#connShareP").attr("name");
    $("#conntionInput").val(lianjie);
}
//返回
function btnBack(){
	$('#share-modal').modal('hide');
}

//share label
$(".Box-fl-list li .Box-list-title").click(function () {
    $(this).parent().toggleClass('curr').find("ul#shareTeamList").slideToggle();
});

//下载
var fileNameDate;
function downModal(){
	fileNameDate = new Date().getTime();
    $('#down-modal').modal('toggle');

};

//删除
function delModal(){
    $("#del-modal").modal('show');
};

//重命名
function renameModal(){
	var rename=$(".item-active").attr("value");
	if($(".item-active").attr("name")=="false"){
		rename=rename.substring(0, rename.lastIndexOf("."));
	}
	$("#renameFile").val(rename);
    $("#rename-modal").modal('toggle');
};



//复制
function copyModal() {
    $('#copy-modal').modal('toggle');
    $("#copyMoveSpanText").attr("value","copy");
    $("#copyMoveSpanText").html("复制到");
    getDirectoryList();
}
//clearTimer
var clearTimer = null;

//移动
function moveModal() {
	  $('#copy-modal').modal('toggle');
	  $("#copyMoveSpanText").attr("value","move");
	  $("#copyMoveSpanText").html("移动到");
	  getDirectoryList();
}

//标记隐藏
function hideModal(){
    $('#hide-modal').modal('toggle');
};

function  statusInfo() {
    $('#source-btn-modal').modal('toggle');
}
//阻止mouseDown event
function stopProp(event){
    var ev = event || window.event;
    ev.stopPropagation()
}
//新建文件夹 modal
function NewFolder(){
    $('#NewFolder-modal').modal('toggle');
}

//新建文件夹 modal
function CopyNewFolder(){
	var treeObj = $.fn.zTree.getZTreeObj("ztreeCopyMove");
	var treeNode =treeObj.getSelectedNodes();
	if(treeNode.length !=1){
		modal("会话提示框","请选择一项");
		return;
	}
    $('#CopyNewFolder-modal').modal('toggle');
}

//新建文件夹 modal
function CopyNewFolders(){
	var treeObj = $.fn.zTree.getZTreeObj("cloudtreeCopy");
	var treeNode =treeObj.getSelectedNodes();
	if(treeNode.length != 1){
		modal("会话提示框","请选择一项");
		return;
	}
    $('#CopyNewFolder-modals').modal('toggle');
}
//上传文件
var load;
var filename='';
var fileSize = 0;
function UploadDoc(){
	var pattern = new RegExp("[$%#-]");
	var uplosding=$("#modalBody").find(".uploading");
	if(uplosding.length==1&&uplosding.attr("type")!="100"){
		modal("会话提示框", "文件正在上传，请稍等!");
		return;
	}
		load = $("#sliceUpload").sliceUpload({
	        sliceValue:50*1024*1024,//默认是每片50M，可自定义修改此值，具体参见SliceUpload.js
	        url:"upload/uploads",
	        isTrigger:false,
	    });

	    $('#UploadDoc-modal').modal('toggle');
	    $('.fileUpload').on("change",(function(){
	    	var file = this.files[0];
	    	fileSize=file.size;
	    	filename=file.name;
	    	if(filename.length>30){  
	    		modal("会话提示框","文件名过长");  
	            return;  
	        }
	    	if(pattern.test(filename)){  
	    		modal("会话提示框","不要使用特殊字符");  
	            return;  
	        }
//	        $('#InputUrl').val(filename);
	    	 $("input[name='InputUrl']").val(filename);
	    }));
};

//var e=0;
function up(w){
	if(filename == ""){
		modal("会话提示框","请选择文件"); 
		return;
	}
	var type=$("#getPage").attr("type");
	 if(type=="1"){
      	 var baifen=$("#memory").attr("type");
      	    var yong=baifen.substring(0, baifen.indexOf("/"));
      	    var zong=baifen.substring(baifen.indexOf("/")+1);
      	    var yongb=getTOSize(yong);//已经用的b
      	    var xyou=yongb+fileSize;//加上即将下载的总占的
      	    var zongb=getTOSize(zong);//总的b
      	    if(xyou > zongb){
      	    	modal("会话提示框", "上传此文件会超出总空间!");
      	    	 $("input[name='InputUrl']").val('');
      	    	return;	
      	    }
      }
	$("#MaxTwo").find('button').eq(0).addClass('gray');
    $("#upLoad-modal").fadeIn(500);
    $("#fadeMax").trigger('click');
    $("#modalBody").attr("type","1");
	if(w=='1'){
		$("#modalBody").find('.uploading').remove();
        $("#upLoad-modal").fadeIn(500);
		$('#UploadDoc-modal').modal('hide');
		var html='';
		var filenames="";
		if(filename.length>8){
			filenames=filename.substring(0, 8)+ " ...";;
		}else{
			filenames=filename;
		}
		html='<div class="uploading" type="0">'+
		'<div class="progress">'+
		'<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" id="jindu1">0%</div>'+
		'</div><span class="glyphicon glyphicon-pause" id="output"></span><span class="glyphicon glyphicon-play hide" id="continue"></span><span class="glyphicon glyphicon-remove" id="deljindu"></span><span class="upFileName" title="'+filename+'">'+filenames+'</span></div>';
		$("#modalBody").find(".upBox").append(html);
	}
		 load.uploadClick(function (a,b) {
			 if(a==true){
				 $("#modalBody").find("#jindu1").html(b+"%");
				 $("#modalBody").find("#jindu1").parent().parent().attr("type",b);
	    	}
	    	 var Ujin=$("#modalBody").find(".uploading");
	    	 var jinlength= Ujin.length;
	    	 $("#ujdcountid").html(jinlength);
	    });
}
//暂停
$("#upLoad-modal").on("click",'#output',function(){
    $(this).addClass('hide');
    $("#continue").removeClass("hide");
    console.log("###");
    load.stopPost(function () {
        console.log("abc");
    });//此方法用来取消上传--中断
});
//继续
$("#upLoad-modal").on("click",'#continue',function(){
    $(this).addClass('hide');
    $("#output").removeClass("hide");
    if($("#modalBody").attr("type")=="1"){
    	up('2');
    }else if($("#modalBody").attr("type")=="2"){
    	uplod('2');
    }
});
$("#upLoad-modal").on("click",'#deljindu',function(){
	 if($("#modalBody").attr("type")=="1"){
		 $("#MaxTwo").find('button').eq(0).removeClass('gray');
	    }else if($("#modalBody").attr("type")=="2"){
	    	$("#upDocBtn").removeClass('gray');
	    }
	load.stopPost(function () {
		$("#modalBody").find('.uploading').remove();
	     $(".fadeMin").trigger('click');
	    });//此方法用来取消上传--中断
});

  //部门管理-添加
function addMember(){
	$('#addMember_modal').modal('toggle');
}

/*---load---*/
function tips(content,onoff){
	var Load = '<div id="loadBox" style="border-radius:8px;position: fixed;z-index:1042;">' +
    '<div class="loadMain">' +
    '<img class="loadImg" src="images/loadBigImg.gif" alt="">' +
    '<span>'+content+'</span></div>' +
    '</div>';
    if(onoff){
        $('body').append(Load);
    }else{
        $('#loadBox').remove();
    }
}
function LoadsError(content,onoff){
	 var LoadError = '<div id="loadError" style="border-radius:8px;">' +
         '<div class="textInfo" style="border-radiaus:8px!important;">' +
         '<span class="glyphicon glyphicon-exclamation-sign"></span>' +
         '<span style="padding-left:23px;"> '+content+'</span>' +
         '</div>' +
         '</div>';
    if(onoff){
        $('body').append(LoadError);
    }else{
        $('#loadError').remove();
    }
}

function ShowLoad(){
	tips('正在加载,请耐心等候...',true);   
}
function HidenLoad(){
	tips('',false);

}
function showLoadError(){
	LoadsError('加载失败!',true);
}
function hideLoadError(){
	LoadsError('',false);
}
//load out
$(document).click(function(){
    hideLoadError();
});

//teamtoggle
$("#navbar-left").on('click','.team-status-toggle',function(){
    var wh = $(window).height();
    var overflowH = wh - $('#header').height()-50;
    var overflowHOpen = wh - $('#header').height()-50 - 200;
    var overflowHClose = overflowH + 200;

    $(this).toggleClass("open");
    if($(this).hasClass('open')){
        $('#team-status').show(100);
        $("#left_menu_List").css('height',overflowHOpen);
    }else{
        $('#team-status').hide(100);
        $("#left_menu_List").css('height',overflowHClose);
    }

    $(".team-status #teamslider").each(function () {
        $(this).slimScrollHorizontal({
            width: "100%",
            alwaysVisible: true,
            color: "#fff",
            opacity: "0.5",
            size: "5px"
        });
    });

    $('#share-modal').find('#shaerSelectc2').css("visibility","visible");
});