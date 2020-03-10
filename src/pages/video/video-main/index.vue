<template>
    <view>这个是主页面</view>
</template>
<script>
export default {
    props: {
        urlobj: Object
    },
    data:{
        params:{
            limit: 30,
            skip: 0,
            order: "new"
        }
    },
    watch:{
        urlobj() {
            this.getList();
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            this.request({
                url: "http://157.122.54.189:9088/videoimg/v1/videowp/category"
            })
            .then((result)=>{
                console.log(result);
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>