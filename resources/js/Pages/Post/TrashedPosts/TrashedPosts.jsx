import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {EllipsisVertical, Trash2} from "lucide-react";
import React from "react";
import {router} from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

export default function TrashedPosts({ trashedPosts }) {

    const undoDelete = (postId) => {
        router.post(`posts/${postId}/restore`,{},{
            onSuccess: () => toast.success('Post geri alındı'),
        })
    }

    const handleDeletePermanently = (postId) => {
        router.delete(`/posts/${postId}/delete-permanently`,{
            onSuccess: () => toast.error('Post kalıcı olarak silindi'),
        })
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Başlık</TableHead>
                        <TableHead>Etki</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trashedPosts.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleDeletePermanently(item.id)} className="cursor-pointer flex text-white flex-row gap-2 my-1 items-center bg-red-500 hover:!bg-red-400 hover:!text-white">
                                               <span>
                                                            <Trash2
                                                                size={15}
                                                                color="white"
                                                            />
                                                        </span>
                                            <span>Her zamana sil</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer" onClick={() => undoDelete(item.id)}>
                                            Geri Al
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Toaster />
        </div>
    );
}
