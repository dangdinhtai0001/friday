import FlexLayout from "@/components/organisms/flex-layout/flex-layout";

function Page() {
  // Tạo một mảng đơn giản chỉ để lặp qua, ví dụ 10 phần tử
  const numberOfDivs = 10;
  const divItems = Array.from({ length: numberOfDivs }, (_, i) => i + 1);

  return (
    <div className="min-h-screen">
      <div className="text-black-100 typography-regular-24">
        Demo FlexLayout
      </div>

      <div className="flex flex-col gap-8">
        {/* Demo 1: Các khối xếp hàng ngang, có khoảng cách và tự xuống dòng */}
        <div className="">
          <div className=""> Flex Row (có wrap) </div>
          <FlexLayout
            direction="row"
            spacing={4} // Khoảng cách 4 đơn vị giữa các khối
            justify="start" // Các khối bắt đầu từ bên trái
            wrap={true} // Cho phép các khối xuống dòng khi hết chỗ
            className="rounded-8 p-8 border border-black-20"
          >
            {divItems.map((index) => (
              <div
                key={index} // Sử dụng index làm key, trong thực tế nên dùng ID duy nhất
                className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500 font-bold text-white"
              >
                {index}
              </div>
            ))}
          </FlexLayout>
        </div>

        {/* Demo 2: Các khối xếp hàng dọc, có khoảng cách */}
        <div className="">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Flex Column (không wrap)
          </h2>
          <FlexLayout
            direction="col"
            spacing={3} // Khoảng cách 3 đơn vị giữa các khối
            align="start" // Các khối căn trái
            className="mx-auto max-w-xs rounded-lg bg-white p-6 shadow-md" // Giới hạn chiều rộng để thấy hiệu ứng cột rõ hơn
          >
            {divItems.map((index) => (
              <div
                key={index}
                className="flex h-24 w-24 items-center justify-center rounded-lg bg-green-500 font-bold text-white"
              >
                {index}
              </div>
            ))}
          </FlexLayout>
        </div>

        {/* Demo 3: Flex Row, căn giữa, không xuống dòng (có thể tràn màn hình nếu quá nhiều khối) */}
        <div className="">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            Flex Row (không wrap, căn giữa)
          </h2>
          <FlexLayout
            direction="row"
            spacing={6} // Khoảng cách lớn hơn
            justify="center" // Căn giữa các khối
            wrap={false} // Không cho phép xuống dòng
            className="overflow-x-auto rounded-lg bg-white p-6 shadow-md" // Thêm overflow để cuộn nếu tràn
          >
            {divItems.map((index) => (
              <div
                key={index}
                className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500 font-bold text-white"
              >
                {index}
              </div>
            ))}
          </FlexLayout>
        </div>
      </div>
    </div>
  );
}

export default Page;
