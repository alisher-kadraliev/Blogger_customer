import Table from "@/Pages/Post/CreateTable/Table.jsx";
import React from "react";
export default function Create({auth}) {
    return (
        <div>
            <Table  auth={auth}/>
        </div>
    );
}
