import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// type Data = {
//   name: string;
//   value: number;
// };
import type { PieData as Data } from ".";

// const data: Data[] = [
//   { name: "下痢", value: 3 },
//   { name: "フツウ", value: 1 },
//   { name: "カタメ", value: 1 },
// ];

const COLORS: string[] = ["#48BB78", "#4299E1", "#A0AEC0"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <label>{`${payload[0].name}: ${payload[0].value}回`}</label>
      </div>
    );
  }
};

export default function IdPie(props: { data: Data[] }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart
        // width={400} height={400}
        >
          <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            // fill="#8884d8"
            dataKey="value"
          >
            {props.data &&
              props.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
