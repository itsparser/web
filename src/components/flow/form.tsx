import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "orca/components/ui/select";
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
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
