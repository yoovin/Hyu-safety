import React, {useState} from 'react'
import { IoMenu, IoChatbubblesOutline } from "react-icons/io5";
import { AiOutlineNotification } from "react-icons/ai"
import { Link } from 'react-router-dom';

type Props = {}

const LeftNav = (props: Props) => {
    const [currentPage, setCurrentPage] = useState('')
    const [currentHover, setCurrentHover] = useState(0)

    return (
        <div className="basis-1/6 min-h-screen border-r-2 border-slate-200">
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
            <Link to="/livereport" className="flex p-1 hover:bg-slate-100"
            onMouseOver={() => setCurrentHover(2)}
            // onMouseOut={() => setCurrentHover(0)}
            >
                <IoChatbubblesOutline/>
                <span className="mx-2">건의사항</span>
            </Link>
            <hr/>
            <div>

            </div>
        </div>
    )
}

export default LeftNav