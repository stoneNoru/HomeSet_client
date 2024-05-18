import React, { useEffect } from "react";

const RoadView = ({ lat, lng }) => {
  const kakao = window.kakao;
  useEffect(() => {
    const container = document.getElementById("roadview");
    const position = new kakao.maps.LatLng(lat, lng);

    const roadview = new kakao.maps.Roadview(container);
    const roadviewClient = new kakao.maps.RoadviewClient();

    roadviewClient.getNearestPanoId(position, 50, (panoId) => {
      roadview.setPanoId(panoId, position);
    });
  }, [lat, lng]);

  return (
    <div
      id="roadview"
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};

export default RoadView;
