import React from "react";
import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useLoginMutation } from "../generated/graphql";
import toast, { Toaster } from "react-hot-toast";

interface IRegisterProps { }

const Login: NextPage<IRegisterProps> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const response = await login(values);
          console.log(values)
          const user = response.data?.login;
          if (user) {
            toast.success('Successfully, redirecting...')
            router.push(`admin/get-started`);
          }
          else {
            toast.error("Something went wrong, please check your credential")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            <Box mt={4}>
              <InputField
                name="username"
                placeholder="Entrer your username"
                label="Username"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Enter your password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
