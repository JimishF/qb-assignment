import React, { useState } from "react";
import {
  Dialog,
  Avatar,
  Box,
  DialogTitle,
  DialogContent,
  Typography,
  Slider,
  DialogActions,
  Button,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { User } from "../../redux/models/User";

interface Props {
  selectedUsers: User[];
  open: boolean;
  onClose: (event: {}, reason: string) => any;
}

const AwardDialog: React.FC<Props> = ({
  selectedUsers,
  open,
  onClose,
}: Props) => {
  const max = 30;
  const [points, setPoints] = useState<number | number[]>(max);
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPoints(newValue);
  };
  const rewardPoints = (event: any) => {
    // TODO: award points to selected users
    handleClose();
  };

  const handleClose = (event?: any) => {
    onClose(event, "close");
  };
  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>
        Award Loyalty Points
        <span>
          {selectedUsers.length > 1 ? ` (${selectedUsers.length} Users)` : null}
        </span>
      </DialogTitle>
      <DialogContent>
        <AvatarGroup max={5}>
          {selectedUsers &&
            selectedUsers.map((user, index) => (
              <Avatar
                key={index}
                alt="User"
                src={`https://i.pravatar.cc/50?${index}`}
              />
            ))}
        </AvatarGroup>
        <Box my={2}>
          <Typography id="discrete-slider-always" gutterBottom>
            Select Points
          </Typography>
          <Slider
            value={points}
            max={max}
            onChange={handleSliderChange}
            valueLabelDisplay="on"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={rewardPoints}>Reward Points</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AwardDialog;
