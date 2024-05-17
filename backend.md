### Backend

1. types:
(even if an interface here is not explicity implemented it's still used and has to be respected)
* searched blog
```js
interface blog
{
    id: number;
    likes: number;
    createdAt: Date;
    title: string;
    content: string;
    author: {
        id: string;
        username: string;
        avatar: number;
    };
    likers: {
        id: string;
        username: string;
        avatar: number;
    }[]
}
```
* posted blog
```js
export interface PostDto
{
    title: string,
    content: string,
    category: string,
}
```
* searched user
```js
export interface user
{
    id: string;
    username: string;
    bio: string;
    avatar: number;
    posts: {
        id: number;
        likes: number;
        category: string;
        createdAt: Date;
        title: string;
        content: string;
    }[];
}
```
* Signup form

```js
export interface SignupDTO
{
    userName: string;
    email: string;
    password: string;
    avatar: number;
    bio: string
}
```

2. routes
    1. Getters
        * `GET /api/allblogs` returns an array of `blog` sorted from newest to oldest, requires Auth
        * `GET /api/allblogs/top` returns top 5 liked posts as `blog` array, requires Auth
        * `GET /api/allblogs/[id]` gets a single `blog` by ID, returns `blog`, requires Auth
        * `GET /api/profile/[id]` gets a single `user`
    2. Auth
        * `POST /api/auth/signup` expects a `SignupDTO` in the body, on success returns 200 and sets JWT token in cookies returns 405 if the body is not right, and 401,403 if email already exists
        * `POST /api/auth/signin` expects `{email: string, password: string}` on success returns 200 and sets JWT token in cookies, returns 403,401 if pass is wrong or email does not exist
    3. Setters 