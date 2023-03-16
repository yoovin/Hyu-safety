import React, {useState} from 'react'
import { IoMenu, IoHammerOutline, IoChatbubblesOutline, IoPeopleOutline, IoNewspaperOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { AiOutlineNotification } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const LeftNav = (props: Props) => {
    const navigate = useNavigate()
    const sessionStorage = window.sessionStorage

    const [currentPage, setCurrentPage] = useState('')
    const [currentHover, setCurrentHover] = useState(0)

    return (
        <div className="basis-1/6 border-r-2 border-slate-200" style={{height: '95vh'}}>
            <Link to="/" className="flex p-3 content-center items-center">
                <img src='/assets/images/safety_logo.png' alt="logo" className='p-3'/>
            </Link>

            <div className='flex mb-3 justify-center'>
                <button type="button" className="px-5 py-1 font-semibold rounded bg-gray-100 hover:bg-gray-300 text-gray-800"
                onClick={() => {
                    if(window.confirm("로그아웃 하시겠습니까?")){
                        sessionStorage.clear()
                        window.location.reload()
                    }
                }}>로그아웃</button>
            </div>
            <hr/>

            <div className="flex p-1"
            onMouseOver={() => setCurrentHover(1)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <AiOutlineNotification/>
                <span className="mx-2">공지사항</span>
            </div>
            {currentHover == 1 &&[
                <Link to="/notice/upload" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 새 글 쓰기</span>
                </Link>,
                <Link to="/notice/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 공지 목록</span>
                </Link>
            ]
            
            }
            <hr/>

            <div className="flex p-1"
            onMouseOver={() => setCurrentHover(2)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <IoNewspaperOutline/>
                <span className="mx-2">건의사항</span>
            </div>
            {currentHover == 2 &&[
                <Link to="/suggestion/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 건의 목록</span>
                </Link>
                ]}
            <hr/>

            <div className="flex p-1"
            onMouseOver={() => setCurrentHover(3)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <IoHammerOutline/>
                <span className="mx-2">안전작업승인</span>
            </div>
            {currentHover == 3 &&[
                <Link to="/workreport/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 작업 신고 목록</span>
                </Link>,
                <Link to="/workreport/download" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 신고 내역 다운로드</span>
                </Link>
                ]}
            <hr/>

            <div className="flex p-1"
            onMouseOver={() => setCurrentHover(4)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <IoPeopleOutline/>
                <span className="mx-2">유저관리</span>
            </div>
            {currentHover == 4 &&[
                <Link to="/user/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 유저 목록</span>
                </Link>
                ]}
            
            <hr/>

            <div className="flex p-1"
            onMouseOver={() => setCurrentHover(5)}
            >
                <IoChatboxEllipsesOutline/>
                <span className="mx-2">푸시알림</span>
            </div>
            {currentHover == 5 &&[
                <Link to="/user/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 알림 보내기</span>
                </Link>,
                <Link to="/user/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 보낸 알림 목록</span>
                </Link>
                ]}



            </div>
    )
}

export default LeftNav