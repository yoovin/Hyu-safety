import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="flex items-center h-100 w-full p-16 ">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
                <h2 className="mb-8 font-extrabold text-9xl ">
                    <span className="sr-only">Error</span>404
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">페이지를 찾을 수 없습니다.</p>
                <p className="mt-4 mb-8">처음으로 돌아가서 다른 페이지를 찾아주세요.</p>
                <Link to="/" className="px-8 py-3 font-semibold rounded bg-gray-200">메인으로 돌아가기</Link>
            </div>
        </div>
    </section>
  )
}

export default NotFound
