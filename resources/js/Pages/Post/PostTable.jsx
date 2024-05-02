import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import slugify from "slugify";
import { Link } from "@inertiajs/react";

import {
    ArrowBigUpDash,
    CheckCheck,
    CircleHelp,
    Clock2,
    EllipsisVertical,
    GalleryVerticalEnd,
    Heading1,
    Heart,
    Link2,
    SendHorizontal,
    Timer,
    Eye,
    StickyNote,
    Trash2,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

import toast, { Toaster } from "react-hot-toast";

const PostTable = ({ posts, statuses, categories }) => {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const [isEditing, setIsEditing] = useState({});
    const [isHoveredText, setIsHoveredText] = useState(false);

    useEffect(() => {
        const initialEditState = posts.data.reduce((acc, post) => {
            acc[post.id] = {
                title: post.title,
                slug: post.slug,
                meta_title: post.meta_title || "",
                meta_description: post.meta_description || "",
                content: post.content,
                likes: post.likes,
                reading_time: post.reading_time,
                views: post.views,
                category: post.category.id,
            };
            return acc;
        }, {});
        setIsEditing(initialEditState);
    }, [posts.data]);

    const handleTitleChange = (id, newTitle) => {
        const newSlug = slugify(newTitle, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        });
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], title: newTitle, slug: newSlug },
        }));
    };
    const handleSaveTitle = (postId, title) => {
        if (title !== posts.data.find((post) => post.id === postId).title) {
            router.patch(`/posts/${postId}/update`, {
                title,
                slug: isEditing[postId].slug,
            });
        }
    };

    const handleChangeMetaT = (id, newMetaTitle) => {
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], meta_title: newMetaTitle },
        }));
    };
    const createSlug = (title) =>
        slugify(title, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        });
    const handleChangeMetaD = (id, metaD) => {
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], meta_description: metaD },
        }));
    };
    const handleSaveMetaT = (postId, metaTitle) => {
        if (
            metaTitle !==
            posts.data.find((post) => post.id === postId).meta_title
        ) {
            router.patch(`/posts/${postId}/update`, { meta_title: metaTitle });
        }
    };
    const handleSaveMetaD = (postId, metaD) => {
        if (
            metaD !==
            posts.data.find((post) => post.id === postId).meta_description
        ) {
            router.patch(`/posts/${postId}/update`, {
                meta_description: metaD,
            });
        }
    };

    const handleChangeContent = (id, content) => {
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], content: content },
        }));
    };
    const handleSaveContent = (postId, content) => {
        if (content !== posts.data.find((post) => post.id === postId).content) {
            router.patch(`/posts/${postId}/update`, { content: content });
        }
    };
    const handleChangeLikes = (id, likes) => {
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], likes: likes },
        }));
    };
    const handleSaveLikes = (postId, likes) => {
        if (likes !== posts.data.find((post) => post.id === postId).likes) {
            router.patch(`/posts/${postId}/update`, { likes: likes });
        }
    };
    const handleChangeRead = (id, reading_time) => {
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], reading_time: reading_time },
        }));
    };
    const handleSaveRead = (postId, reading_time) => {
        if (
            reading_time !==
            posts.data.find((post) => post.id === postId).reading_time
        ) {
            router.patch(`/posts/${postId}/update`, {
                reading_time: reading_time,
            });
        }
    };
    const handleChangeView = (id, views) => {
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], views: views },
        }));
    };
    const handleSaveView = (postId, views) => {
        if (views !== posts.data.find((post) => post.id === postId).views) {
            router.patch(`/posts/${postId}/update`, {
                views: views,
            });
        }
    };
    const handleTogglePublish = (postId, isPublished) => {
        router.patch(
            `/posts/${postId}/update`,
            { published: isPublished },
            {
                onSuccess: () => {
                    if (isPublished) {
                        toast.success("Yayında! 🎉"); // Message for when the post is published
                    } else {
                        toast.error("Yayından alındı!"); // Message for when the post is unpublished
                    }
                },
            },
        );
    };
    const handleDelete = (postId) => {
        router.delete(`/post/${postId}`, {
            onSuccess: () =>
                toast((t) => (
                    <div>
                        <button onClick={() => undoDelete(postId, t.id)}>
                            Geri Al 🔄
                        </button>
                    </div>
                )),
        });
    };

    const undoDelete = (postId) => {
        router.post(`/posts/${postId}/restore`);
    };

    function handleStatusChange(e, postId) {
        const newStatus = e.target.value;
        router.patch(
            `/posts/${postId}/update`,
            { status: newStatus },
            {
                onSuccess: () => toast.success("Güncellendi"),
                onError: () => "Hata oluştu.",
            },
        );
    }

    function handleCategoryChange(e, postId) {
        const newCategory = e.target.value;
        const categoryId = categories.find(
            (cat) => cat.name === newCategory,
        ).id;
        router.patch(
            `/posts/${postId}/update`,
            { category_id: categoryId },
            {
                onSuccess: () =>
                    toast.success("Kategori Değişti" + newCategory),
                onError: () => "Hata oluştu.",
            },
        );
    }

    return (
        <React.Fragment>
            <Tabs defaultValue="valid" className="w-full">
                <TabsList>
                    <TabsTrigger value="valid">
                        Hepsi Postlar({posts.data.length})
                    </TabsTrigger>
                    <TabsTrigger value="trashed">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="valid">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Başlık</TableHead>
                                <TableHead>Categori</TableHead>
                                <TableHead>Tarih</TableHead>
                                <TableHead>Durum</TableHead>
                                <TableHead className="text-right">
                                    Etki
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {posts.data.length > 0 ? (
                            <TableBody>
                                {posts.status}
                                {posts.data.map((item, id) => (
                                    <TableRow key={id}>
                                        <TableCell className="font-bold">
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            <a
                                                href=""
                                                className="lg:border transition-custom hover:bg-gray-200/40 hover:border-gray-100 py-0.5 px-2.5 rounded-md text-xs lg:border-gray-300 font-semibold lg:bg-gray-100/70"
                                            >
                                                {item.category.name}
                                            </a>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {item.update_status}
                                        </TableCell>
                                        <TableCell className="flex flex-row gap-1">
                                            <span>
                                                {item.status === "pending" ? (
                                                    <CircleHelp className="w-5 h-5 text-gray-500" />
                                                ) : item.status ===
                                                  "in_progress" ? (
                                                    <Timer className="w-5 h-5 text-gray-500" />
                                                ) : item.status ===
                                                  "completed" ? (
                                                    <CheckCheck className="w-5 h-5 text-gray-500" />
                                                ) : (
                                                    "Durum yok"
                                                )}
                                            </span>
                                            <span>{t(item.status)}</span>
                                        </TableCell>
                                        <TableHead className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <EllipsisVertical />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <Sheet>
                                                        <SheetTrigger className="px-2 items-center flex gap-2 py-1.5 text-sm my-1 hover:bg-gray-100 rounded-md w-full">
                                                            <span>
                                                                {" "}
                                                                <Eye
                                                                    size={15}
                                                                    color="gray"
                                                                />
                                                            </span>
                                                            <span>Göt At</span>
                                                        </SheetTrigger>
                                                        <SheetContent className="sm:max-w-full w-[80%] overflow-scroll">
                                                            <SheetHeader>
                                                                <SheetTitle className="bg-gray-100 p-6 rounded-md">
                                                                    <div className="flex flex-row justify-between max-lg:flex-col max-lg:gap-5">
                                                                        <div className="flex flex-row gap-3">
                                                                            <div className="flex flex-col">
                                                                                <h4 className=" text-gray-500">
                                                                                    {
                                                                                        user.name
                                                                                    }
                                                                                </h4>
                                                                                <div className="font-medium text-sm text-gray-400">
                                                                                    {
                                                                                        user.email
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <select
                                                                                className="mr-10 border-none rounded-md shadow-lg focus:ring-0 focus:border-transparent"
                                                                                onChange={(
                                                                                    e,
                                                                                ) =>
                                                                                    handleStatusChange(
                                                                                        e,
                                                                                        item.id,
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    item.status
                                                                                }
                                                                            >
                                                                                {statuses.map(
                                                                                    (
                                                                                        statusChange,
                                                                                    ) => (
                                                                                        <option
                                                                                            key={
                                                                                                statusChange
                                                                                            }
                                                                                            value={
                                                                                                statusChange
                                                                                            }
                                                                                        >
                                                                                            {t(
                                                                                                statusChange,
                                                                                            )}
                                                                                        </option>
                                                                                    ),
                                                                                )}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </SheetTitle>
                                                                <SheetDescription>
                                                                    <Tabs
                                                                        defaultValue="post"
                                                                        className="mt-4"
                                                                    >
                                                                        <TabsList>
                                                                            <TabsTrigger value="post">
                                                                                Account
                                                                            </TabsTrigger>
                                                                            <TabsTrigger value="comments">
                                                                                Comments
                                                                            </TabsTrigger>
                                                                        </TabsList>
                                                                        <TabsContent value="post">
                                                                            <div className="font-bold my-10 text-center">
                                                                                Genel
                                                                                Bakış:
                                                                            </div>
                                                                            <Popover>
                                                                                <div className="flex flex-row justify-start items-start my-5 gap-5 max-lg:flex-col">
                                                                                    <PopoverTrigger>
                                                                                        <div
                                                                                            className="relative"
                                                                                            onMouseEnter={() =>
                                                                                                setIsHoveredText(
                                                                                                    true,
                                                                                                )
                                                                                            }
                                                                                            onMouseLeave={() =>
                                                                                                setIsHoveredText(
                                                                                                    false,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <div className="bg-gradient-to-b from-black/40 to-black/10 text-white/50 py-2 absolute top-0 w-full">
                                                                                                {isHoveredText
                                                                                                    ? "Tıkla 👆"
                                                                                                    : item.image_alt}
                                                                                            </div>
                                                                                            <img
                                                                                                src={
                                                                                                    item.image
                                                                                                }
                                                                                                className="w-72 h-40 object-cover rounded-md shadow-md"
                                                                                                alt=""
                                                                                            />
                                                                                        </div>
                                                                                    </PopoverTrigger>
                                                                                    <div className="flex flex-col gap-2 justify-center items-center">
                                                                                        {item.likes ===
                                                                                        0 ? (
                                                                                            <div className="text-[30px]">
                                                                                                😐
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="text-[30px]">
                                                                                                😎
                                                                                            </div>
                                                                                        )}
                                                                                        <div className="flex flex-row gap-2 bg-white shadow-md py-1 rounded-full px-2 items-center">
                                                                                            <Heart
                                                                                                size={
                                                                                                    30
                                                                                                }
                                                                                                color="red"
                                                                                            />
                                                                                            <input
                                                                                                value={
                                                                                                    isEditing[
                                                                                                        item
                                                                                                            .id
                                                                                                    ]
                                                                                                        ? isEditing[
                                                                                                              item
                                                                                                                  .id
                                                                                                          ]
                                                                                                              .likes
                                                                                                        : ""
                                                                                                }
                                                                                                onChange={(
                                                                                                    e,
                                                                                                ) =>
                                                                                                    handleChangeLikes(
                                                                                                        item.id,
                                                                                                        e
                                                                                                            .target
                                                                                                            .value,
                                                                                                    )
                                                                                                }
                                                                                                onBlur={() =>
                                                                                                    handleSaveLikes(
                                                                                                        item.id,
                                                                                                        isEditing[
                                                                                                            item
                                                                                                                .id
                                                                                                        ]
                                                                                                            .likes,
                                                                                                    )
                                                                                                }
                                                                                                type="number"
                                                                                                className="p-0 border-none focus:outline-none focus:ring-0 focus:border-transparent w-[40px] text-red-500"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-2 justify-center items-center">
                                                                                        {item.reading_time ===
                                                                                        0 ? (
                                                                                            <div className="text-[30px]">
                                                                                                😐
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="text-[30px]">
                                                                                                🤓
                                                                                            </div>
                                                                                        )}
                                                                                        <div className="flex flex-row gap-2 bg-white shadow-md py-1 rounded-full px-2 items-center">
                                                                                            <Clock2
                                                                                                size={
                                                                                                    30
                                                                                                }
                                                                                                color="blue"
                                                                                            />
                                                                                            <input
                                                                                                value={
                                                                                                    isEditing[
                                                                                                        item
                                                                                                            .id
                                                                                                    ]
                                                                                                        ? isEditing[
                                                                                                              item
                                                                                                                  .id
                                                                                                          ]
                                                                                                              .reading_time
                                                                                                        : ""
                                                                                                }
                                                                                                onChange={(
                                                                                                    e,
                                                                                                ) =>
                                                                                                    handleChangeRead(
                                                                                                        item.id,
                                                                                                        e
                                                                                                            .target
                                                                                                            .value,
                                                                                                    )
                                                                                                }
                                                                                                onBlur={() =>
                                                                                                    handleSaveRead(
                                                                                                        item.id,
                                                                                                        isEditing[
                                                                                                            item
                                                                                                                .id
                                                                                                        ]
                                                                                                            .reading_time,
                                                                                                    )
                                                                                                }
                                                                                                type="number"
                                                                                                className="p-0 border-none focus:outline-none focus:ring-0 focus:border-transparent w-[40px] text-blue-500"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-2 justify-center items-center">
                                                                                        {item.reading_time ===
                                                                                        0 ? (
                                                                                            <div className="text-[30px]">
                                                                                                😐
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="text-[30px]">
                                                                                                👀
                                                                                            </div>
                                                                                        )}
                                                                                        <div className="flex flex-row gap-2 bg-white shadow-md py-1 rounded-full px-2 items-center">
                                                                                            <Eye
                                                                                                size={
                                                                                                    30
                                                                                                }
                                                                                                color="black"
                                                                                            />
                                                                                            <input
                                                                                                value={
                                                                                                    isEditing[
                                                                                                        item
                                                                                                            .id
                                                                                                    ]
                                                                                                        ? isEditing[
                                                                                                              item
                                                                                                                  .id
                                                                                                          ]
                                                                                                              .views
                                                                                                        : ""
                                                                                                }
                                                                                                onChange={(
                                                                                                    e,
                                                                                                ) =>
                                                                                                    handleChangeView(
                                                                                                        item.id,
                                                                                                        e
                                                                                                            .target
                                                                                                            .value,
                                                                                                    )
                                                                                                }
                                                                                                onBlur={() =>
                                                                                                    handleSaveView(
                                                                                                        item.id,
                                                                                                        isEditing[
                                                                                                            item
                                                                                                                .id
                                                                                                        ]
                                                                                                            .views,
                                                                                                    )
                                                                                                }
                                                                                                type="number"
                                                                                                className="p-0 border-none focus:outline-none focus:ring-0 focus:border-transparent w-[40px] text-black"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-2 justify-start items-start">
                                                                                        <div className="flex flex-row max-lg:flex-col gap-2 justify-center items-center">
                                                                                            <div className="text-[30px]">
                                                                                                <StickyNote />
                                                                                            </div>
                                                                                            <div className="flex flex-row gap-2 bg-white shadow-md py-1 rounded-full px-2 items-center">
                                                                                                {
                                                                                                    item.created_at_for_humans
                                                                                                }{" "}
                                                                                                kurdunuz
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="flex flex-row max-lg:flex-col gap-2 justify-center items-center">
                                                                                            <div className="text-[30px]">
                                                                                                <StickyNote />
                                                                                            </div>
                                                                                            <div className="flex flex-row gap-2 bg-white shadow-md py-1 rounded-full px-2 items-center">
                                                                                                {
                                                                                                    item.update_status
                                                                                                }{" "}
                                                                                                güncelediniz
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <PopoverContent>
                                                                                    <img
                                                                                        src={
                                                                                            item.image
                                                                                        }
                                                                                        alt=""
                                                                                    />
                                                                                    <div className="text-center font-medium text-lg mt-2 text-gray-500">
                                                                                        {
                                                                                            item.image_alt
                                                                                        }
                                                                                    </div>
                                                                                </PopoverContent>
                                                                            </Popover>
                                                                            <label>
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={
                                                                                        item.published
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) =>
                                                                                        handleTogglePublish(
                                                                                            item.id,
                                                                                            e
                                                                                                .target
                                                                                                .checked,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </label>
                                                                            <div className="flex flex-row items-center justify-start my-3 shadow-sm">
                                                                                <div className="flex flex-row gap-1 items-center border py-3 px-4 text-start rounded-s-lg">
                                                                                    <span>
                                                                                        <Heading1
                                                                                            size={
                                                                                                17
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                    <div className="text-md font-medium">
                                                                                        Başlık
                                                                                    </div>
                                                                                </div>
                                                                                <div className="border py-2 px-4 text-start rounded-e-lg  w-full">
                                                                                    <input
                                                                                        className="p-0 border-none focus:outline-none focus:ring-0 focus:border-transparent w-full text-lg"
                                                                                        type="text"
                                                                                        value={
                                                                                            isEditing[
                                                                                                item
                                                                                                    .id
                                                                                            ]
                                                                                                ? isEditing[
                                                                                                      item
                                                                                                          .id
                                                                                                  ]
                                                                                                      .title
                                                                                                : ""
                                                                                        }
                                                                                        onChange={(
                                                                                            e,
                                                                                        ) =>
                                                                                            handleTitleChange(
                                                                                                item.id,
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                            )
                                                                                        }
                                                                                        onBlur={() =>
                                                                                            handleSaveTitle(
                                                                                                item.id,
                                                                                                isEditing[
                                                                                                    item
                                                                                                        .id
                                                                                                ]
                                                                                                    .title,
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-row items-center justify-start my-3 shadow-sm">
                                                                                <div className="flex flex-row gap-1 items-center border py-3 px-4 text-start rounded-s-lg">
                                                                                    <span>
                                                                                        <Link
                                                                                            size={
                                                                                                17
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                    <div className="text-md font-medium">
                                                                                        URL
                                                                                    </div>
                                                                                </div>
                                                                                <div className="border py-2 px-4 text-start rounded-e-lg  w-full text-lg">
                                                                                    {isEditing[
                                                                                        item
                                                                                            .id
                                                                                    ]
                                                                                        ? isEditing[
                                                                                              item
                                                                                                  .id
                                                                                          ]
                                                                                              .slug
                                                                                        : ""}
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-row items-center justify-start my-3 shadow-sm">
                                                                                <div className="flex flex-row gap-1 items-center border py-3 px-4 text-start rounded-s-lg">
                                                                                    <span>
                                                                                        <Link2
                                                                                            size={
                                                                                                17
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                    <div className="text-md font-medium w-20">
                                                                                        Meta
                                                                                        Başlık
                                                                                    </div>
                                                                                </div>
                                                                                <div className="border py-2 px-4 text-start rounded-e-lg  w-full">
                                                                                    <input
                                                                                        className="p-0 border-none focus:outline-none focus:ring-0 focus:border-transparent w-full text-lg"
                                                                                        type="text"
                                                                                        value={
                                                                                            isEditing[
                                                                                                item
                                                                                                    .id
                                                                                            ]
                                                                                                ? isEditing[
                                                                                                      item
                                                                                                          .id
                                                                                                  ]
                                                                                                      .meta_title
                                                                                                : ""
                                                                                        }
                                                                                        onChange={(
                                                                                            e,
                                                                                        ) =>
                                                                                            handleChangeMetaT(
                                                                                                item.id,
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                            )
                                                                                        }
                                                                                        onBlur={() =>
                                                                                            handleSaveMetaT(
                                                                                                item.id,
                                                                                                isEditing[
                                                                                                    item
                                                                                                        .id
                                                                                                ]
                                                                                                    .meta_title,
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-row items-center justify-start my-3 shadow-sm">
                                                                                <div className="flex flex-row gap-1 items-center border py-3 px-4 text-start rounded-s-lg">
                                                                                    <span>
                                                                                        <ArrowBigUpDash
                                                                                            size={
                                                                                                17
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                    <div className="text-md font-medium w-24">
                                                                                        Meta
                                                                                        Açıklama
                                                                                    </div>
                                                                                </div>
                                                                                <div className="border py-2 px-4 text-start rounded-e-lg  w-full">
                                                                                    <input
                                                                                        className="p-0 border-none focus:outline-none focus:ring-0 focus:border-transparent w-full text-lg"
                                                                                        type="text"
                                                                                        value={
                                                                                            isEditing[
                                                                                                item
                                                                                                    .id
                                                                                            ]
                                                                                                ? isEditing[
                                                                                                      item
                                                                                                          .id
                                                                                                  ]
                                                                                                      .meta_description
                                                                                                : ""
                                                                                        }
                                                                                        onChange={(
                                                                                            e,
                                                                                        ) =>
                                                                                            handleChangeMetaD(
                                                                                                item.id,
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                            )
                                                                                        }
                                                                                        onBlur={() =>
                                                                                            handleSaveMetaD(
                                                                                                item.id,
                                                                                                isEditing[
                                                                                                    item
                                                                                                        .id
                                                                                                ]
                                                                                                    .meta_description,
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-row items-center justify-start my-3 shadow-sm">
                                                                                <div className="flex flex-row gap-1 items-center border py-3 px-4 text-start rounded-s-lg">
                                                                                    <span>
                                                                                        <GalleryVerticalEnd
                                                                                            size={
                                                                                                17
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                    <div className="text-md font-medium w-24">
                                                                                        Kısa
                                                                                        Açıklama
                                                                                    </div>
                                                                                </div>
                                                                                <div className="border py-2 px-4 text-start rounded-e-lg  w-full">
                                                                                    <input
                                                                                        className="p-0 border-none focus:outline-none focus:ring-0 focus:border-transparent w-full text-lg"
                                                                                        type="text"
                                                                                        value={
                                                                                            isEditing[
                                                                                                item
                                                                                                    .id
                                                                                            ]
                                                                                                ? isEditing[
                                                                                                      item
                                                                                                          .id
                                                                                                  ]
                                                                                                      .content
                                                                                                : ""
                                                                                        }
                                                                                        onChange={(
                                                                                            e,
                                                                                        ) =>
                                                                                            handleChangeContent(
                                                                                                item.id,
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                            )
                                                                                        }
                                                                                        onBlur={() =>
                                                                                            handleSaveContent(
                                                                                                item.id,
                                                                                                isEditing[
                                                                                                    item
                                                                                                        .id
                                                                                                ]
                                                                                                    .content,
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-row items-center justify-start my-3 shadow-sm">
                                                                                <div className="flex flex-row gap-1 items-center border py-3 px-4 text-start rounded-s-lg">
                                                                                    <span>
                                                                                        <SendHorizontal
                                                                                            size={
                                                                                                17
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                    <div className="text-md font-medium w-24">
                                                                                        Kategori
                                                                                    </div>
                                                                                </div>
                                                                                <div className="border py-2 px-4 text-start rounded-e-lg  w-full">
                                                                                    <select
                                                                                        className="border-none rounded-md  focus:ring-0 focus:border-transparent shadow-none py-0.5"
                                                                                        onChange={(
                                                                                            e,
                                                                                        ) =>
                                                                                            handleCategoryChange(
                                                                                                e,
                                                                                                item.id,
                                                                                            )
                                                                                        }
                                                                                        value={
                                                                                            item
                                                                                                .category
                                                                                                .name
                                                                                        }
                                                                                    >
                                                                                        {categories.map(
                                                                                            (
                                                                                                cat,
                                                                                            ) => (
                                                                                                <option
                                                                                                    key={
                                                                                                        cat.id
                                                                                                    }
                                                                                                    value={
                                                                                                        cat.name
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        cat.name
                                                                                                    }
                                                                                                </option>
                                                                                            ),
                                                                                        )}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </TabsContent>
                                                                        <TabsContent value="comments">
                                                                            Comments
                                                                        </TabsContent>
                                                                    </Tabs>
                                                                </SheetDescription>
                                                            </SheetHeader>
                                                        </SheetContent>
                                                    </Sheet>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id,
                                                            )
                                                        }
                                                        className="cursor-pointer flex text-white flex-row gap-2 my-1 items-center bg-red-500 hover:!bg-red-400 hover:!text-white"
                                                    >
                                                        <span>
                                                            {" "}
                                                            <Trash2
                                                                size={15}
                                                                color="white"
                                                            />
                                                        </span>
                                                        <span>Sil</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableHead>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : (
                            <div className="flex justify-center gap-7 mx-auto items-center flex-col py-10">
                                <span className="!text-[50px] animate-spin">❓</span>
                                <span className="text-52">Post Yazılmadı Hemen Bir Tane <Link href="" className="text-blue-500 underline font-bold">Yaz</Link> </span>
                            </div>
                        )}
                    </Table>
                </TabsContent>
                <TabsContent value="trashed">
                    Change your password here.
                </TabsContent>
            </Tabs>
            <Toaster />
        </React.Fragment>
    );
};
export default PostTable;
