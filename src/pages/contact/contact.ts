import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';
import {Chat} from'../chat/chat';

/**
 * Generated class for the Contact page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class Contact {
    public userid: string;
    public userProfile: any;
    public name: string;
    public contactPaddList: any;
    public contactList: any;
    public profileP: string;

    constructor(public profileData: ProfileData, public navCtrl: NavController
        , public navParams: NavParams) {

        this.userid = profileData.getUserId();

        this.profileData.getUserProfile().on('value', (data) => {
            this.userProfile = data.val();
            this.name = this.userProfile.firstName;
            this.profileP = this.userProfile.profilePic;


        });

        
    }

    

    ionViewWillEnter() {
        this.profileData.getUserContactP().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(snap => {
                rawList.push({
                    key: snap.key,
                    room:snap.val().room,
                    name:snap.val().name,
                    id: snap.val().id,
                    pic:snap.val().pic

                });
                return false
            });
            this.contactPaddList = rawList;
        });

        this.profileData.getUserContacts().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(snap => {
                rawList.push({
                    key: snap.key,
                    name: snap.val().name,
                    id: snap.val().id,
                    room: snap.val().room,
                    pic:snap.val().pic

                });
                return false
            });
            this.contactList = rawList;
        });

    }

    removeContactP(key: any) {
        this.profileData.removeContactP(this.userid,key);
    }

    removeContacts(key: any) {
        this.profileData.removeContacts(this.userid, key);
    }

    addContact(name:any,id: any,key:any,pic:string) {
        this.profileData.addContactSelf(this.userid,name,id,pic);
        this.profileData.addContact(this.userid,this.name,id,this.profileP);
        this.profileData.removeContactP(this.userid, key);
        this.profileData.addContactRoom(this.userid,name, id);
        this.profileData.addContactRoomTo(this.userid,this.name,id);
    }

  
    

    openRoom(room:string) {
        
        this.navCtrl.push(Chat,room);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contact');
  }

}
