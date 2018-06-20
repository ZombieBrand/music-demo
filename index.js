var cover = document.querySelector('.cover')
var backBtn = document.querySelector('.musicbox .back')
var playBtn = document.querySelector('.musicbox .play')
var forwardBtn = document.querySelector('.musicbox .forward')
var titleNode = document.querySelector('.musicbox .title')
var authorNode = document.querySelector('.musicbox .auther')
var timeNode = document.querySelector('.musicbox .time')
var progressBarNode = document.querySelector('.musicbox .progress .bar')
var progressNowNode = document.querySelector('.musicbox .progress-now')
var musicListContainer = document.querySelector('.musicbox .list')
var icon = document.querySelectorAll('.fa')[1]
var timer
var musicList
var musicIndex = 0
var music = new Audio()
var palyswitch = true
// 获取歌曲列表
function musiclist(binStr) {
    musicList = binStr.length
    console.log(musicList)
}
getMusic(function (binStr) {
    musiclist(binStr)
    paly(binStr)
    moveBack(binStr)
    nextMusic(binStr)
    progressNow()
    progressBar()
    titleNodes(binStr)
    backdrop(binStr)
    generatelList(binStr)
    clickli(binStr)
})

//跳转歌曲
function moveBack(binStr) {
    backBtn.addEventListener('click', function (e) {
        musicIndex--
        console.log(binStr.length)
        musicIndex = (musicIndex + binStr.length) % binStr.length
        console.log(musicIndex)
        music.src = binStr[musicIndex].src
        titleNodes(binStr)
        backdrop(binStr)
    })
}

function nextMusic(binStr) {
    forwardBtn.addEventListener('click', function (e) {
        musicIndex++
        console.log(binStr.length)
        musicIndex = musicIndex % binStr.length
        console.log(musicIndex)
        music.src = binStr[musicIndex].src
        titleNodes(binStr)
        backdrop(binStr)
    })
}
// 控制PLAYBTN
function paly(binStr) {
    music.autoplay = true
    music.src = binStr[musicIndex].src
    playBtn.addEventListener('click', function (e) {
        if (icon.classList.contains('fa-pause')) {
            music.pause()
        } else {
            music.play()

        }
        icon.classList.toggle('fa-play')
        icon.classList.toggle('fa-pause')
    })

}
//获取歌曲
function getMusic(callback) {
    xhr = new XMLHttpRequest()
    xhr.open('GET', './music.json', true)
    xhr.onreadystatechange = function (e) {
        console.log(e)
        if (this.readyState === 4 && this.status === 200) {
            var binStr = JSON.parse(this.responseText)
            console.log(binStr)
            callback(binStr)
        }
    }
    xhr.send()
}

function progressNow() {
    music.addEventListener('play', function () {
        clock = setInterval(function () {
            progressNowNode.style.width = (this.currentTime / this.duration) * 100 + '%'
            var seconds = Math.floor(this.currentTime % 60).toString()
            var minute = Math.floor(this.currentTime / 60)
            timeNode.innerText = minute + ':' + (seconds.length === 2 ? seconds : 0 + seconds)
        }.bind(this), 1000)
    })
    music.addEventListener('pause', function () {
        clearInterval(clock)
    })
}

function progressBar() {
    progressBarNode.onclick = function (e) {
        console.log(e)
        var percent = e.offsetX / parseInt(getComputedStyle(this).width)
        console.log(percent)
        music.currentTime = music.duration * percent
        progressNowNode.style.width = percent * 100 + '%'

    }
}
music.onended = function () {
    var event = new Event('click')
    backBtn.dispatchEvent(event)
}

function titleNodes(binStr) {
    titleNode.innerText = binStr[musicIndex].title
    authorNode.innerText = binStr[musicIndex].auther
}

function backdrop(binStr) {
    cover.style.background = 'url(' + binStr[musicIndex].img + ')'
}

// function generatelList(binStr) {
//     var container = document.createDocumentFragment()
//     binStr.map(function (e, i) {
//         var node = document.createElement('li')
//         node.innerText = e.title + '-' + e.auther
//         container.appendChild(node)
//         console.log(node)
//     })
//     musicListContainer.appendChild(container)
// }
function generatelList(binStr) {
    var container = document.createDocumentFragment()
    binStr.map(function (e, i) {
        var node = document.createElement('li')
        node.innerText = e.title + '-' + e.auther
        container.appendChild(node)
        console.log(node)
    })
    musicListContainer.appendChild(container)
}
function clickli(binStr){
    musicListContainer.addEventListener('click',function(e){
        var target = e.target
        var arr = Array.prototype.slice.call(this.children)
        arr.forEach(function(e,i){
            if(target === e){
                musicIndex = i
            }
        })
        music.src = binStr[musicIndex].src
        titleNodes(binStr)
        backdrop(binStr)
    })
}

// music.autoplay = true
// 
// getMusic(function (list) {
//     musicList = list
//     setPlaylist(list)
//     loadMusic(list[musicIndex])
// })

// playBtn.onclick = function () {
//     var icon = this.querySelector('.fa')
//     if (icon.classList.contains('fa-play')) {
//         music.play()
//     } else {
//         music.pause()
//     }
//     icon.classList.toggle('fa-play')
//     icon.classList.toggle('fa-pause')
// }
// forwardBtn.onclick = loadNextMusic
// backBtn.onclick = loadLastMusic
// music.onended = loadNextMusic
// music.shouldUpdate = true
// music.onplaying = function () {
//     timer = setInterval(function () {
//         updateProgress()
//     }, 1000)
//     console.log('play')
// }
// music.onpause = function () {
//     console.log('pause')
//     clearInterval(timer)
// }
// music.ontimeupdate = updateProgress
// progressBarNode.onclick = function (e) {
//     var percent = e.offsetX / parseInt(getComputedStyle(this).width)
//     music.currentTime = percent * music.duration
//     progressNowNode.style.width = percent * 100 + "%"
// }
// musicListContainer.onclick = function (e) {
//     if (e.target.tagName.toLowerCase() === 'li') {
//         for (var i = 0; i < this.children.length; i++) {
//             if (this.children[i] === e.target) {
//                 musicIndex = i
//             }
//         }
//         console.log(musicIndex)
//         loadMusic(musicList[musicIndex])
//     }
// }
// //fa-li fa fa-spinner fa-spin
// function setPlaylist(musiclist) {
//     var container = document.createDocumentFragment()
//     musiclist.forEach(function (musicObj) {
//         var node = document.createElement('li')
//         node.innerText = musicObj.auther + '-' + musicObj.title
//         console.log(node)
//         container.appendChild(node)
//     })
//     musicListContainer.appendChild(container)
// }

// function loadMusic(songObj) {
//     music.src = songObj.src
//     titleNode.innerText = songObj.title
//     authorNode.innerText = songObj.auther
//     cover.style.backgroundImage = 'url(' + songObj.img + ')'
//     for (var i = 0; i < musicListContainer.children.length; i++) {
//         musicListContainer.children[i].classList.remove('playing')
//     }
//     musicListContainer.children[musicIndex].classList.add('playing')
// }

// function loadNextMusic() {
//     musicIndex++
//     musicIndex = musicIndex % musicList.length
//     loadMusic(musicList[musicIndex])
// }

// function loadLastMusic() {
//     musicIndex--
//     musicIndex = (musicIndex + musicList.length) % musicList.length
//     loadMusic(musicList[musicIndex])
// }

// function updateProgress() {
//     var percent = (music.currentTime / music.duration) * 100 + '%'
//     progressNowNode.style.width = percent
//     var minutes = parseInt(music.currentTime / 60)
//     var seconds = parseInt(music.currentTime % 60) + ''
//     seconds = seconds.length == 2 ? seconds : '0' + seconds
//     timeNode.innerText = minutes + ':' + seconds
// }

// function getMusic(callback) {
//     var xhr = new XMLHttpRequest()
//     xhr.open('get', './music.json', true)
//     xhr.send()
//     xhr.onload = function () {
//         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//             callback(JSON.parse(xhr.responseText))
//         }
//     }
// }