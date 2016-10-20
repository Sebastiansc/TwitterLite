const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor($el){
    this.el = $el;
    this.input = $el.find("input");
    this.users = $el.find(".users");
    this.input.on("input", this.handleInput.bind(this));
  }

  handleInput(e){
    let text = this.input.serialize();
    let that = this;
    $.ajax({
      url: "/users/search",
      dataType: 'json',
      data: text,
      success(response){
        console.log(response);
        that.renderUsers(response);
      }
    });
  }

  renderUsers(response){
    this.users.empty();
    response.forEach(user => {
      let $user = $(`<li><a href="users/${user.id}">${user.username}</a></li>`);
      let $button = $('<button class="follow-toggle"></button>');
      let follow = user.followed ? "unfollow" : "follow";
      new FollowToggle($button, {userId: user.id, followState: follow});
      $user.append($button);
      this.users.append($user);
    });
  }

}

module.exports = UsersSearch;
