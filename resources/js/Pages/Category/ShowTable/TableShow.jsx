import React, { useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Textarea } from "@/Components/ui/textarea"

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
import { EllipsisVertical, Trash2, X } from "lucide-react";

import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import TextInput from "@/Components/TextInput.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import slugify from "slugify";

const TableShow = ({ categories, auth }) => {
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);

    const { data, setData,reset, post, errors } = useForm({
        name: "",
        slug: "",
        description: "",
    });

    const handleChangeName = (e) => {
        const name = e.target.value;
        const slug = slugify(name, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        });
        setData({
            name,
            slug,
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        post("/category/store",{
            onSuccess: () => {
                toast.success('Kategori Eklendi')
                closeModal()
            }
        });
    };
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        router.get(
            "category",
            { search: value },
            { preserveScroll: true, preserveState: true },
        );
    };
    const handleReset = () => {
        setSearch("");
        router.get(
            "category",
            { search: "" },
            { preserveScroll: true, preserveState: true },
        );
    };
    const handleDelete = (id) => {
        router.delete(`/category/${id}/delete`, {
            onSuccess: () => toast.success("Kategori başarıyla silindi."),
        });
    };

    const closeModal = () => {
        setOpenModal(false);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kategoriler
                </h2>
            }
        >
            <Head title="Kategoriler" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-row justify-between max-lg:flex-col gap-3 my-5">
                                <div className="flex flex-row justify-center max-lg:flex-col">
                                    <TextInput
                                        autoComplete="off"
                                        placeholder="Kategori ara"
                                        value={search}
                                        onChange={handleSearch}
                                    ></TextInput>
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
                                <PrimaryButton
                                    onClick={(e) => setOpenModal(true)}
                                >
                                    Yeni Kategori Ekle
                                </PrimaryButton>
                            </div>
                            <Modal show={openModal} onClose={closeModal}>
                                <form
                                    className="p-6"
                                    onSubmit={handleSubmitForm}
                                >
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Başlık Ekle
                                    </label>
                                    <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            value={data.name}
                                            className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={handleChangeName}
                                            required
                                        />
                                    </div>
                                    {errors.name && (
                                        <div className="text-red-500">
                                            {errors.name}
                                        </div>
                                    )}
                                    <label className="block text-sm mt-5 font-medium leading-6 text-gray-900">
                                        Slug Ekle
                                    </label>
                                    <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            value={data.slug}
                                            className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            onChange={(e) =>
                                                setData("slug", e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    {errors.slug && (
                                        <div className="text-red-500">
                                            {errors.slug}
                                        </div>
                                    )}
                                    <label className="block text-sm mt-5 font-medium leading-6 text-gray-900">
                                        Tanım Ekle (Isteğe bağlı)
                                    </label>
                                    <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <Textarea className="focus:border-none"
                                                  value={data.description}
                                                  onChange={(e) => setData('description', e.target.value)}
                                        />

                                    </div>
                                    {errors.description && (
                                        <div className="text-red-500">
                                            {errors.description}
                                        </div>
                                    )}
                                    <div className="mt-6 flex justify-end">
                                        <SecondaryButton onClick={closeModal}>
                                            Iptal
                                        </SecondaryButton>

                                        <PrimaryButton className="ml-2">Ekle</PrimaryButton>
                                    </div>
                                </form>
                            </Modal>
                            {categories.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Tanım</TableHead>
                                            <TableHead className="text-right">
                                                Etkileşimler
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {categories.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {item.name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.slug}
                                                </TableCell>
                                                <TableCell>
                                                    {item.description || (
                                                        <div className="text-gray-400">
                                                            yok
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <EllipsisVertical />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
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
                                                                        size={
                                                                            15
                                                                        }
                                                                        color="white"
                                                                    />
                                                                </span>
                                                                <span>Sil</span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
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
                                        Category bulunamadı {""}
                                        <Link
                                            href={route("category.create")}
                                            className="text-blue-500 underline font-bold"
                                        >
                                            Ekle
                                        </Link>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </AuthenticatedLayout>
    );
};
export default TableShow;
