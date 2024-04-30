import React from "react";
import { VideoItemList } from "../../features/videos";

export const HomePage: React.FC = () => {
  return (
    <div className="page-container" style={{ padding: "0 20%", overflowY: "hidden" }}>
      <VideoItemList />
    </div>
  );
};
