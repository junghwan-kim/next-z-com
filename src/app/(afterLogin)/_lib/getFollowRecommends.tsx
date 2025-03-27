export async function getFollowRecommends(){
    //console.log('API URL:', process.env.NEXT_PUBLIC_BASE_URL);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/followRecommends`,{
        next:{
            tags: ['users', 'followRecommends']
        },
        // 클라이언트에서도 정상 작동하도록 credentials 옵션 추가
        credentials: 'include',
    });

    //console.log('Follow recommends response:', res);

    if(!res.ok){
        throw new Error('Failed to fetch data');
    }

    return res.json();
}