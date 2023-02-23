import React from 'react';
import {Route, Routes} from 'react-router-dom'
import axios from 'axios';

import LeftNav from './Components/LeftNav';
import LiveReport from './Components/pages/LiveReport';
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

import NotFound from './Components/NotFound';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_ADDRESS // 서버 주소 지정

function App() {
    return (
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

                    <Route path="/livereport" element={<LiveReport/>}></Route>

                    <Route path="/*" element={<NotFound/>}></Route>
                </Routes>
            {/* <footer className="px-4 divide-y dark:bg-gray-800 dark:text-gray-100">
                <div className="py-6 text-sm text-center dark:text-gray-400">© 1968 Company Co. All rights reserved.</div>
            </footer> */}
        </div>
    );
}

export default App;
