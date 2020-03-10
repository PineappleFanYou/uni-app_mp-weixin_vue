<template>
    <view>
        <!-- 专辑背景 开始 -->
        <view class="album_bg">
            <image mode="widthFix" :src="album.cover"></image>
            <view class="album_info">
                <view class="album_name">{{album.name}}</view>
                <view class="album_btn">关注专辑</view>
            </view>
        </view>
        <!-- 专辑背景 结束 -->
        <!-- 专辑坐着 开始 -->
        <view class="ablum_author">
            <view class="ablum_author_info">
                <image mode="widthFix" :src="album.user.avatar"></image>
                <view class="author_name">{{album.user.name}}</view>
            </view>
            <view class="ablum_author_desc">
                <text>{{album.desc}}</text>
            </view>
        </view>
        <!-- 专辑坐着 结束 -->
        <!-- 专辑列表 开始 -->
        <viwe class="ablum_list">
        <view 
        class="ablum_list_img"
        v-for="(item,index) in wallpaper"
        :key="item.id">
        <go-detail :list="wallpaper" :index="index">
        <image :src="item.thumb" ></image>
        </go-detail>
        </view>
        </viwe>
        <!-- 专辑列表 结束 -->
    </view>
</template>
<script>
import goDetail from '@/components/goDetail'
export default {
    components: {
        goDetail,
    },
    data() {
        return {
            params: {
                limit: 30,
                order: 'new',
                skip: 0,
                // “1” 表示第一次请求 “0”表示不是第一次请求
                first: 1
            },
            //专辑信息
            album: {},
            // “专辑” 列表
            wallpaper: [],
            // 点击进来时候的id
            id: -1,
            hasMore:true
        }
    },
    onLoad(options) {
        this.id = options.id
        // this.id = options.id
        this.getList();
    },
    // 上拉触底事件
    onReachBottom() {
        if(this.hasMore) {
            this.params.first = 0;
            this.params.skip += this.params.limit;
            this.getList();
        }else {
            uni.showToast({
                title:"我是有底线的",
                icon:"none"
            })
        }
    },
    methods: {
        getList() {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                data: this.params
            })
            .then((result)=> {
                console.log(result)
                if(Object.keys(this.album).length === 0) {
                    this.album = result.res.album;
                }
                if(result.res.wallpaper.length === 0) {
                    this.hasMore = false;  
                    uni.showToast({
                        title:"我是有底线的",
                        icon:"none"
                    })            
                    return;
                }          
                this.wallpaper = [this.wallpaper,...result.res.wallpaper]
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.album_bg {
    position: relative;
    image {

    }
    .album_info {
        position: absolute;
        display: flex;
        justify-content: space-between;
        width: 100%;
        left: 0;
        bottom: 0;
        padding: 15rpx;
        align-items: center;
        height: 80rpx;
        .album_name {
            font-size: 36rpx;
            color: #fff;
        }
        .album_btn {
            font-size: 30rpx;
            color: #fff;
            width: 152rpx;
            height: 50rpx;
            background-color: pink;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10rpx;
        }
    }
}
.ablum_author {
    padding: 15rpx;
    .ablum_author_info {
        display: flex;
        image {
            width: 50rpx;
        }
        .author_name {
            font-size: 30rpx;
            font-weight: 600;
            color: #000;
            margin-left: 15rpx;
        }
    }
    .ablum_author_desc {
        font-size: 30rpx;
    }
}
.ablum_list {
    display: flex;
        flex-wrap: wrap;
    .ablum_list_img {
        border: 3rpx solid #fff;
        width: 33.33%;
        image {
            width: 100%;
            height: 160rpx;
        }
    }
}
</style>