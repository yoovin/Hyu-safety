import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom'
import axios from 'axios';
import { RecoilRoot } from 'recoil'

import LeftNav from './Components/LeftNav';
import Main from './Components/pages/Main';

/*
===== Notice =====
*/
import NoticeList from './Components/pages/notice/NoticeList';
import NoticeUpload from './Components/pages/notice/NoticeUpload';
import NoticeDetail from './Components/pages/notice/NoticeDetail';
import NoticeUpdate from './Components/pages/notice/NoticeUpdate';

/*
===== User =====
*/
import UserList from './Components/pages/user/UserList';

/*
===== Suggestion =====
*/
import SuggestionList from './Components/pages/suggestion/SuggestionList';
import SuggestionDetail from './Components/pages/suggestion/SuggestionDetail';

/*
===== Workreport =====
*/
import WorkreportList from './Components/pages/workreport/WorkreportList';
import WorkreportDetail from './Components/pages/workreport/WorkreportDetail';
import WorkreportDownload from './Components/pages/workreport/WorkreportDownload';

/*
===== Push notification =====
*/
import PushUpload from './Components/pages/pushnotification/PushUpload';
import PushList from './Components/pages/pushnotification/PushList';

import NotFound from './Components/NotFound';
import Login from './Components/Login';




axios.defaults.baseURL = process.env.REACT_APP_SERVER_ADDRESS // 서버 주소 지정

function App() {
    const sessionStorage = window.sessionStorage
    const [user, setUser] = useState(null);

    return (
        <RecoilRoot>
            {sessionStorage.getItem('login') === 'true'
            ?
            <>
            <div className="flex flex-row">
            <LeftNav/>
                <Routes>
                    <Route path="/" element={<Main/>}></Route>

                    {/*
                    =====  Notice =====
                    */}
                    <Route path="/notice/:index" element={<NoticeDetail/>}></Route>
                    <Route path="/notice/:index/update" element={<NoticeUpdate/>}></Route>
                    <Route path="/notice/list" element={<NoticeList/>}></Route>
                    <Route path="/notice/upload" element={<NoticeUpload/>}></Route>
                    
                    {/*
                    =====  User =====
                    */}
                    <Route path="/user/list" element={<UserList/>}></Route>

                    {/*
                    =====  Suggestion =====
                    */}
                    <Route path="/suggestion/list" element={<SuggestionList/>}></Route>
                    <Route path="/suggestion/:index" element={<SuggestionDetail/>}></Route>

                    <Route path="/workreport/list" element={<WorkreportList/>}></Route>
                    <Route path="/workreport/download" element={<WorkreportDownload/>}></Route>
                    <Route path="/workreport/:index" element={<WorkreportDetail/>}></Route>

                    {/*
                    =====  Notice =====
                    */}
                    <Route path="/pushnotification/upload" element={<PushUpload/>}></Route>
                    <Route path="/pushnotification/list" element={<PushList/>}></Route>

                    <Route path="/*" element={<NotFound/>}></Route>
                </Routes>
            </div>
            </>
            :
            <Login/>
            }
            <div className='bg-gray-800 text-gray-100' style={{height: '5vh'}}>
                <footer className="px-4 divide-y ">
                    <div className="flex-row py-6 text-sm text-center text-gray-400">
                        <span>© 2023 Hanyang Univercity Campus Safety Team All rights reserved.</span>
                    </div>
                </footer>
            </div>
        </RecoilRoot>
    );
}

export default App;
