import React, { FC, useEffect, useState } from "react";
import ContentLoader from "../ContentLoader";

export interface LazyLoaderProps {
  delay?: number;
}

const LazyLoader: FC<LazyLoaderProps> = ({ delay = 2500 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? (
    <ContentLoader color="purple" message="Bundling the App" />
  ) : null;
};

export { LazyLoader as default };
