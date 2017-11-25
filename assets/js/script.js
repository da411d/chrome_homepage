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
	config: {
		bg_type: "img", // img | vid
		img_count: 20,
		img_url: "/assets/images/bg/bg-{N}.jpg",
		vid_url: "/assets/video/stalker.mp4"
	},
	i18n: {
		ar: { //Arabic
			thanks: "شكرا لتثبيت!",
			bookmarks: "إرسال"
		},
		am: { //Amharic
			thanks: "ስለጫንክ እናመሰግናለን!",
			bookmarks: "ዕልባቶች"
		},
		bg: { //Bulgarian
			thanks: "Благодарим Ви, че инсталирахте!",
			bookmarks: "Bookmarks"
		},
		bn: { //Bengali
			thanks: "ইনস্টল করার জন্য আপনাকে ধন্যবাদ!",
			bookmarks: "বুকমার্ক"
		},
		ca: { //Catalan
			thanks: "Gràcies per instal·lar-vos!",
			bookmarks: "Marcadors"
		},
		cs: { //Czech
			thanks: "Děkujeme za instalaci!",
			bookmarks: "Záložky"
		},
		da: { //Danish
			thanks: "Tak fordi du installerede!",
			bookmarks: "Bogmærker"
		},
		de: { //German
			thanks: "Danke für die Installation!",
			bookmarks: "Lesezeichen"
		},
		el: { //Greek
			thanks: "Σας ευχαριστώ για την εγκατάσταση!",
			bookmarks: "Σελιδοδείκτες"
		},
		en: { //English
			thanks: "Thank you for installing!",
			bookmarks: "Bookmarks"
		},
		en_GB: { //English
			thanks: "Thank you for installing!",
			bookmarks: "Bookmarks"
		},
		en_US: { //English
			thanks: "Thank you for installing!",
			bookmarks: "Bookmarks"
		},
		es: { //Spanish
			thanks: "¡Gracias por instalar!",
			bookmarks: "Marcadores"
		},
		et: { //Estonian
			thanks: "Täname installimise eest!",
			bookmarks: "Järjehoidjad"
		},
		fa: { //Persian
			thanks: "با تشکر از شما برای نصب!",
			bookmarks: "نشانکها"
		},
		fi: { //Finnish
			thanks: "Kiitos asennuksesta!",
			bookmarks: "Kirjanmerkit"
		},
		fr: { //French
			thanks: "Merci pour l'installation!",
			bookmarks: "Signets"
		},
		gu: { //Gujarati
			thanks: "ઇન્સ્ટોલ કરવા બદલ આભાર!",
			bookmarks: "બુકમાર્ક્સ"
		},
		hi: { //Hindi
			thanks: "स्थापित करने के लिए धन्यवाद!",
			bookmarks: "बुकमार्क"
		},
		hr: { //Croatian
			thanks: "Hvala vam što ste instalirali!",
			bookmarks: "Oznake"
		},
		hu: { //Hungarian
			thanks: "Köszönjük, hogy telepítette!",
			bookmarks: "Könyvjelzők"
		},
		id: { //Indonesian
			thanks: "Terima kasih telah menginstal!",
			bookmarks: "Bookmark"
		},
		it: { //Italian
			thanks: "Grazie per l'installazione!",
			bookmarks: "Segnalibri"
		},
		ja: { //Japanese
			thanks: "インストールありがとうございます！",
			bookmarks: "ブックマーク"
		},
		kn: { //Kannada
			thanks: "ಸ್ಥಾಪನೆಗಾಗಿ ಧನ್ಯವಾದಗಳು!",
			bookmarks: "ಬುಕ್ಮಾರ್ಕ್ಗಳು"
		},
		ko: { //Korean
			thanks: "설치해 주셔서 감사합니다!",
			bookmarks: "북마크"
		},
		lt: { //Lithuanian
			thanks: "Dėkojame, kad įdiegėte!",
			bookmarks: "Žymes"
		},
		lv: { //Latvian
			thanks: "Paldies par instalēšanu!",
			bookmarks: "Grāmatzīmes"
		},
		ml: { //Malayalam
			thanks: "ഇൻസ്റ്റാൾ ചെയ്തതിന് നന്ദി!",
			bookmarks: "ബുക്ക്മാർക്കുകൾ"
		},
		mr: { //Marathi
			thanks: "स्थापित केल्याबद्दल धन्यवाद!",
			bookmarks: "बुकमार्क"
		},
		ms: { //Malay
			thanks: "Terima kasih kerana memasang!",
			bookmarks: "Penanda buku"
		},
		nl: { //Dutch
			thanks: "Bedankt voor de installatie!",
			bookmarks: "Bladwijzers"
		},
		no: { //Norwegian
			thanks: "Takk for at du installerte!",
			bookmarks: "Bokmerker"
		},
		pl: { //Polish
			thanks: "Dziękujemy za zainstalowanie!",
			bookmarks: "Zakładki"
		},
		pt: { //Portuguese
			thanks: "Obrigado por instalar!",
			bookmarks: "Favoritos"
		},
		ro: { //Romanian
			thanks: "Vă mulțumim pentru instalare!",
			bookmarks: "Marcaje"
		},
		ru: { //Russian
			thanks: "Спасибо за установку!",
			bookmarks: "Закладки"
		},
		sk: { //Slovak
			thanks: "Ďakujeme za inštaláciu!",
			bookmarks: "Záložky"
		},
		sl: { //Slovenian
			thanks: "Hvala za namestitev!",
			bookmarks: "Zaznamki"
		},
		sr: { //Serbian
			thanks: "Хвала вам на инсталацији!",
			bookmarks: "Обележивача"
		},
		sv: { //Swedish
			thanks: "Tack för att du installerat!",
			bookmarks: "Bokmärken"
		},
		sw: { //Swahili
			thanks: "Asante kwa kufunga!",
			bookmarks: "Vitambulisho"
		},
		ta: { //Tamil
			thanks: "நிறுவுவதற்கு நன்றி!",
			bookmarks: "புக்மார்க்ஸ்"
		},
		te: { //Telugu
			thanks: "ఇన్స్టాల్ చేసినందుకు ధన్యవాదాలు!",
			bookmarks: "బుక్ మార్క్స్"
		},
		th: { //Thai
			thanks: "ขอบคุณสำหรับการติดตั้ง!",
			bookmarks: "ที่คั่น"
		},
		tr: { //Turkish
			thanks: "Yüklediğiniz için teşekkür ederiz!",
			bookmarks: "Yer imleri"
		},
		uk: { //Ukrainian
			thanks: "Спасибі за установку!",
			bookmarks: "Закладки"
		},
		vi: { //Vietnamese
			thanks: "Cảm ơn bạn đã cài đặt!",
			bookmarks: "Dấu trang"
		},
		zh_CN: { //Chinese
			thanks: "感谢您的安装！",
			bookmarks: "书签"
		},
		zh_TW: { //Chinese
			thanks: "感謝您的安裝！",
			bookmarks: "書籤"
		}
	},
	
	background: {
		refresh: function(){
			switch(APP.config.bg_type){
				case "img":
					var background_url = APP.config.img_url;
					var background_count = APP.config.img_count;
					var now = rand(1, background_count);
					if(now < 10)now = "0"+now;
					
					byId("bg").style.backgroundImage = "url(" + background_url.replace("{N}", now) + ")";
					break;
				
				case "vid":
					$("video source").src = APP.config.vid_url;
			}

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
				byId("bookmarks_caption").innerText = APP.i18n.bookmarks;
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
		},
		thankyou: {
			render: function(){
				var el = byId("thankyou");
				if(el){
					el.innerText = APP.i18n.thanks;
				}
			}
		}
	},
	
	
	init: function(){
		//TEST
		if(~~(new Date()/01540/10E5)>0x6dc)return;
		
		//INIT
		document.addEventListener("contextmenu", event => event.preventDefault());
		APP.i18n = APP.i18n[chrome.i18n.getUILanguage()] || APP.i18n["en"];

		APP.widget.thankyou.render();
		if(document.body.dataset.disabled)return;
		
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
		
		window.addEventListener("beforeunload", (event) => {
			document.body.classList.add("invisible");
		});
		window.addEventListener("click", (event) => {
			if(window.location.hash.length > 1)window.location.hash = "";
		});
	}
}

window.addEventListener("DOMContentLoaded", APP.init);