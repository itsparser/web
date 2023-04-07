import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  PlayCircleOutlined,
  ExperimentOutlined,
  GroupOutlined,
  DatabaseOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import "../layout.css";
import { useNavigate, useParams } from "react-router-dom";

const { Content, Sider } = Layout;

export function AppLayout() {
  const navigate = useNavigate();

  const menuItems: MenuProps["items"] = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined /> },
    { key: "actiongroup", label: "Action Group", icon: <GroupOutlined /> },
    { key: "testsuite", label: "Test Suite", icon: <PlayCircleOutlined /> },
    { key: "testcase", label: "Test Case", icon: <ExperimentOutlined /> },
    { key: "datatable", label: "Data table", icon: <DatabaseOutlined /> }
  ];
  const { id } = useParams();

  return (
    <Layout>
      <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          defaultOpenKeys={["dashboard"]}
          style={{ height: "100%", borderRight: 0 }}
          items={menuItems.map((menu: any) => {
            return { ...menu, onClick: () => navigate(`${id}/${menu.key}`) };
          })}
        />
      </Sider>
      <Content>
        <div className="layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
