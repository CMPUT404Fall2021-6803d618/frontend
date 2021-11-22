import React, {
  FC,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { Post } from "shared/interfaces";
import Modal from "../common/components/Modal";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: 400px;
`;

const TextArea = styled.textarea`
  flex: 1;
  resize: none;
`;

interface IProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (content: string) => Promise<void>;
  onUpdateSuccess: (content: string) => void;
  post: Post | null;
}

const EditPostModal: FC<IProps> = (props) => {
  const { open, onClose, onUpdate, onUpdateSuccess, post } = props;
  const [value, setValue] = useState<string>(post?.content ?? "");

  useEffect(() => {
    setValue(post?.content ?? "");
  }, [post?.content]);

  const handleValueChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.currentTarget.value);
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    try {
      await onUpdate(value);
    } catch (err) {
      alert((err as Error).message);
    }
  }, [onUpdate, value]);

  const handleUpdateSuccess = useCallback(() => {
    onUpdateSuccess(value);
    setValue("");
  }, [onUpdateSuccess, value]);

  return (
    <Modal
      title="Edit Post"
      open={open}
      onClose={onClose}
      actionOption={{
        onClick: handleUpdate,
        onSuccess: handleUpdateSuccess,
        text: "Update",
      }}
    >
      <Container>
        <TextArea value={value} onChange={handleValueChange} />
      </Container>
    </Modal>
  );
};

export default EditPostModal;
