module.exports.config = {
  name: "nz",
  version: "1.0.1",
  permission: 0,
  credits: "Islamick Cyber Chat",
  prefix: true,
  description: "Text translation",
  category: "media",
  usages: "[hi/ar/bn/vi/en] [Text]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const apis = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json')
  const Shaon = apis.data.api
  const prompt = args.join(" ");

  if (!prompt) return api.sendMessage("[ ! ] Input your address", event.threadID, event.messageID);

  try {
    const { data: { data: { timings } } } = await axios.get(`http://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(prompt)}`);
    const convertTo12Hour = t => `${(h=t.split(':')[0]%12||12)}:${t.split(':')[1]} ${h>=12?'PM':'AM'}`;
    const formattedTimings = Object.fromEntries(Object.entries(timings).map(([k, v]) => [k, convertTo12Hour(v)]));

    const { data: { url: { url: videoUrl } } } = await axios.get(`${Shaon}/video/status2`);
    const videoBuffer = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoPath = `${__dirname}/cache/video.mp4`;

    fs.writeFileSync(videoPath, Buffer.from(videoBuffer.data));
    const videoReadStream = fs.createReadStream(videoPath);

    const msg = `───※ ·SHAON PROJECT· ※───\n\nনামাযের-সময়: ${prompt}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n╰┈► ফজর: ${formattedTimings.Fajr}\n╰┈► যহর: ${formattedTimings.Dhuhr}\n╰┈► আছর: ${formattedTimings.Asr}\n╰┈► সূর্যাস্ত: ${formattedTimings.Sunset}\n╰┈► মাগরিব: ${formattedTimings.Maghrib}\n╰┈► ইশা: ${formattedTimings.Isha}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n╰┈► ইমসাক: ${formattedTimings.Imsak}\n╰┈► মধ্যরাত: ${formattedTimings.Midnight}\n\n───※ ·SHAON PROJECT· ※───`;

    return api.sendMessage({ body: msg, attachment: videoReadStream }, event.threadID, event.messageID);
  } catch (error) {
    console.error("❐ SHAON 6X SERVER BUSY NOW 💔🥀:", error);
    return api.sendMessage("❐ SHAON 6X SERVER BUSY NOW 💔🥀", event.threadID, event.messageID);
  }
};
