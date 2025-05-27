import { useTheme } from "@/composables/hooks/use-theme";
import { cn } from "@/composables/utils/shadcn";
import { Theme } from "@/store";

const colors = {
  "pastel-light": {
    black: [
      { name: "Black 100%", value: "#000000", className: "bg-black-100" },
      { name: "Black 80%", value: "#262626", className: "bg-black-80" },
      { name: "Black 40%", value: "#595959", className: "bg-black-40" },
      { name: "Black 20%", value: "#737373", className: "bg-black-20" },
      { name: "Black 10%", value: "#ebebeb", className: "bg-black-10" },
      { name: "Black 4%", value: "#f5f5f5", className: "bg-black-4" },
    ],
    white: [
      { name: "White 100%", value: "#ffffff", className: "bg-white-100" },
      { name: "White 80%", value: "#d9d9d9", className: "bg-white-80" },
      { name: "White 40%", value: "#b3b3b3", className: "bg-white-40" },
      { name: "White 20%", value: "#8c8c8c", className: "bg-white-20" },
      { name: "White 10%", value: "#595959", className: "bg-white-10" },
      { name: "White 4%", value: "#262626", className: "bg-white-4" },
    ],
    primary: [
      { name: "Brand", value: "#000000", className: "bg-brand" }, // Màu chính trong chế độ sáng (đen)
    ],
    secondary: [
      { name: "Purple", value: "#6a51ae", className: "bg-purple" },
      { name: "Indigo", value: "#5662f2", className: "bg-indigo" },
      { name: "Blue", value: "#2196f3", className: "bg-blue" },
      { name: "Cyan", value: "#00bcd4", className: "bg-cyan" },
      { name: "Mint", value: "#26de81", className: "bg-mint" },
      { name: "Green", value: "#4caf50", className: "bg-green" },
      { name: "Yellow", value: "#ffeb3b", className: "bg-yellow" },
      { name: "Orange", value: "#ff9800", className: "bg-orange" },
      { name: "Red", value: "#f44336", className: "bg-red" },
    ],
    background: [
      { name: "BG1", value: "#ffffff", className: "bg-bg1" },
      { name: "BG2", value: "#f5f5f5", className: "bg-bg2" },
      { name: "BG3", value: "#ebebeb", className: "bg-bg3" },
      { name: "BG4", value: "#b3b3b3", className: "bg-bg4" },
      { name: "BG5", value: "#737373", className: "bg-bg5" },
    ],
  },
  "pastel-dark": {
    black: [
      { name: "Black 100%", value: "#000000", className: "bg-black-100" },
      { name: "Black 80%", value: "#262626", className: "bg-black-80" },
      { name: "Black 40%", value: "#595959", className: "bg-black-40" },
      { name: "Black 20%", value: "#737373", className: "bg-black-20" },
      { name: "Black 10%", value: "#ebebeb", className: "bg-black-10" },
      { name: "Black 4%", value: "#f5f5f5", className: "bg-black-4" },
    ],
    white: [
      { name: "White 100%", value: "#ffffff", className: "bg-white-100" },
      { name: "White 80%", value: "#d9d9d9", className: "bg-white-80" },
      { name: "White 40%", value: "#b3b3b3", className: "bg-white-40" },
      { name: "White 20%", value: "#8c8c8c", className: "bg-white-20" },
      { name: "White 10%", value: "#595959", className: "bg-white-10" },
      { name: "White 4%", value: "#262626", className: "bg-white-4" },
    ],
    primary: [
      { name: "Brand", value: "#6a51ae", className: "bg-brand" }, // Màu chính trong chế độ tối (tím)
    ],
    secondary: [
      { name: "Purple", value: "#6a51ae", className: "bg-purple" },
      { name: "Indigo", value: "#5662f2", className: "bg-indigo" },
      { name: "Blue", value: "#2196f3", className: "bg-blue" },
      { name: "Cyan", value: "#00bcd4", className: "bg-cyan" },
      { name: "Mint", value: "#26de81", className: "bg-mint" },
      { name: "Green", value: "#4caf50", className: "bg-green" },
      { name: "Yellow", value: "#ffeb3b", className: "bg-yellow" },
      { name: "Orange", value: "#ff9800", className: "bg-orange" },
      { name: "Red", value: "#f44336", className: "bg-red" },
    ],
    background: [
      { name: "BG1", value: "#000000", className: "bg-bg1" },
      { name: "BG2", value: "#262626", className: "bg-bg2" },
      { name: "BG3", value: "#595959", className: "bg-bg3" },
      { name: "BG4", value: "#8c8c8c", className: "bg-bg4" },
      { name: "BG5", value: "#595959", className: "bg-bg5" },
    ],
  },
};

function Page() {
  const { theme } = useTheme();

  const currentThemeColors = colors[theme];

  return (
    <div className="">
      <div className="typography-regular-24 text-black-100">
        Bảng màu ({theme})
      </div>
      <div className="">
        {Object.entries(currentThemeColors).map(([category, colorArray]) => (
          <div key={category} className="p-4 shadow-md">
            <div className="typography-regular-14 text-black-100">
              {category}
            </div>

            <div className="flex gap-12">
              {colorArray.map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-8">
                  <div
                    className={cn(
                      "size-64 rounded-12 border border-gray-300",
                      color.className,
                    )}
                  ></div>
                  <p className="text-center typography-regular-14">{color.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  //   return (
  //     <div className="">
  //       <h1 className="typography-regular-24 text-black-100">Bảng màu ({theme})</h1>
  //       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  //         {Object.entries(currentThemeColors).map(([category, colorArray]) => (
  //           <div key={category} className="rounded-lg border p-4 shadow-md">
  //             <h2 className="mb-4 text-xl font-semibold capitalize">
  //               {category}
  //             </h2>
  //             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
  //               {colorArray.map((color) => (
  //                 <div
  //                   key={color.name}
  //                   className="flex flex-col items-center rounded-md border p-2"
  //                 >
  //                   <div
  //                     className="mb-2 h-16 w-16 rounded-md border border-gray-300"
  //                     style={{ backgroundColor: color.value }}
  //                   ></div>
  //                   <p className="text-center text-sm font-medium">
  //                     {color.name}
  //                   </p>
  //                   <p className="text-xs text-gray-500">{color.value}</p>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
}

export default Page;
