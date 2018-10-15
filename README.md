[![GPL Licence](https://badges.frapsoft.com/os/gpl/gpl.svg?v=103)](https://opensource.org/licenses/GPL-3.0/)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Donations Badge](https://yourdonation.rocks/images/badge.svg)](https://daki.me/sayThanks)

# Домашня сторінка Chrome
Це є універсальний шаблон для розширення. Треба лише змінити деякі налаштування і видалити всі зайві файли.
Налаштування в файлі script.js
```
config: {
	bg_type: "img", // img | vid - Тип фона. Фото або відео
	img_count: 20, // Кількість картинок. 
	img_url: "/assets/images/bg/bg-{N}.jpg", //Шаблон назви картинки
	vid_url: "/assets/video/stalker.mp4" //Адреса відео
},
```
