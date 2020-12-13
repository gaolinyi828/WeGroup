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

    /**
     * Add a new comment to database
     *
     * @param comment, contains userId,postId and text
     * @return fetch result
     */
    createComment(comment) {
        return fetch(`${POST_API_URL}/comment/create`, {
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }

    /**
     * Edit comment
     *
     * @param postId postId that comment belongs to
     * @param commentId comment id to edit
     * @param text comment's content
     * @return fetch result
     */
    updateComment(postId, commentId, text) {
        return fetch(`${POST_API_URL}/${postId}/comment/${commentId}`, {
            body: JSON.stringify(text),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
    }

    /**
     * Delete a comment with given id
     *
     * @param postId postId that comment belongs to
     * @param commentId comment id to delete
     * @return fetch result
     */
    deleteComment(postId, commentId) {
        return fetch(`${POST_API_URL}/${postId}/comment/${commentId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
    }

    /**
     * Get all comments of the post
     *
     * @param postId postId that comment belongs to
     * @return fetch result
     */
    getAllCommentsByPostId(postId) {
        return fetch(`${POST_API_URL}/${postId}/comment/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }

    /**
     * Get comment by a CommentId
     *
     * @param postId postId that comment belongs to
     * @param commentId id to find
     * @return fetch result
     */
    getCommentById(postId,commentId) {
        return fetch(`${POST_API_URL}/${postId}/comment/${commentId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }
}

export default CommentService;
