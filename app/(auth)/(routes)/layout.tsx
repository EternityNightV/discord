import { Avatar, AvatarImage } from "@/components/ui/avatar"

const AuthLayOut = (
    {children}: { children : React.ReactNode }
) => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/logo.jpg"/>
          </Avatar>
          {children}
        </div>
    )
}

export default AuthLayOut