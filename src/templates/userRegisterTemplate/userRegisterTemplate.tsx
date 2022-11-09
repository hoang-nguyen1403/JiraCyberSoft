import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Register from "../../pages/Register/Register";


const { Header, Footer, Sider, Content } = Layout;

type Props = {};

export default function UserRegisterTemplate({}: Props) {
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
      });
    };
  }, []);

  return (
    <>
      <Layout>
        <Sider
          width={width / 2}
          style={{
            height: height,
            backgroundImage: `url(https://picsum.photos/${Math.round(
              width / 2
            )}/${height}`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover cover",
            backgroundPosition: "center center",
          }}
        ></Sider>
        <Content>
          <Register />
        </Content>
      </Layout>
    </>
  );
}
