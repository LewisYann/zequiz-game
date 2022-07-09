import { NextPage } from "next";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

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
            if (user && response.error) {
              toast.success('Successfully, redirecting...')
              router.push(`user/${user.username}`);
            }
            else {
              toast.error("Please, complete all field and try again")
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
