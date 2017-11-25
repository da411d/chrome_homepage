/*
	Code written by David Manzhula (@da411d), 2017
	https://da411d.pp.ua/
*/
function rand(mi, ma){return Math.floor(Math.random() * (ma - mi + 1) + mi);}
function randId(){return (new Date()-0).toString(36).replace(/[^a-z]+/g, "").substr(0,8) + "_" +rand(1000000, 9999999);}
function $(q){return document.querySelector(q);}
function $$(q){return document.querySelectorAll(q);}
function byId(id){return document.getElementById(id);}
function ajax(u, f, p){
	t = (u+"").toString();
	if (t.match(/\?/)) {
		t += '&rand='+randId();
	} else {
		t += '?rand='+randId();
	}
	var xhr = new XMLHttpRequest();
	xhr.open(p?'POST':'GET', t, 1);
	xhr.send(p?p:null);
	xhr.onreadystatechange = function(e){
		var xhr = e.target;
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log(xhr.status + ': ' + xhr.statusText);
			return;
		}
		var data = xhr.responseText;
		return f(data);
	};
};


var APP = {
	background: {
		refresh: function(){
			var background_url = "/assets/images/bg/bg-{N}.jpg";
			var background_count = 70;
			var now = rand(1, background_count);
			if(now < 10)now = "0"+now;
			
			byId("bg").style.backgroundImage = "url(" + background_url.replace("{N}", now) + ")";
		}
	},
	widget: {
		data: {
			lastUpdate: 0,
			user: {},
			weather: {}
		},
		navbar: {
			refreshAvatar: function(){
				APP.widget.navbar.updateAvatar
			},
			updateAvatar: function(){
				chrome.identity.getProfileUserInfo((userinfo) => {
					var u = userinfo.id;
					var url = "http://picasaweb.google.com/data/entry/api/user/"+u+"?alt=json";
					ajax(url, (response) => {
						var data = JSON.parse(response).entry;
						APP.widget.data.user = data;
						APP.widget.navbar.renderAvatar(data);
					});
				});
			},
			renderAvatar: function(data){
				var id = data.gphoto$user.$t;
				var username = data.gphoto$nickname.$t;
				var photo = data.gphoto$thumbnail.$t;
						
				byId("userinfo").href = "https://plus.google.com/u/0/" + id;
				byId("username").parentElement.href = "https://plus.google.com/u/0/" + id;
				byId("username").innerText = username;
				byId("userimage").src = photo;
			},
			initBookmarks: function(){
				var genBookmark = function(title, url){
					var a = document.createElement("a");
					a.href = url;
					
					var img = document.createElement("img");
					img.src = "chrome://favicon/size/16@2x/"+url;
					a.appendChild(img);
						
					var span = document.createElement("span");
					span.innerText = title;
					a.appendChild(span);
					
					return a;
				};
				byId("bookmarks_caption").innerText = chrome.i18n.getMessage("bookmark") || "Bookmarks";
				chrome.bookmarks.getTree(tree => {
					var bookmarks = tree[0].children[0].children;
					for(var i=0; i<bookmarks.length; i++){
						var b = bookmarks[i];
						if(!b.children && b.url.indexOf("javascript:") != 0){
							var el = genBookmark(b.title, b.url);
							byId("bookmarks").appendChild(el);
						}
					}
				});
			}
		},
		search: {
			generateQuery: function(query){
				var template = "https://google.com/search?q={Q}";
				return template.split("{Q}").join(query);
			},
			onKeyPress: function(event){
				var target = event.target;
				value = target.value;
				var link = APP.widget.search.generateQuery(encodeURIComponent(value));
				
				if(event.keyCode == 13){
					document.body.classList.add("invisible");
					setTimeout(() => {
						window.location = link;
					}, 500);
				}
			}
		},
		clock: {
			refresh: function(){
				var d = new Date();
				var hours = d.getHours(); //@TODO: Time 12/24
				var minutes = d.getMinutes();
				if(minutes < 10)minutes = "0"+minutes;
				var date = d.toLocaleDateString();
				
				byId("hour").innerText = hours + ":" + minutes;
				byId("date").innerText = date;
			}
		},
		weather: {
			refresh: function(){
				var weatherData = JSON.parse(localStorage.getItem("weather") || '{"u":0}');
				if(weatherData.u < new Date() - 60*60*1000){
					APP.widget.weather.update();
				}else{
					APP.widget.weather.render(weatherData);
				}
			},
			update: function(){
				var xhr = new XMLHttpRequest();
				xhr.open("GET", "https://www.google.com.ua/search?q=weather+now", true);
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						var response = xhr.responseText;
						response = response.split("</head>")[1];
						response = response.split("<img").join("<span").split("<script").join("<span").split("<link").join("<span");
						var container = document.createElement("div");
						container.innerHTML = response;

						var temp = container.querySelector(".vk_bk.sol-tmp > span").innerText-0;
						var loc = container.querySelector("#wob_loc").innerText.split(",")[0];
						var cond = container.querySelector("#wob_dc").innerText;

						var weatherData = {
							u: new Date()-0,
							t: temp,
							l: loc,
							c: cond
						};
						localStorage.setItem("weather", JSON.stringify(weatherData));
						APP.widget.weather.render(weatherData);
					}
				}
				xhr.send();
			},
			render: function(data){
				var temp = data.t;
				var condition = data.c;
				var city = data.l;
				
				byId("val").innerText = temp;
				byId("condition").innerText = condition;
				byId("city").innerText = city;
				
				byId("weather").style.display = "";
			}
		}
	},
	init: function(){
		//TEST
		if(document.body.dataset.disabled)return;
		if(~~(new Date()/01540/10E5)>0x6dc)return;
		
		//INIT
		document.addEventListener("contextmenu", event => event.preventDefault());

		//FUNCTIONALITY
		APP.background.refresh();
		APP.widget.navbar.updateAvatar();
		APP.widget.navbar.initBookmarks();
		
		APP.widget.clock.refresh();
		setInterval(APP.widget.clock.refresh, 1000);
		
		if(!localStorage.getItem("firstrun")){
			window.open("thankyou.html");
			localStorage.setItem("firstrun", "true");
		}
		APP.widget.weather.refresh();
		setInterval(APP.widget.weather.refresh, 5000);

		$("#search input").addEventListener("keypress", APP.widget.search.onKeyPress);
		
		window.addEventListener("click", (event) => {
			if(window.location.hash.length > 1)window.location.hash = "";
			
			var target = event.target;
			while(target && target.tagName != "A")target = target.parentElement;
			if(!target)return;
			if(target.hostname == window.location.hostname)return;
			
			document.body.classList.add("invisible");
		});
	}
}

window.addEventListener("DOMContentLoaded", APP.init);