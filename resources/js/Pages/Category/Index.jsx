import TableShow from "@/Pages/Category/ShowTable/TableShow.jsx";

export default function Index({categories}) {
    return (
        <div>
            <Table categories={categories}>
                <pre>{JSON.stringify(categories)}</pre>

            </Table>
        </div>
    )
}
