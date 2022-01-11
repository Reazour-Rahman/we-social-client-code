import { Avatar, Button, Input, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const ProfilePost = () => {
    /* :::::::::::::::::::::::::::::::
        Post Status from User UI
    ::::::::::::::::::::::::::::::::::*/
    const { register, handleSubmit , reset} = useForm();
    const onSubmit = data => {
        console.log(data)
        axios.post('https://serene-beyond-56628.herokuapp.com/userStatus', data)
        .then(res => {
            if (res.data.insertedId) {
                swal("Well done!", "Your reply submitted successfully!", "success");
                reset();
            }
        })
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div style={{backgroundColor:"rgb(243 246 244)", padding:"15px"}}>
                    <div style={{display:"flex", alignItems:"center"}}> 

                    <WrapItem>
                        <Avatar name='Image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAsK6oIKzeSCKiqpjv5cuoC4ZC_hJ0FxNkvQ&usqp=CAU' />
                    </WrapItem>

                    &nbsp;

                    <Input  placeholder='Write a comment...' {...register("reply")} style={{backgroundColor:"#e2e8f0", width:"100%", borderRadius:"30px"}} size='md' />
                    <input type="text" name="" {...register("articleId")} style={{display:"none"}}  id="" />
                    <input type="text" name="" {...register("commentId")} style={{display:"none"}} value={"comment kora id ta"} id="" />

                    &nbsp;&nbsp;&nbsp;
                    <Button type="submit" style={{borderRadius:"30px", padding:"0 30px", backgroundColor:"#151f21"}} className='text-white' size='md'>
                        Submit
                    </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfilePost;