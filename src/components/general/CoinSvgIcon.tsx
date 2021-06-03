import React from "react";
import { SvgIcon } from "@material-ui/core";
import { ReactComponent as CoinIcon } from "../../icons/coin.svg";

interface Props {
  height?: string | number;
  width?: string | number;
}
const CoinSvgIcon = ({ height = 25, width = 25 }: Props) => {
  return (
    <SvgIcon
      style={{ height, width }}
      component={CoinIcon}
      viewBox="0 0 350 350"
    />
  );
};

export default CoinSvgIcon;
