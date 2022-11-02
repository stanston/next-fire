import { rest } from "msw";
import { Book } from "./types";

export const handlers = [
  rest.post("/login", (_req, res, ctx) => {
    // 実際にはなんらかの認証情報を持っている想定
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      ctx.status(200),
      ctx.json({
        message: "ログインしました",
        user: {
          id: 1,
          name: "認証ユーザー",
        },
      })
    );
  }),
  rest.post("/logout", (_req, res, ctx) => {
    // 実際にはなんらかの認証情報を持っている想定
    sessionStorage.removeItem("is-authenticated");
    return res(
      ctx.status(200),
      ctx.json({
        message: "ログアウトしました",
      })
    );
  }),
  rest.get("/books", (_req, res, ctx) => {
    return res(
      ctx.json<Book[]>([
        {
          title: "100万回生きたねこ",
          description:
            "輪廻転生を繰り返している一匹の猫が、やがて運命の相手と出会ったことで愛や悲しみを知っていく様を描いた、哲学的な養素を含んだ作品。",
        },
        {
          title: "ライ麦畑でつかまえて",
        },
      ])
    );
  }),
  rest.post("/post", async (req, res, ctx) => {
    const values = await req.json();

    // 実際にはなんらかの認証情報を持っている想定
    const isAuthenticated = sessionStorage.getItem("is-authenticated");
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          message: "ログインしてください",
        })
      );
    }

    if (!values.title) {
      return res(
        ctx.status(400),
        ctx.json({
          message: "タイトルは必須項目です",
        })
      );
    }

    return res(ctx.json<any>(values));
  }),
];
