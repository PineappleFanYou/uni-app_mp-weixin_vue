<template>
    <scroll-view @scrolltolower="handleTolower" scroll-y class="recommed_view" v-if="recommeds.length>0">
        <!-- 推荐开始 -->
        <view class="recommed_wrap">         
                 <navigator
            class="recommed_item"
            v-for="item in recommeds"
            :key="item.id"
            :url="`/pages/album/index?id=${item.target}`">
            <image mode="widthFix" :src="item.thumb"></image>
            </navigator>         
        </view>
        <!-- 推荐结束 -->
        <!-- 月份开始 -->
        <view class="months_wrap">
            <view class="months_title">
                <view class="months_title_info">
                    <view class="months_info">
                        <text>{{months.DD}}/</text>
                        {{months.MM}}月
                    </view>
                    <view class="months_text">{{months.title}}</view>
                </view>
                <view class="months_title_more">
                    更多 >
                </view>
            </view>
            <view class="months_content">
            <view
            class="months_item"
            v-for="(item,index) in months.items"
            :key="item.id">
            <go-detail :list="months.items" :index="index">
                <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image> 
            </go-detail>       
            </view>
            </view>
        </view>
        <!-- 月份结束 -->
        <!-- 热门开始 -->
        <view class="hots_wrap">
            <view class="hots_wrap_title">
                <text>热门</text>
            </view>
            <view class="hots_wrap_content">
                <view 
            class="wrap_content_img"
            v-for="(item,index) in hots"
            :key="item.id"
            >
            <go-detail :list="hots" :index="index">
                <image mode="widthFix" :src="item.thumb"></image>
            </go-detail> 
                
            </view>
            </view>
        </view>
        <!-- 热门结束 -->
    </scroll-view>
   
</template>
<script>
import moment from 'moment';
import goDetail from '@/components/goDetail'
export default {
    components: {
        goDetail
    },
    data() {
        return {
            // 推荐
            recommeds:[],
            // 月份
            months:{},
            // 热门
            hots:[],
            // 请求的参数
            params:{
                // 要获取多少条
                limit:30,
                order:"hot",
                skip:0
            },
            // 判断是没有数据了-是否到底了
            hasMore:true
        }
    },
    // 这里是组件，没有onload等生命周期
    mounted() {
        this.getListData();
    },
    methods: {
        
        getListData() {
            this.request({
                url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
                data:this.params
            })
            .then((result)=>{
                if(result.res.vertical.length === 0) {
                    this.hasMore = false;
                    return;
                }
                // 这里做判断是：因为上面两个数据是不变的，我是只是请求下面的数据，所以不必每次都执行
                if(this.recommeds.length === 0) {
                this.recommeds = result.res.homepage[1].items;
                this.months = result.res.homepage[2];
                this.months.MM = moment(this.months.stime).format('MM');
                this.months.DD = moment(this.months.stime).format('DD');
                }
                // 热门的数据--数据叠加
                this.hots = [...this.hots,...result.res.vertical];
            })
        },
        handleTolower() {
            /* 
            1.修改参数-表示要跳过多少条数据   skip += limit;
            2.重新发送请求 getList()
            3.请求回来成功  hots 数据的叠加
            */
           if(this.hasMore) {
                this.params.skip += this.params.limit;
                this.getListData();
           } else {
               uni.showToast({
                   title:"我是有底线的",
                   icon:'none'
               })
           }
        }
    }
}
</script>
<style lang="scss" scoped>
.recommed_view {
    // 高度 = 屏幕的高度 - table栏的高度
    height: calc(100vh - 36rpx);
}
.recommed_wrap {
    display:flex;
    flex-wrap: wrap;
    .recommed_item {
        width: 50%;
        border: 5px solid #fff;
    }
}
.months_wrap{
    .months_title{
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        .months_title_info{
            color:pink;
            font-size: 30rpx;
            font-size: 600;
            display: flex;
            .months_info{
                
                text {
                    font-size: 36rpx;
                }
            }
            .months_text{
                font-size: 34rpx;
                color: #333;
                margin-left: 30rpx;
            }
        }
        .months_title_more{
            font-size: 24rpx;
            color:pink;
        }
    }
    .months_content{
        display: flex;
        flex-wrap: wrap;
        .months_item {
            width: 33.33%;
            border: 2rpx solid #fff;
        }
    }
}
.hots_wrap {
        
    .hots_wrap_title {
        padding: 10rpx;
        text {
            font-size: 30rpx;
            font-weight: 600;
            border-left: 10rpx solid #0094ff;      
        }
    }
    .hots_wrap_content {
        display: flex;
        flex-wrap: wrap;
        .wrap_content_img {
            border: 2rpx solid #fff;
            width: 33.33%;
        }
    }
}
</style>