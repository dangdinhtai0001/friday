// international.ts

import { get } from "lodash-es"; // Import Lodash

// Define the structure of the dictionary object
type Dictionary = {
  [key: string]: string | Dictionary; // Each key can be a string or another nested dictionary
};

const dictionary: Dictionary = {
  vi: {
    component: {
      "multi-select": {
        "search-placeholder": "Tìm kiếm",
        "result-placeholder": "Lựa chọn",
        "no-results": "Không tìm thấy kết quả",
        "select-all": "Chọn tất cả",
      },
      "data-grid": {
        plugin: {
          "choose-column-panel-header": "Chọn cột"
        },
        header: {
          menu: {
            "sort-ascending": "Sắp xếp tăng dần",
            "sort-descending": "Sắp xếp giảm dần",
            "pin-column": "Ghim cột",
            "pin-left": "Ghim cột trái",
            "pin-right": "Ghim cột phải",
            "no-pin": "Không ghim",
            "choose-column": "Chọn cột",
            "reset-column": "Reset cột",
          },
        },
      },
    },
  },
};

// Define the type for the translate function
type TranslateFunction = (key: string, lang?: string) => string;

// Implement the translate function using Lodash's _.get
const translate: TranslateFunction = (key, lang = "vi") => {
  const result = get(dictionary, `${lang}.${key}`, key); // Use _.get to traverse the nested structure
  return typeof result === "string" ? result : key; // Ensure the result is a string
};

export default translate;
