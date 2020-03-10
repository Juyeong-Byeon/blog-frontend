import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostViewerBlock=styled(Responsive)`
margin-top:4rem;
`;
const PostHead=styled.div`
border-bottom:1px solid ${palette.gray[2]};
padding-bottom:3rem;
margin-bottom:3rem;

h1{
    font-size:3rem;
    line-height:1.5rem;
    margin:0;
}
`;

const PostContent=styled.div`
    font-size:1.13125rem;
    color:${palette.gray[8]}
`;



export default function PostViewer({post,loading,error}) {
    if(error){
        if(error.response&&error.response.status===404){
            return<PostViewerBlock>존제하지 않는 포스트 입니다.</PostViewerBlock>
        }
        return<PostViewerBlock>에러 발생!</PostViewerBlock>
    }

    if(loading||!post){
        return <PostViewerBlock>loading...</PostViewerBlock>
    }
    const {title,body,user,publishedDate,tags}=post;
    
    return (
        <PostViewerBlock>
            <PostHead>
                    <h1>{title}</h1>
                <SubInfo username={user.username} publishedDate={publishedDate} hasMarginTop/>
                <Tags tags={tags}/>
            </PostHead>
            <PostContent dangerouslySetInnerHTML={{__html:body}}/>
        </PostViewerBlock>
    )
}
