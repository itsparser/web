import { PlusOutlined } from "@ant-design/icons";
import { Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CreateModal } from "components/create_modal";
import { PageHeader } from "components/page_header";
import { Button } from "orca/components/ui/button";
import { Input } from "orca/components/ui/input";
import { Label } from "orca/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "orca/components/ui/popover";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "service";
import { Endpoint } from "service/endpoint";
// import { Button } from "@material-tailwind/react";

interface DataType {
  key: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export const TestSuiteDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([] as any);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Button onClick={() => onHandleClick(record)}>{text}</Button>
      )
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Space size="middle">
            <Button onClick={() => onHandleClick(record)}>Edit</Button>
            <Popconfirm
              title="Delete the Test Suite"
              description="Are you sure to delete this Test Suite?"
              onConfirm={() => onDeleteTestSuite(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  const { appId = "" } = useParams();

  /**
   * fetchTestSuites - fetch all Action group from the specify Application
   */
  const fetchTestSuites = async () => {
    await Service.get(`${Endpoint.v1.suite.list(appId)}`)
      .then((testSuits) => {
        setDataSource(testSuits);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchTestSuites();
  }, []);

  /**
   * onHandleClick - Handle the Action redirect
   * @param record
   */
  const onHandleClick = (record: any) => {
    navigate(record.id);
  };

  /**
   * onAddNewSuite - will create new Test Suite and
   * Update the existing grid of all the Test Suite
   * @param data
   */
  const onAddNewSuite = async (data: any) => {
    let payload = { ...data, app_id: appId };
    await Service.post(`${Endpoint.v1.suite.create(appId)}`, {
      body: payload
    })
      .then(() => {
        fetchTestSuites();
      })
      .finally(() => {});
  };

  /**
   * onDeleteTestSuit - Delete the Action Group with a confirmation
   * @param suiteId
   */
  const onDeleteTestSuite = async (suiteId: any) => {
    await Service.delete(`${Endpoint.v1.suite.delete(appId, suiteId)}`)
      .then(() => {
        fetchTestSuites();
      })
      .finally(() => {});
  };

  return (
    <>
      <PageHeader
        title="Test Suite"
        extra={[
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <PlusOutlined /> New
          </Button>,
          <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>
              <div className="newForm">
                <Label htmlFor="nameOfSuit">Name of Suit</Label>
                <Input id="nameOfSuit" type="text" />
                <Label htmlFor="desc">Description</Label>
                <Input id="desc" type="text" placeholder="Description" />
              </div>
            </PopoverContent>
          </Popover>
        ]}
      />
      <Table columns={columns} dataSource={dataSource} rowKey="name" />
      <div>
        {isCreateModalOpen && (
          <CreateModal
            isModalOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onOk={onAddNewSuite}
            isLoading={false}
            modelFor={"Test Suite"}
          />
        )}
      </div>
    </>
  );
};
