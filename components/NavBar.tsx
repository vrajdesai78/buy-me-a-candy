import {
    chakra,
    Flex,
    HStack
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

export const NavBar = () => {

    require("@solana/wallet-adapter-react-ui/styles.css");

    const WalletMultiButtonDynamic = dynamic(
        async () =>
            (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
        { ssr: false }
    );

    return (
        <React.Fragment>
            <chakra.header
                bg={'transparent'}
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
                        <WalletMultiButtonDynamic style={{ 'background':'#260367' }} />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    )
}