import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Notice = (props: Props) => {
  return (
    <div className="p-5 w-10/12">
    <div className="container p-2 mx-auto sm:p-4 text-gray-900">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">공지사항</h2>
	<div className="overflow-x-auto">
		<table className="w-full p-6 text-xs text-left whitespace-nowrap">
			<thead>
				<tr className="bg-gray-300">
					<th className="p-3">공지번호</th>
					<th className="p-3">제목</th>
					<th className="p-3">분류</th>
					<th className="p-3">글쓴이</th>
					<th className="p-3">Email</th>
					<th className="p-3">Address</th>
					<th className="p-3">
						<span className="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody className="border-b bg-gray-100 border-gray-100">
				<tr>
					<td className="px-3 text-2xl font-medium text-gray-400">A</td>
					<td className="px-3 py-2">
						<p>Dwight Adams</p>
					</td>
					<td className="px-3 py-2">
						<span>UI Designer</span>
						<p className="text-gray-400">Spirit Media</p>
					</td>
					<td className="px-3 py-2">
						<p>555-873-9812</p>
					</td>
					<td className="px-3 py-2">
						<p>dwight@adams.com</p>
					</td>
					<td className="px-3 py-2">
						<p>71 Cherry Court, SO</p>
						<p className="text-gray-400">United Kingdom</p>
					</td>
					<td className="px-3 py-2">
						<button type="button" title="Open details" className="p-1 rounded-full text-gray-600 hover:bg-gray-700 focus:bg-gray-700">
							<svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
								<path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"></path>
							</svg>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

    <div className="flex justify-center space-x-1">
        <button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md">
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
        <button type="button" title="Page 1" className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md ">1</button>
        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md " title="Page 2">2</button>
        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md " title="Page 3">3</button>
        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md " title="Page 4">4</button>
        <button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md">
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
    </div>
        
        </div>
    )
}

export default Notice