import React from 'react'

import {user} from '../../interface/user'

type Props = {
    setUserClick: Function
    curUser: user
}

const UserDetail = (props: Props) => {

    const dateToString = (date: string) => {
        return date.replace('T', ' ').substring(0, 19)
    }

  return (
    <>
    <div className="absolute w-full h-full bg-gray-600 opacity-50 duration-500"
    onClick={() => props.setUserClick(false)}></div>
    <div className="flex flex-col absolute inset-1/4 w-1/2 h-1/2 justify-center items-center rounded-xl bg-white duration-500">
        <button className="absolute inset-y-2 right-2 w-5 h-7 text-center border-2 rounded-md"
        onClick = {() => props.setUserClick(false)}>
            <span>X</span>
        </button>
        <div className="basis-1/12"><span className="text-2xl">유저 정보</span></div>
        <div className="basis-1/12">
            <span>ID: {props.curUser.id}</span>
        </div>
        <div className="basis-1/12">
            <span>이름: {props.curUser.name}</span>
        </div>
        <div className="basis-1/12">
            <span>이메일: {props.curUser.email}</span>
        </div>
        <div className="basis-1/12">
            <span>휴대전화: {props.curUser.phone}</span>
        </div>
        <div className="basis-1/12">
            <span>직급: {props.curUser.position}</span>
        </div>
        <div className="basis-1/12">
            <span>생성날짜: {dateToString(props.curUser.created_at.toString())}</span>
        </div>
        <div className="basis-1/12">
            <span>최근 로그인:</span>
        </div>
        {/* <div className="basis-1/12">
            <span></span>
        </div> */}
    </div>
    </>
  )
}

export default UserDetail