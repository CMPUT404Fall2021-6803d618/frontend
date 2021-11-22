import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Loading from "components/common/components/Loading";
import React, { FC, useCallback, useState, ChangeEvent, useEffect } from "react";
import { Author } from "shared/interfaces";
import Modal from "../common/components/Modal";

interface IProps {
  open: boolean;
  onClose: () => void;
  friends: null | Author[];
  onFriendsSelected: (selected: Author[]) => void;
  currentSelectedFriends: Author[];
}

const FriendsModal: FC<IProps> = (props) => {
  const { open, onClose, friends, onFriendsSelected, currentSelectedFriends } = props;
  const [selectedFriends, setSelectedFriends] = useState<Author[]>([]);

  useEffect(() => {
    if (open) {
      setSelectedFriends(currentSelectedFriends);
    }
  }, [currentSelectedFriends, open]);

  const handleFriendsSelected = useCallback(async () => {
    onFriendsSelected(selectedFriends);
  }, [onFriendsSelected, selectedFriends]);

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
      title="Friends to send this post to"
      open={open}
      onClose={onClose}
      actionOption={{ onClick: handleFriendsSelected, onSuccess: onClose, text: "Select" }}
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

export default FriendsModal;
