let res = await fetch('http://localhost:5000/auth/registration', {
    method: 'POST',
    body: JSON.stringify({ login: 'fidolex', password: '9609' }),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    credentials: 'include',
})

console.log(await res.json())
