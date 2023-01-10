import React from 'react';
import {Route, Routes} from 'react-router-dom'

import LeftNav from './Components/LeftNav';
import LiveReport from './Components/pages/LiveReport';
import Main from './Components/pages/Main';
import Notice from './Components/pages/Notice';
import NoticeList from './Components/pages/NoticeList';
import NotFound from './Components/NotFound';
import NoticeUpload from './Components/pages/NoticeUpload';
import NoticeDetail from './Components/pages/NoticeDetail';
import NoticeUpdate from './Components/pages/NoticeUpdate';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_ADDRESS

function App() {
    return (
        <div className="flex flex-row">
            <LeftNav/>
                <Routes>
                    <Route path="/" element={<Main/>}></Route>

                    <Route path="/notice" element={<Notice/>}></Route>
                    <Route path="/notice/:index" element={<NoticeDetail/>}></Route>
                    <Route path="/notice/:index/update" element={<NoticeUpdate/>}></Route>
                    <Route path="/notice/list" element={<NoticeList/>}></Route>
                    <Route path="/notice/upload" element={<NoticeUpload/>}></Route>

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
