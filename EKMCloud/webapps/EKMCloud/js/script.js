var mainconlist = -1;
var flag = 'listView';

if (localStorage.mainconlist == 1) {
    mainconlist = 1;
} else {
    mainconlist = -1;
}

var App = function () {

    var currentPage = ''; // 当前页面是？
    var collapsed = false; //侧边栏崩溃
    var is_mobile = false; //是否是手机尺寸界面
    var is_mini_menu = false; //迷你菜单激活
    var is_fixed_header = false; //固定标头激活
    var responsiveFunctions = []; //响应功能支持

    /*-----------------------------------------------------------------------------------*/
    /*	运行的应用程序addresponsivefunction()回调函数
     /*-----------------------------------------------------------------------------------*/
    var runResponsiveFunctions = function () {
        // 重新初始化设置订阅的元素内容等
        for (var i in responsiveFunctions) {
            var each = responsiveFunctions[i];
            each.call();
        }
    };
    /*-----------------------------------------------------------------------------------*/
    /*	得到正确的视口的宽度
     /*-----------------------------------------------------------------------------------*/
    var getViewPort = function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        }
    };
    /*-----------------------------------------------------------------------------------*/
    /*	检查布局尺寸
     /*-----------------------------------------------------------------------------------*/
    var checkLayout = function () {
        //检查侧边栏迷你菜单
        is_mini_menu = $('#sidebar').hasClass('mini-menu');
        //检查是否激活了固定标头
        is_fixed_header = $('#header').hasClass('navbar-fixed-top');
    };
    /*-----------------------------------------------------------------------------------*/
    /*	侧边栏和主要内容大小匹配
     /*-----------------------------------------------------------------------------------*/
    var handleSidebarAndContentHeight = function () {
        var content = $('#content');
        var sidebar = $('#sidebar');
        var body = $('body');
        var height;
        if (body.hasClass('sidebar-fixed')) {
            height = $(window).height() - $('#header').height() + 1;
        } else {
            height = sidebar.height();
        }
        if (height >= content.height()) {
            content.attr('style', 'min-height:' + height - 40 + 'px !important');
        }
    };
    /*-----------------------------------------------------------------------------------*/
    /*	侧边栏
     /*-----------------------------------------------------------------------------------*/
    var handleSidebar = function () {
        jQuery('.sidebar-menu .has-sub > a').click(function () {
            var last = jQuery('.has-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);

            var thisElement = $(this);
            var slideOffeset = -200;
            var slideSpeed = 200;

            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(slideSpeed, function () {
                    if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                        App.scrollTo(thisElement, slideOffeset);
                    }
                    handleSidebarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(slideSpeed, function () {
                    if ($('#sidebar').hasClass('sidebar-fixed') == false) {
                        App.scrollTo(thisElement, slideOffeset);
                    }
                    handleSidebarAndContentHeight();
                });
            }
        });

        // Handle sub-sub menus
        jQuery('.sidebar-menu .has-sub .sub .has-sub-sub > a').click(function () {
            var last = jQuery('.has-sub-sub.open', $('.sidebar-menu'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);

            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200);
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200);
            }
        });
    };

    /*-----------------------------------------------------------------------------------*/
    /*	视图模式和列表模式的切换
     /*-----------------------------------------------------------------------------------*/
    // var listtoview = function() {
    //     alert(0);
    //     $(".maincon").hide();
    //     $("#mainlist-view").children().hide();
    //     if(mainconlist>0){
    //         alert(1);
    //         $(".maincon").eq(0).show();
    //         $("#mainlist-view").children().eq(0).show();
    //     }else {
    //         alert(2);
    //         $(".maincon").eq(1).show();
    //         console.log($(".maincon").eq(1));
    //         $("#mainlist-view").children().eq(1).show();
    //     }
    // };

    /*-----------------------------------------------------------------------------------*/
    /*	响应边栏崩溃
     /*-----------------------------------------------------------------------------------*/
    var responsiveSidebar = function () {

        var height = $(window).height();
        if ($("#content").offset()) {
            $("#content").height(height - $("#content").offset().top);
        }
        //侧边栏崩溃屏幕宽度
        var width = $(window).width();

        if (width < 900) {
            is_mobile = false;
            mainconlist = 1;
            localStorage.mainconlist = 1;
            $('#bodys').css({
                "width": "100%",
                "minWidth": "`1360px",
                "overflow-x": 'auto',
                "overflow-y": 'hidden'
            });
            //完全隐藏侧边栏
            // jQuery('#main-content').addClass("margin-left-0");
            //显示wap特有组件隐藏pc组件
            // $(".nomobilediv").hide();
            // $(".mobilediv").show();
            //wap版只显示列表模式
            // $(".grid-view-container").hide();
            // $(".list-view-container").show();
            // $(".maincon").height($(window).height()-$("#header").outerHeight(true)-$('#topbar').outerHeight(true)-$("#urlbar").outerHeight(true));
            // $(".list-view-item .operate").addClass("mobile-operate");
        } else {
            $('#bodys').css({
                "width": "100%",
                "overflow-x": "auto",
                "overflow-y": 'hidden'
            });
            is_mobile = false;
            //显示侧边栏完全
            jQuery('#main-content').removeClass("margin-left-0");
            var menu = $('.sidebar');
            if (menu.parent('.slimScrollDiv').size() === 1) { // 在调整破坏现有的实例
                menu.slimScroll({
                    destroy: true
                });
                menu.removeAttr('style');
                $('#sidebar').removeAttr('style');
            }
            //显示pc版特有组件隐藏wap组件
            $(".mobilediv").hide();
            $(".nomobilediv").show();
            var height2 = $(window).height() - $("#header").outerHeight(true) - $('.tab-menu ').outerHeight(true) - 30 - 100;

            if (height2 < 500) {
                height2 = 500;
            }
            $('.comment-list').height(height2);
            $('.shares').height(height2);
            $(".maincon").css('overflow', 'auto');
            $(".maincon").height($(window).height() - $("#header").outerHeight(true) - $("#topbar").outerHeight(true) - $("#urlbar").outerHeight(true) - 50);

            /*var hm=$(window).height()-$("#header").outerHeight(true)-$("#topbar").outerHeight(true)-$("#urlbar").outerHeight(true)-5;
            $(".maincon").height(hm);*/
            $(".list-view-item .operate").removeClass("mobile-operate");

        }
    };
    /*-----------------------------------------------------------------------------------*/
    /*	处理固定侧边栏
     /*-----------------------------------------------------------------------------------*/
    var handleFixedSidebar = function () {
        var menu = $('.sidebar-menu');

        if (menu.parent('.slimScrollDiv').size() === 1) { // 在更新高度之前销毁现有实例
            menu.slimScroll({
                destroy: true
            });
            menu.removeAttr('style');
            $('#sidebar').removeAttr('style');
        }

        if ($('.sidebar-fixed').size() === 0) {
            handleSidebarAndContentHeight();
            return;
        }

        var viewport = getViewPort();
        if (viewport.width >= 992) {
            var sidebarHeight = $(window).height() - $('#header').height() + 1;

            menu.slimScroll({
                size: '7px',
                // color: '#a1b2bd',
                color: '#cdd2d2',
                opacity: .3,
                height: sidebarHeight,
                allowPageScroll: false,
                disableFadeOut: false
            });
            handleSidebarAndContentHeight();
        }
    };
    /*-----------------------------------------------------------------------------------*/
    /*	窗口调整大小的功能
     /*-----------------------------------------------------------------------------------*/
    jQuery(window).resize(function () {
        setTimeout(function () {
            // leftMenu();
            handleSidebarAndContentHeight();
            checkLayout();
            handleFixedSidebar();
            handleNavbarFixedTop();
            runResponsiveFunctions();
            handleSidebar(); //显示侧边栏（正常默认模式）
            responsiveSidebar();		//侧边栏的响应处理
            commentListSlimScroll();
        }, 50); //等待，直到完成50ms窗口大小调整。
    });

    /*即时通讯成员列表滚动条*/
    var commentListSlimScroll = function () {
        var height = $('.comment-list').height();//滚动
        $('.comment-list').slimScroll({
            width: '380px', height: height,
            disableFadeOut: false, //是否 鼠标经过可滚动区域时显示组件，离开时隐藏组件
            railVisible: false//是否 显示轨道
        });
    };
    /*-----------------------------------------------------------------------------------*/
    /*	滚动条插件调用SlimScroll
     /*-----------------------------------------------------------------------------------*/
    var handleSlimScrolls = function () {
        if (!jQuery().slimScroll) {
            return;
        }
        $('.grid-view').each(function () {
            $(this).slimScroll({
                size: '7px',
                // color: '#a1b2bd',
                color: '#cdd2d2',
                height: '100%',
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                railOpacity: 0.1,
                disableFadeOut: true
            });
        });
    };

    /*-----------------------------------------------------------------------------------*/
    /* 初始化 Timeago
     /*-----------------------------------------------------------------------------------*/
    var initTimeAgo = function () {
        jQuery("abbr.timeago").timeago();
    };

    /*-----------------------------------------------------------------------------------*/
    /*	滑块  jQuery UI Sliders
     /*-----------------------------------------------------------------------------------*/
    var handleSliders = function () {
        function repositionTooltip(e, ui) {
            var div = $(ui.handle).data("bs.tooltip").$tip[0];
            var pos = $.extend({}, $(ui.handle).offset(), {
                width: $(ui.handle).get(0).offsetWidth,
                height: $(ui.handle).get(0).offsetHeight
            });

            var actualWidth = div.offsetWidth;

            tp = {left: pos.left + pos.width / 2 - actualWidth / 2};
            $(div).offset(tp);

            $(div).find(".tooltip-inner").text(ui.value);
        }

        $("#slider").slider({value: 15, slide: repositionTooltip, stop: repositionTooltip});
        $("#slider .ui-slider-handle:first").tooltip({
            title: $("#slider").slider("value"),
            trigger: "manual"
        }).tooltip("show");

        $("#slider-default").slider();

        $("#slider-range").slider({
            range: true, min: 0, max: 500, values: [75, 300]
        });

        $("#slider-range-min").slider({
            range: "min", value: 37, min: 1, max: 700, slide: function (a, b) {
                $("#slider-range-min-amount").text("$" + b.value)
            }
        });

        $("#slider-range-max").slider({
            range: "max", min: 1, max: 700, value: 300, slide: function (a, b) {
                $("#slider-range-max-amount").text("$" + b.value)
            }
        });

        $("#slider-vertical-multiple > span").each(function () {
                var a = parseInt($(this).text(), 10);
                $(this).empty().slider({
                        value: a, range: "min", animate: true, orientation: "vertical"
                    }
                )
            }
        );
        $("#slider-vertical-range-min").slider({
            range: "min", value: 400, min: 1, max: 600, orientation: "vertical"
        });
        $("#slider-horizontal-range-min").slider({
            range: "min", value: 600, min: 1, max: 1000
        });
    };

    /*-----------------------------------------------------------------------------------*/
    /*	自定义选项卡
     /*-----------------------------------------------------------------------------------*/
    var handleCustomTabs = function () {
        var adjustMinHeight = function (y) {
            $(y).each(function () {
                var A = $($($(this).attr("href")));
                var z = $(this).parent().parent();
                if (z.height() > A.height()) {
                    A.css("min-height", z.height())
                }
            })
        };
        $("body").on("click", '.nav.nav-tabs.tabs-left a[data-toggle="tab"], .nav.nav-tabs.tabs-right a[data-toggle="tab"]', function () {
            adjustMinHeight($(this))
        });
        adjustMinHeight('.nav.nav-tabs.tabs-left > li.active > a[data-toggle="tab"], .nav.nav-tabs.tabs-right > li.active > a[data-toggle="tab"]');
        if (location.hash) {
            var w = location.hash.substr(1);
            $('a[href="#' + w + '"]').click()
        }
    };
    var removerightul = function () {
        $(".compressed-context").remove();
    };
    /*-----------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------*/
    /*	Typeahead   typeahead插件实现搜索框自动补全
     /*-----------------------------------------------------------------------------------*/
    var handleTypeahead = function () {
        $('#autocomplete-example').typeahead({
            name: 'countries',
            local: ["red", "blue", "green", "yellow", "brown", "black"]
        });
    };
    /*-----------------------------------------------------------------------------------*/
    /*	根据输入内容自动调整文本框高度的Jquery插件 Autosize
     /*-----------------------------------------------------------------------------------*/
    var handleAutosize = function () {
        $('textarea.autosize').autosize();
        $('textarea.autosize').addClass('textarea-transition');
    };
    /*-----------------------------------------------------------------------------------*/
    /*	jquery Counatble 输入和文本字符计数器
     /*-----------------------------------------------------------------------------------*/
    var handleCountable = function () {
        $('.countable').simplyCountable();
    };
    /*-----------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------*/
    /*	Uniform Query表单美化
     /*-----------------------------------------------------------------------------------*/
    var handleUniform = function () {
        $(".uniform").uniform();
    };
    /*-----------------------------------------------------------------------------------*/
    /*	所有的复选框
     /*-----------------------------------------------------------------------------------*/
    var handleAllUniform = function () {
        $("select, input[type='checkbox']").uniform();
    };
    /*-----------------------------------------------------------------------------------*/
    /*	处理背景延伸 Handle Backstretch
     /*-----------------------------------------------------------------------------------*/
    /* var handleBackstretch = function () {
         $.backstretch([
             "images/1.jpg"
             , "images/2.jpg"
             , "images/3.jpg"
             , "images/4.jpg"
         ], {duration: 3000, fade: 750});
    };*/// 提取到登陆页面使用
    /*-----------------------------------------------------------------------------------*/

    /*-----------------------------------------------------------------------------------*/
    /*	顶部导航栏固定
     /*-----------------------------------------------------------------------------------*/
    var handleNavbarFixedTop = function () {
        if (is_mobile && is_fixed_header) {
            //Manage margin top
            $('#main-content').addClass('margin-top-100');
        }
        if (!(is_mobile) && is_fixed_header) {
            //Manage margin top
            $('#main-content').removeClass('margin-top-100').addClass('margin-top-50');
        }
    };

    //
    var backDiv = function () {
        var $div = $('#grid-view');
        $div.addClass('item-active').siblings().removeClass('item-active');
    };


    //鼠标右键
    var contextjs = function () {

        context.destroy('.item-listview');
        context.destroy('.grid-view-item');
        context.attach('.item-listview', [  //选取的对象
            {header: '企业知识库软件'},
            {
                text: '查看', href: 'javascript:;',
                subMenu: [
                    {
                        text: '列表', action: function (e) {
                            e.preventDefault();
                            changeviews("list");
                        }
                    },
                    {
                        text: '缩略图', action: function (e) {
                            e.preventDefault();
                            changeviews("thumbnail");
                        }
                    }
                ]
            },
            {
                text: '排序方式', href: 'javascript:;',
                subMenu: [
                    {
                        text: '名称', action: function (e) {
                            e.preventDefault();
                            var value = "0";
                            sortBtn(value);
                        }
                    },
                    {
                        text: '大小', action: function (e) {
                            e.preventDefault();
                            var value = "1";
                            sortBtn(value);
                        }
                    },
                    {
                        text: '修改时间', action: function (e) {
                            e.preventDefault();
                            var value = "2";
                            sortBtn(value);
                        }
                    }
                ]
            },
            {
                text: '刷新', action: function (e) {
                    e.preventDefault();
                    filePath();
                }
            },
            {
                text: '新建文件夹', powname: "8",  action: function (e) {
                    e.preventDefault();
                    NewFolder();
                }
            },
            {header: '@戴西软件版权所有'}
        ], function () {
            $(".grid-view-item,.list-view-item").removeClass("item-active");
        });
        context.attach('.Base1 .grid-view-item,.Base3 .grid-view-item,.departmentBase .grid-view-item,.Base2 .second_item,.Base55 .grid-view-item,.Base66 .grid-view-item,.Base77 .grid-view-item,' +
            '.Base1 .list-view-item,.Base3 .list-view-item,.departmentBase .list-view-item,.Base2 .second_list_er,.Base55 .list-view-item,.Base66 .list-view-item,.Base77 .list-view-item', [
            {header: '企业知识库软件'},
            {
                text: '打开', powname: "7", action: function (e) {
                    e.preventDefault();
                    fileNameClicked();
                }
            },
            {
                text: '分享', powname: "1", action: function (e) {
                    e.preventDefault();
                    shareModal();
                }
            },
            {
                text: '下载', powname: "2", action: function (e) {
                    e.preventDefault();
                    downModal();
                }
            },
            {
                text: '删除', powname: "6", action: function (e) {
                    e.preventDefault();
                    delModal();
                }
            },
            {
                text: '复制', powname: "3", action: function (e) {
                    e.preventDefault();
                    copyModal();
                }
            },
            {
                text: '重命名', powname: "4", action: function (e) {
                    e.preventDefault();
                    renameModal();
                }
            },
            {
                text: '移动', powname: "5", action: function (e) {
                    e.preventDefault();
                    moveModal();
                }
            },
            {header: '@戴西软件版权所有'},
        ], function clickdiv(e, clickdiv) { //发生点击时间的回调函数 e点击事件  clickdiv被点击的元素
            if (e.which == 3)// 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
            {
                $(clickdiv).siblings().removeClass("item-active");
                $(clickdiv).addClass("item-active");
            }
        });
    };

    //我的资料库-一级目录
    var Datecontextjs = function () {
        context.destroy('.list-view-item');
        context.destroy('.item-listview');
        context.destroy('.grid-view-item');
        context.attach('.item-listview', [  //选取的对象
            {header: '企业知识库软件'},
            {
                text: '查看', href: 'javascript:;',
                subMenu: [
                    {
                        text: '列表', action: function (e) {
                            e.preventDefault();
                            changeviews("list");
                        }
                    },
                    {
                        text: '缩略图', action: function (e) {
                            e.preventDefault();
                            changeviews("thumbnail");
                        }
                    }
                ]
            },
            {
                text: '排序方式', href: 'javascript:;',
                subMenu: [
                    {
                        text: '名称', action: function (e) {
                            e.preventDefault();
                            var value = "0";
                            sortBtn(value);
                        }
                    },
                    {
                        text: '大小', action: function (e) {
                            e.preventDefault();
                            var value = "1";
                            sortBtn(value);
                        }
                    },
                    {
                        text: '修改时间', action: function (e) {
                            e.preventDefault();
                            var value = "2";
                            sortBtn(value);
                        }
                    }
                ]
            },
            {
                text: '刷新', action: function (e) {
                    e.preventDefault();
                    filePath();
                }
            },
            /*  {text: '新建文件夹',action:function(e){
                      e.preventDefault();
                      NewFolder();
                  }},*/
            {header: '@戴西软件版权所有'}
        ], function () {
        });
        context.attach('.Base2 .first_item,.Base2 .first_list_fir', [
            {header: '企业知识库软件'},
            {
                text: '打开', powname: "7", action: function (e) {
                    e.preventDefault();
                    fileNameClicked();
                }
            },
            {header: '下载'},
            {header: '分享'},
            {header: '复制'},
            {header: '移动'},
            {header: '重命名'},
            {header: '删除'},
            {header: '@戴西软件版权所有'}
        ], function clickdiv(e, clickdiv) { //发生点击时间的回调函数 e点击事件  clickdiv被点击的元素
            if (e.which == 3)// 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
            {
                $(clickdiv).siblings().removeClass("item-active");
                $(clickdiv).addClass("item-active");
                listenactiveitem();
            }
        });
    };
    /*-----------------------------------------------------------------------------------*/
    /*	Listview鼠标悬浮按钮
     /*-----------------------------------------------------------------------------------*/
    var listhover = function () {
        $(".list-view-item").mouseover(function () {
            // $(".list-view-item").find(".dropdown-menu").hide(); //悬浮隐藏
            var powerid = $('.active').find('a').attr('powerid');
            var icon = $(this).find('.typeIcon');
            var arr = new Array(); //文档云
            arr = powerid.split(',');  //a权限字符转换为数组
            if(powerid.indexOf("5") != -1||powerid.indexOf("3") != -1||powerid.indexOf("4") != -1||powerid.indexOf("6") != -1){
                $(this).find('.setICon').removeClass('hide');
            }
            for(var i=0; i<icon.length; i++){
                for (var k = 0; k < arr.length; k++) {
                    if(icon.eq(i).attr("type") != "undefined" ){
                        if(arr[k] == icon.eq(i).attr("powname")){
                            icon.eq(i).removeClass('hide');
                        }
                    }
                }
            }
            $(this).find(".operate").css("display", "inline-block");
            if (($(window).height() - $(this).offset().top) < 150) {
                $(this).find(".btn-group").addClass("dropup");
            } else {
                $(this).find(".btn-group").removeClass("dropup");
            }
            if ($(window).width() < 768) {
                $(this).find(".operateclose").css({
                    "display": "inline-block",
                    "color": "red",
                    "position": "absolute",
                    "font-size": "18px",
                    "right": "10px"
                });
            } else {
                $(this).find(".operateclose").css("display", "none");
            }
        });

        $(".list-view-item").mouseout(function () {
            $(this).find(".operate").hide();
            $(this).find(".operateclose").hide();
        });
    };
    /*-----------------------------------------------------------------------------------*/
    /*	鼠标左键
     /*-----------------------------------------------------------------------------------*/

    var leftcontext = function () {
        //单击列表
        $(".grid-view-item,.list-view-item").off("click").on("click", function (e) {
            // e.stopPropagation();
            if ($('.list-view-item').find('td').eq(0).attr("colspan") == 4) {
                $('.list-view-item').removeClass('.list-view-item');
                return;
            }
            //一级目录-隐藏
            var type = $(".active").find('a').attr("type");
            if (type == 2 && $("#urlbar").find(".dir").text() == "" && $("#teamForm option").size()>1) {
                $("#activebtn").find("a").addClass('hide');
            }
            if (e.which == 1 && e.ctrlKey && $(this).hasClass("item-active")) {
                $(this).removeClass("item-active");
            } else if (e.which == 1 && e.ctrlKey && !$(this).hasClass("item-active")) {
                $(this).addClass("item-active");
            } else {
                $(this).siblings().removeClass("item-active");
                $(this).addClass("item-active");
            }
            listenactiveitem();
        });

        // var selDiv = null;
        $(".item-listview").off("mousedown").on("mousedown", function (e) {
            if (e.which == 1 && (!e.ctrlKey)) {
                $(".grid-view-item,.list-view-item").removeClass("item-active");
            }

            var selList = [];
            var fileNodes = $(".grid-view-item,.list-view-item");
            for (var i = 0; i < fileNodes.length; i++) {
                selList.push(fileNodes[i]);
            }
            var isSelect = true;
            var evt = window.event || arguments[0];

            //鼠标按下时的位置
            var startX = (evt.clientX || evt.x);
            var startY = (evt.clientY || evt.y);
            //框选的框的生成
            if ($('.selectDiv').length <= 0) {
                var selDiv = document.createElement("div");
                selDiv.style.cssText = "position:fixed;width:0px;height:0px;font-size:0px;margin:1px 0;padding:0px;border:1px dashed #f7abab;background-color:#f7d4d4;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";
                selDiv.className = "selectDiv";
                document.body.appendChild(selDiv);
            }
            else {
                var selDiv = $('.selectDiv')[0];
            }
            selDiv.style.left = startX + "px";
            selDiv.style.top = startY + "px";
            // debugger;

            var _x = null;
            var _y = null;

            clearEventBubble(evt);

            //拖拽框移动事件
            function docMove(e) {
                evt = window.event || arguments[0];
                if (isSelect) {
                    //生成拖拽框的位置
                    if (selDiv.style.display == "none") {
                        selDiv.style.display = "";
                    }

                    _x = (evt.clientX || evt.x);
                    _y = (evt.clientY || evt.y);
                    selDiv.style.left = Math.min(_x, startX) + "px";
                    selDiv.style.top = Math.min(_y, startY) + "px";
                    selDiv.style.width = Math.abs(_x - startX) + "px";
                    selDiv.style.height = Math.abs(_y - startY) + "px";

                    var selDivOffset = selDiv.getBoundingClientRect();

                    for (var i = 0; i < selList.length; i++) {
                        var item = selList[i];
                        var offset = item.getBoundingClientRect();
                        if(offset.right>=selDivOffset.left && offset.left <= selDivOffset.right && offset.top-1 <= selDivOffset.bottom && offset.bottom >= selDivOffset.top){
                            if (selList[i].className.indexOf("item-active") == -1) {
                                selList[i].className = selList[i].className + " item-active";
                            }
                        }
                        else {
                            if (selList[i].className.indexOf("item-active") != -1) {
                                selList[i].className = "grid-view-item";
                            }
                        }
                    }
                }
                clearEventBubble(evt);
            }
            function docUp(e) {
                document.removeEventListener("mousemove", docMove, true);
                document.removeEventListener("mouseup", docUp, true);
                isSelect = false;
                if (selDiv) {
                    $('div').remove('.selectDiv');
                    // document.body.removeChild(document.getElementById('selectDiv'));
                    showSelDiv(selList);
                }
                selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null;
            }

            document.addEventListener("mousemove", docMove, true);
            document.addEventListener("mouseup", docUp, true);
        });

        //清楚默认事件
        function clearEventBubble(evt) {
            if (evt.stopPropagation)
                evt.stopPropagation();
            else
                evt.cancelBubble = true;
            if (evt.preventDefault)
                evt.preventDefault();
            else
                evt.returnValue = false;

        }

        function showSelDiv(arr) {
            var count = 0;
            var selInfo = "";
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].className.indexOf("item-active") != -1) {
                    count++;
                    selInfo += arr[i].innerHTML + "\n";
                }
            }
            listenactiveitem();
        }
    };
    //超管-右键
    var viewContextjs = function () {
        context.destroy('.Grid_directory_view');
        context.init({
            fadeSpeed: 200,
            filter: function ($obj) {
            },
            above: 'auto',
            preventDoubleContext: false,
            compress: true
        });
        context.attach('.Grid_directory_view', [
            {header: '企业知识库软件'},
            {
                text: '打开', action: function (e) {
                    e.preventDefault();
                    fileNameClicked();
                }
            },
            {header: '下载'},
            {header: '分享'},
            {header: '复制'},
            {header: '移动'},
            {header: '重命名'},
            {header: '删除'},
            {header: '@戴西软件版权所有'}
        ], function clickdiv(e, clickdiv) { //发生点击时间的回调函数 e点击事件  clickdiv被点击的元素
            if (e.which == 3)// 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键
            {
                $(clickdiv).siblings().removeClass("item-active");
                $(clickdiv).addClass("item-active");
                listenactiveitem();
            }
        });
    };


    /*-----------------------------------------------------------------------------------*/
    /*	配置文件编辑
     /*-----------------------------------------------------------------------------------*/
    var handleProfileEdit = function () {
        $(".datepicker").datepicker();
    };

    return {
        //mouse
        mouse: function () {
            removerightul();
            leftcontext();
            contextjs();
            listhover();
        },
        //我的资料库 - 一级目录
        myDatemouse: function () {
            removerightul();
            leftcontext();
            Datecontextjs();
            listhover();
        },
        //超级管理员
        Admcontext: function () {
            removerightul();
            leftcontext();
            viewContextjs();
        },
        back: function () {
            backDiv();
        },

        //初始化主题页面
        resize: function () {
            handleSidebarAndContentHeight();
            checkLayout();
            handleFixedSidebar();
            handleNavbarFixedTop();
            runResponsiveFunctions();
            handleSidebar(); //显示侧边栏（正常默认模式）
            responsiveSidebar();		//侧边栏的响应处理
            commentListSlimScroll();
        },

        init: function () {

            if (App.isPage("index")) {
                leftMenu();
            }
            if (App.isPage("sliders_progress")) {
                handleSliders(); //显示滑块
            }
            if (App.isPage("forms")) {
                handleTypeahead();	//显示自动完成功能
                handleAutosize(); //处理文本框
                handleCountable(); //处理字符计数
                handleUniform();	//处理统一输入的功能
            }
            if (App.isPage("calendar")) {
                handleUniform();	//处理 uniform inputs
            }
            if (App.isPage("login")) {
                handleUniform();	//处理 uniform inputs
            }
            if (App.isPage("wizards_validations")) {
                handleUniform();	//处理 uniform inputs
            }
            if (App.isPage("login_bg")) {
                handleUniform();	//处理uniform inputs
                //handleBackstretch();	//处理 background images
            }
            if (App.isPage("chats")) {
                initTimeAgo(); //初始化 timestamps
            }
            if (App.isPage("orders")) {
                initTimeAgo(); //初始化 timestamps
            }
            if (App.isPage("user_profile")) {
                handleUniform();	//处理 uniform inputs
                handleProfileEdit();	//处理 profile edit tab
            }
            if (App.isPage("mini_sidebar")) {
                collapseSidebar();	//显示 mini menu
            }
            if (App.isPage("fixed_header_sidebar")) {
                handleFixedSidebar();	//显示 fixed sidebar
            }
            //所有页面都运行的
            // listtoview(); //视图模式和列表模式的切换
            handleSlimScrolls(); //slimscrolls超出滚动条
//            handleAlerts(); //alerts提示弹框
            handleCustomTabs(); //自定义选项卡的最小高度
            handleSidebarAndContentHeight();
            //转到顶部的按钮
            handleNavbarFixedTop();		//检查和处理如果导航栏是固定顶部FixedTop样式
//			listhover();  //悬浮
            handleFixedSidebar();
            handleSidebarAndContentHeight();
            commentListSlimScroll();//聊天滚动条;
            //contextjs();

        },

        //设置页面名字
        setPage: function (name) {
            currentPage = name;
        },
        //判断页面名字
        isPage: function (name) {
            return currentPage == name ? true : false;
        },
        //公共函数添加回调函数，该函数将在窗口大小上调用
        addResponsiveFunction: function (func) {
            responsiveFunctions.push(func);
        },
        // 初始化 uniform 元素
        initUniform: function (els) {
            if (els) {
                jQuery(els).each(function () {
                    if ($(this).parents(".checker").size() == 0) {
                        $(this).show();
                        $(this).uniform();
                    }
                });
            } else {
                handleAllUniform();
            }
        },
    };
}();


/*-----------------------------------------------------------------------------------*/
/*	监听激活item事件 工具栏 分享~标记隐藏
 /*-----------------------------------------------------------------------------------*/
var listenactiveitem = function () {

    if (sessionStorage.activehide == '1') {
        if ($("#My-database").parent().hasClass("active")) {
            $(".activebtn").children().eq(6).removeClass('hide');
        } else {
            $(".activebtn").children().eq(6).hide();
        }
    } else if (sessionStorage.activehide == '0') {
        if ($("#My-database").parent().hasClass("active")) {
            $(".activebtn").children().eq(7).removeClass('hide');
        } else {
            $(".activebtn").children().eq(7).hide();
        }
    }
    /*  if(!$("#My-database").parent().hasClass("active")){
          $(".activebtn").children().eq(6).hide();
      }*/
    $("#activebtn").removeClass('hide');
    //分享1 下载2 删除2 复制3 重命名4 移动5 删除6 打开7 新建文件夹8 添加目录9 上传10 11权限 12历史版本 13 模型可视化
    var type = $(".active").find("a").attr("type");
    var powerid = $(".active").find("a").attr("powerid"); //所有a权限type值
    if( typeof(powerid) == "undefined"){
        return;
    }
    //dataTables 数据空
    if ($('tr').find('td').eq(0).attr("colspan") == 4) {
        $('tr').removeClass('list-view-item');
        $("#activebtn").find('a').addClass('hide');
        return;
    }

    var arr = new Array(); //文档云
    arr = powerid.split(',');  //a权限字符转换为数组

    var btnType = $("#topbar").find(".typeClass");  //所有a.typeClass的type值
    var teamlenght = $("#teamForm option").size();
    if (type == 2 && teamlenght > 1 && $("#urlbar li").size() == 1) {
        $(".activebtn").addClass('hide');
    } else {
        if ($(".item-active").length > 1) {
            //文档云
            for(var i=0;i<btnType.length;i++){ // a.typeClass的type值
                for (var k = 0; k < arr.length; k++) {  //powerid权限值
                    if(btnType.eq(i).attr("type") != "undefined"){
                        if(arr[k] == btnType.eq(i).attr("type")){
                            btnType.eq(i).removeClass('hide');
                        }
                    }
                }
            }
            $("#activebtn").find('a').eq(0).addClass('hide'); //分享
            $("#activebtn").find('a').eq(4).addClass('hide');
        } else if ($(".item-active").length == 1) {
            //文档云
            for(var i=0;i<btnType.length;i++){ // a.typeClass的type值
                for (var k = 0; k < arr.length; k++) {  //powerid权限值
                    if(btnType.eq(i).attr("type") != "undefined" ){
                        if(arr[k] == btnType.eq(i).attr("type")){
                            btnType.eq(i).removeClass('hide');
                        }
                    }
                }
            }
        }else if ($(".item-active").length < 1) {
            $("#activebtn").addClass('hide');
        }
    }
    sessionStorage.activelength = $(".item-active").length;
};
