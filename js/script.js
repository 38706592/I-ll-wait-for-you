document.addEventListener('DOMContentLoaded', function() {
    // 视频相关元素
    const introVideoContainer = document.getElementById('intro-video-container');
    const introVideo = document.getElementById('intro-video');
    const mainContent = document.getElementById('main-content');
    
    // 输入相关元素
    const userInput = document.getElementById('user-input');
    const typedText = document.getElementById('typed-text');
    const responseAnimation = document.getElementById('response-animation');
    
    // 单词列表 - 这里可以方便地添加或删除单词
    const registeredWords = [
        { word: "Eldritch Key", action: "openLocalHTML('pages/Eldritch Key.html')" },
        { word: "Observe", action: "openLocalHTML('pages/Observe.html')" },
        //暗
        { word: "Radiant Key", action: "openLocalHTML('pages/Radiant Key.html')" },
        { word: "Purity", action: "openLocalHTML('pages/Purity.html')" },
        { word: "Nexus", action: "openLocalHTML('pages/Nexus.html')" },
        //光
        //以上主線
        { word: "???", action: "openLocalHTML('pages/===.html')" },
        { word: "Orphion_", action: "alert(':>')" },
        { word: "reset", action: "resetVideo()" },
        { word: "Author", action: "openLocalHTML('pages/Author.html')" },
        { word: "Answer", action: "openURL('https://youtu.be/o-YBDTqX_ZU?si=VeGyi5aVcau8TdaS')" },
        { word: "hint", action: "openURL('https://youtu.be/o-YBDTqX_ZU?si=VeGyi5aVcau8TdaS')" },
        { word: "cheat", action: "openURL('https://youtu.be/o-YBDTqX_ZU?si=VeGyi5aVcau8TdaS')" },

    ];
    
    // 检查是否已经看过视频
    if(localStorage.getItem('introWatched')) {
        introVideoContainer.classList.add('hidden');
        mainContent.classList.remove('hidden');
    } else {
        // 播放视频
        introVideo.play().catch(error => {
            console.error('视频播放失败:', error);
            // 如果视频播放失败，直接显示主内容
            fadeToMainContent();
        });
        
        // 视频结束后淡出并显示主内容
        introVideo.addEventListener('ended', function() {
            fadeToMainContent();
        });
    }
    
    // 淡出视频容器并显示主内容
    function fadeToMainContent() {
        // 添加淡出类
        introVideoContainer.classList.add('fade-out');
        
        // 等待淡出动画完成后隐藏视频容器并显示主内容
        setTimeout(() => {
            introVideoContainer.classList.add('hidden');
            mainContent.classList.remove('hidden');
            localStorage.setItem('introWatched', 'true');
        }, 1000); // 1秒动画时间
    }
    
    // 聚焦输入框
    userInput.focus();
    window.addEventListener('click', function() {
        userInput.focus();
    });
    
    // 处理输入
    userInput.addEventListener('input', function() {
        animateTypedText(this.value);
    });
    
    // 处理按下回车键
    userInput.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            checkInput(this.value.trim());
            this.value = '';
            typedText.innerHTML = '';
        }
    });
    
    // 添加全局键盘快捷键 - 按R键重置视频
    document.addEventListener('keydown', function(e) {
        // 只有在按下Alt+R组合键时执行重置
        if(e.altKey && e.key.toLowerCase() === 'r') {
            resetVideo();
        }
    });
    
    // 动态显示输入的文字
    function animateTypedText(text) {
        typedText.innerHTML = '';
        
        for(let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.style.animationDelay = (i * 50) + 'ms';
            charSpan.textContent = text[i];
            typedText.appendChild(charSpan);
        }
    }
    
    // 检查输入是否匹配已注册的单词
    function checkInput(input) {
        let found = false;
        
        for(const item of registeredWords) {
            if(input.toLowerCase() === item.word.toLowerCase()) {
                found = true;
                showSuccessAnimation();
                setTimeout(() => {
                    // 执行相应的动作
                    eval(item.action);
                }, 1000);
                break;
            }
        }
        
        if(!found) {
            showErrorAnimation();
        }
    }
    
    // 显示成功动画
    function showSuccessAnimation() {
        // 先移除之前的动画
        responseAnimation.innerHTML = '';
        
        // 添加新的成功动画
        const successDiv = document.createElement('div');
        successDiv.className = 'success-animation';
        responseAnimation.appendChild(successDiv);
        
        // 设置超时清除
        setTimeout(() => {
            responseAnimation.innerHTML = '';
        }, 2000);
    }
    
    // 显示错误动画
    function showErrorAnimation() {
        // 先移除之前的动画
        responseAnimation.innerHTML = '';
        
        // 添加新的错误动画
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-animation';
        responseAnimation.appendChild(errorDiv);
        
        // 设置超时清除
        setTimeout(() => {
            responseAnimation.innerHTML = '';
        }, 2000);
    }
    
    // 打开URL的函数
    function openURL(url) {
        window.open(url, '_blank');
    }
    
    // 下载文件的函数
    function downloadFile(filename) {
        // 创建一个隐藏的a标签
        const element = document.createElement('a');
        
        // 设置下载链接为指定的文件路径
        element.setAttribute('href', filename);
        
        // 从路径中提取文件名
        const actualFilename = filename.split('/').pop();
        element.setAttribute('download', actualFilename);
        
        // 设置为隐藏元素
        element.style.display = 'none';
        document.body.appendChild(element);
        
        // 模拟点击下载
        element.click();
        
        // 清理DOM
        document.body.removeChild(element);
    }
    
    // 打开本地HTML文件的函数
    function openLocalHTML(filename) {
        window.location.href = filename;
    }
    
    // 重置视频观看状态
    function resetVideo() {
        localStorage.removeItem('introWatched');
        window.location.reload();
    }
}); 
