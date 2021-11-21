import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Loading from "components/common/components/Loading";
import useSocial from "hooks/SocialHook";
import React, { FC, useCallback, useEffect, useState, ChangeEvent } from "react";
import { Author } from "shared/interfaces";
import Modal from "../common/components/Modal";

interface IProps {
  open: boolean;
  onClose: () => void;
  onShare: (friends: Author[]) => Promise<void>;
}

const ShareModal: FC<IProps> = (props) => {
  const { open, onClose, onShare } = props;
  const { friends } = useSocial();

  const [selectedFriends, setSelectedFriends] = useState<Author[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedFriends([]);
    }
  }, [open]);

  const handleShare = useCallback(async () => {
    onShare(selectedFriends);
  }, [onShare, selectedFriends]);

  const handleSelectFriend = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const id = e.target.value;
      if (friends) {
        const friend = friends.find((f) => f.id === id);
        if (friend) {
          const isSelected = !!selectedFriends.find((f) => f.id === id);
          const newFriends = isSelected ? selectedFriends.filter((f) => f.id !== id) : [...selectedFriends, friend];
          setSelectedFriends(newFriends);
        }
      }
    },
    [friends, selectedFriends]
  );

  return (
    <Modal
      title="Share Post"
      open={open}
      onClose={onClose}
      actionOption={{ onClick: handleShare, onSuccess: onClose, text: "Share" }}
    >
      <div>
        {friends ? (
          <FormGroup>
            {friends.map((friend) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleSelectFriend}
                    value={friend.id}
                    checked={!!selectedFriends.find((f) => f.id === friend.id)}
                  />
                }
                key={friend.id}
                label={friend.displayName}
              />
            ))}
          </FormGroup>
        ) : (
          <Loading />
        )}
      </div>
    </Modal>
  );
};

export default ShareModal;
