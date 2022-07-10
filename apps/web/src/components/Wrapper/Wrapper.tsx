import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

interface IWrapperProps {
  variant?: "small" | "regular" | "";
}

const Wrapper: FC<IWrapperProps> = ({
  children,
  variant = "regular",
}) => (
  <Box
    mt={8}
    mx="auto"
    maxW={variant === "regular" ? "800px" : "400px"}
    w="full"
  >
    {/*@ts-ignore*/}
    {children}
  </Box>
);

export default Wrapper;
