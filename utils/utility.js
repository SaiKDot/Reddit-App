
const request = require('request');
const http = require('http');
const https = require('https');
const path = require('path')
const _ = require('lodash');
const axios = require('axios');
const fs = require('fs');


function checkForPsub(sub) {
const thesubs = ['gonewild', 'amatuer_milfs', '40plusGoneWild','gonewild30plus','gonewildcolor','PetiteGoneWild','Workoutgonewild','asiansgonewild'];
if (thesubs.includes(sub))
  return true;
else 
  return false;
}




function isDirectLink(url) {
  ext = url.substr((url.lastIndexOf('.') + 1));
   ext = sanitizeExt(ext);
  var extArr = ['mp4','gifv','png','jpg','jpeg','mp3']  
  if(extArr.includes(ext)) {
    return true;
  } else {
    return false;
  }
};


function sanitizeExt(ext) {
  if (ext.includes('?')) {
    ext = ext.substring(0, ext.lastIndexOf("?") + 0)
  }
  else if(ext.includes('/')) {
    ext = ext.substring(0, ext.lastIndexOf("/") + 0)
  }
  else if(ext.includes('-')) {
    ext = ext.substring(0, ext.lastIndexOf("/") + 0)
  }
  return ext;
}



function sanitizeString(str) {
  str = str.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
  str = str.replace(/[|&;:*$%@"/<>?+,]/g, "");
  str = str.replace("  ", " ")
  text = str.trimStart();
  return text
}



function writeFile(filename, destination) {
  let num = 1;
  let nm_wo_ext = filename.substr(0, filename.lastIndexOf("."));
  let ext = filename.split(".").pop();
  ext = sanitizeExt(ext);
  let jpath = path.join(destination, filename);
  while (fs.existsSync(jpath)) {
    filename = `${nm_wo_ext} (${num++}).${ext}`;
    jpath = path.join(destination, filename);
  }
  // fs.writeFileSync(jpath,data )
  return fs.createWriteStream(jpath);
}



module.exports = {
  checkForPsub,  
  isDirectLink,
  sanitizeExt,
  sanitizeString,
  writeFile
}