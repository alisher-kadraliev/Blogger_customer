import React from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

import { useTranslation } from "react-i18next";
import { Head } from "@inertiajs/react";
import Paginate from "@/Pages/Post/Paginate.jsx";

const Show = ({ post, auth }) => {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Post "{post.title}"
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <pre> {JSON.stringify(post, undefined, 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
            <Head title={post.title} />
        </AuthenticatedLayout>
    );
};
export default Show;
