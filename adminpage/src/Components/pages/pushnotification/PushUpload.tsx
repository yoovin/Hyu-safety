import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { user } from '../../interface/user'

import useForm from '../../hooks/useForm'
import validate from '../../hooks/workreportValidate'

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr'

/*
===== TODOS =====
ㅇ. 유저 전체선택 구현
*/

type Props = {
}

const PushUpload = (props: Props) => {
    const navigate = useNavigate()
    const [isSearchUser, setIsSearchUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState(new Array<string>)

    const {values, errors, submitting, handleChange, handleSubmit} = useForm({
        initialValues: {title:"", desc:""},
        onSubmit: (values: any) => {
            if(selectedUser.length > 0){
                if(window.confirm("알림을 보내시겠습니까?")){
                    axios.post('/pushnotification/upload', {
                        id: selectedUser,
                        ...values
                    })
                    .then(res => {
                        if(res.status === 201){
                            window.alert("알림 전송 요청이 완료되었습니다.")
                            navigate('/pushnotification/list')
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
            }else{
                window.alert("받을 대상을 선택해주세요.")
            }
        },
        validate,
    })



    const userButton = (id:string, idx:number) => {
        return <div key={idx}  className="px-3 py-1 mx-1 font-semibold rounded-full bg-gray-100 text-gray-800">
                    <span>{id}</span>
                    <button type="button" className='ml-3 text-red-600 font-bold'
                    onClick={() => {
                        setSelectedUser((users: Array<string>) => {
                            return users.filter(data => data != id)
                        })
                    }}>X</button>
                </div>
    }
    
    return (
        <>
        {isSearchUser && <SearchUser
        selectedUser={selectedUser}
        setIsSearchUser={setIsSearchUser} 
        setSelectedUser={setSelectedUser}/>}
        <div className="p-10 basis-5/6">
            <form onSubmit={handleSubmit} noValidate>
                <div className="flex basis-1/3">
                    <span className="my-3 text-2xl">알림 보내기</span>
                </div>
                <div className="flex mb-3">
                    <div className="flex w-28 items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">
                        <span>받는대상</span>
                    </div>
                    <div className="flex w-full border p-2 sm:text-sm rounded-r-md focus:ring-inset border-gray-200  focus:ring-violet-400">
                        {selectedUser.map((item, idx) => (
                            userButton(item, idx)
                        ))}
                        <button type="button" className="px-5 py-1 mx-1 font-semibold rounded-full bg-gray-100 text-gray-800"
                        onClick={() => setIsSearchUser(true)}>추가</button>
                    </div>
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
                <div className="mb-3">
                    <fieldset className="w-full">
                        <div className="flex">
                            <span className="flex items-center px-3 pointer-events-none sm:text-sm rounded-l-md bg-gray-200">내용</span>
                            <textarea name="desc" placeholder="내용을 입력해주세요." className="flex flex-1 border p-1.5 sm:text-sm rounded-r-md focus:ring-inset border-gray-200  focus:ring-violet-400"
                            onChange={handleChange}/>
                        </div>
                    </fieldset>
                </div>
                <div className="flex my-10">
                    <button type="submit" disabled={submitting} className={`px-8 py-3 font-semibold rounded-full bg-gray-200 text-gray-800 hover:bg-gray-400`}>등록하기</button>
                </div>
            </form>
        </div>
    </>
    )
}

const SearchUser = (props: any) => {
    const [users, setUsers] = useState<[user]| null>()
    const [noticeCount, setNoticeCount] = useState(0)
    const [noticePages, setNoticePages] = useState(1)
    const [noticePageTen, setNoticePageTen] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [noticeStatus, setNoticeStatus] = useState('all')
    const [noticeReverse, setNoticeReverse] = useState('-1')
    const [searchSubject, setSearchSubject] = useState('id')
    const [searchText, setSearchText] = useState('')

    const [selectAll, setSelectAll] = useState(false)

    const dateToString = (date: string) => {
        return date.replace('T', ' ').substring(0, 19)
    }

    const renderPageButton = (page: number): any => {
        const result = []
        for(let i = page; i < page+10; i++){
            if(i >= noticePages) break
            if(i == currentPage){
                result.push(<button type="button" className={"inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md font-bold bg-gray-100"} value={i} onClick={handlePage}>{i}</button>)
            }else{
                result.push(<button type="button" className={"inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md"} value={i} onClick={handlePage}>{i}</button>)
            }
        }
        return result
    }

    const handleUserSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchSubject(e.target.value)
        setSearchText('')
    }

    const handleNoticeStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNoticeStatus(e.target.value)
        setCurrentPage(1)
    }

    const handleNoticeReverseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNoticeReverse(e.target.value)
        setCurrentPage(1)
    }

    const handleChangeSelectedUsers = (checked: boolean, id: string) => {
        if(checked){
            props.setSelectedUser((users: Array<string>) => {
                const newArr = [...users, id]
                return newArr
            })
        }else{
            props.setSelectedUser((users: Array<string>) => {
                return users.filter(data => data != id)
            })
        }
    }

    const getNoticeData = (query?: any) => {
        axios.get('/user/getusers', {params: {...query, reverse: noticeReverse}})
        .then(res => {
            setUsers(res.data.users)
            let pages = res.data.count / 10
            if(res.data.count % 10 > 0) pages+=1
            setNoticePages(pages)
            setNoticeCount(res.data.count)
            console.log(res.data.count)
        })
        .catch(err => console.error(err))
    }

    const search = () => {
        getNoticeData({[searchSubject]: {$regex: searchText}})
    }

    const handlePage = (e: any) => {
        setCurrentPage(Number(e.target.value))
    }

    useEffect(() => {
        getNoticeData({page: currentPage})
    }, [])

    useEffect(() => {
        switch(noticeStatus){
            case "worker":
                getNoticeData({position: "worker", page: currentPage})
                break
            case "manager":
                getNoticeData({position: "manager", page: currentPage})
                break
            default:
                getNoticeData({page: currentPage})
                break
        }
        
    }, [noticeStatus, noticeReverse, currentPage])

    return(
        <>
            <div className='w-full h-full absolute bg-gray-800 opacity-50'
            onClick={() => props.setIsSearchUser(false)}></div>

            <div className='absolute inset-1/4 w-1/2 h-1/2 rounded-xl bg-white'>
            <div className="p-5 w-full">
                <div className="container p-2 mx-auto sm:p-4 text-gray-900">
                    <div className="mb-2">
                        <span className="text-2xl font-semibold leading-tight">유저목록</span>
                        <span className="mx-2 text-slate-400">{noticeCount}개</span> 
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>
                            <select className="border-2 m-1 rounded-lg"
                            name="subject"
                            onChange={handleNoticeStatusChange}
                            value={noticeStatus}>
                                <option value="all">전체</option>
                                <option value="manager">감독관</option>
                                <option value="worker">근로자</option>
                            </select>
                            <select className="border-2 m-2 rounded-lg"
                            name="subject"
                            onChange={handleNoticeReverseChange}
                            value={noticeReverse.toString()}>
                                <option value="-1">최신 순</option>
                                <option value="1">오래된 순</option>
                            </select>
                        </div>
                        <div className="flex flex-row">
                            <select className="border-2 m-1 rounded-lg"
                            name="subject"
                            onChange={handleUserSearchChange}
                            value={searchSubject}>
                                <option value="id">아이디</option>
                                <option value="name">이름</option>
                                <option value="email">이메일</option>
                                <option value="phone">휴대전화</option>
                            </select>
                                <div className="w-10 m-1 p-2 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-300 text-gray-700 focus:bg-gray-300 focus:border-violet-400">
                                    <input type="search" name="Search" placeholder="Search..." 
                                    className="text-sm rounded-md sm:w-auto focus:outline-none bg-gray-300 text-gray-700 focus:bg-gray-300 focus:border-violet-400"
                                    value={searchText}
                                    onChange={val => setSearchText(val.target.value)}/>
                                    <span className="items-center pl-0">
                                        <button type="button" title="search" className="focus:outline-none"
                                        onClick={() => search()}>
                                            <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-gray-600">
                                                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                            </svg>
                                        </button>
                                    </span>
                                </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full p-6 text-xs text-center whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-300">
                                    <th className="p-3">
                                        <input type="checkbox" className='mr-2'
                                        onChange={({target:{checked}}) => setSelectAll(checked)}/>
                                        <span>전체선택</span>
                                        </th>
                                    <th className="p-3">유저아이디</th>
                                    <th className="p-3">이름</th>
                                    <th className="p-3">이메일</th>
                                    <th className="p-3">전화번호</th>
                                    <th className="p-3">생성일자</th>
                                    <th className="p-3">직책</th>
                                </tr>
                            </thead>
                            <tbody className="border-b bg-gray-100 border-gray-100">
                                {users && users.map(item => (
                                    <tr className="hover:bg-gray-200"
                                    onClick={() => {

                                    }}>
                                    <td className="px-3 py-2 font-bold">
                                        <input type="checkbox"
                                        checked={props.selectedUser.indexOf(item.id) != -1}
                                        disabled={selectAll}
                                            onChange={({target:{checked}}) => {
                                                handleChangeSelectedUsers(checked, item.id)
                                            }}
                                        />
                                    </td>
                                    <td className="px-3 py-2 font-bold">
                                        <span>{item.id}</span>
                                    </td>
                                    <td className="px-3">
                                        <span>{item.name}</span>
                                    </td>
                                    <td className="px-3 py-2">
                                        <span>{item.email}</span>
                                    </td>
                                    <td className="px-3 py-2">
                                        <span>{item.phone}</span>
                                    </td>
                                    <td className="px-3 py-2 ">
                                        <p>{`${dateToString(item.created_at.toString())}`}</p>
                                    </td>
                                    <td className="px-3 py-2">
                                        {item.position == "worker" && <span>근로자</span>}
                                        {item.position == "manager" && <span>감독관</span>}
                                        {item.position == "admin" && <span>관리자</span>}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='flex-row m-1 mt-2'>
                            
                        </div>
                        
                    </div>
                </div>

                <div className="flex justify-center space-x-1">
                    <button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md"
                    onClick={() => {
                        if(noticePageTen > 1){
                            setNoticePageTen(val => val-10)
                        }
                    }}>
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    {renderPageButton(noticePageTen)}

                    <button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md"
                    onClick={() => {
                        if(noticePages > noticePageTen+10){
                            setNoticePageTen(val => val+10)
                        }
                    }}>
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PushUpload