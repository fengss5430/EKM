/**
 * Created by llwang on 2016/12/13.
 */
/*
    *使用请在html标签上设置属性tnum=number
    *number为字符个数,中文则显示2个字符一个中文
    * number表示显示个数 超出个数则显示...
    * 使用调用函数 element.elli();
    * eg: $('[tnum]').elli();
*/

(function($){
	
    //限制字符个数
	$.fn.elli =function(tag){
		String.prototype.len = function()
			// 给string增加个len ()方法，计算string的字节数
		{
			return this.replace(/[^\x00-\xff]/g, "**").length;
		}
		this.each(function(){
			var maxwidth=$(this).attr("tnum");
			// console.log(maxwidth);
			var text=$(this).text();
			if(text.len()>maxwidth){
				$(this).attr("title",$(this).text());
				if(text.len()!=text.length){
					$(this).text($(this).text().substring(0,parseInt((maxwidth)/2)));
					$(this).html($(this).html()+'...');
				}else{
					$(this).text($(this).text().substring(0,maxwidth));
					$(this).html($(this).html()+'...');
				}

			}
		});
	};
	//超出显示...
   $("[tnum]").elli(); //初始化函数 现写入国际化main中
})(jQuery);