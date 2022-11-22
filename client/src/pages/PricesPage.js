import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook.js'
import M from 'materialize-css'

export function PricesPage() {
    return (
        <div className='page'>
            <div>
                <h3 className='header-top-10 center'>
                    Top 10 most volatile coins
                </h3>
            </div>

            <div className='row deviationsRows'>
                <DeviationsRows />
            </div>
            <PricesUpdateTimer />
        </div>
    )
}

function DeviationsArray(props) {
    if (!props.array) {
        return
    }
    return (
        <div className='deviationsList text-color text-bold'>{props.array}</div>
    )
}

function DeviationsRow(props) {
    try {
        const up = props.prices.up
        const down = props.prices.down
        const up_jsx = arrWithObjToJSXList(up)
        const down_jsx = arrWithObjToJSXList(down)

        return (
            <div className='row'>
                <div className=''>
                    <h4 className='center text-color'>
                        In {props.timeframe} min
                    </h4>
                    <div className='row'>
                        <div className='col s3 offset-s3 '>
                            <h4 className='text-color'>Grow</h4>
                            <DeviationsArray array={up_jsx} />
                        </div>
                        <div className='col s3 '>
                            <h4 className='text-color'>Fall</h4>
                            <DeviationsArray array={down_jsx} />
                        </div>
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        return <div className='row text-color'>Waiting for prices</div>
    }
}

function DeviationsRows(props) {
    const [pricesArray, setPricesArray] = useState([])
    const { request } = useHttp()

    async function getPricesArray() {
        try {
            let res = await request('/api/prices/lastknown')
            return res.data
        } catch (error) {
            return []
        }
    }

    function getArrayAndSetPricesState() {
        getPricesArray()
            .then((res) => {
                if (res.lenght < 3) {
                    M.toast({ html: 'Server is loading, please wait...' })
                    return
                }
                console.log(res)
                setPricesArray(res)
            })
            .catch((error) => {
                M.toast({ html: 'Server error, look console' })
                console.log(error)
            })
    }

    useEffect(() => {
        //initial
        getArrayAndSetPricesState()
        //Interval
        setInterval(() => {
            getArrayAndSetPricesState()
        }, 60000)
    }, [])

    return (
        <div className=''>
            <div>
                <DeviationsRow timeframe='1' prices={pricesArray['1min']} />
            </div>
            <div class='divider'></div>
            <div>
                <DeviationsRow timeframe='3' prices={pricesArray['3min']} />
            </div>
            <div class='divider'></div>
            <div>
                <DeviationsRow timeframe='5' prices={pricesArray['5min']} />
            </div>
            <div class='divider'></div>
            <div>
                <DeviationsRow timeframe='10' prices={pricesArray['10min']} />
            </div>
            <div class='divider'></div>
            <div>
                <DeviationsRow timeframe='15' prices={pricesArray['15min']} />
            </div>
        </div>
    )
}

function arrWithObjToJSXList(arrWithObj) {
    let liList = []
    let i = 1

    for (const iterator of arrWithObj) {
        liList.push(
            <li>
                {i}. {iterator.ticker} deviation: {iterator.deviation}%
            </li>
        )
        i++
    }

    return <ul className='ulList'>{liList}</ul>
}

class PricesUpdateTimer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { timer: 59 }
    }
    componentDidMount() {
        let timerInterval = setInterval(() => {
            this.setState({ timer: this.state.timer - 1 })
        }, 1000)
    }

    componentWillUnmount() {}
    render() {
        return (
            <div className='timer'>
                Prices update in: {this.props.isIntervalStarted}
                {this.state.timer}
            </div>
        )
    }
}
