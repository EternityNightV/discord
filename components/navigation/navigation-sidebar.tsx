import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../theme-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const NavigationSidebar = async () => {

    const profile = await currentProfile();

    if(!profile) {
        return redirect("/")
    }

    const servers = await db.server.findMany({
        where : {
            members : {
                some : {
                    profileId : profile.id
                }
            }
        }
    })

    return ( 
        <div className="space-y-4 flex flex-col h-full text-primary w-full dark:bg-[#1E1F22] py-3">
          <NavigationAction/>
          <Separator
            className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
          />
          <ScrollArea className="flex-1 w-full">
            {servers.map((server) => (
                <div key={server.id} className="mb-4">
                  <NavigationItem
                    id={server.id}
                    name={server.name}
                    imageUrl={server.imageUrl}
                  />
                </div>
            ))}
          </ScrollArea>
          <div className="pb-3 mt-auto flex items-center flex-col gap-y-3">
            <ModeToggle/>
            <Avatar className="h-[48px] w-[48px]">
              <AvatarImage src="/logo.jpg"/>
              <AvatarFallback>@</AvatarFallback>
            </Avatar>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements : {
                    avatarBox : "h-[48px] w-[48px]"
                }
              }}
            />
          </div>
        </div>
     );
}
 
export default NavigationSidebar;