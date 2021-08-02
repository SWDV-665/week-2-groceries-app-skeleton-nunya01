import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertController: AlertController, public dataService: GroceriesServiceService) { }

  async itemPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit item..." : "Please add an item...",
      inputs: [
        {
          name: 'name', // name is the key
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null  // value is passed as value of 'name'
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          min: 1,
          max: 12,
          value: item ? item.quantity : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Save',
          handler: (item) => {
            console.log('Saving...', item);
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
