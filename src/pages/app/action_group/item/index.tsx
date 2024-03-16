import { Select as OSelect } from "@/components/select";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";
import {
  ArrowDownTrayIcon,
  CommandLineIcon
} from "@heroicons/react/24/outline";
import { InputGroup } from "components/input";
import { PageHeader } from "components/page_header";
import EditableTable from "components/table/edit";
import { ActionKindV2 } from "constant/action_kind";
import { TargetV2 } from "constant/target";
import { Button as OrcaButton } from "orca/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "orca/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Service } from "service";
import { fetchActions, saveBatch } from "service/app";
import { Endpoint } from "service/endpoint";
import { v4 as uuidv4 } from "uuid";

export const ActionGroup: React.FC = () => {
  const [dataSource, setDataSource] = useState([] as any);
  // const [savedData, setSavedData] = useState({ data_kind: "Static" } as object);
  const { appId = "", actionGroupId = "" } = useParams();

  const addNewRow = async () => {
    let _uuid = uuidv4();
    let dataSourceLength = dataSource.length + 1;
    let action = {
      id: _uuid,
      execution_order: dataSourceLength,
      description: "",
      kind: "Click",
      data_kind: "Static",
      action_group_id: actionGroupId
    };

    await Service.post(`${Endpoint.v1.action.create(appId, actionGroupId)}`, {
      body: action
    })
      .then((_action) => {
        setDataSource([...dataSource, _action]);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchActions(appId, actionGroupId).then((actions) => {
      setDataSource(actions);
    });
  }, []);

  return (
    <div className="h-full">
      <PageHeader
        title={"Action Groups"}
        extra={
          <div className=" flex items-center gap-3">
            <OrcaButton
              className="flex gap-2"
              onClick={() => saveBatch(appId, actionGroupId, dataSource)}
            >
              <ArrowDownTrayIcon className="size-4" /> Save
            </OrcaButton>
          </div>
        }
      />
      <Tabs defaultValue="setup" className="w-full">
        <TabsList>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="run_history">Run History</TabsTrigger>
        </TabsList>
        <TabsContent value="setup">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="run_history">
          Change your Run History here.
        </TabsContent>
      </Tabs>
      <EditableTable
        column={[
          {
            key: "Command",
            label: "Command",
            className: "w-1/6",
            render: (data: any, row: any) => {
              return (
                <OSelect
                  buttonClassName="relative w-full cursor-default bg-transparent py-1.5 pl-3 pr-10 text-left text-gray-900  ring-inset  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  options={ActionKindV2}
                  dataIndex="key"
                  defaultValue={row["kind"]}
                  onSelect={(value: any) => {
                    console.log(value);
                    row["kind"] = value["key"];
                  }}
                  render={(row: any) => {
                    return (
                      <>
                        <CommandLineIcon className="h-5 w-5 text-gray-400"></CommandLineIcon>
                        <span className="ml-3 block truncate">
                          {row["label"]}
                        </span>
                      </>
                    );
                  }}
                ></OSelect>
              );
            }
          },
          {
            key: "kind",
            label: "Kind",
            className: "w-1/6",
            render: (data: any, row: any) => {
              return (
                <OSelect
                  buttonClassName="relative w-full cursor-default bg-transparent py-1.5 pl-3 pr-10 text-left text-gray-900  ring-inset  focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  options={TargetV2}
                  defaultValue={row["target_kind"]}
                  onSelect={(value: any) => {
                    console.log(value);
                    row["target_kind"] = value["key"];
                    console.log(dataSource);
                  }}
                  render={(row: any) => {
                    return (
                      <>
                        {/* <CursorArrowRippleIcon className="h-5 w-5 text-gray-400"></CursorArrowRippleIcon> */}
                        <ArrowsPointingInIcon className="h-5 w-5 text-gray-400"></ArrowsPointingInIcon>
                        <span className="ml-3 block truncate">
                          {row["label"]}
                        </span>
                      </>
                    );
                  }}
                ></OSelect>
              );
            }
          },
          {
            key: "Target",
            label: "Target",
            render: (_, row: any) => {
              return (
                <InputGroup.Text
                  id={`target${row["id"]}`}
                  defaultValue={row["target_value"]}
                  onChange={(value: any) => {
                    console.log(value);
                    row["target_value"] = value;
                    console.log(dataSource);
                  }}
                ></InputGroup.Text>
              );
            }
          },
          {
            key: "Value",
            label: "Value",
            render: (_, row: any) => {
              return (
                <InputGroup.Text
                  id={`value${row["id"]}`}
                  defaultValue={row["data_value"]}
                  onChange={(value: any) => {
                    console.log(value);
                    row["data_value"] = value;
                    console.log(dataSource);
                  }}
                ></InputGroup.Text>
              );
            }
          },
          {
            key: "NewList",
            label: "New List",
            render: (_, row: any) => {
              return (
                <InputGroup.Text
                  id={`value${row["id"]}`}
                  defaultValue={row["data_value"]}
                  onChange={(value: any) => {
                    console.log(value);
                    row["data_value"] = value;
                    console.log(dataSource);
                  }}
                ></InputGroup.Text>
              );
            }
          }
        ]}
        data={dataSource}
        addRow={addNewRow}
      ></EditableTable>
    </div>
  );
};
