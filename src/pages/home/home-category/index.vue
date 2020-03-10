<template>
    <view class="home_cate"> 
        <navigator 
        class="home_cate_item"
        v-for="item in category"
        :key="item.id"
        :url="`/pages/imgCategory/index?id=${item.id}`">
            <image mode="aspectFill" :src="item.cover"></image>
            <view class="home_cate_text">{{item.name}}</view>
        </navigator>
    </view>
</template>
<script>
export default {
    data() {
        return {
            category:[]
        }
    },
    mounted() {
         // 修改页面的标题
        uni.setNavigationBarTitle({title:'分类'})
        this.getList();
    },
    methods: {
        getList() {
            this.request({
                url:"http://157.122.54.189:9088/image/v1/vertical/category"
            })
            .then((result)=> {
                console.log(result);
                this.category = result.res.category;
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.home_cate {
        display: flex;
        flex-wrap: wrap;
        .home_cate_item {
            position: relative;
            width: 33.33%;
            border: 3rpx solid #fff;
            image {
                height: 240rpx;
            }
        }
        .home_cate_text {
            position: absolute;
            left: 0;
            bottom: 0;
            color: #ffffff;
            height: 50rpx;
            width: 100%;
            display: flex;
            align-items: center;
            padding-left: 20rpx;
        }
}
</style>