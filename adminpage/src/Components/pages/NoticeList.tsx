import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { notice } from '../interface/notice'

type Props = {}

//todo 페이징 만들기

const NoticeList = (props: Props) => {

    const [notices, setNotices] = useState<[notice]| null>()
    const [noticeCount, setNoticeCount] = useState(0)
    const [noticePages, setNoticePages] = useState(1)
    const [noticePageTen, setNoticePageTen] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [noticeStatus, setNoticeStatus] = useState('all')
    const [noticeReverse, setNoticeReverse] = useState('-1')

    const renderPageButton = (page: number): any => {
        const result = []
        for(let i = page; i < page+10; i++){
            if(i >= noticePages) break
            result.push(<button type="button" className={"inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md" + (i == currentPage && "font-bold")} value={i} onClick={handlePage}>{i}</button>)
        }
        return result
    }

    const leftPad = (value: number) => {
        if (value >= 10) {
            return value;
        }
        return `0${value}`;
    }

    const toStringByFormatting = (source: Date, delimiter = '-') => {
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
    
        return [year, month, day].join(delimiter);
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
        axios.get('/notice', {params: {...query, reverse: noticeReverse}})
        .then(res => {
            setNotices(res.data.notices)
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
            case "uploaded":
                getNoticeData({uploaded: true, page: currentPage})
                break
            case "deleted":
                getNoticeData({uploaded: false, page: currentPage})
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
        <span className="text-2xl font-semibold leading-tight">공지사항</span>
        <span className="mx-2 text-slate-400">{noticeCount}개</span> 
    </div>
    <select className="border-2 m-1 rounded-lg"
    name="subject"
    onChange={handleNoticeStatusChange}
    value={noticeStatus}>
        <option value="all">전체</option>
        <option value="uploaded">업로드 된 공지</option>
        <option value="deleted">내려간 공지</option>
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
                    <th className="p-3">글번호</th>
					<th className="p-3">분류</th>
					<th className="p-3">제목</th>
					<th className="p-3">글쓴이</th>
					<th className="p-3">업로드 날짜</th>
					<th className="p-3">상태</th>
				</tr>
			</thead>
			<tbody className="border-b bg-gray-100 border-gray-100">
                {notices && notices.map(item => (
                    <tr className="hover:bg-gray-200">
                    <td className="px-3 py-2 font-bold">
						<span>{item.index}</span>
					</td>
					<td className="px-3 text-xl font-medium text-gray-400">{item.subject}</td>
					<td className="px-3 py-2 text-left">
                        <Link to={`/notice/${item.index}`}>{item.title}</Link>
						{/* <p>{item.title}</p> */}
					</td>
					<td className="px-3 py-2">
						<span>{item.author}</span>
					</td>
					<td className="px-3 py-2 ">
						{/* <p>{`${toStringByFormatting(item.upload_date)}`}</p> */}
                        <p>{`${item.upload_date}`}</p>
					</td>
					<td className="px-3 py-2">
						{item.uploaded ? <div className="bg-green-300 rounded-md">업로드</div>
                        : <div className="bg-orange-300 rounded-md">내려짐</div>}
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