import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Table from "@/Pages/Post/PostTable.jsx";

import { useTranslation } from "react-i18next";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { motion } from "framer-motion";
import Paginate from "@/Pages/Post/Paginate.jsx";

const Index = ({
    auth,
    posts,
    statuses,
    categories,
    trashedPosts,
    totalPost,
}) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Postlar
                </h2>
            }
        >
            <Head title="Dashboard" />

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href={route("dashboard")}>Panel</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            <motion.div
                                initial={{opacity: 0 }}
                                animate={{opacity: 1 }}
                                transition={{ duration: 0.75 }}
                            >
                                Postlar
                            </motion.div>
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-12">
                <div className="max-w-7xl bg-white shadow-sm sm:rounded-lg mx-auto sm:p-6 lg:p-8">
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ y: "100vw", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.75 }}
                            className="motion-div p-6 text-gray-900 bg-white"
                        >
                            <Table
                                totalPost={totalPost}
                                posts={posts}
                                statuses={statuses}
                                categories={categories}
                                trashedPosts={trashedPosts}
                            />

                        </motion.div>
                    </div>
                    <Paginate links={posts.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default Index;
