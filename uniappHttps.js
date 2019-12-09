module.exports = function(param){
	var url=param.url,
	    method =param.method ,
		header=param.header || {},
		data=param.data;
		
		if(method){
			method=method.toUpperCase();//变换成大写
			if(method=="POST"){
				header={"content-type":"application/x-www-form-urlencoded"}
			}
		}
		
		//加载动画
		if(!param.hideLoading){
			uni.showLoading({title:'加载中...'});
		}
		
		
		
		
		uni.request({
			url:url,
			method:method ||"GET",
			header:header,
			data:data,
			success:res =>{
				if(res.statusCode && res.statusCode != 200){
					uni.showModal({
						content:res.msg
					})
					return;
				}
				//这里是成功的需要回调一下数据
				
				typeof param.success == "function" && param.success(res.data);
				
				
			},
			fail:(e)=>{
				uni.showModal({
					content:e.meg
				})
				typeof param.fail == "function" && param.fail(e.data);
			},
			complete: () => {
			    console.log("网络请求完成！！");
			    uni.hideLoading();
			    typeof param.complete == "function" && param.complete();
			    return;
			}
			
		})
}
