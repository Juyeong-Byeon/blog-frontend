import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import WriteActionButtonContainer from '../containers/write/WriteActionButtonsContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';

export default function WritePage() {
    return (
        <>
        <HeaderContainer></HeaderContainer>
        <Responsive>
            
        <EditorContainer/>
            <TagBoxContainer/>
            <WriteActionButtonContainer/>
        </Responsive>
        </>
    )
}
