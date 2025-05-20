import { IconLoader } from "@/components/atoms/icon-loader";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { MCTextFiled } from "@/components/atoms/text-field";
import { Separator } from "@/components/atoms/separator";
import {
  MCTooltip,
  MCTooltipContent,
  MCTooltipProvider,
  MCTooltipTrigger,
} from "@/components/molecules/tooltip";
import { Button } from "@/components/atoms/button";
import { MCSkeleton } from "@/components/atoms/skeleton";
import {
  MCSheet,
  MCSheetClose,
  MCSheetContent,
  MCSheetDescription,
  MCSheetFooter,
  MCSheetHeader,
  MCSheetTitle,
  MCSheetTrigger,
} from "@/components/organisms/sheet";
import {
  MCDropdownMenu,
  MCDropdownMenuContent,
  MCDropdownMenuGroup,
  MCDropdownMenuItem,
  MCDropdownMenuLabel,
  MCDropdownMenuPortal,
  MCDropdownMenuSeparator,
  MCDropdownMenuShortcut,
  MCDropdownMenuSub,
  MCDropdownMenuSubContent,
  MCDropdownMenuSubTrigger,
  MCDropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";

function Page() {
  return (
    <>
      <div>Form control component nè</div>
      <MCDropdownMenu>
        <MCDropdownMenuTrigger>
          <Button variant="outline">Open dropdown menu</Button>
        </MCDropdownMenuTrigger>
        <MCDropdownMenuContent className="w-56" side="right">
          <MCDropdownMenuLabel>My Account</MCDropdownMenuLabel>
          <MCDropdownMenuSeparator />
          <MCDropdownMenuGroup>
            <MCDropdownMenuItem>
              Profile
              <MCDropdownMenuShortcut>⇧⌘P</MCDropdownMenuShortcut>
            </MCDropdownMenuItem>
            <MCDropdownMenuItem>
              Billing
              <MCDropdownMenuShortcut>⌘B</MCDropdownMenuShortcut>
            </MCDropdownMenuItem>
            <MCDropdownMenuItem>
              Settings
              <MCDropdownMenuShortcut>⌘S</MCDropdownMenuShortcut>
            </MCDropdownMenuItem>
          </MCDropdownMenuGroup>
          <MCDropdownMenuGroup>
            <MCDropdownMenuItem>Team</MCDropdownMenuItem>
            <MCDropdownMenuSub>
              <MCDropdownMenuSubTrigger>Invite users</MCDropdownMenuSubTrigger>
              <MCDropdownMenuPortal>
                <MCDropdownMenuSubContent>
                  <MCDropdownMenuItem>Email</MCDropdownMenuItem>
                  <MCDropdownMenuItem>Message</MCDropdownMenuItem>
                  <MCDropdownMenuSeparator />
                  <MCDropdownMenuItem>More...</MCDropdownMenuItem>
                </MCDropdownMenuSubContent>
              </MCDropdownMenuPortal>
            </MCDropdownMenuSub>
          </MCDropdownMenuGroup>
        </MCDropdownMenuContent>
      </MCDropdownMenu>
      <div className="h-8 w-full"></div>

      <MCSheet>
        <MCSheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </MCSheetTrigger>
        <MCSheetContent>
          <MCSheetHeader>
            <MCSheetTitle>Edit profile</MCSheetTitle>
            <MCSheetDescription>
              Make changes to your profile here. Click save when you're done.
            </MCSheetDescription>
          </MCSheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <MCSheetFooter>
            <MCSheetClose asChild>
              <Button type="submit">Save changes</Button>
            </MCSheetClose>
          </MCSheetFooter>
        </MCSheetContent>
      </MCSheet>

      <MCTooltipProvider>
        <MCTooltip>
          <MCTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </MCTooltipTrigger>
          <MCTooltipContent side="top">
            <p>Add to library</p>
          </MCTooltipContent>
        </MCTooltip>
      </MCTooltipProvider>

      <MCTooltipProvider>
        <MCTooltip>
          <MCTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </MCTooltipTrigger>
          <MCTooltipContent side="bottom">
            <p>Add to library</p>
          </MCTooltipContent>
        </MCTooltip>
      </MCTooltipProvider>

      <MCTooltipProvider>
        <MCTooltip>
          <MCTooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </MCTooltipTrigger>
          <MCTooltipContent side="right">
            <p>Add to library</p>
          </MCTooltipContent>
        </MCTooltip>
      </MCTooltipProvider>

      <div className="h-8"></div>

      <div className="flex items-center space-x-4">
        <MCSkeleton className="h-48 w-48 rounded-full" />
        <div className="space-y-2">
          <MCSkeleton className="h-24 w-[250px]" />
          <MCSkeleton className="h-24 w-[200px]" />
        </div>
      </div>

      <div className="h-8"></div>

      <Input>{/* <span>123</span> */}</Input>
      <Input disabled prefix="123" />

      <div className="h-8"></div>

      <div className="flex w-[300px] flex-col gap-8 px-8">
        <MCTextFiled
          prefix={
            <div className="">
              <IconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <IconLoader name="command" />
            </div>
          }
          placeholder="Search"
        />
        <MCTextFiled
          prefix={
            <div className="">
              <IconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <IconLoader name="command" />
            </div>
          }
          placeholder="Search"
          disabled
        />

        <MCTextFiled
          prefix={
            <div className="">
              <IconLoader name="search" />
            </div>
          }
          postfix={
            <div className="">
              <IconLoader name="command" />
            </div>
          }
          addonAfter={
            <div className="rounded-r-8 bg-secondary-blue h-full px-4">
              Search
            </div>
          }
          placeholder="Search"
        />
      </div>

      <Label>Label</Label>
      <Separator />
    </>
  );
}

export default Page;
