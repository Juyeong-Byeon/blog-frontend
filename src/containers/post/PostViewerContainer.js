import React,{useEffect} from 'react';
import {readPost,unloadPost} from '../../modules/post';
import {useDispatch,useSelector} from 'react-redux';
import PostViewer from '../../components/post/PostViewer';
import {withRouter} from 'react-router-dom';


function PostViewerContainer({match}) {
    const {postId}=match.params;
    const dispatch=useDispatch();
    const {post,error,loading}=useSelector(({post,loading})=>({
        post:post.post,
        error:post.error,
        loading:loading['post/READ_POST'],
    }));
    

    useEffect(()=>{
        dispatch(readPost(postId));

        return()=>{
            dispatch(unloadPost());
        }
    },[dispatch,postId]);


    return (
       <PostViewer post={post} loading={loading} error={error}></PostViewer>
    )
}

export default withRouter(PostViewerContainer);