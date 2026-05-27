const songs = [

    {
        title:"HER",
        artist:"clairo",

        audio:"music/song1.mp3",

        bg:"images/player1bg.png",
        vinyl:"images/vinyl1.png",

        color:"#d57d8c"
    },

    {
        title:"Blue",
        artist:"yung kai",

        audio:"music/song2.mp3",

        bg:"images/player2bg.png",
        vinyl:"images/vinyl2.png",

        color:"#6d9ed1"
    }

]



const bg = document.getElementById("bg")
const vinyl = document.getElementById("vinyl")

const title = document.getElementById("title")
const artist = document.getElementById("artist")

const playBtn = document.getElementById("playBtn")
const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")

const progress = document.getElementById("progress")
const progressContainer =
document.getElementById("progressContainer")

const current =
document.getElementById("current")

const duration =
document.getElementById("duration")



let songIndex = 0



const audio = new Audio()



/* load song */

function loadSong(song){

    title.innerText = song.title

    artist.innerText =
    `by ${song.artist}`

    bg.src = song.bg

    vinyl.src = song.vinyl

    title.style.color = song.color
    artist.style.color = song.color

    progress.style.background = song.color

    document.querySelector(".time")
    .style.color = song.color

    audio.src = song.audio
}



/* play */

function playSong(){

    audio.play()

    vinyl.classList.add("spin")
}



/* pause */

function pauseSong(){

    audio.pause()

    vinyl.classList.remove("spin")
}



/* play pause */

let playing = false

playBtn.addEventListener("click", ()=>{

    if(playing){

        pauseSong()

        playing = false
    }

    else{

        playSong()

        playing = true
    }

})



/* next */

nextBtn.addEventListener("click", ()=>{

    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()

    playing = true
})



/* previous */

prevBtn.addEventListener("click", ()=>{

    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()

    playing = true
})



/* progress update */

audio.addEventListener("timeupdate", (e)=>{

    const{
        duration:dur,
        currentTime
    } = e.srcElement

    const progressPercent =
    (currentTime / dur) * 100

    progress.style.width =
    `${progressPercent}%`



    /* duration */

    const durationMinutes =
    Math.floor(dur / 60)

    let durationSeconds =
    Math.floor(dur % 60)

    if(durationSeconds < 10){
        durationSeconds =
        `0${durationSeconds}`
    }

    if(durationSeconds){
        duration.innerText =
        `${durationMinutes}:${durationSeconds}`
    }



    /* current time */

    const currentMinutes =
    Math.floor(currentTime / 60)

    let currentSeconds =
    Math.floor(currentTime % 60)

    if(currentSeconds < 10){
        currentSeconds =
        `0${currentSeconds}`
    }

    current.innerText =
    `${currentMinutes}:${currentSeconds}`

})



/* click progress bar */

progressContainer.addEventListener("click", (e)=>{

    const width =
    progressContainer.clientWidth

    const clickX =
    e.offsetX

    const duration =
    audio.duration

    audio.currentTime =
    (clickX / width) * duration

})



/* autoplay next */

audio.addEventListener("ended", ()=>{

    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()

})



/* initial load */

loadSong(songs[songIndex])
