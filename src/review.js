import './css/review.css';
import typeWriter from './js/typeWriter';
import './js/play_bgm.js';

const cover = document.createElement('div');
cover.id = 'cover';
document.body.appendChild(cover);

function randomPair(option) {
  const { max, min, minDif } = option;
  const res = [0, 0];
  res[0] = min + Math.floor((max - min) * Math.random());
  res[1] = min + Math.floor((max - min - 2 * minDif) * Math.random());
  if (res[0] - res[1] < minDif) {
    res[1] += 2 * minDif;
  }
  return res;
}
const [a, b] = randomPair({
  max: 255,
  min: 0,
  minDif: 60,
});
document.getElementById(
  'cover'
).style.background = `linear-gradient(to left bottom,hsl(${a},100%,85%) 0%,hsl(${b},100%,85%) 100%)`;

/** @param {HTMLElement} ele */
function getInnerTextChineseCount(ele) {
  if (!ele) {
    return 0;
  }
  return ele.innerText.match(/[\u4e00-\u9fa5A-Za-z0-9]/g)?.length || 0;
}

const scroll_Top = (() => {
  let interval;
  /** @param {HTMLElement} el */
  const func = (el, targetY, duration = 1000) => {
    if (interval) clearInterval(interval);
    const needScrollTop = targetY - el.scrollTop;
    const minMove = 1;
    let count = Math.ceil(needScrollTop / minMove);
    if (!count) return;
    const timeGap = duration / count;
    interval = setInterval(() => {
      el.scrollTop += minMove;
      count--;
      if (count <= 0) {
        clearInterval(interval);
      }
    }, timeGap);
  };
  return func;
})();

/** @param {HTMLElement} el */
function scrollToBottom(el) {
  // ele.scrollTo({ top: ele.scrollHeight, behavior: 'smooth' })
  scroll_Top(el, el.scrollHeight, 5000);
}

const hook = (() => {
  const countEle = document.getElementById('count');
  return () => {
    countEle.innerHTML = getInnerTextChineseCount(
      document.getElementById('text')
    );
    scrollToBottom(document.documentElement);
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