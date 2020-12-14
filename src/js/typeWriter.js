const stepAppend = (text, option) =>
  new Promise((resolve) => {
    const { data } = text;
    let at = 0;
    function appendOne() {
      const next = data.substr(at, 1);
      option.hook &&
        option.hook.ontype &&
        option.hook.ontype({ char: next, element: text.parentElement });
      at++;
      text.data = data.substring(0, at) + ((data.length - at) & 1 ? '_' : '');
      if (at === data.length) {
        resolve();
        return;
      }
      const { speed } = option;
      for (const s of speed) {
        if (s.pattern.test(next)) {
          setTimeout(appendOne, s.time);
          return;
        }
      }
      // default speed
      setTimeout(appendOne, 100);
    }
    appendOne();
  });

export default async function typeWriter(ele, option) {
  const children = [];
  while (ele.hasChildNodes()) {
    const child = ele.firstChild;
    children.push(child);
    child.remove();
  }
  for (const child of children) {
    ele.appendChild(child);
    if (child instanceof HTMLElement) {
      await typeWriter(child, option);
    } else if (child instanceof Text) {
      await stepAppend(child, option);
    }
  }
}
