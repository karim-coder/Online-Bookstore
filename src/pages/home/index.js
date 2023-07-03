import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Slider,
  Stack,
  TextField,
  Rating,
  Typography,
  InputAdornment,
} from "@mui/material";
import "./styles.css";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MultiPlayer from "../../components/MultiPlayer";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const toggle = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.log("Error playing audio:", error);
        });
    }
  };

  const seek = (time) => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);
  return [
    audio,
    playing,
    toggle,
    currentTime,
    seek,
    setPlaying,
    setCurrentTime,
  ];
};

const Home = () => {
  const [isBook, setIsBook] = useState(true);
  const [
    audio,
    playing,
    toggle,
    currentTime,
    seek,
    setPlaying,
    setCurrentTime,
  ] = useAudio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState("0:00");
  const [durationDisplay, setDurationDisplay] = useState("0:00");

  // Calculate the duration of the audio
  const duration = audio.duration || 0;

  // Calculate the progress of the audio based on the currentTime and duration
  const progress = (currentTime / duration) * 100;

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDurationDisplay(formatTime(audio.duration));
      setCurrentTimeDisplay(formatTime(audio.currentTime));
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  return (
    <Box
      style={{
        height: "100%",
        backgroundColor: "#F3E5D0",
        padding: "5% 5%",
        margin: 0,
        fontFamily: "Montserrat",
      }}
    >
      <Grid
        style={{
          backgroundColor: "#F8F3ED",
          height: 600,
          padding: "25px 4%",
          borderRadius: "40px 40px 0px 0px",
        }}
      >
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            margin: 0,
          }}
        >
          <Grid>
            <Typography
              style={{
                fontWeight: "800",
                fontSize: 30,
                fontFamily: "Montserrat",
              }}
            >
              Books
            </Typography>
          </Grid>

          <Grid style={{ display: "flex" }}>
            <Grid style={{ margin: 10 }}>
              <IconButton
                aria-label="delete"
                style={{
                  background: isBook ? "#DAAA63" : "transparent",

                  padding: "10px 20px",
                  borderRadius: 25,
                  fontSize: 20,
                }}
                onClick={() => !isBook && setIsBook(!isBook)}
              >
                <MenuBookIcon fontSize="inherit" />
                <Typography
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Books
                </Typography>
              </IconButton>
            </Grid>
            <Grid style={{ margin: 10 }}>
              <IconButton
                aria-label="delete"
                style={{
                  background: !isBook ? "#DAAA63" : "transparent",

                  padding: "10px 20px",
                  borderRadius: 25,
                  fontSize: 20,
                }}
                onClick={() => isBook && setIsBook(!isBook)}
              >
                <HeadphonesIcon fontSize="inherit" />
                <Typography
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  AudioBooks
                </Typography>
              </IconButton>
            </Grid>
          </Grid>

          <Grid style={{ margin: 10 }}>
            <IconButton
              aria-label="delete"
              style={{
                color: "black",
                fontSize: 25,
              }}
              onClick={() => isBook && setIsBook(!isBook)}
            >
              <BookmarkBorderIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="delete"
              style={{
                color: "black",
                fontSize: 25,
              }}
              onClick={() => isBook && setIsBook(!isBook)}
            >
              <Typography
                style={{
                  backgroundColor: "#DAAA63",
                  padding: 1,
                  paddingTop: 0,
                  width: 15,
                  height: 15,
                  fontSize: 12,
                  marginTop: 4,
                  color: "white",
                  borderRadius: "50%",
                }}
              >
                5
              </Typography>
              <LocalMallOutlinedIcon fontSize="inherit" />
            </IconButton>
            <Button onClick={() => isBook && setIsBook(!isBook)}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfXpi1Nrns6Lg_qmU2V4jJ4kexQbqsgKyCxg&usqp=CAU"
                style={{ width: 40, height: 40, borderRadius: 25 }}
              />
            </Button>
            <IconButton
              aria-label="delete"
              style={{
                color: "black",
                fontSize: 25,
              }}
              onClick={() => isBook && setIsBook(!isBook)}
            >
              <MoreVertOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container>
          <Grid xl={3} lg={4}>
            <Typography
              style={{
                fontSize: 65,
                marginTop: "20%",
                fontFamily: "Libre Caslon Text",
              }}
            >
              New & Trending
            </Typography>
            <Typography
              style={{
                marginTop: 10,
                color: "#888",
                fontFamily: "Montserrat",
                fontWeight: "500",
              }}
            >
              Explorer new worlds from authors
            </Typography>

            {/* <Typography
              style={{
                marginTop: 30,
                backgroundColor: "white",
                borderRadius: 25,
                padding: 15,
                color: "#888",
              }}
            >
              Titles, authors, or topics
            </Typography> */}
            {/* <TextField
              placeholder="Titles, authors, or topics"
              style={{
                marginTop: 30,
                backgroundColor: "white",
                borderRadius: 25,
                padding: 15,
                color: "#888",
                border: "none",
              }}
              InputProps={{
                disableUnderline: true,
              }}
              variant="standard"
            /> */}
            <TextField
              id="input-with-icon-textfield"
              style={{
                marginTop: 30,
                backgroundColor: "white",
                borderRadius: 25,
                width: 300,
                padding: 10,

                color: "#888",
                border: "none",
              }}
              placeholder="Titles, authors, or topics"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
                style: { fontSize: 18, fontFamily: "Montserrat" },
              }}
              variant="standard"
            />
          </Grid>
          {/* <Grid>
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/book-2997214-2516252.png?f=webp"
              style={{ width: "500px", marginTop: 100, zIndex: 1 }}
            />
          </Grid> */}

          <div style={{ width: "350px", position: "relative", zIndex: 1 }}>
            <Grid
              style={{
                display: "flex",
                width: "300px",
                position: "absolute",
                top: "93px",
                left: "45%",
                transform: "translateX(-50%)",
              }}
            >
              <img
                src="https://thebookcoverdesigner.com/wp-content/uploads/2022/11/544.jpg"
                style={{
                  width: "300px",
                  borderRadius: "8px 2px 2px 8px",
                  borderBottom: "2px solid #888",
                }}
              />

              <div
                style={{
                  border: "1px solid #ccc",
                  marginTop: 9,
                  marginBottom: 9,
                  marginRight: 0.3,
                }}
              ></div>
              <div
                style={{
                  border: "1px solid #ccc",
                  marginTop: 12,
                  marginBottom: 12,
                  marginRight: 0.3,
                }}
              ></div>
              <div
                style={{
                  border: "1px solid #ccc",
                  marginTop: 15,
                  marginBottom: 15,
                  marginRight: 0.3,
                }}
              ></div>
              <div
                style={{
                  border: "1px solid #ccc",
                  marginTop: 18,
                  marginBottom: 18,
                  marginRight: 0.5,
                }}
              ></div>
              <div
                style={{
                  border: "1px solid #ccc",
                  marginTop: 21,
                  marginBottom: 21,
                  marginRight: 0.5,
                }}
              ></div>
              <div
                style={{
                  border: "1px solid #ccc",
                  marginTop: 24,
                  marginBottom: 24,
                  // marginRight: 0.5,
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  border: "2px solid #3C719F",
                  marginTop: 22,
                  marginBottom: 24,
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  // border: "2px solid #3C719F",

                  // border: "1px solid black",
                  marginTop: 32,
                  marginBottom: 34,

                  marginRight: 1,
                  boxShadow: "10px 20px 40px 10px rgba(0, 0, 0, 0.7)",
                  transform: "translateY(2px)",
                  zIndex: -1,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    left: "50%",
                    transform: "translateX(-58%) rotateZ(-27deg)",
                    width: 0,
                    height: 0,
                    borderTop: "35px solid transparent",
                    borderBottom: "15px solid rgba(0, 0, 0, 0.2)",
                    borderRight: "30px solid transparent",
                    borderLeft: "40px solid transparent",
                    filter: "blur(5px)",
                    zIndex: -1,
                    // shadowBox:
                    //   "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                  }}
                ></div>
              </div>
            </Grid>
          </div>
          <div
            style={{
              marginTop: 100,
              // border: "1px solid red",
              // marginLeft: 50,
              // display: "flex",

              // width: 400,
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <Typography
              style={{
                transform: "rotate(-90deg)",
                left: -50,
                top: 20,
                minWidth: 20,
                marginTop: 100,
                // marginLeft: 50,
                position: "absolute",
                fontSize: 20,
                height: 20,
                fontFamily: "Libre Caslon Text",
              }}
            >
              Author of the Week
            </Typography>

            <div
              style={{
                borderRadius: 20,
                textAlign: "center",
                minWidth: 150,
                maxWidth: 180,
                height: 300,
                backgroundColor: "#DAAA63",
                marginTop: 25,
                marginLeft: 70,
                padding: 20,
              }}
            >
              <Typography
                style={{
                  margin: "auto",
                  fontWeight: "400",
                  maxWidth: 150,
                  color: "black",
                  fontFamily: "Libre Caslon Text",
                }}
              >
                Stephen King Collection
              </Typography>
              <Typography
                style={{
                  margin: 20,
                  color: "#888",
                  marginBottom: 0,
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                }}
              >
                78 books
              </Typography>

              <img
                src={require("./author.png")}
                style={{
                  width: 280,
                  objectFit: "contain",
                  marginTop: 30,
                  marginLeft: -25,
                }}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: 100,
              position: "relative",
            }}
          >
            <Typography
              style={{
                transform: "rotate(-90deg)",
                left: 30,
                // top: 20,
                marginTop: 100,
                fontFamily: "Libre Caslon Text",
                position: "absolute",
                fontSize: 20,
              }}
            >
              Last listened
            </Typography>
            <div
              style={{
                borderRadius: 20,
                textAlign: "center",
                minWidth: 180,
                height: 300,
                backgroundColor: "#FFFFFF",
                marginTop: 25,
                marginLeft: 120,
                padding: 20,
              }}
            >
              <Typography
                style={{
                  margin: "auto",
                  fontSize: 18,
                  width: 150,
                  fontFamily: "Libre Caslon Text",
                }}
              >
                False Witness: A Novel
              </Typography>
              <Typography
                style={{
                  margin: 10,
                  color: "#888",
                  fontWeight: "500",
                  marginBottom: 0,
                  fontFamily: "Montserrat",
                }}
              >
                Karin Slaughter
              </Typography>

              <img
                src="https://images.unsplash.com/photo-1588032786045-59cefda005c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 75,

                  border: "1px solid #ccc",
                  marginTop: 20,
                  display: "block",

                  margin: "auto",
                }}
              />
              <Box
                width={150}
                style={{
                  marginTop: 20,
                  marginLeft: 40,
                }}
              >
                <Slider
                  size="small"
                  style={{ color: "#DAAA63" }}
                  defaultValue={0}
                  value={currentTime}
                  max={duration}
                  onChange={(event, value) => seek(value)}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{currentTimeDisplay}</span>
                  <span>{durationDisplay}</span>
                </div>
              </Box>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <IconButton
                  style={{ fontSize: 35, color: "#B3ACA9" }}
                  onClick={() => seek(currentTime - 10)}
                >
                  <Replay10Icon fontSize="inherit" />
                </IconButton>
                <IconButton
                  style={{ fontSize: 35, color: "#2C1810" }}
                  onClick={toggle}
                >
                  {playing ? (
                    <PauseCircleIcon fontSize="inherit" />
                  ) : (
                    <PlayCircleIcon fontSize="inherit" />
                  )}
                </IconButton>
                <IconButton
                  style={{ fontSize: 35, color: "#B3ACA9" }}
                  onClick={() => seek(currentTime + 10)}
                >
                  <Forward10Icon fontSize="inherit" />
                </IconButton>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      <Box
        style={{
          width: "100%",
          height: 70,
          perspective: 900,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: "rotateX(45deg)",
            transformOrigin: "top",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, #E7DDCF, #EEE6DB)",
          }}
        ></div>
        <div
          style={{
            transformOrigin: "top",
            width: "100%",
            height: "12px",
            borderRadius: 3,
            backgroundColor: "#F4F0EA",
            border: "1px solid white",
            transform: "translateZ(45px) translateY(-25px)",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        ></div>
        <div className="book">
          <div className="shadow"></div>
        </div>
      </Box>
      <Box
        style={{
          display: "flex",
          backgroundColor: "white",
          height: "100%",
          paddingBottom: 300,
          top: -10,
          marginTop: -10,
          paddingTop: 50,
          maxWidth: "100%",
          flexWrap: "wrap",
          // justifyContent: "center",
          gap: 6,
          paddingLeft: 50,
        }}
        className="books"
      >
        {/* <Box
          style={{
            display: "flex",
            marginTop: 100,
            // marginLeft: -50,
          }}
        >
          <img
            src="https://m.media-amazon.com/images/I/51ZY9+mf02L.jpg"
            style={{
              width: 250,
              height: 350,
              overflow: "visible",
              zIndex: 1,
              position: "sticky",
              borderRadius: 20,
              borderRight: "3px solid rgba(200, 190, 178, 1)",
            }}
          />
          <div className="book1">
            <div className="shadow1"></div>
            <div style={{ marginLeft: 50, marginTop: 40, width: 150 }}>
              <Stack spacing={1}>
                <Rating name="read-only" value={3} readOnly />
              </Stack>
              <Typography
                style={{ fontSize: 18, marginTop: 20, fontFamily: "open-sans" }}
              >
                False Witness: A Novel
              </Typography>
              <Typography
                style={{ marginTop: 15, color: "#888", fontSize: 15 }}
              >
                Karin Slaughter
              </Typography>

              <Button
                style={{
                  textTransform: "none",
                  color: "#D9A963",
                  fontWeight: "bold",
                  marginTop: 20,
                  fontSize: 18,
                  border: "1px solid #D9A963",
                  borderRadius: 25,
                  padding: "10px 20px",
                }}
                variant="outlined"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </Box> */}

        {[
          "https://thebookcoverdesigner.com/wp-content/uploads/2020/08/book-cover-338.jpg",
          "https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-3-CRC.png",
          "https://m.media-amazon.com/images/I/51dgTAvVc8L.jpg",
          "https://m.media-amazon.com/images/I/51ZY9+mf02L.jpg",
          "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1451445646i/18143977.jpg",
          "https://images.penguinrandomhouse.com/cover/9780593548127",
          "https://static.theprint.in/wp-content/uploads/2017/12/Narayan.jpg?compress=true&quality=80&w=376&dpr=2.6",
          "https://www.oysterenglish.com/images/Dont-judge-a-book-by-its-cover1.png",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi-EbOaRSEfcAbnQlqgxABobVdSeJtwLW8RA&usqp=CAU",
          "https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-4-CRC.png",
        ].map((book) => (
          <Box
            style={{
              display: "flex",
              marginTop: 100,
              flex: "1 0 100px",
              // border: "1px solid black",
              justifyContent: "center",
              // flex: "0 0 calc(33.33% - 10px)",
            }}
          >
            <img
              src={book}
              style={{
                width: 250,
                height: 350,
                marginLeft: 0,
                overflow: "visible",
                position: "sticky",
                // borderRadius: 20,
                // borderRight: "3px solid rgba(200, 190, 178, 1)",
                zIndex: 3,
                borderRadius: "8px 2px 2px 8px",
                // borderBottom: "2px solid #888",
              }}
            />
            {[8, 10, 12, 14, 16, 18].map((item) => (
              <div
                style={{
                  border: "1px solid #ccc",
                  zIndex: 3,
                  marginTop: item,
                  marginBottom: item,
                  marginRight: 0.01,
                }}
              ></div>
            ))}

            <div
              style={{
                border: "2px solid #888",
                zIndex: 3,
                marginTop: 16,
                marginBottom: 15,
                marginRight: 0.5,
              }}
            ></div>
            <div className="book2" style={{ zIndex: 1 }}>
              <div className="shadow2"></div>
              <div
                style={{
                  marginLeft: 50,
                  marginTop: 40,
                  width: 150,
                }}
              >
                <Stack spacing={1}>
                  <Rating name="read-only" value={3} readOnly />
                </Stack>
                <Typography
                  style={{
                    fontSize: 18,
                    marginTop: 20,
                    fontFamily: "Libre Caslon Text",
                  }}
                >
                  False Witness: A Novel
                </Typography>
                <Typography
                  style={{
                    marginTop: 15,
                    color: "#888",
                    fontSize: 16,
                    fontFamily: "Montserrat",
                    fontWeight: "500",
                  }}
                >
                  Karin Slaughter
                </Typography>

                <Button
                  style={{
                    textTransform: "none",
                    color: "#D9A963",
                    fontWeight: "500",
                    marginTop: 20,
                    fontSize: 18,
                    border: "1px solid #D9A963",
                    borderRadius: 25,
                    padding: "10px 20px",
                    fontFamily: "Montserrat",
                  }}
                  variant="outlined"
                >
                  Buy Now
                </Button>
              </div>
            </div>
            <div className="parent" style={{ zIndex: 0 }}>
              <div className="parallelogram"></div>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
