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
          this.props.iframe &&
          this.props.iframe
        }}
      />
    )
  }
}

export default Frame