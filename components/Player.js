import ReactHtmlParser from 'react-html-parser'

const Player = ({currentVideo}) => (
  <div className="player">
  {currentVideo &&
  currentVideo.media &&
    <div
      className="iframe"
      dangerouslySetInnerHTML={
      {__html: ReactHtmlParser(
        currentVideo.media.oembed &&
        currentVideo.secure_media_embed.content.replace('oembed', 'oembed&autoplay=1'))
      }}
    />
  }

  {currentVideo &&
  currentVideo.selftext_html &&
    <div className="html" dangerouslySetInnerHTML={
      {__html: ReactHtmlParser(
        currentVideo.selftext_html)
      }}
    />
  }

  {(currentVideo &&
    !currentVideo.media &&
    !currentVideo.selftext_html) &&
    (currentVideo.url.match(/\.(gif)$/g)  ?
    (
      <img
        className="rawVideo"
        src={currentVideo.url}
      />
    ) : (
        <video
          className="rawVideo"
          src={currentVideo.url}
          preload="auto"
          autoplay
          controls
        ></video>
    ))
  }

  {!currentVideo &&
    <div className="loading">
      <div className="loadImg"></div>
    </div>
  }

  <style jsx>{`
    .player {
      width: 100%;
      height: 450px;
      border-radius: 5px 5px 0 0;
      background-color: #d2d7db;
      position: relative;
    }

    .player .loading {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 9;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: opacity 1s;
    }

    .player .loadImg {
      width: 100px;
      height: 100px;
      background-image: url('/static/loading.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100px;
      animation: rotate 2s infinite ease-in-out;
    }

    @keyframes rotate {
      from {  transform: rotate(0deg)}
      to {  transform: rotate(360deg)}
    }

    .player .html {
      padding: 20px;
      z-index: 2;
      overflow: auto;
      max-height: 100%;
    }

    .player .rawVideo {
      width: 100%;
      height: 450px;
      border-radius: 5px 5px 0 0;
    }
  `}</style>

</div>
)

export default Player