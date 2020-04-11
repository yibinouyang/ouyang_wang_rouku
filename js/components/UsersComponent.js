import UserComponent from './UserComponent.js';

export default {
    props: ['liveuser'],
    template: `<div class="container">
  <div class="row">
    <div class="col-sm-12" style="margin: 40px 0;">
      <h2 style="text-align: left;font-weight: bold">Choosing the user</h2>
    </div>
  </div>
  <div class="row" style="width: 70%;margin: auto;">
    <div class="col-6">
      <router-link to="/parent">
        <img src="images/images/parent.png" style="width: 180px;margin: auto;display: block"/>
      </router-link>
    </div>
    <div class="col-6">
      <router-link to="/child">
        <img src="images/images/child.png" style="width: 180px;margin: auto;display: block;"/>
      </router-link>
    </div>
  </div>
  <user v-for="(user, index) in userList" :liveuser="user" :key="index"></user>
</div>
	`,

    created: function () {
        //debugger;
        // this.fetchAllUsers();
        console.log(this.liveuser);
        if (this.liveuser.access !== "5")
            this.$router.replace("/child")
    },

    data() {
        return {
            message: `Who's Using Roku?`,
            userList: []
        }
    },

    methods: {
        // fetchAllUsers() {
        //     let url = `./admin/scripts/users.php?allusers=true`;
        //
        //     fetch(url)
        //         .then(res => res.json())
        //         .then(data => {
        //             this.userList = data
        //         })
        //         .catch(function (error) {
        //             console.error(error);
        //         });
        // }
    },

    components: {
        user: UserComponent
    }
}