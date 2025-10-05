const channelId = "UCv2kgT_YTX2QW2lpq8YtaLA";
const apiKey = "AIzaSyAZcmGAaqdKTCI1Tbz0GE55bLVhl5MK9HA";
const maxResults = 6;

async function loadYoutubeVideos() {
  const videoGrid = document.getElementById("video-grid");
  const noVideos = document.getElementById("no-videos");

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      noVideos.style.display = "none";
      videoGrid.innerHTML = data.items
        .map((item) => {
          if (!item.id.videoId) return "";
          return `
            <div class="video-card">
              <iframe src="https://www.youtube.com/embed/${item.id.videoId}" 
                title="${item.snippet.title}" frameborder="0" allowfullscreen></iframe>
              <h4>${item.snippet.title}</h4>
            </div>
          `;
        })
        .join("");

      // Update buttons
      document.getElementById("more-videos").href = `https://www.youtube.com/channel/${channelId}`;
      document.getElementById("subscribe-channel").href = `https://www.youtube.com/channel/${channelId}?sub_confirmation=1`;
    } else {
      noVideos.style.display = "block";
    }
  } catch (error) {
    console.error("Error loading YouTube videos:", error);
    noVideos.style.display = "block";
  }
}

// Load videos when DOM is ready
document.addEventListener("DOMContentLoaded", loadYoutubeVideos);

// share
const channelUrl = `https://www.youtube.com/channel/${channelId}`;

document.getElementById("share-channel").addEventListener("click", function (e) {
  e.preventDefault();

  if (navigator.share) {
    // ✅ Native share dialog (works on mobile & some browsers)
    navigator.share({
      title: "Check out our YouTube Channel!",
      text: "Watch the latest club videos here:",
      url: channelUrl,
    }).catch(console.error);
  } else {
    // ✅ Fallback (desktop): copy link to clipboard
    navigator.clipboard.writeText(channelUrl).then(() => {
      alert("Channel link copied to clipboard!");
    });
  }
});
