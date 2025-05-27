import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Các namespace mà bạn sử dụng trong ứng dụng
    // Điều này giúp i18next tải trước các namespace khi khởi tạo
    ns: ["common", "pages/theme-color"],
    defaultNS: "common", // Namespace mặc định nếu không chỉ định

    fallbackLng: "en",
    debug: import.meta.env.NODE_ENV === "development", // Chỉ bật debug trong dev

    interpolation: {
      escapeValue: false, // Không cần escape trong React
    },

    backend: {
      // Đường dẫn để tải các tệp dịch.
      // {{lng}} sẽ được thay thế bằng ngôn ngữ hiện tại (en, vi)
      // {{ns}} sẽ được thay thế bằng namespace (common, home, auth)
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    // Tùy chọn phát hiện ngôn ngữ
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
      ],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
