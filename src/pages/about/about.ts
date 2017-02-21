import {Component, OnInit} from '@angular/core';

import { NavController } from 'ionic-angular';

import {HttpService} from '../service/http.service'
import {ImgShow} from "../imgshow/imgshow";
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{
  data : any[];
  page : number = 1;
  imgPage = ImgShow;

  constructor(public navCtrl: NavController,private httpService: HttpService) {

  }

  ngOnInit(): void {
    this.httpService.post(this.page.toString()).subscribe(
      (result)=> {
        console.log(result);
        this.data = result.showapi_res_body.pagebean.contentlist;
      },
      (error)=> {
        this.data = error;
        console.info("error", error);
      }
    );
  }

  next(): void {
    // let param = {
    //   page: data,
    //   showapi_appid: '31497',
    //   showapi_timestamp: new Date().getTime(),
    //   type: '4002',
    //   showapi_sign: 'bfda4a250b86e678d5cca7e24d3f759a'
    // };
    this.page += 1;

    this.httpService.post(this.page.toString()).subscribe(
      (result)=> {
        console.log(result);
        this.data = result.showapi_res_body.pagebean.contentlist;
      },
      (error)=> {
        this.data = error;
        console.info("error", error);
      }
    );
  }

  prev(): void {
    // let param = {
    //   page: data,
    //   showapi_appid: '31497',
    //   showapi_timestamp: new Date().getTime(),
    //   type: '4002',
    //   showapi_sign: 'bfda4a250b86e678d5cca7e24d3f759a'
    // };
    this.page -= 1;

    this.httpService.post(this.page.toString()).subscribe(
      (result)=> {
        console.log(result);
        this.data = result.showapi_res_body.pagebean.contentlist;
      },
      (error)=> {
        this.data = error;
        console.info("error", error);
      }
    );
  }

  detal(list : any[],title: string) : void {
    this.navCtrl.push(this.imgPage, {imglist : list,title: title});
  }

}
