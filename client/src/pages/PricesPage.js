import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook.js'

function PricesList(props) {
    console.log(props)
    /**
     * BTCUSDT deviation: 1,213123
     */
    if (props.prices['1min']) {
        let liList = []

        for (const iterator of props.prices['1min'].up) {
            liList.push(
                <li>
                    {iterator.ticker} deviation: {iterator.deviation}
                </li>
            )
        }

        return <ul>{liList}</ul>
        // return (
        //     <ul>
        //         <li>
        //             {props.prices['1min'].up[0].ticker} deviation:
        //             {props.prices['1min'].up[0].deviation}
        //         </li>
        //         <li>
        //             {props.prices['1min'].up[1].ticker} deviation:
        //             {props.prices['1min'].up[1].deviation}
        //         </li>
        //         <li>
        //             {props.prices['1min'].up[2].ticker} deviation:
        //             {props.prices['1min'].up[2].deviation}
        //         </li>
        //     </ul>
        // )
    }

    return 'nothing at now'
}

export const PricesPage = () => {
    const [pricesValue, setPricesValue] = useState('no prices')
    const { loading, request } = useHttp()

    const pricesHandler = async () => {
        try {
            const data = await request('/api/prices/lastknown')
            console.log(data)
            setPricesValue(data.data)
            return
        } catch (error) {}
    }

    return (
        <div>
            <h2>Prices Page</h2>
            <button
                className='btn yellow darken-3'
                style={{ marginRight: 10 }}
                onClick={pricesHandler}
            >
                Load prices
            </button>
            <PricesList prices={pricesValue} />
            <div className='pricesBlock'></div>
        </div>
    )
}

//
//
//
//
//
//

// TEst
// class PricesBlock extends React.Component {
//     constructor(props) {
//         super(props)
//         console.log('props', this.props.message)
//         this.state = { prices: this.props.data }
//     }

//     componentDidMount() {
//         //this.timerID = setInterval(() => this.tick(), 1000)
//     }

//     componentWillUnmount() {
//         //clearInterval(this.timerID)
//     }

//     render(data) {
//         console.log('rendering')
//         return (
//             <div>
//                 {data}
//                 aaaaa
//                 <h3>{this.props.message}</h3>
//                 <h2> {this.props.data}</h2>
//             </div>
//         )
//     }
// }
