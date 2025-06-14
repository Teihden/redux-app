import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { NewPost, Post, PostUpdate, ReactionName } from "@/features/posts/postsSlice";

export type { Post };

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  tagTypes: [ "Post" ],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: (result = [], error, arg) => [ "Post", ...result.map(({ id }) => ({ type: "Post", id }) as const) ],
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [ { type: "Post", id: arg } ],
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: [ "Post" ],
    }),
    editPost: builder.mutation<Post, PostUpdate>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [ { type: "Post", id: arg.id } ],
    }),
    addReaction: builder.mutation<Post, { postId: string; reaction: ReactionName }>({
      query: ({ postId, reaction }) => ({
        url: `posts/${postId}/reactions`,
        method: "POST",
        body: { reaction },
      }),
      async onQueryStarted({ postId, reaction }, lifecycleApi) {
        const getPostsPatchResult = lifecycleApi.dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.find((post) => post.id === postId);
            if (post) {
              post.reactions[reaction]++;
            }
          }),
        );

        const getPostPatchResult = lifecycleApi.dispatch(
          apiSlice.util.updateQueryData("getPost", postId, (draft) => {
            draft.reactions[reaction]++;
          }),
        );

        try {
          await lifecycleApi.queryFulfilled;
        } catch {
          getPostsPatchResult.undo();
          getPostPatchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
} = apiSlice;

export default apiSlice;