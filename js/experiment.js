    am5.ready(function() {
    
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        // panX: true,
        // panY: true,
        // wheelX: "panX",
        // wheelY: "zoomX"
      })
    );
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    
    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        // maxDeviation: 0.3,
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        // maxDeviation: 0.3,
        min:0,
        max:10.5,
        strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, {
        labelText:"{valueY}"
      })
      })
    );
    
    series.columns.template.setAll({
      width: am5.percent(120),
      fillOpacity: 0.1,
      strokeOpacity: 1
    });
    // series.columns.template.adapters.add("fill", (fill, target) => {
    //   return chart.get("colors").getIndex(series.columns.indexOf(target));
    // });
    
    series.columns.template.adapters.add("stroke", (stroke, target) => {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });
    
    series.columns.template.set("draw", function (display, target) {
      var w = target.getPrivate("width", 0);
      var h = target.getPrivate("height", 0);
      display.moveTo(0, h);
      display.bezierCurveTo(w / 4, h, w / 4, 0, w / 2, 0);
      display.bezierCurveTo(w - w / 4, 0, w - w / 4, h, w, h);
    });
    
    // Set data
    var data = [{
      country: "2μg",
      value: 3
    }, {
      country: "4μg",
      value: 1.75+1.5
    }, {
      country: "8μg",
      value: 2.5+1.5
    }, {
      country: "16μg",
      value: 4+1.5
    }, {
      country: "32μg",
      value: 5.5+1.5
    }, {
      country: "64μg",
      value: 6.25+1.5
    }, {
      country: "128μg",
      value: 7.5+1.5
    }, {
      country: "256μg",
      value: 7.5+1.5
    }];
    
    xAxis.data.setAll(data);
    series.data.setAll(data);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
    }); // end am5.ready()
