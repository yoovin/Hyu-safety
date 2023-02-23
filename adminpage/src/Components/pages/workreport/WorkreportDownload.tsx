import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import download from 'downloadjs'

function WorkreportDownload() {

    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())

    const dateToString = (date: Date): string => {
        let strDate = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`
        return strDate
        
    }

    const onDownload = () => {
        console.log(startDate)
        console.log(endDate)
        axios.get("/workreport/download", {
            params: {
                startDate: startDate,
                endDate: endDate
            },
            responseType: 'blob',
        })
        .then(res => {
            download(res.data, `${startDate.toISOString().split('T')[0]}~${endDate.toISOString().split('T')[0]}.xlsx`)
        })
    }

    useEffect(() => {
        startDate.setHours(0, 0, 0)
        if (startDate.getTime() > endDate.getTime()){
            setEndDate(new Date(startDate))
        }
    }, [startDate])

    useEffect(() => {
        endDate.setHours(23, 59, 59)
    }, [endDate])

    return (
        <div className="basis-5/6 p-3">
            <div className="w-full m-3 px-8 py-2 bg-gray-300">
                <div className="flex items-center mx-auto container justify-center md:justify-between py-2">
                    <span className='text-lg'>신고 내역 다운로드</span>
                </div>
            </div>
            <div className='flex flex-row m-3'>
                <div className='basis-1/2'>
                    <span>{'>'} 시작 날짜 {dateToString(startDate)}</span>
                    <Calendar
                    onChange={setStartDate}
                    value={startDate}
                    maxDate={new Date()}
                    />

                </div>
                <div className='basis-1/2'>
                    <span>{'>'} 종료 날짜 {dateToString(endDate)}</span>
                    <Calendar
                    onChange={setEndDate}
                    value={endDate}
                    minDate={startDate}
                    maxDate={new Date()}
                    />
                </div>
            </div>
            <button type="button" className="m-3 px-8 py-3 font-semibold rounded bg-gray-300 text-gray-800"
            onClick={onDownload}>다운로드</button>
        </div>
    )
}

export default WorkreportDownload