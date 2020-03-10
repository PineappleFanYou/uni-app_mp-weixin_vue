<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*由于这个字体图标要全局使用，所以在这里引入 */
	@import './styles/base.wxss';
	@import './styles/iconfont.wxss';
</style>
