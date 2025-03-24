export async function getFollowRecommends(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/followRecommends`,{
        next:{
            tags: ['users', 'followRecommends']
        },
    });

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}