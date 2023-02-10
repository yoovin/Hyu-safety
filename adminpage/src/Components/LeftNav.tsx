import React, {useState} from 'react'
import { IoMenu, IoHammerOutline, IoChatbubblesOutline, IoPeopleOutline, IoNewspaperOutline } from "react-icons/io5";
import { AiOutlineNotification } from "react-icons/ai"
import { Link } from 'react-router-dom';

type Props = {}

const LeftNav = (props: Props) => {
    const [currentPage, setCurrentPage] = useState('')
    const [currentHover, setCurrentHover] = useState(0)

    return (
        <div className="max-w-ws min-w-fit min-h-screen border-r-2 border-slate-200">
            <Link to="/" className="flex p-3 content-center items-center">
                <span>한양대 에리카 캠퍼스 안전팀</span>
            </Link>
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

            <Link to="/livereport" className="flex p-1 hover:bg-slate-100"
            onMouseOver={() => setCurrentHover(2)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <IoChatbubblesOutline/>
                <span className="mx-2">실시간 신고</span>
            </Link>
            <hr/>

            <div className="flex p-1"
            onMouseOver={() => setCurrentHover(3)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <IoNewspaperOutline/>
                <span className="mx-2">건의사항</span>
            </div>
            {currentHover == 3 &&[
                <Link to="/suggestion/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 건의 목록</span>
                </Link>
                ]}
            <hr/>

            <div className="flex p-1"
            onMouseOver={() => setCurrentHover(4)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <IoHammerOutline/>
                <span className="mx-2">안전작업승인</span>
            </div>
            {currentHover == 4 &&[
                <Link to="/user/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 요청 된 작업</span>
                </Link>
                ]}
            <hr/>

            <div className="flex p-1"
            onMouseOver={() => setCurrentHover(5)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <IoPeopleOutline/>
                <span className="mx-2">유저관리</span>
            </div>
            {currentHover == 5 &&[
                <Link to="/user/list" className="flex px-5 hover:bg-slate-100">
                    <span className="mx-2">- 유저 목록</span>
                </Link>
                ]}
        </div>
    )
}

export default LeftNav