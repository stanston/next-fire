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

  const isLast = data && data[data.length - 1].length < limitPage;

  // これで、すべてのユーザー数を計算できます
  let totalUsers = 0;
  if (data) {
    for (let i = 0; i < data.length; i++) {
      totalUsers += data[i].length;
    }
  }

  const leadMore = () => {
    setSize(size + 1);
  };

  const currentType = (type: number, category: string) => {
    if (type === 0) {
      if (category === "label") {
        return "下痢";
      } else if (category === "image") {
        return "/images/soft.webp";
      }
    } else if (type === 1) {
      if (category === "label") {
        return "フツウ";
      } else if (category === "image") {
        return "/images/normal.webp";
      }
    } else if (type === 2) {
      if (category === "label") {
        return "カタメ";
      } else if (category === "image") {
        return "/images/hard.webp";
      }
    }
  };

  const replaceBr = (comment: string) => {
    return comment.replace(/\n/g, "<br />");
  };

  return {
    currentAuth,
    totalUsers,
    error,
    data,
    users,
    currentType,
    replaceBr,
    isLast,
    isValidating,
    leadMore,
  };
};
