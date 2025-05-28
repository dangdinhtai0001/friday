import GridLayout from "@/components/organisms/grid-layout/grid-layout";
import GridItem from "@/components/organisms/grid-layout/grid-item";

function Page() {
  const numberOfDivs = 10;
  const divItems = Array.from({ length: numberOfDivs }, (_, i) => i + 1);

  // Dữ liệu cho demo Responsive Grid từ mảng
  const responsiveGridItems = [
    { id: 1, content: "Grid Item 1", span: 2, bgColor: "bg-secondary-blue" },
    { id: 2, content: "Grid Item 2", span: 1, bgColor: "bg-secondary-yellow" },
    { id: 3, content: "Grid Item 3", span: 1, bgColor: "bg-secondary-orange" },
    {
      id: 4,
      content: "Grid Item 4 (Full Width)",
      span: "full",
      bgColor: "bg-primary-purple",
    },
    { id: 5, content: "Grid Item 5", span: 1, bgColor: "bg-secondary-cyan" },
    { id: 6, content: "Grid Item 6", span: 1, bgColor: "bg-secondary-mint" },
    {
      id: 7,
      content: "Grid Item 7 (start 4)",
      span: 1,
      start: 4,
      bgColor: "bg-secondary-red",
    },
    { id: 8, content: "Grid Item 8", span: 1, bgColor: "bg-secondary-indigo" },
    { id: 9, content: "Grid Item 9", span: 2, bgColor: "bg-primary-blue" },
    { id: 10, content: "Grid Item 10", span: 1, bgColor: "bg-secondary-green" },
  ];

  return (
    <div className="text-black-100 min-h-screen p-8">
      {/* --- Phần Demo Grid Layout --- */}
      <div>
        <h2 className="typography-semibold-20 mb-4">Demo Grid Layout</h2>
        <div className="flex flex-col gap-8">
          {/* Ví dụ Grid Layout 1: Cố định 3 cột, gap 20px */}
          <div>
            <h3 className="typography-semibold-18 mb-2">
              Grid 3 Cột Cố Định - Gap 20px
            </h3>
            <p className="typography-regular-14 text-black-40 mb-4">
              Lưới với 3 cột đều nhau, khoảng cách 20px. Các item chiếm 1 cột
              mặc định.
            </p>
            <GridLayout
              cols={3}
              gap="20px"
              className="rounded-8 bg-background-2 p-4 shadow-md"
            >
              {divItems.map((index) => (
                <GridItem
                  key={index}
                  className="rounded-8 bg-secondary-indigo text-white-80 typography-semibold-12 flex h-48 items-center justify-center"
                >
                  {index}
                </GridItem>
              ))}
            </GridLayout>
          </div>

          {/* Ví dụ Grid Layout 2: Responsive cột, gap Tailwind unit, với item span khác nhau (fixed) */}
          <div>
            <h3 className="typography-semibold-18 mb-2">
              Grid Responsive (auto-fit) & Item Span (Fixed)
            </h3>
            <p className="typography-regular-14 text-black-40 mb-4">
              Lưới tự động điều chỉnh số cột (tối thiểu 120px) và khoảng cách
              dùng Tailwind unit "6" (24px). Có các item chiếm nhiều cột được
              định nghĩa trực tiếp.
            </p>
            <GridLayout
              cols="repeat(auto-fit, minmax(120px, 1fr))"
              gap="6"
              className="rounded-8 bg-background-2 p-4 shadow-md"
            >
              <GridItem
                span={2}
                className="rounded-8 bg-secondary-blue text-white-80 typography-semibold-12 flex h-48 items-center justify-center"
              >
                Item 1 (span 2)
              </GridItem>
              <GridItem className="rounded-8 bg-secondary-yellow text-white-80 typography-semibold-12 flex h-48 items-center justify-center">
                Item 2
              </GridItem>
              <GridItem className="rounded-8 bg-secondary-orange text-white-80 typography-semibold-12 flex h-48 items-center justify-center">
                Item 3
              </GridItem>
              <GridItem
                span="full"
                className="rounded-8 bg-primary-purple text-white-80 typography-semibold-12 flex h-48 items-center justify-center"
              >
                Item 4 (span full)
              </GridItem>
              <GridItem className="rounded-8 bg-secondary-cyan text-white-80 typography-semibold-12 flex h-48 items-center justify-center">
                Item 5
              </GridItem>
              <GridItem className="rounded-8 bg-secondary-mint text-white-80 typography-semibold-12 flex h-48 items-center justify-center">
                Item 6
              </GridItem>
              <GridItem
                start={6}
                span={1}
                className="rounded-8 bg-secondary-red text-white-80 typography-semibold-12 flex h-48 items-center justify-center"
              >
                Item 7
              </GridItem>
            </GridLayout>
          </div>

          {/* --- Ví dụ Grid Layout 3: Responsive từ Mảng Dữ liệu --- */}
          <div>
            <h3 className="typography-semibold-18 mb-2">
              Grid Responsive từ Mảng Dữ liệu & Căn giữa
            </h3>
            <p className="typography-regular-14 text-black-40 mb-4">
              Lưới tự động điều chỉnh số cột (tối thiểu 150px), khoảng cách
              24px. Các item được cấu hình động từ một mảng, bao gồm cả thuộc
              tính `span` và `start`.
            </p>
            <GridLayout
              cols="repeat(auto-fit, minmax(150px, 1fr))" // Responsive columns
              gap="24px" // Gap tùy chỉnh 24px
              justifyItems="center" // Căn giữa nội dung trong ô
              alignItems="center" // Căn giữa nội dung trong ô
              className="rounded-8 bg-background-2 p-4 shadow-md"
            >
              {responsiveGridItems.map((item) => (
                <GridItem
                  key={item.id}
                  span={item.span}
                  start={item.start} // Prop start (nếu có)
                  className={`rounded-8 ${item.bgColor} text-white-80 typography-semibold-12 flex h-48 w-full items-center justify-center`}
                >
                  {item.content} {item.start ? `(start ${item.start})` : ""}
                </GridItem>
              ))}
            </GridLayout>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
