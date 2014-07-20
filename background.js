chrome.browserAction.onClicked.addListener(function(event) {
	chrome.event.executeScript(null, {
		file: 'overloadBrowser.js'
	});
});