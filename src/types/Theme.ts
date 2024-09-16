import { NimiThemeType } from "@nimi.io/card/types";

export type NimiCuratedTheme = Exclude<NimiThemeType, NimiThemeType.INFINITE | NimiThemeType.ETH_DENVER_2023>;
export interface ThemeAssets {
    type: NimiThemeType;
    logoImage: string;
    logoText: string;
    preview: string;

};