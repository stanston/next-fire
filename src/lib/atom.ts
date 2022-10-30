import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

// export const isOpenLoginModalAtom = atom(false);
export const isOpenLoginModal = atom(false);

export const isOpenDrawer = atom(false);

type IsAuthUserType = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  id: string; // 認証データとは分離した、編集可能なユーザー詳細URL用
};

// export const authUser = atom(false);
// export const authUser = atom<any>("");
export const authUser = atomWithReset<IsAuthUserType>({
  uid: "",
  displayName: null,
  photoURL: null,
  id: "",
});
