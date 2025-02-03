import { Info } from "lucide-react";
import React from "react";
interface NAVITEMS {
  heading: string;
  subHeading: string;
}
const newItems: NAVITEMS[] = [
  {
    heading: "E-retailer retag health drinks",
    subHeading: "4h ago - 3354 readers",
  },
  {
    heading: "Tech companies invest in AI",
    subHeading: "6h ago - 4200 readers",
  },
  {
    heading: "Stock markets hit record high",
    subHeading: "2h ago - 5000 readers",
  },
  {
    heading: "New smartphone launch next week",
    subHeading: "1h ago - 2900 readers",
  },
  {
    heading: "Sports league announces schedule",
    subHeading: "3h ago - 1800 readers",
  },
];

const News = () => {
  return (
    <div className="hidden md:block w-[25%] bg-white h-fit rounded-lg border border-gray-300">
      <div className="flex items-center justify-between p-3">
        <h1 className="font-medium">Linkedin News</h1>
        <Info size={18} />
      </div>
      <div>
        {newItems.map((item, index) => {
          return (
            <div
              key={index}
              className="p-3 py-2 hover:bg-gray-200 hover:cursor-pointer"
            >
              <h1 className="text-sm font-medium">{item.heading}</h1>
              <p className="text-xs text-gray-600">{item.subHeading}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
