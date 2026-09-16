import type { Metadata } from "next";
import { CheatSheetPage, cheatSheetMetadata } from "@/components/cheat-sheet-page";

export const metadata: Metadata = cheatSheetMetadata("crucial-conversations-cheat-sheet");

export default function CrucialConversationsCheatSheetPage() {
  return <CheatSheetPage slug="crucial-conversations-cheat-sheet" />;
}
