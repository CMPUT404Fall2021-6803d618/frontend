import React, { FC, useCallback, useState, MouseEvent, useEffect, useMemo } from "react";
import "./LikeButton.style.css";
import classnames from "classnames";

interface IProps {
  liked: boolean;
  onClick: () => Promise<void>;
}

const LikeButton: FC<IProps> = (props) => {
  const { liked, onClick } = props;
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    console.log(liked);
  }, [liked]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!liked) {
        onClick();
        setShouldAnimate(true);
      }
    },
    [liked, onClick]
  );

  const className = useMemo(() => {
    return classnames("heart", { liked, animate: shouldAnimate });
  }, [liked, shouldAnimate]);

  return <button onClick={handleClick} className={className} />;
};

export default LikeButton;
