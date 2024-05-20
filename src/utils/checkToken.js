//JWT가 저장되어 있는지 확인하는 함수. 있으면 true, 없으면 false반환
export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};
