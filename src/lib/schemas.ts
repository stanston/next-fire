import * as yup from "yup";
import { useGetUserIds } from "hooks/getUserIds";

declare module "yup" {
  interface StringSchema {
    // katakana(this: StringSchema): StringSchema;
    unique(this: StringSchema, lists: string[], massage?: string): StringSchema;
  }
  interface BaseSchema {
    fileSize(this: BaseSchema, massage?: string): BaseSchema;
    fileFormat(this: BaseSchema, massage?: string): BaseSchema;
  }
}

// yup.addMethod(yup.string, "katakana", function () {
//   return this.test(
//     "katakana",
//     "カタカナで入力してください。",
//     function (value): any {
//       if (value == null || value === "") return true;
//       return value.match(/^[ァ-ヶー　 ]+$/);
//     }
//   );
// });

yup.addMethod(
  yup.string,
  "unique",
  function (lists, message = "${path}は存在します。") {
    return this.test(
      "unique",
      message,
      (value: string | undefined) => !lists || !lists.includes(value)
    );
  }
);

// const FILE_SIZE = 160 * 1024;
const FILE_SIZE = 1000000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

yup.addMethod(
  yup.mixed,
  "fileSize",
  function (
    message = `画像のファイルサイズは${FILE_SIZE / 1000000}MBまでです。`
  ) {
    return this.test(
      "fileSize",
      message,
      (value) => !value[0] || value[0].size <= FILE_SIZE
    );
  }
);

yup.addMethod(
  yup.mixed,
  "fileFormat",
  function (message = `画像のファイルタイプは${SUPPORTED_FORMATS}です。`) {
    return this.test(
      "fileFormat",
      message,
      (value) => !value[0] || SUPPORTED_FORMATS.includes(value[0].type)
    );
  }
);

export const schemaLogin = yup.object({
  email: yup
    .string()
    .required("メールアドレスは必須項目です。")
    .email("メールアドレスの形式で入力してください。"),
  password: yup
    .string()
    .required("パスワードは必須項目です。")
    .min(8, "パスワードは8文字以上で入力してください。")
    .max(20, "パスワードは20文字以下で入力してください。"),
});

export const schemaSignin = yup.object({
  name: yup
    .string()
    .required("ニックネームは必須項目です。")
    .max(20, "ニックネームは20文字以下で入力してください。"),
  email: yup
    .string()
    .required("メールアドレスは必須項目です。")
    .email("メールアドレスの形式で入力してください。"),
  password: yup
    .string()
    .required("パスワードは必須項目です。")
    // .matches(/(?=.*[a-z])/, "小文字を含めてください。")
    // .matches(/(?=.*[A-Z])/, "大文字を含めてください。")
    // .matches(/(?=.*[0-9])/, "数字を含めてください。")
    .min(8, "パスワードは8文字以上で入力してください。")
    .max(20, "パスワードは20文字以下で入力してください。"),
  confirm: yup
    .string()
    .required("パスワードの確認は必須項目です。")
    .oneOf([yup.ref("password")], "パスワードとおなじ値を入力してください。"),
});

export const useSchemaEdit = () => {
  const { ids } = useGetUserIds();
  return yup.object({
    name: yup
      .string()
      .required("ニックネームは必須項目です。")
      .max(20, "ニックネームは20文字以下で入力してください。"),
    id: yup
      .string()
      // .matches(/^[0-9a-zA-Z]+$/, "ユーザーIDは半額英数字のみ入力できます。")
      .matches(/^[a-zA-Z0-9]*$/, "ユーザーIDは半額英数字のみ入力できます。")
      .min(4, "ユーザーIDは4文字以上で入力してください。")
      .max(30, "ユーザーIDは30文字以下で入力してください。")
      .unique(ids, "ユーザーIDは存在します。"),
    image: yup.mixed().fileSize().fileFormat(),
  });
};

export const schemaPost = yup.object({
  type: yup.string().required("種類は必須項目です。"),
  comment: yup.string().max(140, "コメントは140文字以下で入力してください。"),
});
