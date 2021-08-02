import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";

  constructor(public alertController: AlertController, 
    public toastController: ToastController, 
    public dataService: GroceriesServiceService, 
    public inputDialogService: InputDialogService,
    public socialSharing: SocialSharing) {}

  loadItems() {
    return this.dataService.getItems();
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Removing Item - ' + item.name,
      duration: 2000
    });
    toast.present();
    this.dataService.removeItem(index);
  }

  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Sharing Item - ' + item.name,
      duration: 2000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.nme + " Quantity: " + item.quantity;
    let subject = "Sharfed via Groceries app";
     // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Share Success!");
    }).catch(() => {
      // Sharing via email is not possible
      console.error("Share failed!");
    });
    //this.dataService.removeItem(index);
  }

  editItem(item, index) {
    console.log("Editing Item - ", item, index);
    this.inputDialogService.itemPrompt(item, index);
  }

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.itemPrompt();
  }

}
