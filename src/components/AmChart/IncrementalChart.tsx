import React, { useEffect, useLayoutEffect, useRef,useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5stock from '@amcharts/amcharts5/stock'
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import ContextMenu from './ContextMenu';  // Import your ContextMenu component
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark'
import { TimeUnit } from '@amcharts/amcharts5/.internal/core/util/Time';
import { createIndicatorIcon, createTimeIcon } from './Icons';
import SymbolBar from '../SymbolBar/SymbolBar';

interface IncrementalChartProps {
  changeTheme: (theme: string) => void;
}

//Setting config for Dark Theme
const LabelColor = am5.color("rgb(0,255,255)") //white
const GridColor  = am5.color("rgb(0,255,255)") //white
const PositiveColor = am5.color("rgb(0,0,255)")  //Positive Candle
const NegativeColor = am5.color("rgb(255,0,255)") //Negative Candle
const BackGroundColor = am5.color("rgb(80,80,80)")


const IncrementalChart: React.FC<IncrementalChartProps> = ({ changeTheme }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<am5.Root | null>(null); // Use ref to persist root
  const [activeTool, setActiveTool] = useState<am5stock.DrawingControl | null>(null);
    const [drawingSelection, setDrawingSelection] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedDrawing, setSelectedDrawing] = useState(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(true);
    const currentLinkRef = useRef<HTMLLinkElement | null>(null);



  let currentUnit = 'day';
  const drawingTools = [
    { type: "Average", icon: "fa fa-chart-line" },
    { type: "Callout", icon: "fa fa-comment" },
    { type: "Doodle", icon: "fa fa-pen" },
    { type: "Ellipse", icon: "fa-regular fa-circle" },
    { type: "Fibonacci", icon: "fa fa-chart-bar" },
    { type: "Fibonacci Timezone", icon: "fa fa-clock" },
    { type: "Horizontal Line", icon: "fa fa-minus" },
    { type: "Horizontal Ray", icon: "fa fa-arrow-right" },
    { type: "Label", icon: "fa fa-tag" },
    { type: "Line", icon: "fa fa-line" },
    { type: "Measure", icon: "fa fa-ruler" },
    { type: "Parallel Channel", icon: "fa fa-arrows-alt-h" },
    { type: "Polyline", icon: "fa fa-draw-polygon" },
    { type: "Quadrant Line", icon: "fa fa-chart-pie" },
    { type: "Rectangle", icon: "fa fa-square" },
    { type: "Regression", icon: "fa fa-chart-line" },
    { type: "Trend Line", icon: "fa fa-chart-line" },
    { type: "Vertical Line", icon: "fa-solid fa-grip-lines-vertical" },
    { type: "Eraser", icon: "fa-solid fa-eraser" },
    { type: "Select", icon: "fa-solid fa-mouse-pointer" },

  ];
  

  useEffect(() => {
    if (isDarkMode) {
      changeTheme('black'); // Notify parent component about the theme change
    } else {
      changeTheme('white');
    }
    const theme = isDarkMode ? 'dark' : 'chart';
    
    // Remove the previous CSS if it exists
    if (currentLinkRef.current) {
      document.head.removeChild(currentLinkRef.current);
    }

    // Create a new link element
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = new URL(`./${theme}.css`, import.meta.url).toString();
    linkElement.type = 'text/css';

    // Append the new link element to the document head
    document.head.appendChild(linkElement);

    // Update the reference to the current link element
    currentLinkRef.current = linkElement;

    // Cleanup on unmount or theme change
    return () => {
      if (currentLinkRef.current) {
        document.head.removeChild(currentLinkRef.current);
        currentLinkRef.current = null;
      }
    };
  }, [isDarkMode]);
// useEffect(() => {
//   loadCSS("./dark.css"); // Test loading the dark theme CSS
// }, []);

   useEffect(()=>{
    
        setDrawingSelection(stockChart?.get('drawingSelectionEnabled'))
   },[drawingSelection])
  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current!);
    
    rootRef.current = root
    const dark = am5themes_Dark.new(root)
    console.log("dark",dark)
    // dark.rule("Label").setAll({
    //   fill: LabelColor,
    //   // fontSize:"1.5em"
    // })
    // dark.rule("InterfaceColors").setAll({
    //   grid: GridColor,
    //   positive: PositiveColor,
    //   negative: NegativeColor,
    //   alternativeBackground: BackGroundColor,
    //   primaryButton: PositiveColor,
    //   disabled: PositiveColor
    // })
    const myTheme = am5.Theme.new(root)
    myTheme.rule("Label").setAll({
      fill: LabelColor,
      // fontSize:"1.5em"
    })
    myTheme.rule("InterfaceColors").setAll({
      grid: GridColor,
      positive: PositiveColor,
      negative:NegativeColor,
      background: PositiveColor
    })
    if (isDarkMode) {
      
      root.setThemes([dark,am5themes_Animated.new(root)]); // Set dark theme
      // loadCSS("./dark.css"); // Load dark CSS
    } else {
      root.setThemes([am5themes_Animated.new(root)]); // Set light theme (example)
      // loadCSS("./chart.css"); // Load light CSS (if needed)
    }    
    const stockChart = root.container.children.push(
        am5stock.StockChart.new(root,{
        })
    )
    // Set global number format
    root.numberFormatter.set('numberFormat', '#,###.######')
    root._logo.dispose();
     // Create a main stock panel (chart)
    const chart = stockChart.panels.push(
        am5stock.StockPanel.new(root, {
            wheelY: 'zoomX',
            panX: true,
            panY: true,
    }));
    
    // chart.get('colors')?.set('step', 2);

    const valueAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {
            pan: 'zoom',
          }),
          tooltip: am5.Tooltip.new(root, {}),
          numberFormat: '#,###.####',
          extraTooltipPrecision: 1,
        })
      );

    valueAxis.get('renderer')?.labels.template.setAll({
      centerY: am5.percent(100),
      maxPosition: 0.98
    });

    // valueAxis.axisHeader.children.push(am5.Label.new(root, {
    //   text: 'Value',
    //   fontWeight: 'bold',
    //   paddingBottom: 5,
    //   paddingTop: 5
    // }));

    const volumeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
      }),
      numberFormat: '#a',
      forceHidden:true,
      visible:false

    }));

    volumeAxis.get('renderer')?.labels.template.setAll({
      maxPosition: 0.98,
      forceHidden:true,
      visible:false

    });
    
    const dateAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
        groupData:true,
        groupCount:1000,
        baseInterval: { timeUnit: 'day', count: 1 },
        groupIntervals:[
            { timeUnit:'day', count: 1},
            { timeUnit:'day', count: 2},
            { timeUnit: 'day', count: 3 },
            { timeUnit: 'day', count: 7 },
            { timeUnit: 'day', count: 14 },
            { timeUnit: 'day', count: 30 },
            // { timeUnit: 'week', count: 1},
            // { timeUnit: 'week', count: 2},
            // { timeUnit: 'week', count: 3},
            // { timeUnit: 'month', count: 1}
        ],
        
      renderer: am5xy.AxisRendererX.new(root, {
      }),
      tooltip: am5.Tooltip.new(root, {}),
      extraMax:0.3,
      maxDeviation: 1,
    //   maxZoomCount:200
    }));

    // dateAxis.get('renderer')?.labels.template.setAll({
    //   minPosition: 0.01,
    //   maxPosition: 0.99
    // });

    const color = root.interfaceColors.get('background');
    
    let valueSeries = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        fill: color,
        clustered: false,
        calculateAggregates: true,
        stroke: color,
        name: 'STCK',
        xAxis: dateAxis,
        yAxis: valueAxis,
        valueYField: 'close',
        openValueYField: 'open',
        lowValueYField: 'low',
        highValueYField: 'high',
        valueXField: 'date',
        lowValueYGrouped: 'low',
        highValueYGrouped: 'high',
        openValueYGrouped: 'open',
        valueYGrouped: 'close',
        legendValueText: 'open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}',
        legendRangeValueText: '{valueYClose}',
      })
    );
    stockChart.set('stockSeries', valueSeries);


    // const valueTooltip = valueSeries.set('tooltip', am5.Tooltip.new(root, {
    //   getFillFromSprite: false,
    //   getStrokeFromSprite: true,
    //   getLabelFillFromSprite: true,
    //   autoTextColor: false,
    //   pointerOrientation: 'horizontal',
    //   labelText: '{name}: {valueY} {valueYChangePreviousPercent.formatNumber("[#00ff00]+#,###.##|[#ff0000]#,###.##|[#999999]0")}%'
    // }));
    // valueTooltip.get('background')?.set('fill', root.interfaceColors.get('background'));

    const volumePanel = stockChart.panels.push(
        am5stock.StockPanel.new(root, {
          forceHidden:true,
          visible:false

        })
      );
      // volumePanel.hide()
      // volumePanel.setAll({
      //   visible:false
      // })
      // console.log("vol.hide", volumePanel.isVisible())
    const volumeSeries = volumePanel.series.push(am5xy.ColumnSeries.new(root, {
      name: 'Volume',
      clustered: false,
      valueYField: 'volume',
      valueXField: 'date',
      xAxis: dateAxis,
      yAxis: volumeAxis,
      legendValueText: '{valueY}',
      forceHidden:true,
      visible:false
      
    }));
    stockChart.set('volumeSeries', volumeSeries);

    const valueLegend = chart.plotContainer.children.push(
        am5stock.StockLegend.new(root, {
          stockChart: stockChart,
        })
    );
    valueLegend.data.setAll([valueSeries]);

    const volumeLegend = volumePanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
        stockChart: stockChart,
        forceHidden:true,
        visible:false

    }))
    
    volumeLegend.data.setAll([volumeSeries]);

    chart.rightAxesContainer.set('layout', root.verticalLayout);

    chart.set('cursor', am5xy.XYCursor.new(root, 
        {
            yAxis: valueAxis,
            xAxis: dateAxis,
            // snapToSeries: [valueSeries],
            // snapToSeriesBy: 'y!',
    }));


    //series switcher control
    const seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
        stockChart: stockChart,
        name:''
    });
  
    seriesSwitcher.events.on('selected', (ev: am5.Event<AMEvent["type"]>) => {
        setSeriesType(ev.item.id as string);
    });
  
      // Get settings for a new series
    function getNewSettings(series: am5xy.XYSeries): Record<string, any> {
        const newSettings: Record<string, any> = {};
        ['name', 'valueYField', 'highValueYField', 'lowValueYField', 'openValueYField', 'calculateAggregates', 'valueXField', 'xAxis', 'yAxis', 'legendValueText', 'stroke', 'fill'].forEach((setting) => {
          newSettings[setting] = series.get(setting);
        });
        return newSettings;
    }
  
      // Set series type based on user selection
      function setSeriesType(seriesType: string): void {
        // Get current series and its settings
        const currentSeries = stockChart.get('stockSeries') as am5xy.XYSeries;
        const newSettings = getNewSettings(currentSeries);
        if (seriesType === 'line') {
            delete newSettings.openValueYField;  // Remove openValueYField for line series
        } else {
            newSettings.openValueYField = 'open';  // Restore openValueYField for other series types
        }
        // Remove previous series
        const data = currentSeries.data.values;
        chart.series.removeValue(currentSeries);
      
        // Create new series
        let series: am5xy.XYSeries | undefined;
        switch (seriesType) {
          case 'line':
            series = chart.series.push(am5xy.LineSeries.new(root, newSettings));
            series.set('stroke',LabelColor)
            series.set('fill',PositiveColor)
            series.strokes.template.setAll({
                strokeWidth: 3
              });
              series.fills.template.setAll({
                fillOpacity: 0.1,
                visible: true
              });
            break;
          case 'candlestick':
          case 'procandlestick':
            newSettings.clustered = false;
            series = chart.series.push(am5xy.CandlestickSeries.new(root, newSettings));
            if (seriesType === 'procandlestick') {
              series.columns.template.get('themeTags').push('pro');
            }
            break;
          case 'ohlc':
            newSettings.clustered = false;
            series = chart.series.push(am5xy.OHLCSeries.new(root, newSettings));
            break;
        }
      
        if (series) {
          // Set the new series as the stock series
          series.data.setAll(data);
          stockChart.set('stockSeries', series);
          valueSeries = series; // Update the reference to valueSeries

          // Reattach cursor to the new series
          const cursor = chart.get('cursor') as am5xy.XYCursor;
          // if (cursor) {
          //   cursor.set('snapToSeries', [series]);
          // }
      
          // Update the legend with the new series
          valueLegend.data.removeValue(currentSeries);
          valueLegend.data.insertIndex(0, series);
      
          // Clear any existing pan and wheel events
          chart.events.off('panended');
          chart.events.off('wheelended');
      
          // Reattach data loading events
          chart.events.on('panended', () => {
            console.log("Pan ended event triggered.");
            loadSomeData(); // Log to ensure this is called
          });
      
          chart.events.on('wheelended', () => {
            console.log("Wheel ended event triggered.");
            if (wheelTimeout) {
              wheelTimeout.dispose();
            }
      
            wheelTimeout = chart.setTimeout(() => {
              loadSomeData(); // Log to ensure this is called
            }, 50);
          });
      
          // Redraw chart
        //   chart.invalidateData();
          chart.appear(1000, 100);
        }
      }
      
      
   

    const loadData = (unit: string, min: number, max: number, side: string) => {
      min = am5.time.round(new Date(min), unit, 1).getTime();
      console.log("min before minus",min)
        min = min - am5.time.getDuration('day', 25);
        console.log("min after minus",min)

      const url = `https://www.amcharts.com/tools/data/?unit=${unit}&start=${min}&end=${max}`;

      am5.net.load(url).then((result: any) => {
        const data = am5.CSVParser.parse(result.response, {
          delimiter: ',',
          reverse: false,
          skipEmpty: true,
          useColumnNames: true
        });
        console.log(data)
        const processor = am5.DataProcessor.new(root, {
          numericFields: ['date', 'open', 'high', 'low', 'close', 'volume']
        });
        console.log("data before processing",data)
        processor.processMany(data);
        console.log("data after processing",data)

        const start = dateAxis.get('start') as number;
        const end = dateAxis.get('end') as number;

        if (side === 'none') {
          if (data.length > 0) {
            if (dateAxis.get('baseInterval')?.timeUnit !== unit) {
              dateAxis.set('baseInterval', { timeUnit: unit, count: 1 });
            }
            dateAxis.set('min', min);
            dateAxis.set('max', max);
            dateAxis.setPrivate('min', min);
            dateAxis.setPrivate('max', max);
            console.log("valueSeries data before loading",valueSeries.data)
            valueSeries.data.setAll(data);
            console.log("valueSeries data after loading",valueSeries.data)

            volumeSeries.data.setAll(data);

            // dateAxis.zoom(0, 1, 0);
          }
        } else if (side === 'left') {
          
          console.log('group interval',dateAxis.get('groupInterval'))
          dateAxis.setAll({
            groupIntervals:[
              { timeUnit:'day', count: 1},
              { timeUnit:'day', count: 2},
              { timeUnit: 'day', count: 3 },
              { timeUnit: 'day', count: 7 },
              { timeUnit: 'day', count: 14 },
              { timeUnit: 'day', count: 30 },
            ]
          })
          const seriesFirst: Record<string, number> = {};
          seriesFirst[valueSeries.uid] = valueSeries.data.getIndex(0)?.date as number;
          seriesFirst[volumeSeries.uid] = volumeSeries.data.getIndex(0)?.date as number;
            console.log("seriesFirst",seriesFirst)
            console.log("valueSeries data before loading",valueSeries.data)
          for (let i = data.length - 1; i >= 0; i--) {
            const date = data[i].date;
            if (seriesFirst[valueSeries.uid] > date) {
              valueSeries.data.unshift(data[i]);
            }
            if (seriesFirst[volumeSeries.uid] > date) {
              volumeSeries.data.unshift(data[i]);
            }
            
          }

          const data2 = valueSeries
          // // valueSeries.resetExtremes()
          // // valueSeries.resetGrouping()
          valueSeries.data.setAll(data2.data.values)
          volumeSeries.data.setAll(data2.data.values)
          const currentSeries = stockChart.get('stockSeries') as am5xy.XYSeries;
          currentSeries.data= valueSeries.data
          // console.log('data2',data2)
          console.log("valueSeries data after loading",valueSeries.data)
          console.log('current series data after loading',currentSeries.data)
          min = Math.max(min, absoluteMin);
          dateAxis.set('min', min);
          dateAxis.setPrivate('min', min);
          dateAxis.set('start', 0);
          dateAxis.set('end', (end - start) / (1 - start));
        } else if (side === 'right') {
          const seriesLast: Record<string, number> = {};
          seriesLast[valueSeries.uid] = valueSeries.data.getIndex(valueSeries.data.length - 1)?.date as number;
          seriesLast[volumeSeries.uid] = volumeSeries.data.getIndex(volumeSeries.data.length - 1)?.date as number;

          for (let i = 0; i < data.length; i++) {
            const date = data[i].date;
            if (seriesLast[valueSeries.uid] < date) {
              valueSeries.data.push(data[i]);
            }
            if (seriesLast[volumeSeries.uid] < date) {
              volumeSeries.data.push(data[i]);
            }
            
          }

          max = Math.min(max, absoluteMax);
          dateAxis.set('max', max);
          dateAxis.setPrivate('max', max);
          dateAxis.set('start', start / end);
          dateAxis.set('end', 1);
        }
      });
    };
    
    
    const loadSomeData = () => {
      const start = dateAxis.get('start') as number;
      const end = dateAxis.get('end') as number;
      const selectionMin = Math.max(dateAxis.getPrivate('selectionMin') as number, absoluteMin);
      const selectionMax = Math.min(dateAxis.getPrivate('selectionMax') as number, absoluteMax);
        
      const min = dateAxis.getPrivate('min') as number;
      const max = dateAxis.getPrivate('max') as number;
        console.log('min',min)
        console.log('selectionmin',selectionMin)
      if (start < 0) {
        console.log('loading data',currentUnit,selectionMin,min)
        loadData(currentUnit, selectionMin, min, 'left');
      }
      if (end > 1) {
        loadData(currentUnit, max, selectionMax, 'right');
      }
    };

    document.getElementById('btn_h')?.addEventListener('click', () => {
      if (currentUnit !== 'hour') {
        currentUnit = 'hour';
        loadData('hour', dateAxis.getPrivate('selectionMin') as number, dateAxis.getPrivate('selectionMax') as number, 'none');
      }
    });

    document.getElementById('btn_d')?.addEventListener('click', () => {
      if (currentUnit !== 'day') {
        currentUnit = 'day';
        loadData('day', dateAxis.getPrivate('selectionMin') as number, dateAxis.getPrivate('selectionMax') as number, 'none');
      }
    });

    document.getElementById('btn_m')?.addEventListener('click', () => {
        console.log("button month")
      if (currentUnit !== 'month') {
        currentUnit = 'month';
        loadData('month', dateAxis.getPrivate('selectionMin') as number, dateAxis.getPrivate('selectionMax') as number, 'none');
      }
    });

    const currentDate = new Date();
    const min = currentDate.getTime() - am5.time.getDuration('day', 50);
    const max = currentDate.getTime();

    const absoluteMax = max;
    const absoluteMin = new Date(2000, 0, 1).getTime();

    chart.events.on('panended', () => {
      loadSomeData();
    });

    let wheelTimeout: any;
    chart.events.on('wheelended', () => {
      if (wheelTimeout) {
        wheelTimeout.dispose();
      }

      wheelTimeout = chart.setTimeout(() => {
        loadSomeData();
      }, 50);
    });

    loadData('day', min, max, 'none');

    chart.appear(1000, 500);

    
    let periodSelector = am5stock.PeriodSelector.new(root, {
        stockChart: stockChart,
        periods: [
          { timeUnit: 'month', count: 1, name: '1 Month' },
          { timeUnit: 'month', count: 2, name: '2 Months' },
        ],
      });
    // Set default period after data is validated
    valueSeries.events.once("datavalidated", function() {
        periodSelector.selectPeriod({ timeUnit: "month", count: 1 });
    });
    
    //Interval Switcher control
    
    const intervalSwitcher = am5stock.IntervalControl.new(root, {
        stockChart: stockChart,
        // icon: createTimeIcon(),
        items: [
          { id: '1 day', label: '1 day', interval: { timeUnit: 'day', count: 1 } },
          { id: '2 days', label: '2 days', interval: { timeUnit: 'day', count: 2 } },
          { id: '3 days', label: '3 days', interval: { timeUnit: 'day', count: 3 } },
          { id: '7 days', label: '7 days', interval: { timeUnit: 'day', count: 7 } },
          { id: '2 Weeks', label: '2 Weeks', interval: { timeUnit: 'day', count: 14 } },
          { id: '1 Month', label: '1 Month', interval: { timeUnit: 'day', count: 30 } },
        //   { id: '1 Week', label: '1 Week', interval: { timeUnit: 'week', count: 1}},
        //   { id: '2 Weeks', label: '2 Weeks', interval: { timeUnit: 'week', count: 2}},
        //   { id: '3 Weeks', label: '3 Weeks', interval: { timeUnit: 'week', count: 3}},
        //   { id: '1 Month', label: '1 Month', interval: { timeUnit: 'month', count: 1}}


        ],
      });
  
      intervalSwitcher.events.on('selected', (ev) => {
        
        const newInterval = ev.item.interval
        
        // const min = dateAxis.getPrivate('min') as number;
        // const selectionMin = Math.max(dateAxis.getPrivate('selectionMin') as number, absoluteMin);

        // loadData(currentUnit,selectionMin,min,"left")
        // // chart.invalidateRawData();
        // // chart.appear(500, 100);
        // loadSomeData()
        dateAxis.set('groupInterval', ev.item.interval);
        
        console.log('groupintervals',dateAxis.get('groupIntervals'))

        // valueSeries.set('xAxis',dateAxis)
        // stockChart.set('stockSeries',valueSeries)
        
      });

    //reapplying axis settings after indicator  
   
    // const drawingControl = am5stock.DrawingControl.new(root, {
    //     stockChart: stockChart,
    //   });
  
    //   stockChart.events.on('drawingadded', () => {
    //     console.log('drawwing added')
    //     drawingControl.set('active',false)
    //   });
    //   stockChart.events.on('drawingselected', () => {
    //     console.log('drawwing select')
    //     drawingControl.set('active',true)
    //   });
    //    Function to activate drawing mode
    
// Add the toolbar
const toolbar = am5stock.StockToolbar.new(root, {
    container: document.getElementById('chartcontrols')!,
    stockChart: stockChart,
    controls: [
      am5stock.IndicatorControl.new(root, {
        stockChart: stockChart,
        legend: valueLegend,
        name:'',
        // icon: createIndicatorIcon()
      }),
     intervalSwitcher,
      periodSelector,
      seriesSwitcher,
    //  drawingControl,
      am5stock.ResetControl.new(root, {
        stockChart: stockChart,
      }),
      am5stock.SettingsControl.new(root, {
        stockChart: stockChart,
      }),
    ],
  });
   
//   const toggleDarkMode = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };
//   const darkModeButton = document.getElementById('darkmode-toggle');
//   if (darkModeButton) {
//     darkModeButton.addEventListener('click', toggleDarkMode);
//   } 
  const toggleFullscreen = () => {
    const chartDiv = document.getElementById('chartdiv');

    if (chartDiv && !document.fullscreenElement) {
      chartDiv.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  const fullscreenButton = document.getElementById('fullscreen-toggle');
  if (fullscreenButton) {
    fullscreenButton.addEventListener('click', toggleFullscreen);
  }
  stockChart.events.on('drawingadded', (ev) => {
    ev.series.events.on("pointerover",(ev)=>{
        console.log('hovering over:',ev.target)
       

    })
    
    ev.series.events.on('pointerout',(ev)=>{
        console.log('pointer out')
        
    })
   
    ev.series.events.on('rightclick', (ev) => {
        // ev.event.preventDefault();  // Prevent the default browser context menu
        console.log('rightclickon:', ev);
        setMenuVisible(true);
        setMenuPosition({ x: ev.originalEvent.clientX + 10, y: ev.originalEvent.clientY+10});
        setSelectedDrawing(ev.target);
        stockChart.set('drawingSelectionEnabled', true);
        setDrawingSelection(true);
        stockChart.events.on('click',(ev)=>{
            console.log('chart clicked')
            setMenuVisible(false)
            const drawControlSettings = document.getElementById('drawControlSettings');

            if(drawControlSettings) drawControlSettings.style.display='none'
          })
      });
    ev.series.events.on("dblclick",(ev)=>{
        console.log('click on:',ev.target)
        stockChart.set('drawingSelectionEnabled',true)
        setDrawingSelection(true)
    })
    if (activeTool) {
      activeTool.set('active', false);
      setActiveTool(null);
    }

  });
  
  stockChart.events.on('drawingselected',(ev)=>{
    
   
    console.log("drawing selected",ev)
    setMenuVisible(true);
    setMenuPosition({ x: 400, y: 100});
    setSelectedDrawing(ev.target);

  })
 
  
  
  // Add drawingselected event listener
//   stockChart.events.on('drawingselected', (ev) => {
//     const selectedDrawing = ev.target;
//     const drawingType = selectedDrawing.get('type'); // Assuming the drawing tool has a 'type' property

//     // Deactivate any active tool
//     if (activeTool) {
//       activeTool.set('active', false);
//       setActiveTool(null);
//     }

//     // Activate controls for the selected drawing
//     activateDrawingTool(drawingType);
//   });
const handleClickOutside = (event: MouseEvent) => {
  const drawingToolsElement = document.getElementById('drawing-tools');
  if (drawingToolsElement && !drawingToolsElement.contains(event.target as Node)) {
    setDropdownOpen(false);
  }
};

document.addEventListener('mousedown', handleClickOutside);



root.addDisposer(
    am5.utils.addEventListener(root.dom, "contextmenu", function(ev) {
      ev.preventDefault();
    })
  );
        return () => {
            if (rootRef.current) {
                rootRef.current.dispose();
                rootRef.current = null;
            }
        if (fullscreenButton) {
            fullscreenButton.removeEventListener('click', toggleFullscreen);
        }
        };
    }, [isDarkMode]);
  
    const root = rootRef.current;
    const stockChart = root?.container.children.getIndex(0)

    stockChart?.events.on('drawingadded',(ev)=>{
        
        if (activeTool) {
            const currentDrawing = activeTool.serializeDrawings("object")
            activeTool.set('active', false);
            // setActiveTool(null);
            const drawControlSettings = document.getElementById('drawControlSettings');

            drawControlSettings.style.display = 'none'
        }

    })
 
    
  console.log(drawingSelection)
  const activateDrawingTool = (toolType: string) => {
    const root = rootRef.current;
    const stockChart = root?.container.children.getIndex(0);
  
    const drawControlSettings = document.getElementById('drawControlSettings');
    if (!drawControlSettings) return;
    if (!root || root.isDisposed() || !stockChart) {
      console.error('Root or stockChart is not available or disposed.');
      return;
    }
  
    let drawingTool = am5stock.DrawingControl.new(root, {
      stockChart: stockChart,
    });
  
    // Deactivate the previously active tool if it exists
    if (activeTool) {
      activeTool.set('active', false);
      setActiveTool(null);
    }
  
    stockChart.set('drawingSelectionEnabled', true);
    setDrawingSelection(true);
  
    // Reset and activate the selected drawing tool
    drawingTool.setAll({
      tool: toolType,
      active: true,
    });
  
    // Handle eraser and selection cases separately
    if (toolType === "Eraser") {
      drawingTool.set('active',false)
      drawingTool.setEraser(true);
      stockChart.set('drawingSelectionEnabled', false);
      setDrawingSelection(false);
      drawControlSettings.style.display = 'none';
    } else if (toolType === "Select") {
      stockChart.set('drawingSelectionEnabled', false);
      stockChart.set('drawingSelectionEnabled', true);
      drawControlSettings.style.display = 'none';
    } else {
      setActiveTool(drawingTool);
      drawControlSettings.style.display = 'block';
  
      const lineWidthInput = document.getElementById('lineWidth') as HTMLInputElement;
      const lineColorInput = document.getElementById('lineColor') as HTMLInputElement;
  
      if (lineWidthInput) {
        lineWidthInput.value = '2';
        lineWidthInput.addEventListener('input', () => {
          if (drawingTool) {
            drawingTool.setAll({ strokeWidth: parseInt(lineWidthInput.value, 10) });
          }
        });
      }
  
      if (lineColorInput) {
        lineColorInput.value = '#000000';
        lineColorInput.addEventListener('input', () => {
          if (drawingTool) {
            drawingTool.setAll({ strokeColor: am5.color(lineColorInput.value) });
          }
        });
      }
    }
  };
  
  
  const handleSelect = () => {
    console.log('Select clicked');
    // Handle selection logic
    setMenuVisible(false);
  };
  const handleEdit = () => {
    console.log('Edit clicked');
    if(selectedDrawing){
        console.log(selectedDrawing)
        
    }
    const drawControlSettings = document.getElementById('drawControlSettings');

    if(drawControlSettings) drawControlSettings.style.display='block'
    
    setMenuVisible(false);
  };

  const handleRemove = () => {
    console.log('Remove clicked');
    // Handle remove logic
    if (selectedDrawing) {
      selectedDrawing.dispose();
    }
    setMenuVisible(false);
  };
  const toggleDrawingTools = () => {
    setDropdownOpen(!isDropdownOpen);
};


  return (
    <div id="incremental-chart">
    <ContextMenu
      x={menuPosition.x}
      y={menuPosition.y}
      visible={menuVisible}
      onSelect={handleSelect}
      onEdit={handleEdit}
      onRemove={handleRemove}
    />
  
    <div className="flex relative">
      <div className="flex-grow">
      <div className="flex w-full items-center justify-start pl-5 h-[3vh]"> 
            {/* Chart Controls */}
            <SymbolBar/>
            <div id="chartcontrols"></div>
            
            {/* Drawing Tools Toggle Button */}
            <div id="drawing-tools-toggle" className="relative">
                <button
                    onClick={toggleDrawingTools}
                    className="p-2 pt-3 bg-inherit text-[#848e9c] rounded cursor-pointer transition duration-300"
                >
                    <i className="fa fa-pencil text-[1rem]"></i>
                </button>

                {/* Drawing Tools Dropdown */}
                {isDropdownOpen && (
                    <div id="drawing-tools" className="absolute left-0 bg-gray-900 shadow-lg z-10">
                    <ul className="flex flex-col list-none pl-0 my-0">
                      {drawingTools.map((tool) => (
                        <li key={tool.type} className="p-2 hover:bg-gray-700 cursor-pointer">
                          <button onClick={() => activateDrawingTool(tool.type)}>
                            <i className={tool.icon}></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                )}
            </div>
                <div id="drawControlSettings" className="hidden">
                  <label>
                    Line Width:
                    <input type="range" id="lineWidth" min="1" max="10"
                      
                    />
                  </label>
                  <label>
                    Line Color:
                    <input type="color" value="#43da86" id="lineColor"/>                  
                  </label>
                </div>
            {/* Fullscreen Button */}
            <button
                id="fullscreen-toggle"
                className="ml-auto relative right-0 top-0 mr-3 mt-4 border-none bg-transparent cursor-pointer text-tBase"
            >
                <i className="fas fa-expand-arrows-alt"></i>
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="relative mr-10 cursor-pointer mt-4 border-none h-[1.2rem] text-tBase bg-transparent">
              <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
        </div>


        
       
  
        <div id="chartdiv" ref={chartRef} className="bg-background"></div>
      </div>
  
      {/* Fullscreen button outside of chart controls */}
      
    </div>
  </div>

  );
};

export default IncrementalChart;
