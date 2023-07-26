import { useCallback, useEffect, useState } from "react";
import { Anonymous_Pro } from "next/font/google";
import classNames from "classnames";
import AppHead from "@/components/AppHead";
import ShareButtons from "@/components/ShareButtons";
import JokeApiUtils from "@/utils/jokeapi";
import AppInfoUtils from "@/utils/appinfo";

const apFont = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });

export default function Home() {
  // joking is live
  const [isJoking, setIsJoking] = useState<boolean>(false);

  //ready for next joke
  const [ready, setReady] = useState<boolean>(false);

  // current joke payload from Jokes API
  const [currJoke, setCurrJoke] = useState<JokeApiUtils.IJokeApiPayload | null>(
    null
  );

  const getJoke = useCallback((jokeId?: string) => {
    /**
     * fetches the joke via jokes api
     */

    if (isJoking && !!currJoke && !ready) {
      return; // already in the process
    }

    // make app state ready to receive new joke
    setIsJoking(true);
    setCurrJoke(null);
    setReady(false);

    let el = document.querySelector("#joke");
    if (el) el.innerHTML = "";

    let endpoint = JokeApiUtils.buildEndpoint(jokeId);
    fetch(endpoint)
      .then((res: any) => res.json())
      .then((res: JokeApiUtils.IJokeApiPayload) => setCurrJoke(res))
      .catch((err: any) => setCurrJoke(null));
  }, []);

  useEffect(() => {
    /**
     * type out joke animation
     */
    const synth = window.speechSynthesis;
    const speakingSpeed = 0.78;
    const typingSpeed = 70;

    let i = 0;
    let joke = currJoke && JokeApiUtils.parseJokePayload(currJoke);
    let timeouts: NodeJS.Timeout[] = [];

    const typeItOut = (joke: string) => {
      let el = document.querySelector("#joke");
      if (!el || !joke) return;
      if (i < joke.length) {
        el.innerHTML += joke.charAt(i);
        i++;
        let timeout = setTimeout(() => typeItOut(joke), typingSpeed);
        timeouts.push(timeout);
      } else {
        setReady(true);
      }
    };

    const speak = (joke: string) => {
      if (synth.speaking) {
        synth.cancel();
      }
      let utterance = new SpeechSynthesisUtterance(joke);
      utterance.rate = speakingSpeed;
      speechSynthesis.speak(utterance);
    };

    if (isJoking && !ready && joke) {
      typeItOut(joke);
      speak(joke);
    }

    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, [isJoking, ready, currJoke]);

  useEffect(() => {
    /**
     * grab joke by query string (if any)
     */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let jokeId = urlParams.get("jokeId");

    if (!!jokeId) {
      getJoke(jokeId);
    }
  }, [getJoke]);

  return (
    <>
      {/* app head */}
      <AppHead />

      <main className={apFont.className}>
        {/* app header */}
        <div
          className={classNames(
            "headerContainer",
            isJoking && "headerContainerActive"
          )}
        >
          <h1>{AppInfoUtils.TITLE}</h1>
        </div>

        {/* play joke */}
        {isJoking && (
          <div
            className={classNames(
              "jokeContainer",
              isJoking && "jokeContainerActive"
            )}
          >
            <p id="joke" className="joke"></p>
          </div>
        )}

        {/* get new joke */}
        <div
          className={classNames(
            "mainButtonContainer",
            isJoking && "mainButtonContainerInactive",
            ready && "mainButtonContainerActive"
          )}
        >
          <button className="mainButton" onClick={() => getJoke()}>
            MAKE ME LAUGH {isJoking ? "AGAIN" : ""}
          </button>
        </div>

        {/* share joke */}
        {isJoking && (
          <div
            className={classNames(
              "shareContainer",
              ready && "shareContainerActive"
            )}
          >
            <p>OR, MAKE SOMEONE ELSE LAUGH</p>
            <ShareButtons jokeId={currJoke?.id} />
          </div>
        )}
      </main>
    </>
  );
}
