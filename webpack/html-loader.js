const { minify } = require('html-minifier-terser');

function ex(miniHtml) {
  const div = document.createElement('div');
  div.innerHTML = JSON.stringify(miniHtml);
  module.exports = {
    /** @param {HTMLElement} parent */
    appendTo: (parent) => {
      while (div.childElementCount > 0) {
        const ele = div.firstElementChild;
        ele.remove();
        if (ele.tagName === 'SCRIPT') {
          eval(ele.innerHTML);
        } else {
          parent.appendChild(ele);
        }
      }
    },
  };
}

module.exports = (source) => {
  const miniHtml = minify(source, {
    minifyCSS: true,
    minifyJS: true,
    collapseWhitespace: true,
  });
  return `
  const div = document.createElement('div');
  div.innerHTML = ${JSON.stringify(miniHtml)};
  const eles = div.children;
  module.exports = {
    /** @param {HTMLElement} parent */
    appendTo: (parent) => {
      while (div.childElementCount > 0) {
        const ele = div.firstElementChild;
        ele.remove();
        if (ele.tagName === 'SCRIPT') {
          eval(ele.innerHTML);
        } else {
          parent.appendChild(ele);
        }
      }
    },
  };`;
};
