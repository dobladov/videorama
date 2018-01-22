import ReactHtmlParser from 'react-html-parser'

class Frame extends React.Component {

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.video !== nextProps.video) {
      this.forceUpdate()
    }
  }

  render() {
    return (
      <div className="iframe"

        dangerouslySetInnerHTML={
        {__html:
          this.props.video.media.oembed &&
          ReactHtmlParser(this.props.video.secure_media_embed.content.replace('oembed', 'oembed&autoplay=1'))
        }}
      />
    )
  }
}

export default Frame