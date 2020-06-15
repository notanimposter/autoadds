//
//
// listener
//
//
var DEBUG = true;
var obj = {};

function print(str) {
	if (DEBUG) console.log(str);
}

function Thing(href, reason) {
	print(reason + "; making a new thing");
	this.href = href;
	this.counter = 1;	
}
function sayOkay(tabID, reason) {
	print(reason + "; replying okay")
	chrome.tabs.sendMessage(tabID, [obj[tabID].href, "okay"]);
	return "said okay";
}
function sayNokay(tabID, reason) {
	print(reason + "; saying nokay");
	chrome.tabs.sendMessage(tabID, [obj[tabID].href, "nokay"]);
	return "said nokay";
}
function gotThing(message, sender) {
	print("got a thing");
	if (obj[sender.tab.id] !== void(0)) {
		print("the thing exists; comparing hrefs");
		if (obj[sender.tab.id].href == message) {
			print("hrefs match; incrementing the counter");
			obj[sender.tab.id].counter++;
			print("incremented the counter; checking the counter");
			if (obj[sender.tab.id].counter >= 3) {
				var temp = sayNokay(sender.tab.id, "the counter is too high");
				print(temp + "; deleting the thing");
				delete obj[sender.tab.id];
				print("deleted the thing");
			} else {
				var temp = sayOkay(sender.tab.id, "the counter isn't too high");
				print(temp);
			}
		 } else {
		 	print("hrefs don't match; deleting the thing");
			delete obj[sender.tab.id];
			obj[sender.tab.id] = new Thing(message, "deleted the thing");
			var temp = sayOkay(sender.tab.id, "made a new thing")
			print(temp);
		}
	} else {
		obj[sender.tab.id] = new Thing(message, "thing doesn't exist");
		var temp = sayOkay(sender.tab.id, "made a new thing")
		print(temp);
	}
}
chrome.runtime.onMessage.addListener(gotThing);