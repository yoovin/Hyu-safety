import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import validate from '../../hooks/workreportValidate'
import axios from 'axios'

import {user} from '../../interface/user'

type Props = {
    setUserClick: Function
    curUser: user
}

const UserDetail = (props: Props) => {

    const dateToString = (date: string) => {
        return date.replace('T', ' ').substring(0, 19)
    }

    // const [position, setPosition] = useState(props.curUser.position)

    const {values, errors, submitting, handleChange, handleSubmit, reset} = useForm({
        initialValues: {
            id: props.curUser.id,
            name: props.curUser.name,
            email: props.curUser.email,
            phone: props.curUser.phone,
            position: props.curUser.position,
        },
        onSubmit: (values: any) => {
            console.log(values)
            if(window.confirm("저장하시겠습니까?")){
                axios.post('/login/update', {
                    ...values
                })
                .then(data => {
                    if(data.status == 200){
                        window.alert("저장되었습니다.")
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

    useEffect(() => {
        reset({
            id: props.curUser.id,
            name: props.curUser.name,
            email: props.curUser.email,
            phone: props.curUser.phone,
            position: props.curUser.position,
        })
    }, [])

    return (
        <>
        <div className="absolute w-full h-full bg-gray-600 opacity-50 duration-500"
        onClick={() => props.setUserClick(false)}></div>
        <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col absolute inset-1/4 w-1/2 h-1/2 justify-center items-center rounded-xl bg-white duration-500">
                <button className="absolute inset-y-2 right-2 w-5 h-7 text-center border-2 rounded-md"
                onClick = {() => props.setUserClick(false)}>
                    <span>X</span>
                </button>
                <div className="basis-1/12"><span className="text-2xl">유저 정보</span></div>
                <div className="basis-1/12">
                    <span>ID: </span>
                    <input
                    className='p-1 border-stone-300 border-2 rounded-md'
                    onChange={handleChange}
                    defaultValue={props.curUser.id}
                    name="id"/>
                </div>
                <div className="basis-1/12">
                    <span>이름: </span>
                    <input
                    className='p-1 border-stone-300 border-2 rounded-md'
                    onChange={handleChange}
                    defaultValue={props.curUser.name}
                    name="name"/>
                </div>
                <div className="basis-1/12">
                    <span>이메일: </span>
                    <input
                    className='p-1 border-stone-300 border-2 rounded-md'
                    onChange={handleChange}
                    defaultValue={props.curUser.email}
                    name="email"/>
                </div>
                <div className="basis-1/12">
                    <span>휴대전화: </span>
                    <input
                    className='p-1 border-stone-300 border-2 rounded-md'
                    onChange={handleChange}
                    defaultValue={props.curUser.phone}
                    name="phone"/>
                </div>
                <div className="basis-1/12">
                    <span>직급: </span>
                    <select className="border-2 m-2 rounded-lg"
                        name="position"
                        defaultValue={props.curUser.position}
                        onChange={handleChange}>
                            <option value="worker">wocker</option>
                            <option value="manager">manager</option>
                        </select>
                </div>
                <div className="basis-1/12">
                    <span>생성날짜: {dateToString(props.curUser.created_at.toString())}</span>
                </div>
                <div className="basis-1/12">
                    <span>최근 로그인:</span>
                </div>

                <button type="submit" className="px-8 py-3 font-semibold rounded-full bg-blue-300 hover:bg-blue-500 text-gray-800"
                >저장</button>
            </div>
        </form>
        </>
    )
}

export default UserDetail