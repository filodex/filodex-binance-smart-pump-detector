import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const request = useCallback(
        (url, method = 'GET', body = null, headers = {}) => {
            try {
                fetch(url, { method, body, headers })
            } catch (error) {}
        }
    )

    return { loading, request }
}
