import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import slugify from "slugify";

import {
    ArrowBigUpDash,
    CheckCheck,
    CircleHelp,
    Clock2,
    EllipsisVertical,
    Eye,
    GalleryVerticalEnd,
    Heading1,
    Heart,
    Link2,
    SendHorizontal,
    StickyNote,
    Timer,
    Trash2,
    X,
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
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { Popover } from "@/Components/ui/popover";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

import toast from "react-hot-toast";
import TrashedPosts from "@/Pages/Post/TrashedPosts/TrashedPosts.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

const PostTable = ({
    posts,
    statuses,
    categories,
    trashedPosts,
    totalPost,
}) => {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const [isEditing, setIsEditing] = useState({});
    const [isHoveredText, setIsHoveredText] = useState(false);
    const [search, setSearch] = useState("");
    const [imagePreview,setImagePreview] = useState({})
    const [isEditingImage,setIsEditingImage] = useState({})
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        router.get(
            "post",
            { search: value },
            { preserveScroll: true, preserveState: true },
        );
    };

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
                image_alt: post.image_alt,
                image: post.image,
                description: post.description,
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
    const handleChangeAlt = (id, imageAlt) => {
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], image_alt: imageAlt },
        }));
    };
    const handleSaveAlt = (postId, imageAlt) => {
        if (
            imageAlt !== posts.data.find((post) => post.id === postId).image_alt
        ) {
            router.patch(`/posts/${postId}/update`, { image_alt: imageAlt });
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
    const handleChangeDesc = (id, content) => {
        setIsEditing((prev) => ({
            ...prev,
            [id]: { ...prev[id], description: content },
        }));
    };
    const handleSaveDesc = (postId, content) => {
        if (
            content !==
            posts.data.find((post) => post.id === postId).description
        ) {
            router.patch(`/posts/${postId}/update`, { description: content });
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
                            Çöpe gitti ya da{" "}
                            <span className="text-blue-600 underline">
                                Geri Al 🔄
                            </span>
                        </button>
                    </div>
                )),
        });
    };

    const undoDelete = (postId) => {
        router.post(`/posts/${postId}/restore`);
    };
    const handleReset = () => {
        setSearch("");
        router.get(
            "post",
            { search: "" },
            { preserveScroll: true, preserveState: true },
        );
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
                    toast.success("Kategori Değişti " + newCategory),
                onError: () => "Hata oluştu.",
            },
        );
    }

    const handleChangeImage = (id,e) => {
        const file = e.target.files[0]
        if(file){
            const reader = new FileReader()
            reader.onload = () => {
                setImagePreview((prev) => ({
                    ...prev,
                    [id]:reader.result,
                }))
                setIsEditingImage((prev) => ({
                    ...prev,
                    [id]: {...prev[id],image:file}
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveImage = (postId) => {
        const formData = new FormData()
        formData.append('image',isEditingImage[postId].image)
        router.patch(`/posts/${postId}/update`,formData ,{
            headers:{
                'Content-Type':'multipart/form-data',
            }
        })
    }
    return (
        <React.Fragment>
            <Tabs defaultValue="valid" className="w-full">
                <TabsList>
                    <TabsTrigger value="valid">
                        Hepsi Postlar({totalPost})
                    </TabsTrigger>
                    <TabsTrigger value="trashed">
                        Çop ({trashedPosts.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="valid">
                    <div className="flex flex-row justify-between items-center max-lg:flex-col gap-3">
                        <div className="flex flex-row gap-2 max-lg:flex-col justify-center my-5">
                            <TextInput
                                autoComplete="off"
                                placeholder="Post ismine göre ara"
                                value={search}
                                onChange={handleSearch}
                            />
                            {search && (
                                <SecondaryButton
                                    className="mx-2"
                                    onClick={handleReset}
                                >
                                    <X size={19} className="mr-2" />{" "}
                                    <span>sıfırla</span>
                                </SecondaryButton>
                            )}
                        </div>
                        <Link
                            href={route("post.create")}
                            className="btn bg-primary text-white p-2 rounded-lg font-medium text-sm hover:scale-95 transition-all duration-300 ease-in-out"
                        >
                            Yeni Post Ekle
                        </Link>
                    </div>
                    {posts.data.length > 0 ? (
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

                            <TableBody>
                                {posts.status}
                                {posts.data.map((item, id) => (
                                    <TableRow key={id}>
                                        <TableCell className="font-bold">
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            <div className="bg-gray-100 text-gray-600 rounded-md px-2 py-1 text-sm w-fit">
                                                {item.category.name}
                                            </div>
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
                                                                                    <Dialog>
                                                                                        <DialogTrigger>
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
                                                                                                        item.image_url ||
                                                                                                        "/404/404.png"
                                                                                                    }
                                                                                                    className="w-72 h-40 object-cover rounded-md shadow-md"
                                                                                                    alt={
                                                                                                        item.image_alt
                                                                                                    }
                                                                                                />
                                                                                            </div>
                                                                                        </DialogTrigger>
                                                                                        <DialogContent className="max-w-">
                                                                                            <DialogTitle>
                                                                                                <div className="flex flex-row items-center gap-3">
                                                                                                    <div className="w-1/4">
                                                                                                        Metin
                                                                                                        alt:
                                                                                                    </div>
                                                                                                    <input
                                                                                                        className="border-none text-gray-500 focus:border-none border-white focus:outline-none focus:ring-0 focus:border-transparent w-full text-lg"
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
                                                                                                                      .image_alt
                                                                                                                : ""
                                                                                                        }
                                                                                                        onChange={(
                                                                                                            e,
                                                                                                        ) =>
                                                                                                            handleChangeAlt(
                                                                                                                item.id,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value,
                                                                                                            )
                                                                                                        }
                                                                                                        onBlur={() =>
                                                                                                            handleSaveAlt(
                                                                                                                item.id,
                                                                                                                isEditing[
                                                                                                                    item
                                                                                                                        .id
                                                                                                                ]
                                                                                                                    .image_alt,
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                            </DialogTitle>
                                                                                            <img
                                                                                                src={
                                                                                                    item.image_url ||
                                                                                                    "/404/404.png"
                                                                                                }
                                                                                                alt={
                                                                                                    item.image_alt
                                                                                                }
                                                                                            />
                                                                                            <hr className="mt-5"/>
                                                                                            <div className="mt-2">
                                                                                                <p>Değiştirmek için alta tıkla 👇</p>
                                                                                                <input
                                                                                                    onChange={e => handleChangeImage(item.id,e)}
                                                                                                    type="file"
                                                                                                    className="block cursor-pointer
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 border-white focus:outline-none file:text-sm file:font-semibold
        file:bg-gray-900 file:text-white
        hover:file:bg-gray-800 mt-4"
                                                                                                    accept="image/*"
                                                                                                />
                                                                                                {imagePreview[item.id] && (
                                                                                                    <img src={imagePreview[item.id]}
                                                                                                         alt="" />
                                                                                                    )}
                                                                                                <button onClick={() => handleSaveImage(item.id)}>save</button>
                                                                                            </div>
                                                                                        </DialogContent>
                                                                                    </Dialog>

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
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="flex flex-row max-lg:flex-col gap-2 justify-center items-center">
                                                                                            <div className="text-[30px]">
                                                                                                <StickyNote />
                                                                                            </div>
                                                                                            <div className="flex flex-row gap-2 bg-white shadow-md py-1 rounded-full px-2 items-center">
                                                                                                Content
                                                                                                Sözcük
                                                                                                Sayısı:{" "}
                                                                                                {
                                                                                                    item
                                                                                                        .content
                                                                                                        .length
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
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
                                                                                Yayına
                                                                                al
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
                                                                                    <div className="text-md font-medium w-28">
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
                                                                                                      .description
                                                                                                : ""
                                                                                        }
                                                                                        onChange={(
                                                                                            e,
                                                                                        ) =>
                                                                                            handleChangeDesc(
                                                                                                item.id,
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                            )
                                                                                        }
                                                                                        onBlur={() =>
                                                                                            handleSaveDesc(
                                                                                                item.id,
                                                                                                isEditing[
                                                                                                    item
                                                                                                        .id
                                                                                                ]
                                                                                                    .description,
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
                                                                                            item.category
                                                                                                ? item
                                                                                                      .category
                                                                                                      .name
                                                                                                : ""
                                                                                        }
                                                                                    >
                                                                                        {item.category ? (
                                                                                            categories.map(
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
                                                                                            )
                                                                                        ) : (
                                                                                            <option value="">
                                                                                                Kategori
                                                                                                seçilmedi
                                                                                            </option>
                                                                                        )}
                                                                                    </select>
                                                                                </div>
                                                                            </div>

                                                                            <div
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: item.content,
                                                                                }}
                                                                            ></div>
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
                        </Table>
                    ) : (
                        <div className="flex justify-center gap-7 mx-auto items-center flex-col py-10">
                            <span className="!text-[50px] animate-spin">
                                ❓
                            </span>
                            <span className="text-52">
                                Post Yazılmadı Hemen Bir Tane{" "}
                                <Link
                                    href={route("post.create")}
                                    className="text-blue-500 underline font-bold"
                                >
                                    Yaz
                                </Link>
                            </span>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="trashed">
                    <TrashedPosts trashedPosts={trashedPosts} />
                </TabsContent>
            </Tabs>
        </React.Fragment>
    );
};
export default PostTable;
