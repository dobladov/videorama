import Router from 'next/router'
import subReddits from '../components/subReddits'

const Controls = ({index, subreddit, baseUrl, title, link, total, nextVideo}) => (
  <div className="controls">

    {title && link &&
    <div className="title">
      <a target="_blank" title="Reddit Link" href={`${baseUrl}/${link}`}>
        {title}
      </a>
    </div>
    }

    <div className="subControls">

      <div className="arrows">

        {index > 0 &&
          <button
            onClick={e => {
              nextVideo(false)
            }}
          >&lt;</button>
          }

        {index < total &&
        <button
          onClick={e => {
            nextVideo(true)
          }}
        >&gt;</button>
        }

      </div>

      <select
        name="r"
        onChange={(e) => {
          Router.push(`/?r=${e.target.value}`)
        }}
        value={subreddit}
      >
        {subReddits.map(sub => (
          <option key={sub} value={sub}>{`${sub.charAt(0).toUpperCase()}${sub.slice(1)}`}</option>
        ))}

        {!subReddits.includes(subreddit) &&
          <option key={subreddit} value={subreddit}>{`${subreddit.charAt(0).toUpperCase()}${subreddit.slice(1)}`}</option>
        }

      </select>
    </div>

    <style jsx>{`

      .controls {
        display: flex;
        background-color: white;
        box-shadow: 0px 1px 4px #777;
        z-index: 1;
        justify-content: space-between;
        align-items: stretch;
      }

      .controls .title {
        padding: 10px 20px;
        font-size: 1.3rem;
        flex: 1;
        align-self: center;
      }

      .controls .subControls {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
      }

      .controls .arrows {
        display: flex;
        justify-content: space-evenly;
        border-left: 2px solid #f7f7f7;
        flex: 1;
      }

      .controls .arrows button {
        border: none;
        padding: 10px;
        background-color: white;
        flex: 1;
        font-weight: bold;
        cursor: pointer;
      }

      .controls .arrows button:first-child {
        border-right: 2px solid #f7f7f7;
      }

      .controls select {
        -moz-appearance: none;
        padding: 10px 5px;
        background-color: white;
        color: #414141;
        text-align: center;
        border: none;
        border-top: 2px solid #f7f7f7;
        border-left: 2px solid #f7f7f7;
        cursor: pointer;
        flex: 1;
      }

      .controls select:hover,
      .controls select:focus {
        background-color: #414141;
        color: white;
      }

    `}</style>

  </div>
)

export default Controls