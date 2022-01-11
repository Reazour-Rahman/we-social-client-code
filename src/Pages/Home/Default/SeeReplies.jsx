import { StarIcon, SpinnerIcon } from '@chakra-ui/icons';
import { Avatar, Button, Input, Menu, MenuButton, MenuItem, MenuList, Text, Textarea, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import useFirebase from '../../../hooks/useFirebase';
// import "./details.css"


/* 

Special Message :

*   {here are 2 state
    e.g. communityPost and communityPostsReplies
    their real name is
    userStatus and userStatusReply.}

*   articleId is statusId..


*/

const SeeReplies = () => {
    const {statusId} = useParams();
    const {userId} = useFirebase();
    const user = userId.email;

    /* :::::::::::::::::::::::::::::::
        Post Replies
    ::::::::::::::::::::::::::::::::::*/
    const { register, handleSubmit , reset} = useForm();
    const onSubmit = data => {
        console.log(data)
        axios.post('https://serene-beyond-56628.herokuapp.com/userStatusReplies', data)
        .then(res => {
            if (res.data.insertedId) {
                swal("Well done!", "Your reply submitted successfully!", "success");
                reset();
            }
        })
    };


    /* -------------------
    Fetch Status
    ---------------------*/
    const [communityPosts, setCommunityPosts] = useState([])

    useEffect(()=>{
        fetch("https://serene-beyond-56628.herokuapp.com/userStatus")
        .then(res => res.json())
        .then(data => setCommunityPosts(data))
    },[communityPosts])

    /* -------------------
    Fetch UserList
    ---------------------*/
    const [userList, setUserList] = useState([])

    useEffect(()=>{
        fetch("https://serene-beyond-56628.herokuapp.com/userList")
        .then(res => res.json())
        .then(data => setUserList(data))
    },[userList])


    /* _________________
    Fetch replies
    ______________________*/
    const [communityPostsReplies, setCommunityPostsReplies] = useState([])
    

    useEffect(()=>{
        fetch("https://serene-beyond-56628.herokuapp.com/userStatusReplies")
        .then(res => res.json())
        .then(data => setCommunityPostsReplies(data))
    },[communityPostsReplies]);

    

    return (
        <main >
        <section className='reply-container'>
            <div className='reply-details'>
                {communityPosts.map(communityPost =>
                communityPost._id === statusId ?
                    <section>
                        {userList.map(userLi => userLi.email === communityPost.postedUserId ?<div style={{backgroundColor:"#f3f6f4", borderBottom:"0.5px solid black", padding:"15px"}} className=''>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                    <MenuButton isActive={isOpen}>
                                        <WrapItem>
                                            <Avatar name='Image' src={userLi.photoURL} />
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
                            <div>
                                <p>{userLi.displayName}</p>
                                <small>{communityPost.time} <SpinnerIcon/></small>
                            </div>
                        </div>  &nbsp;&nbsp;&nbsp;
                        
                        <Text color='black' fontSize='md'>{communityPost.article}

                        <small style={{display:"flex", justifyContent:"end"}}> 
                        
                        &nbsp;&nbsp;&nbsp;&nbsp; <span><StarIcon/></span>&nbsp;&nbsp;&nbsp;&nbsp;

                        <span>Implementing Replies</span></small>
                        
                        </Text>
                        </div>:null)}
                    </section> : null
                    
                    )}
                    {/* Comment input */}
                    {
                        userList.map(userLi => userLi.email === userId.email ? <form onSubmit={handleSubmit(onSubmit)} >
                        <div style={{backgroundColor:"rgb(243 246 244)", padding:"15px"}}>
                            <div style={{display:"flex", alignItems:"center"}}> 
    
                            <WrapItem>
                                <Avatar name='Image' src={userLi.photoURL} />
                            </WrapItem>
    
                            &nbsp;
    
                            <Input  placeholder='Write a comment...' {...register("reply")} style={{backgroundColor:"#e2e8f0", width:"100%", borderRadius:"30px"}} size='md' />
                            <input type="text" name="" {...register("articleId")} style={{display:"none"}} value={statusId} id="" />
                            <input type="text" name="" {...register("commentedUserId")} style={{width:"1px"}} defaultValue={userLi.email} id="" />
    
                            &nbsp;&nbsp;&nbsp;
                            <Button type="submit" style={{borderRadius:"30px", padding:"0 30px"}} colorScheme='teal' size='md'>
                                Submit
                            </Button>
                            </div>
                        </div>
                        </form> : null)
                    }
                    
                    
                </div>
        </section>

        {/* Replies */}
        <section className='reply-container' style={{backgroundColor:"#f3f6f4"}}>
                    <div className='reply-details'>

            {communityPostsReplies.map(communityPostsReply =>
            communityPostsReply.articleId === statusId ?
            <section>


                {userList.map(userLi => userLi.email === communityPostsReply.commentedUserId ? <div style={{backgroundColor:"#f3f6f4", borderBottom:"0.5px solid black", paddingRight:"80px", width:"100%"}} className='forum-display'>
                    <Menu>
                        {({ isOpen }) => (
                            <>
                            <MenuButton isActive={isOpen}>
                                <WrapItem>
                                    <Avatar name='Image' src={userLi.photoURL} />
                                </WrapItem>
                            </MenuButton>
                            <MenuList color="black">
                                <MenuItem>{userLi.displayName}</MenuItem>
                                <MenuItem>{userLi.Address}</MenuItem>
                                <MenuItem>{userLi.Designation}</MenuItem>
                                <MenuItem onClick={() => alert('This Feature is implementing soon')}>View Profile</MenuItem>
                            </MenuList>
                            </>
                        )}
                    </Menu> 
                    <div style={{padding:"15px", backgroundColor:"#e2e8f0", borderRadius:"22px"}}>
                        <Text color='black' style={{}} fontSize='md'>
                            {communityPostsReply.reply}
                            <small style={{display:"flex", justifyContent:"end"}}> 
                            <span>Time Here</span>
                            </small>                  
                        </Text>
                    </div>
                </div> : null)}
            </section> : null)}
        </div>
        </section>

        </main>
    );
};

export default SeeReplies;

/* 


*/