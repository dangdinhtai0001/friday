import { Input } from "@/components/atoms/input";
import { TextFiled } from "@/components/atoms/text-field";

function Page() {
  return (
    <>
      <div>Form control component nè</div>

      <Input>{/* <span>123</span> */}</Input>
      <Input disabled prefix="123" />

      <div className="h-8"></div>

      {/* <TextField className="bg-red-500" addonBefore={<div className="">Before</div>} addonAfter={<div>Before</div>}/>
      <TextField prefix={<div>prefix</div>} postfix={<div>postfix</div>}/>
      <div className="h-4"></div>
      <TextField disabled value={"123"} /> */}
      <div className="flex w-[300px] flex-col gap-8 px-8">
        <TextFiled prefix={<div className="">prefix</div>} />
        <TextFiled postfix={<div className="">postfix</div>} />
        <TextFiled addonBefore={<div className="">before</div>} />
        <TextFiled addonAfter={<div className="">after</div>} />
      </div>

      <div className="flex w-[300px] flex-col gap-8 px-8">
        <TextFiled prefix={<div className="">prefix</div>} />
        <TextFiled postfix={<div className="">postfix</div>} />
        <TextFiled addonBefore={<div className="">before</div>} />
        <TextFiled addonAfter={<div className="">after</div>} />
      </div>
    </>
  );
}

export default Page;
