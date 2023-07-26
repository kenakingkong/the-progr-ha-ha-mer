import { useEffect, useState } from "react";
import {
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import LinkIcon from "./LinkIcon";
import AppInfoUtils from "@/utils/appinfo";

const FILL_COLORS = {
  DARK: {
    BG_FILL: "#f156ff",
    ICON_FILL: "#2a2a2a",
  },
  LIGHT: {
    BG_FILL: "#000000",
    ICON_FILL: "#ffffff",
  },
};

interface IShareButtonsProps {
  jokeId?: number;
}

const ShareButtons: React.FC<IShareButtonsProps> = ({ jokeId }) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(true);

  const source = `${AppInfoUtils.URL}/${!!jokeId ? `?jokeId=${jokeId}` : ""}`;

  useEffect(() => {
    /**
     * try to match color preferences for share buttons
     */
    if (typeof window !== "undefined") {
      const lightModePreference = window.matchMedia(
        "(prefers-color-scheme: light)"
      );

      setIsLightMode(
        window.matchMedia("(prefers-color-scheme: light)").matches
      );

      lightModePreference.addEventListener(
        "change",
        (e) =>
          e.matches &&
          setIsLightMode(
            window.matchMedia("(prefers-color-scheme: light)").matches
          )
      );
    }
  }, []);

  const copyToClipboard = () => {
    /**
     * copy source to users clipboard
     */
    navigator.clipboard.writeText(source);
  };

  return (
    <div className="shareButtonContainer">
      <TwitterShareButton
        {...({ title: `${AppInfoUtils.TITLE} ${source}` } as any)}
      >
        <TwitterIcon
          size={32}
          bgStyle={{
            fill: isLightMode
              ? FILL_COLORS.LIGHT.BG_FILL
              : FILL_COLORS.DARK.BG_FILL,
          }}
          iconFillColor={
            isLightMode
              ? FILL_COLORS.LIGHT.ICON_FILL
              : FILL_COLORS.DARK.ICON_FILL
          }
        />
      </TwitterShareButton>
      <LinkedinShareButton
        {...({ title: AppInfoUtils.TITLE, source: source } as any)}
      >
        <LinkedinIcon
          size={32}
          bgStyle={{
            fill: isLightMode
              ? FILL_COLORS.LIGHT.BG_FILL
              : FILL_COLORS.DARK.BG_FILL,
          }}
          iconFillColor={
            isLightMode
              ? FILL_COLORS.LIGHT.ICON_FILL
              : FILL_COLORS.DARK.ICON_FILL
          }
        />
      </LinkedinShareButton>
      <RedditShareButton
        {...({ title: AppInfoUtils.TITLE, source: source } as any)}
      >
        <RedditIcon
          size={32}
          bgStyle={{
            fill: isLightMode
              ? FILL_COLORS.LIGHT.BG_FILL
              : FILL_COLORS.DARK.BG_FILL,
          }}
          iconFillColor={
            isLightMode
              ? FILL_COLORS.LIGHT.ICON_FILL
              : FILL_COLORS.DARK.ICON_FILL
          }
        />
      </RedditShareButton>
      <button className="shareLinkButton" onClick={copyToClipboard}>
        <LinkIcon className="shareLinkButtonIcon" />
      </button>
    </div>
  );
};

export default ShareButtons;
