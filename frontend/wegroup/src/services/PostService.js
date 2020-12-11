let _singleton = Symbol();
const POST_API_URL = 'http://localhost:8080/post';


class PostService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new PostService(_singleton);
        return this[_singleton]
    }

    createPost(post) {
        return fetch(`${POST_API_URL}`, {
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }

    updatePost(postId, text) {
        return fetch(`${POST_API_URL}/update/${postId}`, {
            body: JSON.stringify(text),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
    }

    deletePost(postId) {
        return fetch(`${POST_API_URL}/delete/${postId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
    }

    getAllPostsByUserId(userId) {
        return fetch(`${POST_API_URL}/byUser/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }

    getAllPostsByTag(tag) {
        return fetch(`${POST_API_URL}/byTag/${tag}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }

    getAllPostsInterestedByUserId(userId) {
        return fetch(`${POST_API_URL}/InteratedByUser/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }

    getTeamSizeByPostId(postId) {
        return fetch(`${POST_API_URL}/getTeamSize/${postId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }
}

export default PostService;
