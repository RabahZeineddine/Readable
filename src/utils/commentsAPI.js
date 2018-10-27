import { API, headers } from './configAPI'

export const fetchCommentsByPostId = (postId) => {
    return fetch(`${API}/posts/${postId}/comments`, { headers })
        .then(res => res.json())
}

export const deleteComment = (commentId) => {
    return fetch(`${API}/comments/${commentId}`, {
        headers,
        method: 'DELETE'
    }).then(res => res.json())
}


export const addComment = (comment) => {
    return fetch(`${API}/comments`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(comment)
    }).then(res => res.json())
        .catch(err => err.json())
}

export const editComment = (comment) => {
    return fetch(`${API}/comments/${comment.id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(comment)
    }).then(res => res.json())
        .catch(err => err.json())
}

export const commentVote = (comment_id, vote_option) => {
    return fetch(`${API}/comments/${comment_id}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ option: vote_option })
    }).then(res => res.json())
}