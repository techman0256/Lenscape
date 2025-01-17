import React from "react";
import SuggestionsContainer from "./SuggestionsContainer";

const Sidebar = () => {
  return (
    <div className="sidebar p-6 bg-purple-100 rounded-lg">
      {/* <h2 className="text-xl font-bold mb-4">About Me</h2> */}
      {/* <p className="text-sm mb-4">Hey, I’m using Lenscape!</p> */}

      {/* <h2 className="text-xl font-bold mb-4 text-purple-700">Suggestions</h2> */}
      <SuggestionsContainer />
    </div>
  );
};

export default Sidebar;
