import Table from "@/Pages/Post/CreateTable/Table.jsx";

export default function Create({auth}) {
    return (
        <div>
            <Table  auth={auth}/>
        </div>
    );
}
