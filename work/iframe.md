<div class="iframe-container">
        <iframe
          ref="aiContentIframe"
          src="./tiangong/page_1 2.html"
          width="100%"
          frameborder="0"
          scrolling="no"
          allowfullscreen
        >
        </iframe>
      </div>


// iframe高度自适应处理函数
const handleIframeHeight = (height: number) => {
  if (aiContentIframe.value) {
    const iframe = aiContentIframe.value as HTMLIFrameElement;
    iframe.style.height = `${height}px`;
  }
};

// 监听iframe发送的高度更新消息
const handlePostMessage = (event: MessageEvent) => {
  if (
    event.data &&
    event.data.type === 'iframe-height-update' &&
    event.data.source === 'ai-content'
  ) {
    handleIframeHeight(event.data.height);
  }
};

onMounted(() => {
  // 添加postMessage监听器
  window.addEventListener('message', handlePostMessage);
})


// 清理事件监听器
onUnmounted(() => {
  window.removeEventListener('message', handlePostMessage);
});