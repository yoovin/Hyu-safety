import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'

import { notice } from '../../interface/notice'


type props = {
    
}

const NoticeDetail = (props: props) => {

    const [info, setInfo] = useState<notice | null>()
    const [desc, setDesc] = useState('')
    const {index} = useParams()
    const navigate = useNavigate()

    const dateToString = (date: string) => {
        return date.replace('T', ' ').substring(0, 19)
    }
    
    const handleUpDown = () => {
        console.log(info?.uploaded)
        if(info?.uploaded){ // 이미 업로드 되어있음
            if(window.confirm("글을 내리시겠습니까?")){
                axios.post('/notice/status', {
                    index: info?.index,
                    uploaded: false,
                    deleted: false
                })
                .then(res => {
                    if(res.status == 200){
                        window.alert("글을 내렸습니다.")
                        window.location.reload()
                    }else{
                        window.alert("에러가 발생했습니다.")
                    }
                })
            }
        }else{
            if(window.confirm("글을 올리시겠습니까?")){
                axios.post('/notice/status', {
                    index: info?.index,
                    uploaded: true,
                    deleted: false
                })
                .then(res => {
                    if(res.status == 200){
                        window.alert("글을 올렸습니다.")
                        window.location.reload()
                    }else{
                        window.alert("에러가 발생했습니다.")
                    }
                })
            }
        }
    }

    useEffect(() => {
        console.log(index)
        axios.get('/notice/detail', {params: {index: index}})
        .then(res => {
            setInfo(res.data.info)
            setDesc(res.data.desc)
            console.log(res.data)
        })
        .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if(info){
            console.log(info?.upload_date.toString())
            const todat: string = info?.upload_date.toString()!
            console.log(dateToString(todat))
        }
    }, [info])

  return (
    <div className="basis-5/6">
        <div className="p-3">
            <h1 className="text-3xl">{info?.title}</h1>
            <span className="mr-3">분류: {info?.subject}</span>
            <span className="mr-3">작성자: {info?.author}</span>
            <span className="mr-3">상태: {info?.uploaded ? <span className="text-green-500 rounded-md">업로드</span> : <span className="text-orange-500 rounded-md">내려짐</span>}</span>
            <span className="mr-3">작성날짜: {info && dateToString(info?.upload_date.toString()!)}</span>
        </div>
        <div className="p-3 pt-0">
            <button className="p-1 mr-3 rounded-md bg-green-300 hover:bg-green-500"
            onClick={() => {
                navigate(`/notice/${index}/update`, {state:{info, desc}})
            }}>수정하기</button>
            {info?.uploaded? <button className="p-1 mr-3 rounded-md bg-orange-300 hover:bg-orange-500"
            onClick={handleUpDown}>글내리기</button>
            : <button className="p-1 mr-3 rounded-md bg-orange-300 hover:bg-orange-500"
            onClick={handleUpDown}>글올리기</button>}
            <button className="p-1 rounded-md bg-red-500 hover:bg-red-700">삭제하기</button>
        </div>
        <hr/>
        <div className="p-3">{parse(desc)}</div>
    </div>
  )
}

export default NoticeDetail