import Table from "@/Pages/Post/CreateTable/Table.jsx";
import React from "react";
export default function Create({auth,categories}) {
    return (
        <div>
            <Table  auth={auth} categories={categories} newDD/>
        </div>
    );
}
