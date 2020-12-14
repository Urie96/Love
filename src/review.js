import './css/review.css';
import ele from './html/review.html';
import cover from './html/cover.html';
import typeWriter from './js/typeWriter';

cover.appendTo(document.body);
ele.appendTo(document.body);

const hook = (() => {
  const countEle = document.getElementById('count');
  let count = 0;
  return ({ char, element }) => {
    if (element.id === 'text' && /^[\u4e00-\u9fa5A-Za-z0-9]$/.test(char)) {
      countEle.innerHTML = ++count;
    }
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
};
typeWriter(document.getElementById('typewrite'), option);
