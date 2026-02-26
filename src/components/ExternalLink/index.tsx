import React from "react";
import RedirectIcon from "../../assets/images/others/viewon.png";

interface ExternalLinkProps {
  url: string;
  path: string;
}

export const ExternalLink = ({ url, path }: ExternalLinkProps) => {
  return (
    <a
      href={`${url}/${path}`}
      target="_blank"
      rel="noreferrer"
      style={{ color: "grey", textDecoration: "auto" }}
    >
      <div style={{ marginLeft: "0.3rem" }}>
        <img
          src={RedirectIcon}
          width="15"
          height="15"
          style={{ marginRight: "2px" }}
        />
        View in Explorer
      </div>
    </a>
  );
};
