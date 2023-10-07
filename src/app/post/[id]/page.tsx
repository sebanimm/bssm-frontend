"use client";

import PostPage from "@/insert.forum-post";

interface IPostAppPageParams {
  params: {
    id: number;
  };
}

const Post = ({ params }: IPostAppPageParams) => {
  return <PostPage {...params} />;
};

export default Post;
