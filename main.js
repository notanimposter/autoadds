//
//
// redirect code
//
//
var DEBUG = true;

function print(str) {
	if (DEBUG) console.log(str);
}

if (window.find("Access Denied (policy_denied)") || window.find("Your request was denied because of its content categorization")) {
	chrome.runtime.sendMessage(window.location.href);
	//window.location.replace("https:" + window.location.href.substring(window.location.protocol.length));
	print("sending a thing");
}
function doTheThing() {
	print("adding the s");
	window.location.replace("https:" + window.location.href.substring(window.location.protocol.length));
}
function doTheOtherThing() {
	print("writing the thing");
	document.getElementsByTagName("font")[0].innerHTML = "Looks like you're still here, huh. <br> Would you like to try visiting this page through <a style='color:blue; text-decoration: underline; cursor: pointer;'>a proxy</a> instead? ";
	document.getElementsByTagName("a")[0].onclick = function() {
		print("the user clicked the thing; redirecting to the thing");
		window.location.replace("https://www.4everproxy.com/secure.php?u="+"http:" + window.location.href.substring(window.location.protocol.length));
	}
}
function gotThing(message, sender) {
	print("got a thing");
	if (message[0] == window.location.href) {

		print("hrefs match; checking okayness");
		if (message[1] == "okay") {
			print("background said okay; doing the thing");
			doTheThing();
		} else if (message[1] == "nokay") {
			print("background said nokay; doing the other thing");
			doTheOtherThing();
		}
	}
}
chrome.runtime.onMessage.addListener(gotThing);