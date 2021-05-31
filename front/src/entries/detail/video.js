import { isInView, durationFormat } from "Util/util"
export class Video {
  constructor(config) {
    this.setting = config;
    this.init();
  }
init(){
  this.bindEvt();
  this.playinglist = [];
}
bindEvt() {
  let win = $(window);
  let timerScroll = null;
  this.container = $('body')
  win.scroll(() => {
    clearTimeout(timerScroll);
    timerScroll = setTimeout(() => {
      this.controlPlayStatus();
    }, 50);
  });

  let self = this;

  // 视频播放
  this.container.on('click', '.js-f-play', function (i) {
    const me = $(this);
    const video = me.parent().find('video');
    if(me.hasClass('f-paused')){ // 之前是播放状态，执行暂停
      self.pauseVideo(video);
      clearTimeout(self.playTimer);
      me.data('paused', '1');
      self.playinglist[i] = false;
      // 发送暂停的打点
    } else { // 之前是暂停状态，执行播放
      self.playVideo(video);
      self.playinglist[i] = 'playing';
      // 发送播放的打点
    }
  });

  // 播放/暂停的mousedown 用于打点
  this.container.on('mousedown', '.js-f-play', function (e) {
    const me = $(this);
    if(me.hasClass('f-paused')){ // 之前是播放状态，执行暂停
      // 发送mousedown暂停的打点
    } else {
      // 发送mousedown播放的打点
    }
  });

  // 播放/暂停的mouseup 用于打点
  this.container.on('mouseup', '.js-f-play', function (e) {
    const me = $(this);
    const video = me.parent().find('video');
    const curTime = Math.floor(video[0].currentTime);
    if(me.hasClass('f-paused')){ // 之前是播放状态，执行暂停
      // 发送mouseup暂停的打点
    } else {
      // 发送mouseup播放的打点
    }
  });

  // 静音的切换
  this.container.on('click', '.js-f-mute', function () {
    const me = $(this);
    const video = me.parent().find('video')[0];
    if(video.muted){ // 之前是非静音状态
      video.muted = false;
      me.addClass('f-open');
      // 发送静音的打点
    } else { // 之前是静音状态
      video.muted = true;
      me.removeClass('f-open');
     // 发送声音的打点
    }
  });

  // 静音的mousedown,用于打点
  this.container.on('mousedown', '.js-f-mute', function (e) {
    const me = $(this);
    // 发送静音的打点
  });

  // 静音的mouseup,用于打点
  this.container.on('mouseup', '.js-f-mute', function (e) {
    const me = $(this);
    const video = me.parent().find('video')[0];
    const curTime = Math.floor(video.currentTime);
    // 发送声音的打点
  });
}
/**
 * controlPlayStatus 控制播放状态
 *
 */
controlPlayStatus() {
  const self = this;
  $('video', this.container).each(function(i){
    const me = $(this);
    const video = me[0];
    const playIcon = me.parents('.o-video').find('.js-f-play');
    const h = Math.floor($(window).height()/4);
    const time = Math.floor(video.currentTime);
    if(video.ended){
      // 发送播放停止的打点
    }
    if(isInView(me, h, h) && !playIcon.data('paused')) {
      if(!self.isPlaying()) {
        // 如果当前没有视频在播放，或者有视频在播且不是自己在播，则播放当前的
        clearTimeout(self.playTimer);
        self.playVideo(me);
        // 发送播放开始的打点
        self.playinglist[i] = 'playing';
      }
    } else {
      self.pauseVideo(me);
      self.playinglist[i] = false;
    }
  });
}

isPlaying(){
  return this.playinglist.includes('playing');
}

/**
 * playVideo 播放
 * @param {jquery object}} curVideo 当前的播放器
 * 控制播放状态：
 * 1.播放
 * 2.更改播放icon的class
 * 3.设置正在播放状态
 * 4.设置播放时间的显示
 */
playVideo(curVideo) {
  const wrap =  curVideo.parents('.o-video');
  let playIcon = wrap.find('.js-f-play');
  let timeDom =  playIcon.children('span');
  let duration = playIcon.data('time');
  let video = curVideo[0];
  console.log(video)
  video.play();
  playIcon.addClass('f-paused');
  this.playTimer = setInterval(() => {
    const curTime = duration - Math.floor(video.currentTime)
    if(curTime >= 0){
      timeDom.html(durationFormat(curTime));
    } else {
      clearInterval(this.playTimer)
    }
  },500);
}
/**
 * pauseVideo 暂停
 * @param {jquery object}} curVideo 当前的播放器
 * 1.暂停
 * 2.控制暂停icon
 */
pauseVideo(curVideo) {
  const playIcon = curVideo.parents('.o-video').find('.js-f-play');
  const video = curVideo[0];

  video.pause();
  playIcon.removeClass('f-paused');
}
}