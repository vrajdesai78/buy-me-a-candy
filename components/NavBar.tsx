import {
    chakra,
    Flex,
    useColorModeValue,
    HStack
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

export const NavBar = () => {

    const bg = useColorModeValue("white", "gray.800");

    require("@solana/wallet-adapter-react-ui/styles.css");

    const WalletMultiButtonDynamic = dynamic(
        async () =>
            (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
        { ssr: false }
    );

    return (
        <React.Fragment>
            <chakra.header
                bg={bg}
                w="full"
                px={{ base: 2, sm: 4 }}
                py={4}
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <Flex>
                        <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                        </chakra.h1>
                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1}>
                        <WalletMultiButtonDynamic />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    )
}