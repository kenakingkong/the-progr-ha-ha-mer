namespace JokeApiUtils {
  export interface IJokeApiPayload {
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

  export const ERR_MESSAGE = "Oops - couldn't find a joke";

  export const TYPE_SINGLE = "single";
  export const TYPE_TWOPART = "twopart";

  export const buildEndpoint = (jokeId?: string) => {
    return `https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit${
      jokeId ? `&idRange=${jokeId}` : ""
    }`;
  };

  export const parseJokePayload = (payload: IJokeApiPayload): string => {
    if (payload.error) {
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
}

export default JokeApiUtils;
