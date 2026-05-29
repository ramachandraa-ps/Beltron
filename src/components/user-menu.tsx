import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Link } from "react-router-dom";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useLang } from "@/lib/language-context.tsx";
import { User, LogOut, ShieldAlert, Ticket } from "lucide-react";
import { useAuth } from "@/hooks/use-auth.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

function UserAvatar() {
  const currentUser = useQuery(api.users.getCurrentUser, {});

  if (currentUser === undefined) {
    return <Skeleton className="w-8 h-8 rounded-full" />;
  }

  const initials = (currentUser?.name ?? "U").charAt(0).toUpperCase();

  return (
    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
      {initials}
    </div>
  );
}

function AuthenticatedMenu() {
  const { lang } = useLang();
  const { signout } = useAuth();
  const currentUser = useQuery(api.users.getCurrentUser, {});

  const handleSignOut = async () => {
    try {
      await signout();
    } catch {
      // Handled by auth library
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium truncate">{currentUser?.name ?? "User"}</p>
          <p className="text-xs text-muted-foreground truncate">{currentUser?.email ?? ""}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {lang === "hi" ? "प्रोफ़ाइल" : "My Profile"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/grievances" className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            {lang === "hi" ? "शिकायतें" : "Grievances"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/employee-requests" className="flex items-center gap-2">
            <Ticket className="w-4 h-4" />
            {lang === "hi" ? "अनुरोध" : "Requests"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          {lang === "hi" ? "साइन आउट" : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function UserMenu() {
  const { lang } = useLang();

  return (
    <>
      <AuthLoading>
        <Skeleton className="w-8 h-8 rounded-full" />
      </AuthLoading>
      <Unauthenticated>
        <SignInButton
          size="sm"
          signInText={lang === "hi" ? "साइन इन" : "Sign In"}
        />
      </Unauthenticated>
      <Authenticated>
        <AuthenticatedMenu />
      </Authenticated>
    </>
  );
}
