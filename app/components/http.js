/**
 * Created by ZHTING on 2017/7/20.
 */
(function(angular){
	var http=angular.module('movieCat.services.http',[])
	http.service('HttpService',['$window','$document',function($window,$document){
		//console.log($document)
		this.jsonp=function(url,data,callback){
			var fnSuffix=Math.random().toString().replace('.','');
			var cdFuncName='my_json_cd'+fnSuffix;
			$window[cdFuncName]=callback;
			var queryString="url.indexOf('?')==-1"?'?':'&';
			for(var key in data){
				queryString+=key+'='+data[key]+'&';
			}

			queryString+='callback='+cdFuncName;
			var scriptElement=$document[0].createElement('script');
			scriptElement.src=url+queryString;
			$document[0].body.appendChild(scriptElement);

		}
	}])
})(angular)
