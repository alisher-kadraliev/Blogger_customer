import Table from "@/Pages/Category/CreateTable/Table.jsx";

export default function Index({auth}) {
    return (
        <div>
            <Table auth={auth} />
        </div>
    )
}
