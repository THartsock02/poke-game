import { Button, ButtonProps } from "@mantine/core";
import React from "react";

// export default function PokeButton({ children }) {
//   return (
//     <Button variant="filled" color="indigo">
//       {children}
//     </Button>
//   );
// }

export interface PokeButtonProps extends ButtonProps {
  onClick?: () => void;
}

const PokeButton: React.FC<PokeButtonProps> = ({
  children,
  ...buttonAttributes
}) => {
  return (
    <Button variant="filled" color="indigo" {...buttonAttributes}>
      {children}
    </Button>
  );
};

export default PokeButton;
