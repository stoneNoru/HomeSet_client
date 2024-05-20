import { atom } from "recoil";

export const houseState = atom({
  key: "housesAtom",
  default: [],
});

export const markerState = atom({
  key: "markerAtom",
  default: "",
});

export const typedState = atom({
  key: "textAtom",
  default: "",
});
