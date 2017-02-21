import {Component, Input} from '@angular/core';
import {Transfer,Toast } from 'ionic-native';

import {NavController, NavParams, ActionSheetController } from 'ionic-angular';

// Cordova
declare var cordova: any;

@Component({
  selector: 'page-imgshow',
  templateUrl: 'imgshow.html',
  providers: [Transfer]
})

export class ImgShow {
  @Input()
  imglist : any[];
  title : string;

  constructor(public navCtrl: NavController,
               public navParams : NavParams,
               public actionSheetCtrl: ActionSheetController,
               public fileTransfer: Transfer) {
      this.imglist = this.navParams.get('imglist');
      this.title = this.navParams.get('title');
  }

  save(url: string) {
    let filename = new Date().getTime() + '.png';
    let actionSheet = this.actionSheetCtrl.create({
      title: '菜单',
      buttons: [{
          text: '保存到本地',
          handler: () => {
            this.fileTransfer.download(url, cordova.file.	externalRootDirectory + 'meinv/' + filename).then((entry) => {
              Toast.show('/storage/emulated/0/meinv/' + filename, '1000', 'bottom').subscribe(
                toast => {
                  console.log(toast);
                }
              );
              console.log('download complete: ' + entry.toURL());
            }, (error) => {
              console.info('-------------------',error);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

}
