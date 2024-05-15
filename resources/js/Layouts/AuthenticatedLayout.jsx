import {
    Home,
    Layers3,
    LibraryBig,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    ShoppingCart,
    Triangle,
    Users2,
} from "lucide-react";

import Dropdown from "@/Components/Dropdown";
import {Link, router} from "@inertiajs/react";

import { Button } from "@/Components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import {Toaster} from "react-hot-toast";
import React from "react";


export default function Authenticated({ user, children }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/80">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <div className="pt-4 flex flex-col justify-center items-center">
                    <Link
                        href={route("dashboard")}
                        className="flex h-9 w-9 items-center border justify-center text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                        <Triangle className="size-5 fill-foreground" />
                    </Link>
                    <hr className="w-full mt-3" />
                </div>
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={route("post.index")}
                                    className={`${route().current("post.index") ? " bg-black text-accent-foreground transition-colors hover:text-foreground " : " text-muted-foreground "} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <LibraryBig
                                        className={`${route().current("post.index") ? "text-neutral-100 transition-all duration-300 ease-in-out hover:scale-110 " : " text-muted-foreground "}  w-5 h-5`}
                                    />
                                    <span className="sr-only">Postlar</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Postlar
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={route("category.index")}
                                    className={`${route().current("category.index") ? " bg-black text-accent-foreground transition-colors hover:text-foreground " : " text-muted-foreground "} flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <Layers3
                                        className={`${route().current("category.index") ? "text-neutral-100 transition-all duration-300 ease-in-out hover:scale-110 " : " text-muted-foreground "}  w-5 h-5`}
                                    />
                                    <span className="sr-only">Kategoriler</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Kategoriler
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 !border-b !border px-4 sm:static sm:h-auto sm:border-0 sm:px-6 sm:py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="sm:hidden"
                            >
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="ml-auto">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user.name}

                                        <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                <main
                    className={`container delay-900 transition-all ease-in-out`}
                >
                    {children}
                </main>
            </div>
            <Toaster/>
        </div>
    );
}
