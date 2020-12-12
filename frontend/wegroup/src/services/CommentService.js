let _singleton = Symbol();
const POST_API_URL = 'http://localhost:8080/post';


class CommentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new CommentService(_singleton);
        return this[_singleton]
    }

    createComment(comment) {
        const data = new FormData();
        if (comment.userId) data.append('user', comment.userId);
        if (comment.postId) data.append('postId', comment.postId);
        if (comment.text) data.append('text', comment.text);
        return fetch(`${POST_API_URL}/${comment.postId}/comments/create`, {
            body: data,
            method: 'POST'
        }).then(response => response.json());
    }

    updateComment(postId, commentId, text) {
        return fetch(`${POST_API_URL}/${postId}/comments/${commentId}`, {
            body: JSON.stringify(text),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
    }

    deleteComment(postId, commentId) {
        return fetch(`${POST_API_URL}/${postId}/comments/${commentId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
    }

    getAllCommentsByPostId(postId) {
        return fetch(`${POST_API_URL}/${postId}/comments`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }
}

export default CommentService;
