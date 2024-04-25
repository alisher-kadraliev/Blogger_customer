import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    "&laquo; Previous": "&laquo; Previous",
                    "Next &raquo;": "Next &raquo;",
                    pending: "Pending",
                    in_progress: "In Progress",
                    completed: "Completed",
                },
            },
            tr: {
                translation: {
                    "&laquo; Previous": "&laquo; Önceki",
                    "Next &raquo;": "Sonraki &raquo;",
                    pending: "Beklemede",
                    in_progress: "Devam Ediyor",
                    completed: "Tamamlandı",
                },
            },
        },
        lng: "tr", // If you need to determine the language dynamically you can use a different approach
        fallbackLng: "en",

        interpolation: {
            escapeValue: false,
        },
    });
