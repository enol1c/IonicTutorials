import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController, AlertController  } from 'ionic-angular';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})



export class HelloIonicPage {
  books: FirebaseListObservable<any>;
  constructor(angFire: AngularFire, public alertCtrl: AlertController) {
    this.books = angFire.database.list('/Books');
  }

  addBook():void{
    let prompt = this.alertCtrl.create({
      title: 'Book & Author',
      message: 'Enther the book title & author',
      inputs: [
        {
          name: 'title',
          placeholder: 'booktitle',
        },
        {
          name: 'author',
          placeholder: 'author name',
        }

      ],
      buttons:[
        {
          text: 'Cancel',
          handler: data => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.books.push({
              title: data.title,
              author: data.author,
            })
          }
        }
      ]
    });

    prompt.present();
  };
  editBook(book):void{
    let prompt = this.alertCtrl.create({
      title: 'Edit Book',
      message: 'Edit the book title & author',
      inputs: [
        {
          name: 'title',
          placeholder: book.title,
        },
        {
          name: 'author',
          placeholder: book.author,
        }

      ],
      buttons:[
        {
          text: 'Cancel',
          handler: data => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            let newtitle:String = book.title;
            let newauthor:String = book.author;

            if (data.title != '') {
              newtitle = data.title;
            }
            if (data.author != '') {
              newauthor = data.author;
            }
            this.books.update(book.$key, {
              title: newtitle,
              author: newauthor,
            })
          }
        }
      ]
    });

    prompt.present();
  };
  deleteBook(bookID):void{
    let prompt = this.alertCtrl.create({
      title: 'Delete Book',
      buttons:[
        {
          text: 'Cancel',
          handler: data => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Delete Book',
          handler: data => {
            this.books.remove(bookID)
          }
        }
      ]
    });

    prompt.present();
  }
}
