import { atom } from "recoil";

export const houseState = atom({
  key: "housesAtom",
  default: [],
});

export const markerState = atom({
  key: "markerAtom",
  default: "",
});
