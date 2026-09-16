import type { Metadata } from "next";
import { CheatSheetPage, cheatSheetMetadata } from "@/components/cheat-sheet-page";

export const metadata: Metadata = cheatSheetMetadata("never-split-the-difference-cheat-sheet");

export default function NeverSplitCheatSheetRoute() {
  return <CheatSheetPage slug="never-split-the-difference-cheat-sheet" />;
}
