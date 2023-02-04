import { Box, Divider, Heading, VStack } from "@chakra-ui/react";
import { CampSettingsLayout } from "./layout";
import { pxToRem } from "../../lib/chakra-ui";

export default function CampBookings() {
  return (
    <CampSettingsLayout>
      <VStack w="full">
        <VStack
          w="full"
          maxW={pxToRem(800)}
          pt={pxToRem(28 + 24)}
          gap={pxToRem(24)}
          alignItems="center"
        >
          <Heading as="h1" size="lg">
            Bookings
          </Heading>

          <Divider w="full" maxW={pxToRem(400)} />
        </VStack>
      </VStack>
    </CampSettingsLayout>
  );
}