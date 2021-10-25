export default function MailingList() {
    return <div className="mt-10 sm:mt-12">
      <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
        <div className="sm:flex">
          <div className="min-w-0 flex-1">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900" />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
            >
              Join Mail List
            </button>
          </div>
        </div>
      </form>
    </div>;
  }