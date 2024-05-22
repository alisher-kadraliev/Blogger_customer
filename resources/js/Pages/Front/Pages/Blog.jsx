import { Head, Link } from "@inertiajs/react";
import Layout from "@/Pages/Front/Layout.jsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb.jsx";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const generateToc = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const heading = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5,h6"));
    return heading.map((heading) => ({
        level: parseInt(heading.tagName.replace("H", ""), 10),
        text: heading.innerText,
        id:
            heading.id ||
            heading.innerText.toLowerCase().replace(/[^\w]+/g, "-"),
    }));
};

export default function Blog({ post, cats, auth }) {
    const [toc, setToc] = useState([]);

    useEffect(() => {
        const content = post.content;
        const toc = generateToc(content);
        setToc(toc);
    }, [post.content]);

    const imageSize = {
        width: 568,
        height: 240,
    };
    const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

    return (
        <>
            <Head title="" />

            <Layout>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="container"
                >
                    <Breadcrumb className="pb-10">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link href={route("front.index")}>
                                        Anasayfa
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link href={route("front.blogs")}>
                                        Bloglar
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.75 }}
                                    >
                                        {post.title}
                                    </motion.div>
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-row gap-10 flex-wrap justify-center items-center mx-auto"></div>
                </motion.div>
                <div className="container mb-20 mt-10">
                    <div className="flex flex-row justify-center items-start gap-20">
                        <div className="flew flex-col w-1/2 max-lg:w-full">
                            <div className="flex flew-row gap-2 text-gray-500 font-mono mb-3 overflow-hidden">
                                <motion.div
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    {post.formatted_created_at}
                                </motion.div>
                                <motion.div
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    ·
                                </motion.div>
                                <motion.div
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                >
                                    <span>{post.reading_time}</span>
                                    <span> daka okuma</span>
                                </motion.div>
                            </div>
                            <div className="overflow-hidden mb-3">
                                <motion.h1
                                    initial={{ y: 400 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 1 }}
                                    className="text-[64px] h1 font-black"
                                >
                                    {post.title}
                                </motion.h1>
                            </div>
                            <div className="flex flew-row items-center gap-2 font-mono text-gray-500 overflow-hidden">
                                <motion.div
                                    initial={{ y: 200 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 1.3 }}
                                >
                                    yazan:{" "}
                                    <Link
                                        href=""
                                        className="text-gray-800 underline"
                                    >
                                        {auth.user.name}
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ y: 200 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 1.6 }}
                                >
                                    |
                                </motion.div>
                                <motion.div
                                    initial={{ y: 200 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, delay: 1.9 }}
                                >
                                    <span className="mr-1">👀</span>
                                    <span>{post.views}</span>
                                </motion.div>
                            </div>
                        </div>
                        <motion.div
                            initial={{
                                width: imageSize.width,
                                height: imageSize.height,
                            }}
                            animate={{
                                transition: { delay: 0.4, ...transition },
                            }}
                            transition={{ duration: 0.8 }}
                            className="mx-auto"
                        >
                            <motion.img
                                // initial={{
                                //     width: imageSize.width,
                                //     height: imageSize.height,
                                // }}
                                // animate={{
                                //     width: "100%",
                                //     transition: { delay: 0.2, ...transition },
                                // }}
                                // transition={{ duration: 0.8 }}
                                src={post.image_url}
                                className="max-lg:h-auto mx-auto object-cover rounded-sm"
                                // alt=""
                                width={imageSize.width}
                                height={imageSize.height}
                            />
                        </motion.div>
                    </div>
                </div>
                <div className="max-w-[900px] pt-10 flex flex-row gap-20 max-md:max-w-max max-md:px-10 mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        <div className="">
                            <h2>İçindekiler</h2>
                            <ul>
                                {toc.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`level-${item.level}`}
                                    >
                                        <a href={`#${item.id}`}>{item.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                    <div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        {post.description}
                    </motion.p>
                    <motion.p
                        className="editor"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    </div>
                </div>
            </Layout>
        </>
    );
}
