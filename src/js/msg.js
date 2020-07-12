import { convertToChinaNum } from './common.js'
const loveMsg = '今天|我与悦悦|在一起|'
const knownMsg = '悦悦|今天是|相识|'
const meetMsg = '悦悦|今天是|见到你|'
const today = new Date().toLocaleDateString()
const todayMsg = birthday() ||
  anniversary() ||
  commemoration() ||
  randomMessage()

function commemoration() {
  const getDay = (before) => Math.floor(
    (Date.parse(new Date()) - Date.parse(before)) / (1000 * 3600 * 24)
  )
  const knownDay = getDay(new Date('2019/5/8'))
  const loveDay = getDay(new Date('2019/7/13'))
  const meetDay = getDay(new Date('2019/6/30'))
  const daymsg = {
    347: '三千万秒',
    463: '四千万秒',
    579: '五千万秒',
    695: '六千万秒',
    810: '七千万秒',
    926: '八千万秒',
    1158: '九千万秒'
  }
  function generateMsg(msg, day) {
    if (daymsg[day]) {
      return msg + daymsg[day]
    }
    if (day % 100 === 0 || day % 1111 === 0 || day % 111 === 0) {
      return msg + day + '天'
    }
  }
  return (
    generateMsg(loveMsg, loveDay) ||
    generateMsg(knownMsg, knownDay) ||
    generateMsg(meetMsg, meetDay)
  )
}

function anniversary() {
  let num
  switch (today.substring(5)) {
    case '7/12':
      num = new Date().getFullYear() - '2019'
      return loveMsg + '%周年啦'.replace('%', convertToChinaNum(num))
    case '5/8':
      num = new Date().getFullYear() - '2019'
      return knownMsg + '%周年'.replace('%', convertToChinaNum(num))
    case '6/30':
      num = new Date().getFullYear() - '2019'
      return meetMsg + '%周年'.replace('%', convertToChinaNum(num))
    case '5/20':
      return '悦悦|520快乐'
    case '2/14':
      return '悦悦|情人节快乐'
  }
}

function randomMessage() {
  const msgs = [
    '悦悦|余生有你|未来可期',
    '悦悦|一生一世|一爱一人',
    '悦悦|久伴不离|此生不弃',
    '春水初生|春林初盛|春风十里|都不如你'
  ]
  return msgs[Math.floor(Math.random() * msgs.length)]
}

function birthday() {
  const birthday = [
    '2020/8/16',
    '2021/8/5',
    '2022/7/25',
    '2023/8/13',
    '2024/8/1',
    '2025/7/21',
    '2026/8/9',
    '2027/7/30',
    '2028/8/17',
    '2029/8/6',
    '2030/7/27'
  ]
  for (let i = 0; i < birthday.length; i++) {
    if (today === birthday[i]) {
      const age = birthday[i].substring(0, 4) - 1998
      return '悦悦|' + age + '岁|生日快乐'
    }
  }
}

export default todayMsg
