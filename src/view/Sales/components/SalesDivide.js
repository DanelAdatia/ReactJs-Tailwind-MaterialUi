import React, { useState } from "react";
import Board from "../../Board/Board";
import Sales from "../Sales";
import { Button, Grid } from "@mui/material";

function SalesDivide() {
  const [showBoard, setShowBoard] = useState(false);

  const handleClick = () => {
    setShowBoard(!showBoard);
  };

  return (
    <div className="bg-white p-4">
      <div className="flex justify-center mb-8">
        <Button onClick={handleClick} variant="contained" color="secondary">
          {showBoard ? "Hide Board" : "Show Board"}
        </Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={showBoard ? 6 : 12}>
          <div
            className={`${
              showBoard ? "w-full" : "w-auto"
            } bg-gray-700 text-white p-4 mb-12`}
          >
            <h2 className="text-2xl mb-2">Sales Component</h2>
            <Sales showBoard={showBoard} />
          </div>
        </Grid>
        {showBoard && (
          <Grid item xs={12} sm={6}>
            <div className="bg-gray-300 p-4">
              <h2 className="text-2xl mb-2">Board Component</h2>
              <Board />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default SalesDivide;
