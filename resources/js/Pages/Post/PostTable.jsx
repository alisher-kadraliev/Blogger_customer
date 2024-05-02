import React, { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import slugify from "slugify";

import {
    CheckCheck,
    CircleHelp,
    EllipsisVertical,
    Timer,
    Heading1,
    Link,
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

const PostTable = ({ posts, statuses }) => {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const [isEditing, setIsEditing] = useState({});
    const [isHoveredText, setIsHoveredText] = useState(false);

    useEffect(() => {
        const initialEditState  = posts.data.reduce((acc, post) => {
            acc[post.id] = {title:post.title,slug:post.slug};
            return acc;
        }, {});
        setIsEditing(initialEditState);
    }, [posts.data]);

    const handleTitleChange = (id, newTitle) => {
        const newSlug = slugify(newTitle,{lower:true,strict:true,remove:/[*+~.()'"!:@]/g});
        setIsEditing((prev) => ({ ...prev, [id]: {...prev[id],title:newTitle,slug:newSlug} }));
    };
    const handleSaveTitle = (postId, title) => {
        if (title !== posts.data.find((post) => post.id === postId).title) {
            router.patch(`/posts/${postId}/update`, {
                title,
                slug: isEditing[postId].slug,
            });
        }
    };
    const createSlug = (title) =>
        slugify(title, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        });

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

    return (
        <React.Fragment>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Categori</TableHead>
                        <TableHead>Tarih</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead className="text-right">Etki</TableHead>
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
                                    ) : item.status === "in_progress" ? (
                                        <Timer className="w-5 h-5 text-gray-500" />
                                    ) : item.status === "completed" ? (
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
                                            <SheetTrigger className="px-2 items-center flex py-1.5 text-sm hover:bg-gray-100 rounded-md w-full">
                                                Göz At
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
                                                                <div className="font-bold my-5 text-center">
                                                                    Genel Bakış:
                                                                </div>
                                                                <Popover>
                                                                    <PopoverTrigger className="mx-auto flex my-5">
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
                                                                                className="w-72 h-20 object-cover rounded-md shadow-md"
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </PopoverTrigger>
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

                                                                <div className="flex flex-row items-center justify-start my-2 shadow-sm">
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
                                                                            value={isEditing[item.id] ? isEditing[item.id].title : ""
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
                                                                                    ].title,
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-row items-center justify-start my-2 shadow-sm">
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
                                                                        {isEditing[item.id] ? isEditing[item.id].slug : ""}
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
                                        <DropdownMenuItem className="cursor-pointer">
                                            Değiştir
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">
                                            Sil
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableHead>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Toaster />
        </React.Fragment>
    );
};
export default PostTable;
