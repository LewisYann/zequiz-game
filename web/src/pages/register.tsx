import React from "react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { InputField } from "../components/InputField/InputField";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper/Wrapper";


interface IRegisterProps { }

const Register: NextPage<IRegisterProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          lastname: "",
          firstname: ""
        }}
        onSubmit={async (values) => {
          try {
            const response = await register({ input: values });
            const user = response.data?.register;
            if (user?.errors == null && !response.error) {
              toast.success('Successfully, redirecting...')
              router.push(`user/${user?.user?.username}`);
            }
            else {
              const message = user?.errors[0].message.toString()
              toast.error(message || "An error has occured")
            }
          } catch {
            toast.error("Something went wrong, please try again")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              isRequired={true}
            />
            <InputField
              name="firstname"
              placeholder="Your firstname"
              label="Firstname"
              isRequired={true}
            />
            <InputField
              name="lastname"
              placeholder="Your lastname"
              label="Lastname"
              isRequired={true}
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
                isRequired={true}

              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Type your secret password"
                label="Password"
                type="password"
                isRequired={true}
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="blue"
            >
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
