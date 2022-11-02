import React, { useState, useEffect, useCallback } from 'react'
import { useHttp } from '../hooks/http.hook.js'
import M from 'materialize-css'

function DeviationsList(props) {
    if (!props.list) {
        return
    }

    return <div className='deviationsList'>{props.list}</div>
}

export function PricesPage() {
    let [list_grow_1min, setList_grow_1min] = useState(undefined)
    let [list_fall_1min, setList_fall_1min] = useState(undefined)
    let [list_grow_3min, setList_grow_3min] = useState(undefined)
    let [list_fall_3min, setList_fall_3min] = useState(undefined)
    let [list_grow_5min, setList_grow_5min] = useState(undefined)
    let [list_fall_5min, setList_fall_5min] = useState(undefined)
    let [list_grow_10min, setList_grow_10min] = useState(undefined)
    let [list_fall_10min, setList_fall_10min] = useState(undefined)
    let [list_grow_15min, setList_grow_15min] = useState(undefined)
    let [list_fall_15min, setList_fall_15min] = useState(undefined)

    console.log('asdasdasdsad')
    const { request } = useHttp()

    async function Main_initialAndInterval() {
        let intervals = ['1min', '3min', '5min', '10min', '15min']

        try {
            const data = await request('/api/prices/lastknown')
            console.log(data)
            let deviationsServerResponse = data.data
            let jsx_li_1min_up = arrWithObjToJSXList(
                deviationsServerResponse['1min'].up
            )

            let jsx_li_1min_down = arrWithObjToJSXList(
                deviationsServerResponse['1min'].down
            )
            setList_grow_1min(jsx_li_1min_up)
            setList_fall_1min(jsx_li_1min_down)
            setList_grow_3min(
                arrWithObjToJSXList(deviationsServerResponse['3min'].up)
            )
            setList_fall_3min(
                arrWithObjToJSXList(deviationsServerResponse['3min'].down)
            )
            setList_grow_5min(
                arrWithObjToJSXList(deviationsServerResponse['5min'].up)
            )
            setList_fall_5min(
                arrWithObjToJSXList(deviationsServerResponse['5min'].down)
            )
            setList_grow_10min(
                arrWithObjToJSXList(deviationsServerResponse['10min'].up)
            )
            setList_fall_10min(
                arrWithObjToJSXList(deviationsServerResponse['10min'].down)
            )
            setList_grow_15min(
                arrWithObjToJSXList(deviationsServerResponse['15min'].up)
            )
            setList_fall_15min(
                arrWithObjToJSXList(deviationsServerResponse['15min'].down)
            )
        } catch (error) {
            setList_grow_1min('Server is loading, plese wait...')
            M.toast({ html: 'Server is loading, plese wait...' })
        }
    }

    useEffect(() => {
        //вставить сюда функцию
        Main_initialAndInterval()
        setInterval(async () => {
            Main_initialAndInterval()
        }, 60000)
    }, [])

    return (
        <div className='page'>
            <div className='row header'>
                <div className='col s6 offset-s3'>
                    <h3>Top 10 most volatile coins</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col s6 offset-s3 deviationsRow'>
                    <h4>In 1 min</h4>
                    <div className='col'>
                        <h4>Grow</h4>
                        <DeviationsList list={list_grow_1min} />
                    </div>
                    <div className='col'>
                        <h4>Fall</h4>
                        <DeviationsList list={list_fall_1min} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col s6 offset-s3 deviationsRow'>
                    <h4>In 3 min</h4>
                    <div className='col'>
                        <h4>Grow</h4>
                        <DeviationsList list={list_grow_3min} />
                    </div>
                    <div className='col'>
                        <h4>Fall</h4>
                        <DeviationsList list={list_fall_3min} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col s6 offset-s3 deviationsRow'>
                    <h4>In 5 min</h4>
                    <div className='col'>
                        <h4>Grow</h4>
                        <DeviationsList list={list_grow_5min} />
                    </div>
                    <div className='col'>
                        <h4>Fall</h4>
                        <DeviationsList list={list_fall_5min} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col s6 offset-s3 deviationsRow'>
                    <h4>In 10 min</h4>
                    <div className='col'>
                        <h4>Grow</h4>
                        <DeviationsList list={list_grow_10min} />
                    </div>
                    <div className='col'>
                        <h4>Fall</h4>
                        <DeviationsList list={list_fall_10min} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col s6 offset-s3 deviationsRow'>
                    <h4>In 15 min</h4>
                    <div className='col'>
                        <h4>Grow</h4>
                        <DeviationsList list={list_grow_15min} />
                    </div>
                    <div className='col'>
                        <h4>Fall</h4>
                        <DeviationsList list={list_fall_15min} />
                    </div>
                </div>
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
