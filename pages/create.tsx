import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    SimpleGrid,
    GridItem,
    InputGroup,
    InputLeftAddon,
    Icon,
    Textarea,
    chakra,
    HStack
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import dynamic from "next/dynamic";
import { useWallet } from '@solana/wallet-adapter-react';

export default function UserProfileEdit(): JSX.Element {

    const [icon, setIcon] = useState('')
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [twitterUrl, setTwitterUrl] = useState('')
    const [githubUrl, setGithubUrl] = useState('')

    // Default styles that can be overridden by your app
    require("@solana/wallet-adapter-react-ui/styles.css");

    const WalletMultiButtonDynamic = dynamic(
        async () =>
            (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
        { ssr: false }
    );

    const bg = useColorModeValue("white", "gray.800");

    const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        switch (name) {
            case 'icon':
                setIcon(value)
            case 'name':
                setName(value)
                break
            case 'userName':
                setUserName(value)
                break
            case 'bio':
                setBio(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'linkedinUrl':
                setLinkedinUrl(value)
                break
            case 'twitterUrl':
                setTwitterUrl(value)
                break
            case 'githubUrl':
                setGithubUrl(value)
                break
            default:
                break
        }
    }

    const { publicKey } = useWallet();

    const sdk = ThirdwebSDK.fromPrivateKey("devnet", "2my7j6TSnZZcRHCxW6ZDvgcjcEEBDShM4XLkbe6Di2bBemTUngPvnBVpKwpnG8LMCFA3DuARbz6MFM2Kpo3zZ2Hz");

    async function mintNFT(): Promise<any> {
        const program = await sdk.getProgram("4mWbQ2wte2FbauiTQ3sNY681rxfNu8DZKWscrF7RJPEJ", "nft-collection");
        const metadata = {
            name: userName,
            symbol: "CANDY",
            description: "NFT used to create profile in buy me a candy",
            properties: [
                {
                    name: "Name",
                    value: name
                },
                {
                    name: "Username",
                    value: userName
                },
                {
                    name: "Bio",
                    value: bio
                },
                {
                    name: "Email",
                    value: email
                },
                {
                    name: "Linkedin",
                    value: "https://" + linkedinUrl
                },
                {
                    name: "Twitter",
                    value: "https://" + twitterUrl
                },
                {
                    name: "Github",
                    value: "https://" + githubUrl
                }
            ]
        }
        if (publicKey != null) {
            const mintAddress = await program.mintTo(publicKey.toBase58(), metadata);
            alert("Successfully minted NFT to your wallet. Mint address: " + mintAddress)
        } else {
            return console.error("Wallet not connected");
        }
    }

    return (
        <>
            <React.Fragment>
                <chakra.header
                    bg={bg}
                    w="full"
                    px={{ base: 2, sm: 4 }}
                    py={4}
                    shadow="md"
                >
                    <Flex alignItems="center" justifyContent="space-between" mx="auto">
                        <Flex>
                            <chakra.a
                                href="/"
                                title="Choc Home Page"
                                display="flex"
                                alignItems="center"
                            >
                            </chakra.a>
                            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                                Buy Me a Candy
                            </chakra.h1>
                        </Flex>
                        <HStack display="flex" alignItems="center" spacing={1}>
                            <WalletMultiButtonDynamic />
                        </HStack>
                    </Flex>
                </chakra.header>
            </React.Fragment>
            <Flex
                minH={'100vh'}
                minW={'100vw'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        Create your page
                    </Heading>
                    <FormControl id="userProfile" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('icon', e)}>
                        <FormLabel>User Icon</FormLabel>
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src="https://bit.ly/sage-">
                                    <AvatarBadge
                                        as={IconButton}
                                        size="sm"
                                        rounded="full"
                                        top="-10px"
                                        colorScheme="red"
                                        aria-label="remove Image"
                                        icon={<SmallCloseIcon />}
                                    />
                                </Avatar>
                            </Center>
                            <Center w="full">
                                <Button
                                    colorScheme="blue"
                                    variant="outline"
                                    w="full"
                                > Upload profile photo </Button>
                            </Center>
                        </Stack>
                    </FormControl>

                    <FormControl id="userName" isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('userName', e)}>
                        <FormLabel>User Name</FormLabel>
                        <Input
                            placeholder="User Name"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>

                    <FormControl id="name" isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e)}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Name"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                        />
                    </FormControl>

                    <FormControl id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('bio', e)}>
                        <FormLabel
                            color="gray.700"
                            _dark={{
                                color: "gray.50",
                            }}
                        >
                            Bio
                        </FormLabel>
                        <Textarea
                            placeholder="you@example.com"
                            mt={1}
                            rows={3}
                            shadow="sm"
                            focusBorderColor="brand.400"
                        />
                    </FormControl>
                    <FormControl id="userEmail" isRequired onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e)}>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                        />
                    </FormControl>

                    <SimpleGrid>
                        <FormControl id="linkedinUrl" as={GridItem} colSpan={[3, 2]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('linkedinUrl', e)}>
                            <FormLabel
                                color="gray.700"
                                _dark={{
                                    color: "gray.50",
                                }}
                            >
                                Linkedin URL
                            </FormLabel>
                            <InputGroup>
                                <InputLeftAddon
                                    bg="gray.50"
                                    _dark={{
                                        bg: "gray.800",
                                    }}
                                    color="gray.500"
                                    rounded="md"
                                >
                                    https://
                                </InputLeftAddon>
                                <Input
                                    type="tel"
                                    placeholder="linkedin.com/in/username"
                                    focusBorderColor="brand.400"
                                    rounded="md"
                                />
                            </InputGroup>
                        </FormControl>
                    </SimpleGrid>

                    <SimpleGrid>
                        <FormControl id='twitterUrl' as={GridItem} colSpan={[3, 2]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('twitterUrl', e)}>
                            <FormLabel
                                color="gray.700"
                                _dark={{
                                    color: "gray.50",
                                }}
                            >
                                Twitter URL
                            </FormLabel>
                            <InputGroup>
                                <InputLeftAddon
                                    bg="gray.50"
                                    _dark={{
                                        bg: "gray.800",
                                    }}
                                    color="gray.500"
                                    rounded="md"
                                >
                                    https://
                                </InputLeftAddon>
                                <Input
                                    type="tel"
                                    placeholder="twitter.com/username"
                                    focusBorderColor="brand.400"
                                    rounded="md"
                                />
                            </InputGroup>
                        </FormControl>
                    </SimpleGrid>

                    <SimpleGrid>
                        <FormControl id='githubUrl' as={GridItem} colSpan={[3, 2]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('githubUrl', e)}>
                            <FormLabel
                                color="gray.700"
                                _dark={{
                                    color: "gray.50",
                                }}
                            >
                                GitHub URL
                            </FormLabel>
                            <InputGroup>
                                <InputLeftAddon
                                    bg="gray.50"
                                    _dark={{
                                        bg: "gray.800",
                                    }}
                                    color="gray.500"
                                    rounded="md"
                                >
                                    https://
                                </InputLeftAddon>
                                <Input
                                    type="tel"
                                    placeholder="github.com/username"
                                    focusBorderColor="brand.400"
                                    rounded="md"
                                />
                            </InputGroup>
                        </FormControl>
                    </SimpleGrid>

                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={mintNFT}>
                            Create Profile
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </>
    );
}