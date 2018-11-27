$(function(){
	getList();//获取操作权限列表

    // 滚动条
    $('.limitMBody').slimScroll({
        height: '497',
        alwaysVisible:false
    });

    //添加全选
    $(".selectAll").click(function(){
        if($(this).prop('checked') == true){
            $(this).parents(".form-group").find('input:checkbox').prop("checked","checked")
        }else{
            $(this).parents(".form-group").find('input:checkbox').prop("checked","")
        }
    });
    //设置全选
    $(".SetselectAll").click(function(){
        if($(this).prop("checked") == true){
            $(this).parents(".form-group").find("input:checkbox").prop("checked","checked");
        }else{
            $(this).parents(".form-group").find("input:checkbox").prop("checked","");
        }
    });


});

//获取操作权限列表培训
function getList(){
	$('#operationLimit-table').DataTable({
	    "scrollY":'791px',
	    "scrollCollapse": true,
	    "paging": false,
	    "searching": true,
	    "info": false,
	    "order": [[ 1, "asc" ]],
	    "aoColumnDefs":[ { "bSortable": false, "aTargets": [0]}],
	    "destroy" : true,
		    "ajax":{
				"url":"operation/getOperpow",
				"type":"post",
				"dataType":"json",
			    "dataSrc":function(result){
					var list=result.data;
					if(result.status == 0) {
						list = [];
					} else {
//						 var reg = /^[1-7]$/;
						for (var i = 0; i < list.length; i++) {
							var jj=list[i].operid;
							if(jj!=5){
								list[i][0]='<input type="checkbox" name="operationid" value="'+list[i].operid+'">';
								list[i][3]=list[i].createtime;	
							}else{
								list[i][0]='<input type="checkbox" name="operationid" value="'+list[i].operid+'" disabled>';
								list[i][3]='-';
							}
							
							
							list[i][1]=list[i].operponame;
							list[i][2]='<a href="javascript:void(0);" onclick="limitDetailsBtn('+list[i].operid+');">权限详情</a>';
							
						} 
					}
					return list;
	         	}
			}
		});
	}

/*                                      添加开始                                                               */
/*添加操作权限*/
function addLimit(){
	$('#addLimit_modal').modal('toggle');
}
$('#addLimit_modal').off('hidden.bs.modal');
$('#addLimit_modal').on('hidden.bs.modal',function(){
	$("input[name='limitName']").val('');
	$(".emptyTips").css("display","none");
    $(".beTips").css("display","none");
    $(".specialTips").css("display","none");
    $(".selectAll").removeAttr('checked');
    $('#mydata input[type="checkbox"]').removeAttr('checked');
    $('#teamdata input[type="checkbox"]').removeAttr('checked');
    $('#deptdata input[type="checkbox"]').removeAttr('checked');
    $('#comdata input[type="checkbox"]').removeAttr('checked');
    $('#knodata input[type="checkbox"]').removeAttr('checked');
    $('#prodata input[type="checkbox"]').removeAttr('checked');
    $('#ywdata input[type="checkbox"]').removeAttr('checked');
    $('#csdata input[type="checkbox"]').removeAttr('checked');
    $('#jxdata input[type="checkbox"]').removeAttr('checked');
    $('#yjdata input[type="checkbox"]').removeAttr('checked');
});

//权限名称已存在
function repeatLimitName(e,type){   
	var res=0;
	var Id_s=0;
    var limitName = $(e).val().trim();
    var reg =  /^[\u4E00-\u9FA5A-Za-z]+$/;
    if(limitName.length==0){
        $("#limitName").focus();
        $(e).parent().next().show();
    }else{
        $(e).parent().next().hide();
    }
    if(!reg.test(limitName)&&limitName.length!=0){
        $(e).parent().next().next().next().show();
	}else{
        $(e).parent().next().next().next().hide();
	}
    if(type=="2"){
		Id_s=$("#operationLimit-table input[type=checkbox]:checked").val();
	}
	$.ajax({
		url : "operation/findByOperPname",
		type : "post",
		dataType : "json",
		data :{
			"operponame": limitName,
			"operid":Id_s
		},
		async:false,
		success : function(result){
			res=result.status;
			if(result.status==1){
                $(e).parent().next().next().show();
                $("#limitName").focus();
			 }else{
                $(e).parent().next().next().hide();
			 }
			}
		});
	return res;
}

/*添加操作权限方法*/
function addOper(){
	var  powerid= [];
	var pows1="",pows2="",pows3="",pows4="",pows5="",pows6="",pows7="",pows8="",pows9="",pows0="";
	var mydatatype = $("#mydata").prev().attr("type");
	var teamdatatype = $("#teamdata").prev().attr("type");
	var deptdatatype = $("#deptdata").prev().attr("type");
	var comdatatype = $("#comdata").prev().attr("type");
	var knodatatype = $("#knodata").prev().attr("type");
	var prodatatype = $("#prodata").prev().attr("type");
	var ywdatatype = $("#ywdata").prev().attr("type");
	var csdatatype = $("#csdata").prev().attr("type");
	var jxdatatype = $("#jxdata").prev().attr("type");
	var yjdatatype = $("#yjdata").prev().attr("type");
//  1.mydatatype
	var powids1=$('#mydata input[type="checkbox"]:checked');
	if(powids1.length>0){
		for (var i = 0; i < powids1.length; i++) {
			pows1+=powids1.eq(i).parent().attr("value")+",";
		}
		pows1=pows1.substring(0, pows1.lastIndexOf(","));
		var powss1=mydatatype+"/"+pows1;
		powerid.push(powss1);
	}
	console.log(powids1);
	
//  2.teamdatatype
	var powids2=$('#teamdata input[type="checkbox"]:checked');
	console.log(powids2.length);
	if(powids2.length>0){
		for (var i = 0; i < powids2.length; i++) {
			pows2+=powids2.eq(i).parent().attr("value")+",";
		}
		pows2=pows2.substring(0, pows2.lastIndexOf(","));
		var powss2=teamdatatype+"/"+pows2;	
		powerid.push(powss2);
	}
//  3.deptdatatype
	var powids3=$('#deptdata input[type="checkbox"]:checked');
	if(powids3.length>0){
	for (var i = 0; i < powids3.length; i++) {
		pows3+=powids3.eq(i).parent().attr("value")+",";
	}
	pows3=pows3.substring(0, pows3.lastIndexOf(","));
	var powss3=deptdatatype+"/"+pows3;
	powerid.push(powss3);
	}
//  4.comdatatype
	var powids4=$('#comdata input[type="checkbox"]:checked');
	if(powids4.length>0){
		for (var i = 0; i < powids4.length; i++) {
			pows4+=powids4.eq(i).parent().attr("value")+",";
		}
		pows4=pows4.substring(0, pows4.lastIndexOf(","));
		var powss4=comdatatype+"/"+pows4;	
		powerid.push(powss4);
	}
//  5.knodatatype
	var powids5=$('#knodata input[type="checkbox"]:checked');
	if(powids5.length>0){
	for (var i = 0; i < powids5.length; i++) {
		pows5+=powids5.eq(i).parent().attr("value")+",";
	}
	pows5=pows5.substring(0, pows5.lastIndexOf(","));
	var powss5=knodatatype+"/"+pows5;
	powerid.push(powss5);
	}
//  6.prodatatype
	var powids6=$('#prodata input[type="checkbox"]:checked');
	if(powids6.length>0){
	for (var i = 0; i < powids6.length; i++) {
		pows6+=powids6.eq(i).parent().attr("value")+",";
	}
	pows6=pows6.substring(0, pows6.lastIndexOf(","));
	var powss6=prodatatype+"/"+pows6;	
	powerid.push(powss6);
	}
//  7.ywdatatype
	var powids7=$('#ywdata input[type="checkbox"]:checked');
	if(powids7.length>0){
	for (var i = 0; i < powids7.length; i++) {
		pows7+=powids7.eq(i).parent().attr("value")+",";
	}
	pows7=pows7.substring(0, pows7.lastIndexOf(","));
	var powss7=ywdatatype+"/"+pows7;
	powerid.push(powss7);
	}
//  8.csdatatype
	var powids8=$('#csdata input[type="checkbox"]:checked');
	if(powids8.length>0){
	for (var i = 0; i < powids8.length; i++) {
		pows8+=powids8.eq(i).parent().attr("value")+",";
	}
	pows8=pows8.substring(0, pows8.lastIndexOf(","));
	var powss8=csdatatype+"/"+pows8;	
	powerid.push(powss8);	
	}
//  9.jxdatatype
	var powids9=$('#jxdata input[type="checkbox"]:checked');
	if(powids9.length>0){
	for (var i = 0; i < powids9.length; i++) {
		pows9+=powids9.eq(i).parent().attr("value")+",";
	}
	pows9=pows9.substring(0, pows9.lastIndexOf(","));
	var powss9=jxdatatype+"/"+pows9;
	powerid.push(powss9);
	}
//  0.yjdatatype
	var powids0=$('#yjdata input[type="checkbox"]:checked');
	if(powids0.length>0){
	for (var i = 0; i < powids0.length; i++) {
		pows0+=powids0.eq(i).parent().attr("value")+",";
	}
	pows0=pows0.substring(0, pows0.lastIndexOf(","));
	var powss0=yjdatatype+"/"+pows0;	
	powerid.push(powss0);	
	}
	if(powerid.length==0){
		 modal("会话提示","选择的权限不能为空!");
		 return;
	}
	var limitName=$("#limitName").val().trim();
	var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
	 if(limitName==""){
		 modal("会话提示","权限名称不能为空!");
		 return;
	 }
	 if(!reg.test(limitName)) {
	       modal("会话提示框","权限名称 只能包含1至50位汉字,英文");
	       return;
	 }  
	 $('.disBtnIcon').removeAttr('data-dismiss');
	 $(".disBtn").attr("disabled","disabled");
	$.ajax({
		url:"operation/save",
		type:"post",
		dataType:"json",
		data:{
			"operpowerid":powerid.join("&"),//左道航名称+权限数字
			"operponame":limitName
			},
		success:function(result){		
			if(result.status==1){
				modal("会话提示","添加角色成功!");
				$("#limitName input").val("");
				getList();
				$("#addLimit_modal").modal('toggle');
			}else if(result.status==0){				
				modal("会话提示","添加失败!");
			}else if(result.status==-1){				
				modal("会话提示","权限名称已存在!");
			}
			$('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
		}
	});
}

/**
 * 修改角色
 * 
 * */
function updataOperation(){
	var  powerid= [];
	var pows1="",pows2="",pows3="",pows4="",pows5="",pows6="",pows7="",pows8="",pows9="",pows0="";
	var mydatatype = $("#mydata0").prev().attr("type");
	var teamdatatype = $("#mydata1").prev().attr("type");
	var deptdatatype = $("#mydata2").prev().attr("type");
	var comdatatype = $("#mydata3").prev().attr("type");
	var knodatatype = $("#mydata4").prev().attr("type");
	var prodatatype = $("#mydata5").prev().attr("type");
	var ywdatatype = $("#mydata6").prev().attr("type");
	var csdatatype = $("#mydata7").prev().attr("type");
	var jxdatatype = $("#mydata8").prev().attr("type");
	var yjdatatype = $("#mydata9").prev().attr("type");
//  1.mydatatype
	var powids1=$('#mydata0 input[type="checkbox"]:checked');
	if(powids1.length>0){
	for (var i = 0; i < powids1.length; i++) {
		pows1+=powids1.eq(i).parent().attr("value")+",";
	}
	pows1=pows1.substring(0, pows1.lastIndexOf(","));
	var powss1=mydatatype+"/"+pows1;
	powerid.push(powss1);
	}
//  2.teamdatatype
	var powids2=$('#mydata1 input[type="checkbox"]:checked');
	if(powids2.length>0){
	for (var i = 0; i < powids2.length; i++) {
		pows2+=powids2.eq(i).parent().attr("value")+",";
	}
	pows2=pows2.substring(0, pows2.lastIndexOf(","));
	var powss2=teamdatatype+"/"+pows2;	
	powerid.push(powss2);
	}
//  3.deptdatatype
	var powids3=$('#mydata2 input[type="checkbox"]:checked');
	if(powids3.length>0){
	for (var i = 0; i < powids3.length; i++) {
		pows3+=powids3.eq(i).parent().attr("value")+",";
	}
	pows3=pows3.substring(0, pows3.lastIndexOf(","));
	var powss3=deptdatatype+"/"+pows3;
	powerid.push(powss3);
	}
//  4.comdatatype
	var powids4=$('#mydata3 input[type="checkbox"]:checked');
	if(powids4.length>0){
	for (var i = 0; i < powids4.length; i++) {
		pows4+=powids4.eq(i).parent().attr("value")+",";
	}
	pows4=pows4.substring(0, pows4.lastIndexOf(","));
	var powss4=comdatatype+"/"+pows4;	
	powerid.push(powss4);	
	}
//  5.knodatatype
	var powids5=$('#mydata4 input[type="checkbox"]:checked');
	if(powids5.length>0){
	for (var i = 0; i < powids5.length; i++) {
		pows5+=powids5.eq(i).parent().attr("value")+",";
	}
	pows5=pows5.substring(0, pows5.lastIndexOf(","));
	var powss5=knodatatype+"/"+pows5;
	powerid.push(powss5);
	}
//  6.prodatatype
	var powids6=$('#mydata5 input[type="checkbox"]:checked');
	if(powids6.length>0){
	for (var i = 0; i < powids6.length; i++) {
		pows6+=powids6.eq(i).parent().attr("value")+",";
	}
	pows6=pows6.substring(0, pows6.lastIndexOf(","));
	var powss6=prodatatype+"/"+pows6;	
	powerid.push(powss6);
	}
//  7.ywdatatype
	var powids7=$('#mydata6 input[type="checkbox"]:checked');
	if(powids7.length>0){
	for (var i = 0; i < powids7.length; i++) {
		pows7+=powids7.eq(i).parent().attr("value")+",";
	}
	pows7=pows7.substring(0, pows7.lastIndexOf(","));
	var powss7=ywdatatype+"/"+pows7;
	powerid.push(powss7);
	}
//  8.csdatatype
	var powids8=$('#mydata7 input[type="checkbox"]:checked');
	if(powids8.length>0){
	for (var i = 0; i < powids8.length; i++) {
		pows8+=powids8.eq(i).parent().attr("value")+",";
	}
	pows8=pows8.substring(0, pows8.lastIndexOf(","));
	var powss8=csdatatype+"/"+pows8;	
	powerid.push(powss8);	
	}
//  9.jxdatatype
	var powids9=$('#mydata8 input[type="checkbox"]:checked');
	if(powids9.length>0){
	for (var i = 0; i < powids9.length; i++) {
		pows9+=powids9.eq(i).parent().attr("value")+",";
	}
	pows9=pows9.substring(0, pows9.lastIndexOf(","));
	var powss9=jxdatatype+"/"+pows9;
	powerid.push(powss9);
	}
//  0.yjdatatype
	var powids0=$('#mydata9 input[type="checkbox"]:checked');
	if(powids0.length>0){
	for (var i = 0; i < powids0.length; i++) {
		pows0+=powids0.eq(i).parent().attr("value")+",";
	}
	pows0=pows0.substring(0, pows0.lastIndexOf(","));
	var powss0=yjdatatype+"/"+pows0;	
	powerid.push(powss0);	
	}
	if(powerid.length==0){
		 modal("会话提示","选择的权限不能为空!");
		 return;
	}
	var operid=$("#operationLimit-table input[type=checkbox]:checked").val();
	var operponame=$("#divrole").val().trim();
	var reg = /^[\u4E00-\u9FA5A-Za-z]{1,50}$/;
    if(operponame==""){
       modal("会话提示","权限名称不能为空!");
       return;
    }
    if(!reg.test(operponame)) {
       modal("会话提示框","权限名称 只能包含汉字,英文");
       return;
    }
    $('.disBtnIcon').removeAttr('data-dismiss');
	 $(".disBtn").attr("disabled","disabled");
	$.ajax({
		url:"operation/updateOperation",
		type:"post",
		dataType:"json",
		data:{
			"operid":operid,
			"operpowerid":powerid.join("&"),//左道航名称+权限数字
			"operponame":operponame
		},
		success:function(result){		
			if(result.status==1){
				modal("会话提示","设置权限成功!");	
				getList();
				findPower();
				$('#setLimit_modal').modal('toggle');
			}else if(result.status==-1){
				modal("会话提示","权限名称已存在!");	
			}
			$('.disBtnIcon').attr('data-dismiss','modal');
            $(".disBtn").removeAttr("disabled");
		}
	});
}

/*                                       设置开始                                                                       */
$("#setLimit_modal").off('hidden.bs.modal');
$("#setLimit_modal").on('hidden.bs.modal',function(){
    $(".emptyTips").hide();
    $(".beTips").hide();
    $(".specialTips").hide();
	$('#divrole').val('');
	$('#mydata0 input[type="checkbox"]').removeAttr('checked');
    $('#mydata1 input[type="checkbox"]').removeAttr('checked');
    $('#mydata2 input[type="checkbox"]').removeAttr('checked');
    $('#mydata3 input[type="checkbox"]').removeAttr('checked');
    $('#mydata4 input[type="checkbox"]').removeAttr('checked');
    $('#mydata5 input[type="checkbox"]').removeAttr('checked');
    $('#mydata6 input[type="checkbox"]').removeAttr('checked');
    $('#mydata7 input[type="checkbox"]').removeAttr('checked');
    $('#mydata8 input[type="checkbox"]').removeAttr('checked');
    $('#mydata9 input[type="checkbox"]').removeAttr('checked');
});

/*设置角色*/
function setLimit(){
	var operpowerid = $("input[name='operationid']:checked");
	if(operpowerid.length!=1) {
		modal("警告提示","请选择一项或不要选择多项");
		return;
	}
     setOperPowerByid();
     $('#setLimit_modal').modal('toggle');
}



//设置中拥有的权限
function setOperPowerByid(){		
	var operid=$("#operationLimit-table input[type=checkbox]:checked").val();	
	  $.ajax({
		  url:"operation/updateOperPowerlist",
		  dataType:"json",
		  type:"post",
		  data:{
			  "operid":operid			  
		        },
		  success:function(result){
			  if(result.status==1){
				  var oper=result.data;
				  $("#divrole").val(oper.operponame);
				  var divs=$("#setLimit_modal").find(" .pp");
				  for (var i = 0; i < oper.operallot.length; i++) {
					  var arr=new Array();
					 var operpowerid = oper.operallot[i].operpowerid;
					 var leftname=oper.operallot[i].leftmenuname;
					 for (var l = 0; l < divs.length; l++) {
						 if(leftname==divs.eq(l).find("label").attr("type")){
							 console.log(divs.eq(l).find("label").attr("type"));
							 arr=operpowerid.split(',');
							 var spans= divs.eq(l).find("span");
							 for (var j = 0; j < spans.length; j++) {
								 for (var k = 0; k < arr.length; k++) {
									if(arr[k]==spans.eq(j).attr("value")){
										spans.eq(j).find("input").prop("checked","checked");
									}
								}
							} 
						 }
					}
				  }
			 }
		 }
	 });
}
//添加权限详情Modal
function limitDetailsBtn(e){
	var res=powerDetails(e);
	if(res==0){
		modal("警告提示","暂无权限");
		return;
	}else{
		$("#lookLimit_modal").modal('toggle');
	}
}
$("#lookLimit_modal").off('hidden.bs.modal');
$("#lookLimit_modal").on('hidden.bs.modal',function(){
	for (var i = 0; i < 10; i++) {
		  $("#dataid"+i).html('');
	  }
});
//详请
function powerDetails(operid){
	var res=null;
	  $.ajax({
		  url:"operation/urPowerlist",
		  dataType:"json",
		  type:"post",
		  async:false,
		  data:{
			  "operid":operid			  
		        },
		  success:function(result){
			  res=result.data.operallot.length;
			  if(result.status==1){
				  var oper=result.data;
				  var divs=$("#formpid").find(" .pp");
				  for (var i = 0; i < oper.operallot.length; i++) {
					  var operpowerid = oper.operallot[i].operpowerid;
					  var leftname = oper.operallot[i].leftmenuname;
					  for (var l = 0; l < divs.length; l++) {
						  if(leftname==divs.eq(l).find("label").attr("type")){
							  var html='<span>'+operpowerid.replace(/\,/g," ")+'</span>';
							  divs.eq(l).find("label").next().html(html);
						  }
					  }
				  }
			 }
		 }
	 });
	  return res;
}


function deleteOperation(){
	var operids = $("#operationLimit-table").find("input:checked");
	if(operids.length<1){
		modal("操作提示!","请选择一项或多项操作!");
		return;
	}
	if(!confirm("确定要删除你选择的用户吗?")){
		return;
	}
	var operid = new Array();
	for(var i = 0;i<operids.length;i++){
		operid.push(operids.eq(i).attr("value"));
	}
			$.ajax({
				url:"operation/deleteOperation",
				dataType:"json",
				type:"post",
				data:{
					"operid":operid.join(","),	  
				},
				success:function(result){
					if(result.status==1){
						modal("会话提示","删除权限成功");
						getList();
						findPower();
					}else {
						modal("会话提示","删除失败");
					}
				}
			});
		 }