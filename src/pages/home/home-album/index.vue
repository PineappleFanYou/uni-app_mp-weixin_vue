<template>
    <scroll-view @scrolltolower="handleToLower" scroll-y="" class="home_album">
        <view class="album_swiper">
            <swiper 
            autoplay 
            indicator-dots
            circular>
                <swiper-item 
                v-for="item in banner"
                :key="item.id"
                >
                <image mode="widthFix" :src="item.thumb"></image>
                </swiper-item>
            </swiper>
        </view>
        <view class="album_list">
           <navigator
           class="album_item"
           v-for="item in album"
           :key="item.id"
           :url="`/pages/album/index?id=${item.id}`">
                <view class="album_img">
                    <image mode="aspectFill" :src="item.cover"></image>
            </view>
            <view class="album_info">
                <view class="album_name">{{item.name}}</view>
                <view class="album_desc">{{item.desc}}</view>
                <view class="album_btn">
                        <view class="album_attention">+ 关注</view>
                </view>
            </view>
           </navigator>
        </view>
    </scroll-view>
</template>
<script>
export default {
    data() {
        return {
            // 请求参数
            params: {
                limit:30,
                order:'new',
                skip:0
            },
            // 轮播图的数组
            banner:[],
            // 专辑的数据
            album:[],
            // 判断是否触底
            hasMore:true
        }
    },
    mounted() {
         // 修改页面的标题
        uni.setNavigationBarTitle({title:'专辑'});
        this.getList();
    },
    methods: {
        getList() {
            this.request({
                url:'http://157.122.54.189:9088/image/v1/wallpaper/album',
                data: this.params
            })
            .then((result)=>{
                if(result.res.album.length === 0) {
                    this.hasMore = false
                    return;
                }
                if(this.banner.length === 0) {
                // 轮播图的数据
                this.banner = result.res.banner;
                }
                 // es6 合并数据
                this.album = [...this.album,...result.res.album];

            })
        },
        handleToLower () {
            // 重新请求
            if(this.hasMore === true) {
                this.params.skip += this.params.limit;
                this.getList();
            }else {
                uni.showToast({
                    title:"我是有底线的",
                    icon:"none"
                })
            }
            
        }
    }
}
</script>
<style lang="scss" scoped>
.home_album {
    height: calc(100vh - 36px);
}
.album_swiper {     
    height: calc(750rpx / 2.3);
}
.album_list {
    padding: 10rpx;
    .album_item {
        display: flex;
        padding: 10rpx 0;
        border-bottom: 1rpx solid #333;
        
        .album_img {
            flex: 1;
            image {
                height: 200rpx;
                width: 200rpx;
            }
        }
        .album_info {
            flex: 2;
            padding: 0 10rpx;
            overflow: hidden;
            .album_name {
                font-size: 30rpx;
                color:#000;
                padding: 10rpx 0;
            }
            .album_desc {
                font-size: 24rpx;
                padding: 10rpx 0;
                color: #333;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .album_btn {
                display: flex;
                justify-content: flex-end;
                padding: 10rpx;  
                color: #0094ff;
                .album_attention {
                    border: 1rpx solid pink;
                    padding: 10rpx;
                }
            }
        }
    }
}
</style>