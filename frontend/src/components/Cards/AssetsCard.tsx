interface Asset {
  title: string;
  description: string;
  icon?: string; // Added optional icon property
  number?: string; // Added optional number property
}

interface AssetsCardProps {
  cardWidth?: string;
  cardHeight?: string;
  titleFontSize?: string;
  bodyFontSize?: string;
  iconSize?: string;
  cardPadding?: string;
  data: Asset[];
}

const AssetsCard: React.FC<AssetsCardProps> = ({
  cardWidth = "288px",
  cardHeight = "288px",
  titleFontSize = "24px",
  bodyFontSize = "16px",
  iconSize = "48px",
  cardPadding = "20px",
  data,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      {data?.map((item, index) => (
        <div
          key={index}
          style={{
            width: cardWidth,
            height: cardHeight,
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: cardPadding,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
            color: "black",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0026FF";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#EFEFEF5C";
            e.currentTarget.style.color = "black";
          }}
          className="group"
        >
          {(item.icon || item.number) && (
            <div
              className="bg-pharo-white group-hover:bg-[#FFFFFF8A] rounded-[8px] mb-2 flex items-center justify-center"
              style={{ width: iconSize, height: iconSize }}
            >
              {item.icon && <img src={item.icon}  alt="" style={{ width: "20px", height: "20px" }} />}
              {item.number && (
                <p className="font-bold text-[30px] text-pharos-blue">
                  {item.number}
                </p>
              )}
            </div>
          )}
          <h2
            className="font-bold"
            style={{ fontSize: titleFontSize, margin: 0 }}
          >
            {item.title}
          </h2>
          <p
            style={{
              fontSize: bodyFontSize,
              marginTop: "10px",
            }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AssetsCard;
