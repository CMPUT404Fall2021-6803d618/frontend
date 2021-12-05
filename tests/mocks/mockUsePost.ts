import usePost from "../../src/hooks/PostHook";
import { PostObject } from "../../src/shared/interfaces";
import { mocked } from "ts-jest/utils";

export function mockUsePost(): void {
  const mockPosts: PostObject[] = [];
  jest.doMock("../../src/hooks/PostHook", () => {
    return {
      __esModule: true,
      default: jest.fn().mockReturnValue({
        getPosts: jest.fn().mockResolvedValue(mockPosts),
        getStreamPosts: jest.fn().mockResolvedValue(mockPosts),
        getPostById: jest.fn(),
        createPost: jest.fn(),
        updatePost: jest.fn(),
        deletePost: jest.fn(),
        sharePostToFriends: jest.fn(),
        sharePostToFollowers: jest.fn(),
      }),
    };
  });
  mocked(usePost).mockReturnValue({
    getPosts: jest.fn().mockResolvedValue(mockPosts),
    getStreamPosts: jest.fn().mockResolvedValue(mockPosts),
    getPostById: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
    sharePostToFriends: jest.fn(),
    sharePostToFollowers: jest.fn(),
  });
}
