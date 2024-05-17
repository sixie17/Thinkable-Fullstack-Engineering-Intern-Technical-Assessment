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

