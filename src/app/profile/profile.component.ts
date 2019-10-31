import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { APIService } from '../API.service';
import { Auth } from 'aws-amplify';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string;
  userName:string;
  user = new User('','',''); 
  constructor(private api:APIService) { }

  ngOnInit() {
  Auth.currentAuthenticatedUser()
    .then(user => {
      return Auth.changePassword(user, 'oldPassword', 'newPassword');
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
    
  }
    async updateProfile() {
      const userCreate = {
        id:this.userId,
        username: this.user.username,
        firstName:this.user.firstName,
        lastname:"",
        bio:""
      }
       await this.api.CreateUser(userCreate);
     
    }

}
