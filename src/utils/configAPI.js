export const API = 'http://localhost:3001'

let token_aux = localStorage.token
if (!token_aux)
    token_aux = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
    'Authorization': token_aux
}
