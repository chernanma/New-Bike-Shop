window.onload = function() {
  const options = {
    title: {
      text: "Top Category Products",
      fontSize: 20
    },
    subtitles: [
      {
        text: "December, 2020"
      }
    ],
    animationEnabled: true,
    data: [
      {
        type: "pie",
        startAngle: 40,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 48, label: "Road" },
          { y: 26, label: "Mtb" },
          { y: 5, label: "Gravel" },
          { y: 8, label: "Track" },
          { y: 9, label: "Bmx" },
          { y: 2, label: "Downhill" }
        ]
      }
    ]
  };
  $("#chartContainer").CanvasJSChart(options);

  const chart = new CanvasJS.Chart("chartContainerSales", {
    title: {
      text: "Sales by Month",
      fontSize: 20
    },
    subtitles: [
      {
        text: "Bike Shop"
      }
    ],
    axisX: {
      valueFormatString: "MMM",
      interval: 1,
      intervalType: "month"
    },
    axisY: {
      includeZero: false
    },
    data: [
      {
        type: "line",

        dataPoints: [
          { x: new Date(2020, 00, 1), y: 450 },
          { x: new Date(2020, 01, 1), y: 414 },
          {
            x: new Date(2020, 02, 1),
            y: 520,
            indexLabel: "highest",
            markerColor: "red",
            markerType: "triangle"
          },
          { x: new Date(2020, 03, 1), y: 460 },
          { x: new Date(2020, 04, 1), y: 450 },
          { x: new Date(2020, 05, 1), y: 500 },
          { x: new Date(2020, 06, 1), y: 480 },
          { x: new Date(2020, 07, 1), y: 480 },
          {
            x: new Date(2020, 08, 1),
            y: 410,
            indexLabel: "lowest",
            markerColor: "DarkSlateGrey",
            markerType: "cross"
          },
          { x: new Date(2020, 09, 1), y: 500 },
          { x: new Date(2020, 10, 1), y: 480 },
          { x: new Date(2020, 11, 1), y: 510 }
        ]
      }
    ]
  });
  chart.render();
};
