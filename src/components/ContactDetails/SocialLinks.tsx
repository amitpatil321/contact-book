import { Skeleton } from "primereact/skeleton";
import { v4 as uuid } from "uuid";
import { Meta } from "../../types/types";

const SocialLinks: React.FC<{ meta: Meta[]; loading: boolean }> = ({
  meta,
  loading,
}) => {
  if (!meta || meta.length === 0) return null;
  const { linkedin, github, website } = meta[0];

  const links = [
    {
      label: "LinkedIn",
      url: linkedin,
      icon: <i className="text-blue-600 pi pi-linkedin" />,
    },
    {
      label: "GitHub",
      url: github,
      icon: <i className="text-gray-800 pi pi-github" />,
    },
    {
      label: "Website",
      url: website,
      icon: <i className="text-green-600 pi pi-globe" />,
    },
  ];

  return (
    <div className="flex flex-row pt-2 w-full">
      {loading ? (
        <div className="flex flex-row space-x-3 py-1.8">
          <div className="flex flex-row items-center space-x-1">
            <Skeleton shape="circle" size="1.4rem" />
            <Skeleton width="3rem" height="0.7rem" />
          </div>
          <div className="flex flex-row items-center space-x-1">
            <Skeleton shape="circle" size="1.4rem" />
            <Skeleton width="3rem" height="0.7rem" />
          </div>
          <div className="flex flex-row items-center space-x-1">
            <Skeleton shape="circle" size="1.4rem" />
            <Skeleton width="3rem" height="0.7rem" />
          </div>
        </div>
      ) : (
        links.map((link) =>
          link.url ? (
            <a
              key={uuid()}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mr-2"
            >
              <span className="mr-2 text-xl">{link.icon}</span>
              <span className="font-medium text-gray-700">{link.label}</span>
            </a>
          ) : null
        )
      )}
    </div>
  );
};

export default SocialLinks;
