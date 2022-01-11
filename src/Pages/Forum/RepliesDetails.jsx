import { StarIcon, SpinnerIcon } from '@chakra-ui/icons';
import { Avatar, Button, Input, Menu, MenuButton, MenuItem, MenuList, Text, Textarea, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import "./details.css"

const RepliesDetails = () => {
    const {articleID} = useParams();

    /* :::::::::::::::::::::::::::::::
        Post Replies
    ::::::::::::::::::::::::::::::::::*/
    const { register, handleSubmit , reset} = useForm();
    const onSubmit = data => {
        console.log(data)
        axios.post('https://serene-beyond-56628.herokuapp.com/communityPostsReply', data)
        .then(res => {
            if (res.data.insertedId) {
                swal("Well done!", "Your reply submitted successfully!", "success");
                reset();
            }
        })
    };


    /* -------------------
    Fetch single Article
    ---------------------*/
    const [communityPosts, setCommunityPosts] = useState([])

    useEffect(()=>{
        fetch("https://serene-beyond-56628.herokuapp.com/communityPosts")
        .then(res => res.json())
        .then(data => setCommunityPosts(data))
    },[communityPosts])


    /* _________________
    Fetch replies
    ______________________*/
    const [communityPostsReplies, setCommunityPostsReplies] = useState([])
    

    useEffect(()=>{
        fetch("https://serene-beyond-56628.herokuapp.com/communityPostsReply")
        .then(res => res.json())
        .then(data => setCommunityPostsReplies(data))
    },[communityPostsReplies]);

    

    return (
        <main >
        <section className='reply-container'>
            <div className='reply-details'>
                {communityPosts.map(communityPost =>
                communityPost._id === articleID ?
                    <section>
                        <div style={{backgroundColor:"#f3f6f4", borderBottom:"0.5px solid black", padding:"15px"}} className=''>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <Menu>
                                {({ isOpen }) => (
                                    <>
                                    <MenuButton isActive={isOpen}>
                                        <WrapItem>
                                            <Avatar name='Image' src='https://static.remove.bg/remove-bg-web/6cc620ebfb5922c21227f533a09d892abd65defa/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png' />
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
                                <p>Reazour Rahaman</p>
                                <small>{communityPost.time} <SpinnerIcon/></small>
                            </div>
                        </div>  &nbsp;&nbsp;&nbsp;
                        
                        <Text color='black' fontSize='md'>{communityPost.article}

                        <small style={{display:"flex", justifyContent:"end"}}> 
                        
                        &nbsp;&nbsp;&nbsp;&nbsp; <span><StarIcon/></span>&nbsp;&nbsp;&nbsp;&nbsp;

                        <span>Implementing Replies</span></small>
                        
                        </Text>
                        </div>
                    </section> : null
                    
                    )}
                    {/* Comment input */}
                    <form onSubmit={handleSubmit(onSubmit)} >
                    <div style={{backgroundColor:"rgb(243 246 244)", padding:"15px"}}>
                        <div style={{display:"flex", alignItems:"center"}}> 

                        <WrapItem>
                            <Avatar name='Image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsK6oIKzeSCKiqpjv5cuoC4ZC_hJ0FxNkvQ&usqp=CAU' />
                        </WrapItem>

                        &nbsp;

                        <Input  placeholder='Write a comment...' {...register("reply")} style={{backgroundColor:"#e2e8f0", width:"100%", borderRadius:"30px"}} size='md' />
                        <input type="text" name="" {...register("articleId")} style={{display:"none"}} value={articleID} id="" />
                        <input type="text" name="" {...register("commentId")} style={{display:"none"}} value={"comment kora id ta"} id="" />

                        &nbsp;&nbsp;&nbsp;
                        <Button type="submit" style={{borderRadius:"30px", padding:"0 30px"}} colorScheme='teal' size='md'>
                            Submit
                        </Button>
                        </div>
                    </div>
                    </form>
                    
                    
                </div>
        </section>

        {/* Replies */}
        <section className='reply-container'>
                    <div className='reply-details'>

            {communityPostsReplies.map(communityPostsReply =>
            communityPostsReply.articleId === articleID ?
            <section>

                {}
                <div style={{backgroundColor:"#f3f6f4", borderBottom:"0.5px solid black", paddingRight:"80px"}} className='forum-display'>
                    <Menu>
                        {({ isOpen }) => (
                            <>
                            <MenuButton isActive={isOpen}>
                                <WrapItem>
                                    <Avatar name='Image' src='https://reazour-rahaman.netlify.app/static/media/MyPgoto.a3d16b45.png' />
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
                    <div style={{padding:"15px", backgroundColor:"#e2e8f0", borderRadius:"22px"}}>
                        <Text color='black' style={{}} fontSize='md'>
                            {communityPostsReply.reply}
                            <small style={{display:"flex", justifyContent:"end"}}> 
                            <span>Time Here</span>
                            </small>                  
                        </Text>
                    </div>
                </div>
            </section> : null)}
        </div>
        </section>

        </main>
    );
};

export default RepliesDetails;
