import React from "react";
import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";

const KakaoMap = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Map center={{ lat: 37.5124, lng: 126.931 }} style={{ width: "100vw", height: "100vh", position: "absolute", top: "0" }} level={5}></Map>
    </div>
  );
};

export default KakaoMap;
