import React, { useEffect, useState } from "react";
import Progress from "../components/Progress";
import MenuAppBar from "../components/MenuAppBar";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
//import MaxHeightTextarea from '../components/StyledTextArea'
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

const Home = () => {
  const [color, setVarient] = useState("primary");
  const [reviewMesg, setReviewMsg] = useState("Good Review");
  const [reviewContent, setReviewContent] = useState("");
  const [progress, setProgress] = useState(0);

  const textAreaStyle = {
    border: "1px solid rgba(0,0,0,0.5)",
    outline: "none",
    resize: "none",
    backgroundColor: "#F5F5F5",
    padding: "20px",
  };
  useEffect(() => {}, []);
  const handleSubmit = async () => {
    try {
      const result = await axios.post("http://20.187.93.143:5000/predict", {
        sentence: reviewContent,
      });
      const predictedClass = result.data.predicted_class;
      console.log(predictedClass);
      setProgress(predictedClass * 20);

      if (predictedClass >= 3) {
        setReviewMsg("Good Review");
      } else {
        setReviewMsg("Bad Review");
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <MenuAppBar />
      <div style={{ width: "80%" }} className="mx-auto">
        <div className="mt-4 px-5 py-3 bg-white shadow-sm rounded">
          <Typography
            variant="h6"
            color={color}
            className="my-3"
            position={"center"}
          >
            {reviewMesg}
          </Typography>
          {/*<Typography variant='h6' color={color} className='my-3' position={'center'}>{reviewResult}</Typography>*/}
          <Progress done={progress} />
        </div>
        <div className="d-flex flex-column justify-content-around px-5 mt-4 bg-white shadow-sm rounded">
          <Typography variant="h6" color={"primary"} className="my-3">
            Enter The Review Here
          </Typography>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setReviewContent(e.target.value)}
            value={reviewContent}
            style={textAreaStyle}
          ></textarea>
          {/* <TextField id="outlined-basic" label="Review" variant="outlined" onChange={e => setReviewContent(e.target.value)} value={reviewContent} /> */}
          <Button variant="contained" className="mt-4" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
