import React from 'react'
import axios from 'axios'
import useForm from './hooks/useForm'
import validate from './hooks/workreportValidate'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import { useCookies } from 'react-cookie'

function Login() {
    const sessionStorage = window.sessionStorage
    const [cookies, setCookie] = useCookies(['token'])

    const {values, errors, submitting, handleChange, handleSubmit} = useForm({
        initialValues: {id: '', pw: ''},
        onSubmit: (values: any) => {
            axios.post('/login/admin', {
                ...values,
                pw: Base64.stringify(sha256(values['pw']))
            })
            .then(res => {
                if(res.status === 200){
                    sessionStorage.setItem('login', 'true')
                    setCookie('token', res.data)
                }
            })
            .then(() => {
                window.location.reload()
            })
            .catch(err => {
                window.alert(`에러가 발생했습니다. ${err}`)
            })
        },
        validate,
    })

    return (
            <div className="flex items-center justify-center text-center bg-gray-900 text-gray-100" style={{height: '95vh'}}>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-gray-100 ng-untouched ng-pristine ng-valid">
                    <div className='p-5 m-5 rounded-md bg-white'>
                        <img src='/assets/images/safety_logo.png' alt="logo" className=''/>
                    </div>
                    <label className="self-start text-xs font-semibold">아이디</label>
                    <input id="username" type="text" name="id" onChange={handleChange} className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400" />
                    <label className="self-start mt-3 text-xs font-semibold">비밀번호</label>
                    <input id="password" type="password" name="pw" onChange={handleChange} className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400" />
                    <button type="submit" className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-violet-400 text-gray-900">로그인</button>
                </form>
            </div>
    )
}

export default Login