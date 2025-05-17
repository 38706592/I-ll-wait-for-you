# "I'll wait for you" 网页

一个神秘的交互式网页，用户可以输入密码并获得响应。

## 文件结构

```
/
├── index.html           # 主页面
├── css/                 # 样式文件夹
│   └── style.css        # 主样式文件
├── js/                  # JavaScript文件夹
│   └── script.js        # 主脚本文件
├── media/               # 媒体文件夹
│   ├── 開頭.mp4         # 开场视频
│   └── MAIN.png         # 主图片
├── downloads/           # 下载文件夹
│   └── example.txt      # 示例下载文件
└── pages/               # 页面文件夹
    ├── success.html     # 成功页面
    ├── image.html       # 图片页面
    ├── video.html       # 视频页面
    ├── text.html        # 文本页面
    └── reset.html       # 重置页面
```

## 功能说明

1. 打开网页时，会播放一个开场视频（仅首次访问）
2. 开场视频结束后，会平滑淡出并显示主界面
3. 用户可以在输入框中输入文字，文字会显示动态效果
4. 按下Enter键后，会检查输入的内容是否与预设的关键词匹配
5. 匹配成功会显示成功动画，并执行对应的操作
6. 匹配失败会显示错误动画

## 如何添加或修改关键词

在 `js/script.js` 文件中找到 `registeredWords` 数组，可以添加或修改关键词和对应的操作：

```javascript
const registeredWords = [
    { word: "password1", action: "openURL('https://example.com')" },
    { word: "download", action: "downloadFile('downloads/example.txt')" },
    { word: "secret", action: "openURL('https://google.com')" },
    { word: "Orphion_", action: "alert(':>')" },
    { word: "image", action: "openLocalHTML('pages/image.html')" },
    { word: "video", action: "openLocalHTML('pages/video.html')" },
    { word: "text", action: "openLocalHTML('pages/text.html')" },
    { word: "local", action: "openLocalHTML('pages/success.html')" },
    { word: "reset", action: "resetVideo()" }
];
```

每个关键词项有两个属性：
- `word`: 关键词文本
- `action`: 匹配成功后执行的操作，可以是以下几种：
  - `openURL('网址')`: 打开指定网址
  - `downloadFile('文件路径')`: 下载指定路径的文件
  - `alert('消息')`: 显示一个弹窗
  - `openLocalHTML('文件路径')`: 打开本地HTML文件

## 如何修改视频

如果需要更换开场视频，只需将新视频文件放在media文件夹中，并在 `index.html` 文件中修改视频路径：

```html
<video id="intro-video" src="media/新视频文件名.mp4" autoplay muted></video>
```

## 如何修改专题页面

### 图片页面 (pages/image.html)

要更改图片页面中显示的图片，只需修改以下代码中的图片路径：

```html
<img src="../media/MAIN.png" alt="Main Image">
```

### 视频页面 (pages/video.html)

要更改视频页面中播放的视频，只需修改以下代码中的视频路径：

```html
<video src="../media/開頭.mp4" controls autoplay></video>
```

### 文本页面 (pages/text.html)

要修改文本页面的内容，编辑 `pages/text.html` 文件中的文本内容：

```html
<div class="text-container">
    <h1>探索未知的旅程</h1>
    <p>在这个世界的某个角落，隐藏着无数未解之谜...</p>
    <!-- 更多段落 -->
</div>
```

### 修改网站图标

所有页面现在都使用media/icon.png作为网站图标（favicon）。如果您想更换图标，请将新图标放在media文件夹中，并确保在所有HTML文件中更新图标路径：

主页(index.html)：
```html
<link rel="icon" href="media/icon.png" type="image/png">
```

其他页面：
```html
<link rel="icon" href="../media/icon.png" type="image/png">
```

## 如何添加下载文件

1. 将要下载的文件放入 `downloads` 文件夹
2. 在 `registeredWords` 数组中添加新的关键词，使用 `downloadFile` 函数：
   ```javascript
   { word: "文档", action: "downloadFile('downloads/文档名.pdf')" }
   ```

## 注意事项

- 为保证视频播放正常，建议使用现代浏览器访问
- 视频仅在首次访问时播放，之后不会再显示
- 如需重置并再次观看视频，有以下方法：
  1. 在页面上输入"reset"并按回车
  2. 按Alt+R组合键
  3. 访问pages/reset.html页面 