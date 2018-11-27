	ifvisible.setIdleDuration(600);
	var idle = 0;
	var timeout = 0;
	ifvisible.on("idle", function(){
		idle = 1;
	});
	ifvisible.on("wakeup", function(){
		idle = 0;
		timeout = 0;
	});
	setInterval("remainTime()",30000); 
	function remainTime(){
		if(idle == 1){
			timeout++;
		}
		if(timeout >= 20){
			logout();
		}
	}
	var ws = null;
	var Menu_Top;
	var num_n;
	$(function(){
		back();
		findTolSpace();
		projectpower();
		findHideStatu();
		startWebSocket();
		perss();
		newsChat();
		newsTask();
		getSelfMess();
		memory();
		//聊天滚动
		$('#message').slimScroll({
			height: '216px',
			start: 'bottom',
			allowPageScroll: true
		});
		findUsetime();
		findPower();
    });
	function findPower(){
		var userName=$("#toName").html();
		$.ajax({
			url:"operation/findByname",
			type:"post",
			dataType:"json",
			data:{
				userName:userName
			},
			success:function(result){
				if(result.status==1){
					var as = $("#database").find("a");
					var list=result.data;
					for (var i = 0; i < list.length; i++) {
						for (var j = 0; j < as.length; j++) {
							if(as.eq(j).attr("type")==list[i].leftmenuname){
								as.eq(j).attr("powerid",list[i].operpowerid);
							}
							if(list[i].leftmenuname=="0"&&as.eq(j).attr("type").length>=8){
								as.eq(j).attr("powerid",list[i].operpowerid);
							}
						}
					}
				}
			}
		});
	}
	//磁盘总空间
	function findTolSpace(){
		var spacebaifen=0;
		var roleid = findRoleid();
				if(roleid==1001 || roleid==1000 || roleid==1002 || roleid==1004){
					$.ajax({
						url:"data/file/TolSpaces",
						type:"post",
						dataType:"json",
						async:false,
						success:function(result){
							var tolspace=result.data;
							var html="";
							var tolspaces=tolspace.split(",");
							if(result.status == 1){
								html='<p>总空间:<span  id="zspaceid">'+tolspaces[0]+'</span></p>'+
			                         '<p>已使用:<span>'+tolspaces[1]+'</span></p>'+
			                         '<p>未使用:<span id="nospaceid">'+tolspaces[2]+'</span></p>';
								spacebaifen=tolspaces[3];
							}else if(result.status == 2){
								html='';
							}
							$("#circle2").next().html(html);
						}
					});
					return spacebaifen;
				}else{
					$("#circle2").parent(".dropdown-info").attr("class","hide");
				}
	}
	function findRoleid(){
		var roleid=0;
		$.ajax({
			url:"user/findbyId",
			type:"post",
			dataType:"json",
			async:false,
			success:function(result){
				var user=result.data;
				roleid=user.roleId;
				}
		});
		return roleid;
	}
	//网盘空间
	function memory(){
		var selfSpaceBaiFen=0;
		var totalspace=$("#memory").attr("value");
		$.ajax({
			url : "data/file/useSpace",
			type : "post",
			dataType : "json",
			async:false,
			success : function (result) {
				var userspace=result.data;
				if(result.status == 1){
					if(userspace>4096){
						userspace=userspace-4096;
					}else{
						userspace=userspace-0;
					}
				}else{
					userspace=userspace-0;
				}
				var surplusSpace = getTOSize(totalspace+'GB')-getTOSize(userspace+"B");
				$("#getSurplusSpaceSpan").attr("value",surplusSpace);
				var memory=(userspace/(totalspace*1024*1024*1024)*100).toFixed(4)+"%";
				selfSpaceBaiFen=memory;
				var html='';
				if(result.status == 1){
					$("#memory").attr("type",countFileSize(userspace)+'/'+totalspace+"GB");
					html='<p>总空间:<span>'+totalspace+'GB</span></p>'+
                         '<p>已使用:<span>'+countFileSize(userspace)+'</span></p>'+
                         '<p>未使用:<span>'+countFileSize(surplusSpace)+'</span></p>';
				}else if(result.status == -1){
					$("#memory").attr("type",'0/'+totalspace+"GB");
					html='<p>总空间:<span>'+totalspace+'G</span></p>'+
                         '<p>已使用:<span>0B</span></p>'+
                         '<p>未使用:<span>'+totalspace+'G</span></p>';
				}
					$("#circle").next().html(html);
				}
			});
		return selfSpaceBaiFen;
	}
	
	function findUsetime(){
		$.ajax({
			url:"user/findUserMess",
			type:"post",
			dataType:"json",
			success:function(result){
				var user=result.data;
				if(user.useTime==0){
					modal("警告提示","请先修改密码！");
					$("#updatePaw-modal").modal("show");
				}
			}
		});
	}
	$('#updatePaw-modal').off('hidden.bs.modal');
	$('#updatePaw-modal').on('hidden.bs.modal', function () {
		$(".emptyTips").hide();
		$(".beTips").hide();
		$(".specialTips").hide();
		$("#oldpassword").val('');
		$("#respassword").val('');
		$("#newpassword").val('');
	});
	function repeatpwd(e){
		$(".emptyTips").hide();
	    $(".beTips").hide();
	    $(".specialTips").hide();
		var oldPwd=$("#toName").attr("pass");
		var oldpassword=$(e).val();
		if(oldpassword==""){
			$(e).parent().next().show();
			return;
		}
		if($.md5(oldpassword)!=oldPwd){
			$(e).parent().next().next().show();
			$(e).val("");
			return;
		}
	}
	function rpwd(e){
		$(".emptyTips").hide();
	    $(".beTips").hide();
	    $(".specialTips").hide();
	    var respassword=$(e).val();
		var passwordReg = /^[0-9a-zA-Z_-]{6,16}$/;//密码正则
		var oldpassword=$("#oldpassword").val();
		if (oldpassword == "" && respassword == "") {
			$("#oldpassword").parent().next().show();
			$(e).parent().next().show();
			return;
		}
		if (respassword == "") {
			$(e).parent().next().show();
			return;
		}
		if (respassword .length<6 || respassword .length>16) {
			$(e).parent().next().next().next().show();
			return;
		}
		if (!respassword.match(passwordReg)) {
			$(e).parent().next().next().show();
			$(e).val("");
			return;
		}
	}
	function repwd(e){
		$(".emptyTips").hide();
	    $(".beTips").hide();
	    $(".specialTips").hide();
	    var respassword=$("#respassword").val();
		var newpassword=$(e).val();
		if(newpassword==""){
			$(e).parent().next().show();
			return;
		}
		if(respassword!=newpassword){
			$(e).parent().next().next().show();
			return;
		}
	}
	//修改密码
	function ResetPassword(){
		var userName=$("#toName").html();
		var oldPwd=$("#toName").attr("pass");
		var oldpassword=$("#oldpassword").val();
		var respassword=$("#respassword").val();
		var newpassword=$("#newpassword").val();
		var passwordReg = /^[0-9a-zA-Z_-]{6,16}$/;//用户密码正则
		if(oldpassword==""||respassword==""||newpassword==""){
			modal("警告提示!","密码不能为空!");
			return;
		}
		if(oldpassword.length<6||oldpassword.length>16){
			modal("警告提示!","密码长度在6~16位之间,请重新输入!");
			$("#oldpassword").val("");
			return;
		}
		if(respassword.length<6||respassword.length>16){
			modal("警告提示!","密码长度在6~16位之间,请重新输入!");
			$("#respassword").val("");
			return;
		}
		if(newpassword.length<6||newpassword.length>16){
			modal("警告提示!","密码长度在6~16位之间,请重新输入!");
			$("#newpassword").val("");
			return;
		}
		if(!oldpassword.match(passwordReg)){
			modal("警告提示!","密码只能是英文字母和数字组成!");
			$("#oldpassword").val("");
			return;
		}
		if(!respassword.match(passwordReg)){
			modal("警告提示!","密码只能是英文字母和数字组成!");
			$("#respassword").val("");
			return;
		}
		if(!newpassword.match(passwordReg)){
			modal("警告提示!","密码只能是英文字母和数字组成!");
			$("#newpassword").val("");
			return;
		}
		if($.md5(oldpassword)!=oldPwd){
			modal("警告提示!","初始密码不正确!");
			$("#oldpassword").val("");
			return;
		}
		if(respassword!=newpassword){
			modal("警告提示!","两次密码输入不一致!");
			$("#respassword").val("");
			$("#newpassword").val("");
			return;
		}
		
		$.ajax({
			url:"user/upPassword",
			type:"post",
			dataType:"json",
			data:{
				"userName":userName,
				"newpassword":newpassword
			},
			success:function(result){
				window.location.reload();
			}
		});
	}
	
	
//限制浏览器后退
	function back(){
		if (window.history && window.history.pushState){
			$(window).on('popstate', function (){
				window.history.pushState('forward', null, '#');
				window.history.forward(1);
			});
		}
		window.history.pushState('forward', null, '#');
		window.history.forward(1);
	}

//工程可视化模块
	function projectpower(){
		$("#protitle").attr("class","hide");
		$(".nav-collapse ul li").each(function(){
			if(typeof($(this).find(".menu-text").attr("value"))!="undefined"
				&&$(this).find(".menu-text").attr("value")!="0"){
				$(this).attr("class","hide");
			}
		});
		$.ajax({
			url:"user/getProtype",
			type:"post",
			dataType:"json",
			success:function(result){
			var user=result.data;
			var protypes={};
				if(result.status==1){
					var protype=user.protype;
					var num=0;
					if(protype!=""){
						$("#protitle").removeClass('hide');
						protypes=protype.split(",");
						for (var i = 0; i < protypes.length; i++) {
							$(".nav-collapse ul li").each(function(){
								if(protypes[i]==$(this).find(".menu-text").attr("value")){
									$(this).removeClass('hide');
								}
							});
						}
					}else{
						$("#protitle").attr("class","hide");
						$(".nav-collapse ul li").each(function(){
							if(typeof($(this).find(".menu-text").attr("value"))!="undefined"&&$(this).find(".menu-text").attr("value")!="0"){
								$(this).attr("class","hide");
							}
						});
					}
					var _li=$("a[name='Design-visuazation']").parent();
                    for(var i=0;i<_li.length;i++){
                      if(_li.eq(i).css('display')=='none'){
                    	  num++;
                      }
                    }
					var MenuTop = $('#left_menu_List').outerHeight(true);
                    // console.log('--------MenuTop-左侧菜单729------'+MenuTop);
                    num_n=num;Menu_Top=MenuTop;
                    leftMenu();
                    return Menu_Top;num_n; //返回全局变量在leftMenu中使用
                    leftMenu(); 
				}
			}
		});
	}
  
    function leftMenu(){
      var wh=$(window).height();
      // console.log('---------wheight--窗口高度-930----'+wh);
	  var overflowH=wh-$('#header').height()-50;
      var LF='';
		 if(Menu_Top>overflowH){
			LF=overflowH;
		 }else{
			 var num_h='';
			 if(num_n==3){
				 num_h=num_n*51+39;
			 }else{
				 num_h=num_n*51-30;
			 }
			LF=overflowH+num_h;
		 }
		 $("#left_menu_List").slimScroll({
			   height:LF,
			   alwaysVisible: false,
			   disableFadeOut:true,
			   color: '#777'
		});
    }
	//窗口Change
    $(window).resize(function(){
        leftMenu();
    });
//添加头像
	function savePic(){
		var userName=$("#toName").html();
		var blockImg="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQ"+
			"EBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBA"+
			"QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAKAAoADAREAA"+
			"hEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAA"+
			"AAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJ/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=";

		if(typeof(picdata) == "undefined" || picdata == ''||picdata==blockImg){
			 modal("会话提示","请选择上传的头像！");
			return;
		}
		$.ajax({
			url:"user/savepic",
			type:"post",
			dataType:"json",
			data:{
			"picdata":picdata
			},
			success:function(result){
			$("#iconUrlId").attr("src",result.data);
			$("#person-btn-modal").modal("hide");
             picdata="";
	     },
		});
	}
	function perss(){
		$.ajax({
			url:"user/power",
			type:"post",
			dataType:"json",
		    success:function(result){
		    	var html="";
		    	if(result.status==1){
				  var list=result.data;
				  html+='<li class="dropdown"  onclick="lieb2();getSelfMess();"><a href="javascript:;" class="team-status-toggle dropdown-toggle tip-bottom" data-toggle="tooltip" title=""><i class="fa fa-users"></i><span class="name" languageset="str1_teamstatus">团队状态</span><i class="fa fa-angle-down"></i></a></li>';
					for (var i = 0; i < list.length; i++) {
						var powers=list[i];
						var pageurl=powers.pageUrl;	
						var powername=powers.powername+"";
						if(powername.indexOf("(")>0){
							powername =powername.substring(0,powername.indexOf("("));
						}
						var pageur=pageurl.substr(6);
						var pageu = pageur.substring(0,pageur.length-4);
					    html+='<li class="dropdown"><a href="javascript:;" class="dropdown-toggle" name="'+pageu+'" onclick="ChangePage(this);"><span>'+powername+'</span></a></li>';
					} 	
		    	}else if(result.status==0){
		    		html+='<li class="dropdown" onclick="lieb2();getSelfMess();" ><a href="javascript:;" class="team-status-toggle dropdown-toggle tip-bottom" data-toggle="tooltip" title=""><i class="fa fa-users"></i><span class="name" languageset="str1_teamstatus">团队状态</span><i class="fa fa-angle-down"></i></a></li>';
		    	}
				$("#navbar-left").html(html);
         	}
		});
	}
	/**
	 * 修改密码
	 */
	function updatePassword(){
		var newPassword=$("#NewPassword").val();
		if(newPassword==""){
			modal("会话提示","请填写修改的密码！");
			return;
		}
		    modal("会话提示","保存成功,请重新登录！");
		$("#perbutton").submit();	
	}
	
     $("#person-btn-modal").off("shown.bs.modal");
	 $("#person-btn-modal").on("shown.bs.modal",function(){
	 		// $("#person-btn-modal .pull-left ul li").eq(0).addClass("active").siblings().removeClass("active")
			getSelfMess();
	 });

	/**
	 * 个人资料-工作信息
	 * */	
	function getSelfMess(){
		var userName=$("#toName").html();
		$.ajax({
			url:"user/findSelfMess",
			type:"post",
			dataType:"json",
			data:{
				"userName":userName
			},
			success:function(result){
				var users=result.data;
				if(result.status==1){
					$("#toName").attr("pass",users.password);
					$('#uName').val(users.userName);
					$('#rName').val(users.realName);
					$('#tphone').val(users.telephone);
					$('#els').val(users.email);
					if(users.role!=null){
						$('#toName').attr("name",users.role.roleId);
					}
					if(users.department!=null){
						$('#remarks').val(users.department.remark);
						$('#dename').attr("value",users.department.deptName);
						$('#deMess').val(users.department.remark);
						$("#deptDataId").find("a").attr("type",users.department.randomId);
					}else{
						$('#remarks').val("");
						$('#dename').attr("value","");
						$('#deMess').val("");
					}
					var html='';
					var teamid="";
					if(users.team!=null){
						teamid=users.team[0].teamId;
						for (var i = 0; i <users.team.length; i++) {
							html+='<option value="'+users.teamId+'" name="'+users.team[i].teamnum+'">'+users.team[i].teamName+'</option>';
						}
					}
					$("#teamForm").html(html);
					$("#getPage").attr("title",teamid);
					$("#shaerSelectc2").html(html);
				}
			}
		});
	}
	

	//修改用户信息
	function subform(){
		var userName=$('input[name="userName"]').val();
		var realName=$('input[name="realName"]').val();
		var telephone=$('input[name="telephone"]').val();
		var email=$('input[name="email"]').val();
		var emailReg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var telephoneReg = /^1[34578]\d{9}$/;
	    var realNameReg = /^[\u4E00-\u9FA5|a-zA-Z]*$/;
	    if(realName.length!=0&&(realName.length<2 || realName.length>50)){
	        modal("警告提示!","真实姓名长度在2~50位之间,请重新输入!");
	        return;
	    }else if(realName.length!=0&&!realName.match(realNameReg)){
	        modal("警告提示!","真实姓名中只能包含中英文符号,请重新输入!");
	        return;
	    }
		if(email.length!=0&&!email.match(emailReg)){
			modal("警告提示!","邮箱格式不正确,请重新输入!");
			return;
		}
		if(telephone.length!=0&&!telephone.match(telephoneReg)){
			modal("警告提示!","手机号不正确请重新输入!");
			return;
		}
		$.ajax({
			url:"user/upper",
			type:"post",
			dataType:"json",
			data:{
				"userName":userName,
				"realName":realName,
				"telephone":telephone,
				"email":email
			},
				success:function(result){
					if(result.status==1){
						modal("操作提示!","修改用户信息成功!");
						$('#person-btn-modal').modal('hide');
						$('input[name="userName"]').val("");
						$('input[name="realName"]').val("");
						$('input[name="telephone"]').val("");
						$('input[name="email"]').val("");
						$('#navbar-left').find("[name='/user-management']").trigger('click');
					}else if(result.status==0){
						modal("操作提示!","修改用户信息失败!");
					}
				}
		});
	}
//退出登录
	function logout(){
		document.getElementById("logout").submit();
	}	
//top进度条
	function newsTask(){
		$.ajax({
			url:"taskaudit/findProjectByPtime",
			type:"post",
			dataType:"json",
				success:function(result){
					var html="";
					var list=result.data;
					if(result.status == 0) {
						list = [];
						var html='<li class="dropdown-title"><span onclick="newsTask();"><i class="fa fa-check"></i><span class="new_info">最近任务</span></span></li><p style="line-height:40px;text-indent:1em;">无最新申请!</p>';
						 $("#Taskselect").html(html);
					}else{
						 $("#listSize").text(list.length);
						var html='<li class="dropdown-title"><span onclick="newsTask();"><i class="fa fa-check"></i><span class="new_info">最近任务</span></span></li>';
					 for (var i = 0; i < list.length; i++) {
						 list[i].endTime=list[i].endTime.substring(0, list[i].endTime.lastIndexOf("."));
						 var supervisorAudit=list[i].supervisorAudit;
						 var managerAudit=list[i].managerAudit;
						 var projectName=list[i].projectName;
						 if(projectName.length>9){
							 projectName= projectName.substring(0, 9)+'...';
						 }
						if(supervisorAudit=="d"&&managerAudit=="d"){
							html+='<li title="'+list[i].projectName+'"><a href="javascript:;"><span class="header"><span class="left-projectName">'+projectName+'</span><span class="right-num">25%</span></span><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;"><span class="sr-only">25% Complete</span></div></div></a></li>';
						}else if(supervisorAudit=="n"){
							html+='<li title="'+list[i].projectName+'"><a href="javascript:;"><span class="header"><span class="left-projectName">'+projectName+'</span><span class="right-num">100%</span></span><div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%;"><span class="sr-only">100% Complete</span></div></div></a></li>';
						}else if(supervisorAudit=="y"&&managerAudit=="d"){
							html+='<li title="'+list[i].projectName+'"><a href="javascript:;"><span class="header"><span class="left-projectName">'+projectName+'</span><span class="right-num">50%</span></span><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%;"><span class="sr-only">50% Complete</span></div></div></a></li>';
						}else if(supervisorAudit=="y"&&managerAudit=="n"){
							html+='<li title="'+list[i].projectName+'"><a href="javascript:;"><span class="header"><span class="left-projectName">'+projectName+'</span><span class="right-num">100%</span></span><div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%;"><span class="sr-only">100% Complete</span></div></div></a></li>';
						}else if(supervisorAudit=="y"&&managerAudit=="y"&&list[i].endTime<getTime()){
							html+='<li title="'+list[i].projectName+'"><a href="javascript:;"><span class="header"><span class="left-projectName">'+projectName+'</span><span class="right-num">100%</span></span><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%;"><span class="sr-only">100% Complete</span></div></div></a></li>';
						}else if(supervisorAudit=="y"&&managerAudit=="y"&&list[i].endTime>=getTime()){
							html+='<li title="'+list[i].projectName+'"><a href="javascript:;"><span class="header"><span class="left-projectName">'+projectName+'</span><span class="right-num">75%</span></span><div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:50%;"><span class="sr-only">50% Complete</span></div></div></a></li>';
						}
					 }
					 $("#Taskselect").html(html);
				}
			}
		});
   }

//聊天--团队状态	
	function newsChat(){
		var toName=$("#toName").text();
		var list={};
		$.ajax({
			url:"chatrecord/findNewChat",
			type:"post",
			dataType:"json",
			data:{
			"toName":toName	
			},
			async:false,
			success:function(result){
				list=result.data;
				var html='';
				if(result.status == 0) {
					list = [];
					html='<li style="line-height:40px;text-indent:1em;"><span>无最新消息!</span></li>';
					$("#newChatSize").text(list.length);
				}else{
					 $("#newChatSize").text(list.length);
						 for (var i = 0; i < list.length; i++) {
							var content=list[i].content;
							if(list[i].user!=null){
								html+='<li onclick="MessModal(this);"  name="'+list[i].fromName+'"><a href="javascript:;"><img src="'+list[i].user.iconUrl+'" alt="" /><span class="body"><span class="from">'+list[i].fromName+'</span><span class="message">'+content.substring(0, 9);+'...</span><span class="time"><i class="fa fa-clock-o"></i><span languageset="str1_justnow">'+list[i].chatTime+'</span></span></span></a></li>';		
							}else{
								html+='<li onclick="MessModal(this);"  name="'+list[i].fromName+'"><a href="javascript:;"><img src="img/avatars/2.jpg" alt="" /><span class="body"><span class="from">'+list[i].fromName+'</span><span class="message">'+content.substring(0, 9);+'...</span><span class="time"><i class="fa fa-clock-o"></i><span languageset="str1_justnow">'+list[i].chatTime+'</span></span></span></a></li>';		
								
							}
						}
				}
				$("#newChat").append(html);	
			}
		});
		return list;
   }
//登录时查询是否是
	function findHideStatu(){
		$.ajax({
			url:"user/findHideStatu",
			type:"post",
			dataType:"json",
		success:function(result){
				if(result.status==0){
						sessionStorage.activehide=0;//进入隐私 
				}else if(result.status==1){
						sessionStorage.activehide=1;//退出，没进隐私
				}else if(result.status==2){
						sessionStorage.activehide=2;//用户无设置隐私
				}
			}
		});	
	}
/**
 * 隐私设置密码
 * */
	$("#private-btn-modal").off("hide.bs.modal");
	$("#private-btn-modal").on("hide.bs.modal",function(){
		$("#hidePassword").val('');
	});
	$("#private-btn-modals").off("hide.bs.modal");
	$("#private-btn-modals").on("hide.bs.modal",function(){
		$("#password").val('');
		$("#passwords").val('');
		$("#pwd").val('');
	});
	function samepwd(){
		var passwordss=$("#passwords").val();//新输入的密码
		var pwd=$("#pwd").val();//重新输入密码
		if(passwordss!=pwd){
			$('.emptyTips').show();
		}else{
            $('.emptyTips').css("display","none");
		}
	}
	
	function setPasswork(){
		var passwords=$("#spanpassword").attr("value");//原密码
		var password=$.md5($("#password").val());//输入的原密码
		var passwordss=$("#passwords").val();//新输入的密码
		var pwd=$("#pwd").val();//重新输入密码
		
		var passwordReg = /^[0-9a-zA-Z_-]{6,16}$/;//用户密码正则
		if(password==""||passwordss==""||pwd==""){
			modal("警告提示!","密码不能为空!");
			return;
		}else if(passwordss.length<6||passwordss.length>16){
			modal("警告提示!","密码长度在6~16位之间,请重新输入!");
			return;
		}else if(!passwordss.match(passwordReg)){
			modal("警告提示!","密码只能是英文字母和数字组成!");
			return;
		}
		if(passwordss!=pwd){
			$("#pwd").val("");
			$('.emptyTips').hide();
			return;
		}else{
            $('.emptyTips').hide();
		}
		if(password==passwords && passwordss==pwd){
			$.ajax({
				url:"user/setPwd",
				type:"post",
				dataType:"json",
				data:{
					"passwordss":passwordss
				},
			success:function(result){
					if(result.status==1){
						modal("会话提示","设置成功!");
						$("#private-btn-modals").modal('hide');
						sessionStorage.activehide=1;
					}
				}
			});	
		}else{
			modal("警告提示!","输入的用户密码不正确!");
			return;
		}
	}	
/**
 * 进入隐私模式
 * */		
	function hide(){		
		var hidePassword=$("#hidePassword").val();
		if(hidePassword==""){
			modal("警告提示!","密码不能为空!");
			$('#private-btn-modal').modal('show');
			return;
		}
		$.ajax({
			url:"user/hidepwd",
			type:"post",
			dataType:"json",
			data:{
				"hidePassword":hidePassword
			},
		success:function(result){
				if(result.status==1){
					modal("会话提示","已成功设置为隐私模式!");
					$('#private-btn-modal').modal('hide');
					sessionStorage.activehide=0;
					$('#My-database').trigger('click');
				}else if(result.status==0){
					modal("会话提示","密码错误!");
				}else if(result.status==-1){
					modal("会话提示","请先设置密码!");
				}else if(result.status==2){
					modal("会话提示","该用户已经进入!");
					$('#private-btn-modal').modal('hide');
				}
			}
		});	
	}
/**
 * 退出隐私模式
 * */		
	function delhide(){	
		var hidePassword=$("#hidePassword").val();
		if(hidePassword==""){
			modal("警告提示!","密码不能为空!");
			return;
		}
		$.ajax({
			url:"user/delhidepwd",
			type:"post",
			dataType:"json",
			data:{
				"hidePassword":hidePassword
			},
			success:function(result){
				if(result.status==1){
					modal("会话提示","已成功退出隐私模式!");
	                sessionStorage.activehide=1;
	                $('#private-btn-modal').modal('hide');
					$('#My-database').trigger('click');
				}else if(result.status==-1){
					modal("会话提示","退出失败!密码错误");
				}else if(result.status==0){
					modal("会话提示","该用户已经退出");
				}else if(result.status==2){
					modal("会话提示","该用户还未进入隐私模式");
				}
			}
		});	
	}		



//聊天发送功能
	$('#ImmediateMess-modal').off('shown.bs.modal');
	$('#ImmediateMess-modal').on('shown.bs.modal',function(){
	    sends();
	});
//加載团队状态列表
	function  lieb2(){
		var teamId=$('#teamForm').val();
		if(teamId==""){
			$("#teamul").html('<li><span class="title">此成员暂无团队!</span></li>');
			return;
		}
		var userName=$("#toName").html();
		$.ajax({
			 url:"user/userTeam",
	        type:"post", 
	        dataType:"json",
	        data:{
	       	 "userName":userName
	        },
			success:function(result){
				var list=result.data;
				var html="";
				if(result.status == 0){
					$("#teamul").html('<li><span class="title">此团队暂无成员!</span></li>');
				}else if(result.status == 1){
					if(list.length==1&&list[0].userName==self){
						html='<li><span class="title">除自己以外无成员!</span></li>';
					}
					for (var i = 0; i < list.length; i++) {
						if(list[i].userName!=self){
							var status="";
							if(list[i].deptId==0){
								status="";
							}else{
								status=list[i].deptId;
							}
							if(list[i].status==1){
								html+='<li ondblclick="MessModal(this);" name="'+list[i].userName+'" type="'+list[i].deptId+'"><a href="javascript:;" value="'+list[i].userName+'"><span class="badge" id="newChatSize">'+status+'</span><span class="image"><img src="'+list[i].iconUrl+'"/></span><span class="title">'+list[i].userName+'</span><img class="ImgOnLine" src="images/icon-online.png"></a></li>';
							}else{
								html+='<li ondblclick="MessModal(this);" name="'+list[i].userName+'" type="'+list[i].deptId+'"><a href="javascript:;" value="'+list[i].userName+'"><span class="badge" id="newChatSize">'+status+'</span><span class="image"><img src="'+list[i].iconUrl+'"></span><span class="title">'+list[i].userName+'</span><img class="ImgOutLine" src="images/icon-outline.png"></a></li>';
							}
						}
					 }
					$("#teamul").html(html);
				}
		    }
	    });
	}
