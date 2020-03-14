import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
import { PushServiceService } from 'src/app/services/push-service.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-fishbone-timeline',
  templateUrl: './fishbone-timeline.component.html',
  styleUrls: ['./fishbone-timeline.component.scss']
})
export class FishboneTimelineComponent implements OnInit, AfterViewInit {

  private notificationsUrl = '/api/notification' ;
  private chart: am4plugins_timeline.CurveChart;
  private colorSet: any;
  private interfaceColors: any;
  private categoryAxis: any;
  private dateAxis: any;
  private series: any;
  private distance: any;
  private angle: any;
  private bullet: any;
  private line: any;
  private circle:any;
  private circleHoverState:any;
  private hoverState:any;
  private outerCircle: any;
  private label:any;
  private yearLabel:any;

  chartData: any[];

  constructor(private pushService: PushServiceService) { }

  ngOnInit(): void {
    this.chart = am4core.create("chartdiv", am4plugins_timeline.CurveChart);
    this.chart.curveContainer.padding(0, 100, 0, 120);
    this.chart.maskBullets = false;

    this.colorSet = new am4core.ColorSet();

    /*this.chart.data = [{
        "category": "",
        "year": "1990",
        "size": 13,
        "text": "Lorem ipsum dolor"
      }, {
        "category": "",
        "year": "1995",
        "size": 5,
        "text": "Sit amet"
      }, {
        "category": "",
        "year": "2000",
        "size": 9,
        "text": "Consectetur adipiscing elit"
      }, {
        "category": "",
        "year": "2005",
        "size": 12,
        "text": "Sed do eiusmod"
      }, {
        "category": "",
        "year": "2010",
        "size": 3,
        "text": "Tempor incididunt"
      }, {
        "category": "",
        "year": "2015",
        "size": 9,
        "text": "Ut labore et dolore"
      }, {
        "category": "",
        "year": "2020",
        "size": 4,
        "text": "Magna aliqua"
      }, {
        "category": "",
        "year": "2025",
        "size": 3,
        "text": "Ut enim ad minim veniam"
      }, {
        "category": "",
        "size": 10,
        "year": "2030",
        "text": "Quis nostrud exercitation"
      }
    ];*/

    //this.chart.dateFormatter.inputDateFormat = "yyyy";
    this.chart.dateFormatter.inputDateFormat = "dd-MM-yyyy hh:mm:ss a";

    this.chart.fontSize = 11;
    this.chart.tooltipContainer.fontSize = 11;

    this.categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis() as any);
    this.categoryAxis.dataFields.category = "category";
    this.categoryAxis.renderer.grid.template.disabled = true;

    this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis() as any);
    this.dateAxis.renderer.points = [{ x: -400, y: 0 }, { x: 0, y: 50 }, { x: 400, y: 0 }]
    this.dateAxis.renderer.polyspline.tensionX = 0.8;
    this.dateAxis.renderer.grid.template.disabled = true;
    this.dateAxis.renderer.line.strokeDasharray = "1,4";
    this.dateAxis.baseInterval = {period:"day", count:1}; // otherwise initial animation will be not smooth

    this.dateAxis.renderer.labels.template.disabled = true;

    this.series = this.chart.series.push(new am4plugins_timeline.CurveLineSeries());
    this.series.strokeOpacity = 0;
    this.series.dataFields.dateX = "year";
    this.series.dataFields.categoryY = "category";
    this.series.dataFields.value = "size";
    this.series.baseAxis = this.categoryAxis;

    this.interfaceColors = new am4core.InterfaceColorSet();

    this.series.tooltip.pointerOrientation = "down";

    this.distance = 100;
    this.angle = 60;

    this.bullet = this.series.bullets.push(new am4charts.Bullet());

    this.line = this.bullet.createChild(am4core.Line);
    let chartClone = this.chart;
    this.line.adapter.add("stroke", function(fill, target) {
      if (target.dataItem) {
        return chartClone.colors.getIndex(target.dataItem.index);
      }
    });

    this.line.x1 = 0;
    this.line.y1 = 0;
    this.line.y2 = 0;
    this.line.x2 = this.distance - 10;
    this.line.strokeDasharray = "1,3";

    this.circle = this.bullet.createChild(am4core.Circle);
    this.circle.radius = 30;
    this.circle.fillOpacity = 1;
    this.circle.strokeOpacity = 0;

    this.circleHoverState = this.circle.states.create("hover");
    this.circleHoverState.properties.scale = 1.3;
    chartClone =this.chart;
    this.series.heatRules.push({ target: this.circle, min: 20, max: 50, property: "radius" });
    this.circle.adapter.add("fill", function(fill, target) {
      if (target.dataItem) {
        return chartClone.colors.getIndex(target.dataItem.index)
      }
    });
    this.circle.tooltipText = "{text}: {value}";
    this.circle.adapter.add("tooltipY", function(tooltipY, target){
      return -target.pixelRadius - 4;
    });

    this.yearLabel = this.bullet.createChild(am4core.Label);
    this.yearLabel.text = "{year}";
    this.yearLabel.strokeOpacity = 0;
    this.yearLabel.fill = am4core.color("#fff");
    this.yearLabel.horizontalCenter = "middle";
    this.yearLabel.verticalCenter = "middle";
    this.yearLabel.interactionsEnabled = false;

    this.label = this.bullet.createChild(am4core.Label);
    this.label.propertyFields.text = "text";
    this.label.strokeOpacity = 0;
    this.label.horizontalCenter = "right";
    this.label.verticalCenter = "middle";

    let distanceClone = this.distance;
    let angleClone = this.angle;
    this.label.adapter.add("opacity", function(opacity, target) {
      if(target.dataItem){
        let index = target.dataItem.index;
        let line = target.parent.children.getIndex(0);

        if (index % 2 == 0) {
          target.y = -distanceClone * am4core.math.sin(-angleClone);
          target.x = -distanceClone * am4core.math.cos(-angleClone);
          line.rotation = -angleClone - 180;
          target.rotation = -angleClone;
        }
        else {
          target.y = -distanceClone * am4core.math.sin(angleClone);
          target.x = -distanceClone * am4core.math.cos(angleClone);
          line.rotation = angleClone - 180;
          target.rotation = angleClone;
        }
      }
      return 1;
    });

    this.outerCircle = this.bullet.createChild(am4core.Circle);
    this.outerCircle.radius = 30;
    this.outerCircle.fillOpacity = 0;
    this.outerCircle.strokeOpacity = 0;
    this.outerCircle.strokeDasharray = "1,3";

    this.hoverState = this.outerCircle.states.create("hover");
    this.hoverState.properties.strokeOpacity = 0.8;
    this.hoverState.properties.scale = 1.5;

    this.outerCircle.events.on("over", function(event){
      let circle = event.target.parent.children.getIndex(1);
      circle.isHover = true;
      event.target.stroke = circle.fill;
      event.target.radius = circle.pixelRadius;
      event.target.animate({property: "rotation", from: 0, to: 360}, 4000, am4core.ease.sinInOut);
    });

    this.outerCircle.events.on("out", function(event){
      let circle = event.target.parent.children.getIndex(1);
      circle.isHover = false;
    });

    this.chart.scrollbarX = new am4core.Scrollbar();
    this.chart.scrollbarX.opacity = 0.5;
    this.chart.scrollbarX.width = am4core.percent(50);
    this.chart.scrollbarX.align = "center";

    /*for (var counter:number = 1; counter<100; counter+=10){
      this.chart.data.push(
        {
          category: "",
          year: 2040+counter+"",
          size: counter,
          text: "Lorem ipsum dolor"
        }
      );
    }*/
  }

  ngAfterViewInit(): void {
    //let sizeVar =1;
    //let yearVar = 2040;
    this.pushService
        .newObservable(this.notificationsUrl)
        .subscribe((watcherEvent: any) => {
          console.log(watcherEvent);
          this.chart.data.push(
            {
              category: "",
              year: watcherEvent.split(" : ")[0]/*yearVar+""*/,
              size: 100/*sizeVar*/,
              text: watcherEvent.split(" : ")[1]
            }
          );
          this.chart.validateData();
          //yearVar+=10;
          //sizeVar++;
  		 });
  }

}
