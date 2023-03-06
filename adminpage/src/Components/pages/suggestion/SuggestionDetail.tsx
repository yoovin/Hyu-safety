import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import { suggestion } from '../../interface/suggestion'
import { suggestiondesc } from '../../interface/suggestiondesc'



type props = {
    
}

const SuggestionDetail = (props: props) => {

    const [info, setInfo] = useState<suggestion|null>()
    const [desc, setDesc] = useState<suggestiondesc|null>()
    const [date, setDate] = useState('')
    const {index} = useParams()
    const navigate = useNavigate()

    const dateToString = (date: string) => {
        return date.replace('T', ' ').substring(0, 19)
    }
    
    useEffect(() => {
        console.log(index)
        axios.get(process.env.REACT_APP_SERVER_ADDRESS + '/suggestion/detail', {params: {index: index}})
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
            setDate(dateToString(todat))
        }
    }, [info])

  return (
    <div className="basis-5/6">
        <div className="p-3">
            {/* <h1 className="text-3xl">{info?.}</h1> */}
            {/* <span className="mr-3">분류: {info?.subject}</span> */}
            <span className="mr-3">작성자: {info?.id}</span>
            {/* <span className="mr-3">상태: {info?.uploaded ? <span className="text-green-500 rounded-md">업로드</span> : <span className="text-orange-500 rounded-md">내려짐</span>}</span> */}
            <span className="mr-3">작성날짜: {date}</span>
        </div>
        <div className="p-3 pt-0">
            {/* <button className="p-1 mr-3 rounded-md bg-green-300 hover:bg-green-500"
            onClick={() => {
                navigate(`/notice/${index}/update`, {state:{info, desc}})
            }}>수정하기</button>
            {info?.uploaded? <button className="p-1 mr-3 rounded-md bg-orange-300 hover:bg-orange-500"
            onClick={handleUpDown}>글내리기</button>
            : <button className="p-1 mr-3 rounded-md bg-orange-300 hover:bg-orange-500"
            onClick={handleUpDown}>글올리기</button>}
            <button className="p-1 rounded-md bg-red-500 hover:bg-red-700">삭제하기</button> */}
        </div>
        <hr/>
        <div className="p-3">
            <p>
                {desc?.desc}
            </p>
            
            <section className="py-6">
                <div className="container flex flex-col justify-center p-4 mx-auto">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
                        {desc?.images.map(url => (
                            <img className="object-cover w-full dark:bg-gray-500 aspect-square" src={`${process.env.REACT_APP_SERVER_ADDRESS}${url}`}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default SuggestionDetail