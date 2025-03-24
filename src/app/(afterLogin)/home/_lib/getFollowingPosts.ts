export async function getFollowingPosts(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/followingPosts`,{
        next:{
            tags: ['posts', 'followings']
        },
        cache: 'force-cache'
    });

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}