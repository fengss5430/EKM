/**
 *
 * 获取当前时间
 */
function dateTimes(){
    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    var myDate = new Date();
//获取当前年
    var year=myDate.getFullYear();
//获取当前月
    var month=myDate.getMonth()+1;
//获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    var dateNow=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
    return dateNow;
}
/*添加待办事宜*/
function addNotes(){
    var addEdit='<div class="notes editNotes">'
        +'<div class="noteEdit">'
        +'<div class="noteEdit-main">'
        +'<textarea name="" class="noteEdit-content" cols="30" rows="10" placeholder="请输入内容..."></textarea>'
        +'</div>'
        +'<div class="noteEdit-header">'
        +'<input type="text" class="noteEdit-caption"  placeholder="请输入标题...">'
        +'</div>'
        +'<div class="noteEdit-footer">'
        +'<p class="xian"></p>'
        +'<div class="memo-foot">'
        +'<button type="button" class="btn btn-default disBtn" onclick="del(this);">取消</button>'
        +'<button type="button" class="btn btn-danger disBtn" onclick="keep(this);" >保存</button>'
        +'</div></div>'
        +'</div></div>';
    if($('.editNotes').size()<1){
        $('.addNotes').after(addEdit);
        $('.noteEdit-content').focus();
    }
    fenPageShow();
}

/*便签节点*/
function memo(main,caption,date){
    var memoNote='<div class="noteEdit-main">'
        +'<p class="memo-mains">'+main+'</p>'
        +'<div class="editModal">'
        +'<div class="icon" onclick="editMemo(this);"><span class="icons-edit"></span><p>编辑</p></div>'
        +' <div class="icon" onclick="dell(this);"><span class="icons-del"></span> <p>删除</p></div>'
        +'</div></div>'
        +'<div class="noteEdit-header">'
        +'<span class="memo-caption" title="'+ caption +'">'+caption+'</span>'
        +'</div>'
        +'<div class="noteEdit-footer">'
        +'<p class="xian"></p>'
        +'<div class="memo-foot">'
        +' <span class="memo-date">'+date+'</span>'
        +'</div></div>';
    return memoNote;
}
$("[tnum]").elli(); //超出....



function isUnsignedInteger(a) {
	var r = /^\+?[1-9][0-9]*$/;
	return r.test(a);
}
function findToDo(page){
		if (page != "") {
	        $("#page").val(page);
		   }
		//设置每页数
		var pageSize = 11;
		$.ajax({
			url :  "todo/find",
			type : "post",
			dataType : "json",
			data : {
				"page" : page,//当前页码
				"pageSize" : pageSize//每页条数
			},
			success : function(result) {
				var list=result.data;
				var memoNotes ='<div class="notes addNotes"><div class="note-add" onclick="addNotes();"><span class="plus"></span><p class="add-font">添加新的待办事宜</p></div></div>';
				for(var i=0; i<list.length; i++){
			        memoNotes +='<div class="notes memoNotes">'
			            +'<div class="noteEdit" value="'+list[i].todoId+'">'+memo(list[i].todocontent,list[i].todoTitle,list[i].createTime)+'</div></div>';
				}
				$('.todo').html(memoNotes);
				var count =pagesTotal();// 总条数
				var html=pagerUtil(pageSize,count,$("#page").val());
				$('#feny').html(html);
				var totalPages = $("#totalPages").val();
				if(page=="1"){
					$(".pagination li").eq(0).attr("class","paginate_button previous disabled");
					$(".pagination li").eq(0).html("<a href='javascript:;'>首页</a>");
				}else{
					$(".pagination li").eq(0).attr("class","paginate_button");
					$(".pagination li").eq(0).html("<a href='javascript:turnPage(1);'>首页</a>");
				}
				if(page==totalPages){
					$(".pagination li").last().attr("class","paginate_button previous disabled");
					$(".pagination li").last().html("<a href='javascript:;'>尾页</a>");
				}else{
					$(".pagination li").last().attr("class","paginate_button");
					$(".pagination li").last().html("<a href='javascript:turnPage("+totalPages +");'>尾页</a>");
				}
				
			}
		});
	}

function turnPage(turnPage) {
	findToDo(turnPage);
}
function pagesTotal() {
	var res=0;
	$.ajax({
		url :  "todo/findCount",
		type : "post",
		dataType : "json",
		async:false,
		success : function(result) {
			res=result.data;
		}
	});
	return res;
}
/*textarea处理空格及换行*/
function  regStr(str){
	var stringS=str.replace(/\n/g, '_%').replace(/\r/g, '_#');
	stringS=stringS.replace(/_#_%/g, '<br/>');//IE7-8
	stringS=stringS.replace(/_%/g, '<br/>');//IE9、FF、chrome
	stringS=stringS.replace(/\s/g, '&nbsp;');//空格处理
	return stringS;
}

/*保存生成便签*/
function keep(_this){
    var parentS=$(_this).parents('.notes');
    var $title=parentS.find('.noteEdit-caption').val();
    var $content=parentS.find('.noteEdit-content').val();
    var $date=dateTimes();
    if($title.trim()==""){
		modal("警告提示!","请填写标题!");
		return;
	}else if($title.trim().length>50){
		modal("警告提示!","标题长度不能超过50,请重新输入!");
		return;
	}
    if($content.trim()==""){
		modal("警告提示!","请填写内容!");
		return;
	} else if($content.trim().length>200){
		modal("警告提示!","内容长度不能超过200!");
		return;
	}
	var $main=regStr($content);
	$(".disBtn").attr("disabled","disabled");
    $.ajax({
    	url:"todo/save",
		type:"post",
		dataType:"json",
		data:{
			"todoTitle":$title,
			"todocontent":$main,
			"createTime":$date
			},
	    success:function(result){
	    	if(result.status==1){
	    		var id=result.data;
				modal("会话提示","添加成功!");
				findToDo(1);
				 if($title!=''){
				        var html=memo($main,$title,$date);
				        var memoNotes='<div class="notes memoNotes">'
				            +'<div class="noteEdit" value="'+id+'">'+html+'</div></div>';
				        if($('.memoNotes').size()<=0){
				            $('.todo').append(memoNotes);
				        }else{
				            $('.memoNotes').eq(0).before(memoNotes);
				        }
				        parentS.remove();
				        fenPageShow();
				 }else{
				        return;
				    }
			}else {				
				modal("会话提示","添加失败!");
			}
	    	$(".disBtn").removeAttr("disabled");
	    }
    });
}
/*重新编辑便签*/
function editMemo(_this){
    var parentS= $(_this).parents('.notes');
    var $main=$(_this).parents('.editModal').prev().html();
	var reg=new RegExp("<br>", "g");
	$main=$main.replace(reg, "\r\n");
    var $title=parentS.find('.memo-caption').attr('title');
    var $date=parentS.find('.memo-date').text();
    var editMemo='<span class="keepData" value="'+$main+'" title="'+$title+'" date="'+$date+'"></span>'
            +'<div class="noteEdit-main">'
            +'<textarea name="" class="noteEdit-content" cols="30" rows="10" placeholder="请输入内容...">'+$main+'</textarea>'
            +'</div>'
            +'<div class="noteEdit-header">'
            +'<input type="text" class="noteEdit-caption" placeholder="请输入标题..." value="'+$title+'">'
            +'</div>'
            +'<div class="noteEdit-footer">'
            +'<p class="xian"></p>'
            +'<div class="memo-foot">'
            +'<button type="button" class="btn btn-default disBtn" onclick="backs(this);">取消</button>'
        	+'<button type="button" class="btn btn-danger disBtn" onclick="keepToo(this);">保存</button>'
            +'</div></div>';
    $(_this).parents('.memoNotes').find('.noteEdit').children().remove();
    parentS.removeClass('memoNotes').addClass('editNotes').find('.noteEdit').append(editMemo);
}
/*重新编辑取消回到编辑前*/
function backs(_this){
    var parentS=$(_this).parents('.notes');
    var $content=parentS.find('.keepData').attr('value');
	var $main=regStr($content);
    var $title=parentS.find('.keepData').attr('title');
    var $date=parentS.find('.keepData').attr('date');
    var memoNotes=memo($main,$title,$date);
    $(_this).parents('.editNotes').find('.noteEdit').children().remove();
    parentS.addClass('memoNotes').removeClass('editNotes').find('.noteEdit').append(memoNotes);
}
/*重新编辑后保存*/
function keepToo(_this){
	var todo_Id=$(_this).parents('.editNotes').find('.noteEdit').attr('value');
    var parentS=$(_this).parents('.notes');
    var $content=parentS.find('.noteEdit-content').val();
    var $title=parentS.find('.noteEdit-caption').val();
	var $date=dateTimes();
	if($title.trim()==""){
		modal("警告提示!","请填写标题!");
		return;
	}else if($title.trim().length>50){
		modal("警告提示!","标题长度不能超过50,请重新输入!");
		return;
	}
	if($content.trim()==""){
		modal("警告提示!","请填写内容!");
		return;
	}else if($content.trim().length>200){
		modal("警告提示!","内容长度不能超过200!");
		return;
	}
	var $main=regStr($content);
	$(".disBtn").attr("disabled","disabled");
    $.ajax({
    	url:"todo/update",
		type:"post",
		dataType:"json",
		data:{
    		"todoId":todo_Id,
			"todoTitle":$title,
			"todocontent":$main,
			"createTime":$date
			},
	    success:function(result){
	    	if(result.status==1){
				modal("会话提示","修改成功!");
				findToDo(1);
				 var memoNotes=memo($main,$title,$date);
				    if($title!=''){
				        $(_this).parents('.editNotes').find('.noteEdit').children().remove();
				        parentS.removeClass('editNotes').addClass('memoNotes').find('.noteEdit').append(memoNotes);
				    }
			}else {				
				modal("会话提示","修改失败!");
			}
	    	$(".disBtn").removeAttr("disabled");
	    }
    }); 
}
/*鼠标放上显示*/
$('.todo').on('mouseenter mouseleave','.memoNotes',function(event){
    if(event.type=='mouseenter'){
        $(this).find('.editModal').show();
    }else if(event.type=='mouseleave'){
        $(this).find('.editModal').hide();
    }
});
/*编辑取消*/

/*便签删除*/
function dell(_this){
	 $('#delTodo-modal').modal('toggle');
	 $("#delTodo-modal").find(".btn-danger").attr("type",$(_this).parents('.noteEdit').attr('value'));
}

function delTodo(e){
	$.ajax({
    	url:"todo/delete",
		type:"post",
		dataType:"json",
		data:{
    		"todoId":$(e).attr("type")
			},
	    success:function(result){
	    	if(result.status==1){
				modal("会话提示","删除成功!");
				var page= $("#page").val();
				findToDo(page);
			}else{
				modal("会话提示","删除失败!");
			}
	    	$('#delTodo-modal').modal('hide');
	    }
	});
	fenPageShow();
}
function fenPageShow(){
    if(pagesTotal()>=11){
        $('.fenPage').show();
    }else{
        $('.fenPage').hide();
    }
}
$(function(){
    findToDo(1);
	fenPageShow();
});