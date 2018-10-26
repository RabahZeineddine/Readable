const API = "https://readable.mybluemix.net"
// const API = "http://localhost:4000"

const headers = {
    'Accept': 'application/json',
}

export const login = (user) =>
    fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())

export const signup = (user) =>
    fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    })
