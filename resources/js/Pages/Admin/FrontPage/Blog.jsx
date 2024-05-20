import React from "react";
import { motion } from "framer-motion";

export default function Blog() {
    return (
        <motion.div
            initial={{ y: "100vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75 }}
            className="motion-div p-6 text-gray-900 bg-white"
        >
            <div className="mb-10 mt-10">
                <label className="block text-md font-bold leading-6 text-gray-900">
                    h1 Başlık
                </label>
                <div className="mt-2">
                    <div className="flex mt-5 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
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
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <textarea
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
