import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            try {
                const res = await fetch(url, { method, body, headers })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Err in useHttp')
                }

                return data
            } catch (error) {
                console.log(error)
            }
        },
        []
    )

    return { loading, request }
}
