### Backend

* Gets all Posted blogs returns an array of JSON containing `{ID: string, title: string , content: string, author: (JSON of user(check search)), likes: number, likers[]: JSON of user(check search)}`
```GET /api/allblogs```
* Gets top 3 blogs with the highest likes returns an array of JSON containing `{ID: string, title: string, content: string, author: string(user ID), likes: number, likers[]: JSON of user(check search)}`
```GET /api/allblogs/top```
* Gets a single blog with ID returns JSON containing `{ID: string, title: string, content: string, Likers[]: JSON of user(check search), likes: number}}`
```GET /api/allblogs/[id]```
* Gets a profile by id returns a JSON containing `{ID: string, username: string, blogs[]:(array of JSON like allblogs), photo:URL}`
```GET /api/profile/[id]```
* Posts a new blog expects `{content : string}` should be at least 100 charathers
```POST /api/blog```
* Updates an existing blog with ID, caller should be author expects `{conent : string }`
```POST /api/blog/[id]```
* Adds a like in the blog or removes it depending on  the previous state
```POST /api/blog/like/[id]```