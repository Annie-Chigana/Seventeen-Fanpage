const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

//song titles
const songs = ['01 Shining Diamond', '02 아낀다', '03 Ah Yeah', '04 Jam Jam', '05 20'];

//keep track
let songIndex = 0;

//init load song to DOM
loadSong(songs[songIndex]);

//update song det
function loadSong(song) {
    title.innerText = song;
    audio.src = `Songs/${song}.m4a`;
    cover.src = `sevcarat/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
   const {duration, currentTime} = e.srcElement
   const progressPercent = (currentTime / duration) * 100
   progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    
    audio.currentTime = (clickX / width) * duration
}

//event lister 
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong();
    }else {
        playSong();
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)


/*/CODE THAT IS SEPERATE FROM THE MUSIC PLAYER AND WILL FOCUS ON OTHER ASPECTS OF THE WEBSITE.
document.getElementById('sev').addEventListener('click', function() {
    document.getElementById('17-carat').style.display = 'block';
    document.getElementById('close').style.display = 'block';
    musicContainer.style.display = 'block';

    
    document.getElementById('boys-be').style.display = 'none';

});

document.getElementById('byb').addEventListener('click', function() {
    document.getElementById('boys-be').style.display = 'block';
    document.getElementById('close').style.display = 'block';
    musicContainer.style.display = 'block';

    
    document.getElementById('17-carat').style.display = 'none';

});

//CLOSE THE MUSIC MENU WHEN THE X BUTTON IS CLICKED
document.getElementById('close').addEventListener('click', function() {
    document.getElementById('17-carat').style.display = 'none';
    document.getElementById('boys-be').style.display = 'none';

    document.getElementById('close').style.display = 'none';
    musicContainer.style.display = 'none';

});*/


//Horizontal music Scroll bar
const track = document.getElementById('album-covers');

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth/2; 

    const percentage = (mouseDelta/maxDelta) * -100;
    const nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${percentage}%, -50%)`;


}