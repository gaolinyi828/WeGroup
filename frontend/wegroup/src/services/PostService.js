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
        const data = new FormData();
        if (post.img) data.append('img', post.img);
        if (post.title) data.append('title', post.title);
        if (post.text) data.append('text', post.text);
        if (post.tagId) data.append('tagId', post.tagId);
        if (post.teamSize) data.append('teamSize', post.teamSize);
        if (post.comments) data.append('comments', post.comments);
        if (post.interested) data.append('interested', post.interested);
        if (post.userId) data.append('userId', post.userId);
        return fetch(`${POST_API_URL}`, {
            body: data,
            method: 'POST'
        }).then(response => response.json());
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

    getPostById(postId) {
        return fetch(`${POST_API_URL}/${postId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
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
