import React from 'react'
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';


export default function PostListPage() {
    return (
            <>
                <HeaderContainer/>
                <PostListContainer/>
                <PaginationContainer/>
            </>
    )
}
