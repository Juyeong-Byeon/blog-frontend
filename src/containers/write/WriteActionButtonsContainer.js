import React,{useEffect} from 'react';
import WriteActionButtons from '../../components/write/WriteActionButton';
import {useSelector,useDispatch} from 'react-redux';
import {withRouter}from 'react-router-dom';
import {writePost,updatePost} from '../../modules/write';
import WriteActionButton from '../../components/write/WriteActionButton';


function WriteActionButtonsContainer({history}) {

    const dispatch=useDispatch();
    const {title,body,tags,post,postError,originalPostId}=useSelector(({write})=>({
        title:write.title,
        body:write.body,
        tags:write.tags,
        post:write.post,
        postError:write.postError,
        originalPostId:write.originalPostId
    }));
    const onPublish=()=>{
        if(originalPostId){
            dispatch(updatePost({title,body,tags,id:originalPostId}));
            return;
        }
        dispatch(writePost({title,body,tags}));
    };

    const onCancel=()=>{
        history.goBack();
    };

    useEffect(()=>{
        if(post){
         const {_id,user}=post;
         history.push(`/@${user.username}/${_id}`);
        }
        if(postError){
            console.log(postError);
        }
    },[history,post,postError]);


    
    return (
        <WriteActionButton onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId}></WriteActionButton>
    )
}

export default withRouter(WriteActionButtonsContainer);
