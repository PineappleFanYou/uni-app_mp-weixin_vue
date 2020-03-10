<template>
<view>
<view class="home_tab">
    <view class="home_table_title">
        <view class="title_inner">
           <uni-segmented-control
      :current="current"
      :values="items.map(v=>v.title)"
      @clickItem="onClickItem"
      style-type="text"
      active-color="#FFC0CB"
    ></uni-segmented-control>
    </view>
    <view class="iconfont iconsearch"></view>
  </view>

  <view class="home_tab_content">
         <view class="content">
      <view v-if="current === 0">
          <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
          <home-category></home-category>
      </view>
      <view v-if="current === 2">
          <home-new></home-new>
      </view>
      <view v-if="current === 3">
          <home-album></home-album>
      </view>
    </view>
  </view>
  </view>
</view>
</template>
<script>
import homeRecommend from "@/pages/home/home-recommend/index";
import homeCategory from "@/pages/home/home-category/index";
import homeNew from "@/pages/home/home-new/index";
import homeAlbum from "@/pages/home/home-album/index";
import {uniSegmentedControl} from "@dcloudio/uni-ui";
export default {
  components: {
    homeRecommend,
    homeCategory,
    homeNew,
    homeAlbum, 
    uniSegmentedControl
  },
  data() {
    return {
      items: [
          {title:"推荐"},
          {title:"分类"},
          {title:"最新"},
          {title:"专辑"}
      ],
      current: 0
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
</script>
<style lang="scss">
.home_tab {
    .home_table_title {
        position: relative;
        .title_inner {
            width: 60%;
            margin: 0 auto;
        }
        .iconsearch{
            position:absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 5%;
        }
    }
    .home_tab_conten{}
}

</style>