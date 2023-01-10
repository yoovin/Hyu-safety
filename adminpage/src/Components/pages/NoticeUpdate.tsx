import React, {useEffect, useRef} from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import useForm from '../hooks/useForm'
import validate from '../hooks/noticeValidate'

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr'



type Props = {
    
}

const NoticeUpdate = (props: Props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const editorRef = useRef<any>(null)
    const {values, errors, submitting, handleChange, handleSubmit} = useForm({
        initialValues: {subject: location.state.info.subject, author:location.state.info.author, title:location.state.info.title},
        onSubmit: (values: any) => {
            if(window.confirm("글을 수정하시겠습니까?")){
                if(editorRef.current != null){
                    console.log(
                        {...values,
                            desc: editorRef.current.getInstance().getHTML()})
                    axios.post(process.env.REACT_APP_SERVER_ADDRESS + '/notice/update', {
                        ...values,
                        index: location.state.info.index,
                        desc: editorRef.current.getInstance().getHTML()
                    })
                    .then(data => {
                        if(data.status == 200){
                            {navigate(`/notice/${location.state.info.index}`)}
                        }
                    })
                    .catch(err => {
                        console.error(err.request._response)
                        if(err.request.status == 412){ // 내가 준 애러
                            const errorJson = JSON.parse(err.request._response)
                            console.log(errorJson.text)
                        }
                    })
                }else{
                    console.log("null")
                }
            }
        },
        validate,
    })

    const onUploadImage = async(blob: any, callback: any) => {
        console.log(blob)
        const url = await uploadImage(blob)
        console.log(`blob ${url}`)
        callback( `${process.env.REACT_APP_SERVER_ADDRESS}${url}`, 'alt text')
        return false
    }

    const uploadImage = async (blob: File) => {
        let formData = new FormData()
        let url
        formData.append('file', blob)
        await axios.post('/notice/upload/image', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(res => {
            console.log(res.data)
            url = res.data.url
        })
        return url
    }

    useEffect(() => {
        console.log(location.state)
    }, [])

    useEffect(() => {
        if(editorRef != null){
            editorRef.current.getInstance().setHTML(location.state.desc)
        }
    }, [])
    
    return (
        <div className="basis-5/6 p-10">
            {location.state != null ?
            <form onSubmit={handleSubmit} noValidate>
            <div className="flex basis-1/3">
                <span className="my-3 text-2xl">글 수정하기</span>
                    <select className="border-2 m-2 rounded-lg"
                    name="subject"
                    onChange={handleChange}>
                        <option value="notice">공지</option>
                    </select>
            </div>
            <div className="flex flex-row mb-3">
                {/* <fieldset className="mr-5 w-1/3">
                    <div className="flex">
                        <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">부서</span>
                        <input type="text" name="subject" placeholder="부서" className="flex flex-1 border p-1.5 sm:text-sm rounded-r-md focus:ring-inset border-gray-200  focus:ring-violet-400" />
                    </div>
                </fieldset> */}
                <fieldset className="w-1/3">
                    <div className="flex">
                        <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">글쓴이</span>
                        <input type="text" name="author" placeholder={location.state.info.author} className="flex flex-1 border p-1.5 sm:text-sm rounded-r-md focus:ring-inset border-gray-200  focus:ring-violet-400" 
                        onChange={handleChange}/>
                    </div>
                </fieldset>
                
            </div>
            <div className="mb-3">
                <fieldset className="w-full">
                    <div className="flex">
                        <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">제목</span>
                        <input type="text" name="title" placeholder={location.state.info.title} className="flex flex-1 border p-1.5 sm:text-sm rounded-r-md focus:ring-inset border-gray-200  focus:ring-violet-400"
                        onChange={handleChange}/>
                    </div>
                </fieldset>
            </div>
            <div className="flex basis-1/3">
                <Editor
                    placeholder='내용을 입력해주세요.'
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={false}
                    hideModeSwitch={true}
                    language="ko-KR"
                    plugins={[colorSyntax]}
                    ref={editorRef}
                    hooks={{
                        addImageBlobHook: onUploadImage
                    }}
                />
            </div>
            <div className="flex my-10">
                <button type="submit" disabled={submitting} className={`px-8 py-3 font-semibold rounded-full bg-gray-200 text-gray-800 hover:bg-gray-400`}>수정하기</button>
            </div>
        </form>:
        <span>잘못된 접근입니다.</span>}
            
        </div>
    )
}

export default NoticeUpdate