import React from "react";

interface TabProps {
  tabs: Record<string, any>[];
  className?: string;
  handleTabClick: (tab: Record<string, any>) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, className, handleTabClick }) => {
  return (
    <div className={`overflow-x-auto overflow-y-hidden ${className}`}>
      <div className="block">
        <div className=" border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs?.map((tab) => (
              <div
                key={tab?.name}
                className={`flex whitespace-nowrap border-b-4 py-4 px-1 text-sm font-medium cursor-pointer
                  ${
                    tab.current
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700"
                  }`}
                aria-current={tab?.current ? "page" : undefined}
                onClick={() => handleTabClick(tab)}
              >
                {tab?.name}
                {tab?.count > 0 ? (
                  <span
                    className={`
                      ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block bg-selected
                      ${tab?.current ? " text-primary" : ""}`}
                  >
                    {tab?.count}
                  </span>
                ) : (
                  ""
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tab;
