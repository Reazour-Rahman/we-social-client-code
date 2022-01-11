import { Alert, Divider, Avatar, Stack, Table, Tbody, Thead, Tr, WrapItem, Menu, MenuButton, Button, MenuList, MenuGroup, MenuItem, MenuDivider, IconButton, Text, FormControl, FormLabel, Select, Input, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea, PopoverTrigger, Popover, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { Box, Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { ChatIcon, StarIcon, ArrowRightIcon, SpinnerIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { FcCamcorderPro, FcAddImage, FcComboChart } from "react-icons/fc";
import '../../Forum/Forum.css'
import { FiImage, FiUserCheck, FiSmile, FiMic } from "react-icons/fi";
import { IoCloudDownloadOutline, IoEllipsisVertical } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import DefaultComment from './DefaultComment';






const Default = () => {
    const {userId} = useFirebase();
    const user = userId.email;

    /* Status Post Method */
    const { register, handleSubmit , reset} = useForm();
    const onSubmit = data => {
        console.log(data)
        axios.post('https://serene-beyond-56628.herokuapp.com/userStatus', data)
        .then(res => {
            if (res.data.insertedId) {
                swal("Well done!", "Your article has been published successfully!", "success");
                reset();
            }
        })
    };


    /* -----------------------------
    Status Posts fetch and Filter
    --------------------------------*/

    const [userStatuses, setUserStatuses] = useState([])

    useEffect(()=>{
        fetch("https://serene-beyond-56628.herokuapp.com/userStatus")
        .then(res => res.json())
        .then(data => setUserStatuses(data))
    },[userStatuses])
    
    

    /* -----------------------------
    get user list
    --------------------------------*/

    const [userLists, setUserList] = useState([])

    useEffect(()=>{
        fetch("https://serene-beyond-56628.herokuapp.com/userList")
        .then(res => res.json())
        .then(data => setUserList(data))
    },[userLists])


    /* Modal */
    const { isOpen, onOpen, onClose } = useDisclosure()

    /* Time */
    let myCurrentDate = new Date();
    let now = myCurrentDate.getFullYear()+'-'+(myCurrentDate.getMonth()+1)+'-'+myCurrentDate.getDate();

    /* Common user URl */
    const commonUSer = "https://cdn-icons.flaticon.com/png/128/1144/premium/1144760.png?token=exp=1641670623~hmac=64027eef207abc5c6750a40b0c0e33cf";



    return (
        // <Container >
			<Box bg='white'  w='100%' p={4} color='white' >

                <div style={{backgroundColor:"#f3f6f4", marginBottom:"20px"}}>

                    {userLists.map(userList => userList.email === userId.email ? <div className='forum-display-top'>
                        <WrapItem>
                            <Avatar name='Image' src={userList.photoURL} />
                        </WrapItem>
                        <Input placeholder='What is your mind ?' style={{backgroundColor:"white", border:"none", borderRadius:"20px"}} onClick={onOpen}/>

                        {/* Modal */}
                        {/* <Button onClick={onOpen}>Open Modal</Button> */}

                        <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader style={{paddingBottom:"5px" ,paddingTop:"5px", textAlign:"center"}}><small>Write an article</small></ModalHeader>
                            <hr />
                            <ModalCloseButton />

                            <ModalBody>
                                
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='post-modal'>
                                        <WrapItem>
                                            <Avatar name='Image' src={userList.photoURL} />
                                        </WrapItem>
                                        <div className='post-modal-name'>
                                            <p className='fw-bold'>{userList.displayName}</p>
                                            <p><button style={{padding:"2px 10px", borderRadius:"5px"}} type="button" className='community-btn'>User Status</button></p>
                                        </div>
                                    </div>
                                    <input type="text" name="" {...register("time")} style={{display:"none"}} value={now} id="" />
                                    <Textarea {...register("article")} style={{border:"none", marginTop:"15px", minHeight:"180px"}} variant='unstyled' placeholder='What on your mind Mr/Mrs' />
                                    <input type="text" name="" {...register("postedUserId")} style={{width:"1px"}} value={user} id="" />
                                    <div className='top-btn' style={{border:"1px solid #e2e8f0", padding:"10px", borderRadius:"8px"}}>
                                        <button>Add to your post</button>
                                        <span><FiImage/></span>
                                        <span><FiUserCheck/></span>
                                        <span><FiSmile/></span>
                                        <span><FiMic/></span>
                                        <span><IoCloudDownloadOutline/></span>
                                        <span><IoEllipsisVertical/></span>
                                    </div>
                                    <br />
                                    <Button colorScheme='teal' type="submit" style={{width:"100%"}} variant='solid'>
                                        Publish
                                    </Button>
                                </form>

                            </ModalBody>
                        </ModalContent>
                        </Modal>

                        {/* ::::::::::::::::::::::
                                Modal Ended
                        ::::::::::::::::::::::::::::*/}
					</div>: null)}
					<hr />
					<div
						style={{ color: 'black' }}
						className='forum-display-top'>
						<button className='top-btn'>
							{' '}
							<FcCamcorderPro className='fs' />
							&nbsp;&nbsp;Live video
						</button>
						<button className='top-btn'>
							{' '}
							<FcAddImage className='fs' />
							&nbsp;&nbsp;Photo/Video
						</button>
						<button className='top-btn'>
							{' '}
							<FcComboChart className='fs' />
							&nbsp;&nbsp;Feeling/activity
						</button>
					</div>
				</div>

				{/* ----------------------
                    Filter And header
                -------------------------*/}

				<div
					style={{ backgroundColor: '#f3f6f4', marginBottom: '5px' }}
					className='forum-display'>
					<FormControl color='black'>
						<Select
							id='country'
							placeholder='Filter'
							style={{
								backgroundColor: 'white',
								border: 'none',
								borderRadius: '20px',
							}}>
							<option>Country</option>
							<option>Most Recent</option>
							<option>Oldest</option>
							<option>Popularity</option>
						</Select>
					</FormControl>
					<FormControl color='black'>
						<Input
							style={{
								backgroundColor: 'white',
								border: 'none',
								borderRadius: '20px',
							}}
							placeholder='Search the article'
							id='text'
							type='text'
						/>
					</FormControl>
				</div>

				{/* ----------------------
                    User Status 
                -------------------------*/}
                {userStatuses.map(userStatus =>
                <section>
                    <div style={{backgroundColor:"#f3f6f4", padding:"15px"}}className='' >
                    {userLists.map(userList => userList.email === userStatus.postedUserId ?
                    <aside style={{display:"flex", alignItems:"center"}}>
                        <Menu>
                            {({ isOpen }) => (
                                <>
                                <MenuButton className='profile-image-style' isActive={isOpen}>
                                    <WrapItem >
                                        <Avatar className='bg-white'  name='Image' src={userStatus.postedUserId ===userList.email ? userList.photoURL : null} />
                                    </WrapItem>
                                </MenuButton>
                                <MenuList color="black">
                                    <MenuItem>Profile Name</MenuItem>
                                    <MenuItem>Profession Name</MenuItem>
                                    <MenuItem>Country Name</MenuItem>
                                    <MenuItem onClick={() => alert('This Feature is implementing soon')}>View Profile</MenuItem>
                                </MenuList>
                                </>
                            )}
                        </Menu>
                        &nbsp;&nbsp;&nbsp;
                        <div style={{color:"black"}}>
                            <p >{userStatus.postedUserId ===userList.email ? userList.displayName : "Anonymous"}</p>
                            <small style={{display:"flex", alignItems:"center"}}>{userStatus.time}&nbsp;&nbsp; <CheckCircleIcon style={{color:"blue"}}/></small>
                        </div>
                    </aside>: null)}
                    &nbsp;
                    
                    <Text color='black' fontSize='md'>{userStatus.article}

                    <p style={{display:"flex", justifyContent:"end"}}> 

                    {/* <span> <ChatIcon/> </span>  */}
                    {/* <Comment key={userStatus._id} articleId={userStatus._id}></Comment> */}
                    
                    &nbsp;&nbsp;&nbsp;&nbsp; <span className='dynamic-btn-hovering'><StarIcon/></span>&nbsp;&nbsp;&nbsp;&nbsp;

                    <span className='dynamic-btn-hovering'><Link to={`/seeReplies/${userStatus._id}`}>See replies</Link></span>

                    &nbsp;&nbsp;&nbsp;&nbsp; <span>{userStatus.time}</span></p>
                    
                    </Text>
                    <DefaultComment key={userStatus._id} statusId={userStatus._id}></DefaultComment>
                </div>
                <br />
                
                </section>)}


                
			</Box>
		// </Container>
	);
};

export default Default;
