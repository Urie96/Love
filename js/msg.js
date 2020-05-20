var loveMsg = "悦悦|今天是|相恋|";
var kownMsg = "悦悦|今天是|相识|";
var meetMsg = "悦悦|今天是|见到你|";

function todayMessage() {
  var today = new Date().toLocaleDateString();
  return (
    birthday(today) ||
    anniversary(today) ||
    commemoration(today) ||
    randomMessage()
  );
}

function getDay(before) {
  var now = new Date();
  return Math.floor(
    (Date.parse(now) - Date.parse(before)) / (1000 * 3600 * 24)
  );
}

function commemoration() {
  var kownDay = getDay(new Date("2019/5/8"));
  var loveDay = getDay(new Date("2019/7/13"));
  var meetDay = getDay(new Date("2019/6/30"));
  var daymsg = {
    "347": "三千万+秒",
    "463": "四千万+秒",
    "579": "五千万+秒",
    "695": "六千万+秒",
    "810": "七千万+秒",
    "926": "八千万+秒",
    "1158": "九千万+秒",
  };
  function generateMsg(msg, day) {
    if (daymsg[day]) {
      return msg + daymsg[day];
    }
    if (day % 100 == 0 || day % 1111 == 0 || day % 111 == 0) {
      return msg + day + "+天";
    }
  }
  return (
    generateMsg(loveMsg, loveDay) ||
    generateMsg(kownMsg, kownDay) ||
    generateMsg(meetMsg, meetDay)
  );
}

function anniversary(today) {
  var today = new Date().toLocaleDateString();
  today = today.substring(5);
  switch (today) {
    case "7/13":
      var num = new Date().getFullYear() - "2019";
      return loveMsg + num + "+周年";
    case "5/8":
      var num = new Date().getFullYear() - "2019";
      return kownMsg + num + "+周年";
    case "6/30":
      var num = new Date().getFullYear() - "2019";
      return meetMsg + num + "+周年";
    case "5/20":
      return "悦悦|520+快乐";
    case "2/14":
      return "悦悦|情人节+快乐";
  }
}

function randomMessage() {
  var msgs = [
    "悦悦|余生+有你|未来+可期",
    "悦悦|一生+一世|一爱+一人",
    "悦悦|久伴+不离|此生+不弃",
    "春水+初生|春林+初盛|春风+十里|都不+如你",
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function birthday(today) {
  var birthday = [
    "2020/8/16",
    "2021/8/5",
    "2022/7/25",
    "2023/8/13",
    "2024/8/1",
    "2025/7/21",
    "2026/8/9",
    "2027/7/30",
    "2028/8/17",
    "2029/8/6",
    "2030/7/27",
  ];
  for (var i = 0; i < birthday.length; i++) {
    if (today == birthday[i]) {
      var age = birthday[i].substring(0, 4) - 1998;
      return "悦悦|" + age + "+岁|生日+快乐";
    }
  }
}
