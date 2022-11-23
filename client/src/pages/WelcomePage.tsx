import React from 'react'

interface Clock {
    state: { date: any }
    timerID: any
}

class Clock extends React.Component {
    constructor(props: any) {
        super(props)
        this.state = { date: new Date() }
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        return (
            <div>
                <h2>Actual time</h2>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

export const WelcomePage = () => {
    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h2>Welcome Page</h2>
                <Clock />
                <div className='card blue-grey darken-1'>
                    <div className='card-content white-text'>
                        <span className='card-title'>Card Title</span>
                        <p>Go to Prices</p>
                    </div>
                    <div className='card-action'>
                        <a href='/'>Prices</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
