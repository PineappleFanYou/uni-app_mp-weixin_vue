<template>
    <view>
        <!-- 用户信息 -->
        <view class="user_info">
            <view class="user_icon">
                <image mode="widthFix" :src="imgDetail.user.avatar"></image>
            </view>
            <view class="user_desc">
                <view class="user_name">{{imgDetail.user.name}}</view>
                <view class="user_time">{{imgDetail.cntime}}</view>
            </view>
        </view>
        <!-- 高清大图 -->
        <view class="high_img">
            <swiper-action @swiperAction="handleSwiperAction">
                <image mode="widthFix" :src="imgDetail.thumb"></image>
            </swiper-action>
            
        </view>
        <!-- 点赞 -->
        <view class="user_rank">
            <view class="rank">
                <text class="iconfont icondianzan">{{imgDetail.rank}}</text>
            </view>
            <view class="user_collect">
               <text class="iconfont iconshoucang">收藏</text> 
            </view>
        </view>
        <!-- 专辑 -->
        <view class="album_wrap" v-if="album.length">
            <view class="album_title">相关</view>
            <view class="album_list">
                <view 
                class="album_item"
                v-for="item in album"
                :key="item.id">
                    <view class="album_cover">
                        <image mode="aspectFill" :src="item.cover"></image>
                    </view>
                    <view class="album_info">
                        <view class="album_info_text">专辑</view>
                        <view class="album_name">{{item.name}}</view>
                        <text class="iconfont iconiconfontjiantou4"></text>
                    </view>
                </view>
            </view>
        </view>
        <!-- 最热评论 -->
        <view class="comment hot" v-if="hot.length">
            <!-- 标题 -->
            <view class="comment_title">
                <text class="iconfont iconhot1"></text>
                <text class="comment_text">最热评论</text>
            </view>
            <!-- 内容 -->
            <view class="comment_list">
                <view 
                class="comment_item"
                v-for="item1 in hot"
                :key="item1.id">
                <!-- 用户信息 -->
                    <view class="comment_user">
                        <!-- 用户头像 -->
                        <view class="user_icon"><image mode="widthFix" :src="item1.user.avatar"></image></view>
                        <!-- 用户名称 -->
                        <view class="user_name">
                            <view class="user_nickname">{{item1.user.name}}</view>
                            <view class="user_time">{{item1.cntime}}</view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="user_badge">
                            <image
                            v-for="item2 in item1.user.title"
                            :key="item2.icon"
                            :src="item2.icon"
                            ></image>
                        </view>
                    </view>
                    <!-- 评论数据 -->
                    <view class="comment_desc">
                        <view class="comment_content">{{item1.content}}</view>
                        <view class="comment_like">
                            <text class="iconfont icondianzan">{{item1.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 最新评论 -->
        <view class="comment new" v-if="comment.length">
            <!-- 标题 -->
            <view class="comment_title">
                <text class="iconfont iconpinglun"></text>
                <text class="comment_text">最新评论</text>
            </view>
            <!-- 内容 -->
            <view class="comment_list">
                <view 
                class="comment_item"
                v-for="item1 in comment"
                :key="item1.id">
                <!-- 用户信息 -->
                    <view class="comment_user">
                        <!-- 用户头像 -->
                        <view class="user_icon"><image mode="widthFix" :src="item1.user.avatar"></image></view>
                        <!-- 用户名称 -->
                        <view class="user_name">
                            <view class="user_nickname">{{item1.user.name}}</view>
                            <view class="user_time">{{item1.cntime}}</view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="user_badge">
                            <image
                            v-for="item2 in item1.user.title"
                            :key="item2.icon"
                            :src="item2.icon"
                            ></image>
                        </view>
                    </view>
                    <!-- 评论数据 -->
                    <view class="comment_desc">
                        <view class="comment_content">{{item1.content}}</view>
                        <view class="comment_like">
                            <text class="iconfont icondianzan">{{item1.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 下载 -->
        <view class="download">
            <view class="download_btn" @click="handleDownload">下载图片</view>
        </view>
    </view>
</template>
<script>
import moment from 'moment';
import swiperAction from "@/components/swiperAction";
moment.locale('zh-cn')
export default {
    components: {
        swiperAction
    },
    data() {
        return {
            // 图片信息对象
            imgDetail: {},
            //专辑数据
            album:[],
            //最新评论
            comment:[],
            //热门评论
            hot:[],
            imgIndex: 0
        }
    },
    onLoad() {
        // 1.整个专辑详情是根据imgIndex这个索引来改变的，如果索引改变，则可以上一张或者下一张
        const {imgList, imgIndex} = getApp().globalData;
        this.imgIndex = imgIndex;
        this.getData();
    },
    methods: {
        getComment(id) {
            this.request({
                url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
            })
            .then((result)=>{
                this.album = result.res.album;
                this.comment = result.res.comment;
                // 给hot 数组中的对象添加一个时间属性
                result.res.hot.forEach(v=>v.cntime=moment(v.atime * 1000).fromNow());
                result.res.comment.forEach((v,i)=>{
                    return v.cntiem = moment(v.atime * 1000).fromNow();
                })
                this.hot = result.res.hot;
            })
        },
        getData() {
                const {imgList, imgIndex} = getApp().globalData;
                this.imgDetail = imgList[this.imgIndex];
                this.imgDetail.cntime = moment(this.imgDetail.atime * 1000).fromNow();
                // 发送请求
                this.getComment(this.imgDetail.id);
        },
        // 滑动事件
        handleSwiperAction(e) {
            console.log(e);
            const {imgList} = getApp().globalData;
             // 1.这里要判断是左划还是右划，是根据 direction 和 this.imgIndex来判断
            // 2. 如果 direction === "right" && this.imgIndex > 0 , 那么就是可以右划
            // 3. 如果 direction === "left" && this.imgIndex < imgList.length - 1 的长度，那么就是左划
            if(e.direction === "left" && this.imgIndex < imgList.length - 1) {
                this.imgIndex++;
                // 还要记得重新发送请求
                this.getData();
            }else if(e.direction === "right" && this.imgIndex > 0) {
                this.imgIndex--;
                this.getData();
            }else {
                uni.showToast({
                    title: '没有数据了',
                    icon:"none"
                })
            }
        },
        async handleDownload() {
            try {
            await uni.showLoading({
                title:"下载中"
            })
            // 1 将远程文件下载到小程序的内存中 tempFilePath
            const result1 = await uni.downloadFile({ url: this.imgDetail.img });
            const { tempFilePath } = result1[1];
            //  2 将小程序内存中的临时文件下载到本地上
            const result2 = await uni.saveImageToPhotosAlbum({ filePath: tempFilePath });
                  uni.hideLoading();
            await uni.showToast({
                  title:"下载成功"
                  // icon
                })
            } catch (error) {
                await uni.showToast({
                  title:"下载失败"
                  // icon
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.user_info {
    display: flex;
    align-items: center;
    padding: 20rpx;
    .user_icon {
        image {
            width: 88rpx;
            border-radius: 50%;
        }
    }
    .user_desc {
        margin-left: 20rpx;
        .user_name {
            font-size: 30rpx;
            color: #000;
        }
        .user_time {
            font-size: 24rpx;
            color: #333;
        }
    } 
}
.user_rank {
    display: flex;
    height: 80rpx;
    .rank {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
    .user_collect {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
}
.album_wrap {
    padding: 20rpx;
    position: relative;
    
    .album_title {
        padding: 10rpx 0;
    }
    .album_list {
        
        .album_item {
            display: flex;
            border-bottom: 5px solid #cccccc;
            .album_cover {
                flex: 1;
                image {
                    width: 200rpx;
                    height: 200rpx;
                }
            }
        }
        .album_info {
            flex: 3;
            padding-left: 30rpx;
            .album_info_text {
                width: 80rpx;
                height: 50rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: pink;
                color: #fff;
            }
            .album_name {
                font-size: 30rpx;
                color: #000;
            }
            text {
                font-size: 40rpx;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 10%;
            }
        }
    }
}
.comment {
    .comment_title {
        padding: 20rpx;
        display: flex;
        align-items: center;
        .iconhot1 {
            font-size: 50rpx;
            color: red;
        }
        .comment_text {
            font-size: 36rpx;
            color: #000;
            font-weight: 600;
            margin-left: 20rpx;
        }
    }
}
.comment_list {
    .comment_item {
        border-bottom: 15rpx solid #eee;
        .comment_user {
            display: flex;
            padding: 20rpx 0;
            .user_icon {
                width: 15%;
                display: flex;
                justify-content: center;
                align-items: center;
                image {
                    width: 90%;
                }
            }
            .user_name {
                padding-left: 20rpx;
                flex: 1;
                .user_nickname {
                    color: #777;
                }
                .user_time {
                    color:#ccc;
                    font-size: 24rpx;
                    padding: 5rpx;
                }
            }
            .user_badge {
                image {
                    width: 40rpx;
                    height: 40rpx;
                    display: inline-block;
                }
            }
        }
        .comment_desc {
            display: flex;
            padding: 20rpx 0;
            .comment_content {
                flex:1;
                padding-left: 15%;
                color: #000;
            }
            .comment_like {
                text-align: right;
            }
        }
    }
}
.high_img {
    border: 2rpx solid #ccc;
}
.download {
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .download_btn {
        width: 90%;
        height: 85%;
       display: flex;
       font-size: 36rpx;
       font-weight: 600;
       justify-content: center;
       align-items: center;
       background-color: pink;
       color: #fff;
    }
}
</style>