import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { GetAnswers, PostData } from "../../api/Sales";
import BarGraph from "../../components/BarGraph";
import { useSnackbar } from "notistack";

const Sales = ({ showBoard }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [messages, setMessages] = useState([]);
  const [qaPairs, setQAPairs] = useState([]);

  const getAnswers = async () => {
    try {
      const res = await GetAnswers();
      setQAPairs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const postThread = async (data) => {
    const dataa = {
      ...data,
      id: Math.random(),
    };
    try {
      await PostData(dataa);
      enqueueSnackbar("Threaded", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnswers();
  }, []);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messageText = event.target.message.value;
    if (messageText) {
      const matchingPair = qaPairs.find(
        (pair) => pair.question === messageText
      );
      if (matchingPair) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now(),
            question: matchingPair.question,
            answer: matchingPair.answer,
            button: (
              <Button
                size="small"
                variant="contained"
                color="secondary"
                className="ml-2"
                onClick={() => {
                  postThread(matchingPair);
                }}
              >
                Thread
              </Button>
            ),
          },
        ]);
      }

      event.target.reset();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-2">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`text-${message.isAnswer ? "left" : "right"}`}
            >
              <div>
                <Typography variant="h5" gutterBottom>
                  {message.question}
                </Typography>
                {!Array.isArray(message.answer) ? (
                  <Typography variant="body1">{message.answer}</Typography>
                ) : (
                  <BarGraph data={message.answer} color="#B39DDB" />
                )}
              </div>
              {message.button && (
                <div style={{ marginTop: "10px" }}>{message.button}</div>
              )}
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSendMessage}
        className={`${
          showBoard ? "w-full sm:w-2/3 max-w-lg" : "w-full mt-8"
        } bg-white border-t border-gray-200 p-2 fixed bottom-0 left-30 flex justify-center items-center`}
        style={{
          zIndex: 1,
        }}
      >
        <div
          className={`${
            showBoard ? "w-full flex items-center justify-center" : "w-full"
          }`}
        >
          <div className={`flex-grow justify-center items-center `}>
            <TextField
              name="message"
              variant="outlined"
              placeholder="Type your message"
              className={`${showBoard ? "w-2/3 sm:w-2/3" : "w-2/3"}`}
            />
            <Button
              style={{ marginTop: "8px", marginLeft: "8px" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sales;
