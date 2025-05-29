import { ECFormContainer, ECFormContainerProvider } from "@/components/organisms/form";

function Page() {
  return <div>
    <ECFormContainerProvider>
      <ECFormContainer>1</ECFormContainer>
    </ECFormContainerProvider>
  </div>;
}

export default Page;
