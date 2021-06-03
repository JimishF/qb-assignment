import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthUser } from "../../hooks/useAuthUser";
import { BrandUser, User } from "../../redux/models/User";
import {rewardUsers} from '../../redux/actions/index';

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
  const user: BrandUser = useAuthUser();

  const max = user?.maxPoints ?? 100;

  const [points, setPoints] = useState<number | number[]>(0);
  const dispatch = useDispatch();
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPoints(newValue);
  };
  const rewardPoints = (event: any) => {
    dispatch(rewardUsers(selectedUsers, points as number));
    handleClose(event, `${selectedUsers.length} users rewarded ${points}!`);
  };

  const handleClose = (event?: any, reason?:string) => {
    onClose(event, reason || "close");
  };
  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>
        Award Loyalty Points
        <span>
          {selectedUsers.length > 1
            ? ` (${selectedUsers.length} Users)`
            : ` to ${selectedUsers[0]?.firstName} ${selectedUsers[0]?.lastName} `}
        </span>
      </DialogTitle>
      <DialogContent>
        <AvatarGroup max={5}>
          {selectedUsers &&
            selectedUsers.map((user, index) => (
              <Avatar key={index} alt="User" src={user.avatar} />
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
