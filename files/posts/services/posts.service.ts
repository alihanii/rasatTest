import {useRequest} from "~/composables";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export async function getPosts(query: { page: number, limit: number }): Promise<Post[]> {
    return await useRequest<Post[]>(
        'https://jsonplaceholder.typicode.com/posts',
        {
            queryParams: {_page: query.page, _limit: query.limit},
        }
    );

}