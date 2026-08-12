export const MaterialSpinner = ({ sizeInPx }: { sizeInPx: number }) => {
  return (
    <svg
      className="material-spinner"
      viewBox="0 0 50 50"
      style={{
        width: `${sizeInPx}px`,
        height: `${sizeInPx}px`,
      }}
    >
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="2"
      ></circle>
    </svg>
  );
};
