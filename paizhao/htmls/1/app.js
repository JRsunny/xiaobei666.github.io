const video = document.getElementById('video');
const button = document.getElementById('button');
const select = document.getElementById('select');
let currentStream;

let isLoading = weui.loading('加载中');

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null

}

function successCallback(stream) {
  let imgs = document.getElementById("imgs")
  if(getUrlKey('pictureFileid') == 1){
    imgs.src="./bg-zhengmian.png"
  }  // 正面
  if(getUrlKey('pictureFileid') == 2){
    imgs.src="./bg-fanmian.png"
  } 
  video.srcObject = stream;
  imgs.style="display:block;position:absolute;z-index: 9999;"
  isLoading.hide()
  // video.play();
}
function errorCallback(error) {
  console.log("navigator.getUserMedia error: ", error);
  //  $(".CameraTips").show();
}

// 进入全屏
function FullScreen(ele) {
  // var ele = document.documentElement;
  var ele = ele;
  if (ele .requestFullscreen) {
      ele .requestFullscreen();
  } else if (ele .mozRequestFullScreen) {
      ele .mozRequestFullScreen();
  } else if (ele .webkitRequestFullScreen) {
      ele .webkitRequestFullScreen();
  }
}
//退出全屏
function exitFullscreen() {
  var de = document;
  if (de.exitFullscreen) {
      de.exitFullscreen();
  } else if (de.mozCancelFullScreen) {
      de.mozCancelFullScreen();
  } else if (de.webkitCancelFullScreen) {
      de.webkitCancelFullScreen();
  }
}

function gotDevices(mediaDevices) {
  select.innerHTML = '';
  select.appendChild(document.createElement('option'));
  let count = 1;
  mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = mediaDevice.deviceId;
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}

// button.addEventListener('click', event => {
  document.getElementById("button").addEventListener('click', event => {
  // FullScreen(video)

    // alert('6')
  // if (typeof currentStream !== 'undefined') {
  //   stopMediaTracks(currentStream);
  // }
  // const videoConstraints = {};
  // if (select.value === '') {
  //   videoConstraints.facingMode = 'environment';
  //   // alert(videoConstraints.facingMode)
  // } else {
  //   videoConstraints.deviceId = { exact: select.value };
  //   // alert(JSON.parse(videoConstraints))
  // }
  /* const constraints = {
    video: videoConstraints,
    audio: false
  }; */

  const constraints = {
    audio: false,
    // video: true
    // video:{ facingMode: "user" }
    video:{ facingMode: "environment"}
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    // .then(stream => {
    //   currentStream = stream;
    //   video.srcObject = stream;
      
    //   return navigator.mediaDevices.enumerateDevices();
    // })
    .then(successCallback)
    .catch(error => {
      console.error(error);
    });
});

// 拍照按钮 canvas截屏
document.getElementById("btn-paizhao").addEventListener("click", function () {
  var video = document.getElementById('video');
  canvas = document.getElementById('canvasCemara');
  // 开始画布截取
  ctx = canvas.getContext('2d');
  var _w = 300, _h = 192;
  if (video.videoWidth > 0)
  // alert('video宽度==='+video.videoWidth)
  // _h = video.videoHeight / (video.videoWidth / _w);
  canvas.setAttribute('width', _w);
  canvas.setAttribute('height', _h);
  ctx.fillRect(0, 0, _w, _h);
  ctx.imageSmoothingEnabled = false; // 去除锯齿重叠

  ctx.drawImage(video, 0, 0, _w, _h, 0, 0, _w, _h);

  var pictureFilefont= canvas.toDataURL();  //获取图片的DataURL

  if(getUrlKey('pictureFileid') == 1){  // 正面
    window.sessionStorage.setItem('pictureFilefont', JSON.stringify(pictureFilefont));
    if(window.sessionStorage.getItem('pictureFilefont')){
      window.location.href="./idcard1.html?pictureFilefont=1"
    }

  }
  if(getUrlKey('pictureFileid') == 2){  // 反面
    window.sessionStorage.setItem('pictureFileback', JSON.stringify(pictureFilefont));
    if(window.sessionStorage.getItem('pictureFileback')){

      window.location.href="./idcard1.html?pictureFilefont=2"
    }
  }

});

// navigator.mediaDevices.enumerateDevices().then(gotDevices);



const constraints = {
  audio: false,
  // video: true
  // video:{ facingMode: "user" }
  video:{ facingMode: "environment"}
};
navigator.mediaDevices
  .getUserMedia(constraints)
  // .then(stream => {
  //   currentStream = stream;
  //   video.srcObject = stream;
    
  //   return navigator.mediaDevices.enumerateDevices();
  // })
  .then(successCallback)
  .catch(error => {
    console.error(error);
  });