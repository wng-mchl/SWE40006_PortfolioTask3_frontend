type Props = {
  title: string;
  value: number;
};

function SummaryCard({ title, value }: Props) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <h1 className="card-text">RM {value.toFixed(2)}</h1>
    </div>
  );
}

export default SummaryCard;

