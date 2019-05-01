import React, { Component } from 'react'
import AnyChart from 'anychart-react'
import axios from 'axios'

import { getStock, setStock } from './util'

import './App.css'

const URL = 'https://www.alphavantage.co'
const GETPARAM = '/query?'
const FUNCTION = 'TIME_SERIES_DAILY'
const INTERVAL = '5min'
const APIKEY = 'HSDULTUJYW784UNZ'
const stocks = [
  'MSFT',
  'AAPL',
  'INTC',
  'NFLX',
  'ORCL',
  'CMCSA',
  'GOOG',
  'LUV',
  'HOG',
  'GOOGL',
  'AMZN',
]

class App extends Component {
  state = {
    selected: '',
    data: [],
  }

  componentDidMount() {
    const stock = getStock()
    if (stock) {
      this.getStockData(stock)
    }
  }

  getStockData = stock => {
    setStock(stock)

    axios
      .get(`${URL}${GETPARAM}`, {
        params: {
          function: FUNCTION,
          symbol: stock,
          interval: INTERVAL,
          apikey: APIKEY,
        },
      })
      .then(res => {
        const [info, records] = Object.values(res.data)

        if (typeof info === 'object') {
          const dates = Object.keys(records)
          let data = []

          dates.forEach(dt => {
            const [open, high, low, close] = Object.values(records[dt])
            data.push([dt, open, high, low, close])
          })

          this.setState({ data, selected: stock })
        } else {
          throw res.data.Note
        }
      })
      .catch(error => {
        if (typeof error === 'string') {
          alert(error)
        } else {
          console.log({ error })
        }
      })
  }

  render() {
    const { selected, data } = this.state
    const complexSettings = {
      data,
      type: 'ohlc',
      height: 400,
      title: `${selected} Chart`,
      yAxis: [
        {
          labels: {
            format: '${%Value}',
          },
        },
      ],
      xAxis: [
        {
          labels: {
            enabled: false,
          },
        },
      ],
    }
    return (
      <div className="layout">
        <div className="header">Header</div>
        <div className="content">
          <div className="side">
            <ul>
              {stocks.sort().map((sname, index) => (
                <li
                  key={index}
                  className={selected === sname ? 'active' : ''}
                  onClick={() => this.getStockData(sname)}
                >
                  {sname}
                </li>
              ))}
            </ul>
          </div>
          <div className="main">
            {selected !== '' && (
              <div className="chart">
                <AnyChart {...complexSettings} legend="true" />
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <p>Footer</p>
        </div>
      </div>
    )
  }
}

export default App
