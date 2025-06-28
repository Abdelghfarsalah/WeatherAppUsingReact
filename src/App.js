import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

// REACT
import { useEffect, useState } from "react";

// MATERIAL UI COMPONENTS
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// EXTERNAL LIBRARIES
import axios from "axios";
import moment from "moment";
import "moment/min/locales";


//locales 

import { useTranslation } from 'react-i18next';


const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

moment.locale("ar");
let cancelAxios = null;

function App() {
  const { t, i18n } = useTranslation();

  const [timeandDate, settimeandDate] = useState("");
  const [currentloacal, setcurrentloacal] = useState("en");
  console.log("rednering the componenting (mounting)");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  useEffect(() => {
    settimeandDate(moment().format('MMMM Do YYYY, h:mm:ss a'));
    axios.get("https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=18912ebac911cc5539ee982d62a01c7b",
      {
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      }
    )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(
          response.data.main.temp - 272.15
        );
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });

        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      console.log("canceling");
      cancelAxios();
    };
  }, []);
  return (
    <div className="App" style={{

    }}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div

            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* CARD */}
            <div

              dir={currentloacal === "ar" ? "rtl" : "ltr"}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                  }}
                  dir={currentloacal === "ar" ? "rtl" : "ltr"}
                >
                  <Typography
                    variant="h2"
                    style={{
                      marginRight: "20px",
                      fontWeight: "600",
                    }}
                  >
                    {t("Cairo")}
                  </Typography>

                  <Typography
                    variant="h5"
                    style={{ marginRight: "20px" }}
                  >
                    {timeandDate}
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr />

                {/* CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h1"
                        style={{ textAlign: "right" }}
                      >
                        {temp.number}
                      </Typography>

                      <img src={temp.icon} />
                    </div>
                    {/*== TEMP ==*/}

                    <Typography variant="h6">
                      {temp.description}
                    </Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>{t("min")}: {temp.min}</h5>
                      <h5 style={{ margin: "0px 5px" }}>
                        |
                      </h5>
                      <h5>{t("max")} : {temp.max}</h5>
                    </div>
                  </div>
                  {/*== DEGREE & DESCRIPTION ==*/}

                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  />
                </div>
                {/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
              </div>
              {/* == CONTENT == */}
            </div>
            {/*== CARD ==*/}

            {/* TRANSLATION CONTAINER */}
            <div
              dir="rtl"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: currentloacal === "ar" ? "end" : "start",
                marginTop: "20px",
              }}
            >
              <Button onClick={() => {
                if (currentloacal === "ar") {
                  i18n.changeLanguage("en")
                  setcurrentloacal("en")
                  moment.locale("en");
                }
                else {

                  i18n.changeLanguage("ar")
                  setcurrentloacal("ar")
                  moment.locale("ar");
                }
                settimeandDate(moment().format('MMMM Do YYYY, h:mm:ss a'));

              }} style={{ color: "white" }} variant="text">
                {currentloacal === "ar" ? "English" : "عربي"}
              </Button>
            </div>
            {/*== TRANSLATION CONTAINER ==*/}
          </div>
          {/*== CONTENT CONTAINER ==*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;