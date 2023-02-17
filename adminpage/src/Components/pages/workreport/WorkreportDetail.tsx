import React, { ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'

import workreport from '../../interface/workreport'
import checklists from './checklists'

import useForm from '../../hooks/useForm'
import validate from '../../hooks/workreportValidate'

type props = {
    
}

/*
===== TODOS =====
*/

const WorkreportDetail = (props: props) => {

    const [detail, setDetail] = useState<workreport| null>()

    const {index} = useParams()
    const navigate = useNavigate()

    const {values, errors, submitting, handleChange, handleSubmit} = useForm({
        initialValues: {per_depart: "", per_position:"", per_name:"", per_comment: ""},
        onSubmit: (values: any) => {
            if(window.confirm("작업을 승인하시겠습니까?")){
                axios.post('/workreport/permit', {
                    ...values,
                    index: index,
                    condition: 'approval'
                })
                .then(data => {
                    if(data.status == 200){
                        window.alert("승인되었습니다.")
                        window.location.reload()
                        // {navigate('/workreport/list')}
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
            }
        },
        validate
    })
    

    const dateToString = (date: Date): string => {
        let strDate = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`
        return strDate
        
    }

    const renderChecklists = (): any => {
        const result: Array<ReactNode> = []
        for(let value in detail?.checklist){
            console.log(value)
            result.push(
            <div className='flex-col basis-1/3 my-3'>
                <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-t-md justify-center bg-gray-200">{checklists[value as keyof typeof checklists].title}작업</span>
                <div className="flex flex-col flex-1 border text-lg focus:ring-inset px-3">
                    {checklists[value as keyof typeof checklists].checklist.map((tem, idx) => (
                        <>
                        <div className='flex justify-between'>
                        <span>{idx+1}. {tem.question}</span>
                        {detail?.checklist[value as keyof typeof detail.checklist]['checked'][idx] == 'true'
                        ? <span className='text-2xl font-bold text-green-800'>O</span> 
                        : <span className='text-2xl font-bold text-red-800'>X</span>}
                        </div>
                        <div>
                        {detail?.checklist[value as keyof typeof detail.checklist]['checked'][idx] == 'false' 
                        && <span>{idx+1}-1. 이행불가사유: {detail?.checklist[value as keyof typeof detail.checklist]['reason'][idx]}</span>}
                        </div>
                        </>
                    ))}
                </div>
            </div>
            )      
        }
        return result
    }

    const onRefuse = () => {
        if(window.confirm("작업을 거부하시겠습니까?")){
            axios.post('/workreport/permit', {
                ...values,
                index: index,
                condition: 'refused'
            })
            .then(data => {
                if(data.status == 200){
                    window.alert("거부되었습니다.")
                    window.location.reload()
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
        }
    }

    useEffect(() => {
        console.log(index)
        axios.get('/workreport/detail', {params: {index: index}})
        .then(res => {
            console.log(res)
            setDetail(res.data)
        })
        .catch(err => console.error(err))
    }, [])

    return (
        <div className="basis-5/6 p-3">
            <div className='my-4'>
                <span className='text-lg mx-2'>{'>'} 신청자 정보</span>
                <div className="flex my-2">
                    <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">신청부서</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">
                        <span>{detail?.request_depart}</span>
                    </div>

                    <span className="flex items-center p-2 pointer-events-none sm:text-sm bg-gray-200">직책</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">
                        <span>{detail?.position}</span>
                    </div>

                    <span className="flex items-center p-2 pointer-events-none sm:text-sm bg-gray-200">이름</span>
                    <div className="flex flex-1 border text-lg rounded-r-md focus:ring-inset px-3">
                        <span>{detail?.name}</span>
                    </div>

                </div>
                <div className="flex my-2">
                <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">아이디</span>
                    <div className="flex flex-1 border text-lg rounded-r-md focus:ring-inset px-3">
                        <span>{detail?.id}</span>
                    </div>
                    <span className="flex items-center p-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">연락처</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">
                        <span>{detail?.phone}</span>
                    </div>
                </div>
                <div className="flex my-2">
                <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">신청서 작성 일자</span>
                    <div className="flex flex-1 border text-lg rounded-r-md focus:ring-inset px-3">
                        <span>{detail?.upload_date && dateToString(new Date(detail!.upload_date))}</span>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                <span className='text-lg mx-2'>{'>'} 작업 정보</span>
                <div className="flex my-2">
                    <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">허가요청기간</span>
                    <div className="flex flex-1 border text-lg rounded-r-md focus:ring-inset px-3">
                        {detail?.start_date && detail?.end_date && <span>{dateToString(new Date(detail!.start_date))} 부터 {dateToString(new Date(detail!.end_date))} 까지</span>}
                    </div>
                </div>
                <div className="flex my-2">
                    <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">작업장소</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">
                        <span>{detail?.work_place}</span>
                    </div>

                    <span className="flex items-center p-2 pointer-events-none sm:text-sm bg-gray-200">장비투입</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">
                        <span>{detail?.equipment_input ? detail.equipment_input : '없음'}</span>
                    </div>

                    <span className="flex items-center p-2 pointer-events-none sm:text-sm bg-gray-200">작업인원</span>
                    <div className="flex flex-1 border text-lg rounded-r-md focus:ring-inset px-3">
                        <span>{detail?.work_people} 명</span>
                    </div>
                </div>
                <div className="flex my-2">
                    <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">작업내용</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">
                        <span>{detail?.work_content}</span>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                <span className='text-lg mx-2'>{'>'} 작업 전 사전체크 </span>
                <div className="flex flex-wrap my-2">
                    {renderChecklists()}
                </div>
            </div>
            <div className='my-4'>
                <span className='text-lg mx-2'>{'>'} 관리자 승인  </span>
                {detail?.condition == "waited" && <span className='p-1.5 rounded-md font-bold bg-orange-300'>승인 대기</span>}
                {detail?.condition == "approval" && <span className='p-1.5 rounded-md font-bold bg-green-300'>승인 완료</span>}
                {detail?.condition == "refused" && <span className='p-1.5 rounded-md font-bold bg-red-300'>승인 거부</span>}
                {detail?.condition == 'approval'
                ?
                <>
                <div className="flex flex-wrap my-2">
                    <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">부서</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">{detail.per_depart}</div>

                    <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">직책</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">{detail.per_position}</div>

                    <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">이름</span>
                    <div className="flex flex-1 border text-lg focus:ring-inset px-3">{detail.name}</div>
                </div>

                <div className='flex mt-4'>
                    <button type="button" onClick={() => onRefuse()} className="px-8 py-3 ml-4 font-semibold rounded-full bg-red-300 hover:bg-red-500 text-gray-800">작업 거부</button>
                </div>
                </>
                :
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-wrap my-2">
                        <div className='flex basis-1/3'>
                            <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">부서</span>
                            <input name="per_depart" onChange={handleChange} className="flex flex-1 border text-lg focus:ring-inset px-3"/>
                        </div>
                        <div className='flex basis-1/3'>
                            <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">직책</span>
                            <input name="per_position" onChange={handleChange} className="flex flex-1 border text-lg focus:ring-inset px-3"/>
                        </div>
                        <div className='flex basis-1/3'>
                            <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">이름</span>
                            <input name="per_name" onChange={handleChange} className="flex flex-1 border text-lg focus:ring-inset px-3"/>
                        </div>
                        
                        <div className='flex mt-4'>
                            <span className="flex items-center p-2 ml-2 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">허가내용</span>
                            <input name="per_name" onChange={handleChange} className="flex flex-1 border text-lg focus:ring-inset px-3"/>
                        </div>
                    </div>
                    <div className='flex mt-4'>
                        <button type="submit" className="px-8 py-3 font-semibold rounded-full bg-green-300 hover:bg-green-500 text-gray-800">작업 승인</button>
                        <button type="button" onClick={() => onRefuse()} className="px-8 py-3 ml-4 font-semibold rounded-full bg-red-300 hover:bg-red-500 text-gray-800">작업 거부</button>
                    </div>
                </form>
                }

            </div>
        </div>
    )
}

export default WorkreportDetail