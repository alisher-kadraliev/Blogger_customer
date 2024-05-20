import React from "react";
import { motion } from "framer-motion";
export default function Setting(){
    return <motion.div
        initial={{ y: "100vw", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="motion-div p-6 text-gray-900 bg-white"
    >
        <div className="mb-10 mt-10">
            <label className="block text-center text-md font-bold leading-6 text-gray-900">
                Başlık
            </label>
            <div className="mt-2">
                <div
                    className="flex justify-center items-center mx-auto mt-5 w-1/2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </div>
    <div className="flex mb-20 flex-row max-lg:flex-col gap-5 justify-between">
        <div>
            <label className="block text-md font-bold leading-6 text-gray-900">
                Logo
            </label>
            <div className="mt-2">
                <input
                    type="file"
                    className="block cursor-pointer
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 border-white focus:outline-none file:text-sm file:font-semibold
        file:bg-gray-900 file:text-white
        hover:file:bg-gray-800 mt-4"
                    accept="image/*"
                />
                <img
                    src="/404/404.png"
                    className="w-32 h-32"
                    alt=""
                />
            </div>
        </div>
        <div>
            <label className="block text-md font-bold leading-6 text-gray-900">
                Favicon
            </label>
            <div className="mt-2">
                <input
                    type="file"
                    className="block cursor-pointer
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 border-white focus:outline-none file:text-sm file:font-semibold
        file:bg-gray-900 file:text-white
        hover:file:bg-gray-800 mt-4"
                    accept="image/*"
                />
                <img
                    src="/404/404.png"
                    className="w-32 h-32"
                    alt=""
                />
            </div>
        </div>
    </div>
    <hr/>
    <div className="my-10">
        <h2 className="text-center text-3xl mb-6 font-bold">
            İletişim
        </h2>
        <div className="flex flex-row gap-4 max-lg:flex-col justify-between">
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Telefon
                </label>
                <div className="mt-2">
                    <input
                        type="tel"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 ring-gray-300 focus:ring-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Whatsapp
                </label>
                <div className="mt-2">
                    <input
                        type="tel"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    E-posta
                </label>
                <div className="mt-2">
                    <input
                        type="email"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </div>
    </div>
    <hr/>
    <div className="my-10">
        <h2 className="text-center text-3xl mb-6 font-bold">
            Sosyal Medya
        </h2>
        <div className="flex flex-row flex-wrap gap-4 max-lg:flex-col justify-between">
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Facebook
                </label>
                <div className="mt-2">
                    <input
                        type="tel"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 ring-gray-300 focus:ring-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Instagram
                </label>
                <div className="mt-2">
                    <input
                        type="tel"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Youtube
                </label>
                <div className="mt-2">
                    <input
                        type="email"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Linkedin
                </label>
                <div className="mt-2">
                    <input
                        type="email"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Web 1
                </label>
                <div className="mt-2">
                    <input
                        type="email"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Web 2
                </label>
                <div className="mt-2">
                    <input
                        type="email"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Web 3
                </label>
                <div className="mt-2">
                    <input
                        type="email"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Web 4
                </label>
                <div className="mt-2">
                    <input
                        type="email"
                        className="block flex-1 border rounded-lg border-gray-300 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-1 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </div>
    </div>
    </motion.div>
}
