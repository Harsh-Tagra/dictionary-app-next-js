import {
  Container,
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios"; 
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
export const Index = () => {
  const [Word, setWord] = useState("");
  const [Categ, setCateg] = useState("en_US");
  const [Audio, setAudio] = useState();
  const [Data, setData] = useState([]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
      
    },
  });
  
  useEffect(async () => {
    try {
      const api = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${Categ}/${Word}`
      );
      setData(api.data);
      setAudio(api.data[0].phonetics[0].audio);
    } catch (error) {}
  }, [Word, Categ]);
  
  return (
    <>

      {" "}
      <ThemeProvider theme={darkTheme}>

        <Container  maxWidth="md"     style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}>
          
        <div className="heading">
          <div
            className="title"
            style={{ color: "white" }}
          >
            { Word?Word:"word Hunt"
          }         </div> </div>
          <div className="inpu">
            <TextField
              id="standard-basic"
              value={Word}
              className="in"
              label="Enter a Word"
              onChange={(e) => setWord(e.target.value)}
            />
            <TextField
              id="standard-select-currency"
              select
              value={Categ}
             className="in"
              label="Language"
              onChange={(e) => setCateg(e.target.value)}
            >
              {Categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="textbox">

          {Audio && (
            <audio
              src={Audio}
              style={{
                backgroundColor: "white",
                borderRadius: "100px",
                width: "100%"
                ,
              }}
              controls
            ></audio>
          )}
            {Word === ""  ? (
              <span
                className="subtitle"
                style={{ color:  "white"  }}
              >
  Start by typing a word in search            </span>
            ) : (
              Data.map(({ meanings }) => {
                return meanings.map((d) => {
                  return d.definitions.map(
                    ({ antonyms, synonyms, definition, example }) => {
                      return (
                        <>
                          <div
                            style={{
                              backgroundColor: "white" ,
                              color:  "black" ,
                            }}
                            className="def"
                          >
                            {" "}
                            <b> {definition} </b> <hr width="100%"></hr>{" "}
                            <b>example: </b>
                            {example}
                            <div className="hy">
                              {" "}
                              <div className="shy">
                                {" "}
                                <b>synonyms:</b>{" "}
                                {synonyms.map((s) => {
                                  return <> {s} </>;
                                })}
                              </div>{" "}
                              <div className="ahy">
                                <b>antonyms:</b>{" "}
                                {antonyms.map((a) => {
                                  return <> {a} </>;
                                })}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  );
                });
              })
            )}
          </div>{" "}
        </Container>{" "}
      </ThemeProvider>
    </>
  );
};
export default Index;
