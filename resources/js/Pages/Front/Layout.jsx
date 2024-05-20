import Navbar from "@/Pages/Front/Navbar.jsx";
import Footer from "@/Pages/Front/Footer.jsx";

export default function Layout({children}) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}
