const ControlePanel: React.FC<{
  isPlayed: boolean;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}> = ({ isPlayed, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{isPlayed ? "⏸" : "▶️️"}</button>
    </>
  );
};

export default ControlePanel;
