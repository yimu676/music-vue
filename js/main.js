var app = new Vue({
  el: "#player",
  data: {
    query: "",
    //音乐数组
    musicList: [],
    musicUrl: '',
    isPlaying: false,
    musicCover: "",
    hotComments: [],
    isShow: false,
    // mv地址
    mvUrl: ""
  },
  methods: {
    searchMusic: function () {
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then((req) =>
        this.musicList = req.data.result.songs)
    },
    playMusic: function (musicId) {
      axios.get("https://autumnfish.cn/song/url?id=" + musicId).then((rep) => this.musicUrl = rep.data.data[0].url);
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then((rep) => this.musicCover = rep.data.songs[0].al.picUrl);
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then((rep) => this.hotComments = rep.data.hotComments);
    },
    play: function () {
      // console.log("play");
      this.isPlaying = true;
    },
    // 歌曲暂停
    pause: function () {
      // console.log("pause");
      this.isPlaying = false;
    },
    // 播放mv
    playMV: function (mvid) {
      var that = this;
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
        function (response) {
          // console.log(response);
          console.log(response.data.data.url);
          that.isShow = true;
          that.mvUrl = response.data.data.url;
        },
        function (err) {}
      );
    },
    // 隐藏
    hide: function () {
      this.isShow = false;
    }

  }
})