import FlexibleLayout from "@/components/molecules/flexible-layout";
import "@/assets/styles/index.css";
import {
  FieldController,
  FormContainer,
  useFormController,
  ValidateResponse,
} from "./components/molecules/form";
import { FieldValues } from "react-hook-form";

interface FormData extends FieldValues {
  username: string;
  email: string;
  password: string;
}
const handleSubmit = (data: FormData) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Form submitted:", data);
      resolve();
    }, 1000);
  });
};

const validateFunction = async (data: FormData): ValidateResponse => {
  const errors: Record<string, { message: string }> = {};

  if (!data.username) {
    errors.username = { message: "Username is required" };
  } else if (data.username.length < 3) {
    errors.username = { message: "Username must be at least 3 characters" };
  }

  if (!data.password) {
    errors.password = { message: "Password is required" };
  } else if (data.password.length < 6) {
    errors.password = { message: "Password must be at least 6 characters" };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : data,
    errors,
  };
};

function App() {
  const {
    formRef,
    resetForm,
    submitForm,
    validateForm,
  } = useFormController();

  return (
    <>
      <div className=" border-1 border-black w-[1000px]">
        <FormContainer<FormData>
          ref={formRef}
          validateFunction={validateFunction}
          onReset={() => console.log("Form has been reset")}
          validationMode="onChange"
          onSubmit={handleSubmit}
          init={async () => {
            // Giả lập việc lấy dữ liệu từ API
            return new Promise((resolve) =>
              setTimeout(
                () =>
                  resolve({
                    username: "username",
                    email: "foo@gmail.com",
                    password: "12312",
                  }),
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
          afterSubmit={(params) => {
            console.log("Submit succeeded with data:", params);
          }}
        >
          <FlexibleLayout
            rowHeight={20} // Ghi đè giá trị mặc định
            isDraggable={false} // Tắt tính năng kéo thả
          >
            <div key="item1" data-grid={{ x: 0, y: 0, w: 12, h: 3 }}>
              <FieldController<FormData>
                name="username"
                label="Username"
                layout="horizontal"
                hint="Enter your unique username"
                hintType="info"
                labelAlign="right"
                labelWidth="150px"
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
              <FieldController<FormData>
                name="email"
                label="Email"
                layout="horizontal"
                hint="We'll never share your email with anyone else."
                hintType="warning"
                labelAlign="right"
                labelWidth="150px"
              >
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FieldController>
            </div>
            <div key="item3" data-grid={{ x: 0, y: 0, w: 12, h: 3 }}>
              <FieldController<FormData>
                name="password"
                label="Password"
                layout="horizontal"
                hint="Must be at least 6 characters"
                hintType="error"
                labelAlign="right"
                labelWidth="150px"
              >
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FieldController>
            </div>
          </FlexibleLayout>
        </FormContainer>
        <button onClick={submitForm}>Submit</button>
        <button onClick={resetForm}>reset</button>
        <button onClick={validateForm}>validate</button>
      </div>
    </>
  );
}

export default App;
