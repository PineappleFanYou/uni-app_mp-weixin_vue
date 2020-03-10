// 这个文件封装wx.request请求

export default (pramas) =>{
    uni.showLoading({
        title:"加载中"
    })
    return new Promise ((resolve,reject)=>{
       wx.request({
           ...pramas,
           success(res) {
                resolve(res.data);
           },
           fail(err) {
                reject(err);
           },
           complete() {
            uni.hideLoading();
           }
       })
    })
}