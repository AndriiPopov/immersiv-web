import React from "react";

import { Chart } from "react-google-charts";
import moment from "moment";
import humanizeString from "humanize-string";

export const ChartItem = (props) => {
    const {
        data,
        title,
        column,
        seconds,
        type = "LineChart",
        isDate = true,
    } = props;

    const dataRefined = data
        ? [
              [
                  humanizeString(data.columnHeaders[0].name.replace("ga:", "")),
                  humanizeString(
                      data.columnHeaders[column].name.replace("ga:", "")
                  ),
              ],
              ...data.rows
                  .map((i) => [
                      isDate ? moment(i[0], "YYYYMMDD").format("D MMM") : i[0],
                      parseInt(i[column]) / (seconds ? 60 : 1),
                  ])
                  .sort((a, b) => (isDate ? 0 : b[1] - a[1])),
          ]
        : [];
    return (
        <div style={{ maxWidth: "400px", margin: "20px", width: "100%" }}>
            <Chart
                chartType={type}
                width="100%"
                height="400px"
                data={dataRefined}
                options={{
                    title,
                    legend: {
                        position: "none",
                    },
                    chartArea: { width: "85%", height: "80%" },
                    allowHtml: true,
                    width: "100%",
                }}
            />
        </div>
    );
};

// // import {
// //     ResponsiveContainer,
// //     LineChart,
// //     XAxis,
// //     YAxis,
// //     CartesianGrid,
// //     Line,
// //     Tooltip,
// // } from "recharts";

// export const ChartItem = (props) => {
//     const { data, xKey, valKey } = props;
//     console.log("data in chart", data);
//     return (
//         <ResponsiveContainer height="75%" width="90%">
//             <LineChart data={data}>
//                 <XAxis dataKey={xKey} />
//                 <YAxis type="number" domain={[0, "dataMax + 100"]} />
//                 <Tooltip />
//                 <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
//                 {data.rows.map((row) => {

//                     return (
//                         <Line
//                             type="monotone"
//                             dataKey={valKey}
//                             stroke="#8884d8"
//                         />
//                     );
//                 })}
//             </LineChart>
//         </ResponsiveContainer>
//     );
// };

export default ChartItem;
