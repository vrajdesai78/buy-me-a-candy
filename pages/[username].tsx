import { useRouter } from 'next/router'
import React, { useState, useEffect } from "react";
import { Box, Flex, Icon, Image, chakra } from "@chakra-ui/react";
import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";

const User = () => {
    const router = useRouter()
    const { username } = router.query

    const [icon, setIcon] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [twitterUrl, setTwitterUrl] = useState('')
    const [githubUrl, setGithubUrl] = useState('')

    async function getUserDetails(username: string) {
        const sdk = ThirdwebSDK.fromPrivateKey("devnet", "2my7j6TSnZZcRHCxW6ZDvgcjcEEBDShM4XLkbe6Di2bBemTUngPvnBVpKwpnG8LMCFA3DuARbz6MFM2Kpo3zZ2Hz");
        const program = await sdk.getProgram("4mWbQ2wte2FbauiTQ3sNY681rxfNu8DZKWscrF7RJPEJ", "nft-collection");
        const nfts = await program.getAll();
        try {
            const userNfts = nfts.find(nft => nft.metadata.name === username);
            console.log(userNfts);
            const userData = JSON.stringify(userNfts!.metadata!.properties);
            const parsedData = JSON.parse(userData);
            setIcon(parsedData[0].value);
            setName(parsedData[1].value);
            setBio(parsedData[3].value);
            setEmail(parsedData[4].value);
            setLinkedinUrl(parsedData[5].value);
            setTwitterUrl(parsedData[6].value);
            setGithubUrl(parsedData[7].value);
        } catch (error) {
            console.log(error);
        }
    }

    // call function on page load 
    useEffect(() => {
        getUserDetails(username as string);
    }, [username]);

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
                    src={icon}
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