import { useState, useEffect } from "react";
import useCopy from "@react-hook/copy";

export default function useOnCopy(
  timeOut: number = 500,
  content: string
): [() => void, boolean] {
  const [ifCopied, setCopied] = useState<boolean>();

  const { copy, copied } = useCopy(content);

  const onCopy = () => {
    copy();
    setCopied(true);
  };

  useEffect(() => {
    if (ifCopied) {
      const doHide = setTimeout(() => {
        setCopied(false);
      }, timeOut);

      return () => {
        clearTimeout(doHide);
      };
    }
    return undefined;
  }, [copied, ifCopied, timeOut]);

  return [onCopy, ifCopied];
}
