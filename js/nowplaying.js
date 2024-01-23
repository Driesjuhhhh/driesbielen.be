// Setting up Spotify API and Endpoints
const CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const client_id = '67e9cdf59f724bddbf55e1cfe93d752b';
const client_secret = '263576f1b76449eaac2d205f0c3b8b9b';
const refresh_token = 'AQDlt5wFKgHFuVk-GU9kUmFMwfFg5zxgpXNTPPg5WrZCTD10Ie7ouGBMA_VCwotwNO__3JnHeDrmaDPJFuF-a7uKPCOX1M0JeMUzTSQ3u-p2DnxhW73Abz-_5TJ8WbqZgAc';

// Function to generate an access token using the refresh token
async function getAccessToken(client_id, client_secret, refresh_token) {
    try {
        const basic = btoa(`${client_id}:${client_secret}`);
    
        const response = await fetch(`${CORS_ANYWHERE_URL}${SPOTIFY_API_BASE_URL}api/token`, {
            method: 'POST',
            headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refresh_token}&scope=user-read-playback-state`,
        });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.status} ${response.statusText}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching access token: ', error);
      return { error: 'Failed to fetch access token' };
    }
}
  
  
// Function to fetch the currently playing song
async function getNowPlaying() {
    try {
        const { access_token } = await getAccessToken(client_id, client_secret, refresh_token);
  
        const response = await fetch(`${CORS_ANYWHERE_URL}${NOW_PLAYING_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
  
        if (response.status > 400) {
            throw new Error('Unable to Fetch Song');
        } else if (response.status === 204) {
            throw new Error('Currently Not Playing');
        }
  
        const song = await response.json();
        return {
            albumImageUrl: song.item.album.images[0].url,
            artist: song.item.artists.map(artist => artist.name).join(', '),
            isPlaying: song.is_playing,
            songUrl: song.item.external_urls.spotify,
            title: song.item.name,
            timePlayed: song.progress_ms,
            timeTotal: song.item.duration_ms,
            artistUrl: song.item.album.artists[0].external_urls.spotify,
        };
    } catch (error) {
        console.error('Error fetching currently playing song: ', error);
        return error.message.toString();
    }
}
  
function updateNowPlayingUI(nowPlaying) {
    const albumImage = document.getElementById('albumImage');
    const titleElement = document.getElementById('nowPlayingTitle');
    const artistElement = document.getElementById('nowPlayingArtist');
    const timeElement = document.getElementById('nowPlayingTime');
    const stateElement = document.getElementById('nowPlayingState');
  
    if (nowPlaying.title) {
        nowPlaying.isPlaying ? stateElement.textContent = 'PLAY' : stateElement.textContent = 'PAUSE';
  
        const secondsPlayed = Math.floor(nowPlaying.timePlayed / 1000);
        const minutesPlayed = Math.floor(secondsPlayed / 60);
        const secondsTotal = Math.floor(nowPlaying.timeTotal / 1000);
        const minutesTotal = Math.floor(secondsTotal / 60);
  
        albumImage.src = nowPlaying.albumImageUrl;
        titleElement.innerHTML = nowPlaying.isPlaying ? `<a href="${nowPlaying.songUrl}">${nowPlaying.title}</a>` : nowPlaying.title;
        artistElement.innerHTML = nowPlaying.isPlaying ? `<a href="${nowPlaying.artistUrl}">${nowPlaying.artist}</a>` : nowPlaying.artist;
        timeElement.textContent = `${pad(minutesPlayed)}:${pad(secondsPlayed)} / ${pad(minutesTotal)}:${pad(secondsTotal)}`;
    } else if (nowPlaying === 'Currently Not Playing') {
        stateElement.textContent = '';
        titleElement.textContent = '';
        artistElement.textContent = '';
    } else {
        titleElement.textContent = 'failed to';
        artistElement.textContent = 'fetch song';
    }
}
  
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}
  
function fetchAndUpdateNowPlaying() {
    getNowPlaying().then(updateNowPlayingUI);
}
  
// Initial fetch and update
fetchAndUpdateNowPlaying();
  
// Set interval for periodic updates
setInterval(fetchAndUpdateNowPlaying, 10000);
