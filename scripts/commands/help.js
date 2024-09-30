module.exports.config = {
 name: "help",
 version: "2.0.0",
 permssion: 0,
 credits: "Islamick Chat",
  prefix:true,
 description: "commands list",
 category: "system",
 usages: "module name",
 cooldowns: 1,
 envConfig: {
  autoUnsend: false,
  delayUnsend: 300
 }
};

module.exports.languages = {
  'en': {
    'moduleInfo': "─────[ %1 ]──────\n\nUsage: %3\nCategory: %4\nWaiting time: %5 seconds(s)\nPermission: %6\nDescription: %2\n\nModule coded by %7",
    'helpList': "[ There are %1 commands on this bot, Use: \"%2help nameCommand\" to know how to use! ]",
    'user': "User",
    'adminGroup': "Admin group",
    'adminBot': "Admin bot"
  }
};
module.exports.handleEvent = function ({
  api: _0xeaf8a8,
  event: _0x2db9c7,
  getText: _0x4f1206
}) {
  const {
    commands: _0x4e6903
  } = global.client;
  const {
    threadID: _0x492d46,
    messageID: _0x3c3425,
    body: _0x162fb3
  } = _0x2db9c7;
  if (!_0x162fb3 || typeof _0x162fb3 == "undefined" || _0x162fb3.indexOf("help") != 0) {
    return;
  }
  const _0x200156 = _0x162fb3.slice(_0x162fb3.indexOf("help")).trim().split(/\s+/);
  if (_0x200156.length == 1 || !_0x4e6903.has(_0x200156[1].toLowerCase())) {
    return;
  }
  const _0x28dfc0 = global.data.threadData.get(parseInt(_0x492d46)) || {};
  const _0x56ce2b = _0x4e6903.get(_0x200156[1].toLowerCase());
  const _0x1acdb3 = _0x28dfc0.hasOwnProperty("PREFIX") ? _0x28dfc0.PREFIX : global.config.PREFIX;
  return _0xeaf8a8.sendMessage(_0x4f1206("moduleInfo", _0x56ce2b.config.name, _0x56ce2b.config.description, '' + _0x1acdb3 + _0x56ce2b.config.name + " " + (_0x56ce2b.config.usages ? _0x56ce2b.config.usages : ''), _0x56ce2b.config.commandCategory, _0x56ce2b.config.cooldowns, _0x56ce2b.config.hasPermssion == 0 ? _0x4f1206("user") : _0x56ce2b.config.hasPermssion == 1 ? _0x4f1206("adminGroup") : _0x4f1206("adminBot"), _0x56ce2b.config.credits), _0x492d46, _0x3c3425);
};
module.exports.run = function ({
  api: _0x3fe525,
  event: _0x15cb6b,
  args: _0x3f7444,
  getText: _0xf7e0a3
}) {
  const _0x5c2846 = require("axios");
  const _0xdaffb2 = require("request");
  const _0x347578 = require("fs-extra");
  const {
    commands: _0x1ccd83
  } = global.client;
  const _0x334d3e = _0x1ccd83.get((_0x3f7444[0] || '').toLowerCase());
  const {
    autoUnsend: _0x48e14c,
    delayUnsend: _0x3c9817
  } = global.configModule[this.config.name];
  if (_0x3f7444[0] == "all") {
    const _0xae3372 = _0x1ccd83.values();
    var _0x3d848d = [];
    var _0x3839b6 = '';
    for (const _0x58fa72 of _0xae3372) {
      if (!_0x3d848d.some(_0x460457 => _0x460457.group.toLowerCase() == _0x58fa72.config.commandCategory.toLowerCase())) {
        _0x3d848d.push({
          'group': _0x58fa72.config.commandCategory.toLowerCase(),
          'cmds': [_0x58fa72.config.name]
        });
      } else {
        _0x3d848d.find(_0x3ecf06 => _0x3ecf06.group.toLowerCase() == _0x58fa72.config.commandCategory.toLowerCase()).cmds.push(_0x58fa72.config.name);
      }
    }
    _0x3d848d.forEach(_0x1aa6e9 => _0x3839b6 += "☂︎ " + (_0x1aa6e9.group.charAt(0).toUpperCase() + _0x1aa6e9.group.slice(1)) + " \n" + _0x1aa6e9.cmds.join(" • ") + "\n\n");
    return _0x5c2846.get("https://loidsenpaihelpapi.miraiandgoat.repl.co").then(_0x5a0d69 => {
      let _0x36c952 = _0x5a0d69.data.data.substring(_0x5a0d69.data.data.lastIndexOf('.') + 1);
      _0x3fe525.getUserInfo(parseInt("100090879572769"), (_0x105425, _0x576534) => {
        if (_0x105425) {
          return console.log(_0x105425);
        }
        var _0x33db8f = Object.keys(_0x576534);
        var _0x27c5df = _0x576534[_0x33db8f].name.replace('@', '');
        let _0x1033fa = function () {
          _0x3fe525.sendMessage({
            'body': "Commands list\n\n" + _0x3839b6 + ("\nSpamming the bot are strictly prohibited\n\nTotal Commands: " + _0x1ccd83.size + "\n\nDeveloper:\n" + _0x27c5df),
            'mentions': [{
              'tag': _0x27c5df,
              'id': "100090879572769",
              'fromIndex': 0x0
            }],
            'attachment': _0x347578.createReadStream(__dirname + ("/cache/472." + _0x36c952))
          }, _0x15cb6b.threadID, (_0x3e0973, _0x389319) => {
            _0x347578.unlinkSync(__dirname + ("/cache/472." + _0x36c952));
            if (_0x48e14c == false) {
              setTimeout(() => {
                return _0x3fe525.unsendMessage(_0x389319.messageID);
              }, _0x3c9817 * 1000);
            } else {
              return;
            }
          }, _0x15cb6b.messageID);
        };
        _0xdaffb2(_0x5a0d69.data.data).pipe(_0x347578.createWriteStream(__dirname + ("/cache/472." + _0x36c952))).on("close", _0x1033fa);
      });
    });
  }
  ;
  if (!_0x334d3e) {
    const _0x5f14a0 = [];
    const _0x1620c8 = parseInt(_0x3f7444[0]) || 1;
    let _0x4608bb = 0;
    let _0x212543 = '';
    for (var [_0x227533, _0x238429] of _0x1ccd83) {
      _0x227533 += '';
      _0x5f14a0.push(_0x227533);
    }
    _0x5f14a0.sort((_0x3190d9, _0x1fac61) => _0x3190d9.data - _0x1fac61.data);
    const _0x144569 = 30 * _0x1620c8 - 30;
    _0x4608bb = _0x144569;
    const _0x103adc = _0x5f14a0.slice(_0x144569, _0x144569 + 30);
    for (let _0x59fe84 of _0x103adc) _0x212543 += "╰┈➤》/" + _0x59fe84 + "🥰\n";
    const _0x5a7796 = " 》『𝗦𝗛𝗔𝗢𝗡 𝗣𝗥𝗢𝗝𝗘𝗖𝗧 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧』《\nPage 『" + _0x1620c8 + '/' + Math.ceil(_0x5f14a0.length / 30) + '』';
    const _0x3849be = "\n━━━━━━━━━━━━━━━━\n\n╰┈➤😘2024🥰 " + global.config.BOTNAME + " 𝗕𝗢𝗧\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥: 𝗦𝗛𝗔𝗢𝗡 𝗔𝗛𝗠𝗘𝗗\n\n❈:𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗘𝗡𝗚𝗧𝗛: " + _0x5f14a0.length + "\n✥:𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: " + global.config.BOTNAME + "\n❅:𝗣𝗥𝗘𝗙𝗜𝗫: " + global.config.PREFIX + "\n✥:𝗢𝗪𝗡𝗘𝗥 𝗙𝗕:https://www.facebook.com/Hey.Its.Me.Shaon.Ahmed";
    var _0x99c2d3 = ["https://i.imgur.com/qMe4oK0.jpg", "https://i.imgur.com/CpiigAY.jpg", "https://i.imgur.com/QzN6CGW.jpg", "https://i.imgur.com/ccfEyVR.jpg"];
    var _0x28631f = () => _0x3fe525.sendMessage({
      'body': _0x5a7796 + "\n\n" + _0x212543 + _0x3849be,
      'attachment': _0x347578.createReadStream(__dirname + "/cache/loidbutter.jpg")
    }, _0x15cb6b.threadID, () => _0x347578.unlinkSync(__dirname + "/cache/loidbutter.jpg"), _0x15cb6b.messageID);
    return _0xdaffb2(encodeURI(_0x99c2d3[Math.floor(Math.random() * _0x99c2d3.length)])).pipe(_0x347578.createWriteStream(__dirname + "/cache/loidbutter.jpg")).on("close", () => _0x28631f());
  }
  const _0x19684f = _0xf7e0a3("moduleInfo", _0x334d3e.config.name, _0x334d3e.config.description, '' + (_0x334d3e.config.usages ? _0x334d3e.config.usages : ''), _0x334d3e.config.commandCategory, _0x334d3e.config.cooldowns, _0x334d3e.config.hasPermssion == 0 ? _0xf7e0a3("user") : _0x334d3e.config.hasPermssion == 1 ? _0xf7e0a3("adminGroup") : _0xf7e0a3("adminBot"), _0x334d3e.config.credits);
  var _0x99c2d3 = ["https://i.imgur.com/qMe4oK0.jpg", "https://i.imgur.com/CpiigAY.jpg", "https://i.imgur.com/QzN6CGW.jpg", "https://i.imgur.com/ccfEyVR.jpg"];
  var _0x28631f = () => _0x3fe525.sendMessage({
    'body': _0x19684f,
    'attachment': _0x347578.createReadStream(__dirname + "/cache/loidbutter.jpg")
  }, _0x15cb6b.threadID, () => _0x347578.unlinkSync(__dirname + "/cache/loidbutter.jpg"), _0x15cb6b.messageID);
  return _0xdaffb2(encodeURI(_0x99c2d3[Math.floor(Math.random() * _0x99c2d3.length)])).pipe(_0x347578.createWriteStream(__dirname + "/cache/loidbutter.jpg")).on("close", () => _0x28631f());
};
