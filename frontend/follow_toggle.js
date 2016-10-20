class FollowToggle{
  constructor($el, options){
    this.userId = $el.data("user-id") || options.userId;
    this.followState = $el.data("initial-follow-state") || options.followState;
    this.el = $el;
    this.el.click(this.handleClick.bind(this));
    this.render();

  }

  render(){
    if(this.followState === "in progress") {
      // debugger;
      this.el.text("Working....");
      this.el.prop('disabled', true);
    }
    else{
      if (this.followState === "follow"){
        this.el.prop('disabled', false);
        this.el.text("Follow");
      }
      else {
        this.el.prop('disabled', false);
        this.el.text("Unfollow");
      }
    }
  }

  handleClick(e){
    e.preventDefault();
    let method = this.followState === "follow" ? "post" : "delete";
    let that = this;
    let currentState = this.followState;
    this.followState = "in progress";
    this.render();

    $.ajax({
      url: `/users/${this.userId}/follow`,
      type: method,
      dataType: 'json',
      success(response){
        that.followState = currentState;
        that.handleSuccess(response);
      }
    });
  }

  handleSuccess(response){
    this.swap();
    this.render();
  }

  swap(){
    this.followState = this.followState === "follow" ? "unfollow" : "follow";
  }
}

module.exports = FollowToggle;
