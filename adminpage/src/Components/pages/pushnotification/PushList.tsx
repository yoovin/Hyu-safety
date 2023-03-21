import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pushnotification } from '../../interface/pushnotification'
import download from 'downloadjs'

import { RiFileExcel2Fill } from "react-icons/ri";

type Props = {}

/*
===== TODOS =====
*/

const PushList = (props: Props) => {

    const [pushs, setPushs] = useState<[pushnotification]| null>()
    const [noticeCount, setNoticeCount] = useState(0)
    const [noticePages, setNoticePages] = useState(1)
    const [noticePageTen, setNoticePageTen] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [noticeStatus, setNoticeStatus] = useState('all')
    const [noticeReverse, setNoticeReverse] = useState('-1')
    const [searchSubject, setSearchSubject] = useState('id')
    const [searchText, setSearchText] = useState('')

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

    const handleNoticeReverseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNoticeReverse(e.target.value)
        setCurrentPage(1)
    }

    const getNoticeData = (query?: any) => {
        axios.get('/pushnotification/getpushs', {params: {...query, reverse: noticeReverse}})
        .then(res => {
            setPushs(res.data.pushs)
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

    const onDownload = () => {
        axios.get("/login/download", {
            params: {
                
            },
            responseType: 'blob',
        })
        .then(res => {
            download(res.data, `${new Date().toString()}_유저목록.xlsx`)
        })
    }

    useEffect(() => {
        getNoticeData({page: currentPage})
    }, [])

    useEffect(() => {
        getNoticeData({page: currentPage})
        
    }, [noticeReverse, currentPage])

    return (
        <div className="p-5 w-10/12">
        <div className="container p-2 mx-auto sm:p-4 text-gray-900">
            <div className="mb-2">
                <span className="text-2xl font-semibold leading-tight">보낸알림목록</span>
                <span className="mx-2 text-slate-400">{noticeCount}개</span> 
            </div>
            <div className="flex flex-row justify-between">
                <div>
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
                        <option value="id">대상</option>
                        <option value="title">제목</option>
                        <option value="desc">내용</option>
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
                            <th className="p-3">번호</th>
                            <th className="p-3">대상</th>
                            <th className="p-3">제목</th>
                            <th className="p-3">내용</th>
                            <th className="p-3">보낸날짜</th>
                            <th className="p-3">상태</th>
                            <th className="p-3">비고</th>
                        </tr>
                    </thead>
                    <tbody className="border-b bg-gray-100 border-gray-100">
                        {pushs && pushs.map(item => (
                            <tr className="hover:bg-gray-200"
                            onClick={() => {
                            }}>
                            <td className="px-3 py-2 font-bold">
                                <span>{item.index}</span>
                            </td>
                            <td className="px-3">
                                <span>{item.id}</span>
                            </td>
                            <td className="px-3">
                                <span>{item.title}</span>
                            </td>
                            <td className="px-3 py-2">
                                <span>{item.desc}</span>
                            </td>
                            <td className="px-3 py-2 ">
                                <p>{`${dateToString(item.upload_date.toString())}`}</p>
                            </td>
                            <td className="px-3 py-2">
                                {item.condition 
                                ? <span className='font-bold text-green-500'>전송완료</span> 
                                : <span className='font-bold text-orange-500'>전송실패</span>}
                            </td>
                            <td className="px-3 py-2">
                                <span>{item.condition_reason}</span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                {/* <div className='flex-row m-1 mt-2'>
                    <button type='button' className='flex text-sm text-green-600 font-bold'
                    onClick={onDownload}>
                        <RiFileExcel2Fill size={20}/>전체 엑셀 다운로드
                    </button>
                </div> */}
                
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
    )
}

export default PushList