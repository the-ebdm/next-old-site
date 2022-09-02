export default function Panel({ header = false, padding = "both", addClass = "", children }) {
    const paddingClass = padding === "both" ? "py-16 sm:py-24 lg:py-32" : padding === "top" ? "pt-16 sm:pt-24 lg:pt-32" : padding === "bottom" ? "pb-16 sm:pb-24 lg:pb-32" : "";
    return (
        <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 w-3/4 mx-auto">
            <div className="relative panel max-w-lg rounded-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
                <div className={`relative ${paddingClass} ${addClass} rounded-lg`}>
                    <div className="relative">
                        {header ? (
                            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                                <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
                                    {header.pre}
                                </h2>
                                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                    {header.title}
                                </p>
                                <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
                                    {header.description}
                                </p>
                            </div>
                        ) : null}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
