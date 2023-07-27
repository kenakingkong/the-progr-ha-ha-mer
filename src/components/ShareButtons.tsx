import AppInfoUtils from "@/utils/appinfo";
import { LinkedInIcon, LinkIcon, RedditIcon, TwitterIcon } from "./icons";
import copyToClipboard from "@/utils/copyToClipboard";

interface IShareButtonsProps {
  joke?: string;
  jokeId?: number;
}

const ShareButtons: React.FC<IShareButtonsProps> = ({ joke, jokeId }) => {
  const getJokePreview = () => {
    /**
     * get nothing, the first sentence of joke (limit 100 chars) or first 100 chars of joke
     */
    if (!joke) return "";

    const jokeList = joke?.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    return `${
      jokeList.length > 1 ? jokeList[0].slice(0, 100) : joke.slice(0, 100)
    }%0A%0A`;
  };

  const source = `${AppInfoUtils.URL}${!!jokeId ? `?jokeId=${jokeId}` : ""}`;
  const jokePreview = getJokePreview();

  const anchorProps = {
    target: "_blank",
    className: "shareLinkButton",
  };

  return (
    <div className="shareButtonContainer">
      {/* twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${jokePreview}${source}`}
        {...anchorProps}
      >
        <TwitterIcon />
      </a>

      {/* linkedin */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${source}`}
        {...anchorProps}
      >
        <LinkedInIcon />
      </a>

      {/* reddit */}
      <a href={`https://reddit.com/submit?url=${source}`} {...anchorProps}>
        <RedditIcon />
      </a>

      {/* clipboard */}
      <button
        className="shareLinkButton"
        onClick={() => copyToClipboard(source)}
      >
        <LinkIcon className="shareLinkButtonIcon" />
      </button>
    </div>
  );
};

export default ShareButtons;
