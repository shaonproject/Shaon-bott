const axios = require('axios');

module.exports.config = {
  name: "add",
  version: "11.9.7",
  permission: 0,
  credits: "Islamick Cyber Chat",//Nazrul
  prefix: true,
  description: "random love story video",
  category: "video",
  usages: "random",
  cooldowns: 30,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const imageUrl = event.messageReply.attachments[0].url;
    const videoName = args.join(" ").trim(); 

    if (!videoName) {
      return api.sendMessage("Please provide a name for the video.", event.threadID, event.messageID);
    }
    const apis1 = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json')
  const Shaon1 = apis1.data.api
  

    const imgurResponse = await axios.get(`${Shaon1}/imgurv2?link=${encodeURIComponent(imageUrl)}`);
    const imgurLink = imgurResponse.data.uploaded.image;
    
    const apis = await axios.get('https://raw.githubusercontent.com/shaonproject/Shaon/main/api.json');
    const Shaon = apis.data.api;

    const response = await axios.get(`${Shaon}/video/random?name=${encodeURIComponent(videoName)}&url=${encodeURIComponent(imgurLink)}`);
    
    api.sendMessage(`💌MESSAGE: URL ADDED SUCCESSFULLY\n🟡NAME: ${response.data.name}\n🖇️URL: ${response.data.url}`, event.threadID, event.messageID);

  } catch (e) {
    console.log(e);
    api.sendMessage(`An error occurred: ${e.message}`, event.threadID, event.messageID);
  }
};
