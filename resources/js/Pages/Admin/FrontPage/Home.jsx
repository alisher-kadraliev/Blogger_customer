import React from "react";
import { motion } from "framer-motion";
export  default function Home(){
    return (
        <motion.div
            initial={{y: "100vw", opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.75}}
            className="motion-div p-6 text-gray-900 bg-white"
        >
            <div className="mb-10 mt-10">
                <label className="block text-md font-bold leading-6 text-gray-900">
                    h1 Başlık
                </label>
                <div className="mt-2">
                    <div
                        className="flex mt-5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <input
                            type="text"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-10 mt-10">
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Kısa Açıklama
                </label>
                <div className="mt-2">
                    <div
                        className="flex mt-5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <input
                            type="text"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-10 mt-10">
                <label className="block text-md font-bold leading-6 text-gray-900">
                    Link Butonu
                </label>
                <div className="mt-2">
                    <div
                        className="flex mt-5 w-1/2 max-lg:w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
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
                        Profile Fotoğraf
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
                            className=""
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
