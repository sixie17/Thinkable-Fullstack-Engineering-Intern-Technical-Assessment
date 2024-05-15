import Link from 'next/link';
import React from 'react'

export const AuthLinks = () => {
    const isLogged = false;
    return (
        isLogged ?(
        <>
            <Link href="#">Post</Link>
            <span>Logout</span>
        </>
        ) : (
        <Link href="#">Log in</Link>
        )
    )
}

export default AuthLinks