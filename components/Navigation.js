import Router from 'next/router'
import subReddits from '../components/subReddits'

const Navigation = ({index, subreddit, baseUrl, total, nextVideo}) => (

  <div className="Navigation">

      {index > 0 &&
        <button
          className="arrow"
          onClick={e => {
            nextVideo(false)
          }}
        >&lt;</button>
      }

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

      {index < total &&
        <button
          className="arrow"
          onClick={e => {
            nextVideo(true)
          }}
        >&gt;</button>
      }


      <style jsx>{`

        .Navigation {
          display: flex;
          justify-content: stretch;
          align-items: stretch;
          box-shadow: 0px 1px 4px #777;
          z-index: 2;
          background-color: white;
          border: 2px solid #e7e7e7;
          border-bottom: none;
        }

        .Navigation .arrow {
          border: none;
          padding: 10px;
          background-color: white;
          font-weight: bold;
          cursor: pointer;
          font-size: 1.2rem;
          color: #a1a1a1;
        }

        .Navigation select {
          flex: 1;
          -moz-appearance: none;
          padding: 10px 5px;
          color: #414141;
          background-color: white;
          text-align: center;
          border: none;
        }

        .Navigation select:hover,
        .Navigation select:focus,
        .Navigation .arrow:hover,
        .Navigation .arrow:focus {
          background-color: #f3f3f3;
        }

        .Navigation .arrow:first-child {
          border-right: 2px solid #e7e7e7;
        }

        .Navigation .arrow:last-child {
          border-left: 2px solid #e7e7e7;
        }

      `}</style>

    </div>
)

export default Navigation