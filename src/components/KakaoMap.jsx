import React from "react";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  return (
    <div>
      <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: "800px", height: "600px" }} level={3}></Map>
    </div>
  );
};

export default KakaoMap;
