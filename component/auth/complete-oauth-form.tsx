import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUser } from "../../lib/hooks";
import { pxToRem } from "../../lib/pxToRem";
import { queryClient } from "../../lib/react-query";
import { CompleteOAuthInput, completeOAuthSchema } from "../../lib/schema";
import { completeOAuth } from "../../services/auth";

export default function CompleteOAuthForm() {
  var router = useRouter();
  var { reset, register, handleSubmit, formState } =
    useForm<CompleteOAuthInput>({
      defaultValues: { email: "" },
      resolver: yupResolver(completeOAuthSchema),
    });

  var { accessToken } = useUser();
  var mutation = useMutation({
    mutationFn: (data: CompleteOAuthInput) => completeOAuth(data, accessToken),
    onSuccess: async (_response) => {
      await queryClient.invalidateQueries(["access-token"]);
      toast.success("Signup completed");
      reset();
      router.push("/");
    },
    onError: (error: any) => {
      let errorMsg = error?.message;
      if (!errorMsg) toast.error("Something went wrong");
      else {
        if (Array.isArray(errorMsg)) {
          toast.error(error?.message[0] ?? "Something went wrong");
        } else toast.error(error?.message);
      }
    },
  });

  return (
    <VStack
      w="full"
      as="form"
      justifyContent="center"
      gap={pxToRem(24)}
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <FormControl isInvalid={formState.errors.email ? true : false}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          variant="base"
          {...register("email")}
          borderColor={
            formState.errors.email
              ? "red.500"
              : formState.touchedFields.email
              ? "green.500"
              : "#CDCDCD"
          }
        />

        <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
      </FormControl>

      <Button
        variant="regularSolid"
        type="submit"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? "Loading..." : "Complete my signup"}
      </Button>
    </VStack>
  );
}
