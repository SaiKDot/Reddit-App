const electron = require('electron');

const {app, BrowserWindow, Menu, globalShortcut,ipcMain  } = electron;

require('events').EventEmitter.prototype._maxListeners = 1001;


 const request = require('request');
 const http = require('http');
 const https = require('https');
 const path = require('path')
 const _ = require('lodash'); 
 const axios = require('axios');
 const moment = require('moment')
 const fs = require('fs');
 const cheerio = require('cheerio');
 const utility = require('./utils/utility');
 
require('electron-reload')(__dirname);


const { dialog } = require('electron')

let ultUrls = [];
let dir;
let query;
const download_folder = app.getPath('downloads')

let  mainWindow;
let addUserWindow;
let addSubredditWindow;
 
const Store = require('electron-store');
const userStore = new Store({
  name: 'users',
  cwd: 'data'
});

const subrStore = new Store({
  name: 'subreddits',
  cwd:'data'
})

 


const MenuTemplate = [ 
  {
    label : 'App',
    submenu: [
    {
      label : 'add user',
      click() { createAddUserWindow();}
    },
    {
      label : 'add Subreddit',
      click() { createAddSubredditWindow();}
    },
    {
      label: 'settings',
      click() {createSettingsWindow()}
    }
    ]
  },
  {
    label : 'User List',
    submenu: [
    {
      label : 'Save',
      click() { saveUserList();}
    }
    ]
  },
  {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
 
]

function createWindow () {
  mainWindow = new BrowserWindow({
            minWidth: 800,
            frame: !0,
            minHeight: 700,
            height:850,
            width:805,
             webPreferences: {
                     nodeIntegration: true
                 }
            
          })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  const mainMenu = Menu.buildFromTemplate(MenuTemplate)
  mainWindow.setMenu(mainMenu)


  globalShortcut.register('CommandOrControl+Q', () => {
    
    let cwindow = BrowserWindow.getFocusedWindow();
    console.log(cwindow);
        cwindow.close()
    
    })
}

function createAddUserWindow() {
  addUserWindow = new BrowserWindow({
    width: 300,
    height: 190,
    title: "Add New User",
    transparent: true,
    resizable: false,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // addUserWindow.setMenu(null)
  addUserWindow.loadURL(`file://${__dirname}/src/index.html#/adduser`);
}

function createAddSubredditWindow() {
  addSubredditWindow = new BrowserWindow({
    width: 300,
    height: 190,
    title: "Add New Subreddit",
    transparent: true,
    resizable: false,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // addUserWindow.setMenu(null)
  addSubredditWindow.loadURL(`file://${__dirname}/src/index.html#/addsubreddit`);
}
function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
           
            frame: !0,            
            width:400,
            height:400,
            webPreferences: {
                     nodeIntegration: true
                 },
            parent:mainWindow,
            modal: true,
              resizable: false
          })
  // settingsWindow.setMenu(null)
  settingsWindow.loadURL(`file://${__dirname}/src/index.html#/imgur-settings`);

}
function saveUserList() {
  mainWindow.webContents
     .send('userList:request')
}
app.on('ready', function () {  
     createWindow();
    

    
  
});

ipcMain.on("IMGUR_SAVED_SUCCESSS", (event) => {
          settingsWindow.close()
     });

ipcMain.on("user:submitted", (event,user) => {
   // console.log('user:recieved',user);
           mainWindow.webContents
              .send('user:recieved', user)
      addUserWindow.close()

 });
ipcMain.on("subreddit:submitted", (event,sub) => {
   // console.log('subr:recieved',sub);
           mainWindow.webContents
              .send('subreddit:recieved', sub)
 });

ipcMain.on("leftPanel:Open", (event,arg) => {
          // console.log('leftPanel:recieved',arg);
           mainWindow.webContents
              .send('leftPanel:Open', arg)
     });
ipcMain.on("rightPanel:Open", (event,arg) => {
          // console.log('right:recieved',arg);
           mainWindow.webContents
              .send('rightPanel:Open', arg)
     });
ipcMain.on("userList:store", (event,users) => {
  // console.log('userList:recieved',users);
             userStore.set('users', users);
});
ipcMain.on("userList:store", (event,users) => {
  // console.log('userList:recieved',users);
             userStore.set('users', users);
});
ipcMain.on("subrList:store", (event,subrs) => {
  // console.log('sublist:recieved',subrs);
             subrStore.set('subreddits', subrs);
});
ipcMain.on("epoch:changed", (event,resp) => {
    console.log('sds:recieved',resp);
    let sd = subrStore.get('subreddits')   
    let y =    _.findKey(sd, 'name', resp.name);
    sd[y].endEpoch = resp.m
    subrStore.set('subreddits', sd);          

});
ipcMain.on("userepoch:changed", (event,resp) => {
    console.log('sds:recieved',resp);
    let sd = userStore.get('users')   
    let y =    _.findKey(sd, 'name', resp.name);
    sd[y].endEpoch = resp.m
    userStore.set('users', sd);          

});

 


//-------------------------------------------------------------------------------------------------------------------------------//








ipcMain.on("download.posts",(event,request) =>  {
   
    require('dns').resolve('www.google.com', function(err) {
      if (err) {
         mainWindow.webContents.send('no connection', {})
      } 

      else {


          switch(request.downloadType) {

            case "subreddit" : {
                let sub = request.downParam.name
                let epoch = request.downParam.epoch
                dir =  path.join(download_folder, 'Reddit-Down',sub);
                query = 'subreddit';
               if (!fs.existsSync(dir)){
                 fs.mkdir(dir, {recursive: true}, err => { console.log(err);})
                }
 
            getSubreddit(sub,epoch) 

            }
            break;
            case "user" : {
              let user = request.downParam.name
              let epoch = request.downParam.epoch
              dir =  path.join(download_folder, 'Reddit-Down',user);
               console.log({dir})
              query = 'user';
              if (!fs.existsSync(dir)) {
                 fs.mkdir(dir, {recursive: true}, err => { console.log(err);})
              }
              getUser(user,epoch)
            }
            break;

            default :  {console.log('input error')}

          }
      }
    });
})

/*  SUBREDDIT RIP */
const requestSub = (sub, epoch) => {
  let res = {};
  const sub_url = `https://api.pushshift.io/reddit/search/submission/?subreddit=${sub}&limit=3&sort=desc&before=${epoch}`;
  console.log(sub_url)
  return new Promise((resolve, reject) => {
    axios.get(sub_url).then(response => {
      let d = response.data.data;
      let e = d[d.length - 1].created_utc;
      res.data = d;
      res.epoch = e;
      return resolve(res)
    }).catch(error => {
      // return reject(error.message)
    })
  })
}
async function getSubreddit(sub,ep) {
  
  let today =  moment(new Date()).valueOf();
  let ep_a = moment(ep).valueOf()
   console.log(today,ep_a)
  let startEpoch;
  if(today < ep_a) {
    startEpoch = today;
  }
  else {
    startEpoch = ep_a;
  }








  var dataArray = [];
  const resp = await requestSub(sub, startEpoch);
  const jsondat = resp.data;
  dataArray = jsondat.concat(dataArray);
  endEpoch = resp.epoch;

  let ya  = moment.unix(endEpoch).format("M-D-YYYY");
  console.log({ya})

  let sd = subrStore.get('subreddits')   
  let y =    _.findKey(sd, 'name', sub);
  sd[y].endEpoch = ya
  subrStore.set('subreddits', sd);  
  console.log(subrStore.get('subreddits'))        


  var result = _.map(dataArray, function(o) {
    return _.pick(o, ['title', 'author', 'url', 'subreddit', 'created_utc', 'domain', 'media', 'full_link', 'created_utc'])
  })


  // console.log({result,epoch});


 
  await getLinks(sub, result, query)  


  // console.log({ultUrls});
  // storeUrls(ultUrls);
}

/*  /SUBREDDIT RIP */



/*  USER RIP RIP */
const requestUser = (user, epoch) => {
  let res = {};
  const sub_url = `https://api.pushshift.io/reddit/search/submission/?author=${user}&limit=20&sort=desc&before=${epoch}`;
  console.log(sub_url)
  return new Promise((resolve, reject) => {
    axios.get(sub_url).then(response => {
      let d = response.data.data;
      let e = d[d.length - 1].created_utc;
      res.data = d;
      res.epoch = e;
      return resolve(res)
    }).catch(error => {
      // return reject(error.message)
    })
  })
}



async function getUser(user,ep) {
  let today =  moment(new Date()).valueOf();
  let ep_a = moment(ep).valueOf()
   console.log(today,ep_a)
  let startEpoch;
  if(today < ep_a) {
    startEpoch = today;
  }
  else {
    startEpoch = ep_a;
  }


  var dataArray = [];
  const resp = await requestUser(user, startEpoch);
  const jsondat = resp.data;
  dataArray = jsondat.concat(dataArray);
  epoch = resp.epoch;
  var result = _.map(dataArray, function(o) {
    return _.pick(o, ['title', 'author', 'url', 'subreddit', 'created_utc', 'domain', 'media', 'full_link', 'created_utc'])
  })
  // console.log({result,epoch});
  
 
  await getLinks(user, result, query)
  // console.log({ultUrls});
  // storeUrls(ultUrls);
}

/*  /USER RIP RIP */







async function getLinks(param,data,query) {
  // console.log(data.length);
  let ffilename
  let psub;
  var name;
  let g;
  psub = utility.checkForPsub(param);
  
  for(const o of data) {


    title = utility.sanitizeString(o.title)
    if(psub==true && query=='subreddit') {
      name =   title + ' U-- ' +o.author
    }
    else {
      name =   title
    }


    switch(o.domain) {
      case "imgur.com" : {
        console.log(o.url)
         id = o.url.substring(o.url.lastIndexOf("/") + 1);    
         if ( o.url.includes("https://imgur.com/a/") || o.url.includes("https://imgur.com/gallery/") ||  o.url.includes("http://imgur.com/a/") || o.url.includes("http://imgur.com/gallery/")) 
         {
          await getAlbum(title,id,psub,o.author).then((res) => {
            ultUrls = [...ultUrls, ...res]
          }).catch(err =>  console.log(err))
         
          
         }
         else {

              console.log(o.url)
              let link;
              let file_name;
              var ext = o.url.substr((o.url.lastIndexOf('.') + 1));
              ext = utility.sanitizeExt(ext);
              let filename = path.basename(o.url);
              var extArr = ['mp4', 'gifv', 'png', 'jpg', 'jpeg']
              if (extArr.includes(ext)) {
                if (ext == 'gifv') {
                  file_name = name + '.mp4'
                  filename = filename.replace('.gifv', '.mp4')
                  link = 'https://i.imgur.com/' + filename;
                } else {
                  file_name = name + '.' + ext;
                  link = 'https://i.imgur.com/' + filename;
                }
                ultUrls.push({
                  file_name: file_name,
                  url: link
                });
              } else {
                await getImgur(title, id, psub, o.author, o.url).then((link) => {
                  var ext = link.substr((link.lastIndexOf('.') + 1));
                  ext = utility.sanitizeExt(ext);
                  file_name = name + '.' + ext;
                  ultUrls.push({
                    file_name: file_name,
                    url: link
                  });
                })
              }
      }

    }
      break;
      case "gfycat.com" : {
        console.log(o.url)
           ffilename   = name + '.mp4'
           await downloadGfyCat(o.url)
           .then((res) => {               
               let p = {file_name:ffilename,url:res}
               ultUrls.push(p)
          }).catch(err =>  console.log(err))
         
      }
      break;
      case "v.redd.it"  : {
        console.log(o.url)
       
       ffilename   = name + '.mp4'
       await downloadReddtVideo(o.full_link,o.url,name)
       .then((res) => {                      
            let p = {file_name:ffilename,url:res}
            ultUrls.push(p)
       }).catch(err =>  console.log(err))
        
      }
      break;
      case "i.imgur.com" : {
        console.log(o.url)
        ext = o.url.substr((o.url.lastIndexOf('.') + 1));
        ext = utility.sanitizeExt(ext);
        if(ext == 'gifv') {
          ext = 'mp4';
          ext = utility.sanitizeExt(ext);
        }
        file_name = name + '.' + ext;
        ultUrls.push({file_name:file_name,url:o.url})
      }
      break;
      default : {
      console.log(o.url)
          if (utility.isDirectLink(o.url))
          {
            ext = o.url.substr((o.url.lastIndexOf('.') + 1));
            ext = utility.sanitizeExt(ext);
            let file_name = name+ '.' + ext;
            ultUrls.push({file_name:file_name,url:o.url})
          }
          else if(o.domain.includes('v.redd.it'))
          {
            ffilename   = name + '.mp4'
            await downloadReddtVideo(o.full_link,o.url,name)
            .then((res) => {                      
                 let p = {file_name:ffilename,url:res}
                 ultUrls.push(p)
            }).catch(err =>  console.log(err))
          }
          else {
            console.log('other',o.url,o.domain)
          }
      }
      break;
    
    }
    
    

  }
   console.log(ultUrls);
   mainWindow.webContents.send('ultUrl',ultUrls)
    downloadALL(ultUrls)
   ultUrls = [];
}



/* /GFYCAT */ 

function downloadGfyCat(url) {
 
     return new Promise((resolve, reject) => {
       request(url, function(error, response, html) {
        // console.log(url, response.statusCode)
         let m;
         if (!error && response.statusCode != 404) {
           let $ = cheerio.load(html);

           $("video source").each(function(num, val) {
             if ($(this).attr("type") == "video/mp4" && $(this).attr("src").includes("mobile") == false ) 
             {
               return resolve($(this).attr("src"));
             }
           });
         } else {
          console.log('error')
           reject(error);
         }
       });
     });

    
}


/* /GFYCAT */

/* IMGUR ALBUM */
  function getAlbum(title,id,psub,author) {
   
    let alburls  = [];
    
    var url = "https://api.imgur.com/3/album/" + id;
    var Authorization = "Client-ID 295ebd07bdc0ae8"
    var options = {
            method: 'GET',
            url: url,
            headers: {
                'Authorization' : "Client-ID 295ebd07bdc0ae8"         
            }
        };
     return new Promise((resolve,reject) => {
        request(options,(error,response,body) => {
             if(!error && response.statusCode != 404) {
              let data = JSON.parse(body)
                
               let images = data.data.images;
                // console.log({images})

              for(v of images) {
                let p = {};
                 var ext = v.link.split('.').pop();
                  ext = utility.sanitizeExt(ext);
                 if(psub == true && query == 'subreddit') {
                   // console.log(title + ' '+ 'U-- ' +auth);
                   p.file_name = title + ' '+ 'U-- ' +author+ '.'+ext;
                   p.url = v.link
                  
                 } else {
                   p.file_name = title+ '.'+ext;
                   p.url = v.link
                   
                  
                 }
                 alburls.push(p);
               } 
               return resolve(alburls);
             } else{
              return reject(error)
             }

              // mainWindow.webContents.send('res',data)
        })
     })
  }

/* /IMGUR ALBUM */


/* IMGUR IMAGE */

function getImgur(title,id,psub,author,url) {
 
 
  
  var url = "https://api.imgur.com/3/image/" + id
  var Authorization = "Client-ID 295ebd07bdc0ae8"
  var options = {
          method: 'GET',
          url: url,
          headers: {
              'Authorization' : Authorization        
          }
      };
 
   return new Promise((resolve,reject) => {
   

    request(options,(error,response,body) => {
         if(!error && response.statusCode != 404) {
          let data = JSON.parse(body)
            
             
           return resolve(data.data.link);
         } else{
          return reject(error)
         }

          // mainWindow.webContents.send('res',data)
    })


 
   })
}








/* /IMGUR IMAGE */


/* v.reddit */
 

 
function downloadReddtVideo(full_link,url,name) {
  
 

  return new Promise((resolve,reject) => {

    let ffilename = name + '.mp4';
    let vurl;
   
    bitrates = ["DASH_1080","DASH_720","DASH_600","DASH_480","DASH_360","DASH_240"]

    for(bitrate of bitrates)
    {
      console.log(bitrate);
        let videoURL = url+"/"+bitrate;
       request(videoURL,(error,response,body) => {
            if(!error) {
              vurl = videoURL;
              
              return resolve(vurl);

            } else{
            return reject(error)
            }

             // mainWindow.webContents.send('res',data)
       })
       if(vurl) break;      
    }
    

  }) 

}




/* /v.reddit */
 
 async function downloadALL(ultUrls) {
    
   for(ult of ultUrls)
   {
      await downloadFile(ult)
      .catch(err => console.log(err))
   }
   console.log('All Downloaded')
   
 };



 function downloadFile(ult) {
   return new Promise((resolve, reject, cb) => {
     console.log('Downloading File: ', ult.file_name);
     mainWindow.webContents
              .send('downloading',ult.file_name)
     var request = (ult.url.substr(0, 5) === 'https' ? https : http).get(ult.url, function(httpResponse) {
       let file = utility.writeFile(ult.file_name, dir)
       httpResponse.pipe(file);
       file.on('error', function(err) {
         console.log("ERROR:" + err);
         file.read();
       });
       file.on('finish', function() {
         console.log('File downloaded')
         return resolve(file.close(cb)); // close() is async, call cb after close completes.
       });
     }).on('error', function(err) { // Handle errors
       return reject(err)
     });
   });
 }
 
 


 function downloadJson(jsonData) {
  fs.writeFile("links.json", JSON.stringify(jsonData), function(err) {
      if (err) {
          console.log(err);
      }
  });
 }
 
