import React, { useEffect, useState, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
const SERVER_IP = import.meta.env.VITE_SERVER_IP || "SERVER_IP";

const LiveDataChart = () => {
  const [prices, setPrices] = useState();

  const socketUrl = `ws://${SERVER_IP}:8081`;
  const [lastCandleTime, setLastCandleTime] = useState(0);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<am5.Root | null>(null); // Use ref to persist root
  const currentLabelRef = useRef<am5xy.AxisLabel | null>(null);
  const currentValueDataItemRef =
    useRef<am5.DataItem<am5xy.IValueAxisDataItem> | null>(null);
  useEffect(() => {
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
      ws.send(
        JSON.stringify({
          action: "subscribe",
          symbol: "USD/JPY",
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log('Received data:', data);

      if (data.symbol && data.price) {
        setPrices(data.price);
      }
      console.log("Received data:", data.price);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Chart creation
    setLastCandleTime(Date.now());

    const root = am5.Root.new(chartRef.current!); // Initialize root with the chart div
    rootRef.current = root; // Persist the root in a ref

    const myTheme = am5.Theme.new(root);
    myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({ visible: false });

    root.setThemes([am5themes_Animated.new(root), myTheme]);

    let stockChart = root.container.children.push(
      am5stock.StockChart.new(root, { paddingRight: 0 })
    );

    root.numberFormatter.set("numberFormat", "#,###.####");

    let mainPanel = stockChart.panels.push(
      am5stock.StockPanel.new(root, {
        wheelY: "zoomX",
        panX: true,
        panY: true,
      })
    );

    let valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, { pan: "zoom" }),
        extraMin: 0.1,
        tooltip: am5.Tooltip.new(root, {}),
        numberFormat: "#,###.####",
        extraTooltipPrecision: 2,
      })
    );

    let dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        extraMax: 0.1,
        baseInterval: { timeUnit: "second", count: 5 },
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let currentValueDataItem = valueAxis.createAxisRange(
      valueAxis.makeDataItem({ value: 0 })
    );
    if (currentValueDataItem)
      currentValueDataItemRef.current = currentValueDataItem;

    let currentLabel = currentValueDataItem.get("label");
    if (currentLabel) {
      currentLabel.setAll({
        fill: am5.color(0xffffff),
        background: am5.Rectangle.new(root, { fill: am5.color(0x000000) }),
      });
      currentLabelRef.current = currentLabel;
    }

    let currentGrid = currentValueDataItem.get("grid");
    if (currentGrid) {
      currentGrid.setAll({ strokeOpacity: 0.5, strokeDasharray: [2, 5] });
    }

    let valueSeries = mainPanel.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: "USD/JPY",
        clustered: false,
        valueXField: "Date",
        valueYField: "Close",
        highValueYField: "High",
        lowValueYField: "Low",
        openValueYField: "Open",
        calculateAggregates: true,
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText:
          "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
        legendRangeValueText: "",
      })
    );

    stockChart.set("stockSeries", valueSeries);

    let valueLegend = mainPanel.plotContainer.children.push(
      am5stock.StockLegend.new(root, { stockChart: stockChart })
    );

    valueLegend.data.setAll([valueSeries]);

    mainPanel.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        // snapToSeries: [valueSeries],
        // snapToSeriesBy: "y!"
      })
    );

    // Cleanup function
    return () => {
      root.dispose();
    };
  }, []); // Run only once on component mount

  useEffect(() => {
    let interval;
    const currentValueDataItem = currentValueDataItemRef.current;
    const currentLabel = currentLabelRef.current;
    const updateChart = () => {
      const date = Date.now();
      const root = rootRef.current;
      if (!root) return;

      const stockChart = root?.container.children.getIndex(0);
      const valueSeries = stockChart.get("stockSeries");
      const livePrice = prices;
      currentValueDataItem?.animate({
        key: "value",
        to: livePrice,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic),
      });
      currentLabel?.set(
        "text",
        stockChart?.getNumberFormatter().format(livePrice)
      );
      let bg = currentLabel?.get("background");
      if (bg) {
        if (livePrice < open) {
          bg.set("fill", root.interfaceColors.get("negative"));
        } else {
          bg.set("fill", root.interfaceColors.get("positive"));
        }
      }
      console.log("livePrice", livePrice);
      if (livePrice) {
        let lastDataObject = valueSeries.data.getIndex(
          valueSeries.data.length - 1
        );
        const value = livePrice;
        let high = value;
        let low = value;
        let open = value;

        if (lastDataObject) {
          let previousDate = lastDataObject.Date;
          open = lastDataObject.Open;
          high = Math.max(lastDataObject.High, value);
          low = Math.min(lastDataObject.Low, value);
          // Check if 5 seconds have passed since the last candle was created
          if (date - lastCandleTime >= 5000) {
            let dObj1 = {
              Date: date,
              Close: value,
              Open: value,
              Low: value,
              High: value,
            };
            console.log(dObj1);
            valueSeries.data.push(dObj1);

            setLastCandleTime(date);
          } else {
            let dObj2 = {
              Date: previousDate,
              Close: value,
              Open: open,
              Low: low,
              High: high,
            };

            valueSeries.data.setIndex(valueSeries.data.length - 1, dObj2);
            sbSeries.data.setIndex(sbSeries.data.length - 1, dObj2);
          }
        } else {
          // If this is the first data point
          let dObj1 = {
            Date: date,
            Close: value,
            Open: value,
            Low: value,
            High: value,
          };

          valueSeries.data.push(dObj1);
          sbSeries.data.push(dObj1);
        }

        // Update current value

        if (currentLabel) {
          currentValueDataItem?.animate({
            key: "value",
            to: livePrice,
            duration: 500,
            easing: am5.ease.out(am5.ease.cubic),
          });
          currentLabel.set(
            "text",
            stockChart?.getNumberFormatter().format(livePrice)
          );
          let bg = currentLabel.get("background");
          if (bg) {
            if (value < open) {
              bg.set("fill", root.interfaceColors.get("negative"));
            } else {
              bg.set("fill", root.interfaceColors.get("positive"));
            }
          }
        }
      }
    };

    if (prices) {
      interval = setInterval(updateChart, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [prices]); // Re-run effect if prices change

  return (
    <div
      id="chartdiv"
      ref={chartRef}
      style={{ width: "100%", height: "90vh" }}
    ></div>
  );
};

export default LiveDataChart;
