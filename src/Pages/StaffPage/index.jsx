import React from "react";
import Staffs from "../../components/staffs";
import Layout from "../../container/Layout";

export default function StaffPage() {
  return (
    <Layout>
    
      <div style={{ marginTop: "50px", marginBottom: '15%' }} className="">
        <Staffs />
      </div>
    </Layout>
  );
}
