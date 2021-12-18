import React, { memo } from "react";
import Layout from "@theme/Layout";

const HelloReact = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "20px",
        }}
      >
        <p>
          Edit <code>pages/helloReact.tsx</code> and save to reload
        </p>
      </div>
    </Layout>
  );
};

export default memo(HelloReact);
