import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import type { BarData as Data } from ".";

// const data: Data[] = [
//   {
//     // name: "累計",
//     name: null,
//     下痢: 4,
//     フツウ: 2,
//     カタメ: 1,
//   },
// ];

export default function IdBar(props: { data: Data[] }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="下痢" fill="#48BB78">
            <LabelList dataKey="下痢" fill="white" />
          </Bar>
          <Bar dataKey="フツウ" fill="#4299E1">
            <LabelList dataKey="フツウ" fill="white" />
          </Bar>
          <Bar dataKey="カタメ" fill="#A0AEC0">
            <LabelList dataKey="カタメ" fill="white" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
