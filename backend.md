### Backend

* Gets all Posted blogs returns an array of JSON containing `{ID: string, , content: string, author: (JSON of user(check search)), likes: number}`
```GET /api/allblogs```
* Gets top 3 blogs with the highest likes returns an array of JSON containing `{ID: string, content: string, author: string(user ID), likes: number}`
```GET /api/allblogs/top```
* Gets a profile by id returns a JSON containing `{ID: string, username: string, blogs[]:(array of JSON like allblogs), photo:string}`
```GET /api/profile/[id]```
* Gets all profiles containing the charachters in the search  in a JSON `{ID: string, usernam: string, photo:string}`
```GET /api/profile/search/[name]```
* Posts a new blog expects `{content : string}` should be at least 100 charathers
```POST /api/blog```
* Updates an existing blog with ID, caller should be author expects `{conent : }`
```POST /api/blog/[id]```


```POST /api/blog/like/[id]```
```POST /api/blog/unlike/[id]```