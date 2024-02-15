import { Input, Modal, Switch } from "antd";
import { useState } from "react";

interface ModalProps {
  isModalOpen: boolean;
  onClose: Function;
  onOk: Function;
}

export const AddColumnModal = (props: ModalProps) => {
  const { isModalOpen, onClose, onOk } = props;

  const [columnConfig, setColumnConfig] = useState({});

  const handleOk = () => {
    onOk(columnConfig);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        title="Column config"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="columnConfigForm">
          <Input
            onChange={(e) =>
              setColumnConfig({
                ...columnConfig,
                title: e.target.value,
                dataIndex: e.target.value.trim().toLowerCase()
              })
            }
            placeholder="Column name"
          />
          <Switch
            style={{ width: "fit-content" }}
            checkedChildren="Edit"
            unCheckedChildren="Edit"
            onChange={(value) =>
              setColumnConfig({ ...columnConfig, editable: value })
            }
          />
        </div>
      </Modal>
    </>
  );
};
