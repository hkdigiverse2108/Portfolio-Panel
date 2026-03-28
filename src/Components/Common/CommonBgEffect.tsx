import { type FC } from "react";
import { ImagePath } from "../../Constants";

const CommonBgEffect: FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* GOLDEN RAYS */}
      <div className="golden-ray-static top-[40%] left-[-25%]"></div>
      <div className="golden-ray-static top-[60%] left-[-25%] opacity-40"></div>

      {/* PATTERNS */}
      <img src={`${ImagePath}logo/grid-01.svg`} alt="pattern" className="absolute right-0 top-0 w-full max-w-[300px] xl:max-w-[500px] opacity-20 dark:opacity-10" />
      <img src={`${ImagePath}logo/grid-01.svg`} alt="pattern" className="absolute bottom-0 left-0 w-full max-w-[300px] rotate-180 xl:max-w-[500px] opacity-20 dark:opacity-10" />
    </div>
  );
};

export default CommonBgEffect;
