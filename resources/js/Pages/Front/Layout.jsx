import Navbar from "@/Pages/Front/Navbar.jsx";
import Footer from "@/Pages/Front/Footer.jsx";
import { motion } from "framer-motion";
import {PositionProvider} from "@/Pages/Front/Components/PositionProvider.jsx";
export default function Layout({children}) {

    return (
        <>
            <PositionProvider>
            <Navbar />
            <motion.main
                initial={{opacity:0.25}}
                animate={{
                    opacity:1
                }}
                transition={{duration: 0.2, ease: [0.1, 0.01, 0.4, 0.94]}}
            >
                {children}
            </motion.main>
            <Footer/>
            </PositionProvider>
        </>
    )
}
