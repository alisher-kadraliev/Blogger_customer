import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import "../js/i18n/i18n.js";
import { PositionProvider } from "@/Pages/Front/Components/PositionProvider.jsx";

const appName = import.meta.env.VITE_APP_NAME || "Ibrahim";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PositionProvider>
                <App {...props} />{" "}
            </PositionProvider>,
        );
    },
    progress: false,
});
