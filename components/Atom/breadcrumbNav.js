import { HomeIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const defaultPages = [
    { name: 'Projects', href: '#', current: false },
    { name: 'Project Nero', href: '#', current: true },
]

export default function BreadCrumbNav({ pages = [] }) {
    if (pages.length == 0) { pages = defaultPages }
    return (
        <div className="absolute z-10 top-10 left-10">
            <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="bg-white rounded-md shadow px-6 flex space-x-4">
                    <li className="flex">
                        <div className="flex items-center">
                            <Link href="/" passHref>
                                <a href="/" className="text-gray-400 hover:text-gray-500">
                                    <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                    <span className="sr-only">Home</span>
                                </a>
                            </Link>
                        </div>
                    </li>
                    {pages.map((page) => (
                        <li key={page.name} className="flex">
                            <div className="flex items-center">
                                <svg
                                    className="flex-shrink-0 w-6 h-full text-gray-200"
                                    viewBox="0 0 24 44"
                                    preserveAspectRatio="none"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <Link href={page.href} passHref>
                                    <a
                                        href={page.href}
                                        className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                        aria-current={page.current ? 'page' : undefined}
                                    >
                                        {page.name}
                                    </a>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}