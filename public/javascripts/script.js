window.addEventListener('load', function (e) {
    const music = document.querySelector(`audio`);
    const cardAudio = document.querySelectorAll(`.card_audio`);
    const songBox = document.querySelector('.song_box_music');
    const cardPlay = document.querySelectorAll('.card_play');
    const cardPause = document.querySelectorAll('.card_pause');
    const songPlay = document.querySelector('.song_box_none');
    const songDuration = document.querySelector('.song_box_right');
    const songOptions = document.querySelector('.options');

    menuToggle = () => {
        songOptions.classList.toggle('options_none')
    }

    let durTime = Math.floor(music.duration).toString();
    function formatSecondsAsTime(secs, format) {
        let hr = Math.floor(secs / 3600);
        let min = Math.floor((secs - (hr * 3600)) / 60);
        let sec = Math.floor(secs - (hr * 3600) - (min * 60));

        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }

        return min + ':' + sec;
    }

    getTime = () => {
        songDuration.innerHTML = formatSecondsAsTime(durTime);
    }

    cardPlay.forEach((btn, key) => {
        cardPlay[key].addEventListener('click', () => {
            cardPlay.forEach(play => {
                play.style.display = 'block'
                cardPause.forEach((element) => {
                    element.style.display = 'none'
                })
            });
            cardAudio.forEach(element => {
                element.classList.remove('playing');
                element.pause();
                if (cardPause[key].classList.contains('playing_now')) {
                    element.currentTime = 0.0;
                }
            });
            cardPlay[key].style.display = 'none'
            cardPause[key].style.display = 'block'
            cardPause[key].classList.add('playing_now')
            cardAudio[key].classList.add('playing');
            const playing = document.querySelector('.playing');
            playing.play()
        })
    });

    cardPause.forEach((element, index) => {
        cardPause[index].addEventListener('click', () => {
            const playing = document.querySelector('.playing');
            playing.pause()
            cardPause[index].style.display = 'none'
            cardPause[index].classList.remove('playing_now')
            cardPlay[index].style.display = 'block'
        })
    })

    songBoxPlay = () => {
        if (songBox.classList.contains('playingNow')) {
            songBox.classList.remove('playingNow')
            music.pause()
            songPlay.innerHTML = `<i class="fas fa-play"></i>`
        }
        else {
            music.play()
            songBox.classList.add('playingNow')
            songPlay.innerHTML = `<i class="fas fa-pause"></i>`
        }
    }

    getTime()

});