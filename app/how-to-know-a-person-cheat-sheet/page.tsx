import type { Metadata } from "next";
import { CheatSheetPage, cheatSheetMetadata } from "@/components/cheat-sheet-page";

export const metadata: Metadata = cheatSheetMetadata("how-to-know-a-person-cheat-sheet");

export default function HowToKnowAPersonCheatSheetPage() {
  return <CheatSheetPage slug="how-to-know-a-person-cheat-sheet" />;
}
