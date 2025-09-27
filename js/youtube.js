const API_KEY = "YOUR_API_KEY"; 
const CHANNEL_ID = "YOUR_CHANNEL_ID"; 
const MAX_RESULTS = 10;

async function loadVideos() {
  let response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`);
  let data = await response.json();
  
  let videoGrid = document.getElementById("video-grid");
  let noVideos = document.getElementById("no-videos");

  videoGrid.innerHTML = "";

  // If no videos found
  if (!data.items || data.items.length === 0) {
    noVideos.style.display = "block";
    return;
  }

  noVideos.style.display = "none";

  // Show videos
  data.items.forEach(item => {
    if(item.id.kind === "youtube#video") {
      let video = document.createElement("iframe");
      video.src = `https://www.youtube.com/embed/${item.id.videoId}`;
      video.setAttribute("frameborder", "0");
      video.setAttribute("allowfullscreen", true);
      videoGrid.appendChild(video);
    }
  });
}

loadVideos();