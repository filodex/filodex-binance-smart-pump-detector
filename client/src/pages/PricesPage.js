import React from 'react'
import { Route } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook.js'

class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date(), msg: 111 }
    }

    render() {
        return (
            <div>
                <h2>{this.state.msg}</h2>
            </div>
        )
    }
}

class PricesBlock extends React.Component {
    constructor(props) {
        super(props)
        console.log('props', this.props.message)
        this.state = { prices: this.props.data }
    }

    componentDidMount() {
        //this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        //clearInterval(this.timerID)
    }

    render(data) {
        console.log('rendering')
        return (
            <div>
                {data}
                aaaaa
                <h3>{this.props.message}</h3>
                <h2> {this.props.data}</h2>
            </div>
        )
    }
}

export const PricesPage = () => {
    const { loading, request } = useHttp()
    const pricesHandler = async () => {
        try {
            const data = await request('/api/prices/lastknown')
            //console.log(data)
            Clock.setState({ msg: 123123 })
        } catch (error) {}
    }
    // const PricesBlock = (prices) => {
    //     return (
    //         <div>
    //             aaa
    //             {prices.message}
    //             {prices.data}
    //         </div>
    //     )
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
            <div className='pricesBlock'>
                <Clock />
            </div>
        </div>
    )
}
