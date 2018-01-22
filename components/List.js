const List = ({data, index, baseUrl, subreddit, setVideo, loadMore}) => (
  <ul className="list">
    {data &&
    data.children &&
    data.children.map((child, i) => (
      <li data-index={i} key={child.data.id} className={index === i ? 'selected' : ''}>

        {child.data.preview &&
        child.data.preview.images &&
          <img
            className="preview"
            onClick={e => {
              e.preventDefault();
              setVideo(i)
            }}
            src={child.data.preview.images[0].source.url}
            alt={child.data.title}
            onError={e => {
              e.target.src = child.data.thumbnail
            }}
          />
        }

        <div className="info">
          <a
            className="title"
            href={child.data.url}
            onClick={e => {
              e.preventDefault();
              setVideo(i)
            }}
          >
              {child.data.title}
          </a>

          <div className="author">
            By: <a target="_blank" href={`${baseUrl}/u/${child.data.author}`}>{child.data.author}</a>
          </div>

          <div className="metadata">
            <a target="_blank" href={`${baseUrl}/${child.data.permalink}`} title="Reddit Link">
              {child.data.num_comments} Comments - {child.data.ups} Upvotes
            </a>
          </div>
        </div>

        {/* <div className="links">
          <a
            target="_blank"
            href={child.data.url}
            title={(child.data.media &&
              child.data.media.oembed &&
              child.data.media.oembed.provider_name)
              ? `Link to ${child.data.media.oembed.provider_name}` : "No media"}
          >
            <img src="/static/link.svg" />
          </a>
        </div> */}

      </li>
    ))}

    {data && data.after &&
      <li className="loadMore">
        <a href={`${baseUrl}/r/${subreddit}/.json?after=${data.after}`} onClick={e => {
          e.preventDefault()
          loadMore(e.target.href)
        }}>
          Load More
        </a>
      </li>
    }

    <style jsx>{`
      .list {
        margin: 0;
        list-style-type: none;
        padding: 0;
        background-color: white;
        overflow: auto;
        flex: 1;
      }

      .list li {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #f7f7f7;
        position: relative;
      }

      .list li.selected {
        box-shadow: inset 0px 0px 13px -7px black;
      }

      .list li.selected::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background-color: #fe8698;
      }

      .list li:last-child {
        border-bottom: none;
      }

      .list li .info {
        text-align: left;
        flex: 1;
        padding: 0 20px;
      }

      .list li .info .title {
        font-size: 1.3rem;
      }

      .list li .info .author,
      .list li .info .author a {
        color: #6c7f96;
        font-size: 1.1rem;
      }

      .list li .info .author a:hover,
      .list li .info .author a:focus {
        color: #fe8698;
      }


      .list li .info .metadata {
        padding-top: 10px;
      }

      .list li .info .metadata a {
        color: #abb8c8;
        font-size: .9rem;
      }

      .list li .info .metadata a:hover,
      .list li .info .metadata a:focus {
        color: #fe8698;
      }

      .list .preview {
        width: 150px;
        cursor:pointer;
      }

      .list .links img {
        width: 50px;
        background-color: #414141;
        padding: 10px;
        border-radius: 50%;
      }

      .list .links a:hover img,
      .list .links a:focus img {
        background-color: #fe8698;
      }

      .list li.loadMore {
        justify-content: center;
        font-size: 1.2rem;
      }

      @media (max-width: 500px) {
        .list li  {
          flex-wrap: wrap;
        }

        .list li img {
          width: 100%;
          margin-bottom: 20px;
        }

        .list li .links {
          margin-right: 10px;
        }
      }

    `}</style>

  </ul>

)

export default List