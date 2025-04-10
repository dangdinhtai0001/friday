import "@/assets/styles/main.css";
import {
  FieldController,
  FormContainer,
  OnValueChangePayload,
  useFormController,
  ValidateResponse,
} from "./components/molecules/form";
import { FieldValues } from "react-hook-form";
import { FormState } from "@/components/molecules/form/types/context.d";
import { Input } from "@/components/atoms/input";
import { FilterableDataGrid } from "@/components/templates/filterable-data-grid";

interface FormData extends FieldValues {
  username?: string;
  email?: string;
  password?: string;
  description?: string;
}
const handleSubmit = (data: FormData) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Form submitted:", data);
      resolve();
    }, 1000);
  });
};

const resolveFieldDisability = (
  values: FormData
): Partial<Record<keyof FormData, boolean>> => {
  return {
    username: false,
    email: false,
    password: false,
    description: values.username === "username1",
  };
};

const validateFunction = async (
  data: FormData
): Promise<ValidateResponse<FormData>> => {
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
  const { formRef, resetForm, submitForm, validateForm } = useFormController();

  return (
    <>
      <FilterableDataGrid></FilterableDataGrid>
      <div className=" border-1 border-black w-[1000px]">
        <FormContainer<FormData, unknown, unknown>
          ref={formRef}
          resolveFieldDisability={resolveFieldDisability}
          initialLayout={{
            username: { i: "", x: 0, y: 0, w: 5, h: 3.3 },
            email: { i: "", x: 6, y: 0, w: 5, h: 3.3 },
            password: { i: "", x: 0, y: 1, w: 12, h: 3.3 },
            description: { i: "", x: 0, y: 2, w: 12, h: 3.3 },
          }}
          initialFieldState={{
            username: { isVisible: true, isDisabled: false },
          }}
          externalContext={{ foo: "bar" }}
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
                    description: "",
                  }),
                500
              )
            );
          }}
          onValueChange={(payload: OnValueChangePayload<FormData>) =>
            console.log("Form values changed:", payload)
          }
          beforeSubmit={async (data: FormData) => {
            console.log("Before submit:", data);
            // Giả lập kiểm tra điều kiện trước khi submit
            return data.name !== ""; // Chỉ submit nếu tên không rỗng
          }}
          afterSubmit={(params: FormData) => {
            console.log("Submit succeeded with data:", params);
          }}
          onReady={(state: FormState) => {
            console.log("Form ready!!!", state);
          }}
        >
          <FieldController
            name="username"
            label="Username"
            layout="horizontal"
            hint="Enter your unique username"
            hintType="info"
            labelAlign="right"
            labelWidth="90px"
            hintDisplayMode="ellipsis"
            isRequired={true}
          >
            <Input type="text" placeholder="Enter your username" />
          </FieldController>
          <FieldController
            key="email"
            name="email"
            label="Email"
            layout="horizontal"
            hint="We'll never share your email with anyone else."
            hintType="warning"
            labelAlign="right"
            labelWidth="90px"
          >
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FieldController>
          <FieldController
            key="password"
            name="password"
            label="Password"
            layout="horizontal"
            hint="Must be at least 6 characters"
            hintType="error"
            labelAlign="right"
            labelWidth="90px"
          >
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FieldController>
          <FieldController
            key="description"
            name="description"
            label="description"
            layout="horizontal"
            labelAlign="right"
            labelWidth="90px"
          >
            <input
              type="text"
              placeholder="description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FieldController>
        </FormContainer>
        <button onClick={submitForm}>Submit</button>
        <button onClick={resetForm}>reset</button>
        <button onClick={validateForm}>validate</button>
      </div>
    </>
  );
}

export default App;
