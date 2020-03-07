import React,{useState,useCallback,useEffect} from 'react';
import styled from 'styled-components'
import palette from '../../styles/palette';

const TagBoxBlock=styled.div`
    width:100%;
    border-top:1px solid ${palette.gray[2]};
    padding-top:2rem;
    h4{
        color:${palette.gray[8]};
        margin-top:0;
        margin-bottom:0.5rem;
    }
`;

const TagForm=styled.form`
    border-radius:4px;
    overflow:hidden;
    display:flex;
    width:256px;
    border: 1px solid ${palette.gray[9]};
    input{
        padding:0.5rem;
        flex:1;
    }
    button{
        cursor:pointer;
        padding-right:1rem;
        padding-left:1rem;
        border:none;
        background:${palette.gray[8]};
        color:white;
        font-weight:bold;
        &:hover{
            background:${palette.gray[6]};
        }
    }
`;

const Tag=styled.div`
    margin-right:0.5rem;
    color:${palette.gray[6]};
    cursor:pointer;
    &:hover{
        opacity:0.5;
    }
`;

const TagListBlock=styled.div`
    display:flex;
    margin-top:0.5;
`;

const TagItem=React.memo(({tag,onRemove})=>(<Tag onclick={()=>{onRemove(tag)}}>#{tag}</Tag>));

const TagList=React.memo(({tags,onRemove})=>(
    <TagListBlock>
        {
            tags.map((tag,index)=>(
                <TagItem onRemove={onRemove} key={tag} tag={tag}/>
            ))
        }
    </TagListBlock>
))

export default function TagBox({tags,onChangeTags}) {
    const [input,setInput] =useState('');
    const [localTags,setLocalTags]=useState([]);

    const insertTag=useCallback((tag)=>{
        if(!tag)return;
        if(localTags.includes(tag)) return;
        const nextTags=[...localTags,tag];
        setLocalTags(nextTags);
        onChangeTags(nextTags);

    },[localTags,onChangeTags]);

    const onRemove=useCallback((tag)=>{
        const nextTags=localTags.filter(t=>t!==tag);
        setLocalTags(nextTags);
        onChangeTags(nextTags);
        
    },[localTags,onChangeTags]);

    const onChange=useCallback(e=>{
        setInput(e.target.value);
    },[])
    const onSubmit=useCallback(e=>{
        e.preventDefault();
        insertTag(input.trim());
        setInput('');
    },[input,insertTag])

    useEffect(()=>{
        setLocalTags(tags);
    },[tags]);

    return (
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm  onSubmit={onSubmit} >
                <input value={input} onChange={onChange} placeholder='태그를 입력하세요'/>
                <button type='submit'>추가</button>
            </TagForm>
            <TagList onRemove={onRemove} tags={localTags}/>
       </TagBoxBlock>
    )
}
