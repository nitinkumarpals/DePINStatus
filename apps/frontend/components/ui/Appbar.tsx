import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "../ModeToggle";

export function Appbar() {
  return (
    <div className="flex justify-between items-center p-4">
      <div>DePin Status</div>
      <div className="flex gap-4 cursor-pointer">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <ModeToggle />
      </div>
    </div>
  );
}
