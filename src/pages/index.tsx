import Head from "next/head";
import { Anonymous_Pro } from "next/font/google";
import { useEffect, useState } from "react";
import ShareButtons from "@/components/ShareButtons";

const apFont = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });

interface IJokeApiPayload {
  error: boolean;
  category: "Programming";
  type: "single" | "twopart";
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: true;
  lang: "en";
}

export default function Home() {
  const [isJoking, setIsJoking] = useState<boolean>(false);
  const [currJoke, setCurrJoke] = useState<IJokeApiPayload | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  const TITLE = "THE PROGR-HA-HA-MER";

  const ERR_MESSAGE = "Oops - couldn't find a joke";

  const TYPE_SINGLE = "single";
  const TYPE_TWOPART = "twopart";

  const TYPING_SPEED = 60;

  const API_URL =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  const API_ID_SEARCH = "&idRange=";

  const parseJokePayload = (payload: IJokeApiPayload): string => {
    if (payload.error) {
      // throw error
      return ERR_MESSAGE;
    }
    if (payload.type === TYPE_SINGLE && !!payload.joke) {
      return payload.joke;
    } else if (
      payload.type === TYPE_TWOPART &&
      !!payload.setup &&
      !!payload.delivery
    ) {
      return `${payload.setup}\n\n${payload.delivery}`;
    } else {
      return ERR_MESSAGE;
    }
  };

  const getShareLink = () => {
    return `https://kenakingkong.github.io/the-progr-ha-ha-mer${
      currJoke ? `?jokeId=${currJoke.id}` : ""
    }`;
  };

  const getJoke = (jokeId?: string) => {
    setIsJoking(true);
    setCurrJoke(null);
    setReady(false);

    let el = document.querySelector("#joke");
    if (el) el.innerHTML = "";

    let endpoint = `${API_URL}${jokeId ? `${API_ID_SEARCH}${jokeId}` : ""}`;
    fetch(endpoint)
      .then((res: any) => res.json())
      .then((res: IJokeApiPayload) => setCurrJoke(res))
      .catch((err: any) => {
        // handle error?
        setCurrJoke(null);
      });
  };

  useEffect(() => {
    let i = 0;
    let joke = currJoke && parseJokePayload(currJoke);

    const typeItOut = (joke: string) => {
      let el = document.querySelector("#joke");
      if (!el || !joke) return;
      if (i < joke.length) {
        el.innerHTML += joke.charAt(i);
        i++;
        setTimeout(() => typeItOut(joke), TYPING_SPEED);
      } else {
        setReady(true);
      }
    };

    if (isJoking && !ready && joke) {
      typeItOut(joke);
    }
  }, [isJoking, ready, currJoke]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let jokeId = urlParams.get("jokeId");
    if (jokeId) {
      getJoke(jokeId);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="MAKE ME LAUGH" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={apFont.className}>
        <div
          className={`headerContainer ${
            isJoking ? "headerContainerActive" : ""
          }`}
        >
          <h1>{TITLE}</h1>
        </div>
        {isJoking && (
          <div
            className={`jokeContainer ${isJoking ? "jokeContainerActive" : ""}`}
          >
            <p id="joke" className="joke"></p>
          </div>
        )}
        <div
          className={`mainButtonContainer ${
            isJoking ? "mainButtonContainerInactive" : ""
          } ${ready ? "mainButtonContainerActive" : ""}`}
        >
          <button className="mainButton" onClick={() => getJoke()}>
            MAKE ME LAUGH {isJoking ? "AGAIN" : ""}
          </button>
        </div>
        {isJoking && (
          <div
            className={`shareContainer ${ready ? "shareContainerActive" : ""}`}
          >
            <p>OR, MAKE SOMEONE ELSE LAUGH</p>
            <ShareButtons title={TITLE} source={getShareLink()} />
          </div>
        )}
      </main>
    </>
  );
}
