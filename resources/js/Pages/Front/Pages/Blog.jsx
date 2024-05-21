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
import React from "react";

export default function Blog({ post, cats }) {



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
                    // animate={{ opacity: 1 }}
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
                {/*{JSON.stringify(post)}*/}
                <div className="container mb-20 mt-10">
                    <div className="flex flex-row justify-center items-start gap-20">
                        <motion.div
                            initial={{

                            }}
                            animate={{opacity:1}}
                            transition={{duration:2}}
                            className="flew flex-col gap-4 w-1/2 max-lg:w-full">
                            <div className="flex flew-row gap-5">
                                <div>{post.created_at_for_humans}</div>
                                <div>{post.reading_time}</div>
                            </div>
                            <div className="overflow-hidden">
                            <motion.h1
                                initial={{y:200}}
                                animate={{y:0}}
                                transition={{duration:1,delay:0.2}}
                                className="text-[64px] h1 font-black"
                            >
                                {post.title}
                            </motion.h1>
                            </div>
                            <div className="flex flew-row gap-5">
                                <div>{post.views}</div>
                                <div>{post.reading_time}</div>
                            </div>
                        </motion.div>
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
                <div className="max-w-[600px] pt-20 flex flex-row gap-20 max-md:max-w-max max-md:px-10 mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{duration:1,delay:1}}
                    >
                        <ul>
                            <li>svdsdvsvseflaskfjslkdjfiasds</li>
                            <li>svdsdvsvseflaskfjslkdjfiasds</li>
                            <li>svdsdvsvs</li>
                            <li>svdsdvsvseflaskfjslkdjfiasds</li>
                            <li>svdsdvsvseflaskfjslkdjfiasds</li>
                        </ul>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{duration:1,delay:1}}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </Layout>
        </>
    );
}
