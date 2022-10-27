import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook.js'

function PricesList(props) {
    return <div>{props.prices}</div>
}

export const PricesPage = () => {
    const [pricesValue, setPricesValue] = useState('no prices')
    const { loading, request } = useHttp()
    const pricesHandler = () => {
        setPricesValue('it works')
    }
    // const pricesHandler = async () => {
    //     try {
    //         const data = await request('/api/prices/lastknown')
    //         console.log(data)
    //         return await data.json()
    //     } catch (error) {}
    // }

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
