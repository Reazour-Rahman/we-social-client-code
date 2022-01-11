import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase';
import ProfilePost from './ProfilePost';

export default function UserProfile() {
    const {userId} = useFirebase();
        /* -------------------
    Fetch UserList
    ---------------------*/
    const [userLists, setUserList] = useState([])

    useEffect(()=>{
        fetch("https://serene-beyond-56628.herokuapp.com/userList")
        .then(res => res.json())
        .then(data => setUserList(data))
    },[userLists])

    /* Modal */
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <section>
            <Center py={6}>
            {userLists.map(userList => userList.email === userId.email ?<Box
                maxW={'1000px'}
                w={'full'}
                // bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    src={
                        'https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/08/facebook-cover.jpg'
                    }
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={userList.photoURL}
                        alt={'Author'}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {userId.displayName}
                        </Heading>
                        <Text color={'gray.500'}>{userId.email}</Text>
                        {/* Modal */}
                        <Text style={{cursor:"pointer"}} className='text-decoration-underline' onClick={onOpen}>See more...</Text>
                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalCloseButton />
                            <ModalHeader></ModalHeader>
                            <ModalBody>
                            <div class="list-group">
                            <button type="button" class="list-group-item list-group-item-action ">
                                {userList.displayName}
                            </button>
                            <button type="button" class="list-group-item list-group-item-action">{userList.email}</button>
                            <button type="button" class="list-group-item list-group-item-action">{userList.Address}</button>
                            <button type="button" class="list-group-item list-group-item-action">{userList.Designation}</button>
                            <button type="button" class="list-group-item list-group-item-action">{userList.Mobile}</button>
                            </div> <br />
                            </ModalBody>
                        </ModalContent>
                        </Modal>
                        {/* Modal end */}
                    </Stack>

                    <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>23k</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Followers
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={'center'}>
                            <Text fontWeight={600}>23k</Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                Followers
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        w={'full'}
                        mt={8}
                        // bg={useColorModeValue('#151f21', 'gray.900')}
                        style={{backgroundColor:"#151f21"}}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}>
                        Follow
                    </Button>
                </Box>
            </Box>: null)}
        </Center>
        <ProfilePost></ProfilePost>
        </section>
    );
}
