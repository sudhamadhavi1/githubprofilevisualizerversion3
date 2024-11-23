import {PieChart, Pie, Cell, Legend} from 'recharts'

const PieChartDig = props => {
  let {data} = props
  const {dataConversion, cxVal, cyVal, innerRVal, outerRVal, width} = props
  const {wrapperStyles, legendalign} = props
  console.log('Data in PieChart', data)

  if (dataConversion === true) {
    data = Object.keys(data).map(key => ({
      name: key,
      value: data[key],
    }))
  }
  console.log('final', data)

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const COLORS = [
    '#1E90FF',
    '#32CD32',
    '#FFD700',
    '#FF4500',
    '#8A2BE2',
    '#00CED1',
    '#FF69B4',
    '#7FFF00',
    '#DC143C',
    '#00BFFF',
    '#FF6347',
    '#4682B4',
    '#D2691E',
    '#9ACD32',
    '#FF7F50',
    '#6495ED',
    '#8B4513',
    '#7B68EE',
    '#48D1CC',
    '#C71585',
  ]

  return (
    <PieChart width={width} height={400}>
      <Pie
        data={data}
        cx={cxVal}
        cy={cyVal}
        innerRadius={innerRVal}
        outerRadius={outerRVal}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map(entry => (
          <Cell
            key={`cell-${entry.name}`}
            fill={COLORS[data.indexOf(entry) % COLORS.length]}
          />
        ))}
      </Pie>
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align={legendalign}
        wrapperStyle={wrapperStyles}
      />
    </PieChart>
  )
}

export default PieChartDig
