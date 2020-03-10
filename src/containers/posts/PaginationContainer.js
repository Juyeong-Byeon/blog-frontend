import React from 'react';
import Pagination from '../../components/posts/Pagination';
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import qs from 'qs';

 function PaginationContainer({location}) {
     const {lastPage,posts,loading}= useSelector(({posts,loading})=>({
         lastPage:posts.lasePage,
         posts:posts.posts,
         loading:loading['posts/LIST_POST']
     }));

     if(!posts||loading) return null;

     const {tag,username,page=1}=qs.parse(location.search,{ignoreQueryPrefix:true});
    return (
       <Pagination
        tag={tag}
        username={username}
        page={parseInt(page,10)}
        lastPage={lastPage}
       />
    )
}
export default withRouter(PaginationContainer);
