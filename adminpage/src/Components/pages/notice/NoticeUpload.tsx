import React, {useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import useForm from '../../hooks/useForm'
import validate from '../../hooks/noticeValidate'

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr'



type Props = {
    
}

const NoticeUpload = (props: Props) => {
    const navigate = useNavigate()
    const editorRef = useRef<Editor>(null)
    const {values, errors, submitting, handleChange, handleSubmit} = useForm({
        initialValues: {subject: "공지", author:"안전팀", title:""},
        onSubmit: (values: any) => {
            if(window.confirm("글을 등록하시겠습니까?")){
                if(editorRef.current != null){
                    console.log(
                        {...values,
                            desc: editorRef.current.getInstance().getHTML()})
                    axios.post(process.env.REACT_APP_SERVER_ADDRESS + '/notice/upload', {
                        ...values,
                        desc: editorRef.current.getInstance().getHTML()
                    })
                    .then(data => {
                        if(data.status == 201){
                            {navigate('/notice/list')}
                        }
                    })
                    .catch(err => {
                        console.error(err.request._response)
                        if(err.request.status == 412){ // 내가 준 애러
                            const errorJson = JSON.parse(err.request._response)
                            console.log(errorJson.text)
                            window.alert(`에러가 발생했습니다: ${errorJson.text}`)
                        }else{
                            window.alert(`에러가 발생했습니다: ${err}`)
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
    
    return (
        <div className="p-10 basis-5/6">
            <form onSubmit={handleSubmit} noValidate>
                <div className="flex basis-1/3">
                    <span className="my-3 text-2xl">새 글쓰기</span>
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
                            <input type="text" name="author" placeholder="글쓴이" className="flex flex-1 border p-1.5 sm:text-sm rounded-r-md focus:ring-inset border-gray-200  focus:ring-violet-400" 
                            onChange={handleChange}/>
                        </div>
                    </fieldset>
                    
                </div>
                <div className="mb-3">
                    <fieldset className="w-full">
                        <div className="flex">
                            <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">제목</span>
                            <input type="text" name="title" placeholder="제목을 입력해주세요." className="flex flex-1 border p-1.5 sm:text-sm rounded-r-md focus:ring-inset border-gray-200  focus:ring-violet-400"
                            onChange={handleChange}/>
                        </div>
                    </fieldset>
                </div>
                <div className="">
                    <Editor
                        
                        placeholder='내용을 입력해주세요.'
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
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
                    <button type="submit" disabled={submitting} className={`px-8 py-3 font-semibold rounded-full bg-gray-200 text-gray-800 hover:bg-gray-400`}>등록하기</button>
                </div>
            </form>
        </div>
    )
}

export default NoticeUpload