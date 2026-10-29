import useFetch from "./useFetch";

export default function useCommunityData() {
  const postsResult = useFetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
  );
  const usersResult = useFetch(
    "https://jsonplaceholder.typicode.com/users?_limit=10",
  );
  const photosResult = useFetch(
    "https://api.slingacademy.com/v1/sample-data/photos?_limit=10",
  );
  return {
    postsData: postsResult.data,
    usersData: usersResult.data,
    photosData: photosResult.data,
    isLoading:
      postsResult.isLoading || usersResult.isLoading || photosResult.isLoading,
    error: postsResult.error || usersResult.error || photosResult.error,
  };
}
