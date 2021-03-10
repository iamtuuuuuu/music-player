const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "TU_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    songs: [
        {
        name: "What You Waiting For",
        singer: "SOMI",
        path: "http://vnno-zn-5-tf-mp3-s1-zmp3.zadn.vn/aceb8ca123e6cab893f7/3875516918820080847?authen=exp=1615559270~acl=/aceb8ca123e6cab893f7/*~hmac=5e7088e3778eb9bd2d3fb581cf1e21ee",
        image: "https://photo-playlist-zmp3.zadn.vn/s1/v2/background-playlist?src=HavtoclCgWuG7IRj1hl1VtDo0wP4yeyiFtfEwWFZpsnrEqxe0xNFRcbg1EfIuijjQJbKwbJhoZmqDbJjNksSEsPaK-eCwSbqFt80vagxnoLSFWNiNxp5EoHj3UeHzSPsQce1ib_aZJWaM4lf2PEyDYLOHUSLnu8vAmngvd8YVG&size=thumb_240_240"
        },
        {
        name: "Celebrity",
        singer: "UI",
        path: "http://vnno-vn-5-tf-mp3-s1-zmp3.zadn.vn/ecbb31f5bcb255ec0ca3/686760099857822393?authen=exp=1615560092~acl=/ecbb31f5bcb255ec0ca3/*~hmac=aacd18e3f0b7d4dfd7e3e203fc60dcde",
        image: "https://photo-playlist-zmp3.zadn.vn/s2/v2/background-playlist?src=HavtoclCgWuG7IRt7DIaPIbMPBvIX-XjP1eZhnB4edba6oFn4iNhTNCSTF0ImRjoSqvtfnETw7PuGoN-5CgpUoz5UAeJWBngBKa--1tHtoOeGol_7y-dTI15PROSWkboB1qhfrVCfrHhIso6GCcsJo9z&size=thumb_240_240"
        },
        {
        name: "Nevada",
        singer: "Vicetone x Cozi",
        path: "http://vnno-vn-6-tf-mp3-s1-zmp3.zadn.vn/c7be7172c4352d6b7424/99742267303076122?authen=exp=1615562359~acl=/c7be7172c4352d6b7424/*~hmac=fe6d395b45b8ea8d9ed0da79d2300fde",
        image: "https://photo-playlist-zmp3.zadn.vn/s2/v2/background-playlist?src=HavtoclCgWuG7IRe89NjB1OG9h1lsyjlJ5b5XM3NWrbAM4ARTTNE1mvI2TaycvrB1Xz5dYtRZm5D7nUU8DlT5qy4HSCctDr4IWv7ad3Nq4PA24cKTzVL5XSFGy1yXyCQLGaAY230pKisHG-2DSVFLKuM1uHxZimO014Bt3MVXrPEEaoGThM30dq&size=thumb_240_240"
        },
        {
        name: "DDU-DU DUU-DU",
        singer: "BLACKPINK",
        path: "http://vnno-vn-5-tf-mp3-s1-zmp3.zadn.vn/3ceb7d147153980dc142/9005331940017409276?authen=exp=1615562651~acl=/3ceb7d147153980dc142/*~hmac=9f172fe2ea4ecf8e309f8bbe8ed0871d",
        image: "https://photo-playlist-zmp3.zadn.vn/v2/background-playlist?src=HavtoclCgWuG7IRy1RVB1mmLA_ntqgSWHrTYiYIUhsqB47FoDzJlRGyGTl8poRbrMXDpfc2Uk7GEJ7JrCf-u85D2T_OzaUma04vmztVFhY0C22Bv9gpY9GOT9ViurB4j05Di-7MQjY5O7NspEzINHpSIVQ9ElPT7EX9irNq&size=thumb_240_240"
        },
        {
        name: "WHISTLE",
        singer: "BLACKPINK",
        path: "http://vnno-vn-5-tf-mp3-s1-zmp3.zadn.vn/2a08e4f9e8be01e058af/8380870715431014911?authen=exp=1615562840~acl=/2a08e4f9e8be01e058af/*~hmac=fd37309c587555b61e0e5378064f785e",
        image: "https://photo-playlist-zmp3.zadn.vn/s1/v2/background-playlist?src=HavtoclCgWuG7IRy1RVB1mmLA_ntqgSWHrTYiYIUhsqB47FoDDJbRLaGVl9cm-Ht2KbuzJEIuoDJ6tIbRy2_BGKPSFXiaEXy1XaW_76O_YiANtBo8FkoBW1ATV0-W-4c1WGyytFDvYfUIYsuFOFKG2qxBhn58dq&size=thumb_240_240"
        },
        {
        name: "All Falls Down",
        singer: "Alan Walker",
        path: "http://vnno-vn-6-tf-mp3-s1-zmp3.zadn.vn/65dbc5031547fc19a556/1880877041007742679?authen=exp=1615562914~acl=/65dbc5031547fc19a556/*~hmac=a13ae824474588fe9aee034b305e749c",
        image: "./img/5.jpeg"
        },
        {
        name: "Something Just Like This",
        singer: "The Chainsmokers, Coldplay",
        path: "http://vnno-zn-5-tf-mp3-s1-zmp3.zadn.vn/7025d3cb638c8ad2d39d/1388521357093957949?authen=exp=1615562963~acl=/7025d3cb638c8ad2d39d/*~hmac=e60c2ff24147155f5757f4f47387eb33",
        image: "./img/somethingjustlikethis.jpeg"
        },
        {
            name: "This Is What You Came For",
            singer: "Calvin Harris, Rihanna",
            path: "http://vnno-zn-5-tf-mp3-s1-zmp3.zadn.vn/e8227b628925607b3934/2946880514148726209?authen=exp=1615563578~acl=/e8227b628925607b3934/*~hmac=ebca5fb0cbe17842e44f3bd64e9d9e0c",
            image: "https://photo-playlist-zmp3.zadn.vn/s1/v2/background-playlist?src=HavtoclCgWuG7IRzA9h-91zH6FKqoDysGGDHr760dWf62XAMFOtLI0z4GTerm9aF7WG0a2F0pGyP15JR8upD2aDJ0OilZve3JbHLYtIFdbaSK0NR9eFA2aPOIj1lrCPC55ORioFHp5aJL0NBSDdA5rfNI8LtrP9PInm6oqQVmGW_FHoOCRxJN4WC4fanfDr43Myrct8YVG&size=thumb_240_240"
        }
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>

                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>

                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvent: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xử lý CD quay/ dung
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10second
            interations: Infinity
        })

        cdThumbAnimate.pause();

        // Xử lý phongs to, thu nhỏ CD
        document.onscroll = function() {
            const newCdWidth = cdWidth - window.scrollY;
            cd.style.width = newCdWidth>0 ?newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth/cdWidth;
        }

        // Xử lý khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }            
        }

        // Khi song dc play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        // Khi song bi pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Khi tiến độ bài hát thay đổi 
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercent;
            }
        }

        // Xử lý tua
        progress.onchange = function(event) {
            // console.log(audio.duration/100*event.target.value)
            // console.log((event.target.value/100*audio.duration))
            const seekTime = audio.duration/100*event.target.value;
            audio.currentTime = seekTime;
        }

        // next
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // prev
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            _this.render();
            audio.play();
            _this.scrollToActiveSong();

        }

        //randomBtn
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        //repeat
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Xủ lý next song/repeat khi hết bài
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        // Lắng nghe hành vi click vào playlist 
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if( songNode || e.target.closest('.option')) {
                // Xủ lý click vào song
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // Xủ lý click vào song option
                if(e.target.closest('.option')) {
                    
                }
                
            }
        }
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    }, 

    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length;
        }
        this.loadCurrentSong();
    },
    
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }, 300)
    },
    

    start: function() {
        //load config
        this.loadConfig();

        // Dinh nghia cac thuoc tinh cho obj
        this.defineProperties();

        // Lắng nghe sự kiện trong DOM event 
        this.handleEvent();

        // Tai thong tin bai hat dau tien khi chay
        this.loadCurrentSong();
        // Render
        this.render();


        // Hiển thị trạng thái ban đâuf
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);


    } 
}

app.start()