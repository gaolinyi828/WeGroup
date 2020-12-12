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
        return fetch(`${POST_API_URL}/comment/create`, {
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }

    updateComment(postId, commentId, text) {
        return fetch(`${POST_API_URL}/${postId}/comment/${commentId}`, {
            body: JSON.stringify(text),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
    }

    deleteComment(postId, commentId) {
        return fetch(`${POST_API_URL}/${postId}/comment/${commentId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
    }

    getAllCommentsByPostId(postId) {
        return fetch(`${POST_API_URL}/${postId}/comment/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }
}

export default CommentService;
