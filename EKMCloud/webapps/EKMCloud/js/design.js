/**
 * Created by llwang on 2017/5/19.
 */
/*可删掉*/
function deal(name){

    var suffix=['ai','bt','excel','html','js','mmap','mp4','pdf','ppt','psd','doc','xming','zip'];

    point= name.lastIndexOf(".");
    var type = name.substr(point);

    var str=type.replace('.','');

    for(var i=0;i<suffix.length;i++){
        if(str==suffix[i]){
            str=str+'.png';
        }
    }
    return str;

}
alert(deal("123.456.doc"));