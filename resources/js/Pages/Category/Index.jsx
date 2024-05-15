import TableShow from "@/Pages/Category/ShowTable/TableShow.jsx";
import React from "react";

export default function Index({categories,auth}) {
    return (
        <div>
            <TableShow categories={categories} auth={auth}>
            </TableShow>
        </div>
    )
}
