import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'
const navigation = [
    { name: 'Hakkımda', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Portfolio', href: '#' },
]

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">
            <header className="z-50 relative">
                <nav
                    className="flex items-center mx-auto p-12 lg:px-16 max-lg:py-5"
                    aria-label="Global"
                >
                    <div className="hidden lg:flex lg:gap-x-12 w-1/3 relative">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex mx-auto justify-center items-center w-1/3">
                        <a href="#">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-20 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="black"
                                className="h-8 w-8"
                            >
                                <path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:justify-end ml-auto w-1/3">
                        <a
                            href="#"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <X />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

            <div className="relative isolate px-0 pt-14 lg:px-8 max-lg:pt-5">
                <div className="container">
                    <div className="flex flex-row gap-16 px-22 py-14 max-lg:flex-col max-lg:px-0 max-lg:py-2 justify-center items-center">
                        <img
                            src="/image/image-asset.jpeg"
                            className="w-1/3 shadow-xl max-lg:w-full"
                            alt=""
                        />
                        <div className="flex flex-col gap-6 w-1/2 max-lg:w-full">
                            <h1 className="text-[48px]">
                                Earn a full time income as a web designer
                            </h1>
                            <p className="text-xl text-frontText">
                                I help web designers build a profitable business
                                that feels fun and easy to run, without
                                overworking or squeezing themselves into other
                                people’s boxes. DOWNLOAD YOUR FREE ROADMAP
                            </p>
                            <a
                                href=""
                                className="front-btn w-2/3 max-lg:w-full text-xl max-lg:p-4 max-lg:text-sm"
                            >
                                DOWNLOAD YOUR FREE ROADMAP
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80 z-[-1] max-lg:w-full"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] z-[-1] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-70 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>

                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
