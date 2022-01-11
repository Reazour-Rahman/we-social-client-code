import React from 'react';
import UserPosts from './UserPosts';
import UserProfile from './UserProfile';

const ProfileContent = () => {
    return (
        <div>
            <UserProfile />
            <UserPosts />
        </div>
    );
};

export default ProfileContent;