import {Head} from "@inertiajs/react";
import Layout from "@/Pages/Front/Layout.jsx";

export default function Index(){
    return (
        <>
        <Head title="Home" />
        <Layout>
            <div className="relative isolate px-0 pt-14 lg:px-8 max-lg:pt-5">
                <div className="container">
                    <div className="flex flex-row gap-16 px-22 py-14 max-lg:flex-col max-lg:px-0 max-lg:py-2 justify-center items-center">
                        <img
                            src="/image/image-asset.jpeg"
                            className="w-1/3 shadow-xl max-lg:w-full"
                            width="420"
                            height="420"
                            alt="Ibrahim Katlav"

                        />
                        <div className="flex flex-col gap-6 w-1/2 max-lg:w-full">
                            <h1 className="text-[48px] h1">
                                Earn a full time income as a web designer
                            </h1>
                            <p className="text-xl text-frontText">
                                I help web designers build a profitable business
                                that feels fun and easy to run, without
                                overworking or squeezing themselves into other
                                people’s boxes. DOWNLOAD YOUR FREE ROADMAP
                            </p>
                            <a
                                href=""
                                className="front-btn w-2/3 max-lg:w-full text-xl max-lg:p-4 max-lg:text-sm"
                            >
                                DOWNLOAD YOUR FREE ROADMAP
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80 z-[-1] max-lg:w-full"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] z-[-1] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-70 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>

                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
            </div>
        </Layout>
        </>
    )
}
