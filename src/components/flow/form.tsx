import * as Form from "@radix-ui/react-form";
import { useState } from "react";
import { useFlowStore } from "stores/flow.store";
import { shallow } from "zustand/shallow";

export interface WorkflowFormParm {
  title: string;
}

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" }
];

export const WorkflowForm: React.FC<WorkflowFormParm> = ({ title }) => {
  const [selected, setSelected] = useState(people[0]);
  const { nodes, edges, currentNode } = useFlowStore(
    (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      currentNode: state.currentNode
    }),
    shallow
  );

  return (
    <>
      <div className="pl-4 py-4 shadow-md lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
            {currentNode.type_field}
          </h2>
        </div>
      </div>
      <div className="flex ">
        {/* <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select> */}

        <Form.Root className="FormRoot">
          <Form.Field className="FormField" name="actionGroup">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between"
              }}
            >
              <Form.Label className="FormLabel">Action Group</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please Selecte an action group
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="Input" type="email" required />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="email">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between"
              }}
            >
              <Form.Label className="FormLabel">Email</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter your email
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="Input" type="email" required />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="question">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between"
              }}
            >
              <Form.Label className="FormLabel">Question</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a question
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea className="Textarea" required />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button className="Button" style={{ marginTop: 10 }}>
              Post question
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </>
  );
};
