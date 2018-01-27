const Title = ({title, link, baseUrl, url}) => (

  title && link &&
  <div className="Title">
      <a target="_blank" title="Reddit Link" href={`${baseUrl}/${link}`}>
        {title}
      </a>

      <a
      className="externalLink"
      target="_blank"
      href={url}
      title={title}
      >
        <img src="/static/link.svg" />
      </a>

    <style jsx>{`

      .Title {
        background-color: white;
        box-shadow: 0px 1px 4px #777;
        width: 100%;
        padding: 20px;
        font-size: 1.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .Title .externalLink img {
        width: 40px;
        background-color: #414141;
        padding: 10px;
        border-radius: 50%;
      }

      .Title .externalLink:hover img,
      .Title .externalLink:focus img {
        background-color: #fe8698;
      }

      @media (max-width: 1024px) {
        .Title {
          box-shadow: none;
        }
      }

    `}</style>

  </div>
)

export default Title