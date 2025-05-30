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

export interface PaginationOptions {
  _page?: number
  _limit?: number
}

// ====================================== Posts ================================================

export async function getPosts(query: {
  page?: PaginationOptions
  filters?: object
}): Promise<Post[]> {
  return await useRequest<Post[]>('https://jsonplaceholder.typicode.com/posts', {
    queryParams: { ...query.page, ...query.filters },
  })
}

export async function createPost(post: Post): Promise<Post> {
  return await useRequest<Post>('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: post,
  })
}

export async function updatePost(postId: number, post: Post): Promise<Post> {
  return await useRequest<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PUT',
    body: post,
  })
}

export async function deletePost(postId: number): Promise<void> {
  await useRequest<void>(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  })
}

// ====================================== comments ================================================

export async function getComments(params: { postId: number }): Promise<Comment[]> {
  return await useRequest<Post[]>('https://jsonplaceholder.typicode.com/comments', {
    queryParams: { postId: params.postId },
  })
}
