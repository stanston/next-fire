import { useAtomValue } from "jotai";
import { authUser } from "lib/atom";
import { useGetPosts } from "hooks/getPosts";
import { useGetUsers } from "hooks/getUsers";

export const useHome = () => {
  const { data, error, limitPage, setSize, size, isValidating } = useGetPosts();
  const { users } = useGetUsers();

  const auth = useAtomValue(authUser);

  const currentAuth = () => {
    if (auth.uid) {
      return `${auth.displayName}さん、今日のうんこを記録してみよう！`;
    } else {
      return `ログインして今日のうんこを記録してみよう！`;
    }
  };

  // これで、すべてのユーザー数を計算できます
  let totalUsers = 0;
  if (data) {
    for (let i = 0; i < data.length; i++) {
      totalUsers += data[i].length;
    }
  }

  const pooSoft = 0;
  const getImage = (type: number) => {
    if (type === pooSoft) {
      return "/images/soft.webp";
    } else if (type === 1) {
      return "/images/normal.webp";
    } else if (type === 2) {
      return "/images/hard.webp";
    }
  };
  const getLabel = (type: number) => {
    if (type === pooSoft) {
      return "下痢";
    } else if (type === 1) {
      return "フツウ";
    } else if (type === 2) {
      return "カタメ";
    }
  };

  const replaceBr = (comment: string) => {
    return comment.replace(/\n/g, "<br />");
  };

  const isLast = data && data[data.length - 1].length < limitPage;

  const leadMore = () => {
    setSize(size + 1);
  };

  return {
    currentAuth,
    totalUsers,
    error,
    data,
    users,
    getImage,
    getLabel,
    replaceBr,
    isLast,
    isValidating,
    leadMore,
  };
};
