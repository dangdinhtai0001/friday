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
import {
  DataViewLayout,
  FilterContainer,
  ActionContainer,
  ButtonTrigger,
  DialogTrigger,
  FormTrigger,
  CustomTrigger,
} from "@/components/templates/data-view-layout";
import { ButtonDialogCommand } from "./components/molecules/button-dialog/types";

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
  values: FormData,
): Partial<Record<keyof FormData, boolean>> => {
  return {
    username: false,
    email: false,
    password: false,
    description: values.username === "username1",
  };
};

const validateFunction = async (
  data: FormData,
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
      
      <DataViewLayout
        additionalEventBindings={{
          E_C_ADD: () => {
            console.log("event E_C_ADD");
          },
          E_C_EXPORT: async (params: unknown) => {
            const { setIsLoading } = params as { setIsLoading: (isLoading: boolean) => void };
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
            console.log("event E_C_EXPORT", params);
          },
          E_C_DELETE: async (params: unknown) => {
            const { setIsOpen, command, setIsLoading } = params as ButtonDialogCommand;

            if (command === "cancel") {
              setIsOpen?.(false);
            }
            if (command === "submit") {
              setIsLoading?.(true);
              await new Promise((resolve) => setTimeout(resolve, 2000));
              setIsLoading?.(false);
              setIsOpen?.(false);
              console.log("event E_C_DELETE completed", params);
            }
          }
        }}
      >
        <FilterContainer>
          <div>FilterContainer</div>
        </FilterContainer>
        <ActionContainer>
          <ButtonTrigger
            className="bg-secondary-indigo"
            variant="solid"
            label="Export"
            eventName="E_C_EXPORT"
            data-grid={{ x: 0, y: 0, w: 1, h: 2 }}
          />
          <DialogTrigger
            label="Delete"
            title="Delete data"
            triggerClassName="bg-secondary-red text-white-80"
            eventName="E_C_DELETE"
            footerButtons={[
              { label: "Cancel", command: "cancel", variant: "outline", className: "" },
              { label: "Submit", command: "submit", variant: "default", className: "bg-secondary-green" },
            ]}
            data-grid={{ x: 1, y: 0, w: 1, h: 2 }}
          >
            <div className=""> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quia eos quas at adipisci impedit, iste numquam sit. Sit tempore dicta sequi ratione nesciunt natus aspernatur minima libero, accusamus similique!</div>
          </DialogTrigger>
          <FormTrigger label="Create" data-grid={{ x: 2, y: 0, w: 1, h: 2 }} />
          <CustomTrigger data-grid={{ x: 3, y: 0, w: 1, h: 2 }}></CustomTrigger>
        </ActionContainer>
      </DataViewLayout>
      <div className="w-[1000px] border-1 border-black">
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
                500,
              ),
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
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
