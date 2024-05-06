import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

export default function Table({ auth }) {
    const { data, setData, post, errors } = useForm({
        title: "",
        slug: "",
        content: "",
        author_id: auth.user.id,
    });

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        const content = draftToHtml(
            convertToRaw(editorState.getCurrentContent()),
        );
        setData("content", content);
    };
    const handleSubmitForm = (e) => {
        e.preventDefault();
        post("/post");
    };

    const handleFormClick = (e) => {
        if (e.target.closest(".DraftEditor-root")) {
            e.stopPropagation();
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Yeni Post Ekle - {data.title}
                </h2>
            }
        >
            <Head title="Yeni post yaz" />
            <div className="py-12">
                <div className="max-w-7xl mx-start sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={handleSubmitForm}
                                onClick={handleFormClick}
                                encType="multipart/form-data"
                            >
                                <div className="space-y-12">
                                    <div className="pb-12">
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-4">
                                                <label
                                                    htmlFor="username"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Başlık Ekle
                                                </label>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            value={data.title}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "title",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    {errors.title && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.title}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label
                                                    htmlFor="username"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Başlık Ekle
                                                </label>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                 <input type="file"
                                                 accept="image/*"
                                                        onChange={(e) => setData('image',e.target.files[0])}
                                                        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"

                                                 />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <label
                                                    htmlFor="username"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Slug Ekle
                                                </label>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            value={data.slug}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "slug",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    {errors.slug && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.slug}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="sm:col-span-full relative">
                                                <label
                                                    htmlFor="username"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Content Ekle
                                                </label>
                                                <div
                                                    className="mt-2 min-h-[300px] h-full shadow-[rgba(7,_65,_210,_0.1)_0px_0px_100px] p-5"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <Editor
                                                        editorState={
                                                            editorState
                                                        }
                                                        placeholder="İçerik ekleyin..."
                                                        wrapperClassName="demo-wrapper"
                                                        editorClassName="demo-editor"
                                                        onEditorStateChange={
                                                            onEditorStateChange
                                                        }

                                                        // toolbarOnFocus
                                                        toolbar={{
                                                            options: [
                                                                "inline",
                                                                "blockType",
                                                                'fontFamily',
                                                                "fontSize",
                                                                "list",
                                                                "textAlign",
                                                                "colorPicker",
                                                                "link",
                                                                "embedded",
                                                                "emoji",
                                                                "remove",
                                                                "history",
                                                                "image",

                                                            ],
                                                            inline: {
                                                                options: [
                                                                    "bold",
                                                                    "italic",
                                                                    "underline",
                                                                    "strikethrough",
                                                                ],
                                                            },
                                                            fontFamily: {
                                                                options: ['Quincy-Italic', 'Quincy-Regular', 'Inter-Regular'],
                                                                className: undefined,
                                                                component: undefined,
                                                                dropdownClassName: undefined,
                                                            },
                                                            textAlign: {
                                                                inDropdown: true,
                                                                className: "no-scroll",
                                                                component: undefined,
                                                                dropdownClassName: undefined,
                                                                options: ['center', 'right', 'justify'],
                                                            },

                                                            image: {
                                                                className: undefined,
                                                                component: undefined,
                                                                popupClassName: undefined,
                                                                urlEnabled: true,
                                                                uploadEnabled: true,
                                                                alignmentEnabled: true,
                                                                uploadCallback: undefined,
                                                                previewImage: true,
                                                                inputAccept: 'image/gif,image/webp,image/jpeg,image/jpg,image/png,image/svg',
                                                                alt: {present: true, mandatory: true},
                                                                defaultSize: {
                                                                    height: 'auto',
                                                                    width: 'auto',
                                                                },
                                                            },

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4 hidden">
                                                <div className="mt-2">
                                                    <div
                                                        className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <input
                                                            type="text"
                                                            value={
                                                                data.author_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "author_id",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button
                                        type="button"
                                        className="text-sm font-semibold leading-6 text-gray-900"
                                    ></button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
