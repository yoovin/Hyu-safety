import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { user } from '../../interface/user'

type Props = {}

/*
===== TODOS =====
1. 유저 검색기능 만들기
2. 유저 관리기능 만들기 (모달창)
*/

const NoticeList = (props: Props) => {

    const [users, setUsers] = useState<[user]| null>()
    const [noticeCount, setNoticeCount] = useState(0)
    const [noticePages, setNoticePages] = useState(1)
    const [noticePageTen, setNoticePageTen] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [noticeStatus, setNoticeStatus] = useState('all')
    const [noticeReverse, setNoticeReverse] = useState('-1')

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

    const handleNoticeStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNoticeStatus(e.target.value)
        setCurrentPage(1)
    }

    const handleNoticeReverseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNoticeReverse(e.target.value)
        setCurrentPage(1)
    }

    const getNoticeData = (query?: any) => {
        axios.get('/login/getusers', {params: {...query, reverse: noticeReverse}})
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

  return (
    <div className="p-5 w-10/12">
    <div className="container p-2 mx-auto sm:p-4 text-gray-900">
	<div className="mb-2">
        <span className="text-2xl font-semibold leading-tight">유저목록</span>
        <span className="mx-2 text-slate-400">{noticeCount}개</span> 
    </div>
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
	<div className="overflow-x-auto">
		<table className="w-full p-6 text-xs text-center whitespace-nowrap">
			<thead>
				<tr className="bg-gray-300">
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
                    <tr className="hover:bg-gray-200">
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

        {/* <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md" value={1} onClick={handlePage}>1</button>
        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md " value={2} onClick={handlePage}>2</button>
        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md " value={3} onClick={handlePage}>3</button>
        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md " title="Page 4">4</button> */}
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

export default NoticeList