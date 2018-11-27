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
$(function(){
    	superLeftMenu();//超管
		circle();
		back();
		findTolSpace();
		memory();
		getSelfMess();
		findUsetime();
		//右键的点击事件
		$(".item-listview").on('contextmenu','.grid-view-item,.list-view-item',function(){
			$(this).addClass('item-active').siblings().removeClass('item-active');
		});
		//左侧菜单
		$("#sidebar").off().on('click','li',function(){
			$(this).addClass('active').siblings().removeClass('active');
    });
});

function circle(){
	var myChart2 = echarts.init(document.getElementById("circle2"));
	 var labelTop = {
		        normal : {
		            label : {
		                show : false,
		                position : 'center',
		                formatter : '{b}',
		                textStyle: {
		                    baseline : 'top'
		                }
		            },
		            labelLine : {
		                show : false
		            }
		        }
		    };
		    var labelBottom = {
		        normal : {
		            color: '#ccc',
		            label : {
		                show : true,
		                position : 'center'
		            },
		            labelLine : {
		                show : false
		            }
		        },
		        emphasis: {
		            barBorderWidth:1,
		            shadowColor: 'rgba(0, 0, 0, 0.5)',
		            shadowOffsetX:0,
		            shadowOffsetY:0,
		            shadowBlur: 10,
		            opacity:0.9
		        }
		    };
		    var labelFromatter = {
		        normal : {
		            label : {
		                formatter : function (params){
		                    return Math.floor((100 - params.value)*10000)/10000 + '%'
		                },
		                textStyle: {
		                    baseline : 'bottom'
		                }
		            }
		        },
		        emphasis: {
		            barBorderWidth:1,
		            shadowColor: 'rgba(0, 0, 0, 0.5)',
		            shadowOffsetX:0,
		            shadowOffsetY:0,
		            shadowBlur: 10,
		            opacity:0.9
		        }
		    };
		    var tooltip={
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)",
		        position: function (p) {
		            // 位置回调
		            return [p[0] + 10, p[1] - 10];
		        }

		    };
		    var spaceBaiFen =  findTolSpace();
		    if(typeof(spaceBaiFen) != "undefined"){
		    	var useSpaceB=spaceBaiFen.replace(/%/, "");
		        var NoUseSpaceB=100-useSpaceB;
		        option2 = {
		            tooltip :tooltip,
		            title : {
		                subtext: '总空间使用率',
		                color:'#626262',
		                fontSize:'14',
		                fontWeight:'normal',
		                x: 'center',
		                padding: [-25, 10]
		            },

		            calculable : true,
		            series : [
		                {
		                    name:'总空间使用率',
		                    type:'pie',
		                    radius : ['40', '50'],
		                    color: ["#f77324"],
		                    avoidLabelOverlap:false,
		                    hoverAnimation:false,
		                    itemStyle : {
		                        normal : {
		                            label : {
		                                show : false
		                            },
		                            labelLine : {
		                                show : false
		                            }
		                        },
		                        emphasis : {
		                            label : {
		                                show : true,
		                                textStyle : {
		                                    fontSize : '18',
		                                    fontWeight : 'bold',
		                                    baseline : 'middle'
		                                }
		                            }
		                        }
		                    },
		                    itemStyle : labelFromatter,
		                    data:[
		                        {value:useSpaceB, name:'已使用',itemStyle : labelTop},
		                        {value:NoUseSpaceB, name:'未使用',itemStyle : labelBottom}
		                    ]
		                }
		            ]
		        };
		        myChart2.setOption(option2);
		    }
}

//磁盘总空间
function findTolSpace(){
	var spacebaifen=0;
	var roleid = findRoleid();
			if(roleid==1001 || roleid==1000 || roleid==1002){
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
							html='<p>总空间:<span>'+tolspaces[0]+'</span></p>'+
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
function findUsetime(){
	$.ajax({
		url:"user/findUserMess",
		type:"post",
		dataType:"json",
		success:function(result){
			var user=result.data;
			$("#toName").attr("pass",user.password);
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
function repeatpwds(e){
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
function rpwds(e){
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
function repwds(e){
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
	if(respassword!=newpassword){
		modal("警告提示!","两次密码输入不一致!");
		$("#respassword").val("");
		$("#newpassword").val("");
		return;
	}
	if($.md5(oldpassword)!=oldPwd){
		modal("警告提示!","初始密码不正确!");
		$("#oldpassword").val("");
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

//超管LeftMenu
function superLeftMenu(){
    var wh=$(window).height();
    var Menu_Top = $("#left_menu_List").outerHeight(true);
    var sideBot = $(".sidebar-bot").height();
    var overflowH = wh  - sideBot - 60;
    var LF='';
    if(Menu_Top>overflowH){
        LF=overflowH;
    }
    $("#left_menu_List").slimScroll({
        height: LF,
        alwaysVisible: false,
        disableFadeOut: true,
        color: '#777'
    });
}

$(window).resize(function(){
    superLeftMenu();
});
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
	
//个人资料-基本设置
$("#person-btn-modal").off("hide.bs.modal");
$("#person-btn-modal").on("hide.bs.modal",function(){
	$("input[name='realName']").val('');
	$("input[name='telephone']").val('');
	$("input[name='email']").val('');
	$("textarea[name='remarks']").val('');
});
/**
 * 个人资料-工作信息
 * */
function getSelfMess(){
	var userName=$("#toName").text();
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
				$('input[name="userName"]').attr("value",users.userName);
				$('input[name="realName"]').attr("value",users.realName);
				$('input[name="telephone"]').attr("value",users.telephone);
				$('input[name="email"]').attr("value",users.email);
				if(users.department!=null){
					$('#remarks').val(users.department.remark);
					$('#dename').attr("value",users.department.deptName);
					$('#deMess').val(users.department.remark);
				}else{
					$('#remarks').val("");
					$('#dename').attr("value","");
					$('#deMess').val("");
				}
			}
		}
	});
}

//退出登录
function logout(){
	document.getElementById("logout").submit();
}

//网盘空间
function memory(){
	var types=new Array();
	 $("#sidebar ul").each(function () {  
         $(this).find('li').each(function() {  
        	 var type=$(this).find("a").attr("type");
        	 if (typeof(type) != "undefined"&&type!=66&&type!=77) {
        		 types.push(type);
        	}   
         });  
      });  
	var totalspace=$("#memory").attr("value");
	$.ajax({
		url : "data/file/useSpaces",
		type : "post",
		dataType : "json",
		data:{
			"types":types.join(",")
		},
		success : function (result) {
			var userspace=result.data;
			userspace=userspace-4096;
			var surplusSpace = (totalspace*1024*1024*1024)-userspace;
			
			$("#getSurplusSpaceSpan").attr("value",surplusSpace);
			var memory=(userspace/(totalspace*1024*1024*1024)*100).toFixed(2)+"%";
			var html='';
			if(result.status == 1){
					html='<div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: '+memory+';"><span class="sr-only"></span></div></div><span class="fl-size" >'+countFileSize(userspace)+'</span><span class="fl-size-extend "></span><div class="clearfix"></div>';
			}else if(result.status == -1){
					html='<div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"><span class="sr-only"></span></div></div><span class="fl-size" >'+0+'GB</span><span class="fl-size-extend "></span><div class="clearfix"></div>';
			}
			$("#memoryli").html(html);
			}
		});
}





