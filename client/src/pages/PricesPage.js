import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook.js'

function DeviationsList(props) {
    if (!props.list) {
        return
    }

    return <div className='deviationsList'>{props.list}</div>
}

export function PricesPage() {
    let [list_grow_1min, setList_grow_1min] = useState(undefined)
    let [list_fall_1min, setList_fall_1min] = useState(undefined)
    const { request } = useHttp()

    useEffect(() => {
        setTimeout(async () => {
            try {
                const data = await request('/api/prices/lastknown')
                console.log(data)
                let deviationsServerResponse = data.data
                // здесь же нужно и обработать пришедший ответ и изменить состояние
                return
            } catch (error) {}
        }, 60000)
    })

    return (
        <div className='page'>
            <div className='row'>
                <div className='col s6 offset-s3'>
                    <h3>Top 10 most volatile coins</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col s6 offset-s3'>
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
        </div>
    )
}
