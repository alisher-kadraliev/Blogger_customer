import React from "react";
import {Link, router, usePage} from "@inertiajs/react";
import { useTranslation } from "react-i18next";

import { CheckCheck, CircleHelp, EllipsisVertical, Timer } from "lucide-react";

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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import toast, {Toaster} from "react-hot-toast";

const PostTable = ({ posts, statuses }) => {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;

    function handleStatusChange(e, postId) {
        const newStatus = e.target.value;
        router.patch(`/posts/${postId}/update-status`, {
            status: newStatus,
        });
        toast.success("Güncellendi");
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
                                            <SheetContent className="sm:max-w-full w-[80%]">
                                                <SheetHeader>
                                                    <SheetTitle className="bg-gray-50 p-6 rounded-md">
                                                        <div className="flex flex-row justify-between">
                                                            <div className="flex flex-row gap-3">
                                                                <div className="flex flex-col">
                                                                    <h4>
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </h4>
                                                                    <div className="font-medium text-sm text-gray-600">
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <select
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
                                                                    <option value=""></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </SheetTitle>
                                                    <SheetDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete your
                                                        account and remove your
                                                        data from our servers.
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
