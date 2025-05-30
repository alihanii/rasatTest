import { useRequest } from '~/composables'

export interface Post {
  userId: number
  id?: number
  title: string
  body: string
}

export interface Comment {
  postId: number
  id?: number
  name: string
  email: string
  body: string
}

export async function getPosts(query: { page: number; limit: number }): Promise<Post[]> {
  return await useRequest<Post[]>('https://jsonplaceholder.typicode.com/posts', {
    queryParams: { _page: query.page, _limit: query.limit },
  })
}

export async function createPost(post: Post): Promise<Post> {
  return await useRequest<Post>('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: post,
  })
}

export async function updatePost(postId: number, post: Partial<Post>): Promise<Post> {
  return await useRequest<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PATCH',
    body: post,
  })
}

export async function deletePost(postId: number): Promise<void> {
  await useRequest<void>(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  })
}

export async function getComments(params: { postId: number }): Promise<Comment> {
  return await useRequest<Post[]>('https://jsonplaceholder.typicode.com/comments', {
    queryParams: { postId: params.postId },
  })
}
