import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

interface ActionConfig {
  name: string;
  implementation: string;
}

interface ProviderPropConfig {
  name: string;
}

interface ContextConfig {
  contextName: string;
  typesImportPath: string;
  componentPath: string; // Đường dẫn đến thư mục component mục tiêu
  initialState?: string;
  actions: ActionConfig[];
  actionsDependencies?: string;
  providerProps?: ProviderPropConfig[];
  hasTanstackTableImport?: boolean;
}

function generateContextCode(config: ContextConfig): void {
  const templateDir = path.join(__dirname, 'templates');
  const contextTemplatePath = path.join(templateDir, 'context.hbs');
  const providerTemplatePath = path.join(templateDir, 'provider.hbs');

  const contextTemplateSource = fs.readFileSync(contextTemplatePath, 'utf8');
  const providerTemplateSource = fs.readFileSync(providerTemplatePath, 'utf8');

  const contextTemplate = Handlebars.compile(contextTemplateSource);
  const providerTemplate = Handlebars.compile(providerTemplateSource);

  const generatedContextCode = contextTemplate({
    ...config,
    stateType: `${config.contextName}State`,
    actionsType: `${config.contextName}Actions`,
    contextValueType: `${config.contextName}ContextValue`,
  });

  const generatedProviderCode = providerTemplate({
    ...config,
    stateType: `${config.contextName}State`,
    actionsType: `${config.contextName}Actions`,
    contextValueType: `${config.contextName}ContextValue`,
  });

  const outputDir = path.resolve(__dirname, '..', '..', config.componentPath); // Sử dụng đường dẫn componentPath
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const contextOutputPath = path.join(outputDir, `${config.contextName}Context.ts`);
  const providerOutputPath = path.join(outputDir, `${config.contextName}Provider.tsx`);

  fs.writeFileSync(contextOutputPath, generatedContextCode);
  fs.writeFileSync(providerOutputPath, generatedProviderCode);

  console.log(`${config.contextName}Context generated successfully at ${contextOutputPath}`);
  console.log(`${config.contextName}Provider generated successfully at ${providerOutputPath}`);
}

// Ví dụ cấu hình để tạo DataGridContext (điều chỉnh componentPath)
const dataGridConfig: ContextConfig = {
  contextName: 'DataGrid',
  typesImportPath: '../types', // Adjust the import path based on your project structure
  componentPath: 'src/components/DataGrid', // Đường dẫn đến thư mục component DataGrid
  initialState: '{ currentPage: 1, pageSize: 10 }',
  actions: [
    {
      name: 'initialTableInstance',
      implementation: '(table: Table<TData>) => {\n          setState((prevState) => ({ ...prevState, tableInstance: table })); // Use functional update\n        }',
    },
    {
      name: 'patchColumnHeaders',
      implementation: '(columnHeaders: Record<string, string>) => {\n          setState((prevState) => ({ ...prevState, columnHeaders }));\n        }',
    },
    {
      name: 'setCurrentPage',
      implementation: '(page: number) => {\n          setState((prevState) => ({ ...prevState, currentPage: page }));\n        }',
    },
    // Thêm các action khác của bạn
  ],
  actionsDependencies: '[]', // Add dependencies for actions if needed
  providerProps: [], // Add specific props for the provider if needed
  hasTanstackTableImport: true,
};

generateContextCode(dataGridConfig);

// Bạn có thể thêm cấu hình khác để sinh ra context cho các component khác ở đây
// ví dụ:
// const userAuthComponentPath = 'src/components/Auth';
// const userAuthConfig: ContextConfig = {
//   contextName: 'UserAuth',
//   typesImportPath: '../types/auth',
//   componentPath: userAuthComponentPath,
//   initialState: '{ isAuthenticated: false, user: null }',
//   actions: [
//     {
//       name: 'login',
//       implementation: '(credentials: any) => { /* ... logic ... */ setState(prevState => ({ ...prevState, isAuthenticated: true, user: /* ... */ })); }',
//     },
//     // ...
//   ],
//   actionsDependencies: '[]',
//   providerProps: [],
// };
// generateContextCode(userAuthConfig);