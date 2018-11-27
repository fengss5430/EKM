/**
 * Created by hxf on 2016/8/9.
 */
(function(ef)
{
	var path="";
	var type="";
    function SliceUpload(box,config) {
		type=$("#getPage").attr("type");
		if(type=="55" || type=="66" || type=="77"||type=="11" || type=="22" || type=="13"){
	    	path=getCurrentPath("1");
		}else if(type=="0"){
			path="";
		}else{
			path=getCurrentPath();
		}
        if(!config.url)return;
        this.box=box;
        this.config=config;
        this.sliceValue = 50*1024*1024;//每片最小单位(M),可通过config配置
        this.url = null;
        this.tempalte = $(
        		'<form method="POST" enctype="multipart/form-data">'+
        		'<div class="form-group"><label class="col-sm-3 control-label" style="line-height: 34px; text-align: right;">选择文件:</label><div class="col-sm-6">'+
        		'<input type="text" class="form-control" id="_upload_tool" name="InputUrl" readonly="readonly" path="'+type+'" fileurl="'+path+'"></div>'+
        		'<label class="btn btn-default" style="width: 100px">选择<input type="file" name="file" class="fileUpload" style="width:0;height: 0;opacity:0;" multiple="multiple"></label></div></form>');
        this.file = null;
        this.init();
        this.i = 0;
        this.suffix = null;
        this.successCallBack = $.noop;
        this.progressFun = $.noop;
        this.errorCallBack = $.noop;
        this.uploadOpt = null;
        if(config.isTrigger){ this.triggerUpload();}
        return this;
    }
    SliceUpload.isDom=true;
    SliceUpload.prototype.init = function () {
    	this.box.html("");
        this._header =
        {
            "Test-Method": "POST"
        };
        this.box.append(this.tempalte);
        if(this.config.url){this.url = this.config.url;}
        if(this.config.styleClass){this.tempalte.addClass(this.config.styleClass);}
        if(this.config.sliceValue){this.sliceValue = this.config.sliceValue;}
    };
    //SliceUpload.prototype.progress = function (e) {
    //    console.log(e);
    //    return obj = {loaded: e.loaded};
    //};
    var filepath=[];
    SliceUpload.prototype.addListener = function () {
//    	var type=$("#InputUrl").attr("path");    	
//    	var path=$("#InputUrl").attr("fileurl");
        var _self = this;
        var name = this.file.name,
            size = this.file.size,
            shardSize = this.sliceValue,
            shardCount = Math.ceil(size / shardSize);
        if(this.i > shardCount){
            return;
        }
        var start = this.i * shardSize,
            end = Math.min(size, start + shardSize);
        var form = new FormData();
        form.append("data", this.file.slice(start,end));
        this.suffix = (this.file.name.split(".")).pop();
        var filename=_.getUUID()+"."+this.suffix;
        if(type=="55" || type=="66" || type=="77"||type=="11" || type=="22" || type=="13"){
    		var modelnum=$("#modelnum").val();
    		 form.append("modelnum", modelnum);
    	}else{
    		form.append("modelnum", "");
    	}
        filepath.push(filename);
        form.append("filename", filename);
        form.append("name", name);
        form.append("type",type);
        form.append("path",path);
        form.append("num",this.i);
        form.append("shardCount",shardCount);
        form.append("filepath",filepath);
        _self.uploadOpt = $.ajax({
        	cache: false,
            url: _self.url,
            type: "POST",
            data: form,
            async: true,
            processData: false,
            contentType: false,
            headers:_self._header,
            success: function(data){
            	if(data){
        			var num = 100;
            		if(size==0){
            			filepath=[];
            			if(type!="0"){
            				modal("会话提示框", "上传成功!");
            			}
                    	$(".fadeMin").trigger('click');
                    	$("#MaxTwo").find('button').eq(0).removeClass('gray');
                        $("#upDocBtn").removeClass('gray');
                    	$("#output").addClass('hide');
                		 refreshCurrentPath();
            		}else{
            			_self.i = _self.i+1;
            			num = Math.ceil(_self.i*100 / shardCount);
            			if(num!=100){
            				_self.addListener(_self.file,_self.i);
            			}
            			if(_self.i==shardCount){
            				//data.result.last = 'over';
            				filepath=[];
            				if(type!="0"){
                				modal("会话提示框", "上传成功!");
                			}
            				$(".fadeMin").trigger('click');
            				$("#MaxTwo").find('button').eq(0).removeClass('gray');
            				$("#upDocBtn").removeClass('gray');
            				$("#output").addClass('hide');
            				if(type!="0"){
            					refreshCurrentPath();
            				}
            			}
            		}
            		_self.successCallBack(data,num);
                }
                else{
                    _self.errorCallBack();
                    $("#MaxTwo").find('button').eq(0).removeClass('gray');
                    $("#upDocBtn").removeClass('gray');
                }
            }
        });    
    };
    SliceUpload.prototype.uploadClick = function (success,error) {
        var _self = this;
        var f = this.box.find(".fileUpload");
        if($.trim(f.val())==''){
        	ef.placard.warn("请选择上传文件");
        	return;
        }
        this.file = this.box.find(".fileUpload")[0].files[0];
        this.file.uuid = _.getUUID();
        //if(progressFun){
        //    progressFun(_self.progress());
        //}
        if(success){
            _self.successCallBack = success;
            _self.errorCallBack = error;
        }
        this.addListener();
    };
    SliceUpload.prototype.triggerUpload = function () {
        var _self = this;
        this.box.find(".fileUpload").change(function () {
            _self.uploadClick();
        });
    };
    SliceUpload.prototype.change = function (fun) {
        var _self = this;
        this.box.find(".fileUpload").change(function () {
            _self.file = _self.box.find(".fileUpload")[0].files[0];
            _self.suffix = (_self.file.name.split(".")).pop();


            if(fun){fun(_self.suffix);}
        });
    };
    SliceUpload.prototype.stopPost = function (callback) {
        this.uploadOpt.abort();
        if(callback){callback();}
    };
    ef.register(SliceUpload,"sliceUpload");
})(ef);