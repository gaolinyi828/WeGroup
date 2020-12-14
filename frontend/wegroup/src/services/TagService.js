let _singleton = Symbol();
const TAG_API_URL = 'http://localhost:8080/tags';

// The services function for tag related APIs
class TagService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TagService(_singleton);
        return this[_singleton]
    }

    createTag(tag) {
        return fetch(`${TAG_API_URL}/create`, {
            body: JSON.stringify(tag),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
            });
    }

    getAllTags() {
        return fetch(`${TAG_API_URL}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        });
    }

    searchTagByKeys(tagKeys) {
        return fetch(`${TAG_API_URL}/search`, {
            body: JSON.stringify(tagKeys),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
    }

    getTagByTagId(tagId) {
        return fetch(`${TAG_API_URL}/${tagId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
    }
}

export default TagService;