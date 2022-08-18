let data = JSON.parse(localStorage.getItem("video")) || [];
let video = document.getElementById("video");

let iframe = document.createElement("iframe");
iframe.src = `https://www.youtube.com/embed/${data.id}`;
iframe.allowFullscreen = true;

video.append(iframe);