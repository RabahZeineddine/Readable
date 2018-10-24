import { API, headers } from './configAPI'

export const fetchCategories = () => {
    return fetch(`${API}/categories`, { headers })
        .then(res => res.json())
}
