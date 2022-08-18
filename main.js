const api_key = "AIzaSyC7k5o1Wi0-hDM3toKTy4QYoTvfbeGLJbo";

let container = document.getElementById("results");
let popular = document.getElementById("popular");

// Popular Videos
const popularURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=50&regionCode=IN&key=${api_key}`

fetch(popularURL)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data.items);
        appendPopular(data.items);
    })
    .catch(function (err) {
        console.log("error:", err);
    })

let appendPopular = (data) => {
    popular.innerHTML = "";

    data.forEach(({ id, snippet: { title, channelTitle, thumbnails: { medium: { url } } } }) => {
        let div = document.createElement("div");
        container.style.cursor = "pointer";

        let image = document.createElement("img");
        image.src = url;

        let videoTitle = document.createElement("p");
        videoTitle.innerText = title;

        let channelName = document.createElement("p");
        channelName.innerText = channelTitle;

        div.append(image, videoTitle, channelName);

        let video = {
            id
        };

        div.onclick = () => {
            playVideo(video);
        }

        popular.append(div);
    });
}

// Search Videos
search = async () => {
    let query = document.getElementById("searchBar").value;
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${api_key}`;
    let res = await fetch(url);

    let data = await res.json();

    document.getElementById("searchBar").value = "";
    console.log(data.items);
    append(data.items);
}

let append = (data) => {
    container.innerHTML = "";
    popular.innerHTML = "";

    data.forEach(({ id: { videoId }, snippet: { title, description, channelTitle, thumbnails: { medium: { url } } } }) => {
        let div = document.createElement("div");
        div.style.cursor = "pointer";

        let image = document.createElement("img");
        image.src = url;

        let p = document.createElement("p");
        p.innerText = title;

        let channelName = document.createElement("p");
        channelName.innerText = channelTitle;

        let desc = document.createElement("p");
        desc.innerText = description;

        let subDiv = document.createElement("div");
        subDiv.append(p, channelName, desc)

        let video = {
            id: videoId
        };

        div.append(image, subDiv);

        div.onclick = () => {
            playVideo(video);
        }

        container.append(div);
    });
}

let playVideo = (video) => {
    localStorage.setItem("video", JSON.stringify(video));
    console.log(video);
    window.location.href = "video.html";
}