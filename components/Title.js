const Title = ({title, link, baseUrl}) => (
  <div className="Title">

    {title && link &&
      <a target="_blank" title="Reddit Link" href={`${baseUrl}/${link}`}>
        {title}
      </a>
    }

    <style jsx>{`

      .Title {
        background-color: white;
        box-shadow: 0px 1px 4px #777;
        width: 100%;
        padding: 20px;
        font-size: 1.3rem;
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