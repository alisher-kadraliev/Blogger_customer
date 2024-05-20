import { Head, Link } from "@inertiajs/react";
import Layout from "@/Pages/Front/Layout.jsx";
import Paginate from "@/Pages/Post/Paginate.jsx";

export default function Index({posts,cats}) {
    return (
        <>
            <Head title="Home" />
            <Layout>
                <div className="w-1/2 mt-20 mb-10 max-lg:w-full max-lg:px-10 flex flex-col justify-center mx-auto items-center gap-3">
                    <h1 className="text-center h1 mb-4">
                        Articles about inclusive design and business
                    </h1>
                    <hr className="w-1/2 max-lg:w-full border-gray-400" />
                    <p className="text-center mt-4 text-xl">
                        I write articles and create videos to about building a
                        thriving business that reflects all of your
                        multi-layered identities.
                    </p>
                </div>
                <div className="container mb-20 px-52">
                    <div className="flex flex-row gap-10 flex-wrap justify-center items-center mx-auto">
                        {cats.map((item,index) => (
                            <Link key={index} className="bg-gray-100 px-5 py-2 rounded-xl hover:text-primary-front font-bold transition-custom hover:border border border-white hover:border-gray-200">{item.name}</Link>
                        ))}
                    </div>
                </div>
                <div className="container">
                    <div className="grid grid-cols-2 max-lg:grid-cols-2 px-52 max-lg:px-0 max-md:grid-cols-1 gap-20">
                        {posts.data.map((item,index) => (
                        <Link key={index} href="" className="flex flex-col gap-4 group">
                            <img
                                src={item.image}
                                className="border border-gray-500 w-full h-52 object-cover"
                                alt={item.image_alt}
                            />
                            <h2 className="h2">{item.title}</h2>
                            <p>
                                Thinking of investing in an online course and
                                leveling up your web design business? Before you
                                autofill your credit card details and click the
                                “Buy Now” button, ask these three questions to
                                make sure it’s a worthwhile investment.
                            </p>
                            <div className="underline">Devamı Oku</div>
                        </Link>
                        ))}
                        {/*{JSON.stringify(posts)}*/}
                    </div>
                    <Paginate links={posts.links}/>
                </div>
            </Layout>
        </>
    );
}
