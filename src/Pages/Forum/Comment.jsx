import { ArrowRightIcon, ChatIcon } from '@chakra-ui/icons';
import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

const Comment = (props) => {
    const {articleId} = props;
    // console.log(articleUserId);

        /* Post Method */
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


    return (
        <div>
            <Popover>
                <PopoverTrigger>
                <span className='dynamic-btn-hovering'> <ChatIcon/> </span> 
                </PopoverTrigger>
                <PopoverContent>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <PopoverArrow />
                    <PopoverCloseButton/>
                    <PopoverHeader>Reply to this article!</PopoverHeader>
                    <PopoverBody>
                        <Textarea variant='flushed' {...register("reply")} placeholder='Write here'/>
                        <input type="text" name="" {...register("articleId")} style={{display:"none"}} value={articleId} id="" />
                        <input type="text" name="" {...register("commentId")} style={{display:"none"}} value={"comment kora id ta"} id="" />
                        <Button type='submit' colorScheme='teal' style={{width:"100%"}} size='sm'>
                            <ArrowRightIcon/>
                        </Button>
                    </PopoverBody>
                </form>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Comment;