import { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Box, Button } from "@chakra-ui/react";

export const AuthLogin = () => {
  const [isAuth, setIsAuth] = useState<any>();

  useEffect(() => {
    // 実際にはなんらかの認証情報を持っている想定
    setIsAuth(sessionStorage.getItem("is-authenticated"));
  }, []);

  const login = () => {
    axios.post("/login").then((res) => {
      // 実際にはなんらかの認証情報を持っている想定
      setIsAuth(res.data.user);
      console.log(res);
      alert(res.data.message);
    });
  };

  return (
    <Stack align="start" spacing="2">
      <Box fontSize="sm" fontWeight="bold">
        {isAuth ? `認証ユーザー` : `ゲストユーザー`}
      </Box>
      <Button colorScheme="cyan" color="white" onClick={login}>
        ログイン
      </Button>
    </Stack>
  );
};
