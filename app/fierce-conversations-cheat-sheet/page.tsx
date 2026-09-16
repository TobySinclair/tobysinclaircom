import type { Metadata } from "next";
import { CheatSheetPage, cheatSheetMetadata } from "@/components/cheat-sheet-page";

export const metadata: Metadata = cheatSheetMetadata("fierce-conversations-cheat-sheet");

export default function FierceConversationsCheatSheetPage() {
  return <CheatSheetPage slug="fierce-conversations-cheat-sheet" />;
}
