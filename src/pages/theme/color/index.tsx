import {
  MCTooltip,
  MCTooltipContent,
  MCTooltipProvider,
  MCTooltipTrigger,
} from "@/components/molecules/tooltip";
import {
  MCCard,
  MCCardContent,
  MCCardHeader,
  MCCardTitle,
} from "@/components/organisms/card";
import { useLanguage } from "@/composables/hooks/use-language";
import { useTheme } from "@/composables/hooks/use-theme";
import { cn } from "@/composables/utils/shadcn";

function Page() {
  const { theme } = useTheme();
  const {  t, currentLanguage} = useLanguage();

  console.log(t("pages/theme-color:heading"), currentLanguage);
  

  const currentThemeColors = colors[theme];

  return (
    <div className="rounded-8 flex flex-col gap-8">
      <div className="typography-regular-24 text-black-100">
        {t("pages/theme-color:heading")} ({theme})
      </div>

      <div className="flex flex-col gap-8">
        {Object.entries(currentThemeColors).map(([category, colorArray]) => (
          <MCCard className="" key={category}>
            <MCCardHeader>
              <MCCardTitle>{category}</MCCardTitle>
            </MCCardHeader>

            <MCCardContent className="flex items-center gap-8">
              {colorArray.map((color) => (
                <div
                  key={color.name}
                  className="flex flex-col items-center gap-8"
                >
                  <MCTooltip>
                    <MCTooltipProvider>
                      <MCTooltipTrigger>
                        <div
                          className={cn(
                            "rounded-12 border-black-20 size-80 border",
                            "transition-all duration-300 ease-in-out hover:scale-105",
                            color.className,
                          )}
                        />
                      </MCTooltipTrigger>

                      <MCTooltipContent side="right">
                        {color.value}
                      </MCTooltipContent>
                    </MCTooltipProvider>
                  </MCTooltip>

                  {/* ------ */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="typography-regular-14 text-black-100 flex items-center justify-start gap-1">
                      <div>{color.name}</div>
                      <div
                        className="border-black-20 rounded-4 size-16 border"
                        style={{ backgroundColor: color.value }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </MCCardContent>
          </MCCard>
        ))}
      </div>
    </div>
  );
}

const colors = {
  "pastel-light": {
    black: [
      {
        name: "Black 100%",
        value: "rgba(0,0,0,1)",
        className: "bg-black-100",
      },
      {
        name: "Black 80%",
        value: "rgba(0,0,0,0.8)",
        className: "bg-black-80",
      },
      {
        name: "Black 40%",
        value: "rgba(0,0,0,0.4)",
        className: "bg-black-40",
      },
      {
        name: "Black 20%",
        value: "rgba(0,0,0,0.2)",
        className: "bg-black-20",
      },
      {
        name: "Black 10%",
        value: "rgba(0,0,0,0.1)",
        className: "bg-black-10",
      },
      {
        name: "Black 4%",
        value: "rgba(0,0,0,0.04)",
        className: "bg-black-4",
      },
    ],
    white: [
      {
        name: "White 100%",
        value: "rgba(255,255,255,1)",
        className: "bg-white-100",
      },
      {
        name: "White 80%",
        value: "rgba(255,255,255,0.8)",
        className: "bg-white-80",
      },
      {
        name: "White 40%",
        value: "rgba(255,255,255,0.4)",
        className: "bg-white-40",
      },
      {
        name: "White 20%",
        value: "rgba(255,255,255,0.2)",
        className: "bg-white-20",
      },
      {
        name: "White 10%",
        value: "rgba(255,255,255,0.1)",
        className: "bg-white-10",
      },
      {
        name: "White 4%",
        value: "rgba(255,255,255,0.04)",
        className: "bg-white-4",
      },
    ],
    primary: [
      {
        name: "Brand",
        value: "rgba(0,0,0,1)",
        className: "bg-primary-brand",
      },
    ],
    secondary: [
      {
        name: "purple",
        value: "rgba(201,179,237,1)",
        className: "bg-secondary-purple",
      },
      {
        name: "indigo",
        value: "rgba(159,159,248,1)",
        className: "bg-secondary-indigo",
      },
      {
        name: "blue",
        value: "rgba(146,191,255,1)",
        className: "bg-secondary-blue",
      },
      {
        name: "cyan",
        value: "rgba(174,199,237,1)",
        className: "bg-secondary-cyan",
      },
      {
        name: "mint",
        value: "rgba(150,226,214,1)",
        className: "bg-secondary-mint",
      },
      {
        name: "green",
        value: "rgba(148,233,184,1)",
        className: "bg-secondary-green",
      },
      {
        name: "yellow",
        value: "rgba(255,219,86,1)",
        className: "bg-secondary-yellow",
      },
      {
        name: "orange",
        value: "rgba(255,181,91,1)",
        className: "bg-secondary-orange",
      },
      {
        name: "red",
        value: "rgba(255,71,71,1)",
        className: "bg-secondary-red",
      },
    ],
    background: [
      {
        name: "BG1",
        value: "rgba(255,255,255,1)",
        className: "bg-background-1",
      },
      {
        name: "BG2",
        value: "rgba(249,249,250,1)",
        className: "bg-background-2",
      },
      {
        name: "BG3",
        value: "rgba(230,241,253,1)",
        className: "bg-background-3",
      },
      {
        name: "BG4",
        value: "rgba(237,238,252,1)",
        className: "bg-background-4",
      },
      {
        name: "BG5",
        value: "rgba(255,255,255,0.8)",
        className: "bg-background-5",
      },
    ],
  },
  "pastel-dark": {
    black: [
      {
        name: "Black 100%",
        value: "rgba(255,255,255,1)",
        className: "bg-black-100",
      },
      {
        name: "Black 80%",
        value: "rgba(255,255,255,0.8)",
        className: "bg-black-80",
      },
      {
        name: "Black 40%",
        value: "rgba(255,255,255,0.4)",
        className: "bg-black-40",
      },
      {
        name: "Black 20%",
        value: "rgba(255,255,255,0.2)",
        className: "bg-black-20",
      },
      {
        name: "Black 10%",
        value: "rgba(255,255,255,0.1)",
        className: "bg-black-10",
      },
      {
        name: "Black 4%",
        value: "rgba(255,255,255,0.04)",
        className: "bg-black-4",
      },
    ],
    white: [
      { name: "White 100%", value: "rgba(0,0,0,1)", className: "bg-white-100" },
      { name: "White 80%", value: "rgba(0,0,0,0.8)", className: "bg-white-80" },
      { name: "White 40%", value: "rgba(0,0,0,0.4)", className: "bg-white-40" },
      { name: "White 20%", value: "rgba(0,0,0,0.2)", className: "bg-white-20" },
      { name: "White 10%", value: "rgba(0,0,0,0.1)", className: "bg-white-10" },
      { name: "White 4%", value: "rgba(0,0,0,0.04)", className: "bg-white-4" },
    ],
    primary: [
      {
        name: "Brand",
        value: "rgba(159,159,248,1)",
        className: "bg-primary-brand",
      },
    ],
    secondary: [
      {
        name: "purple",
        value: "rgba(201,179,237,1)",
        className: "bg-secondary-purple",
      },
      {
        name: "indigo",
        value: "rgba(159,159,248,1)",
        className: "bg-secondary-indigo",
      },
      {
        name: "blue",
        value: "rgba(146,191,255,1)",
        className: "bg-secondary-blue",
      },
      {
        name: "cyan",
        value: "rgba(174,199,237,1)",
        className: "bg-secondary-cyan",
      },
      {
        name: "mint",
        value: "rgba(150,226,214,1)",
        className: "bg-secondary-mint",
      },
      {
        name: "green",
        value: "rgba(148,233,184,1)",
        className: "bg-secondary-green",
      },
      {
        name: "yellow",
        value: "rgba(255,219,86,1)",
        className: "bg-secondary-yellow",
      },
      {
        name: "orange",
        value: "rgba(255,181,91,1)",
        className: "bg-secondary-orange",
      },
      {
        name: "red",
        value: "rgba(255,71,71,1)",
        className: "bg-secondary-red",
      },
    ],
    background: [
      { name: "BG1", value: "rgba(42,42,42,1)", className: "bg-background-1" },
      {
        name: "BG2",
        value: "rgba(255,255,255,0.04)",
        className: "bg-background-2",
      },
      {
        name: "BG3",
        value: "rgba(230,241,253,1)",
        className: "bg-background-3",
      },
      {
        name: "BG4",
        value: "rgba(237,238,252,1)",
        className: "bg-background-4",
      },
      { name: "BG5", value: "rgba(0,0,0,0.1)", className: "bg-background-5" },
    ],
  },
};

export default Page;
