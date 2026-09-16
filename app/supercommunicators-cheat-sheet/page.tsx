import type { Metadata } from "next";
import { CheatSheetPage, cheatSheetMetadata } from "@/components/cheat-sheet-page";

export const metadata: Metadata = cheatSheetMetadata("supercommunicators-cheat-sheet");

export default function SupercommunicatorsCheatSheetPage() {
  return <CheatSheetPage slug="supercommunicators-cheat-sheet" />;
}
