import React from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100vw", height: "100vh" }}
        level={3}
      ></Map>
    </div>
  );
};

export default KakaoMap;
