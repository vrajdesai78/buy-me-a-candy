import { useRouter } from 'next/router'
import React, { useState } from "react";
import { Box, Flex, Icon, Image, chakra } from "@chakra-ui/react";
import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";

const User = () => {
    const router = useRouter()
    const { userAddress } = router.query

    const [icon, setIcon] = useState('')
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [twitterUrl, setTwitterUrl] = useState('')
    const [githubUrl, setGithubUrl] = useState('')

    async function getUserDetails(userAddress: string) {
        const sdk = ThirdwebSDK.fromPrivateKey("devnet", "2my7j6TSnZZcRHCxW6ZDvgcjcEEBDShM4XLkbe6Di2bBemTUngPvnBVpKwpnG8LMCFA3DuARbz6MFM2Kpo3zZ2Hz");
        const program = await sdk.getProgram("4mWbQ2wte2FbauiTQ3sNY681rxfNu8DZKWscrF7RJPEJ", "nft-collection");
        const nfts = await program.getAll();
        const userNfts = nfts.find(nft => nft.owner === userAddress);
        const userData = JSON.stringify(userNfts!.metadata.properties);
        const parsedData = JSON.parse(userData);
        setName(parsedData[0].value);
        // setUserName(parsedData[1].value);
        setBio(parsedData[1].value);
        setEmail(parsedData[2].value);
        setLinkedinUrl(parsedData[3].value);
        setTwitterUrl(parsedData[4].value);
        setGithubUrl(parsedData[5].value);
    }

    getUserDetails(userAddress as string);

    return (
        <Flex
            bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            p={50}
            w="full"
            minW="100vw"
            minH="100vh"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                w="xl"
                mx="auto"
                bg="white"
                _dark={{ bg: "gray.800" }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
            >
                <Image
                    w="full"
                    h='md'
                    fit="cover"
                    objectPosition="center"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    alt="avatar"
                />

                <Box py={4} px={6} bg={'blue.100'} >
                    <chakra.h1
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.800"
                        _dark={{ color: "white" }}
                    >
                        {name}
                    </chakra.h1>

                    <chakra.p py={2} color="gray.700" _dark={{ color: "gray.400" }}>
                        {bio}
                    </chakra.p>

                    <Flex
                        alignItems="center"
                        mt={4}
                        color="gray.700"
                        _dark={{ color: "gray.200" }}
                    >
                        <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize="sm">
                            Choc UI
                        </chakra.h1>
                    </Flex>

                    <Flex
                        alignItems="center"
                        mt={4}
                        color="gray.700"
                        _dark={{ color: "gray.200" }}
                    >
                        <Icon as={MdLocationOn} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize="sm">
                            California
                        </chakra.h1>
                    </Flex>
                    <Flex
                        alignItems="center"
                        mt={4}
                        color="gray.700"
                        _dark={{ color: "gray.200" }}
                    >
                        <Icon as={MdEmail} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize="sm">
                            patterson@example.com
                        </chakra.h1>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default User