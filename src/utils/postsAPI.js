import { API, headers } from './configAPI'

export const fetchPosts = () => {
    return fetch(`${API}/posts`, { headers })
        .then(res => res.json())
}

export const fetchPostsByCategory = (category) => {
    return fetch(`${API}/${category}/posts`, { headers })
        .then(res => res.json())
}

export const postVote = (post_id, vote_option) => {
    return fetch(`${API}/posts/${post_id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ option: vote_option })
    }).then(res => res.json())
}

export const createPost = (post) => {
    return fetch(`${API}/posts`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(post)
    }).then(res => res.json())
}

export const deletePost = (post_id) => {
    return fetch(`${API}/posts/${post_id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    }).then(res => res.json())
}

export const editPost = (post) => {
    return fetch(`${API}/posts/${post.id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(post)
    }).then(res => res.json())

}

export const fetchPostById = (post_id) => {
    return fetch(`${API}/posts/${post_id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(err => err.json())
}