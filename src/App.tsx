import FlexibleLayout from "./components/flexible-layout";
import "@/assets/styles/index.css";
import { FieldController, FormContainer } from "./components/form-container";

// Default values
const defaultValues = {
  username: "",
  email: "",
  password: "",
};

const handleSubmit = (data: typeof defaultValues) => {
  console.log("Form Data:", data);
};

function App() {
  return (
    <>
      <div className=" border-1 border-black w-[1000px]">
        <FormContainer
          onSubmit={(data) => console.log("Form submitted:", data)}
          init={async () => {
            // Giả lập việc lấy dữ liệu từ API
            return new Promise((resolve) =>
              setTimeout(
                () => resolve({ username: "John Doe", email: 30 }),
                500
              )
            );
          }}
          onValueChange={(values) =>
            console.log("Form values changed:", values)
          }
          beforeSubmit={async (data) => {
            console.log("Before submit:", data);
            // Giả lập kiểm tra điều kiện trước khi submit
            return data.name !== ""; // Chỉ submit nếu tên không rỗng
          }}
          afterSubmit={(error, data) => {
            if (error) {
              console.error("Submit failed with error:", error);
            } else {
              console.log("Submit succeeded with data:", data);
            }
          }}
        >
          <FlexibleLayout
            rowHeight={20} // Ghi đè giá trị mặc định
            isDraggable={false} // Tắt tính năng kéo thả
          >
            <div key="item1" data-grid={{ x: 0, y: 0, w: 12, h: 3 }}>
              <FieldController<typeof defaultValues>
                name="username"
                label="Username"
                layout="horizontal"
                hint="Enter your unique username"
                hintType="info"
                labelAlign="right"
                labelWidth="150px"
                rules={{ required: true }}
                hintDisplayMode="ellipsis"
              >
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FieldController>
            </div>
            <div key="item2" data-grid={{ x: 0, y: 0, w: 12, h: 3 }}>
              <FieldController<typeof defaultValues>
                name="email"
                label="Email"
                type="email"
                layout="horizontal"
                hint="We'll never share your email with anyone else."
                hintType="warning"
                labelAlign="right"
                labelWidth="150px"
                rules={{ required: true }}
              >
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FieldController>
            </div>
            <div key="item3" data-grid={{ x: 0, y: 0, w: 12, h: 3 }}>
              <FieldController<typeof defaultValues>
                name="password"
                label="Password"
                type="password"
                layout="horizontal"
                hint="Must be at least 6 characters"
                hintType="error"
                labelAlign="right"
                labelWidth="150px"
                rules={{ required: true }}
              >
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FieldController>
            </div>
          </FlexibleLayout>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </FormContainer>
      </div>
    </>
  );
}

export default App;
