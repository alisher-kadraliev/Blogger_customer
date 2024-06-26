import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import slugify from "slugify";
import { ImageUp } from "lucide-react";
import NavLink from "@/Components/NavLink.jsx";
import CropImage from "@/Pages/Post/CreateTable/CropImage.jsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/Components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb.jsx";
import { motion } from "framer-motion";

export default function Table({ auth, categories }) {
    const { data, setData, post, errors } = useForm({
        title: "",
        slug: "",
        meta_title: "",
        meta_description: "",
        description: "",
        content: "",
        category_id: "",
        reading_time: "",
        image_alt: "",
        image: "",
        author_id: auth.user.id,
    });
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isFocused, setIsFocused] = useState(false); // Track focus
    const [closeModal, setCloseModal] = useState(false); // Track focus
    const [contentLength, setContentLength] = useState(0); // Track content length
    const [readingTime, setReadingTime] = useState(0);
    const [previewUrl, setPreviewUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        const contentState = editorState.getCurrentContent();
        const plainText = contentState.getPlainText();
        const wordCount = plainText.trim().split(/\s+/).length; // Counts the words
        const readingTime = calculateReadingTime(wordCount);
        setReadingTime(readingTime);
        const content = draftToHtml(convertToRaw(contentState));
        setContentLength(content.length);
        setData((data) => ({ ...data, content, reading_time: readingTime }));
    };
    const calculateReadingTime = (wordCount) => {
        const wordsPerMinute = 250; // Average reading speed of an adult (roughly 250 wpm)
        return Math.ceil(wordCount / wordsPerMinute);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        post("/post", { preserveScroll: true, preserveState: true });
    };
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const isContentLarge = contentLength > 1000;
    const handleFormClick = (e) => {
        if (e.target.closest(".DraftEditor-root")) {
            e.stopPropagation();
        }
    };
    const handleChangeName = (e) => {
        const newTitle = e.target.value;
        const newSlug = slugify(newTitle, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        });
        setData((data) => ({ ...data, title: newTitle, slug: newSlug }));
    };
    const imgUrl = useRef("");
    const updateAvatar = (imgSrc) => {
        try {
            imgUrl.current = imgSrc;
            setPreviewUrl(imgSrc);
            setData((data) => ({ ...data, image: imgSrc }));
        } catch (error) {
            toast.error("hata");
        }
    };
    const closeModals = (e) => {
        setCloseModal(false);
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
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href={route("dashboard")}>Panel</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href={route("post.index")}> Postlar</Link>
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
                                Yeni Post Ekle - {data.title}
                            </motion.div>
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="py-12 flex flex-row max-lg:flex-col gap-10 justify-between">
                <div className="max-w-5xl mx-start sm:px-6 lg:px-8 bg-white shadow-sm  sm:rounded-lg">
                    <motion.div
                        className="bg-white"
                        initial={{ y: "100vw", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.75 }}
                    >
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={handleSubmitForm}
                                onClick={handleFormClick}
                                encType="multipart/form-data"
                            >
                                <div className="space-y-12">
                                    <div className="pb-12">
                                        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-8">
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-3 w-full max-lg:w-full">
                                                <div className="">
                                                    {previewUrl && (
                                                        <span className="text-gray-500">
                                                            <span className="font-bold">
                                                                {" "}
                                                                metin alt:{" "}
                                                            </span>
                                                            <input
                                                                type="text"
                                                                placeholder="eklemeyi unutma"
                                                                className="border-none placeholder:text-gray-400 focus:border-none focus:rind-0 ring-0 ring-white focus:ring-white p-0 my-2"
                                                                value={
                                                                    data.image_alt
                                                                }
                                                                onChange={(e) =>
                                                                    setData({
                                                                        ...data,
                                                                        image_alt:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    })
                                                                }
                                                            />
                                                        </span>
                                                    )}
                                                    {previewUrl ? (
                                                        previewUrl &&
                                                        !isLoading && (
                                                            <img
                                                                src={
                                                                    imgUrl.current
                                                                }
                                                                alt=""
                                                                className="max-w-xs shadow-md hover:shadow-xl"
                                                            />
                                                        )
                                                    ) : (
                                                        <ImageUp
                                                            className="mx-auto h-12 w-12 text-gray-300"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    {errors.image && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.image}
                                                        </p>
                                                    )}
                                                    <div className="mt-4 text-sm leading-6 text-gray-600 flex flex-col justify-center items-center mx-auto">
                                                        <Dialog>
                                                            <DialogTrigger
                                                                onClick={(e) =>
                                                                    setCloseModal(
                                                                        true,
                                                                    )
                                                                }
                                                            >
                                                                {previewUrl ? (
                                                                    <label
                                                                        htmlFor="file-upload"
                                                                        className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                    >
                                                                        <div className="">
                                                                            <span>
                                                                                Değiştir
                                                                            </span>
                                                                        </div>
                                                                    </label>
                                                                ) : (
                                                                    <label
                                                                        htmlFor="file-upload"
                                                                        className="relative cursor-pointer rounded-md font-semibold "
                                                                    >
                                                                        <div className="">
                                                                            Ön
                                                                            görünüş
                                                                            fotoğraf
                                                                            yükle
                                                                            <br />
                                                                            Sonra
                                                                            <span className=" text-indigo-600">
                                                                                {' '}WEBP    {' '}
                                                                            </span>
                                                                            formatına
                                                                            çeririlir
                                                                        </div>
                                                                    </label>
                                                                )}
                                                            </DialogTrigger>
                                                            {closeModal && (
                                                                <DialogContent className="max-w-screen-lg  overflow-scroll">
                                                                    <DialogHeader>
                                                                        <DialogDescription>
                                                                            <CropImage
                                                                                closeModals={
                                                                                    closeModals
                                                                                }
                                                                                updateAvatar={
                                                                                    updateAvatar
                                                                                }
                                                                            />
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                </DialogContent>
                                                            )}
                                                        </Dialog>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-full">
                                                <label
                                                    htmlFor="username"
                                                    className="block text-md font-bold leading-6 text-gray-900"
                                                >
                                                    Başlık Ekle
                                                </label>

                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            value={data.title}
                                                            autoComplete={"off"}
                                                            onChange={
                                                                handleChangeName
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
                                            <div className="sm:col-span-full flex flex-row gap-3 items-center border-b border-gray-900/10 pb-3">
                                                <span className="text-nowrap">
                                                    Slug (permalink):{" "}
                                                </span>
                                                <input
                                                    type="text"
                                                    value={data.slug}
                                                    onChange={(e) =>
                                                        setData(
                                                            "slug",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="block w-full border-0 bg-transparent py-1.5 pl-1 text-blue-500 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                                {errors.slug && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.slug}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="sm:col-span-full mt-10">
                                                <label className="block text-md font-bold leading-6 text-gray-900">
                                                    Meta Title
                                                </label>
                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <input
                                                            type="text"
                                                            value={
                                                                data.meta_title
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "meta_title",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    {errors.meta_title && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.meta_title}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="sm:col-span-full">
                                                <label className="block text-md font-bold leading-6 text-gray-900">
                                                    Meta Description
                                                </label>
                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <input
                                                            type="text"
                                                            value={
                                                                data.meta_description
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "meta_description",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    {errors.meta_description && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {
                                                                errors.meta_description
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="sm:col-span-full border-b border-gray-900/10 pb-5">
                                                <label className="block text-md font-bold leading-6 text-gray-900">
                                                    Kısa Açıklama (ön kısa yazı
                                                    ona tıklaması için)
                                                </label>
                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                        <textarea
                                                            rows={3}
                                                            value={
                                                                data.description
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "description",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    {errors.description && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="sm:col-span-full mt-10">
                                                <label className="block text-md font-bold leading-6 text-gray-900">
                                                    Kategori Seç
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        onChange={(e) =>
                                                            setData(
                                                                "category_id",
                                                                e.target.value,
                                                            )
                                                        }
                                                        value={data.category_id}
                                                    >
                                                        <option value="">
                                                            Select a Category
                                                        </option>
                                                        {categories.map(
                                                            (cat) => (
                                                                <option
                                                                    key={cat.id}
                                                                    value={
                                                                        cat.id
                                                                    }
                                                                >
                                                                    {cat.name}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                </div>
                                                {errors.category_id && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.category_id}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="sm:col-span-full relative">
                                                <label className="block text-md font-bold leading-6 text-gray-900">
                                                    Content Ekle
                                                </label>
                                                <div
                                                    className="mt-2 min-h-[300px] h-full shadow-[rgba(7,_65,_210,_0.1)_0px_0px_100px] p-5 editor"
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <div
                                                        className={` bottom-0 bg-white z-50 left-0 pt-1 pr-2 flex flex-row gap-4 rounded-lg ${isFocused ? "fixed" : "hidden"}`}
                                                    >
                                                        <span>
                                                            Sözcük sayısı:{" "}
                                                            {contentLength}
                                                        </span>
                                                        <span>
                                                            Okuma süresi:{" "}
                                                            {readingTime} dakika
                                                        </span>
                                                    </div>

                                                    <Editor
                                                        editorState={
                                                            editorState
                                                        }
                                                        wrapperClassName="demo-wrapper"
                                                        editorClassName="demo-editor"
                                                        toolbarClassName={`rdw-editor-toolbar !bg-blue-400 !border !sticky !top-0 z-10 !rounded-sm !border-blue-900 ${isFocused && isContentLarge ? "fixed-toolbar " : ""}`}
                                                        onEditorStateChange={
                                                            onEditorStateChange
                                                        }
                                                        toolbar={{
                                                            blockType: {
                                                                inDropdown: true,
                                                                options: [
                                                                    "Normal",
                                                                    "H1",
                                                                    "H2",
                                                                    "H3",
                                                                    "H4",
                                                                    "H5",
                                                                    "H6",
                                                                    "Blockquote",
                                                                    "Code",
                                                                ],
                                                                className:
                                                                    undefined,
                                                                component:
                                                                    undefined,
                                                                dropdownClassName:
                                                                    undefined,
                                                                styles: {
                                                                    H1: "editor-heading-h1",
                                                                    H2: "editor-heading-h2",
                                                                    H3: "editor-heading-h3",
                                                                    H4: "editor-heading-h4",
                                                                    H5: "editor-heading-h5",
                                                                    H6: "editor-heading-h6",
                                                                },
                                                            },
                                                            options: [
                                                                "inline",
                                                                "blockType",
                                                                "fontFamily",
                                                                "emoji",
                                                                "colorPicker",
                                                                "link",
                                                                "embedded",
                                                                "textAlign",
                                                                "list",
                                                                "remove",
                                                                "history",
                                                                "image",
                                                                "fontSize",
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
                                                                options: [
                                                                    "Quincy-Italic",
                                                                    "Quincy-Regular",
                                                                    "Inter-Regular",
                                                                ],
                                                                className:
                                                                    undefined,
                                                                component:
                                                                    undefined,
                                                                dropdownClassName:
                                                                    undefined,
                                                            },
                                                            textAlign: {
                                                                inDropdown: true,
                                                                className:
                                                                    "no-scroll",
                                                                component:
                                                                    undefined,
                                                                dropdownClassName:
                                                                    undefined,
                                                                options: [
                                                                    "center",
                                                                    "right",
                                                                    "justify",
                                                                ],
                                                            },

                                                            image: {
                                                                className:
                                                                    undefined,
                                                                component:
                                                                    undefined,
                                                                popupClassName:
                                                                    undefined,
                                                                urlEnabled: true,
                                                                uploadEnabled: true,
                                                                alignmentEnabled: true,
                                                                uploadCallback:
                                                                    undefined,
                                                                previewImage: true,
                                                                inputAccept:
                                                                    "image/gif,image/webp,image/jpeg,image/jpg,image/png,image/svg",
                                                                alt: {
                                                                    present: true,
                                                                    mandatory: true,
                                                                },
                                                                defaultSize: {
                                                                    height: "auto",
                                                                    width: "auto",
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </div>
                                                {errors.content && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.content}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="sm:col-span-4 hidden">
                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
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
                                    <NavLink href={route("post.index")}>
                                        Geri dön
                                    </NavLink>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Ekle
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
                <div className="ma-w-5xl mx-end px-6">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6"></div>
                </div>
            </div>
            <Toaster />
        </AuthenticatedLayout>
    );
}
