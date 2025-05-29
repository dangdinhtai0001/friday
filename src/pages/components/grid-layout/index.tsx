import { ECGridItem, ECGridLayout } from "@/components/atoms/grid-layout";
import { cn } from "@/composables/utils/shadcn";

// Component Item đơn giản để hiển thị nội dung trong ô lưới
const Item = ({ index, className }: { index: number; className?: string }) => {
  return (
    <div
      className={cn(
        "bg-secondary-blue text-white-100 typography-semibold-14 flex h-full w-full items-center justify-center rounded-lg p-4",
        className,
      )}
    >
      {index}
    </div>
  );
};

function Page() {
  return (
    <div className="container w-full space-y-12">
      <div className="typography-semibold-48 text-black-100">
        Grid Layout Showcase
      </div>

      {/* --- */}

      <div>
        <div className="typography-semibold-14 text-black-100">
          1. Basic Tailwind CSS Grid (Explicit Columns)
        </div>
        <p className="text-black-40 typography-regular-12 mb-4">
          Sử dụng các utility classes mặc định của Tailwind CSS để tạo lưới với
          số cột cố định và định vị các mục.
        </p>
        <div className="border-black-20 bg-background-1 min-h-[200px] rounded-lg border border-dashed p-6">
          <div className="grid grid-cols-6 gap-4">
            <Item index={1} className="col-span-4 col-start-2" />
            <Item index={2} className="col-start-1 col-end-3" />
            <Item index={3} className="col-span-2 col-end-7" />
            <Item index={4} className="col-span-full" />
          </div>
        </div>
      </div>

      {/* --- */}

      <div>
        <div className="typography-semibold-14 text-black-100">
          2. Basic Tailwind CSS Grid (Flow by Column)
        </div>
        <p className="text-black-40 typography-regular-12 mb-4">
          Minh họa cách lưới tự động sắp xếp các mục theo cột (`grid-flow-col`)
          với số lượng hàng cố định.
        </p>
        <div className="border-black-20 bg-background-1 min-h-[200px] rounded-lg border border-dashed p-6">
          <div className="grid grid-flow-col grid-rows-3 gap-4">
            <Item index={1} className="row-span-3" />
            <Item index={2} className="col-span-2" />
            <Item index={3} className="col-span-2 row-span-2" />
          </div>
        </div>
      </div>

      {/* --- */}

      <div>
        <div className="typography-semibold-14 text-black-100">
          3. Tailwind CSS Grid with Manual Positioning
        </div>
        <p className="text-black-40 typography-regular-12 mb-4">
          Ví dụ phức tạp hơn về việc định vị thủ công các mục trong lưới
          Tailwind CSS mà không cần các component `ECGrid`.
        </p>
        <div className="border-black-20 bg-background-1 min-h-[400px] rounded-lg border border-dashed p-6">
          <div className="grid h-full w-full grid-cols-6 grid-rows-6 gap-[8px]">
            <Item index={1} className="col-start-1 row-start-1" />
            <Item
              index={2}
              className="col-span-2 col-start-1 row-span-4 row-start-3"
            />
            <Item
              index={3}
              className="col-span-3 col-start-3 row-span-3 row-start-3"
            />
            <Item index={4} className="col-start-6 row-start-6" />
          </div>
        </div>
      </div>

      {/* --- */}

      <div>
        <div className="typography-semibold-14 text-black-100">
          4. Using ECGridLayout and ECGridItem (Basic)
        </div>
        <p className="text-black-40 typography-regular-12 mb-4">
          Đây là cách sử dụng các components `ECGridLayout` và `ECGridItem` của
          bạn, cho phép định vị mục bằng các props `x`, `y`, `width`, `height`
          dễ đọc hơn.
        </p>
        <div className="border-black-20 bg-background-1 min-h-[400px] rounded-lg border border-dashed p-6">
          <ECGridLayout cols={6} rows={6} className="h-96">
            <ECGridItem x={1} y={1}>
              <Item index={1} />
            </ECGridItem>
            <ECGridItem x={1} y={3} width={2} height={4}>
              <Item index={2} />
            </ECGridItem>
            <ECGridItem x={3} y={3} width={3} height={3}>
              <Item index={3} />
            </ECGridItem>
            <ECGridItem x={6} y={6}>
              <Item index={4} />
            </ECGridItem>
          </ECGridLayout>
        </div>
      </div>

      {/* --- */}

      <div>
        <div className="typography-semibold-14 text-black-100">
          5. ECGridLayout with Custom Gaps
        </div>
        <p className="text-black-40 typography-regular-12 mb-4">
          Minh họa cách sử dụng các props `gapCol` và `gapRow` để tùy chỉnh
          khoảng cách giữa các ô lưới, bao gồm cả giá trị số và giá trị có đơn
          vị.
        </p>
        <div className="border-black-20 bg-background-1 min-h-[400px] rounded-lg border border-dashed p-6">
          <ECGridLayout
            cols={4}
            rows={4}
            gapCol="20px"
            gapRow="1.5rem"
            className="h-96"
          >
            <ECGridItem x={1} y={1} width={2} height={1}>
              <Item index={1} />
            </ECGridItem>
            <ECGridItem x={3} y={1} width={2} height={2}>
              <Item index={2} />
            </ECGridItem>
            <ECGridItem x={1} y={2} width={1} height={3}>
              <Item index={3} />
            </ECGridItem>
            <ECGridItem x={2} y={3} width={3} height={2}>
              <Item index={4} />
            </ECGridItem>
          </ECGridLayout>
        </div>
      </div>

      {/* --- */}

      <div>
        <div className="typography-semibold-14 text-black-100">
          6. ECGridLayout with More Items and Complex Layout
        </div>
        <p className="text-black-40 typography-regular-12 mb-4">
          Một ví dụ phức tạp hơn, hiển thị khả năng của components `ECGrid`
          trong việc tạo ra các bố cục phức tạp và linh hoạt.
        </p>
        <div className="border-black-20 bg-background-1 min-h-[400px] rounded-lg border border-dashed p-6">
          <ECGridLayout
            cols={8}
            rows={8}
            gapCol="16px"
            gapRow="16px"
            className="h-[500px]"
          >
            <ECGridItem x={1} y={1} width={3} height={2}>
              <Item index={1} />
            </ECGridItem>
            <ECGridItem x={4} y={1} width={5} height={1}>
              <Item index={2} />
            </ECGridItem>
            <ECGridItem x={4} y={2} width={2} height={2}>
              <Item index={3} />
            </ECGridItem>
            <ECGridItem x={6} y={2} width={3} height={3}>
              <Item index={4} />
            </ECGridItem>
            <ECGridItem x={1} y={3} width={3} height={6}>
              <Item index={5} />
            </ECGridItem>
            <ECGridItem x={4} y={4} width={2} height={2}>
              <Item index={6} />
            </ECGridItem>
            <ECGridItem x={6} y={5} width={3} height={4}>
              <Item index={7} />
            </ECGridItem>
            <ECGridItem x={4} y={6} width={2} height={3}>
              <Item index={8} />
            </ECGridItem>
          </ECGridLayout>
        </div>
      </div>
    </div>
  );
}

export default Page;
