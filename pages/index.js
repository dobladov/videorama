import react from "react"
import fetch from 'isomorphic-unfetch'

import Player from '../components/Player'
import Title from '../components/Title'
import Navigation  from '../components/Navigation'
import List from '../components/List'
import Head from '../components/Head'

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
      currentVideo: null,
      index: 0
    }
  }

  static async getInitialProps(query) {

    const baseUrl = 'https://www.reddit.com'
    const subreddit = query.query.r || 'videos'

    const res = await fetch(`${baseUrl}/r/${subreddit}/.json`)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()

    return {
      baseUrl,
      subreddit,
      data: json.data,
    }
  }

  componentDidMount() {
    this.setState({
      currentVideo: this.props.data && this.props.data.children  && this.props.data.children.length && this.props.data.children[0].data || null
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      index: 0,
      data: nextProps.data,
      currentVideo: nextProps.data && nextProps.data.children  && nextProps.data.children.length && nextProps.data.children[0].data || null
    }, () => {
      document.querySelector('.list').scrollTo(0,0)
    })

  }

  async loadMore(url) {
    const res = await fetch(url)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()

    this.setState((prevState) => {
      let obj = prevState.data
      obj.after = json.data.after
      obj.children = obj.children.concat(json.data.children)
      return {data: obj};
    });
  }

  setVideo(index) {
    this.setState((prevState) => {
      if (window.innerWidth >= 1024) {
        document.querySelector(`[data-index='${index}']`).scrollIntoView({behavior: "smooth"})
      } else {
        document.querySelector('.player').scrollIntoView({behavior: "smooth"})
      }

      return {
        index,
        currentVideo: prevState.data.children[index].data
      }
    })
  }

  nextVideo(increment) {
    this.setState((prevState) => {
      const index = increment ? prevState.index+=1 : prevState.index-=1

      if (window.innerWidth >= 1024) {
        document.querySelector(`[data-index='${index}']`).scrollIntoView({behavior: "smooth"})
      } else {
        document.querySelector('.player').scrollIntoView({behavior: "smooth"})
      }

      return {
        index,
        currentVideo: prevState.data.children[index].data
      }
    })
  }

  render() {

    return (
      <div className="container">
        <Head />

        <main>
          <Player currentVideo={this.state.currentVideo} />

          <Title
            title={this.state.currentVideo && this.state.currentVideo.title}
            link={this.state.currentVideo && this.state.currentVideo.permalink}
            url={this.state.currentVideo && this.state.currentVideo.url}
            baseUrl={this.props.baseUrl}
          />
        </main>

        <aside>
          <Navigation
            index={this.state.index}
            subreddit={this.props.subreddit}
            baseUrl={this.props.baseUrl}
            total={this.state.data.children.length -1}
            nextVideo={this.nextVideo.bind(this)}
          />
          <List
            data={this.state.data}
            index={this.state.index}
            baseUrl={this.props.baseUrl}
            subreddit={this.props.subreddit}
            setVideo={this.setVideo.bind(this)}
            loadMore={this.loadMore.bind(this)}
          />
        </aside>


        <style jsx>{`
          .container {
            padding: 25px;
            display: flex;
            justify-content:center;
            margin: 0 auto;
            height: 100vh;
          }

          main {
            flex: 2;
            display: flex;
            flex-direction: column;
          }

          aside {
            flex: 1;
            margin-left: 15px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            box-shadow: 0px 1px 4px #777;

          }


          @media (max-width: 1024px) {
            .container {
              padding: 10px;
              display: block;
            }

            main {
              box-shadow: 0px 1px 4px #777;
            }

            aside {
              margin: 0;
            }
          }

        `}</style>

        <style jsx global>{`
          * {
            box-sizing: border-box;
            word-wrap: break-word;
          }

          iframe {
            width: 100%;
            height: 100%;
            position: absolute;
            margin-bottom: -4px;
            border-radius: 5px 5px 0 0;
          }

          body {
            margin: 0;
            padding: 0;
            font-family:futura-pt,sans-serif,sans-serif;color:#3c3c3c;
            font-size: 16px;
            color: #455569;
            min-height: 100vh;
            background: #8e9eab;
            background-image: url('/static/round.png'), -webkit-linear-gradient(to bottom, #eef2f3, #8e9eab);
            background-image: url('/static/round.png'), linear-gradient(to bottom, #eef2f3, #8e9eab);
          }

          pre {
            white-space: pre-wrap;
          }

          img {
            max-width: 100%;
          }

          a {
            color: #455569;
            text-decoration: none;
          }

          a:hover,
          a:focus {
            color: #fe8698;
          }
        `}</style>

      </div>
    )
  }
}

export default Home