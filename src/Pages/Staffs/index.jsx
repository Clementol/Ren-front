import React from "react";
import ViewStaffs from "../../Components/ViewStaffs";
import Layout from "../../Components/Layout";

export default function StaffsP() {
  return (
    <Layout>
      <div style={{ marginTop: "50px", marginBottom: "15%" }} className="">
        <ViewStaffs />
      </div>
    </Layout>
  );
}
