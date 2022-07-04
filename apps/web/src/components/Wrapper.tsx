import { FC } from "react";
import { Box } from "@chakra-ui/react";

interface IWrapperProps {
  variant?: "small" | "regular" | "";
}

export const Wrapper: FC<IWrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="full"
    >
      {children}
    </Box>
  );
};
