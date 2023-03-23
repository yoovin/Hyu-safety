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

    const [phone, setPhone] = useState(props.curUser.phone)

    const dateToString = (date: string) => {
        return date.replace('T', ' ').substring(0, 19)
    }

    const handlePress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
            setPhone(e.target.value);
        }
    }

    const onDelete = () => {
        if(window.confirm("해당 유저를 삭제하시겠습니까?")){
            axios.delete('/login/delete', {
                data: {
                    id: props.curUser.id
                }
            })
            .then(res => {
                if(res.status == 200){
                    window.alert("삭제 완료 되었습니다.")
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

    const {values, errors, submitting, handleChange, handleSubmit, reset} = useForm({
        initialValues: {
            id: props.curUser.id,
            name: props.curUser.name,
            email: props.curUser.email,
            position: props.curUser.position,
        },
        onSubmit: (values: any) => {
            console.log(values)
            if(window.confirm("저장하시겠습니까?")){
                axios.post('/user/update/info', {
                    ...values,
                    phone: phone
                })
                .then(data => {
                    if(data.status == 200){
                        window.alert("저장되었습니다.")
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
        },
        validate
    })

    useEffect(() => {
        reset({
            id: props.curUser.id,
            name: props.curUser.name,
            email: props.curUser.email,
            position: props.curUser.position,
        })
    }, [])

    useEffect(() => {
            if (phone.length === 10) {
                setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
            }
            if (phone.length === 13) {
                setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
            }
        }, [phone]);

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
                    onChange={handlePress}
                    // defaultValue={phone}
                    value={phone}
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
                    <span>최근 로그인: {dateToString(props.curUser.recent_login_date.toString())}</span>
                </div>
                <div className="basis-1/12">
                    <span>최근 로그인 IP: {props.curUser.recent_login_ip}</span>
                </div>
                <div className="basis-1/12">
                    <span>FCM Token: {props.curUser.fcm_token}</span>
                </div>
                <div className='flex-row'>
                    <button type="submit" className="px-8 py-3 mx-3 font-semibold rounded-full bg-blue-300 hover:bg-blue-500 text-gray-800"
                    >저장</button>
                    <button type="button" className="px-8 py-3 mx-3 font-semibold rounded-full bg-red-300 hover:bg-red-500 text-gray-800"
                    onClick={onDelete}
                    >삭제</button>
                </div>
            </div>
        </form>
        </>
    )
}

export default UserDetail