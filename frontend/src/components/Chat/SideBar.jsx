
function Header() {
    return (
        <div className="text-white mb-2 mt-3 px-4 flex justify-between">
            <div className="flex-auto">
                <h1 className="font-semibold text-xl leading-tight mb-1 truncate">RSocket Demo</h1>
                <div className="flex items-center mb-6">
                    <span className="bg-green-400 rounded-full block w-2 h-2 mr-2" />
                    <span className="text-white opacity-50 text-sm">Username</span>
                </div>
            </div>
            <div>
                <svg className="h-6 w-6 fill-current text-white opacity-25" viewBox="0 0 20 20">
                    <path
                        d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z"
                        fillRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
}

function ChannelList() {
    return (
        <div className="mb-8">
            <div className="px-4 mb-2 text-white flex justify-between items-center">
                <div className="opacity-75">Channels</div>
                <div>
                    <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
                    </svg>
                </div>
            </div>
            <div className="bg-teal-800 py-1 px-4 text-white"># general</div>
        </div>
    );
}

function DirectMessagesList() {
    return (

        <div className="mb-8">
            <div className="px-4 mb-2 text-white flex justify-between items-center">
                <div className="opacity-75">Direct Messages</div>
                <div>
                    <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
                    </svg>
                </div>
            </div>
            <div className="flex items-center mb-3 px-4">
                <span className="bg-green rounded-full block w-2 h-2 mr-2"></span>
                <span className="text-white opacity-75 mr-2">User 1
                                    <span className="pl-1 text-gray text-sm">(you)</span>
                                </span>
            </div>
            <div className="flex items-center mb-3 px-4">
                <span className="bg-green rounded-full block w-2 h-2 mr-2"></span>
                <span className="text-white opacity-75">User 2</span>
            </div>
        </div>
    );
}

export default function Sidebar() {
    return (
        <div className="bg-gray-800 text-purple-lighter flex-none w-64 pb-6 hidden md:block">
            <Header />
            <ChannelList />
            {/*<DirectMessagesList />*/}
        </div>
    );
}
