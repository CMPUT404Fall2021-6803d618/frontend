import styled from 'styled-components'
import React from 'react'
import { useState, FC, MouseEvent } from "react"

// create css style for div
const InputDiv = styled.div`
    width: 100px;
    height: 100px;
    background-color: red;
    opacity: 0.3;
`;

const Input = styled.input`
    font-size: 20px;
    line-height: 24px;
    direction: ltr;
    text-align: left;
    overflow: hidden;
    padding-bottom: 2px;
    padding-top: 2px;
    position: relative;
    white-space: pre-wrap;
`;

export interface PostRequest {
    text: string
}

interface CreatePostProp {
    onAdd: (postRequest: PostRequest) => void;
}

const CreatePost:FC<CreatePostProp> = ({onAdd}) => {

    // text message
    const [text, setText] = useState('')

    const onSubmit = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a message')
            return
        }
        
        onAdd({text})
        // clear text
        setText("")
    }


    return (
        <div>
            <div className="Image"></div>
            <div>
                {/* input */}
                <InputDiv>
                    <Input type='text' placeholder="What's happening" value={text} onChange={(e) => setText(e.target.value)}/>
                </InputDiv>

                {/* visibility */}
                <div></div>
                
                {/* button */}
                <div>
                    <button onClick={onSubmit}>Add Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
