import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import Home from "@/Pages/Admin/FrontPage/Home.jsx";
import Setting from "@/Pages/Setting/Setting.jsx";
import Blog from "@/Pages/Admin/FrontPage/Blog.jsx";

const Index = ({
    auth,
}) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Genel Sayfa Ayarları
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.75 }}
                            >
                                Genel Sayfa Ayarları
                            </motion.div>
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-12">
                <div className="max-w-7xl bg-white shadow-sm sm:rounded-lg mx-auto sm:p-6 lg:p-8">
                    <div className="overflow-hidden">
                        <div>
                            <Tabs defaultValue="setting">
                                <TabsList>
                                    <TabsTrigger value="setting">Genel Ayarlar</TabsTrigger>
                                    <TabsTrigger value="home">Anasayfa</TabsTrigger>
                                    <TabsTrigger value="blog">Blog</TabsTrigger>
                                </TabsList>
                                <TabsContent value="setting">
                                <Setting/>
                                </TabsContent>

                                <TabsContent value="home"><Home/></TabsContent>
                                <TabsContent value="blog"><Blog/></TabsContent>
                            </Tabs>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default Index;
