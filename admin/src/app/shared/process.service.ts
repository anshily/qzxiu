/**
 * Created by zaq on 2017/5/12.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class ProcessService {
  public processDiv: any;
  public isShow: Boolean = false;
  public canvas: any;
  public context: any;
  public centerX: any;
  public centerY: any;
  public rad: any;
  public speed: any;
  constructor() {
    this.processDiv = document.createElement('div');
    this.processDiv.id = 'processComponent';
    this.processDiv.style = 'position: fixed;left:0;top:0;right: 0;bottom: 0;margin: auto;width:50px;height:50px;border-radius: 10px;background-color: rgba(0,0,0,0);z-index: 99999999;';
    this.processDiv.innerHTML = '<div style="position: absolute;left:0;top:0;right: 0;bottom: 0;margin: auto;width: 50px;height: 50px;background-color: rgba(0,0,0,0);"><canvas id="canvas" width="150" height="150" style="background-color: rgba(255,255,255,1);border-radius: 50%;width: 53px;height: 53px;border:none;"></canvas></div>';
  }
  drawFrame(num) {
    // console.log(1);
    // window.requestAnimationFrame(() => {
    //   this.drawFrame();
    // });
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.whiteCircle();
    this.text(this.speed);
    this.blueCircle(this.speed);
    if (this.speed > 100) {
      this.speed = 0;
    }
    this.speed = num;
  }
  text(n) {
    this.context.save(); // save和restore可以保证样式属性只运用于该段canvas元素
    this.context.strokeStyle = '#36a2cd'; // 设置描边样式
    this.context.font = '40px 宋体'; // 设置字体大小和字体
    // 绘制字体，并且指定位置
    this.context.strokeText(n.toFixed(0) + '%', this.centerX - 45, this.centerY + 20);
    this.context.stroke(); // 执行绘制
    this.context.restore();
  }
  whiteCircle() {
    this.context.save();
    this.context.beginPath();
    this.context.strokeStyle = '#36a2cd';
    this.context.lineWidth = 2;
    this.context.arc(this.centerX, this.centerY, 70 , 0, Math.PI * 2, false);
    this.context.stroke();
    this.context.closePath();
    this.context.restore();
  }
  blueCircle(n) {
    this.context.save();
    this.context.strokeStyle = '#36a2cd'; // 设置描边样式
    this.context.lineWidth = 6; // 设置线宽
    this.context.beginPath(); // 路径开始
    this.context.arc(this.centerX, this.centerY, 70 , -Math.PI / 2, -Math.PI / 2 + n * this.rad, false); // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    this.context.stroke(); // 绘制
    this.context.closePath(); // 路径结束
    this.context.restore();
  }
  show() {
    if (!this.isShow) {
      document.body.appendChild(this.processDiv);
      this.isShow = true;
      this.canvas = <HTMLCanvasElement>document.getElementById('canvas'); // 获取canvas元素
      this.context = this.canvas.getContext('2d');  // 获取画图环境，指明为2d
      this.centerX = this.canvas.width / 2;   // Canvas中心点x轴坐标
      this.centerY = this.canvas.height / 2; // Canvas中心点y轴坐标
      this.rad = Math.PI * 2 / 100; // 将360度分成100份，那么每一份就是rad度
      this.speed = 0.1; // 加载的快慢就靠它了
    }
  }
  hide() {
    if (this.isShow) {
      document.body.removeChild(this.processDiv);
      this.isShow = false;
    }
  }
}
