import './css/review.styl'
import cover from './html/cover.html';
import typeWriter from './js/typeWriter';

cover.appendTo(document.body);

/** @param {HTMLElement} ele */
function getInnerTextChineseCount(ele) {
  if (!ele) {
    return 0
  }
  return ele.innerText.match(/[\u4e00-\u9fa5A-Za-z0-9]/g).length
}

/** @param {HTMLElement} ele */
function scrollToBottom(ele) {
  ele.scrollTo({ top: ele.scrollHeight, behavior: 'smooth' })
}

const hook = (() => {
  const countEle = document.getElementById('count');
  return () => {
    countEle.innerHTML = getInnerTextChineseCount(document.getElementById('text'))
    scrollToBottom(document.documentElement)
  };
})();

const option = {
  hook: {
    ontype: hook,
  },
  speed: [
    {
      pattern: /^[\u3002|\uff1f|\uff01|\uff0c]$/,
      time: 500,
    },
    {
      pattern: /^[\w\W]$/,
      time: 100,
    },
  ],
  elementChangeTime: 500,
};
typeWriter(document.getElementById('typewrite'), option);
