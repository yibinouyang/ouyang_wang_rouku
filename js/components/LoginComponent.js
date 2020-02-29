export default {
    template: `<div style="margin-top: 80px;" class="container">
  <img src="images/images/log-in_02.jpg" style="width: 50%;height: 85%;position: absolute;right: 0;top: 0;z-index: 2000;">
  <form>
    <div class="form-row align-items-center">
      <div style="display: flex;flex-direction: column;
          justify-content:space-between;width: 40%;height: 100px;margin-top: 30px;">
        <h1 style="text-align: center">Welcome &nbsp;!</h1>
        <div class="col-md-12">
          <label for="inlineFormInputName" style="font-weight: bold">Username</label>
          <div>
            <img src="images/images/username.svg" height="20px;"
                 style="position: absolute;margin-top: 8px;margin-left: 8px;">
            <input v-model="input.username" type="text" class="form-control" id="inlineFormInputName"
                   style="padding-left: 30px;" required>
          </div>
        </div>

        <div class="col-md-12">
          <label for="inlineFormPassword" style="font-weight: bold">Password</label>
          <div>
            <img src="images/images/locked.svg" height="20px;"
                 style="position: absolute;margin-top: 8px;margin-left: 8px;">
            <input v-model="input.password" type="password" class="form-control" id="inlineFormPassword"
                   style="padding-left: 30px;" required>
          </div>
          <p style="text-align: right;margin-top: 10px;">forget the password?</p>
        </div>

        <div style="margin: auto;display: block">
          <div style="display: flex;justify-content: space-around;height: 50px;">
            <button v-on:click.prevent="login()" type="submit" class="btn btn-primary"
                    style="background-color: #68398d;padding: 0 20px;">Sign in
            </button>
            <p style="margin-top: 30px;margin-left: 10px;">Or sign up</p>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
     `,

    data() {
        return {
            input: {
                username: "",
                password: ""
            },

        }
    },

    methods: {
        login() {
            //console.log(this.$parent.mockAccount.username);

            if (this.input.username != "" && this.input.password != "") {
                // fetch the user from the DB
                // generate the form data
                let formData = new FormData();

                formData.append("username", this.input.username);
                formData.append("password", this.input.password);

                let url = `./admin/scripts/admin_login.php`;

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        if (typeof data != "object") { // means that we're not getting a user object back
                            console.warn(data);
                            console.error("authentication failed, please try again");
                            this.$emit("autherror", data);
                        } else {
                            this.$emit("authenticated", true, data);
                            this.$router.replace({name: "users"});
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.log("A username and password must be present");
            }
        }
    }
}