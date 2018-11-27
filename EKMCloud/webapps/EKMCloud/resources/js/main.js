/**
 *
 */
$(function(){
	loadProperties();
});

function loadProperties(){
	jQuery.i18n.properties({ //加载资浏览器语言对应的资源文件
		name:'strings',  //资源文件名称
		path:'resources/i18n/',  //资源文件路径
		language: 'strings_zh-CN.properites',//语言类型zh或者en
		mode:'map',  //用Map的方式使用资源文件中的值
		callback: function() { //加载成功后设置显示内容

		//通过设置自定义属性属性值与properties值相同名遍历查找 */
			/*alert(jQuery.i18n.browserLang());  浏览器语言获取*/
			sessionStorage.language = jQuery.i18n.browserLang();
			$('*[languageset]').each(function(){
				var lag = $(this).attr('languageset');
				$(this).html($.i18n.prop(lag));
			});
		}
	});
}

