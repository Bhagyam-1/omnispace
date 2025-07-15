import React from 'react'

const PostCard = ({post}: {post: any}) => {
    return (
        <img src={post.image} alt="Post" className='h-full object-cover'/>
    )
}

export default PostCard;