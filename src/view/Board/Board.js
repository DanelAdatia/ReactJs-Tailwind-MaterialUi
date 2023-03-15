import React, { useEffect, useState } from "react";
import { GetBoard } from "../../api/Sales";
import BarGraph from "../../components/BarGraph";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Board = () => {
  const [display, setDisplay] = useState([]);

  const getBoard = async () => {
    try {
      const res = await GetBoard();
      console.log(res.data);
      setDisplay(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      {display.map((d, index) => {
        return (
          (Array.isArray(d.answer) && d.answer.length > 0 && (
            <Box
              key={index}
              sx={{
                border: 1,
                borderColor: "primary.main",
                borderRadius: 1,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h4" gutterBottom>
                {d.question}
              </Typography>
              <BarGraph data={d.answer} color="#B39DDB" />
            </Box>
          )) ||
          (!Array.isArray(d.answer) && d.answer.length > 0 && (
            <Box
              key={index}
              sx={{
                border: 1,
                borderColor: "primary.main",
                borderRadius: 1,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="h4" gutterBottom>
                {d.question}
              </Typography>
              <Typography variant="h5">{d.answer}</Typography>
            </Box>
          ))
        );
      })}
    </Box>
  );
};

export default Board;
