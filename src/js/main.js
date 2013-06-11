require([
	'./config',
	'jquery',
	'fyre',
	'streamhub-backbone',
	'streamhub-backbone/views/FeedView',
	'./src/js/FeedRenderer'],
	
	function (Config, $, fyre, Hub, FeedView, IsotopeView, FeedRenderer) {
		// Load the SDK
		fyre.conv.load({
				network: Config.network
			},
			[{app: 'sdk'}],
			function (sdk) {
				loadFeedHub(sdk);
			}
		);
	
		function loadFeedHub(sdk) {
			// Create a Collection for Content to be in
			var collection = new Hub.Collection();
			
			// Create Feed View
			var feedView = new FeedView({
				el: document.getElementById("fyre-feed"),
				collection: collection,
				contentViewOptions: {
					template: FeedRenderer
				}
			});
			
			// Bind the View to a remote Collection
			collection.setRemote({
				sdk: sdk,
				siteId: Config.siteId,
				articleId: Config.feed.articleId
			});
			
		}
});