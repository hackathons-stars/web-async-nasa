import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';

const tData = [16, 17, 19, 20, 20, 20, 23, 25, 28, 30];
const xLabels = [
  '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h'
];

const Grafico = () => {
    return (
        <LineChart
            width={500}
            height={300}
            series={[
                { data: tData },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels, label: 'Horário', disableTicks: false }]}
            yAxis={[{ label: 'Temperatura (°C)', disableTicks: true }]}
            leftAxis={null}
        >
            <ChartsReferenceLine x='6h' label='amanhecer' labelAlign="start" />
        </LineChart>
    );
}

export default Grafico;