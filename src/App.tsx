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
  CustomTrigger,
} from "@/components/templates/data-view-layout";
import { ButtonDialogCommand } from "./components/molecules/button-dialog/types";
import {
  EdgePanel,
  EdgePanelTrigger,
  EdgePanelContent,
  EdgePanelTitle,
  EdgePanelFooter,
} from "@/components/molecules/edge-pannel";
import {
  ColDef,
  DataGrid,
  GroupColDef,
} from "./components/organisms/data-grid2";
import { faker } from "@faker-js/faker";
import { MultiSelect } from "./components/molecules/multi-select";

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

function mockData(size: number): Person[] {
  const data: Person[] = [];
  const statusOptions = ["relationship", "complicated", "single"];

  for (let i = 0; i < size; i++) {
    data.push({
      id: faker.database.mongodbObjectId(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 80 }),
      visits: faker.number.int({ min: 0, max: 100 }),
      status: faker.helpers.arrayElement(statusOptions),
      progress: faker.number.int({ min: 0, max: 100 }),
    });
  }

  return data;
}

const defaultData: Person[] = mockData(1000);

const columns: (ColDef<Person> | GroupColDef<Person>)[] = [
  {
    headerName: "hehe",
    groupId: "hehe",
    columns: [
      {
        headerName: "Name",
        groupId: "name",
        columns: [
          {
            headerName: "First name",
            field: "firstName",
            size: 200
          },
          {
            headerName: "Last Name",
            field: "lastName",
            size: 200
          },
        ],
      },
      {
        headerName: "Info",
        groupId: "info",
        columns: [
          {
            headerName: "Age",
            field: "age",
          },
          {
            headerName: "Status",
            field: "status",
          },
          {
            headerName: "Progress",
            field: "progress",
          },
          {
            headerName: "Visits",
            field: "visits",
          },
        ],
      },
    ],
  },
];

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
  const { formRef, resetForm, submitForm, validateForm, getFieldsError } =
    useFormController();
   return (
    <>
      <MultiSelect
        initialOptions={mockData(40)}
        mode="client"
        getLabel={(option) => option.firstName + " " + option.lastName}
        maxCount={7}
        isDisabled={(option) => option.age < 30}
      ></MultiSelect>
      <DataGrid columnDefs={columns} data={defaultData} />

      <EdgePanel>
        <EdgePanelTrigger>open</EdgePanelTrigger>
        <EdgePanelContent>
          <EdgePanelTitle>Create new user</EdgePanelTitle>
          <div className="h-[100px] w-[800px] overflow-auto border-1 border-red-200">
            he heh he
          </div>
          <EdgePanelFooter>Footer</EdgePanelFooter>
        </EdgePanelContent>
      </EdgePanel>

      <DataViewLayout
        additionalEventBindings={{
          E_C_ADD: () => {
            console.log("event E_C_ADD");
          },
          E_C_EXPORT: async (params: unknown) => {
            const { setIsLoading } = params as {
              setIsLoading: (isLoading: boolean) => void;
            };
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
            console.log("event E_C_EXPORT", params);
          },
          E_C_DELETE: async (params: unknown) => {
            const { setIsOpen, command, setIsLoading } =
              params as ButtonDialogCommand;

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
          },
          E_C_CREATE: async (params: unknown) => {
            const { command, setIsLoading, setIsOpen } =
              params as ButtonDialogCommand;

            if (command === "reset") {
              console.log("event E_C_CREATE reset");
              resetForm();
            }
            if (command === "cancel") {
              console.log("event E_C_CREATE cancel");
              setIsOpen?.(false);
            }
            if (command === "submit") {
              setIsLoading?.(true);
              console.log("event E_C_CREATE submit");
              await submitForm();

              // if (Object.keys(getFieldsError()).length <= 0) {
              //   setIsOpen?.(false);
              // }
              setIsLoading?.(false);
            }
          },
        }}
      >
        <FilterContainer>
          <div>FilterContainer</div>
        </FilterContainer>
        <ActionContainer>
          <ButtonTrigger
            className="bg-secondary-indigo"
            variant="filled"
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
              {
                label: "Cancel",
                command: "cancel",
                variant: "outline",
                className: "",
              },
              {
                label: "Submit",
                command: "submit",
                variant: "default",
                className: "bg-black-100 text-white-100",
              },
            ]}
            data-grid={{ x: 1, y: 0, w: 1, h: 2 }}
          >
            <div className="typography-regular-14">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              quia eos quas at adipisci impedit, iste numquam sit. Sit tempore
              dicta sequi ratione nesciunt natus aspernatur minima libero,
              accusamus similique!
            </div>
          </DialogTrigger>
          <DialogTrigger
            label="Create"
            title="Create new data"
            triggerClassName="bg-secondary-green"
            eventName="E_C_CREATE"
            footerButtons={[
              {
                label: "Cancel",
                command: "cancel",
                variant: "outline",
                className: "",
              },
              { label: "Reset", command: "reset", className: "" },
              {
                label: "Submit",
                command: "submit",
                variant: "filled",
                className: "bg-black-100 text-white-100",
              },
            ]}
            data-grid={{ x: 2, y: 0, w: 1, h: 2 }}
          >
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
                <Input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full"
                />
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
                <Input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full"
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
                <Input
                  type="password"
                  placeholder="Enter your username"
                  className="w-full"
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
                <Input
                  type="text"
                  placeholder="description"
                  className="w-full"
                />
              </FieldController>
            </FormContainer>
          </DialogTrigger>
          <CustomTrigger data-grid={{ x: 3, y: 0, w: 1, h: 2 }}></CustomTrigger>
        </ActionContainer>
      </DataViewLayout>
      {/* <div className="w-[1000px] border-1 border-black">
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
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            <Input
              type="text"
              placeholder="description"
              className=""
            />
          </FieldController>
        </FormContainer>
        <button onClick={submitForm}>Submit</button>
        <button onClick={resetForm}>reset</button>
        <button onClick={validateForm}>validate</button>
      </div> */}
    </>
  );
}

export default App;
