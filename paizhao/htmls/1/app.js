const video = document.getElementById('video');
const button = document.getElementById('button');
const select = document.getElementById('select');
let currentStream;

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null

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
    // alert('6')
  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream);
  }
  const videoConstraints = {};
  if (select.value === '') {
    videoConstraints.facingMode = 'environment';
    alert(videoConstraints.facingMode)
  } else {
    videoConstraints.deviceId = { exact: select.value };
    alert(JSON.parse(videoConstraints))
  }
  const constraints = {
    video: videoConstraints,
    audio: false
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error);
    });
});

// 拍照按钮 canvas截屏
document.getElementById("btn-paizhao").addEventListener("click", function () {
  var video = document.getElementById('video');
  canvas = document.getElementById('canvasCemara');
  ctx = canvas.getContext('2d');
  var _w = 320, _h = 500;
  if (video.videoWidth > 0)
    // _h = video.videoHeight / (video.videoWidth / _w);
  canvas.setAttribute('width', _w);
  canvas.setAttribute('height', _h);
  ctx.fillRect(0, 0, _w, _h);
  ctx.drawImage(video, 0, 0, _w, _h);

  var pictureFilefont= canvas.toDataURL();  //获取图片的DataURL

  if(getUrlKey('pictureFileid') == 1){  // 正面
    window.localStorage.setItem('pictureFilefont', JSON.stringify(pictureFilefont));
    if(window.localStorage.getItem('pictureFilefont')){
      window.location.href="./IdCardImage.html?pictureFilefont=1"
    }

  }
  if(getUrlKey('pictureFileid') == 2){  // 反面
    window.localStorage.setItem('pictureFileback', JSON.stringify(pictureFilefont));
    if(window.localStorage.getItem('pictureFileback')){

      window.location.href="./IdCardImage.html?pictureFilefont=2"
    }
  }

});

navigator.mediaDevices.enumerateDevices().then(gotDevices);