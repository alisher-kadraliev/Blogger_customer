import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const Paginate = ({ links }) => {
    const { t } = useTranslation();
    return (
        <nav className="text-center mt-4">
            {links.map((link, index) => (
                <Link
                    href={link.url || ""}
                    key={index} // Consider using index if label might not be unique
                    className={`inline-block py-2 px-3 rounded-lg text-gray-900 mx-1 transition-custom ${
                        link.active ? "bg-gray-800 text-white" : " "
                    }${!link.url ? " !text-gray-300 cursor-not-allowed" : " hover:bg-gray-800 hover:text-white"}`}
                    dangerouslySetInnerHTML={{ __html: t(link.label) }}
                />
            ))}
        </nav>
    );
};
export default Paginate;
