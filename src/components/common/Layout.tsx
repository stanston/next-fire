import { Container } from "@chakra-ui/react";
import Header from "components/common/Header";
import Nav from "components/common/Nav";
// import Post from "components/common/Post";
import Footer from "components/common/Footer";
import Login from "components/common/Login";
import Drawer from "components/common/Drawer";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Header />
      <Nav />
      <Container
        as="main"
        bgColor="white"
        py="20"
        // px={[4, 8]}
        px={{ base: "4", md: "8" }}
        maxW="960px"
        minHeight="calc(100vh - 40px)" // footerの高さを引く
      >
        {props.children}
      </Container>
      {/* <Post /> */}
      <Footer />
      <Login />
      <Drawer />
    </>
  );
}
